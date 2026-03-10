import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Download,
  IndianRupee,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

// ── Types ───────────────────────────────────────────────────────────────────
type BookingStatus = "Confirmed" | "Cancelled" | "Pending";
type Module =
  | "Flight"
  | "Hotel"
  | "Tour"
  | "Transfer"
  | "Visa"
  | "Cruise"
  | "Railway";

interface Booking {
  ref: string;
  module: Module;
  traveller: string;
  date: string;
  amount: number;
  status: BookingStatus;
}

interface KpiCard {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  sub: string;
}

// ── Mock Data ────────────────────────────────────────────────────────────────
const ALL_BOOKINGS: Booking[] = [
  {
    ref: "FST-FLT-20260301-001",
    module: "Flight",
    traveller: "Rahul Sharma",
    date: "01 Mar 2026",
    amount: 24500,
    status: "Confirmed",
  },
  {
    ref: "FST-HTL-20260228-002",
    module: "Hotel",
    traveller: "Priya Mehta",
    date: "28 Feb 2026",
    amount: 18200,
    status: "Confirmed",
  },
  {
    ref: "FST-TOUR-20260227-003",
    module: "Tour",
    traveller: "Anil Kumar",
    date: "27 Feb 2026",
    amount: 8936,
    status: "Pending",
  },
  {
    ref: "FST-TRF-20260226-004",
    module: "Transfer",
    traveller: "Sunita Patel",
    date: "26 Feb 2026",
    amount: 3200,
    status: "Confirmed",
  },
  {
    ref: "FST-VISA-20260225-005",
    module: "Visa",
    traveller: "Deepak Rao",
    date: "25 Feb 2026",
    amount: 7500,
    status: "Confirmed",
  },
  {
    ref: "FST-FLT-20260224-006",
    module: "Flight",
    traveller: "Meera Singh",
    date: "24 Feb 2026",
    amount: 32100,
    status: "Cancelled",
  },
  {
    ref: "FST-CRS-20260223-007",
    module: "Cruise",
    traveller: "Vikram Joshi",
    date: "23 Feb 2026",
    amount: 45000,
    status: "Confirmed",
  },
  {
    ref: "FST-RLY-20260222-008",
    module: "Railway",
    traveller: "Kavita Nair",
    date: "22 Feb 2026",
    amount: 1850,
    status: "Confirmed",
  },
  {
    ref: "FST-HTL-20260221-009",
    module: "Hotel",
    traveller: "Sanjay Gupta",
    date: "21 Feb 2026",
    amount: 22600,
    status: "Pending",
  },
  {
    ref: "FST-FLT-20260220-010",
    module: "Flight",
    traveller: "Pooja Desai",
    date: "20 Feb 2026",
    amount: 15400,
    status: "Confirmed",
  },
  {
    ref: "FST-TOUR-20260219-011",
    module: "Tour",
    traveller: "Amit Verma",
    date: "19 Feb 2026",
    amount: 12500,
    status: "Confirmed",
  },
  {
    ref: "FST-TRF-20260218-012",
    module: "Transfer",
    traveller: "Rekha Iyer",
    date: "18 Feb 2026",
    amount: 4800,
    status: "Cancelled",
  },
  {
    ref: "FST-VISA-20260217-013",
    module: "Visa",
    traveller: "Kiran Shah",
    date: "17 Feb 2026",
    amount: 9200,
    status: "Confirmed",
  },
  {
    ref: "FST-FLT-20260216-014",
    module: "Flight",
    traveller: "Ravi Pillai",
    date: "16 Feb 2026",
    amount: 28700,
    status: "Confirmed",
  },
  {
    ref: "FST-HTL-20260215-015",
    module: "Hotel",
    traveller: "Nisha Sharma",
    date: "15 Feb 2026",
    amount: 16900,
    status: "Pending",
  },
];

const MONTHLY_REVENUE = [
  {
    month: "Oct 2025",
    bookings: 187,
    gross: 5620000,
    net: 5058000,
    commission: 562000,
  },
  {
    month: "Nov 2025",
    bookings: 201,
    gross: 6034500,
    net: 5431050,
    commission: 603450,
  },
  {
    month: "Dec 2025",
    bookings: 243,
    gross: 7290000,
    net: 6561000,
    commission: 729000,
  },
  {
    month: "Jan 2026",
    bookings: 198,
    gross: 5940000,
    net: 5346000,
    commission: 594000,
  },
  {
    month: "Feb 2026",
    bookings: 215,
    gross: 6450000,
    net: 5805000,
    commission: 645000,
  },
  {
    month: "Mar 2026",
    bookings: 240,
    gross: 7210000,
    net: 6489000,
    commission: 721000,
  },
];

