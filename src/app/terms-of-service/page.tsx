import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using settlewithai.com and Settle's AI deployment services.",
  alternates: {
    canonical: "https://settlewithai.com/terms-of-service",
  },
  robots: { index: true, follow: true },
};

export default function TermsOfService() {
  return (
    <>
      <Nav />

      <main className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <h1
          className="text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.12] mb-10"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}
        >
          Terms of Service
        </h1>

        <p className="text-text-faint text-sm mb-12">Last updated: April 2, 2026</p>

        <div className="prose prose-neutral max-w-none text-[17px] leading-[1.8] [&_h2]:text-[1.35rem] [&_h2]:font-medium [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:mb-6 [&_ul]:mb-6 [&_ul]:ml-6 [&_li]:mb-2">
          <h2 style={{ fontFamily: "var(--font-heading)" }}>Agreement to terms</h2>
          <p>
            By accessing or using settlewithai.com (&ldquo;the Site&rdquo;), you agree to be bound by
            these Terms of Service. If you do not agree, please do not use the Site. Settle
            (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) reserves the right to update
            these terms at any time. Changes take effect when posted on this page.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Services</h2>
          <p>
            Settle provides AI deployment consulting services, including AI readiness assessments,
            instruction engineering, and deployment support. The Site also offers free interactive
            tools for informational purposes. Specific service engagements are governed by separate
            agreements between Settle and the client.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Use of the Site</h2>
          <p>You agree to use the Site only for lawful purposes. You may not:</p>
          <ul className="list-disc">
            <li>Use the Site in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorised access to any part of the Site or its systems</li>
            <li>Use automated tools to scrape, crawl, or extract content beyond what is permitted by our robots.txt</li>
            <li>Transmit any viruses, malware, or other harmful code</li>
            <li>Impersonate any person or entity, or misrepresent your affiliation</li>
          </ul>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Intellectual property</h2>
          <p>
            All content on the Site &mdash; including text, graphics, logos, images, tools, and
            software &mdash; is the property of Settle or its licensors and is protected by
            intellectual property laws. You may not reproduce, distribute, or create derivative works
            from our content without prior written permission, except for personal, non-commercial use
            or as permitted by fair use.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Interactive tools</h2>
          <p>
            The free tools on our Site (AI Readiness Assessment, ROI Calculator, Use Case Finder,
            etc.) are provided for informational and educational purposes only. Results are estimates
            and should not be considered professional advice. We make no guarantees about the accuracy
            or applicability of tool outputs to your specific situation.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Third-party links</h2>
          <p>
            The Site may contain links to third-party websites or services. We are not responsible for
            the content, privacy practices, or availability of these external sites. Linking does not
            imply endorsement.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Disclaimer of warranties</h2>
          <p>
            The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            without warranties of any kind, express or implied. We do not warrant that the Site will
            be uninterrupted, error-free, or free of harmful components.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Settle shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising from your use of the Site
            or our services. Our total liability for any claim related to the Site shall not exceed the
            amount you paid us (if any) in the twelve months preceding the claim.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Governing law</h2>
          <p>
            These terms are governed by and construed in accordance with applicable law. Any disputes
            arising from these terms or your use of the Site will be resolved through good-faith
            negotiation. If negotiation fails, disputes will be submitted to binding arbitration.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }}>Contact</h2>
          <p>
            If you have questions about these terms, contact us at{" "}
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
