import { IconSearch, IconBell, IconLogOut } from '../components/icons'
import logoImg from '../assets/icons/logo.png'
import sarahImg from '../assets/icons/sarah-chen.png'

export default function Header() {
  return (
    <header className="flex shrink-0 items-center justify-between bg-[var(--color-surface)] px-[32px] py-0" style={{ height: 110 }}>
      <div className="flex items-center gap-6">
        <img
          src={logoImg}
          alt="The Bourbon Club"
          className="h-[110px] w-[110px] shrink-0 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-strong)]">
            Bourbon
          </h1>
          <p className="text-sm text-[var(--color-text)]">
            Manage content and analyze metrics
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text)]" />
          <input
            type="search"
            placeholder="Search"
            className="w-64 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white py-2 pl-10 pr-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text)] focus:border-[var(--color-border)] focus:outline-none focus:ring-1 focus:ring-[var(--color-border)]"
          />
        </div>
        <button
          type="button"
          className="rounded-[var(--radius-md)] p-2 text-[var(--color-text-strong)] hover:bg-[var(--color-page)] transition-colors"
          aria-label="Notifications"
        >
          <IconBell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2">
          <img
            src={sarahImg}
            alt=""
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
          <div className="text-left">
            <div className="text-sm font-medium text-[var(--color-text-strong)]">
              Sarah Chen
            </div>
            <div className="text-xs text-[var(--color-text)]">Owner</div>
          </div>
          <button
            type="button"
            className="ml-1 rounded p-1.5 text-[var(--color-text)] hover:text-[var(--color-text-strong)] hover:bg-[var(--color-page)] transition-colors"
            aria-label="Log out"
          >
            <IconLogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
