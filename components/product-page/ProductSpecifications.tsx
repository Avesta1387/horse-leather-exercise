

type Props = {
    useType: string,
    material: string
}

export default function ProductSpecifications({ useType, material }: Props) {
    return (
        <div className="mt-14 w-full">
            <p className="text-xl leading-7.5 mb-4">نمای کلی</p>
            <div className="flex  items-center gap-10  mx-auto lg:w-3/4 ">
                <div className="flex flex-col gap-4 border-l border-primary-100 pl-4 ">
                    <p className="text-lg leaing-5 text-primary-70 pb-4">نوع استفاده</p>
                    <p className="text-lg leaing-5 text-primary-70">جنس</p>
                </div>
                <div className="flex flex-col gap-4 text-xl leading-6 ">
                    <p className="">{useType}</p>
                    <p className="">{material}</p>
                </div>
            </div>
        </div>
    )
};
