'use client'

import { createBrowserSupabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect } from "react"

type Props = {
    fullName: string | null,
    setFullName: Dispatch<SetStateAction<string | null>>,
    phone: string | null,
    setPhone: Dispatch<SetStateAction<string | null>>
}

export default function CheckoutAddUserInformation({
    fullName,
    setFullName,
    phone,
    setPhone
}: Props) {

    const supabase = createBrowserSupabaseClient();

    const router = useRouter();

    useEffect(() => {


        const checkName = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/');
                alert('لطفا وارد حساب کاربری خود شوید')
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .select(`*`)
                .eq('user_id', user.id)
                .eq('status','pending')
                .maybeSingle();

            if (error) {
                console.error(error)
                return;
            }

            if (data?.recipient_name) {
                setFullName(data.recipient_name);
            } else {
                setFullName(null);
            }
            if (data?.recipient_phone) {
                setPhone(data.recipient_phone)
            } else {
                setPhone(null)
            }
        }

        checkName()
    }, [])

    return (
        <div className="">
            <div className="mt-4 flex flex-col">
                <label htmlFor="recipient-name" className="flex mb-2 text-sm font-light ">نام و نام خانوادگی</label>
                <input value={fullName ?? ''} onChange={(e) => setFullName(e.target.value)} placeholder={fullName ? fullName : 'نام و نام خانوادگی'} id="recipient-name" type="text" className="outline-0 w-full p-4 border border-primary-20 rounded-[10px] " />
            </div>
            <div className="mt-4 flex flex-col">
                <label htmlFor="recipient-name" className="flex mb-2 text-sm font-light ">شماره موبایل</label>
                <input value={phone ?? ''} onChange={(e) => setPhone(e.target.value)} placeholder={phone ? phone : 'شماره موبایل'} id="recipient-name" type="tel" className="outline-0 w-full p-4 border border-primary-20 rounded-[10px] text-right " />
            </div>

        </div>
    )
};
