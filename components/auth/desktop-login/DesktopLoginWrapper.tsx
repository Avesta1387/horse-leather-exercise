'use client'

import LoginWrapper from "@/components/account/login/LoginWrapper"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"


type DesktopLoginWrapperProps = {
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function DesktopLoginWrapper({ setOpen }: DesktopLoginWrapperProps) {
    return (
        <div className="fixed w-full h-dvh bg-black/40 top-0 right-0 z-50 flex items-center justify-center ">
            <div className="  w-211.5 h-110 bg-white rounded-2xl flex flex-col items-center py-8 gap-6 ">
                <div className=" relative w-100 h-16.5 ">
                    <Image src={'/images/logo.png'} alt={'لوگو وبسایت'} className="object-cover" fill />
                </div>
                <p className="text-3xl leading-12 text-primary-70 ">ورود یا ثبت نام</p>
                <LoginWrapper setOpen={setOpen} />
            </div>
        </div>
    )
};
