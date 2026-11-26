
'use client'

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useCart } from "./CartProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

export default function UserCartContinue() {
    const router = useRouter();

    const {
        totalPrice,
        appliedDiscount,
        isCartEmpty
    } = useCart();

    const [continueLoading, setContinueLoading] = useState(false);
    const [codeError, setCodeError] = useState<string | null>(null);

    const handleContinue = async () => {
        if (continueLoading) return;

        setContinueLoading(true);
        setCodeError(null);

        try {
            const supabase = createBrowserSupabaseClient();

            const {
                data: { user },
                error: userError
            } = await supabase.auth.getUser();

            if (userError || !user) {
                router.push('/log-in');
                return;
            }

            if (isCartEmpty) {
                router.push('/user-cart');
                return;
            }

            const { data: orderId, error } = await supabase.rpc(
                'create_order_from_cart',
                {
                    p_discount_code_id: appliedDiscount?.id ?? null
                }
            );

            if (error) throw error;

            if (!orderId) {
                throw new Error('Order ID was not returned');
            }

            router.push(`/checkout/${orderId}`);

        } catch (error) {
            console.error('Order creation error:', error);
            setCodeError('ثبت سفارش با مشکل مواجه شد. لطفاً دوباره تلاش کنید.');
        } finally {
            setContinueLoading(false);
        }
    };

    return (
        <div>
            <div className="fixed bottom-19 w-full h-30 z-40 bg-white pt-2.5 pb-2 px-4 border-t border-primary-80 right-0
                lg:relative lg:bottom-0 lg:border lg:border-primary-20 lg:w-71.75 lg:rounded-xl">

                <p className="mb-5 flex items-center justify-between">
                    مبلغ قابل پرداخت
                    <span className="text-[10px]">
                        <span className="text-xl font-bold">
                            {totalPrice.toLocaleString('fa-IR')}
                        </span>
                        تومان
                    </span>
                </p>

                {codeError && (
                    <p className="text-xs text-red-500 mb-2">
                        {codeError}
                    </p>
                )}

                <button
                    disabled={continueLoading}
                    onClick={handleContinue}
                    className="mb-2 w-full py-2.5 bg-primary-90 rounded-lg text-white text-sm"
                >
                    {!continueLoading ? 'ادامه' : <Spinner />}
                </button>
            </div>
        </div>
    );
}
