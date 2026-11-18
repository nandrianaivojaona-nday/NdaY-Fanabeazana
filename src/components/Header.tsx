import { Menu, X } from "lucide-react";
import { useState } from "react";

export type ActiveSection =
  | "overview"
  | "unesco"
  | "family-hub"
  | "teacher-studio"
  | "observatory";

interface HeaderProps {
  activeSection: ActiveSection;
  onSelectSection: (section: ActiveSection) => void;
  onOpenExport: () => void;
}

const NAV_ITEMS: { id: ActiveSection; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "unesco", label: "UNESCO 2027" },
  { id: "family-hub", label: "Family & Hub" },
  { id: "teacher-studio", label: "Teacher Studio" },
  { id: "observatory", label: "Observatory" },
];

export function Header({
  activeSection,
  onSelectSection,
  onOpenExport,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => {
            onSelectSection("overview");
            setMobileOpen(false);
          }}
          className="font-editorial cursor-pointer text-left text-xl font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900"
        >
          NdaY&apos;Fanabeazana
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary workspace navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                className={`cursor-pointer border-b-2 py-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900 ${
                  isActive
                    ? "border-blue-900 font-semibold text-slate-900"
                    : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenExport}
            className="cursor-pointer rounded-md bg-blue-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            Export Brief
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-slate-200 bg-white px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectSection(item.id);
                    setMobileOpen(false);
                  }}
                  className={`flex min-h-[44px] items-center rounded-md px-3 text-left text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 font-semibold text-blue-900"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
