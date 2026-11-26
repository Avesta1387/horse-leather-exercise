'use client'

import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import DesktopCartWrapper from "./DesktopCartWrapper";
import { useCart } from "./CartProvider";
import SvgCartBag from "../icons/CartBag";

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function DesktopUserCart({ open, setOpen }: Props) {

    const ref = useRef<HTMLDivElement | null>(null);
    const { cart } = useCart();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            };
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <>
            {open && (
                <div className="fixed inset-x-0 top-48.25 bottom-0 z-40 bg-primary-90/30 flex justify-center overflow-hidden">
                    <div ref={ref} className="bg-white w-4/5 h-fit max-h-[calc(100dvh-13rem)] overflow-y-auto hide-scrollbar rounded-2xl p-4 mt-4 mb-4">
                        {cart.length < 1
                            ? <div className="h-100 flex items-center flex-col gap-4 justify-center">
                                <SvgCartBag className="w-50 h-50 text-primary-60 " />
                                <p className="">محصولی در سبد خرید خود ندارید</p>

                            </div>
                            : <DesktopCartWrapper />
                        }
                    </div>
                </div>
            )}
        </>
    )
};