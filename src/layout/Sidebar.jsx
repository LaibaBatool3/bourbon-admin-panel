import { NavLink } from 'react-router-dom'
import {
  IconHouse,
  IconUser,
  IconWhiskey,
  IconUsers,
  IconCertificate,
  IconSettings,
} from '../components/icons'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: IconHouse },
  { to: '/member-management', label: 'Member Management', icon: IconUser },
  { to: '/whiskey-management', label: 'Whiskey Management', icon: IconWhiskey },
  { to: '/staff-management', label: 'Staff Management', icon: IconUsers },
  { to: '/content-management', label: 'Content Management', icon: IconCertificate },
  { to: '/settings', label: 'Settings', icon: IconSettings },
]

export default function Sidebar() {
  return (
    <aside
      className="flex w-[260px] shrink-0 flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-sidebar)] p-4"
      style={{ minHeight: 0 }}
    >
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--color-sidebar-active)] text-[var(--color-text-strong)]'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-sidebar-active)]'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
