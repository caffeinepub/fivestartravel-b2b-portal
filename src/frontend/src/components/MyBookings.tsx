import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Hotel,
  Plane,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type BookingStatus =
  | "CONFIRMED"
  | "ON_HOLD"
  | "PENDING"
  | "CANCELLED"
  | "FAILED";
type BookingType = "HOTEL" | "FLIGHT" | "TOUR" | "TRANSFER";

interface Booking {
  id: string;
  type: BookingType;
  status: BookingStatus;
  createdOn: string;
  amount: number;
  currency: string;
  title: string;
  subtitle: string;
  checkIn?: string;
  checkOut?: string;
  travelDate?: string;
  guests?: number;
  passengers?: number;
  canCancel: boolean;
  refundable: boolean;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "TGS208420065548",
    type: "HOTEL",
    status: "CONFIRMED",
    createdOn: "2026-03-01T10:30:00",
    amount: 27806.62,
    currency: "INR",
    title: "Pride Plaza Hotel Aerocity",
    subtitle: "New Delhi · Deluxe, 2 Twin",
    checkIn: "2026-05-25",
    checkOut: "2026-05-26",
    guests: 2,
    canCancel: true,
    refundable: true,
  },
  {
    id: "TGS208420065600",
    type: "FLIGHT",
    status: "CONFIRMED",
    createdOn: "2026-02-28T15:45:00",
    amount: 18500,
    currency: "INR",
    title: "IndiGo 6E-204 · DEL → DXB",
    subtitle: "Economy · 2 Adults",
    travelDate: "2026-04-10",
    passengers: 2,
    canCancel: true,
    refundable: false,
  },
  {
    id: "TGS208420065621",
    type: "HOTEL",
    status: "ON_HOLD",
    createdOn: "2026-03-05T09:00:00",
    amount: 12400,
    currency: "INR",
    title: "Marina Bay Sands",
    subtitle: "Singapore · Deluxe Room",
    checkIn: "2026-06-10",
    checkOut: "2026-06-14",
    guests: 2,
    canCancel: true,
    refundable: true,
  },
  {
    id: "TGS208420065700",
    type: "FLIGHT",
    status: "PENDING",
    createdOn: "2026-03-08T11:20:00",
    amount: 32000,
    currency: "INR",
    title: "Air India AI-131 · BOM → LHR",
    subtitle: "Business · 1 Adult",
    travelDate: "2026-05-15",
    passengers: 1,
    canCancel: false,
    refundable: true,
  },
  {
    id: "TGS208420065750",
    type: "HOTEL",
    status: "CANCELLED",
    createdOn: "2026-02-20T08:00:00",
    amount: 9800,
    currency: "INR",
    title: "Taj Mahal Palace",
    subtitle: "Mumbai · Superior Room",
    checkIn: "2026-03-01",
    checkOut: "2026-03-03",
    guests: 2,
    canCancel: false,
    refundable: false,
  },
  {
    id: "TGS208420065800",
    type: "FLIGHT",
    status: "CONFIRMED",
    createdOn: "2026-02-15T14:00:00",
    amount: 7200,
    currency: "INR",
    title: "SpiceJet SG-101 · DEL → BOM",
    subtitle: "Economy · 1 Adult",
    travelDate: "2026-03-20",
    passengers: 1,
    canCancel: true,
    refundable: false,
  },
];

function StatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<
    BookingStatus,
    { label: string; className: string; icon: React.ReactNode }
  > = {
    CONFIRMED: {
      label: "Confirmed",
      className: "bg-green-50 text-green-700 border-green-200",
      icon: <CheckCircle className="w-3 h-3" />,
    },
    ON_HOLD: {
      label: "On Hold",
      className: "bg-amber-50 text-amber-700 border-amber-200",
      icon: <Clock className="w-3 h-3" />,
    },
    PENDING: {
      label: "Pending",
      className: "bg-blue-50 text-blue-700 border-blue-200",
      icon: <RefreshCw className="w-3 h-3" />,
    },
    CANCELLED: {
      label: "Cancelled",
      className: "bg-red-50 text-red-700 border-red-200",
      icon: <XCircle className="w-3 h-3" />,
    },
    FAILED: {
      label: "Failed",
      className: "bg-gray-100 text-gray-600 border-gray-200",
      icon: <AlertCircle className="w-3 h-3" />,
    },
  };
  const { label, className, icon } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}
    >
      {icon} {label}
    </span>
  );
}

type FilterTab =
  | "all"
  | "hotels"
  | "flights"
  | "confirmed"
  | "pending"
  | "cancelled";

