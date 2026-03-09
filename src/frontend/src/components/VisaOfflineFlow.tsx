import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Download,
  FileText,
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

const STEPS = [
  "Embassy & Travel",
  "Applicant Form",
  "Document Checklist",
  "Appointment & Submit",
];
const PURPOSE_OPTIONS = [
  "Tourism",
  "Business",
  "Medical",
  "Education",
  "Transit",
  "Other",
];
const EMBASSY_OPTIONS: Record<string, string[]> = {
  default: [
    "New Delhi Embassy",
    "Mumbai Consulate",
    "Chennai Consulate",
    "Kolkata Consulate",
  ],
  US: [
    "New Delhi Embassy",
    "Mumbai Consulate",
    "Chennai Consulate",
    "Hyderabad Consulate",
  ],
  GB: [
    "New Delhi VFS Centre",
    "Mumbai VFS Centre",
    "Bangalore VFS Centre",
    "Kolkata VFS Centre",
  ],
  JP: ["New Delhi Consulate", "Kolkata Consulate", "Chennai Consulate"],
  FR: ["New Delhi VFS Centre", "Mumbai VFS Centre", "Hyderabad VFS Centre"],
  CA: ["New Delhi VAC", "Chandigarh VAC", "Mumbai VAC"],
  AU: ["New Delhi VFS Centre", "Mumbai VFS Centre", "Chennai VFS Centre"],
  DE: ["New Delhi VFS Centre", "Mumbai VFS Centre", "Kolkata VFS Centre"],
};
const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

type DocStatus = "idle" | "uploading" | "done" | "error";

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-8" data-ocid="offline.stepper.tab">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                i < current
                  ? "bg-blue-700 border-blue-700 text-white"
                  : i === current
                    ? "bg-[#1E293B] border-[#1E293B] text-white"
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
                i < current ? "bg-blue-700" : "bg-gray-200"
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
      data-ocid="offline.field.error_state"
    >
      {msg}
    </p>
  );
}

