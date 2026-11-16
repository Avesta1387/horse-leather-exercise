'use client'

import SvgLogin from "@/components/icons/Login";
import { useState } from "react";
import DesktopLoginWrapper from "./DesktopLoginWrapper";




export default function DesktopLogin() {

    const [open, setOpen] = useState(false);

    return (
        <div className="">
            <p onClick={() => setOpen(true)} className="bg-primary-100 text-white flex p-2 rounded-lg cursor-pointer ">
                <SvgLogin />
                ورود | عضویت
            </p>
            {open && <DesktopLoginWrapper setOpen={setOpen} />}
        </div>
    )
};
