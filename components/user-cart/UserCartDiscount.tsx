'use client'
import { useCart } from "./CartProvider";
import { Spinner } from "../ui/spinner";



export default function UserCartDiscount() {

    const {
        discountCode,
        setDiscountCode,
        applyDiscount,
        removeDiscount,
        appliedDiscount,
        isDiscountLoading,
        discountError,
    } = useCart();

    return (
        <div className="p-3 border border-primary-20 rounded-xl w-full ">
            <p className="mb-2">کد تخفیف</p>
            <p className="text-sm leading-6 text-primary-80 mb-2 ">اگر کد تخفیف دارید، آن را وارد و اعمال کنید.</p>
            <div className="flex items-center gap-2.5">
                <input value={discountCode} disabled={isDiscountLoading || !!appliedDiscount} onChange={(e) => setDiscountCode(e.target.value)} type="text" className="outline-0 p-2.5 text-sm leading-5 placeholder:text-primary-60 bg-primary-20 border border-primary-40 rounded-lg w-full " placeholder="کد تخفیف" />
                <button disabled={isDiscountLoading || !!appliedDiscount} type='button' onClick={applyDiscount} className="text-sm leading-5 py-2.5 px-4 text-alert-50 border border-alert-50 rounded-lg w-fit ">{isDiscountLoading ? <Spinner /> : "اعمال"}</button>
            </div>
            {discountError && (
                <p className="text-sm text-alert-50 mt-2">
                    {discountError}
                </p>
            )}

            {appliedDiscount && (
                <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-green-600">
                        کد تخفیف با موفقیت اعمال شد.
                    </p>

                    <button type="button" onClick={removeDiscount}>
                        حذف کد تخفیف
                    </button>
                </div>
            )}
        </div>
    )
};
