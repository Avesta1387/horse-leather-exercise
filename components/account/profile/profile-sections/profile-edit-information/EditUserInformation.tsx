'use client'

import { Dispatch, SetStateAction } from "react"

type Props = {
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    phone: string | null

    setFirstName: Dispatch<SetStateAction<string | null>>;
    setLastName: Dispatch<SetStateAction<string | null>>;
    setEmail: Dispatch<SetStateAction<string | null>>;
    setPhone: Dispatch<SetStateAction<string | null>>
}

export default function EditUserInformation({
    firstName,
    lastName,
    email,
    phone,

    setFirstName,
    setLastName,
    setEmail,
    setPhone
}: Props) {
    return (
        <div className="bg-primary-20 rounded-2xl p-4 mt-4 md:w-full ">
            <div className="">
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="phone" className="text-xs leading-5.5">شماره تلفن</label>
                    <input value={phone ? phone : '0912*******'} onChange={(e) => {
                        { e.target.value === '' ? setPhone(phone) : setPhone(e.target.value) }
                    }} id="phone" type="tel" className="outline-0 px-2 border border-primary-30 rounded-md " />
                </div>
                <div className="lg:flex lg:w-full gap-4">
                    <div className="flex flex-col gap-2 w-full ">
                        <label htmlFor="first-name" className="text-xs leading-5.5">نام</label>
                        <input value={firstName ?? ''} onChange={(e) => setFirstName(e.target.value)} type="text" id="first-name" className="outline-0 px-2 border border-primary-30 rounded-md " />
                    </div>
                    <div className="flex flex-col gap-2 w-full ">
                        <label htmlFor="last-name" className="text-xs leading-5.5">نام خانوادگی</label>
                        <input value={lastName ?? ''} onChange={(e) => setLastName(e.target.value)} type="text" id="last-name" className="outline-0 px-2 border border-primary-30 rounded-md " />
                    </div>
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="email" className="text-xs leading-5.5">ایمیل</label>
                    <input value={email ?? ''} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="outline-0 px-2 border border-primary-30 rounded-md " />
                </div>
            </div>
        </div>
    )
};
