import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  Calendar,
  CheckCircle,
  ChevronRight,
  Download,
  Edit3,
  Hotel,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Percent,
  Plus,
  Share2,
  Sparkles,
  Star,
  Sun,
  Sunset,
  Trash2,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useState } from "react";

const INTERESTS = [
  "Beach",
  "Adventure",
  "Culture",
  "Food",
  "Shopping",
  "Nature",
  "Luxury",
  "History",
  "Nightlife",
  "Wellness",
];

const TRAVEL_FACTS = [
  "Thailand receives 40+ million tourists annually 🌴",
  "Dubai's Burj Khalifa is the world's tallest building at 828m 🏙️",
  "Singapore has over 700 green spaces and parks 🌿",
  "Bali has over 20,000 temples 🕌",
  "The Eiffel Tower grows 15cm taller in summer due to heat 🗼",
  "Japan's bullet trains run with an average delay of 54 seconds ⚡",
  "The Maldives is the world's lowest-lying country 🏝️",
  "New York City has 800+ languages spoken 🗽",
  "London has more museums per capita than any other city 🏛️",
  "Tokyo has more Michelin-starred restaurants than Paris 🍜",
];

interface Activity {
  time: string;
  icon: React.ElementType;
  title: string;
  detail: string;
  cost: number;
}

interface DayPlan {
  day: number;
  hotel: string;
  hotelCost: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  activities: Activity[];
}

interface Itinerary {
  destination: string;
  days: number;
  travelers: number;
  totalCost: number;
  plans: DayPlan[];
}

const DESTINATION_DATA: Record<
  string,
  { activities: string[][]; hotels: string[]; meals: string[][] }
