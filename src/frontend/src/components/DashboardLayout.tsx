import { Badge } from "@/components/ui/badge";
import {
  Award,
  Bell,
  BellRing,
  Brain,
  Building2,
  Car,
  FileText,
  Hotel,
  Layers,
  LogOut,
  MessageCircle,
  Package,
  Plane,
  QrCode,
  Search,
  Share2,
  Ship,
  Sparkles,
  Store,
  Terminal,
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
  | "whatsapp-bot"
  | "ai-itinerary"
  | "corporate";

const MAIN_MENU = "Main Menu";
const MANAGEMENT = "Management";
const TOOLS = "Tools & Automation";
const SETTINGS = "Settings";

export const DASHBOARD_NAV: {
  icon: React.ElementType;
  label: string;
  key: DashboardPage;
  badge?: string;
  section: string;
}[] = [
  {
    section: MAIN_MENU,
    icon: TrendingUp,
    label: "Dashboard",
    key: "dashboard",
  },
  {
    section: MAIN_MENU,
    icon: Plane,
    label: "Flights",
    key: "flights",
    badge: "LIVE",
  },
  { section: MAIN_MENU, icon: Hotel, label: "Hotels", key: "hotels" },
  { section: MAIN_MENU, icon: Package, label: "Tours", key: "tours" },
  { section: MAIN_MENU, icon: Car, label: "Transfers", key: "transfers" },
  { section: MAIN_MENU, icon: FileText, label: "Visa", key: "visa" },
  { section: MAIN_MENU, icon: Ship, label: "Cruises", key: "cruises" },
  { section: MAIN_MENU, icon: Train, label: "Railway", key: "railway" },
  { section: MAIN_MENU, icon: Package, label: "Packages", key: "packages" },
  {
    section: MANAGEMENT,
    icon: Store,
    label: "Supplier Marketplace",
    key: "supplier-marketplace",
    badge: "NEW",
  },
  {
    section: MANAGEMENT,
    icon: FileText,
    label: "My Bookings",
    key: "bookings",
  },
  { section: MANAGEMENT, icon: Wallet, label: "Wallet", key: "wallet" },
  { section: MANAGEMENT, icon: Award, label: "Reports", key: "reports" },
  { section: MANAGEMENT, icon: Users, label: "CRM", key: "crm" },
  {
    section: MANAGEMENT,
    icon: Building2,
    label: "Corporate",
    key: "corporate",
    badge: "NEW",
  },
  {
    section: TOOLS,
    icon: QrCode,
    label: "Smart PNR",
    key: "smart-pnr",
    badge: "NEW",
  },
  {
    section: TOOLS,
    icon: Share2,
    label: "Social Media",
    key: "social-media",
    badge: "NEW",
  },
  {
    section: TOOLS,
    icon: BellRing,
    label: "Reminders",
    key: "reminders",
    badge: "NEW",
  },
  {
    section: TOOLS,
    icon: MessageCircle,
    label: "WhatsApp Bot",
    key: "whatsapp-bot",
    badge: "NEW",
  },
  {
    section: TOOLS,
    icon: Terminal,
    label: "GDS Terminal",
    key: "gds",
    badge: "NEW",
  },
  {
    section: TOOLS,
    icon: Sparkles,
    label: "AI Itinerary",
    key: "ai-itinerary",
    badge: "AI",
  },
  { section: SETTINGS, icon: Layers, label: "White Label", key: "whitelabel" },
  {
    section: SETTINGS,
    icon: Bell,
    label: "Notifications",
    key: "notifications",
    badge: "3",
  },
  { section: SETTINGS, icon: User, label: "Support", key: "support" },
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

  // Group nav items by section
  const sections: string[] = [];
  const sectionMap: Record<string, typeof DASHBOARD_NAV> = {};
  for (const item of DASHBOARD_NAV) {
    if (!sections.includes(item.section)) {
      sections.push(item.section);
      sectionMap[item.section] = [];
    }
    sectionMap[item.section].push(item);
  }

  let navIndex = 0;

  return (
    <div className="min-h-screen flex" style={{ background: "#0B1220" }}>
      {/* Sidebar */}
      <aside
        className="w-64 flex-shrink-0 hidden md:flex flex-col border-r"
        style={{ background: "#111827", borderColor: "#1E2A3A" }}
        data-ocid="dashboard.sidebar.panel"
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b" style={{ borderColor: "#1E2A3A" }}>
          <div className="bg-white rounded-lg px-2 py-1.5 inline-flex items-center">
            <img
              src="/assets/uploads/image-3-1.png"
              alt="FiveStar Travel"
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0">
          {sections.map((section) => (
            <div key={section} className="mb-1">
              <div className="px-3 pt-3 pb-1.5">
                <span
                  className="text-[9px] font-bold tracking-widest uppercase"
                  style={{ color: "#4B5563" }}
                >
                  {section}
                </span>
              </div>
              {sectionMap[section].map((item) => {
                navIndex += 1;
                const idx = navIndex;
                const isActive = activeNav === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 relative"
                    style={{
                      background: isActive
                        ? "rgba(37,99,235,0.1)"
                        : "transparent",
                      borderLeft: isActive
                        ? "2px solid #2563EB"
                        : "2px solid transparent",
                      color: isActive ? "#FFFFFF" : "#9CA3AF",
                      fontWeight: isActive ? 600 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(255,255,255,0.05)";
                        (e.currentTarget as HTMLElement).style.color =
                          "#FFFFFF";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                        (e.currentTarget as HTMLElement).style.color =
                          "#9CA3AF";
                      }
                    }}
                    onClick={() => onNavChange(item.key)}
                    data-ocid={`dashboard.nav.item.${idx}`}
                  >
                    <item.icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: isActive ? "#60A5FA" : "#6B7280" }}
                    />
                    <span className="flex-1 text-left truncate">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded leading-none flex-shrink-0"
                        style={{
                          background:
                            item.badge === "LIVE"
                              ? "rgba(22,163,74,0.2)"
                              : item.badge === "AI"
                                ? "rgba(139,92,246,0.2)"
                                : "rgba(37,99,235,0.2)",
                          color:
                            item.badge === "LIVE"
                              ? "#4ADE80"
                              : item.badge === "AI"
                                ? "#A78BFA"
                                : item.badge === "3"
                                  ? "#F87171"
                                  : "#93C5FD",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom user area */}
        <div
          className="px-3 pb-4 border-t pt-3"
          style={{ borderColor: "#1E2A3A" }}
        >
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
              style={{ background: "rgba(37,99,235,0.2)", color: "#60A5FA" }}
            >
              DA
            </div>
            <div className="min-w-0">
              <p
                className="text-xs font-semibold truncate"
                style={{ color: "#FFFFFF" }}
              >
                Demo Agent
              </p>
              <p className="text-[10px]" style={{ color: "#6B7280" }}>
                Travel Agent
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
            style={{ color: "#F87171" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(220,38,38,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
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
        {/* Top bar */}
        <header
          className="h-16 flex items-center justify-between px-5 flex-shrink-0 border-b"
          style={{ background: "#111827", borderColor: "#1E2A3A" }}
        >
          {/* Left: Title */}
          <div className="flex-shrink-0 min-w-[160px]">
            <h1
              className="font-semibold text-sm leading-tight"
              style={{ color: "#FFFFFF", fontFamily: "'Sora', sans-serif" }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Center: Global Search */}
          <div className="flex-1 max-w-md mx-6 hidden sm:block">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "#0B1220", border: "1px solid #1E2A3A" }}
            >
              <Search
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "#6B7280" }}
              />
              <input
                type="text"
                placeholder="Search PNR, Booking ID, Client..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "#FFFFFF" }}
                data-ocid="dashboard.search_input"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Notifications */}
            <button
              type="button"
              className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150"
              style={{ background: "rgba(255,255,255,0.05)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.05)";
              }}
              data-ocid="dashboard.notifications.button"
            >
              <Bell className="w-4 h-4" style={{ color: "#9CA3AF" }} />
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                style={{ background: "#DC2626", color: "#FFFFFF" }}
              >
                3
              </span>
            </button>

            {/* Wallet Balance */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{
                background: "rgba(22,163,74,0.1)",
                border: "1px solid rgba(22,163,74,0.3)",
              }}
              data-ocid="dashboard.wallet_balance.panel"
            >
              <Wallet className="w-3.5 h-3.5" style={{ color: "#4ADE80" }} />
              <div>
                <p
                  className="text-[10px] leading-none"
                  style={{ color: "#6B7280" }}
                >
                  Wallet
                </p>
                <p
                  className="font-bold text-sm leading-none mt-0.5"
                  style={{ color: "#4ADE80" }}
                >
                  ₹{walletBal.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Profile Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
              style={{ background: "rgba(37,99,235,0.3)", color: "#93C5FD" }}
              data-ocid="dashboard.profile.button"
            >
              DA
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

// ── Coming Soon placeholder ────────────────────────────────────────────────
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
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(37,99,235,0.15)" }}
      >
        <Icon className="w-10 h-10" style={{ color: "#60A5FA" }} />
      </div>
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: "#FFFFFF", fontFamily: "'Sora', sans-serif" }}
      >
        {title}
      </h2>
      <p
        className="text-sm max-w-sm leading-relaxed mb-6"
        style={{ color: "#9CA3AF" }}
      >
        This module is coming soon in Phase 2. We're building the best-in-class{" "}
        {title.toLowerCase()} booking engine for travel agents.
      </p>
      <Badge
        style={{
          background: "rgba(37,99,235,0.15)",
          color: "#93C5FD",
          border: "1px solid rgba(37,99,235,0.3)",
        }}
      >
        Phase 2 — Coming Soon
      </Badge>
      {onNavigateFlights && (
        <button
          type="button"
          className="mt-4 text-sm hover:underline"
          style={{ color: "#60A5FA" }}
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

// ── Navigate helper ────────────────────────────────────────────────────────
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
