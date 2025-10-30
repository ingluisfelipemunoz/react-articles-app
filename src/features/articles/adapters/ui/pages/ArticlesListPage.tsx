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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-4">data</div>
            <div className="mt-6 flex justify-end"><Pagination/></div>
        </Page>
    );
}