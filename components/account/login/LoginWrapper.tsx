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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

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

    const authErrorMessages: Record<string, string> = {
        otp_expired: 'کد تأیید اشتباه است یا اعتبار آن به پایان رسیده است.',
        over_sms_send_rate_limit: 'تعداد درخواست‌های ارسال کد بیش از حد مجاز است. کمی بعد تلاش کنید.',
        over_request_rate_limit: 'درخواست‌های زیادی ارسال کرده‌اید. لطفاً کمی صبر کنید.',
        phone_not_confirmed: 'شماره موبایل شما تأیید نشده است.',
        phone_exists: 'این شماره موبایل قبلاً ثبت شده است.',
        otp_disabled: 'ورود با کد یک‌بارمصرف در دسترس نیست.',
        sms_send_failed: 'ارسال پیامک با مشکل مواجه شد.',
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) return;

        setLoading(true);
        setError(null);

        try {
            const supabase = createBrowserSupabaseClient();

            const { data, error: authError } =
                await supabase.auth.verifyOtp({
                    phone: normalizedPhone,
                    token: otp,
                    type: 'sms',
                });

            if (authError) {
                setError(
                    (authError.code && authErrorMessages[authError.code]) ??
                    'خطایی رخ داد لطفاً دوباره تلاش کنید.'
                );
                return;
            }

            if (setOpen) setOpen(false);

            router.push('/');

        } catch {
            setError('ارتباط با سرور برقرار نشد. دوباره تلاش کنید.');
        } finally {
            setLoading(false);
        }
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
                        loading={loading}
                        value={otp}
                        onChange={setOtp}
                        phone={phone}
                        onVerify={handleVerifyOtp}
                        error={error}
                    />
                )}
            </div>
        </div>
    );
}