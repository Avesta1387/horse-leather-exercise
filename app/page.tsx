import HomeCategories from "@/components/main-page/categories/HomeCategories";
import Image from "next/image";




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
      </div>
    </div>
  );
}
