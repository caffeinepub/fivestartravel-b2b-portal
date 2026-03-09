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
  Users,
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

const STATUS_COLORS: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const QUICK_BOOK = [
  { icon: Plane, label: "Flights", key: "flights" as DashboardPage },
  { icon: Hotel, label: "Hotels", key: "hotels" as DashboardPage },
  { icon: Package, label: "Tours", key: "tours" as DashboardPage },
  { icon: Car, label: "Transfers", key: "transfers" as DashboardPage },
  { icon: FileText, label: "Visa", key: "visa" as DashboardPage },
  { icon: Ship, label: "Cruises", key: "cruises" as DashboardPage },
  { icon: Train, label: "Railway", key: "railway" as DashboardPage },
  { icon: Package, label: "Packages", key: "packages" as DashboardPage },
];

interface DashboardHomeProps {
  onNavChange: (nav: DashboardPage) => void;
}

export function DashboardHome({ onNavChange }: DashboardHomeProps) {
  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard.stats.panel"
      >
        {[
          {
            label: "Total Bookings",
            value: "312",
            change: "+12% this month",
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Wallet Balance",
            value: "₹1,24,800",
            change: "Available credit",
            icon: TrendingUp,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "This Month Revenue",
            value: "₹4,28,500",
            change: "+18% vs last month",
            icon: Award,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Active Bookings",
            value: "24",
            change: "5 pending action",
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-4"
            data-ocid={`dashboard.stat.item.${i + 1}`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <div
                className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <p className="font-display font-bold text-xl text-foreground">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick booking */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h2 className="font-display font-semibold text-sm text-foreground mb-4">
          Quick Book
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {QUICK_BOOK.map((item, i) => (
            <button
              key={item.key}
              type="button"
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors duration-150 group"
              onClick={() => onNavChange(item.key)}
              data-ocid={`dashboard.quick_book.item.${i + 1}`}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent bookings */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-display font-semibold text-sm text-foreground">
            Recent Bookings
          </h2>
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
            Last 7 days
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            data-ocid="dashboard.bookings.table"
          >
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {[
                  "Booking ID",
                  "Service",
                  "Details",
                  "Passenger",
                  "Date",
                  "Amount",
                  "Status",
                ].map((h, hi) => (
                  <th
                    key={h}
                    className={`text-left px-5 py-3 text-xs font-medium text-muted-foreground ${
                      hi >= 2 && hi <= 3 ? "hidden sm:table-cell" : ""
                    } ${hi === 4 ? "hidden md:table-cell" : ""} ${hi === 6 ? "text-center" : ""} ${hi === 5 ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_BOOKINGS.map((b, i) => (
                <tr
                  key={b.id}
                  className="border-b border-border hover:bg-muted/20 transition-colors"
                  data-ocid={`dashboard.booking.row.${i + 1}`}
                >
                  <td className="px-5 py-3 font-mono text-xs font-medium text-primary">
                    {b.id}
                  </td>
                  <td className="px-5 py-3">
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                      {b.service}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-xs hidden sm:table-cell">
                    {b.route}
                  </td>
                  <td className="px-5 py-3 text-xs hidden md:table-cell">
                    {b.pax}
                  </td>
                  <td className="px-5 py-3 text-xs text-muted-foreground hidden lg:table-cell">
                    {b.date}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-xs">
                    {b.amount}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[b.status] || "bg-gray-100 text-gray-700"}`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deals & Offers */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h2 className="font-display font-semibold text-sm text-foreground mb-4">
          Deals & Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: "Dubai Special",
              desc: "Flight + Hotel from ₹42,000",
              tag: "HOT DEAL",
              color: "from-orange-500 to-red-500",
            },
            {
              title: "Europe Packages",
              desc: "Group tours from ₹85,000",
              tag: "NEW",
              color: "from-blue-500 to-purple-500",
            },
            {
              title: "Singapore Visa",
              desc: "Fast-track processing ₹3,500",
              tag: "LIMITED",
              color: "from-green-500 to-teal-500",
            },
          ].map((deal, i) => (
            <div
              key={deal.title}
              className={`rounded-xl bg-gradient-to-br ${deal.color} p-4 text-white`}
              data-ocid={`dashboard.deal.item.${i + 1}`}
            >
              <Badge className="bg-white/20 text-white border-white/30 text-xs mb-2">
                {deal.tag}
              </Badge>
              <h3 className="font-display font-semibold text-sm mb-1">
                {deal.title}
              </h3>
              <p className="text-white/80 text-xs">{deal.desc}</p>
              <button
                type="button"
                className="mt-3 text-xs font-medium bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full"
                data-ocid={`dashboard.deal.button.${i + 1}`}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