export function MyBookings() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelledIds, setCancelledIds] = useState<Set<string>>(new Set());

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All Bookings" },
    { key: "hotels", label: "Hotels" },
    { key: "flights", label: "Flights" },
    { key: "confirmed", label: "Confirmed" },
    { key: "pending", label: "Pending" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const bookings = MOCK_BOOKINGS.map((b) =>
    cancelledIds.has(b.id)
      ? { ...b, status: "CANCELLED" as BookingStatus, canCancel: false }
      : b,
  );

  const filtered = bookings.filter((b) => {
    if (activeTab === "hotels" && b.type !== "HOTEL") return false;
    if (activeTab === "flights" && b.type !== "FLIGHT") return false;
    if (activeTab === "confirmed" && b.status !== "CONFIRMED") return false;
    if (
      activeTab === "pending" &&
      b.status !== "PENDING" &&
      b.status !== "ON_HOLD"
    )
      return false;
    if (activeTab === "cancelled" && b.status !== "CANCELLED") return false;
    if (
      search &&
      !b.id.toLowerCase().includes(search.toLowerCase()) &&
      !b.title.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  function handleCancel(id: string) {
    setCancelId(id);
  }

  function confirmCancel() {
    if (cancelId) {
      setCancelledIds((prev) => new Set([...prev, cancelId]));
      setCancelId(null);
    }
  }

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    pending: bookings.filter(
      (b) => b.status === "PENDING" || b.status === "ON_HOLD",
    ).length,
    cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  return (
    <div className="space-y-5" data-ocid="bookings.page">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Total Bookings",
            value: stats.total,
            color: "text-primary",
          },
          {
            label: "Confirmed",
            value: stats.confirmed,
            color: "text-green-600",
          },
          { label: "Pending", value: stats.pending, color: "text-amber-600" },
          { label: "Cancelled", value: stats.cancelled, color: "text-red-600" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs + search */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <div className="flex gap-2 flex-wrap" data-ocid="bookings.tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              data-ocid={`bookings.${t.key}.tab`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === t.key
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            className="pl-9 h-8 text-xs"
            placeholder="Search by booking ID or hotel/flight name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="bookings.search.input"
          />
        </div>
      </div>

      {/* Booking list */}
      {filtered.length === 0 ? (
        <div
          className="bg-card border border-border rounded-xl p-12 text-center"
          data-ocid="bookings.empty_state"
        >
          <div className="text-muted-foreground/40 text-4xl mb-3">📋</div>
          <div className="font-medium text-muted-foreground">
            No bookings found
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Try adjusting your filter or search
          </div>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="bookings.list">
          {filtered.map((booking, idx) => (
            <div
              key={booking.id}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
              data-ocid={`bookings.item.${idx + 1}`}
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      booking.type === "HOTEL" ? "bg-blue-50" : "bg-purple-50"
                    }`}
                  >
                    {booking.type === "HOTEL" ? (
                      <Hotel className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Plane className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{booking.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {booking.subtitle}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      {booking.checkIn && (
                        <span>
                          {booking.checkIn} → {booking.checkOut}
                        </span>
                      )}
                      {booking.travelDate && (
                        <span>Travel: {booking.travelDate}</span>
                      )}
                      {booking.guests && <span>{booking.guests} guests</span>}
                      {booking.passengers && (
                        <span>{booking.passengers} pax</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={booking.status} />
                  <div className="text-right">
                    <div className="font-bold text-sm text-primary">
                      {booking.currency}{" "}
                      {booking.amount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(booking.createdOn).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">
                    {booking.id}
                  </span>
                  {booking.refundable ? (
                    <Badge
                      variant="outline"
                      className="text-xs text-green-600 border-green-200 bg-green-50"
                    >
                      Refundable
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-xs text-muted-foreground"
                    >
                      Non-Refundable
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 gap-1"
                    data-ocid={`bookings.download.button.${idx + 1}`}
                  >
                    <Download className="w-3 h-3" /> Voucher
                  </Button>
                  {booking.canCancel && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleCancel(booking.id)}
                      data-ocid={`bookings.cancel.button.${idx + 1}`}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel confirmation modal */}
      {cancelId && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          data-ocid="bookings.cancel.dialog"
        >
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full mx-4 space-y-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-semibold">Cancel Booking</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to cancel booking{" "}
              <span className="font-mono font-semibold">{cancelId}</span>?
              Cancellation charges may apply.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setCancelId(null)}
                data-ocid="bookings.cancel.dialog.cancel_button"
              >
                Keep Booking
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={confirmCancel}
                data-ocid="bookings.cancel.dialog.confirm_button"
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
