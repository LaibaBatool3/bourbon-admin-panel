import { Link } from 'react-router-dom'

function IconArrowLeft({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
      </header>

      <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-strong)]">
        Your privacy is important to us. This Privacy Policy explains how Bourbon collects, uses, and protects your personal information when you use our application and services.
      </p>

      <div className="prose max-w-none space-y-6 text-[var(--color-text-strong)]">
        <section>
          <h2 className="mb-2 text-lg font-bold">1. Information We Collect</h2>
          <p className="mb-2 text-sm leading-relaxed text-[var(--color-text-strong)]">
            We may collect the following information:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed text-[var(--color-text-strong)]">
            <li>Account information (name, email address, login credentials)</li>
            <li>Usage data (how you interact with the platform)</li>
            <li>Device and technical information (browser type, IP address, operating system)</li>
            <li>Any data you upload or manage inside the platform</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">2. How We Use Your Information</h2>
          <p className="mb-2 text-sm leading-relaxed text-[var(--color-text-strong)]">
            We use your information to:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed text-[var(--color-text-strong)]">
            <li>Provide and maintain the Bourbon platform</li>
            <li>Improve functionality and user experience</li>
            <li>Ensure security and prevent fraud</li>
            <li>Communicate with you regarding updates or support</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">3. Data Storage and Security</h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-strong)]">
            We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or misuse.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">4. Data Sharing</h2>
          <p className="mb-2 text-sm leading-relaxed text-[var(--color-text-strong)]">
            We do not sell your personal data. Your data may be shared only:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed text-[var(--color-text-strong)]">
            <li>With trusted service providers (hosting, analytics, support)</li>
            <li>If required by law or legal process</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">5. Your Rights</h2>
          <p className="mb-2 text-sm leading-relaxed text-[var(--color-text-strong)]">
            You have the right to:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed text-[var(--color-text-strong)]">
            <li>Access your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Request restriction of data processing</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">6. Changes to This Policy</h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-strong)]">
            We may update this Privacy Policy from time to time. Any changes will be published in the application.
          </p>
        </section>
      </div>
    </div>
  )
}
