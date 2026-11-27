'use client';

import Image from "next/image";


type Props = {
    id: number,
    imageUrl: string | null,
    orderNum: number,
    createdAt: string,
    status: string,
    total: number,
    shippingCost?: number,
    subtotal: number,
    product_discount: number,
    discount_amount?: number,
    index: number
}

export default function UserOrderBox({
    id,
    imageUrl,
    orderNum,
    createdAt,
    status,
    total,
    shippingCost,
    subtotal,
    product_discount,
    discount_amount,
    index
}: Props) {

    const jalaliDate = (date: string) => {
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date));
    };

    const newStatus = (status: string) => {
        if (status === 'paid') return 'پرداخت موفق';
        if (status === 'pending') return 'در انتظار پرداخت';
        if (status === 'expired') return 'تمام شدن مهلت پرداخت';
        if (status === 'cancelled') return 'لغو شده';
        if (status === 'processing') return 'درحال آماده سازی';
        if (status === 'shipped') return 'ارسال شده';
        if (status === 'delivered') return 'تحویل شده'
    }

    return (
        <div className={`${index % 2 !== 0 ? 'border-t  border-primary-100 mt-4 pt-4' : ''} flex items-center gap-4 py-4  `}>
            {imageUrl && <div className="relative w-20 h-25 rounded-md border-4 border-primary-30 ">
                <Image src={imageUrl} alt="تصویر محصول سفارش" fill unoptimized className="object-fill" />
            </div>}
            <div className="flex items-center justify-between w-full">
                <div className="leading-6 font-semibold flex flex-col gap-2 lg:hidden ">
                    <p className="">سفارش: </p>
                    <p className="">تاریخ: </p>
                    <p className="">وضعیت:</p>
                    <p className="">مجموع:</p>
                </div>
                <div className="leading-6 flex flex-col gap-2 items-end lg:flex-row justify-around w-full mx-auto px-30.5">
                    <p className="">#{orderNum}</p>
                    <p className="">{jalaliDate(createdAt)}</p>
                    <p className="">{newStatus(status)}</p>
                    <p className="">{total.toLocaleString('fa-IR')} تومان</p>
                </div>
            </div>
        </div>
    )
};
