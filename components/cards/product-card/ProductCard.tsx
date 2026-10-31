import Image from "next/image";


type ProductBoxProps = {
    name: string,
    price: number | string;
    imageUrl: string | null;
    index?: number
}

export default function ProductCard({ name, price, imageUrl, index }: ProductBoxProps) {
    return (
        <div
            className={`border-2 border-primary-30 rounded-2xl overflow-auto p-4 max-w-fit
  ${index !== undefined && index > 1
                    ? "md:hidden"
                    : "md:block"
                }
  ${index !== undefined && index > 2
                    ? "lg:hidden"
                    : "lg:block"
                }
  ${index !== undefined && index > 3
                    ? "2xl:hidden"
                    : "2xl:block"
                }
`}
        >
            <div className="relative w-full h-80 rounded-2xl overflow-auto mb-4 min-w-74.5 max-w-75.5 ">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={name}
                        className="object-cover"
                        fill
                    // unoptimized
                    />
                )}
            </div>
            <p className="text-3xl leading-12 mb-4 text-primary-100 md:text-xl md:leading-9 ">{name}</p>
            <p className="text-2xl leading-9 text-primary-100">{price} تومان</p>
        </div>
    )
}