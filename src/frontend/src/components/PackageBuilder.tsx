import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type MainTab = "build" | "saved";
type Step = 1 | 2 | 3 | 4 | 5;
type PackageType = "FIT" | "GIT" | "Honeymoon" | "Family" | "Corporate";
type MarkupType = "flat" | "percent";

interface PackageSetup {
  name: string;
  destination: string;
  departureCity: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  type: PackageType;
}

interface FlightComp {
  from: string;
  to: string;
  cabin: string;
  airline: string;
  pricePerPax: number;
}
interface HotelComp {
  name: string;
  stars: number;
  roomType: string;
  nights: number;
  pricePerNight: number;
}
interface TourComp {
  id: string;
  name: string;
  city: string;
  duration: number;
  pricePerPax: number;
}
interface TransferComp {
  type: string;
  vehicle: string;
  price: number;
}
interface VisaComp {
  country: string;
  visaType: string;
  fee: number;
}

interface Components {
  flight: { enabled: boolean; data: FlightComp };
  hotel: { enabled: boolean; data: HotelComp };
  tours: { enabled: boolean; items: TourComp[] };
  transfer: { enabled: boolean; data: TransferComp };
  visa: { enabled: boolean; data: VisaComp };
}

const DESTINATIONS = [
  "Dubai",
  "Bangkok",
  "Singapore",
  "Bali",
  "Maldives",
  "Europe",
  "USA",
  "Thailand",
  "Sri Lanka",
  "Malaysia",
];
const PACKAGE_TYPES: PackageType[] = [
  "FIT",
  "GIT",
  "Honeymoon",
  "Family",
  "Corporate",
];
const DEST_FLAGS: Record<string, string> = {
  Dubai: "🇦🇪",
  Bangkok: "🇹🇭",
  Singapore: "🇸🇬",
  Bali: "🇮🇩",
  Maldives: "🇲🇻",
  Europe: "🇪🇺",
  USA: "🇺🇸",
  Thailand: "🇹🇭",
  "Sri Lanka": "🇱🇰",
  Malaysia: "🇲🇾",
};

const SAVED_PACKAGES = [
  {
    id: 1,
    name: "Dubai 6N7D Family",
    dest: "Dubai",
    nights: 6,
    pax: 4,
    price: 124500,
    perPax: 31125,
    created: "5 Mar 2026",
    status: "Active",
    comps: ["Flight", "Hotel", "Tours", "Transfer", "Visa"],
  },
  {
    id: 2,
    name: "Bangkok Honeymoon 5N",
    dest: "Bangkok",
    nights: 5,
    pax: 2,
    price: 89200,
    perPax: 44600,
    created: "1 Mar 2026",
    status: "Draft",
    comps: ["Flight", "Hotel", "Tours", "Transfer"],
  },
  {
    id: 3,
    name: "Singapore Explorer 4N",
    dest: "Singapore",
    nights: 4,
    pax: 2,
    price: 76800,
    perPax: 38400,
    created: "28 Feb 2026",
    status: "Sent",
    comps: ["Flight", "Hotel", "Tours", "Visa"],
  },
];

