
import ProfileWrapper from "@/components/account/profile/ProfileWrapper";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";





export default async function Profile() {



    return (
        <div className="">
            <Suspense fallback={<Spinner />} >
                <ProfileWrapper />
            </Suspense>
        </div>
    )
};
