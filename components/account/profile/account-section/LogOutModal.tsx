import SvgLogOut from "@/components/icons/LogOut";


type LogOutModal = {
    onClose: () => void,
    onConfrim: () => void;
}

export default function LogOutModal({
    onClose,
    onConfrim
}: LogOutModal) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-500/10">
                        <SvgLogOut className="h-6 w-6 text-error-500" />
                    </div>
                </div>

                {/* Text */}
                <div className="mt-5 text-center">
                    <h2 className="text-h3">
                        خروج از حساب کاربری
                    </h2>

                    <p className="mt-3 text-sm text-gray-500">
                        آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-gray-200 py-3 text-sm"
                    >
                        انصراف
                    </button>

                    <button
                        type="button"
                        onClick={onConfrim}
                        className="flex-1 rounded-lg bg-alert-60 py-3 text-sm text-white"
                    >
                        خروج
                    </button>
                </div>
            </div>
        </div>
    )
};
