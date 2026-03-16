import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Anchor,
  Car,
  Edit,
  FileText,
  Globe,
  Hotel,
  Package,
  Plane,
  PlusCircle,
  Shield,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const glassBg = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

interface InventoryItem {
  id: string;
  name: string;
  destination: string;
  price: string;
  status: "Active" | "Inactive" | "Draft";
  availability: string;
  type: string;
}

const MOCK_INVENTORY: Record<string, InventoryItem[]> = {
  flight: [
    {
      id: "F001",
      name: "AI-DEL-DXB Economy",
      destination: "Dubai",
      price: "18,500",
      status: "Active",
      availability: "42 seats",
      type: "flight",
    },
    {
      id: "F002",
      name: "EK-BOM-LHR Business",
      destination: "London",
      price: "1,25,000",
      status: "Active",
      availability: "8 seats",
      type: "flight",
    },
  ],
  hotel: [
    {
      id: "H001",
      name: "Grand Hyatt Dubai",
      destination: "Dubai",
      price: "18,500/night",
      status: "Active",
      availability: "24 rooms",
      type: "hotel",
    },
    {
      id: "H002",
      name: "Taj Palace Delhi",
      destination: "Delhi",
      price: "12,200/night",
      status: "Active",
      availability: "18 rooms",
      type: "hotel",
    },
    {
      id: "H003",
      name: "Le Meridien Chandigarh",
      destination: "Chandigarh",
      price: "6,500/night",
      status: "Inactive",
      availability: "8 rooms",
      type: "hotel",
    },
  ],
  tour: [
    {
      id: "T001",
      name: "Desert Safari Dubai",
      destination: "Dubai",
      price: "2,800/person",
      status: "Active",
      availability: "40 seats",
      type: "tour",
    },
    {
      id: "T002",
      name: "Dubai City Tour",
      destination: "Dubai",
      price: "1,200/person",
      status: "Active",
      availability: "30 seats",
      type: "tour",
    },
  ],
  transfer: [
    {
      id: "TR001",
      name: "Airport Transfer DXB",
      destination: "Dubai Airport",
      price: "2,400/trip",
      status: "Active",
      availability: "12 vehicles",
      type: "transfer",
    },
  ],
  visa: [
    {
      id: "V001",
      name: "UAE Tourist Visa 30D",
      destination: "UAE",
      price: "8,500",
      status: "Active",
      availability: "Unlimited",
      type: "visa",
    },
    {
      id: "V002",
      name: "Schengen Visa",
      destination: "Europe",
      price: "12,000",
      status: "Active",
      availability: "Unlimited",
      type: "visa",
    },
  ],
  cruise: [
    {
      id: "C001",
      name: "MSC Dubai 7N Cruise",
      destination: "Dubai",
      price: "85,000/person",
      status: "Active",
      availability: "15 cabins",
      type: "cruise",
    },
  ],
  insurance: [
    {
      id: "I001",
      name: "Global Travel Shield",
      destination: "Worldwide",
      price: "850/day",
      status: "Active",
      availability: "Unlimited",
      type: "insurance",
    },
  ],
  package: [
    {
      id: "P001",
      name: "Dubai 5N Honeymoon",
      destination: "Dubai",
      price: "75,000/couple",
      status: "Active",
      availability: "10 spots",
      type: "package",
    },
    {
      id: "P002",
      name: "Europe 10N Grand Tour",
      destination: "Europe",
      price: "2,20,000/person",
      status: "Draft",
      availability: "8 spots",
      type: "package",
    },
  ],
};

const SERVICE_TABS = [
  { key: "flight", label: "Flights", icon: Plane, color: "#3B82F6" },
  { key: "hotel", label: "Hotels", icon: Hotel, color: "#8B5CF6" },
  { key: "tour", label: "Tours", icon: Globe, color: "#10B981" },
  { key: "transfer", label: "Transfers", icon: Car, color: "#F59E0B" },
  { key: "visa", label: "Visa", icon: FileText, color: "#EF4444" },
  { key: "cruise", label: "Cruise", icon: Anchor, color: "#06B6D4" },
  { key: "insurance", label: "Insurance", icon: Shield, color: "#84CC16" },
  { key: "package", label: "Packages", icon: Package, color: "#F97316" },
];

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-green-500/20 text-green-400 border-green-500/30",
  Inactive: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  Draft: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

