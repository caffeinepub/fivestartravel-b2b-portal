import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type GDSProvider = "amadeus" | "sabre" | "travelport" | "galileo";
type GDSView = "dashboard" | "search" | "results" | "booking" | "confirm";
type CabinClass = "Economy" | "Premium Economy" | "Business" | "First";

interface GDSConfig {
  provider: GDSProvider;
  pcc: string;
  apiKey: string;
  status: "connected" | "disconnected" | "testing";
  lastSync: string;
  bookings: number;
}

interface FlightResult {
  id: string;
  airline: string;
  code: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  stops: number;
  cabin: string;
  fareClass: string;
  baseFare: number;
  taxes: number;
  total: number;
  gds: GDSProvider;
  refundable: boolean;
  seats: number;
}

// ── Static Data ───────────────────────────────────────────────────────────────
const GDS_PROVIDERS: {
  id: GDSProvider;
  name: string;
  color: string;
  logo: string;
  desc: string;
}[] = [
  {
    id: "amadeus",
    name: "Amadeus",
    color: "#005EB8",
    logo: "A",
    desc: "Global leader in travel technology — 1B+ transactions/year",
  },
  {
    id: "sabre",
    name: "Sabre",
    color: "#E31837",
    logo: "S",
    desc: "Powering 400+ airlines, 175K+ travel agents worldwide",
  },
  {
    id: "travelport",
    name: "Travelport",
    color: "#00A0D2",
    logo: "T",
    desc: "Apollo, Galileo & Worldspan unified in one platform",
  },
  {
    id: "galileo",
    name: "Galileo",
    color: "#FF6600",
    logo: "G",
    desc: "Pioneer CRS with deep European & Asia-Pacific coverage",
  },
];

const GDS_CONFIGS: GDSConfig[] = [
  {
    provider: "amadeus",
    pcc: "DELAM21A",
    apiKey: "am_test_xK92mN...",
    status: "connected",
    lastSync: "2 min ago",
    bookings: 1842,
  },
  {
    provider: "sabre",
    pcc: "9DEL",
    apiKey: "sb_prod_fP38tL...",
    status: "connected",
    lastSync: "5 min ago",
    bookings: 963,
  },
  {
    provider: "travelport",
    pcc: "TP7KL2",
    apiKey: "tp_live_zQ71cR...",
    status: "testing",
    lastSync: "1 hr ago",
    bookings: 427,
  },
  {
    provider: "galileo",
    pcc: "GAL4DEL",
    apiKey: "gl_test_mW55jN...",
    status: "disconnected",
    lastSync: "Never",
    bookings: 0,
  },
];

