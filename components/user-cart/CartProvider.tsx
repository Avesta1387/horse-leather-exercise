'use client'

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Size = {
    title: string;
};

type Color = {
    title: string;
    value: string;
};

type ProductVariant = {
    id: string;
    price: number;
    sizes: Size | null;
    colors: Color | null;
    discount?: number;
};

type Product = {
    id: string;
    images: string[] | null;
    title: string;
    score: number | null;
};

export type Cart = {
    id: string;
    quantity: number;
    products: Product | null;
    product_variants: ProductVariant | null;
    image: string | null;
};

type DiscountCode = {
    id: number;
    code: string;
    discount_percent: number;
    max_discount: number | null;
    min_purchase: number;
    expires_at: string | null;
    is_active: boolean;
};

type CartContextType = {
    // Cart
    cart: Cart[];
    setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
    isCartLoading: boolean;
    cartError: string | null;

    // Discount
    discountCode: string;
    setDiscountCode: React.Dispatch<React.SetStateAction<string>>;
    appliedDiscount: DiscountCode | null;
    isDiscountLoading: boolean;

    discountError: string | null;

    // Cart Actions
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    removeProduct: (id: string) => Promise<void>;
    clearCart: (id: string) => Promise<void>;

    // Discount Actions
    applyDiscount: () => Promise<void>;
    removeDiscount: () => void;

    // Calculations
    subtotal: number;
    productDiscount: number;
    discountAmount: number;
    totalQuantity: number;
    totalPrice: number;
    isCartEmpty: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
    children,
    initialCart,
}: {
    children: React.ReactNode;
    initialCart: Cart[];
}) {
    const router = useRouter();
    const [cart, setCart] = useState<Cart[]>(initialCart);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [cartError, setCartError] = useState<string | null>(null);

    const [discountCode, setDiscountCode] = useState('');

    const [appliedDiscount, setAppliedDiscount] =
        useState<DiscountCode | null>(null);

    const [isDiscountLoading, setIsDiscountLoading] = useState(false);

    const [discountError, setDiscountError] = useState<string | null>(null);

    useEffect(() => {
        setCart(initialCart)
    }, [initialCart])

    const updateQuantity = async (id: string, quantity: number) => {
        if (quantity < 1) return;

        setIsCartLoading(true);
        setCartError(null);

        try {
            const supabase = createBrowserSupabaseClient()
            const { data, error } = await supabase
                .from('user_cart')
                .update({ quantity })
                .eq('id', id)
                .select('id')
                .maybeSingle();

            if (error) throw error;

            if (!data) {
                throw new Error('Cart item not found');
            }

            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === id
                        ? { ...item, quantity }
                        : item
                )
            )
            router.refresh();
        } catch (error) {
            console.error('UPDATE QUANTITY ERROR: ', error)
            setCartError('تغییر تعداد محصول با مشکل مواجه شد')
        } finally {
            setIsCartLoading(false)
        }
    }

    const removeProduct = async (id: string) => {
        setIsCartLoading(true)
        setCartError(null);

        try {
            const supabase = createBrowserSupabaseClient();

            const { data, error } = await supabase
                .from('user_cart')
                .delete()
                .eq('id', id)
                .select('id')
                .maybeSingle();

            if (error) throw error;

            if (!data) {
                throw new Error('Cart item not found')
            }

            setCart((prevCart) =>
                prevCart.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.error('REMOVE PRODUCT ERROR: ', error)
            setCartError('حذف محصول انجام از سبد انجام نشد')
        } finally {
            setIsCartLoading(false)
        }
    }

    const clearCart = async (id: string) => {

        if (cart.length < 1) return;

        setIsCartLoading(true)
        setCartError(null)
        try {
            const supabase = createBrowserSupabaseClient();

            const { error } = await supabase
                .from('user_cart')
                .delete()
                .eq('user_id', id);

            if (error) throw error;
            setCart([]);
        } catch (error) {
            console.error('CLEAR CART ERROR: ', error);
            setCartError('عملیات جذف کامل سبد خرید با مشکل مواجه شد');
        } finally {
            setIsCartLoading(false)
        }
    }

    const subtotal = useMemo(() => {
        return cart.reduce((total, item) => {
            const price = item.product_variants?.price ?? 0;

            return total + (item.quantity * price);
        }, 0);
    }, [cart]);

    const productDiscount = useMemo(() => {
        return cart.reduce((total, item) => {
            const price = item.product_variants?.price ?? 0;
            const discount = item.product_variants?.discount ?? 0;

            return total + (price * discount / 100 * item.quantity);
        }, 0)
    }, [cart]);

    const discountAmount = useMemo(() => {
        if (!appliedDiscount) return 0;

        const finalSubtotal = subtotal - productDiscount;

        // بررسی حداقل مبلغ خرید
        if (finalSubtotal < appliedDiscount.min_purchase) {
            return 0;
        }

        // محاسبه درصد تخفیف
        const calculatedDiscount =
            finalSubtotal * (appliedDiscount.discount_percent / 100);

        // اعمال سقف تخفیف
        if (appliedDiscount.max_discount !== null) {
            return Math.min(
                calculatedDiscount,
                appliedDiscount.max_discount
            );
        }

        return calculatedDiscount;
    }, [appliedDiscount, subtotal, productDiscount]);

    const totalPrice = useMemo(() => {
        return Math.max(
            0,
            subtotal - productDiscount - discountAmount
        );
    }, [subtotal, productDiscount, discountAmount]);

    const totalQuantity = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    const isCartEmpty = cart.length === 0;

    const applyDiscount = async () => {

        setAppliedDiscount(null);
        const code = discountCode.trim().toUpperCase();

        if (!code) {
            setDiscountError('لطفاً کد تخفیف را وارد کنید');
            setAppliedDiscount(null);
            return;
        }

        setIsDiscountLoading(true);
        setDiscountError(null);

        try {
            const supabase = createBrowserSupabaseClient();

            const { data, error } = await supabase
                .from('discount_codes')
                .select(`*`)
                .eq('code', code)
                .maybeSingle();

            if (error) throw error;

            if (!data || !data.is_active) {
                setDiscountError('کد تخفیف معتبر نیست')
                setAppliedDiscount(null)
                return;
            }

            if (data.expires_at && new Date(data.expires_at) <= new Date()) {
                setDiscountError('مهلت استفاده از این کد تمام شده است')
                setAppliedDiscount(null);
                return;
            }

            const finalSubTotal = subtotal - productDiscount;

            if (finalSubTotal < data.min_purchase) {
                setDiscountError(`حداقل مبلغ سفارش برای استفاده از این کد ${data.min_purchase.toLocaleString('fa-IR')} تومان است`)
                setAppliedDiscount(null);
                return;
            }

            setAppliedDiscount(data)
            setDiscountError(null);
        } catch (error) {
            console.error('Apply discount error:', error);
            setDiscountError('هنگام بررسی کد تخفیف مشکلی پیش آمد');
            setAppliedDiscount(null);

        } finally {
            setIsDiscountLoading(false);
        }
    }

    const removeDiscount = () => {
        setAppliedDiscount(null);
        setDiscountCode("");
        setDiscountError(null);
    };

    return (
        <CartContext.Provider
            value={{
                // Cart
                cart,
                setCart,
                isCartLoading,
                cartError,

                // Discount
                discountCode,
                setDiscountCode,
                appliedDiscount,
                isDiscountLoading,
                discountError,

                // Cart Actions
                updateQuantity,
                removeProduct,
                clearCart,

                // Discount Actions
                applyDiscount,
                removeDiscount,

                // Calculations
                subtotal,
                productDiscount,
                discountAmount,
                totalQuantity,
                totalPrice,
                isCartEmpty,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }

    return context;
}