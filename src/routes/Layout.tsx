import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white border-b">
                <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="font-bold">App Articulos</div>
                    <nav className="flex items-center gap-4 text-sm">
                        <NavLink to="/articles" className={({isActive}) => `px-2 py-1 rounded ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}>
                            List
                        </NavLink>
                        <NavLink to="/articles/categories" className={({isActive}) => `px-2 py-1 rounded ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}>
                            Categories
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-6">
                <Outlet/>
            </main>
        </div>
    );
}