'use client'

import { useCart } from "./CartProvider";




export default function UserCartInvoice() {

    const { totalPrice, productDiscount, discountAmount, subtotal } = useCart();

    return (
        <div className="p-3 rounded-xl border border-primary-20 w-full ">
            <p className="font-extrabold mb-6 text-base">صورتحساب</p>
            <div className="pb-4 border-b border-primary-20">
                <p className="flex items-center justify-between text-sm text-primary-50 ">
                    جمع محصولات
                    <span className=""><span className="text-base text-primary-70">{subtotal.toLocaleString('fa-IR')}</span> تومان </span>
                </p>
                {productDiscount > 0 && <p className="flex items-center justify-between text-sm text-primary-50 ">
                    تخفیف محصولات
                    <span className=""><span className="text-base text-primary-70">-{productDiscount.toLocaleString('fa-IR')}</span> تومان </span>
                </p>}
                {discountAmount > 0 && <p className="flex items-center justify-between text-sm text-primary-50 ">
                    کد تخفیف
                    <span className=""><span className="text-base text-primary-70">-{discountAmount.toLocaleString('fa-IR')}</span> تومان </span>
                </p>}
            </div>
            <p className="flex items-center justify-between mt-4">
                جمع کل
                <span className=""><span className="">{totalPrice.toLocaleString('fa-IR')}</span> تومان</span>
            </p>
        </div>
    )
};
