'use client';

import SvgLogOut from "@/components/icons/LogOut";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LogOutModal from "./LogOutModal";


export default function LogOutButton() {

    const router = useRouter();
    const [openLogOutModal, setOpenLogOutModal] = useState(false);

    const handleLogOut = async () => {
        const supabase = await createBrowserSupabaseClient();

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error.message)
            return;
        }

        router.push('/')
        router.refresh();
    }

    return (
  <>
    <button
      onClick={() => setOpenLogOutModal(true)}
      className="flex items-center gap-1"
    >
      <SvgLogOut />
      <p>خروج از حساب کاربری</p>
    </button>

    {openLogOutModal && (
      <LogOutModal
        onClose={() => setOpenLogOutModal(false)}
        onConfrim={handleLogOut}
      />
    )}
  </>
);
};
