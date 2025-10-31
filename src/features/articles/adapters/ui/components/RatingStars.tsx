import { useId } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { rate } from "../../../store/ratingSlice";
import { selectRatingById } from "../../../store/selectors";

type Props = { articleId: string };

export function RatingStars({ articleId }: Props) {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectRatingById(articleId));
  const groupId = useId();

  return (
    <div role="radiogroup" aria-labelledby={groupId} className="flex items-center gap-1">
      <span id={groupId} className="sr-only">Calificacion</span>
      {([1,2,3,4,5] as const).map(n => (
        <button
          key={n}
          role="radio"
          aria-checked={value === n}
          onClick={() => dispatch(rate({ id: articleId, value: n }))}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              dispatch(rate({ id: articleId, value: Math.min(5, (value || 0) + 1) }));
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              dispatch(rate({ id: articleId, value: Math.max(1, (value || 1) - 1) }));
            }
          }}
          className={`px-1 text-lg leading-none ${n <= value ? "text-yellow-500" : "text-slate-400"}`}
          aria-label={`${n} estrella${n>1?"s":""}`}
          title={`${n} estrella${n>1?"s":""}`}
        >
          ★
        </button>
      ))}
      <span className="ml-1 text-xs text-slate-500">{value || "-"}/5</span>
    </div>
  );
}
