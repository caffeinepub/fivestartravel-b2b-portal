import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Mail, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import type { CartItem, Tour, TourOption } from "./tourData";
import { INR } from "./tourData";

const TRANSFER_OPTIONS = [
  "Without Transfers",
  "Sharing Transfers",
  "Private Transfers",
];

const CAT_COLORS: Record<string, string> = {
  "Dhow Cruise": "from-blue-400 to-cyan-600",
  "Desert Safari Tours": "from-amber-400 to-orange-600",
  "City Tours": "from-indigo-400 to-purple-600",
  "Theme Parks": "from-pink-400 to-rose-600",
  "Adventure Tours": "from-green-400 to-teal-600",
  "Water Activities": "from-cyan-400 to-blue-600",
  "Helicopter Tours": "from-gray-400 to-slate-600",
  "Hot Air Balloon": "from-yellow-400 to-orange-500",
  "Yacht Charter": "from-blue-500 to-indigo-700",
  "Culture and Attractions": "from-purple-400 to-violet-600",
};

function getCatGradient(cat: string) {
  return CAT_COLORS[cat] || "from-slate-400 to-slate-600";
}

function CancellationBadge({ text }: { text: string }) {
  if (text === "Non Refundable")
    return (
      <Badge className="bg-red-50 text-red-600 border-red-200 text-xs font-medium">
        Non Refundable
      </Badge>
    );
  if (text.includes("48 hours"))
    return (
      <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-medium">
        {text}
      </Badge>
    );
  if (text === "Yas Island Cancellation Policy")
    return (
      <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-medium">
        {text}
      </Badge>
    );
  return (
    <Badge className="bg-green-50 text-green-700 border-green-200 text-xs font-medium">
      {text}
    </Badge>
  );
}

interface OptionRowProps {
  opt: TourOption;
  searchDate: Date;
  adults: number;
  childrenCount: number;
  tourId: number;
  tourName: string;
  onAddToCart: (item: CartItem) => void;
}

function OptionRow({
  opt,
  searchDate,
  adults,
  childrenCount,
  tourId,
  tourName,
  onAddToCart,
}: OptionRowProps) {
  const [transfer, setTransfer] = useState("Without Transfers");
  const [date, setDate] = useState(searchDate.toISOString().split("T")[0]);
  const [adultCount, setAdultCount] = useState(adults);
  const [childCount, setChildCount] = useState(childrenCount);
  const [infantCount, setInfantCount] = useState(0);

  const total = opt.price * (adultCount + childCount);

  const handleAddToCart = () => {
    onAddToCart({
      tourId,
      tourName,
      optionName: opt.name,
      transferOption: transfer,
      date,
      adults: adultCount,
      children: childCount,
      infants: infantCount,
      unitPrice: opt.price,
      totalPrice: total,
      rPoints: opt.rPoints || 0,
    });
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-3 text-sm">
        <div className="font-medium text-gray-800">{opt.name}</div>
        {opt.nonRefundable && (
          <Badge className="bg-red-50 text-red-600 border-red-200 text-xs mt-1">
            Non Refundable
          </Badge>
        )}
        {opt.cancellation && (
          <div className="text-xs text-green-600 mt-1">{opt.cancellation}</div>
        )}
      </td>
      <td className="py-3 px-3">
        <select
          value={transfer}
          onChange={(e) => setTransfer(e.target.value)}
          className="text-xs border rounded px-2 py-1 bg-white"
          data-ocid="tour.option.select"
        >
          {TRANSFER_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </td>
      <td className="py-3 px-3">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="text-xs border rounded px-2 py-1 w-32"
          data-ocid="tour.option.input"
        />
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-orange-400"
            data-ocid="tour.option.secondary_button"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-5 text-center text-sm font-bold">
            {adultCount}
          </span>
          <button
            type="button"
            onClick={() => setAdultCount(adultCount + 1)}
            className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
            data-ocid="tour.option.primary_button"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setChildCount(Math.max(0, childCount - 1))}
            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-orange-400"
            data-ocid="tour.option.secondary_button"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-5 text-center text-sm font-bold">
            {childCount}
          </span>
          <button
            type="button"
            onClick={() => setChildCount(childCount + 1)}
            className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
            data-ocid="tour.option.primary_button"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setInfantCount(Math.max(0, infantCount - 1))}
            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center"
            data-ocid="tour.option.secondary_button"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-5 text-center text-sm font-bold">
            {infantCount}
          </span>
          <button
            type="button"
            onClick={() => setInfantCount(infantCount + 1)}
            className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center"
            data-ocid="tour.option.primary_button"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </td>
      <td className="py-3 px-3 text-right">
        <div className="font-bold text-gray-900 text-sm">{INR(total)}</div>
        {(opt.rPoints || 0) > 0 && (
          <div className="text-xs text-yellow-600 font-medium mt-0.5">
            🏅 Earn {opt.rPoints} R Points
          </div>
        )}
        <button
          type="button"
          onClick={handleAddToCart}
          className="text-xs text-orange-600 underline mt-1 hover:text-orange-700"
          data-ocid="tour.option.button"
        >
          Add
        </button>
      </td>
    </tr>
  );
}

