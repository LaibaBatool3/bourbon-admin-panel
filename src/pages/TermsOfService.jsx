import { Link } from 'react-router-dom'

function IconArrowLeft({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

export default function TermsOfService() {
  return (
    <div className="flex flex-col">
      <header className="mb-6 flex shrink-0 items-center gap-3">
        <Link
          to="/settings"
          className="flex items-center justify-center rounded-[var(--radius-md)] p-1.5 text-[var(--color-text-strong)] hover:bg-[#F0F0F0]"
          aria-label="Back to Settings"
        >
          <IconArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-strong)]">
          Terms of Service
        </h1>
      </header>

      <div className="prose max-w-none space-y-6 text-[var(--color-text-strong)]">
        <section>
          <h2 className="mb-2 text-lg font-bold">1. Terms of Service</h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-strong)]">
            These Terms of Service govern your use of the Bourbon platform. By using the application, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">2. Use of the Platform</h2>
          <p className="mb-2 text-sm leading-relaxed text-[var(--color-text-strong)]">
            You agree to:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed text-[var(--color-text-strong)]">
            <li>Use the platform only for lawful purposes</li>
            <li>Not attempt to hack, reverse engineer, or disrupt the system</li>
            <li>Keep your account credentials secure</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">3. Account Responsibility</h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-strong)]">
            All content, software, and design of the Bourbon platform remain the property of the company and may not be copied or reused without permission.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">4. Availability</h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-strong)]">
            We aim to provide reliable service but do not guarantee uninterrupted or error-free operation.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">5. Limitation of Liability</h2>
          <p className="mb-2 text-sm leading-relaxed text-[var(--color-text-strong)]">
            We are not liable for:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed text-[var(--color-text-strong)]">
            <li>Any indirect or consequential damages</li>
            <li>Data loss caused by misuse or external attacks</li>
            <li>Business losses resulting from service interruptions</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">6. Termination</h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-strong)]">
            We reserve the right to suspend or terminate accounts that violate these terms.
          </p>
        </section>
      </div>
    </div>
  )
}
