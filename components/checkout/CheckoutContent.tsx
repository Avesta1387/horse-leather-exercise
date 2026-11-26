'use client'

import { useEffect, useState } from "react"
import CheckoutAddUserInformation from "./CheckoutAddUserInformation"
import CheckoutUserAddress from "./CheckoutUserAddress"
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { error } from "console";


type Province = {
    id: number,
    title: string
};

type City = {
    id: number,
    title: string,
    province_id: number
}

type Invoice = {
    id: number,
    product_discount: number | null,
    subtotal: number | null,
    discount_amount: number | null,
    total_price: number | null,
    shipping_cost: number | null,
}

type Props = {
    id: number
}

export default function CheckoutContent({ id }: Props) {

    const router = useRouter();

    const [fullName, setFullName] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [provinces, setProvinces] = useState<Province[] | null>(null);
    const [cities, setCities] = useState<City[] | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [postalCode, setPostalCode] = useState<string | null>(null);
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [plate, setPlate] = useState<string | null>(null)
    const [unit, setUnit] = useState<string | null>(null);
    const [isInvoice, setIsInvoice] = useState(false)
    const [orderInvoice, setOrderInvoice] = useState<Invoice | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [goPaymentError, setGoPaymentError] = useState<string | null>(null);

    const supabase = createBrowserSupabaseClient();

    useEffect(() => {
        if (!Number.isSafeInteger(id) || id <= 0) {
            console.error('Invalid order ID:', id);
            return;
        }

        const getPrice = async () => {
            const { data, error } = await supabase
                .from('orders')
                .select(`*`)
                .eq('id', id)
                .maybeSingle();

            if (error) {
                console.error(error)
                return;
            }
            if (!data) {
                alert('سفارشی با این مقادیر وجود ندارد')
                return;
            }

            setIsInvoice(true);
            setOrderInvoice(data);
        }

        getPrice();
    }, [id]);

    const handleGoToPayment = async () => {
        setIsLoading(true);


        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/')
                alert('لطفا وارد حساب کاربری خود شوید');
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .update({
                    recipient_name: fullName,
                    recipient_phone: phone,
                    province: selectedProvince,
                    city: selectedCity,
                    postal_code: postalCode,
                    address: address,
                    plate: plate,
                    unit: unit,
                    status: 'pending'
                })
                .eq('user_id', user?.id)
                .eq('id', id)
                .select()
                .maybeSingle();
            if (error) throw error;
            if (!data) {
                alert('سفارشی با این شناسه وجود ندارد')
                return;
            }

            router.push(`/payment/${id}`)
        } catch (error) {
            console.error(error)
            setGoPaymentError('انجام سفارش با مشکل مواجه شد');
            return;
        } finally {
            setIsLoading(false)
            setGoPaymentError(null)
        }
    }


    return (
        <div className="flex items-start justify-between gap-4">
            <div className="w-2/3">
                <CheckoutAddUserInformation fullName={fullName} setFullName={setFullName} phone={phone} setPhone={setPhone} />
                <CheckoutUserAddress
                    plate={plate}
                    unit={unit}
                    provinces={provinces}
                    cities={cities}
                    address={address}
                    postalCode={postalCode}
                    selectedProvince={selectedProvince}
                    selectedCity={selectedCity}
                    setProvinces={setProvinces}
                    setCities={setCities}
                    setAddress={setAddress}
                    setPostalCode={setPostalCode}
                    setSelectedProvince={setSelectedProvince}
                    setSelectedCity={setSelectedCity}
                    setPlate={setPlate}
                    setUnit={setUnit}
                />
            </div>
            <div className="w-1/3">
                {orderInvoice && (
                    <div className="p-3 border border-primary-20 rounded-xl flex flex-col gap-4 mt-4 ">
                        <p>صورت حساب</p>

                        <div className="flex flex-col gap-3 border-b border-primary-40 pb-2">
                            <div className="flex justify-between text-sm text-primary-70">
                                <span>جمع محصولات</span>
                                <span>
                                    {(orderInvoice.subtotal ?? 0).toLocaleString('fa-IR')} تومان
                                </span>
                            </div>

                            {(orderInvoice.product_discount ?? 0) > 0 && (
                                <div className="flex justify-between text-sm text-primary-70">
                                    <span>تخفیف محصولات</span>
                                    <span>
                                        {orderInvoice.product_discount!.toLocaleString('fa-IR')} تومان
                                    </span>
                                </div>
                            )}

                            {(orderInvoice.discount_amount ?? 0) > 0 && (<div className="flex justify-between text-sm text-primary-70">
                                <span>تخفیف کد تخفیف</span>
                                <span>
                                    {orderInvoice.discount_amount!.toLocaleString('fa-IR')} تومان
                                </span>
                            </div>)}

                            <div className="flex justify-between text-sm text-primary-70">
                                <span>هزینه ارسال</span>
                                <span>
                                    {(orderInvoice.shipping_cost ?? 0).toLocaleString('fa-IR')} تومان
                                </span>
                            </div>


                        </div>
                        <div className="flex justify-between border-t border-primary-20 pt-3 font-semibold">
                            <span>مبلغ قابل پرداخت</span>
                            <span>
                                {(orderInvoice.total_price ?? 0).toLocaleString('fa-IR')} تومان
                            </span>
                        </div>
                    </div>
                )}

                <button onClick={handleGoToPayment} disabled={isLoading} type="button" className=" mt-4 p-4 flex items-center justify-center w-full bg-primary-90 rounded-xl text-white ">
                    {isLoading ? <Spinner /> : 'پرداخت'}
                </button>
            </div>
        </div >
    )
};
