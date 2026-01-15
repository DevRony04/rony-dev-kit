"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools";
import { Logo } from "./Logo";
import { ToolIcon } from "./ToolIcon";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-card-border p-4 flex flex-col">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <Logo className="w-10 h-10" />
        <div>
          <h1 className="text-xl font-bold">WiseTools</h1>
          <p className="text-xs text-muted">Developer Utilities</p>
        </div>
      </Link>

      <nav className="flex-1">
        <ul className="space-y-1">
          {tools.map((tool) => {
            const isActive = pathname === `/tools/${tool.slug}`;
            return (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-card-border"
                  }`}
                >
                  <ToolIcon icon={tool.icon} className="w-5 h-5" />
                  <span>{tool.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="text-xs text-muted mt-4">
        More tools coming soon...
      </div>
    </aside>
  );
}
