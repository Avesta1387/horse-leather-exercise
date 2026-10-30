import SvgSearchNormal from "@/components/icons/SearchNormal";




export default function SearchSectionMobile() {
    return(
        <div className="py-1 px-4 border border-primary-80/65 rounded-2xl flex gap-4">
            <SvgSearchNormal className="text-primary-80/65 w-6 h-6" />
            <input type="text" className=" outline-0 placeholder:text-primary-80/65  " placeholder="جستجو..." />
        </div>
    )
};
