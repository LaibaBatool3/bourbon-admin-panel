export default function MetricCard({ title, value, icon: Icon, iconSrc }) {
  return (
    <div
      className="flex min-w-0 flex-1 items-center justify-between rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
    >
      <div>
        <div className="text-sm font-medium text-[var(--color-text)]">
          {title}
        </div>
        <div className="mt-1 text-2xl font-bold text-[var(--color-text-strong)]">
          {value}
        </div>
      </div>
      {iconSrc && (
        <div className="text-[var(--color-text)]">
          <img src={iconSrc} alt="" className="h-8 w-8 object-contain" />
        </div>
      )}
      {!iconSrc && Icon && (
        <div className="text-[var(--color-text)]">
          <Icon className="h-8 w-8" />
        </div>
      )}
    </div>
  )
}
