import CheckOutWrapper from "@/components/checkout/CheckOutWrapper"
import { Spinner } from "@/components/ui/spinner"
import { Suspense } from "react"

type Props = {
    params: Promise<{ orderId: string }>
}

export default function Page({ params }: Props) {
    return (
        <div className="mt-31.25 py-4 px-4">
            <div className="container mx-auto">
                <Suspense fallback={<Spinner />}>
                    <CheckOutWrapper params={params} />
                </Suspense>
            </div>
        </div>
    )
}