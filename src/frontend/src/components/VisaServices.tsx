import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  Globe,
  Info,
  List,
  Search,
  Shield,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type VisaTab = "evisa" | "offline" | "status";

interface VisaCountry {
  name: string;
  flag: string;
  type: "e-Visa" | "Sticker Visa" | "Visa on Arrival" | "Visa Free";
  fee: number;
  processing: string;
  validity: string;
  requirements: string[];
  offlineChecklist: ChecklistItem[];
}

interface ChecklistItem {
  id: string;
  category: string;
  document: string;
  mandatory: boolean;
  note?: string;
}

interface UploadedDoc {
  name: string;
  size: string;
  status: "uploading" | "done" | "error";
  type: string;
}

interface VisaApplication {
  id: string;
  country: string;
  type: string;
  applicant: string;
  submittedOn: string;
  status: "Submitted" | "Under Review" | "Approved" | "Rejected" | "Ready";
  passportNo: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────────
const VISA_COUNTRIES: VisaCountry[] = [
  {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    type: "e-Visa",
    fee: 4500,
    processing: "3-5 working days",
    validity: "30 days / Single Entry",
    requirements: [
      "Passport (6 months valid)",
      "Passport photo",
      "Bank statement (3 months)",
      "Confirmed hotel booking",
      "Return flight ticket",
    ],
    offlineChecklist: [
      {
        id: "uae-1",
        category: "Identity",
        document: "Original passport (min. 6 months validity)",
        mandatory: true,
      },
      {
        id: "uae-2",
        category: "Identity",
        document: "2 passport-size photographs (white background)",
        mandatory: true,
      },
      {
        id: "uae-3",
        category: "Financial",
        document: "Bank statement (last 3 months)",
        mandatory: true,
        note: "Min. balance ₹1,00,000",
      },
      {
        id: "uae-4",
        category: "Travel",
        document: "Confirmed return air ticket",
        mandatory: true,
      },
      {
        id: "uae-5",
        category: "Accommodation",
        document: "Hotel booking confirmation",
        mandatory: true,
      },
      {
        id: "uae-6",
        category: "Employment",
        document: "Leave letter from employer / Business registration",
        mandatory: true,
      },
      {
        id: "uae-7",
        category: "Financial",
        document: "ITR / Salary slip (last 3 months)",
        mandatory: false,
      },
    ],
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    type: "Visa on Arrival",
    fee: 2000,
    processing: "Immediate on arrival",
    validity: "15 days / Single Entry",
    requirements: [
      "Passport (6 months valid)",
      "Passport photo",
      "Return ticket",
      "THB 10,000 per person",
    ],
    offlineChecklist: [
      {
        id: "th-1",
        category: "Identity",
        document: "Original passport (min. 6 months validity)",
        mandatory: true,
      },
      {
        id: "th-2",
        category: "Identity",
        document: "1 passport-size photograph",
        mandatory: true,
      },
      {
        id: "th-3",
        category: "Financial",
        document: "Cash THB 10,000 per person",
        mandatory: true,
      },
      {
        id: "th-4",
        category: "Travel",
        document: "Confirmed return air ticket",
        mandatory: true,
      },
      {
        id: "th-5",
        category: "Accommodation",
        document: "Hotel booking confirmation",
        mandatory: false,
      },
    ],
  },
  {
    name: "Schengen (Europe)",
    flag: "🇪🇺",
    type: "Sticker Visa",
    fee: 8000,
    processing: "10-15 working days",
    validity: "90 days / Multiple Entry",
    requirements: [
      "Passport (3 months beyond stay)",
      "2 passport photos",
      "Travel insurance (€30,000 cover)",
      "Bank statement",
      "Flight itinerary",
      "Hotel bookings",
      "ITR (last 2 years)",
      "NOC from employer",
    ],
    offlineChecklist: [
      {
        id: "sch-1",
        category: "Identity",
        document: "Original passport + all old passports",
        mandatory: true,
      },
      {
        id: "sch-2",
        category: "Identity",
        document: "2 passport-size photographs (35x45mm, white background)",
        mandatory: true,
      },
      {
        id: "sch-3",
        category: "Insurance",
        document: "Travel insurance (min. €30,000 medical cover)",
        mandatory: true,
      },
      {
        id: "sch-4",
        category: "Financial",
        document: "Bank statement (last 6 months)",
        mandatory: true,
        note: "Min. balance ₹2,00,000",
      },
      {
        id: "sch-5",
        category: "Financial",
        document: "ITR (last 2 years) / Form 16",
        mandatory: true,
      },
      {
        id: "sch-6",
        category: "Travel",
        document: "Round-trip flight itinerary",
        mandatory: true,
      },
      {
        id: "sch-7",
        category: "Accommodation",
        document: "Complete hotel booking for entire stay",
        mandatory: true,
      },
      {
        id: "sch-8",
        category: "Employment",
        document: "NOC / Leave letter from employer",
        mandatory: true,
      },
      {
        id: "sch-9",
        category: "Employment",
        document: "Last 3 months salary slips",
        mandatory: true,
      },
      {
        id: "sch-10",
        category: "Business",
        document: "Business registration / Trade license (if self-employed)",
        mandatory: false,
      },
      {
        id: "sch-11",
        category: "Other",
        document: "Cover letter",
        mandatory: false,
        note: "Recommended for better approval",
      },
    ],
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    type: "Sticker Visa",
    fee: 12000,
    processing: "15-20 working days",
    validity: "6 months / Multiple Entry",
    requirements: [
      "Passport (6 months valid)",
      "Biometric enrollment",
      "Bank statement",
      "Sponsor letter",
      "Flight + hotel bookings",
    ],
    offlineChecklist: [
      {
        id: "uk-1",
        category: "Identity",
        document: "Original passport + all old passports",
        mandatory: true,
      },
      {
        id: "uk-2",
        category: "Identity",
        document: "Biometric appointment confirmation",
        mandatory: true,
      },
      {
        id: "uk-3",
        category: "Financial",
        document: "Bank statement (last 6 months)",
        mandatory: true,
      },
      {
        id: "uk-4",
        category: "Financial",
        document: "ITR / CA certificate",
        mandatory: true,
      },
      {
        id: "uk-5",
        category: "Travel",
        document: "Flight booking confirmation",
        mandatory: true,
      },
      {
        id: "uk-6",
        category: "Accommodation",
        document: "Hotel booking / Sponsor letter",
        mandatory: true,
      },
      {
        id: "uk-7",
        category: "Employment",
        document: "Employment letter / Business proof",
        mandatory: true,
      },
    ],
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    type: "e-Visa",
    fee: 3500,
    processing: "3-5 working days",
    validity: "30 days / Single Entry",
    requirements: [
      "Passport (6 months valid)",
      "Passport photo",
      "Bank statement",
      "Hotel booking",
      "Return ticket",
    ],
    offlineChecklist: [
      {
        id: "sg-1",
        category: "Identity",
        document: "Original passport (min. 6 months validity)",
        mandatory: true,
      },
      {
        id: "sg-2",
        category: "Identity",
        document: "1 passport-size photograph",
        mandatory: true,
      },
      {
        id: "sg-3",
        category: "Financial",
        document: "Bank statement (last 3 months)",
        mandatory: true,
      },
      {
        id: "sg-4",
        category: "Travel",
        document: "Return flight ticket",
        mandatory: true,
      },
      {
        id: "sg-5",
        category: "Accommodation",
        document: "Hotel booking confirmation",
        mandatory: true,
      },
    ],
  },
  {
    name: "Malaysia",
    flag: "🇲🇾",
    type: "Visa Free",
    fee: 0,
    processing: "No visa required",
    validity: "30 days",
    requirements: [
      "Passport (6 months valid)",
      "Return ticket",
      "Proof of funds",
    ],
    offlineChecklist: [
      {
        id: "my-1",
        category: "Identity",
        document: "Valid passport (min. 6 months)",
        mandatory: true,
      },
      {
        id: "my-2",
        category: "Travel",
        document: "Return flight ticket",
        mandatory: true,
      },
      {
        id: "my-3",
        category: "Financial",
        document: "Proof of sufficient funds",
        mandatory: true,
      },
    ],
  },
];

const MOCK_APPLICATIONS: VisaApplication[] = [
  {
    id: "VISA2026001",
    country: "🇦🇪 United Arab Emirates",
    type: "e-Visa 30 Days",
    applicant: "Rahul Sharma",
    submittedOn: "05 Mar 2026",
    status: "Approved",
    passportNo: "P1234567",
  },
  {
    id: "VISA2026002",
    country: "🇸🇬 Singapore",
    type: "e-Visa 30 Days",
    applicant: "Priya Verma",
    submittedOn: "06 Mar 2026",
    status: "Under Review",
    passportNo: "P9876543",
  },
  {
    id: "VISA2026003",
    country: "🇪🇺 Schengen",
    type: "Tourist Visa 90 Days",
    applicant: "Amit Patel",
    submittedOn: "01 Mar 2026",
    status: "Submitted",
    passportNo: "P5555555",
  },
];

const DOCUMENT_TYPES = [
  "Passport (Front + Back)",
  "Passport Photo",
  "Bank Statement",
  "ITR / Form 16",
  "Salary Slips",
  "Hotel Booking",
  "Flight Ticket",
  "Travel Insurance",
  "NOC / Leave Letter",
  "Business Registration",
  "Cover Letter",
];

// ── Status Badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: VisaApplication["status"] }) {
  const cfg: Record<
    VisaApplication["status"],
    { cls: string; icon: React.ReactNode }
  > = {
    Approved: {
      cls: "bg-green-100 text-green-700",
      icon: <CheckCircle className="w-3 h-3" />,
    },
    "Under Review": {
      cls: "bg-yellow-100 text-yellow-700",
      icon: <Clock className="w-3 h-3" />,
    },
    Submitted: {
      cls: "bg-blue-100 text-blue-700",
      icon: <FileText className="w-3 h-3" />,
    },
    Rejected: {
      cls: "bg-red-100 text-red-700",
      icon: <X className="w-3 h-3" />,
    },
    Ready: {
      cls: "bg-purple-100 text-purple-700",
      icon: <Shield className="w-3 h-3" />,
    },
  };
  const c = cfg[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.cls}`}
    >
      {c.icon} {status}
    </span>
  );
}

// ── Visa Type Badge ────────────────────────────────────────────────────────────
function VisaTypeBadge({ type }: { type: VisaCountry["type"] }) {
  const cfg: Record<VisaCountry["type"], string> = {
    "e-Visa": "bg-blue-100 text-blue-700",
    "Sticker Visa": "bg-orange-100 text-orange-700",
    "Visa on Arrival": "bg-green-100 text-green-700",
    "Visa Free": "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cfg[type]}`}
    >
      {type}
    </span>
  );
}

