import PaymentWrapper from "@/components/payment/PaymentWrapper"
import { Spinner } from "@/components/ui/spinner"
import { Suspense } from "react"


type Props = {
    params: Promise<{ orderId: string }>
}


export default function page({ params }: Props) {
    return (
        <div className="mt-31.25 py-10">
            <Suspense fallback={<Spinner />} >
                <PaymentWrapper params={params} />
            </Suspense>
        </div>
    )
};