const MOCK_RESULTS: FlightResult[] = [
  {
    id: "F1",
    airline: "Air India",
    code: "AI 101",
    from: "DEL",
    to: "DXB",
    dep: "06:30",
    arr: "08:45",
    duration: "3h 45m",
    stops: 0,
    cabin: "Economy",
    fareClass: "Y",
    baseFare: 12400,
    taxes: 3200,
    total: 15600,
    gds: "amadeus",
    refundable: true,
    seats: 9,
  },
  {
    id: "F2",
    airline: "IndiGo",
    code: "6E 54",
    from: "DEL",
    to: "DXB",
    dep: "09:10",
    arr: "11:30",
    duration: "3h 50m",
    stops: 0,
    cabin: "Economy",
    fareClass: "K",
    baseFare: 11200,
    taxes: 2900,
    total: 14100,
    gds: "sabre",
    refundable: false,
    seats: 4,
  },
  {
    id: "F3",
    airline: "Emirates",
    code: "EK 514",
    from: "DEL",
    to: "DXB",
    dep: "14:20",
    arr: "16:40",
    duration: "3h 50m",
    stops: 0,
    cabin: "Business",
    fareClass: "J",
    baseFare: 38500,
    taxes: 6200,
    total: 44700,
    gds: "amadeus",
    refundable: true,
    seats: 3,
  },
  {
    id: "F4",
    airline: "flydubai",
    code: "FZ 435",
    from: "DEL",
    to: "DXB",
    dep: "22:55",
    arr: "01:15",
    duration: "3h 50m",
    stops: 0,
    cabin: "Economy",
    fareClass: "Q",
    baseFare: 9800,
    taxes: 2600,
    total: 12400,
    gds: "travelport",
    refundable: false,
    seats: 12,
  },
  {
    id: "F5",
    airline: "Air Arabia",
    code: "G9 472",
    from: "DEL",
    to: "SHJ",
    dep: "18:30",
    arr: "20:55",
    duration: "4h 05m",
    stops: 0,
    cabin: "Economy",
    fareClass: "V",
    baseFare: 8900,
    taxes: 2300,
    total: 11200,
    gds: "galileo",
    refundable: false,
    seats: 6,
  },
  {
    id: "F6",
    airline: "Vistara",
    code: "UK 241",
    from: "DEL",
    to: "DXB",
    dep: "11:45",
    arr: "14:10",
    duration: "3h 55m",
    stops: 0,
    cabin: "Premium Economy",
    fareClass: "W",
    baseFare: 22000,
    taxes: 4800,
    total: 26800,
    gds: "sabre",
    refundable: true,
    seats: 2,
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: GDSConfig["status"] }) {
  const map = {
    connected: "bg-green-500/15 text-green-400 border-green-500/30",
    disconnected: "bg-red-500/15 text-red-400 border-red-500/30",
    testing: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  };
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${map[status]}`}
    >
      {status}
    </span>
  );
}

function GDSBadge({ gds }: { gds: GDSProvider }) {
  const p = GDS_PROVIDERS.find((g) => g.id === gds)!;
  return (
    <span
      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
      style={{ background: `${p.color}22`, color: p.color }}
    >
      {p.name}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function GDSModule() {
  const [view, setView] = useState<GDSView>("dashboard");

  const [searchForm, setSearchForm] = useState({
    from: "DEL",
    to: "DXB",
    date: "2026-03-20",
    pax: 1,
    cabin: "Economy" as CabinClass,
    gds: "all",
  });
  const [results, setResults] = useState<FlightResult[]>([]);
  const [selected, setSelected] = useState<FlightResult | null>(null);
  const [passenger, setPassenger] = useState({
    title: "Mr",
    first: "",
    last: "",
    dob: "",
    pan: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  function handleSearch() {
    setLoading(true);
    setTimeout(() => {
      const filtered =
        searchForm.gds === "all"
          ? MOCK_RESULTS
          : MOCK_RESULTS.filter((r) => r.gds === searchForm.gds);
      setResults(filtered);
      setLoading(false);
      setView("results");
    }, 1400);
  }

  function handleBook() {
    setView("confirm");
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  if (view === "dashboard") {
    return (
      <div className="space-y-6" data-ocid="gds.dashboard.panel">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              GDS Integrations
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your Global Distribution System connections
            </p>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#1E3A8A,#2563EB)" }}
            onClick={() => setView("search")}
            data-ocid="gds.search_flights.button"
          >
            Search via GDS →
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Active GDS",
              value: "2",
              sub: "of 4 providers",
              color: "#2563EB",
            },
            {
              label: "Total Bookings",
              value: "3,232",
              sub: "across all GDS",
              color: "#F97316",
            },
            {
              label: "Live Fares",
              value: "18K+",
              sub: "real-time pricing",
              color: "#10B981",
            },
            {
              label: "Avg Markup",
              value: "8.5%",
              sub: "commission earned",
              color: "#8B5CF6",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-xl p-4 space-y-1"
            >
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p
                className="font-display font-bold text-2xl"
                style={{ color: s.color }}
              >
                {s.value}
              </p>
              <p className="text-[10px] text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Provider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GDS_PROVIDERS.map((p) => {
            const cfg = GDS_CONFIGS.find((c) => c.provider === p.id)!;
            return (
              <div
                key={p.id}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors"
                data-ocid={`gds.provider_${p.id}.card`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                      style={{ background: p.color }}
                    >
                      {p.logo}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <StatusBadge status={cfg.status} />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => {
                      setView("search");
                    }}
                    data-ocid={`gds.provider_${p.id}.search_button`}
                  >
                    Search →
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{p.desc}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-muted/40 rounded p-2">
                    <p className="text-muted-foreground">PCC</p>
                    <p className="font-mono font-semibold text-foreground">
                      {cfg.pcc}
                    </p>
                  </div>
                  <div className="bg-muted/40 rounded p-2">
                    <p className="text-muted-foreground">Bookings</p>
                    <p className="font-semibold text-foreground">
                      {cfg.bookings.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-muted/40 rounded p-2">
                    <p className="text-muted-foreground">Last Sync</p>
                    <p className="font-semibold text-foreground">
                      {cfg.lastSync}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent GDS Bookings table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <p className="font-semibold text-foreground text-sm">
              Recent GDS Bookings
            </p>
          </div>
          <table className="w-full text-xs" data-ocid="gds.bookings.table">
            <thead className="bg-muted/30">
              <tr>
                {[
                  "PNR",
                  "Route",
                  "Airline",
                  "GDS",
                  "Fare Class",
                  "Amount",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-2.5 text-muted-foreground font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  pnr: "XKPL72",
                  route: "DEL→DXB",
                  airline: "Air India",
                  gds: "amadeus" as GDSProvider,
                  fareClass: "Y",
                  amount: "₹15,600",
                  status: "Confirmed",
                },
                {
                  pnr: "QR9M41",
                  route: "BOM→LHR",
                  airline: "British Airways",
                  gds: "sabre" as GDSProvider,
                  fareClass: "J",
                  amount: "₹84,200",
                  status: "Confirmed",
                },
                {
                  pnr: "TW3J88",
                  route: "DEL→SIN",
                  airline: "Singapore Air",
                  gds: "travelport" as GDSProvider,
                  fareClass: "K",
                  amount: "₹22,500",
                  status: "On Hold",
                },
                {
                  pnr: "LM6P55",
                  route: "CCU→BKK",
                  airline: "Thai Airways",
                  gds: "galileo" as GDSProvider,
                  fareClass: "M",
                  amount: "₹18,900",
                  status: "Cancelled",
                },
              ].map((b, i) => (
                <tr
                  key={b.pnr}
                  className="border-t border-border hover:bg-muted/20"
                  data-ocid={`gds.bookings.row.${i + 1}`}
                >
                  <td className="px-4 py-3 font-mono font-bold text-primary">
                    {b.pnr}
                  </td>
                  <td className="px-4 py-3 font-semibold">{b.route}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {b.airline}
                  </td>
                  <td className="px-4 py-3">
                    <GDSBadge gds={b.gds} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono bg-muted/50 px-1.5 py-0.5 rounded">
                      {b.fareClass}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">{b.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        b.status === "Confirmed"
                          ? "bg-green-500/15 text-green-400"
                          : b.status === "On Hold"
                            ? "bg-yellow-500/15 text-yellow-500"
                            : "bg-red-500/15 text-red-400"
                      }`}
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
    );
  }

  // ── Search ─────────────────────────────────────────────────────────────────
  if (view === "search") {
    return (
      <div className="max-w-2xl mx-auto space-y-6" data-ocid="gds.search.panel">
        <button
          type="button"
          onClick={() => setView("dashboard")}
          className="text-sm text-primary hover:underline"
          data-ocid="gds.back.button"
        >
          ← Back to GDS Dashboard
        </button>
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <h3 className="font-display font-bold text-lg text-foreground">
            GDS Flight Search
          </h3>

          {/* GDS selector */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
              Select GDS
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: "all", name: "All GDS", color: "#1E3A8A", logo: "ALL" },
                ...GDS_PROVIDERS,
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    searchForm.gds === p.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                  onClick={() => setSearchForm((f) => ({ ...f, gds: p.id }))}
                  data-ocid={`gds.filter_${p.id}.toggle`}
                >
                  <span
                    className="w-5 h-5 rounded text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                    style={{
                      background: (p as { color?: string }).color || "#1E3A8A",
                    }}
                  >
                    {p.id === "all" ? "✦" : (p as { logo: string }).logo}
                  </span>
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Route */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                From
              </p>
              <input
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-mono font-bold uppercase"
                value={searchForm.from}
                onChange={(e) =>
                  setSearchForm((f) => ({ ...f, from: e.target.value }))
                }
                placeholder="DEL"
                data-ocid="gds.from.input"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                To
              </p>
              <input
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-mono font-bold uppercase"
                value={searchForm.to}
                onChange={(e) =>
                  setSearchForm((f) => ({ ...f, to: e.target.value }))
                }
                placeholder="DXB"
                data-ocid="gds.to.input"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                Date
              </p>
              <input
                type="date"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm"
                value={searchForm.date}
                onChange={(e) =>
                  setSearchForm((f) => ({ ...f, date: e.target.value }))
                }
                data-ocid="gds.date.input"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                Passengers
              </p>
              <input
                type="number"
                min={1}
                max={9}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm"
                value={searchForm.pax}
                onChange={(e) =>
                  setSearchForm((f) => ({ ...f, pax: +e.target.value }))
                }
                data-ocid="gds.pax.input"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                Cabin
              </p>
              <select
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm"
                value={searchForm.cabin}
                onChange={(e) =>
                  setSearchForm((f) => ({
                    ...f,
                    cabin: e.target.value as CabinClass,
                  }))
                }
                data-ocid="gds.cabin.select"
              >
                {["Economy", "Premium Economy", "Business", "First"].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  ),
                )}
              </select>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-3 rounded-xl text-white font-bold text-sm"
            style={{
              background: "linear-gradient(135deg,#1E3A8A,#2563EB,#F97316)",
            }}
            onClick={handleSearch}
            data-ocid="gds.search.submit_button"
          >
            {loading ? "Searching GDS..." : "Search Flights"}
          </button>
        </div>
      </div>
    );
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (view === "results") {
    return (
      <div className="space-y-4" data-ocid="gds.results.panel">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setView("search")}
            className="text-sm text-primary hover:underline"
            data-ocid="gds.back_to_search.button"
          >
            ← Modify Search
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {results.length} fares found
            </span>
            <span className="text-sm font-bold">
              {searchForm.from} → {searchForm.to}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {results.map((r, i) => (
            <div
              key={r.id}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-all"
              data-ocid={`gds.result.item.${i + 1}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Airline */}
                <div className="flex items-center gap-3 min-w-[140px]">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {r.airline
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {r.airline}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {r.code}
                    </p>
                  </div>
                </div>

                {/* Times */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-center">
                    <p className="font-bold font-display text-lg">{r.dep}</p>
                    <p className="text-xs text-muted-foreground">{r.from}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-muted-foreground">
                      {r.duration}
                    </p>
                    <div className="h-px bg-border my-1 relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {r.stops === 0 ? "Non-stop" : `${r.stops} stop`}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold font-display text-lg">{r.arr}</p>
                    <p className="text-xs text-muted-foreground">{r.to}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <GDSBadge gds={r.gds} />
                  <span className="text-[10px] font-mono bg-muted/50 px-1.5 py-0.5 rounded border border-border">
                    {r.fareClass}
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{
                      background:
                        r.cabin === "Business" || r.cabin === "First"
                          ? "#F97316" + "22"
                          : "#2563EB22",
                      color:
                        r.cabin === "Business" || r.cabin === "First"
                          ? "#F97316"
                          : "#2563EB",
                    }}
                  >
                    {r.cabin}
                  </span>
                  {r.refundable ? (
                    <span className="text-[10px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded">
                      Refundable
                    </span>
                  ) : (
                    <span className="text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded">
                      Non-Refundable
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground">
                    {r.seats} seats
                  </span>
                </div>

                {/* Price */}
                <div className="text-right min-w-[100px]">
                  <p
                    className="font-display font-bold text-xl"
                    style={{ color: "#F97316" }}
                  >
                    ₹{r.total.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    +₹{r.taxes.toLocaleString()} taxes
                  </p>
                  <button
                    type="button"
                    className="mt-2 px-4 py-1.5 rounded-lg text-white text-xs font-semibold"
                    style={{
                      background: "linear-gradient(135deg,#1E3A8A,#2563EB)",
                    }}
                    onClick={() => {
                      setSelected(r);
                      setView("booking");
                    }}
                    data-ocid={`gds.result.book_button.${i + 1}`}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Booking Form ───────────────────────────────────────────────────────────
  if (view === "booking" && selected) {
    return (
      <div
        className="max-w-2xl mx-auto space-y-5"
        data-ocid="gds.booking.panel"
      >
        <button
          type="button"
          onClick={() => setView("results")}
          className="text-sm text-primary hover:underline"
          data-ocid="gds.back_to_results.button"
        >
          ← Back to Results
        </button>

        {/* Flight Summary */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-foreground">
                {selected.airline} · {selected.code}
              </p>
              <p className="text-sm text-muted-foreground">
                {selected.from} → {selected.to} · {selected.dep}–{selected.arr}{" "}
                · {selected.duration}
              </p>
            </div>
            <GDSBadge gds={selected.gds} />
          </div>
          <div className="flex gap-4 text-xs">
            <span className="text-muted-foreground">
              Cabin: <b>{selected.cabin}</b>
            </span>
            <span className="text-muted-foreground">
              Fare Class: <b className="font-mono">{selected.fareClass}</b>
            </span>
            <span className="text-muted-foreground">
              Stops: <b>{selected.stops === 0 ? "Non-stop" : selected.stops}</b>
            </span>
          </div>
        </div>

        {/* Passenger */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h4 className="font-semibold text-foreground">Passenger Details</h4>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1 block">
                Title
              </p>
              <select
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                value={passenger.title}
                onChange={(e) =>
                  setPassenger((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="gds.title.select"
              >
                {["Mr", "Mrs", "Ms", "Dr"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1 block">
                First Name
              </p>
              <input
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                value={passenger.first}
                onChange={(e) =>
                  setPassenger((p) => ({ ...p, first: e.target.value }))
                }
                placeholder="First"
                data-ocid="gds.first_name.input"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1 block">
                Last Name
              </p>
              <input
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                value={passenger.last}
                onChange={(e) =>
                  setPassenger((p) => ({ ...p, last: e.target.value }))
                }
                placeholder="Last"
                data-ocid="gds.last_name.input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1 block">
                Date of Birth
              </p>
              <input
                type="date"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                value={passenger.dob}
                onChange={(e) =>
                  setPassenger((p) => ({ ...p, dob: e.target.value }))
                }
                data-ocid="gds.dob.input"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1 block">
                PAN Number
              </p>
              <input
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono uppercase"
                value={passenger.pan}
                onChange={(e) =>
                  setPassenger((p) => ({ ...p, pan: e.target.value }))
                }
                placeholder="ABCDE1234F"
                data-ocid="gds.pan.input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1 block">
                Email
              </p>
              <input
                type="email"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                value={passenger.email}
                onChange={(e) =>
                  setPassenger((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="email@example.com"
                data-ocid="gds.email.input"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1 block">
                Mobile
              </p>
              <input
                type="tel"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                value={passenger.phone}
                onChange={(e) =>
                  setPassenger((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="+91 XXXXX XXXXX"
                data-ocid="gds.phone.input"
              />
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <h4 className="font-semibold text-foreground mb-3">Price Summary</h4>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Base Fare</span>
            <span>₹{selected.baseFare.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Taxes & Fees</span>
            <span>₹{selected.taxes.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">GDS Service Fee</span>
            <span>₹350</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span style={{ color: "#F97316" }}>
              ₹{(selected.total + 350).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="w-full py-3 rounded-xl text-white font-bold"
          style={{
            background: "linear-gradient(135deg,#1E3A8A,#2563EB,#F97316)",
          }}
          onClick={handleBook}
          data-ocid="gds.confirm_booking.submit_button"
        >
          Confirm & Pay from Wallet
        </button>
      </div>
    );
  }

  // ── Confirmation ───────────────────────────────────────────────────────────
  if (view === "confirm" && selected) {
    const pnr = `GDS${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return (
      <div
        className="max-w-lg mx-auto text-center space-y-6 py-8"
        data-ocid="gds.confirmation.panel"
      >
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl"
          style={{ background: "linear-gradient(135deg,#1E3A8A,#2563EB)" }}
        >
          ✈
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-1">
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground text-sm">
            Your GDS booking has been confirmed via{" "}
            {GDS_PROVIDERS.find((p) => p.id === selected.gds)?.name}
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">PNR</span>
            <span className="font-mono font-bold text-primary text-lg">
              {pnr}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Flight</span>
            <span className="font-semibold">
              {selected.code} · {selected.from}→{selected.to}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Departure</span>
            <span>
              {selected.dep} on {searchForm.date}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cabin</span>
            <span>
              {selected.cabin} · Class {selected.fareClass}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">GDS</span>
            <span>
              <GDSBadge gds={selected.gds} />
            </span>
          </div>
          <div className="flex justify-between font-bold border-t border-border pt-3">
            <span>Amount Paid</span>
            <span style={{ color: "#F97316" }}>
              ₹{(selected.total + 350).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl border border-border text-sm font-semibold"
            onClick={() => setView("dashboard")}
            data-ocid="gds.back_to_gds.button"
          >
            Back to GDS
          </button>
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg,#1E3A8A,#2563EB)" }}
            data-ocid="gds.download_ticket.button"
          >
            Download Ticket
          </button>
        </div>
      </div>
    );
  }

  return null;
}
