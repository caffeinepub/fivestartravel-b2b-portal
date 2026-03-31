import {
  ArrowUpRight,
  Award,
  Brain,
  Car,
  Eye,
  FileText,
  Hotel,
  Package,
  Pencil,
  Plane,
  Ship,
  Train,
  Users,
  Wallet,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import { DARK, LIGHT } from "../design-tokens";
import type { DashboardPage } from "./DashboardLayout";

// ── Static Data ───────────────────────────────────────────────────────────────────────────────
const RECENT_BOOKINGS = [
  {
    id: "FST-8821",
    service: "Flight",
    route: "DEL → DXB",
    pax: "Rahul Sharma",
    date: "12 Mar 2026",
    amount: "₹24,500",
    status: "Confirmed",
  },
  {
    id: "FST-8820",
    service: "Hotel",
    route: "Atlantis Dubai",
    pax: "Priya Singh",
    date: "10 Mar 2026",
    amount: "₹36,200",
    status: "Confirmed",
  },
  {
    id: "FST-8819",
    service: "Tour",
    route: "Dubai City Tour",
    pax: "Amit Gupta",
    date: "09 Mar 2026",
    amount: "₹8,500",
    status: "Pending",
  },
  {
    id: "FST-8818",
    service: "Visa",
    route: "UAE Visa",
    pax: "Neha Patel",
    date: "08 Mar 2026",
    amount: "₹4,200",
    status: "Processing",
  },
  {
    id: "FST-8817",
    service: "Transfer",
    route: "DXB Airport Pickup",
    pax: "Rahul Sharma",
    date: "07 Mar 2026",
    amount: "₹2,100",
    status: "Confirmed",
  },
];

const QUICK_ACTIONS = [
  {
    icon: Plane,
    label: "Flights",
    key: "flights" as DashboardPage,
    gradient: "from-blue-600 to-blue-800",
    lightBg: "#EFF6FF",
    lightColor: "#2563EB",
  },
  {
    icon: Hotel,
    label: "Hotels",
    key: "hotels" as DashboardPage,
    gradient: "from-orange-500 to-orange-700",
    lightBg: "#FFF7ED",
    lightColor: "#EA580C",
  },
  {
    icon: Package,
    label: "Tours",
    key: "tours" as DashboardPage,
    gradient: "from-purple-600 to-purple-800",
    lightBg: "#F5F3FF",
    lightColor: "#7C3AED",
  },
  {
    icon: Car,
    label: "Transfers",
    key: "transfers" as DashboardPage,
    gradient: "from-teal-500 to-teal-700",
    lightBg: "#F0FDFA",
    lightColor: "#0F766E",
  },
  {
    icon: FileText,
    label: "Visa",
    key: "visa" as DashboardPage,
    gradient: "from-indigo-500 to-indigo-700",
    lightBg: "#EEF2FF",
    lightColor: "#4338CA",
  },
  {
    icon: Ship,
    label: "Cruises",
    key: "cruises" as DashboardPage,
    gradient: "from-cyan-500 to-cyan-700",
    lightBg: "#ECFEFF",
    lightColor: "#0E7490",
  },
  {
    icon: Train,
    label: "Railway",
    key: "railway" as DashboardPage,
    gradient: "from-rose-500 to-rose-700",
    lightBg: "#FFF1F2",
    lightColor: "#BE123C",
  },
  {
    icon: Package,
    label: "Packages",
    key: "packages" as DashboardPage,
    gradient: "from-amber-500 to-amber-700",
    lightBg: "#FFFBEB",
    lightColor: "#B45309",
  },
  {
    icon: Users,
    label: "Add Client",
    key: "crm" as DashboardPage,
    gradient: "from-green-600 to-green-800",
    lightBg: "#F0FDF4",
    lightColor: "#15803D",
  },
  {
    icon: Brain,
    label: "AI Itinerary",
    key: "ai-itinerary" as DashboardPage,
    gradient: "from-violet-600 to-violet-800",
    lightBg: "#F5F3FF",
    lightColor: "#6D28D9",
  },
];

const PERF_DATA = [
  { month: "Oct", bookings: 48 },
  { month: "Nov", bookings: 56 },
  { month: "Dec", bookings: 89 },
  { month: "Jan", bookings: 72 },
  { month: "Feb", bookings: 91 },
  { month: "Mar", bookings: 105 },
];
const MAX_BOOKINGS = Math.max(...PERF_DATA.map((d) => d.bookings));

const TOP_DESTINATIONS = [
  { name: "Dubai", country: "UAE", flag: "🇦🇪", bookings: 142 },
  { name: "Thailand", country: "Thailand", flag: "🇹🇭", bookings: 98 },
  { name: "Bali", country: "Indonesia", flag: "🇮🇩", bookings: 76 },
];

export interface DashboardHomeProps {
  onNavChange: (nav: DashboardPage) => void;
}

export function DashboardHome({ onNavChange }: DashboardHomeProps) {
  const { theme } = useTheme();
  const t = theme === "light" ? LIGHT : DARK;

  const PRIMARY = t.primary;
  const SUCCESS = t.success;

  const STAT_CARDS = [
    {
      label: "Total Bookings",
      value: "312",
      change: "+12% this month",
      up: true,
      icon: Package,
      accentColor: PRIMARY,
      accentLight: theme === "light" ? "#EFF6FF" : "rgba(37,99,235,0.12)",
      borderColor: PRIMARY,
    },
    {
      label: "Wallet Balance",
      value: "₹1,24,800",
      change: "Available credit",
      up: true,
      icon: Wallet,
      accentColor: SUCCESS,
      accentLight: theme === "light" ? "#F0FDF4" : "rgba(22,163,74,0.12)",
      borderColor: SUCCESS,
    },
    {
      label: "Monthly Revenue",
      value: "₹4,28,500",
      change: "+18% vs last month",
      up: true,
      icon: Award,
      accentColor: SUCCESS,
      accentLight: theme === "light" ? "#F0FDF4" : "rgba(22,163,74,0.12)",
      borderColor: SUCCESS,
    },
    {
      label: "Active Clients",
      value: "87",
      change: "+5 this week",
      up: true,
      icon: Users,
      accentColor: PRIMARY,
      accentLight: theme === "light" ? "#EFF6FF" : "rgba(37,99,235,0.12)",
      borderColor: PRIMARY,
    },
  ];

  const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
    Confirmed: { bg: t.confirmedBg, color: t.confirmedText },
    Pending: { bg: t.pendingBg, color: t.pendingText },
    Processing: { bg: t.processingBg, color: t.processingText },
    Cancelled: { bg: t.cancelledBg, color: t.cancelledText },
  };

  return (
    <div className="space-y-5">
      {/* ── Stat Cards ── */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard.stats.panel"
      >
        {STAT_CARDS.map((card, i) => (
          <div
            key={card.label}
            className="rounded-xl p-5 cursor-default transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              borderLeft: `3px solid ${card.borderColor}`,
              boxShadow: t.shadow,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                `0 8px 24px ${card.accentColor}22`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = t.shadow;
            }}
            data-ocid={`dashboard.stats.item.${i + 1}`}
          >
            <div className="flex items-start justify-between mb-3">
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: t.muted }}
              >
                {card.label}
              </p>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: card.accentLight }}
              >
                <card.icon
                  className="w-4 h-4"
                  style={{ color: card.accentColor }}
                />
              </div>
            </div>
            <p
              className="text-2xl font-bold mb-1"
              style={{
                color: card.accentColor,
                fontFamily: "'Sora', sans-serif",
              }}
            >
              {card.value}
            </p>
            <div className="flex items-center gap-1">
              {card.up && (
                <ArrowUpRight
                  className="w-3 h-3"
                  style={{ color: card.accentColor }}
                />
              )}
              <span className="text-xs" style={{ color: t.muted }}>
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Wallet Hero Card ── */}
      <div
        className="rounded-xl p-5 relative overflow-hidden"
        style={{
          background:
            theme === "light"
              ? "linear-gradient(135deg, #16A34A 0%, #15803D 50%, #14532D 100%)"
              : "linear-gradient(135deg, #15803D 0%, #166534 50%, #14532D 100%)",
          boxShadow: "0 8px 32px rgba(22,163,74,0.25)",
        }}
        data-ocid="dashboard.wallet.card"
      >
        <div
          className="absolute right-0 top-0 w-64 h-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at right, white 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Your Wallet
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: "#FFFFFF", fontFamily: "'Sora', sans-serif" }}
            >
              ₹1,24,800
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Available Balance
            </p>
            <p
              className="text-xs mt-2"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              This Month: +₹24,500 added
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
              onClick={() => onNavChange("wallet")}
              data-ocid="dashboard.wallet.add_balance_button"
            >
              Add Balance
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "rgba(255,255,255,0.9)", color: "#15803D" }}
              onClick={() => onNavChange("wallet")}
              data-ocid="dashboard.wallet.view_transactions_button"
            >
              View Transactions
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div
        className="rounded-xl p-5"
        style={{
          background: t.cardBg,
          border: `1px solid ${t.border}`,
          boxShadow: t.shadow,
        }}
      >
        <h2
          className="font-semibold mb-4"
          style={{ color: t.text, fontFamily: "'Sora', sans-serif" }}
        >
          Quick Actions
        </h2>
        <div
          className="grid grid-cols-5 md:grid-cols-10 gap-3"
          data-ocid="dashboard.quick_actions.panel"
        >
          {QUICK_ACTIONS.map((item, i) => (
            <button
              key={item.key + item.label}
              type="button"
              className="flex flex-col items-center gap-2 group"
              onClick={() => onNavChange(item.key)}
              data-ocid={`dashboard.quick_actions.item.${i + 1}`}
            >
              {theme === "light" ? (
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-[1.05] group-hover:shadow-md"
                  style={{ background: item.lightBg }}
                >
                  <item.icon
                    className="w-6 h-6"
                    style={{ color: item.lightColor }}
                  />
                </div>
              ) : (
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center transition-all duration-200 group-hover:scale-[1.05] group-hover:shadow-lg`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              )}
              <span
                className="text-[10px] font-medium text-center leading-tight transition-colors"
                style={{ color: t.muted }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Two-column: Performance + Top Destinations ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Performance Graph */}
        <div
          className="lg:col-span-2 rounded-xl p-5"
          style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            boxShadow: t.shadow,
          }}
          data-ocid="dashboard.performance.panel"
        >
          <div className="flex items-center justify-between mb-5">
            <h2
              className="font-semibold"
              style={{ color: t.text, fontFamily: "'Sora', sans-serif" }}
            >
              Booking Performance
            </h2>
            <span className="text-xs" style={{ color: t.muted }}>
              Last 6 months
            </span>
          </div>
          <div className="flex items-end gap-3 h-32">
            {PERF_DATA.map((d) => {
              const pct = (d.bookings / MAX_BOOKINGS) * 100;
              return (
                <div
                  key={d.month}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <span
                    className="text-xs font-semibold"
                    style={{ color: t.text }}
                  >
                    {d.bookings}
                  </span>
                  <div
                    className="w-full rounded-t-md transition-all duration-300"
                    style={{
                      height: `${Math.round(pct * 0.88)}px`,
                      background: `linear-gradient(180deg, ${t.primary} 0%, ${t.primary}80 100%)`,
                      minHeight: "8px",
                    }}
                  />
                  <span className="text-[10px]" style={{ color: t.muted }}>
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
          <div
            className="mt-4 pt-4 flex items-center justify-between"
            style={{ borderTop: `1px solid ${t.border}` }}
          >
            <div>
              <p className="text-xs" style={{ color: t.muted }}>
                Total Bookings (6M)
              </p>
              <p className="text-lg font-bold" style={{ color: t.text }}>
                461
              </p>
            </div>
            <div>
              <p className="text-xs" style={{ color: t.muted }}>
                Revenue (6M)
              </p>
              <p className="text-lg font-bold" style={{ color: t.success }}>
                ₹28,14,500
              </p>
            </div>
            <div>
              <p className="text-xs" style={{ color: t.muted }}>
                Avg per month
              </p>
              <p className="text-lg font-bold" style={{ color: t.text }}>
                76.8
              </p>
            </div>
          </div>
        </div>

        {/* Top Destinations */}
        <div
          className="rounded-xl p-5"
          style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            boxShadow: t.shadow,
          }}
          data-ocid="dashboard.destinations.panel"
        >
          <h2
            className="font-semibold mb-4"
            style={{ color: t.text, fontFamily: "'Sora', sans-serif" }}
          >
            Top Destinations
          </h2>
          <div className="space-y-3">
            {TOP_DESTINATIONS.map((dest, i) => (
              <div
                key={dest.name}
                className="rounded-lg p-3 transition-all duration-200 cursor-pointer"
                style={{
                  background: t.inputBg,
                  border: `1px solid ${t.border}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    t.sidebarHoverBg;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = t.inputBg;
                }}
                data-ocid={`dashboard.destinations.item.${i + 1}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{dest.flag}</span>
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: t.text }}
                      >
                        {dest.name}
                      </p>
                      <p className="text-[10px]" style={{ color: t.muted }}>
                        {dest.country}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: t.processingBg,
                        color: t.processingText,
                      }}
                    >
                      Popular
                    </span>
                    <p className="text-xs mt-1" style={{ color: t.muted }}>
                      {dest.bookings} bookings
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Bookings ── */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: t.cardBg,
          border: `1px solid ${t.border}`,
          boxShadow: t.shadow,
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: `1px solid ${t.border}` }}
        >
          <h2
            className="font-semibold"
            style={{ color: t.text, fontFamily: "'Sora', sans-serif" }}
          >
            Recent Bookings
          </h2>
          <button
            type="button"
            className="text-xs font-medium hover:underline"
            style={{ color: t.primary }}
            onClick={() => onNavChange("bookings")}
            data-ocid="dashboard.bookings.link"
          >
            View all →
          </button>
        </div>
        <div className="overflow-x-auto" data-ocid="dashboard.bookings.table">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: t.inputBg }}>
                {[
                  "Booking ID",
                  "Service",
                  "Route / Hotel",
                  "Passenger",
                  "Date",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3"
                    style={{ color: t.muted }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_BOOKINGS.map((b, i) => {
                const sc = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.Pending;
                return (
                  <tr
                    key={b.id}
                    className="transition-colors"
                    style={{ borderTop: `1px solid ${t.border}` }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        t.sidebarHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                    }}
                    data-ocid={`dashboard.bookings.row.${i + 1}`}
                  >
                    <td
                      className="px-4 py-3 font-mono text-xs font-medium"
                      style={{ color: t.primary }}
                    >
                      {b.id}
                    </td>
                    <td className="px-4 py-3" style={{ color: t.muted }}>
                      {b.service}
                    </td>
                    <td
                      className="px-4 py-3 font-medium"
                      style={{ color: t.text }}
                    >
                      {b.route}
                    </td>
                    <td className="px-4 py-3" style={{ color: t.muted }}>
                      {b.pax}
                    </td>
                    <td className="px-4 py-3" style={{ color: t.muted }}>
                      {b.date}
                    </td>
                    <td
                      className="px-4 py-3 font-semibold"
                      style={{ color: t.text }}
                    >
                      {b.amount}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-150"
                          style={{
                            background: t.processingBg,
                            color: t.processingText,
                          }}
                          data-ocid={`dashboard.bookings.view_button.${i + 1}`}
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-150"
                          style={{
                            background: t.pendingBg,
                            color: t.pendingText,
                          }}
                          data-ocid={`dashboard.bookings.edit_button.${i + 1}`}
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Agent Deals Banner ── */}
      <div
        className="rounded-xl p-6 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
        }}
        data-ocid="dashboard.deals.panel"
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at right, #F97316 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5" style={{ color: "#F97316" }} />
              <span
                className="text-sm font-semibold"
                style={{ color: "#F97316" }}
              >
                Exclusive Agent Deals
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(220,38,38,0.3)", color: "#FCA5A5" }}
              >
                🔥 Limited Offer
              </span>
            </div>
            <h3
              className="font-bold text-xl mb-1"
              style={{ color: "#FFFFFF", fontFamily: "'Sora', sans-serif" }}
            >
              Dubai 5N/6D Package — ₹42,500/pax
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Includes flights, hotel &amp; transfers · Valid till 31 Mar 2026
            </p>
            <p
              className="text-xs mt-1 font-semibold"
              style={{ color: "#FCA5A5" }}
            >
              ⚡ Only 12 seats left
            </p>
          </div>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #F97316, #EC4899)",
              color: "#FFFFFF",
              boxShadow: "0 4px 15px rgba(249,115,22,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 20px rgba(249,115,22,0.5), 0 4px 15px rgba(249,115,22,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 15px rgba(249,115,22,0.4)";
            }}
            onClick={() => onNavChange("tours")}
            data-ocid="dashboard.deals.primary_button"
          >
            Start Booking →
          </button>
        </div>
      </div>
    </div>
  );
}
