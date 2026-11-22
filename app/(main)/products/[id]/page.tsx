import ProductContent from "@/components/product-page/ProductContent"
import { Spinner } from "@/components/ui/spinner"
import { Suspense } from "react"


type Props = {
    params: Promise<{ id: string }>
}

export default function page({ params }: Props) {

    return (
        <div className=" mt-31.25 px-5 py-6 lg:mt-48 ">
            <Suspense fallback={<Spinner />} >
                <ProductContent params={params} />
            </Suspense>
        </div>
    )
};
