import { Link } from 'react-router-dom';
import type { Article } from '../../../domain/types';

export function ArticleCard({ article } : { article: Article }) {
    return (
        <article className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-lg">{article.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-3">{article.body}</p>
            <span className="mt-3 text-xs text-slate-500">Rating: {article.ratingAvg.toFixed(1)}</span>
            <Link to={`/articles/${article.id}`}
            className='m-2 px-2 py-1 rounded bg-gray-900 text-white text-xs'
            >Ver</Link>
        </article>
    );
}