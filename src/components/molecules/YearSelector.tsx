type YearSelectorProps = {
  years: string[];
  selected: string;
  onSelect: (year: string) => void;
};

export function YearSelector({ years, selected, onSelect }: YearSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {years.map((year) => {
        const isActive = year === selected;
        return (
          <button
            key={year}
            type="button"
            onClick={() => onSelect(year)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-sky-600 text-white shadow-md shadow-sky-200"
                : "border border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700"
            }`}
            aria-pressed={isActive}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}

