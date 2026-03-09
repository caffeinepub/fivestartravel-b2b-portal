import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  Award,
  Car,
  FileText,
  Hotel,
  Package,
  Plane,
  Ship,
  Train,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import type { DashboardPage } from "./DashboardLayout";

// ── Recent Bookings Data ──────────────────────────────────────────────────────
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

const STATUS_CONFIG: Record<string, { cls: string; dot: string }> = {
  Confirmed: {
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  Pending: {
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  Processing: {
    cls: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  Cancelled: {
    cls: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
};

const QUICK_BOOK = [
  {
    icon: Plane,
    label: "Flights",
    key: "flights" as DashboardPage,
    gradient: "from-blue-600 to-blue-800",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    icon: Hotel,
    label: "Hotels",
    key: "hotels" as DashboardPage,
    gradient: "from-orange-500 to-orange-700",
    bg: "bg-orange-50",
    text: "text-orange-700",
  },
  {
    icon: Package,
    label: "Tours",
    key: "tours" as DashboardPage,
    gradient: "from-purple-600 to-purple-800",
    bg: "bg-purple-50",
    text: "text-purple-700",
  },
  {
    icon: Car,
    label: "Transfers",
    key: "transfers" as DashboardPage,
    gradient: "from-teal-500 to-teal-700",
    bg: "bg-teal-50",
    text: "text-teal-700",
  },
  {
    icon: FileText,
    label: "Visa",
    key: "visa" as DashboardPage,
    gradient: "from-indigo-500 to-indigo-700",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
  },
  {
    icon: Ship,
    label: "Cruises",
    key: "cruises" as DashboardPage,
    gradient: "from-cyan-500 to-cyan-700",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
  },
  {
    icon: Train,
    label: "Railway",
    key: "railway" as DashboardPage,
    gradient: "from-rose-500 to-rose-700",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
  {
    icon: Package,
    label: "Packages",
    key: "packages" as DashboardPage,
    gradient: "from-amber-500 to-amber-700",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
];

const STAT_CARDS = [
  {
    label: "Total Bookings",
    value: "312",
    change: "+12% this month",
    up: true,
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-l-blue-500",
  },
  {
    label: "Wallet Balance",
    value: "₹1,24,800",
    change: "Available credit",
    up: true,
    icon: Wallet,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-l-emerald-500",
  },
  {
    label: "This Month Revenue",
    value: "₹4,28,500",
    change: "+18% vs last month",
    up: true,
    icon: TrendingUp,
    color: "text-accent",
    bg: "bg-orange-50",
    border: "border-l-orange-500",
  },
  {
    label: "Active Clients",
    value: "87",
    change: "+5 this week",
    up: true,
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-l-purple-500",
  },
];

interface DashboardHomeProps {
  onNavChange: (nav: DashboardPage) => void;
}

export function DashboardHome({ onNavChange }: DashboardHomeProps) {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard.stats.panel"
      >
        {STAT_CARDS.map((card, i) => (
          <div
            key={card.label}
            className={`bg-card rounded-xl border border-l-4 ${card.border} border-border p-5 shadow-xs hover:shadow-navy-sm transition-shadow`}
            data-ocid={`dashboard.stats.item.${i + 1}`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {card.label}
              </p>
              <div
                className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0`}
              >
                <card.icon className={`w-4.5 h-4.5 ${card.color}`} />
              </div>
            </div>
            <p className={`font-display text-2xl font-bold ${card.color} mb-1`}>
              {card.value}
            </p>
            <div className="flex items-center gap-1">
              {card.up && <ArrowUpRight className="w-3 h-3 text-emerald-500" />}
              <span className="text-xs text-muted-foreground">
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Book */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-xs">
        <h2 className="font-display font-semibold text-foreground mb-4">
          Quick Book
        </h2>
        <div
          className="grid grid-cols-4 md:grid-cols-8 gap-3"
          data-ocid="dashboard.quick_book.panel"
        >
          {QUICK_BOOK.map((item, i) => (
            <button
              key={item.key}
              type="button"
              className="flex flex-col items-center gap-2 group"
              onClick={() => onNavChange(item.key)}
              data-ocid={`dashboard.quick_book.item.${i + 1}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-150`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-display font-semibold text-foreground">
            Recent Bookings
          </h2>
          <button
            type="button"
            className="text-xs text-accent hover:underline font-medium"
            onClick={() => onNavChange("bookings")}
            data-ocid="dashboard.bookings.link"
          >
            View all →
          </button>
        </div>
        <div className="overflow-x-auto" data-ocid="dashboard.bookings.table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                {[
                  "Booking ID",
                  "Service",
                  "Route / Hotel",
                  "Passenger",
                  "Date",
                  "Amount",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3"
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
                    className="border-t border-border hover:bg-muted/30 transition-colors"
                    data-ocid={`dashboard.bookings.row.${i + 1}`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground font-mono text-xs">
                      {b.id}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {b.service}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {b.route}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{b.pax}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {b.date}
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {b.amount}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${sc.cls}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
                        />
                        {b.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deals Banner */}
      <div
        className="rounded-xl p-6 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.08 260) 0%, oklch(0.22 0.09 255) 100%)",
        }}
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at right, oklch(0.65 0.22 42) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-accent text-sm font-semibold">
                Exclusive Agent Deals
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-1">
              Dubai 5N/6D Package — ₹42,500/pax
            </h3>
            <p className="text-white/60 text-sm">
              Includes flights, hotel & transfers · Valid till 31 Mar 2026
            </p>
          </div>
          <button
            type="button"
            className="btn-orange px-5 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0"
            onClick={() => onNavChange("tours")}
            data-ocid="dashboard.deals.primary_button"
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}
