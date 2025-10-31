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
                <select value={categoryId} onChange={(e) => set({categoryId: e.target.value || undefined, 
                subcategoryId: undefined , page: 1
                })}>
                    <option value="">Todas</option>
                    {categories?.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
            </div>
        </div>
    );
}