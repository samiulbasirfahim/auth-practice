import { cn } from "@/lib/utils";

type InputProps = {
    label?: string;
    error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
    label,
    error,
    className,
    id,
    ...props
}: InputProps) {
    return (
        <div className="w-full space-y-1">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={cn(
                    "w-full rounded-xl border px-4 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm",
                    "focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition",
                    error && "border-red-500 ring-red-300 focus:ring-red-500",
                    className,
                )}
                {...props}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
