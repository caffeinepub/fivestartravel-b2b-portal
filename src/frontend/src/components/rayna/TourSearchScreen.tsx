import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  Globe,
  MapPin,
  Minus,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import { DESTINATIONS } from "./tourData";

interface SearchParams {
  destination: string;
  date: Date;
  adults: number;
  children: number;
  nights: number;
}

interface Props {
  onSearch: (p: SearchParams) => void;
}

const POPULAR = [
  { name: "Dubai", emoji: "🏙️" },
  { name: "Abu Dhabi", emoji: "🕌" },
  { name: "Ras Al Khaimah", emoji: "⛰️" },
  { name: "Fujairah", emoji: "🌊" },
  { name: "Sharjah", emoji: "🎨" },
  { name: "Musandam", emoji: "🚢" },
  { name: "Hatta", emoji: "🏔️" },
  { name: "Al Ain", emoji: "🌿" },
];

function Counter({
  label,
  value,
  onChange,
  idPrefix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  idPrefix: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-8 h-8 rounded-full border-2 border-orange-400 text-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors"
          data-ocid={`${idPrefix}.secondary_button`}
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-6 text-center font-bold text-gray-800">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
          data-ocid={`${idPrefix}.primary_button`}
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export function TourSearchScreen({ onSearch }: Props) {
  const [destination, setDestination] = useState("UAE / Dubai");
  const [date, setDate] = useState<Date>(new Date());
  const [calOpen, setCalOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [nights, setNights] = useState(3);

  const handleSearch = () => {
    if (!destination) return;
    onSearch({ destination, date, adults, children, nights });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0F172A 0%, #1e3a5f 50%, #0F172A 100%)",
      }}
    >
      {/* Hero */}
      <div className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-10 left-20 w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, #F97316, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 right-20 w-96 h-96 rounded-full"
            style={{
              background: "radial-gradient(circle, #3B82F6, transparent)",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <Globe className="w-4 h-4 text-orange-400" />
            <span className="text-white/90 text-sm font-medium">
              FiveStar Travel — B2B Tour Platform
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            Tours & <span style={{ color: "#F97316" }}>Sightseeing</span>
          </h1>
          <p className="text-white/70 text-lg mb-10">
            Discover 219+ curated experiences in Dubai &amp; beyond
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Destination */}
              <div>
                <label
                  htmlFor="tour-destination"
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" /> Destination
                </label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger
                    id="tour-destination"
                    className="h-12 border-2 border-gray-100 focus:border-orange-400"
                    data-ocid="tour.search.select"
                  >
                    <SelectValue placeholder="Choose destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {DESTINATIONS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Date */}
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" /> Travel Date
                </span>
                <Popover open={calOpen} onOpenChange={setCalOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-start border-2 border-gray-100 hover:border-orange-400 font-normal"
                      data-ocid="tour.search.button"
                    >
                      <CalendarDays className="w-4 h-4 mr-2 text-orange-500" />
                      {date.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        if (d) {
                          setDate(d);
                          setCalOpen(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Counters */}
            <div className="mb-5 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  Travellers & Stay
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Counter
                  label="Adults"
                  value={adults}
                  onChange={setAdults}
                  idPrefix="tour.adults"
                />
                <Counter
                  label="Children"
                  value={children}
                  onChange={setChildren}
                  idPrefix="tour.children"
                />
                <Counter
                  label="Nights"
                  value={nights}
                  onChange={setNights}
                  idPrefix="tour.nights"
                />
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full h-14 text-lg font-bold rounded-xl text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, #F97316, #ea580c)",
              }}
              data-ocid="tour.search.submit_button"
            >
              <Search className="w-5 h-5 mr-2" /> Search Tours
            </Button>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-4">
          Popular Destinations
        </h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {POPULAR.map((p, i) => (
            <button
              type="button"
              key={p.name}
              onClick={() => {
                setDestination("UAE / Dubai");
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all text-white group"
              data-ocid={`tour.destination.button.${i + 1}`}
            >
              <span className="text-2xl">{p.emoji}</span>
              <span className="text-xs font-medium text-center">{p.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
