import Image from "next/image"
import Link from "next/link"


type PostCardProps = {
    id: string,
    name: string,
    imageUrl: string | null,
    excerpt: string
}

export default function PostCard({ id, name, imageUrl, excerpt }: PostCardProps) {
    return (
        <div className="border-2 border-primary-30 rounded-2xl p-4" >
            <div className="relative w-full h-65 mb-4 overflow-hidden rounded-xl">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        fill
                        sizes="348px"
                        alt={name}
                        className="object-cover"
                    />
                )}
            </div>
            <h6 className="text-h6 text-xl leading-7.5 ">{name}</h6>
            <p className="text-sm w-80 leading-7">{excerpt}</p>
        </div>
    )
};
