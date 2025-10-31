import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { toggle } from "../../../store/favoritesSlice";
import { selectIsFavorite } from "../../../store/selectors";

type Props = { articleId: string };

export function FavoriteButton({ articleId }: Props) {
  const dispatch = useAppDispatch();
  const isFav = useAppSelector(selectIsFavorite(articleId));

  return (
    <button
      type="button"
      aria-pressed={isFav}
      aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
      onClick={() => dispatch(toggle(articleId))}
      className={`px-2 py-1 rounded text-xs border ${
        isFav ? "bg-yellow-400 text-black border-yellow-500" : "bg-white"
      }`}
      title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {isFav ? "★ Fav" : "☆ Fav"}
    </button>
  );
}
