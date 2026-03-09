import { AlertCircle, BookOpen, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export interface FlightFareRulesProps {
  bookingId: string;
  priceId: string;
  flowType: "SEARCH" | "REVIEW" | "BOOKING_DETAIL";
}

interface PolicyEntry {
  amount?: number;
  additionalFee?: number;
  policyInfo?: string;
  st?: number;
  et?: number;
  pp?: string;
  fcs?: string;
}

interface RouteRule {
  tfr?: Record<string, PolicyEntry[]>;
  miscInfo?: Array<{ info: string }>;
}

const API = "https://apitest.tripjack.com";
const KEY = "7114315c476d94-4ef2-4e21-83e8-527d56a0c529";
const hdr = { "Content-Type": "application/json", apikey: KEY };

function periodLabel(p: PolicyEntry): string {
  if (p.st !== undefined && p.et !== undefined)
    return `${p.st}\u2013${p.et} hrs before`;
  if (p.pp) {
    const map: Record<string, string> = {
      BEFORE_DEPARTURE: "Before Departure",
      AFTER_DEPARTURE: "After Departure",
      DEFAULT: "Any Time",
    };
    return map[p.pp] ?? p.pp;
  }
  return "\u2014";
}

function fmt(n?: number) {
  if (n === undefined || n === null) return "\u2014";
  return n === 0 ? "Free" : `\u20b9${n.toLocaleString("en-IN")}`;
}

function PolicyTable({ entries }: { entries: PolicyEntry[] }) {
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="text-left text-muted-foreground border-b border-border">
          <th className="pb-2 pr-3 font-medium">Period</th>
          <th className="pb-2 pr-3 font-medium">Airline Fee</th>
          <th className="pb-2 pr-3 font-medium">Add. Fee</th>
          <th className="pb-2 font-medium">Notes</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => {
          const rowKey = `${e.pp ?? ""}-${e.st ?? ""}-${e.et ?? ""}-${e.amount ?? ""}`;
          return (
            <tr
              key={rowKey}
              className="border-b border-border/50 last:border-0"
            >
              <td className="py-2 pr-3 text-foreground">{periodLabel(e)}</td>
              <td className="py-2 pr-3">{fmt(e.amount)}</td>
              <td className="py-2 pr-3">{fmt(e.additionalFee)}</td>
              <td className="py-2 text-muted-foreground">
                {e.policyInfo ?? "\u2014"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function FlightFareRules({
  bookingId,
  priceId,
  flowType,
}: FlightFareRulesProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rules, setRules] = useState<Record<string, RouteRule> | null>(null);

  const RULE_LABELS: Record<string, string> = {
    CANCELLATION: "Cancellation",
    DATECHANGE: "Date Change",
    NO_SHOW: "No Show",
    SEAT_CHARGEABLE: "Seat Fee",
  };

  async function fetchRules() {
    setLoading(true);
    setError("");
    try {
      const id = flowType === "SEARCH" ? priceId : bookingId;
      const res = await fetch(`${API}/fms/v2/farerule`, {
        method: "POST",
        headers: hdr,
        body: JSON.stringify({
          flowType: flowType === "BOOKING_DETAIL" ? "BOOKING_DETAIL" : "REVIEW",
          id,
        }),
      });
      const json = await res.json();
      if (!json?.farerule)
        throw new Error(json?.errors?.[0]?.message ?? "No fare rules returned");
      setRules(json.farerule);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleOpen() {
    setOpen(true);
    if (!rules) fetchRules();
  }

  const routes = rules ? Object.keys(rules) : [];

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-xs gap-1.5"
        onClick={handleOpen}
        data-ocid="flight.farerules.open_modal_button"
      >
        <BookOpen className="w-3.5 h-3.5" />
        View Fare Rules
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl w-full"
          data-ocid="flight.farerules.modal"
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base">Fare Rules</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setOpen(false)}
                data-ocid="flight.farerules.close_button"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          {loading && (
            <div
              className="flex flex-col items-center justify-center py-12 gap-3"
              data-ocid="flight.farerules.loading_state"
            >
              <span className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <p className="text-sm text-muted-foreground">
                Loading fare rules...
              </p>
            </div>
          )}

          {error && (
            <div
              className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
              data-ocid="flight.farerules.error_state"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {!loading && !error && rules && routes.length > 0 && (
            <Tabs defaultValue={routes[0]} className="mt-1">
              <TabsList className="flex-wrap h-auto gap-1 bg-muted/50 p-1">
                {routes.map((route) => (
                  <TabsTrigger
                    key={route}
                    value={route}
                    className="text-xs"
                    data-ocid="flight.farerules.tab"
                  >
                    {route}
                  </TabsTrigger>
                ))}
              </TabsList>
              {routes.map((route) => {
                const r = rules[route];
                return (
                  <TabsContent key={route} value={route} className="mt-3">
                    <ScrollArea className="max-h-80">
                      {r.miscInfo && r.miscInfo.length > 0 ? (
                        <div className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed p-1">
                          {r.miscInfo.map((m) => (
                            <p key={m.info.slice(0, 40)} className="mb-2">
                              {m.info}
                            </p>
                          ))}
                        </div>
                      ) : r.tfr ? (
                        <div className="space-y-4">
                          {Object.entries(r.tfr).map(([key, entries]) => (
                            <div key={key}>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  variant="outline"
                                  className="text-[10px]"
                                >
                                  {RULE_LABELS[key] ?? key}
                                </Badge>
                              </div>
                              <PolicyTable entries={entries} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No rules available for this route.
                        </p>
                      )}
                    </ScrollArea>
                  </TabsContent>
                );
              })}
            </Tabs>
          )}

          {!loading && !error && !rules && (
            <p className="text-sm text-muted-foreground py-6 text-center">
              No fare rules available.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
