type HeaderProps = {
  title: string;
  description: string;
  rightLabel?: string;
  rightValue?: string | number;
};

export function Header({ title, description, rightLabel, rightValue }: HeaderProps) {
  return (
    <header className="page-header">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 dark:text-white">{title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{description}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 dark:text-slate-400">{rightLabel}</p>
          <p className="text-xl font-bold text-slate-600 dark:text-slate-200">
            {rightValue} {title == "Food Log" ? "kcal" : title == "Activity Log" ? "min" : ""}
          </p>
        </div>
      </div>
    </header>
  );
}
