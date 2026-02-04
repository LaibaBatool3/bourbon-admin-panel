import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconUser } from '../components/icons'

function IconShield({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconDocument({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function IconChevronRight({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function IconEye({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconEyeOff({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

const inputClass = 'w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-strong)] placeholder:text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[#6D6D6D]'

export default function Settings() {
  const [doNotSell, setDoNotSell] = useState(false)
  const [openModal, setOpenModal] = useState(null) // 'editAccount' | 'changePassword' | 'logOut' | 'deleteAccount'
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', bio: '' })
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [logoutPassword, setLogoutPassword] = useState('')
  const [deleteAccountPassword, setDeleteAccountPassword] = useState('')

  const toggleClasses = 'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6D6D6D] focus:ring-offset-2'
  const toggleKnobClasses = 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition'

  return (
    <div className="flex flex-col">
      <h1 className="mb-6 shrink-0 text-2xl font-bold tracking-tight text-[var(--color-text-strong)]">
        Settings
      </h1>

      {/* Section 1: Account Settings */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <IconUser className="h-5 w-5 text-[var(--color-text-strong)]" />
          <h2 className="text-lg font-bold text-[var(--color-text-strong)]">Account Settings</h2>
        </div>
        <p className="mb-4 text-sm text-[var(--color-text)]">
          Manage your account information and security.
        </p>
        <div className="divide-y divide-[var(--color-border)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white">
          <SettingsRow label="Edit Profile" description="Update your personal information and profile details" onClick={() => setOpenModal('editAccount')} />
          <SettingsRow label="Change Password" description="Update your password to keep your account secure" onClick={() => setOpenModal('changePassword')} />
          <SettingsRow label="Log out" description="Sign out from this device" onClick={() => setOpenModal('logOut')} />
          <SettingsRow label="Delete Account" description="Permanently delete your account and all associated data" red onClick={() => setOpenModal('deleteAccount')} />
        </div>
      </section>

      {/* Section 2: Ad Preferences */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <IconShield className="h-5 w-5 text-[var(--color-text-strong)]" />
          <h2 className="text-lg font-bold text-[var(--color-text-strong)]">Ad Preferences</h2>
        </div>
        <p className="mb-4 text-sm text-[var(--color-text)]">
          Control how your information is used for advertising.
        </p>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-medium text-[var(--color-text-strong)]">Do Not Sell My Info</div>
              <p className="mt-0.5 text-sm text-[var(--color-text)]">
                Opt out of having your personal information sold to third parties
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={doNotSell}
              onClick={() => setDoNotSell((v) => !v)}
              className={`${toggleClasses} ${doNotSell ? 'bg-green-500' : 'bg-[var(--color-border)]'}`}
            >
              <span className={`${toggleKnobClasses} translate-y-0.5 ${doNotSell ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <p className="mt-3 text-xs text-[var(--color-text)]">
            Your information may be used for personalized advertising.
          </p>
        </div>
      </section>

      {/* Section 3: Legal & Privacy */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <IconDocument className="h-5 w-5 text-[var(--color-text-strong)]" />
          <h2 className="text-lg font-bold text-[var(--color-text-strong)]">Legal & Privacy</h2>
        </div>
        <p className="mb-4 text-sm text-[var(--color-text)]">
          Review our policies and terms.
        </p>
        <div className="divide-y divide-[var(--color-border)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white">
          <SettingsRow label="Privacy Policy" />
          <SettingsRow label="Legal Privacy Policy" />
          <SettingsRow label="Terms of Service" />
        </div>
      </section>

      {/* Edit account modal */}
      {openModal === 'editAccount' && (
        <ModalOverlay title="Edit account" onClose={() => setOpenModal(null)}>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E0E0E0] text-lg font-bold text-white">SC</div>
            <div>
              <button type="button" className="rounded-[var(--radius-md)] bg-[#E0E0E0] px-4 py-2 text-sm font-medium text-[var(--color-text-strong)] hover:bg-[#D0D0D0]">Change photo</button>
              <p className="mt-1 text-xs text-[var(--color-text)]">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setOpenModal(null) }}>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Name<span className="text-red-500">*</span></label>
              <input type="text" value={editForm.name} onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))} placeholder="XXXXXXXXXX" className={inputClass} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Email<span className="text-red-500">*</span></label>
              <input type="email" value={editForm.email} onChange={(e) => setEditForm(f => ({ ...f, email: e.target.value }))} placeholder="XXXXXXXXXX" className={inputClass} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Phone number<span className="text-red-500">*</span></label>
              <input type="tel" value={editForm.phone} onChange={(e) => setEditForm(f => ({ ...f, phone: e.target.value }))} placeholder="XXXXXXXXXX" className={inputClass} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Bio<span className="text-red-500">*</span></label>
              <textarea value={editForm.bio} onChange={(e) => setEditForm(f => ({ ...f, bio: e.target.value.slice(0, 500) }))} placeholder="XXXXXXXXXX" rows={4} maxLength={500} className={inputClass} required />
              <div className="mt-1 flex justify-between text-xs text-[var(--color-text)]">
                <span>500 character limit</span>
                <span>{editForm.bio.length}/500</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setOpenModal(null)} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-strong)] hover:bg-[#F4F4F4]">Cancel</button>
              <button type="submit" className="rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: '#6D6D6D' }}>Save</button>
            </div>
          </form>
        </ModalOverlay>
      )}

      {/* Change Password modal */}
      {openModal === 'changePassword' && (
        <ModalOverlay title="Change Password" onClose={() => setOpenModal(null)}>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E0E0E0] text-lg font-bold text-white">SC</div>
            <div>
              <button type="button" className="rounded-[var(--radius-md)] bg-[#E0E0E0] px-4 py-2 text-sm font-medium text-[var(--color-text-strong)] hover:bg-[#D0D0D0]">Change photo</button>
              <p className="mt-1 text-xs text-[var(--color-text)]">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setOpenModal(null) }}>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Current Password</label>
              <div className="relative">
                <input type={showCurrentPass ? 'text' : 'password'} value={passwordForm.current} onChange={(e) => setPasswordForm(f => ({ ...f, current: e.target.value }))} placeholder="XXXXXXXXXXX" className={inputClass + ' pr-10'} />
                <button type="button" onClick={() => setShowCurrentPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text)]">{showCurrentPass ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}</button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">New Password</label>
              <div className="relative">
                <input type={showNewPass ? 'text' : 'password'} value={passwordForm.new} onChange={(e) => setPasswordForm(f => ({ ...f, new: e.target.value }))} placeholder="XXXXXXXXXXX" className={inputClass + ' pr-10'} />
                <button type="button" onClick={() => setShowNewPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text)]">{showNewPass ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}</button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-strong)]">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPass ? 'text' : 'password'} value={passwordForm.confirm} onChange={(e) => setPasswordForm(f => ({ ...f, confirm: e.target.value }))} placeholder="XXXXXXXXXXX" className={inputClass + ' pr-10'} />
                <button type="button" onClick={() => setShowConfirmPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text)]">{showConfirmPass ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}</button>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setOpenModal(null)} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-strong)] hover:bg-[#F4F4F4]">Cancel</button>
              <button type="submit" className="rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: '#6D6D6D' }}>Save</button>
            </div>
          </form>
        </ModalOverlay>
      )}

      {/* Log out modal */}
      {openModal === 'logOut' && (
        <ModalOverlay title="Log out" onClose={() => setOpenModal(null)}>
          <p className="mb-2 text-sm text-[var(--color-text-strong)]">Are you sure you want to log out?</p>
          <p className="mb-4 text-sm text-[var(--color-text)]">To confirm, please enter your password:</p>
          <input type="password" value={logoutPassword} onChange={(e) => setLogoutPassword(e.target.value)} placeholder="xxxxxxxxxxxx" className={`${inputClass} mb-6`} />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpenModal(null)} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-strong)] hover:bg-[#F4F4F4]">Cancel</button>
            <button type="button" onClick={() => { setOpenModal(null); setLogoutPassword('') }} className="rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: '#6D6D6D' }}>Log out</button>
          </div>
        </ModalOverlay>
      )}

      {/* Delete Account modal */}
      {openModal === 'deleteAccount' && (
        <ModalOverlay title="Delete Account" onClose={() => { setOpenModal(null); setDeleteAccountPassword('') }}>
          <p className="mb-2 text-sm text-[var(--color-text-strong)]">Are you sure you want to delete your account?</p>
          <p className="mb-4 text-sm text-[var(--color-text)]">To confirm, please enter your password:</p>
          <input type="password" value={deleteAccountPassword} onChange={(e) => setDeleteAccountPassword(e.target.value)} placeholder="XXXXXXXXXXXXX" className={`${inputClass} mb-6`} />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => { setOpenModal(null); setDeleteAccountPassword('') }} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-strong)] hover:bg-[#F4F4F4]">Cancel</button>
            <button type="button" onClick={() => { setOpenModal(null); setDeleteAccountPassword('') }} className="rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: '#6D6D6D' }}>Delete</button>
          </div>
        </ModalOverlay>
      )}
    </div>
  )
}

function ModalOverlay({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-lg" onClick={e => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-bold text-[var(--color-text-strong)]">{title}</h2>
          <button type="button" onClick={onClose} className="rounded p-1.5 text-[var(--color-text)] hover:bg-[#E0E0E0]" aria-label="Close">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function SettingsRow({ label, description, red, onClick, to }) {
  const content = (
    <>
      <div className="min-w-0 flex-1">
        <div className={`font-medium ${red ? 'text-red-600' : 'text-[var(--color-text-strong)]'}`}>{label}</div>
        {description && <p className="mt-0.5 text-sm text-[var(--color-text)]">{description}</p>}
      </div>
      <IconChevronRight className="h-5 w-5 shrink-0 text-[var(--color-text)]" />
    </>
  )
  const className = 'flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-[#FAFAFA]'
  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  )
}
