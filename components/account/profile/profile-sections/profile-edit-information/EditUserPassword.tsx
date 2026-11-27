'use client';

import ErrorBox from "@/components/error-box/ErrorBox";
import { Spinner } from "@/components/ui/spinner";
import { Dispatch, SetStateAction } from "react";


type Props = {
    password: string | null,
    newPass: string | null,
    repNewPass: string | null,
    isLoading: boolean
    error: string

    setPassword: Dispatch<SetStateAction<string | null>>
    setNewPass: Dispatch<SetStateAction<string | null>>
    setRepNewPass: Dispatch<SetStateAction<string | null>>
    handleSubmit: () => Promise<void>

}

export default function EditUserPassword({
    password,
    newPass,
    repNewPass,
    error,
    isLoading,

    setPassword,
    setNewPass,
    setRepNewPass,

    handleSubmit,
}: Props) {
    return (
        <div className="p-4 bg-primary-20 rounded-2xl mt-4">
            <p className="text-sm leading-6">تغییر گذرواژه</p>

            <div className="flex flex-col gap-2">
                <label htmlFor="prev-pass" className="text-xs leading-5.5">رمز عبور پیشین (در صورتی که قصد تغییر ندارید خالی بگذارید)</label>
                <input value={password ?? ''} onChange={(e) => setPassword(e.target.value)} id="prev-pass" type="text" className="outline-0 px-2 border border-primary-30 rounded-md w-full" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="new-pass" className="text-xs leading-5.5">رمز عبور جدید (در صورتی که قصد تغییر ندارید خالی بگذارید)</label>
                <input value={newPass ?? ''} onChange={(e) => setNewPass(e.target.value)} id="new-pass" type="text" className="outline-0 px-2 border border-primary-30 rounded-md w-full" />
            </div>
            <div className="flex flex-col gap-2 mb-6">
                <label htmlFor="repeat-new-pass" className="text-xs leading-5.5">تکرار رمز عبور جدید</label>
                <input value={repNewPass ?? ''} onChange={(e) => setRepNewPass(e.target.value)} id="repeat-new-pass" type="text" className="outline-0 px-2 border border-primary-30 rounded-md w-full" />
            </div>

            {error === 'invalid-pass' ? <ErrorBox message="رمز عبور اشتباه است" /> : error === 'none-field-passes' ? < ErrorBox message="برای تغییر رمز لطفا تمام فیلد هارا پر کنید" /> : error === 'not-match-pass' && <ErrorBox message="رمز عبور جدید و تکرار آن برابر نیست" />}
            <button onClick={handleSubmit} disabled={isLoading} className="text-sm leading-6 py-1 px-2 text-primary-10 bg-success-80 rounded-[6px]">
                {isLoading ? <Spinner /> : ' ذخیر تغییرات'}
            </button>
        </div>
    )
};