function FlightForm({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"manual" | "api">("manual");
  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        <Button
          size="sm"
          onClick={() => setMode("manual")}
          className={
            mode === "manual"
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-slate-300"
          }
          data-ocid="flight-inv.manual.toggle"
        >
          Manual Entry
        </Button>
        <Button
          size="sm"
          onClick={() => setMode("api")}
          className={
            mode === "api"
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-slate-300"
          }
          data-ocid="flight-inv.api.toggle"
        >
          API Integration
        </Button>
      </div>
      {mode === "manual" ? (
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              ["Airline Name", "flight-inv.airline.input"],
              ["Flight Number", "flight-inv.flightno.input"],
              ["Origin City", "flight-inv.origin.input"],
              ["Destination City", "flight-inv.destination.input"],
              ["Departure Time", "flight-inv.departure.input"],
              ["Arrival Time", "flight-inv.arrival.input"],
              ["Total Seats", "flight-inv.totalseats.input"],
              ["Available Seats", "flight-inv.availseats.input"],
              ["Base Price", "flight-inv.price.input"],
              ["Baggage Allowance kg", "flight-inv.baggage.input"],
            ] as [string, string][]
          ).map(([label, ocid]) => (
            <div key={label}>
              <Label className="text-slate-400 text-xs">{label}</Label>
              <Input
                className="mt-1 bg-white/5 border-white/10 text-white"
                data-ocid={ocid}
              />
            </div>
          ))}
          <div className="col-span-2">
            <Label className="text-slate-400 text-xs">Fare Class</Label>
            <Select>
              <SelectTrigger
                className="mt-1 bg-white/5 border-white/10 text-white"
                data-ocid="flight-inv.fareclass.select"
              >
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {["Economy", "Premium Economy", "Business", "First Class"].map(
                  (c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Label className="text-slate-400 text-xs">Fare Rules</Label>
            <Textarea
              className="mt-1 bg-white/5 border-white/10 text-white"
              rows={3}
              data-ocid="flight-inv.farerules.textarea"
            />
          </div>
          <div className="col-span-2">
            <Label className="text-slate-400 text-xs">Ticket Conditions</Label>
            <Textarea
              className="mt-1 bg-white/5 border-white/10 text-white"
              rows={2}
              data-ocid="flight-inv.conditions.textarea"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <Label className="text-slate-400 text-xs">API Provider</Label>
            <Select>
              <SelectTrigger
                className="mt-1 bg-white/5 border-white/10 text-white"
                data-ocid="flight-inv.apiprovider.select"
              >
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {["TripJack", "Amadeus", "Sabre", "Galileo", "Mystifly"].map(
                  (p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-slate-400 text-xs">API Key</Label>
            <Input
              className="mt-1 bg-white/5 border-white/10 text-white font-mono"
              data-ocid="flight-inv.apikey.input"
            />
          </div>
          <div>
            <Label className="text-slate-400 text-xs">Endpoint URL</Label>
            <Input
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid="flight-inv.apiurl.input"
            />
          </div>
          <Button
            className="w-full bg-blue-600 text-white"
            data-ocid="flight-inv.testapi.button"
          >
            Test API Connection
          </Button>
        </div>
      )}
      <div className="flex gap-2 pt-2">
        <Button
          className="flex-1 bg-orange-600 text-white"
          data-ocid="flight-inv.save.button"
          onClick={onClose}
        >
          Save Inventory
        </Button>
        <Button
          variant="outline"
          className="border-white/20 text-slate-300"
          data-ocid="flight-inv.cancel.button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

function HotelForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["Hotel Name", "hotel-inv.name.input"],
            ["Star Rating", "hotel-inv.stars.input"],
            ["City", "hotel-inv.city.input"],
            ["Country", "hotel-inv.country.input"],
            ["Base Price/Night", "hotel-inv.price.input"],
            ["Total Rooms", "hotel-inv.rooms.input"],
          ] as [string, string][]
        ).map(([label, ocid]) => (
          <div key={label}>
            <Label className="text-slate-400 text-xs">{label}</Label>
            <Input
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid={ocid}
            />
          </div>
        ))}
        <div className="col-span-2">
          <Label className="text-slate-400 text-xs">Full Address</Label>
          <Input
            className="mt-1 bg-white/5 border-white/10 text-white"
            data-ocid="hotel-inv.address.input"
          />
        </div>
      </div>
      <div>
        <Label className="text-slate-400 text-xs mb-2 block">Meal Plans</Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            "EP (Room Only)",
            "CP (Breakfast)",
            "MAP (Half Board)",
            "AP (Full Board)",
          ].map((m) => (
            <label
              key={m}
              className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer"
            >
              <input type="checkbox" className="accent-orange-500" />
              {m}
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-slate-400 text-xs mb-2 block">Amenities</Label>
        <div className="grid grid-cols-3 gap-2">
          {[
            "WiFi",
            "Pool",
            "Gym",
            "Spa",
            "Restaurant",
            "Parking",
            "AC",
            "Room Service",
            "Business Center",
          ].map((a) => (
            <label
              key={a}
              className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer"
            >
              <input type="checkbox" className="accent-orange-500" />
              {a}
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-slate-400 text-xs">Cancellation Policy</Label>
        <Textarea
          className="mt-1 bg-white/5 border-white/10 text-white"
          rows={2}
          data-ocid="hotel-inv.cancellation.textarea"
        />
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-orange-600 text-white"
          data-ocid="hotel-inv.save.button"
          onClick={onClose}
        >
          Save Hotel
        </Button>
        <Button
          variant="outline"
          className="border-white/20 text-slate-300"
          data-ocid="hotel-inv.cancel.button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

function TourForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["Tour Name", "tour-inv.name.input"],
            ["Destination", "tour-inv.destination.input"],
            ["Duration (hours)", "tour-inv.duration.input"],
            ["Price/Adult", "tour-inv.price.input"],
            ["Price/Child", "tour-inv.childprice.input"],
            ["Available Seats", "tour-inv.seats.input"],
            ["Meeting Point", "tour-inv.meeting.input"],
            ["Guide Name", "tour-inv.guide.input"],
          ] as [string, string][]
        ).map(([label, ocid]) => (
          <div key={label}>
            <Label className="text-slate-400 text-xs">{label}</Label>
            <Input
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid={ocid}
            />
          </div>
        ))}
        <div className="col-span-2">
          <Label className="text-slate-400 text-xs">Tour Type</Label>
          <Select>
            <SelectTrigger
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid="tour-inv.type.select"
            >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Sightseeing",
                "Attraction Ticket",
                "Day Tour",
                "Private Tour",
                "Adventure",
              ].map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label className="text-slate-400 text-xs">Itinerary</Label>
          <Textarea
            className="mt-1 bg-white/5 border-white/10 text-white"
            rows={4}
            data-ocid="tour-inv.itinerary.textarea"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-orange-600 text-white"
          data-ocid="tour-inv.save.button"
          onClick={onClose}
        >
          Save Tour
        </Button>
        <Button
          variant="outline"
          className="border-white/20 text-slate-300"
          data-ocid="tour-inv.cancel.button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

function TransferForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-slate-400 text-xs">Transfer Type</Label>
          <Select>
            <SelectTrigger
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid="transfer-inv.type.select"
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Airport Transfer",
                "City Transfer",
                "Chauffeur Service",
                "Intercity Transfer",
              ].map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-slate-400 text-xs">Vehicle Type</Label>
          <Select>
            <SelectTrigger
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid="transfer-inv.vehicle.select"
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {["Sedan", "SUV", "Van", "Minibus", "Coach", "Limousine"].map(
                (v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
        {(
          [
            ["Vehicle Model", "transfer-inv.model.input"],
            ["Max Passengers", "transfer-inv.capacity.input"],
            ["Pickup Location", "transfer-inv.pickup.input"],
            ["Drop Location", "transfer-inv.drop.input"],
            ["Price Per Trip", "transfer-inv.price.input"],
            ["Driver Name", "transfer-inv.driver.input"],
          ] as [string, string][]
        ).map(([label, ocid]) => (
          <div key={label}>
            <Label className="text-slate-400 text-xs">{label}</Label>
            <Input
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid={ocid}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-orange-600 text-white"
          data-ocid="transfer-inv.save.button"
          onClick={onClose}
        >
          Save Transfer
        </Button>
        <Button
          variant="outline"
          className="border-white/20 text-slate-300"
          data-ocid="transfer-inv.cancel.button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

function VisaForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["Country", "visa-inv.country.input"],
            ["Visa Type", "visa-inv.type.input"],
            ["Validity Period", "visa-inv.validity.input"],
            ["Processing Time (days)", "visa-inv.processing.input"],
            ["Embassy Name", "visa-inv.embassy.input"],
            ["Visa Fee", "visa-inv.fee.input"],
            ["Service Fee", "visa-inv.servicefee.input"],
          ] as [string, string][]
        ).map(([label, ocid]) => (
          <div key={label}>
            <Label className="text-slate-400 text-xs">{label}</Label>
            <Input
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid={ocid}
            />
          </div>
        ))}
        <div className="col-span-2">
          <Label className="text-slate-400 text-xs">
            Required Documents (one per line)
          </Label>
          <Textarea
            className="mt-1 bg-white/5 border-white/10 text-white"
            rows={4}
            data-ocid="visa-inv.documents.textarea"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-orange-600 text-white"
          data-ocid="visa-inv.save.button"
          onClick={onClose}
        >
          Save Visa Service
        </Button>
        <Button
          variant="outline"
          className="border-white/20 text-slate-300"
          data-ocid="visa-inv.cancel.button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

function CruiseForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["Cruise Line", "cruise-inv.line.input"],
            ["Ship Name", "cruise-inv.ship.input"],
            ["Cruise Name", "cruise-inv.name.input"],
            ["Departure Port", "cruise-inv.port.input"],
            ["Duration (nights)", "cruise-inv.duration.input"],
            ["Starting Price/Person", "cruise-inv.price.input"],
          ] as [string, string][]
        ).map(([label, ocid]) => (
          <div key={label}>
            <Label className="text-slate-400 text-xs">{label}</Label>
            <Input
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid={ocid}
            />
          </div>
        ))}
        <div className="col-span-2">
          <Label className="text-slate-400 text-xs">Cruise Itinerary</Label>
          <Textarea
            className="mt-1 bg-white/5 border-white/10 text-white"
            rows={3}
            data-ocid="cruise-inv.itinerary.textarea"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-orange-600 text-white"
          data-ocid="cruise-inv.save.button"
          onClick={onClose}
        >
          Save Cruise
        </Button>
        <Button
          variant="outline"
          className="border-white/20 text-slate-300"
          data-ocid="cruise-inv.cancel.button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

function InsuranceForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["Insurance Company", "ins-inv.company.input"],
            ["Plan Name", "ins-inv.plan.input"],
            ["Min Age", "ins-inv.minage.input"],
            ["Max Age", "ins-inv.maxage.input"],
            ["Price/Day/Person", "ins-inv.price.input"],
            ["Medical Coverage Limit", "ins-inv.medical.input"],
            ["Trip Cancellation Limit", "ins-inv.cancellation.input"],
            ["Baggage Coverage", "ins-inv.baggage.input"],
          ] as [string, string][]
        ).map(([label, ocid]) => (
          <div key={label}>
            <Label className="text-slate-400 text-xs">{label}</Label>
            <Input
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid={ocid}
            />
          </div>
        ))}
        <div className="col-span-2">
          <Label className="text-slate-400 text-xs">Coverage Details</Label>
          <Textarea
            className="mt-1 bg-white/5 border-white/10 text-white"
            rows={3}
            data-ocid="ins-inv.coverage.textarea"
          />
        </div>
        <div className="col-span-2">
          <Label className="text-slate-400 text-xs">
            Claim Conditions / Exclusions
          </Label>
          <Textarea
            className="mt-1 bg-white/5 border-white/10 text-white"
            rows={2}
            data-ocid="ins-inv.exclusions.textarea"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-orange-600 text-white"
          data-ocid="ins-inv.save.button"
          onClick={onClose}
        >
          Save Insurance Plan
        </Button>
        <Button
          variant="outline"
          className="border-white/20 text-slate-300"
          data-ocid="ins-inv.cancel.button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

function PackageForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["Package Name", "pkg-inv.name.input"],
            ["Destination", "pkg-inv.destination.input"],
            ["Duration (nights)", "pkg-inv.duration.input"],
            ["Price/Person Double", "pkg-inv.priced.input"],
            ["Price/Person Single", "pkg-inv.prices.input"],
            ["Price/Child", "pkg-inv.pricec.input"],
            ["Min Group Size", "pkg-inv.mingroup.input"],
            ["Max Group Size", "pkg-inv.maxgroup.input"],
          ] as [string, string][]
        ).map(([label, ocid]) => (
          <div key={label}>
            <Label className="text-slate-400 text-xs">{label}</Label>
            <Input
              className="mt-1 bg-white/5 border-white/10 text-white"
              data-ocid={ocid}
            />
          </div>
        ))}
      </div>
      <div>
        <Label className="text-slate-400 text-xs mb-2 block">Inclusions</Label>
        <div className="grid grid-cols-3 gap-2">
          {["Flights", "Hotel", "Transfers", "Tours", "Meals", "Visa"].map(
            (inc) => (
              <label
                key={inc}
                className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer"
              >
                <input type="checkbox" className="accent-orange-500" />
                {inc}
              </label>
            ),
          )}
        </div>
      </div>
      <div>
        <Label className="text-slate-400 text-xs">Day-by-Day Itinerary</Label>
        <Textarea
          className="mt-1 bg-white/5 border-white/10 text-white"
          rows={5}
          data-ocid="pkg-inv.itinerary.textarea"
        />
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-orange-600 text-white"
          data-ocid="pkg-inv.save.button"
          onClick={onClose}
        >
          Save Package
        </Button>
        <Button
          variant="outline"
          className="border-white/20 text-slate-300"
          data-ocid="pkg-inv.cancel.button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