interface TourCardProps {
  tour: Tour;
  searchDate: Date;
  searchAdults: number;
  searchChildren: number;
  emailFlyers: number[];
  onToggleFlyer: (id: number) => void;
  onAddToCart: (item: CartItem) => void;
  cardIndex: number;
}

export function TourCard({
  tour,
  searchDate,
  searchAdults,
  searchChildren,
  emailFlyers,
  onToggleFlyer,
  onAddToCart,
  cardIndex,
}: TourCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "options" | "about" | "inclusion" | "info"
  >("options");
  const inFlyer = emailFlyers.includes(tour.id);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-3 hover:shadow-md transition-shadow">
      <div className="flex gap-0">
        {/* Image */}
        <div
          className={`w-48 min-h-36 flex-shrink-0 bg-gradient-to-br ${getCatGradient(tour.category)} relative`}
        >
          {tour.recommended && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              ⭐ Recommended
            </span>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/80 text-xs font-medium text-center px-2">
              {tour.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-900 text-base leading-tight">
              {tour.name}
            </h3>
            <button
              type="button"
              onClick={() => onToggleFlyer(tour.id)}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors whitespace-nowrap ${
                inFlyer
                  ? "bg-orange-50 border-orange-300 text-orange-600"
                  : "border-gray-200 text-gray-500 hover:border-orange-300"
              }`}
              data-ocid={`tour.item.toggle.${cardIndex}`}
            >
              <Mail className="w-3 h-3" /> {inFlyer ? "In Flyer" : "Add Flyer"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 my-2">
            <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
              ✓ Instant Confirmation
            </Badge>
            <CancellationBadge text={tour.cancellation} />
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">
                  {tour.reviews.toLocaleString()}
                </span>
                <span className="text-gray-400">reviews</span>
              </div>
              {(tour.rPoints || 0) > 0 && (
                <span className="text-xs bg-yellow-50 border border-yellow-200 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                  🏅 Earn {tour.rPoints} R Points
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-gray-400">from</div>
                <div className="text-lg font-bold text-gray-900">
                  {INR(tour.price)}
                </div>
              </div>
              <Button
                onClick={() => setExpanded(!expanded)}
                className="text-white font-bold px-5 py-2 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #F97316, #ea580c)",
                }}
                data-ocid={`tour.item.button.${cardIndex}`}
              >
                {expanded ? (
                  <ChevronUp className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 mr-1" />
                )}
                {expanded ? "Close" : "Select"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Section */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50">
          {/* Tab bar */}
          <div className="flex border-b border-gray-200 bg-white">
            {(["options", "about", "inclusion", "info"] as const).map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                data-ocid={`tour.item.tab.${cardIndex}`}
              >
                {tab === "options"
                  ? "Tour Options"
                  : tab === "about"
                    ? "About"
                    : tab === "inclusion"
                      ? "Inclusions"
                      : "Important Info"}
              </button>
            ))}
          </div>

          {activeTab === "options" && (
            <div className="overflow-x-auto p-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-xs">
                    <th className="py-2 px-3 text-left">Tour Option</th>
                    <th className="py-2 px-3 text-left">Transfer</th>
                    <th className="py-2 px-3 text-left">Date</th>
                    <th className="py-2 px-2 text-left">Adult</th>
                    <th className="py-2 px-2 text-left">Child</th>
                    <th className="py-2 px-2 text-left">Infant</th>
                    <th className="py-2 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {tour.options.map((opt) => (
                    <OptionRow
                      key={opt.name}
                      opt={opt}
                      searchDate={searchDate}
                      adults={searchAdults}
                      childrenCount={searchChildren}
                      tourId={tour.id}
                      tourName={tour.name}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end gap-3 mt-3 pt-3 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleFlyer(tour.id)}
                  data-ocid={`tour.item.secondary_button.${cardIndex}`}
                >
                  <Mail className="w-3 h-3 mr-1" /> Add to Email Flyer
                </Button>
                <Button
                  size="sm"
                  className="text-white"
                  style={{
                    background: "linear-gradient(135deg, #F97316, #ea580c)",
                  }}
                  onClick={() => {
                    const opt = tour.options[0];
                    const total = opt.price * (searchAdults + searchChildren);
                    onAddToCart({
                      tourId: tour.id,
                      tourName: tour.name,
                      optionName: opt.name,
                      transferOption: "Without Transfers",
                      date: searchDate.toISOString().split("T")[0],
                      adults: searchAdults,
                      children: searchChildren,
                      infants: 0,
                      unitPrice: opt.price,
                      totalPrice: total,
                      rPoints: opt.rPoints || 0,
                    });
                  }}
                  data-ocid={`tour.item.primary_button.${cardIndex}`}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-xs text-gray-500 mb-1">
                    Voucher Confirmation
                  </div>
                  <div className="text-sm font-semibold">📱 Mobile Voucher</div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-xs text-gray-500 mb-1">
                    Booking Confirmation
                  </div>
                  <div className="text-sm font-semibold">
                    ✅ Instant Confirmation
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="px-3 py-2 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
                  Timings & Duration
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs">
                        Transfers Type
                      </th>
                      <th className="px-3 py-2 text-left text-xs">
                        Pickup Timings
                      </th>
                      <th className="px-3 py-2 text-left text-xs">
                        Duration Approx
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-3 py-2 text-xs">Sharing Transfers</td>
                      <td className="px-3 py-2 text-xs">
                        Pickup around 10 am, Drop off around 6:00 pm
                      </td>
                      <td className="px-3 py-2 text-xs">08:00 hours</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2 text-xs">Private Transfers</td>
                      <td className="px-3 py-2 text-xs">
                        Recommended around 9:30 am
                      </td>
                      <td className="px-3 py-2 text-xs">08:00 hours</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2 text-xs">Without Transfers</td>
                      <td className="px-3 py-2 text-xs">Opens at 10:00 am</td>
                      <td className="px-3 py-2 text-xs">06:00 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="text-xs font-semibold text-amber-700 mb-1">
                  Cancellation Policy
                </div>
                <div className="text-xs text-amber-600">
                  {tour.cancellation}. If Cancellation is made within the policy
                  window, 100% charges will be applicable. Refund will be
                  returned to your account within 7 working days.
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-xs font-semibold text-blue-700 mb-1">
                  Child Policy
                </div>
                <div className="text-xs text-blue-600">
                  Children aged 2 and under may enter for free. Individuals aged
                  3 and above must hold a valid, paid admission ticket.
                </div>
              </div>
            </div>
          )}

          {activeTab === "inclusion" && (
            <div className="p-4">
              <ul className="space-y-2 text-sm">
                {[
                  "Admission ticket",
                  "Guide (where applicable)",
                  "Transport in AC vehicle (if transfer selected)",
                  "Bottled water",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="text-green-500">✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <div className="text-xs font-semibold text-red-600 mb-2">
                  Exclusions
                </div>
                <ul className="space-y-1 text-xs text-gray-500">
                  {[
                    "Personal expenses",
                    "Gratuities",
                    "Food & beverages (unless specified)",
                  ].map((excl) => (
                    <li key={excl} className="flex items-center gap-2">
                      <span className="text-red-400">✗</span> {excl}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "info" && (
            <div className="p-4 text-sm text-gray-600 space-y-2">
              <p>• Carry a valid photo ID at all times during the tour.</p>
              <p>
                • Wear comfortable clothes and footwear suitable for walking.
              </p>
              <p>
                • Tours operate rain or shine; no refunds for weather
                conditions.
              </p>
              <p>• Mobile voucher must be presented at the entry point.</p>
              <p>
                • Arrival 15 minutes before the scheduled departure is
                recommended.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
