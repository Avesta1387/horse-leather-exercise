import LoginWrapper from "@/components/account/login/LoginWrapper";
import Image from "next/image";





export default function LogIn() {
    return(
        <div className="">
            <div className=" flex items-center justify-center py-4 border-b-2 border-pri w-full ">
                <div className="relative w-67 h-10">
                    <Image src={'/images/logo.png'} fill alt="لوگو وبسایت در بخش هدر" className="object-cover" />
                </div>
            </div>
            <LoginWrapper/>
        </div>
    )
};
