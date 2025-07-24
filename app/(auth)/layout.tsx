import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex-1 flex justify-between">
            <div
                className="bg-no-repeat bg-center bg-cover w-2/3"
                style={{
                    backgroundImage: "url(images/login_page.avif)",
                }}
            >
                L
            </div>
            <div className="w-1/3 flex flex-col">
                {children}
            </div>
        </div>
    );
}
