'use client';

import Link from "next/link";
import SvgAngleLeft from "../icons/AngleLeft";
import CartContent from "./CartContent";



export default function DesktopCartWrapper() {
    return (
        <div className="">
            <div className="flex items-center gap-2 mb-3 ">
                <Link href={'/'} className="text-xs leading-4 text-primary-70 " >
                    خانه
                </Link>
                <SvgAngleLeft className="w-1 h-2 text-primary-70" />
                <Link href={'/user-cart'} className="text-xs leading-4 text-primary-70 " >
                    سبد خرید
                </Link>
            </div>
            <CartContent />
        </div>
    )
};
