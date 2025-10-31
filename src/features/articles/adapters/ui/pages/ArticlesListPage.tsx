import Page from "../../../../../shared/ui/Page";
import { useArticlesParams } from "../../../application/useArticlesParams";
import { useListArticles } from "../../../application/useListArticles";
import { ArticleCard } from "../components/ArticleCard";
import { FiltersBar } from "../components/FiltersBar";
import { Pagination } from "../components/Pagination";

export default function ArticlesListPage() {
    const {page, pageSize, q, categoryId, subcategoryId, set} = useArticlesParams();
    const {data, isLoading, error} = useListArticles({page, pageSize, q, categoryId, subcategoryId});


    return (
        <Page>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Articulos</h1>
            </div>
            <div className="mb-4"><FiltersBar/></div>

            {/* mensaje de carga */}
            {isLoading && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({length: 6}).map((_,i) => (
                    <div key={i} className="rounded-xl border bg-white p-4 shadow-sm animate-pulse h-30"></div>))}
            </div>)}

            {/* mensaje de error */}
            {error && !isLoading && (
                <div className="p-4 rounded-xl border bg-red-50 text-red-700">
                    Error al intentar cargar los articulos: {error.message}
                </div>)}


            {/* lista de articulos */}
            {!isLoading && !error && data && (<>
            {
            data.items.length === 0 ? 
            (<div className="p4 rounded-xl border bg-white p-3">Sin resultados...</div>) 
            : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-4">
                {data.items.map(item => (<ArticleCard key={item.id} article={item}/>))}
            </div>)}
            </>)}
            <div className="mt-6 flex justify-end"><Pagination page={data?.page || 0} pageSize={data?.pageSize || 0} total={data?.total || 0} onPageChange={(next) => set({page: next})}/></div>
        </Page>
    );
}