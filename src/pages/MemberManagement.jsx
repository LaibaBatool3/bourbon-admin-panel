import { useState } from 'react'
import { IconSearch, IconUser } from '../components/icons'
import Calendar from '../components/Calendar'
import filterImg from '../assets/icons/filter.png'

const STATUS_STYLES = {
  Active: 'bg-[#E6F7E6] text-green-800',
  Blocked: 'bg-[#FFCCCC] text-red-800',
  Paused: 'bg-[#E0F2F7] text-blue-800',
}

function IconPencil({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function IconTrash({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}

function IconFlag({ className = 'w-4 h-4', fillColor }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fillColor || 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  )
}

const MOCK_COMMENTS = [
  { id: 1, name: 'Sarah Chen', text: 'A well-balanced bourbon with pleasant notes of vanilla and caramel. Smooth finish, easy to enjoy neat or in cocktails.', timeAgo: '2 days ago', flagged: false },
  { id: 2, name: 'Sarah Chen', text: 'A well-balanced bourbon with pleasant notes of vanilla and caramel. Smooth finish, easy to enjoy neat or in cocktails.', timeAgo: '2 days ago', flagged: false },
  { id: 3, name: 'Sarah Chen', text: 'A well-balanced bourbon with pleasant notes of vanilla and caramel. Smooth finish, easy to enjoy neat or in cocktails.', timeAgo: '2 days ago', flagged: true },
  { id: 4, name: 'Sarah Chen', text: 'A well-balanced bourbon with pleasant notes of vanilla and caramel. Smooth finish, easy to enjoy neat or in cocktails.', timeAgo: '2 days ago', flagged: true },
  { id: 5, name: 'Sarah Chen', text: 'A well-balanced bourbon with pleasant notes of vanilla and caramel. Smooth finish, easy to enjoy neat or in cocktails.', timeAgo: '2 days ago', flagged: false },
  { id: 6, name: 'Sarah Chen', text: 'A well-balanced bourbon with pleasant notes of vanilla and caramel. Smooth finish, easy to enjoy neat or in cocktails.', timeAgo: '2 days ago', flagged: true },
  { id: 7, name: 'Sarah Chen', text: 'A well-balanced bourbon with pleasant notes of vanilla and caramel. Smooth finish, easy to enjoy neat or in cocktails.', timeAgo: '2 days ago', flagged: false },
  { id: 8, name: 'Sarah Chen', text: 'A well-balanced bourbon with pleasant notes of vanilla and caramel. Smooth finish, easy to enjoy neat or in cocktails.', timeAgo: '2 days ago', flagged: true },
]

const MOCK_MEMBERS = [
  { id: 1, name: 'Sarah Chen', status: 'Active', email: 'sarah@gmail.com', phone: '(252) 555-0126', tastingCompleted: 23, tastingTotal: 30, avgRating: 8.4, comments: 12, favorites: 15 },
  { id: 2, name: 'James Wilson', status: 'Blocked', email: 'james@example.com', phone: '(252) 555-0127', tastingCompleted: 10, tastingTotal: 30, avgRating: 7.2, comments: 5, favorites: 8 },
  { id: 3, name: 'Emma Davis', status: 'Paused', email: 'emma@example.com', phone: '(252) 555-0128', tastingCompleted: 18, tastingTotal: 30, avgRating: 8.0, comments: 9, favorites: 11 },
  { id: 4, name: 'Michael Brown', status: 'Active', email: 'michael@example.com', phone: '(252) 555-0129', tastingCompleted: 28, tastingTotal: 30, avgRating: 8.6, comments: 14, favorites: 20 },
  { id: 5, name: 'Olivia Martinez', status: 'Active', email: 'olivia@example.com', phone: '(252) 555-0130', tastingCompleted: 15, tastingTotal: 30, avgRating: 7.8, comments: 7, favorites: 9 },
  { id: 6, name: 'William Taylor', status: 'Paused', email: 'william@example.com', phone: '(252) 555-0131', tastingCompleted: 22, tastingTotal: 30, avgRating: 8.1, comments: 11, favorites: 13 },
  { id: 7, name: 'Sophia Anderson', status: 'Blocked', email: 'sophia@example.com', phone: '(252) 555-0132', tastingCompleted: 8, tastingTotal: 30, avgRating: 6.9, comments: 3, favorites: 6 },
  { id: 8, name: 'Benjamin Thomas', status: 'Active', email: 'benjamin@example.com', phone: '(252) 555-0133', tastingCompleted: 30, tastingTotal: 30, avgRating: 8.7, comments: 18, favorites: 22 },
  { id: 9, name: 'Isabella Jackson', status: 'Active', email: 'isabella@example.com', phone: '(252) 555-0134', tastingCompleted: 19, tastingTotal: 30, avgRating: 8.2, comments: 8, favorites: 12 },
  { id: 10, name: 'Lucas White', status: 'Paused', email: 'lucas@example.com', phone: '(252) 555-0135', tastingCompleted: 14, tastingTotal: 30, avgRating: 7.5, comments: 6, favorites: 10 },
  { id: 11, name: 'Ava Harris', status: 'Blocked', email: 'ava@example.com', phone: '(252) 555-0136', tastingCompleted: 12, tastingTotal: 30, avgRating: 7.0, comments: 4, favorites: 7 },
  { id: 12, name: 'Henry Clark', status: 'Active', email: 'henry@example.com', phone: '(252) 555-0137', tastingCompleted: 25, tastingTotal: 30, avgRating: 8.5, comments: 13, favorites: 16 },
]

export default function MemberManagement() {
  const [search, setSearch] = useState('')
  const [selectedMember, setSelectedMember] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [openDatePicker, setOpenDatePicker] = useState(null) // 'from' | 'to' | null
  const [whiskeyCompletions, setWhiskeyCompletions] = useState('') // '' | 'any' | 'at_least_1' | '90_complete'
  const [whiskeyDropdownOpen, setWhiskeyDropdownOpen] = useState(false)
  const [commentsFilter, setCommentsFilter] = useState('all') // 'all' | 'flagged'
  const [isEditAccountOpen, setIsEditAccountOpen] = useState(false)
  const [editAccountForm, setEditAccountForm] = useState({ name: '', email: '', phone: '' })
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)
  const [deletedIds, setDeletedIds] = useState([])

  const WHISKEY_OPTIONS = [
    { value: 'any', label: 'ANY' },
    { value: 'at_least_1', label: 'AT LEAST 1' },
    { value: '90_complete', label: '90% COMPLETE' },
  ]
  const whiskeyLabel = whiskeyCompletions
    ? WHISKEY_OPTIONS.find((o) => o.value === whiskeyCompletions)?.label ?? 'Whiskey completions'
    : 'Whiskey completions'

  const formatDisplayDate = (iso) => {
    if (!iso) return ''
    const [y, m, d] = iso.split('-')
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return `${months[Number(m) - 1]} ${Number(d)}, ${y}`
  }

  const filteredMembers = MOCK_MEMBERS.filter(
    (m) => !deletedIds.includes(m.id) && m.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col">
      {/* Section title ??? outside the grey div */}
      <h1 className="mb-4 shrink-0 text-2xl font-bold tracking-tight text-[var(--color-text-strong)]">
        Member Management
      </h1>

      {/* Two columns: grey div (left) + Select a member (right, outside grey div) ??? page scrolls, not section */}
      <div className="flex gap-6 items-start">
        {/* Left: member list - very light grey background */}
        <div
          className="flex w-[260px] shrink-0 flex-col gap-2 rounded-[12px] p-3"
          style={{ backgroundColor: '#F5F5F5' }}
        >
          {/* Search + filter row ??? border #6D6D6D, bg #FAFAFA80 */}
          <div className="flex shrink-0 gap-2">
            <div className="relative min-w-0 flex-1">
              <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text)]" />
              <input
                type="search"
                placeholder="Name Member"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-[var(--radius-md)] border py-2.5 pl-10 pr-4 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
                style={{ borderColor: '#6D6D6D', backgroundColor: 'white' }}
              />
            </div>
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="flex shrink-0 items-center justify-center rounded-[var(--radius-md)] border px-4 py-2.5 transition-colors hover:opacity-90"
              style={{
                borderColor: '#6D6D6D',
                backgroundColor: isFilterOpen ? '#6D6D6D' : 'white',
                color: isFilterOpen ? '#ffffff' : undefined,
              }}
              aria-label="Filter or sort"
              aria-pressed={isFilterOpen}
            >
              <img src={filterImg} alt="" className="h-5 w-5 shrink-0 object-contain" style={{ filter: isFilterOpen ? 'brightness(0) invert(1)' : 'none' }} />
            </button>
          </div>

          {/* Filter options ??? shown when filter is pressed */}
          {isFilterOpen && (
            <div className="flex shrink-0 flex-col gap-2">
              <div className="flex gap-2">
                {/* Date from ??? opens calendar with month div #F4F4F4, details #7F869E */}
                <div className="relative min-w-0 flex-1">
                  <input
                    type="text"
                    readOnly
                    placeholder="Date from"
                    value={formatDisplayDate(dateFrom)}
                    onClick={() => { setWhiskeyDropdownOpen(false); setOpenDatePicker((p) => (p === 'from' ? null : 'from')); }}
                    className="w-full rounded-[var(--radius-md)] border py-2.5 pl-3 pr-4 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
                    style={{ borderColor: '#6D6D6D', backgroundColor: 'white' }}
                    aria-label="Date from"
                  />
                  {openDatePicker === 'from' && (
                    <div className="absolute left-0 top-full z-10 mt-1">
                      <Calendar
                        value={dateFrom || undefined}
                        onChange={setDateFrom}
                        onClose={() => setOpenDatePicker(null)}
                      />
                    </div>
                  )}
                </div>
                {/* Date to ??? same calendar styling */}
                <div className="relative min-w-0 flex-1">
                  <input
                    type="text"
                    readOnly
                    placeholder="Date to"
                    value={formatDisplayDate(dateTo)}
                    onClick={() => { setWhiskeyDropdownOpen(false); setOpenDatePicker((p) => (p === 'to' ? null : 'to')); }}
                    className="w-full rounded-[var(--radius-md)] border py-2.5 pl-3 pr-4 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
                    style={{ borderColor: '#6D6D6D', backgroundColor: 'white' }}
                    aria-label="Date to"
                  />
                  {openDatePicker === 'to' && (
                    <div className="absolute left-0 top-full z-10 mt-1">
                      <Calendar
                        value={dateTo || undefined}
                        onChange={setDateTo}
                        onClose={() => setOpenDatePicker(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Whiskey completions ??? custom dropdown with checkmark on selected */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setWhiskeyDropdownOpen((o) => !o)
                    setOpenDatePicker(null)
                  }}
                  className="flex w-full items-center justify-between rounded-[var(--radius-md)] border py-2.5 pl-3 pr-3 text-sm text-left focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
                  style={{ borderColor: '#6D6D6D', backgroundColor: 'white', color: whiskeyCompletions ? 'var(--color-text-strong)' : 'var(--color-text)' }}
                  aria-label="Whiskey completions"
                  aria-expanded={whiskeyDropdownOpen}
                >
                  <span>{whiskeyLabel}</span>
                  <span className="shrink-0 text-[var(--color-text)]">
                    {whiskeyDropdownOpen ? (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    )}
                  </span>
                </button>
                {whiskeyDropdownOpen && (
                  <div
                    className="absolute left-0 right-0 top-full z-20 mt-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white py-1 shadow-md"
                    style={{ borderColor: '#6D6D6D' }}
                  >
                    {WHISKEY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setWhiskeyCompletions(opt.value)
                          setWhiskeyDropdownOpen(false)
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: whiskeyCompletions === opt.value ? '#646940' : 'transparent',
                          color: whiskeyCompletions === opt.value ? 'white' : 'var(--color-text-strong)',
                        }}
                      >
                        {whiskeyCompletions === opt.value ? (
                          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <span className="w-4 shrink-0" />
                        )}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Member list ??? small divs #FAFAFA80, no borders; grows with content so page scrolls */}
          <div className="flex flex-col gap-2">
            {filteredMembers.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedMember(member)}
                className={`flex w-full shrink-0 items-center justify-between rounded-[var(--radius-md)] px-4 py-3 text-left transition-colors hover:opacity-90 ${
                  selectedMember?.id === member.id ? 'opacity-100 ring-1 ring-[#6D6D6D]' : ''
                }`}
                style={{ backgroundColor: selectedMember?.id === member.id ? '#EBE9D6' : 'white' }}
              >
                <span className="text-sm font-medium text-[var(--color-text-strong)]">
                  {member.name}
                </span>
                <span
                  className={`inline-flex items-center justify-center text-sm font-medium ${STATUS_STYLES[member.status]}`}
                  style={{
                    width: 120,
                    height: 40,
                    borderRadius: 22,
                    paddingTop: 8,
                    paddingRight: 14,
                    paddingBottom: 8,
                    paddingLeft: 14,
                    gap: 4,
                  }}
                >
                  {member.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Select a member or member detail */}
        <div
          className="scrollbar-hide flex min-h-[50vh] min-w-0 flex-1 flex-col gap-4 overflow-y-auto rounded-[var(--radius-lg)] p-4"
          style={{ backgroundColor: 'white' }}
        >
          {!selectedMember ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-[var(--color-text)]">Select a member</p>
            </div>
          ) : (
            <>
              {/* Section 1: Member Profile Card */}
              <div className="flex shrink-0 items-center justify-between rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-border)] text-[var(--color-text)]">
                    <IconUser className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--color-text-strong)]">{selectedMember.name}</div>
                    <div className="text-sm text-[var(--color-text)]">{selectedMember.email}</div>
                    <div className="text-sm text-[var(--color-text)]">{selectedMember.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_STYLES[selectedMember.status]}`}>
                    {selectedMember.status}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditAccountForm({
                          name: selectedMember.name,
                          email: selectedMember.email,
                          phone: selectedMember.phone,
                        })
                        setIsEditAccountOpen(true)
                      }} 
                      className="rounded p-1.5 text-[var(--color-text)] hover:bg-[#F4F4F4]"
                      aria-label="Edit member"
                    >
                      <IconPencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDeleteAccountOpen(true)}
                      className="rounded p-1.5 text-[var(--color-text)] hover:bg-[#F4F4F4]"
                      aria-label="Delete account"
                    >
                      <IconTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 2: Progress Overview + Status Management (two columns) */}
              <div className="flex min-w-0 flex-1 gap-4">
                {/* Progress Overview card - light grey */}
                <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4" style={{ backgroundColor: '#F5F5F5' }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[var(--color-text-strong)]">Progress Overview</h3>
                    <button type="button" className="rounded p-1 text-[var(--color-text)] hover:bg-[#F4F4F4]" aria-label="Edit progress">
                      <IconPencil className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text)]">Tasting Completed</span>
                    <span className="font-medium text-[var(--color-text-strong)]">
                      {selectedMember.tastingCompleted}/{selectedMember.tastingTotal}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#F4F4F4]">
                    <div
                      className="h-full rounded-full bg-[#6D6D6D]"
                      style={{ width: `${(selectedMember.tastingCompleted / selectedMember.tastingTotal) * 100}%` }}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-1 flex-col items-center justify-center rounded-[var(--radius-md)] py-3 text-white" style={{ backgroundColor: '#A6A6A6' }}>
                      <span className="text-lg font-bold">{selectedMember.avgRating}</span>
                      <span className="text-xs">Avg Rating</span>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center rounded-[var(--radius-md)] py-3 text-white" style={{ backgroundColor: '#A6A6A6' }}>
                      <span className="text-lg font-bold">{selectedMember.favorites}</span>
                      <span className="text-xs">Favorites</span>
                    </div>
                  </div>
                </div>

                {/* Status Management card - light grey */}
                <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4" style={{ backgroundColor: '#F5F5F5' }}>
                  <h3 className="text-base font-bold text-[var(--color-text-strong)]">Status Management</h3>
                  <div>
                    <label className="mb-1 block text-sm text-[var(--color-text)]">Membership Status</label>
                    <select
                      defaultValue={selectedMember.status.toLowerCase()}
                      className="w-full rounded-[var(--radius-md)] border border-[#6D6D6D] bg-white py-2 pl-3 pr-8 text-sm text-[var(--color-text-strong)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                      <option value="paused">Paused</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="mt-auto w-full rounded-[var(--radius-md)] py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#AA9456' }}
                  >
                    Update Status
                  </button>
                </div>
              </div>

              {/* Section 3: Tasting History - light grey card */}
              <div className="shrink-0 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4" style={{ backgroundColor: '#F5F5F5' }}>
                <h3 className="mb-3 text-base font-bold text-[var(--color-text-strong)]">Tasting History</h3>
                <div className="flex flex-col gap-2">
                  {/* Table header ??? dark grey, white uppercase, rounded top corners */}
                  <div
                    className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 rounded-t-[var(--radius-lg)] px-4 py-3 text-xs font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: '#A6A6A6' }}
                  >
                    <span>Date</span>
                    <span>Bourbon Name</span>
                    <span>Staff Member</span>
                    <span className="w-8 text-center">Actions</span>
                  </div>
                  {/* Data rows ??? each a separate rounded card with vertical gap */}
                  {[
                    { date: '2025-11-01', bourbonName: "Baker's", staffMember: selectedMember.name },
                    { date: '2025-11-01', bourbonName: "Baker's", staffMember: selectedMember.name },
                    { date: '2025-11-01', bourbonName: "Baker's", staffMember: selectedMember.name },
                    { date: '2025-11-01', bourbonName: "Baker's", staffMember: selectedMember.name },
                    { date: '2025-11-01', bourbonName: "Baker's", staffMember: selectedMember.name },
                    { date: '2025-11-01', bourbonName: "Baker's", staffMember: selectedMember.name },
                    { date: '2025-11-01', bourbonName: "Baker's", staffMember: selectedMember.name },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 rounded-[var(--radius-lg)] px-4 py-3 text-sm font-medium text-[var(--color-text-strong)]"
                      style={{ backgroundColor: 'white' }}
                    >
                      <span>{row.date}</span>
                      <span>{row.bourbonName}</span>
                      <span>{row.staffMember}</span>
                      <button
                        type="button"
                        className="rounded p-1 text-[var(--color-text)] hover:bg-[#E0E0E0] transition-colors"
                        aria-label="Actions"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <circle cx="12" cy="5" r="1.5" />
                          <circle cx="12" cy="12" r="1.5" />
                          <circle cx="12" cy="19" r="1.5" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Member Comments ??? tabs + comment cards */}
              <div className="shrink-0 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
                <h3 className="mb-3 text-base font-bold text-[var(--color-text-strong)]">Member Comments</h3>
                <div className="mb-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCommentsFilter('all')}
                    className={`rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors ${
                      commentsFilter === 'all'
                        ? 'text-white'
                        : 'bg-white text-[var(--color-text-strong)] hover:bg-[#F5F5F5]'
                    }`}
                    style={{
                      backgroundColor: commentsFilter === 'all' ? '#AA9456' : undefined,
                      border: commentsFilter === 'all' ? '1px solid #AA9456' : '1px solid var(--color-border)',
                    }}
                  >
                    All ({MOCK_COMMENTS.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommentsFilter('flagged')}
                    className={`rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors ${
                      commentsFilter === 'flagged'
                        ? 'text-white'
                        : 'bg-white text-[var(--color-text-strong)] hover:bg-[#F5F5F5]'
                    }`}
                    style={{
                      backgroundColor: commentsFilter === 'flagged' ? '#AA9456' : undefined,
                      border: commentsFilter === 'flagged' ? '1px solid #AA9456' : '1px solid var(--color-border)',
                    }}
                  >
                    Flagged comments ({MOCK_COMMENTS.filter((c) => c.flagged).length})
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {MOCK_COMMENTS.filter((c) => (commentsFilter === 'flagged' ? c.flagged : true)).map((comment) => (
                    <div
                      key={comment.id}
                      className="relative rounded-[var(--radius-md)] border border-[var(--color-border)] p-4"
                      style={{ backgroundColor: 'white' }}
                    >
                      {comment.flagged && (
                        <button
                          type="button"
                          className="absolute right-3 top-3 rounded p-1 hover:bg-[#E0E0E0]"
                          aria-label="Flagged"
                        >
                          <IconFlag className="h-4 w-4" fillColor="#AA9456" style={{ color: '#AA9456' }} />
                        </button>
                      )}
                      <div className="pr-8 pb-8">
                        <div className="text-sm font-bold text-[var(--color-text-strong)]">{comment.name}</div>
                        <p className="mt-1 text-sm text-[var(--color-text-strong)]">&quot;{comment.text}&quot;</p>
                        <div className="mt-2 text-xs text-[var(--color-text)]">{comment.timeAgo}</div>
                      </div>
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 rounded p-1.5 text-[var(--color-text)] hover:bg-[#F4F4F4]"
                        aria-label="Delete comment"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit account modal ??? shown when pencil is clicked */}
      {isEditAccountOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={() => setIsEditAccountOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-account-title"
        >
          <div
            className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 shadow-lg"
            style={{ backgroundColor: 'white' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="edit-account-title" className="text-lg font-bold text-[var(--color-text-strong)]">
                Edit account
              </h2>
              <button
                type="button"
                onClick={() => setIsEditAccountOpen(false)}
                className="rounded p-1.5 text-[var(--color-text)] hover:bg-[#E0E0E0] transition-colors"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                // Update selected member with form values (mock ??? in real app would call API)
                if (selectedMember) {
                  const updated = {
                    ...selectedMember,
                    name: editAccountForm.name,
                    email: editAccountForm.email,
                    phone: editAccountForm.phone,
                  }
                  setSelectedMember(updated)
                  const idx = MOCK_MEMBERS.findIndex((m) => m.id === selectedMember.id)
                  if (idx !== -1) {
                    MOCK_MEMBERS[idx] = { ...MOCK_MEMBERS[idx], ...updated }
                  }
                }
                setIsEditAccountOpen(false)
              }}
            >
              <div>
                <label htmlFor="edit-name" className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-name"
                  type="text"
                  required
                  value={editAccountForm.name}
                  onChange={(e) => setEditAccountForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-[var(--radius-md)] bg-white px-3 py-2 text-sm text-[var(--color-text-strong)] focus:outline-none focus:ring-1"
                  style={{ border: '1px solid #646940', borderColor: '#646940' }}
                  placeholder="Name"
                />
                <style>{`
                  #edit-name::placeholder { color: #A6A6A6; }
                `}</style>
              </div>
              <div>
                <label htmlFor="edit-email" className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-email"
                  type="email"
                  required
                  value={editAccountForm.email}
                  onChange={(e) => setEditAccountForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-[var(--radius-md)] bg-white px-3 py-2 text-sm text-[var(--color-text-strong)] focus:outline-none focus:ring-1"
                  style={{ border: '1px solid #646940', borderColor: '#646940' }}
                  placeholder="Email"
                />
                <style>{`
                  #edit-email::placeholder { color: #A6A6A6; }
                `}</style>
              </div>
              <div>
                <label htmlFor="edit-phone" className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">
                  Phone number<span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-phone"
                  type="tel"
                  required
                  value={editAccountForm.phone}
                  onChange={(e) => setEditAccountForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-[var(--radius-md)] bg-white px-3 py-2 text-sm text-[var(--color-text-strong)] focus:outline-none focus:ring-1"
                  style={{ border: '1px solid #646940', borderColor: '#646940' }}
                  placeholder="Phone number"
                />
                <style>{`
                  #edit-phone::placeholder { color: #A6A6A6; }
                `}</style>
              </div>
              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditAccountOpen(false)}
                  className="rounded-[var(--radius-md)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-strong)] hover:bg-[#F4F4F4] transition-colors"
                  style={{ border: '1px solid #CCCCCC' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#646940' }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete account confirmation modal */}
      {isDeleteAccountOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={() => setIsDeleteAccountOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
        >
          <div
            className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 shadow-lg"
            style={{ backgroundColor: 'white' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="delete-account-title" className="text-lg font-bold text-[var(--color-text-strong)]">
                Delete Account
              </h2>
              <button
                type="button"
                onClick={() => setIsDeleteAccountOpen(false)}
                className="rounded p-1.5 text-[var(--color-text)] hover:bg-[#E0E0E0] transition-colors"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mb-6 text-sm text-[var(--color-text)] leading-relaxed">
              Are you sure you want to permanently delete this account? This action cannot be undone. All member data, activity history, and access permissions will be removed.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDeleteAccountOpen(false)}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-strong)] hover:bg-[#F4F4F4] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (selectedMember) {
                    setDeletedIds((ids) => [...ids, selectedMember.id])
                    setSelectedMember(null)
                  }
                  setIsDeleteAccountOpen(false)
                }}
                className="rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: '#6D6D6D' }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
