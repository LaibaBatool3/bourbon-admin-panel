import { useLocation } from 'react-router-dom'

export default function Placeholder() {
  const location = useLocation()
  const name = location.pathname.slice(1) || 'Page'
  const title = name.charAt(0).toUpperCase() + name.slice(1)

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold text-slate-800">{title}</h1>
      <p className="text-[var(--color-secondary)]">
        Add routes and components for this page. You can paste or adapt React code exported from Figma into <code className="rounded bg-slate-100 px-1">src/components/figma/</code>.
      </p>
    </div>
  )
}
