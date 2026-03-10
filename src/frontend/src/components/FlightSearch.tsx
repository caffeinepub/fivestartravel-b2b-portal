import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeftRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Plane,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FlightReview, type FlightReviewFlight } from "./FlightReview";

// ── Types ─────────────────────────────────────────────────────────────────────
type TripType = "oneway" | "roundtrip" | "multicity";
type CabinClass = "economy" | "premium_economy" | "business" | "first";
type FareType = "regular" | "student" | "senior" | "soto" | "ndc";

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

interface MultiCityRoute {
  id: string;
  from: string;
  to: string;
  date: string;
}

interface FlightResult {
  id: string;
  priceId: string;
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
  mf: number;
  mft: number;
  seatsLeft: number;
  refundable: boolean;
  rT: number;
  fareIdentifier: string;
  cabinClass: string;
  fareBasis: string;
  mealIncluded: boolean;
  checkInBaggage: string;
  cabinBaggage: string;
  badge?: string;
  isReturn?: boolean;
  sri?: string;
  msri?: string[];
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
      priceId: "f1",
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
      mf: 0,
      mft: 0,
      seatsLeft: 8,
      refundable: false,
      rT: 0,
      fareIdentifier: "PUBLISHED",
      cabinClass: "ECONOMY",
      fareBasis: "",
      mealIncluded: false,
      checkInBaggage: "15 kg",
      cabinBaggage: "7 kg",
      badge: "CHEAPEST",
    },
    {
      id: "f2",
      priceId: "f2",
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
      mf: 0,
      mft: 0,
      seatsLeft: 14,
      refundable: true,
      rT: 1,
      fareIdentifier: "PUBLISHED",
      cabinClass: "ECONOMY",
      fareBasis: "",
      mealIncluded: true,
      checkInBaggage: "23 kg",
      cabinBaggage: "8 kg",
      badge: "FASTEST",
    },
    {
      id: "f3",
      priceId: "f3",
      airline: "Vistara",
      airlineCode: "UK",
      flightNo: `UK-${Math.floor(100 + Math.random() * 900)}`,
      departure: fromCode,
      depTime: "11:15",
      arrival: toCode,
      arrTime: "13:30",
      duration: "2h 15m",
      stops: 0,
      price: 7100,
      baseFare: 5500,
      taxes: 1350,
      mf: 200,
      mft: 50,
      seatsLeft: 5,
      refundable: false,
      rT: 0,
      fareIdentifier: "TJ_FLEX",
      cabinClass: "ECONOMY",
      fareBasis: "VFLEX",
      mealIncluded: true,
      checkInBaggage: "15 kg",
      cabinBaggage: "7 kg",
    },
    {
      id: "f4",
      priceId: "f4",
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
      mf: 0,
      mft: 0,
      seatsLeft: 22,
      refundable: false,
      rT: 0,
      fareIdentifier: "PUBLISHED",
      cabinClass: "ECONOMY",
      fareBasis: "",
      mealIncluded: false,
      checkInBaggage: "15 kg",
      cabinBaggage: "7 kg",
    },
    {
      id: "f5",
      priceId: "f5",
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
      mf: 0,
      mft: 0,
      seatsLeft: 3,
      refundable: false,
      rT: 0,
      fareIdentifier: "PUBLISHED",
      cabinClass: "ECONOMY",
      fareBasis: "",
      mealIncluded: false,
      checkInBaggage: "15 kg",
      cabinBaggage: "7 kg",
      badge: "BEST VALUE",
    },
    {
      id: "f6",
      priceId: "f6",
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
      mf: 0,
      mft: 0,
      seatsLeft: 19,
      refundable: true,
      rT: 1,
      fareIdentifier: "PUBLISHED",
      cabinClass: "ECONOMY",
      fareBasis: "",
      mealIncluded: false,
      checkInBaggage: "15 kg",
      cabinBaggage: "7 kg",
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
      <div className="relative">
        <Plane
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 z-10"
          style={{ color: "rgba(249,115,22,0.8)" }}
        />
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
          className="h-12 pl-9 text-sm font-medium"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
          }}
          data-ocid={ocid}
          autoComplete="off"
        />
      </div>
      {open && filtered.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl shadow-2xl overflow-hidden"
          style={{
            background: "#0f1e3d",
            border: "1px solid rgba(249,115,22,0.25)",
          }}
        >
          {filtered.map((city) => (
            <button
              key={city.code}
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
              style={{ color: "#e2e8f0" }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(249,115,22,0.1)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.background = "rgba(249,115,22,0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "";
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = "";
              }}
              onMouseDown={() => {
                onChange(`${city.name} (${city.code})`);
                setOpen(false);
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(249,115,22,0.15)" }}
              >
                <Plane className="w-4 h-4" style={{ color: "#f97316" }} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#f1f5f9" }}
                >
                  {city.name}
                </p>
                <p className="text-xs" style={{ color: "#94a3b8" }}>
                  {city.airport} · {city.code}
                </p>
              </div>
              <span
                className="ml-auto text-xs font-bold"
                style={{ color: "#f97316" }}
              >
                {city.code}
              </span>
            </button>
          ))}
        </div>
      )}
      {value && filtered.length === 0 && open && (
        <div
          className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl px-4 py-3"
          style={{
            background: "#0f1e3d",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <p className="text-sm" style={{ color: "#94a3b8" }}>
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
        className="w-full h-12 flex items-center justify-between px-3 rounded-xl text-sm font-medium transition-colors"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#e2e8f0",
        }}
        onClick={() => setOpen((v) => !v)}
        data-ocid="flight.passenger.select"
      >
        <span className="flex items-center gap-2">
          <Users
            className="w-4 h-4"
            style={{ color: "rgba(249,115,22,0.8)" }}
          />
          {total} Passenger{total > 1 ? "s" : ""} · {cabinLabels[cabin]}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4" style={{ color: "#94a3b8" }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color: "#94a3b8" }} />
        )}
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl shadow-2xl p-4 min-w-[280px]"
          style={{
            background: "#0f1e3d",
            border: "1px solid rgba(249,115,22,0.25)",
          }}
        >
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
              className="flex items-center justify-between py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: "#f1f5f9" }}>
                  {label}
                </p>
                <p className="text-xs" style={{ color: "#64748b" }}>
                  {hint}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-40 transition-colors"
                  style={{
                    border: "1px solid rgba(249,115,22,0.3)",
                    color: "#f97316",
                  }}
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
                <span
                  className="w-5 text-center text-sm font-semibold"
                  style={{ color: "#f1f5f9" }}
                >
                  {passengers[key]}
                </span>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    border: "1px solid rgba(249,115,22,0.3)",
                    color: "#f97316",
                  }}
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
            <p
              className="text-xs font-semibold mb-2 uppercase tracking-wider"
              style={{ color: "#64748b" }}
            >
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
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                  style={
                    cabin === c
                      ? {
                          background:
                            "linear-gradient(135deg, #f97316, #ea580c)",
                          color: "#fff",
                          border: "none",
                        }
                      : {
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#94a3b8",
                        }
                  }
                  onClick={() => onCabinChange(c)}
                >
                  {cabinLabels[c]}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-3 py-2 rounded-lg text-sm font-semibold transition-colors"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "#fff",
            }}
            onClick={() => setOpen(false)}
            data-ocid="flight.passenger.confirm.button"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

