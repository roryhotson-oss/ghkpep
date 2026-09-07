export default function Loading() {
  return (
    <div className="bg-black min-h-screen">
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-teal-500/20 text-teal-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Live Peptide News
            </span>
            <h1 className="text-5xl font-bold text-white mb-6">Peptide Research News</h1>
            <p className="text-xl text-white/60">Loading the latest headlines&hellip;</p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-1/3 bg-white/10 rounded" />
                  <div className="h-6 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-4 w-2/3 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
