import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Car,
  ChevronDown,
  ChevronUp,
  Filter,
  Hotel,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  UtensilsCrossed,
  Waves,
  Wifi,
} from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type RatingFilter = 0 | 3 | 4 | 5;

interface RoomGuest {
  rooms: number;
  adults: number;
  children: number;
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
  pricePerNight: number;
  originalPrice?: number;
  breakfastIncluded: boolean;
  refundable: boolean;
  amenities: string[];
  roomType: string;
  badge?: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
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
      pricePerNight: 18500,
      originalPrice: 24000,
      breakfastIncluded: true,
      refundable: true,
      amenities: ["Pool", "WiFi", "Restaurant", "Parking"],
      roomType: "Deluxe Ocean View Room",
      badge: "BEST SELLER",
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
      pricePerNight: 42000,
      breakfastIncluded: true,
      refundable: true,
      amenities: ["Pool", "WiFi", "Restaurant", "Spa"],
      roomType: "Junior Suite",
      badge: "LUXURY",
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
      pricePerNight: 8900,
      originalPrice: 11000,
      breakfastIncluded: false,
      refundable: true,
      amenities: ["Pool", "WiFi", "Restaurant"],
      roomType: "Superior King Room",
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
      pricePerNight: 4200,
      breakfastIncluded: true,
      refundable: false,
      amenities: ["WiFi", "Parking"],
      roomType: "Standard Room",
      badge: "BEST VALUE",
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
      pricePerNight: 12800,
      originalPrice: 15500,
      breakfastIncluded: true,
      refundable: true,
      amenities: ["Pool", "WiFi", "Restaurant", "Spa", "Parking"],
      roomType: "King City View Room",
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
      pricePerNight: 2800,
      breakfastIncluded: false,
      refundable: false,
      amenities: ["WiFi"],
      roomType: "Standard Room",
      badge: "CHEAPEST",
    },
  ];
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
          {[
            {
              key: "rooms" as keyof RoomGuest,
              label: "Rooms",
              hint: "",
              min: 1,
            },
            {
              key: "adults" as keyof RoomGuest,
              label: "Adults",
              hint: "12+ years",
              min: 1,
            },
            {
              key: "children" as keyof RoomGuest,
              label: "Children",
              hint: "0-11 years",
              min: 0,
            },
          ].map(({ key, label, hint, min }) => (
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
                  onClick={() => onChange({ ...value, [key]: value[key] - 1 })}
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-semibold">
                  {value[key]}
                </span>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                  onClick={() => onChange({ ...value, [key]: value[key] + 1 })}
                >
                  +
                </button>
              </div>
            </div>
          ))}
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

// ── Star Rating Display ───────────────────────────────────────────────────────
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

// ── Amenity Icon ─────────────────────────────────────────────────────────────
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

// ── Hotel Result Card ─────────────────────────────────────────────────────────
function HotelCard({
  hotel,
  nights,
  index,
}: { hotel: HotelResult; nights: number; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const total = hotel.pricePerNight * nights;

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
      data-ocid={`hotel.result.item.${index + 1}`}
    >
      <div className="flex gap-0 sm:gap-4 flex-col sm:flex-row">
        {/* Image placeholder */}
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

        {/* Details */}
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
              </div>

              {/* Review badge */}
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

            {/* Amenities */}
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
            </div>

            <div className="text-right">
              {hotel.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  ₹{hotel.originalPrice.toLocaleString("en-IN")}/night
                </p>
              )}
              <p className="font-display text-xl font-bold text-foreground">
                ₹{hotel.pricePerNight.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-muted-foreground">
                  /night
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                ₹{total.toLocaleString("en-IN")} total · {nights} night
                {nights > 1 ? "s" : ""}
              </p>
              <Button
                size="sm"
                className="mt-2 bg-primary text-primary-foreground font-semibold text-xs px-4"
                data-ocid={`hotel.book.button.${index + 1}`}
              >
                Select Room
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Expand row */}
      <div className="px-4 pb-3 flex items-center justify-between border-t border-border pt-2">
        <span className="text-xs text-muted-foreground">
          Supplier: Hotelbeds · TBO · Expedia
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
}: {
  hotels: HotelResult[];
  nights: number;
  onBack: () => void;
}) {
  const [sortBy, setSortBy] = useState<"price" | "rating" | "review">("price");
  const [filterStars, setFilterStars] = useState<RatingFilter>(0);
  const [filterBreakfast, setFilterBreakfast] = useState(false);
  const [filterRefundable, setFilterRefundable] = useState(false);
  const [maxPrice, setMaxPrice] = useState(50000);

  const sorted = [...hotels]
    .filter((h) => {
      if (filterStars > 0 && h.stars < filterStars) return false;
      if (filterBreakfast && !h.breakfastIncluded) return false;
      if (filterRefundable && !h.refundable) return false;
      if (h.pricePerNight > maxPrice) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.pricePerNight - b.pricePerNight;
      if (sortBy === "rating") return b.stars - a.stars;
      return b.reviewScore - a.reviewScore;
    });

  return (
    <div className="flex gap-5">
      {/* Filter sidebar */}
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

          {/* Star rating */}
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
                  data-ocid={"hotel.filter.stars.button"}
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

          {/* Max price */}
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

          {/* Options */}
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

      {/* Results */}
      <div className="flex-1 min-w-0">
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
  });
  const [nationality, setNationality] = useState("India");
  const [gstRates, setGstRates] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<HotelResult[] | null>(null);
  const [cityDropdown, setCityDropdown] = useState(false);

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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!destination) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setLoading(false);
      setResults(getMockHotels(destination));
    }, 1200);
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

  return (
    <div className="space-y-5" data-ocid="hotel.search.panel">
      {/* Search form */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center gap-3">
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
          className="p-5 space-y-4"
          data-ocid="hotel.search.form"
        >
          {/* Destination */}
          <div className="space-y-1 relative">
            <Label
              htmlFor="hotel-destination"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
            >
              Destination / Hotel Name
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
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
                className="h-12 pl-9 text-base font-medium"
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
                        Hotels & resorts
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dates row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label
                htmlFor="check-in"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                Check-in
              </Label>
              <Input
                id="check-in"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="h-12"
                data-ocid="hotel.checkin.input"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="check-out"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
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
                className="h-12"
                data-ocid="hotel.checkout.input"
              />
            </div>
          </div>

          {/* Rooms & Guests + Nationality row */}
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
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                Nationality
              </Label>
              <select
                id="nationality"
                className="w-full h-12 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                data-ocid="hotel.nationality.select"
              >
                <option>India</option>
                <option>UAE</option>
                <option>UK</option>
                <option>USA</option>
                <option>Singapore</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Options row */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="gst-rates"
              className="flex items-center gap-2 cursor-pointer text-sm"
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

            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground font-semibold px-8"
              disabled={loading || !destination}
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

      {/* Recent searches */}
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

      {/* Deals banner */}
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

      {/* Loading */}
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

      {/* Results */}
      {results && (
        <HotelResults
          hotels={results}
          nights={nights}
          onBack={() => setResults(null)}
        />
      )}
    </div>
  );
}
