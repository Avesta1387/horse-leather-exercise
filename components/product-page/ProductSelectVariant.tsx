'use client'

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import SvgIncrease from "../icons/Increase";
import SvgDecrease from "../icons/Decrease";
import ErrorBox from "../error-box/ErrorBox";
import { useRouter } from "next/navigation";


export type ProductSize = {
    id: number;
    created_at: string;
    slug: string;
    title: string;
    category_id: number;
};

export type ProductColor = {
    id: number;
    created_at: string;
    slug: string;
    title: string;
    value: string;
};

export type ProductVariant = {
    id: string;
    created_at: string;
    product_id: string;
    size_id: number;
    color_id: number;
    price: number;
    stock: number;
    sku: string;
    sizes: ProductSize | null;
    colors: ProductColor | null;
};
type Props = {
    variants: ProductVariant[];
};
export default function ProductSelectVariant({ variants }: Props) {
    const router = useRouter();
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(variants[0] ?? null);
    const [quantity, setQuantity] = useState(1);
    const [logInError, setLogInError] = useState(false);
    const [isInCart, setIsInCart] = useState(false);


    useEffect(() => {
        let isActive = true;

        const checkInCart = async () => {
            setQuantity(0);
            setIsInCart(false);

            const supabase = createBrowserSupabaseClient();

            const { data: { session }, error: sessionError } =
                await supabase.auth.getSession();

            if (sessionError) {
                console.error(sessionError);
                return;
            }

            const user = session?.user;

            if (!user) {
                return;
            }

            if (!user || !selectedVariant) return;

            const { data: checkCart, error } = await supabase
                .from('user_cart')
                .select('quantity')
                .eq('user_id', user.id)
                .eq('product_variant_id', selectedVariant.id)
                .maybeSingle();

            if (!isActive) return;

            if (error) {
                console.error(error);
                return;
            }

            if (checkCart) {
                setQuantity(checkCart.quantity);
                setIsInCart(true);
            }
        };

        checkInCart();

        return () => {
            isActive = false;
        };
    }, [selectedVariant?.id]);


    const uniqueColors = Array.from(
        new Map(
            variants
                .filter((variant) => variant.colors)
                .map((variant) => [variant.colors!.id, variant.colors!])
        ).values()
    );

    const uniqueSizes = Array.from(
        new Map(
            variants
                .filter(
                    (variant) =>
                        variant.color_id === selectedVariant?.color_id &&
                        variant.stock > 0 &&
                        variant.sizes
                )
                .map((variant) => [variant.sizes!.id, variant.sizes!])
        ).values()
    );

    const handleAddCart = async () => {
        const supabase = createBrowserSupabaseClient();

        const { data: { session }, error: sessionError } =
            await supabase.auth.getSession();

        if (sessionError) {
            console.error(sessionError);
            return;
        }

        const user = session?.user;

        if (!user) {
            setLogInError(true)
            return;
        }

        if (!selectedVariant || selectedVariant.stock <= 0) return;

        if (isInCart) {
            return;
        }

        const { data: addToCart, error: addCartError } = await supabase
            .from('user_cart')
            .insert({
                user_id: user.id,
                product_id: selectedVariant.product_id,
                product_variant_id: selectedVariant.id,
                quantity: 1
            });
        if (addCartError) {
            console.error(addCartError);
            return;
        }

        router.refresh();
        setQuantity(1);
        setIsInCart(true);
    }


    const handleIncrease = async () => {
        if (!selectedVariant || quantity >= selectedVariant.stock) return;

        const supabase = createBrowserSupabaseClient();

        const { data: { session }, error: sessionError } =
            await supabase.auth.getSession();

        if (sessionError) {
            console.error(sessionError);
            return;
        }

        const user = session?.user;

        if (!user) {
            return;
        }

        const newQuantity = quantity + 1;

        const { error } = await supabase
            .from('user_cart')
            .update({
                quantity: newQuantity
            })
            .eq('user_id', user.id)
            .eq('product_variant_id', selectedVariant.id);

        if (error) {
            console.error(error);
            return;
        }

        setQuantity(newQuantity);
        router.refresh();
    };



    const handleDecrease = async () => {
        if (quantity <= 0 || !selectedVariant) return;

        const supabase = createBrowserSupabaseClient();

        const { data: { session }, error: sessionError } =
            await supabase.auth.getSession();

        if (sessionError) {
            console.error(sessionError);
            return;
        }

        const user = session?.user;

        if (!user) {
            return;
        }

        if (quantity === 1) {
            const { error } = await supabase
                .from('user_cart')
                .delete()
                .eq('user_id', user.id)
                .eq('product_variant_id', selectedVariant.id);

            if (error) {
                console.error(error);
                return;
            }

            setQuantity(0);
            setIsInCart(false);
            return;
        }

        const newQuantity = quantity - 1;

        const { error } = await supabase
            .from('user_cart')
            .update({
                quantity: newQuantity
            })
            .eq('user_id', user.id)
            .eq('product_variant_id', selectedVariant.id);

        if (error) {
            console.error(error);
            return;
        }

        setQuantity(newQuantity);
        router.refresh();
    };


    return (
        <div className="">
            <div className="">
                <p className="text-lg leading-5 text-primary-70 mb-4 ">رنگ: <span className="text-primary font-bold">{selectedVariant?.colors?.title}</span></p>
                <div className="flex items-center gap-4 mb-12 ">
                    {uniqueColors.map((color) => {
                        const isSelected = selectedVariant?.color_id === color.id;

                        return (
                            <div onClick={() => {
                                const newVariant = variants.find(
                                    (variant) =>
                                        variant.color_id === color.id &&
                                        variant.size_id === selectedVariant?.size_id
                                );

                                if (newVariant) {
                                    setSelectedVariant(newVariant)
                                }
                            }} key={color.id} className={` w-fit rounded-lg ${isSelected ? 'border border-primary-80 p-2 ' : ''}`}>
                                <div
                                    className={`w-18.25 h-10 rounded-lg ${isSelected ? 'rounded-md' : ''} border border-primary-20 `}
                                    style={{ backgroundColor: `#${color.value}` }}
                                />
                            </div>
                        )
                    })}
                </div>
                {selectedVariant?.sizes &&
                    <div className="">
                        <p className="text-lg leading-5 text-primary-70 mb-4 ">سایز: <span className="text-primary font-bold">{selectedVariant?.sizes?.title}</span></p>
                        <div className="flex items-center justify-around  mb-12  ">
                            {uniqueSizes.map((size) => {
                                const isSelected = selectedVariant?.size_id === size?.id;
                                return (
                                    <div onClick={() => {
                                        const newVariant = variants.find(
                                            (variant) =>
                                                variant.size_id === size?.id &&
                                                variant.color_id === selectedVariant?.color_id
                                        );
                                        if (newVariant) {
                                            setSelectedVariant(newVariant)
                                        }
                                    }} key={size?.id} className={`w-18.5 h-10 flex items-center justify-center border border-primary-20 rounded-lg text-primary-80 ${isSelected ? 'border-primary-100 text-primary-100 bg-primary-40' : ''} `}>
                                        {size?.title}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                <div className="">
                    <p className="text-xl leading-7.5 mb-3"> قیمت: {selectedVariant?.price.toLocaleString('fa-IR')} تومان </p>
                    {logInError && <ErrorBox message="لطفا ابتدا وارد حساب کاربری خود شوید" />}
                    {isInCart
                        ? <div className="flex items-center border border-primary-90 text-primary-90 rounded-lg w-fit ">
                            <span onClick={handleDecrease} className=" p-4 border-l border-primary-90 "><SvgDecrease /></span>
                            <span className="p-4">{quantity}</span>
                            <span onClick={handleIncrease} className="p-4 border-r border-primary-90 "><SvgIncrease /></span>
                        </div>
                        : <p onClick={handleAddCart} className="text-lg leading-6 bg-primary-90 py-4 px-20 rounded-lg  text-white ">افزودن به سبد خرید</p>
                    }
                </div>

            </div>
        </div>
    )
};
