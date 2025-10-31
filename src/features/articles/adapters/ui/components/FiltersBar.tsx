import { useMemo } from "react";
import { useArticlesParams } from "../../../application/useArticlesParams";
import { useListCategories } from '../../../application/useListCategories';

export function FiltersBar() {
    const {page, pageSize, q, categoryId, subcategoryId, set} = useArticlesParams();
    const {data: categories, isLoading} = useListCategories();


    const subcategories = useMemo(() => {
        const cat = categories?.find(c => c.id == categoryId);
        return cat?.subcategories ?? [];
    }, [categories, categoryId]);

    return (
        <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col">
                <label className="text-xs font-medium mb-1">Buscar</label>
                <input value={q} onChange={(e) => set({q: e.target.value, page: 1})} className="px-3 py-2 rounded-lg border w-64" placeholder="Titulo o Contenido..."/>
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-medium mb-1">Categoria</label>
                <select className="px-3 py-2 rounded-lg border w-56 bg-white disabled:bg-gray-300"
                value={categoryId} onChange={(e) => set({categoryId: e.target.value || undefined, 
                subcategoryId: undefined , page: 1
                })} disabled={isLoading}>
                    <option value="">Todas</option>
                    {categories?.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-medium mb-1">Subcategoria</label>
                <select value={subcategoryId} onChange={(e) => set({subcategoryId: e.target.value || undefined, page: 1})}
                    className="px-3 py-2 rounded-lg border w-56 bg-white disabled:bg-gray-300"
                    disabled={!categoryId || subcategories.length === 0}
                    ></select>
            </div>
        </div>
    );
}