import Page from "../../../../../shared/ui/Page";
import { FiltersBar } from "../components/FiltersBar";
import { Pagination } from "../components/Pagination";

export default function ArticlesListPage() {
    return (
        <Page>
            <div>
                <h1>articles</h1>
            </div>
            <div><FiltersBar/></div>
            <div>data</div>
            <div><Pagination/></div>
        </Page>
    );
}