import {
  Briefcase,
  Car,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
  Star,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

export interface Vehicle {
  id: string;
  type: string;
  name: string;
  colorKey: string;
  capacity: number;
  bags: number;
  price: number;
  originalPrice: number;
  duration: string;
  distance: string;
  rating: number;
  reviews: number;
  features: string[];
  supplier: string;
  cancellation: string;
  plate: string;
  toll: boolean;
  discount: number;
}

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> =
  {
    sedan: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    suv: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
    },
    luxury: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
    minibus: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
    },
    electric: {
      bg: "bg-teal-50",
      text: "text-teal-600",
      border: "border-teal-200",
    },
  };

export function VehicleCard({
  vehicle,
  onSelect,
}: { vehicle: Vehicle; onSelect: (v: Vehicle) => void }) {
  const c = COLOR_MAP[vehicle.colorKey] ?? COLOR_MAP.sedan;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-5">
      <div className="flex items-start gap-4">
        <div
          className={`w-16 h-16 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center flex-shrink-0`}
        >
          <Car className={`w-8 h-8 ${c.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {vehicle.type}
                </span>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  {vehicle.discount}% OFF
                </span>
                {vehicle.toll && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                    Toll Included
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mt-1">
                {vehicle.name}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
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
                  {vehicle.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {vehicle.distance}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-gray-900">
                ₹{vehicle.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 line-through">
                ₹{vehicle.originalPrice.toLocaleString()}
              </div>
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
                ) : f === "Eco-Friendly" ? (
                  <Zap className="w-3 h-3" />
                ) : (
                  <CheckCircle2 className="w-3 h-3" />
                )}
                {f}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{vehicle.rating}</span>
                <span className="text-xs text-gray-400">
                  ({vehicle.reviews.toLocaleString()}) · {vehicle.supplier}
                </span>
              </div>
              <div className="text-xs text-green-600 mt-0.5 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {vehicle.cancellation}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                Plate: {vehicle.plate}
              </div>
            </div>
            <button
              type="button"
              data-ocid="transfer.select_vehicle.button"
              onClick={() => onSelect(vehicle)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
