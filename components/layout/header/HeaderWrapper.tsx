import { connection } from "next/server";
import DesktopHeader from "./desktop-header/DesktopHeader";
import MobileHeader from "./mobile-header/MobileHeader";
import { Suspense } from "react";





export default async function HeaderWrapper() {
    
    return (
        <>
            <Suspense fallback={<div className="hidden lg:block h-40" />}>
                <DesktopHeader />
            </Suspense>
            <MobileHeader />
        </>
    )
};
