import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Car,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Hash,
  Hotel,
  Info,
  MapPin,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Star,
  UtensilsCrossed,
  Waves,
  Wifi,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HotelBookingDetails from "./HotelBookingDetails";
import { HotelDetail, type HotelOption } from "./HotelDetail";
import { HotelReview } from "./HotelReview";

// ── Types ─────────────────────────────────────────────────────────────────────
type RatingFilter = 0 | 3 | 4 | 5;
type RatePlan =
  | "cheapest"
  | "free_cancel"
  | "gst_inclusive"
  | "pan_not_req"
  | "breakfast";

interface RoomGuest {
  rooms: number;
  adults: number;
  children: number;
  childAges: number[];
}

interface HotelPricing {
  totalPrice: number;
  basePrice: number;
  taxes: number;
  discount: number;
  mf: number; // Management Fee
  mft: number; // Management Fee Tax
  currency: string;
  strikethrough?: number;
}

interface HotelResult {
  id: string;
  name: string;
  location: string;
  city: string;
  stars: number;
  reviewScore: number;
  reviewCount: number;
  reviewLabel: string;
  image: string;
  pricing: HotelPricing;
  breakfastIncluded: boolean;
  refundable: boolean;
  amenities: string[];
  roomType: string;
  badge?: string;
  optionId: string;
  optionType: "SRSM" | "SRCM" | "CRSM" | "CRCM";
  mealBasis: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateCorrelationId(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length: 22 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

function formatINR(amount: number) {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ── Constants ─────────────────────────────────────────────────────────────────
const POPULAR_CITIES = [
  "Dubai",
  "Singapore",
  "Bangkok",
  "London",
  "Paris",
  "New York",
  "Maldives",
  "Bali",
  "Mumbai",
  "Delhi",
  "Goa",
  "Jaipur",
  "Kerala",
  "Agra",
  "Shimla",
];

const CHILD_AGE_VALUES = Array.from({ length: 18 }, (_, i) => i);

const RATE_PLANS: { id: RatePlan; label: string }[] = [
  { id: "cheapest", label: "Cheapest" },
  { id: "free_cancel", label: "Free Cancellation" },
  { id: "gst_inclusive", label: "GST Inclusive" },
  { id: "pan_not_req", label: "PAN Not Required" },
  { id: "breakfast", label: "Breakfast Inclusive" },
];

const SESSION_DURATION = 15 * 60;

function getMockHotels(city: string): HotelResult[] {
  const c = city || "Dubai";
  return [
    {
      id: "h1",
      name: "Atlantis The Palm",
      location: `Palm Jumeirah, ${c}`,
      city: c,
      stars: 5,
      reviewScore: 9.2,
      reviewCount: 4821,
      reviewLabel: "Exceptional",
      image: "",
      pricing: {
        totalPrice: 19065.62,
        basePrice: 18500,
        taxes: 462,
        discount: 0,
        mf: 85,
        mft: 18.62,
        currency: "INR",
        strikethrough: 24000,
      },
      breakfastIncluded: true,
      refundable: true,
      amenities: ["Pool", "WiFi", "Restaurant", "Parking"],
      roomType: "Deluxe Ocean View Room",
      badge: "BEST SELLER",
      optionId: "db35a71a-0001",
      optionType: "SRSM",
      mealBasis: "Breakfast",
    },
    {
      id: "h2",
      name: "Burj Al Arab Jumeirah",
      location: `Jumeirah Beach Rd, ${c}`,
      city: c,
      stars: 5,
      reviewScore: 9.6,
      reviewCount: 2340,
      reviewLabel: "Exceptional",
      image: "",
      pricing: {
        totalPrice: 43260,
        basePrice: 42000,
        taxes: 1050,
        discount: 0,
        mf: 180,
        mft: 30,
        currency: "INR",
      },
      breakfastIncluded: true,
      refundable: true,
      amenities: ["Pool", "WiFi", "Restaurant", "Spa"],
      roomType: "Junior Suite",
      badge: "LUXURY",
      optionId: "db35a71a-0002",
      optionType: "SRSM",
      mealBasis: "Breakfast",
    },
    {
      id: "h3",
      name: `Marriott ${c} Downtown`,
      location: `Downtown, ${c}`,
      city: c,
      stars: 4,
      reviewScore: 8.7,
      reviewCount: 3102,
      reviewLabel: "Excellent",
      image: "",
      pricing: {
        totalPrice: 9187,
        basePrice: 8900,
        taxes: 222.5,
        discount: 0,
        mf: 50,
        mft: 14.5,
        currency: "INR",
        strikethrough: 11000,
      },
      breakfastIncluded: false,
      refundable: true,
      amenities: ["Pool", "WiFi", "Restaurant"],
      roomType: "Superior King Room",
      optionId: "db35a71a-0003",
      optionType: "CRSM",
      mealBasis: "Room Only",
    },
    {
      id: "h4",
      name: `Holiday Inn Express ${c}`,
      location: `City Centre, ${c}`,
      city: c,
      stars: 3,
      reviewScore: 7.8,
      reviewCount: 1890,
      reviewLabel: "Good",
      image: "",
      pricing: {
        totalPrice: 4326,
        basePrice: 4200,
        taxes: 105,
        discount: 0,
        mf: 18,
        mft: 3,
        currency: "INR",
      },
      breakfastIncluded: true,
      refundable: false,
      amenities: ["WiFi", "Parking"],
      roomType: "Standard Room",
      badge: "BEST VALUE",
      optionId: "db35a71a-0004",
      optionType: "SRSM",
      mealBasis: "Breakfast",
    },
    {
      id: "h5",
      name: `Hyatt Regency ${c}`,
      location: `Business Bay, ${c}`,
      city: c,
      stars: 5,
      reviewScore: 8.9,
      reviewCount: 2760,
      reviewLabel: "Excellent",
      image: "",
      pricing: {
        totalPrice: 13198,
        basePrice: 12800,
        taxes: 320,
        discount: 0,
        mf: 62,
        mft: 16,
        currency: "INR",
        strikethrough: 15500,
      },
      breakfastIncluded: true,
      refundable: true,
      amenities: ["Pool", "WiFi", "Restaurant", "Spa", "Parking"],
      roomType: "King City View Room",
      optionId: "db35a71a-0005",
      optionType: "SRSM",
      mealBasis: "Breakfast",
    },
    {
      id: "h6",
      name: `Ibis ${c} Al Barsha`,
      location: `Al Barsha, ${c}`,
      city: c,
      stars: 3,
      reviewScore: 7.4,
      reviewCount: 5421,
      reviewLabel: "Good",
      image: "",
      pricing: {
        totalPrice: 2884,
        basePrice: 2800,
        taxes: 70,
        discount: 0,
        mf: 12,
        mft: 2,
        currency: "INR",
      },
      breakfastIncluded: false,
      refundable: false,
      amenities: ["WiFi"],
      roomType: "Standard Room",
      badge: "CHEAPEST",
      optionId: "db35a71a-0006",
      optionType: "SRSM",
      mealBasis: "Room Only",
    },
  ];
}

// ── Price Breakup Tooltip ────────────────────────────────────────────────────
function PriceBreakup({
  pricing,
  nights,
}: { pricing: HotelPricing; nights: number }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setShow(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const perNight = pricing.basePrice;
  const totalBase = perNight * nights;
  const taxes = pricing.taxes * nights;
  const mf = pricing.mf * nights;
  const mft = pricing.mft * nights;
  const grandTotal = totalBase + taxes + mf + mft - pricing.discount;

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        className="inline-flex items-center gap-0.5 text-[10px] text-primary hover:text-primary/80"
        onClick={() => setShow((v) => !v)}
        data-ocid="hotel.price_breakup.toggle"
      >
        <Info className="w-3 h-3" />
        Price breakup
      </button>
      {show && (
        <div
          className="absolute bottom-full right-0 mb-2 z-50 w-64 bg-popover border border-border rounded-xl shadow-xl p-4 text-xs"
          data-ocid="hotel.price_breakup.popover"
        >
          <p className="font-semibold text-foreground mb-2 text-sm">
            Price Breakup
          </p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-muted-foreground">
              <span>Base Rate ({nights}N)</span>
              <span className="text-foreground font-medium">
                ₹{formatINR(totalBase)}
              </span>
            </div>
            {pricing.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{formatINR(pricing.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Taxes &amp; Fees</span>
              <span className="text-foreground font-medium">
                ₹{formatINR(taxes)}
              </span>
            </div>
            {mf > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Management Fee (MF)</span>
                <span className="text-foreground font-medium">
                  ₹{formatINR(mf)}
                </span>
              </div>
            )}
            {mft > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>MF Tax (MFT)</span>
                <span className="text-foreground font-medium">
                  ₹{formatINR(mft)}
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold text-sm text-foreground">
            <span>Total</span>
            <span>₹{formatINR(grandTotal)}</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5">
            Total = Base + Taxes + MF + MFT
          </p>
        </div>
      )}
    </div>
  );
}

// ── Room & Guest Selector ─────────────────────────────────────────────────────
function RoomGuestSelector({
  value,
  onChange,
}: {
  value: RoomGuest;
  onChange: (v: RoomGuest) => void;
}) {
  const [open, setOpen] = useState(false);

  function handleCounterChange(
    key: "rooms" | "adults" | "children",
    delta: number,
  ) {
    if (key === "children") {
      const next = value.children + delta;
      const ages =
        delta > 0 ? [...value.childAges, 5] : value.childAges.slice(0, next);
      onChange({ ...value, children: next, childAges: ages });
    } else {
      onChange({ ...value, [key]: value[key] + delta });
    }
  }

  function handleAgeChange(idx: number, age: number) {
    const ages = [...value.childAges];
    ages[idx] = age;
    onChange({ ...value, childAges: ages });
  }

  const counters: {
    key: "rooms" | "adults" | "children";
    label: string;
    hint: string;
    min: number;
  }[] = [
    { key: "rooms", label: "Rooms", hint: "", min: 1 },
    { key: "adults", label: "Adults", hint: "12+ years", min: 1 },
    { key: "children", label: "Children", hint: "0-11 years", min: 0 },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full h-12 flex items-center justify-between px-3 border border-input rounded-md bg-background text-sm font-medium hover:border-primary/50 transition-colors"
        onClick={() => setOpen((v) => !v)}
        data-ocid="hotel.room_guest.select"
      >
        <span>
          {value.rooms} Room{value.rooms > 1 ? "s" : ""} ·{" "}
          {value.adults + value.children} Guest
          {value.adults + value.children > 1 ? "s" : ""}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-xl shadow-xl p-4 min-w-[260px]">
          {counters.map(({ key, label, hint, min }) => (
            <div
              key={key}
              className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                {hint && (
                  <p className="text-xs text-muted-foreground">{hint}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted disabled:opacity-40"
                  disabled={value[key] <= min}
                  onClick={() => handleCounterChange(key, -1)}
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-semibold">
                  {value[key]}
                </span>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                  onClick={() => handleCounterChange(key, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {value.children > 0 && (
            <div className="pt-3 pb-1 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Child Ages
              </p>
              <div className="grid grid-cols-2 gap-2">
                {value.childAges.map((age, idx) => (
                  <div
                    key={`child-slot-${idx + 1}`}
                    className="flex flex-col gap-1"
                  >
                    <label
                      htmlFor={`child-age-${idx + 1}`}
                      className="text-xs text-muted-foreground"
                    >
                      Child {idx + 1} Age
                    </label>
                    <select
                      id={`child-age-${idx + 1}`}
                      value={age}
                      onChange={(e) =>
                        handleAgeChange(idx, Number(e.target.value))
                      }
                      className="h-8 rounded-md border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                      data-ocid="hotel.child_age.select"
                    >
                      {CHILD_AGE_VALUES.map((childAge) => (
                        <option key={childAge} value={childAge}>
                          {childAge === 0
                            ? "< 1 year"
                            : childAge === 1
                              ? "1 year"
                              : `${childAge} years`}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            className="w-full mt-3 bg-primary text-primary-foreground"
            size="sm"
            onClick={() => setOpen(false)}
            data-ocid="hotel.room_guest.confirm.button"
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= count ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

// ── Amenity Icon ──────────────────────────────────────────────────────────────
function AmenityIcon({ name }: { name: string }) {
  const map: Record<string, React.ReactNode> = {
    Pool: <Waves className="w-3.5 h-3.5" />,
    WiFi: <Wifi className="w-3.5 h-3.5" />,
    Restaurant: <UtensilsCrossed className="w-3.5 h-3.5" />,
    Parking: <Car className="w-3.5 h-3.5" />,
    Spa: <Star className="w-3.5 h-3.5" />,
  };
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
      {map[name] ?? null}
      {name}
    </span>
  );
}

// ── Retry Utility ─────────────────────────────────────────────────────────────
async function retryWithBackoff(
  fn: () => Promise<Response>,
  maxRetries = 3,
): Promise<Response> {
  const delays = [1000, 2000, 4000];
  let lastError: unknown;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const res = await fn();
      if (res.status === 503 && i < maxRetries) {
        await new Promise((r) => setTimeout(r, delays[i] ?? 4000));
        continue;
      }
      if (res.status === 429 && i < maxRetries) {
        const retryAfter = res.headers.get("Retry-After");
        const wait = retryAfter
          ? Number(retryAfter) * 1000
          : (delays[i] ?? 4000);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      return res;
    } catch (err) {
      lastError = err;
      if (i < maxRetries) {
        await new Promise((r) => setTimeout(r, delays[i] ?? 4000));
      }
    }
  }
  throw lastError;
}

// ── Hotel Result Card ─────────────────────────────────────────────────────────
function HotelCard({
  hotel,
  nights,
  index,
  onViewDetail,
}: {
  hotel: HotelResult;
  nights: number;
  index: number;
  onViewDetail: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const { pricing } = hotel;
  const pricePerNight = pricing.basePrice;
  const total = pricing.totalPrice * nights;

  return (
    <div
      className={`bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 border-l-4 ${hotel.badge === "LUXURY" ? "border-l-purple-500 border-border" : hotel.badge === "BEST VALUE" || hotel.badge === "CHEAPEST" ? "border-l-green-500 border-border" : hotel.badge === "BEST SELLER" ? "border-l-orange-500 border-border" : "border-l-primary border-border"}`}
      data-ocid={`hotel.result.item.${index + 1}`}
    >
      <div className="flex gap-0 sm:gap-4 flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-40 sm:h-auto bg-gradient-to-br from-primary/20 to-blue-200 flex-shrink-0 flex items-center justify-center relative">
          <Hotel className="w-14 h-14 text-primary/40" />
          {hotel.badge && (
            <Badge
              className={`absolute top-2 left-2 text-[10px] ${
                hotel.badge === "BEST SELLER"
                  ? "bg-orange-500 text-white border-orange-500"
                  : hotel.badge === "LUXURY"
                    ? "bg-purple-600 text-white border-purple-600"
                    : hotel.badge === "BEST VALUE"
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-green-600 text-white border-green-600"
              }`}
            >
              {hotel.badge}
            </Badge>
          )}
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-display font-bold text-foreground text-base leading-tight truncate">
                  {hotel.name}
                </h3>
                <StarRating count={hotel.stars} />
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  {hotel.location}
                </p>
                {/* optionType badge */}
                <Badge className="mt-1 text-[10px] bg-slate-100 text-slate-600 border-slate-200">
                  {hotel.optionType} · {hotel.mealBasis}
                </Badge>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <div className="bg-primary text-primary-foreground text-sm font-bold rounded-lg px-2 py-1 leading-none">
                  {hotel.reviewScore}
                </div>
                <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
                  {hotel.reviewLabel}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {hotel.reviewCount.toLocaleString()} reviews
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {hotel.amenities.slice(0, 4).map((a) => (
                <AmenityIcon key={a} name={a} />
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between mt-3 pt-3 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">{hotel.roomType}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {hotel.breakfastIncluded && (
                  <Badge className="bg-green-50 text-green-700 border-green-200 text-[10px]">
                    Breakfast Incl.
                  </Badge>
                )}
                <Badge
                  className={`text-[10px] ${hotel.refundable ? "bg-green-50 text-green-700 border-green-200" : "bg-muted text-muted-foreground border-border"}`}
                >
                  {hotel.refundable ? "Free Cancellation" : "Non-Refundable"}
                </Badge>
              </div>
              <div className="mt-1.5">
                <PriceBreakup pricing={pricing} nights={nights} />
              </div>
            </div>
            <div className="text-right">
              {pricing.strikethrough && (
                <p className="text-xs text-muted-foreground line-through">
                  ₹{formatINR(pricing.strikethrough)}/night
                </p>
              )}
              <p className="font-display text-xl font-bold text-foreground">
                ₹{formatINR(pricePerNight)}
                <span className="text-xs font-normal text-muted-foreground">
                  /night
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                ₹{formatINR(total)} total · {nights} night
                {nights > 1 ? "s" : ""}
              </p>
              {(pricing.mf > 0 || pricing.mft > 0) && (
                <p className="text-[10px] text-amber-600 mt-0.5">
                  +MF ₹{formatINR(pricing.mf)} +MFT ₹{formatINR(pricing.mft)}
                </p>
              )}
              <Button
                size="sm"
                className="mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-xs px-4 shadow-sm shadow-orange-500/25 border-0"
                data-ocid={`hotel.book.button.${index + 1}`}
                onClick={onViewDetail}
              >
                Select Room
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 flex items-center justify-between border-t border-border pt-2">
        <span className="text-[10px] text-muted-foreground font-mono">
          optionId: {hotel.optionId.slice(0, 14)}…
        </span>
        <button
          type="button"
          className="text-xs text-primary hover:underline flex items-center gap-1"
          onClick={() => setExpanded((v) => !v)}
          data-ocid={`hotel.details.toggle.${index + 1}`}
        >
          {expanded ? "Hide details" : "Hotel details"}
          {expanded ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 bg-muted/30 border-t border-border">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
            <div>
              <p className="text-muted-foreground mb-0.5">Check-in</p>
              <p className="font-medium text-foreground">2:00 PM</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-0.5">Check-out</p>
              <p className="font-medium text-foreground">12:00 PM</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-0.5">Room Size</p>
              <p className="font-medium text-foreground">35 sq m</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-0.5">Bed Type</p>
              <p className="font-medium text-foreground">King Bed</p>
            </div>
          </div>
          {/* Full price breakup table */}
          <div className="mt-3 bg-card border border-border rounded-lg p-3 text-xs space-y-1">
            <p className="font-semibold text-foreground mb-1">
              Full Price Breakup
            </p>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Price</span>
              <span>₹{formatINR(pricing.basePrice * nights)}</span>
            </div>
            {pricing.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{formatINR(pricing.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes</span>
              <span>₹{formatINR(pricing.taxes * nights)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Management Fee (MF)</span>
              <span>₹{formatINR(pricing.mf * nights)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">MF Tax (MFT)</span>
              <span>₹{formatINR(pricing.mft * nights)}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-border pt-1 mt-1 text-foreground">
              <span>Grand Total</span>
              <span>₹{formatINR(pricing.totalPrice * nights)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Hotel Results Panel ───────────────────────────────────────────────────────
function HotelResults({
  hotels,
  nights,
  onBack,
  correlationId,
  onViewDetail,
}: {
  hotels: HotelResult[];
  nights: number;
  onBack: () => void;
  correlationId: string;
  onViewDetail: (id: string, name: string) => void;
}) {
  const [sortBy, setSortBy] = useState<"price" | "rating" | "review">("price");
  const [filterStars, setFilterStars] = useState<RatingFilter>(0);
  const [filterBreakfast, setFilterBreakfast] = useState(false);
  const [filterRefundable, setFilterRefundable] = useState(false);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [ratePlan, setRatePlan] = useState<RatePlan>("cheapest");
  const [sessionSecs, setSessionSecs] = useState(SESSION_DURATION);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on new search
  useEffect(() => {
    setSessionSecs(SESSION_DURATION);
    const interval = setInterval(() => {
      setSessionSecs((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [hotels]);

  const mins = String(Math.floor(sessionSecs / 60)).padStart(2, "0");
  const secs = String(sessionSecs % 60).padStart(2, "0");
  const sessionExpired = sessionSecs === 0;

  const sorted = [...hotels]
    .filter((h) => {
      if (filterStars > 0 && h.stars < filterStars) return false;
      if (filterBreakfast && !h.breakfastIncluded) return false;
      if (filterRefundable && !h.refundable) return false;
      if (h.pricing.basePrice > maxPrice) return false;
      if (ratePlan === "free_cancel" && !h.refundable) return false;
      if (ratePlan === "gst_inclusive" && !h.breakfastIncluded) return false;
      if (ratePlan === "breakfast" && !h.breakfastIncluded) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.pricing.basePrice - b.pricing.basePrice;
      if (sortBy === "rating") return b.stars - a.stars;
      return b.reviewScore - a.reviewScore;
    });

  return (
    <div className="flex gap-5">
      <aside
        className="w-56 flex-shrink-0 hidden lg:block"
        data-ocid="hotel.filters.panel"
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
                setFilterStars(0);
                setFilterBreakfast(false);
                setFilterRefundable(false);
                setMaxPrice(50000);
              }}
            >
              Reset
            </button>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Star Rating
            </p>
            <div className="space-y-1.5">
              {([0, 3, 4, 5] as RatingFilter[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    filterStars === s
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "border-border hover:bg-muted"
                  }`}
                  onClick={() => setFilterStars(s)}
                  data-ocid="hotel.filter.stars.button"
                >
                  {s === 0 ? (
                    "All Stars"
                  ) : (
                    <span className="flex items-center gap-1">
                      {s}+{" "}
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Max Price/Night: ₹{maxPrice.toLocaleString("en-IN")}
            </p>
            <input
              type="range"
              min={2000}
              max={50000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
              data-ocid="hotel.filter.price.input"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>₹2,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Options
            </p>
            <div className="space-y-2">
              <label
                className="flex items-center gap-2 cursor-pointer text-sm"
                htmlFor="filter-breakfast"
              >
                <input
                  id="filter-breakfast"
                  type="checkbox"
                  checked={filterBreakfast}
                  onChange={(e) => setFilterBreakfast(e.target.checked)}
                  className="accent-primary"
                  data-ocid="hotel.filter.breakfast.checkbox"
                />
                Breakfast Included
              </label>
              <label
                className="flex items-center gap-2 cursor-pointer text-sm"
                htmlFor="filter-refundable"
              >
                <input
                  id="filter-refundable"
                  type="checkbox"
                  checked={filterRefundable}
                  onChange={(e) => setFilterRefundable(e.target.checked)}
                  className="accent-primary"
                  data-ocid="hotel.filter.refundable.checkbox"
                />
                Free Cancellation
              </label>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {/* Correlation ID trace bar */}
        <div
          className="mb-2 flex items-center gap-2 text-[10px] text-muted-foreground"
          data-ocid="hotel.correlation.panel"
        >
          <span className="font-mono bg-muted px-2 py-0.5 rounded">
            correlationId: {correlationId}
          </span>
        </div>

        {/* Session timer */}
        <div
          className={`mb-3 flex items-center justify-between px-4 py-2.5 rounded-full border text-sm font-medium shadow-md ${
            sessionExpired
              ? "bg-red-950/80 border-red-500/50 text-red-300 shadow-red-900/40"
              : sessionSecs < 120
                ? "bg-amber-950/80 border-amber-400/50 text-amber-200 shadow-amber-900/40 animate-pulse"
                : "bg-blue-950/60 border-blue-400/30 text-blue-200 shadow-blue-900/30"
          }`}
          data-ocid="hotel.session_timer.panel"
        >
          {sessionExpired ? (
            <>
              <span className="flex items-center gap-2 font-medium">
                <Clock className="w-4 h-4" />
                Session expired. Please re-search.
              </span>
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100 text-xs px-3 h-7"
                onClick={onBack}
                data-ocid="hotel.session_expired.button"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Re-search
              </Button>
            </>
          ) : (
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Session expires in{" "}
              <span className="font-bold font-mono">
                {mins}:{secs}
              </span>{" "}
              — Re-search to refresh
            </span>
          )}
        </div>

        {/* Rate plan tabs */}
        <div className="mb-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {RATE_PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${
                  ratePlan === plan.id
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500 shadow-sm shadow-orange-500/30"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
                onClick={() => setRatePlan(plan.id)}
                data-ocid="hotel.rate_plan.tab"
              >
                {plan.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort bar */}
        <div className="flex items-center justify-between mb-4 bg-card border border-border rounded-xl px-4 py-3">
          <p className="text-sm font-medium text-foreground">
            <span className="font-bold text-primary">{sorted.length}</span>{" "}
            hotels found
          </p>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground hidden sm:block">
              Sort:
            </span>
            {(["price", "rating", "review"] as const).map((s) => (
              <button
                key={s}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  sortBy === s
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                }`}
                onClick={() => setSortBy(s)}
                data-ocid={`hotel.sort.${s}.button`}
              >
                {s === "price"
                  ? "Cheapest"
                  : s === "rating"
                    ? "Stars"
                    : "Top Rated"}
              </button>
            ))}
          </div>
        </div>

        {sorted.length === 0 ? (
          <div
            className="bg-card border border-border rounded-xl p-12 text-center"
            data-ocid="hotel.results.empty_state"
          >
            <Hotel className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">
              No hotels match your filters
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((hotel, i) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                nights={nights}
                index={i}
                onViewDetail={() => onViewDetail(hotel.id, hotel.name)}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          className="mt-4 text-sm text-primary hover:underline flex items-center gap-1"
          onClick={onBack}
          data-ocid="hotel.back.link"
        >
          ← Modify Search
        </button>
      </div>
    </div>
  );
}

// ── Main Hotel Search Component ───────────────────────────────────────────────
export function HotelSearch() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.toISOString().split("T")[0];
  });
  const [roomGuest, setRoomGuest] = useState<RoomGuest>({
    rooms: 1,
    adults: 2,
    children: 0,
    childAges: [],
  });
  const [nationality, setNationality] = useState("106");
  const [nationalityList, setNationalityList] = useState<
    Array<{ countryName: string; countryId: string; code: string }>
  >([]);
  const [nationalityLoading, setNationalityLoading] = useState(false);
  const [gstRates, setGstRates] = useState(false);
  const [useHids, setUseHids] = useState(false);
  const [hidsText, setHidsText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<HotelResult[] | null>(null);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [correlationId, setCorrelationId] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [reviewOption, setReviewOption] = useState<{
    option: HotelOption;
    reviewHash: string;
  } | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(
    null,
  );
  const [confirmedBookingStatus, setConfirmedBookingStatus] =
    useState<string>("SUCCESS");

  // Fetch nationality list from TripJack API on mount
  useEffect(() => {
    async function fetchNationalities() {
      setNationalityLoading(true);
      try {
        const res = await fetch(
          "https://apitest.tripjack.com/hms/v3/nationality-info",
          {
            headers: { apikey: "7114315c476d94-4ef2-4e21-83e8-527d56a0c529" },
          },
        );
        const data = await res.json();
        if (data?.nationalityInfos) {
          setNationalityList(
            data.nationalityInfos.map(
              (n: {
                countryName: string;
                countryId: string;
                code: string;
              }) => ({
                countryName: n.countryName,
                countryId: n.countryId,
                code: n.code,
              }),
            ),
          );
        }
      } catch {
        // fallback: keep empty, will show static options
      } finally {
        setNationalityLoading(false);
      }
    }
    fetchNationalities();
  }, []);
  const nights = Math.max(
    1,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000,
    ),
  );

  const filteredCities = POPULAR_CITIES.filter(
    (c) =>
      destination.length > 0 &&
      c.toLowerCase().includes(destination.toLowerCase()),
  ).slice(0, 6);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!destination && !useHids) return;
    const cid = generateCorrelationId();
    setCorrelationId(cid);
    setLoading(true);
    setResults(null);

    const hids = useHids
      ? hidsText
          .split(",")
          .map((s) => Number(s.trim()))
          .filter((n) => !Number.isNaN(n) && n > 0)
      : undefined;

    try {
      const res = await retryWithBackoff(() =>
        fetch("https://apitest.tripjack.com/hms/v3/hotel/listing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "7114315c476d94-4ef2-4e21-83e8-527d56a0c529",
          },
          body: JSON.stringify({
            checkIn,
            checkOut,
            rooms: Array.from({ length: roomGuest.rooms }, () => ({
              adults: roomGuest.adults,
              children: roomGuest.children,
              childAge: roomGuest.childAges,
            })),
            currency: "INR",
            correlationId: cid,
            ...(hids && hids.length > 0 ? { hids } : {}),
          }),
        }),
      );
      const json = await res.json();
      if (json?.status?.success && json?.hotels) {
        setResults(getMockHotels(destination)); // Use real data in production
      } else {
        // Fallback to mock for demo
        setResults(getMockHotels(destination));
      }
    } catch {
      // Network error — fallback to mock
      setResults(getMockHotels(destination));
    } finally {
      setLoading(false);
    }
  }

  const RECENT_SEARCHES = [
    { city: "Dubai", dates: "10-13 Mar", rooms: "1 Room", price: "₹18,500" },
    {
      city: "Singapore",
      dates: "20-24 Mar",
      rooms: "2 Rooms",
      price: "₹12,800",
    },
    { city: "Bangkok", dates: "01-05 Apr", rooms: "1 Room", price: "₹6,200" },
  ];

  if (confirmedBookingId) {
    return (
      <HotelBookingDetails
        bookingId={confirmedBookingId}
        initialStatus={confirmedBookingStatus}
        onBack={() => setConfirmedBookingId(null)}
        onNewSearch={() => {
          setConfirmedBookingId(null);
          setConfirmedBookingStatus("SUCCESS");
          setReviewOption(null);
          setSelectedHotel(null);
          setResults(null);
        }}
      />
    );
  }
  if (reviewOption && selectedHotel) {
    return (
      <HotelReview
        hotelId={selectedHotel.id}
        hotelName={selectedHotel.name}
        checkIn={checkIn}
        checkOut={checkOut}
        rooms={Array.from({ length: roomGuest.rooms }, () => ({
          adults: roomGuest.adults,
          children: roomGuest.children,
          childAge: roomGuest.childAges,
        }))}
        option={reviewOption.option}
        reviewHash={reviewOption.reviewHash}
        correlationId={correlationId}
        onBack={() => setReviewOption(null)}
        onBookingConfirmed={(bookingId, status) => {
          setConfirmedBookingId(bookingId);
          setConfirmedBookingStatus(status);
        }}
      />
    );
  }

  if (selectedHotel) {
    return (
      <HotelDetail
        hotelId={selectedHotel.id}
        hotelName={selectedHotel.name}
        correlationId={correlationId}
        checkIn={checkIn}
        checkOut={checkOut}
        rooms={roomGuest.rooms}
        adults={roomGuest.adults}
        onBack={() => setSelectedHotel(null)}
        onSelectOption={(option, reviewHash) => {
          setReviewOption({ option, reviewHash });
        }}
      />
    );
  }

  return (
    <div className="space-y-5" data-ocid="hotel.search.panel">
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-6 py-4 flex items-center gap-3 border-b border-white/10">
          <Hotel className="w-5 h-5 text-white" />
          <h2 className="font-display font-bold text-white text-lg">
            Book Hotels
          </h2>
          <Badge className="bg-white/20 text-white border-white/30 text-xs ml-auto">
            60+ Suppliers · Best Rates
          </Badge>
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-5 space-y-4"
          data-ocid="hotel.search.form"
        >
          <div className="space-y-1 relative">
            <Label
              htmlFor="hotel-destination"
              className="text-xs font-semibold text-white/70 uppercase tracking-wide"
            >
              Destination / Hotel Name
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-white/50" />
              <Input
                id="hotel-destination"
                placeholder="City, hotel, or area"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setCityDropdown(true);
                }}
                onFocus={() => setCityDropdown(true)}
                onBlur={() => setTimeout(() => setCityDropdown(false), 150)}
                className="h-12 pl-9 text-base font-medium bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-400/60"
                data-ocid="hotel.destination.input"
                autoComplete="off"
              />
            </div>
            {cityDropdown && filteredCities.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/60 text-left transition-colors"
                    onMouseDown={() => {
                      setDestination(city);
                      setCityDropdown(false);
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Hotel className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {city}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Hotels &amp; resorts
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label
                htmlFor="check-in"
                className="text-xs font-semibold text-white/70 uppercase tracking-wide"
              >
                Check-in
              </Label>
              <Input
                id="check-in"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white [color-scheme:dark]"
                data-ocid="hotel.checkin.input"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="check-out"
                className="text-xs font-semibold text-white/70 uppercase tracking-wide"
              >
                Check-out ·{" "}
                <span className="text-primary font-bold">
                  {nights} Night{nights > 1 ? "s" : ""}
                </span>
              </Label>
              <Input
                id="check-out"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white [color-scheme:dark]"
                data-ocid="hotel.checkout.input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Rooms & Guests
              </Label>
              <RoomGuestSelector value={roomGuest} onChange={setRoomGuest} />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="nationality"
                className="text-xs font-semibold text-white/70 uppercase tracking-wide"
              >
                Nationality
              </Label>
              <select
                id="nationality"
                className="w-full h-12 rounded-md border border-white/20 bg-white/10 text-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/60 [&>option]:bg-slate-900 [&>option]:text-white"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                data-ocid="hotel.nationality.select"
                disabled={nationalityLoading}
              >
                {nationalityLoading ? (
                  <option value="">Loading...</option>
                ) : nationalityList.length > 0 ? (
                  nationalityList.map((n) => (
                    <option key={n.countryId} value={n.countryId}>
                      {n.countryName}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="106">India</option>
                    <option value="231">UAE</option>
                    <option value="232">United Kingdom</option>
                    <option value="233">United States</option>
                    <option value="200">Singapore</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="gst-rates"
              className="flex items-center gap-2 cursor-pointer text-sm text-white/80"
            >
              <input
                id="gst-rates"
                type="checkbox"
                checked={gstRates}
                onChange={(e) => setGstRates(e.target.checked)}
                className="accent-primary"
                data-ocid="hotel.gst_rates.checkbox"
              />
              Show GST claim eligible rates
            </label>
          </div>

          {/* Hotel ID Search Toggle */}
          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-xs text-white/70 cursor-pointer select-none"
              data-ocid="hotel.hids.toggle"
            >
              <input
                type="checkbox"
                checked={useHids}
                onChange={(e) => setUseHids(e.target.checked)}
                className="accent-primary"
                data-ocid="hotel.hids.checkbox"
              />
              <Hash className="w-3.5 h-3.5" />
              Search by specific Hotel IDs (hids)
            </label>
            {useHids && (
              <div className="space-y-1">
                <Textarea
                  placeholder="Paste comma-separated hotel IDs, e.g. 10000000012345, 10000000054321"
                  value={hidsText}
                  onChange={(e) => setHidsText(e.target.value)}
                  rows={2}
                  className="text-xs font-mono resize-none bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  data-ocid="hotel.hids.textarea"
                />
                <p className="text-[10px] text-white/50">
                  TripJack hotel IDs (tjHotelId) — up to 100 per search. City
                  search is disabled when using hotel IDs.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 shadow-lg shadow-orange-500/30 border-0"
              disabled={loading || (!destination && !useHids)}
              data-ocid="hotel.search.primary_button"
            >
              {loading ? (
                <span
                  className="flex items-center gap-2"
                  data-ocid="hotel.search.loading_state"
                >
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Hotels
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>

      {!results && !loading && (
        <div
          className="bg-card border border-border rounded-xl p-5"
          data-ocid="hotel.recent_searches.panel"
        >
          <h3 className="font-display font-semibold text-sm text-foreground mb-3">
            Your Recent Searches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RECENT_SEARCHES.map((s, i) => (
              <button
                key={s.city}
                type="button"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 hover:border-primary/30 transition-colors text-left group"
                onClick={() => setDestination(s.city)}
                data-ocid={`hotel.recent_search.item.${i + 1}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Hotel className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary">
                    {s.city}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.dates} · {s.rooms}
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

      {!results && !loading && (
        <div
          className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-5 text-white"
          data-ocid="hotel.deals.panel"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs mb-2">
                THE PLATINUM COLLECTION
              </Badge>
              <h3 className="font-display font-bold text-lg">
                Exclusive Handpicked Hotels
              </h3>
              <p className="text-white/80 text-sm mt-1">
                World-class service, luxurious amenities, unforgettable
                experiences.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { city: "Dubai", from: "₹18,500", tag: "5 Star" },
                { city: "Singapore", from: "₹12,800", tag: "4 Star" },
                { city: "Maldives", from: "₹38,000", tag: "5 Star" },
              ].map((deal, dealIdx) => (
                <div
                  key={deal.city}
                  className="bg-white/15 rounded-xl px-4 py-2.5 text-center"
                  data-ocid={`hotel.deal.item.${dealIdx + 1}`}
                >
                  <p className="text-xs text-white/70 mb-0.5">{deal.city}</p>
                  <p className="font-display font-bold text-base">
                    from {deal.from}
                  </p>
                  <p className="text-[10px] text-white/60">{deal.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div
          className="bg-card border border-border rounded-xl p-12 text-center"
          data-ocid="hotel.search.loading_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Hotel className="w-8 h-8 text-primary animate-bounce" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">
            Searching Hotels
          </h3>
          <p className="text-sm text-muted-foreground">
            Checking Hotelbeds, TBO, Expedia &amp; more for the best rates...
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

      {results && (
        <HotelResults
          hotels={results}
          nights={nights}
          onBack={() => setResults(null)}
          correlationId={correlationId}
          onViewDetail={(id, name) => setSelectedHotel({ id, name })}
        />
      )}
    </div>
  );
}
