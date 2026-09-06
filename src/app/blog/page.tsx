import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Research Peptide Guides & Resources | GHK Peptides',
  description: 'Expert guides on research peptides, BPC-157, GHK-Cu, and more. Learn about peptide testing, storage, and research applications from GHK Peptides',
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'research peptide guides',
    'peptide research articles',
    'BPC-157 guide',
    'GHK-Cu research',
    'peptide testing guide',
    'peptide storage guide',
  ],
};

const blogPosts = [
  {
    slug: 'complete-guide-research-peptides',
    title: 'The Complete Guide to Research Peptides in 2026',
    excerpt: 'Everything you need to know about research peptides, including types, applications, quality standards, and how to choose a reliable supplier.',
    date: '2026-08-20',
    readTime: '12 min read',
    category: 'Guides',
  },
  {
    slug: 'bpc-157-everything-you-need-to-know',
    title: 'BPC-157: Everything Researchers Need to Know',
    excerpt: 'A comprehensive overview of BPC-157 peptide, its research applications, quality standards, and what to look for when sourcing.',
    date: '2026-08-15',
    readTime: '10 min read',
    category: 'Peptides',
  },
  {
    slug: 'how-to-read-certificate-of-analysis',
    title: 'How to Read a Peptide Certificate of Analysis (COA)',
    excerpt: 'Learn how to interpret COA documents, understand purity testing, and verify the quality of your research peptides.',
    date: '2026-08-10',
    readTime: '8 min read',
    category: 'Quality',
  },
  {
    slug: 'peptide-storage-handling-guide',
    title: 'Peptide Storage & Handling: Best Practices',
    excerpt: 'Essential guidelines for storing and handling research peptides to maintain stability and purity.',
    date: '2026-08-05',
    readTime: '6 min read',
    category: 'Guides',
  },
  {
    slug: 'independent-testing-quality-promise',
    title: 'Independent Testing: Our Quality Promise',
    excerpt: 'Learn about our 8-point testing protocol and how batch documentation supports laboratory research.',
    date: '2026-08-01',
    readTime: '7 min read',
    category: 'Quality',
  },
  {
    slug: 'top-5-peptides-research-2026',
    title: 'Top 5 Research Peptides in 2026',
    excerpt: 'Discover the most popular research peptides of 2026, their applications, and why researchers choose them.',
    date: '2026-07-25',
    readTime: '9 min read',
    category: 'Peptides',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-teal-500/20 text-teal-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Research Resources
            </span>
            <h1 className="text-5xl font-bold text-white mb-6">
              Peptide Research Guides & Resources
            </h1>
            <p className="text-xl text-white/60">
              Expert guides, research articles, and educational resources to help you understand research peptides, quality standards, and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition group"
                >
                  <div className="aspect-video bg-gradient-to-br from-teal-500/20 to-blue-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-50">📄</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-teal-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-white/40 mb-3">
                      <span>{new Date(post.date).toLocaleDateString('en-GB')}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition">
                      {post.title}
                    </h2>
                    <p className="text-white/60 text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold text-sm"
                    >
                      Read More
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Research?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Browse our catalog of independently tested research peptides with full COA documentation.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-teal-500 text-black font-bold px-8 py-4 rounded-lg hover:bg-teal-600 transition"
            >
              Browse Peptides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
