'use client'

import Link from "next/link";
import SvgAngleLeft from "../icons/AngleLeft";
import CartBox from "./user-cart-box/UserCartBox";
import UserCartDiscount from "./UserCartDiscount";
import { useCart } from "./CartProvider";
import UserCartInvoice from "./UserCartInvoice";
import UserCartContinue from "./UserCartContinue";

export default function CartContent() {
    const { cart } = useCart();

    return (
        <div className="px-4lg:w-full">
            {/* Breadcrumb */}

            <p>
                شما {cart.length} محصول در سبد خرید خود دارید
            </p>

            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start ">
                <div className="flex flex-col items-center gap-6 lg:w-2/3">
                    {cart.map((product) => (
                        <CartBox
                            id={product.id}
                            key={product.id}
                            title={product.products?.title ?? "محصول بدون نام"}
                            imageUrl={product.image}
                            quantity={product.quantity}
                            size={product.product_variants?.sizes?.title}
                            color={product.product_variants?.colors?.title ?? "بدون رنگ"}
                            colorValue={product.product_variants?.colors?.value}
                            discount={product.product_variants?.discount}
                            price={product.product_variants?.price ?? 0}
                        />
                    ))}
                </div>

                <div className="flex flex-col items-center gap-6 lg:sticky lg:top-0">
                    <UserCartDiscount />
                    <UserCartInvoice />
                    <UserCartContinue />
                </div>
            </div>
        </div>
    );
}