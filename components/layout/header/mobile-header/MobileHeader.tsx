import SvgCartBag from "@/components/icons/CartBag";
import Image from "next/image";
import Link from "next/link";
import SearchSectionMobile from "./search-section/SearchSectionMobile";
import MobileMenu from "@/components/mobile-mentu/MobileMenu";



export default function MobileHeader() {
    return (
        <header className="fixed flex w-full border-b border-black z-50 bg-white lg:hidden ">
            <div className="container mx-auto my-5 px-4 ">
                <div className="flex justify-between items-center mb-4 ">
                    <Link href={'/'} className="">
                        <Image src={'/images/logo.png'} width={160} height={26} alt="لوگو وبسایت" />
                    </Link>
                    <MobileMenu/>
                </div>
                <SearchSectionMobile/>
            </div>
        </header>
    )
};
