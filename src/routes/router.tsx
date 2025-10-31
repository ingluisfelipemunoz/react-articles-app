import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import ArticlesListPage from "../features/articles/adapters/ui/pages/ArticlesListPage";
import ArticlesCategoriesPage from "../features/articles/adapters/ui/pages/ArticlesCategoriesPage";
import ArticleDetailPage from "../features/articles/adapters/ui/pages/ArticleDetailPage";
import ArticleFormPage from "../features/articles/adapters/ui/pages/ArticleFormPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true, element: <Navigate to="articles"/>
            },
            {
                path: "articles",
                children: [
                    {index: true, element: <ArticlesListPage/>},
                    {path: "categories", element: <ArticlesCategoriesPage/>},
                    {path: ":id", element: <ArticleDetailPage/>},
                    {path: "new", element: <ArticleFormPage/>},
                    {path: ":id/edit", element: <ArticleFormPage/>}
                ]
            },
            //404
            {path: "*", element: <div className="text-sm text-red-600">Not Found</div>}
        ]
    }
]);