import Page from "../../../../../shared/ui/Page";
import { useListCategories } from "../../../application/useListCategories";

export default function ArticlesCategoriesPage() {
    const {data: categories, isLoading} = useListCategories();
    return (
        <Page>
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            {isLoading ? (
                <div className="p-4 rounded-xl border bg-white animate-pulse h-40" />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories?.map(category => (
                        <div key={category.id} className="p-4 rounded-xl border bg-white">
                            <h2 className="text-lg font-bold">{category.name}</h2>
                            <ul className="list-disc list-inside">
                                {category.subcategories?.map(subcategory => (
                                    <li key={subcategory.id}>{subcategory.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </Page>
    );
}