import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <header>
                <div>
                    <div>Articles App</div>
                    <nav>
                        <NavLink to="/articles">
                            List
                        </NavLink>
                        <NavLink to="/articles/categories">
                            Categories
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    );
}