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

const ACCENT_MAP: Record<
  string,
  { stripe: string; badge: string; badgeText: string; label: string }
> = {
  sedan: {
    stripe: "bg-blue-500",
    badge: "bg-blue-900/30 border border-blue-500/40",
    badgeText: "text-blue-300",
    label: "Economy",
  },
  suv: {
    stripe: "bg-orange-500",
    badge: "bg-orange-900/30 border border-orange-500/40",
    badgeText: "text-orange-300",
    label: "Best Seller",
  },
  luxury: {
    stripe: "bg-purple-500",
    badge: "bg-purple-900/30 border border-purple-500/40",
    badgeText: "text-purple-300",
    label: "Luxury",
  },
  minibus: {
    stripe: "bg-green-500",
    badge: "bg-green-900/30 border border-green-500/40",
    badgeText: "text-green-300",
    label: "Group Travel",
  },
  electric: {
    stripe: "bg-teal-400",
    badge: "bg-teal-900/30 border border-teal-400/40",
    badgeText: "text-teal-300",
    label: "Eco / Electric",
  },
};

export function VehicleCard({
  vehicle,
  onSelect,
}: { vehicle: Vehicle; onSelect: (v: Vehicle) => void }) {
  const acc = ACCENT_MAP[vehicle.colorKey] ?? ACCENT_MAP.sedan;

  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-orange-200">
      {/* Left accent stripe */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${acc.stripe} rounded-l-2xl`}
      />

      <div className="pl-5 pr-5 pt-5 pb-4">
        <div className="flex items-start gap-4">
          {/* Car icon badge */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0B1629] to-[#0B3E8A] flex items-center justify-center flex-shrink-0 shadow-md">
            <Car className="w-8 h-8 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              {/* Left: title + meta */}
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${acc.badge} ${acc.badgeText}`}
                  >
                    {acc.label}
                  </span>
                  <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                    {vehicle.discount}% OFF
                  </span>
                  {vehicle.toll && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Toll Included
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-base leading-tight">
                  {vehicle.name}
                </h3>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#0B5ED7]" />
                    {vehicle.capacity} Seats
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#0B5ED7]" />
                    {vehicle.bags} Bags
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0B5ED7]" />
                    {vehicle.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0B5ED7]" />
                    {vehicle.distance}
                  </span>
                </div>
              </div>

              {/* Right: price */}
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-extrabold text-orange-500">
                  ₹{vehicle.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400 line-through">
                  ₹{vehicle.originalPrice.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  per vehicle
                </div>
              </div>
            </div>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {vehicle.features.map((f) => (
                <span
                  key={f}
                  className="text-xs bg-[#0B1629]/5 text-[#0B3E8A] border border-[#0B5ED7]/20 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1"
                >
                  {f === "Wi-Fi" ? (
                    <Wifi className="w-3 h-3" />
                  ) : f === "Eco-Friendly" ? (
                    <Zap className="w-3 h-3 text-teal-500" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3" />
                  )}
                  {f}
                </span>
              ))}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= Math.floor(vehicle.rating)
                          ? "fill-orange-400 text-orange-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-semibold ml-1">
                    {vehicle.rating}
                  </span>
                  <span className="text-xs text-gray-400 ml-1">
                    ({vehicle.reviews.toLocaleString()}) · {vehicle.supplier}
                  </span>
                </div>
                <div className="text-xs text-green-600 mt-0.5 flex items-center gap-1 font-medium">
                  <Shield className="w-3 h-3" />
                  {vehicle.cancellation}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Plate: {vehicle.plate}
                </div>
              </div>

              <button
                type="button"
                data-ocid="transfer.vehicle.select_button"
                onClick={() => onSelect(vehicle)}
                className="bg-gradient-to-r from-[#0B1629] to-[#0B3E8A] hover:from-[#0B3E8A] hover:to-[#0B5ED7] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-md hover:shadow-[0_0_16px_rgba(11,94,215,0.5)] group-hover:scale-105"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
