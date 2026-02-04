import { useState } from 'react'
import { IconSearch, IconUser } from '../components/icons'
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

const tabActiveBg = '#A7935E' // gold/brown for selected tab
const tabInactiveBorder = '#E0E0E0'

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
      <h1 className="mb-4 shrink-0 text-2xl font-bold tracking-tight text-[var(--color-text-strong)]">
        Staff Management
      </h1>

      <div className="mb-4 flex shrink-0 flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1" style={{ minWidth: 200 }}>
          <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text)]" />
          <input
            type="search"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white py-2.5 pl-10 pr-4 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
          />
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[#F4F4F4] px-4 py-2.5 text-sm font-medium text-[var(--color-text-strong)] transition-colors hover:bg-[#E8E8E8]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add New Staff
        </button>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setStatusTab('all')}
            className="rounded-[var(--radius-md)] border px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-90"
            style={{
              borderColor: statusTab === 'all' ? tabActiveBg : tabInactiveBorder,
              backgroundColor: statusTab === 'all' ? tabActiveBg : '#F4F4F4',
              color: statusTab === 'all' ? 'white' : 'var(--color-text-strong)',
            }}
          >
            All ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setStatusTab('active')}
            className="rounded-[var(--radius-md)] border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#E8E8E8]"
            style={{
              borderColor: tabInactiveBorder,
              backgroundColor: statusTab === 'active' ? tabActiveBg : '#F4F4F4',
              color: statusTab === 'active' ? 'white' : 'var(--color-text-strong)',
            }}
          >
            Active ({counts.active})
          </button>
          <button
            type="button"
            onClick={() => setStatusTab('blocked')}
            className="rounded-[var(--radius-md)] border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#E8E8E8]"
            style={{
              borderColor: tabInactiveBorder,
              backgroundColor: statusTab === 'blocked' ? tabActiveBg : '#F4F4F4',
              color: statusTab === 'blocked' ? 'white' : 'var(--color-text-strong)',
            }}
          >
            Blocked ({counts.blocked})
          </button>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[#F4F4F4] text-[var(--color-text)] transition-colors hover:bg-[#E8E8E8]"
          aria-label="Refresh"
        >
          <img src={loadImg} alt="" className="h-5 w-5 shrink-0 object-contain" />
        </button>
      </div>

      <div className="min-w-0 shrink-0 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white">
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
                style={{ borderBottom: '1px solid #E8E8E8' }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <IconUser className="h-4 w-4 shrink-0 text-[var(--color-text)]" />
                    <span className="font-medium text-[var(--color-text-strong)]">{row.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--color-text-strong)]">{row.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[row.status] ?? 'bg-[#E0E0E0] text-[var(--color-text-strong)]'}`}
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
