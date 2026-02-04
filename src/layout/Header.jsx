import logoImg from '../assets/icons/logo.png'
import sarahImg from '../assets/icons/sarah-chen.png'
import searchImg from '../assets/icons/search.png'
import bellImg from '../assets/icons/bell.png'
import logOutImg from '../assets/icons/log-out.png'

export default function Header() {
  return (
    <header className="flex shrink-0 items-center justify-between bg-[var(--color-surface)] px-[32px] py-0" style={{ height: 110 }}>
      <div className="flex items-center gap-[88px]">
        <img
          src={logoImg}
          alt="The Bourbon Club"
          className="h-[110px] w-[110px] shrink-0 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold text-black">
            Bourbon
          </h1>
          <p className="text-sm text-black">
            Manage content and analyze metrics
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex h-10 items-center">
          <img
            src={searchImg}
            alt=""
            className="absolute left-3 h-5 w-5 shrink-0 object-contain"
          />
          <input
            type="search"
            placeholder="Search"
            className="h-10 w-64 rounded-[var(--radius-md)] border border-black bg-white pl-10 pr-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text)] focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-strong)] hover:bg-[var(--color-page)] transition-colors"
          aria-label="Notifications"
        >
          <img src={bellImg} alt="" className="h-5 w-5 object-contain" />
        </button>
        <div className="flex h-10 items-center gap-3 rounded-[var(--radius-md)] border border-black bg-white px-3">
          <img
            src={sarahImg}
            alt=""
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
          <div className="text-left">
            <div className="text-sm font-medium leading-tight text-[var(--color-text-strong)]">
              Sarah Chen
            </div>
            <div className="text-xs leading-tight text-[var(--color-text)]">Owner</div>
          </div>
          <button
            type="button"
            className="ml-1 flex shrink-0 items-center justify-center rounded p-1.5 text-[var(--color-text)] hover:text-[var(--color-text-strong)] hover:bg-[var(--color-page)] transition-colors"
            aria-label="Log out"
          >
            <img src={logOutImg} alt="" className="h-5 w-5 object-contain" />
          </button>
        </div>
      </div>
    </header>
  )
}
