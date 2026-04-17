import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { Nav } from "@/components/layout/Nav";
import { MagazineOutro } from "@/components/blog/MagazineOutro";

export const metadata: Metadata = {
  title:
    "Orient's Old Site vs the New One: A Side-by-Side Walkthrough",
  description:
    "We rebuilt The Printers House Orient's website from a one-screen brochure into an AI-powered product experience. Here's the side-by-side, screenshot for screenshot.",
  keywords: [
    "B2B website redesign",
    "manufacturing website",
    "before and after website",
    "AI-powered product experience",
    "Orient Printing website",
    "B2B machinery website",
    "AI chat widget",
    "industrial website design",
    "Settle case study",
  ],
  alternates: {
    canonical: "https://settlewithai.com/blog/orient-old-vs-new-site",
  },
  openGraph: {
    type: "article",
    title:
      "Orient's Old Site vs the New One: A Side-by-Side Walkthrough",
    description:
      "From a single-screen homepage to a 16x deeper, AI-powered product experience. Here's what changed and why it matters for B2B manufacturers.",
    url: "https://settlewithai.com/blog/orient-old-vs-new-site",
    siteName: "Settle",
    publishedTime: "2026-04-07T00:00:00Z",
    authors: ["Pranav Ambwani"],
    images: [
      {
        url: "/og-image.png",
        width: 1519,
        height: 1090,
        alt: "Orient's Old Site vs the New One: A Side-by-Side Walkthrough — Settle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Orient's Old Site vs the New One: A Side-by-Side Walkthrough",
    description:
      "From a single-screen homepage to an AI-powered product experience. Here's the side-by-side.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Orient's Old Site vs the New One: A Side-by-Side Walkthrough",
    description:
      "We rebuilt The Printers House Orient's website from a one-screen brochure into an AI-powered product experience. Here's the side-by-side comparison with screenshots.",
    datePublished: "2026-04-07T00:00:00Z",
    dateModified: "2026-04-17T00:00:00Z",
    image: "https://settlewithai.com/og-image.png",
    author: {
      "@type": "Person",
      name: "Pranav Ambwani",
      jobTitle: "Founder",
      url: "https://settlewithai.com",
      sameAs: ["https://www.linkedin.com/in/pranavambwani/"],
      description: "Founder of Settle, a full-stack AI agency for manufacturers and mid-market teams. USC Electrical Engineering. Based between Los Angeles and New Delhi. Deploys Claude AI for operations — structured rollouts, production-grade instructions, real results.",
      worksFor: {
        "@type": "Organization",
        name: "Settle",
        url: "https://settlewithai.com",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Settle",
      logo: {
        "@type": "ImageObject",
        url: "https://settlewithai.com/apple-touch-icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://settlewithai.com/blog/orient-old-vs-new-site",
    },
  };

  return (
    <>
      <BlogTOC />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://settlewithai.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://settlewithai.com/blog" },
              { "@type": "ListItem", position: 3, name: "Orient Old vs New Site", item: "https://settlewithai.com/blog/orient-old-vs-new-site" },
            ],
          }),
        }}
      />

      {/* Nav */}
      <Nav />

      {/* Article */}
      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        {/* Header */}
        <header className="mb-16">
          <a
            href="/blog"
            className="text-accent text-sm font-medium hover:underline"
          >
            &larr; Blog
          </a>
          <h1
            className="text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.12] mt-8 mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
            }}
          >
            Orient&apos;s Old Site vs the New One: A Side-by-Side Walkthrough
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            Most B2B manufacturing websites are brochures. A homepage carousel, a products dropdown, a few PDF downloads, and a &ldquo;Request a Quote&rdquo; button. We rebuilt The Printers House Orient&apos;s site from that template into something that actually answers customer questions on its own. Here&apos;s the side-by-side, screenshot for screenshot.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <a href="/#contact" className="hover:text-accent transition-colors">Pranav Ambwani</a>
            <span>&middot;</span>
            <time dateTime="2026-04-07">April 2026</time>
            <span>&middot;</span>
            <span>10 min read</span>
          </div>
        </header>

        {/* Body */}
        <div className="prose-settle">
          <h2>The headline number</h2>
          <p>
            Before any of the design or copy choices, here&apos;s the most striking thing about the redesign.
          </p>
          <p>
            <strong>The old homepage is exactly 900 pixels tall. One viewport. The new homepage is 14,830 pixels tall.</strong> That&apos;s a 16x increase in content depth, and it&apos;s not because we padded it with stock imagery and team photos. Every additional pixel does work — surfacing product specs, answering customer questions, showing the global installation footprint, enabling self-serve discovery.
          </p>
          <p>
            The old site treated the homepage as a holding area that pushes you to subpages. The new site treats the homepage as the product itself.
          </p>

          <h2>Hero section: same fact, different confidence</h2>
          <p>
            Both sites lead with the same fact: <em>20,000+ units installed, 60+ countries, since 1946.</em> That&apos;s the credibility anchor and we kept it. What changed is how the fact is delivered.
          </p>

          <figure className="my-10">
            <img
              src="/blog/comparison-old-hero.png"
              alt="Orient's old website hero with dark industrial background, semi-transparent overlay box containing all-caps text about 20,000 units"
              loading="lazy"
              width={1440}
              height={900}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              Old hero. Dark industrial background, all-caps copy in a semi-transparent overlay, WhatsApp button bottom-right, slide arrows bottom-right.
            </figcaption>
          </figure>

          <figure className="my-10">
            <img
              src="/blog/comparison-new-hero.png"
              alt="Orient's new website hero with clean light layout, large serif headline, Orient logo in red, clean navigation, and a Request a Quote button"
              loading="lazy"
              width={1440}
              height={900}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              New hero. Clean light layout, large readable headline in title case, the Orient logomark restored to red, modern navigation, and a single primary CTA.
            </figcaption>
          </figure>

          <p>
            Three things changed in the hero, and each one is doing real work:
          </p>
          <ul>
            <li><strong>Title case instead of all-caps.</strong> All-caps reads as shouting and is harder to scan. Title case is more confident — it doesn&apos;t need to raise its voice to be heard.</li>
            <li><strong>Light background instead of dark overlay.</strong> The old hero put copy on top of a moody industrial photo with a translucent box. Readable but heavy. The new hero gives the copy room to breathe.</li>
            <li><strong>One CTA instead of three.</strong> The old hero has &ldquo;Request a Quote,&rdquo; a language picker, a slide arrow, a WhatsApp bubble, and a scroll cue all competing for attention. The new hero has one primary action.</li>
          </ul>

          <h2>Products: from dropdown menu to visual catalogue</h2>
          <p>
            On the old site, finding a specific Orient machine meant hovering on &ldquo;Products,&rdquo; navigating a multi-level dropdown, and landing on a static page. The product catalogue was hidden behind menus.
          </p>
          <p>
            On the new site, the product catalogue is a visual grid right on the homepage. Three large cards, each with a category label, a hero shot of the machine, and the product name. No menus, no dropdowns, no hunting.
          </p>

          <figure className="my-10">
            <img
              src="/blog/comparison-new-products.png"
              alt="The new Orient site showing three large product cards: Orient Offset Series, Orient X-Press Flex, and Orient Jet Series, each with a category label and a hero photo"
              loading="lazy"
              width={1440}
              height={900}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The new product catalogue. Clear category labels, immediate product hierarchy, and a click-through to detail pages that are actually on the page instead of buried in a PDF.
            </figcaption>
          </figure>

          <h2>Product detail: from a hero shot to a structured spec sheet</h2>
          <p>
            Click into any machine on the old site and you got a single hero image of the press, a category title, and not much else. To find the actual specifications, you had to navigate to the Downloads tab and grab a PDF catalogue.
          </p>

          <figure className="my-10">
            <img
              src="/blog/comparison-old-product-page.png"
              alt="Orient's old product page for Orient Jet C Series. A nav bar, a hero machine illustration, and a title in a dark navy bar — no specifications visible above the fold"
              loading="lazy"
              width={1440}
              height={900}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The old Orient Jet C Series product page. A nav bar, a hero machine illustration, and a title — that&apos;s everything. To get actual specs, the user has to download a PDF from the Downloads tab.
            </figcaption>
          </figure>

          <p>
            Click into the same machine on the new site and you get a complete product detail page. A gallery of machine views with thumbnails. A hero image. A description. A &ldquo;Key Features&rdquo; list. A specifications table. An &ldquo;Ask Orient AI&rdquo; button right next to a &ldquo;Request Quote&rdquo; button. Everything a buyer needs to make a shortlist decision, without leaving the page.
          </p>

          <figure className="my-10">
            <img
              src="/blog/comparison-new-product-detail.png"
              alt="The new Orient Jet C Series product detail page showing a thumbnail gallery, hero image of the machine, description, key features list, specifications table, and an Ask Orient AI button alongside a Request Quote button"
              loading="lazy"
              width={1440}
              height={900}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The new Orient Jet C Series detail page. Same machine, completely different experience. Thumbnail gallery, key features, specs, and a one-tap path to either AI or a human.
            </figcaption>
          </figure>

          <p>
            The old page made the buyer work to find anything. The new page does the work for them.
          </p>

          <h2>The specifications page: where the real shift happens</h2>
          <p>
            This is the comparison that matters most. On the old site, getting actual machine specs meant downloading a catalogue PDF. On the new site, the specs are on the page — and there&apos;s an AI chat trained on the same data to answer follow-up questions.
          </p>

          <figure className="my-10">
            <img
              src="/blog/comparison-new-ai-section.png"
              alt="The new Orient site's technical specifications section showing a full spec table for the Orient Jet C-Series with Type, Application, Print Head, Resolution, Speed, Colours, Media Support, Ink System, Models, and Finishing rows. A 'Chat with Orient AI' button is prominently displayed on the left"
              loading="lazy"
              width={1440}
              height={900}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The new Technical Specifications section. Full spec table on the right, machine selector and a &ldquo;Chat with Orient AI&rdquo; button on the left. No PDFs to download. No forms to fill out before getting an answer.
            </figcaption>
          </figure>

          <p>
            Ten spec rows visible at a glance. Type, application, print head, resolution, speed, colours, media support, ink system, models, finishing. Pulled directly from the same internal knowledge base Orient&apos;s sales team uses to generate customer quotations. If a number changes in the source, it changes here.
          </p>

          <p>
            And then there&apos;s the chat.
          </p>

          <figure className="my-10">
            <img
              src="/blog/orient-ai-chat-response.png"
              alt="The Orient AI chat answering a question about C-Series vs L&P Series differences with a structured table comparing print heads, speed, duplex capability, and finishing options"
              loading="lazy"
              width={1540}
              height={760}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The AI chat in action. A customer asks about C-Series vs L&amp;P differences and gets a structured, accurate comparison drawn from Orient&apos;s spec data — at any hour, in any timezone.
            </figcaption>
          </figure>

          <p>
            On the old site, a prospect at 11pm in Germany who wants to know whether the L&amp;P Series can do duplex printing has two options: download a PDF and search it, or wait until Indian business hours and email the sales team. On the new site, they ask. They get an answer in seconds. The answer is accurate because it&apos;s drawn from the same knowledge base that powers internal quoting — there&apos;s no opportunity for the chat to invent specs the team would later have to walk back.
          </p>

          <h2>Global reach: from a list of countries to an interactive map</h2>
          <p>
            Orient has machines installed in more than sixty countries. On the old site, that fact lived as a sentence in the About paragraph. There was no map, no list, no visual evidence — just the claim, dropped into a wall of text and easy to miss.
          </p>
          <p>
            On the new site, that same fact gets a dedicated section with an interactive 3D globe and a row of country pills. Hover the globe and it rotates. The country pills are real — every name on the list is a country with installed Orient machinery. The visual makes the &ldquo;sixty countries&rdquo; claim feel concrete instead of marketing copy.
          </p>

          <figure className="my-10">
            <img
              src="/blog/comparison-new-trusted-by.png"
              alt="The new Orient site's Trusted by Industry Leaders Worldwide section showing an interactive 3D globe with India highlighted in red, surrounded by pill-shaped country labels including Australia, Bangladesh, Belgium, Brazil, Canada, Chile, China, Colombia, Egypt, Ethiopia, Ghana, Greece, Hungary, Indonesia, and Iran"
              loading="lazy"
              width={1440}
              height={900}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The new Trusted by Industry Leaders Worldwide section. Interactive globe, sixteen country pills above the fold, and a real visual representation of the installed footprint. The old site has no equivalent.
            </figcaption>
          </figure>

          <p>
            This is one of the sections where the comparison becomes &ldquo;new vs nothing.&rdquo; The old tphorient.com simply does not have this. There&apos;s no map. There&apos;s no globe. There&apos;s no visualisation of where Orient operates. The claim of global reach exists; the proof of it does not.
          </p>

          <h2>About Orient: from a paragraph to a heritage walkthrough</h2>
          <p>
            For an eighty-year-old manufacturer, the About page is one of the most load-bearing surfaces on the entire site. It&apos;s where a serious buyer goes to decide whether the company is real, whether the heritage is real, whether the team is real. So how did each version handle it?
          </p>
          <p>
            On the old site, the About page is three paragraphs of text on a dark moody background. Two thirds of the screen is a stock photo of an industrial building. The remaining third is body copy that reads as a corporate boilerplate written sometime in the late 2000s. The content is fine. The presentation hides it.
          </p>

          <figure className="my-10">
            <img
              src="/blog/comparison-old-about.png"
              alt="The old Orient About Us page. A dark navy background with a stock photo at the top, followed by three paragraphs of body text on the right side. No timeline, no team photos, no infrastructure visuals"
              loading="lazy"
              width={1440}
              height={900}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The old About Us page. Three paragraphs of text on a dark background. The Legacy timeline, the team, the infrastructure, and the patrons are all on separate subpages — each one a single sentence and a static image.
            </figcaption>
          </figure>

          <p>
            On the new site, the About page is a single scroll. It opens with a clean photo of the Delhi NCR factory campus, an introductory paragraph, and a stat grid: <strong>79 years, 20,000+ units, 60+ countries, 10 offices.</strong> Then it descends into the heritage proper — a 1946→2025 timeline marking nine inflection points across eight decades. After that: the three production plants. After that: the three generations of leadership. After that: the supplier hub with logos. After that: the patron grid showing every country Orient ships to.
          </p>

          <figure className="my-10">
            <img
              src="/blog/comparison-new-about.png"
              alt="The new About Orient page. A long scroll that opens with a photo of the Delhi NCR factory campus, intro text, and a stat grid showing 79 years, 20,000+ units, 60+ countries, and 10 offices, followed by an Our Legacy timeline from 1946 to 2025, an Our Infrastructure section with three plants, and an Our Team section"
              loading="lazy"
              width={1440}
              height={3500}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The top half of the new About Orient page. Hero, intro, stats, the 1946→2025 timeline, the three plants, and the leadership team — all on one scroll. Below this fold: the supplier hub and the full patron grid across 44+ countries.
            </figcaption>
          </figure>

          <p>
            The old site had this content too. It was just spread across four separate subpages — Our Legacy, Our Infrastructure, Our Team, and a Patrons list — each one a sentence and a static image. Buyers would have had to click through four pages to assemble what the new site puts on one scroll. Most buyers don&apos;t click through four pages. They form their judgement from the first page that loads, which on the old site was the three-paragraph text wall.
          </p>
          <p>
            The new About page rewards the buyer for a single scroll. That&apos;s the entire change.
          </p>

          <h2>What stayed the same (on purpose)</h2>
          <p>
            A redesign isn&apos;t a teardown. There are things the old Orient site did right that we deliberately preserved.
          </p>
          <ul>
            <li><strong>The 1946 heritage line.</strong> &ldquo;Imprinting Excellence Worldwide Since 1946&rdquo; lives on as the page title and is referenced throughout the site. Eight decades of manufacturing isn&apos;t something you bury — it&apos;s the entire reason a prospect trusts the spec sheet in the first place.</li>
            <li><strong>The Orient logomark in red.</strong> Same wordmark, same colour, same italic. The logo is the most recognisable thing in the printing-machinery industry for this brand. Touching it would have been arrogant.</li>
            <li><strong>The &ldquo;20,000+ units in 60+ countries&rdquo; credibility anchor.</strong> Same fact, more confident delivery.</li>
            <li><strong>The &ldquo;Request a Quote&rdquo; CTA.</strong> Manufacturing buyers expect this button. We kept it — but instead of being the only path forward, it&apos;s now one of three (browse specs, ask the AI, or request the quote).</li>
          </ul>

          <h2>The strategic shift</h2>
          <p>
            The redesign isn&apos;t really about visual polish, even though the visual polish matters. It&apos;s about a shift in what the website is <em>for</em>.
          </p>
          <p>
            The old site was a brochure. Its job was to make Orient look credible long enough for a buyer to fill out the contact form, after which a salesperson would do the actual work of explaining the products. The website existed to <em>schedule</em> the conversation.
          </p>
          <p>
            The new site <em>is</em> the conversation — at least the first half of it. A prospect can land on the homepage, identify which machine line fits their use case, read the actual specs, ask follow-up questions in natural language, and only then decide whether they want to talk to a human. By the time they fill out the quote form, they already know what they&apos;re asking about.
          </p>
          <p>
            That changes everything for the sales team. The conversation that used to start with &ldquo;tell me about your machines&rdquo; now starts with &ldquo;I&apos;m interested in the Jet L&amp;P 432mm with UV curing — let&apos;s talk delivery and pricing.&rdquo; Sales cycle compresses. Junior reps stop spending half their day on basic-spec questions. The sales engineers get their time back for the conversations that actually need them.
          </p>

          <h2>Same knowledge, three surfaces</h2>
          <p>
            The reason this redesign was even possible is that the foundation already existed. Orient&apos;s sales team had been using a structured Claude AI project (built during our <a href="/blog/orient-case-study">earlier engagement</a>) to generate customer quotations. That meant their machine specifications, pricing logic, and terms were already codified in a clean, maintained knowledge base.
          </p>
          <p>
            The new website doesn&apos;t use a separate content system. It pulls from the same knowledge base. So does the AI chat widget. <strong>One knowledge base. Three surfaces. All consistent.</strong> When Orient updates a print head spec internally, it propagates to the spec table and the chat&apos;s answers in the same moment.
          </p>
          <p>
            That&apos;s the part that makes this approach worth talking about. Most B2B website redesigns end up creating <em>another</em> source of truth that drifts away from internal documents within six months. This one can&apos;t drift, because there&apos;s only ever one source.
          </p>

          <h2>What this means for other manufacturers</h2>
          <p>
            If you run a B2B manufacturing business with a similar website (homepage carousel, products dropdown, PDF catalogues, contact form), the path we walked with Orient is a real option. But the order matters.
          </p>
          <p>
            We didn&apos;t start with the website. We started by codifying the internal sales knowledge into a structured Claude AI project so the team could generate customer offers in 30 minutes instead of 4 hours. Once that knowledge base existed and was being used daily, surfacing it to customers was a relatively small additional step. The hard part — getting the spec data clean, accurate, and maintained — was already done.
          </p>
          <p>
            If you try to do the website redesign first and worry about the knowledge base later, you&apos;ll end up with a beautiful new shell wrapped around the same outdated PDFs. The knowledge base has to come first.
          </p>

          <p>
            That&apos;s the lesson I keep coming back to. Most companies don&apos;t have a website problem. They have a knowledge problem. The website is just where the knowledge problem becomes visible.
          </p>

          <MagazineOutro
            author="Pranav Ambwani"
            related={[
              {
                title: "How We Engineered an AI Product Expert for The Printers House Orient",
                description: "The architecture behind the AI chat. One knowledge base, three surfaces, all consistent.",
                href: "/blog/orient-product-experience",
                category: "Engineering",
              },
              {
                title: "How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments",
                description: "49 use cases mapped, 18 projects structured, 11 deployed. The full case study.",
                href: "/blog/orient-case-study",
                category: "Case Study",
              },
            ]}
            ctaHeading="Want this for your manufacturing site?"
            ctaBody={
              <>
                We help B2B manufacturers turn their internal sales knowledge
                into customer-facing AI experiences. Same source of truth,
                multiple surfaces, no drift.{" "}
                <a
                  href="/#contact"
                  className="text-accent font-medium hover:underline"
                >
                  Start a conversation →
                </a>
              </>
            }
          />
        </div>
      </article>

      <Footer />
    </>
  );
}
