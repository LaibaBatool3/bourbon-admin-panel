import { useState } from 'react'
import { IconSearch } from '../components/icons'
import loadImg from '../assets/icons/load.png'
import uploadImg from '../assets/icons/upload.png'
import imageImg from '../assets/icons/Image.png'
import Calendar from '../components/Calendar'

const MOCK_BOURBONS = [
  { id: 1, name: 'Bourbon', category: 'Signature', age: 4, price: 45.99, status: 'Out of Stock (0)', isWom: true },
  { id: 2, name: 'Bourbon', category: 'Signature', age: 4, price: 45.99, status: 'Out of Stock (0)', isWom: false },
  { id: 3, name: 'Bourbon', category: 'Signature', age: 4, price: 45.99, status: 'Out of Stock (0)', isWom: false },
  { id: 4, name: 'Bourbon', category: 'Signature', age: 4, price: 45.99, status: 'Out of Stock (0)', isWom: false },
]

const TABS = [
  { id: 'all', label: 'All Bourbons' },
  { id: 'create', label: 'Create Bourbon' },
  { id: 'wom', label: 'Whiskey of the Month' },
]

// Whiskey of the Month – mock data
const CURRENT_WOM = {
  name: 'Bulleit Frontier Whiskey',
  category: 'Kentucky Straight',
  volume: '0.7L',
  price: '$39',
  month: 'November',
  date: '2025-11-01',
}
const MOCK_SCHEDULED = [
  { id: 1, name: 'Bourbon', month: 'September', date: '2025-11-01' },
  { id: 2, name: 'Bourbon', month: 'September', date: '2025-11-01' },
  { id: 3, name: 'Bourbon', month: 'September', date: '2025-11-01' },
  { id: 4, name: 'Bourbon', month: 'September', date: '2025-11-01' },
  { id: 5, name: 'Bourbon', month: 'September', date: '2025-11-01' },
]
const MOCK_HISTORY = [
  { id: 1, name: 'Bourbon', month: 'September', date: '2025-11-01' },
  { id: 2, name: 'Bourbon', month: 'September', date: '2025-11-01' },
  { id: 3, name: 'Bourbon', month: 'September', date: '2025-11-01' },
  { id: 4, name: 'Bourbon', month: 'September', date: '2025-11-01' },
  { id: 5, name: 'Bourbon', month: 'September', date: '2025-11-01' },
]

const CATEGORY_OPTIONS = [
  { value: 'single-barrel', label: 'SINGLE BARREL' },
  { value: 'kentucky-straight', label: 'KENTUCKY STRAIGHT' },
  { value: 'small-batch', label: 'SMALL BATCH' },
  { value: 'rye', label: 'RYE' },
  { value: 'american-whiskey', label: 'AMERICAN WHISKEY' },
]
const AGE_OPTIONS = [
  { value: 'no-age', label: 'NO AGE' },
  { value: 'under-4', label: 'UNDER 4 YEARS' },
  { value: '4-6', label: '4YRS-6YRS' },
  { value: '8-10', label: '8YRS-10YS' },
  { value: '10-12', label: '10YS-12YRS' },
  { value: '12-plus', label: '12YRS+' },
]
const INVENTORY_OPTIONS = [
  { value: 'in-stock', label: 'IN-STOCK' },
  { value: 'out-of-stock', label: 'OUT OF STOCK' },
]
const PROOF_OPTIONS = [
  { value: '80-89', label: '80-89' },
  { value: '90-99', label: '90-99' },
  { value: '100-109', label: '100-109' },
  { value: '110-119', label: '110-119' },
  { value: '120-plus', label: '120+' },
]
const MASH_BILL_OPTIONS = [
  { value: 'wheated-bourbon', label: 'WHEATED BOURBON' },
  { value: 'rye-forward-bourbon', label: 'RYE FORWARD BOURBON' },
  { value: 'high-rye-bourbon', label: 'HIGH RYE BOURBON' },
  { value: 'wheat-whiskey', label: 'WHEAT WHISKEY' },
  { value: 'four-grain-whiskey', label: 'FOUR GRAIN WHISKEY' },
  { value: 'ky-style-rye', label: 'KY - STYLE RYE' },
  { value: 'pa-style-rye', label: 'PA - STYLE RYE' },
  { value: 'in-rye-style', label: 'IN - RYE STYLE' },
  { value: 'american-single-malt', label: 'AMERICAN SIHGLE MALT' },
]

const inputBaseClass = 'w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]'

