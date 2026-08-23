import Link from 'next/link';
import type { ReactNode } from 'react';
import type { SectionAction, SectionBlock } from './section-types';

interface SectionRendererProps {
  blocks: SectionBlock[];
  customRenderers?: Record<string, ReactNode>;
}

function ActionLink({ action }: { action: SectionAction }) {
  const className =
    action.variant === 'secondary'
      ? 'px-5 py-2.5 border border-[#333] text-[#e1e7e5] rounded-lg hover:border-[#21c7a5] hover:text-[#21c7a5] transition'
      : 'px-5 py-2.5 bg-[#21c7a5] text-black font-semibold rounded-lg hover:bg-[#16a98d] transition';

  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

export default function SectionRenderer({ blocks, customRenderers = {} }: SectionRendererProps) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === 'custom') {
          return <div key={key}>{customRenderers[block.key] ?? null}</div>;
        }

        if (block.type === 'hero') {
          return (
            <section key={key} className="bg-[#0d0d0d] border-b border-[#2b3538]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {block.eyebrow ? <p className="text-[#21c7a5] text-sm font-medium mb-2">{block.eyebrow}</p> : null}
                <h1 className="text-3xl sm:text-4xl font-bold">{block.title}</h1>
                {block.description ? <p className="text-[#a7b0b2] mt-3 max-w-3xl">{block.description}</p> : null}
                {block.meta ? <p className="text-[#a7b0b2] text-sm mt-2">{block.meta}</p> : null}
                {block.actions?.length ? (
                  <div className="mt-6 flex flex-wrap gap-4 text-sm">
                    {block.actions.map((action) => (
                      <ActionLink key={action.href + action.label} action={action} />
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          );
        }

        if (block.type === 'trust-strip') {
          return (
            <section key={key} className="border-y border-[#2b3538] bg-[#0f1213]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {block.items.map((item) => (
                    <div key={item.label} className="bg-[#141414] border border-[#2b3538] rounded-lg px-3 py-2">
                      <p className="text-[#7b898e] text-[11px] uppercase tracking-wide">{item.label}</p>
                      <p className="text-[#21c7a5] text-sm font-semibold mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (block.type === 'split') {
          return (
            <section key={key} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  {block.eyebrow ? <p className="text-[#21c7a5] text-sm font-medium mb-2">{block.eyebrow}</p> : null}
                  <h2 className="text-2xl sm:text-3xl font-bold">{block.title}</h2>
                  <p className="text-[#a7b0b2] mt-3 leading-relaxed">{block.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-[#e1e7e5]">
                    {block.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="text-[#21c7a5]">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  {block.actions?.length ? (
                    <div className="mt-6 flex flex-wrap gap-4 text-sm">
                      {block.actions.map((action) => (
                        <ActionLink key={action.href + action.label} action={action} />
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="bg-gradient-to-br from-[#0a2a22] to-[#0a1a2a] border border-[#21c7a5]/20 rounded-2xl p-6">
                  {block.statLabel ? <p className="text-[#a7b0b2] text-sm">{block.statLabel}</p> : null}
                  {block.statValue ? <p className="text-4xl font-bold text-[#21c7a5] mt-2">{block.statValue}</p> : null}
                  <p className="text-[#dce5e3] text-sm mt-4">Built as local section components, so you can freely reorder, reuse, and iterate without touching shared layout or chrome.</p>
                </div>
              </div>
            </section>
          );
        }

        if (block.type === 'feature-grid') {
          const columnsClass =
            block.columns === 4
              ? 'md:grid-cols-2 lg:grid-cols-4'
              : block.columns === 2
                ? 'sm:grid-cols-2'
                : 'sm:grid-cols-2 lg:grid-cols-3';

          return (
            <section key={key} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <h2 className="text-2xl font-bold">{block.title}</h2>
              {block.description ? <p className="text-[#a7b0b2] mt-3 max-w-3xl">{block.description}</p> : null}
              <div className={`mt-8 grid gap-6 ${columnsClass}`}>
                {block.items.map((item) => (
                  <div key={item.title} className="bg-[#141414] rounded-xl p-6 border border-[#2b3538]">
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-[#a7b0b2] text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (block.type === 'content') {
          return (
            <section key={key} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {block.title ? <h2 className="text-2xl font-bold mb-4">{block.title}</h2> : null}
              <div className="space-y-4">
                {block.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${key}-paragraph-${paragraphIndex}`} className="text-[#a7b0b2] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          );
        }

        if (block.type === 'faq') {
          return (
            <section key={key} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <h2 className="text-2xl font-bold mb-8">{block.title}</h2>
              <div className="space-y-4">
                {block.items.map((item) => (
                  <div key={item.question} className="bg-[#141414] rounded-xl p-5 border border-[#2b3538]">
                    <h3 className="font-semibold">{item.question}</h3>
                    <p className="text-[#a7b0b2] text-sm mt-2 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        return (
          <section key={key} className="bg-[#0d0d0d] border-y border-[#2b3538]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h2 className="text-2xl font-bold mb-4">{block.title}</h2>
              {block.description ? <p className="text-[#a7b0b2] mb-6 max-w-2xl mx-auto">{block.description}</p> : null}
              <div className="flex gap-4 justify-center flex-wrap text-sm">
                {block.actions.map((action) => (
                  <ActionLink key={action.href + action.label} action={action} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
