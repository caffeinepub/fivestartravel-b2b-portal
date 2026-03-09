import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import type { ChecklistItem, VisaCountry } from "./VisaCountrySearch";

interface VisaApplyFlowProps {
  country: VisaCountry;
  onBack: () => void;
  onComplete: (applicationRef: string) => void;
}

const STEPS = ["Trip Details", "Passport", "Documents", "Review & Submit"];

const EMBASSY_OPTIONS: Record<string, string[]> = {
  default: ["New Delhi Embassy", "Mumbai Consulate", "Chennai Consulate"],
  US: ["New Delhi Embassy", "Mumbai Consulate", "Chennai Consulate"],
  GB: ["New Delhi VFS Centre", "Mumbai VFS Centre", "Bangalore VFS Centre"],
  JP: ["New Delhi Consulate", "Kolkata Consulate", "Chennai Consulate"],
  FR: ["New Delhi VFS Centre", "Mumbai VFS Centre", "Hyderabad VFS Centre"],
  CA: ["New Delhi VAC", "Chandigarh VAC", "Mumbai VAC"],
};

const PURPOSE_OPTIONS = [
  "Tourism",
  "Business",
  "Medical",
  "Education",
  "Transit",
  "Other",
];

function StepBar({ current }: { current: number }) {
  return (
    <div
      className="flex items-center gap-0 mb-8"
      data-ocid="visa.apply.stepper.tab"
    >
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                i < current
                  ? "bg-[#22C55E] border-[#22C55E] text-white"
                  : i === current
                    ? "bg-[#0B5ED7] border-[#0B5ED7] text-white"
                    : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {i < current ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block ${
                i === current
                  ? "text-[#0B5ED7]"
                  : i < current
                    ? "text-[#22C55E]"
                    : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 flex-1 mx-1 mt-[-1rem] ${
                i < current ? "bg-[#22C55E]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

type DocStatus = "idle" | "uploading" | "done" | "error";

export default function VisaApplyFlow({
  country,
  onBack,
  onComplete,
}: VisaApplyFlowProps) {
  const isOnline =
    country.visaType === "e-Visa" || country.visaType === "Visa on Arrival";
  const checklist: ChecklistItem[] = isOnline
    ? country.evisaChecklist
    : country.offlineChecklist;
  const mandatory = checklist.filter((c) => c.mandatory);

  const [step, setStep] = useState(0);
  const [scanOpen, setScanOpen] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [appRef, setAppRef] = useState("");
  const [docStatus, setDocStatus] = useState<Record<string, DocStatus>>({});
  const [docNames, setDocNames] = useState<Record<string, string>>({});
  const [tnc, setTnc] = useState(false);
  const [stepError, setStepError] = useState("");

  // Step 1
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [purpose, setPurpose] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [flightRef, setFlightRef] = useState("");
  const [hotelRef, setHotelRef] = useState("");
  const [embassy, setEmbassy] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [courier, setCourier] = useState(false);

  // Step 2
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [passportIssue, setPassportIssue] = useState("");
  const [issueCountry, setIssueCountry] = useState("");

  const embassyList = EMBASSY_OPTIONS[country.code] ?? EMBASSY_OPTIONS.default;

  function simulateOCR() {
    setScanLoading(true);
    setTimeout(() => {
      setFirstName("RAJESH KUMAR");
      setLastName("SHARMA");
      setDob("1988-05-14");
      setGender("Male");
      setNationality("Indian");
      setPassportNo("Z1234567");
      setPassportExpiry("2032-05-13");
      setPassportIssue("2022-05-14");
      setIssueCountry("India");
      setScanLoading(false);
      setScanOpen(false);
    }, 1500);
  }

  function simulateUpload(id: string, fileName: string) {
    setDocStatus((p) => ({ ...p, [id]: "uploading" }));
    setDocNames((p) => ({ ...p, [id]: fileName }));
    setTimeout(() => {
      setDocStatus((p) => ({ ...p, [id]: "done" }));
    }, 1000);
  }

  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleFileChange(
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (file) simulateUpload(id, file.name);
  }

  const uploadedMandatory = mandatory.filter(
    (c) => docStatus[c.id] === "done",
  ).length;
  const uploadProgress =
    mandatory.length > 0
      ? Math.round((uploadedMandatory / mandatory.length) * 100)
      : 100;

  function nextStep() {
    setStepError("");
    if (step === 0) {
      if (!dateFrom || !dateTo || !purpose) {
        setStepError("Please fill travel dates and trip purpose.");
        return;
      }
    }
    if (step === 1) {
      if (!firstName || !lastName || !passportNo || !passportExpiry) {
        setStepError("Please fill all required passport fields.");
        return;
      }
    }
    if (step === 2) {
      const missing = mandatory.filter((c) => docStatus[c.id] !== "done");
      if (missing.length > 0) {
        setStepError(
          `Please upload all mandatory documents. Missing: ${missing
            .map((m) => m.document)
            .slice(0, 2)
            .join(", ")}${missing.length > 2 ? "..." : ""}`,
        );
        return;
      }
    }
    setStep((s) => s + 1);
  }

  function submitApplication() {
    if (!tnc) {
      setStepError("Please accept the Terms & Conditions.");
      return;
    }
    setStepError("");
    setSubmitting(true);
    setTimeout(() => {
      const d = new Date();
      const datePart = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
      const rand = String(Math.floor(1000 + Math.random() * 9000));
      const ref = `FST-VISA-${datePart}-${rand}`;
      setAppRef(ref);
      setSubmitting(false);
      setConfirmed(true);
    }, 2000);
  }

  if (confirmed) {
    const decisionDate = new Date();
    decisionDate.setDate(decisionDate.getDate() + 5);
    return (
      <div
        className="max-w-lg mx-auto px-4 py-12 text-center"
        data-ocid="visa.apply.confirm.dialog"
      >
        <div className="w-20 h-20 rounded-full bg-[#22C55E]/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Application Submitted!
        </h2>
        <p className="text-gray-500 mb-6">
          Your visa application has been received and is under review.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 text-left">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Application Ref</span>
            <span className="font-mono font-bold text-[#0B5ED7]">{appRef}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Country</span>
            <span className="font-medium">
              {country.flag} {country.name}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Visa Type</span>
            <span>{country.visaType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Expected Decision</span>
            <span className="font-medium">{decisionDate.toDateString()}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            data-ocid="visa.confirm.secondary_button"
          >
            <FileText className="w-4 h-4" /> Download PDF Checklist
          </Button>
          <Button
            className="bg-[#0B5ED7] hover:bg-[#0B5ED7]/90"
            onClick={() => onComplete(appRef)}
            data-ocid="visa.confirm.primary_button"
          >
            View Application Status
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          data-ocid="visa.apply.back_button"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">
            {country.flag} {country.name} — {country.visaType}
          </h1>
          <p className="text-sm text-gray-500">
            {country.processing} · Fee:{" "}
            {country.fee === 0
              ? "Free"
              : `$${country.fee} (≈ ₹${(country.fee * 83).toLocaleString()})`}
          </p>
        </div>
      </div>

      <StepBar current={step} />

      {/* Step 1 — Trip Details */}
      {step === 0 && (
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Trip Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">
                Travel Date From *
              </Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                data-ocid="visa.apply.step1.input"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">
                Travel Date To *
              </Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                data-ocid="visa.apply.step1.input"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1 block">
              Trip Purpose *
            </Label>
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger data-ocid="visa.apply.step1.select">
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                {PURPOSE_OPTIONS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1 block">
              Number of Travellers
            </Label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTravellers((v) => Math.max(1, v - 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-bold hover:bg-gray-50"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-gray-800">
                {travellers}
              </span>
              <button
                type="button"
                onClick={() => setTravellers((v) => Math.min(10, v + 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-bold hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">
                Flight PNR / Booking Ref
              </Label>
              <Input
                placeholder="e.g. TJ9ABCDE"
                value={flightRef}
                onChange={(e) => setFlightRef(e.target.value)}
                data-ocid="visa.apply.step1.input"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">
                Hotel Booking Ref
              </Label>
              <Input
                placeholder="e.g. HB123456"
                value={hotelRef}
                onChange={(e) => setHotelRef(e.target.value)}
                data-ocid="visa.apply.step1.input"
              />
            </div>
          </div>
          {!isOnline && (
            <div className="space-y-4 border border-orange-100 bg-orange-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-orange-700">
                Embassy / Consulate Details
              </h3>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">
                  Embassy / Consulate
                </Label>
                <Select value={embassy} onValueChange={setEmbassy}>
                  <SelectTrigger data-ocid="visa.apply.step1.select">
                    <SelectValue placeholder="Select embassy" />
                  </SelectTrigger>
                  <SelectContent>
                    {embassyList.map((e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">
                  Appointment Date
                </Label>
                <Input
                  type="date"
                  value={apptDate}
                  onChange={(e) => setApptDate(e.target.value)}
                  data-ocid="visa.apply.step1.input"
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="courier"
                  checked={courier}
                  onCheckedChange={(v) => setCourier(!!v)}
                  data-ocid="visa.apply.step1.checkbox"
                />
                <Label htmlFor="courier" className="text-sm text-gray-700">
                  Enable courier return of passport
                </Label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2 — Passport Details */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">
              Passport Details — Traveller 1
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setScanOpen(true)}
              data-ocid="visa.apply.step2.scan_button"
            >
              <Camera className="w-4 h-4" /> Scan Passport
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                ["First Name *", firstName, setFirstName],
                ["Last Name *", lastName, setLastName],
                ["Nationality", nationality, setNationality],
                ["Passport Number *", passportNo, setPassportNo],
              ] as [string, string, (v: string) => void][]
            ).map(([label, val, setter]) => (
              <div key={label}>
                <Label className="text-xs text-gray-500 mb-1 block">
                  {label}
                </Label>
                <Input
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  data-ocid="visa.apply.step2.input"
                />
              </div>
            ))}
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">
                Date of Birth
              </Label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                data-ocid="visa.apply.step2.input"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger data-ocid="visa.apply.step2.select">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">
                Passport Expiry *
              </Label>
              <Input
                type="date"
                value={passportExpiry}
                onChange={(e) => setPassportExpiry(e.target.value)}
                data-ocid="visa.apply.step2.input"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">
                Issue Date
              </Label>
              <Input
                type="date"
                value={passportIssue}
                onChange={(e) => setPassportIssue(e.target.value)}
                data-ocid="visa.apply.step2.input"
              />
            </div>
            <div className="col-span-2">
              <Label className="text-xs text-gray-500 mb-1 block">
                Issue Country
              </Label>
              <Input
                value={issueCountry}
                onChange={(e) => setIssueCountry(e.target.value)}
                data-ocid="visa.apply.step2.input"
              />
            </div>
          </div>
          {/* Photo + Passport scans */}
          <div className="space-y-3">
            {isOnline && (
              <DocUploadRow
                id="visa-photo"
                label="Visa Photo (white background, JPEG/PNG, max 2MB)"
                mandatory
                fileRefs={fileRefs}
                onChange={handleFileChange}
                status={docStatus["visa-photo"] ?? "idle"}
                fileName={docNames["visa-photo"]}
                index={0}
              />
            )}
            <DocUploadRow
              id="pp-front"
              label="Passport Front Scan"
              mandatory
              fileRefs={fileRefs}
              onChange={handleFileChange}
              status={docStatus["pp-front"] ?? "idle"}
              fileName={docNames["pp-front"]}
              index={1}
            />
            <DocUploadRow
              id="pp-back"
              label="Passport Back Scan"
              mandatory={false}
              fileRefs={fileRefs}
              onChange={handleFileChange}
              status={docStatus["pp-back"] ?? "idle"}
              fileName={docNames["pp-back"]}
              index={2}
            />
          </div>
        </div>
      )}

      {/* Step 3 — Documents */}
      {step === 2 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-gray-800">
              Required Documents
            </h2>
            <span className="text-xs text-gray-500">
              {country.name} · {country.visaType}
            </span>
          </div>
          <div className="mb-5">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>
                {uploadedMandatory} of {mandatory.length} mandatory uploaded
              </span>
              <span className="font-semibold text-[#22C55E]">
                {uploadProgress}%
              </span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <DocSection
              title="Mandatory Documents"
              items={mandatory}
              fileRefs={fileRefs}
              docStatus={docStatus}
              docNames={docNames}
              onChange={handleFileChange}
              startIndex={1}
            />
            {checklist.filter((c) => !c.mandatory).length > 0 && (
              <DocSection
                title="Optional Documents"
                items={checklist.filter((c) => !c.mandatory)}
                fileRefs={fileRefs}
                docStatus={docStatus}
                docNames={docNames}
                onChange={handleFileChange}
                startIndex={mandatory.length + 1}
              />
            )}
          </div>
        </div>
      )}

      {/* Step 4 — Review & Submit */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Review & Submit
          </h2>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2 text-sm">
            <Row label="Country" value={`${country.flag} ${country.name}`} />
            <Row label="Visa Type" value={country.visaType} />
            <Row
              label="Travel Dates"
              value={dateFrom && dateTo ? `${dateFrom} → ${dateTo}` : "—"}
            />
            <Row label="Purpose" value={purpose || "—"} />
            <Row label="Travellers" value={String(travellers)} />
            {flightRef && <Row label="Flight PNR" value={flightRef} />}
            {hotelRef && <Row label="Hotel Ref" value={hotelRef} />}
            {!isOnline && embassy && <Row label="Embassy" value={embassy} />}
            {!isOnline && apptDate && (
              <Row label="Appointment" value={apptDate} />
            )}
            {!isOnline && (
              <Row label="Courier Return" value={courier ? "Yes" : "No"} />
            )}
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2 text-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Passport Summary
            </h3>
            <Row label="Name" value={`${firstName} ${lastName}`} />
            <Row
              label="Passport No"
              value={
                passportNo
                  ? `${passportNo.slice(0, 2)}${"*".repeat(passportNo.length - 4)}${passportNo.slice(-2)}`
                  : "—"
              }
            />
            <Row label="Expiry" value={passportExpiry || "—"} />
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Documents
            </h3>
            <div className="space-y-1">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-700 text-xs truncate max-w-[75%]">
                    {item.document}
                  </span>
                  {docStatus[item.id] === "done" ? (
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                  ) : (
                    <span className="text-xs text-gray-400">
                      {item.mandatory ? "Missing" : "Optional"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Fee Summary
            </h3>
            <Row
              label="Visa Fee"
              value={
                country.fee === 0
                  ? "Free"
                  : `$${country.fee} (₹${(country.fee * 83).toLocaleString()})`
              }
            />
            <Row label="Service Charge" value="₹499" />
            <div className="border-t border-blue-200 mt-2 pt-2">
              <Row
                label="Total"
                value={
                  country.fee === 0
                    ? "₹499"
                    : `₹${(country.fee * 83 + 499).toLocaleString()}`
                }
                bold
              />
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl">
            <Checkbox
              id="tnc"
              checked={tnc}
              onCheckedChange={(v) => setTnc(!!v)}
              data-ocid="visa.apply.tnc.checkbox"
            />
            <Label
              htmlFor="tnc"
              className="text-sm text-gray-700 leading-relaxed cursor-pointer"
            >
              I confirm all information provided is accurate and all documents
              submitted are genuine. I understand that providing false
              information may result in visa rejection.
            </Label>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {stepError && (
        <div
          className="mt-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
          data-ocid="visa.apply.error_state"
        >
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{stepError}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        {step > 0 ? (
          <Button
            variant="outline"
            onClick={() => {
              setStep((s) => s - 1);
              setStepError("");
            }}
            data-ocid="visa.apply.back_button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        ) : (
          <div />
        )}
        {step < 3 ? (
          <Button
            className="bg-[#0B5ED7] hover:bg-[#0B5ED7]/90 text-white"
            onClick={nextStep}
            data-ocid="visa.apply.step1.next_button"
          >
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            className="bg-[#0B5ED7] hover:bg-[#0B5ED7]/90 text-white min-w-[160px]"
            onClick={submitApplication}
            disabled={submitting}
            data-ocid="visa.apply.step4.submit_button"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting…
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        )}
      </div>

      {/* OCR Modal */}
      <Dialog open={scanOpen} onOpenChange={setScanOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" /> Scan Passport
            </DialogTitle>
          </DialogHeader>
          <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 h-52 flex flex-col items-center justify-center gap-2">
            <Camera className="w-10 h-10 text-gray-300" />
            <p className="text-sm text-gray-500 text-center px-4">
              Position your passport MRZ page in the frame
            </p>
            <p className="text-xs text-gray-400">
              Ensure good lighting and all corners are visible
            </p>
          </div>
          <Button
            className="w-full bg-[#0B5ED7] hover:bg-[#0B5ED7]/90"
            onClick={simulateOCR}
            disabled={scanLoading}
            data-ocid="visa.apply.step2.capture_button"
          >
            {scanLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scanning…
              </>
            ) : (
              "Capture & Auto-Fill"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Sub-components
function DocUploadRow({
  id,
  label,
  mandatory,
  fileRefs,
  onChange,
  status,
  fileName,
  index,
}: {
  id: string;
  label: string;
  mandatory: boolean;
  fileRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  status: DocStatus;
  fileName?: string;
  index: number;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-800 truncate">{label}</span>
          {mandatory && (
            <Badge
              variant="outline"
              className="text-xs border-red-200 text-red-600 flex-shrink-0"
            >
              Required
            </Badge>
          )}
        </div>
        {fileName && (
          <p className="text-xs text-gray-400 mt-0.5 truncate">{fileName}</p>
        )}
      </div>
      <UploadStatus status={status} />
      <input
        ref={(el) => {
          fileRefs.current[id] = el;
        }}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => onChange(id, e)}
      />
      <Button
        size="sm"
        variant="outline"
        className="flex-shrink-0"
        onClick={() => fileRefs.current[id]?.click()}
        disabled={status === "uploading"}
        data-ocid={`visa.apply.step3.upload_button.${index}`}
      >
        <Upload className="w-3 h-3 mr-1" />{" "}
        {status === "done" ? "Replace" : "Upload"}
      </Button>
    </div>
  );
}

function DocSection({
  title,
  items,
  fileRefs,
  docStatus,
  docNames,
  onChange,
  startIndex,
}: {
  title: string;
  items: ChecklistItem[];
  fileRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
  docStatus: Record<string, DocStatus>;
  docNames: Record<string, string>;
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  startIndex: number;
}) {
  return (
    <div>
      <h3
        className={`text-sm font-semibold mb-3 ${title.includes("Mandatory") ? "text-red-700" : "text-gray-500"}`}
      >
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="border border-gray-100 rounded-xl p-3 bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-medium text-gray-800">
                    {item.document}
                  </span>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {item.category}
                  </Badge>
                </div>
                {item.notes && (
                  <p className="text-xs text-gray-400 italic">{item.notes}</p>
                )}
                {docNames[item.id] && (
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {docNames[item.id]}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <UploadStatus status={docStatus[item.id] ?? "idle"} />
                <input
                  ref={(el) => {
                    fileRefs.current[item.id] = el;
                  }}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => onChange(item.id, e)}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => fileRefs.current[item.id]?.click()}
                  disabled={docStatus[item.id] === "uploading"}
                  data-ocid={`visa.apply.step3.upload_button.${startIndex + i}`}
                >
                  <Upload className="w-3 h-3 mr-1" />{" "}
                  {docStatus[item.id] === "done" ? "Replace" : "Upload"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadStatus({ status }: { status: DocStatus }) {
  if (status === "uploading")
    return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
  if (status === "done")
    return <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />;
  if (status === "error")
    return <AlertTriangle className="w-4 h-4 text-red-500" />;
  return null;
}

function Row({
  label,
  value,
  bold,
}: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span
        className={
          bold ? "font-bold text-[#0B5ED7]" : "font-medium text-gray-800"
        }
      >
        {value}
      </span>
    </div>
  );
}
