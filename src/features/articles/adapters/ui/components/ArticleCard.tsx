import type { Article } from '../../../domain/types';

export function ArticleCard({ article } : { article: Article }) {
    return (
        <article className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-lg">{article.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-3">{article.body}</p>
            <div className="mt-3 text-xs text-slate-500">Rating: {article.ratingAvg.toFixed(1)}</div>
        </article>
    );
}