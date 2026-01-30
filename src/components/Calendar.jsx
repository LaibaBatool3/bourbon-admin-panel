import { useState } from 'react'

// Portuguese day abbreviations – Monday first (Seg, Ter, Qua, Qui, Sex, Sab, Dom)
const DAY_NAMES = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Monday = 0, Sunday = 6 (for Monday-first week)
function getDayOfWeek(date) {
  const d = date.getDay()
  return d === 0 ? 6 : d - 1
}

function getDaysInMonth(year, month) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const daysInMonth = last.getDate()
  const startDay = getDayOfWeek(first)
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const prevLast = new Date(prevYear, prevMonth + 1, 0).getDate()
  const rows = []
  let row = []
  for (let i = 0; i < startDay; i++) {
    row.push({ day: prevLast - startDay + i + 1, current: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    row.push({ day: d, current: true })
    if (row.length === 7) {
      rows.push(row)
      row = []
    }
  }
  let nextDay = 1
  while (row.length > 0 && row.length < 7) {
    row.push({ day: nextDay++, current: false })
  }
  if (row.length) rows.push(row)
  return rows
}

function formatDate(year, month, day) {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

const HEADER_BG = '#708090' // slate grey to match design

export default function Calendar({ value, onChange, onClose }) {
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const d = new Date(value)
      return { year: d.getFullYear(), month: d.getMonth() }
    }
    const n = new Date()
    return { year: n.getFullYear(), month: n.getMonth() }
  })

  const { year, month } = viewDate
  const rows = getDaysInMonth(year, month)
  const selectedDate = value ? new Date(value) : null

  const goPrev = () => {
    if (month === 0) setViewDate({ year: year - 1, month: 11 })
    else setViewDate({ year, month: month - 1 })
  }
  const goNext = () => {
    if (month === 11) setViewDate({ year: year + 1, month: 0 })
    else setViewDate({ year, month: month + 1 })
  }

  const handleSelect = (day, current) => {
    const y = current ? year : (month === 0 ? year - 1 : year)
    const m = current ? month : (month === 0 ? 11 : month - 1)
    const str = formatDate(y, m, day)
    onChange(str)
    onClose?.()
  }

  const isSelected = (day, current) => {
    if (!selectedDate) return false
    const y = current ? year : (month === 0 ? year - 1 : year)
    const m = current ? month : (month === 0 ? 11 : month - 1)
    return (
      selectedDate.getFullYear() === y &&
      selectedDate.getMonth() === m &&
      selectedDate.getDate() === day
    )
  }

  return (
    <div className="w-[340px] rounded-lg border border-[#6D6D6D] bg-white shadow-lg overflow-hidden">
      {/* Top header: "DATA" – dark grey/slate bar, white text, centered; thin black line below */}
      <div
        className="py-1.5 text-center text-xs font-semibold uppercase tracking-wide text-white border-b border-black"
        style={{ backgroundColor: HEADER_BG }}
      >
        DATA
      </div>

      {/* "2024" and "September" – same dark bar, white text, left-aligned; thin black line below */}
      <div
        className="px-3 py-1.5 text-left border-b border-black"
        style={{ backgroundColor: HEADER_BG }}
      >
        <div className="text-[11px] font-medium text-white">{year}</div>
        <div className="text-xs font-bold text-white">{MONTHS[month]}</div>
      </div>

      {/* Month navigation – white bar, dark grey/black text and arrows, bold */}
      <div className="flex items-center justify-between bg-white px-3 py-1.5 border-b border-black">
        <button
          type="button"
          onClick={goPrev}
          className="rounded p-1 font-bold text-[#1a1a1a] hover:bg-[#F4F4F4] transition-colors"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="text-xs font-bold text-[#1a1a1a]">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={goNext}
          className="rounded p-1 font-bold text-[#1a1a1a] hover:bg-[#F4F4F4] transition-colors"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Weekday headers – dark grey/black, white background */}
      <div className="grid grid-cols-7 gap-0.5 text-center text-[11px] font-medium bg-white px-2 pt-1.5 pb-0.5" style={{ color: '#1a1a1a' }}>
        {DAY_NAMES.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Date grid – white background; current month dark, other month #7F869E; selected blue underline; bold */}
      <div className="bg-white px-2 pb-2 pt-0">
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-7 gap-0.5 text-center text-xs">
            {row.map(({ day, current }, j) => {
              const selected = isSelected(day, current)
              return (
                <button
                  key={j}
                  type="button"
                  onClick={() => handleSelect(day, current)}
                  className="rounded py-1 font-bold transition-colors hover:bg-[#F4F4F4]"
                  style={{
                    color: current ? '#1a1a1a' : '#7F869E',
                    borderBottom: selected ? '2px solid #007BFF' : '2px solid transparent',
                  }}
                >
                  {String(day).padStart(2, '0')}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
