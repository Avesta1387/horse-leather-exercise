'use client'

import ErrorBox from "@/components/error-box/ErrorBox"
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"


type InsertPhoneStepProps = {
    phone: string;
    setPhone: Dispatch<SetStateAction<string>>;
    onContinue: () => Promise<void>;
    authError: string;
};

export default function InsertPhoneStep({
    phone,
    setPhone,
    onContinue,
    authError
}: InsertPhoneStepProps) {
    const [acceptedRules, setAcceptedRules] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [loading, setLoading] = useState(false);

    const isPhoneValid = /^09\d{9}$/.test(phone);

    const isPhoneEmpty = phone.trim() === '';

    const phoneError = isPhoneEmpty
        ? 'وارد کردن شماره موبایل الزامیست'
        : !isPhoneValid
            ? 'شماره موبایل وارد شده صحیح نمیباشد'
            : '';

    const isFormValid = isPhoneValid && acceptedRules;

    const handleContinue = async () => {
        setLoading(true);
        setPhoneTouched(true);

        if (!isFormValid) return;

        await onContinue();
        setLoading(false)
    };



    return (
        <div className="">
            <p className="text-sm leading-6 text-primary-70 mb-7.5 ">کد تایید به شماره موبایلی که وارد میکنید ارسال خواهد شد</p>
            <div className="relative border-2 border-primary-30 rounded-lg h-12  mb-8 ">
                <label htmlFor="phone" className="text-sm text-primary-100 bg-white absolute -top-2 right-4 px-0.5 ">شماره موبایل</label>
                <input
                    id="phone"
                    type="tel"
                    className="border-0 outline-0 w-full py-2 px-2 "
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => setPhoneTouched(true)}
                />
                {phoneTouched && phoneError && (
                    <div className="relative">
                        <div className="absolute flex justify-center items-center right-1/5 -top-60 ">
                            <ErrorBox message={phoneError} />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex gap-4 mb-20">
                {/* <input
                    id="accept-rules"
                    type="checkbox"
                    checked={acceptedRules}
                    onChange={(e) => setAcceptedRules(e.target.checked)}
                    className="appearance-none outline-0 border border-primary-40 w-5 h-5 rounded-lg "
                /> */}
                <label htmlFor="accept-rules" className="flex items-center cursor-pointer">
                    <input
                        id="accept-rules"
                        type="checkbox"
                        checked={acceptedRules}
                        onChange={(e) => setAcceptedRules(e.target.checked)}
                        className="peer sr-only"
                    />

                    <span className="
                        w-5 h-5 shrink-0 rounded-lg border border-primary-40
                        flex items-center justify-center
                        transition-colors
                        peer-checked:bg-primary-100
                        peer-checked:border-primary-100
                    ">
                        <svg
                            className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m5 12 4 4L19 6" />
                        </svg>
                    </span>
                </label>
                <p className="text-xs leading-5.5 text-primary-70">
                    با ورود و ثبت نام در سایت، با{" "}
                    <Link href="/" className="text-black">
                        قوانین چرم هورس
                    </Link>
                    {" "}موافقت میکنم؟
                </p>

            </div>
            <button
                type="button"
                disabled={!isFormValid}
                onClick={handleContinue}

                className={`w-full text-xl leading-7.5 py-1 rounded-lg transition-colors ${isFormValid
                    ? "text-white bg-primary-100 cursor-pointer"
                    : "text-primary-70 bg-primary-30 cursor-not-allowed"
                    }`}
            >{loading ? < Spinner /> : 'تایید و ادامه'}</button>
            {authError && (
                <div className="relative">
                    <div className="absolute flex justify-center items-center right-1/5 -top-60 ">
                        <ErrorBox message={authError} />
                    </div>
                </div>
            )}
        </div>
    )
};