const STATUS_STYLE: Record<string, string> = {
  Active: "bg-green-500/15 text-green-400 border-green-500/30",
  Draft: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Sent: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

function fmt(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function StepDot({
  n,
  active,
  done,
}: { n: number; active: boolean; done: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
          done
            ? "border-orange-500 bg-orange-500 text-white"
            : active
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-border bg-card text-muted-foreground"
        }`}
      >
        {done ? "✓" : n}
      </div>
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  id,
}: { checked: boolean; onChange: (v: boolean) => void; id?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-ocid={id}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
        checked ? "bg-orange-500" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function Counter({
  value,
  onChange,
  min = 0,
  max = 20,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 rounded-full border border-border text-muted-foreground hover:bg-muted/50 font-bold text-sm"
      >
        −
      </button>
      <span className="w-6 text-center font-bold text-sm">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-7 h-7 rounded-full border border-border text-muted-foreground hover:bg-muted/50 font-bold text-sm"
      >
        +
      </button>
    </div>
  );
}

function LabeledInput({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-blue-500";
const selectCls =
  "w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-blue-500";

// ── Main Component ────────────────────────────────────────────────────────────
export function PackageBuilder() {
  const [tab, setTab] = useState<MainTab>("build");
  const [step, setStep] = useState<Step>(1);

  const [setup, setSetup] = useState<PackageSetup>({
    name: "",
    destination: "Dubai",
    departureCity: "Delhi",
    startDate: "2026-04-01",
    endDate: "2026-04-08",
    adults: 2,
    children: 0,
    type: "FIT",
  });

  const [comps, setComps] = useState<Components>({
    flight: {
      enabled: true,
      data: {
        from: "DEL",
        to: "DXB",
        cabin: "Economy",
        airline: "Air India",
        pricePerPax: 18500,
      },
    },
    hotel: {
      enabled: true,
      data: {
        name: "Atlantis The Palm",
        stars: 5,
        roomType: "Deluxe Ocean View",
        nights: 6,
        pricePerNight: 4200,
      },
    },
    tours: {
      enabled: true,
      items: [
        {
          id: "t1",
          name: "Desert Safari",
          city: "Dubai",
          duration: 6,
          pricePerPax: 1800,
        },
        {
          id: "t2",
          name: "Burj Khalifa",
          city: "Dubai",
          duration: 3,
          pricePerPax: 900,
        },
      ],
    },
    transfer: {
      enabled: true,
      data: { type: "Airport↔Hotel", vehicle: "SUV", price: 1800 },
    },
    visa: {
      enabled: true,
      data: { country: "UAE", visaType: "eVisa", fee: 2100 },
    },
  });

  const [markup, setMarkup] = useState({
    type: "percent" as MarkupType,
    value: 15,
  });
  const [customer, setCustomer] = useState({ name: "", mobile: "", email: "" });
  const [tnc, setTnc] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [refNo] = useState(
    `FST-PKG-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`,
  );

  const totalPax = setup.adults + setup.children;
  const nights =
    setup.startDate && setup.endDate
      ? Math.max(
          1,
          Math.round(
            (new Date(setup.endDate).getTime() -
              new Date(setup.startDate).getTime()) /
              86400000,
          ),
        )
      : 0;

  // Price calculations
  const flightTotal = comps.flight.enabled
    ? comps.flight.data.pricePerPax * totalPax
    : 0;
  const hotelTotal = comps.hotel.enabled
    ? comps.hotel.data.pricePerNight * comps.hotel.data.nights * totalPax
    : 0;
  const toursTotal = comps.tours.enabled
    ? comps.tours.items.reduce((a, t) => a + t.pricePerPax * totalPax, 0)
    : 0;
  const transferTotal = comps.transfer.enabled
    ? comps.transfer.data.price * 2
    : 0;
  const visaTotal = comps.visa.enabled ? comps.visa.data.fee * totalPax : 0;
  const netCost =
    flightTotal + hotelTotal + toursTotal + transferTotal + visaTotal;
  const markupAmt =
    markup.type === "percent"
      ? Math.round((netCost * markup.value) / 100)
      : markup.value;
  const gst = Math.round((netCost + markupAmt) * 0.05);
  const sellPrice = netCost + markupAmt + gst;
  const perPax = totalPax > 0 ? Math.round(sellPrice / totalPax) : 0;
  const walletBalance = 145250;

  function setComp<K extends keyof Components>(
    key: K,
    val: Partial<Components[K]>,
  ) {
    setComps((prev) => ({ ...prev, [key]: { ...prev[key], ...val } }));
  }

  // ── Confirmation Screen ────────────────────────────────────────────────────
  if (confirmed) {
    return (
      <div
        className="max-w-lg mx-auto text-center space-y-6 py-8"
        data-ocid="package_builder.confirmation.panel"
      >
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl"
          style={{ background: "linear-gradient(135deg,#1E3A8A,#F97316)" }}
        >
          📦
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-1">
            Package Booked!
          </h2>
          <p className="text-muted-foreground text-sm">
            Your package has been confirmed successfully
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Reference</span>
            <span className="font-mono font-bold text-orange-500">{refNo}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Package</span>
            <span className="font-semibold">{setup.name || "My Package"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Destination</span>
            <span>
              {DEST_FLAGS[setup.destination]} {setup.destination}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Travel Dates</span>
            <span>
              {setup.startDate} → {setup.endDate}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pax</span>
            <span>
              {setup.adults} Adults
              {setup.children > 0 ? `, ${setup.children} Children` : ""}
            </span>
          </div>
          <div className="flex justify-between font-bold border-t border-border pt-3">
            <span>Amount Paid</span>
            <span className="text-orange-500">{fmt(sellPrice)}</span>
          </div>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold"
            data-ocid="package_builder.download.button"
          >
            ⬇ Download PDF
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold"
            data-ocid="package_builder.send.button"
          >
            ✉ Send to Client
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg,#1E3A8A,#F97316)" }}
            onClick={() => {
              setConfirmed(false);
              setStep(1);
              setSetup({
                name: "",
                destination: "Dubai",
                departureCity: "Delhi",
                startDate: "2026-04-01",
                endDate: "2026-04-08",
                adults: 2,
                children: 0,
                type: "FIT",
              });
            }}
            data-ocid="package_builder.new_package.button"
          >
            + New Package
          </button>
        </div>
      </div>
    );
  }

  // ── Saved Packages Tab ─────────────────────────────────────────────────────
  const SavedPackagesView = () => (
    <div className="space-y-4" data-ocid="package_builder.saved.panel">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {SAVED_PACKAGES.length} packages saved
        </p>
        <button
          type="button"
          onClick={() => setTab("build")}
          className="px-4 py-2 rounded-lg text-white text-sm font-semibold"
          style={{ background: "linear-gradient(135deg,#1E3A8A,#2563EB)" }}
          data-ocid="package_builder.create_new.button"
        >
          + Create New Package
        </button>
      </div>
      {SAVED_PACKAGES.map((pkg, i) => (
        <div
          key={pkg.id}
          className="bg-card border border-border rounded-xl p-5 hover:border-orange-500/40 transition-all"
          data-ocid={`package_builder.saved.item.${i + 1}`}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{DEST_FLAGS[pkg.dest]}</span>
                <h3 className="font-bold text-foreground">{pkg.name}</h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${STATUS_STYLE[pkg.status]}`}
                >
                  {pkg.status === "Sent" ? "Sent to Client" : pkg.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {pkg.nights}N · {pkg.pax} Pax · Created {pkg.created}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {pkg.comps.map((c) => (
                  <Badge
                    key={c}
                    variant="secondary"
                    className="text-[11px] px-2 py-0.5"
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="md:text-right">
              <p className="font-display font-bold text-xl text-orange-500">
                {fmt(pkg.price)}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                {fmt(pkg.perPax)}/pax
              </p>
              <div className="flex gap-2 md:justify-end flex-wrap">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-muted/50"
                  data-ocid={`package_builder.saved.view.${i + 1}`}
                >
                  View
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-muted/50"
                  data-ocid={`package_builder.saved.duplicate.${i + 1}`}
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold"
                  style={{
                    background: "linear-gradient(135deg,#1E3A8A,#2563EB)",
                  }}
                  data-ocid={`package_builder.saved.send.${i + 1}`}
                >
                  Send to Client
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/10"
                  data-ocid={`package_builder.saved.delete.${i + 1}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top tabs */}
      <div className="flex gap-1 bg-muted/30 rounded-xl p-1 w-fit">
        {(["build", "saved"] as MainTab[]).map((t) => (
          <button
            key={t}
            type="button"
            data-ocid={
              t === "build"
                ? "package_builder.setup.tab"
                : "package_builder.saved.tab"
            }
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === t
                ? "bg-card shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "build" ? "🏗 Build Package" : "📂 Saved Packages"}
          </button>
        ))}
      </div>

      {tab === "saved" && <SavedPackagesView />}

      {tab === "build" && (
        <div className="space-y-6">
          {/* Step progress */}
          <div className="flex items-center gap-0">
            {[1, 2, 3, 4].map((n, i) => (
              <div key={n} className="flex items-center">
                <StepDot n={n} active={step === n} done={step > n} />
                {i < 3 && (
                  <div
                    className={`w-16 md:w-24 h-0.5 mx-1 ${step > n ? "bg-orange-500" : "bg-border"}`}
                  />
                )}
              </div>
            ))}
            <div className="ml-3 text-xs text-muted-foreground hidden sm:block">
              {
                ["Package Setup", "Components", "Pricing", "Review & Book"][
                  step - 1
                ]
              }
            </div>
          </div>

          {/* ── Step 1: Package Setup ────────────────────────────────────── */}
          {step === 1 && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <h3 className="font-display font-bold text-lg text-foreground">
                Step 1 — Package Setup
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <LabeledInput label="Package Name">
                    <input
                      className={inputCls}
                      placeholder="e.g. Dubai Family Adventure 7N"
                      value={setup.name}
                      onChange={(e) =>
                        setSetup((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="package_builder.setup.input"
                    />
                  </LabeledInput>
                </div>
                <LabeledInput label="Destination">
                  <select
                    className={selectCls}
                    value={setup.destination}
                    onChange={(e) =>
                      setSetup((p) => ({ ...p, destination: e.target.value }))
                    }
                    data-ocid="package_builder.destination.select"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </LabeledInput>
                <LabeledInput label="Departure City">
                  <input
                    className={inputCls}
                    placeholder="Delhi"
                    value={setup.departureCity}
                    onChange={(e) =>
                      setSetup((p) => ({ ...p, departureCity: e.target.value }))
                    }
                    data-ocid="package_builder.departure.input"
                  />
                </LabeledInput>
                <LabeledInput label="Travel Start Date">
                  <input
                    type="date"
                    className={inputCls}
                    value={setup.startDate}
                    onChange={(e) =>
                      setSetup((p) => ({ ...p, startDate: e.target.value }))
                    }
                    data-ocid="package_builder.start_date.input"
                  />
                </LabeledInput>
                <LabeledInput
                  label={`Travel End Date${nights > 0 ? ` (${nights} nights)` : ""}`}
                >
                  <input
                    type="date"
                    className={inputCls}
                    value={setup.endDate}
                    onChange={(e) =>
                      setSetup((p) => ({ ...p, endDate: e.target.value }))
                    }
                    data-ocid="package_builder.end_date.input"
                  />
                </LabeledInput>
                <LabeledInput label="Number of Adults">
                  <Counter
                    value={setup.adults}
                    onChange={(v) => setSetup((p) => ({ ...p, adults: v }))}
                    min={1}
                  />
                </LabeledInput>
                <LabeledInput label="Number of Children">
                  <Counter
                    value={setup.children}
                    onChange={(v) => setSetup((p) => ({ ...p, children: v }))}
                  />
                </LabeledInput>
                <div className="md:col-span-2">
                  <LabeledInput label="Package Type">
                    <div className="flex flex-wrap gap-2">
                      {PACKAGE_TYPES.map((pt) => (
                        <button
                          key={pt}
                          type="button"
                          onClick={() => setSetup((p) => ({ ...p, type: pt }))}
                          className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                            setup.type === pt
                              ? "border-orange-500 bg-orange-500/10 text-orange-500"
                              : "border-border text-muted-foreground hover:border-orange-400"
                          }`}
                          data-ocid={`package_builder.type_${pt.toLowerCase()}.toggle`}
                        >
                          {pt}
                        </button>
                      ))}
                    </div>
                  </LabeledInput>
                </div>
              </div>
              <button
                type="button"
                className="w-full py-3 rounded-xl text-white font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg,#1E3A8A,#2563EB,#F97316)",
                }}
                onClick={() => setStep(2)}
                data-ocid="package_builder.next.button"
              >
                Next: Add Components →
              </button>
            </div>
          )}

          {/* ── Step 2: Add Components ───────────────────────────────────── */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-primary hover:underline"
                >
                  ← Back
                </button>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Package Total</p>
                  <p className="font-display font-bold text-xl text-orange-500">
                    {fmt(netCost)}
                  </p>
                </div>
              </div>

              {/* Flight */}
              <CompCard
                icon="✈"
                title="Flight"
                badge={comps.flight.enabled ? fmt(flightTotal) : null}
                enabled={comps.flight.enabled}
                onToggle={(v) => setComp("flight", { enabled: v })}
                toggleId="package_builder.flight.toggle"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <LabeledInput label="From">
                    <input
                      className={inputCls}
                      value={comps.flight.data.from}
                      onChange={(e) =>
                        setComp("flight", {
                          data: { ...comps.flight.data, from: e.target.value },
                        })
                      }
                    />
                  </LabeledInput>
                  <LabeledInput label="To">
                    <input
                      className={inputCls}
                      value={comps.flight.data.to}
                      onChange={(e) =>
                        setComp("flight", {
                          data: { ...comps.flight.data, to: e.target.value },
                        })
                      }
                    />
                  </LabeledInput>
                  <LabeledInput label="Cabin">
                    <select
                      className={selectCls}
                      value={comps.flight.data.cabin}
                      onChange={(e) =>
                        setComp("flight", {
                          data: { ...comps.flight.data, cabin: e.target.value },
                        })
                      }
                    >
                      {["Economy", "Business", "First"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </LabeledInput>
                  <LabeledInput label="Airline">
                    <input
                      className={inputCls}
                      value={comps.flight.data.airline}
                      onChange={(e) =>
                        setComp("flight", {
                          data: {
                            ...comps.flight.data,
                            airline: e.target.value,
                          },
                        })
                      }
                    />
                  </LabeledInput>
                  <LabeledInput label="Price/Pax (₹)">
                    <input
                      type="number"
                      className={inputCls}
                      value={comps.flight.data.pricePerPax}
                      onChange={(e) =>
                        setComp("flight", {
                          data: {
                            ...comps.flight.data,
                            pricePerPax: +e.target.value,
                          },
                        })
                      }
                    />
                  </LabeledInput>
                </div>
              </CompCard>

              {/* Hotel */}
              <CompCard
                icon="🏨"
                title="Hotel"
                badge={comps.hotel.enabled ? fmt(hotelTotal) : null}
                enabled={comps.hotel.enabled}
                onToggle={(v) => setComp("hotel", { enabled: v })}
                toggleId="package_builder.hotel.toggle"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <LabeledInput label="Hotel Name">
                    <input
                      className={inputCls}
                      value={comps.hotel.data.name}
                      onChange={(e) =>
                        setComp("hotel", {
                          data: { ...comps.hotel.data, name: e.target.value },
                        })
                      }
                    />
                  </LabeledInput>
                  <LabeledInput label="Star Rating">
                    <select
                      className={selectCls}
                      value={comps.hotel.data.stars}
                      onChange={(e) =>
                        setComp("hotel", {
                          data: { ...comps.hotel.data, stars: +e.target.value },
                        })
                      }
                    >
                      {[3, 4, 5].map((s) => (
                        <option key={s}>{s}★</option>
                      ))}
                    </select>
                  </LabeledInput>
                  <LabeledInput label="Room Type">
                    <input
                      className={inputCls}
                      value={comps.hotel.data.roomType}
                      onChange={(e) =>
                        setComp("hotel", {
                          data: {
                            ...comps.hotel.data,
                            roomType: e.target.value,
                          },
                        })
                      }
                    />
                  </LabeledInput>
                  <LabeledInput label="Nights">
                    <input
                      type="number"
                      className={inputCls}
                      value={comps.hotel.data.nights}
                      onChange={(e) =>
                        setComp("hotel", {
                          data: {
                            ...comps.hotel.data,
                            nights: +e.target.value,
                          },
                        })
                      }
                    />
                  </LabeledInput>
                  <LabeledInput label="Price/Night (₹)">
                    <input
                      type="number"
                      className={inputCls}
                      value={comps.hotel.data.pricePerNight}
                      onChange={(e) =>
                        setComp("hotel", {
                          data: {
                            ...comps.hotel.data,
                            pricePerNight: +e.target.value,
                          },
                        })
                      }
                    />
                  </LabeledInput>
                  <LabeledInput label="Calc Total">
                    <div className="px-3 py-2.5 rounded-lg border border-orange-500/30 bg-orange-500/5 text-sm font-bold text-orange-500">
                      {fmt(hotelTotal)}
                    </div>
                  </LabeledInput>
                </div>
              </CompCard>

              {/* Tours */}
              <CompCard
                icon="🎭"
                title="Tours & Activities"
                badge={comps.tours.enabled ? fmt(toursTotal) : null}
                enabled={comps.tours.enabled}
                onToggle={(v) => setComp("tours", { enabled: v })}
                toggleId="package_builder.tours.toggle"
              >
                <div className="space-y-3">
                  {comps.tours.items.map((t, i) => (
                    <div
                      key={t.id}
                      className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                    >
                      <LabeledInput label={`Activity ${i + 1}`}>
                        <input
                          className={inputCls}
                          value={t.name}
                          onChange={(e) => {
                            const items = [...comps.tours.items];
                            items[i] = { ...t, name: e.target.value };
                            setComp("tours", { items });
                          }}
                        />
                      </LabeledInput>
                      <LabeledInput label="City">
                        <input
                          className={inputCls}
                          value={t.city}
                          onChange={(e) => {
                            const items = [...comps.tours.items];
                            items[i] = { ...t, city: e.target.value };
                            setComp("tours", { items });
                          }}
                        />
                      </LabeledInput>
                      <LabeledInput label="Duration (hrs)">
                        <input
                          type="number"
                          className={inputCls}
                          value={t.duration}
                          onChange={(e) => {
                            const items = [...comps.tours.items];
                            items[i] = { ...t, duration: +e.target.value };
                            setComp("tours", { items });
                          }}
                        />
                      </LabeledInput>
                      <LabeledInput label="Price/Pax (₹)">
                        <input
                          type="number"
                          className={inputCls}
                          value={t.pricePerPax}
                          onChange={(e) => {
                            const items = [...comps.tours.items];
                            items[i] = { ...t, pricePerPax: +e.target.value };
                            setComp("tours", { items });
                          }}
                        />
                      </LabeledInput>
                    </div>
                  ))}
                  {comps.tours.items.length < 5 && (
                    <button
                      type="button"
                      onClick={() =>
                        setComp("tours", {
                          items: [
                            ...comps.tours.items,
                            {
                              id: `t${Date.now()}`,
                              name: "",
                              city: "",
                              duration: 3,
                              pricePerPax: 0,
                            },
                          ],
                        })
                      }
                      className="text-sm text-primary hover:underline"
                    >
                      + Add Activity
                    </button>
                  )}
                </div>
              </CompCard>

              {/* Transfer */}
              <CompCard
                icon="🚗"
                title="Transfer"
                badge={comps.transfer.enabled ? fmt(transferTotal) : null}
                enabled={comps.transfer.enabled}
                onToggle={(v) => setComp("transfer", { enabled: v })}
                toggleId="package_builder.transfer.toggle"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <LabeledInput label="Transfer Type">
                    <select
                      className={selectCls}
                      value={comps.transfer.data.type}
                      onChange={(e) =>
                        setComp("transfer", {
                          data: {
                            ...comps.transfer.data,
                            type: e.target.value,
                          },
                        })
                      }
                    >
                      {[
                        "Airport↔Hotel",
                        "Airport→Hotel",
                        "Hotel→Airport",
                        "City Transfer",
                      ].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </LabeledInput>
                  <LabeledInput label="Vehicle">
                    <select
                      className={selectCls}
                      value={comps.transfer.data.vehicle}
                      onChange={(e) =>
                        setComp("transfer", {
                          data: {
                            ...comps.transfer.data,
                            vehicle: e.target.value,
                          },
                        })
                      }
                    >
                      {["Sedan", "SUV", "Mini Bus", "Luxury"].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </LabeledInput>
                  <LabeledInput label="Price (₹)">
                    <input
                      type="number"
                      className={inputCls}
                      value={comps.transfer.data.price}
                      onChange={(e) =>
                        setComp("transfer", {
                          data: {
                            ...comps.transfer.data,
                            price: +e.target.value,
                          },
                        })
                      }
                    />
                  </LabeledInput>
                </div>
              </CompCard>

              {/* Visa */}
              <CompCard
                icon="🛂"
                title="Visa"
                badge={comps.visa.enabled ? fmt(visaTotal) : null}
                enabled={comps.visa.enabled}
                onToggle={(v) => setComp("visa", { enabled: v })}
                toggleId="package_builder.visa.toggle"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <LabeledInput label="Country">
                    <input
                      className={inputCls}
                      value={comps.visa.data.country}
                      onChange={(e) =>
                        setComp("visa", {
                          data: { ...comps.visa.data, country: e.target.value },
                        })
                      }
                    />
                  </LabeledInput>
                  <LabeledInput label="Visa Type">
                    <select
                      className={selectCls}
                      value={comps.visa.data.visaType}
                      onChange={(e) =>
                        setComp("visa", {
                          data: {
                            ...comps.visa.data,
                            visaType: e.target.value,
                          },
                        })
                      }
                    >
                      {["eVisa", "Sticker Visa", "Visa on Arrival"].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </LabeledInput>
                  <LabeledInput label="Fee/Pax (₹)">
                    <input
                      type="number"
                      className={inputCls}
                      value={comps.visa.data.fee}
                      onChange={(e) =>
                        setComp("visa", {
                          data: { ...comps.visa.data, fee: +e.target.value },
                        })
                      }
                    />
                  </LabeledInput>
                </div>
              </CompCard>

              <button
                type="button"
                className="w-full py-3 rounded-xl text-white font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg,#1E3A8A,#2563EB,#F97316)",
                }}
                onClick={() => setStep(3)}
                data-ocid="package_builder.to_pricing.button"
              >
                Next: Summary & Pricing →
              </button>
            </div>
          )}

          {/* ── Step 3: Summary & Pricing ───────────────────────────────── */}
          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Itinerary */}
              <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display font-bold text-foreground">
                    Itinerary
                  </h4>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-sm text-primary hover:underline"
                  >
                    ← Edit
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      day: "Day 1",
                      icon: "✈",
                      desc: `Departure from ${setup.departureCity} → ${setup.destination}. Airport transfer + Hotel Check-in.`,
                      color: "#2563EB",
                    },
                    ...(comps.tours.enabled
                      ? comps.tours.items.map((t, i) => ({
                          day: `Day ${i + 2}`,
                          icon: "🎭",
                          desc: `${t.name} — ${t.city} (${t.duration}hrs)`,
                          color: "#F97316",
                        }))
                      : []),
                    {
                      day: `Day ${nights}`,
                      icon: "🚗",
                      desc: "Hotel Check-out. Transfer to airport.",
                      color: "#10B981",
                    },
                    {
                      day: `Day ${nights + 1}`,
                      icon: "✈",
                      desc: `Return flight to ${setup.departureCity}.`,
                      color: "#8B5CF6",
                    },
                  ].map((item, i) => (
                    <div key={item.day} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                          style={{
                            background: `${item.color}22`,
                            color: item.color,
                          }}
                        >
                          {item.icon}
                        </div>
                        {i < 4 && (
                          <div
                            className="w-px flex-1 bg-border mt-1"
                            style={{ minHeight: "16px" }}
                          />
                        )}
                      </div>
                      <div className="pb-3">
                        <p className="text-xs font-bold text-orange-500">
                          {item.day}
                        </p>
                        <p className="text-sm text-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Pricing */}
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h4 className="font-display font-bold text-foreground mb-4">
                    Price Breakdown
                  </h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-muted-foreground border-b border-border">
                        <th className="text-left pb-2">Component</th>
                        <th className="text-right pb-2">Pax</th>
                        <th className="text-right pb-2">Unit</th>
                        <th className="text-right pb-2">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {comps.flight.enabled && (
                        <PriceRow
                          label={`Flight (${comps.flight.data.cabin})`}
                          pax={totalPax}
                          unit={fmt(comps.flight.data.pricePerPax)}
                          total={fmt(flightTotal)}
                        />
                      )}
                      {comps.hotel.enabled && (
                        <PriceRow
                          label={`Hotel ${comps.hotel.data.stars}★ ${comps.hotel.data.nights}N`}
                          pax={totalPax}
                          unit={`${fmt(comps.hotel.data.pricePerNight)}/N`}
                          total={fmt(hotelTotal)}
                        />
                      )}
                      {comps.tours.enabled && (
                        <PriceRow
                          label={`Tours (${comps.tours.items.length} acts)`}
                          pax={totalPax}
                          unit={fmt(
                            comps.tours.items.reduce(
                              (a, t) => a + t.pricePerPax,
                              0,
                            ),
                          )}
                          total={fmt(toursTotal)}
                        />
                      )}
                      {comps.transfer.enabled && (
                        <PriceRow
                          label="Transfer (2-way)"
                          pax={1}
                          unit={fmt(comps.transfer.data.price)}
                          total={fmt(transferTotal)}
                        />
                      )}
                      {comps.visa.enabled && (
                        <PriceRow
                          label={`Visa (${comps.visa.data.visaType})`}
                          pax={totalPax}
                          unit={fmt(comps.visa.data.fee)}
                          total={fmt(visaTotal)}
                        />
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-orange-500/30">
                        <td
                          colSpan={3}
                          className="pt-2 font-bold text-foreground"
                        >
                          Net Cost
                        </td>
                        <td className="pt-2 text-right font-bold text-orange-500">
                          {fmt(netCost)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                  <h4 className="font-display font-bold text-foreground">
                    Markup & Selling Price
                  </h4>
                  <div className="flex gap-2">
                    {(["flat", "percent"] as MarkupType[]).map((mt) => (
                      <button
                        key={mt}
                        type="button"
                        onClick={() => setMarkup((p) => ({ ...p, type: mt }))}
                        className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                          markup.type === mt
                            ? "border-orange-500 bg-orange-500/10 text-orange-500"
                            : "border-border text-muted-foreground"
                        }`}
                        data-ocid="package_builder.markup_type.toggle"
                      >
                        {mt === "flat" ? "Flat (₹)" : "Percent (%)"}
                      </button>
                    ))}
                  </div>
                  <LabeledInput
                    label={
                      markup.type === "flat"
                        ? "Markup Amount (₹)"
                        : "Markup (%)"
                    }
                  >
                    <input
                      type="number"
                      className={inputCls}
                      value={markup.value}
                      onChange={(e) =>
                        setMarkup((p) => ({ ...p, value: +e.target.value }))
                      }
                      data-ocid="package_builder.markup.input"
                    />
                  </LabeledInput>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Cost</span>
                      <span>{fmt(netCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Markup</span>
                      <span className="text-green-400">+{fmt(markupAmt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (5%)</span>
                      <span>+{fmt(gst)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-border pt-2">
                      <span>Selling Price</span>
                      <span className="text-orange-500">{fmt(sellPrice)}</span>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground">
                        Selling Price per Pax
                      </p>
                      <p className="font-display font-bold text-xl text-orange-500">
                        {fmt(perPax)}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-3 rounded-xl text-white font-bold text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg,#1E3A8A,#2563EB,#F97316)",
                  }}
                  onClick={() => setStep(4)}
                  data-ocid="package_builder.to_review.button"
                >
                  Next: Review & Book →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 4: Review & Book ──────────────────────────────────── */}
          {step === 4 && (
            <div className="max-w-2xl mx-auto space-y-5">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-sm text-primary hover:underline"
              >
                ← Back to Pricing
              </button>

              {/* Package summary */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">
                    {DEST_FLAGS[setup.destination]}
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">
                      {setup.name || "My Package"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {setup.destination} · {nights} Nights · {totalPax} Pax ·{" "}
                      {setup.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {setup.startDate} → {setup.endDate}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-display font-bold text-xl text-orange-500">
                      {fmt(sellPrice)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Valid 14 days
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {comps.flight.enabled && (
                    <Badge variant="secondary" className="text-xs">
                      ✈ Flight
                    </Badge>
                  )}
                  {comps.hotel.enabled && (
                    <Badge variant="secondary" className="text-xs">
                      🏨 Hotel
                    </Badge>
                  )}
                  {comps.tours.enabled && (
                    <Badge variant="secondary" className="text-xs">
                      🎭 Tours
                    </Badge>
                  )}
                  {comps.transfer.enabled && (
                    <Badge variant="secondary" className="text-xs">
                      🚗 Transfer
                    </Badge>
                  )}
                  {comps.visa.enabled && (
                    <Badge variant="secondary" className="text-xs">
                      🛂 Visa
                    </Badge>
                  )}
                </div>
              </div>

              {/* Customer details */}
              <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                <h4 className="font-semibold text-foreground">
                  Customer Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <LabeledInput label="Full Name">
                    <input
                      className={inputCls}
                      value={customer.name}
                      onChange={(e) =>
                        setCustomer((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Customer Name"
                      data-ocid="package_builder.customer_name.input"
                    />
                  </LabeledInput>
                  <LabeledInput label="Mobile">
                    <input
                      className={inputCls}
                      value={customer.mobile}
                      onChange={(e) =>
                        setCustomer((p) => ({ ...p, mobile: e.target.value }))
                      }
                      placeholder="+91 XXXXX XXXXX"
                      data-ocid="package_builder.customer_mobile.input"
                    />
                  </LabeledInput>
                  <LabeledInput label="Email">
                    <input
                      className={inputCls}
                      value={customer.email}
                      onChange={(e) =>
                        setCustomer((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="email@example.com"
                      data-ocid="package_builder.customer_email.input"
                    />
                  </LabeledInput>
                </div>
              </div>

              {/* T&C */}
              <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
                <h4 className="font-semibold text-foreground">
                  Terms & Conditions
                </h4>
                <div className="h-36 overflow-y-auto bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground space-y-2">
                  <p>
                    <strong>1. Booking Policy:</strong> All packages are subject
                    to availability at time of booking. Prices are dynamic and
                    may change before confirmation.
                  </p>
                  <p>
                    <strong>2. Payment:</strong> Full payment is required at
                    time of booking. Payments are deducted from the agent
                    wallet.
                  </p>
                  <p>
                    <strong>3. Cancellation:</strong> Cancellation charges apply
                    based on individual component policies. Hotel: 48hrs prior —
                    no charge. Flight: As per airline policy. Visa fees are
                    non-refundable once processed.
                  </p>
                  <p>
                    <strong>4. Amendments:</strong> Date changes are subject to
                    availability and may attract additional charges.
                  </p>
                  <p>
                    <strong>5. Travel Documents:</strong> Agents are responsible
                    for ensuring travellers hold valid passports and appropriate
                    visas.
                  </p>
                  <p>
                    <strong>6. Liability:</strong> FiveStarTravel.in acts as an
                    intermediary and is not liable for supplier service quality
                    or force majeure events.
                  </p>
                  <p>
                    <strong>7. Pricing:</strong> All prices are in INR and
                    inclusive of GST where applicable. B2B rates are for agent
                    use only and must not be shared with end customers.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="pkg-tnc"
                    checked={tnc}
                    onChange={(e) => setTnc(e.target.checked)}
                    className="w-4 h-4 accent-orange-500"
                    data-ocid="package_builder.tnc.checkbox"
                  />
                  <label htmlFor="pkg-tnc" className="text-sm text-foreground">
                    I agree to the Terms & Conditions and Booking Policy
                  </label>
                </div>
              </div>

              {/* Wallet */}
              <div className="bg-card border border-blue-500/30 rounded-2xl p-5">
                <h4 className="font-semibold text-foreground mb-3">
                  💳 Wallet Payment
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Current Balance
                    </span>
                    <span className="font-semibold">{fmt(walletBalance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Package Amount
                    </span>
                    <span className="text-red-400">−{fmt(sellPrice)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-border pt-2">
                    <span>Balance After</span>
                    <span
                      className={
                        walletBalance - sellPrice >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {fmt(walletBalance - sellPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={!tnc}
                className="w-full py-3 rounded-xl text-white font-bold text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg,#1E3A8A,#2563EB,#F97316)",
                }}
                onClick={() => {
                  if (tnc) setConfirmed(true);
                }}
                data-ocid="package_builder.confirm.button"
              >
                ✓ Confirm & Book Package
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Helper Sub-components ─────────────────────────────────────────────────────
function CompCard({
  icon,
  title,
  badge,
  enabled,
  onToggle,
  toggleId,
  children,
}: {
  icon: string;
  title: string;
  badge: string | null;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  toggleId?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`bg-card border rounded-xl p-5 transition-all ${enabled ? "border-orange-500/40" : "border-border opacity-70"}`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="font-semibold text-foreground">{title}</p>
            {badge && (
              <p className="text-xs text-orange-500 font-semibold">
                {badge} total
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {enabled && (
            <span className="text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded">
              ADDED
            </span>
          )}
          <ToggleSwitch checked={enabled} onChange={onToggle} id={toggleId} />
        </div>
      </div>
      {enabled && children && (
        <div className="mt-4 pt-4 border-t border-border">{children}</div>
      )}
    </div>
  );
}

function PriceRow({
  label,
  pax,
  unit,
  total,
}: { label: string; pax: number; unit: string; total: string }) {
  return (
    <tr>
      <td className="py-2 text-foreground">{label}</td>
      <td className="py-2 text-right text-muted-foreground">{pax}</td>
      <td className="py-2 text-right text-muted-foreground text-xs">{unit}</td>
      <td className="py-2 text-right font-semibold">{total}</td>
    </tr>
  );
}
