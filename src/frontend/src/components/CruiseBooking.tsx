import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Anchor,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  MapPin,
  Ship,
  Star,
  Users,
  Waves,
} from "lucide-react";
import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Cruise {
  id: string;
  name: string;
  line: string;
  ship: string;
  route: string;
  departure: string;
  nights: number;
  ports: string[];
  cabinTypes: CabinType[];
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  amenities: string[];
}

interface CabinType {
  type: string;
  price: number;
  desc: string;
  available: number;
}

type Step = "search" | "results" | "cabin" | "details" | "confirm";

// ── Mock Data ────────────────────────────────────────────────────────────────
const CRUISES: Cruise[] = [
  {
    id: "c1",
    name: "Arabian Sea Explorer",
    line: "Costa Cruises",
    ship: "Costa Smeralda",
    route: "Mumbai → Goa → Maldives → Mumbai",
    departure: "2026-04-15",
    nights: 7,
    ports: ["Mumbai", "Goa", "Maldives", "Mumbai"],
    rating: 4.6,
    reviews: 312,
    image: "🚢",
    badge: "Best Seller",
    amenities: ["Pool", "Spa", "Casino", "Fine Dining", "Live Shows"],
    cabinTypes: [
      {
        type: "Interior",
        price: 28500,
        desc: "Cozy cabin with all essentials",
        available: 12,
      },
      {
        type: "Ocean View",
        price: 42000,
        desc: "Window with ocean view",
        available: 8,
      },
      {
        type: "Balcony",
        price: 58000,
        desc: "Private balcony with sea breeze",
        available: 5,
      },
      {
        type: "Suite",
        price: 95000,
        desc: "Luxury suite with butler service",
        available: 2,
      },
    ],
  },
  {
    id: "c2",
    name: "Mediterranean Dream",
    line: "MSC Cruises",
    ship: "MSC Bellissima",
    route: "Dubai → Muscat → Abu Dhabi → Dubai",
    departure: "2026-05-10",
    nights: 5,
    ports: ["Dubai", "Muscat", "Abu Dhabi", "Dubai"],
    rating: 4.8,
    reviews: 489,
    image: "🛳️",
    badge: "Top Rated",
    amenities: [
      "Waterpark",
      "Spa",
      "Kids Club",
      "Multiple Restaurants",
      "Sports Deck",
    ],
    cabinTypes: [
      {
        type: "Interior",
        price: 22000,
        desc: "Modern interior cabin",
        available: 15,
      },
      {
        type: "Ocean View",
        price: 35000,
        desc: "Panoramic ocean view",
        available: 10,
      },
      {
        type: "Balcony",
        price: 49000,
        desc: "Spacious balcony cabin",
        available: 6,
      },
      {
        type: "Suite",
        price: 82000,
        desc: "Premium suite with lounge",
        available: 3,
      },
    ],
  },
  {
    id: "c3",
    name: "Southeast Asia Voyage",
    line: "Royal Caribbean",
    ship: "Spectrum of the Seas",
    route: "Singapore → Penang → Langkawi → Singapore",
    departure: "2026-06-20",
    nights: 6,
    ports: ["Singapore", "Penang", "Langkawi", "Singapore"],
    rating: 4.7,
    reviews: 567,
    image: "🚢",
    badge: "Hot Deal",
    amenities: ["Rock Climbing Wall", "Ice Rink", "Spa", "Casino", "Theatre"],
    cabinTypes: [
      {
        type: "Interior",
        price: 31000,
        desc: "Well-appointed interior",
        available: 9,
      },
      {
        type: "Ocean View",
        price: 46000,
        desc: "Floor-to-ceiling ocean view",
        available: 7,
      },
      {
        type: "Balcony",
        price: 63000,
        desc: "Large private balcony",
        available: 4,
      },
      {
        type: "Suite",
        price: 108000,
        desc: "Royal suite with premium perks",
        available: 2,
      },
    ],
  },
  {
    id: "c4",
    name: "Indian Ocean Escape",
    line: "Princess Cruises",
    ship: "Majestic Princess",
    route: "Chennai → Sri Lanka → Andaman → Chennai",
    departure: "2026-07-05",
    nights: 8,
    ports: ["Chennai", "Colombo", "Port Blair", "Chennai"],
    rating: 4.5,
    reviews: 234,
    image: "🛳️",
    amenities: [
      "Infinity Pool",
      "Spa",
      "Wine Bar",
      "Cooking Classes",
      "Movies Under Stars",
    ],
    cabinTypes: [
      {
        type: "Interior",
        price: 34000,
        desc: "Comfortable interior cabin",
        available: 11,
      },
      {
        type: "Ocean View",
        price: 51000,
        desc: "Ocean-facing cabin",
        available: 6,
      },
      {
        type: "Balcony",
        price: 69000,
        desc: "Private balcony retreat",
        available: 4,
      },
      {
        type: "Suite",
        price: 115000,
        desc: "Luxury suite with jacuzzi",
        available: 1,
      },
    ],
  },
];

