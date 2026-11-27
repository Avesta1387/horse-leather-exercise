import CategoryWrapper from "@/components/category-page/CategoryWrapper";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

type Props = {
    searchParams: Promise<{
        q?: string
    }>
}

export default function Category({ searchParams }: Props) {
    return (
        <div className="">
            <Suspense fallback={<Spinner/>}>
                <CategoryWrapper searchParams={searchParams} />
            </Suspense>
        </div>
    )
};
