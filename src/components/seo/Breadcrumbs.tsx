import { JsonLd } from "./JsonLd";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const SITE_URL = "https://settlewithai.com";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-muted">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-text-faint" aria-hidden="true">
                  ›
                </span>
              )}
              {i < allItems.length - 1 ? (
                <a href={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className="text-text">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
