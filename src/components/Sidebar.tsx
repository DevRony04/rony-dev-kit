"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tools } from "@/lib/tools";
import { Logo } from "./Logo";
import { ToolIcon } from "./ToolIcon";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sidebarClasses = [
    "bg-card border-r border-card-border p-4 flex flex-col transition-all duration-300",
    "fixed inset-y-0 left-0 z-40 w-64 md:sticky md:top-0 md:h-screen",
    isMobileOpen ? "translate-x-0" : "-translate-x-full",
    "md:translate-x-0 md:inset-auto md:z-auto",
    isCollapsed ? "md:w-20" : "md:w-64",
    isScrolled ? "md:shadow-xl" : "md:shadow-none",
  ].join(" ");
  const footerClasses = [
    "text-xs text-muted mt-4",
    isCollapsed ? "md:hidden" : "",
  ].join(" ");

  return (
    <>
      {!isMobileOpen && (
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-card-border shadow-sm"
          aria-label="Open sidebar"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="w-5 h-5"
          >
            <path d="M4 6H20" />
            <path d="M4 12H20" />
            <path d="M4 18H20" />
          </svg>
        </button>
      )}

      {isMobileOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          aria-label="Close sidebar"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={sidebarClasses}>
        <div
          className={`flex items-center justify-between mb-8 ${
            isCollapsed ? "md:flex-col md:items-center md:gap-3" : ""
          }`}
        >
          <Link
            href="/"
            className={`flex items-center gap-3 overflow-hidden ${
              isCollapsed ? "md:flex-col" : ""
            }`}
          >
            <Logo
              className={`w-10 h-10 shrink-0 ${
                isCollapsed ? "md:w-9 md:h-9" : ""
              }`}
            />
            <div className={isCollapsed ? "md:hidden" : "block"}>
              <h1 className="text-xl font-bold">WiseTools</h1>
              <p className="text-xs text-muted">Developer Utilities</p>
            </div>
          </Link>
          <div
            className={`flex items-center gap-2 ${
              isCollapsed ? "md:w-full md:justify-center" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="hidden md:flex p-2 rounded-lg border border-card-border hover:border-primary transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={`w-4 h-4 transition-transform ${
                  isCollapsed ? "rotate-180" : "rotate-0"
                }`}
              >
                <path d="M15 6L9 12L15 18" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-2 rounded-lg border border-card-border hover:border-primary transition-colors"
              aria-label="Close sidebar"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="w-4 h-4"
              >
                <path d="M6 6L18 18" />
                <path d="M6 18L18 6" />
              </svg>
            </button>
          </div>
        </div>

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
                    } ${isCollapsed ? "md:justify-center md:px-2" : ""}`}
                    title={tool.name}
                    aria-label={tool.name}
                  >
                    <ToolIcon icon={tool.icon} className="w-5 h-5" />
                    <span className={isCollapsed ? "md:hidden" : "block"}>
                      {tool.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={footerClasses}>More tools coming soon...</div>
      </aside>
    </>
  );
}
