'use client';

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Props = {
    userId: string
    isOrder: boolean
}

type OrderBoxProps = {
    orderNumber: number,
    date: string,
    status: string,
    total: number,
    index: number
}

type orders = {
    id: number,
    created_at: string,
    total_price: number,
    status: string,
    order_number: number
}

const OrderBox = ({ orderNumber, date, status, total, index }: OrderBoxProps) => {

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
        <div className={` flex items-center gap-4 py-4 px-3.5 ${index % 2 !== 0 ? 'bg-primary-30' : 'bg-primary-20'} text-xs leading-6 font-medium  justify-between `} >
            <p className="">#{orderNumber}</p>
            <p className="">{jalaliDate(date)}</p>
            <p className="">{newStatus(status)}</p>
            <p className="">{total.toLocaleString('fa-IR')}تومان</p>
        </div>
    )
}

export default function CounterLatestOrders({ userId, isOrder }: Props) {

    const [orders, setOrders] = useState<orders[]>([]);

    const supabase = createBrowserSupabaseClient();


    useEffect(() => {
        const getOrders = async () => {
            const { data, error } = await supabase
                .from('orders')
                .select(`*`)
                .eq('user_id', userId);

            if (error) {
                console.error(error);
                return;
            }

            if (!data) {
                alert('سفارشی با این حساب ثبت نشده است')
                return;
            }

            setOrders(data)
        }

        getOrders()
    }, [])

    return (
        <>
            {isOrder
                ? (
                    <div className="bg-primary-20 rounded-2xl mt-4 overflow-auto ">
                        <p className="p-4 text-lg leading-8 ">سفارشات اخیر شما</p>
                        <div className="">
                            <div className="flex items-center justify-around bg-primary-30 py-4 px-3.5 text-xs leading-6 font-bold  ">
                                <p className="">کد سفارش</p>
                                <p className="">تاریخ</p>
                                <p className="">وضعیت</p>
                                <p className="">جمع</p>
                            </div>
                            {orders.map((order, index) => (
                                <OrderBox
                                    key={order.id}
                                    date={order.created_at}
                                    status={order.status}
                                    orderNumber={order.order_number}
                                    index={index}
                                    total={order.total_price}
                                />
                            ))}
                        </div>
                    </div>
                )
                : <div className="bg-primary-20 rounded-2xl mt-4 overflow-auto ">
                    <p className="p-4 text-lg leading-8 ">سفارشی ندارید</p>
                </div>
            }
        </>
    )
};