const MODULE_REVENUE = [
  { module: "Flight", revenue: 14820000, pct: 38.6, color: "#2563EB" },
  { module: "Hotel", revenue: 11220000, pct: 29.2, color: "#F97316" },
  { module: "Tour", revenue: 6340000, pct: 16.5, color: "#10B981" },
  { module: "Transfer", revenue: 2890000, pct: 7.5, color: "#8B5CF6" },
  { module: "Visa", revenue: 1980000, pct: 5.2, color: "#F59E0B" },
  { module: "Others", revenue: 1190000, pct: 3.0, color: "#EC4899" },
];

const AGENT_MONTHLY = [
  { month: "Oct 2025", bookings: 38, revenue: 1140000 },
  { month: "Nov 2025", bookings: 42, revenue: 1260000 },
  { month: "Dec 2025", bookings: 55, revenue: 1650000 },
  { month: "Jan 2026", bookings: 41, revenue: 1230000 },
  { month: "Feb 2026", bookings: 45, revenue: 1350000 },
  { month: "Mar 2026", bookings: 47, revenue: 1410000 },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const colorMap: Record<BookingStatus, string> = {
    Confirmed: "#10B981",
    Cancelled: "#EF4444",
    Pending: "#F59E0B",
  };
  const c = colorMap[status];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: `${c}22`, color: c, border: `1px solid ${c}44` }}
    >
      {status}
    </span>
  );
}

function ModuleBadge({ module }: { module: Module }) {
  const colors: Record<Module, string> = {
    Flight: "#2563EB",
    Hotel: "#F97316",
    Tour: "#10B981",
    Transfer: "#8B5CF6",
    Visa: "#F59E0B",
    Cruise: "#06B6D4",
    Railway: "#EC4899",
  };
  const c = colors[module];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold"
      style={{ background: `${c}22`, color: c, border: `1px solid ${c}44` }}
    >
      {module}
    </span>
  );
}

function GlassCard({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {children}
    </div>
  );
}

