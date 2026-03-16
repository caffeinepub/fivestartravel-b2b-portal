import { Badge } from "@/components/ui/badge";
import {
  Award,
  Bell,
  BellRing,
  Car,
  FileText,
  Hotel,
  Layers,
  LogOut,
  MessageCircle,
  Package,
  Plane,
  QrCode,
  Share2,
  Ship,
  Store,
  Train,
  TrendingUp,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getWalletBalance } from "../utils/walletUtils";
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
  | "crm"
  | "support"
  | "gds"
  | "whitelabel"
  | "notifications"
  | "smart-pnr"
  | "social-media"
  | "supplier-marketplace"
  | "reminders"
  | "whatsapp-bot";

export const DASHBOARD_NAV: {
  icon: React.ElementType;
  label: string;
  key: DashboardPage;
  badge?: string;
}[] = [
  { icon: TrendingUp, label: "Dashboard", key: "dashboard" },
  { icon: Plane, label: "Flights", key: "flights", badge: "LIVE" },
  { icon: Hotel, label: "Hotels", key: "hotels" },
  { icon: Package, label: "Tours", key: "tours" },
  { icon: Car, label: "Transfers", key: "transfers" },
  { icon: FileText, label: "Visa", key: "visa" },
  { icon: Ship, label: "Cruises", key: "cruises" },
  { icon: Train, label: "Railway", key: "railway" },
  { icon: Package, label: "Packages", key: "packages" },
  {
    icon: Store,
    label: "Supplier Marketplace",
    key: "supplier-marketplace",
    badge: "NEW",
  },
  { icon: FileText, label: "My Bookings", key: "bookings" },
  { icon: Wallet, label: "Wallet", key: "wallet" },
  { icon: Award, label: "Reports", key: "reports" },
  { icon: Users, label: "CRM", key: "crm" },
  { icon: QrCode, label: "Smart PNR", key: "smart-pnr", badge: "NEW" },
  { icon: Share2, label: "Social Media", key: "social-media", badge: "NEW" },
  { icon: BellRing, label: "Reminders", key: "reminders", badge: "NEW" },
  {
    icon: MessageCircle,
    label: "WhatsApp Bot",
    key: "whatsapp-bot",
    badge: "NEW",
  },
  { icon: Layers, label: "White Label", key: "whitelabel" },
  { icon: Bell, label: "Notifications", key: "notifications", badge: "3" },
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
  const [walletBal, setWalletBal] = useState(() => getWalletBalance());

  useEffect(() => {
    const handler = () => setWalletBal(getWalletBalance());
    window.addEventListener("storage", handler);
    const interval = setInterval(() => setWalletBal(getWalletBalance()), 2000);
    return () => {
      window.removeEventListener("storage", handler);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className="w-60 flex-shrink-0 hidden md:flex flex-col sidebar-gradient"
        data-ocid="dashboard.sidebar.panel"
      >
        {/* Logo area */}
        <div className="px-4 py-5 border-b border-sidebar-border">
          <div className="bg-white/90 rounded-lg px-2 py-1.5 inline-flex items-center">
            <img
              src="/assets/uploads/image-3-1.png"
              alt="FiveStar Travel"
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>

        {/* Nav label */}
        <div className="px-4 pt-5 pb-2">
          <span className="text-[10px] font-semibold tracking-widest text-sidebar-foreground/40 uppercase">
            Main Menu
          </span>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-4">
          {DASHBOARD_NAV.map((item, i) => (
            <button
              key={item.key}
              type="button"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeNav === item.key
                  ? "nav-active text-white"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
              onClick={() => onNavChange(item.key)}
              data-ocid={`dashboard.nav.item.${i + 1}`}
            >
              <item.icon
                className={`w-4 h-4 flex-shrink-0 ${
                  activeNav === item.key ? "text-accent" : "opacity-60"
                }`}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-accent/20 text-accent leading-none">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom user area */}
        <div className="px-3 pb-5 border-t border-sidebar-border pt-4 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-sidebar-foreground text-xs font-semibold truncate">
                Demo Agent
              </p>
              <p className="text-sidebar-foreground/40 text-[10px]">
                Travel Agent
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors duration-150"
            onClick={onLogout}
            data-ocid="dashboard.logout.button"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-14 bg-card/95 backdrop-blur-sm shadow-navy-sm border-b border-border flex items-center justify-between px-5 flex-shrink-0">
          <div>
            <h1 className="font-display font-semibold text-foreground text-base">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-accent/8 border border-accent/20 rounded-lg px-3 py-1.5">
              <Wallet className="w-3.5 h-3.5 text-accent" />
              <div>
                <p className="text-[10px] text-muted-foreground leading-none">
                  Wallet
                </p>
                <p
                  className="font-display font-bold text-accent text-sm leading-none mt-0.5"
                  data-ocid="dashboard.wallet_balance.panel"
                >
                  ₹{walletBal.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
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

// ── Coming Soon placeholder ────────────────────────────────────────────────────────────────────
function ComingSoonPageInternal({
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

export const ComingSoonPage = ComingSoonPageInternal;

// ── Navigate helper (maps Page → DashboardPage) ──────────────────────────────────────────────
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
