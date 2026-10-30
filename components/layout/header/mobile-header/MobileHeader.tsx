import SvgCartBag from "@/components/icons/CartBag";
import Image from "next/image";
import Link from "next/link";
import SearchSectionMobile from "./search-section/SearchSectionMobile";



export default function MobileHeader() {
    return (
        <header className="fixed flex w-full border-b border-black z-40 bg-white lg:hidden ">
            <div className="container mx-auto my-5 px-4 ">
                <div className="flex justify-between items-center mb-4 ">
                    <Link href={'/'} className="">
                        <Image src={'/images/logo.png'} width={160} height={26} alt="لوگو وبسایت" />
                    </Link>
                    <div className="flex gap-4 items-center">
                        <div className=" py-1 px-2 bg-primary-100 w-fit rounded-lg ">
                            <SvgCartBag className="w-6 h-6 text-white" />
                        </div>
                        <div className="py-4 px-3 bg-primary-30 w-fit rounded-lg">
                            <div className="w-4.5 h-0.5 bg-primary-100 relative 
                            before:content-[''] before:w-4.5 before:h-0.5 before:absolute before:bg-primary-100 before:bottom-1.25
                            after:content-[''] after:w-4.5 after:h-0.5 after:absolute after:bg-primary-100 after:top-1.25
                            "></div>
                        </div>
                    </div>
                </div>
                <SearchSectionMobile/>
            </div>
        </header>
    )
};
