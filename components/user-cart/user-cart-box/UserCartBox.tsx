'use client'

import SvgDecrease from "@/components/icons/Decrease";
import SvgIncrease from "@/components/icons/Increase";
import Image from "next/image";
import { useCart } from "../CartProvider";


type CartBox = {
    id: string,
    imageUrl: string | null;
    title: string;
    size?: string | number;
    color: string;
    price: number;
    quantity: number;
    discount?: number;
    colorValue?: string | null;
}

export default function CartBox({
    id,
    imageUrl,
    title,
    size,
    color,
    price,
    quantity,
    discount,
    colorValue
}: CartBox) {

    const newPrice = discount
        ? price - (price * discount / 100)
        : price;

    const { updateQuantity, isCartLoading, removeProduct } = useCart();

    return (
        <div className="p-3 border border-primary-30 rounded-xl lg:w-full">
            <div className="flex items-start gap-2 mb-5">
                {imageUrl && (
                    <div className="relative w-25 h-31 rounded-[10px] overflow-auto ">
                        <Image src={imageUrl} alt={`تصویر ${title}`} fill unoptimized className="object-fill" />
                    </div>
                )}
                <div className="">
                    <p className="leading-6 font-bold">{title}</p>
                    {size && <p className="">سایز: <span className="">{size}</span></p>}
                    <p className="">رنگ: <span className="">{color} <span className="w-10 h-10 rounded-full mr-2" style={{ background: `#${colorValue}` }}></span> </span></p>
                </div>
            </div>
            <div className="flex items-center gap-23.5 lg:justify-between">
                <div className="flex items-center gap-1">
                    <button disabled={isCartLoading} onClick={() => {
                        quantity <= 1
                            ? removeProduct(id)
                            : updateQuantity(id, quantity - 1)
                    }} className="p-2 border border-primary-30 rounded-lg ">
                        <SvgDecrease />
                    </button>
                    <p className="py-2 px-4 border border-primary-30 rounded-lg">
                        {quantity}
                    </p>
                    <button disabled={isCartLoading} onClick={() => updateQuantity(id, quantity + 1)} className="p-2 border border-primary-30 rounded-lg ">
                        <SvgIncrease />
                    </button>
                </div>
                <div className="">
                    {discount
                        ? <div className="">
                            <p className="leading-6">{newPrice.toLocaleString('fa-IR')} <span className="text-[8px] leading-3 text-primary-80">تومان</span></p>
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] text-alert-50 p-1.25 bg-alert-20">{discount}%</p>
                                <p className="text-sm text-primary-80 line-through ml-6">{price}</p>
                            </div>
                        </div>
                        : <p className="leading-6">{price.toLocaleString('fa-IR')} <span className="text-[8px] leading-3 text-primary-80">تومان</span></p>

                    }
                </div>
            </div>
        </div>
    )
}