'use client'

import { createBrowserSupabaseClient } from "@/lib/supabase/client"
import { count, error } from "console"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import CounterLatestOrders from "./CounterLatestOrders"


type ProfileCounter = {
    userId: string,
    onSectionChange: (section: string) => void;
}

type QuickAccessBox = {
    title: string,
    imageUrl: string,
    value: string,
    subTitle: string
    onSectionChange: (section: string) => void;
}

const QuickAccessBox = ({ title, imageUrl, value, subTitle, onSectionChange }: QuickAccessBox) => {
    return (
        <div onClick={() => onSectionChange(value)} className=" lg:cursor-pointer w-34.25 h-35 bg-primary-30 rounded-lg relative pt-13.75 flex flex-col items-center mt-12 ">
            <div className="absolute -top-2/5 ">
                <div className="relative w-30 h-30">
                    <Image src={imageUrl} unoptimized fill className="object-fill" alt={`تصویر بک گراند ${subTitle}`} />
                </div>
            </div>
            <p className=" text-lg leading-8 text-center ">{title}</p>
            <p className=" text-sm leading-5.5 text-center ">{subTitle}</p>
        </div>
    )
}

export default function ProfileCounterSection({ userId, onSectionChange }: ProfileCounter) {

    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<number>(0);

    useEffect(() => {
        const getUser = async () => {
            const supabase = createBrowserSupabaseClient();

            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.log('GET USER ERROR:', error);
                return;
            }

            setUser(user);
        };

        const getUserOrders = async () => {
            const supabase = createBrowserSupabaseClient();

            const { count, error: getOrdersError } = await supabase
                .from('orders')
                .select('id', { count: 'exact', head: true })
                .eq('user_id', userId);

            if (getOrdersError) {
                console.log(getOrdersError)
                return;
            }
            setOrders(count ?? 0)
        }


        getUserOrders();
        getUser();
    }, [userId]);

    const avatarUrl = user?.avatar_url || null;

    return (
        <div className="">
            <div className=" p-4 bg-primary-20 rounded-2xl mt-4 ">
                <div className="flex items-center gap-2 mb-5">
                    <div className="relative w-15 h-15 rounded-full overflow-auto ">
                        {avatarUrl && <Image src={avatarUrl} alt="تصویر اواتار کاربر" fill className="object-fill" unoptimized />}
                    </div>
                    <div className="">
                        <p className=" text-sm leading-6 ">{user?.first_name ? user.first_name : 'کاربر جدید'}</p>
                        <p className="text-xs leading-5.5">دسترسی سریع</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4  ">
                    <QuickAccessBox
                        onSectionChange={onSectionChange}
                        title={orders > 0 ? `${orders} سفارش` : "سفارشی ندارید"}
                        subTitle="تعداد سفارشات"
                        value="user-orders"
                        imageUrl="/images/banners-and-backgrounds/orders-number-bg.png"
                    />
                    <div className="mt-12">
                        <Link href={'/contact-us'} className="w-34.25 h-35 bg-primary-30 rounded-lg relative pt-18.75 flex flex-col items-center  ">
                            <div className="absolute -top-2/5">
                                <div className="relative w-30 h-30">
                                    <Image src={'/images/banners-and-backgrounds/support-bg.png'} unoptimized fill className="object-fill" alt={`تصویر بک گراند پشتیبانی فنی`} />
                                </div>
                            </div>

                            <p className="text-lg leading-8">پشتیبانی فنی</p>
                            <p className=" text-sm leading-5.5 ">اطلاعات تماس با ما</p>
                        </Link>
                    </div>
                    <QuickAccessBox
                        onSectionChange={onSectionChange}
                        title="ویرایش اطلاعات"
                        subTitle="ویرایش حساب کاربری"
                        value='edit-user-information'
                        imageUrl="/images/banners-and-backgrounds/edit-informations.png"
                    />
                    <QuickAccessBox
                        onSectionChange={onSectionChange}
                        title="سفارشات شما"
                        subTitle="مشاهده و پیگیری سفارشات"
                        value="user-orders"
                        imageUrl="/images/banners-and-backgrounds/orders-bg.png"
                    />
                </div>
            </div>
            <div className="">
                <CounterLatestOrders isOrder={orders > 0} userId={userId} />
            </div>
        </div>
    )
};
