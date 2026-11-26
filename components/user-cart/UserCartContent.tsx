import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import { connection } from "next/server";
import CartWrapper from "./CartWrapper";




export default async function UserCartContent() {

    await connection();

    const supabase = await createServerSupabaseClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        if (error.name === 'AuthSessionMissingError') {
            redirect('/log-in');
        }

        console.error(error);
        return;
    }

    if (!user) {
        redirect('/log-in');
    }

    const { data, error: getCartError } = await supabase
        .from('user_cart')
        .select(`
        *,
        products (
            id,
            images,
            title,
            score
        ),
        product_variants (
            id,
            discount,
            price,
            sizes (
                title
            ),
            colors (
                title,
                value
            )
        )
    `)
        .eq('user_id', user.id);

    if (getCartError) {
        console.error(getCartError);
        return;
    }

    return (
        <div className="">
            <CartWrapper initialCart={data ?? []} />
        </div>
    )
};
