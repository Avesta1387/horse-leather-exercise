'use client'

import { useEffect, useState } from "react";

type ErrorMessageProps = {
    message: string;
};

export default function ErrorBox({ message }: ErrorMessageProps) {

    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFinished(true);
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={`transition-all duration-500 bg-alert-20 border border-alert-70 rounded-2xl flex items-center justify-center w-media-280 h-50 fixed top-1/2 left-1/7  ${isFinished
            ? "opacity-0 translate-y-2"
            : "opacity-100 translate-y-0"
            }`}>
            <p className="text-alert-70">{message}</p>
        </div>
    );
}