> = {
  Bangkok: {
    activities: [
      [
        "Grand Palace & Wat Phra Kaew",
        "Floating Market Tour",
        "Chao Phraya River Cruise",
      ],
      [
        "Safari World & Marine Park",
        "Chatuchak Weekend Market",
        "Asiatique Night Bazaar",
      ],
      ["Wat Arun Temple", "Jim Thompson House Museum", "Khao San Road"],
      ["Damnoen Saduak Floating Market", "Erawan Shrine", "Siam Paragon Mall"],
    ],
    hotels: [
      "Centara Grand Central",
      "Mandarin Oriental Bangkok",
      "Lebua at State Tower",
      "Shangri-La Hotel",
    ],
    meals: [
      [
        "Pad Thai at Or Tor Kor",
        "Tom Yum at Raan Jay Fai",
        "Street BBQ at Yaowarat",
      ],
      [
        "Khao Man Gai at Victory Monument",
        "Green Curry at Bo.lan",
        "Mango Sticky Rice Dessert",
      ],
    ],
  },
  Dubai: {
    activities: [
      ["Burj Khalifa At The Top", "Dubai Mall & Fountain Show", "Dubai Frame"],
      ["Desert Safari with BBQ Dinner", "Dubai Museum", "Gold & Spice Souks"],
      ["Palm Jumeirah Tour", "Atlantis Aquaventure", "Dubai Marina Cruise"],
      ["Miracle Garden", "Global Village", "La Mer Beach"],
    ],
    hotels: [
      "Burj Al Arab",
      "Atlantis The Palm",
      "Jumeirah Beach Hotel",
      "Address Downtown",
    ],
    meals: [
      [
        "Arabic Breakfast at local café",
        "Shawarma at Al Ustad",
        "Dinner at Pierchic",
      ],
      [
        "Camel milk at Gold Souk",
        "Machboos at local restaurant",
        "Dessert cruise dinner",
      ],
    ],
  },
  Singapore: {
    activities: [
      [
        "Gardens by the Bay",
        "Marina Bay Sands SkyPark",
        "Clarke Quay Night Walk",
      ],
      [
        "Universal Studios Singapore",
        "S.E.A. Aquarium",
        "Sentosa Island Beach",
      ],
      ["Merlion Park", "Singapore Zoo & Night Safari", "Orchard Road Shopping"],
      ["Little India & Chinatown", "Jewel Changi Airport", "Haw Par Villa"],
    ],
    hotels: [
      "Marina Bay Sands",
      "Raffles Hotel",
      "Capella Singapore",
      "The Fullerton",
    ],
    meals: [
      [
        "Kaya Toast at Ya Kun",
        "Chilli Crab at Long Beach",
        "Hawker dinner at Lau Pa Sat",
      ],
      ["Dim Sum at Swee Choon", "Laksa at 328 Katong", "Ice Kachang dessert"],
    ],
  },
  Bali: {
    activities: [
      [
        "Ubud Monkey Forest",
        "Tegalalang Rice Terraces",
        "Uluwatu Temple Sunset",
      ],
      ["Mount Batur Sunrise Trek", "Tirta Empul Holy Spring", "Seminyak Beach"],
      ["Tanah Lot Temple", "Bali Swing", "Kuta Night Market"],
      ["Nusa Penida Day Trip", "Cooking Class", "Spa & Wellness"],
    ],
    hotels: [
      "Four Seasons Sayan",
      "COMO Shambhala Estate",
      "Alaya Resort Ubud",
      "W Bali Seminyak",
    ],
    meals: [
      [
        "Nasi Goreng breakfast",
        "Babi Guling at Ibu Oka",
        "Seafood BBQ at Jimbaran",
      ],
      [
        "Smoothie bowl at Revolver",
        "Bebek Betutu duck",
        "Satay at Warung local",
      ],
    ],
  },
  Paris: {
    activities: [
      ["Eiffel Tower Summit", "Louvre Museum", "Seine River Dinner Cruise"],
      ["Versailles Palace & Gardens", "Sacré-Cœur Basilica", "Montmartre Walk"],
      ["Musée d'Orsay", "Notre-Dame Cathedral", "Champs-Élysées Shopping"],
      [
        "Giverny Monet Garden Tour",
        "Père Lachaise Cemetery",
        "Le Marais District",
      ],
    ],
    hotels: [
      "Hotel Ritz Paris",
      "Four Seasons George V",
      "Le Bristol Paris",
      "Mandarin Oriental Paris",
    ],
    meals: [
      [
        "Croissant at Ladurée",
        "French Onion Soup at Brasserie",
        "Dinner at Le Jules Verne",
      ],
      [
        "Crêpes at street stall",
        "Steak Frites at Café de Flore",
        "Macarons at Pierre Hermé",
      ],
    ],
  },
  Maldives: {
    activities: [
      [
        "Underwater Glass Room Breakfast",
        "Snorkeling with Manta Rays",
        "Sunset Dolphin Cruise",
      ],
      [
        "Scuba Diving with Whale Sharks",
        "Sandbank Picnic",
        "Stargazing Night Tour",
      ],
      ["Spa by the Ocean", "Jet Ski Adventure", "Traditional Dhow Sailing"],
    ],
    hotels: [
      "Soneva Jani",
      "Six Senses Laamu",
      "Gili Lankanfushi",
      "Conrad Maldives",
    ],
    meals: [
      [
        "Overwater breakfast",
        "Freshly caught tuna sashimi",
        "Maldivian Garudhiya dinner",
      ],
      [
        "Tropical fruit platter",
        "BBQ lobster lunch",
        "Beachfront candlelight dinner",
      ],
    ],
  },
};