function CustomDropdown({ id, label, value, onChange, options, openDropdown, setOpenDropdown, placeholder, addNewLabel, onAddNew }) {
  const isOpen = openDropdown === id
  const selectedOption = options.find((o) => o.value === value)
  const displayLabel = selectedOption ? selectedOption.label : placeholder

  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">{label}</label>
      <button
        type="button"
        onClick={() => setOpenDropdown(isOpen ? null : id)}
        className={`${inputBaseClass} pr-10 text-left flex items-center justify-between`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={value ? 'text-[var(--color-text-strong)]' : 'text-[var(--color-text)]'}>{displayLabel}</span>
        <span className="pointer-events-none shrink-0 text-[var(--color-text)]">
          {isOpen ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-full z-20 mt-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white py-1 shadow-lg"
          role="listbox"
        >
          {addNewLabel && (
            <button
              type="button"
              onClick={() => {
                setOpenDropdown(null)
                onAddNew?.()
              }}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: '#6D6D6D' }}
            >
              {addNewLabel}
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={value === opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpenDropdown(null)
              }}
              className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                value === opt.value ? 'bg-[#F4F4F4] text-[var(--color-text-strong)]' : 'text-[var(--color-text-strong)] hover:bg-[#F4F4F4]'
              }`}
            >
              {value === opt.value ? (
                <svg className="h-4 w-4 shrink-0 text-[var(--color-text-strong)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <span className="w-4 shrink-0" />
              )}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}



export default function WhiskeyManagement() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [age, setAge] = useState('')
  const [status, setStatus] = useState('')

  // Create Bourbon form state
  const [form, setForm] = useState({
    bourbonName: '',
    category: 'single-barrel',
    age: 'no-age',
    inventoryStatus: 'in-stock',
    proof: '80-89',
    mashBuild: 'wheated-bourbon',
    price: '',
    discountValue: '',
  })
  const [openDropdown, setOpenDropdown] = useState(null) // 'category' | 'age' | 'inventory' | 'proof' | 'mash' | null
  const [categoryOptions, setCategoryOptions] = useState(CATEGORY_OPTIONS)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [onSale, setOnSale] = useState(true)
  // Whiskey of the Month tab
  const [womBourbonName, setWomBourbonName] = useState('')
  const [womStartDate, setWomStartDate] = useState('')
  const [womEndDate, setWomEndDate] = useState('')
  const [womDatePicker, setWomDatePicker] = useState(null) // 'start' | 'end' | null
  const [scheduledWom, setScheduledWom] = useState(MOCK_SCHEDULED)
  const [historyWom, setHistoryWom] = useState(MOCK_HISTORY)
  const [exclusiveBourbons, setExclusiveBourbons] = useState(true)
  const [whiskeyOfMonth, setWhiskeyOfMonth] = useState(true)

  const filteredBourbons = MOCK_BOURBONS.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  const toggleClasses = 'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6D6D6D] focus:ring-offset-2'
  const toggleKnobClasses = 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition'
  const toggleOnBg = '#22c55e'
  const toggleOffBg = '#D0D0D0'

  const formatWomDate = (iso) => {
    if (!iso) return ''
    const [y, m, d] = iso.split('-')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[Number(m) - 1]} ${Number(d)}, ${y}`
  }

  const tabActiveBg = '#AA9456'

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 shrink-0 text-2xl font-bold tracking-tight text-[var(--color-text-strong)]">
        Whiskey Management
      </h1>

      <div className="rounded-[var(--radius-lg)] bg-[#F0F0F0] p-4">
        <div className="mb-4 flex w-full shrink-0 gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`h-10 flex-1 rounded-[var(--radius-md)] px-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AA9456] focus-visible:ring-offset-1 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'border border-[#D0D0D0] bg-white text-[var(--color-text-strong)] hover:bg-[#F4F4F4]'
              }`}
              style={activeTab === tab.id ? { backgroundColor: tabActiveBg } : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>

      {activeTab === 'all' && (
        <>
          <div className="mb-4 flex shrink-0 items-center gap-3">
            <div className="relative min-w-0 flex-1" style={{ minWidth: 200 }}>
              <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text)]" />
              <input
                type="search"
                placeholder="Search Whiskey"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-[var(--radius-md)] border border-[#333333] bg-white py-2.5 pl-10 pr-4 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
              />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 min-w-[95px] rounded-[var(--radius-md)] border border-[#333333] bg-white px-3 pr-8 text-sm font-medium text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
              >
                <option value="">CATEGORY</option>
                <option value="signature">Signature</option>
                <option value="single-barrel">Single Barrel</option>
                <option value="small-batch">Small Batch</option>
              </select>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="h-10 min-w-[95px] rounded-[var(--radius-md)] border border-[#333333] bg-white px-3 pr-8 text-sm font-medium text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
              >
                <option value="">AGE</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-10 min-w-[95px] rounded-[var(--radius-md)] border border-[#333333] bg-white px-3 pr-8 text-sm font-medium text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
              >
                <option value="">STATUS</option>
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#333333] bg-white text-[#333333] transition-colors hover:bg-[#F4F4F4]"
                aria-label="Refresh"
              >
                <img src={loadImg} alt="" className="h-5 w-5 shrink-0 object-contain" />
              </button>
            </div>
          </div>

          <div className="min-w-0 shrink-0 overflow-x-auto rounded-[var(--radius-lg)]">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#F4F4F4]">
                  <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Name</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Category</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Age</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Price</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Status</th>
                  <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)] text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBourbons.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white transition-colors hover:bg-[#FAFAFA]"
                    style={{ borderBottom: '1px solid #E8E8E8' }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[var(--color-text-strong)]">{row.name}</span>
                        {row.isWom && (
                          <span className="rounded bg-[#E0E0E0] px-2 py-0.5 text-xs font-medium text-[var(--color-text-strong)]">
                            WOM
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-strong)]">{row.category}</td>
                    <td className="px-4 py-3 text-[var(--color-text-strong)]">{row.age}</td>
                    <td className="px-4 py-3 text-[var(--color-text-strong)]">${row.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFCCCC] px-3 py-1 text-xs font-medium text-red-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#b91c1c]" aria-hidden />
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
        </>
      )}

        {/* Create Bourbon: form (left) + Label upload (right) */}
        {activeTab === 'create' && (
        <div className="flex min-w-0 flex-1 gap-6">
          {/* Whiskey details form */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">
                Bourbon Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.bourbonName}
                onChange={(e) => setForm((f) => ({ ...f, bourbonName: e.target.value }))}
                placeholder="XXXXXXXXXXXXX"
                className={inputBaseClass}
              />
            </div>
            <CustomDropdown
              id="category"
              label={<>Category<span className="text-red-500">*</span></>}
              value={form.category}
              onChange={(v) => setForm((f) => ({ ...f, category: v }))}
              options={categoryOptions}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              placeholder="XXXXXXXXXXXXX"
              addNewLabel="+ ADD NEW CATEGORY"
              onAddNew={() => setIsAddCategoryOpen(true)}
            />
            <CustomDropdown
              id="age"
              label={<>Age<span className="text-red-500">*</span></>}
              value={form.age}
              onChange={(v) => setForm((f) => ({ ...f, age: v }))}
              options={AGE_OPTIONS}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              placeholder="XXXXXXXXXXXXX"
            />
            <CustomDropdown
              id="inventory"
              label={<>Inventory &amp; Status<span className="text-red-500">*</span></>}
              value={form.inventoryStatus}
              onChange={(v) => setForm((f) => ({ ...f, inventoryStatus: v }))}
              options={INVENTORY_OPTIONS}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              placeholder="XXXXXXXXXXXXX"
            />
            <CustomDropdown
              id="proof"
              label={<>Proof<span className="text-red-500">*</span></>}
              value={form.proof}
              onChange={(v) => setForm((f) => ({ ...f, proof: v }))}
              options={PROOF_OPTIONS}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              placeholder="XXXXXXXXXXXXX"
            />
            <CustomDropdown
              id="mash"
              label={<>Mash Bill<span className="text-red-500">*</span></>}
              value={form.mashBuild}
              onChange={(v) => setForm((f) => ({ ...f, mashBuild: v }))}
              options={MASH_BILL_OPTIONS}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              placeholder="XXXXXXXXXXXXX"
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">
                Price<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="XXXXXXXXXXXXX"
                className={inputBaseClass}
              />
            </div>

            {/* On sale: label above, toggle below */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-[var(--color-text-strong)]">On sale</span>
              <button
                type="button"
                role="switch"
                aria-checked={onSale}
                onClick={() => setOnSale((v) => !v)}
                className={`w-fit ${toggleClasses}`}
                style={{ backgroundColor: onSale ? toggleOnBg : toggleOffBg }}
              >
                <span className={`${toggleKnobClasses} translate-y-0.5 ${onSale ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            {onSale && (
              <div className="rounded-[var(--radius-md)] bg-[#F5F5F5] p-3">
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Discount value</label>
                <input
                  type="text"
                  value={form.discountValue}
                  onChange={(e) => setForm((f) => ({ ...f, discountValue: e.target.value }))}
                  placeholder="XXXXXXXXXXXXX"
                  className="w-full rounded-[var(--radius-md)] border bg-white px-3 py-2.5 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]"
                  style={{ borderColor: '#D9D9D999' }}
                />
              </div>
            )}

            {/* Exclusive Bourbons: label above, toggle below, then checkbox */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-[var(--color-text-strong)]">Exclusive Bourbons</span>
              <button
                type="button"
                role="switch"
                aria-checked={exclusiveBourbons}
                onClick={() => setExclusiveBourbons((v) => !v)}
                className={`w-fit ${toggleClasses}`}
                style={{ backgroundColor: exclusiveBourbons ? toggleOnBg : toggleOffBg }}
              >
                <span className={`${toggleKnobClasses} translate-y-0.5 ${exclusiveBourbons ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-[var(--color-border)]" />
              <span className="text-sm text-[var(--color-text-strong)]">Notify all members</span>
            </label>

            {/* Whiskey of the Month: label above, toggle below */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-[var(--color-text-strong)]">Whiskey of the Month</span>
              <button
                type="button"
                role="switch"
                aria-checked={whiskeyOfMonth}
                onClick={() => setWhiskeyOfMonth((v) => !v)}
                className={`w-fit ${toggleClasses}`}
                style={{ backgroundColor: whiskeyOfMonth ? toggleOnBg : toggleOffBg }}
              >
                <span className={`${toggleKnobClasses} translate-y-0.5 ${whiskeyOfMonth ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {}}
              className="mt-2 w-full rounded-[var(--radius-md)] py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: '#646940' }}
            >
              Save
            </button>
          </div>

          {/* Label / Media upload area */}
          <div className="flex w-[320px] shrink-0 flex-col">
            <span className="mb-2 block text-sm font-medium text-[var(--color-text-strong)]">Label</span>
            <div
              className="flex min-h-[280px] flex-1 flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-border)] bg-[#FAFAFA] p-6"
              style={{ borderColor: '#D0D0D0' }}
            >
              <img src={uploadImg} alt="" className="h-10 w-10 shrink-0 object-contain" aria-hidden />
              <p className="text-sm font-medium text-[var(--color-text-strong)]">Upload photo or video</p>
              <p className="text-sm text-[var(--color-text)]">OR</p>
              <p className="text-sm italic text-[var(--color-text)]">Copy photo or video here</p>
            </div>
          </div>
        </div>
      )}

        {/* Whiskey of the Month tab */}
        {activeTab === 'wom' && (
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {/* Current WOM */}
          <div className="shrink-0">
            <h2 className="mb-3 text-base font-bold text-[var(--color-text-strong)]">Current WOM</h2>
            <div className="flex gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[#F4F4F4] p-4">
              <div className="flex h-[180px] w-[240px] shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#E0E0E0]">
                <img src={imageImg} alt="" className="h-16 w-16 object-contain" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 text-sm">
                <div className="font-bold text-[var(--color-text-strong)]">{CURRENT_WOM.name}</div>
                <div className="text-[var(--color-text)]">Category: {CURRENT_WOM.category}</div>
                <div className="text-[var(--color-text)]">Volume: {CURRENT_WOM.volume}</div>
                <div className="text-[var(--color-text)]">Price: {CURRENT_WOM.price}</div>
                <div className="text-[var(--color-text)]">Month: {CURRENT_WOM.month}</div>
                <div className="text-[var(--color-text)]">Date: {CURRENT_WOM.date}</div>
              </div>
            </div>
          </div>

          {/* Select New Whiskey */}
          <div className="shrink-0">
            <h2 className="mb-3 text-base font-bold text-[var(--color-text-strong)]">Select New Whiskey</h2>
            <div className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Name Bourbon</label>
                <div className="relative">
                  <input
                    type="text"
                    value={womBourbonName}
                    onChange={(e) => setWomBourbonName(e.target.value)}
                    placeholder="Baker's"
                    className={`${inputBaseClass} pr-10`}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text)]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="relative min-w-0 flex-1" style={{ minWidth: 160 }}>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Start date</label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={formatWomDate(womStartDate)}
                      onClick={() => setWomDatePicker((p) => (p === 'start' ? null : 'start'))}
                      placeholder="XXXXXXXXXXXXX"
                      className={`${inputBaseClass} cursor-pointer pr-10`}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text)]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </span>
                    {womDatePicker === 'start' && (
                      <div className="absolute left-0 top-full z-10 mt-1">
                        <Calendar value={womStartDate || undefined} onChange={setWomStartDate} onClose={() => setWomDatePicker(null)} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative min-w-0 flex-1" style={{ minWidth: 160 }}>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">End date</label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={formatWomDate(womEndDate)}
                      onClick={() => setWomDatePicker((p) => (p === 'end' ? null : 'end'))}
                      placeholder="XXXXXXXXXXXXX"
                      className={`${inputBaseClass} cursor-pointer pr-10`}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text)]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </span>
                    {womDatePicker === 'end' && (
                      <div className="absolute left-0 top-full z-10 mt-1">
                        <Calendar value={womEndDate || undefined} onChange={setWomEndDate} onClose={() => setWomDatePicker(null)} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (womBourbonName.trim() && womStartDate && womEndDate) {
                    setScheduledWom((prev) => [...prev, { id: Date.now(), name: womBourbonName.trim(), month: 'TBD', date: womStartDate }])
                    setWomBourbonName('')
                    setWomStartDate('')
                    setWomEndDate('')
                  }
                }}
                className="w-full rounded-[var(--radius-md)] py-3 text-sm font-medium text-[var(--color-text-strong)] transition-colors hover:opacity-90"
                style={{ backgroundColor: '#E0E0E0' }}
              >
                Schedule
              </button>
            </div>
          </div>

          {/* Scheduled */}
          <div className="shrink-0">
            <h2 className="mb-3 text-base font-bold text-[var(--color-text-strong)]">Scheduled</h2>
            <div className="overflow-x-auto rounded-[var(--radius-lg)] bg-white">
              <table className="w-full min-w-[400px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#F4F4F4]">
                    <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Name</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Month</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Date</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledWom.map((row) => (
                    <tr key={row.id} className="hover:bg-[#FAFAFA]">
                      <td className="px-4 py-3 font-medium text-[var(--color-text-strong)]">{row.name}</td>
                      <td className="px-4 py-3 text-[var(--color-text-strong)]">{row.month}</td>
                      <td className="px-4 py-3 text-[var(--color-text-strong)]">{row.date}</td>
                      <td className="px-4 py-3 text-right">
                        <button type="button" className="rounded p-1.5 text-[var(--color-text)] hover:bg-[#E0E0E0]" aria-label="Actions">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* History */}
          <div className="shrink-0">
            <h2 className="mb-3 text-base font-bold text-[var(--color-text-strong)]">History</h2>
            <div className="overflow-x-auto rounded-[var(--radius-lg)] bg-white">
              <table className="w-full min-w-[400px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#F4F4F4]">
                    <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Name</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Month</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)]">Date</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wide text-[var(--color-text-strong)] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {historyWom.map((row) => (
                    <tr key={row.id} className="hover:bg-[#FAFAFA]">
                      <td className="px-4 py-3 font-medium text-[var(--color-text-strong)]">{row.name}</td>
                      <td className="px-4 py-3 text-[var(--color-text-strong)]">{row.month}</td>
                      <td className="px-4 py-3 text-[var(--color-text-strong)]">{row.date}</td>
                      <td className="px-4 py-3 text-right">
                        <button type="button" className="rounded p-1.5 text-[var(--color-text)] hover:bg-[#E0E0E0]" aria-label="Actions">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      </div>

      {/* Add new category modal */}
      {isAddCategoryOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={() => { setIsAddCategoryOpen(false); setNewCategoryName('') }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-category-title"
        >
          <div
            className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="add-category-title" className="text-lg font-bold text-[var(--color-text-strong)]">
                Add new category
              </h2>
              <button
                type="button"
                onClick={() => { setIsAddCategoryOpen(false); setNewCategoryName('') }}
                className="rounded p-1.5 text-[var(--color-text)] hover:bg-[#E0E0E0] transition-colors"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-6">
              <label htmlFor="new-category-name" className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                id="new-category-name"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="XXXXXXXXXXXXX"
                className={inputBaseClass}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => { setIsAddCategoryOpen(false); setNewCategoryName('') }}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-strong)] hover:bg-[#F4F4F4] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const name = newCategoryName.trim()
                  if (!name) return
                  const value = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                  if (!value) return
                  const label = name.toUpperCase()
                  setCategoryOptions((prev) => [...prev, { value, label }])
                  setForm((f) => ({ ...f, category: value }))
                  setIsAddCategoryOpen(false)
                  setNewCategoryName('')
                }}
                className="rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: '#6D6D6D' }}
              >
                Add new Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