const CRUISE_LINES = [
  "All Lines",
  "Costa Cruises",
  "MSC Cruises",
  "Royal Caribbean",
  "Princess Cruises",
  "Norwegian",
  "Carnival",
];
const NIGHT_OPTIONS = [
  "Any Duration",
  "3-5 Nights",
  "6-8 Nights",
  "9-12 Nights",
  "13+ Nights",
];
const REGIONS = [
  "All Regions",
  "Arabian Sea",
  "Mediterranean",
  "Southeast Asia",
  "Indian Ocean",
  "Caribbean",
  "Europe",
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function StarRow({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= Math.floor(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
      <span className="text-xs text-gray-400">({reviews} reviews)</span>
    </div>
  );
}

// ── Search Panel ─────────────────────────────────────────────────────────────
function SearchPanel({ onSearch }: { onSearch: () => void }) {
  const [guests, setGuests] = useState(2);

  return (
    <Card className="shadow-md border-0 bg-white">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
              Region / Destination
            </Label>
            <Select defaultValue="All Regions">
              <SelectTrigger data-ocid="cruise.region.select" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
              Sail Month
            </Label>
            <Select defaultValue="April 2026">
              <SelectTrigger data-ocid="cruise.month.select" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "April 2026",
                  "May 2026",
                  "June 2026",
                  "July 2026",
                  "August 2026",
                ].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
              Duration
            </Label>
            <Select defaultValue="Any Duration">
              <SelectTrigger data-ocid="cruise.nights.select" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NIGHT_OPTIONS.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
              Cruise Line
            </Label>
            <Select defaultValue="All Lines">
              <SelectTrigger data-ocid="cruise.line.select" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CRUISE_LINES.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 border rounded-lg px-4 py-2.5">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Guests:</span>
            <button
              type="button"
              data-ocid="cruise.guests.decrement"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="font-semibold w-4 text-center">{guests}</span>
            <button
              type="button"
              data-ocid="cruise.guests.increment"
              onClick={() => setGuests((g) => Math.min(8, g + 1))}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
          <Button
            data-ocid="cruise.search.primary_button"
            onClick={onSearch}
            className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex-1 md:flex-none"
          >
            <Ship className="w-4 h-4 mr-2" /> Search Cruises
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Cruise Card ───────────────────────────────────────────────────────────────
function CruiseCard({
  cruise,
  onSelect,
}: { cruise: Cruise; onSelect: (c: Cruise) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="w-full md:w-32 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center text-5xl flex-shrink-0">
            {cruise.image}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {cruise.name}
                  </h3>
                  {cruise.badge && (
                    <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
                      {cruise.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-blue-600 font-medium">
                  {cruise.line} · {cruise.ship}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">Starting from</div>
                <div className="text-2xl font-bold text-blue-700">
                  {formatINR(cruise.cabinTypes[0].price)}
                </div>
                <div className="text-xs text-gray-400">per person</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" /> {cruise.route}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />{" "}
                {cruise.departure}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> {cruise.nights}{" "}
                Nights
              </span>
            </div>
            <div className="mt-2">
              <StarRow rating={cruise.rating} reviews={cruise.reviews} />
            </div>
            <div className="flex items-center gap-1 mt-2 flex-wrap">
              {cruise.ports.map((p, i) => (
                <span key={p} className="flex items-center gap-1">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    {p}
                  </span>
                  {i < cruise.ports.length - 1 && (
                    <span className="text-gray-300 text-xs">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Ship Amenities
            </p>
            <div className="flex flex-wrap gap-2">
              {cruise.amenities.map((a) => (
                <span
                  key={a}
                  className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"
                >
                  <Waves className="w-3 h-3" /> {a}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            data-ocid="cruise.expand.toggle"
            onClick={() => setExpanded((e) => !e)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {expanded ? "Hide" : "View"} Amenities
          </button>
          <Button
            data-ocid="cruise.select.primary_button"
            onClick={() => onSelect(cruise)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            Select Cabin
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Cabin Selection ───────────────────────────────────────────────────────────
function CabinSelection({
  cruise,
  onBook,
  onBack,
}: { cruise: Cruise; onBook: (cabin: CabinType) => void; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        data-ocid="cruise.cabin.back_button"
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
      >
        ← Back to results
      </button>
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardContent className="p-5">
          <h2 className="text-xl font-bold">{cruise.name}</h2>
          <p className="text-blue-200 text-sm">
            {cruise.line} · {cruise.ship}
          </p>
          <div className="flex gap-4 mt-2 text-sm text-blue-100">
            <span>📍 {cruise.route}</span>
            <span>📅 {cruise.departure}</span>
            <span>🌙 {cruise.nights} Nights</span>
          </div>
        </CardContent>
      </Card>
      <h3 className="font-bold text-gray-800 text-lg">
        Choose Your Cabin Type
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cruise.cabinTypes.map((cabin) => (
          <Card
            key={cabin.type}
            className="border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">
                    {cabin.type} Cabin
                  </h4>
                  <p className="text-sm text-gray-500 mt-0.5">{cabin.desc}</p>
                  <p className="text-xs text-green-600 mt-1">
                    {cabin.available} cabins left
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-700">
                    {formatINR(cabin.price)}
                  </div>
                  <div className="text-xs text-gray-400">per person</div>
                </div>
              </div>
              <Button
                data-ocid="cruise.cabin.book_button"
                onClick={() => onBook(cabin)}
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Book {cabin.type}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Passenger Form ────────────────────────────────────────────────────────────
function PassengerForm({
  cruise: _cruise,
  cabin,
  onConfirm,
  onBack,
}: {
  cruise: Cruise;
  cabin: CabinType;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const total = cabin.price * 2 + 3500 + Math.round(cabin.price * 2 * 0.05);
  return (
    <div className="space-y-4">
      <button
        type="button"
        data-ocid="cruise.passenger.back_button"
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
      >
        ← Back to cabin selection
      </button>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5">
          <h3 className="font-bold text-gray-800 mb-4">Passenger Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Lead Passenger", "Passenger 2"].map((label) => (
              <div key={label} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-600">{label}</p>
                <Input
                  data-ocid="cruise.passenger.name_input"
                  placeholder="Full Name (as per passport)"
                  className="h-10"
                />
                <Input
                  data-ocid="cruise.passenger.passport_input"
                  placeholder="Passport Number"
                  className="h-10"
                />
                <Input
                  data-ocid="cruise.passenger.dob_input"
                  type="date"
                  className="h-10"
                />
                <Select defaultValue="Indian">
                  <SelectTrigger
                    data-ocid="cruise.passenger.nationality_select"
                    className="h-10"
                  >
                    <SelectValue placeholder="Nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Indian", "British", "American", "Australian", "UAE"].map(
                      (n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Price Summary</h4>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{cabin.type} Cabin × 2</span>
              <span>{formatINR(cabin.price * 2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Port Charges</span>
              <span>{formatINR(3500)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Service Tax (5%)</span>
              <span>{formatINR(Math.round(cabin.price * 2 * 0.05))}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 border-t pt-2 mt-1">
              <span>Total</span>
              <span className="text-blue-700">{formatINR(total)}</span>
            </div>
          </div>
          <Button
            data-ocid="cruise.passenger.submit_button"
            onClick={onConfirm}
            className="w-full mt-4 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base"
          >
            <Anchor className="w-4 h-4 mr-2" /> Confirm Booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Confirmation ──────────────────────────────────────────────────────────────
function BookingConfirmation({
  cruise,
  cabin,
  onNewSearch,
}: {
  cruise: Cruise;
  cabin: CabinType;
  onNewSearch: () => void;
}) {
  const bookingId = `FSC${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const total = cabin.price * 2 + 3500 + Math.round(cabin.price * 2 * 0.05);

  return (
    <Card className="border-0 shadow-md max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Ship className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Booking Confirmed!
        </h2>
        <p className="text-gray-500">
          Your cruise has been successfully booked
        </p>
        <div className="bg-blue-50 rounded-xl p-6 my-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Booking ID</span>
            <span className="font-bold text-blue-700 text-lg">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Cruise</span>
            <span className="font-semibold text-gray-800">{cruise.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Route</span>
            <span className="font-semibold text-gray-800 text-right max-w-xs">
              {cruise.route}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Departure</span>
            <span className="font-semibold text-gray-800">
              {cruise.departure}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Duration</span>
            <span className="font-semibold text-gray-800">
              {cruise.nights} Nights
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Cabin</span>
            <span className="font-semibold text-gray-800">{cabin.type}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-sm font-semibold text-gray-600">
              Amount Paid
            </span>
            <span className="font-bold text-green-700 text-lg">
              {formatINR(total)}
            </span>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button
            data-ocid="cruise.confirm.download_button"
            variant="outline"
            className="border-blue-200 text-blue-700"
          >
            Download Voucher
          </Button>
          <Button
            data-ocid="cruise.confirm.new_search_button"
            onClick={onNewSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Book Another Cruise
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function CruiseBooking() {
  const [step, setStep] = useState<Step>("search");
  const [selectedCruise, setSelectedCruise] = useState<Cruise | null>(null);
  const [selectedCabin, setSelectedCabin] = useState<CabinType | null>(null);
  const [priceFilter, setPriceFilter] = useState(200000);
  const [lineFilter, setLineFilter] = useState("All Lines");
  const [sortBy, setSortBy] = useState("recommended");

  const filtered = CRUISES.filter(
    (c) => lineFilter === "All Lines" || c.line === lineFilter,
  )
    .filter((c) => c.cabinTypes[0].price <= priceFilter)
    .sort((a, b) => {
      if (sortBy === "price")
        return a.cabinTypes[0].price - b.cabinTypes[0].price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cruise Booking</h2>
          <p className="text-gray-500 text-sm">
            Discover unforgettable voyages across the world's most scenic waters
          </p>
        </div>
        {step === "results" && (
          <button
            type="button"
            data-ocid="cruise.back_to_search.button"
            onClick={() => setStep("search")}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Modify Search
          </button>
        )}
      </div>

      {step === "search" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Arabian Sea", nights: "7N", from: "₹28,500", icon: "🌊" },
            { label: "Dubai Escape", nights: "5N", from: "₹22,000", icon: "🏙️" },
            { label: "SE Asia", nights: "6N", from: "₹31,000", icon: "🌴" },
            {
              label: "Indian Ocean",
              nights: "8N",
              from: "₹34,000",
              icon: "🐬",
            },
          ].map((t) => (
            <div
              key={t.label}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow text-center"
            >
              <div className="text-3xl mb-1">{t.icon}</div>
              <div className="font-semibold text-gray-800 text-sm">
                {t.label}
              </div>
              <div className="text-xs text-gray-500">
                {t.nights} · From {t.from}
              </div>
            </div>
          ))}
        </div>
      )}

      {step === "search" && <SearchPanel onSearch={() => setStep("results")} />}

      {step === "results" && (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-56 flex-shrink-0 space-y-4">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <Filter className="w-4 h-4" /> Filters
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
                Cruise Line
              </Label>
              <Select value={lineFilter} onValueChange={setLineFilter}>
                <SelectTrigger
                  data-ocid="cruise.filter.line_select"
                  className="h-9"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CRUISE_LINES.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
                Max Price: {formatINR(priceFilter)}
              </Label>
              <input
                data-ocid="cruise.filter.price_input"
                type="range"
                min={20000}
                max={200000}
                step={5000}
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
                Sort By
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-ocid="cruise.sort.select" className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price">Lowest Price</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-sm text-gray-500">
              {filtered.length} cruises found
            </p>
            {filtered.length === 0 ? (
              <div
                data-ocid="cruise.results.empty_state"
                className="text-center py-16 text-gray-400"
              >
                <Ship className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No cruises match your filters.</p>
              </div>
            ) : (
              filtered.map((c) => (
                <CruiseCard
                  key={c.id}
                  cruise={c}
                  onSelect={(selected) => {
                    setSelectedCruise(selected);
                    setStep("cabin");
                  }}
                />
              ))
            )}
          </div>
        </div>
      )}

      {step === "cabin" && selectedCruise && (
        <CabinSelection
          cruise={selectedCruise}
          onBook={(cabin) => {
            setSelectedCabin(cabin);
            setStep("details");
          }}
          onBack={() => setStep("results")}
        />
      )}

      {step === "details" && selectedCruise && selectedCabin && (
        <PassengerForm
          cruise={selectedCruise}
          cabin={selectedCabin}
          onConfirm={() => setStep("confirm")}
          onBack={() => setStep("cabin")}
        />
      )}

      {step === "confirm" && selectedCruise && selectedCabin && (
        <BookingConfirmation
          cruise={selectedCruise}
          cabin={selectedCabin}
          onNewSearch={() => {
            setStep("search");
            setSelectedCruise(null);
            setSelectedCabin(null);
          }}
        />
      )}
    </div>
  );
}
