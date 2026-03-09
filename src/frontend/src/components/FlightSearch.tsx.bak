import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeftRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Plane,
  Search,
  SlidersHorizontal,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type TripType = "oneway" | "roundtrip" | "multicity";
type CabinClass = "economy" | "premium_economy" | "business" | "first";
type FareType = "regular" | "student" | "senior" | "soto" | "ndc";

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

interface FlightResult {
  id: string;
  airline: string;
  airlineCode: string;
  flightNo: string;
  departure: string;
  depTime: string;
  arrival: string;
  arrTime: string;
  duration: string;
  stops: number;
  stopCity?: string;
  price: number;
  baseFare: number;
  taxes: number;
  seatsLeft: number;
  refundable: boolean;
  badge?: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const CITIES = [
  { code: "DEL", name: "New Delhi", airport: "Indira Gandhi International" },
  {
    code: "BOM",
    name: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International",
  },
  { code: "BLR", name: "Bengaluru", airport: "Kempegowda International" },
  {
    code: "CCU",
    name: "Kolkata",
    airport: "Netaji Subhas Chandra Bose International",
  },
  { code: "MAA", name: "Chennai", airport: "Chennai International" },
  { code: "HYD", name: "Hyderabad", airport: "Rajiv Gandhi International" },
  { code: "COK", name: "Kochi", airport: "Cochin International" },
  { code: "GOI", name: "Goa", airport: "Goa International" },
  { code: "DXB", name: "Dubai", airport: "Dubai International" },
  { code: "SIN", name: "Singapore", airport: "Changi Airport" },
  { code: "LHR", name: "London", airport: "London Heathrow" },
  { code: "JFK", name: "New York", airport: "John F. Kennedy International" },
  { code: "BKK", name: "Bangkok", airport: "Suvarnabhumi Airport" },
  { code: "KUL", name: "Kuala Lumpur", airport: "Kuala Lumpur International" },
];

const AIRLINES = [
  { code: "6E", name: "IndiGo" },
  { code: "AI", name: "Air India" },
  { code: "SG", name: "SpiceJet" },
  { code: "UK", name: "Vistara" },
  { code: "G8", name: "Go First" },
  { code: "I5", name: "AirAsia India" },
  { code: "EK", name: "Emirates" },
  { code: "SQ", name: "Singapore Airlines" },
];

function getMockFlights(from: string, to: string): FlightResult[] {
  const fromCode =
    from.split("(")[1]?.replace(")", "") ||
    from.substring(0, 3).toUpperCase() ||
    "DEL";
  const toCode =
    to.split("(")[1]?.replace(")", "") ||
    to.substring(0, 3).toUpperCase() ||
    "DXB";

  return [
    {
      id: "f1",
      airline: "IndiGo",
      airlineCode: "6E",
      flightNo: `6E-${Math.floor(1000 + Math.random() * 9000)}`,
      departure: fromCode,
      depTime: "06:20",
      arrival: toCode,
      arrTime: "08:45",
      duration: "2h 25m",
      stops: 0,
      price: 5840,
      baseFare: 4200,
      taxes: 1640,
      seatsLeft: 8,
      refundable: false,
      badge: "CHEAPEST",
    },
    {
      id: "f2",
      airline: "Air India",
      airlineCode: "AI",
      flightNo: `AI-${Math.floor(100 + Math.random() * 900)}`,
      departure: fromCode,
      depTime: "08:35",
      arrival: toCode,
      arrTime: "10:50",
      duration: "2h 15m",
      stops: 0,
      price: 6200,
      baseFare: 4800,
      taxes: 1400,
      seatsLeft: 14,
      refundable: true,
      badge: "FASTEST",
    },
    {
      id: "f3",
      airline: "Vistara",
      airlineCode: "UK",
      flightNo: `UK-${Math.floor(100 + Math.random() * 900)}`,
      departure: fromCode,
      depTime: "11:10",
      arrival: toCode,
      arrTime: "14:55",
      duration: "3h 45m",
      stops: 1,
      stopCity: "BLR",
      price: 4950,
      baseFare: 3600,
      taxes: 1350,
      seatsLeft: 5,
      refundable: false,
    },
    {
      id: "f4",
      airline: "SpiceJet",
      airlineCode: "SG",
      flightNo: `SG-${Math.floor(100 + Math.random() * 900)}`,
      departure: fromCode,
      depTime: "14:25",
      arrival: toCode,
      arrTime: "16:50",
      duration: "2h 25m",
      stops: 0,
      price: 5390,
      baseFare: 4100,
      taxes: 1290,
      seatsLeft: 22,
      refundable: false,
    },
    {
      id: "f5",
      airline: "AirAsia India",
      airlineCode: "I5",
      flightNo: `I5-${Math.floor(100 + Math.random() * 900)}`,
      departure: fromCode,
      depTime: "17:45",
      arrival: toCode,
      arrTime: "22:30",
      duration: "4h 45m",
      stops: 1,
      stopCity: "COK",
      price: 4200,
      baseFare: 3200,
      taxes: 1000,
      seatsLeft: 3,
      refundable: false,
      badge: "BEST VALUE",
    },
    {
      id: "f6",
      airline: "Go First",
      airlineCode: "G8",
      flightNo: `G8-${Math.floor(100 + Math.random() * 900)}`,
      departure: fromCode,
      depTime: "20:15",
      arrival: toCode,
      arrTime: "22:45",
      duration: "2h 30m",
      stops: 0,
      price: 5100,
      baseFare: 3900,
      taxes: 1200,
      seatsLeft: 19,
      refundable: true,
    },
  ];
}

// ── City Autocomplete ─────────────────────────────────────────────────────────
function CityInput({
  id,
  placeholder,
  value,
  onChange,
  ocid,
}: {
  id: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  ocid: string;
}) {
  const [open, setOpen] = useState(false);
  const filtered = CITIES.filter(
    (c) =>
      value.length > 0 &&
      (c.name.toLowerCase().includes(value.toLowerCase()) ||
        c.code.toLowerCase().includes(value.toLowerCase()) ||
        c.airport.toLowerCase().includes(value.toLowerCase())),
  ).slice(0, 5);

  return (
    <div className="relative">
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="h-12 text-base font-medium"
        data-ocid={ocid}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
          {filtered.map((city) => (
            <button
              key={city.code}
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/60 text-left transition-colors"
              onMouseDown={() => {
                onChange(`${city.name} (${city.code})`);
                setOpen(false);
              }}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Plane className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {city.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {city.airport} · {city.code}
                </p>
              </div>
              <span className="ml-auto text-xs font-bold text-muted-foreground">
                {city.code}
              </span>
            </button>
          ))}
        </div>
      )}
      {value && filtered.length === 0 && open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-xl shadow-lg px-4 py-3">
          <p className="text-sm text-muted-foreground">
            No cities found for "{value}"
          </p>
        </div>
      )}
    </div>
  );
}

