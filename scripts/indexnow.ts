/**
 * IndexNow submission — pings Bing, Yandex, Seznam, Naver in one call.
 * Google does not participate in IndexNow.
 *
 * Usage:
 *   npx tsx scripts/indexnow.ts            # submits every URL in sitemap.xml
 *   npx tsx scripts/indexnow.ts <url> ...  # submits specific URLs
 *
 * Key file must be reachable at: https://settlewithai.com/{KEY}.txt
 */

const HOST = "settlewithai.com";
const KEY = "35580e8a449801c687456b02a24eb891";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
}

async function submit(urlList: string[]) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  console.log(`IndexNow: ${res.status} ${res.statusText}`);
  if (text) console.log(text);
  if (!res.ok) process.exit(1);
}

async function main() {
  const cliUrls = process.argv.slice(2);
  const urls = cliUrls.length > 0 ? cliUrls : await fetchSitemapUrls();
  console.log(`Submitting ${urls.length} URLs to IndexNow...`);
  urls.forEach((u) => console.log(` - ${u}`));
  await submit(urls);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