// ── Offline Checklist Modal ────────────────────────────────────────────────────
function OfflineChecklistModal({
  country,
  onClose,
}: {
  country: VisaCountry;
  onClose: () => void;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const categories = Array.from(
    new Set(country.offlineChecklist.map((i) => i.category)),
  );
  const toggle = (id: string) => setChecked((p) => ({ ...p, [id]: !p[id] }));
  const totalMandatory = country.offlineChecklist.filter(
    (i) => i.mandatory,
  ).length;
  const checkedMandatory = country.offlineChecklist.filter(
    (i) => i.mandatory && checked[i.id],
  ).length;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      data-ocid="visa.checklist.modal"
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {country.flag} {country.name} — Document Checklist
            </h2>
            <p className="text-sm text-gray-500">
              {country.type} · {checkedMandatory}/{totalMandatory} mandatory
              docs collected
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            data-ocid="visa.checklist.close_button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{
                width: totalMandatory
                  ? `${(checkedMandatory / totalMandatory) * 100}%`
                  : "0%",
              }}
            />
          </div>
        </div>

        {/* Checklist by category */}
        <div className="px-6 py-4 space-y-5">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {cat}
              </h3>
              <div className="space-y-2">
                {country.offlineChecklist
                  .filter((i) => i.category === cat)
                  .map((item) => (
                    <label
                      key={item.id}
                      htmlFor={`check-${item.id}`}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        checked[item.id]
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200 hover:border-blue-200"
                      }`}
                    >
                      <input
                        id={`check-${item.id}`}
                        type="checkbox"
                        checked={!!checked[item.id]}
                        onChange={() => toggle(item.id)}
                        className="mt-0.5 w-4 h-4 text-blue-600 rounded"
                        data-ocid="visa.checklist.checkbox"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-gray-800">
                            {item.document}
                          </span>
                          {item.mandatory && (
                            <span className="text-xs text-red-500 font-medium">
                              Required
                            </span>
                          )}
                        </div>
                        {item.note && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.note}
                          </p>
                        )}
                      </div>
                      {checked[item.id] && (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      )}
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3 rounded-b-2xl">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
            data-ocid="visa.checklist.download_button"
          >
            <Download className="w-4 h-4" /> Download Checklist PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
            data-ocid="visa.checklist.close_button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── E-Visa Application Form ────────────────────────────────────────────────────
function EVisaForm({
  country,
  onBack,
  onSubmit,
}: {
  country: VisaCountry;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [step, setStep] = useState(1);
  const [docs, setDocs] = useState<UploadedDoc[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "Male",
    passportNo: "",
    passportExpiry: "",
    nationality: "Indian",
    email: "",
    phone: "",
    travelDate: "",
    returnDate: "",
    accommodation: "",
    purpose: "Tourism",
  });

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    for (const f of files) {
      const doc: UploadedDoc = {
        name: f.name,
        size: `${(f.size / 1024).toFixed(1)} KB`,
        status: "uploading",
        type: f.type,
      };
      setDocs((p) => [...p, doc]);
      setTimeout(() => {
        setDocs((p) =>
          p.map((d) => (d.name === doc.name ? { ...d, status: "done" } : d)),
        );
      }, 1200);
    }
    e.target.value = "";
  }

  function removeDoc(name: string) {
    setDocs((p) => p.filter((d) => d.name !== name));
  }

  return (
    <div className="space-y-6">
      {/* Steps */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > s ? <CheckCircle className="w-4 h-4" /> : s}
            </div>
            <span
              className={`text-sm font-medium hidden sm:block ${
                step >= s ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {["Personal Info", "Travel Details", "Documents"][i]}
            </span>
            {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300" />}
          </div>
        ))}
      </div>

      {/* Country Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{country.flag}</span>
          <div>
            <p className="font-semibold text-gray-900">{country.name}</p>
            <p className="text-sm text-gray-500">
              {country.type} · {country.validity}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-blue-700">
            ₹{country.fee.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">{country.processing}</p>
        </div>
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="visa-firstname"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                First Name *
              </label>
              <input
                id="visa-firstname"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter first name"
                data-ocid="visa.form.firstname_input"
              />
            </div>
            <div>
              <label
                htmlFor="visa-lastname"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Last Name *
              </label>
              <input
                id="visa-lastname"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter last name"
                data-ocid="visa.form.lastname_input"
              />
            </div>
            <div>
              <label
                htmlFor="visa-dob"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Date of Birth *
              </label>
              <input
                id="visa-dob"
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                data-ocid="visa.form.dob_input"
              />
            </div>
            <div>
              <label
                htmlFor="visa-gender"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Gender *
              </label>
              <select
                id="visa-gender"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                data-ocid="visa.form.gender_select"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="visa-passport"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Passport Number *
              </label>
              <input
                id="visa-passport"
                value={form.passportNo}
                onChange={(e) =>
                  setForm({ ...form, passportNo: e.target.value.toUpperCase() })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder="e.g. P1234567"
                data-ocid="visa.form.passport_input"
              />
            </div>
            <div>
              <label
                htmlFor="visa-expiry"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Passport Expiry *
              </label>
              <input
                id="visa-expiry"
                type="date"
                value={form.passportExpiry}
                onChange={(e) =>
                  setForm({ ...form, passportExpiry: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                data-ocid="visa.form.passport_expiry_input"
              />
            </div>
            <div>
              <label
                htmlFor="visa-email"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Email Address *
              </label>
              <input
                id="visa-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="agent@example.com"
                data-ocid="visa.form.email_input"
              />
            </div>
            <div>
              <label
                htmlFor="visa-phone"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Mobile Number *
              </label>
              <input
                id="visa-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91 98765 43210"
                data-ocid="visa.form.phone_input"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              data-ocid="visa.form.back_button"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
              data-ocid="visa.form.next_button"
            >
              Next: Travel Details
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Travel Details */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Travel Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="visa-travel-date"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Travel Date *
              </label>
              <input
                id="visa-travel-date"
                type="date"
                value={form.travelDate}
                onChange={(e) =>
                  setForm({ ...form, travelDate: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                data-ocid="visa.form.travel_date_input"
              />
            </div>
            <div>
              <label
                htmlFor="visa-return-date"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Return Date *
              </label>
              <input
                id="visa-return-date"
                type="date"
                value={form.returnDate}
                onChange={(e) =>
                  setForm({ ...form, returnDate: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                data-ocid="visa.form.return_date_input"
              />
            </div>
            <div>
              <label
                htmlFor="visa-purpose"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Purpose of Visit *
              </label>
              <select
                id="visa-purpose"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                data-ocid="visa.form.purpose_select"
              >
                <option>Tourism</option>
                <option>Business</option>
                <option>Medical</option>
                <option>Education</option>
                <option>Transit</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="visa-accommodation"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Accommodation Name *
              </label>
              <input
                id="visa-accommodation"
                value={form.accommodation}
                onChange={(e) =>
                  setForm({ ...form, accommodation: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Hotel / Host name"
                data-ocid="visa.form.accommodation_input"
              />
            </div>
          </div>
          {/* Requirements reminder */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">
                  Required Documents for {country.name}
                </p>
                <ul className="text-xs text-amber-700 space-y-0.5">
                  {country.requirements.map((r) => (
                    <li key={r} className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              data-ocid="visa.form.prev_button"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
              data-ocid="visa.form.next2_button"
            >
              Next: Upload Documents
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Document Upload */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Upload Documents</h3>
          <p className="text-sm text-gray-500">
            Upload clear scanned copies (PDF, JPG, PNG). Max 5MB per file.
          </p>

          {/* Upload area */}
          <label
            htmlFor="visa-file-upload"
            className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 transition-all block"
            data-ocid="visa.form.dropzone"
          >
            <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-700">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, JPG, PNG up to 5MB
            </p>
            <input
              id="visa-file-upload"
              ref={fileRef}
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              data-ocid="visa.form.upload_button"
            />
          </label>

          {/* Document type selector */}
          <div>
            <p className="block text-xs font-medium text-gray-600 mb-2">
              Quick Select Document Type
            </p>
            <div className="flex flex-wrap gap-2">
              {DOCUMENT_TYPES.map((dt) => (
                <button
                  type="button"
                  key={dt}
                  className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full hover:border-blue-400 hover:text-blue-700 transition-colors"
                  data-ocid="visa.form.doc_type_button"
                >
                  {dt}
                </button>
              ))}
            </div>
          </div>

          {/* Uploaded files */}
          {docs.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Uploaded Files
              </p>
              {docs.map((d, i) => (
                <div
                  key={`${d.name}-${i}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border"
                >
                  <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {d.name}
                    </p>
                    <p className="text-xs text-gray-500">{d.size}</p>
                  </div>
                  {d.status === "uploading" && (
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  )}
                  {d.status === "done" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {d.status === "error" && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeDoc(d.name)}
                    className="text-gray-400 hover:text-red-500"
                    data-ocid="visa.form.remove_doc_button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              data-ocid="visa.form.back2_button"
            >
              Back
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 flex items-center gap-2"
              data-ocid="visa.form.submit_button"
            >
              <CheckCircle className="w-4 h-4" /> Submit Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Visa Services Component ───────────────────────────────────────────────
export function VisaServices() {
  const [tab, setTab] = useState<VisaTab>("evisa");
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<VisaCountry | null>(
    null,
  );
  const [checklistCountry, setChecklistCountry] = useState<VisaCountry | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const filtered = VISA_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase()),
  );

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setSelectedCountry(null);
      setTab("status");
    }, 2500);
  }

  if (showForm && selectedCountry) {
    return (
      <div className="space-y-4">
        {!submitted ? (
          <EVisaForm
            country={selectedCountry}
            onBack={() => {
              setShowForm(false);
              setSelectedCountry(null);
            }}
            onSubmit={handleSubmit}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="visa.submit.success_state"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-500 mb-1">
              Your visa application has been received.
            </p>
            <p className="text-sm text-blue-600 font-medium">
              Redirecting to status tracker...
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="visa.page">
      {/* Checklist modal */}
      {checklistCountry && (
        <OfflineChecklistModal
          country={checklistCountry}
          onClose={() => setChecklistCountry(null)}
        />
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-7 h-7" />
          <h1 className="text-2xl font-bold">Visa Services</h1>
        </div>
        <p className="text-blue-200 text-sm">
          Apply for e-Visa online or get the official document checklist for any
          country.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { label: "Countries Covered", value: "100+" },
            { label: "e-Visa Available", value: "45+" },
            { label: "Avg Processing", value: "3-5 Days" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/10 rounded-xl p-3 text-center"
            >
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-xs text-blue-200">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit"
        data-ocid="visa.tabs"
      >
        {(
          [
            { id: "evisa", label: "e-Visa / Apply Online", icon: Globe },
            { id: "offline", label: "Offline Checklist", icon: List },
            { id: "status", label: "Track Status", icon: Clock },
          ] as { id: VisaTab; label: string; icon: React.ElementType }[]
        ).map(({ id, label, icon: Icon }) => (
          <button
            type="button"
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === id
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            data-ocid={`visa.${id}.tab`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      {(tab === "evisa" || tab === "offline") && (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search destination country..."
            data-ocid="visa.search_input"
          />
        </div>
      )}

      {/* E-Visa Tab */}
      {tab === "evisa" && (
        <div className="space-y-3">
          {filtered.map((country) => (
            <div
              key={country.name}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                onClick={() =>
                  setExpandedCountry(
                    expandedCountry === country.name ? null : country.name,
                  )
                }
                data-ocid="visa.country.row"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">
                        {country.name}
                      </h3>
                      <VisaTypeBadge type={country.type} />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {country.validity} · Processing: {country.processing}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-blue-700">
                      {country.fee === 0
                        ? "Free"
                        : `₹${country.fee.toLocaleString()}`}
                    </p>
                    <p className="text-xs text-gray-400">Visa fee</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedCountry === country.name ? "rotate-180" : ""}`}
                  />
                </div>
              </button>
              {expandedCountry === country.name && (
                <div className="border-t px-4 py-4 bg-gray-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Required Documents
                      </p>
                      <ul className="space-y-1">
                        {country.requirements.map((r) => (
                          <li
                            key={r}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-xl p-3 border">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Visa Type</span>
                          <span className="font-medium">{country.type}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-500">Validity</span>
                          <span className="font-medium">
                            {country.validity}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-500">Processing Time</span>
                          <span className="font-medium">
                            {country.processing}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-500">Fee</span>
                          <span className="font-bold text-blue-700">
                            {country.fee === 0
                              ? "Free"
                              : `₹${country.fee.toLocaleString()}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {country.type !== "Visa Free" && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowForm(true);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
                        data-ocid="visa.country.apply_button"
                      >
                        <FileText className="w-4 h-4" /> Apply Now
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setChecklistCountry(country)}
                      className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
                      data-ocid="visa.country.checklist_button"
                    >
                      <List className="w-4 h-4" /> Document Checklist
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div
              className="text-center py-12 text-gray-400"
              data-ocid="visa.evisa.empty_state"
            >
              <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No countries found for "{search}"</p>
            </div>
          )}
        </div>
      )}

      {/* Offline Checklist Tab */}
      {tab === "offline" && (
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Offline / Sticker Visa Checklist
              </p>
              <p className="text-sm text-amber-700 mt-1">
                These countries require embassy appointments or courier
                submissions. Use the checklist to prepare documents before
                applying.
              </p>
            </div>
          </div>
          {filtered.map((country) => (
            <button
              type="button"
              key={country.name}
              className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-all text-left"
              onClick={() => setChecklistCountry(country)}
              data-ocid="visa.offline.country_row"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {country.name}
                    </h3>
                    <VisaTypeBadge type={country.type} />
                  </div>
                  <p className="text-xs text-gray-500">
                    {country.offlineChecklist.filter((i) => i.mandatory).length}{" "}
                    required documents
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium">
                  <Eye className="w-4 h-4" /> View Checklist
                </span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div
              className="text-center py-12 text-gray-400"
              data-ocid="visa.offline.empty_state"
            >
              <List className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No countries found for "{search}"</p>
            </div>
          )}
        </div>
      )}

      {/* Status Tracker Tab */}
      {tab === "status" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b">
              <h3 className="font-semibold text-gray-900">
                Your Visa Applications
              </h3>
              <p className="text-sm text-gray-500">
                Track real-time status of submitted applications
              </p>
            </div>
            {MOCK_APPLICATIONS.length === 0 ? (
              <div
                className="py-12 text-center text-gray-400"
                data-ocid="visa.status.empty_state"
              >
                <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No applications yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {MOCK_APPLICATIONS.map((app, i) => (
                  <div
                    key={app.id}
                    className="px-5 py-4 hover:bg-gray-50 transition-colors"
                    data-ocid={`visa.status.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">
                            {app.country}
                          </span>
                          <StatusBadge status={app.status} />
                        </div>
                        <div className="flex items-center gap-4 mt-1 flex-wrap">
                          <span className="text-xs text-gray-500">
                            Ref:{" "}
                            <span className="font-mono font-medium text-gray-700">
                              {app.id}
                            </span>
                          </span>
                          <span className="text-xs text-gray-500">
                            Passport:{" "}
                            <span className="font-mono font-medium text-gray-700">
                              {app.passportNo}
                            </span>
                          </span>
                          <span className="text-xs text-gray-500">
                            Applicant: {app.applicant}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {app.type} · Submitted {app.submittedOn}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                          data-ocid="visa.status.view_button"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                        {app.status === "Approved" && (
                          <button
                            type="button"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700"
                            data-ocid="visa.status.download_button"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </button>
                        )}
                      </div>
                    </div>
                    {/* Status timeline */}
                    <div className="mt-3 flex items-center gap-1 overflow-x-auto">
                      {(["Submitted", "Under Review", "Approved"] as const).map(
                        (s, idx) => {
                          const order = [
                            "Submitted",
                            "Under Review",
                            "Approved",
                          ];
                          const currentIdx = order.indexOf(app.status);
                          const isActive = idx <= currentIdx;
                          const isCurrent = idx === currentIdx;
                          return (
                            <div
                              key={s}
                              className="flex items-center gap-1 flex-shrink-0"
                            >
                              <div
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                  isCurrent
                                    ? "bg-blue-600 text-white"
                                    : isActive
                                      ? "bg-green-100 text-green-700"
                                      : "bg-gray-100 text-gray-400"
                                }`}
                              >
                                {isActive && idx < currentIdx && (
                                  <CheckCircle className="w-3 h-3" />
                                )}
                                {isCurrent && <Clock className="w-3 h-3" />}
                                {s}
                              </div>
                              {idx < 2 && (
                                <ChevronRight className="w-3 h-3 text-gray-300" />
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick search by reference */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h4 className="font-semibold text-gray-800 mb-3">
              Track by Reference Number
            </h4>
            <div className="flex gap-3">
              <input
                className="flex-1 border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter reference number e.g. VISA2026001"
                data-ocid="visa.status.search_input"
              />
              <button
                type="button"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
                data-ocid="visa.status.track_button"
              >
                Track
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
