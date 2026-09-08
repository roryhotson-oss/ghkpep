import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Peptide Research News | GHK Peptides',
  description:
    'Live aggregated news headlines on peptide research, sourcing, and regulation. Curated links out to the original publishers — updated automatically.',
  robots: { index: true, follow: true },
  keywords: [
    'peptide news',
    'peptide research news',
    'BPC-157 news',
    'GHK-Cu news',
    'research peptides',
    'peptide industry news',
  ],
};

interface NewsItem {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  excerpt: string;
}

// Hand-curated features the editors recommend reading alongside the live feed.
const editorPicks: { title: string; link: string; source: string; blurb: string }[] = [
  {
    title: 'Peptides are everywhere. Here’s what you need to know.',
    link: 'https://www.technologyreview.com/2026/02/23/1133522/peptides-are-everywhere-heres-what-you-need-to-know/',
    source: 'MIT Technology Review',
    blurb: 'A clear overview of why peptides have exploded in popularity and what the science actually says.',
  },
  {
    title: 'Best Peptide Serums 2026, Reviewed With Videos',
    link: 'https://www.glamourmagazine.co.uk/gallery/best-peptide-serums',
    source: 'Glamour UK',
    blurb: 'Glamour’s beauty team tests the leading peptide skincare serums, with video reviews.',
  },
  {
    title: 'Best Peptide Serums',
    link: 'https://www.forbes.com/sites/forbes-personal-shopper/2026/08/06/best-peptide-serums/',
    source: 'Forbes',
    blurb: 'Forbes’ shopping editors round up top-rated peptide serums across price points.',
  },
  {
    title: 'Best Peptide Sources Reddit 2026 — What the Community Recommends',
    link: 'https://dailyvial.com/article/best-peptide-sources-reddit',
    source: 'Daily Vial',
    blurb: 'A summary of what the Reddit peptide community recommends for sourcing in 2026.',
  },
  {
    title: 'Peptide Articles & Guides',
    link: 'https://nootroholic.com/category/peptide',
    source: 'Nootroholic',
    blurb: 'A regularly updated category feed of peptide research, sourcing, and nootropic write-ups.',
  },
];

const GOOGLE_NEWS_RSS =
  'https://news.google.com/rss/search?q=peptide+research+OR+peptides&hl=en-GB&gl=GB&ceid=GB:en';

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function parseRss(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 24) {
    const block = match[1];
    const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/);
    const dateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const descMatch = block.match(/<description>([\s\S]*?)<\/description>/);

    if (!titleMatch || !linkMatch) continue;

    const rawTitle = decodeEntities(titleMatch[1].trim());
    // Google News titles end with " - Source Name"; split off the source.
    const lastDash = rawTitle.lastIndexOf(' - ');
    const title = lastDash > 0 ? rawTitle.slice(0, lastDash).trim() : rawTitle;
    const source = lastDash > 0 ? rawTitle.slice(lastDash + 3).trim() : 'Google News';

    const excerpt = stripHtml(descMatch ? descMatch[1] : '').slice(0, 220);
    const pubDate = dateMatch ? dateMatch[1].trim() : '';

    items.push({ title, link: linkMatch[1].trim(), source, pubDate, excerpt });
  }

  return items;
}

async function getPeptideNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(GOOGLE_NEWS_RSS, {
      next: { revalidate: 3600 },
      headers: { 'user-agent': 'GHKPeptidesNewsBot/1.0 (+https://www.ghkpep.com)' },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml);
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default async function NewsPage() {
  const items = await getPeptideNews();

  return (
    <div>
      {/* Hero */}
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Live peptide news</p>
          <h1 className="text-3xl font-bold">Peptide Research News</h1>
          <p className="text-[#a7b0b2] mt-3 max-w-2xl">
            Aggregated headlines from across the web on peptide research, regulation, and the
            research-compound industry. Each card links out to the original publisher.
          </p>
          <p className="text-[#a7b0b2] text-xs mt-4 max-w-2xl">
            Updated automatically. Sources are third-party publishers; GHK Peptides does not write or
            endorse the linked articles.
          </p>
        </div>
      </section>

      {/* Editor&apos;s picks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-[#8298aa] text-sm font-medium mb-2">Editor&apos;s picks</p>
          <h2 className="text-2xl font-bold text-[#34414a]">A few standout reads.</h2>
          <p className="text-[#a7b0b2] mt-2 max-w-3xl">
            Recommended reading from across the web, in addition to the live feed below.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {editorPicks.map((pick) => (
            <article
              key={pick.link}
              className="text-[#34414a] bg-[#dce5ea] rounded-2xl p-6 border border-[#b8c7d1] shadow-[0_8px_20px_rgba(52,65,74,0.06)] flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] px-2 py-1 bg-[#111d2c] text-[#a7b0b2] rounded font-mono">
                  {pick.source}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2">{pick.title}</h3>
              <p className="text-[#a7b0b2] text-sm leading-relaxed mb-4 flex-1">{pick.blurb}</p>
              <a
                href={pick.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8298aa] text-sm hover:underline"
              >
                Read on {pick.source} →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* News feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-10">
          <p className="text-[#8298aa] text-sm font-medium mb-2">The feed</p>
          <h2 className="text-2xl font-bold text-[#34414a]">Latest headlines</h2>
        </div>
        {items.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <p className="text-[#a7b0b2] mb-4">
              The live news feed could not be loaded right now. You can browse the latest peptide
              headlines directly on Google News.
            </p>
            <a
              href="https://news.google.com/search?q=peptide+research&hl=en-GB&gl=GB&ceid=GB:en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-semibold rounded-xl hover:bg-[#16283c] transition"
            >
              Open Peptide News on Google News
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <article
                key={`${item.link}-${i}`}
                className="text-[#34414a] bg-[#dce5ea] rounded-2xl p-6 border border-[#b8c7d1] shadow-[0_8px_20px_rgba(52,65,74,0.06)] flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] px-2 py-1 bg-[#111d2c] text-[#a7b0b2] rounded font-mono">
                    {item.source}
                  </span>
                  {item.pubDate && (
                    <span className="text-[10px] text-[#8298aa]">{formatDate(item.pubDate)}</span>
                  )}
                </div>
                <h3 className="font-bold text-base mb-4 flex-1">{item.title}</h3>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8298aa] text-sm hover:underline"
                >
                  Read on {item.source} →
                </a>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Read our research guides</h2>
          <p className="text-[#a7b0b2] mb-8 max-w-2xl mx-auto">
            Beyond the headlines, our blog covers peptide testing, storage, and quality standards in depth.
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-4 bg-[#0c1622] border-2 border-[#FBFAF7] text-white font-bold rounded-xl hover:bg-[#16283c] transition"
          >
            Browse the Blog
          </Link>
        </div>
      </section>
    </div>
  );
}
