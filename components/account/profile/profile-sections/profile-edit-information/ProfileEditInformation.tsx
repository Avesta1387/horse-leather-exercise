'use client'

import { Spinner } from "@/components/ui/spinner";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import EditUserInformation from "./EditUserInformation";
import EditUserPassword from "./EditUserPassword";

type Props = {
    userId: string
}

export default function ProfileEditInformation({ userId }: Props) {

    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [initialEmail, setInitialEmail] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [newPass, setNewPass] = useState<string | null>(null);
    const [repNewPass, setRepNewPass] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const router = useRouter();



    useEffect(() => {
        let isMounted = true;

        const supabase = createBrowserSupabaseClient();

        const getInformation = async () => {
            setIsLoading(true);

            try {
                const [profileResult, authResult] = await Promise.all([
                    supabase
                        .from('users')
                        .select('first_name, last_name')
                        .eq('id', userId)
                        .maybeSingle(),

                    supabase.auth.getUser()
                ]);

                if (!isMounted) return;

                if (profileResult.error || authResult.error) {
                    console.error(profileResult.error || authResult.error);
                    return;
                }

                if (!profileResult.data || !authResult.data.user) {
                    router.push('/');
                    return;
                }

                setFirstName(profileResult.data.first_name);
                setLastName(profileResult.data.last_name);
                setEmail(authResult.data.user.email ?? null);
                setInitialEmail(authResult.data.user.email ?? null);
                setPhone(authResult.data.user.phone ?? null);

            } catch (error) {
                console.error(error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        getInformation();

        return () => {
            isMounted = false;
        };
    }, [userId, router]);

    const handleSubmitEdits = async () => {
        const supabase = createBrowserSupabaseClient();

        const hasPasswordInput = password || newPass || repNewPass;
        const hasEmailChanged = email !== initialEmail;

        setError('');

        // بررسی فیلدهای رمز عبور
        if (hasPasswordInput) {
            if (!password || !newPass || !repNewPass) {
                setError('none-field-passes');
                return;
            }

            if (newPass !== repNewPass) {
                setError('not-match-pass');
                return;
            }
        }

        if (hasEmailChanged && !email) {
            return;
        }

        setIsLoading(true);

        try {
            // دریافت اطلاعات کاربر
            const { data: { user }, error: userError } =
                await supabase.auth.getUser();

            if (userError || !user) {
                setError('لطفاً ابتدا وارد حساب شوید');
                router.push('/');
                return;
            }

            // ذخیره اطلاعات پروفایل
            const { data, error: profileError } = await supabase
                .from('users')
                .update({
                    first_name: firstName,
                    last_name: lastName,
                })
                .eq('id', userId)
                .select()
                .maybeSingle();

            if (profileError) {
                console.error(profileError);
                return;
            }

            if (!data) {
                alert('کاربری با این شناسه وجود ندارد');
                router.push('/');
                return;
            }

            setFirstName(data.first_name);
            setLastName(data.last_name);

            // بررسی رمز قبلی در صورت درخواست تغییر رمز
            if (hasPasswordInput) {
                const credentials = user.app_metadata.provider === 'phone'
                    ? { phone: user.phone!, password: password! }
                    : { email: user.email!, password: password! };

                const { error: signInError } =
                    await supabase.auth.signInWithPassword(credentials);

                if (signInError) {
                    setError('invalid-pass');
                    return;
                }

                // ثبت رمز جدید
                const { error: updateError } = await supabase.auth.updateUser({
                    password: newPass!,
                });

                if (updateError) {
                    alert('تغییر رمز انجام نشد');
                    return;
                }

                setPassword('');
                setNewPass('');
                setRepNewPass('');
            }

            // آپدیت ایمیل در Supabase Auth
            if (hasEmailChanged && email) {
                const { error: emailError } = await supabase.auth.updateUser({
                    email: email,
                });

                if (emailError) {
                    console.error(emailError);
                    return;
                }

                setInitialEmail(email);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full">
            {isLoading
                ? <div className="">
                    <Spinner />
                </div>
                : <div className="w-full">
                    <EditUserInformation
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        phone={phone}

                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setEmail={setEmail}
                        setPhone={setPhone}
                    />
                    <EditUserPassword
                        password={password}
                        newPass={newPass}
                        repNewPass={repNewPass}
                        error={error}
                        isLoading={isLoading}

                        setPassword={setPassword}
                        setNewPass={setNewPass}
                        setRepNewPass={setRepNewPass}
                        handleSubmit={handleSubmitEdits}
                    />
                </div>
            }
        </div>
    )
};
