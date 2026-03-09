import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export interface FlightAmendmentProps {
  bookingId: string;
  travellers: Array<{ fN: string; lN: string; type: string }>;
  trips: Array<{
    src: string;
    dest: string;
    departureDate: string;
    flightNo: string;
  }>;
  onAmendmentComplete: () => void;
}

interface ChargeRow {
  paxType?: string;
  amendmentCharges?: number;
  refundAmount?: number;
  totalFare?: number;
}

interface AmendmentStatus {
  amendmentId: string;
  status: string;
  refundableAmount?: number;
  remarks?: string;
}

const API = "https://apitest.tripjack.com";
const KEY = "7114315c476d94-4ef2-4e21-83e8-527d56a0c529";
const hdr = { "Content-Type": "application/json", apikey: KEY };
const fmt = (n?: number) =>
  n !== undefined ? `\u20b9${n.toLocaleString("en-IN")}` : "\u2014";

const STATUS_COLORS: Record<string, string> = {
  REQUESTED: "bg-blue-100 text-blue-700 border-blue-200",
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  SUCCESS: "bg-green-100 text-green-700 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-200",
};

export function FlightAmendment({
  bookingId,
  onAmendmentComplete,
}: FlightAmendmentProps) {
  const [chargesLoading, setChargesLoading] = useState(false);
  const [chargesError, setChargesError] = useState("");
  const [charges, setCharges] = useState<ChargeRow[] | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [amendStatus, setAmendStatus] = useState<AmendmentStatus | null>(null);
  const [pollLoading, setPollLoading] = useState(false);

  async function checkCharges() {
    setChargesLoading(true);
    setChargesError("");
    try {
      const res = await fetch(`${API}/oms/v1/air/amendment/amendment-charges`, {
        method: "POST",
        headers: hdr,
        body: JSON.stringify({
          bookingId,
          type: "CANCELLATION",
          remarks: "Cancellation requested by agent",
        }),
      });
      const json = await res.json();
      if (!json?.status?.success)
        throw new Error(json?.errors?.[0]?.message ?? "Failed to get charges");
      const rows: ChargeRow[] = [];
      for (const trip of json.amendmentCharges ?? []) {
        for (const pax of trip.paxAmendmentCharges ?? []) {
          rows.push({
            paxType: pax.paxType,
            amendmentCharges: pax.amendmentCharges,
            refundAmount: pax.refundAmount,
            totalFare: pax.totalFare,
          });
        }
      }
      if (rows.length === 0 && json.amendmentCharges) {
        rows.push({
          paxType: "ALL",
          amendmentCharges: json.amendmentCharges?.totalAmendmentCharges,
          refundAmount: json.amendmentCharges?.refundableAmount,
        });
      }
      setCharges(rows);
    } catch (err) {
      setChargesError((err as Error).message);
    } finally {
      setChargesLoading(false);
    }
  }

  async function submitCancellation() {
    setCancelLoading(true);
    setCancelError("");
    try {
      const res = await fetch(`${API}/oms/v1/air/amendment/submit-amendment`, {
        method: "POST",
        headers: hdr,
        body: JSON.stringify({
          bookingId,
          type: "CANCELLATION",
          remarks: "Cancellation requested by agent",
        }),
      });
      const json = await res.json();
      if (!json?.status?.success)
        throw new Error(json?.errors?.[0]?.message ?? "Cancellation failed");
      const amendmentId = json.amendmentId ?? json.id ?? "";
      setConfirmOpen(false);
      setAmendStatus({ amendmentId, status: "REQUESTED" });
      await pollStatus(amendmentId);
    } catch (err) {
      setCancelError((err as Error).message);
    } finally {
      setCancelLoading(false);
    }
  }

  async function pollStatus(amendmentId: string) {
    setPollLoading(true);
    try {
      for (let i = 0; i < 5; i++) {
        await new Promise((r) => setTimeout(r, 10000));
        const res = await fetch(
          `${API}/oms/v1/air/amendment/amendment-details`,
          {
            method: "POST",
            headers: hdr,
            body: JSON.stringify({ amendmentId }),
          },
        );
        const json = await res.json();
        const status =
          json?.amendmentDetails?.status ??
          json?.status?.httpStatus ??
          "PENDING";
        const refundable =
          json?.amendmentDetails?.refundableAmount ?? json?.refundableAmount;
        const remarks = json?.amendmentDetails?.remarks ?? "";
        setAmendStatus({
          amendmentId,
          status,
          refundableAmount: refundable,
          remarks,
        });
        if (status === "SUCCESS" || status === "REJECTED") break;
      }
    } catch {
      /* ignore poll errors */
    } finally {
      setPollLoading(false);
    }
  }

  const isSuccess = amendStatus?.status === "SUCCESS";
  const isRejected = amendStatus?.status === "REJECTED";

  return (
    <div className="space-y-4" data-ocid="flight.amendment.panel">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Booking Cancellation</h3>
        {amendStatus && (
          <Badge
            className={`text-xs border ${STATUS_COLORS[amendStatus.status] ?? "bg-muted text-muted-foreground"}`}
          >
            {amendStatus.status}
            {pollLoading && " \u27f3"}
          </Badge>
        )}
      </div>

      {isSuccess && (
        <div
          className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm"
          data-ocid="flight.amendment.success_state"
        >
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Cancellation successful.
          {amendStatus?.refundableAmount !== undefined && (
            <>
              {" "}
              Refund: <strong>{fmt(amendStatus.refundableAmount)}</strong>
            </>
          )}
        </div>
      )}

      {isRejected && (
        <div
          className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm"
          data-ocid="flight.amendment.error_state"
        >
          <XCircle className="w-4 h-4 flex-shrink-0" />
          Cancellation rejected.
          {amendStatus?.remarks ? ` ${amendStatus.remarks}` : ""}
        </div>
      )}

      {chargesError && (
        <div
          className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm"
          data-ocid="flight.amendment.error_state"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {chargesError}
        </div>
      )}

      {cancelError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {cancelError}
        </div>
      )}

      {charges && charges.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Pax Type</TableHead>
              <TableHead className="text-xs">Amendment Charges</TableHead>
              <TableHead className="text-xs">Refund Amount</TableHead>
              <TableHead className="text-xs">Total Fare</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {charges.map((row) => (
              <TableRow key={row.paxType ?? "ALL"}>
                <TableCell className="text-xs">
                  {row.paxType ?? "\u2014"}
                </TableCell>
                <TableCell className="text-xs">
                  {fmt(row.amendmentCharges)}
                </TableCell>
                <TableCell className="text-xs text-green-700 font-medium">
                  {fmt(row.refundAmount)}
                </TableCell>
                <TableCell className="text-xs">{fmt(row.totalFare)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {!amendStatus && (
        <div className="flex gap-3 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            disabled={chargesLoading}
            onClick={checkCharges}
            data-ocid="flight.amendment.check_charges.button"
          >
            {chargesLoading ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-primary/30 border-t-primary animate-spin mr-1.5" />
                Checking...
              </>
            ) : (
              "Check Cancellation Charges"
            )}
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
            data-ocid="flight.amendment.cancel.open_modal_button"
          >
            Cancel Booking
          </Button>
        </div>
      )}

      {pollLoading && !isSuccess && !isRejected && (
        <div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          data-ocid="flight.amendment.loading_state"
        >
          <span className="w-4 h-4 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          Checking cancellation status...
        </div>
      )}

      {isSuccess && (
        <Button size="sm" onClick={onAmendmentComplete} className="mt-2">
          Done
        </Button>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent data-ocid="flight.amendment.dialog">
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </p>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              data-ocid="flight.amendment.cancel.cancel_button"
            >
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              disabled={cancelLoading}
              onClick={submitCancellation}
              data-ocid="flight.amendment.cancel.confirm_button"
            >
              {cancelLoading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-1.5" />
                  Cancelling...
                </>
              ) : (
                "Yes, Cancel Booking"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
