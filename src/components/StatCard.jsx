function StatCard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={25} />
        </div>
      </div>

      {subtitle && (
        <p className="mt-4 text-xs text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default StatCard;