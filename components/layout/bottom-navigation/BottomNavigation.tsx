import SvgCartBag from "@/components/icons/CartBag";
import SvgHeart from "@/components/icons/Heart";
import SvgProfile from "@/components/icons/Profile";
import SvgShop from "@/components/icons/Shop";



export default function BottomNavigation() {
    return (
        <div className="fixed w-full mt-10 h-19 bottom-0 bg-primary-30 z-40 flex justify-between py-2 px-4 md:hidden ">
            <div className="flex flex-col items-center justify-center gap-1">
                <SvgShop />
                <p className="text-sm leading-6 font-medium">فروشگاه</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
                <SvgHeart/>
                <p className="text-sm leading-6 font-medium">علاقه مندی ها</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
                <SvgCartBag/>
                <p className="text-sm leading-6 font-medium">سبد خرید</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
                <SvgProfile/>
                <p className="text-sm leading-6 font-medium">حساب کاربری</p>
            </div>
        </div>
    )
};
