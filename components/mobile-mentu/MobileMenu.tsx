'use client'

import Image from "next/image";
import { useRef, useState } from "react"
import SvgCloseSquare from "../icons/CloseSquare";
import Link from "next/link";
import SvgProfile from "../icons/Profile";
import SvgCallCalling from "../icons/CallCalling";
import SvgCallCalling2 from "../icons/CallCalling2";



export default function MobileMenu() {

    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <div className="">
            <div onClick={() => setOpen(true)} className="flex gap-4 items-center">
                <div className="py-4 px-3 bg-primary-30 w-fit rounded-lg">
                    <div className="w-4.5 h-0.5 bg-primary-100 relative 
                            before:content-[''] before:w-4.5 before:h-0.5 before:absolute before:bg-primary-100 before:bottom-1.25
                            after:content-[''] after:w-4.5 after:h-0.5 after:absolute after:bg-primary-100 after:top-1.25
                    "></div>
                </div>
            </div>

            {open && (
                <div className="fixed w-dvw h-dvh top-0 right-0 bg-black/50 z-50 flex items-start justify-between">
                    <div className="w-2/3 h-dvh bg-primary-20 pt-4 ">
                        <div className="relative w-50 h-8 mx-auto ">
                            <Image src={'/images/logo.png'} alt="لوگو فروشگاه" fill unoptimized className="object-fill" />
                        </div>
                        <div className="py-14 px-4 flex flex-col gap-4 ">
                            <Link href={'/'} className="leading-6 " >
                                صفحه اصلی
                            </Link>
                            <Link href={'/category?q=men-clothes'} >پوشاک مردانه</Link>
                            <Link href={'/category?q=women-clothes'} >
                                پوشاک زنانه
                            </Link>
                            <Link href={'/contact-us'} >
                                تماس با ما
                            </Link>
                            <Link href={'/contact-us'} >
                                ادرس شعب حضوری
                            </Link>
                            <Link href={'/profile'} className="flex items-center gap-2" >
                                <SvgProfile />
                                حساب کاربری
                            </Link>
                            <p className="flex items-center gap-2">
                                <SvgCallCalling className="text-black" />
                                پشتیبانی: 44640901-021
                            </p>
                        </div>
                    </div>
                    <div onClick={() => setOpen(false)} className=" px-6 py-18">
                        <SvgCloseSquare className="text-white" />
                    </div>
                </div>
            )}
        </div>
    )
};