// ── Passenger Selector ────────────────────────────────────────────────────────
function PassengerSelector({
  passengers,
  cabin,
  onPassengersChange,
  onCabinChange,
}: {
  passengers: PassengerCount;
  cabin: CabinClass;
  onPassengersChange: (p: PassengerCount) => void;
  onCabinChange: (c: CabinClass) => void;
}) {
  const [open, setOpen] = useState(false);
  const total = passengers.adults + passengers.children + passengers.infants;
  const cabinLabels: Record<CabinClass, string> = {
    economy: "Economy",
    premium_economy: "Premium Economy",
    business: "Business",
    first: "First Class",
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full h-12 flex items-center justify-between px-3 border border-input rounded-md bg-background text-sm font-medium hover:border-primary/50 transition-colors"
        onClick={() => setOpen((v) => !v)}
        data-ocid="flight.passenger.select"
      >
        <span>
          {total} Passenger{total > 1 ? "s" : ""} · {cabinLabels[cabin]}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-xl shadow-xl p-4 min-w-[280px]">
          {[
            {
              key: "adults" as keyof PassengerCount,
              label: "Adults",
              hint: "12+ years",
              min: 1,
            },
            {
              key: "children" as keyof PassengerCount,
              label: "Children",
              hint: "2-11 years",
              min: 0,
            },
            {
              key: "infants" as keyof PassengerCount,
              label: "Infants",
              hint: "Under 2 years",
              min: 0,
            },
          ].map(({ key, label, hint, min }) => (
            <div
              key={key}
              className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{hint}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-40"
                  disabled={passengers[key] <= min}
                  onClick={() =>
                    onPassengersChange({
                      ...passengers,
                      [key]: passengers[key] - 1,
                    })
                  }
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-semibold">
                  {passengers[key]}
                </span>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted"
                  onClick={() =>
                    onPassengersChange({
                      ...passengers,
                      [key]: passengers[key] + 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="mt-3">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Cabin Class
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  "economy",
                  "premium_economy",
                  "business",
                  "first",
                ] as CabinClass[]
              ).map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    cabin === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted"
                  }`}
                  onClick={() => onCabinChange(c)}
                >
                  {cabinLabels[c]}
                </button>
              ))}
            </div>
          </div>

          <Button
            className="w-full mt-3 bg-primary text-primary-foreground"
            size="sm"
            onClick={() => setOpen(false)}
            data-ocid="flight.passenger.confirm.button"
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Flight Result Card ────────────────────────────────────────────────────────
function FlightCard({
  flight,
  index,
}: { flight: FlightResult; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
      data-ocid={`flight.result.item.${index + 1}`}
    >
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Airline */}
          <div className="flex items-center gap-2.5 w-28 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Plane className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground leading-tight">
                {flight.airline}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {flight.flightNo}
              </p>
            </div>
          </div>

          {/* Route */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <div className="text-center flex-shrink-0">
              <p className="font-display text-xl font-bold text-foreground">
                {flight.depTime}
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                {flight.departure}
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1 min-w-0 px-2">
              <p className="text-xs text-muted-foreground">{flight.duration}</p>
              <div className="w-full flex items-center gap-1">
                <div className="flex-1 h-px bg-border" />
                {flight.stops === 0 ? (
                  <span className="text-[10px] text-accent font-semibold flex-shrink-0">
                    NON-STOP
                  </span>
                ) : (
                  <span className="text-[10px] text-orange-500 font-semibold flex-shrink-0">
                    1 STOP · {flight.stopCity}
                  </span>
                )}
                <div className="flex-1 h-px bg-border" />
              </div>
              <p className="text-[10px] text-muted-foreground">
                {flight.stops === 0 ? "Direct" : `Via ${flight.stopCity}`}
              </p>
            </div>

            <div className="text-center flex-shrink-0">
              <p className="font-display text-xl font-bold text-foreground">
                {flight.arrTime}
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                {flight.arrival}
              </p>
            </div>
          </div>

          {/* Price + Book */}
          <div className="text-right flex-shrink-0">
            {flight.badge && (
              <Badge
                className={`text-[10px] mb-1.5 ${
                  flight.badge === "CHEAPEST"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : flight.badge === "FASTEST"
                      ? "bg-blue-100 text-blue-700 border-blue-200"
                      : "bg-amber-100 text-amber-700 border-amber-200"
                }`}
              >
                {flight.badge === "CHEAPEST" && (
                  <Zap className="w-2.5 h-2.5 mr-1" />
                )}
                {flight.badge === "FASTEST" && (
                  <Clock className="w-2.5 h-2.5 mr-1" />
                )}
                {flight.badge === "BEST VALUE" && (
                  <Star className="w-2.5 h-2.5 mr-1" />
                )}
                {flight.badge}
              </Badge>
            )}
            <p className="font-display text-2xl font-bold text-foreground">
              ₹{flight.price.toLocaleString("en-IN")}
            </p>
            <p className="text-[10px] text-muted-foreground mb-2">per person</p>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground font-semibold text-xs px-4"
              data-ocid={`flight.book.button.${index + 1}`}
            >
              Book Now
            </Button>
            {flight.seatsLeft <= 5 && (
              <p className="text-[10px] text-red-600 font-medium mt-1">
                {flight.seatsLeft} seats left!
              </p>
            )}
          </div>
        </div>

        {/* Expandable details row */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${flight.refundable ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"}`}
          >
            {flight.refundable ? "Refundable" : "Non-Refundable"}
          </span>
          <span className="text-xs text-muted-foreground">
            Taxes: ₹{flight.taxes.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-muted-foreground">
            Base: ₹{flight.baseFare.toLocaleString("en-IN")}
          </span>
          <button
            type="button"
            className="ml-auto text-xs text-primary hover:underline flex items-center gap-1"
            onClick={() => setExpanded((v) => !v)}
            data-ocid={`flight.details.toggle.${index + 1}`}
          >
            {expanded ? "Hide details" : "Flight details"}
            {expanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-border bg-muted/30 rounded-lg p-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <p className="text-muted-foreground mb-0.5">Aircraft</p>
                <p className="font-medium text-foreground">Airbus A320neo</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">Baggage</p>
                <p className="font-medium text-foreground">15 kg check-in</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">Cabin Baggage</p>
                <p className="font-medium text-foreground">7 kg carry-on</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">Meal</p>
                <p className="font-medium text-foreground">Paid meal</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Flight Results Panel ──────────────────────────────────────────────────────
function FlightResults({
  flights,
  onBack,
}: {
  flights: FlightResult[];
  onBack: () => void;
}) {
  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure">(
    "price",
  );
  const [filterNonStop, setFilterNonStop] = useState(false);
  const [filterAirlines, setFilterAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(15000);

  const sorted = [...flights]
    .filter((f) => {
      if (filterNonStop && f.stops > 0) return false;
      if (filterAirlines.length > 0 && !filterAirlines.includes(f.airline))
        return false;
      if (f.price > maxPrice) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "duration") return a.duration.localeCompare(b.duration);
      return a.depTime.localeCompare(b.depTime);
    });

  function toggleAirline(name: string) {
    setFilterAirlines((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name],
    );
  }

  return (
    <div className="flex gap-5">
      {/* Filter sidebar */}
      <aside
        className="w-56 flex-shrink-0 hidden lg:block"
        data-ocid="flight.filters.panel"
      >
        <div className="bg-card border border-border rounded-xl p-4 space-y-5 sticky top-20">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </h3>
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() => {
                setFilterNonStop(false);
                setFilterAirlines([]);
                setMaxPrice(15000);
              }}
            >
              Reset
            </button>
          </div>

          {/* Stops */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Stops
            </p>
            <div className="space-y-2">
              <label
                htmlFor="filter-nonstop"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  id="filter-nonstop"
                  checked={filterNonStop}
                  onCheckedChange={(v) => setFilterNonStop(!!v)}
                  data-ocid="flight.filter.nonstop.checkbox"
                />
                <span className="text-sm">Non-stop only</span>
              </label>
            </div>
          </div>

          {/* Price range */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Max Price: ₹{maxPrice.toLocaleString("en-IN")}
            </p>
            <input
              type="range"
              min={3000}
              max={15000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
              data-ocid="flight.filter.price.input"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>₹3,000</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Airlines */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Airlines
            </p>
            <div className="space-y-2">
              {[
                "IndiGo",
                "Air India",
                "SpiceJet",
                "Vistara",
                "Go First",
                "AirAsia India",
              ].map((airline) => (
                <label
                  key={airline}
                  htmlFor={`airline-filter-${airline.replace(/\s+/g, "-")}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    id={`airline-filter-${airline.replace(/\s+/g, "-")}`}
                    checked={filterAirlines.includes(airline)}
                    onCheckedChange={() => toggleAirline(airline)}
                    data-ocid="flight.filter.airline.checkbox"
                  />
                  <span className="text-sm">{airline}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Departure time */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Departure Time
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {["Morning", "Afternoon", "Evening", "Night"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className="px-2 py-1.5 rounded-lg border border-border text-xs hover:bg-primary/10 hover:border-primary/30 transition-colors"
                  data-ocid="flight.filter.time.button"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="flex-1 min-w-0">
        {/* Sort bar */}
        <div className="flex items-center justify-between mb-4 bg-card border border-border rounded-xl px-4 py-3">
          <p className="text-sm font-medium text-foreground">
            <span className="font-bold text-primary">{sorted.length}</span>{" "}
            flights found
          </p>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground hidden sm:block">
              Sort by:
            </span>
            {(["price", "duration", "departure"] as const).map((s) => (
              <button
                key={s}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  sortBy === s
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                }`}
                onClick={() => setSortBy(s)}
                data-ocid={`flight.sort.${s}.button`}
              >
                {s === "price"
                  ? "Cheapest"
                  : s === "duration"
                    ? "Fastest"
                    : "Earliest"}
              </button>
            ))}
          </div>
        </div>

        {sorted.length === 0 ? (
          <div
            className="bg-card border border-border rounded-xl p-12 text-center"
            data-ocid="flight.results.empty_state"
          >
            <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">
              No flights match your filters
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((flight, i) => (
              <FlightCard key={flight.id} flight={flight} index={i} />
            ))}
          </div>
        )}

        <button
          type="button"
          className="mt-4 text-sm text-primary hover:underline flex items-center gap-1"
          onClick={onBack}
          data-ocid="flight.back.link"
        >
          ← Modify Search
        </button>
      </div>
    </div>
  );
}

// ── Main Flight Search Component ──────────────────────────────────────────────
export function FlightSearch() {
  const [tripType, setTripType] = useState<TripType>("oneway");
  const [from, setFrom] = useState("New Delhi (DEL)");
  const [to, setTo] = useState("");
  const [depDate, setDepDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [retDate, setRetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  });
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabin, setCabin] = useState<CabinClass>("economy");
  const [fareType, setFareType] = useState<FareType>("regular");
  const [directOnly, setDirectOnly] = useState(false);
  const [preferredAirline, setPreferredAirline] = useState("");
  const [smartPnr, setSmartPnr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FlightResult[] | null>(null);

  const RECENT_SEARCHES = [
    {
      from: "DEL",
      to: "DXB",
      date: "12 Mar",
      pax: "1 Adult",
      price: "₹18,500",
    },
    {
      from: "BOM",
      to: "SIN",
      date: "15 Mar",
      pax: "2 Adults",
      price: "₹24,800",
    },
    {
      from: "BLR",
      to: "LHR",
      date: "20 Mar",
      pax: "1 Adult",
      price: "₹42,300",
    },
  ];

  function swapCities() {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setLoading(false);
      setResults(getMockFlights(from, to));
    }, 1200);
  }

  const tripLabels: Record<TripType, string> = {
    oneway: "One Way",
    roundtrip: "Round Trip",
    multicity: "Multi City",
  };

  return (
    <div className="space-y-5" data-ocid="flight.search.panel">
      {/* Search form */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plane className="w-5 h-5 text-white" />
            <h2 className="font-display font-bold text-white text-lg">
              Book Flights
            </h2>
            {smartPnr && (
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                Smart PNR Active
              </Badge>
            )}
          </div>
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setSmartPnr((v) => !v)}
            data-ocid="flight.smart_pnr.toggle"
          >
            <span className="text-white/80 text-xs font-medium">Smart PNR</span>
            <div
              className={`w-10 h-5 rounded-full transition-colors relative ${smartPnr ? "bg-accent" : "bg-white/20"}`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-transform ${smartPnr ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </div>
          </button>
        </div>

        {/* Trip type tabs */}
        <div className="flex border-b border-border bg-muted/30">
          {(["oneway", "roundtrip", "multicity"] as TripType[]).map((t) => (
            <button
              key={t}
              type="button"
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                tripType === t
                  ? "text-primary bg-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setTripType(t)}
              data-ocid={`flight.trip_type.${t}.tab`}
            >
              {tripLabels[t]}
              {tripType === t && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Search inputs */}
        <form
          onSubmit={handleSearch}
          className="p-5 space-y-4"
          data-ocid="flight.search.form"
        >
          {/* From / To row */}
          <div className="flex gap-2 items-start">
            <div className="flex-1 space-y-1">
              <Label
                htmlFor="flight-from"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                From
              </Label>
              <CityInput
                id="flight-from"
                placeholder="Origin city or airport"
                value={from}
                onChange={setFrom}
                ocid="flight.from.input"
              />
            </div>

            {/* Swap button */}
            <button
              type="button"
              className="mt-7 w-10 h-10 rounded-full border border-border bg-card hover:bg-primary/10 hover:border-primary/30 flex items-center justify-center transition-colors flex-shrink-0"
              onClick={swapCities}
              data-ocid="flight.swap.button"
            >
              <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="flex-1 space-y-1">
              <Label
                htmlFor="flight-to"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                To
              </Label>
              <CityInput
                id="flight-to"
                placeholder="Destination city or airport"
                value={to}
                onChange={setTo}
                ocid="flight.to.input"
              />
            </div>
          </div>

          {/* Dates row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label
                htmlFor="dep-date"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                Departure
              </Label>
              <Input
                id="dep-date"
                type="date"
                value={depDate}
                onChange={(e) => setDepDate(e.target.value)}
                className="h-12"
                data-ocid="flight.departure_date.input"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="ret-date"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                {tripType === "roundtrip" ? "Return" : "Return (Optional)"}
              </Label>
              <Input
                id="ret-date"
                type="date"
                value={retDate}
                onChange={(e) => setRetDate(e.target.value)}
                className={`h-12 ${tripType === "oneway" ? "opacity-50" : ""}`}
                disabled={tripType === "oneway"}
                data-ocid="flight.return_date.input"
              />
            </div>
          </div>

          {/* Passengers & class row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Passengers & Class
              </Label>
              <PassengerSelector
                passengers={passengers}
                cabin={cabin}
                onPassengersChange={setPassengers}
                onCabinChange={setCabin}
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="preferred-airline"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                Preferred Airline
              </Label>
              <select
                id="preferred-airline"
                className="w-full h-12 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={preferredAirline}
                onChange={(e) => setPreferredAirline(e.target.value)}
                data-ocid="flight.preferred_airline.select"
              >
                <option value="">Any Airline</option>
                {AIRLINES.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fare type row */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Fare Type
            </Label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { key: "regular", label: "Regular Fares" },
                  { key: "student", label: "Student Fares" },
                  { key: "senior", label: "Senior Citizen" },
                  { key: "soto", label: "SOTO" },
                  { key: "ndc", label: "NDC" },
                ] as { key: FareType; label: string }[]
              ).map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-1.5 cursor-pointer"
                  data-ocid={`flight.fare_type.${key}.radio`}
                >
                  <input
                    type="radio"
                    name="fare-type"
                    value={key}
                    checked={fareType === key}
                    onChange={() => setFareType(key)}
                    className="accent-primary"
                  />
                  <span
                    className={`text-sm ${fareType === key ? "font-semibold text-primary" : "text-foreground/70"}`}
                  >
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Options row */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="direct-only"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                id="direct-only"
                checked={directOnly}
                onCheckedChange={(v) => setDirectOnly(!!v)}
                data-ocid="flight.direct_only.checkbox"
              />
              <span className="text-sm font-medium">Direct Flights Only</span>
            </label>

            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground font-semibold px-8"
              disabled={loading || !from || !to}
              data-ocid="flight.search.primary_button"
            >
              {loading ? (
                <span
                  className="flex items-center gap-2"
                  data-ocid="flight.search.loading_state"
                >
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Flights
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Recent searches (shown when no results) */}
      {!results && !loading && (
        <div
          className="bg-card border border-border rounded-xl p-5"
          data-ocid="flight.recent_searches.panel"
        >
          <h3 className="font-display font-semibold text-sm text-foreground mb-3">
            Your Recent Searches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RECENT_SEARCHES.map((s, i) => (
              <button
                key={s.from + s.to}
                type="button"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 hover:border-primary/30 transition-colors text-left group"
                onClick={() => {
                  setFrom(s.from);
                  setTo(s.to);
                }}
                data-ocid={`flight.recent_search.item.${i + 1}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary">
                    {s.from} → {s.to}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.date} · {s.pax}
                  </p>
                </div>
                <p className="ml-auto text-sm font-bold text-foreground">
                  {s.price}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Deals banner */}
      {!results && !loading && (
        <div
          className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-5 text-white"
          data-ocid="flight.deals.panel"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs mb-2">
                🔥 HOT DEALS
              </Badge>
              <h3 className="font-display font-bold text-lg">
                Special Fare Offers This Week
              </h3>
              <p className="text-white/80 text-sm mt-1">
                Exclusive fares for FiveStar Travel agents. Limited seats
                available.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { route: "DEL → DXB", price: "₹18,500", tag: "IndiGo" },
                { route: "BOM → SIN", price: "₹22,800", tag: "Air India" },
                { route: "BLR → BKK", price: "₹16,200", tag: "Vistara" },
              ].map((deal, dealIdx) => (
                <div
                  key={deal.route}
                  className="bg-white/15 rounded-xl px-4 py-2.5 text-center"
                  data-ocid={`flight.deal.item.${dealIdx + 1}`}
                >
                  <p className="text-xs text-white/70 mb-0.5">{deal.route}</p>
                  <p className="font-display font-bold text-base">
                    {deal.price}
                  </p>
                  <p className="text-[10px] text-white/60">{deal.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div
          className="bg-card border border-border rounded-xl p-12 text-center"
          data-ocid="flight.search.loading_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8 text-primary animate-bounce" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">
            Searching Flights
          </h3>
          <p className="text-sm text-muted-foreground">
            Checking Amadeus, Sabre, Travelport &amp; more for the best fares...
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <FlightResults flights={results} onBack={() => setResults(null)} />
      )}
    </div>
  );
}
