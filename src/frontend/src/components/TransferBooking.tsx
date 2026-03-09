import {
  ArrowRight,
  Briefcase,
  Car,
  Check,
  ChevronDown,
  Clock,
  Download,
  MapPin,
  Shield,
  Star,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type TransferTab = "airport" | "outstation" | "local";
type BookingStep = "search" | "results" | "details" | "confirmed";

interface Vehicle {
  id: string;
  type: string;
  name: string;
  image: string;
  capacity: number;
  bags: number;
  price: number;
  originalPrice: number;
  eta: string;
  rating: number;
  reviews: number;
  features: string[];
  supplier: string;
  cancellation: string;
}

interface Passenger {
  name: string;
  phone: string;
  email: string;
  pickupNotes: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const VEHICLES: Vehicle[] = [
  {
    id: "v1",
    type: "Sedan",
    name: "Swift Dzire / Similar",
    image: "sedan",
    capacity: 4,
    bags: 2,
    price: 899,
    originalPrice: 1200,
    eta: "15 min",
    rating: 4.5,
    reviews: 1842,
    features: ["AC", "GPS Tracked", "Professional Driver"],
    supplier: "Savaari",
    cancellation: "Free cancellation up to 1 hour",
  },
  {
    id: "v2",
    type: "SUV",
    name: "Innova Crysta / Similar",
    image: "suv",
    capacity: 6,
    bags: 4,
    price: 1499,
    originalPrice: 1900,
    eta: "20 min",
    rating: 4.7,
    reviews: 2341,
    features: ["AC", "GPS Tracked", "Extra Luggage", "Wi-Fi"],
    supplier: "Zoomcar",
    cancellation: "Free cancellation up to 2 hours",
  },
  {
    id: "v3",
    type: "Luxury",
    name: "Mercedes E-Class / Similar",
    image: "luxury",
    capacity: 4,
    bags: 2,
    price: 3499,
    originalPrice: 4200,
    eta: "30 min",
    rating: 4.9,
    reviews: 567,
    features: [
      "AC",
      "GPS Tracked",
      "Complimentary Water",
      "Wi-Fi",
      "USB Charging",
    ],
    supplier: "Avis",
    cancellation: "Free cancellation up to 4 hours",
  },
  {
    id: "v4",
    type: "Mini Bus",
    name: "Tempo Traveller 12-Seater",
    image: "minibus",
    capacity: 12,
    bags: 8,
    price: 2799,
    originalPrice: 3500,
    eta: "25 min",
    rating: 4.4,
    reviews: 934,
    features: ["AC", "GPS Tracked", "Push-back Seats"],
    supplier: "GoSelf",
    cancellation: "Free cancellation up to 3 hours",
  },
  {
    id: "v5",
    type: "Electric",
    name: "Tata Nexon EV / Similar",
    image: "electric",
    capacity: 4,
    bags: 2,
    price: 999,
    originalPrice: 1300,
    eta: "18 min",
    rating: 4.6,
    reviews: 1123,
    features: ["AC", "GPS Tracked", "Eco-Friendly", "USB Charging"],
    supplier: "BluSmart",
    cancellation: "Free cancellation up to 1 hour",
  },
];

const VEHICLE_COLORS: Record<string, string> = {
  sedan: "bg-blue-100",
  suv: "bg-amber-100",
  luxury: "bg-purple-100",
  minibus: "bg-green-100",
  electric: "bg-teal-100",
};

const VEHICLE_TEXT: Record<string, string> = {
  sedan: "text-blue-600",
  suv: "text-amber-600",
  luxury: "text-purple-600",
  minibus: "text-green-600",
  electric: "text-teal-600",
};

// ── VehicleCard ──────────────────────────────────────────────────────────────
function VehicleCard({
  vehicle,
  onSelect,
}: {
  vehicle: Vehicle;
  onSelect: (v: Vehicle) => void;
}) {
  const discount = Math.round(
    ((vehicle.originalPrice - vehicle.price) / vehicle.originalPrice) * 100,
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-5">
      <div className="flex items-start gap-4">
        <div
          className={`w-16 h-16 rounded-xl ${VEHICLE_COLORS[vehicle.image]} flex items-center justify-center flex-shrink-0`}
        >
          <Car className={`w-8 h-8 ${VEHICLE_TEXT[vehicle.image]}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {vehicle.type}
                </span>
                {discount > 0 && (
                  <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mt-1">
                {vehicle.name}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {vehicle.capacity} Seats
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {vehicle.bags} Bags
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {vehicle.eta}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-gray-900">
                ₹{vehicle.price.toLocaleString()}
              </div>
              {vehicle.originalPrice > vehicle.price && (
                <div className="text-sm text-gray-400 line-through">
                  ₹{vehicle.originalPrice.toLocaleString()}
                </div>
              )}
              <div className="text-xs text-gray-500">per vehicle</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {vehicle.features.map((f) => (
              <span
                key={f}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded flex items-center gap-1"
              >
                {f === "Wi-Fi" ? (
                  <Wifi className="w-3 h-3" />
                ) : (
                  <Check className="w-3 h-3" />
                )}
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{vehicle.rating}</span>
                <span className="text-xs text-gray-400">
                  ({vehicle.reviews})
                </span>
                <span className="text-xs text-gray-400 ml-1">
                  · {vehicle.supplier}
                </span>
              </div>
              <div className="text-xs text-green-600 mt-0.5">
                {vehicle.cancellation}
              </div>
            </div>
            <button
              type="button"
              data-ocid="transfer.select_vehicle.button"
              onClick={() => onSelect(vehicle)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export function TransferBooking() {
  const [tab, setTab] = useState<TransferTab>("airport");
  const [step, setStep] = useState<BookingStep>("search");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [bags, setBags] = useState(1);
  const [passengerOpen, setPassengerOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "capacity">(
    "price",
  );
  const [filterType, setFilterType] = useState<string>("all");
  const [bookingId] = useState(
    `TRF${Math.floor(Math.random() * 900000 + 100000)}`,
  );
  const [passenger, setPassenger] = useState<Passenger>({
    name: "",
    phone: "",
    email: "",
    pickupNotes: "",
  });

  const TAB_LABELS: Record<TransferTab, string> = {
    airport: "Airport Transfers",
    outstation: "Outstation",
    local: "Local",
  };

  const FROM_PLACEHOLDER: Record<TransferTab, string> = {
    airport: "From (Airport / City)",
    outstation: "From (City)",
    local: "Pickup Location",
  };

  const TO_PLACEHOLDER: Record<TransferTab, string> = {
    airport: "To (Hotel / Address)",
    outstation: "To (City)",
    local: "Drop Location",
  };

  const filteredVehicles = VEHICLES.filter(
    (v) => filterType === "all" || v.type === filterType,
  ).sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.capacity - a.capacity;
  });

  function handleSearch() {
    if (!from || !to || !pickupDate) return;
    setStep("results");
  }

  function handleSelectVehicle(v: Vehicle) {
    setSelectedVehicle(v);
    setStep("details");
  }

  function handleBook() {
    setStep("confirmed");
  }

  // ── Search Form ─────────────────────────────────────────────────────────────
  if (step === "search") {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold">Transfers & Cabs</h2>
          <p className="text-blue-200 text-sm mt-1">
            Book airport transfers, outstation trips and local cabs
          </p>
          <div className="flex gap-2 mt-4">
            {(Object.keys(TAB_LABELS) as TransferTab[]).map((t) => (
              <button
                key={t}
                type="button"
                data-ocid={`transfer.${t}.tab`}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === t
                    ? "bg-white text-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
              >
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-blue-500" />
              <input
                id="transfer-from"
                data-ocid="transfer.from.input"
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder={FROM_PLACEHOLDER[tab]}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-green-500" />
              <input
                id="transfer-to"
                data-ocid="transfer.to.input"
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder={TO_PLACEHOLDER[tab]}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="pickup-date"
                className="block text-xs text-gray-500 mb-1 ml-1"
              >
                Pickup Date
              </label>
              <input
                id="pickup-date"
                data-ocid="transfer.pickup_date.input"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="pickup-time"
                className="block text-xs text-gray-500 mb-1 ml-1"
              >
                Pickup Time
              </label>
              <input
                id="pickup-time"
                data-ocid="transfer.pickup_time.input"
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {tab === "outstation" && (
              <>
                <div className="flex items-center gap-2">
                  <input
                    data-ocid="transfer.return_trip.checkbox"
                    type="checkbox"
                    id="return-trip"
                    checked={isReturn}
                    onChange={(e) => setIsReturn(e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label
                    htmlFor="return-trip"
                    className="text-sm text-gray-700"
                  >
                    Round Trip
                  </label>
                </div>
                {isReturn && (
                  <div className="grid grid-cols-2 gap-2 md:col-span-2">
                    <div>
                      <label
                        htmlFor="return-date"
                        className="block text-xs text-gray-500 mb-1 ml-1"
                      >
                        Return Date
                      </label>
                      <input
                        id="return-date"
                        data-ocid="transfer.return_date.input"
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="return-time"
                        className="block text-xs text-gray-500 mb-1 ml-1"
                      >
                        Return Time
                      </label>
                      <input
                        id="return-time"
                        data-ocid="transfer.return_time.input"
                        type="time"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="relative">
              <label
                htmlFor="pax-select"
                className="block text-xs text-gray-500 mb-1 ml-1"
              >
                Passengers & Bags
              </label>
              <button
                id="pax-select"
                type="button"
                data-ocid="transfer.passenger_select.button"
                onClick={() => setPassengerOpen(!passengerOpen)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-left flex items-center justify-between hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  {passengers} Passenger{passengers !== 1 ? "s" : ""}, {bags}{" "}
                  Bag{bags !== 1 ? "s" : ""}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {passengerOpen && (
                <div
                  data-ocid="transfer.passenger.dropdown_menu"
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-4 mt-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Passengers</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        data-ocid="transfer.passenger_dec.button"
                        onClick={() =>
                          setPassengers(Math.max(1, passengers - 1))
                        }
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-semibold">
                        {passengers}
                      </span>
                      <button
                        type="button"
                        data-ocid="transfer.passenger_inc.button"
                        onClick={() =>
                          setPassengers(Math.min(12, passengers + 1))
                        }
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bags</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        data-ocid="transfer.bags_dec.button"
                        onClick={() => setBags(Math.max(0, bags - 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-semibold">
                        {bags}
                      </span>
                      <button
                        type="button"
                        data-ocid="transfer.bags_inc.button"
                        onClick={() => setBags(Math.min(12, bags + 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-ocid="transfer.passenger_done.button"
                    onClick={() => setPassengerOpen(false)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>

          {tab === "airport" && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-semibold text-amber-700 mb-2">
                Upcoming Flight Bookings
              </p>
              <div className="space-y-1">
                {[
                  {
                    id: "FST-2819",
                    name: "Rahul Sharma",
                    date: "15-Mar-2026",
                    time: "06:30",
                    route: "DEL → BOM",
                  },
                  {
                    id: "FST-2820",
                    name: "Priya Mehta",
                    date: "18-Mar-2026",
                    time: "14:15",
                    route: "BOM → DXB",
                  },
                ].map((b) => {
                  const dest = b.route.split(" → ")[1];
                  return (
                    <button
                      key={b.id}
                      type="button"
                      className="w-full flex items-center justify-between text-xs p-2 bg-white rounded border border-amber-100 cursor-pointer hover:bg-amber-50 text-left"
                      onClick={() => {
                        setFrom(`${dest} Airport`);
                        setPickupDate(b.date.split("-").reverse().join("-"));
                        setPickupTime(b.time);
                      }}
                    >
                      <span className="font-medium text-gray-700">
                        {b.id} · {b.name}
                      </span>
                      <span className="text-gray-500">
                        {b.route} · {b.date} {b.time}
                      </span>
                      <span className="text-blue-600 font-semibold">
                        Auto-fill →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            data-ocid="transfer.search.primary_button"
            onClick={handleSearch}
            disabled={!from || !to || !pickupDate}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3.5 rounded-xl font-semibold text-base transition-colors"
          >
            Search Cabs
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: Shield,
              label: "Safe & Verified",
              desc: "All drivers background checked",
            },
            {
              icon: Zap,
              label: "Instant Booking",
              desc: "Confirm in under 60 seconds",
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
              className="bg-white rounded-xl border border-gray-100 p-4 text-center"
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

  // ── Results ──────────────────────────────────────────────────────────────────
  if (step === "results") {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{from}</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{to}</span>
            <span className="text-gray-400 ml-2">
              · {pickupDate} {pickupTime}
            </span>
            <span className="text-gray-400">
              · {passengers} pax, {bags} bags
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

        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-gray-600">Filter:</span>
          {["all", "Sedan", "SUV", "Luxury", "Mini Bus", "Electric"].map(
            (t) => (
              <button
                key={t}
                type="button"
                data-ocid={`transfer.filter_${t.toLowerCase().replace(" ", "_")}.tab`}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterType === t
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t === "all" ? "All Types" : t}
              </button>
            ),
          )}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort:</span>
            <select
              data-ocid="transfer.sort.select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="price">Cheapest First</option>
              <option value="rating">Top Rated</option>
              <option value="capacity">Largest First</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          {filteredVehicles.length} vehicle
          {filteredVehicles.length !== 1 ? "s" : ""} available
        </div>

        <div className="space-y-3">
          {filteredVehicles.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onSelect={handleSelectVehicle}
            />
          ))}
          {filteredVehicles.length === 0 && (
            <div
              data-ocid="transfer.results.empty_state"
              className="text-center py-12 text-gray-400"
            >
              <Car className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No vehicles found for this filter</p>
              <button
                type="button"
                onClick={() => setFilterType("all")}
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

  // ── Passenger Details ────────────────────────────────────────────────────────
  if (step === "details" && selectedVehicle) {
    return (
      <div className="space-y-5">
        <button
          type="button"
          data-ocid="transfer.back_to_results.button"
          onClick={() => setStep("results")}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          ← Back to results
        </button>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">
              Passenger Details
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="pax-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lead Passenger Name *
                </label>
                <input
                  id="pax-name"
                  data-ocid="transfer.passenger_name.input"
                  type="text"
                  value={passenger.name}
                  onChange={(e) =>
                    setPassenger({ ...passenger, name: e.target.value })
                  }
                  placeholder="Enter full name as on ID"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pax-phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone *
                  </label>
                  <input
                    id="pax-phone"
                    data-ocid="transfer.passenger_phone.input"
                    type="tel"
                    value={passenger.phone}
                    onChange={(e) =>
                      setPassenger({ ...passenger, phone: e.target.value })
                    }
                    placeholder="+91 9XXXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pax-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="pax-email"
                    data-ocid="transfer.passenger_email.input"
                    type="email"
                    value={passenger.email}
                    onChange={(e) =>
                      setPassenger({ ...passenger, email: e.target.value })
                    }
                    placeholder="passenger@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="pax-notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pickup Notes (Optional)
                </label>
                <textarea
                  id="pax-notes"
                  data-ocid="transfer.pickup_notes.textarea"
                  value={passenger.pickupNotes}
                  onChange={(e) =>
                    setPassenger({ ...passenger, pickupNotes: e.target.value })
                  }
                  placeholder="E.g. Gate 3, look for blue sign..."
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h4 className="font-semibold text-gray-800 mb-3">
                Booking Summary
              </h4>
              <div
                className={`w-12 h-12 rounded-xl ${VEHICLE_COLORS[selectedVehicle.image]} flex items-center justify-center mb-3`}
              >
                <Car
                  className={`w-6 h-6 ${VEHICLE_TEXT[selectedVehicle.image]}`}
                />
              </div>
              <p className="font-semibold">{selectedVehicle.name}</p>
              <p className="text-sm text-gray-500">
                {selectedVehicle.type} · {selectedVehicle.supplier}
              </p>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">From</span>
                  <span className="font-medium text-right max-w-[150px]">
                    {from}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">To</span>
                  <span className="font-medium text-right max-w-[150px]">
                    {to}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date & Time</span>
                  <span className="font-medium">
                    {pickupDate} {pickupTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Passengers</span>
                  <span className="font-medium">{passengers}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3">
                <div className="flex justify-between text-sm">
                  <span>Vehicle fare</span>
                  <span>₹{selectedVehicle.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes & fees</span>
                  <span>₹{Math.round(selectedVehicle.price * 0.05)}</span>
                </div>
                <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-blue-700">
                    ₹
                    {(
                      selectedVehicle.price +
                      Math.round(selectedVehicle.price * 0.05)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              data-ocid="transfer.book.primary_button"
              onClick={handleBook}
              disabled={!passenger.name || !passenger.phone}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3.5 rounded-xl font-semibold transition-colors"
            >
              Confirm & Pay from Wallet
            </button>
            <p className="text-xs text-center text-gray-400">
              Amount will be deducted from your wallet balance
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Confirmation ─────────────────────────────────────────────────────────────
  if (step === "confirmed" && selectedVehicle) {
    const total =
      selectedVehicle.price + Math.round(selectedVehicle.price * 0.05);
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Transfer Booked!</h2>
            <p className="text-green-100 mt-1">Your cab has been confirmed</p>
            <div className="mt-3 bg-white/20 rounded-lg px-4 py-2 inline-block">
              <span className="text-lg font-bold">{bookingId}</span>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Passenger</span>
                <p className="font-semibold mt-0.5">{passenger.name}</p>
              </div>
              <div>
                <span className="text-gray-500">Vehicle</span>
                <p className="font-semibold mt-0.5">{selectedVehicle.name}</p>
              </div>
              <div>
                <span className="text-gray-500">Pickup</span>
                <p className="font-semibold mt-0.5">{from}</p>
              </div>
              <div>
                <span className="text-gray-500">Drop</span>
                <p className="font-semibold mt-0.5">{to}</p>
              </div>
              <div>
                <span className="text-gray-500">Date & Time</span>
                <p className="font-semibold mt-0.5">
                  {pickupDate} {pickupTime}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Total Paid</span>
                <p className="font-bold text-blue-700 mt-0.5">
                  ₹{total.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
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
                  setPassenger({
                    name: "",
                    phone: "",
                    email: "",
                    pickupNotes: "",
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
    );
  }

  return null;
}
