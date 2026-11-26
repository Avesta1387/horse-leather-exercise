import Image from "next/image";
import Link from "next/link";


type ProductBoxProps = {
    name: string,
    price: number | string;
    imageUrl: string | null;
    index?: number,
    id: string
}

export default function ProductCard({ name, price, imageUrl, index, id }: ProductBoxProps) {
    return (
        <Link
            href={`/products/${id}`}
            className={`border-2 border-primary-30 rounded-2xl overflow-auto p-4 max-w-fit block
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
            <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-4 min-w-74.5 max-w-75.5">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={name}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        unoptimized
                    />
                )}
            </div>
            <p className="text-3xl leading-12 mb-4 text-primary-100 md:text-xl md:leading-9 ">{name}</p>
            <p className="text-2xl leading-9 text-primary-100">{price} تومان</p>
        </Link>
    )
}