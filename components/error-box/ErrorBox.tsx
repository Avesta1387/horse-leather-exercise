type ErrorMessageProps = {
    message: string;
};

export default function ErrorBox({ message }: ErrorMessageProps) {
    return (
        <p
            role="alert"
            className="inline-flex items-center justify-center px-4 py-2
            text-xs text-red-600 bg-red-50 border border-red-500 rounded-lg"
        >
            {message}
        </p>
    );
}