const FORM_MAP: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  flight: FlightForm,
  hotel: HotelForm,
  tour: TourForm,
  transfer: TransferForm,
  visa: VisaForm,
  cruise: CruiseForm,
  insurance: InsuranceForm,
  package: PackageForm,
};

const FORM_TITLES: Record<string, string> = {
  flight: "Add Flight Inventory",
  hotel: "Add Hotel Inventory",
  tour: "Add Tour / Activity",
  transfer: "Add Transfer Service",
  visa: "Add Visa Service",
  cruise: "Add Cruise Package",
  insurance: "Add Insurance Plan",
  package: "Add Holiday Package",
};

export function SupplierInventoryHub() {
  const [activeType, setActiveType] = useState("flight");
  const [showModal, setShowModal] = useState(false);
  const [inventory, setInventory] = useState(MOCK_INVENTORY);

  function toggleStatus(type: string, idx: number) {
    setInventory((prev) => ({
      ...prev,
      [type]: prev[type].map((item, i) =>
        i === idx
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? ("Inactive" as const)
                  : ("Active" as const),
            }
          : item,
      ),
    }));
  }

  const ActiveForm = FORM_MAP[activeType];
  const activeTab = SERVICE_TABS.find((t) => t.key === activeType)!;
  const items = inventory[activeType] || [];

  return (
    <div className="space-y-6">
      <Tabs value={activeType} onValueChange={setActiveType}>
        <div className="overflow-x-auto">
          <TabsList className="bg-white/5 border border-white/10 flex-nowrap inline-flex">
            {SERVICE_TABS.map(({ key, label, icon: Icon, color }) => (
              <TabsTrigger
                key={key}
                value={key}
                data-ocid={`inventory.${key}.tab`}
                className="data-[state=active]:text-white text-slate-400 gap-1"
                style={
                  activeType === key ? { background: `${color}33`, color } : {}
                }
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {SERVICE_TABS.map(({ key }) => (
          <TabsContent key={key} value={key}>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Total Items", value: items.length },
                {
                  label: "Active",
                  value: items.filter((i) => i.status === "Active").length,
                },
                {
                  label: "Bookings This Month",
                  value: Math.floor(15 + Math.random() * 20),
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center"
                  style={glassBg}
                  data-ocid={`inventory.stat.${i + 1}`}
                >
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-slate-400 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div
                className="flex items-center justify-between p-4"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <h3 className="text-white font-semibold">
                  {SERVICE_TABS.find((t) => t.key === key)?.label} Inventory
                </h3>
                <Button
                  size="sm"
                  style={{ background: activeTab.color }}
                  className="text-white hover:opacity-90"
                  onClick={() => setShowModal(true)}
                  data-ocid={`inventory.${key}.open_modal_button`}
                >
                  <PlusCircle className="w-4 h-4 mr-1" /> Add New
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow style={{ background: "rgba(255,255,255,0.05)" }}>
                    {[
                      "Name",
                      "Destination",
                      "Price",
                      "Availability",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <TableHead key={h} className="text-slate-400">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-slate-500 py-8"
                        data-ocid={`inventory.${key}.empty_state`}
                      >
                        No inventory added yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item, i) => (
                      <TableRow
                        key={item.id}
                        className="border-white/10"
                        data-ocid={`inventory.${key}.row.${i + 1}`}
                      >
                        <TableCell className="text-white font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell className="text-slate-300 text-sm">
                          {item.destination}
                        </TableCell>
                        <TableCell className="text-orange-400 font-medium text-sm">
                          {item.price}
                        </TableCell>
                        <TableCell className="text-slate-300 text-sm">
                          {item.availability}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${STATUS_COLORS[item.status]}`}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Switch
                              checked={item.status === "Active"}
                              onCheckedChange={() => toggleStatus(key, i)}
                              data-ocid={`inventory.${key}.toggle.${i + 1}`}
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-slate-400 hover:text-white h-7 px-1"
                              data-ocid={`inventory.${key}.edit_button.${i + 1}`}
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-400 hover:text-red-300 h-7 px-1"
                              data-ocid={`inventory.${key}.delete_button.${i + 1}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="max-w-2xl"
          style={{
            background: "#1E293B",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-white">
              {FORM_TITLES[activeType]}
            </DialogTitle>
          </DialogHeader>
          {ActiveForm && <ActiveForm onClose={() => setShowModal(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
