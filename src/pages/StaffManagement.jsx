import { useState } from 'react'
import { IconSearch, IconRefresh, IconUser } from '../components/icons'

const STATUS_STYLES = {
  Active: 'bg-[#22c55e] text-white',
  Blocked: 'bg-[#ef4444] text-white',
  Paused: 'bg-[#3b82f6] text-white',
}

const MOCK_STAFF = [
  { id: 1, name: 'Sarah Chen', role: 'Bartender', status: 'Blocked' },
  { id: 2, name: 'Sarah Chen', role: 'Bartender', status: 'Active' },
  { id: 3, name: 'Sarah Chen', role: 'Bartender', status: 'Blocked' },
  { id: 4, name: 'Sarah Chen', role: 'Bartender', status: 'Paused' },
  { id: 5, name: 'Sarah Chen', role: 'Bartender', status: 'Active' },
  { id: 6, name: 'Sarah Chen', role: 'Bartender', status: 'Blocked' },
  { id: 7, name: 'Sarah Chen', role: 'Bartender', status: 'Active' },
  { id: 8, name: 'Sarah Chen', role: 'Bartender', status: 'Paused' },
  { id: 9, name: 'Sarah Chen', role: 'Bartender', status: 'Active' },
  { id: 10, name: 'Sarah Chen', role: 'Bartender', status: 'Blocked' },
]

const FILTERS = [
  { id: 'all', label: 'All', count: 40 },
  { id: 'active', label: 'Active', count: 10 },
  { id: 'blocked', label: 'Blocked', count: 3 },
]

export default function StaffManagement() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredStaff = MOCK_STAFF.filter((staff) => {
    const matchesSearch = staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.role.toLowerCase().includes(search.toLowerCase())
    if (statusFilter === 'all') return matchesSearch
    return matchesSearch && staff.status.toLowerCase() === statusFilter
  })

  return (
    <div className="flex flex-col">
      {/* Header: title left, Add New Staff right */}
      <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-strong)]">
          Staff Management
        </h1>
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-strong)] transition-colors hover:opacity-90"
          style={{ backgroundColor: '#E0E0E0' }}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add New Staff
        </button>
      </div>

      {/* Search, filter pills, refresh – one row */}
      <div className="mb-4 flex shrink-0 flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1" style={{ minWidth: 200 }}>
          <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text)]" />
          <input
            type="search"
            placeholder="Search drinks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white py-2.5 pl-10 pr-4 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatusFilter(f.id)}
              className={`rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === f.id
                  ? 'bg-[#E0E0E0] text-[var(--color-text-strong)]'
                  : 'border border-[var(--color-border)] bg-white text-[var(--color-text-strong)] hover:bg-[#F4F4F4]'
              }`}
            >
              {f.label} ({f.id === 'all' ? 40 : f.id === 'active' ? 10 : 3})
            </button>
          ))}
        </div>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white text-[var(--color-text)] hover:bg-[#F4F4F4] transition-colors"
          aria-label="Refresh"
        >
          <IconRefresh className="h-5 w-5" />
        </button>
      </div>

      {/* Staff table */}
      <div className="min-w-0 shrink-0 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white">
        <table className="w-full min-w-[500px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[#F4F4F4]">
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
                className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[#FAFAFA] transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)]">
                      <IconUser className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-[var(--color-text-strong)]">{row.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--color-text-strong)]">{row.role}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center justify-center rounded-[var(--radius-md)] px-3 py-1 text-xs font-medium ${STATUS_STYLES[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="rounded p-1.5 text-[var(--color-text)] hover:bg-[#E0E0E0] transition-colors"
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
