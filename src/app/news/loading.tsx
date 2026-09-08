export default function Loading() {
  return (
    <div>
      {/* Hero skeleton */}
      <section className="text-[#34414a] bg-[#dceff7] rounded-3xl border border-[#c8dfe7] shadow-[0_10px_24px_rgba(52,65,74,0.08)] max-w-7xl mx-4 sm:mx-6 xl:mx-auto mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
          <div className="h-4 w-32 bg-[#8298aa]/30 rounded mb-3" />
          <div className="h-8 w-72 bg-[#8298aa]/30 rounded mb-3" />
          <div className="h-4 w-full max-w-xl bg-[#8298aa]/20 rounded" />
          <div className="h-4 w-2/3 max-w-xl bg-[#8298aa]/20 rounded mt-2" />
        </div>
      </section>

      {/* Cards skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="h-6 w-48 bg-[#8298aa]/30 rounded mb-10 animate-pulse" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#dce5ea] rounded-2xl p-6 border border-[#b8c7d1] shadow-[0_8px_20px_rgba(52,65,74,0.06)] animate-pulse"
            >
              <div className="h-4 w-20 bg-[#8298aa]/30 rounded mb-4" />
              <div className="h-5 w-full bg-[#8298aa]/20 rounded mb-2" />
              <div className="h-5 w-4/5 bg-[#8298aa]/20 rounded mb-6" />
              <div className="h-4 w-32 bg-[#8298aa]/30 rounded" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

