'use client'

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useRef } from "react";

type InsertOtp = {
    value: string,
    onChange: (value: string) => void;
    phone: string,
    onVerify: () => Promise<void>
}

export default function InsertOtpStep({ value, onChange, phone,onVerify }: InsertOtp) {

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const digits = Array.from({ length: 6 }, (_, index) => value[index] ?? '')

    const handleChange = (index: number, inputValue: string) => {
        const digit = inputValue.replace(/\D/g, '').slice(-1);

        const newValue = [...digits];
        newValue[index] = digit;

        onChange(newValue.join(''));

        if (digit && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedValue = e.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, 6)
        onChange(pastedValue);

        const nextIndex = Math.min(pastedValue.length, 5);
        inputsRef.current[nextIndex]?.focus();
    }



    return (
        <div className="">
            <p className="text-sm text-primary-70 mb-8">کد پنج رقمی ارسال شده به شماره {phone} را وارد کنید </p>
            <div className="flex flex-row-reverse items-center justify-between mb-20">
                {Array.from({ length: 6 }).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputsRef.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digits[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="
                        w-14 h-18
                        text-center text-xl
                        border-2 border-primary-30
                        rounded-xl outline-none
                        focus:border-primary-100
                    "
                    />
                ))}
            </div>
            <button
                type="button"
                disabled={value.length !== 6}
                className={`w-full text-xl leading-7.5 py-1 rounded-lg transition-colors ${value.length===6
                    ? "text-white bg-primary-100 cursor-pointer"
                    : "text-primary-70 bg-primary-30 cursor-not-allowed"
                    }`}
                onClick={onVerify}
            >
                ورود
            </button>
        </div>
    )
};