export default function VisaOfflineFlow({
  country,
  onBack,
  onComplete,
}: Props) {
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [appRef, setAppRef] = useState("");

  // Step 1 - Embassy & Travel
  const embassyList = EMBASSY_OPTIONS[country.code] ?? EMBASSY_OPTIONS.default;
  const [embassy, setEmbassy] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [courier, setCourier] = useState(false);
  const [courierAddress, setCourierAddress] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [purpose, setPurpose] = useState("");

  // Step 2 - Applicant Form
  const [givenName, setGivenName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNum, setPassportNum] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [occupation, setOccupation] = useState("");
  const [employer, setEmployer] = useState("");
  const [addrLine1, setAddrLine1] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [addrPin, setAddrPin] = useState("");
  const [addrCountry, setAddrCountry] = useState("India");
  const [ecName, setEcName] = useState("");
  const [ecPhone, setEcPhone] = useState("");

  // Step 3 - Documents
  const [docStatus, setDocStatus] = useState<Record<string, DocStatus>>({});
  const [docChecked, setDocChecked] = useState<Record<string, boolean>>({});

  // Step 4 - Appointment & Submit
  const [timeSlot, setTimeSlot] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const mandatoryDocs = country.offlineChecklist.filter((d) => d.mandatory);
  const optionalDocs = country.offlineChecklist.filter((d) => !d.mandatory);
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
      if (!embassy) e.embassy = "Select an embassy / consulate";
      if (!apptDate) e.apptDate = "Select appointment date";
      if (!fromDate) e.fromDate = "Required";
      if (!toDate) e.toDate = "Required";
      if (!purpose) e.purpose = "Select purpose";
      if (courier && !courierAddress.trim())
        e.courierAddress = "Enter courier return address";
    } else if (s === 1) {
      if (!givenName.trim()) e.givenName = "Required";
      if (!surname.trim()) e.surname = "Required";
      if (!dob) e.dob = "Required";
      if (!gender) e.gender = "Required";
      if (!nationality.trim()) e.nationality = "Required";
      if (!passportNum.trim()) e.passportNum = "Required";
      if (!passportExpiry) e.passportExpiry = "Required";
      if (!placeOfBirth.trim()) e.placeOfBirth = "Required";
      if (!addrLine1.trim()) e.addrLine1 = "Required";
      if (!addrCity.trim()) e.addrCity = "Required";
      if (!ecName.trim()) e.ecName = "Required";
      if (!ecPhone.trim()) e.ecPhone = "Required";
    } else if (s === 2) {
      if (mandatoryUploaded < mandatoryDocs.length)
        e.docs = `Upload all ${mandatoryDocs.length} mandatory documents`;
    } else if (s === 3) {
      if (!timeSlot) e.timeSlot = "Select a time slot";
      if (!agreeTerms) e.terms = "Accept terms to proceed";
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

  function handleDocUpload(id: string) {
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
    const ref = `FST-VISA-${dateStr}-${randNum}`;
    setAppRef(ref);
    setConfirmed(true);
    onComplete(ref);
  }

  if (confirmed) {
    return (
      <div
        className="max-w-xl mx-auto py-12 px-4 text-center"
        data-ocid="offline.success_state"
      >
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-blue-700" />
        </div>
        <div className="text-4xl mb-3">{country.flag}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Application Submitted!
        </h2>
        <p className="text-gray-500 mb-6">
          Your visa application for <strong>{country.name}</strong> has been
          submitted.
        </p>
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-200 rounded-2xl p-6 mb-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Reference Number</span>
            <span className="font-mono font-bold text-[#0B5ED7]">{appRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Appointment</span>
            <span className="font-medium">
              {apptDate} at {timeSlot}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Embassy</span>
            <span className="font-medium">{embassy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Processing Time</span>
            <span className="font-medium">{country.processing}</span>
          </div>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            variant="outline"
            onClick={() => toast.info("Appointment letter PDF downloaded")}
            data-ocid="offline.confirm.download.button"
          >
            <Download className="w-4 h-4 mr-2" /> Download Appointment Letter
          </Button>
          <Button
            variant="outline"
            onClick={onBack}
            data-ocid="offline.confirm.secondary_button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
          <Button
            className="bg-[#0B5ED7] hover:bg-blue-700 text-white"
            onClick={() => toast.info("Application tracking coming soon")}
            data-ocid="offline.confirm.primary_button"
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
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-700 to-blue-800 text-white flex items-center gap-4">
        <div className="text-4xl">{country.flag}</div>
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium opacity-90">
              Embassy / Sticker Visa
            </span>
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

      {/* Step 1: Embassy & Travel */}
      {step === 0 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Embassy & Travel Details
          </h2>
          <div>
            <Label>Embassy / Consulate *</Label>
            <Select value={embassy} onValueChange={setEmbassy}>
              <SelectTrigger
                className="mt-1"
                data-ocid="offline.embassy.select"
              >
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
            <FieldError msg={errors.embassy} />
          </div>
          <div>
            <Label htmlFor="offline-appt">Preferred Appointment Date *</Label>
            <Input
              id="offline-appt"
              type="date"
              value={apptDate}
              onChange={(e) => setApptDate(e.target.value)}
              className="mt-1"
              data-ocid="offline.embassy.appt_date.input"
            />
            <FieldError msg={errors.apptDate} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="offline-from">Travel From *</Label>
              <Input
                id="offline-from"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="mt-1"
                data-ocid="offline.embassy.from_date.input"
              />
              <FieldError msg={errors.fromDate} />
            </div>
            <div>
              <Label htmlFor="offline-to">Travel To *</Label>
              <Input
                id="offline-to"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="mt-1"
                data-ocid="offline.embassy.to_date.input"
              />
              <FieldError msg={errors.toDate} />
            </div>
          </div>
          <div>
            <Label>Purpose *</Label>
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger
                className="mt-1"
                data-ocid="offline.embassy.purpose.select"
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
          <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50">
            <div>
              <Label className="text-sm font-medium">
                Courier Return of Passport
              </Label>
              <p className="text-xs text-gray-400">
                We'll courier your passport back after stamping
              </p>
            </div>
            <Switch
              checked={courier}
              onCheckedChange={setCourier}
              data-ocid="offline.embassy.courier.switch"
            />
          </div>
          {courier && (
            <div>
              <Label htmlFor="offline-courier">Courier Return Address *</Label>
              <Textarea
                id="offline-courier"
                placeholder="Full address for passport return delivery"
                value={courierAddress}
                onChange={(e) => setCourierAddress(e.target.value)}
                className="mt-1"
                rows={3}
                data-ocid="offline.embassy.courier_address.textarea"
              />
              <FieldError msg={errors.courierAddress} />
            </div>
          )}
        </div>
      )}

      {/* Step 2: Applicant Form */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Applicant Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="off-gn">Given Name *</Label>
              <Input
                id="off-gn"
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
                className="mt-1"
                data-ocid="offline.applicant.givenname.input"
              />
              <FieldError msg={errors.givenName} />
            </div>
            <div>
              <Label htmlFor="off-sn">Surname *</Label>
              <Input
                id="off-sn"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="mt-1"
                data-ocid="offline.applicant.surname.input"
              />
              <FieldError msg={errors.surname} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="off-dob">Date of Birth *</Label>
              <Input
                id="off-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1"
                data-ocid="offline.applicant.dob.input"
              />
              <FieldError msg={errors.dob} />
            </div>
            <div>
              <Label>Gender *</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger
                  className="mt-1"
                  data-ocid="offline.applicant.gender.select"
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="off-nat">Nationality *</Label>
              <Input
                id="off-nat"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="mt-1"
                data-ocid="offline.applicant.nationality.input"
              />
              <FieldError msg={errors.nationality} />
            </div>
            <div>
              <Label htmlFor="off-pob">Place of Birth *</Label>
              <Input
                id="off-pob"
                value={placeOfBirth}
                onChange={(e) => setPlaceOfBirth(e.target.value)}
                className="mt-1"
                data-ocid="offline.applicant.pob.input"
              />
              <FieldError msg={errors.placeOfBirth} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="off-pnum">Passport Number *</Label>
              <Input
                id="off-pnum"
                value={passportNum}
                onChange={(e) => setPassportNum(e.target.value)}
                className="mt-1"
                data-ocid="offline.applicant.passport_num.input"
              />
              <FieldError msg={errors.passportNum} />
            </div>
            <div>
              <Label htmlFor="off-pexp">Passport Expiry *</Label>
              <Input
                id="off-pexp"
                type="date"
                value={passportExpiry}
                onChange={(e) => setPassportExpiry(e.target.value)}
                className="mt-1"
                data-ocid="offline.applicant.passport_expiry.input"
              />
              <FieldError msg={errors.passportExpiry} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="off-occ">Occupation</Label>
              <Input
                id="off-occ"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="mt-1"
                data-ocid="offline.applicant.occupation.input"
              />
            </div>
            <div>
              <Label htmlFor="off-emp">Employer / School</Label>
              <Input
                id="off-emp"
                value={employer}
                onChange={(e) => setEmployer(e.target.value)}
                className="mt-1"
                data-ocid="offline.applicant.employer.input"
              />
            </div>
          </div>
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Home Address
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="off-addr1">Address Line 1 *</Label>
                <Input
                  id="off-addr1"
                  value={addrLine1}
                  onChange={(e) => setAddrLine1(e.target.value)}
                  className="mt-1"
                  data-ocid="offline.applicant.addr_line1.input"
                />
                <FieldError msg={errors.addrLine1} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="off-city">City *</Label>
                  <Input
                    id="off-city"
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    className="mt-1"
                    data-ocid="offline.applicant.city.input"
                  />
                  <FieldError msg={errors.addrCity} />
                </div>
                <div>
                  <Label htmlFor="off-state">State</Label>
                  <Input
                    id="off-state"
                    value={addrState}
                    onChange={(e) => setAddrState(e.target.value)}
                    className="mt-1"
                    data-ocid="offline.applicant.state.input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="off-pin">PIN Code</Label>
                  <Input
                    id="off-pin"
                    value={addrPin}
                    onChange={(e) => setAddrPin(e.target.value)}
                    className="mt-1"
                    data-ocid="offline.applicant.pin.input"
                  />
                </div>
                <div>
                  <Label htmlFor="off-country">Country</Label>
                  <Input
                    id="off-country"
                    value={addrCountry}
                    onChange={(e) => setAddrCountry(e.target.value)}
                    className="mt-1"
                    data-ocid="offline.applicant.country.input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Emergency Contact
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="off-ecn">Contact Name *</Label>
                <Input
                  id="off-ecn"
                  value={ecName}
                  onChange={(e) => setEcName(e.target.value)}
                  className="mt-1"
                  data-ocid="offline.applicant.ec_name.input"
                />
                <FieldError msg={errors.ecName} />
              </div>
              <div>
                <Label htmlFor="off-ecp">Phone *</Label>
                <Input
                  id="off-ecp"
                  value={ecPhone}
                  onChange={(e) => setEcPhone(e.target.value)}
                  className="mt-1"
                  data-ocid="offline.applicant.ec_phone.input"
                />
                <FieldError msg={errors.ecPhone} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Document Checklist */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Document Checklist
              </h2>
              <p className="text-sm text-gray-500">
                {mandatoryUploaded}/{mandatoryDocs.length} mandatory docs
                uploaded
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("Checklist PDF downloaded")}
              data-ocid="offline.docs.download.button"
            >
              <Download className="w-4 h-4 mr-2" /> Download Checklist PDF
            </Button>
          </div>
          <Progress
            value={docProgress}
            className="h-2"
            data-ocid="offline.docs.loading_state"
          />
          {errors.docs && (
            <p
              className="text-sm text-red-500"
              data-ocid="offline.docs.error_state"
            >
              {errors.docs}
            </p>
          )}

          <div className="space-y-3">
            {[...mandatoryDocs, ...optionalDocs].map((item, i) => (
              <OfflineDocRow
                key={item.id}
                item={item}
                status={docStatus[item.id] ?? "idle"}
                checked={docChecked[item.id] ?? false}
                onCheck={(v) => setDocChecked((p) => ({ ...p, [item.id]: v }))}
                onUpload={() => handleDocUpload(item.id)}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Appointment & Submit */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Confirm Appointment & Submit
          </h2>

          <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
            <h3 className="font-semibold text-gray-700 mb-2">
              Appointment Summary
            </h3>
            <Row label="Embassy" value={embassy} />
            <Row label="Date" value={apptDate} />
            <Row label="Applicant" value={`${givenName} ${surname}`} />
          </div>

          <div>
            <Label className="block mb-2">Select Time Slot *</Label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    timeSlot === slot
                      ? "bg-[#0B5ED7] border-[#0B5ED7] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#0B5ED7]"
                  }`}
                  data-ocid="offline.appt.slot.button"
                >
                  {slot}
                </button>
              ))}
            </div>
            <FieldError msg={errors.timeSlot} />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">
              Payment Information
            </h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>
                • Visa fee: <strong>${country.fee} USD</strong> (pay at embassy)
              </li>
              <li>
                • Service charge:{" "}
                <strong>
                  ₹
                  {Math.round(country.fee * 83.5 * 0.1).toLocaleString("en-IN")}
                </strong>{" "}
                (pay online)
              </li>
              <li>
                • DD/Cheque payable to:{" "}
                <strong>Embassy of {country.name}</strong>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">
              Important Notes
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Arrive 15 minutes before appointment time</li>
              <li>• Carry original passport + all uploaded documents</li>
              <li>• Dress formally for embassy visit</li>
              <li>• Processing time: {country.processing}</li>
            </ul>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="offline-terms"
              checked={agreeTerms}
              onCheckedChange={(v) => setAgreeTerms(v === true)}
              data-ocid="offline.appt.terms.checkbox"
            />
            <Label
              htmlFor="offline-terms"
              className="text-sm text-gray-600 leading-relaxed"
            >
              I confirm all information is accurate and I agree to the{" "}
              <span className="text-[#0B5ED7] underline cursor-pointer">
                Terms & Conditions
              </span>
              .
            </Label>
          </div>
          {errors.terms && (
            <p
              className="text-xs text-red-500"
              data-ocid="offline.appt.error_state"
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
          data-ocid="offline.nav.back.button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {step === 0 ? "Back to Countries" : "Previous"}
        </Button>
        {step < 3 ? (
          <Button
            onClick={handleNext}
            className="bg-[#1E293B] hover:bg-slate-800 text-white"
            data-ocid="offline.nav.next.button"
          >
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-[#0B5ED7] hover:bg-blue-700 text-white"
            data-ocid="offline.appt.submit_button"
          >
            Submit Application
          </Button>
        )}
      </div>
    </div>
  );
}

function OfflineDocRow({
  item,
  status,
  checked,
  onCheck,
  onUpload,
  index,
}: {
  item: ChecklistItem;
  status: DocStatus;
  checked: boolean;
  onCheck: (v: boolean) => void;
  onUpload: () => void;
  index: number;
}) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
        status === "done"
          ? "border-blue-200 bg-blue-50"
          : checked
            ? "border-slate-300 bg-slate-50"
            : "border-gray-200 bg-white"
      }`}
      data-ocid={`offline.docs.item.${index}`}
    >
      <Checkbox
        id={`doc-check-${item.id}`}
        checked={checked}
        onCheckedChange={(v) => onCheck(v === true)}
        className="mt-0.5"
        data-ocid={`offline.docs.checkbox.${index}`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <label
            htmlFor={`doc-check-${item.id}`}
            className="text-sm font-medium text-gray-800 cursor-pointer"
          >
            {item.document}
          </label>
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
        <p className="text-xs text-gray-400 mt-0.5 capitalize">
          {item.category}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {status === "uploading" && (
          <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
        )}
        {status === "done" && (
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
        )}
        {status === "error" && (
          <AlertTriangle className="w-4 h-4 text-red-500" />
        )}
        <Button
          size="sm"
          variant="outline"
          disabled={status === "uploading"}
          onClick={onUpload}
          data-ocid={`offline.docs.upload_button.${index}`}
        >
          <Upload className="w-3 h-3 mr-1" />
          {status === "done" ? "Replace" : "Upload"}
        </Button>
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
          bold ? "font-bold text-[#0B5ED7]" : "font-medium text-gray-800"
        }
      >
        {value}
      </span>
    </div>
  );
}
