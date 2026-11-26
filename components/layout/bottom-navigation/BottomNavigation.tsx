'use client'

import SvgCartBag from "@/components/icons/CartBag";
import SvgHeart from "@/components/icons/Heart";
import SvgProfile from "@/components/icons/Profile";
import SvgShop from "@/components/icons/Shop";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Cart = {
    created_at: string,
    id: string,
    user_id: string,
    product_id: string,
    product_variant: string,
    quantity: number
}

export default function BottomNavigation() {

    const router = useRouter();
    const supabase = createBrowserSupabaseClient();
    const [isUser, setIsUser] = useState(false);

    const [cart, setCart] = useState<Cart[]>([]);

    useEffect(() => {
        const checkCart = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                if (error.name === 'AuthSessionMissingError') {
                    setIsUser(false);
                    setCart([]);
                    return;
                }

                console.error(error);
                return;
            }

            if (!user) {
                setIsUser(false);
                setCart([]);
                return;
            }

            setIsUser(true)
            const { data, error: cartError } = await supabase
                .from('user_cart')
                .select('*');

            if (cartError) {
                console.error(cartError);
                return;
            }

            setCart(data ?? []);
        };

        checkCart();
    }, []);

    const handleProfileClick = async () => {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        if (error) {
            if (error.name === 'AuthSessionMissingError') {
                router.push('/log-in');
                return;
            }

            console.error('GET USER ERROR:', error);
            return;
        }

        if (!user) {
            router.push('/log-in');
            return;
        }

        router.push('/profile');
    };



    return (
        <div className="fixed w-full mt-10 h-19 bottom-0 bg-primary-30 z-40 flex justify-between py-2 px-4 md:hidden ">
            <Link href="/" className="flex flex-col items-center justify-center gap-1">
                <SvgShop />
                <p className="text-sm leading-6 font-medium">فروشگاه</p>
            </Link>
            <div className="flex flex-col items-center justify-center gap-1">
                <SvgHeart />
                <p className="text-sm leading-6 font-medium">علاقه مندی ها</p>
            </div>
            <Link href={`${isUser ? '/user-cart' : '/log-in'}`} className=" relative flex flex-col items-center justify-center gap-1">
                {isUser && cart.length >= 1 && (
                    <div className="absolute text-xs bg-primary-100 text-primary-10 py-0.5 px-1.5 rounded-full -top-1 -right-px">
                        {cart.length}
                    </div>
                )}
                <SvgCartBag />
                <p className="text-sm leading-6 font-medium">سبد خرید</p>
            </Link>
            <div onClick={handleProfileClick} className="flex flex-col items-center justify-center gap-1">
                <SvgProfile />
                <p className="text-sm leading-6 font-medium">حساب کاربری</p>
            </div>
        </div>
    )
};
