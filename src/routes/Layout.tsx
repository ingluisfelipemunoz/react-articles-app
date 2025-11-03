import { NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "../shared/ui/ThemeToggle";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="font-bold">Articulos App</div>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/articles" className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`
            }>Listado</NavLink>
            <NavLink to="/articles/categories" className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`
            }>Categorias</NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
