import SvgCallCalling from "@/components/icons/CallCalling";
import SvgCartBag from "@/components/icons/CartBag";
import SvgLogin from "@/components/icons/Login";
import SvgSearchNormal from "@/components/icons/SearchNormal";
import Image from "next/image";




export default function DesktopHeader() {
    return (
        <header className="hidden border-b border-black lg:block fixed z-40 bg-white w-full ">
            <div className="container mx-auto pt-5 pb-4">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-10">
                        <div className="relative w-66.75 h-10 ">
                            <Image src={'/images/logo.png'} alt="لوگو وبسایت" fill className="object-cover" />
                        </div>
                        <div className="w-89.5 py-3 px-3 flex items-center gap-3 border-2 border-black rounded-3xl ">
                            <SvgSearchNormal className="w-6 h-6 text-black" />
                            <input type="text" className="outline-0" />
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <p className="bg-primary-100 text-white flex p-2 rounded-lg ">
                            <SvgLogin />
                            ورود | عضویت
                        </p>
                        <div className="bg-primary-30 py-2 px-4 rounded-lg">
                            <SvgCartBag />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-7.5 h-[2.5px] bg-primary-100 relative 
                            before:content-[''] before:w-7.5 before:h-[2.5px] before:absolute before:bg-primary-100 before:bottom-2.25
                            after:content-[''] after:w-7.5 after:h-[2.5px] after:absolute after:bg-primary-100 after:top-2.25
                            "></div>
                            <p className="font-semibold text-xl pl-4 border-l-2 border-black ">دسته بندی ها</p>
                        </div>
                        <div className="flex items-center gap-8">
                            <p className="">صفحه اصلی</p>
                            <p className="">تماس با ما</p>
                            <p className="">شعبه های حضوری</p>
                            <p className="">پیگیری سفارش</p>
                            <p className="">هورس مگ</p>
                        </div>
                    </div>
                    <p className="bg-primary-100 flex text-white items-center w-60 p-2 gap-4 rounded-lg">
                        <SvgCallCalling />
                        پیگیری سفارشات :
                        02191559091 داخلی (203)
                    </p>
                </div>
            </div>
        </header>
    )
};