// ── Tab 1: Overview ───────────────────────────────────────────────────────────
function OverviewTab() {
  const kpis: KpiCard[] = [
    {
      label: "Total Bookings",
      value: "1,284",
      icon: BarChart3,
      color: "#2563EB",
      sub: "+12% vs last month",
    },
    {
      label: "Total Revenue",
      value: "₹38,42,500",
      icon: IndianRupee,
      color: "#F97316",
      sub: "+8.4% vs last month",
    },
    {
      label: "Avg Booking Value",
      value: "₹2,990",
      icon: TrendingUp,
      color: "#10B981",
      sub: "Per transaction",
    },
    {
      label: "Conversion Rate",
      value: "68.4%",
      icon: Users,
      color: "#8B5CF6",
      sub: "Searches to bookings",
    },
  ];

  const moduleBreakdown = [
    { name: "Flight", count: 420, pct: 100, color: "#2563EB" },
    { name: "Hotel", count: 310, pct: 73.8, color: "#F97316" },
    { name: "Tour", count: 198, pct: 47.1, color: "#10B981" },
    { name: "Transfer", count: 145, pct: 34.5, color: "#8B5CF6" },
    { name: "Visa", count: 115, pct: 27.4, color: "#F59E0B" },
    { name: "Others", count: 96, pct: 22.9, color: "#EC4899" },
  ];

  const recentBookings = ALL_BOOKINGS.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <GlassCard key={kpi.label}>
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${kpi.color}22` }}
              >
                <kpi.icon size={18} style={{ color: kpi.color }} />
              </div>
            </div>
            <div className="text-xl font-bold text-white mb-0.5">
              {kpi.value}
            </div>
            <div className="text-slate-400 text-sm">{kpi.label}</div>
            <div className="text-xs mt-1" style={{ color: kpi.color }}>
              {kpi.sub}
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <BarChart3 size={16} style={{ color: "#F97316" }} />
            Module-wise Bookings
          </h3>
          <div className="space-y-3">
            {moduleBreakdown.map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{m.name}</span>
                  <span className="text-white font-semibold">{m.count}</span>
                </div>
                <div
                  className="h-2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${m.pct}%`, background: m.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-white font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-2">
            {recentBookings.map((b, idx) => (
              <div
                key={b.ref}
                data-ocid={`reports.item.${idx + 1}`}
                className="flex items-center justify-between py-2 border-b"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div>
                  <div className="text-white text-xs font-mono">
                    {b.ref.split("-").slice(0, 3).join("-")}
                  </div>
                  <ModuleBadge module={b.module} />
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-semibold">
                    ₹{b.amount.toLocaleString("en-IN")}
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ── Tab 2: Booking Reports ───────────────────────────────────────────────────
function BookingReportsTab() {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filtered = ALL_BOOKINGS.filter((b) => {
    const matchSearch =
      search === "" ||
      b.ref.toLowerCase().includes(search.toLowerCase()) ||
      b.traveller.toLowerCase().includes(search.toLowerCase());
    const matchModule = moduleFilter === "All" || b.module === moduleFilter;
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    return matchSearch && matchModule && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-5">
      <GlassCard>
        <div className="flex flex-wrap gap-3">
          <Input
            data-ocid="reports.search_input"
            placeholder="Search by ref or traveller…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-56"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
            }}
          />
          <Select
            value={moduleFilter}
            onValueChange={(v) => {
              setModuleFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger
              data-ocid="reports.module.select"
              className="w-36"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              style={{
                background: "#1E293B",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {[
                "All",
                "Flight",
                "Hotel",
                "Tour",
                "Transfer",
                "Visa",
                "Cruise",
                "Railway",
              ].map((m) => (
                <SelectItem key={m} value={m} style={{ color: "white" }}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger
              data-ocid="reports.status.select"
              className="w-36"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              style={{
                background: "#1E293B",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {["All", "Confirmed", "Cancelled", "Pending"].map((s) => (
                <SelectItem key={s} value={s} style={{ color: "white" }}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            className="w-36"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
            }}
          />
          <Input
            type="date"
            className="w-36"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
            }}
          />
          <Button
            data-ocid="reports.export.button"
            variant="outline"
            className="ml-auto flex items-center gap-1.5"
            style={{
              borderColor: "#F97316",
              color: "#F97316",
              background: "transparent",
            }}
          >
            <Download size={14} />
            Export CSV
          </Button>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {[
                  "Booking Ref",
                  "Module",
                  "Traveller",
                  "Date",
                  "Amount",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-slate-400 font-medium px-4 py-3 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-10 text-slate-500"
                    data-ocid="reports.empty_state"
                  >
                    No bookings match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((b, idx) => (
                  <tr
                    key={b.ref}
                    data-ocid={`reports.row.${idx + 1}`}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-blue-300 font-mono text-xs">
                      {b.ref}
                    </td>
                    <td className="px-4 py-3">
                      <ModuleBadge module={b.module} />
                    </td>
                    <td className="px-4 py-3 text-slate-300">{b.traveller}</td>
                    <td className="px-4 py-3 text-slate-400">{b.date}</td>
                    <td className="px-4 py-3 text-white font-semibold">
                      ₹{b.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs h-7 px-2"
                        style={{ color: "#F97316" }}
                        data-ocid={`reports.view.button.${idx + 1}`}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-slate-500 text-sm">
            {filtered.length} results · Page {page} of {totalPages || 1}
          </span>
          <div className="flex gap-2">
            <Button
              data-ocid="reports.pagination_prev"
              size="sm"
              variant="ghost"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              style={{ color: "#94A3B8" }}
            >
              <ChevronLeft size={14} /> Prev
            </Button>
            <Button
              data-ocid="reports.pagination_next"
              size="sm"
              variant="ghost"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              style={{ color: "#94A3B8" }}
            >
              Next <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ── Tab 3: Revenue ───────────────────────────────────────────────────────────
function RevenueTab() {
  const walletStats = [
    { label: "Total Credited", value: "₹42,10,000", color: "#10B981" },
    { label: "Total Debited", value: "₹38,42,500", color: "#EF4444" },
    { label: "Net Balance", value: "₹3,67,500", color: "#F97316" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {walletStats.map((s) => (
          <GlassCard key={s.label}>
            <div className="text-slate-400 text-sm mb-1">{s.label}</div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="overflow-hidden p-0">
        <div
          className="px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h3 className="text-white font-semibold">
            Monthly Revenue Breakdown
          </h3>
          <p className="text-slate-500 text-sm">Oct 2025 – Mar 2026</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {[
                  "Month",
                  "Bookings",
                  "Gross Revenue",
                  "Net Revenue",
                  "Commission",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-slate-400 font-medium px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MONTHLY_REVENUE.map((r, i) => (
                <tr
                  key={r.month}
                  data-ocid={`reports.revenue.row.${i + 1}`}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-5 py-3 text-white font-medium">
                    {r.month}
                  </td>
                  <td className="px-5 py-3 text-slate-300">{r.bookings}</td>
                  <td className="px-5 py-3 text-white">{formatINR(r.gross)}</td>
                  <td className="px-5 py-3 text-emerald-400">
                    {formatINR(r.net)}
                  </td>
                  <td className="px-5 py-3 text-orange-400">
                    {formatINR(r.commission)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-white font-semibold mb-4">Revenue by Module</h3>
        <div className="space-y-4">
          {MODULE_REVENUE.map((m) => (
            <div key={m.module}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-300 font-medium">{m.module}</span>
                <span className="text-white font-semibold">
                  {formatINR(m.revenue)}{" "}
                  <span className="text-slate-500 font-normal">({m.pct}%)</span>
                </span>
              </div>
              <div
                className="h-2.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-2.5 rounded-full"
                  style={{ width: `${m.pct * 2.59}%`, background: m.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ── Tab 4: Agent Performance ─────────────────────────────────────────────────
function AgentPerformanceTab() {
  const perfStats = [
    { label: "Bookings This Month", value: "47", color: "#2563EB", icon: "📋" },
    {
      label: "Revenue This Month",
      value: "₹1,41,000",
      color: "#F97316",
      icon: "💰",
    },
    { label: "Top Module", value: "Flights", color: "#10B981", icon: "✈" },
    {
      label: "Commission Earned",
      value: "₹14,100",
      color: "#8B5CF6",
      icon: "🎯",
    },
  ];

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
            style={{ background: "linear-gradient(135deg,#1E3A8A,#2563EB)" }}
          >
            RS
          </div>
          <div>
            <div className="text-white text-lg font-bold">Demo Agent</div>
            <div className="text-slate-400 text-sm">
              Agent ID: FST-AGT-711431
            </div>
            <div className="text-slate-500 text-xs mt-0.5">
              Joined January 2024 · Active
            </div>
          </div>
          <div className="ml-auto">
            <Badge
              style={{
                background: "#10B98122",
                color: "#10B981",
                border: "1px solid #10B98133",
              }}
            >
              Active
            </Badge>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {perfStats.map((s) => (
          <GlassCard key={s.label}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-xl font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="overflow-hidden p-0">
        <div
          className="px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h3 className="text-white font-semibold">
            Monthly Performance Trend
          </h3>
          <p className="text-slate-500 text-sm">Last 6 months</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Month", "Bookings", "Revenue", "vs. Prev Month"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-slate-400 font-medium px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AGENT_MONTHLY.map((r, i) => {
                const prev = AGENT_MONTHLY[i - 1];
                const diff = prev ? r.bookings - prev.bookings : null;
                return (
                  <tr
                    key={r.month}
                    data-ocid={`reports.agent.row.${i + 1}`}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-3 text-white font-medium">
                      {r.month}
                    </td>
                    <td className="px-5 py-3 text-slate-300">{r.bookings}</td>
                    <td className="px-5 py-3 text-white">
                      {formatINR(r.revenue)}
                    </td>
                    <td className="px-5 py-3">
                      {diff === null ? (
                        <span className="text-slate-600">—</span>
                      ) : diff > 0 ? (
                        <span className="text-emerald-400">▲ +{diff}</span>
                      ) : diff < 0 ? (
                        <span className="text-red-400">▼ {diff}</span>
                      ) : (
                        <span className="text-slate-500">= 0</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────
export function ReportsModule() {
  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "bookings", label: "Booking Reports" },
    { value: "revenue", label: "Revenue" },
    { value: "agent", label: "Agent Performance" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6" style={{ color: "white" }}>
      <div>
        <h1 className="text-2xl font-bold text-white">
          Reports &amp; Analytics
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Overview of your bookings, revenue, and performance.
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList
          className="flex gap-1 p-1 rounded-xl w-full md:w-auto"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {tabs.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              data-ocid={`reports.${t.value}.tab`}
              className="text-sm px-4 py-2 rounded-lg transition-all"
              style={{ color: "#94A3B8" }}
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="bookings" className="mt-6">
          <BookingReportsTab />
        </TabsContent>
        <TabsContent value="revenue" className="mt-6">
          <RevenueTab />
        </TabsContent>
        <TabsContent value="agent" className="mt-6">
          <AgentPerformanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
