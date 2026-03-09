import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import VisaApplyFlow from "./VisaApplyFlow";
import VisaCountrySearch, { type VisaCountry } from "./VisaCountrySearch";

type View = "search" | "apply" | "status";

interface ApplicationRecord {
  ref: string;
  country: string;
  visaType: string;
  submitted: string;
  status: "Approved" | "Pending" | "Processing" | "Rejected";
}

const SEED_APPLICATIONS: ApplicationRecord[] = [
  {
    ref: "FST-VISA-20260110-4521",
    country: "UAE",
    visaType: "e-Visa",
    submitted: "10 Jan 2026",
    status: "Approved",
  },
  {
    ref: "FST-VISA-20260205-7832",
    country: "Schengen (France)",
    visaType: "Sticker Visa",
    submitted: "05 Feb 2026",
    status: "Processing",
  },
  {
    ref: "FST-VISA-20260301-1193",
    country: "Thailand",
    visaType: "Visa on Arrival",
    submitted: "01 Mar 2026",
    status: "Pending",
  },
];

const STATUS_CONFIG = {
  Approved: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  Pending: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
  },
  Processing: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: RefreshCw,
  },
  Rejected: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
};

function StatusBadge({ status }: { status: ApplicationRecord["status"] }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
        config.color
      }`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

export default function VisaServices() {
  const [view, setView] = useState<View>("search");
  const [selectedCountry, setSelectedCountry] = useState<VisaCountry | null>(
    null,
  );
  const [completedApps, setCompletedApps] = useState<ApplicationRecord[]>([]);

  const allApplications = [...SEED_APPLICATIONS, ...completedApps];

  function handleSelectCountry(country: VisaCountry) {
    setSelectedCountry(country);
    setView("apply");
  }

  function handleApplicationComplete(ref: string) {
    if (!selectedCountry) return;
    const newApp: ApplicationRecord = {
      ref,
      country: selectedCountry.name,
      visaType: selectedCountry.visaType,
      submitted: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
    };
    setCompletedApps((prev) => [newApp, ...prev]);
    setView("status");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Breadcrumb for apply view */}
          {view === "apply" && (
            <button
              type="button"
              data-ocid="visa.back_button"
              onClick={() => setView("search")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to countries
            </button>
          )}

          {/* Top nav tabs */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              data-ocid="visa.nav.tab"
              onClick={() => setView("search")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "search" || view === "apply"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Search className="h-4 w-4" />
              Find Visa
            </button>
            <button
              type="button"
              data-ocid="visa.nav.tab"
              onClick={() => setView("status")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "status"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <FileText className="h-4 w-4" />
              My Applications
              {allApplications.length > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-xs font-bold bg-primary-foreground/20">
                  {allApplications.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {view === "search" && (
          <VisaCountrySearch onSelectCountry={handleSelectCountry} />
        )}

        {view === "apply" && selectedCountry && (
          <VisaApplyFlow
            country={selectedCountry}
            onBack={() => setView("search")}
            onComplete={handleApplicationComplete}
          />
        )}

        {view === "status" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                My Visa Applications
              </h2>
              <p className="text-muted-foreground mt-1">
                Track the status of all your visa applications in one place.
              </p>
            </div>

            {allApplications.length === 0 ? (
              <div
                data-ocid="visa.status.empty_state"
                className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-xl bg-card/40"
              >
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No applications yet
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  You haven&apos;t submitted any visa applications. Find a
                  country and start your application.
                </p>
                <Button
                  className="mt-6"
                  onClick={() => setView("search")}
                  data-ocid="visa.nav.tab"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find a Visa
                </Button>
              </div>
            ) : (
              <div
                className="rounded-xl border border-border bg-card overflow-hidden"
                data-ocid="visa.status.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Reference</TableHead>
                      <TableHead className="font-semibold">Country</TableHead>
                      <TableHead className="font-semibold">Visa Type</TableHead>
                      <TableHead className="font-semibold">Submitted</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allApplications.map((app, idx) => (
                      <TableRow
                        key={app.ref}
                        data-ocid={`visa.status.row.${idx + 1}`}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {app.ref}
                        </TableCell>
                        <TableCell className="font-medium">
                          {app.country}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {app.visaType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {app.submitted}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={app.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            data-ocid={`visa.status.view_button.${idx + 1}`}
                            onClick={() =>
                              toast.info(`Application ${app.ref}`, {
                                description: `${app.country} · ${app.visaType} · Status: ${app.status}`,
                              })
                            }
                            className="gap-1.5"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
