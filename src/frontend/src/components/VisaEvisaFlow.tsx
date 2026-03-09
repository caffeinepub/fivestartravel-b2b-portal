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
  Globe,
  Loader2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ChecklistItem, VisaCountry } from "./VisaCountrySearch";

interface Props {
  country: VisaCountry;
  onBack: () => void;
  onComplete: (ref: string) => void;
}

const STEPS = ["Trip Details", "Passport", "Documents", "Review & Submit"];
const PURPOSE_OPTIONS = [
  "Tourism",
  "Business",
  "Medical",
  "Education",
  "Transit",
  "Other",
];

type DocStatus = "idle" | "uploading" | "done" | "error";

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-8" data-ocid="evisa.stepper.tab">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                i < current
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : i === current
                    ? "bg-[#0B5ED7] border-[#0B5ED7] text-white"
                    : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {i < current ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block ${
                i <= current ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 flex-1 mx-1 ${
                i < current ? "bg-emerald-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p
      className="text-xs text-red-500 mt-1"
      data-ocid="evisa.field.error_state"
    >
      {msg}
    </p>
  );
}

export default function VisaEvisaFlow({ country, onBack, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [appRef, setAppRef] = useState("");

  // Step 1
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [travellers, setTravellers] = useState("1");
  const [flightPnr, setFlightPnr] = useState("");
  const [hotelRef, setHotelRef] = useState("");

  // Step 2
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNum, setPassportNum] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [passportIssue, setPassportIssue] = useState("");
  const [issuingCountry, setIssuingCountry] = useState("");
  const [scanOpen, setScanOpen] = useState(false);
  const [scanning, setScanning] = useState(false);

  // Step 3
  const [docStatus, setDocStatus] = useState<Record<string, DocStatus>>({});
  // Step 4
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mandatoryDocs = country.evisaChecklist.filter((d) => d.mandatory);
  const optionalDocs = country.evisaChecklist.filter((d) => !d.mandatory);
  const mandatoryUploaded = mandatoryDocs.filter(
    (d) => docStatus[d.id] === "done",
  ).length;
  const docProgress =
    mandatoryDocs.length > 0
      ? Math.round((mandatoryUploaded / mandatoryDocs.length) * 100)
      : 100;

  function validateStep(s: number): boolean {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!fromDate) e.fromDate = "Select departure date";
      if (!toDate) e.toDate = "Select return date";
      if (!purpose) e.purpose = "Select travel purpose";
    } else if (s === 1) {
      if (!firstName.trim()) e.firstName = "Required";
      if (!lastName.trim()) e.lastName = "Required";
      if (!dob) e.dob = "Required";
      if (!gender) e.gender = "Required";
      if (!nationality.trim()) e.nationality = "Required";
      if (!passportNum.trim()) e.passportNum = "Required";
      if (!passportExpiry) e.passportExpiry = "Required";
      if (!passportIssue) e.passportIssue = "Required";
      if (!issuingCountry.trim()) e.issuingCountry = "Required";
    } else if (s === 2) {
      if (mandatoryUploaded < mandatoryDocs.length)
        e.docs = `Please upload all ${mandatoryDocs.length} mandatory documents`;
    } else if (s === 3) {
      if (!agreeTerms) e.terms = "You must accept the terms";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) setStep((p) => p + 1);
  }
  function handleBack() {
    if (step === 0) onBack();
    else setStep((p) => p - 1);
  }

  function handleScanPassport() {
    setScanOpen(true);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setFirstName("RAJESH");
      setLastName("KUMAR");
      setDob("1988-04-15");
      setGender("Male");
      setNationality("Indian");
      setPassportNum("Z1234567");
      setPassportExpiry("2031-03-20");
      setPassportIssue("2021-03-21");
      setIssuingCountry("India");
      toast.success("Passport data extracted successfully");
      setScanOpen(false);
    }, 1500);
  }

  function handleDocUpload(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    setDocStatus((p) => ({ ...p, [id]: "uploading" }));
    setTimeout(() => {
      setDocStatus((p) => ({ ...p, [id]: "done" }));
      toast.success("Document uploaded");
    }, 1000);
  }

  function handleSubmit() {
    if (!validateStep(3)) return;
    const d = new Date();
    const dateStr = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `FST-EVISA-${dateStr}-${randNum}`;
    setAppRef(ref);
    setConfirmed(true);
    onComplete(ref);
  }

  const visaFee = country.fee;
  const serviceCharge = Math.round(visaFee * 0.1);
  const gst = Math.round((visaFee + serviceCharge) * 0.18);
  const totalInr = Math.round((visaFee + serviceCharge + gst) * 83.5);

  if (confirmed) {
    return (
      <div
        className="max-w-xl mx-auto py-12 px-4 text-center"
        data-ocid="evisa.success_state"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <div className="text-4xl mb-3">{country.flag}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Application Submitted!
        </h2>
        <p className="text-gray-500 mb-6">
          Your eVisa application for <strong>{country.name}</strong> has been
          received.
        </p>
        <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Reference Number</span>
            <span className="font-mono font-bold text-[#0B5ED7]">{appRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Visa Type</span>
            <span className="font-medium">{country.visaType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Expected Processing</span>
            <span className="font-medium">{country.processing}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Applicant</span>
            <span className="font-medium">
              {firstName} {lastName}
            </span>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onBack}
            data-ocid="evisa.confirm.secondary_button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
          <Button
            className="bg-[#0B5ED7] hover:bg-blue-700 text-white"
            onClick={() => toast.info("Application tracking coming soon")}
            data-ocid="evisa.confirm.primary_button"
          >
            Track Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white flex items-center gap-4">
        <div className="text-4xl">{country.flag}</div>
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium opacity-90">Online eVisa</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
              {country.visaType}
            </span>
          </div>
          <h1 className="text-xl font-bold mt-0.5">{country.name}</h1>
          <div className="text-sm opacity-80">
            Fee: ${country.fee} USD · {country.processing}
          </div>
        </div>
      </div>

      <StepBar current={step} />

      {/* Step 1: Trip Details */}
      {step === 0 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">Trip Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="evisa-from">Departure Date *</Label>
              <Input
                id="evisa-from"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="mt-1"
                data-ocid="evisa.trip.from_date.input"
              />
              <FieldError msg={errors.fromDate} />
            </div>
            <div>
              <Label htmlFor="evisa-to">Return Date *</Label>
              <Input
                id="evisa-to"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="mt-1"
                data-ocid="evisa.trip.to_date.input"
              />
              <FieldError msg={errors.toDate} />
            </div>
          </div>
          <div>
            <Label>Purpose of Travel *</Label>
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger
                className="mt-1"
                data-ocid="evisa.trip.purpose.select"
              >
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
            <FieldError msg={errors.purpose} />
          </div>
          <div>
            <Label htmlFor="evisa-travellers">Number of Travellers</Label>
            <Select value={travellers} onValueChange={setTravellers}>
              <SelectTrigger
                className="mt-1"
                data-ocid="evisa.trip.travellers.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["1", "2", "3", "4", "5", "6"].map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="evisa-pnr">Flight PNR (optional)</Label>
              <Input
                id="evisa-pnr"
                placeholder="e.g. ABCD12"
                value={flightPnr}
                onChange={(e) => setFlightPnr(e.target.value)}
                className="mt-1"
                data-ocid="evisa.trip.pnr.input"
              />
            </div>
            <div>
              <Label htmlFor="evisa-hotel">Hotel Booking Ref (optional)</Label>
              <Input
                id="evisa-hotel"
                placeholder="e.g. HTL-2026-XYZ"
                value={hotelRef}
                onChange={(e) => setHotelRef(e.target.value)}
                className="mt-1"
                data-ocid="evisa.trip.hotel_ref.input"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Passport Details */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Passport Details
            </h2>
            <Button
              type="button"
              variant="outline"
              className="text-[#0B5ED7] border-[#0B5ED7] hover:bg-blue-50"
              onClick={() => setScanOpen(true)}
              data-ocid="evisa.passport.scan.button"
            >
              <Camera className="w-4 h-4 mr-2" /> Scan Passport
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="evisa-fn">First Name *</Label>
              <Input
                id="evisa-fn"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1"
                data-ocid="evisa.passport.firstname.input"
              />
              <FieldError msg={errors.firstName} />
            </div>
            <div>
              <Label htmlFor="evisa-ln">Last Name *</Label>
              <Input
                id="evisa-ln"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1"
                data-ocid="evisa.passport.lastname.input"
              />
              <FieldError msg={errors.lastName} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="evisa-dob">Date of Birth *</Label>
              <Input
                id="evisa-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1"
                data-ocid="evisa.passport.dob.input"
              />
              <FieldError msg={errors.dob} />
            </div>
            <div>
              <Label>Gender *</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger
                  className="mt-1"
                  data-ocid="evisa.passport.gender.select"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {["Male", "Female", "Other"].map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError msg={errors.gender} />
            </div>
          </div>
          <div>
            <Label htmlFor="evisa-nat">Nationality *</Label>
            <Input
              id="evisa-nat"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="mt-1"
              data-ocid="evisa.passport.nationality.input"
            />
            <FieldError msg={errors.nationality} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="evisa-pnum">Passport Number *</Label>
              <Input
                id="evisa-pnum"
                value={passportNum}
                onChange={(e) => setPassportNum(e.target.value)}
                className="mt-1"
                data-ocid="evisa.passport.number.input"
              />
              <FieldError msg={errors.passportNum} />
            </div>
            <div>
              <Label htmlFor="evisa-issuing">Issuing Country *</Label>
              <Input
                id="evisa-issuing"
                value={issuingCountry}
                onChange={(e) => setIssuingCountry(e.target.value)}
                className="mt-1"
                data-ocid="evisa.passport.issuing_country.input"
              />
              <FieldError msg={errors.issuingCountry} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="evisa-pissue">Issue Date *</Label>
              <Input
                id="evisa-pissue"
                type="date"
                value={passportIssue}
                onChange={(e) => setPassportIssue(e.target.value)}
                className="mt-1"
                data-ocid="evisa.passport.issue_date.input"
              />
              <FieldError msg={errors.passportIssue} />
            </div>
            <div>
              <Label htmlFor="evisa-pexp">Expiry Date *</Label>
              <Input
                id="evisa-pexp"
                type="date"
                value={passportExpiry}
                onChange={(e) => setPassportExpiry(e.target.value)}
                className="mt-1"
                data-ocid="evisa.passport.expiry.input"
              />
              <FieldError msg={errors.passportExpiry} />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Document Upload */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Document Upload
            </h2>
            <span className="text-sm text-gray-500">
              {mandatoryUploaded}/{mandatoryDocs.length} mandatory uploaded
            </span>
          </div>
          <Progress
            value={docProgress}
            className="h-2"
            data-ocid="evisa.docs.loading_state"
          />
          {errors.docs && (
            <p
              className="text-sm text-red-500"
              data-ocid="evisa.docs.error_state"
            >
              {errors.docs}
            </p>
          )}

          <div className="space-y-3">
            {[...mandatoryDocs, ...optionalDocs].map((item, i) => (
              <DocRow
                key={item.id}
                item={item}
                status={docStatus[item.id] ?? "idle"}
                onChange={(id, e) => handleDocUpload(id, e)}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Review & Submit
          </h2>

          <div className="bg-blue-50 rounded-xl p-4 space-y-2 text-sm">
            <h3 className="font-semibold text-gray-700 mb-3">Trip Details</h3>
            <Row
              label="Destination"
              value={`${country.flag} ${country.name}`}
            />
            <Row label="Travel Dates" value={`${fromDate} → ${toDate}`} />
            <Row label="Purpose" value={purpose} />
            <Row label="Travellers" value={travellers} />
            {flightPnr && <Row label="Flight PNR" value={flightPnr} />}
            {hotelRef && <Row label="Hotel Ref" value={hotelRef} />}
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <h3 className="font-semibold text-gray-700 mb-3">
              Passport Details
            </h3>
            <Row label="Name" value={`${firstName} ${lastName}`} />
            <Row label="DOB" value={dob} />
            <Row label="Gender" value={gender} />
            <Row label="Nationality" value={nationality} />
            <Row label="Passport No" value={passportNum} />
            <Row label="Expiry" value={passportExpiry} />
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 space-y-2 text-sm">
            <h3 className="font-semibold text-gray-700 mb-3">Fee Breakdown</h3>
            <Row label="Visa Fee" value={`$${visaFee} USD`} />
            <Row label="Service Charge" value={`$${serviceCharge} USD`} />
            <Row label="GST (18%)" value={`$${gst} USD`} />
            <hr className="border-emerald-200" />
            <Row
              label="Total (approx.)"
              value={`₹${totalInr.toLocaleString("en-IN")}`}
              bold
            />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="evisa-terms"
              checked={agreeTerms}
              onCheckedChange={(v) => setAgreeTerms(v === true)}
              data-ocid="evisa.review.terms.checkbox"
            />
            <Label
              htmlFor="evisa-terms"
              className="text-sm text-gray-600 leading-relaxed"
            >
              I confirm that all the information provided is accurate and I
              agree to the{" "}
              <span className="text-[#0B5ED7] underline cursor-pointer">
                Terms & Conditions
              </span>
              .
            </Label>
          </div>
          {errors.terms && (
            <p
              className="text-xs text-red-500"
              data-ocid="evisa.review.error_state"
            >
              {errors.terms}
            </p>
          )}
        </div>
      )}

      {/* Nav Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <Button
          variant="outline"
          onClick={handleBack}
          data-ocid="evisa.nav.back.button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {step === 0 ? "Back to Countries" : "Previous"}
        </Button>
        {step < 3 ? (
          <Button
            onClick={handleNext}
            className="bg-[#0B5ED7] hover:bg-blue-700 text-white"
            data-ocid="evisa.nav.next.button"
          >
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            data-ocid="evisa.review.submit_button"
          >
            Submit Application
          </Button>
        )}
      </div>

      {/* Passport Scan Modal */}
      <Dialog
        open={scanOpen}
        onOpenChange={(o) => {
          if (!scanning) setScanOpen(o);
        }}
      >
        <DialogContent
          className="max-w-sm"
          data-ocid="evisa.passport.scan.dialog"
        >
          <DialogHeader>
            <DialogTitle>Scan Passport</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-56 h-36 rounded-xl border-4 border-dashed border-[#0B5ED7] flex items-center justify-center bg-gray-50">
              {scanning ? (
                <Loader2 className="w-8 h-8 text-[#0B5ED7] animate-spin" />
              ) : (
                <Camera className="w-10 h-10 text-gray-300" />
              )}
            </div>
            <p className="text-sm text-gray-500 text-center">
              {scanning
                ? "Extracting passport data..."
                : "Position the passport in the frame and click Capture."}
            </p>
            <Button
              onClick={handleScanPassport}
              disabled={scanning}
              className="bg-[#0B5ED7] text-white w-full"
              data-ocid="evisa.passport.scan.confirm_button"
            >
              {scanning ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Camera className="w-4 h-4 mr-2" />
              )}
              {scanning ? "Processing..." : "Capture & Auto-Fill"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DocRow({
  item,
  status,
  onChange,
  index,
}: {
  item: ChecklistItem;
  status: DocStatus;
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  index: number;
}) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
        status === "done"
          ? "border-emerald-200 bg-emerald-50"
          : "border-gray-200 bg-white"
      }`}
      data-ocid={`evisa.docs.item.${index}`}
    >
      <div className="mt-0.5">
        {status === "done" ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : status === "uploading" ? (
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
        ) : status === "error" ? (
          <AlertTriangle className="w-5 h-5 text-red-500" />
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-800">
            {item.document}
          </span>
          <Badge
            variant="outline"
            className={
              item.mandatory
                ? "text-red-600 border-red-200 bg-red-50 text-xs"
                : "text-gray-500 border-gray-200 text-xs"
            }
          >
            {item.mandatory ? "Mandatory" : "Optional"}
          </Badge>
        </div>
        {item.notes && (
          <p className="text-xs text-gray-400 mt-0.5">{item.notes}</p>
        )}
      </div>
      <div>
        <label
          className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors ${status === "uploading" ? "opacity-50 pointer-events-none" : ""}`}
          data-ocid={`evisa.docs.upload_button.${index}`}
        >
          <input
            type="file"
            className="hidden"
            onChange={(e) => onChange(item.id, e)}
          />
          <Upload className="w-3 h-3" />
          {status === "done" ? "Replace" : "Upload"}
        </label>
      </div>
    </div>
  );
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
          bold ? "font-bold text-emerald-700" : "font-medium text-gray-800"
        }
      >
        {value}
      </span>
    </div>
  );
}
