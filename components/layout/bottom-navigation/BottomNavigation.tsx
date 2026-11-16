'use client'

import SvgCartBag from "@/components/icons/CartBag";
import SvgHeart from "@/components/icons/Heart";
import SvgProfile from "@/components/icons/Profile";
import SvgShop from "@/components/icons/Shop";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";



export default function BottomNavigation() {

    const router = useRouter();
    const supabase = createBrowserSupabaseClient();

    const handleProfileClick = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if(!error){
            console.log('GOING TO PROFILE/LOGIN PAGE ERROR: ',error);
            return;
        };

        if(user){
            router.push('/');
        }else{
            router.push('/log-in')
        };
        return;
    }

    return (
        <div className="fixed w-full mt-10 h-19 bottom-0 bg-primary-30 z-40 flex justify-between py-2 px-4 md:hidden ">
            <div className="flex flex-col items-center justify-center gap-1">
                <SvgShop />
                <p className="text-sm leading-6 font-medium">فروشگاه</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
                <SvgHeart />
                <p className="text-sm leading-6 font-medium">علاقه مندی ها</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
                <SvgCartBag />
                <p className="text-sm leading-6 font-medium">سبد خرید</p>
            </div>
            <div onClick={handleProfileClick} className="flex flex-col items-center justify-center gap-1">
                <SvgProfile />
                <p className="text-sm leading-6 font-medium">حساب کاربری</p>
            </div>
        </div>
    )
};
