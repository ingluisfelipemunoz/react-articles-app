import { Link } from "react-router-dom";
import type { Article } from "../../../domain/types";
import { FavoriteButton } from "./FavoriteButton";
import { RatingStars } from "./RatingStars";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-3">
      <header className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-lg line-clamp-2">{article.title}</h3>
        <FavoriteButton articleId={article.id} />
      </header>

      <p className="text-sm text-slate-600 line-clamp-3 flex-1">{article.body}</p>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">Avg: {article.ratingAvg.toFixed(1)}</span>
          <RatingStars articleId={article.id} />
        </div>
        <Link
          to={`/articles/${article.id}`}
          className="px-2 py-1 rounded bg-gray-900 text-white text-xs"
        >
          Ver
        </Link>
      </div>
    </article>
  );
}
