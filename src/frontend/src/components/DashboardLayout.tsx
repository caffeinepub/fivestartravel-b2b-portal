import { Badge } from "@/components/ui/badge";
import {
  Award,
  Car,
  FileText,
  Hotel,
  Package,
  Plane,
  Ship,
  Train,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import type { Page } from "./PublicPages";

export type DashboardPage =
  | "dashboard"
  | "flights"
  | "hotels"
  | "tours"
  | "transfers"
  | "visa"
  | "cruises"
  | "railway"
  | "packages"
  | "bookings"
  | "wallet"
  | "reports"
  | "support";

export const DASHBOARD_NAV: {
  icon: React.ElementType;
  label: string;
  key: DashboardPage;
}[] = [
  { icon: TrendingUp, label: "Dashboard", key: "dashboard" },
  { icon: Plane, label: "Flights", key: "flights" },
  { icon: Hotel, label: "Hotels", key: "hotels" },
  { icon: Package, label: "Tours", key: "tours" },
  { icon: Car, label: "Transfers", key: "transfers" },
  { icon: FileText, label: "Visa", key: "visa" },
  { icon: Ship, label: "Cruises", key: "cruises" },
  { icon: Train, label: "Railway", key: "railway" },
  { icon: Package, label: "Packages", key: "packages" },
  { icon: FileText, label: "My Bookings", key: "bookings" },
  { icon: TrendingUp, label: "Wallet", key: "wallet" },
  { icon: Award, label: "Reports", key: "reports" },
  { icon: User, label: "Support", key: "support" },
];

interface DashboardLayoutProps {
  activeNav: DashboardPage;
  onNavChange: (nav: DashboardPage) => void;
  onLogout: () => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({
  activeNav,
  onNavChange,
  onLogout,
  children,
  title,
  subtitle,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className="w-56 bg-card border-r border-border flex-shrink-0 hidden md:flex flex-col"
        data-ocid="dashboard.sidebar.panel"
      >
        <div className="px-4 py-4 border-b border-border">
          <img
            src="/assets/uploads/image-1.png"
            alt="FiveStar Travel"
            className="h-9 w-auto object-contain"
          />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {DASHBOARD_NAV.map((item, i) => (
            <button
              key={item.key}
              type="button"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                activeNav === item.key
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
              onClick={() => onNavChange(item.key)}
              data-ocid={`dashboard.nav.item.${i + 1}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {item.key === "flights" && (
                <Badge className="ml-auto bg-accent/20 text-accent border-accent/20 text-[10px] px-1.5 py-0">
                  NEW
                </Badge>
              )}
            </button>
          ))}
        </nav>
        <div className="px-3 pb-4 border-t border-border pt-3">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-150"
            onClick={onLogout}
            data-ocid="dashboard.logout.button"
          >
            <X className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-5 flex-shrink-0">
          <div>
            <h1 className="font-display font-semibold text-foreground text-base">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">Wallet Balance</p>
              <p
                className="font-display font-bold text-accent text-sm"
                data-ocid="dashboard.wallet_balance.panel"
              >
                ₹1,24,800
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

// ── Coming Soon placeholder ───────────────────────────────────────────────────
export function ComingSoonPage({
  title,
  icon: Icon,
  onNavigateFlights,
}: {
  title: string;
  icon: React.ElementType;
  onNavigateFlights?: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[400px] text-center"
      data-ocid="dashboard.coming_soon.panel"
    >
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
        This module is coming soon in Phase 2. We're building the best-in-class{" "}
        {title.toLowerCase()} booking engine for travel agents.
      </p>
      <Badge className="bg-primary/10 text-primary border-primary/20">
        Phase 2 — Coming Soon
      </Badge>
      {onNavigateFlights && (
        <button
          type="button"
          className="mt-4 text-sm text-primary hover:underline"
          onClick={onNavigateFlights}
          data-ocid="dashboard.coming_soon.link"
        >
          Try Flight Booking →
        </button>
      )}
    </div>
  );
}

// ── Navigate helper (maps Page → DashboardPage) ─────────────────────────────
export function pageToDashboard(page: Page): DashboardPage | null {
  const map: Partial<Record<Page, DashboardPage>> = {
    dashboard: "dashboard",
    flights: "flights",
    hotels: "hotels",
    tours: "tours",
    transfers: "transfers",
    visa: "visa",
    cruises: "cruises",
    railway: "railway",
    packages: "packages",
    bookings: "bookings",
    wallet: "wallet",
    reports: "reports",
    support: "support",
  };
  return map[page] ?? null;
}
