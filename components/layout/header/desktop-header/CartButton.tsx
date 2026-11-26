'use client'

import SvgCartBag from "@/components/icons/CartBag"
import { useCart } from "@/components/user-cart/CartProvider";
import DesktopUserCart from "@/components/user-cart/DesktopUserCart";
import { useState } from "react";

type Props = {
    isUser: boolean
}

export default function CartButton({ isUser }: Props) {

    const { cart } = useCart()
    const [open, setOpen] = useState(false);

    return (
        <div className="">
            <div onClick={() => setOpen(prev => !prev)} className="relative bg-primary-30 py-2 px-4 rounded-lg">
                {isUser && cart.length >= 1 && <p className="absolute -top-3.5 -right-2 bg-primary-90 text-primary-10 py-0.5 px-2 rounded-full ">{cart.length}</p>}
                <div className="">
                    <SvgCartBag />
                </div>
            </div>
            <DesktopUserCart open={open} setOpen={setOpen} />
        </div>
    )
};
