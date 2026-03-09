import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  Search,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

const TRIPJACK_API_KEY = "7114315c476d94-4ef2-4e21-83e8-527d56a0c529";

interface TravellerInfo {
  ti: string;
  pt: string;
  fN: string;
  lN: string;
}

interface RoomInfo {
  rc: string;
  mb: string;
  tp: number;
  ti?: TravellerInfo[];
}

interface BookingOrder {
  bookingId: string;
  amount: number;
  markup?: number;
  status: string;
  createdOn: string;
  deliveryInfo?: {
    emails?: string[];
    contacts?: string[];
    code?: string[];
  };
}

interface BookingDetails {
  order: BookingOrder;
  itemInfos?: {
    HOTEL?: {
      hInfo?: {
        name?: string;
        rt?: number;
        ad?: { adr?: string; ctn?: string; cn?: string };
        ops?: Array<{ ris?: RoomInfo[] }>;
      };
    };
  };
}

interface HotelBookingDetailsProps {
  bookingId: string;
  initialStatus: string;
  onBack: () => void;
  onNewSearch: () => void;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<
    string,
    { label: string; className: string; icon: React.ReactNode }
  > = {
    SUCCESS: {
      label: "Confirmed",
      className: "bg-green-100 text-green-800 border-green-200",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    ON_HOLD: {
      label: "On Hold",
      className: "bg-amber-100 text-amber-800 border-amber-200",
      icon: <Clock className="w-3 h-3" />,
    },
    FAILED: {
      label: "Failed",
      className: "bg-red-100 text-red-800 border-red-200",
      icon: <XCircle className="w-3 h-3" />,
    },
    ABORTED: {
      label: "Aborted",
      className: "bg-red-100 text-red-800 border-red-200",
      icon: <XCircle className="w-3 h-3" />,
    },
    CANCELLATION_PENDING: {
      label: "Cancellation Pending",
      className: "bg-orange-100 text-orange-800 border-orange-200",
      icon: <AlertCircle className="w-3 h-3" />,
    },
    CANCELLED: {
      label: "Cancelled",
      className: "bg-gray-100 text-gray-700 border-gray-200",
      icon: <XCircle className="w-3 h-3" />,
    },
    IN_PROGRESS: {
      label: "In Progress",
      className: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Loader2 className="w-3 h-3 animate-spin" />,
    },
    PAYMENT_SUCCESS: {
      label: "Payment Success",
      className: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    PENDING: {
      label: "Pending",
      className: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Clock className="w-3 h-3" />,
    },
  };
  const s = map[status] ?? {
    label: status,
    className: "bg-blue-100 text-blue-800 border-blue-200",
    icon: <AlertCircle className="w-3 h-3" />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.className}`}
    >
      {s.icon} {s.label}
    </span>
  );
}

export default function HotelBookingDetails({
  bookingId,
  initialStatus,
  onBack,
  onNewSearch,
}: HotelBookingDetailsProps) {
  const [details, setDetails] = useState<BookingDetails | null>(null);
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelMsg, setCancelMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://apitest.tripjack.com/oms/v3/hotel/booking-details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: TRIPJACK_API_KEY,
            },
            body: JSON.stringify({ bookingId }),
          },
        );
        const data = await res.json();
        if (data?.status?.success) {
          setDetails(data);
          if (data.order?.status) setStatus(data.order.status);
        } else {
          setError("Could not load booking details. Showing available info.");
          setDetails({
            order: {
              bookingId,
              amount: 0,
              status: initialStatus,
              createdOn: new Date().toISOString(),
            },
          });
        }
      } catch {
        setError("Network error fetching booking details.");
        setDetails({
          order: {
            bookingId,
            amount: 0,
            status: initialStatus,
            createdOn: new Date().toISOString(),
          },
        });
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [bookingId, initialStatus]);

  async function handleConfirmHold() {
    setConfirmLoading(true);
    try {
      const amount = details?.order?.amount ?? 0;
      const res = await fetch(
        "https://apitest.tripjack.com/oms/v3/hotel/confirm-book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: TRIPJACK_API_KEY,
          },
          body: JSON.stringify({ bookingId, paymentInfos: [{ amount }] }),
        },
      );
      const data = await res.json();
      if (data?.status?.success) {
        setStatus("SUCCESS");
      } else {
        setError("Confirm hold failed. Please try again.");
      }
    } catch {
      setError("Network error during hold confirmation.");
    } finally {
      setConfirmLoading(false);
    }
  }

  async function handleCancel() {
    setCancelLoading(true);
    setCancelMsg(null);
    try {
      const res = await fetch(
        `https://apitest.tripjack.com/oms/v3/hotel/cancel-booking/${bookingId}`,
        {
          method: "POST",
          headers: { apikey: TRIPJACK_API_KEY },
        },
      );
      const data = await res.json();
      if (data?.status?.success) {
        setStatus("CANCELLATION_PENDING");
        setCancelMsg(
          "Cancellation request received. TripJack will process this offline. Check status daily.",
        );
      } else {
        setError("Cancellation request failed. Please contact support.");
      }
    } catch {
      setError("Network error during cancellation.");
    } finally {
      setCancelLoading(false);
    }
  }

  const order = details?.order;
  const hInfo = details?.itemInfos?.HOTEL?.hInfo;
  const hotelName = hInfo?.name ?? "Hotel Booking";
  const rooms = hInfo?.ops?.[0]?.ris ?? [];
  const canCancel = status === "SUCCESS" || status === "ON_HOLD";
  const formattedDate = order?.createdOn
    ? new Date(order.createdOn).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 gap-4"
        data-ocid="hotel.bookingdetails.loading_state"
      >
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">
          Loading booking details…
        </p>
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto space-y-5 py-6 px-2"
      data-ocid="hotel.bookingdetails.panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="hotel.bookingdetails.cancel_button"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-lg font-bold text-foreground">Booking Details</h2>
        <button
          type="button"
          onClick={onNewSearch}
          className="flex items-center gap-1.5 text-sm text-primary hover:underline"
          data-ocid="hotel.bookingdetails.secondary_button"
        >
          <Search className="w-4 h-4" /> New Search
        </button>
      </div>

      {error && (
        <div
          className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg px-4 py-3"
          data-ocid="hotel.bookingdetails.error_state"
        >
          {error}
        </div>
      )}

      {cancelMsg && (
        <div
          className="bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-lg px-4 py-3"
          data-ocid="hotel.bookingdetails.success_state"
        >
          {cancelMsg}
        </div>
      )}

      {/* Status + Booking ID */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              {hotelName}
            </CardTitle>
            <StatusBadge status={status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Booking ID
              </p>
              <p
                className="font-mono font-bold text-primary mt-0.5"
                data-ocid="hotel.bookingdetails.card"
              >
                {bookingId}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Amount
              </p>
              <p className="font-bold mt-0.5">
                ₹
                {order?.amount?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                }) ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Created
              </p>
              <p className="mt-0.5 text-muted-foreground">{formattedDate}</p>
            </div>
            {order?.deliveryInfo?.emails?.[0] && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                  Email
                </p>
                <p className="mt-0.5 text-muted-foreground truncate">
                  {order.deliveryInfo.emails[0]}
                </p>
              </div>
            )}
          </div>

          {hInfo?.ad && (
            <>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">
                  Location
                </p>
                <p className="text-muted-foreground">
                  {[hInfo.ad.adr, hInfo.ad.ctn, hInfo.ad.cn]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Room Info */}
      {rooms.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Room Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {rooms.map((room, idx) => (
              <div
                key={`${room.rc ?? "room"}-${room.tp ?? 0}-${idx}`}
                className="text-sm"
                data-ocid={`hotel.bookingdetails.item.${idx + 1}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {room.rc || `Room ${idx + 1}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {room.mb || ""}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₹
                    {(room.tp ?? 0).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                {room.ti && room.ti.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {room.ti.map((t, ti) => (
                      <Badge
                        key={`${t.fN}-${t.lN}-${ti}`}
                        variant="secondary"
                        className="text-xs"
                      >
                        {t.ti} {t.fN} {t.lN} ({t.pt})
                      </Badge>
                    ))}
                  </div>
                )}
                {idx < rooms.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {status === "ON_HOLD" && (
          <Button
            className="w-full bg-primary text-white"
            onClick={handleConfirmHold}
            disabled={confirmLoading}
            data-ocid="hotel.bookingdetails.confirm_button"
          >
            {confirmLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Confirming…
              </>
            ) : (
              "Confirm Hold Booking"
            )}
          </Button>
        )}

        {canCancel && !cancelMsg && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full"
                disabled={cancelLoading}
                data-ocid="hotel.bookingdetails.delete_button"
              >
                {cancelLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Cancelling…
                  </>
                ) : (
                  "Cancel Booking"
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-ocid="hotel.cancel.dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel booking{" "}
                  <strong>{bookingId}</strong>? Applicable cancellation
                  penalties will apply as per the rate plan policy.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-ocid="hotel.cancel.cancel_button">
                  Keep Booking
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={handleCancel}
                  data-ocid="hotel.cancel.confirm_button"
                >
                  Yes, Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <Button
          variant="outline"
          className="w-full"
          onClick={onNewSearch}
          data-ocid="hotel.bookingdetails.primary_button"
        >
          <Search className="w-4 h-4 mr-2" /> New Hotel Search
        </Button>
      </div>
    </div>
  );
}
