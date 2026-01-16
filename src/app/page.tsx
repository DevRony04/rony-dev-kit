import Link from "next/link";
import { tools } from "@/lib/tools";
import { Logo } from "@/components/Logo";
import { ToolIcon } from "@/components/ToolIcon";

const highlights = [
  {
    title: "Offline-first",
    description: "Run every tool locally in your browser.",
  },
  {
    title: "Privacy-focused",
    description: "No data leaves your device. Ever.",
  },
  {
    title: "Built for speed",
    description: "Instant feedback with zero setup.",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Logo className="w-14 h-14" />
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-muted">
                WiseTools
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Powerful developer utilities.
              </h1>
            </div>
          </div>
          <p className="text-muted text-lg">
            Validate, generate, and transform data instantly with a curated set
            of tools that stay fast, private, and offline-ready.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/tools/${tools[0]?.slug ?? ""}`}
              className="px-5 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
            >
              Launch a tool
            </Link>
            <a
              href="#tools"
              className="px-5 py-3 bg-card border border-card-border rounded-lg hover:border-primary transition-colors"
            >
              Browse all tools
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-card-border bg-card/60 px-4 py-3"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-card-border bg-card/60 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Quick Picks</h2>
            <span className="text-xs text-muted">
              {tools.length} tools available
            </span>
          </div>
          <div className="space-y-3">
            {tools.slice(0, 4).map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-3 rounded-xl border border-card-border bg-card px-4 py-3 hover:border-primary transition-colors"
              >
                <ToolIcon icon={tool.icon} className="w-6 h-6" />
                <div>
                  <p className="text-sm font-semibold">{tool.name}</p>
                  <p className="text-xs text-muted">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">All tools</h2>
            <p className="text-muted">
              Everything you need for tokens, encoding, and validation.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Offline-ready suite
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-2xl border border-card-border bg-card/60 p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <ToolIcon icon={tool.icon} className="w-8 h-8" />
                <span className="text-xs text-muted">/{tool.slug}</span>
              </div>
              <h3 className="text-lg font-semibold mt-4 group-hover:text-white">
                {tool.name}
              </h3>
              <p className="text-sm text-muted mt-2">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
