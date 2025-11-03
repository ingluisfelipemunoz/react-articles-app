import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import ArticlesListPage from "../features/articles/adapters/ui/pages/ArticlesListPage";
import ArticlesCategoriesPage from "../features/articles/adapters/ui/pages/ArticlesCategoriesPage";
import ArticleDetailPage from "../features/articles/adapters/ui/pages/ArticleDetailPage";
import ArticleFormPage from "../features/articles/adapters/ui/pages/ArticleFormPage";
import RequireAuth from "./RequireAuth";
import LoginPage from "../features/auth/adapters/ui/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true, element: <Navigate to="articles"/>
            },
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "articles",
                children: [
                    {index: true, element: <ArticlesListPage/>},
                    {path: "categories", element: <ArticlesCategoriesPage/>},
                    {path: ":id", element: <ArticleDetailPage/>},

                    {path: "new", element: (<RequireAuth><ArticleFormPage/></RequireAuth>)},
                    {path: ":id/edit", element: (<RequireAuth><ArticleFormPage/></RequireAuth>)}
                ]
            },
            //404
            {path: "*", element: <div className="text-sm text-red-600">Not Found</div>}
        ]
    }
]);