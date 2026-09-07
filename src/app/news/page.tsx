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
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-teal-500/20 text-teal-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Live Peptide News
            </span>
            <h1 className="text-5xl font-bold text-white mb-6">Peptide Research News</h1>
            <p className="text-xl text-white/60">
              Aggregated headlines from across the web on peptide research, regulation, and the
              research-compound industry. Each card links out to the original publisher.
            </p>
            <p className="text-xs text-white/30 mt-4">
              Updated automatically. Sources are third-party publishers; GHK Peptides does not write or
              endorse the linked articles.
            </p>
          </div>
        </div>
      </section>

      {/* Editor's picks */}
      <section className="py-16 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Editor&apos;s Picks</h2>
            <p className="text-white/50 text-sm mb-8">
              A few standout reads our team recommends, in addition to the live feed below.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editorPicks.map((pick) => (
                <article
                  key={pick.link}
                  className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition group flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-teal-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      {pick.source}
                    </span>
                    <span className="text-xs text-white/40">Featured</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-teal-400 transition">
                    {pick.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 flex-1">{pick.blurb}</p>
                  <a
                    href={pick.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold text-sm"
                  >
                    Read on {pick.source}
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News feed */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Latest Headlines</h2>
            {items.length === 0 ? (
              <div className="max-w-xl mx-auto text-center py-16">
                <p className="text-white/60 mb-4">
                  The live news feed could not be loaded right now. You can browse the latest peptide
                  headlines directly on Google News.
                </p>
                <a
                  href="https://news.google.com/search?q=peptide+research&hl=en-GB&gl=GB&ceid=GB:en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-teal-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-teal-600 transition"
                >
                  Open Peptide News on Google News
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, i) => (
                  <article
                    key={`${item.link}-${i}`}
                    className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition group flex flex-col"
                  >
                    <div className="aspect-video bg-gradient-to-br from-teal-500/20 to-blue-500/20 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl opacity-40">📰</span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-teal-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                          {item.source}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {item.pubDate && (
                        <div className="text-sm text-white/40 mb-3">{formatDate(item.pubDate)}</div>
                      )}
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition">
                        {item.title}
                      </h2>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold text-sm"
                      >
                        Read on {item.source}
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Read Our Research Guides</h2>
            <p className="text-lg text-white/60 mb-8">
              Beyond the headlines, our blog covers peptide testing, storage, and quality standards in depth.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-teal-500 text-black font-bold px-8 py-4 rounded-lg hover:bg-teal-600 transition"
            >
              Browse the Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
