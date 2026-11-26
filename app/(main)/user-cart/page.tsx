import { Spinner } from "@/components/ui/spinner";
import UserCartContent from "@/components/user-cart/UserCartContent";
import { Suspense } from "react";




export default function page() {



    return (
        <div className="mt-31.25 py-6">
            <div className=" container mx-auto ">
                <Suspense fallback={<Spinner />} >
                    <UserCartContent />
                </Suspense>
            </div>
        </div>
    )
};
