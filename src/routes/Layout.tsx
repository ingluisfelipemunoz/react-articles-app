import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "../shared/ui/ThemeToggle";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../app/authSlice";

export default function Layout() {
    const user = useAppSelector(s => s.auth.user);
    const dispatch = useAppDispatch();
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
          {user ? (
              <>
                <span className="text-sm">Hola, {user.name}</span>
                <button className="px-2 py-1 rounded border text-sm" onClick={() => dispatch(logout())}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-2 py-1 rounded border text-sm">
                Login
              </Link>
            )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