// ── Airline color map ──────────────────────────────────────────────────────────
const AIRLINE_COLORS: Record<string, string> = {
  "6E": "#1a56db",
  AI: "#c0392b",
  SG: "#e74c3c",
  UK: "#7b2d8b",
  G8: "#16a34a",
  I5: "#dc2626",
  EK: "#b91c1c",
  SQ: "#1d4ed8",
};

// ── Flight Result Card ────────────────────────────────────────────────────────
function FlightCard({
  flight,
  index,
  onSelect,
}: {
  flight: FlightResult;
  index: number;
  onSelect: (f: FlightResult) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const refundBadge = () => {
    if (flight.rT === 1)
      return (
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: "#dcfce7", color: "#15803d" }}
        >
          ✓ Refundable
        </span>
      );
    if (flight.rT === 2)
      return (
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: "#fef3c7", color: "#92400e" }}
        >
          Partial Refund
        </span>
      );
    return (
      <span
        className="text-xs px-2 py-0.5 rounded-full font-medium"
        style={{ background: "#f1f5f9", color: "#64748b" }}
      >
        Non-Refundable
      </span>
    );
  };

  const airlineBg = AIRLINE_COLORS[flight.airlineCode] ?? "#0b5ed7";

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        boxShadow: "0 2px 12px rgba(11,20,55,0.08), 0 1px 3px rgba(0,0,0,0.05)",
        border: "1px solid #e8edf5",
      }}
      data-ocid={`flight.result.item.${index + 1}`}
    >
      {/* Top accent line */}
      {flight.badge && (
        <div
          className="h-0.5 w-full"
          style={
            flight.badge === "CHEAPEST"
              ? { background: "linear-gradient(90deg, #22c55e, #16a34a)" }
              : flight.badge === "FASTEST"
                ? { background: "linear-gradient(90deg, #3b82f6, #1d4ed8)" }
                : { background: "linear-gradient(90deg, #f97316, #ea580c)" }
          }
        />
      )}

      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Airline logo circle */}
          <div className="flex items-center gap-2.5 w-28 flex-shrink-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ background: airlineBg }}
            >
              <span
                className="text-white font-bold text-xs"
                style={{ letterSpacing: "-0.02em" }}
              >
                {flight.airlineCode}
              </span>
            </div>
            <div>
              <p
                className="text-xs font-bold leading-tight"
                style={{ color: "#0b1437" }}
              >
                {flight.airline}
              </p>
              <p className="text-[10px]" style={{ color: "#94a3b8" }}>
                {flight.flightNo}
              </p>
            </div>
          </div>

          {/* Route */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <div className="text-center flex-shrink-0">
              <p
                className="text-2xl font-bold tabular-nums"
                style={{ color: "#0b1437", fontFamily: "inherit" }}
              >
                {flight.depTime}
              </p>
              <p
                className="text-xs font-semibold mt-0.5"
                style={{ color: "#64748b" }}
              >
                {flight.departure}
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center gap-0.5 min-w-0 px-2">
              <p className="text-xs" style={{ color: "#94a3b8" }}>
                {flight.duration}
              </p>
              <div className="w-full flex items-center gap-1">
                <div
                  className="flex-1 h-px"
                  style={{ background: "#e2e8f0" }}
                />
                <Plane
                  className="w-3.5 h-3.5 flex-shrink-0"
                  style={{ color: flight.stops === 0 ? "#22c55e" : "#f97316" }}
                />
                <div
                  className="flex-1 h-px"
                  style={{ background: "#e2e8f0" }}
                />
              </div>
              {flight.stops === 0 ? (
                <span
                  className="text-[10px] font-bold tracking-wide"
                  style={{ color: "#22c55e" }}
                >
                  NON-STOP
                </span>
              ) : (
                <span
                  className="text-[10px] font-bold tracking-wide"
                  style={{ color: "#f97316" }}
                >
                  1 STOP · {flight.stopCity}
                </span>
              )}
            </div>

            <div className="text-center flex-shrink-0">
              <p
                className="text-2xl font-bold tabular-nums"
                style={{ color: "#0b1437", fontFamily: "inherit" }}
              >
                {flight.arrTime}
              </p>
              <p
                className="text-xs font-semibold mt-0.5"
                style={{ color: "#64748b" }}
              >
                {flight.arrival}
              </p>
            </div>
          </div>

          {/* Price + Book */}
          <div className="text-right flex-shrink-0 min-w-[120px]">
            <div className="flex flex-col items-end gap-1 mb-2">
              {flight.badge && (
                <Badge
                  className={`text-[10px] font-bold ${
                    flight.badge === "CHEAPEST"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : flight.badge === "FASTEST"
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-orange-100 text-orange-700 border-orange-200"
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
              {flight.fareIdentifier === "TJ_FLEX" && (
                <Badge className="text-[10px] font-bold bg-amber-100 text-amber-700 border-amber-200">
                  TJ FLEX
                </Badge>
              )}
              {flight.fareIdentifier === "SPECIAL_RETURN" && (
                <Badge className="text-[10px] font-bold bg-blue-100 text-blue-700 border-blue-200">
                  Special Return
                </Badge>
              )}
            </div>
            <p
              className="text-2xl font-extrabold tabular-nums"
              style={{ color: "#f97316" }}
            >
              ₹{flight.price.toLocaleString("en-IN")}
            </p>
            <p className="text-[10px] mb-2" style={{ color: "#94a3b8" }}>
              per person
            </p>
            <button
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 w-full"
              style={{
                background: "linear-gradient(135deg, #0b5ed7, #0a4fb8)",
                boxShadow: "0 4px 12px rgba(11,94,215,0.35)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(11,94,215,0.5)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(11,94,215,0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(11,94,215,0.35)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(11,94,215,0.35)";
              }}
              data-ocid={`flight.book.button.${index + 1}`}
              onClick={() => onSelect(flight)}
            >
              Book Now
            </button>
            {flight.seatsLeft <= 5 && (
              <p
                className="text-[10px] font-semibold mt-1.5"
                style={{ color: "#dc2626" }}
              >
                Only {flight.seatsLeft} seats left!
              </p>
            )}
          </div>
        </div>

        {/* Details row */}
        <div
          className="flex items-center gap-4 mt-3 pt-3 flex-wrap"
          style={{ borderTop: "1px solid #f1f5f9" }}
        >
          {refundBadge()}
          <span className="text-xs" style={{ color: "#94a3b8" }}>
            Taxes: ₹{flight.taxes.toLocaleString("en-IN")}
          </span>
          <span className="text-xs" style={{ color: "#94a3b8" }}>
            Base: ₹{flight.baseFare.toLocaleString("en-IN")}
          </span>
          {(flight.mf > 0 || flight.mft > 0) && (
            <span className="text-xs" style={{ color: "#94a3b8" }}>
              MF: ₹{flight.mf.toLocaleString("en-IN")} · MFT: ₹
              {flight.mft.toLocaleString("en-IN")}
            </span>
          )}
          <button
            type="button"
            className="ml-auto text-xs font-semibold flex items-center gap-1 transition-colors"
            style={{ color: "#0b5ed7" }}
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
          <div
            className="mt-3 pt-3 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs"
            style={{ background: "#f8fafc", borderTop: "1px solid #f1f5f9" }}
          >
            <div>
              <p className="mb-0.5" style={{ color: "#94a3b8" }}>
                Cabin Class
              </p>
              <p className="font-semibold" style={{ color: "#0b1437" }}>
                {flight.cabinClass}
              </p>
            </div>
            <div>
              <p className="mb-0.5" style={{ color: "#94a3b8" }}>
                Check-in Baggage
              </p>
              <p className="font-semibold" style={{ color: "#0b1437" }}>
                {flight.checkInBaggage || "15 kg"}
              </p>
            </div>
            <div>
              <p className="mb-0.5" style={{ color: "#94a3b8" }}>
                Cabin Baggage
              </p>
              <p className="font-semibold" style={{ color: "#0b1437" }}>
                {flight.cabinBaggage || "7 kg"}
              </p>
            </div>
            <div>
              <p className="mb-0.5" style={{ color: "#94a3b8" }}>
                Meal
              </p>
              <p className="font-semibold" style={{ color: "#0b1437" }}>
                {flight.mealIncluded ? "Meal included" : "Paid meal"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function FlightSkeleton() {
  return (
    <div
      className="bg-white rounded-2xl p-4 animate-pulse"
      style={{ border: "1px solid #e8edf5" }}
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-slate-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-3 bg-slate-100 rounded w-1/4" />
        </div>
        <div className="flex-1 flex items-center gap-3">
          <div className="h-6 bg-slate-200 rounded w-14" />
          <div className="flex-1 h-px bg-slate-200" />
          <div className="h-6 bg-slate-200 rounded w-14" />
        </div>
        <div className="w-28 space-y-2">
          <div className="h-6 bg-slate-200 rounded" />
          <div className="h-8 bg-slate-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ── Flight Results Panel ──────────────────────────────────────────────────────
function FlightResults({
  flights,
  onBack,
  onSelect,
  sessionTimer,
  sessionExpired,
  onNewSearch,
}: {
  flights: FlightResult[];
  onBack: () => void;
  onSelect: (f: FlightResult) => void;
  sessionTimer: number;
  sessionExpired: boolean;
  onNewSearch: () => void;
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
        className="w-60 flex-shrink-0 hidden lg:block"
        data-ocid="flight.filters.panel"
      >
        <div
          className="rounded-2xl p-4 space-y-5 sticky top-20"
          style={{
            background: "#0b1437",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between">
            <h3
              className="font-semibold text-sm flex items-center gap-2"
              style={{ color: "#f1f5f9" }}
            >
              <SlidersHorizontal
                className="w-4 h-4"
                style={{ color: "#f97316" }}
              />
              Filters
            </h3>
            <button
              type="button"
              className="text-xs font-semibold transition-colors"
              style={{ color: "#f97316" }}
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
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#475569" }}
            >
              Stops
            </p>
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
              <span className="text-sm" style={{ color: "#cbd5e1" }}>
                Non-stop only
              </span>
            </label>
          </div>

          {/* Price range */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#475569" }}
            >
              Max Price: ₹{maxPrice.toLocaleString("en-IN")}
            </p>
            <input
              type="range"
              min={3000}
              max={15000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-500"
              data-ocid="flight.filter.price.input"
            />
            <div
              className="flex justify-between text-[10px] mt-1"
              style={{ color: "#475569" }}
            >
              <span>₹3,000</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Airlines */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#475569" }}
            >
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
                  <span className="text-sm" style={{ color: "#cbd5e1" }}>
                    {airline}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Departure time */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#475569" }}
            >
              Departure Time
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {["Morning", "Afternoon", "Evening", "Night"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className="px-2 py-1.5 rounded-lg text-xs transition-colors"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#94a3b8",
                    background: "rgba(255,255,255,0.04)",
                  }}
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
        <div
          className="flex items-center justify-between mb-3 rounded-xl px-4 py-3 flex-wrap gap-2"
          style={{
            background: "#0b1437",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p className="text-sm font-medium" style={{ color: "#94a3b8" }}>
            <span className="font-bold" style={{ color: "#f97316" }}>
              {sorted.length}
            </span>{" "}
            <span style={{ color: "#cbd5e1" }}>flights found</span>
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Session timer */}
            {sessionTimer > 0 && (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={
                  sessionTimer < 300
                    ? {
                        background: "rgba(220,38,38,0.15)",
                        border: "1px solid rgba(220,38,38,0.3)",
                        color: "#fca5a5",
                        boxShadow: "0 0 12px rgba(220,38,38,0.2)",
                      }
                    : sessionTimer < 600
                      ? {
                          background: "rgba(249,115,22,0.15)",
                          border: "1px solid rgba(249,115,22,0.35)",
                          color: "#fdba74",
                          boxShadow: "0 0 12px rgba(249,115,22,0.2)",
                        }
                      : {
                          background: "rgba(34,197,94,0.12)",
                          border: "1px solid rgba(34,197,94,0.25)",
                          color: "#86efac",
                        }
                }
                data-ocid="flight.session.timer"
              >
                <Clock className="w-3.5 h-3.5" />
                Price valid: {Math.floor(sessionTimer / 60)}:
                {String(sessionTimer % 60).padStart(2, "0")}
              </div>
            )}
            <Filter className="w-4 h-4" style={{ color: "#475569" }} />
            <span
              className="text-xs hidden sm:block"
              style={{ color: "#475569" }}
            >
              Sort:
            </span>
            {(["price", "duration", "departure"] as const).map((s) => (
              <button
                key={s}
                type="button"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize"
                style={
                  sortBy === s
                    ? {
                        background: "linear-gradient(135deg, #f97316, #ea580c)",
                        color: "#fff",
                      }
                    : { color: "#64748b" }
                }
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

        {/* Session expired banner */}
        {sessionExpired && (
          <div
            className="p-3 mb-3 rounded-xl text-sm flex items-center justify-between"
            style={{
              background: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.25)",
              color: "#f97316",
            }}
            data-ocid="flight.session.error_state"
          >
            <span>Search session expired. Prices may have changed.</span>
            <button
              type="button"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{
                border: "1px solid rgba(249,115,22,0.4)",
                color: "#f97316",
              }}
              onClick={onNewSearch}
              data-ocid="flight.session.new_search.button"
            >
              New Search
            </button>
          </div>
        )}

        {sorted.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center"
            style={{
              background: "#fff",
              border: "1px solid #e8edf5",
            }}
            data-ocid="flight.results.empty_state"
          >
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(11,94,215,0.08)" }}
            >
              <Plane className="w-8 h-8" style={{ color: "#0b5ed7" }} />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#0b1437" }}>
              No flights match your filters
            </h3>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((flight, i) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                index={i}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          className="mt-4 text-sm font-semibold flex items-center gap-1 transition-colors"
          style={{ color: "#f97316" }}
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
  const [multiCityRoutes, setMultiCityRoutes] = useState<MultiCityRoute[]>([
    { id: "r0", from: "", to: "", date: "" },
    { id: "r1", from: "", to: "", date: "" },
  ]);
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
  const [selectedFlight, setSelectedFlight] = useState<FlightResult | null>(
    null,
  );
  const [confirmedFlightId, setConfirmedFlightId] = useState<string | null>(
    null,
  );
  const [sessionTimer, setSessionTimer] = useState(0);
  const [sessionExpired, setSessionExpired] = useState(false);

  // 30-minute session countdown
  useEffect(() => {
    if (sessionTimer <= 0) return;
    const interval = setInterval(() => {
      setSessionTimer((prev) => {
        if (prev <= 1) {
          setSessionExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionTimer]);

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

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (tripType !== "multicity" && (!from || !to)) return;
      setLoading(true);
      setResults(null);
      setSessionExpired(false);
      setSessionTimer(30 * 60);

      const extractCode = (s: string) =>
        s.match(/\(([A-Z]{3})\)/)?.[1] ?? s.trim().slice(0, 3).toUpperCase();

      const cabinMap: Record<CabinClass, string> = {
        economy: "ECONOMY",
        premium_economy: "PREMIUM_ECONOMY",
        business: "BUSINESS",
        first: "FIRST",
      };

      const pftMap: Record<FareType, string> = {
        regular: "REGULAR",
        student: "STUDENT",
        senior: "SENIOR_CITIZEN",
        soto: "REGULAR",
        ndc: "REGULAR",
      };

      const routeInfos: Array<{
        fromCityOrAirport: { code: string };
        toCityOrAirport: { code: string };
        travelDate: string;
      }> = [];

      if (tripType === "oneway") {
        routeInfos.push({
          fromCityOrAirport: { code: extractCode(from) },
          toCityOrAirport: { code: extractCode(to) },
          travelDate: depDate,
        });
      } else if (tripType === "roundtrip") {
        routeInfos.push({
          fromCityOrAirport: { code: extractCode(from) },
          toCityOrAirport: { code: extractCode(to) },
          travelDate: depDate,
        });
        routeInfos.push({
          fromCityOrAirport: { code: extractCode(to) },
          toCityOrAirport: { code: extractCode(from) },
          travelDate: retDate,
        });
      } else {
        for (const r of multiCityRoutes) {
          if (r.from && r.to && r.date) {
            routeInfos.push({
              fromCityOrAirport: { code: extractCode(r.from) },
              toCityOrAirport: { code: extractCode(r.to) },
              travelDate: r.date,
            });
          }
        }
      }

      const body = {
        searchQuery: {
          cabinClass: cabinMap[cabin],
          paxInfo: {
            ADULT: passengers.adults,
            ...(passengers.children > 0 ? { CHILD: passengers.children } : {}),
            ...(passengers.infants > 0 ? { INFANT: passengers.infants } : {}),
          },
          routeInfos,
          searchModifiers: {
            ...(directOnly
              ? { isDirectFlight: true, isConnectingFlight: false }
              : {}),
            ...(fareType === "student" || fareType === "senior"
              ? { pft: pftMap[fareType] }
              : {}),
          },
          ...(preferredAirline
            ? { preferredAirline: [{ code: preferredAirline }] }
            : {}),
        },
      };

      try {
        const res = await fetch(
          "https://apitest.tripjack.com/fms/v1/air-search-all",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: "7114315c476d94-4ef2-4e21-83e8-527d56a0c529",
            },
            body: JSON.stringify(body),
          },
        );
        const json = await res.json();

        const mapped: FlightResult[] = [];
        const tripInfos = json?.searchResult?.tripInfos;

        function mapTrip(
          tripList: Array<{
            sI: Array<{
              fD?: {
                aI?: { code?: string; name?: string };
                fN?: string;
              };
              dt?: string;
              at?: string;
              da?: { code?: string };
              aa?: { code?: string };
              duration?: number;
              stops?: number;
              so?: Array<{ code?: string }>;
              id?: string;
            }>;
            totalPriceList: Array<{
              id?: string;
              fareIdentifier?: string;
              sri?: string;
              msri?: string[];
              fD?: Record<
                string,
                {
                  fC?: { BF?: number; TAF?: number; TF?: number; NCM?: number };
                  afc?: { TAF?: { MF?: number; MFT?: number } };
                  sR?: number;
                  bI?: { iB?: string; cB?: string };
                  rT?: number;
                  cc?: string;
                  fB?: string;
                  mi?: boolean;
                }
              >;
            }>;
          }>,
          isReturn = false,
        ) {
          if (!Array.isArray(tripList)) return;
          for (const trip of tripList) {
            const segs = trip.sI ?? [];
            const firstSeg = segs[0] ?? {};
            const lastSeg = segs[segs.length - 1] ?? {};
            const prices = trip.totalPriceList ?? [];
            for (const price of prices) {
              const adultFare = price.fD?.ADULT ?? {};
              const fc = adultFare.fC ?? {};
              const afcTaf = adultFare.afc?.TAF ?? {};
              const bI = adultFare.bI ?? {};
              const durationMins = segs.reduce(
                (acc: number, s: { duration?: number }) =>
                  acc + (s.duration ?? 0),
                0,
              );
              const hours = Math.floor(durationMins / 60);
              const mins = durationMins % 60;
              mapped.push({
                id: price.id ?? `f${mapped.length}`,
                priceId: price.id ?? "",
                airline: firstSeg.fD?.aI?.name ?? "Unknown",
                airlineCode: firstSeg.fD?.aI?.code ?? "??",
                flightNo: `${firstSeg.fD?.aI?.code ?? ""}${firstSeg.fD?.fN ?? ""}`,
                departure: firstSeg.da?.code ?? from.slice(0, 3).toUpperCase(),
                depTime: firstSeg.dt?.split("T")[1]?.slice(0, 5) ?? "",
                arrival: lastSeg.aa?.code ?? to.slice(0, 3).toUpperCase(),
                arrTime: lastSeg.at?.split("T")[1]?.slice(0, 5) ?? "",
                duration: durationMins > 0 ? `${hours}h ${mins}m` : "",
                stops: firstSeg.stops ?? segs.length - 1,
                stopCity: firstSeg.so?.[0]?.code,
                price: fc.TF ?? 0,
                baseFare: fc.BF ?? 0,
                taxes: fc.TAF ?? 0,
                mf: afcTaf.MF ?? 0,
                mft: afcTaf.MFT ?? 0,
                seatsLeft: adultFare.sR ?? 9,
                refundable: (adultFare.rT ?? 0) === 1,
                rT: adultFare.rT ?? 0,
                fareIdentifier: price.fareIdentifier ?? "PUBLISHED",
                cabinClass: adultFare.cc ?? "ECONOMY",
                fareBasis: adultFare.fB ?? "",
                mealIncluded: adultFare.mi ?? false,
                checkInBaggage: bI.iB ?? "",
                cabinBaggage: bI.cB ?? "",
                isReturn,
                sri: price.sri,
                msri: price.msri,
              });
            }
          }
        }

        if (tripInfos?.ONWARD) mapTrip(tripInfos.ONWARD);
        if (tripInfos?.RETURN) mapTrip(tripInfos.RETURN, true);
        if (tripInfos?.COMBO) mapTrip(tripInfos.COMBO);

        if (mapped.length > 0) {
          setResults(mapped);
        } else {
          setResults(getMockFlights(from, to));
        }
      } catch {
        setResults(getMockFlights(from, to));
      } finally {
        setLoading(false);
      }
    },
    [
      from,
      to,
      depDate,
      retDate,
      tripType,
      cabin,
      passengers,
      directOnly,
      fareType,
      preferredAirline,
      multiCityRoutes,
    ],
  );

  const tripLabels: Record<TripType, string> = {
    oneway: "One Way",
    roundtrip: "Round Trip",
    multicity: "Multi City",
  };

  function updateMultiCityRoute(
    idx: number,
    field: keyof MultiCityRoute,
    value: string,
  ) {
    setMultiCityRoutes((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r)),
    );
  }

  function addMultiCityRoute() {
    if (multiCityRoutes.length < 6) {
      setMultiCityRoutes((prev) => [
        ...prev,
        { id: `r${Date.now()}`, from: "", to: "", date: "" },
      ]);
    }
  }

  function removeMultiCityRoute(idx: number) {
    if (multiCityRoutes.length > 2) {
      setMultiCityRoutes((prev) => prev.filter((_, i) => i !== idx));
    }
  }

  // ── Render: FlightReview ─────────────────────────────────────────────────
  if (selectedFlight && !confirmedFlightId) {
    const reviewFlight: FlightReviewFlight = {
      id: selectedFlight.id,
      priceId: selectedFlight.priceId,
      airline: selectedFlight.airline,
      airlineCode: selectedFlight.airlineCode,
      flightNo: selectedFlight.flightNo,
      departure: selectedFlight.departure,
      depTime: selectedFlight.depTime,
      arrival: selectedFlight.arrival,
      arrTime: selectedFlight.arrTime,
      duration: selectedFlight.duration,
      stops: selectedFlight.stops,
      price: selectedFlight.price,
      baseFare: selectedFlight.baseFare,
      taxes: selectedFlight.taxes,
      mf: selectedFlight.mf,
      mft: selectedFlight.mft,
      refundable: selectedFlight.refundable,
      rT: selectedFlight.rT,
      fareIdentifier: selectedFlight.fareIdentifier,
      cabinClass: selectedFlight.cabinClass,
      checkInBaggage: selectedFlight.checkInBaggage,
      cabinBaggage: selectedFlight.cabinBaggage,
    };
    return (
      <FlightReview
        flight={reviewFlight}
        passengers={passengers}
        onBack={() => setSelectedFlight(null)}
        onConfirmed={(bookingId) => {
          setConfirmedFlightId(bookingId);
          setSelectedFlight(null);
        }}
      />
    );
  }

  // ── Render: Booking confirmed ────────────────────────────────────────────
  if (confirmedFlightId) {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{
          background: "linear-gradient(135deg, #0b1437 0%, #0d2060 100%)",
          border: "1px solid rgba(249,115,22,0.2)",
        }}
        data-ocid="flight.booking.success_state"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{
            background: "linear-gradient(135deg, #22c55e20, #16a34a30)",
            border: "2px solid #22c55e",
          }}
        >
          <span className="text-3xl">✓</span>
        </div>
        <h2
          className="text-2xl font-extrabold mb-2"
          style={{ color: "#f1f5f9" }}
        >
          Booking Confirmed!
        </h2>
        <p className="text-sm mb-1" style={{ color: "#94a3b8" }}>
          Booking Reference
        </p>
        <p
          className="text-lg font-bold font-mono mb-6"
          style={{ color: "#f97316" }}
        >
          {confirmedFlightId}
        </p>
        <button
          type="button"
          className="px-8 py-3 rounded-xl font-bold text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
          }}
          onClick={() => {
            setConfirmedFlightId(null);
            setResults(null);
            setSelectedFlight(null);
          }}
          data-ocid="flight.new_search.primary_button"
        >
          Search Another Flight
        </button>
      </div>
    );
  }

  // ── Render: Results ──────────────────────────────────────────────────────
  if (results) {
    return (
      <FlightResults
        flights={results}
        onBack={() => setResults(null)}
        onSelect={setSelectedFlight}
        sessionTimer={sessionTimer}
        sessionExpired={sessionExpired}
        onNewSearch={() => setResults(null)}
      />
    );
  }

  // ── Render: Search form ──────────────────────────────────────────────────
  return (
    <div className="space-y-5" data-ocid="flight.search.panel">
      {/* Premium Search form */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0b1437 0%, #0d2060 60%, #0f2878 100%)",
          boxShadow:
            "0 20px 60px rgba(11,20,55,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                boxShadow: "0 4px 12px rgba(249,115,22,0.4)",
              }}
            >
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                className="font-extrabold text-lg leading-tight"
                style={{ color: "#f1f5f9" }}
              >
                Book Flights
              </h2>
              <p className="text-xs" style={{ color: "#64748b" }}>
                Search 500+ airlines worldwide
              </p>
            </div>
            {smartPnr && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold ml-2"
                style={{
                  background: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  color: "#fdba74",
                }}
              >
                Smart PNR Active
              </span>
            )}
          </div>
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setSmartPnr((v) => !v)}
            data-ocid="flight.smart_pnr.toggle"
          >
            <span className="text-xs font-medium" style={{ color: "#94a3b8" }}>
              Smart PNR
            </span>
            <div
              className="w-10 h-5 rounded-full transition-all relative"
              style={{
                background: smartPnr
                  ? "linear-gradient(135deg, #f97316, #ea580c)"
                  : "rgba(255,255,255,0.12)",
              }}
            >
              <div
                className="w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-transform"
                style={{
                  transform: smartPnr ? "translateX(20px)" : "translateX(2px)",
                }}
              />
            </div>
          </button>
        </div>

        {/* Trip type tabs */}
        <div
          className="flex"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {(["oneway", "roundtrip", "multicity"] as TripType[]).map((t) => (
            <button
              key={t}
              type="button"
              className="flex-1 py-3.5 text-sm font-semibold transition-all relative"
              style={
                tripType === t
                  ? { color: "#f97316" }
                  : { color: "rgba(255,255,255,0.4)" }
              }
              onClick={() => setTripType(t)}
              data-ocid={`flight.trip_type.${t}.tab`}
            >
              {tripLabels[t]}
              {tripType === t && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #f97316, transparent)",
                  }}
                />
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
          {tripType === "multicity" ? (
            /* Multi-city rows */
            <div className="space-y-3">
              {multiCityRoutes.map((route, idx) => (
                <div
                  key={route.id}
                  className="flex gap-2 items-end p-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  data-ocid={`flight.multicity.item.${idx + 1}`}
                >
                  <div className="flex-1 space-y-1">
                    <Label
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#475569" }}
                    >
                      From
                    </Label>
                    <Input
                      placeholder="Origin city or code"
                      value={route.from}
                      onChange={(e) =>
                        updateMultiCityRoute(idx, "from", e.target.value)
                      }
                      className="h-10"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#e2e8f0",
                      }}
                      data-ocid={`flight.multicity.from.input.${idx + 1}`}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#475569" }}
                    >
                      To
                    </Label>
                    <Input
                      placeholder="Destination city or code"
                      value={route.to}
                      onChange={(e) =>
                        updateMultiCityRoute(idx, "to", e.target.value)
                      }
                      className="h-10"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#e2e8f0",
                      }}
                      data-ocid={`flight.multicity.to.input.${idx + 1}`}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#475569" }}
                    >
                      Date
                    </Label>
                    <Input
                      type="date"
                      value={route.date}
                      onChange={(e) =>
                        updateMultiCityRoute(idx, "date", e.target.value)
                      }
                      className="h-10"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#e2e8f0",
                      }}
                      data-ocid={`flight.multicity.date.input.${idx + 1}`}
                    />
                  </div>
                  {multiCityRoutes.length > 2 && (
                    <button
                      type="button"
                      className="h-10 px-3 rounded-lg text-xs font-semibold transition-colors flex-shrink-0"
                      style={{
                        border: "1px solid rgba(220,38,38,0.3)",
                        color: "#f87171",
                      }}
                      onClick={() => removeMultiCityRoute(idx)}
                      data-ocid={`flight.multicity.delete_button.${idx + 1}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {multiCityRoutes.length < 6 && (
                <button
                  type="button"
                  className="text-sm font-semibold flex items-center gap-1"
                  style={{ color: "#f97316" }}
                  onClick={addMultiCityRoute}
                  data-ocid="flight.multicity.add.button"
                >
                  + Add another city
                </button>
              )}
            </div>
          ) : (
            /* One-way / Round-trip From/To row */
            <div className="flex gap-2 items-start">
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="flight-from"
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#475569" }}
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
                className="mt-7 w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0"
                style={{
                  background: "rgba(249,115,22,0.12)",
                  border: "1px solid rgba(249,115,22,0.3)",
                }}
                onClick={swapCities}
                data-ocid="flight.swap.button"
              >
                <ArrowLeftRight
                  className="w-4 h-4"
                  style={{ color: "#f97316" }}
                />
              </button>

              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="flight-to"
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#475569" }}
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
          )}

          {/* Dates row */}
          {tripType !== "multicity" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label
                  htmlFor="dep-date"
                  className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: "#475569" }}
                >
                  <Calendar
                    className="w-3 h-3"
                    style={{ color: "rgba(249,115,22,0.7)" }}
                  />
                  Departure
                </Label>
                <div className="relative">
                  <Input
                    id="dep-date"
                    type="date"
                    value={depDate}
                    onChange={(e) => setDepDate(e.target.value)}
                    className="h-12 pl-3"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#e2e8f0",
                      colorScheme: "dark",
                    }}
                    data-ocid="flight.departure_date.input"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="ret-date"
                  className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: "#475569" }}
                >
                  <Calendar
                    className="w-3 h-3"
                    style={{ color: "rgba(249,115,22,0.7)" }}
                  />
                  {tripType === "roundtrip" ? "Return" : "Return (Optional)"}
                </Label>
                <Input
                  id="ret-date"
                  type="date"
                  value={retDate}
                  onChange={(e) => setRetDate(e.target.value)}
                  className={`h-12 ${
                    tripType === "oneway" ? "opacity-40" : ""
                  }`}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#e2e8f0",
                    colorScheme: "dark",
                  }}
                  disabled={tripType === "oneway"}
                  data-ocid="flight.return_date.input"
                />
              </div>
            </div>
          )}

          {/* Passengers & class row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#475569" }}
              >
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
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#475569" }}
              >
                Preferred Airline
              </Label>
              <div className="relative">
                <select
                  id="preferred-airline"
                  className="w-full h-12 rounded-xl px-3 text-sm focus:outline-none appearance-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#e2e8f0",
                  }}
                  value={preferredAirline}
                  onChange={(e) => setPreferredAirline(e.target.value)}
                  data-ocid="flight.preferred_airline.select"
                >
                  <option value="" style={{ background: "#0b1437" }}>
                    Any Airline
                  </option>
                  {AIRLINES.map((a) => (
                    <option
                      key={a.code}
                      value={a.code}
                      style={{ background: "#0b1437" }}
                    >
                      {a.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "#475569" }}
                />
              </div>
            </div>
          </div>

          {/* Fare type row */}
          <div className="space-y-2">
            <Label
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#475569" }}
            >
              Fare Type
            </Label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { key: "regular", label: "Regular Fares" },
                  { key: "student", label: "Student" },
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
                    className="accent-orange-500"
                  />
                  <span
                    className="text-sm"
                    style={{
                      color:
                        fareType === key ? "#f97316" : "rgba(255,255,255,0.45)",
                      fontWeight: fareType === key ? 600 : 400,
                    }}
                  >
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Options + CTA row */}
          <div className="flex items-center justify-between pt-1">
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
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Direct Flights Only
              </span>
            </label>

            <Button
              type="submit"
              size="lg"
              className="font-bold px-8 rounded-xl border-0 text-white"
              style={{
                background:
                  loading || (tripType !== "multicity" && (!from || !to))
                    ? "rgba(249,115,22,0.4)"
                    : "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                boxShadow:
                  loading || (tripType !== "multicity" && (!from || !to))
                    ? "none"
                    : "0 6px 20px rgba(249,115,22,0.45)",
              }}
              disabled={loading || (tripType !== "multicity" && (!from || !to))}
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

      {/* Loading skeletons */}
      {loading && (
        <div className="space-y-3" data-ocid="flight.search.loading_state">
          {[1, 2, 3].map((i) => (
            <FlightSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Recent searches */}
      {!results && !loading && (
        <div
          className="rounded-2xl p-5"
          style={{
            background: "#fff",
            border: "1px solid #e8edf5",
            boxShadow: "0 2px 8px rgba(11,20,55,0.06)",
          }}
          data-ocid="flight.recent_searches.panel"
        >
          <h3 className="font-bold text-sm mb-3" style={{ color: "#0b1437" }}>
            Your Recent Searches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RECENT_SEARCHES.map((s, i) => (
              <button
                key={s.from + s.to}
                type="button"
                className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                style={{
                  border: "1px solid #e8edf5",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(11,94,215,0.3)";
                  e.currentTarget.style.background = "rgba(11,94,215,0.03)";
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(11,94,215,0.3)";
                  e.currentTarget.style.background = "rgba(11,94,215,0.03)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e8edf5";
                  e.currentTarget.style.background = "";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e8edf5";
                  e.currentTarget.style.background = "";
                }}
                onClick={() => {
                  setFrom(s.from);
                  setTo(s.to);
                }}
                data-ocid={`flight.recent_search.item.${i + 1}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(11,94,215,0.08)" }}
                >
                  <Plane className="w-4 h-4" style={{ color: "#0b5ed7" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: "#0b1437" }}>
                    {s.from} <span style={{ color: "#f97316" }}>→</span> {s.to}
                  </p>
                  <p className="text-xs" style={{ color: "#94a3b8" }}>
                    {s.date} · {s.pax}
                  </p>
                </div>
                <span
                  className="text-xs font-bold flex-shrink-0"
                  style={{ color: "#f97316" }}
                >
                  {s.price}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
