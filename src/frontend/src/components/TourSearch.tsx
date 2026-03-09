import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Globe,
  MapPin,
  Search,
  Star,
  Tag,
  Users,
  Utensils,
  X,
} from "lucide-react";
import { useState } from "react";

// ── Mock Tour Data ────────────────────────────────────────────────────────────
const DESTINATIONS = [
  "Dubai, UAE",
  "Singapore",
  "Bangkok, Thailand",
  "Maldives",
  "Paris, France",
  "Bali, Indonesia",
  "London, UK",
  "New York, USA",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Phuket, Thailand",
  "Rome, Italy",
];

const TOUR_TYPES = [
  { value: "group", label: "Group Tour" },
  { value: "private", label: "Private Tour" },
  { value: "sightseeing", label: "Sightseeing" },
  { value: "holiday", label: "Holiday Package" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
];

interface TourPackage {
  id: string;
  name: string;
  destination: string;
  duration: string;
  groupSize: string;
  type: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  includes: string[];
  highlights: string[];
  departureDate: string;
  availability: number;
  image: string;
  supplier: string;
  discount: number;
}

const MOCK_TOURS: TourPackage[] = [
  {
    id: "T001",
    name: "Dubai Extravaganza - 5 Nights",
    destination: "Dubai, UAE",
    duration: "5N/6D",
    groupSize: "2-15 pax",
    type: "Holiday Package",
    price: 52500,
    originalPrice: 62000,
    rating: 4.7,
    reviews: 284,
    includes: ["Flights", "Hotel", "Transfers", "Meals", "Visa"],
    highlights: [
      "Burj Khalifa",
      "Desert Safari",
      "Dubai Mall",
      "Palm Jumeirah",
    ],
    departureDate: "15 Mar 2026",
    availability: 8,
    image: "🏙️",
    supplier: "TBO Holidays",
    discount: 15,
  },
  {
    id: "T002",
    name: "Singapore & Sentosa Island - 4 Nights",
    destination: "Singapore",
    duration: "4N/5D",
    groupSize: "2-20 pax",
    type: "Group Tour",
    price: 38200,
    originalPrice: 44000,
    rating: 4.5,
    reviews: 196,
    includes: ["Flights", "Hotel", "Transfers", "Breakfast"],
    highlights: [
      "Universal Studios",
      "Gardens by the Bay",
      "Sentosa",
      "Clarke Quay",
    ],
    departureDate: "18 Mar 2026",
    availability: 12,
    image: "🌴",
    supplier: "Hotelbeds",
    discount: 13,
  },
  {
    id: "T003",
    name: "Bali Bliss - 6 Nights All Inclusive",
    destination: "Bali, Indonesia",
    duration: "6N/7D",
    groupSize: "2-10 pax",
    type: "Private Tour",
    price: 44800,
    originalPrice: 54000,
    rating: 4.8,
    reviews: 311,
    includes: ["Flights", "Villa", "Transfers", "All Meals", "Activities"],
    highlights: ["Ubud Temple", "Rice Terraces", "Tanah Lot", "Seminyak Beach"],
    departureDate: "22 Mar 2026",
    availability: 5,
    image: "🌺",
    supplier: "Expedia TAAP",
    discount: 17,
  },
  {
    id: "T004",
    name: "Bangkok Explorer - 3 Nights",
    destination: "Bangkok, Thailand",
    duration: "3N/4D",
    groupSize: "2-30 pax",
    type: "Sightseeing",
    price: 21500,
    originalPrice: 25800,
    rating: 4.3,
    reviews: 158,
    includes: ["Hotel", "Transfers", "Breakfast", "City Tour"],
    highlights: ["Grand Palace", "Floating Market", "Wat Pho", "Chatuchak"],
    departureDate: "20 Mar 2026",
    availability: 18,
    image: "⛩️",
    supplier: "TBO Holidays",
    discount: 17,
  },
  {
    id: "T005",
    name: "Maldives Luxury Escape - 5 Nights",
    destination: "Maldives",
    duration: "5N/6D",
    groupSize: "2-4 pax",
    type: "Holiday Package",
    price: 98000,
    originalPrice: 115000,
    rating: 4.9,
    reviews: 432,
    includes: ["Flights", "Water Villa", "Seaplane", "All Inclusive"],
    highlights: ["Overwater Bungalow", "Snorkeling", "Spa", "Sunset Cruise"],
    departureDate: "25 Mar 2026",
    availability: 3,
    image: "🏝️",
    supplier: "WebBeds",
    discount: 15,
  },
  {
    id: "T006",
    name: "Europe Highlights - 8 Nights",
    destination: "Paris, France",
    duration: "8N/9D",
    groupSize: "10-30 pax",
    type: "Group Tour",
    price: 125000,
    originalPrice: 148000,
    rating: 4.6,
    reviews: 267,
    includes: ["Flights", "Hotels", "Coaches", "Breakfast", "Guide"],
    highlights: ["Eiffel Tower", "Louvre", "Amsterdam", "Rome Colosseum"],
    departureDate: "01 Apr 2026",
    availability: 22,
    image: "🗼",
    supplier: "Hotelbeds",
    discount: 16,
  },
];

// ── TourSearch Component ──────────────────────────────────────────────────────
export function TourSearch() {
  const [destination, setDestination] = useState("");
  const [destSuggestions, setDestSuggestions] = useState<string[]>([]);
  const [showDestDrop, setShowDestDrop] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [nights, setNights] = useState("3");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [tourType, setTourType] = useState("all");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<TourPackage[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("price");
  const maxPrice = 200000;
  const [showPaxPicker, setShowPaxPicker] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [bookingStep, setBookingStep] = useState<
    "search" | "detail" | "passenger" | "confirm"
  >("search");

  function handleDestInput(val: string) {
    setDestination(val);
    if (val.length > 1) {
      const filtered = DESTINATIONS.filter((d) =>
        d.toLowerCase().includes(val.toLowerCase()),
      );
      setDestSuggestions(filtered);
      setShowDestDrop(true);
    } else {
      setShowDestDrop(false);
    }
  }

  function selectDest(d: string) {
    setDestination(d);
    setShowDestDrop(false);
  }

  function handleSearch() {
    let filtered = MOCK_TOURS;
    if (destination) {
      filtered = filtered.filter((t) =>
        t.destination.toLowerCase().includes(destination.toLowerCase()),
      );
    }
    if (tourType !== "all") {
      filtered = filtered.filter((t) =>
        t.type.toLowerCase().includes(tourType.toLowerCase()),
      );
    }
    setResults(filtered.length > 0 ? filtered : MOCK_TOURS);
    setSearched(true);
    setBookingStep("search");
  }

  const sortedResults = [...results]
    .filter((t) => t.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") return b.discount - a.discount;
      return 0;
    });

  // ── Detail / booking views ────────────────────────────────────────────────
  if (bookingStep === "detail" && selectedTour) {
    return (
      <div className="space-y-4" data-ocid="tour.detail.panel">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-sm text-primary hover:underline flex items-center gap-1"
            onClick={() => setBookingStep("search")}
            data-ocid="tour.detail.back.button"
          >
            ← Back to results
          </button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-5xl">{selectedTour.image}</span>
                <div>
                  <CardTitle className="text-xl font-bold">
                    {selectedTour.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary">{selectedTour.type}</Badge>
                    <Badge className="bg-accent/10 text-accent border-accent/20">
                      {selectedTour.duration}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedTour.destination}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-bold text-primary">
                  ₹{selectedTour.price.toLocaleString()}
                </p>
                <p className="text-xs line-through text-muted-foreground">
                  ₹{selectedTour.originalPrice.toLocaleString()}
                </p>
                <Badge className="bg-red-100 text-red-700 border-red-200 text-xs mt-1">
                  {selectedTour.discount}% OFF
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-semibold">{selectedTour.duration}</p>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Group Size</p>
                <p className="text-sm font-semibold">
                  {selectedTour.groupSize}
                </p>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <Calendar className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Departure</p>
                <p className="text-sm font-semibold">
                  {selectedTour.departureDate}
                </p>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <Globe className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Supplier</p>
                <p className="text-sm font-semibold">{selectedTour.supplier}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Tour Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTour.highlights.map((h) => (
                  <Badge key={h} variant="outline" className="text-xs">
                    {h}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">What's Included</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTour.includes.map((inc) => (
                  <span
                    key={inc}
                    className="flex items-center gap-1 text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                    {inc}
                  </span>
                ))}
              </div>
            </div>

            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total for {adults} adult{adults > 1 ? "s" : ""}
                  {children > 0 ? ` + ${children} child` : ""}
                </p>
                <p className="text-xl font-bold text-primary">
                  ₹
                  {(
                    selectedTour.price *
                    (adults + children * 0.7)
                  ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => setBookingStep("passenger")}
                data-ocid="tour.detail.book.button"
              >
                Book This Tour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (bookingStep === "passenger" && selectedTour) {
    return (
      <div className="space-y-4" data-ocid="tour.passenger.panel">
        <button
          type="button"
          className="text-sm text-primary hover:underline"
          onClick={() => setBookingStep("detail")}
          data-ocid="tour.passenger.back.button"
        >
          ← Back to tour detail
        </button>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Traveller Details</CardTitle>
            <p className="text-xs text-muted-foreground">
              {selectedTour.name} · {selectedTour.destination} ·{" "}
              {selectedTour.departureDate}
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            {Array.from({ length: adults }, (_, idx) => idx).map((i) => (
              <div
                key={`adult-${i}`}
                className="border rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-primary">
                  Adult {i + 1}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs">Title</Label>
                    <Select>
                      <SelectTrigger
                        className="h-9"
                        data-ocid={`tour.passenger.title.select.${i + 1}`}
                      >
                        <SelectValue placeholder="Mr" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mr">Mr</SelectItem>
                        <SelectItem value="mrs">Mrs</SelectItem>
                        <SelectItem value="ms">Ms</SelectItem>
                        <SelectItem value="dr">Dr</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">First Name</Label>
                    <Input
                      className="h-9"
                      placeholder="First name"
                      data-ocid={`tour.passenger.first_name.input.${i + 1}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Last Name</Label>
                    <Input
                      className="h-9"
                      placeholder="Last name"
                      data-ocid={`tour.passenger.last_name.input.${i + 1}`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Passport Number</Label>
                    <Input
                      className="h-9"
                      placeholder="A1234567"
                      data-ocid={`tour.passenger.passport.input.${i + 1}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Nationality</Label>
                    <Input
                      className="h-9"
                      placeholder="Indian"
                      data-ocid={`tour.passenger.nationality.input.${i + 1}`}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="border rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold">Contact Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Email</Label>
                  <Input
                    className="h-9"
                    type="email"
                    placeholder="email@example.com"
                    data-ocid="tour.passenger.email.input"
                  />
                </div>
                <div>
                  <Label className="text-xs">Mobile</Label>
                  <Input
                    className="h-9"
                    placeholder="+91 98000 00000"
                    data-ocid="tour.passenger.mobile.input"
                  />
                </div>
              </div>
            </div>

            <div className="bg-muted/40 rounded-lg p-4">
              <div className="flex justify-between text-sm mb-1">
                <span>
                  Tour price ({adults} adult{adults > 1 ? "s" : ""})
                </span>
                <span>₹{(selectedTour.price * adults).toLocaleString()}</span>
              </div>
              {children > 0 && (
                <div className="flex justify-between text-sm mb-1">
                  <span>{children} child (30% disc)</span>
                  <span>
                    ₹
                    {(selectedTour.price * children * 0.7).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 0 },
                    )}
                  </span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total Amount</span>
                <span className="text-primary">
                  ₹
                  {(
                    selectedTour.price *
                    (adults + children * 0.7)
                  ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => setBookingStep("confirm")}
              data-ocid="tour.passenger.confirm.button"
            >
              Confirm & Pay from Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (bookingStep === "confirm" && selectedTour) {
    const bookingRef = `FST-T-${Math.floor(100000 + Math.random() * 900000)}`;
    const totalAmt = selectedTour.price * (adults + children * 0.7);
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[400px] space-y-5"
        data-ocid="tour.confirm.panel"
      >
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
          <span className="text-3xl">✅</span>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">
            Booking Confirmed!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your tour has been booked successfully.
          </p>
        </div>
        <Card className="w-full max-w-md">
          <CardContent className="pt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking Ref</span>
              <span className="font-bold text-primary">{bookingRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tour</span>
              <span className="font-medium text-right max-w-[60%]">
                {selectedTour.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Destination</span>
              <span>{selectedTour.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Departure</span>
              <span>{selectedTour.departureDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Travellers</span>
              <span>
                {adults} Adult{adults > 1 ? "s" : ""}
                {children > 0 ? ` + ${children} Child` : ""}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-base">
              <span>Amount Paid</span>
              <span className="text-accent">
                ₹
                {totalAmt.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-3">
          <Button variant="outline" data-ocid="tour.confirm.download.button">
            Download Voucher
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              setBookingStep("search");
              setSearched(false);
            }}
            data-ocid="tour.confirm.new_search.button"
          >
            New Search
          </Button>
        </div>
      </div>
    );
  }

  // ── Search & Results View ─────────────────────────────────────────────────
  return (
    <div className="space-y-5" data-ocid="tour.search.panel">
      {/* Search Box */}
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Tour & Holiday Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="holiday" className="w-full">
            <TabsList className="mb-4" data-ocid="tour.search.type.tab">
              {TOUR_TYPES.map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="text-xs px-3"
                  onClick={() => setTourType(t.value)}
                  data-ocid={`tour.search.tab.${t.value}`}
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={tourType !== "all" ? tourType : "holiday"}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Destination */}
                <div className="relative">
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Destination
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input
                      className="pl-7 h-10"
                      placeholder="Where to?"
                      value={destination}
                      onChange={(e) => handleDestInput(e.target.value)}
                      data-ocid="tour.search.destination.input"
                    />
                    {destination && (
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => {
                          setDestination("");
                          setShowDestDrop(false);
                        }}
                      >
                        <X className="w-3 h-3 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                  {showDestDrop && destSuggestions.length > 0 && (
                    <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                      {destSuggestions.map((d) => (
                        <button
                          key={d}
                          type="button"
                          className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                          onClick={() => selectDest(d)}
                        >
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          {d}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Travel Date */}
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Travel Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pl-7 h-10"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      data-ocid="tour.search.date.input"
                    />
                  </div>
                </div>

                {/* Nights */}
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Nights
                  </Label>
                  <Select value={nights} onValueChange={setNights}>
                    <SelectTrigger
                      className="h-10"
                      data-ocid="tour.search.nights.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["2", "3", "4", "5", "6", "7", "8", "9", "10", "14"].map(
                        (n) => (
                          <SelectItem key={n} value={n}>
                            {n} Nights
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Travellers */}
                <div className="relative">
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Travellers
                  </Label>
                  <button
                    type="button"
                    className="w-full h-10 border border-input rounded-md px-3 flex items-center justify-between text-sm bg-background hover:bg-muted/50 transition-colors"
                    onClick={() => setShowPaxPicker(!showPaxPicker)}
                    data-ocid="tour.search.pax.button"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      {adults} Adult{adults > 1 ? "s" : ""}
                      {children > 0 ? ` · ${children} Child` : ""}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  {showPaxPicker && (
                    <div
                      className="absolute z-30 right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg p-4 w-52"
                      data-ocid="tour.pax.popover"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Adults</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-muted"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            data-ocid="tour.pax.adults.dec"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-sm">
                            {adults}
                          </span>
                          <button
                            type="button"
                            className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-muted"
                            onClick={() => setAdults(Math.min(30, adults + 1))}
                            data-ocid="tour.pax.adults.inc"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Children</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-muted"
                            onClick={() =>
                              setChildren(Math.max(0, children - 1))
                            }
                            data-ocid="tour.pax.children.dec"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-sm">
                            {children}
                          </span>
                          <button
                            type="button"
                            className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-muted"
                            onClick={() =>
                              setChildren(Math.min(10, children + 1))
                            }
                            data-ocid="tour.pax.children.inc"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-3"
                        onClick={() => setShowPaxPicker(false)}
                        data-ocid="tour.pax.done.button"
                      >
                        Done
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Button
                  className="bg-primary hover:bg-primary/90 px-8"
                  onClick={handleSearch}
                  data-ocid="tour.search.submit.button"
                >
                  <Search className="w-4 h-4 mr-2" /> Search Tours
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDestination("");
                    setFromDate("");
                    setNights("3");
                    setAdults(2);
                    setChildren(0);
                    setSearched(false);
                  }}
                  data-ocid="tour.search.clear.button"
                >
                  Clear
                </Button>
              </div>
            </TabsContent>

            {/* Render all tabs */}
            {TOUR_TYPES.filter((t) => t.value !== tourType).map((t) => (
              <TabsContent key={t.value} value={t.value} />
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Trending if not searched */}
      {!searched && (
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" /> Trending Destinations
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              "Dubai 🏙️",
              "Singapore 🌴",
              "Bali 🌺",
              "Bangkok ⛩️",
              "Maldives 🏝️",
              "Paris 🗼",
            ].map((dest, i) => (
              <button
                key={dest}
                type="button"
                className="flex flex-col items-center gap-1 p-3 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-sm transition-all text-center"
                onClick={() => {
                  setDestination(dest.split(" ")[0]);
                }}
                data-ocid={`tour.trending.item.${i + 1}`}
              >
                <span className="text-2xl">{dest.split(" ")[1]}</span>
                <span className="text-xs font-medium">
                  {dest.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {searched && (
        <div>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-sm font-semibold">
              {sortedResults.length} packages found
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    className="h-8 w-32 text-xs"
                    data-ocid="tour.results.sort.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Cheapest First</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="discount">Best Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-3" data-ocid="tour.results.list">
            {sortedResults.map((tour, i) => (
              <Card
                key={tour.id}
                className="border border-border hover:border-primary/30 hover:shadow-md transition-all"
                data-ocid={`tour.results.item.${i + 1}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Emoji thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 text-3xl">
                      {tour.image}
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm leading-tight">
                            {tour.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                              <MapPin className="w-3 h-3" />
                              {tour.destination}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0"
                            >
                              {tour.type}
                            </Badge>
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] px-1.5 py-0">
                              {tour.duration}
                            </Badge>
                          </div>
                        </div>
                        {/* Price block */}
                        <div className="text-right flex-shrink-0">
                          <Badge className="bg-red-100 text-red-600 border-red-200 text-[10px] mb-0.5">
                            {tour.discount}% OFF
                          </Badge>
                          <p className="text-base font-bold text-primary">
                            ₹{tour.price.toLocaleString()}
                          </p>
                          <p className="text-xs line-through text-muted-foreground">
                            ₹{tour.originalPrice.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            per person
                          </p>
                        </div>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span className="flex items-center gap-0.5 text-xs">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{tour.rating}</span>
                          <span className="text-muted-foreground">
                            ({tour.reviews})
                          </span>
                        </span>
                        <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          {tour.groupSize}
                        </span>
                        <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          Departs {tour.departureDate}
                        </span>
                        {tour.availability <= 5 && (
                          <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-[10px] px-1.5 py-0">
                            Only {tour.availability} left!
                          </Badge>
                        )}
                      </div>

                      {/* Includes */}
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {tour.includes.map((inc) => (
                          <span
                            key={inc}
                            className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                          >
                            {inc === "Meals" ||
                            inc === "All Meals" ||
                            inc === "All Inclusive" ||
                            inc === "Breakfast" ? (
                              <Utensils className="w-2.5 h-2.5" />
                            ) : null}
                            {inc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expand / Book row */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <button
                      type="button"
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                      onClick={() =>
                        setExpandedId(expandedId === tour.id ? null : tour.id)
                      }
                      data-ocid={`tour.results.expand.${i + 1}`}
                    >
                      {expandedId === tour.id ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                      {expandedId === tour.id ? "Hide" : "View"} Highlights
                    </button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => {
                          setSelectedTour(tour);
                          setBookingStep("detail");
                        }}
                        data-ocid={`tour.results.detail.${i + 1}`}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs h-8 bg-primary hover:bg-primary/90"
                        onClick={() => {
                          setSelectedTour(tour);
                          setBookingStep("passenger");
                        }}
                        data-ocid={`tour.results.book.${i + 1}`}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>

                  {/* Expanded highlights */}
                  {expandedId === tour.id && (
                    <div className="mt-3 pt-3 border-t border-dashed border-border">
                      <p className="text-xs font-medium mb-2">
                        Tour Highlights
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.map((h) => (
                          <Badge key={h} variant="outline" className="text-xs">
                            {h}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Supplier: {tour.supplier}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {sortedResults.length === 0 && (
              <div
                className="text-center py-12"
                data-ocid="tour.results.empty_state"
              >
                <Globe className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  No tours found. Try a different destination or date.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
