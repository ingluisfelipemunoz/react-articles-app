import Page from "../../../../../shared/ui/Page";
import { FiltersBar } from "../components/FiltersBar";
import { Pagination } from "../components/Pagination";

export default function ArticlesListPage() {
    return (
        <Page>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Articles</h1>
            </div>
            <div className="mb-4"><FiltersBar/></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-4">
                <div className="rounded-xl border bg-white p-4 shadow-sm">Articulo 1</div>
                <div className="rounded-xl border p-4 bg-white shadow-sm">Articulo 2</div>
                <div className="rounded-xl border p-4 bg-white shadow-sm">Articulo 3</div>
                <div className="rounded-xl border p-4 bg-white shadow-sm">Articulo 4</div>
            </div>
            <div className="mt-6 flex justify-end"><Pagination/></div>
        </Page>
    );
}