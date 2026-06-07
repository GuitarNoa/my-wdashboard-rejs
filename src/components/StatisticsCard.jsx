// StatisticsCard.jsx
export default function StatisticsCard({
  icon: Icon,
  title = "Title",
  value = 0,
}) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
      {/* Icon */}
      {Icon && (
        <div className="flex-shrink-0 bg-white/30 rounded-xl p-2.5 sm:p-3">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      )}

      {/* Text */}
      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-white/70 truncate">{title}</p>
        <p className="text-xl sm:text-2xl font-semibold text-white mt-0.5">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </div>
    </div>
  );
}
