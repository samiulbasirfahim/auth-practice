import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex-1 flex justify-between lg:flex-row flex-col">
            <div
                className="bg-no-repeat bg-center bg-cover lg:w-2/3 flex-1"
                style={{
                    backgroundImage: "url(images/login_page.avif)",
                }}
            >
                L
            </div>
            <div className="lg:w-1/3 flex flex-col w-full flex-1">
                {children}
            </div>
        </div>
    );
}
