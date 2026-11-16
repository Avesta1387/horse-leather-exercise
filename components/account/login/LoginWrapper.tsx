'use client';

import SvgArrowRight from "@/components/icons/ArrowRight";
import { Dispatch, SetStateAction, useState } from "react";
import InsertPhoneStep from "./InsertPhoneStep";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import InsertOtpStep from "./InsertOtpStep";
import { useRouter } from "next/navigation";

type LoginWrapper = {
    setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function LoginWrapper({ setOpen }: LoginWrapper) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [authError, setAuthError] = useState('');
    const [otp, setOtp] = useState('');

    const normalizedPhone = phone.startsWith("0")
        ? `+98${phone.slice(1)}`
        : phone;

    const handleSendOtp = async () => {
        setAuthError('');

        const supabase = createBrowserSupabaseClient();

        const { error } = await supabase.auth.signInWithOtp({
            phone: normalizedPhone,
        });

        if (error) {
            setAuthError(error.message);
            return;
        }
        

        setStep(2);
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) return;
        const supabase = createBrowserSupabaseClient();

        console.log(
            "Supabase URL:",
            process.env.NEXT_PUBLIC_SUPABASE_URL
        );

        const { data, error } = await supabase.auth.verifyOtp({
            phone: normalizedPhone,
            token: otp,
            type: 'sms',
        });

        if (error) {
            console.error(error.message);
            return;
        }

        if (setOpen) {
            setOpen(false)
        }

        router.push('/');

        console.log('OTP DATA:', data);
        console.log('OTP ERROR: ', error)

    };

    return (
        <div className="pt-11.5 pb-20 px-4
            lg:pt-0
        ">
            <div className="lg:hidden">
                <SvgArrowRight />
            </div>

            <div className="mt-28.5 lg:mt-0">
                <h5 className="text-h5 text-center mb-8 lg:hidden">
                    ورود یا ثبت نام
                </h5>

                {step === 1 ? (
                    <InsertPhoneStep
                        phone={phone}
                        setPhone={setPhone}
                        onContinue={handleSendOtp}
                        authError={authError}
                    />
                ) : (
                    <InsertOtpStep
                        value={otp}
                        onChange={setOtp}
                        phone={phone}
                        onVerify={handleVerifyOtp}
                    />
                )}
            </div>
        </div>
    );
}