function generateItinerary(
  dest: string,
  days: number,
  travelers: number,
  budget: number,
): Itinerary {
  const data = DESTINATION_DATA[dest] || DESTINATION_DATA.Bangkok;
  const dailyBudget = budget / days;
  const hotelBase = Math.min(Math.max(dailyBudget * 0.35, 3000), 25000);
  const activityBase = dailyBudget * 0.25;
  let totalCost = 0;

  const plans: DayPlan[] = Array.from({ length: days }, (_, i) => {
    const actSet = data.activities[i % data.activities.length];
    const mealSet = data.meals[i % data.meals.length];
    const hotel = data.hotels[i % data.hotels.length];
    const hotelCost = Math.round(hotelBase * (0.8 + Math.random() * 0.4));
    totalCost += hotelCost * travelers * 0.5;

    const activities: Activity[] = [
      {
        time: "Morning",
        icon: Sun,
        title: actSet[0] || "City Exploration",
        detail: `Guided tour for ${travelers} people`,
        cost: Math.round(activityBase * 0.4),
      },
      {
        time: "Afternoon",
        icon: Sunset,
        title: actSet[1] || "Local Experience",
        detail: "Cultural immersion activity",
        cost: Math.round(activityBase * 0.35),
      },
      {
        time: "Evening",
        icon: Star,
        title: actSet[2] || "Dinner & Leisure",
        detail: "Evening entertainment",
        cost: Math.round(activityBase * 0.25),
      },
    ];

    for (const a of activities) {
      totalCost += a.cost * travelers;
    }

    return {
      day: i + 1,
      hotel,
      hotelCost,
      breakfast: mealSet[0] || "Local breakfast",
      lunch: mealSet[1] || "Restaurant lunch",
      dinner: mealSet[2] || "Dinner experience",
      activities,
    };
  });

  return {
    destination: dest,
    days,
    travelers,
    totalCost: Math.round(totalCost),
    plans,
  };
}

