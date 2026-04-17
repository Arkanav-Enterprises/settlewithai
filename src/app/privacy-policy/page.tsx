import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Settle collects, uses, and protects your personal information when you use settlewithai.com.",
  alternates: {
    canonical: "https://settlewithai.com/privacy-policy",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Nav />

      <main className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <h1
          className="text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.12] mb-10"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}
        >
          Privacy Policy
        </h1>

        <p className="text-text-faint text-sm mb-12">Last updated: April 2, 2026</p>

        <div className="prose prose-neutral max-w-none text-[17px] leading-[1.8] [&_h2]:text-[1.35rem] [&_h2]:font-medium [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:mb-6 [&_ul]:mb-6 [&_ul]:ml-6 [&_li]:mb-2">
          <h2 style={{ fontFamily: "var(--font-heading)" }}>Who we are</h2>
          <p>
            Settle (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates settlewithai.com.
            We are a full-stack AI agency that helps businesses deploy Claude AI (by Anthropic) across
            their workflows. You can contact us at{" "}
            <a href="mailto:hi@settlewithai.com" className="text-accent hover:underline">
              hi@settlewithai.com
            </a>.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Information we collect</h2>
          <p>We collect information you voluntarily provide when you:</p>
          <ul className="list-disc">
            <li>Submit your email address through our contact form</li>
            <li>Book a discovery call via our scheduling widget (Cal.com)</li>
            <li>Use our interactive tools (AI Readiness Assessment, ROI Calculator, etc.)</li>
          </ul>
          <p>
            <strong>Information collected automatically:</strong> We use Vercel Analytics and Google
            Analytics to collect anonymised usage data including page views, referral sources, device
            type, and approximate geographic region. We do not use cookies for tracking. Vercel
            Analytics is cookie-free and privacy-focused.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>How we use your information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc">
            <li>Respond to your enquiries and schedule calls</li>
            <li>Provide personalised assessment results from our interactive tools</li>
            <li>Improve our website and services based on aggregate usage patterns</li>
          </ul>
          <p>
            We do not sell, rent, or share your personal information with third parties for marketing
            purposes.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Third-party services</h2>
          <p>We use the following third-party services that may process your data:</p>
          <ul className="list-disc">
            <li>
              <strong>Vercel</strong> &mdash; Website hosting and analytics (
              <a href="https://vercel.com/legal/privacy-policy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">privacy policy</a>)
            </li>
            <li>
              <strong>Google Analytics</strong> &mdash; Website analytics (
              <a href="https://policies.google.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">privacy policy</a>)
            </li>
            <li>
              <strong>Cal.com</strong> &mdash; Appointment scheduling (
              <a href="https://cal.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">privacy policy</a>)
            </li>
          </ul>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Data retention</h2>
          <p>
            We retain your contact information for as long as necessary to fulfil the purpose for
            which it was collected, or as required by applicable law. You may request deletion of your
            data at any time by emailing{" "}
            <a href="mailto:hi@settlewithai.com" className="text-accent hover:underline">
              hi@settlewithai.com
            </a>.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Your rights</h2>
          <p>
            Depending on your jurisdiction, you may have the right to access, correct, delete, or
            restrict the processing of your personal data. To exercise these rights, contact us at{" "}
            <a href="mailto:hi@settlewithai.com" className="text-accent hover:underline">
              hi@settlewithai.com
            </a>.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Children&apos;s privacy</h2>
          <p>
            Our services are not directed at individuals under the age of 18. We do not knowingly
            collect personal information from children.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Changes to this policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page
            with an updated revision date. Continued use of the website after changes constitutes
            acceptance of the updated policy.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Contact</h2>
          <p>
            If you have questions about this privacy policy, contact us at{" "}
            <a href="mailto:hi@settlewithai.com" className="text-accent hover:underline">
              hi@settlewithai.com
            </a>.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
