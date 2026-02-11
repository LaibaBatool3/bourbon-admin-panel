import { useState } from 'react'
import Calendar from '../components/Calendar'
import uploadImg from '../assets/icons/upload.png'

const inputClass = 'w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]'
const dateInputClass = 'w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white py-2.5 pl-3 pr-10 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]'

function formatDisplayDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`
}
// Add button: ~110px wide, 38px high, left-aligned
const addBtnClass = 'min-w-[110px] h-10 rounded-[var(--radius-md)] px-4 text-sm font-medium text-white hover:opacity-90 transition-colors'
// Edit/Cancel: ~65px wide, 30px high, stacked vertically, right-aligned
const editBtnClass = 'h-8 min-w-[65px] rounded-[var(--radius-md)] px-3 text-sm font-medium text-white hover:opacity-90 transition-colors'
const cancelBtnClass = 'h-8 min-w-[65px] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[#E8E8E8] px-3 text-sm font-medium text-[var(--color-text-strong)] hover:bg-[#E0E0E0] transition-colors'

// Dark greenish-brown for Add / Edit
const primaryColor = '#5C4033'

const MOCK_WHY_BOURBON_CARDS = [
  { id: 1, title: 'Whiskey Wednesday', description: 'Club members enjoy 20% off all day on Whiskey Wednesday.', imageUrl: null },
  { id: 2, title: 'Whiskey Wednesday', description: 'Club members enjoy 20% off all day on Whiskey Wednesday.', imageUrl: null },
]
const MOCK_WHAT_WE_OFFER_CARDS = [
  { id: 1, title: 'Specail glass', description: 'A custom engraved glass kept here at The Twisted Tail for your drinking pleasure', imageUrl: null },
  { id: 2, title: 'Specail glass', description: 'A custom engraved glass kept here at The Twisted Tail for your drinking pleasure', imageUrl: null },
]

function UploadZone({ label, copyLabel }) {
  return (
    <div
      className="flex min-h-[200px] flex-1 flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-border)] bg-[#FAFAFA] p-6"
      style={{ borderColor: '#D0D0D0' }}
    >
      <img src={uploadImg} alt="" className="h-12 w-12 object-contain" />
      <p className="text-sm font-medium text-[var(--color-text-strong)]">{label}</p>
      <p className="text-sm text-[var(--color-text)]">OR</p>
      <button type="button" className="text-sm font-medium text-[var(--color-text-strong)] underline hover:no-underline">
        {copyLabel}
      </button>
    </div>
  )
}

function ReorderIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  )
}

function ContentSectionCard({ title, subtitle, uploadLabel, copyLabel, onSubmit, showReorderIcon }) {
  const [formTitle, setFormTitle] = useState('')
  const [formDesc, setFormDesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ title: formTitle, description: formDesc })
    setFormTitle('')
    setFormDesc('')
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[#F5F5F5] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[var(--color-text-strong)]">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-[var(--color-text)]">{subtitle}</p>}
        </div>
        {showReorderIcon && (
          <button type="button" className="shrink-0 rounded p-1.5 text-[var(--color-text)] hover:bg-[#E0E0E0]" aria-label="Reorder">
            <ReorderIcon />
          </button>
        )}
      </div>
      <div className="flex min-w-0 gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Title</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Description of the title..."
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Description</label>
            <textarea
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder="Description of the description..."
              rows={4}
              className={inputClass}
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className={addBtnClass}
            style={{ backgroundColor: primaryColor }}
          >
            Add
          </button>
        </div>
        <div className="flex w-[280px] shrink-0 flex-col">
          <UploadZone label={uploadLabel} copyLabel={copyLabel} />
        </div>
      </div>
    </div>
  )
}

const TITLE_LIMIT_EVENTS = 30

function EventsAnnouncementsSection() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [externalLink, setExternalLink] = useState('')
  const [openDatePicker, setOpenDatePicker] = useState(null) // 'start' | 'end' | null

  const handleAdd = (e) => {
    e.preventDefault()
    // Mock: could add to a list of announcements
    setTitle('')
    setDescription('')
    setExternalLink('')
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[#F5F5F5] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[var(--color-text-strong)]">Events / Announcements</h2>
          <p className="mt-1 text-sm text-[var(--color-text)]">Maximum 2 announcements can be shown at the same time.</p>
        </div>
        <button type="button" className="shrink-0 rounded p-1.5 text-[var(--color-text)] hover:bg-[#E0E0E0]" aria-label="Reorder">
          <ReorderIcon />
        </button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleAdd}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative">
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Start date</label>
            <input
              type="text"
              readOnly
              placeholder="XXXXXXXXXXXXX"
              value={formatDisplayDate(startDate)}
              onClick={() => setOpenDatePicker((p) => (p === 'start' ? null : 'start'))}
              className={dateInputClass}
              aria-label="Start date"
            />
            <div className="pointer-events-none absolute right-3 top-9 text-[var(--color-text)]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            {openDatePicker === 'start' && (
              <div className="absolute left-0 top-full z-10 mt-1">
                <Calendar value={startDate || undefined} onChange={setStartDate} onClose={() => setOpenDatePicker(null)} />
              </div>
            )}
          </div>
          <div className="relative">
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">End date</label>
            <input
              type="text"
              readOnly
              placeholder="XXXXXXXXXXXXX"
              value={formatDisplayDate(endDate)}
              onClick={() => setOpenDatePicker((p) => (p === 'end' ? null : 'end'))}
              className={dateInputClass}
              aria-label="End date"
            />
            <div className="pointer-events-none absolute right-3 top-9 text-[var(--color-text)]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            {openDatePicker === 'end' && (
              <div className="absolute left-0 top-full z-10 mt-1">
                <Calendar value={endDate || undefined} onChange={setEndDate} onClose={() => setOpenDatePicker(null)} />
              </div>
            )}
          </div>
        </div>
        <p className="-mt-2 text-xs text-[var(--color-text)]">Use the calendar to schedule when this event should appear in the app.</p>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Title<span className="text-red-500">*</span></label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, TITLE_LIMIT_EVENTS))}
            placeholder="XXXXXXXXXXXXX"
            rows={2}
            className={inputClass}
            maxLength={TITLE_LIMIT_EVENTS}
          />
          <div className="mt-1 flex justify-between text-xs text-[var(--color-text)]">
            <span>30 character text</span>
            <span>{title.length}/{TITLE_LIMIT_EVENTS}</span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Description<span className="text-red-500">*</span></label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="XXXXXXXXXXXXX"
            rows={4}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">External link</label>
          <input
            type="text"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            placeholder="XXXXXXXXXXXXX"
            className={inputClass}
          />
        </div>

        <button type="submit" className={addBtnClass} style={{ backgroundColor: primaryColor }}>
          Add
        </button>
      </form>
    </div>
  )
}

function CurrentCardList({ cards, onEdit, onCancel }) {
  return (
    <div className="flex flex-col gap-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#E0E0E0] text-[var(--color-text)]">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 002.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-[var(--color-text-strong)]">{card.title}</div>
            <div className="text-sm text-[var(--color-text)]">{card.description}</div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <button type="button" onClick={() => onEdit(card.id)} className={editBtnClass} style={{ backgroundColor: primaryColor }}>
              Edit
            </button>
            <button type="button" onClick={() => onCancel(card.id)} className={cancelBtnClass}>
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const selectClass = 'w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 pr-10 text-sm text-[var(--color-text-strong)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D] appearance-none bg-no-repeat bg-[length:16px_16px] bg-[right_12px_center]'
const selectChevronUrl = "url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236D6D6D%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')"

function DailySpecialsSection() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [externalLink, setExternalLink] = useState('')
  const [discountType, setDiscountType] = useState('percentage') // 'percentage' | 'fixed'
  const [discountValue, setDiscountValue] = useState('')
  const [price, setPrice] = useState('')
  const [appliesTo, setAppliesTo] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    setTitle('')
    setDescription('')
    setExternalLink('')
    setDiscountValue('')
    setPrice('')
    setAppliesTo('')
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[#F5F5F5] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-base font-bold text-[var(--color-text-strong)]">Daily Specials</h2>
        <button type="button" className="shrink-0 rounded p-1.5 text-[var(--color-text)] hover:bg-[#E0E0E0]" aria-label="Reorder">
          <ReorderIcon />
        </button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleAdd}>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="XXXXXXXXXXXXX" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="XXXXXXXXXXXXX" rows={4} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">External link</label>
          <input type="text" value={externalLink} onChange={(e) => setExternalLink(e.target.value)} placeholder="XXXXXXXXXXXXX" className={inputClass} />
        </div>
        <div>
          <span className="mb-2 block text-sm font-medium text-[var(--color-text-strong)]">Discount type</span>
          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="discountType" checked={discountType === 'percentage'} onChange={() => setDiscountType('percentage')} className="h-4 w-4 border-[var(--color-border)] text-[#6D6D6D] focus:ring-[#6D6D6D]" />
              <span className="text-sm text-[var(--color-text-strong)]">Percentage discount</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="discountType" checked={discountType === 'fixed'} onChange={() => setDiscountType('fixed')} className="h-4 w-4 border-[var(--color-border)] text-[#6D6D6D] focus:ring-[#6D6D6D]" />
              <span className="text-sm text-[var(--color-text-strong)]">Fixed price</span>
            </label>
          </div>
        </div>
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[#E8E8E8] p-4">
          {discountType === 'percentage' ? (
            <>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Discount value</label>
                <input type="text" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} placeholder="XXXXXXXXXXXXX" className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Applies to</label>
                <select value={appliesTo} onChange={(e) => setAppliesTo(e.target.value)} className={selectClass} style={{ backgroundImage: selectChevronUrl }}>
                  <option value="">XXXXXXXXXXXXX</option>
                  <option value="all">All items</option>
                  <option value="whiskey">Whiskey</option>
                  <option value="food">Food</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Price</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="XXXXXXXXXXXXX" className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Applies to</label>
                <select value={appliesTo} onChange={(e) => setAppliesTo(e.target.value)} className={selectClass} style={{ backgroundImage: selectChevronUrl }}>
                  <option value="">XXXXXXXXXXXXX</option>
                  <option value="all">All items</option>
                  <option value="whiskey">Whiskey</option>
                  <option value="food">Food</option>
                </select>
              </div>
            </>
          )}
        </div>
        <button type="submit" className={addBtnClass} style={{ backgroundColor: primaryColor }}>
          Add
        </button>
      </form>
    </div>
  )
}

export default function ContentManagement() {
  const [whyBourbonCards, setWhyBourbonCards] = useState(MOCK_WHY_BOURBON_CARDS)
  const [whatWeOfferCards, setWhatWeOfferCards] = useState(MOCK_WHAT_WE_OFFER_CARDS)
  const [editingId, setEditingId] = useState(null)

  const handleAddWelcome = (data) => {
    // Welcome Screen: form submit only (no Current card list in design)
    if (!data.title && !data.description) return
  }
  const handleAddWhyBourbon = (data) => {
    if (!data.title && !data.description) return
    setWhyBourbonCards((prev) => [...prev, { id: Date.now(), title: data.title, description: data.description, imageUrl: null }])
  }
  const handleAddWhatWeOffer = (data) => {
    if (!data.title && !data.description) return
    setWhatWeOfferCards((prev) => [...prev, { id: Date.now(), title: data.title, description: data.description, imageUrl: null }])
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="shrink-0 text-2xl font-bold tracking-tight text-[var(--color-text-strong)]">
        Content Management
      </h1>

      <ContentSectionCard
        title="Welcome Screen"
        uploadLabel="Upload photo or video"
        copyLabel="Copy photo or video here"
        onSubmit={handleAddWelcome}
      />

      <ContentSectionCard
        title="Why Bourbon Club?"
        uploadLabel="Upload photo"
        copyLabel="Copy photo here"
        onSubmit={handleAddWhyBourbon}
      />
      <section>
        <h2 className="mb-4 text-base font-bold text-[var(--color-text-strong)]">Current card</h2>
        <CurrentCardList cards={whyBourbonCards} onEdit={() => {}} onCancel={() => {}} />
      </section>

      <ContentSectionCard
        title="What we offer?"
        subtitle="Have a 2oz. pour of all of the listed whiskey on this card and you will receive:"
        uploadLabel="Upload photo"
        copyLabel="Copy photo here"
        onSubmit={handleAddWhatWeOffer}
        showReorderIcon
      />
      <section>
        <h2 className="mb-4 text-base font-bold text-[var(--color-text-strong)]">Current card</h2>
        <CurrentCardList cards={whatWeOfferCards} onEdit={() => {}} onCancel={() => {}} />
      </section>

      <EventsAnnouncementsSection />

      <DailySpecialsSection />
    </div>
  )
}
