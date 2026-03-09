import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export interface SelectedSeat {
  segmentKey: string;
  seatCode: string;
  seatNo: string;
}

export interface FlightSeatMapProps {
  bookingId: string;
  onSeatsSelected: (seats: SelectedSeat[]) => void;
}

interface SeatInfo {
  seatNo: string;
  isBooked: boolean;
  isLegRoom?: boolean;
  isAisle?: boolean;
  code: string;
  amount?: number;
  seatPosition: { row: number; column: number };
}

interface SegmentSeatMap {
  sData: { row: number; column: number };
  sInfo?: SeatInfo[];
  nt?: string;
}

const API = "https://apitest.tripjack.com";
const KEY = "7114315c476d94-4ef2-4e21-83e8-527d56a0c529";
const hdr = { "Content-Type": "application/json", apikey: KEY };

const COL_LABELS = ["A", "B", "C", "", "D", "E", "F", "G", "H", "J", "K"];

function SeatGrid({
  segKey,
  seg,
  selected,
  onToggle,
}: {
  segKey: string;
  seg: SegmentSeatMap;
  selected: SelectedSeat[];
  onToggle: (s: SeatInfo) => void;
}) {
  const rows = seg.sData.row;
  const cols = seg.sData.column;

  if (seg.nt) {
    return (
      <p className="text-sm text-muted-foreground italic py-3">{seg.nt}</p>
    );
  }

  const grid: (SeatInfo | null)[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null),
  );

  for (const seat of seg.sInfo ?? []) {
    const r = seat.seatPosition.row - 1;
    const c = seat.seatPosition.column - 1;
    if (r >= 0 && r < rows && c >= 0 && c < cols) grid[r][c] = seat;
  }

  const colHeaders = COL_LABELS.slice(0, cols + (cols > 3 ? 1 : 0));

  return (
    <ScrollArea className="max-h-72">
      <div className="inline-block">
        {/* Column headers */}
        <div className="flex gap-1 mb-1 pl-8">
          {colHeaders.map((lbl) => (
            <div
              key={lbl || "aisle"}
              className="w-8 text-center text-xs text-muted-foreground font-medium"
            >
              {lbl}
            </div>
          ))}
        </div>
        {grid.map((rowSeats, ri) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: row index is position-stable
          <div key={ri} className="flex gap-1 mb-1 items-center">
            <span className="w-7 text-right text-xs text-muted-foreground pr-1">
              {ri + 1}
            </span>
            {rowSeats.map((seat, ci) => {
              const isAisleSpacer = cols > 3 && ci === 3;
              const isSelected =
                seat &&
                selected.some(
                  (s) => s.segmentKey === segKey && s.seatNo === seat.seatNo,
                );
              let bg = "bg-muted/40 border-border cursor-default";
              if (seat) {
                if (seat.isBooked)
                  bg =
                    "bg-muted border-muted-foreground/20 cursor-not-allowed opacity-50";
                else if (isSelected)
                  bg = "bg-yellow-400 border-yellow-500 cursor-pointer";
                else if ((seat.amount ?? 0) > 0)
                  bg =
                    "bg-blue-100 border-blue-300 text-blue-800 cursor-pointer hover:bg-blue-200";
                else
                  bg =
                    "bg-green-100 border-green-300 text-green-800 cursor-pointer hover:bg-green-200";
              }
              const cellKey = seat ? seat.seatNo : `empty-r${ri}-c${ci}`;
              return (
                <div key={cellKey} className="flex gap-1">
                  {isAisleSpacer && <div className="w-2" />}
                  <button
                    type="button"
                    className={`w-8 h-8 rounded border text-[10px] font-semibold flex flex-col items-center justify-center relative transition-colors ${bg}`}
                    disabled={!seat || seat.isBooked}
                    onClick={() => seat && !seat.isBooked && onToggle(seat)}
                    title={
                      seat
                        ? `${seat.seatNo}${seat.amount ? ` \u20b9${seat.amount}` : " Free"}${seat.isLegRoom ? " (Leg Room)" : ""}`
                        : ""
                    }
                    data-ocid={`flight.seatmap.seat.${ri * cols + ci + 1}`}
                  >
                    {seat ? (
                      <>
                        {seat.isLegRoom && (
                          <span
                            className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full"
                            title="Leg room"
                          />
                        )}
                        <span className="leading-none">{seat.seatNo}</span>
                        {(seat.amount ?? 0) > 0 && (
                          <span className="text-[8px] leading-none opacity-75">
                            \u20b9{seat.amount}
                          </span>
                        )}
                      </>
                    ) : null}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function FlightSeatMap({
  bookingId,
  onSeatsSelected,
}: FlightSeatMapProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seatMap, setSeatMap] = useState<Record<string, SegmentSeatMap> | null>(
    null,
  );
  const [selected, setSelected] = useState<SelectedSeat[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/fms/v1/seat`, {
          method: "POST",
          headers: hdr,
          body: JSON.stringify({ bookingId }),
        });
        const json = await res.json();
        if (!json?.tripSeatMap)
          throw new Error(json?.errors?.[0]?.message ?? "No seat map returned");
        setSeatMap(json.tripSeatMap);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function toggleSeat(segKey: string, seat: SeatInfo) {
    setSelected((prev) => {
      const exists = prev.find(
        (s) => s.segmentKey === segKey && s.seatNo === seat.seatNo,
      );
      if (exists)
        return prev.filter(
          (s) => !(s.segmentKey === segKey && s.seatNo === seat.seatNo),
        );
      const filtered = prev.filter((s) => s.segmentKey !== segKey);
      return [
        ...filtered,
        { segmentKey: segKey, seatCode: seat.code, seatNo: seat.seatNo },
      ];
    });
  }

  if (loading)
    return (
      <div
        className="flex flex-col items-center justify-center py-8 gap-3"
        data-ocid="flight.seatmap.loading_state"
      >
        <span className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Loading seat map...</p>
      </div>
    );

  if (error)
    return (
      <div
        className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
        data-ocid="flight.seatmap.error_state"
      >
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        {error}
      </div>
    );

  const segments = seatMap ? Object.entries(seatMap) : [];

  return (
    <div className="space-y-4" data-ocid="flight.seatmap.panel">
      <div className="flex items-center gap-3 flex-wrap text-xs">
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-green-100 border border-green-300 inline-block" />{" "}
          Free
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-blue-100 border border-blue-300 inline-block" />{" "}
          Paid
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-yellow-400 border border-yellow-500 inline-block" />{" "}
          Selected
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-muted border border-muted-foreground/20 opacity-50 inline-block" />{" "}
          Booked
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />{" "}
          Leg Room
        </span>
      </div>

      {segments.map(([segKey, seg]) => (
        <div key={segKey} className="border border-border rounded-xl p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            {segKey}
          </p>
          <SeatGrid
            segKey={segKey}
            seg={seg}
            selected={selected}
            onToggle={(s) => toggleSeat(segKey, s)}
          />
        </div>
      ))}

      {selected.length > 0 && (
        <div className="text-xs text-muted-foreground">
          Selected:{" "}
          {selected.map((s) => `${s.segmentKey}: ${s.seatNo}`).join(", ")}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          size="sm"
          className="bg-primary text-primary-foreground"
          onClick={() => onSeatsSelected(selected)}
          data-ocid="flight.seatmap.confirm_button"
        >
          Confirm Seat Selection
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onSeatsSelected([])}
          data-ocid="flight.seatmap.skip.button"
        >
          Skip
        </Button>
      </div>
    </div>
  );
}
