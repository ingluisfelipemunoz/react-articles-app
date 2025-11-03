import type { PropsWithChildren } from "react";


export default function Page({children}: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <div className="max-w-5xl mx-auto p-6">
                {children}
            </div>
        </div>
    );
}