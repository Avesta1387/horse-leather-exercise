'use client'

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { Spinner } from "../ui/spinner";

type Props = {
    orderId: number,
    userId: string
}

export default function PaymentContent({ orderId, userId }: Props) {


    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const supabase = createBrowserSupabaseClient();

    if (!Number.isSafeInteger(orderId) || orderId <= 0) {
        return null;
    }

    const handleClickSuccess = async () => {
        setIsLoading(true)
        const { data, error } = await supabase
            .from('orders')
            .update({
                status: 'paid'
            })
            .eq('user_id', userId)
            .eq('id', orderId)
            .eq('status', 'pending')
            .select()
            .maybeSingle();

        if (error) {
            console.error(error);
            setIsLoading(false)
            return;
        }
        if (!data) {
            alert('سفارشی با این شناسه وجود ندارد')
            router.push('/')
        }
        setIsLoading(false)
        router.push('/')
    }

    const handleClickUnsuccess = async () => {
        setIsLoading(true)
        const { data, error } = await supabase
            .from('orders')
            .update({
                status: 'expired'
            })
            .eq('user_id', userId)
            .eq('status', 'pending')
            .eq('id', orderId)
            .select()
            .maybeSingle();

        if (error) {
            console.error(error);
            setIsLoading(false)
            return;
        }
        if (!data) {
            alert('سفارشی با این شناسه وجود ندارد')
            router.push('/')
        }
        setIsLoading(false)
        router.push('/')
    }

    return (
        <div className="">
            <div className=" flex items-center gap-2 ">
                <button onClick={handleClickSuccess} disabled={isLoading} className="p-4 border border-primary-100 rounded-xl bg-primary-60 text-white">{isLoading ? <Spinner /> : "موفق"}</button>
                <button onClick={handleClickUnsuccess} disabled={isLoading} className=" p-4 border border-primary-100 rounded-xl bg-primary-60 text-white">{isLoading ? <Spinner /> : "ناموفق"}</button>
            </div>
        </div>
    )
};
