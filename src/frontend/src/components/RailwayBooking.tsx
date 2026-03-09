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
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  MapPin,
  Train,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface TrainResult {
  id: string;
  number: string;
  name: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  days: string[];
  classes: TrainClass[];
  type: string;
  badge?: string;
  rating: number;
}

interface TrainClass {
  code: string;
  name: string;
  price: number;
  available: number;
}

type Step = "search" | "results" | "class" | "passengers" | "confirm";

// ── Mock Data ─────────────────────────────────────────────────────────────────
const TRAINS: TrainResult[] = [
  {
    id: "t1",
    number: "12301",
    name: "Rajdhani Express",
    from: "New Delhi",
    to: "Mumbai Central",
    depart: "16:55",
    arrive: "08:35+1",
    duration: "15h 40m",
    days: ["Mon", "Wed", "Fri", "Sun"],
    type: "Superfast",
    badge: "Top Pick",
    rating: 4.7,
    classes: [
      { code: "1A", name: "First AC", price: 4850, available: 6 },
      { code: "2A", name: "Second AC", price: 2870, available: 14 },
      { code: "3A", name: "Third AC", price: 1985, available: 32 },
    ],
  },
  {
    id: "t2",
    number: "12951",
    name: "Mumbai Rajdhani",
    from: "New Delhi",
    to: "Mumbai Central",
    depart: "17:00",
    arrive: "09:40+1",
    duration: "16h 40m",
    days: ["Daily"],
    type: "Rajdhani",
    badge: "Popular",
    rating: 4.5,
    classes: [
      { code: "1A", name: "First AC", price: 4995, available: 3 },
      { code: "2A", name: "Second AC", price: 2940, available: 21 },
      { code: "3A", name: "Third AC", price: 2050, available: 44 },
    ],
  },
  {
    id: "t3",
    number: "22691",
    name: "Rajdhani Express",
    from: "New Delhi",
    to: "Bangalore City",
    depart: "20:30",
    arrive: "06:20+2",
    duration: "33h 50m",
    days: ["Tue", "Thu", "Sat"],
    type: "Superfast",
    rating: 4.4,
    classes: [
      { code: "2A", name: "Second AC", price: 3450, available: 8 },
      { code: "3A", name: "Third AC", price: 2380, available: 27 },
      { code: "SL", name: "Sleeper", price: 760, available: 68 },
    ],
  },
  {
    id: "t4",
    number: "12625",
    name: "Kerala Express",
    from: "New Delhi",
    to: "Thiruvananthapuram",
    depart: "11:30",
    arrive: "13:30+2",
    duration: "50h 00m",
    days: ["Daily"],
    type: "Express",
    badge: "Budget Pick",
    rating: 4.2,
    classes: [
      { code: "2A", name: "Second AC", price: 3680, available: 5 },
      { code: "3A", name: "Third AC", price: 2510, available: 19 },
      { code: "SL", name: "Sleeper", price: 805, available: 92 },
    ],
  },
];

const POPULAR_ROUTES = [
  { from: "New Delhi", to: "Mumbai", tag: "Most Booked" },
  { from: "Mumbai", to: "Goa", tag: "Popular" },
  { from: "Delhi", to: "Kolkata", tag: "Trending" },
  { from: "Chennai", to: "Bangalore", tag: "Fast Route" },
  { from: "Delhi", to: "Jaipur", tag: "Day Trip" },
  { from: "Mumbai", to: "Pune", tag: "Quick Ride" },
];

const CLASS_COLORS: Record<string, string> = {
  "1A": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "2A": "bg-blue-50 text-blue-700 border-blue-200",
  "3A": "bg-green-50 text-green-700 border-green-200",
  SL: "bg-gray-50 text-gray-700 border-gray-200",
  CC: "bg-purple-50 text-purple-700 border-purple-200",
  EC: "bg-orange-50 text-orange-700 border-orange-200",
};

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

