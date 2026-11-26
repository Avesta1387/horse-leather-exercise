import AccountSection from "@/components/account/profile/account-section/AccountSection";
import { Spinner } from "@/components/ui/spinner";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { connection } from "next/server";
import ProfileContent from "./ProfileContent";



export default async function ProfileWrapper() {

    await connection();

    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return;
    }

    const { data: getUserInformation, error: getUserInformationError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    // const filePath = `${user.id}/avatar`;

    // const { data: urlData } = supabase.storage
    //     .from('avatars')
    //     .getPublicUrl(filePath);

    const avatarUrl = getUserInformation?.avatar_url || null;


    return (
        <div className="px-4 py-10">
            <div className="container mx-auto">
                <ProfileContent userId={user.id} userFirstName={getUserInformation?.first_name} userLastName={getUserInformation?.last_name} imageUrl={avatarUrl} />
            </div>
        </div>
    )
};