import {z} from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useListCategories } from "../../../application/useListCategories";
import { useGetArticle } from "../../../application/useGetArticle";
import { useUpsertArticle } from "../../../application/useUpsertArticle";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { useEffect, useMemo, useRef } from "react";

const schema = z.object({
    title: z.string().min(3, "Minimo 3 caracteres"),
    body: z.string().min(10, "Minimo 10 caracteres"),
    categoryId: z.string().min(1, "Seleccione una categoria"),
    subcategoryId: z.string().optional().or(z.literal(""))
});

type FormValues = z.infer<typeof schema>;

export default function ArticleFormPage() {
    const {id} = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const {data: categories} = useListCategories();
    const {data: current, isLoading: loadingArticle} = useGetArticle(id);
    const {create, update} = useUpsertArticle(id);

    const {register, handleSubmit, formState, reset, watch, setValue, getValues} = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            body: "",
            categoryId: "",
            subcategoryId: ""
        }
    });

    const initializedRef = useRef(false);

    useEffect(() => {
        if (initializedRef.current) return;
        if (isEdit && current && categories) {
            reset({
                title: current.title,
                body: current.body,
                categoryId: current.categoryId,
                subcategoryId: current.subcategoryId ?? ""
            });
            initializedRef.current = true;
        }
    }, [isEdit, current, categories, reset]);

    // Se asegura que la subcategoria sea seleccionada despues de que carguen 
    // las categorias (la opcion debe existir) en el primer init
    useEffect(() => {
        if (initializedRef.current) return;
        if (!isEdit || !current || !categories) return;
        if (!current.subcategoryId) return;
        const cat = categories.find(c => c.id === current.categoryId);
        const exists = !!cat?.subcategories?.some(s => s.id === current.subcategoryId);
        if (exists) {
            setValue("subcategoryId", current.subcategoryId);
            initializedRef.current = true;
        }
    }, [isEdit, current, categories, setValue]);


    const categoryId = watch("categoryId");

    const subcategories = useMemo(() => {
        const cat = categories?.find(c => c.id === categoryId);
        return cat?.subcategories ?? []
    }, [categories, categoryId]);

    const previousCategoryIdRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        const previousCategoryId = previousCategoryIdRef.current;
        if (previousCategoryId !== undefined && previousCategoryId !== categoryId) {
            setValue("subcategoryId", "");
        }
        previousCategoryIdRef.current = categoryId;
    }, [categoryId, setValue]);

    // cuando carguen las subcategorias
    // si estamos editando y el articulo tiene subcategoryId
    // setearlo una vez si esta vacio
    useEffect(() => {
        if (!isEdit || !current?.subcategoryId) return;
        if (subcategories.length === 0) return;
        const exists = subcategories.some(s => s.id === current.subcategoryId);
        if (!exists) return;
        const curVal = getValues("subcategoryId");
        if (!curVal) {
            setValue("subcategoryId", current.subcategoryId);
        }
    }, [isEdit, current, subcategories, getValues, setValue]);

    const onSubmit = (values: FormValues) => {
        const payload = {
            title: values.title,
            body: values.body,
            categoryId: values.categoryId,
            subcategoryId: values.subcategoryId || null
        }

        if(isEdit) {
            update.mutate(payload, {
                onSuccess: (art) => {
                    navigate(`/articles/${art.id}`);
                }
            });
        } else {
            create.mutate(payload, {
                onSuccess: (art) => {
                    navigate(`/articles/${art.id}`)
                }
            });
        }
    }

    if (isEdit && loadingArticle) {
        return <div className="p-4 rounded-xl border bg-white animate-pulse h-40" />;
    }




    return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{isEdit ? "Editar" : "Crear"} articulo</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Titulo</label>
          <input
            {...register("title")}
            className="w-full px-3 py-2 rounded-lg border"
            placeholder="Título del artículo"
          />
          {formState.errors.title && (
            <p className="text-sm text-red-600 mt-1">{formState.errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contenido</label>
          <textarea
            {...register("body")}
            rows={6}
            className="w-full px-3 py-2 rounded-lg border"
            placeholder="Contenido..."
          />
          {formState.errors.body && (
            <p className="text-sm text-red-600 mt-1">{formState.errors.body.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <select
              {...register("categoryId")}
              className="w-full px-3 py-2 rounded-lg border bg-white"
            >
              <option value="">Selecciona…</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {formState.errors.categoryId && (
              <p className="text-sm text-red-600 mt-1">{formState.errors.categoryId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subcategoria</label>
            <select
              {...register("subcategoryId")}
              className="w-full px-3 py-2 rounded-lg border bg-white"
              disabled={subcategories.length === 0}
            >
              <option value="">(Ninguna)</option>
              {subcategories.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white disabled:opacity-50"
            disabled={create.isPending || update.isPending}
          >
            {isEdit ? (update.isPending ? "Guardando..." : "Guardar") : (create.isPending ? "Creando..." : "Crear")}
          </button>

          <button
            type="button"
            className="px-4 py-2 rounded-lg border"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}