// ── Search Panel ──────────────────────────────────────────────────────────────
function RailSearchPanel({ onSearch }: { onSearch: () => void }) {
  const [tripType, setTripType] = useState<"oneway" | "return">("oneway");
  const [passengers, setPassengers] = useState(1);
  const [quota, setQuota] = useState("general");

  return (
    <Card className="shadow-md border-0 bg-white">
      <CardContent className="p-6">
        <div className="flex gap-4 mb-5">
          {(["oneway", "return"] as const).map((t) => (
            <button
              key={t}
              type="button"
              data-ocid={`rail.trip_type.${t}`}
              onClick={() => setTripType(t)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                tripType === t
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-500 border-gray-200 hover:border-blue-300"
              }`}
            >
              {t === "oneway" ? "One Way" : "Return"}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
              From Station
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                data-ocid="rail.from.input"
                defaultValue="New Delhi (NDLS)"
                className="pl-9 h-11"
                placeholder="From station or city"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
              To Station
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
              <Input
                data-ocid="rail.to.input"
                defaultValue="Mumbai Central (BCT)"
                className="pl-9 h-11"
                placeholder="To station or city"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
              Travel Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                data-ocid="rail.date.input"
                type="date"
                defaultValue="2026-03-15"
                className="pl-9 h-11"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
              Quota
            </Label>
            <Select value={quota} onValueChange={setQuota}>
              <SelectTrigger data-ocid="rail.quota.select" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="tatkal">Tatkal</SelectItem>
                <SelectItem value="premium_tatkal">Premium Tatkal</SelectItem>
                <SelectItem value="ladies">Ladies</SelectItem>
                <SelectItem value="senior">Senior Citizen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 border rounded-lg px-4 py-2.5">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Passengers:</span>
            <button
              type="button"
              data-ocid="rail.passengers.decrement"
              onClick={() => setPassengers((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="font-semibold w-4 text-center">{passengers}</span>
            <button
              type="button"
              data-ocid="rail.passengers.increment"
              onClick={() => setPassengers((p) => Math.min(6, p + 1))}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
          <Button
            data-ocid="rail.search.primary_button"
            onClick={onSearch}
            className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex-1 md:flex-none"
          >
            <Train className="w-4 h-4 mr-2" /> Search Trains
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Train Card ────────────────────────────────────────────────────────────────
function TrainCard({
  train,
  onSelect,
}: { train: TrainResult; onSelect: (t: TrainResult) => void }) {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {train.number}
                  </span>
                  <h3 className="font-bold text-gray-900">{train.name}</h3>
                  {train.badge && (
                    <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
                      {train.badge}
                    </Badge>
                  )}
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    {train.type}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {train.depart}
                    </div>
                    <div className="text-xs text-gray-500">{train.from}</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-gray-400">
                      {train.duration}
                    </div>
                    <div className="w-full flex items-center gap-1">
                      <div className="flex-1 h-px bg-gray-200" />
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                    </div>
                    <div className="text-xs text-gray-400">
                      {train.days.join(" · ")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {train.arrive}
                    </div>
                    <div className="text-xs text-gray-500">{train.to}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {train.classes.map((cls) => (
                <div
                  key={cls.code}
                  className={`border rounded-lg px-3 py-1.5 text-center min-w-[80px] ${
                    CLASS_COLORS[cls.code] || "bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="text-xs font-bold">{cls.code}</div>
                  <div className="text-xs">{formatINR(cls.price)}</div>
                  <div className="text-xs opacity-70">
                    {cls.available} seats
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-xs text-gray-400">Starting from</div>
              <div className="text-xl font-bold text-blue-700">
                {formatINR(Math.min(...train.classes.map((c) => c.price)))}
              </div>
            </div>
            <Button
              data-ocid="rail.train.select_button"
              onClick={() => onSelect(train)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Class Selection ───────────────────────────────────────────────────────────
function ClassSelection({
  train,
  onBook,
  onBack,
}: {
  train: TrainResult;
  onBook: (cls: TrainClass) => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        data-ocid="rail.class.back_button"
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
      >
        ← Back to results
      </button>
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {train.number} - {train.name}
              </h2>
              <div className="flex items-center gap-3 text-blue-100 text-sm">
                <span>
                  {train.from} → {train.to}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {train.duration}
                </span>
              </div>
              <div className="flex items-center gap-3 text-blue-200 text-sm mt-0.5">
                <span>Departs: {train.depart}</span>
                <span>Arrives: {train.arrive}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <h3 className="font-bold text-gray-800 text-lg">Select Travel Class</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {train.classes.map((cls) => (
          <Card
            key={cls.code}
            className={`border-2 hover:shadow-md transition-all cursor-pointer ${
              CLASS_COLORS[cls.code] || "bg-gray-50"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-2xl font-bold">{cls.code}</div>
                  <div className="text-sm font-semibold">{cls.name}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {cls.available} seats available
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">
                    {formatINR(cls.price)}
                  </div>
                  <div className="text-xs opacity-70">per person</div>
                </div>
              </div>
              <Button
                data-ocid="rail.class.book_button"
                onClick={() => onBook(cls)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Select {cls.code}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Passenger Form ────────────────────────────────────────────────────────────
function RailPassengerForm({
  train,
  cls,
  onConfirm,
  onBack,
}: {
  train: TrainResult;
  cls: TrainClass;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const count = 1;
  const convenience = 45;
  const gst = Math.round(cls.price * count * 0.05);
  const total = cls.price * count + convenience + gst;

  return (
    <div className="space-y-4">
      <button
        type="button"
        data-ocid="rail.passenger.back_button"
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
      >
        ← Back to class selection
      </button>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5">
          <h3 className="font-bold text-gray-800 mb-4">Passenger Details</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <p className="text-sm font-semibold text-gray-600">Passenger 1</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  data-ocid="rail.passenger.name_input"
                  placeholder="Full Name"
                  className="h-10"
                />
                <Input
                  data-ocid="rail.passenger.age_input"
                  placeholder="Age"
                  type="number"
                  className="h-10"
                />
                <Select defaultValue="M">
                  <SelectTrigger
                    data-ocid="rail.passenger.gender_select"
                    className="h-10"
                  >
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="T">Transgender</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
            <h4 className="font-semibold text-gray-800">Contact Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                data-ocid="rail.contact.mobile_input"
                placeholder="Mobile Number"
                className="h-10"
              />
              <Input
                data-ocid="rail.contact.email_input"
                placeholder="Email Address"
                className="h-10"
              />
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-2">
            <h4 className="font-semibold text-gray-800">Fare Summary</h4>
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                {cls.code} - {cls.name} × {count}
              </span>
              <span>{formatINR(cls.price * count)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Convenience Fee</span>
              <span>{formatINR(convenience)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>GST (5%)</span>
              <span>{formatINR(gst)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 border-t pt-2">
              <span>Total</span>
              <span className="text-blue-700">{formatINR(total)}</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-700 flex items-center gap-1">
              <Zap className="w-3 h-3" /> Train: {train.number} | Class:{" "}
              {cls.code} | Departs: {train.depart} | Quota: General
            </p>
          </div>
          <Button
            data-ocid="rail.passenger.submit_button"
            onClick={onConfirm}
            className="w-full mt-4 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base"
          >
            <Train className="w-4 h-4 mr-2" /> Confirm & Pay {formatINR(total)}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Confirmation ──────────────────────────────────────────────────────────────
function RailConfirmation({
  train,
  cls,
  onNewSearch,
}: {
  train: TrainResult;
  cls: TrainClass;
  onNewSearch: () => void;
}) {
  const bookingId = `FSR${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const pnr = Math.floor(1000000000 + Math.random() * 9000000000);
  const total = cls.price + 45 + Math.round(cls.price * 0.05);

  return (
    <Card className="border-0 shadow-md max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Ticket Confirmed!
        </h2>
        <p className="text-gray-500">Your railway ticket has been booked</p>
        <div className="bg-blue-50 rounded-xl p-6 my-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Booking ID</span>
            <span className="font-bold text-blue-700 text-lg">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">PNR Number</span>
            <span className="font-bold text-orange-600 text-lg">
              {pnr.toString().slice(0, 10)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Train</span>
            <span className="font-semibold text-gray-800">
              {train.number} - {train.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Route</span>
            <span className="font-semibold text-gray-800">
              {train.from} → {train.to}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Departure</span>
            <span className="font-semibold text-gray-800">{train.depart}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Class</span>
            <span className="font-semibold text-gray-800">
              {cls.code} - {cls.name}
            </span>
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
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            data-ocid="rail.confirm.download_button"
            variant="outline"
            className="border-blue-200 text-blue-700"
          >
            Download Ticket
          </Button>
          <Button
            data-ocid="rail.confirm.pnr_button"
            variant="outline"
            className="border-orange-200 text-orange-700"
          >
            Check PNR Status
          </Button>
          <Button
            data-ocid="rail.confirm.new_search_button"
            onClick={onNewSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Book Another Ticket
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function RailwayBooking() {
  const [step, setStep] = useState<Step>("search");
  const [selectedTrain, setSelectedTrain] = useState<TrainResult | null>(null);
  const [selectedClass, setSelectedClass] = useState<TrainClass | null>(null);
  const [sortBy, setSortBy] = useState("departure");
  const [maxPrice, setMaxPrice] = useState(5000);

  const filtered = TRAINS.filter((t) =>
    t.classes.some((c) => c.price <= maxPrice),
  ).sort((a, b) => {
    if (sortBy === "price")
      return (
        Math.min(...a.classes.map((c) => c.price)) -
        Math.min(...b.classes.map((c) => c.price))
      );
    if (sortBy === "duration") return a.duration.localeCompare(b.duration);
    return a.depart.localeCompare(b.depart);
  });

  function reset() {
    setStep("search");
    setSelectedTrain(null);
    setSelectedClass(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Railway Booking</h2>
          <p className="text-gray-500 text-sm">
            Book Indian Railways tickets with instant confirmation
          </p>
        </div>
        {step === "results" && (
          <button
            type="button"
            data-ocid="rail.back_to_search.button"
            onClick={() => setStep("search")}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Modify Search
          </button>
        )}
      </div>

      {step === "search" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {POPULAR_ROUTES.map((r) => (
              <button
                key={`${r.from}-${r.to}`}
                type="button"
                data-ocid="rail.popular_route.button"
                onClick={() => setStep("results")}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3 text-left hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-xs font-bold text-blue-700">{r.from}</div>
                <div className="text-xs text-gray-400 flex items-center gap-0.5">
                  <ArrowRight className="w-2.5 h-2.5" />
                  {r.to}
                </div>
                <Badge className="mt-1 bg-orange-100 text-orange-600 border-0 text-xs px-1.5">
                  {r.tag}
                </Badge>
              </button>
            ))}
          </div>
          <RailSearchPanel onSearch={() => setStep("results")} />
        </>
      )}

      {step === "results" && (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-52 flex-shrink-0 space-y-4">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <Filter className="w-4 h-4" /> Filters
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
                Sort By
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-ocid="rail.sort.select" className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="departure">Departure Time</SelectItem>
                  <SelectItem value="price">Lowest Price</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">
                Max Fare: {formatINR(maxPrice)}
              </Label>
              <input
                data-ocid="rail.filter.price_input"
                type="range"
                min={500}
                max={5000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-500 uppercase block">
                Train Type
              </Label>
              {["Rajdhani", "Superfast", "Express", "Passenger"].map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    data-ocid="rail.type.checkbox"
                    defaultChecked
                    className="accent-blue-600"
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-sm text-gray-500">
              {filtered.length} trains found
            </p>
            {filtered.length === 0 ? (
              <div
                data-ocid="rail.results.empty_state"
                className="text-center py-16 text-gray-400"
              >
                <Train className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No trains match your filters.</p>
              </div>
            ) : (
              filtered.map((t) => (
                <TrainCard
                  key={t.id}
                  train={t}
                  onSelect={(selected) => {
                    setSelectedTrain(selected);
                    setStep("class");
                  }}
                />
              ))
            )}
          </div>
        </div>
      )}

      {step === "class" && selectedTrain && (
        <ClassSelection
          train={selectedTrain}
          onBook={(cls) => {
            setSelectedClass(cls);
            setStep("passengers");
          }}
          onBack={() => setStep("results")}
        />
      )}

      {step === "passengers" && selectedTrain && selectedClass && (
        <RailPassengerForm
          train={selectedTrain}
          cls={selectedClass}
          onConfirm={() => setStep("confirm")}
          onBack={() => setStep("class")}
        />
      )}

      {step === "confirm" && selectedTrain && selectedClass && (
        <RailConfirmation
          train={selectedTrain}
          cls={selectedClass}
          onNewSearch={reset}
        />
      )}
    </div>
  );
}
