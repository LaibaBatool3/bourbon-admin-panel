import { Link } from 'react-router-dom'

function IconArrowLeft({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

export default function LegalPrivacyPolicy() {
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
          Legal Privacy Policy
        </h1>
      </header>

      <div className="prose max-w-none space-y-6 text-[var(--color-text-strong)]">
        <section>
          <h2 className="mb-2 text-lg font-bold">1. Legal Privacy Policy</h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-strong)]">
            This Legal Privacy Policy describes the legal basis for processing personal data within the Bourbon platform in accordance with applicable data protection laws (including GDPR where applicable).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">2. Legal Basis for Processing</h2>
          <p className="mb-2 text-sm leading-relaxed text-[var(--color-text-strong)]">
            We process personal data based on:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed text-[var(--color-text-strong)]">
            <li>User consent</li>
            <li>Performance of a contract</li>
            <li>Legal obligations</li>
            <li>Legitimate business interests</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">3. Data Controller</h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-strong)]">
            The Bourbon platform acts as the data controller for personal data processed within the application.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">4. Data Retention</h2>
          <p className="mb-2 text-sm leading-relaxed text-[var(--color-text-strong)]">
            We retain personal data only as long as necessary:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed text-[var(--color-text-strong)]">
            <li>While your account is active</li>
            <li>As required for legal, accounting, or security purposes</li>
            </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">5. International Data Transfers</h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-strong)]">
            If data is transferred outside your country, we ensure appropriate legal safeguards are in place.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">6. Legal Rights</h2>
          <p className="mb-2 text-sm leading-relaxed text-[var(--color-text-strong)]">
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed text-[var(--color-text-strong)]">
            <li>Data portability</li>
            <li>Right to be forgotten</li>
            <li>Right to object to processing</li>
            <li>Right to file a complaint with a data protection authority</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
