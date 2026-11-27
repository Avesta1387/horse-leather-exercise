'use client';

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import UserOrderBox from "./UserOrderBox";
import SvgCartBag from "@/components/icons/CartBag";




type Order = {
    id: number,
    created_at: string,
    status: string,
    total_price: number,
    order_items: OrderItem[],
    subtotal: number,
    product_discount: number,
    discount_amount: number,
    shipping_cost: number,
    order_number: number
}

type Product = {
    id: string,
    images: string[]
}

type OrderItem = {
    id: number,
    product_id: string,
    products: Product
}

type Props = {
    userId: string
}

export default function UserOrdersSection({ userId }: Props) {



    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const supabase = createBrowserSupabaseClient();

        const getOrders = async () => {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                            *,
                            order_items (
                                *,
                                products (
                                    id,
                                    images
                                )
                            )
                        `)
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error(error)
                return;
            }

            if (!data) {
                setOrders([]);
                return;
            }

            setOrders(data)
        }

        getOrders()
    }, [userId]);

    const supabase = createBrowserSupabaseClient();
    const ordersWithImage = (orders ?? []).map((order) => {
        const mainImage = order.order_items[0]?.products.images?.find(
            (image: string) => !/-\d+\./.test(image)
        );


        const imageUrl = mainImage
            ? supabase.storage
                .from("products_images")
                .getPublicUrl(mainImage).data.publicUrl
            : null;

        return {
            ...order,
            image: imageUrl,
        };
    });

    return (
        <div className=" mt-4 py-2.5 px-4 bg-primary-20 rounded-2xl">

            {ordersWithImage.length > 0
                ? <>
                    <div className="hidden lg:flex gap-20 justify-center items-center leading-6 font-semibold bg-primary-30 py-3 ">
                        <p className="">سفارش</p>
                        <p className="">تاریخ</p>
                        <p className="">وضعیت</p>
                        <p className="">مجموع</p>
                    </div>
                    {ordersWithImage.map((order, index) => (
                        <UserOrderBox
                            key={order.id}
                            index={index}
                            id={order.id}
                            imageUrl={order.image ?? null}
                            orderNum={order.order_number}
                            createdAt={order.created_at}
                            status={order.status}
                            total={order.total_price}
                            shippingCost={order.shipping_cost}
                            subtotal={order.subtotal}
                            product_discount={order.product_discount}
                            discount_amount={order.discount_amount}
                        />
                    ))}
                </>
                : <div className="flex items-center flex-col justify-center">
                    <SvgCartBag className="w-50 h-50 lg:h-100 text-primary-60 " />
                    <p className="lg:mb-20 lg:text-2xl text-primary-70">خریدی نداشته اید</p>

                </div>
            }
        </div>
    )
};
