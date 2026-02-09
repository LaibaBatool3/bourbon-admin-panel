import { useState } from 'react'
import { IconSearch } from '../components/icons'
import hugeIcon from '../assets/icons/huge-icon.png'
import loadImg from '../assets/icons/load.png'

const MOCK_STAFF = [
  { id: 1, name: 'Sarah Chen', role: 'Bartender', status: 'Blocked' },
  { id: 2, name: 'Sarah Chen', role: 'Bartender', status: 'Active' },
  { id: 3, name: 'Sarah Chen', role: 'Bartender', status: 'Blocked' },
  { id: 4, name: 'Sarah Chen', role: 'Bartender', status: 'Paused' },
  { id: 5, name: 'James Wilson', role: 'Manager', status: 'Active' },
  { id: 6, name: 'Emma Davis', role: 'Staff', status: 'Active' },
  { id: 7, name: 'Michael Brown', role: 'Admin', status: 'Blocked' },
]

const STATUS_STYLES = {
  Active: 'bg-[#D9FFE3] text-green-800',
  Blocked: 'bg-[#EFB9B9] text-red-800',
  Paused: 'bg-[#EAF4FE] text-blue-800',
}

// Match Figma: brown/gold for active filter; olive for Add button
const tabActiveBg = '#A68B4A'
const tabInactiveBg = '#F8F8F8'

export default function StaffManagement() {
  const [search, setSearch] = useState('')
  const [statusTab, setStatusTab] = useState('all') // 'all' | 'active' | 'blocked'

  const filteredStaff = MOCK_STAFF.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    if (statusTab === 'all') return matchSearch
    if (statusTab === 'active') return matchSearch && s.status === 'Active'
    if (statusTab === 'blocked') return matchSearch && s.status === 'Blocked'
    return matchSearch
  })

  const counts = {
    all: MOCK_STAFF.length,
    active: MOCK_STAFF.filter((s) => s.status === 'Active').length,
    blocked: MOCK_STAFF.filter((s) => s.status === 'Blocked').length,
  }

  return (
    <div className="flex flex-col">
      {/* Row 1: Title (left) + Add New Staff (right) */}
      <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          Staff Management
        </h1>
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: '#646940' }}
        >
          <span className="text-lg leading-none">+</span>
          Add New Staff
        </button>
      </div>

      {/* Row 2: Search bar + filter tabs + refresh */}
      <div className="mb-4 flex shrink-0 flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1" style={{ minWidth: 220 }}>
          <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="search"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E5E7EB] bg-white py-2.5 pl-10 pr-4 text-sm text-[#111] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#A58A4A]"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setStatusTab('all')}
            className="h-10 shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
            style={{
              borderColor: tabActiveBg,
              backgroundColor: statusTab === 'all' ? tabActiveBg : tabInactiveBg,
              color: statusTab === 'all' ? 'white' : '#333',
            }}
          >
            All ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setStatusTab('active')}
            className="h-10 shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
            style={{
              borderColor: tabActiveBg,
              backgroundColor: statusTab === 'active' ? tabActiveBg : tabInactiveBg,
              color: statusTab === 'active' ? 'white' : '#333',
            }}
          >
            Active ({counts.active})
          </button>
          <button
            type="button"
            onClick={() => setStatusTab('blocked')}
            className="h-10 shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
            style={{
              borderColor: tabActiveBg,
              backgroundColor: statusTab === 'blocked' ? tabActiveBg : tabInactiveBg,
              color: statusTab === 'blocked' ? 'white' : '#333',
            }}
          >
            Blocked ({counts.blocked})
          </button>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-[#333] transition-colors hover:opacity-90"
          style={{ borderColor: tabActiveBg, backgroundColor: tabInactiveBg }}
          aria-label="Refresh"
        >
          <img src={loadImg} alt="" className="h-5 w-5 shrink-0 object-contain" />
        </button>
      </div>

      <div className="min-w-0 shrink-0 overflow-x-auto rounded-[var(--radius-lg)] bg-white">
        <table className="w-full min-w-[500px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#F4F4F4]">
              <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Name</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Role</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Status</th>
              <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-[#FAFAFA]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img src={hugeIcon} alt="" className="h-4 w-4 shrink-0 object-contain" />
                    <span className="font-medium text-[var(--color-text-strong)]">{row.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--color-text-strong)]">{row.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center justify-center text-xs font-medium ${STATUS_STYLES[row.status] ?? 'bg-[#E0E0E0] text-[var(--color-text-strong)]'}`}
                    style={{
                      width: 120,
                      height: 40,
                      gap: 4,
                      borderRadius: 22,
                      paddingTop: 8,
                      paddingRight: 14,
                      paddingBottom: 8,
                      paddingLeft: 14,
                      opacity: 1,
                    }}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="rounded p-1.5 text-[var(--color-text)] transition-colors hover:bg-[#E0E0E0]"
                    aria-label="Actions"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