export function AIItineraryGenerator() {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("");
  const [customDest, setCustomDest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [numDays, setNumDays] = useState(5);
  const [budget, setBudget] = useState(75000);
  const [travelers, setTravelers] = useState(2);
  const [interests, setInterests] = useState<string[]>(["Culture", "Food"]);
  const [factIndex, setFactIndex] = useState(0);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [markup, setMarkup] = useState(15);
  const [notes, setNotes] = useState("");

  function toggleInterest(interest: string) {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  }

  function startGenerate() {
    if (!destination && !customDest) return;
    setStep(2);
    let fi = 0;
    const interval = setInterval(() => {
      fi = (fi + 1) % TRAVEL_FACTS.length;
      setFactIndex(fi);
    }, 1800);
    setTimeout(() => {
      clearInterval(interval);
      const dest = destination || customDest;
      const generated = generateItinerary(dest, numDays, travelers, budget);
      setItinerary(generated);
      setStep(3);
    }, 4000);
  }

  function exportItinerary() {
    if (!itinerary) return;
    const lines = [
      `TRAVEL ITINERARY — ${itinerary.destination.toUpperCase()}`,
      "Generated by FiveStar Travel AI",
      "-".repeat(50),
      `Destination: ${itinerary.destination}`,
      `Duration: ${itinerary.days} Days`,
      `Travelers: ${itinerary.travelers}`,
      `Total Cost: ₹${itinerary.totalCost.toLocaleString()}`,
      "",
      ...itinerary.plans.flatMap((plan) => [
        `DAY ${plan.day}`,
        `Hotel: ${plan.hotel} (₹${plan.hotelCost}/night)`,
        `Breakfast: ${plan.breakfast}`,
        `Lunch: ${plan.lunch}`,
        `Dinner: ${plan.dinner}`,
        ...plan.activities.map(
          (a) => `  ${a.time}: ${a.title} — ₹${a.cost.toLocaleString()}/person`,
        ),
        "",
      ]),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `itinerary-${itinerary.destination.toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const agentPrice = itinerary
    ? Math.round(itinerary.totalCost * (1 + markup / 100))
    : 0;
  const margin = itinerary ? agentPrice - itinerary.totalCost : 0;

  const destinations = Object.keys(DESTINATION_DATA);

  return (
    <div className="space-y-4" data-ocid="ai_itinerary.panel">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
          <Brain className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="font-display font-bold text-foreground text-lg">
            AI Itinerary Generator
          </h2>
          <p className="text-xs text-muted-foreground">
            Smart day-by-day travel plans with cost estimates
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1 text-xs">
        {["Input", "Generating", "Itinerary", "Edit", "Pricing", "Export"].map(
          (s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step > i + 1
                    ? "bg-green-500 text-white"
                    : step === i + 1
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step > i + 1 ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span
                className={
                  step === i + 1
                    ? "text-primary font-semibold hidden sm:inline"
                    : "text-muted-foreground hidden sm:inline"
                }
              >
                {s}
              </span>
              {i < 5 && (
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
          ),
        )}
      </div>

      {/* Step 1: Input Form */}
      {step === 1 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Trip Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Destination</Label>
                <Select
                  value={destination}
                  onValueChange={setDestination}
                  data-ocid="ai_itinerary.destination.select"
                >
                  <SelectTrigger data-ocid="ai_itinerary.destination.select">
                    <SelectValue placeholder="Choose destination..." />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                    <SelectItem value="__custom">Other (type below)</SelectItem>
                  </SelectContent>
                </Select>
                {destination === "__custom" && (
                  <Input
                    placeholder="Enter destination..."
                    value={customDest}
                    onChange={(e) => setCustomDest(e.target.value)}
                    className="mt-2"
                    data-ocid="ai_itinerary.custom_destination.input"
                  />
                )}
              </div>

              <div className="space-y-1.5">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  data-ocid="ai_itinerary.start_date.input"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Number of Days: {numDays}</Label>
                <input
                  type="range"
                  min={1}
                  max={14}
                  value={numDays}
                  onChange={(e) => setNumDays(Number(e.target.value))}
                  className="w-full accent-primary"
                  data-ocid="ai_itinerary.days.input"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>1 day</span>
                  <span>14 days</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Budget (₹): {budget.toLocaleString()}</Label>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-primary"
                  data-ocid="ai_itinerary.budget.input"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>₹10K</span>
                  <span>₹5L</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Travelers</Label>
                <Select
                  value={String(travelers)}
                  onValueChange={(v) => setTravelers(Number(v))}
                >
                  <SelectTrigger data-ocid="ai_itinerary.travelers.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} {n === 1 ? "Traveler" : "Travelers"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Interests</Label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <div key={interest} className="flex items-center gap-1.5">
                    <Checkbox
                      id={`interest-${interest}`}
                      checked={interests.includes(interest)}
                      onCheckedChange={() => toggleInterest(interest)}
                      data-ocid={`ai_itinerary.interest.${interest.toLowerCase()}.checkbox`}
                    />
                    <label
                      htmlFor={`interest-${interest}`}
                      className="text-sm cursor-pointer select-none"
                    >
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full"
              onClick={startGenerate}
              disabled={!destination && !customDest}
              data-ocid="ai_itinerary.generate.primary_button"
            >
              <Sparkles className="w-4 h-4 mr-2" /> Generate AI Itinerary
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Generating */}
      {step === 2 && (
        <Card>
          <CardContent className="py-16 flex flex-col items-center justify-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-purple-500/15 flex items-center justify-center">
                <Brain className="w-10 h-10 text-purple-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/40 animate-ping" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">
              AI is crafting your itinerary...
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Optimizing for your {interests.join(", ")} preferences
            </p>
            <div
              className="bg-primary/10 border border-primary/20 rounded-xl px-6 py-3 max-w-sm transition-all duration-700"
              data-ocid="ai_itinerary.loading_state"
            >
              <p className="text-sm text-primary font-medium">
                ✈️ Did you know?
              </p>
              <p className="text-sm text-foreground mt-1">
                {TRAVEL_FACTS[factIndex]}
              </p>
            </div>
            <div className="flex gap-1 mt-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={String(i)}
                  className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Itinerary Display */}
      {step === 3 && itinerary && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-xl">
                {itinerary.destination} Itinerary
              </h3>
              <p className="text-muted-foreground text-sm">
                {itinerary.days} days · {itinerary.travelers} travelers
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep(4)}
                data-ocid="ai_itinerary.edit.button"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
              <Button
                size="sm"
                onClick={() => setStep(5)}
                data-ocid="ai_itinerary.pricing.button"
              >
                <Percent className="w-3.5 h-3.5 mr-1" /> Add Markup
              </Button>
            </div>
          </div>

          {/* Summary bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Days", value: itinerary.days, icon: Calendar },
              { label: "Travelers", value: itinerary.travelers, icon: Users },
              {
                label: "Total Cost",
                value: `₹${(itinerary.totalCost).toLocaleString()}`,
                icon: Package,
              },
              {
                label: "Per Person",
                value: `₹${Math.round(itinerary.totalCost / itinerary.travelers).toLocaleString()}`,
                icon: Star,
              },
            ].map((kpi) => (
              <Card key={kpi.label} className="bg-card/60">
                <CardContent className="p-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <kpi.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      {kpi.label}
                    </p>
                    <p className="font-bold text-sm">{kpi.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <ScrollArea className="h-[500px] pr-2">
            <div className="space-y-3">
              {itinerary.plans.map((plan) => (
                <Card
                  key={plan.day}
                  className="bg-card/60"
                  data-ocid={`ai_itinerary.day.item.${plan.day}`}
                >
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Badge className="bg-primary text-white text-[10px] h-5">
                          Day {plan.day}
                        </Badge>
                        <Hotel className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground font-normal">
                          {plan.hotel}
                        </span>
                        <span className="text-muted-foreground/60">
                          — ₹{plan.hotelCost}/night
                        </span>
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    {/* Meals */}
                    <div className="flex flex-wrap gap-2 mb-3 text-xs">
                      <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 rounded px-2 py-1">
                        <UtensilsCrossed className="w-3 h-3" /> {plan.breakfast}
                      </div>
                      <div className="flex items-center gap-1 bg-orange-500/10 text-orange-600 rounded px-2 py-1">
                        <UtensilsCrossed className="w-3 h-3" /> {plan.lunch}
                      </div>
                      <div className="flex items-center gap-1 bg-purple-500/10 text-purple-600 rounded px-2 py-1">
                        <UtensilsCrossed className="w-3 h-3" /> {plan.dinner}
                      </div>
                    </div>
                    {/* Activities */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {plan.activities.map((activity) => (
                        <div
                          key={activity.time}
                          className="bg-muted/40 rounded-lg p-2.5"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <activity.icon className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[10px] text-muted-foreground font-semibold uppercase">
                              {activity.time}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-foreground">
                            {activity.title}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {activity.detail}
                          </p>
                          <p className="text-[10px] text-primary font-bold mt-1">
                            ₹{activity.cost.toLocaleString()}/person
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Step 4: Edit & Customize */}
      {step === 4 && itinerary && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg">Edit Itinerary</h3>
            <Button
              size="sm"
              onClick={() => setStep(5)}
              data-ocid="ai_itinerary.edit_done.button"
            >
              Done Editing <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {itinerary.plans.map((plan) => (
              <Card
                key={plan.day}
                className={`cursor-pointer transition-colors ${editingDay === plan.day ? "ring-2 ring-primary" : ""}`}
                onClick={() =>
                  setEditingDay(editingDay === plan.day ? null : plan.day)
                }
                data-ocid={`ai_itinerary.edit.day.item.${plan.day}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-white">
                        Day {plan.day}
                      </Badge>
                      <span className="font-semibold text-sm">
                        {plan.hotel}
                      </span>
                    </div>
                    <Edit3 className="w-4 h-4 text-muted-foreground" />
                  </div>
                  {editingDay === plan.day && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Hotel</Label>
                        <Input
                          value={plan.hotel}
                          onChange={(e) => {
                            const newPlans = itinerary.plans.map((p) =>
                              p.day === plan.day
                                ? { ...p, hotel: e.target.value }
                                : p,
                            );
                            setItinerary({ ...itinerary, plans: newPlans });
                          }}
                          className="h-8 text-xs"
                          data-ocid={`ai_itinerary.hotel.input.${plan.day}`}
                        />
                      </div>
                      {plan.activities.map((activity, ai) => (
                        <div
                          key={activity.time + plan.day}
                          className="space-y-1"
                        >
                          <Label className="text-xs">
                            {activity.time} Activity
                          </Label>
                          <Input
                            value={activity.title}
                            onChange={(e) => {
                              const newPlans = itinerary.plans.map((p) => {
                                if (p.day !== plan.day) return p;
                                const newActivities = p.activities.map(
                                  (a, idx) =>
                                    idx === ai
                                      ? { ...a, title: e.target.value }
                                      : a,
                                );
                                return { ...p, activities: newActivities };
                              });
                              setItinerary({ ...itinerary, plans: newPlans });
                            }}
                            className="h-8 text-xs"
                            data-ocid={`ai_itinerary.activity.input.${plan.day}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Pricing & Markup */}
      {step === 5 && itinerary && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg">Pricing & Markup</h3>
            <Button
              size="sm"
              onClick={() => setStep(6)}
              data-ocid="ai_itinerary.export_step.button"
            >
              Export Options <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Base Cost (total)
                  </span>
                  <span className="font-bold">
                    ₹{itinerary.totalCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Per Person</span>
                  <span className="font-semibold">
                    ₹
                    {Math.round(
                      itinerary.totalCost / itinerary.travelers,
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="border-t pt-3 space-y-2">
                  <Label className="text-xs">Markup % ({markup}%)</Label>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={markup}
                    onChange={(e) => setMarkup(Number(e.target.value))}
                    className="w-full accent-primary"
                    data-ocid="ai_itinerary.markup.input"
                  />
                </div>
                <div className="bg-primary/10 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Agent Price</span>
                    <span className="text-primary">
                      ₹{agentPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Your Margin</span>
                    <span className="text-green-500 font-bold">
                      ₹{margin.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Margin %</span>
                    <span>{markup}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add special notes for the client..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-32 text-sm resize-none"
                  data-ocid="ai_itinerary.notes.textarea"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Step 6: Export Options */}
      {step === 6 && itinerary && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="font-display font-bold text-lg">
              Your itinerary is ready!
            </h3>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Badge className="bg-green-500/15 text-green-400 border-green-500/30 mb-2">
                  ✓ {itinerary.destination} — {itinerary.days} Days
                </Badge>
                <p className="font-display text-2xl font-bold">
                  ₹{agentPrice.toLocaleString()}
                </p>
                <p className="text-muted-foreground text-sm">
                  Agent Price · ₹{margin.toLocaleString()} margin
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  className="flex-col h-16 gap-1"
                  onClick={exportItinerary}
                  data-ocid="ai_itinerary.download.button"
                >
                  <Download className="w-5 h-5" />
                  <span className="text-xs">Download TXT</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-col h-16 gap-1"
                  data-ocid="ai_itinerary.whatsapp.button"
                >
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <span className="text-xs">WhatsApp</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-col h-16 gap-1"
                  data-ocid="ai_itinerary.email.button"
                >
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-xs">Email Client</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-col h-16 gap-1"
                  data-ocid="ai_itinerary.save.button"
                >
                  <Package className="w-5 h-5 text-purple-400" />
                  <span className="text-xs">Save Package</span>
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-4 justify-center">
                <Share2 className="w-4 h-4 text-muted-foreground" />
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setStep(1)}
                  data-ocid="ai_itinerary.new.button"
                >
                  Generate another itinerary
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
