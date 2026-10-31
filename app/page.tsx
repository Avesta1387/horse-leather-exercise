import BestSellers from "@/components/main-page/best-sellers/BestSellers";
import HomeCategories from "@/components/main-page/categories/HomeCategories";
import HomeNewestProducts from "@/components/main-page/newest-products/HomeNewestProducts";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";




export default function Home() {

  return (
    <div className="mt-31.25 md:pt-12 lg:mt-48.25 ">
      <div className="container mx-auto">
        <div className="w-full h-155 relative sm:w-111 sm:mx-auto md:hidden ">
          <Image src={'/images/banners-and-backgrounds/men-collection.png'} alt="تصویر کالکشن مردانه" fill={true} className="object-cover" />
        </div>
        <div className="w-full h-155 relative sm:w-111 sm:mx-auto md:hidden">
          <Image src={'/images/banners-and-backgrounds/women-collection.png'} alt="تصویر کالکشن مردانه" fill={true} className="object-cover" />
        </div>
        <div className="hidden md:block w-full h-60 relative lg:h-80 xl:h-100 2xl:h-120">
          <Image src={'/images/banners-and-backgrounds/desktop-slider-yellow-white.png'} alt="تصویر اسلایدر کالکشن یک" fill className="object-cover" />
        </div>
        <HomeCategories />
        <div className="">
          <div className=" w-95 h-160 relative mx-auto md:hidden ">
            <Image alt="تصویر بنر کفش چرم برای سایز موبایل" className="object-cover" fill src={'/images/banners-and-backgrounds/banner-leather-shoes-mobile.png'} />
          </div>
          <div className="">
            <div className="hidden md:block w-full h-60 relative lg:h-80 xl:h-100 2xl:h-120 rounded-3xl overflow-hidden">
              <Image src={'/images/banners-and-backgrounds/banner-leather-shoes.png'} alt="تصویر بنر کفش چرم برای سایز دسکتاپ" fill className="object-cover" />
            </div>
          </div>
        </div>
        {/*  NEWEST PRODUCTS SECTION  */}
        <Suspense fallback={<Spinner />} >
          <HomeNewestProducts />
        </Suspense>

        {/*  CATEGORIES IMAGES  */}
        <div className="grid grid-cols-2 justify-between items-center w-fit mx-auto gap-4 mb-6
          md:grid-cols-4
          lg:grid-cols-3 
          2xl:grid-cols-4
        ">
          <Link href={'/'}>
            <div className=" relative w-42.5 h-65 rounded-lg overflow-auto
              lg:w-75.5 lg:h-146.5
            ">
              <Image src={'/images/banners-and-backgrounds/men-clothes-leather-coat-red.png'} alt="تصویر کت چرمی قرمز مردانه" fill className="object-center" />
            </div>
          </Link>
          <Link href={'/'}>
            <div className=" relative w-42.5 h-65 rounded-lg overflow-auto
              lg:w-75.5 lg:h-146.5
            ">
              <Image src={'/images/banners-and-backgrounds/women-clothes-leather-coat.png'} alt="تصویر کت چرمی زنانه" fill className="object-center" />
            </div>
          </Link>
          <Link href={'/'}>
            <div className=" relative w-42.5 h-65 rounded-lg overflow-auto
              lg:w-75.5 lg:h-146.5
            ">
              <Image src={'/images/banners-and-backgrounds/men-leather-coat.png'} alt="تصویر کت چرمی مردانه" fill className="object-center" />
            </div>
          </Link>
          <Link href={'/'}>
            <div className=" relative w-42.5 h-65 rounded-lg overflow-auto
              lg:w-75.5 lg:h-146.5 
            ">
              <Image src={'/images/banners-and-backgrounds/women-bag.png'} alt="تصویر کیف زنانه" fill className="object-center" />
            </div>
          </Link>
        </div>

        {/*  BEST SELLERS SECTION  */}
        <Suspense fallback={<Spinner />} >
          <BestSellers />
        </Suspense>
      </div>
    </div>
  );
}
