import Image from "next/image"

type CategoryProps = {
    name: string,
    imageUrl: string
}

const CategoryBox = ({ name, imageUrl }: CategoryProps) => {
    return (
        <div className="md:flex md:items-center md:justify-center md:flex-col md:gap-2">
            <div className="relative w-18 h-18">
                <Image src={imageUrl} alt={name} fill className="object-cover" />
            </div>
            <p className="text-xs leading-5.5">{name}</p>
        </div>
    )
}

const categories = [
    {
        id: 1,
        name: 'کفش زنانه',
        imageUrl: '/images/categories-images/women-shoes.png'
    },
    {
        id: 2,
        name: 'کفش مردانه',
        imageUrl: '/images/categories-images/men-shoes.png'
    },
    {
        id: 3,
        name: 'کیف زنانه',
        imageUrl: '/images/categories-images/women-bag.png'
    },
    {
        id: 4,
        name: 'کیف مردانه',
        imageUrl: '/images/categories-images/men-bag.png'
    },
    {
        id: 5,
        name: 'بوت زنانه',
        imageUrl: '/images/categories-images/women-boots.png'
    },
    {
        id: 6,
        name: 'بوت مردانه',
        imageUrl: '/images/categories-images/men-boots.png'
    },
    {
        id: 7,
        name: 'پاسپورتی زنانه',
        imageUrl: '/images/categories-images/women-passport-sized.png'
    },
    {
        id: 8,
        name: 'پاسپورتی مردانه',
        imageUrl: '/images/categories-images/men-passport-sized.png'
    },
    {
        id: 9,
        name: 'پوشاک زنانه',
        imageUrl: '/images/categories-images/women-clothes.png',
    },
    {
        id: 10,
        name: 'پوشاک مردانه',
        imageUrl: '/images/categories-images/men-clothes.png'
    }
]

export default function HomeCategories() {
    return (
        <div className="py-6 px-4">
            <h5 className="text-h5 text-center mb-6 ">پوشاک چرم هورس</h5>
            <div className="grid grid-cols-4 justify-center gap-4 md:grid-cols-5 md:mx-auto">
                {categories.map((category, index) => (
                    <div
                        key={category.id}
                        className={
                            index === 8
                                ? "col-start-2 md:col-start-auto"
                                : index === 9
                                    ? "col-start-3 md:col-start-auto"
                                    : ""
                        }
                    >
                        <CategoryBox
                            name={category.name}
                            imageUrl={category.imageUrl}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};
