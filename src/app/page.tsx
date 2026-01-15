import Link from "next/link";
import { tools } from "@/lib/tools";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-2">
        <Logo className="w-12 h-12" />
        <h1 className="text-3xl font-bold">Welcome to WiseTools</h1>
      </div>
      <p className="text-muted mb-8">
        A collection of useful utilities for developers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block p-6 bg-card border border-card-border rounded-xl hover:border-primary transition-colors"
          >
            <div className="text-3xl mb-3">{tool.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-muted text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
