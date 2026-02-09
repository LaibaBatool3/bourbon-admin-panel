import { NavLink } from 'react-router-dom'
import dashboardImg from '../assets/icons/dashboard.png'
import memberManagementImg from '../assets/icons/member-management.png'
import totalBourbonsImg from '../assets/icons/total-bourbons.png'
import staffImg from '../assets/icons/staff.png'
import drinkManagementImg from '../assets/icons/drink-management.png'
import settingsImg from '../assets/icons/settings.png'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', iconSrc: dashboardImg },
  { to: '/member-management', label: 'Member Management', iconSrc: memberManagementImg },
  { to: '/whiskey-management', label: 'Whiskey Management', iconSrc: totalBourbonsImg },
  { to: '/staff-management', label: 'Staff Management', iconSrc: staffImg },
  { to: '/content-management', label: 'Content Management', iconSrc: drinkManagementImg },
  { to: '/settings', label: 'Settings', iconSrc: settingsImg },
]

export default function Sidebar() {
  return (
    <aside
      className="flex w-[260px] shrink-0 flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-sidebar)] p-4"
      style={{ minHeight: 0 }}
    >
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, iconSrc }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-[var(--color-text-strong)]'
                  : 'text-[var(--color-text)] hover:bg-[#EBE9D6]'
              }`}
            style={({ isActive }) => ({
              backgroundColor: isActive ? '#EBE9D6' : 'transparent',
            })}
          >
            <img src={iconSrc} alt="" className="h-5 w-5 shrink-0 object-contain" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
