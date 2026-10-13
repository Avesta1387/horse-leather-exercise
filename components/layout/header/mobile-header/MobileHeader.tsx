import Image from "next/image";
import Link from "next/link";



export default function MobileHeader() {
    return (
        <header className="">
            <div className="container mx-auto">
                <div className="my-5 px-4 ">
                    <Link href={'/'} className="">
                        <Image src={'/images/logo.png'} width={160} height={26} alt="لوگو وبسایت" />
                    </Link>
                </div>
            </div>
        </header>
    )
};
