import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Upload,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { Page } from "./PublicPages";

// ── Agent Login Page ──────────────────────────────────────────────────────────
export function AgentLoginPage({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate("dashboard");
    }, 800);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — hero */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-12 hero-gradient grain-overlay relative">
        <div className="relative z-10 text-center max-w-sm">
          {/* Logo */}
          <div className="bg-white/90 rounded-xl px-4 py-2.5 inline-flex items-center mb-10">
            <img
              src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
              alt="FiveStar Travel"
              className="h-9 w-auto object-contain"
            />
          </div>

          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Welcome Back, Agent
          </h2>
          <p className="text-white/70 text-sm mb-10 leading-relaxed">
            Access India's most powerful B2B travel portal and grow your agency.
          </p>

          {/* Trust stats */}
          <div className="space-y-3 text-left">
            {[
              { icon: Users, value: "147,000+", label: "Travel Agents" },
              { icon: Shield, value: "IATA", label: "Accredited Platform" },
              { icon: TrendingUp, value: "24x7", label: "Expert Support" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {item.value}
                  </p>
                  <p className="text-white/60 text-xs">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Live booking card */}
          <div className="mt-8 glass-card rounded-xl p-4 text-left float-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/70 text-xs">
                Live booking just now
              </span>
            </div>
            <p className="text-white font-semibold text-sm">
              DEL → DXB · Economy
            </p>
            <p className="text-accent text-sm font-bold">₹24,500 · 2 Pax</p>
            <p className="text-white/50 text-xs mt-1">
              By TravelWorld Agency, Delhi
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white py-12 px-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="md:hidden text-center mb-8">
            <img
              src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
              alt="FiveStar Travel"
              className="h-10 w-auto object-contain mx-auto"
            />
          </div>

          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Agent Login
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to your FiveStar Travel agent account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="login.form"
          >
            <div className="space-y-1.5">
              <Label htmlFor="login-email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@agency.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="login.email.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-sm font-medium">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-xs text-accent hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-ocid="login.password.input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                  data-ocid="login.password_toggle.button"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(v) => setRememberMe(!!v)}
                data-ocid="login.remember_me.checkbox"
              />
              <Label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Remember me for 30 days
              </Label>
            </div>

            {error && (
              <p
                className="text-sm text-destructive bg-destructive/8 rounded-lg px-3 py-2"
                data-ocid="login.error_state"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full btn-orange rounded-xl font-semibold py-5 text-base"
              disabled={loading}
              data-ocid="login.submit_button"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In to Dashboard
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New to FiveStar Travel?{" "}
            <button
              type="button"
              className="text-accent font-medium hover:underline"
              onClick={() => onNavigate("register")}
              data-ocid="login.register.link"
            >
              Create free account →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Registration Page ──────────────────────────────────────────────────────────
const STEPS = [
  "Agency Details",
  "Contact Person",
  "Documents",
  "Review & Submit",
];

interface RegForm {
  agencyName: string;
  agencyType: string;
  panNumber: string;
  gstNumber: string;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  iataCode: string;
  panDoc: string;
  gstDoc: string;
  termsAccepted: boolean;
}

export function AgentRegisterPage({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RegForm>({
    agencyName: "",
    agencyType: "retail",
    panNumber: "",
    gstNumber: "",
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    iataCode: "",
    panDoc: "",
    gstDoc: "",
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function upd(k: keyof RegForm, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1200);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
        <div className="bg-card rounded-2xl border border-border shadow-premium p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Registration Submitted!
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your agency application is under review. We'll notify you at{" "}
            <strong>{form.email}</strong> within 24 hours.
          </p>
          <Button
            className="w-full btn-orange rounded-xl font-semibold"
            onClick={() => onNavigate("login")}
            data-ocid="register.go_login.button"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Register header */}
      <div className="bg-primary py-6 px-4">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <img
              src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
              alt="FiveStar Travel"
              className="h-8 w-auto object-contain bg-white/90 rounded-lg px-2 py-1"
            />
            <button
              type="button"
              className="text-white/60 hover:text-white text-sm"
              onClick={() => onNavigate("login")}
              data-ocid="register.login.link"
            >
              Already have an account? Sign in →
            </button>
          </div>

          {/* Steps */}
          <div
            className="flex items-center gap-3"
            data-ocid="register.steps.panel"
          >
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i < step
                      ? "bg-emerald-500 text-white"
                      : i === step
                        ? "bg-accent text-white"
                        : "bg-white/20 text-white/50"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs hidden sm:block ${
                    i === step ? "text-white font-semibold" : "text-white/50"
                  }`}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px bg-white/20 mx-1" />
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-4 bg-white/20 rounded-full h-1.5">
            <div
              className="bg-accent h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container py-8">
        <form onSubmit={handleSubmit} data-ocid="register.form">
          <div className="bg-card rounded-2xl border border-border shadow-navy-md p-8 max-w-2xl mx-auto">
            <h2 className="font-display text-xl font-bold text-foreground mb-6">
              {STEPS[step]}
            </h2>

            {step === 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <Label className="text-sm font-medium">
                      Agency / Business Name *
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="Sunrise Travels Pvt Ltd"
                        value={form.agencyName}
                        onChange={(e) => upd("agencyName", e.target.value)}
                        required
                        data-ocid="register.agency_name.input"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Agency Type *</Label>
                    <select
                      className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                      value={form.agencyType}
                      onChange={(e) => upd("agencyType", e.target.value)}
                      data-ocid="register.agency_type.select"
                    >
                      <option value="retail">Retail Agency</option>
                      <option value="corporate">Corporate Agency</option>
                      <option value="wholesale">Wholesale Agency</option>
                      <option value="online">Online Travel Agency</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">PAN Number *</Label>
                    <Input
                      placeholder="ABCDE1234F"
                      value={form.panNumber}
                      onChange={(e) => upd("panNumber", e.target.value)}
                      required
                      data-ocid="register.pan_number.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">GST Number</Label>
                    <Input
                      placeholder="27ABCDE1234F1Z5"
                      value={form.gstNumber}
                      onChange={(e) => upd("gstNumber", e.target.value)}
                      data-ocid="register.gst_number.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">
                      IATA Code (if any)
                    </Label>
                    <Input
                      placeholder="91-4XXXXX"
                      value={form.iataCode}
                      onChange={(e) => upd("iataCode", e.target.value)}
                      data-ocid="register.iata_code.input"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <Label className="text-sm font-medium">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="Rajesh Kumar"
                        value={form.fullName}
                        onChange={(e) => upd("fullName", e.target.value)}
                        required
                        data-ocid="register.full_name.input"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        className="pl-9"
                        placeholder="rajesh@agency.com"
                        value={form.email}
                        onChange={(e) => upd("email", e.target.value)}
                        required
                        data-ocid="register.email.input"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">
                      Mobile Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        className="pl-9"
                        placeholder="+91 9876543210"
                        value={form.mobile}
                        onChange={(e) => upd("mobile", e.target.value)}
                        required
                        data-ocid="register.mobile.input"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Password *</Label>
                    <Input
                      type="password"
                      placeholder="Min 8 characters"
                      value={form.password}
                      onChange={(e) => upd("password", e.target.value)}
                      required
                      data-ocid="register.password.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">
                      Confirm Password *
                    </Label>
                    <Input
                      type="password"
                      placeholder="Repeat password"
                      value={form.confirmPassword}
                      onChange={(e) => upd("confirmPassword", e.target.value)}
                      required
                      data-ocid="register.confirm_password.input"
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label className="text-sm font-medium">
                      Office Address *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <textarea
                        className="w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm min-h-[70px] resize-none"
                        placeholder="Complete office address"
                        value={form.address}
                        onChange={(e) => upd("address", e.target.value)}
                        data-ocid="register.address.textarea"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">City *</Label>
                    <Input
                      placeholder="Mumbai"
                      value={form.city}
                      onChange={(e) => upd("city", e.target.value)}
                      required
                      data-ocid="register.city.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">State *</Label>
                    <Input
                      placeholder="Maharashtra"
                      value={form.state}
                      onChange={(e) => upd("state", e.target.value)}
                      required
                      data-ocid="register.state.input"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Upload documents for verification. All documents are securely
                  stored and encrypted.
                </p>
                {[
                  {
                    label: "PAN Card *",
                    key: "panDoc" as keyof RegForm,
                    ocid: "register.pan_doc.upload_button",
                  },
                  {
                    label: "GST Certificate",
                    key: "gstDoc" as keyof RegForm,
                    ocid: "register.gst_doc.upload_button",
                  },
                ].map((doc) => (
                  <div key={doc.key} className="space-y-1.5">
                    <Label className="text-sm font-medium">{doc.label}</Label>
                    <label
                      className="flex items-center gap-3 border-2 border-dashed border-border rounded-xl p-5 cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors"
                      data-ocid={doc.ocid}
                    >
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {form[doc.key]
                            ? String(form[doc.key])
                            : "Click to upload"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, JPG, PNG up to 5MB
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          upd(doc.key, e.target.files?.[0]?.name ?? "")
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div className="bg-muted/50 rounded-xl p-5 space-y-3 text-sm">
                  <h3 className="font-semibold text-foreground">
                    Application Summary
                  </h3>
                  {[
                    { label: "Agency", value: form.agencyName || "—" },
                    { label: "Type", value: form.agencyType },
                    { label: "PAN", value: form.panNumber || "—" },
                    { label: "Contact", value: form.fullName || "—" },
                    { label: "Email", value: form.email || "—" },
                    { label: "Mobile", value: form.mobile || "—" },
                    { label: "City", value: form.city || "—" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium text-foreground">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <Checkbox
                    id="terms"
                    checked={form.termsAccepted}
                    onCheckedChange={(v) => upd("termsAccepted", !!v)}
                    data-ocid="register.terms.checkbox"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-accent hover:underline"
                    >
                      Terms & Conditions
                    </button>
                    ,{" "}
                    <button
                      type="button"
                      className="text-accent hover:underline"
                    >
                      Privacy Policy
                    </button>
                    , and{" "}
                    <button
                      type="button"
                      className="text-accent hover:underline"
                    >
                      Agent Agreement
                    </button>{" "}
                    of FiveStar Travel.
                  </Label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                className="px-6"
                onClick={() => {
                  if (step === 0) onNavigate("login");
                  else setStep((s) => s - 1);
                }}
                data-ocid="register.back.button"
              >
                {step === 0 ? "Back to Login" : "← Back"}
              </Button>

              <Button
                type="submit"
                className="btn-orange rounded-xl px-8 font-semibold"
                disabled={loading || (step === 3 && !form.termsAccepted)}
                data-ocid="register.next.primary_button"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : step === 3 ? (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Submit Application
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Continue <ChevronRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Supplier Login Page ───────────────────────────────────────────────────────
export function SupplierLoginPage({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate("dashboard");
    }, 800);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — hero */}
      <div
        className="hidden md:flex w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #F97316, #FB923C)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #fff 0%, transparent 60%), radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 text-center max-w-sm">
          <div className="bg-white/90 rounded-xl px-4 py-2.5 inline-flex items-center mb-10">
            <img
              src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
              alt="FiveStar Travel"
              className="h-9 w-auto object-contain"
            />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Supplier Portal
          </h2>
          <p className="text-white/80 text-sm mb-10 leading-relaxed">
            Manage your inventory, rates and availability across thousands of
            travel agents on our global B2B network.
          </p>
          <div className="space-y-3 text-left">
            {[
              { icon: Users, value: "500+", label: "Active Suppliers" },
              { icon: TrendingUp, value: "50K+", label: "Monthly Bookings" },
              { icon: Shield, value: "99.9%", label: "Platform Uptime" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {item.value}
                  </p>
                  <p className="text-white/70 text-xs">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-8 rounded-xl p-4 text-left"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white/80 text-xs">
                Real-time inventory sync
              </span>
            </div>
            <p className="text-white font-semibold text-sm">
              Dubai Premium Hotels
            </p>
            <p className="text-white/90 text-sm font-bold">
              1,200 rooms · 94% occupancy
            </p>
            <p className="text-white/60 text-xs mt-1">Updated 2 minutes ago</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white py-12 px-6">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-8">
            <img
              src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
              alt="FiveStar Travel"
              className="h-10 w-auto object-contain mx-auto"
            />
          </div>
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white mb-4"
              style={{
                background: "linear-gradient(135deg, #F97316, #FB923C)",
              }}
            >
              Supplier Portal
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Sign In to Supplier Portal
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your properties and services on FiveStar Travel
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="supplier_login.form"
          >
            <div className="space-y-1.5">
              <Label htmlFor="supplier-email" className="text-sm font-medium">
                Business Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="supplier-email"
                  type="email"
                  placeholder="supplier@yourcompany.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="supplier_login.email.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="supplier-password"
                  className="text-sm font-medium"
                >
                  Password
                </Label>
                <button
                  type="button"
                  className="text-xs hover:underline"
                  style={{ color: "#F97316" }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="supplier-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-ocid="supplier_login.password.input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                className="text-sm text-destructive bg-destructive/8 rounded-lg px-3 py-2"
                data-ocid="supplier_login.error_state"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              data-ocid="supplier_login.submit_button"
              className="w-full text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
              style={{
                background: loading
                  ? "#ccc"
                  : "linear-gradient(135deg, #F97316, #FB923C)",
                boxShadow: loading
                  ? "none"
                  : "0 10px 30px rgba(249,115,22,0.35)",
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in to Supplier Portal
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Admin Login Page ──────────────────────────────────────────────────────────
export function AdminLoginPage({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate("dashboard");
    }, 800);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — hero */}
      <div
        className="hidden md:flex w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 60%, #fff 0%, transparent 60%), radial-gradient(circle at 70% 10%, #fff 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 text-center max-w-sm">
          <div className="bg-white/90 rounded-xl px-4 py-2.5 inline-flex items-center mb-10">
            <img
              src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
              alt="FiveStar Travel"
              className="h-9 w-auto object-contain"
            />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Admin Portal
          </h2>
          <p className="text-white/80 text-sm mb-10 leading-relaxed">
            Full platform control and management. Oversee agents, suppliers,
            bookings, and analytics from a single command center.
          </p>
          <div className="space-y-3 text-left">
            {[
              { icon: Shield, value: "16+", label: "Platform Modules" },
              { icon: TrendingUp, value: "100%", label: "Platform Uptime" },
              { icon: Users, value: "Real-time", label: "Analytics & Reports" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {item.value}
                  </p>
                  <p className="text-white/70 text-xs">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-8 rounded-xl p-4 text-left"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white/80 text-xs">Secured with 2FA</span>
            </div>
            <p className="text-white font-semibold text-sm">
              Two-Factor Authentication
            </p>
            <p className="text-white/80 text-xs mt-1">
              Admin access requires TOTP verification for maximum security.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white py-12 px-6">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-8">
            <img
              src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
              alt="FiveStar Travel"
              className="h-10 w-auto object-contain mx-auto"
            />
          </div>
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white mb-4"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
              }}
            >
              Admin Portal
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Sign In to Admin Portal
            </h1>
            <p className="text-muted-foreground text-sm">
              Restricted access — authorized administrators only
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="admin_login.form"
          >
            <div className="space-y-1.5">
              <Label htmlFor="admin-email" className="text-sm font-medium">
                Admin Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@fivestartravel.in"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="admin_login.email.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="admin-password" className="text-sm font-medium">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-xs hover:underline"
                  style={{ color: "#7C3AED" }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-ocid="admin_login.password.input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="admin-2fa" className="text-sm font-medium">
                2FA Code
              </Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="admin-2fa"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  className="pl-9 tracking-widest font-mono"
                  value={twoFACode}
                  onChange={(e) =>
                    setTwoFACode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  data-ocid="admin_login.2fa.input"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {error && (
              <p
                className="text-sm text-destructive bg-destructive/8 rounded-lg px-3 py-2"
                data-ocid="admin_login.error_state"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              data-ocid="admin_login.submit_button"
              className="w-full text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
              style={{
                background: loading
                  ? "#ccc"
                  : "linear-gradient(135deg, #7C3AED, #A78BFA)",
                boxShadow: loading
                  ? "none"
                  : "0 10px 30px rgba(124,58,237,0.35)",
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in to Admin Portal
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
