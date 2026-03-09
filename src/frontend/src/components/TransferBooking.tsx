import {
  ArrowRight,
  Briefcase,
  Car,
  Check,
  ChevronDown,
  Clock,
  Download,
  MapPin,
  Plane,
  RefreshCw,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { TransferReview } from "./TransferReview";
import type { Vehicle } from "./TransferVehicleCard";
import { VehicleCard } from "./TransferVehicleCard";

type TripType = "oneway" | "roundtrip" | "rental" | "outstation";
type TransferCategory = "Airport Transfer" | "City Transfer" | "Hotel Transfer";
type BookingStep = "search" | "results" | "details" | "review" | "confirmed";

const WALLET_BALANCE = 45250;

const VEHICLES: Vehicle[] = [
  {
    id: "v1",
    type: "Sedan",
    name: "Swift Dzire / Similar",
    colorKey: "sedan",
    capacity: 4,
    bags: 2,
    price: 899,
    originalPrice: 1200,
    discount: 25,
    duration: "~45 min",
    distance: "32 km",
    rating: 4.5,
    reviews: 1842,
    features: ["AC", "GPS", "Professional Driver"],
    supplier: "Savaari",
    cancellation: "Free cancellation up to 1 hr",
    plate: "MH-02-**-1234",
    toll: true,
  },
  {
    id: "v2",
    type: "SUV",
    name: "Innova Crysta / Similar",
    colorKey: "suv",
    capacity: 6,
    bags: 4,
    price: 1499,
    originalPrice: 1900,
    discount: 21,
    duration: "~50 min",
    distance: "32 km",
    rating: 4.7,
    reviews: 2341,
    features: ["AC", "GPS", "Wi-Fi", "USB"],
    supplier: "Zoomcar",
    cancellation: "Free cancellation up to 2 hrs",
    plate: "DL-01-**-5678",
    toll: true,
  },
  {
    id: "v3",
    type: "Luxury",
    name: "Mercedes E-Class / Similar",
    colorKey: "luxury",
    capacity: 4,
    bags: 2,
    price: 3499,
    originalPrice: 4200,
    discount: 17,
    duration: "~40 min",
    distance: "32 km",
    rating: 4.9,
    reviews: 567,
    features: ["AC", "Wi-Fi", "USB", "Water"],
    supplier: "Avis",
    cancellation: "Free cancellation up to 4 hrs",
    plate: "MH-12-**-9999",
    toll: true,
  },
  {
    id: "v4",
    type: "Mini Bus",
    name: "Tempo Traveller 12-Seater",
    colorKey: "minibus",
    capacity: 12,
    bags: 8,
    price: 2799,
    originalPrice: 3500,
    discount: 20,
    duration: "~55 min",
    distance: "32 km",
    rating: 4.4,
    reviews: 934,
    features: ["AC", "GPS", "Push-back Seats"],
    supplier: "GoSelf",
    cancellation: "Free cancellation up to 3 hrs",
    plate: "UP-32-**-0011",
    toll: false,
  },
  {
    id: "v5",
    type: "Electric",
    name: "Tata Nexon EV / Similar",
    colorKey: "electric",
    capacity: 4,
    bags: 2,
    price: 999,
    originalPrice: 1300,
    discount: 23,
    duration: "~47 min",
    distance: "32 km",
    rating: 4.6,
    reviews: 1123,
    features: ["AC", "GPS", "Eco-Friendly", "USB"],
    supplier: "BluSmart",
    cancellation: "Free cancellation up to 1 hr",
    plate: "KA-05-**-2024",
    toll: true,
  },
];

const STEPS: BookingStep[] = [
  "search",
  "results",
  "details",
  "review",
  "confirmed",
];
const STEP_LABELS = ["Search", "Results", "Details", "Review", "Confirmed"];

const RENTAL_PACKAGES = [
  { label: "4 hr / 40 km", value: "4hr40km", price: 799 },
  { label: "8 hr / 80 km", value: "8hr80km", price: 1299 },
  { label: "12 hr / 120 km", value: "12hr120km", price: 1899 },
];

const AIRPORTS = [
  "Delhi IGI T3",
  "Delhi IGI T2",
  "Mumbai CSIA T2",
  "Bengaluru KIA T1",
  "Chennai MAA T1",
  "Hyderabad RGIA T1",
  "Kolkata NSCBI T2",
  "Pune Airport",
];

export function TransferBooking() {
  const [tripType, setTripType] = useState<TripType>("oneway");
  const [category, setCategory] =
    useState<TransferCategory>("Airport Transfer");
  const [step, setStep] = useState<BookingStep>("search");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("18:00");
  const [rentalPackage, setRentalPackage] = useState("8hr80km");
  const [rentalCity, setRentalCity] = useState("");
  const [passengers, setPassengers] = useState(2);
  const [bags, setBags] = useState(2);
  const [paxOpen, setPaxOpen] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState<"price" | "rating" | "capacity">(
    "price",
  );
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [bookingRef] = useState(
    `TRF-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(Math.floor(Math.random() * 900000 + 100000))}`,
  );
  const [txnId] = useState(
    `TXN-${String(Math.floor(Math.random() * 90000000 + 10000000))}`,
  );

  const [pax, setPax] = useState({
    title: "Mr",
    name: "",
    phone: "",
    email: "",
    altPhone: "",
    notes: "",
    gstEnabled: false,
    gstNumber: "",
    gstCompany: "",
    pickupConfirm: "",
    terminal: "",
    flightNumber: "",
    hotelName: "",
    hotelAddress: "",
    cityLocality: "",
    landmark: "",
  });

  const stepIndex = STEPS.indexOf(step);
  const searchValid =
    tripType === "rental"
      ? rentalCity.trim() && pickupDate
      : from.trim() && to.trim() && pickupDate;

  const filtered = VEHICLES.filter(
    (v) => filterType === "All" || v.type === filterType,
  ).sort((a, b) =>
    sortBy === "price"
      ? a.price - b.price
      : sortBy === "rating"
        ? b.rating - a.rating
        : b.capacity - a.capacity,
  );

  const total = selectedVehicle
    ? (() => {
        const b = selectedVehicle.price;
        const toll = selectedVehicle.toll ? 0 : Math.round(b * 0.04);
        const da = Math.round(b * 0.03);
        return b + toll + da + Math.round((b + toll + da) * 0.05);
      })()
    : 0;

  // Stepper
  const Stepper = () =>
    stepIndex === 0 ? null : (
      <div className="flex items-center justify-center gap-0 mb-6 overflow-x-auto pb-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  i < stepIndex
                    ? "bg-blue-600 border-blue-600 text-white"
                    : i === stepIndex
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {i < stepIndex ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-xs mt-1 font-medium whitespace-nowrap ${
                  i <= stepIndex ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`h-0.5 w-10 md:w-16 mx-1 mb-4 transition-colors ${
                  i < stepIndex ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );

  // ── SEARCH ──────────────────────────────────────────────────────────────────
  if (step === "search") {
    const tabs: { key: TripType; label: string }[] = [
      { key: "oneway", label: "One-Way" },
      { key: "roundtrip", label: "Round Trip" },
      { key: "rental", label: "Rental" },
      { key: "outstation", label: "Outstation" },
    ];
    const cats: TransferCategory[] = [
      "Airport Transfer",
      "City Transfer",
      "Hotel Transfer",
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-1">
            <Car className="w-7 h-7" />
            <h2 className="text-2xl font-bold font-display">
              Transfers & Cabs
            </h2>
          </div>
          <p className="text-blue-200 text-sm mb-5">
            Airport transfers, outstation trips, rentals & city cabs
          </p>
          <div className="flex gap-2 flex-wrap">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                data-ocid={`transfer.${t.key}.tab`}
                onClick={() => setTripType(t.key)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  tripType === t.key
                    ? "bg-white text-blue-700"
                    : "bg-blue-600/60 text-white hover:bg-blue-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          {/* Transfer category - only for one-way/roundtrip */}
          {(tripType === "oneway" || tripType === "roundtrip") && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Transfer Category
              </div>
              <div className="flex gap-2 flex-wrap">
                {cats.map((c) => (
                  <button
                    key={c}
                    type="button"
                    data-ocid={`transfer.category_${c.replace(/ /g, "_").toLowerCase()}.toggle`}
                    onClick={() => setCategory(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      category === c
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main fields */}
          {tripType === "rental" ? (
            <div>
              <p className="block text-xs text-gray-500 mb-1">
                City for Rental
              </p>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-blue-500" />
                <input
                  data-ocid="transfer.rental_city.input"
                  type="text"
                  value={rentalCity}
                  onChange={(e) => setRentalCity(e.target.value)}
                  placeholder="Enter city (e.g. Mumbai)"
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-blue-500" />
                <input
                  data-ocid="transfer.from.input"
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder={
                    tripType === "outstation"
                      ? "From City"
                      : category === "Airport Transfer"
                        ? "From (Airport)"
                        : "From Location"
                  }
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-green-500" />
                <input
                  data-ocid="transfer.to.input"
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder={
                    tripType === "outstation"
                      ? "To City"
                      : category === "Airport Transfer"
                        ? "To (Hotel / Address)"
                        : "To Location"
                  }
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Rental package */}
          {tripType === "rental" && (
            <div>
              <p className="block text-xs text-gray-500 mb-2">Rental Package</p>
              <div className="flex gap-3 flex-wrap">
                {RENTAL_PACKAGES.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    data-ocid={`transfer.rental_${p.value}.toggle`}
                    onClick={() => setRentalPackage(p.value)}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      rentalPackage === p.value
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {p.label} <span className="font-bold ml-1">₹{p.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="block text-xs text-gray-500 mb-1">Pickup Date</p>
              <input
                data-ocid="transfer.pickup_date.input"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <p className="block text-xs text-gray-500 mb-1">Pickup Time</p>
              <input
                data-ocid="transfer.pickup_time.input"
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Return date for round trip / outstation */}
          {(tripType === "roundtrip" || tripType === "outstation") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="block text-xs text-gray-500 mb-1">Return Date</p>
                <input
                  data-ocid="transfer.return_date.input"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <p className="block text-xs text-gray-500 mb-1">Return Time</p>
                <input
                  data-ocid="transfer.return_time.input"
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Outstation days */}
          {tripType === "outstation" && pickupDate && returnDate && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              <RefreshCw className="w-4 h-4" />
              <span className="font-medium">
                {Math.max(
                  1,
                  Math.ceil(
                    (new Date(returnDate).getTime() -
                      new Date(pickupDate).getTime()) /
                      86400000,
                  ),
                )}{" "}
                day(s) trip
              </span>
            </div>
          )}

          {/* Passenger & Bags picker */}
          <div className="relative">
            <p className="block text-xs text-gray-500 mb-1">
              Passengers & Bags
            </p>
            <button
              type="button"
              data-ocid="transfer.passenger_select.button"
              onClick={() => setPaxOpen(!paxOpen)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-left flex items-center justify-between hover:border-blue-300 outline-none"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                {passengers} Passenger{passengers !== 1 ? "s" : ""}, {bags} Bag
                {bags !== 1 ? "s" : ""}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {paxOpen && (
              <div
                data-ocid="transfer.passenger.dropdown_menu"
                className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-4 mt-1"
              >
                {[
                  {
                    label: "Passengers",
                    val: passengers,
                    set: setPassengers,
                    min: 1,
                    max: 12,
                  },
                  { label: "Bags", val: bags, set: setBags, min: 0, max: 12 },
                ].map(({ label, val, set, min, max }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between mb-3 last:mb-0"
                  >
                    <span className="text-sm font-medium">{label}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => set(Math.max(min, val - 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-50"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-semibold">
                        {val}
                      </span>
                      <button
                        type="button"
                        onClick={() => set(Math.min(max, val + 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  data-ocid="transfer.passenger_done.button"
                  onClick={() => setPaxOpen(false)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Airport autofill */}
          {(tripType === "oneway" || tripType === "roundtrip") &&
            category === "Airport Transfer" && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs font-semibold text-amber-700 mb-2 flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5" />
                  Upcoming Flight Bookings — Auto-fill
                </p>
                <div className="space-y-1">
                  {[
                    {
                      id: "FST-2819",
                      name: "Rahul Sharma",
                      date: "2026-03-15",
                      time: "06:30",
                      from: "DEL",
                      to: "BOM",
                    },
                    {
                      id: "FST-2820",
                      name: "Priya Mehta",
                      date: "2026-03-18",
                      time: "14:15",
                      from: "BOM",
                      to: "DXB",
                    },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      className="w-full flex items-center justify-between text-xs p-2 bg-white rounded border border-amber-100 hover:bg-amber-50 text-left gap-2"
                      onClick={() => {
                        setFrom(`${b.from} Airport`);
                        setTo(`${b.to} Airport`);
                        setPickupDate(b.date);
                        setPickupTime(b.time);
                      }}
                    >
                      <span className="font-medium text-gray-700">
                        {b.id} · {b.name}
                      </span>
                      <span className="text-gray-500">
                        {b.from} → {b.to} · {b.date} {b.time}
                      </span>
                      <span className="text-blue-600 font-semibold whitespace-nowrap">
                        Auto-fill →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          <button
            type="button"
            data-ocid="transfer.search.primary_button"
            onClick={() => setStep("results")}
            disabled={!searchValid}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3.5 rounded-xl font-semibold text-base transition-colors"
          >
            Search Vehicles
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: Shield,
              label: "Safe & Verified",
              desc: "Background-checked drivers",
            },
            {
              icon: Zap,
              label: "Instant Booking",
              desc: "Confirm in 60 seconds",
            },
            {
              icon: Car,
              label: "40+ Vehicle Types",
              desc: "Sedan to luxury buses",
            },
            {
              icon: Clock,
              label: "24/7 Support",
              desc: "Help anytime, anywhere",
            },
          ].map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-xs"
            >
              <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-800">{label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── RESULTS ──────────────────────────────────────────────────────────────────
  if (step === "results") {
    const filterTypes = [
      "All",
      "Sedan",
      "SUV",
      "Luxury",
      "Mini Bus",
      "Electric",
    ];
    return (
      <div className="space-y-4">
        <Stepper />
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center flex-wrap justify-between gap-3">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="font-medium">
              {tripType === "rental" ? rentalCity : from}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="font-medium">
              {tripType === "rental" ? "(Rental)" : to}
            </span>
            <span className="text-gray-400">
              · {pickupDate} {pickupTime}
            </span>
            <span className="text-gray-400">· {passengers} pax</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium capitalize">
              {tripType.replace("roundtrip", "Round Trip")}
            </span>
          </div>
          <button
            type="button"
            data-ocid="transfer.modify_search.button"
            onClick={() => setStep("search")}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Modify Search
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-600 mr-1">
            Filter:
          </span>
          {filterTypes.map((t) => (
            <button
              key={t}
              type="button"
              data-ocid={`transfer.filter_${t.toLowerCase().replace(" ", "_")}.tab`}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500">Sort:</span>
            <select
              data-ocid="transfer.sort.select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="price">Cheapest</option>
              <option value="rating">Top Rated</option>
              <option value="capacity">Largest</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""} available
        </div>

        <div className="space-y-3">
          {filtered.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onSelect={(v) => {
                setSelectedVehicle(v);
                setStep("details");
              }}
            />
          ))}
          {filtered.length === 0 && (
            <div
              data-ocid="transfer.results.empty_state"
              className="text-center py-12 text-gray-400"
            >
              <Car className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No vehicles for this filter</p>
              <button
                type="button"
                onClick={() => setFilterType("All")}
                className="mt-2 text-blue-600 text-sm hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── DETAILS ──────────────────────────────────────────────────────────────────
  if (step === "details" && selectedVehicle) {
    const v = selectedVehicle;
    const toll = v.toll ? 0 : Math.round(v.price * 0.04);
    const da = Math.round(v.price * 0.03);
    const gst = Math.round((v.price + toll + da) * 0.05);
    const detailTotal = v.price + toll + da + gst;

    return (
      <div className="space-y-5">
        <Stepper />
        <button
          type="button"
          data-ocid="transfer.back_to_results.button"
          onClick={() => setStep("results")}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          ← Back to Results
        </button>
        <div className="grid md:grid-cols-3 gap-5">
          {/* Form */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">
                Passenger Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="block text-xs font-medium text-gray-600 mb-1">
                      Title
                    </p>
                    <select
                      data-ocid="transfer.title.select"
                      value={pax.title}
                      onChange={(e) =>
                        setPax({ ...pax, title: e.target.value })
                      }
                      className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {["Mr", "Mrs", "Ms", "Dr"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <p className="block text-xs font-medium text-gray-600 mb-1">
                      Full Name *
                    </p>
                    <input
                      data-ocid="transfer.passenger_name.input"
                      type="text"
                      value={pax.name}
                      onChange={(e) => setPax({ ...pax, name: e.target.value })}
                      placeholder="Full name as on ID"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="block text-xs font-medium text-gray-600 mb-1">
                      Mobile * (+91)
                    </p>
                    <input
                      data-ocid="transfer.passenger_phone.input"
                      type="tel"
                      value={pax.phone}
                      onChange={(e) =>
                        setPax({ ...pax, phone: e.target.value })
                      }
                      placeholder="9XXXXXXXXX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <p className="block text-xs font-medium text-gray-600 mb-1">
                      Email
                    </p>
                    <input
                      data-ocid="transfer.passenger_email.input"
                      type="email"
                      value={pax.email}
                      onChange={(e) =>
                        setPax({ ...pax, email: e.target.value })
                      }
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <p className="block text-xs font-medium text-gray-600 mb-1">
                    Alternate Contact
                  </p>
                  <input
                    data-ocid="transfer.alt_phone.input"
                    type="tel"
                    value={pax.altPhone}
                    onChange={(e) =>
                      setPax({ ...pax, altPhone: e.target.value })
                    }
                    placeholder="Alternate mobile number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <p className="block text-xs font-medium text-gray-600 mb-1">
                    Special Requests / Pickup Notes
                  </p>
                  <textarea
                    data-ocid="transfer.pickup_notes.textarea"
                    value={pax.notes}
                    onChange={(e) => setPax({ ...pax, notes: e.target.value })}
                    placeholder="E.g. Gate 3, look for name board, need child seat..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    data-ocid="transfer.gst.checkbox"
                    id="gst-toggle"
                    checked={pax.gstEnabled}
                    onChange={(e) =>
                      setPax({ ...pax, gstEnabled: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <label
                    htmlFor="gst-toggle"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Add GST Details (Optional)
                  </label>
                </div>
                {pax.gstEnabled && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div>
                      <p className="block text-xs font-medium text-gray-600 mb-1">
                        GST Number
                      </p>
                      <input
                        data-ocid="transfer.gst_number.input"
                        type="text"
                        value={pax.gstNumber}
                        onChange={(e) =>
                          setPax({ ...pax, gstNumber: e.target.value })
                        }
                        placeholder="27AAPFU0939F1ZV"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <p className="block text-xs font-medium text-gray-600 mb-1">
                        Company Name
                      </p>
                      <input
                        data-ocid="transfer.gst_company.input"
                        type="text"
                        value={pax.gstCompany}
                        onChange={(e) =>
                          setPax({ ...pax, gstCompany: e.target.value })
                        }
                        placeholder="Company Pvt Ltd"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pickup confirmation */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Pickup Confirmation
              </h3>
              {(tripType === "oneway" || tripType === "roundtrip") &&
                category === "Airport Transfer" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <p className="block text-xs font-medium text-gray-600 mb-1">
                        Pickup Airport
                      </p>
                      <select
                        data-ocid="transfer.pickup_airport.select"
                        value={pax.pickupConfirm}
                        onChange={(e) =>
                          setPax({ ...pax, pickupConfirm: e.target.value })
                        }
                        className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="">Select Airport</option>
                        {AIRPORTS.map((a) => (
                          <option key={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className="block text-xs font-medium text-gray-600 mb-1">
                        Terminal
                      </p>
                      <input
                        data-ocid="transfer.terminal.input"
                        type="text"
                        value={pax.terminal}
                        onChange={(e) =>
                          setPax({ ...pax, terminal: e.target.value })
                        }
                        placeholder="T1 / T2 / T3"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <p className="block text-xs font-medium text-gray-600 mb-1">
                        Flight Number
                      </p>
                      <input
                        data-ocid="transfer.flight_number.input"
                        type="text"
                        value={pax.flightNumber}
                        onChange={(e) =>
                          setPax({ ...pax, flightNumber: e.target.value })
                        }
                        placeholder="6E 123"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                )}
              {(tripType === "oneway" || tripType === "roundtrip") &&
                category === "Hotel Transfer" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="block text-xs font-medium text-gray-600 mb-1">
                        Hotel Name
                      </p>
                      <input
                        data-ocid="transfer.hotel_name.input"
                        type="text"
                        value={pax.hotelName}
                        onChange={(e) =>
                          setPax({ ...pax, hotelName: e.target.value })
                        }
                        placeholder="Hotel name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <p className="block text-xs font-medium text-gray-600 mb-1">
                        Hotel Address
                      </p>
                      <input
                        data-ocid="transfer.hotel_address.input"
                        type="text"
                        value={pax.hotelAddress}
                        onChange={(e) =>
                          setPax({ ...pax, hotelAddress: e.target.value })
                        }
                        placeholder="Full address"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                )}
              {((tripType === "oneway" || tripType === "roundtrip") &&
                category === "City Transfer") ||
              tripType === "rental" ||
              tripType === "outstation" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="block text-xs font-medium text-gray-600 mb-1">
                      City / Locality
                    </p>
                    <input
                      data-ocid="transfer.city_locality.input"
                      type="text"
                      value={pax.cityLocality}
                      onChange={(e) =>
                        setPax({ ...pax, cityLocality: e.target.value })
                      }
                      placeholder="Locality or area"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <p className="block text-xs font-medium text-gray-600 mb-1">
                      Landmark
                    </p>
                    <input
                      data-ocid="transfer.landmark.input"
                      type="text"
                      value={pax.landmark}
                      onChange={(e) =>
                        setPax({ ...pax, landmark: e.target.value })
                      }
                      placeholder="Nearest landmark"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-4">
              <h4 className="font-semibold text-gray-800 mb-4">
                Booking Summary
              </h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <Car className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{v.name}</p>
                  <p className="text-xs text-gray-500">
                    {v.type} · {v.supplier}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>From</span>
                  <span className="font-medium text-gray-800 text-right max-w-[140px] truncate">
                    {tripType === "rental" ? rentalCity : from}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>To</span>
                  <span className="font-medium text-gray-800 text-right max-w-[140px] truncate">
                    {tripType === "rental" ? "(Rental)" : to}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup</span>
                  <span className="font-medium text-gray-800">
                    {pickupDate} {pickupTime}
                  </span>
                </div>
                {(tripType === "roundtrip" || tripType === "outstation") &&
                  returnDate && (
                    <div className="flex justify-between">
                      <span>Return</span>
                      <span className="font-medium text-gray-800">
                        {returnDate} {returnTime}
                      </span>
                    </div>
                  )}
                <div className="flex justify-between">
                  <span>Pax</span>
                  <span className="font-medium text-gray-800">
                    {passengers} · {bags} bags
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Trip</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium capitalize">
                    {tripType.replace("roundtrip", "Round Trip")}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Base Fare</span>
                  <span>₹{v.price.toLocaleString()}</span>
                </div>
                {toll > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Toll & Parking</span>
                    <span>₹{toll}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Driver Allowance</span>
                  <span>₹{da}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-1 mt-1 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-700">
                    ₹{detailTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              data-ocid="transfer.proceed_review.primary_button"
              onClick={() => setStep("review")}
              disabled={!pax.name || !pax.phone}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3.5 rounded-xl font-semibold transition-colors"
            >
              Proceed to Review →
            </button>
            <p className="text-xs text-center text-gray-400">
              Wallet deduction on final confirm
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── REVIEW ──────────────────────────────────────────────────────────────────
  if (step === "review" && selectedVehicle) {
    return (
      <div>
        <Stepper />
        <TransferReview
          tripType={
            tripType === "roundtrip"
              ? "Round Trip"
              : tripType === "oneway"
                ? "One-Way"
                : tripType === "rental"
                  ? "Rental"
                  : "Outstation"
          }
          transferCategory={category}
          from={tripType === "rental" ? rentalCity : from}
          to={tripType === "rental" ? "(Rental)" : to}
          pickupDate={pickupDate}
          pickupTime={pickupTime}
          returnDate={returnDate}
          returnTime={returnTime}
          passengers={passengers}
          bags={bags}
          vehicle={selectedVehicle}
          passengerData={pax}
          onBack={() => setStep("details")}
          onConfirm={() => setStep("confirmed")}
        />
      </div>
    );
  }

  // ── CONFIRMED ────────────────────────────────────────────────────────────────
  if (step === "confirmed" && selectedVehicle) {
    return (
      <div>
        <Stepper />
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold font-display">
                Transfer Booked!
              </h2>
              <p className="text-green-100 mt-1">Your vehicle is confirmed</p>
              <div className="mt-3 bg-white/20 rounded-xl px-5 py-2.5 inline-block">
                <span className="text-lg font-bold tracking-wider">
                  {bookingRef}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Passenger", value: `${pax.title} ${pax.name}` },
                  { label: "Vehicle", value: selectedVehicle.name },
                  {
                    label: "Pickup",
                    value: tripType === "rental" ? rentalCity : from,
                  },
                  {
                    label: "Drop",
                    value: tripType === "rental" ? "(Rental)" : to,
                  },
                  {
                    label: "Date & Time",
                    value: `${pickupDate} ${pickupTime}`,
                  },
                  {
                    label: "Return",
                    value: returnDate ? `${returnDate} ${returnTime}` : "—",
                  },
                  { label: "Passengers", value: `${passengers}` },
                  { label: "Bags", value: `${bags}` },
                  {
                    label: "Trip Type",
                    value: tripType === "roundtrip" ? "Round Trip" : tripType,
                  },
                  { label: "Plate", value: selectedVehicle.plate },
                  { label: "Supplier", value: selectedVehicle.supplier },
                  { label: "Duration", value: selectedVehicle.duration },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="font-semibold text-gray-900 mt-0.5">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Driver panel */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                  Driver Details
                </p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-gray-500">Driver</div>
                    <div className="font-semibold">Rajesh Kumar</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Mobile</div>
                    <div className="font-semibold">+91 98765 43210</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Vehicle</div>
                    <div className="font-semibold">
                      White {selectedVehicle.type}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Driver will arrive 10 minutes before pickup time
                </p>
              </div>

              {/* Payment */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                  Payment
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid (Wallet)</span>
                    <span className="font-bold text-green-700">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining Balance</span>
                    <span className="font-semibold">
                      ₹{(WALLET_BALANCE - total).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 pt-1">
                    <span>Transaction ID</span>
                    <span>{txnId}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  data-ocid="transfer.download_voucher.button"
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Voucher
                </button>
                <button
                  type="button"
                  data-ocid="transfer.new_search.button"
                  onClick={() => {
                    setStep("search");
                    setFrom("");
                    setTo("");
                    setPickupDate("");
                    setSelectedVehicle(null);
                    setPax({
                      title: "Mr",
                      name: "",
                      phone: "",
                      email: "",
                      altPhone: "",
                      notes: "",
                      gstEnabled: false,
                      gstNumber: "",
                      gstCompany: "",
                      pickupConfirm: "",
                      terminal: "",
                      flightNumber: "",
                      hotelName: "",
                      hotelAddress: "",
                      cityLocality: "",
                      landmark: "",
                    });
                  }}
                  className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold transition-colors"
                >
                  New Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
