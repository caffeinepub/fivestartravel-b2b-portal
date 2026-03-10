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
  Building2,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Globe,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import VisaCountrySearch, { type VisaCountry } from "./VisaCountrySearch";
import VisaEvisaFlow from "./VisaEvisaFlow";
import VisaOfflineFlow from "./VisaOfflineFlow";

type View = "search" | "evisa" | "offline" | "status";
type VisaTab = "evisa" | "offline";

interface ApplicationRecord {
  ref: string;
  country: string;
  visaType: string;
  submitted: string;
  status: "Approved" | "Pending" | "Processing" | "Rejected";
}

const SEED_APPLICATIONS: ApplicationRecord[] = [
  {
    ref: "FST-EVISA-20260110-4521",
    country: "UAE (Dubai)",
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
    ref: "FST-EVISA-20260301-1193",
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
  Rejected: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
};

function StatusBadge({ status }: { status: ApplicationRecord["status"] }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

export default function VisaServices() {
  const [view, setView] = useState<View>("search");
  const [visaTab, setVisaTab] = useState<VisaTab>("evisa");
  const [selectedCountry, setSelectedCountry] = useState<VisaCountry | null>(
    null,
  );
  const [completedApps, setCompletedApps] = useState<ApplicationRecord[]>([]);

  const allApplications = [...SEED_APPLICATIONS, ...completedApps];

  function handleSelectCountry(country: VisaCountry) {
    setSelectedCountry(country);
    const isOnline =
      country.visaType === "e-Visa" || country.visaType === "Visa on Arrival";
    setView(isOnline ? "evisa" : "offline");
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
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Back button */}
          {(view === "evisa" || view === "offline") && (
            <button
              type="button"
              data-ocid="visa.back.button"
              onClick={() => setView("search")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to countries
            </button>
          )}

          {/* Primary Tab Navigation */}
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              data-ocid="visa.evisa.tab"
              onClick={() => {
                setVisaTab("evisa");
                setView("search");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                visaTab === "evisa" && (view === "search" || view === "evisa")
                  ? "bg-gradient-to-r from-slate-900 to-blue-900 text-white border-transparent shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-[#0B5ED7]"
              }`}
            >
              <Globe className="h-4 w-4" />
              Online eVisa
              <Badge className="ml-1 bg-emerald-100 text-emerald-700 border-none text-xs px-1.5 py-0">
                Instant
              </Badge>
            </button>

            <button
              type="button"
              data-ocid="visa.offline.tab"
              onClick={() => {
                setVisaTab("offline");
                setView("search");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                visaTab === "offline" &&
                (view === "search" || view === "offline")
                  ? "bg-gradient-to-r from-slate-700 to-blue-800 text-white border-transparent shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-slate-400 hover:text-slate-700"
              }`}
            >
              <Building2 className="h-4 w-4" />
              Offline / Sticker Visa
              <Badge className="ml-1 bg-slate-100 text-slate-700 border-none text-xs px-1.5 py-0">
                Embassy
              </Badge>
            </button>

            <div className="flex-1" />

            <button
              type="button"
              data-ocid="visa.status.tab"
              onClick={() => setView("status")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                view === "status"
                  ? "bg-gradient-to-r from-slate-800 to-blue-900 text-white border-transparent shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#0B5ED7] hover:text-[#0B5ED7]"
              }`}
            >
              <FileText className="h-4 w-4" />
              My Applications
              {allApplications.length > 0 && (
                <span className="bg-[#0B5ED7] text-white text-xs rounded-full px-1.5 py-0.5 ml-1">
                  {allApplications.length}
                </span>
              )}
            </button>
          </div>

          {/* Sub-label for current tab */}
          {view !== "status" && (
            <div
              className={`text-xs font-medium px-1 ${
                visaTab === "evisa" ? "text-orange-600" : "text-slate-500"
              }`}
            >
              {visaTab === "evisa"
                ? "🌐 Instant approval · 100% online · No embassy visit"
                : "🏛️ Embassy appointment · Original documents · Physical stamp"}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* eVisa flow */}
        {view === "evisa" && selectedCountry && (
          <VisaEvisaFlow
            country={selectedCountry}
            onBack={() => setView("search")}
            onComplete={(ref) => {
              handleApplicationComplete(ref);
            }}
          />
        )}

        {/* Offline flow */}
        {view === "offline" && selectedCountry && (
          <VisaOfflineFlow
            country={selectedCountry}
            onBack={() => setView("search")}
            onComplete={(ref) => {
              handleApplicationComplete(ref);
            }}
          />
        )}

        {/* Country search */}
        {view === "search" && (
          <VisaCountrySearch
            onSelectCountry={handleSelectCountry}
            visaTab={visaTab}
          />
        )}

        {/* My Applications */}
        {view === "status" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  My Visa Applications
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {allApplications.length} total applications
                </p>
              </div>
            </div>

            {allApplications.length === 0 ? (
              <div
                className="text-center py-16 text-gray-400"
                data-ocid="visa.status.empty_state"
              >
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No applications yet</p>
                <p className="text-sm mt-1">Apply for a visa to see it here</p>
                <Button
                  variant="outline"
                  className="mt-4 border-orange-300 text-orange-600 hover:bg-orange-50"
                  onClick={() => setView("search")}
                  data-ocid="visa.status.secondary_button"
                >
                  Browse Countries
                </Button>
              </div>
            ) : (
              <div
                className="rounded-xl border border-border overflow-hidden"
                data-ocid="visa.status.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Reference</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Visa Type</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allApplications.map((app, i) => (
                      <TableRow
                        key={app.ref}
                        className="hover:bg-muted/30 transition-colors"
                        data-ocid={`visa.status.row.${i + 1}`}
                      >
                        <TableCell className="font-mono text-sm text-orange-600 font-semibold">
                          {app.ref}
                        </TableCell>
                        <TableCell className="font-medium">
                          {app.country}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                              app.visaType === "e-Visa"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : app.visaType === "Visa on Arrival"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-orange-50 text-orange-700 border-orange-200"
                            }`}
                          >
                            {app.visaType}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {app.submitted}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={app.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            type="button"
                            onClick={() => toast.info(`Tracking ${app.ref}`)}
                            className="text-orange-600 hover:text-orange-700 hover:underline text-sm flex items-center gap-1 ml-auto font-medium"
                            data-ocid={`visa.status.edit_button.${i + 1}`}
                          >
                            <Eye className="h-3.5 w-3.5" /> View
                          </button>
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
