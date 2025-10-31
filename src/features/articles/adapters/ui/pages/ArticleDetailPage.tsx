import { Link, useParams } from "react-router-dom";
import { useGetArticle } from "../../../application/useGetArticle";
import { FavoriteButton } from "../components/FavoriteButton";
import { RatingStars } from "../components/RatingStars";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetArticle(id);

  if (isLoading) return <div className="p-4 rounded-xl border bg-white animate-pulse h-40" />;
  if (error) {
    return (
      <div className="p-4 rounded-xl border bg-red-50 text-red-700">
        Error al cargar el artículo: {error?.message}
      </div>
    );
  }
  if (!data) return <div className="p-4 rounded-xl border bg-white">No encontrado</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="flex items-center gap-2">
          <FavoriteButton articleId={data.id} />
          <Link to={`/articles/${data.id}/edit`} className="px-3 py-1 rounded bg-gray-900 text-white text-sm">
            Editar
          </Link>
          <Link to="/articles" className="px-3 py-1 rounded border text-sm">
            Volver
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-slate-600">
        <span>Promedio: <strong>{data.ratingAvg.toFixed(1)}</strong></span>
        <div><RatingStars articleId={data.id} /></div>
      </div>

      <article className="p-4 rounded-xl border bg-white shadow-sm">
        <p className="whitespace-pre-line">{data.body}</p>
      </article>

      <div className="text-xs text-slate-500">
        <div>Cat: {data.categoryId} {data.subcategoryId ? `> ${data.subcategoryId}` : ""}</div>
        <div>Creado: {new Date(data.createdAt).toLocaleString()}</div>
        <div>Actualizado: {new Date(data.updatedAt).toLocaleString()}</div>
      </div>
    </div>
  );
}
