import { setTheme } from "../../app/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { Theme } from "../../app/uiSlice";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);

  const options: Theme[] = ["light", "dark", "system"];
  return (
    <div className="flex items-center gap-2 text-sm">
      {options.map((t) => (
        <button
          key={t}
          onClick={() => dispatch(setTheme(t))}
          className={`px-2 py-1 rounded border ${
            theme === t ? "bg-gray-900 text-white" : "bg-white"
          }`}
          aria-pressed={theme === t}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
