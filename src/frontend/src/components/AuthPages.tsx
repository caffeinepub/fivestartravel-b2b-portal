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
  Upload,
  User,
  UserPlus,
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
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-muted/30 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
          <div className="text-center mb-8">
            <img
              src="/assets/uploads/image-1.png"
              alt="FiveStar Travel"
              className="h-12 w-auto object-contain mx-auto mb-5"
            />
            <h1 className="font-display text-2xl font-bold text-foreground">
              Agent Login
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
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
                  className="text-xs text-primary hover:underline"
                  data-ocid="login.forgot_password.link"
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
                  data-ocid="login.show_password.toggle"
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
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(v) => setRememberMe(!!v)}
                data-ocid="login.remember_me.checkbox"
              />
              <Label
                htmlFor="remember-me"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Remember me for 30 days
              </Label>
            </div>

            {error && (
              <div
                className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive"
                data-ocid="login.error_state"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold"
              disabled={loading}
              data-ocid="login.submit.primary_button"
            >
              {loading ? (
                <span
                  className="flex items-center gap-2"
                  data-ocid="login.loading_state"
                >
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </span>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs text-muted-foreground">
              <span className="bg-card px-2">New to FiveStar Travel?</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-primary/30 text-primary hover:bg-primary/5 font-medium"
            onClick={() => onNavigate("register")}
            data-ocid="login.register.secondary_button"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Create Agent Account
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          Need help?{" "}
          <a href="tel:+911725000004" className="text-primary hover:underline">
            +91-1725000004
          </a>
          {" · "}
          <a
            href="mailto:customerservice@fivestartravel.in"
            className="text-primary hover:underline"
          >
            customerservice@fivestartravel.in
          </a>
        </p>
      </div>
    </div>
  );
}

// ── Agent Registration Page ───────────────────────────────────────────────────
const REG_STEPS = ["Basic Info", "Company", "Documents", "Confirm"];

export function AgentRegisterPage({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    agencyName: "",
    agencyType: "",
    gstNumber: "",
    address: "",
    city: "",
    state: "",
    panCard: null as File | null,
    gstCert: null as File | null,
    agencyLogo: null as File | null,
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function update(key: string, value: string | boolean | File | null) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function handleFile(key: string, files: FileList | null) {
    update(key, files ? files[0] : null);
  }
  const next = () => {
    if (step < REG_STEPS.length - 1) setStep((s) => s + 1);
  };
  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-muted/30 py-12 px-4">
        <div className="w-full max-w-md text-center">
          <div
            className="bg-card rounded-2xl border border-border shadow-xl p-10"
            data-ocid="register.success_state"
          >
            <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Registration Submitted!
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Thank you for registering with FiveStar Travel. Our team will
              review your documents and activate your account within 24-48
              hours.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Confirmation email sent to{" "}
              <span className="font-medium text-foreground">
                {form.email || "your email"}
              </span>
            </p>
            <Button
              className="w-full bg-primary text-primary-foreground"
              onClick={() => onNavigate("login")}
              data-ocid="register.go_to_login.primary_button"
            >
              Go to Agent Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-muted/30 py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-8 py-6 text-white">
            <div className="flex items-center justify-between mb-1">
              <h1 className="font-display text-xl font-bold">
                Agent Registration
              </h1>
              <Badge className="bg-white/15 text-white border-white/20 text-xs">
                Step {step + 1} of {REG_STEPS.length}
              </Badge>
            </div>
            <p className="text-white/70 text-sm">
              Join 147,000+ travel agents on FiveStar Travel
            </p>
            <div className="flex items-center gap-1 mt-4">
              {REG_STEPS.map((label, i) => (
                <div key={label} className="flex items-center gap-1 flex-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      i < step
                        ? "bg-accent text-white"
                        : i === step
                          ? "bg-white text-primary"
                          : "bg-white/20 text-white/50"
                    }`}
                    data-ocid={`register.step.${i + 1}`}
                  >
                    {i < step ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={`text-xs hidden sm:block ${i === step ? "text-white font-medium" : "text-white/50"}`}
                  >
                    {label}
                  </span>
                  {i < REG_STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-1 ${i < step ? "bg-accent/60" : "bg-white/20"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form content */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="p-8 space-y-5"
            data-ocid="register.form"
          >
            {step === 0 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="r-fname">First Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="r-fname"
                        placeholder="Rahul"
                        className="pl-9"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        data-ocid="register.first_name.input"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="r-lname">Last Name *</Label>
                    <Input
                      id="r-lname"
                      placeholder="Sharma"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      data-ocid="register.last_name.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="r-email"
                      type="email"
                      placeholder="rahul@agency.com"
                      className="pl-9"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      data-ocid="register.email.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-phone">Mobile Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="r-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="pl-9"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      data-ocid="register.phone.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-password">Create Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="r-password"
                      type="password"
                      placeholder="Min 8 characters"
                      className="pl-9"
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      data-ocid="register.password.input"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="r-agency">Agency Name *</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="r-agency"
                      placeholder="Sharma Travels Pvt Ltd"
                      className="pl-9"
                      value={form.agencyName}
                      onChange={(e) => update("agencyName", e.target.value)}
                      data-ocid="register.agency_name.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-type">Agency Type *</Label>
                  <select
                    id="r-type"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    value={form.agencyType}
                    onChange={(e) => update("agencyType", e.target.value)}
                    data-ocid="register.agency_type.select"
                  >
                    <option value="">Select agency type</option>
                    <option value="travel_agent">Travel Agent</option>
                    <option value="tour_operator">Tour Operator</option>
                    <option value="corporate">Corporate Travel</option>
                    <option value="dmc">DMC</option>
                    <option value="ota">Online Travel Agency</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-gst">GST Number</Label>
                  <Input
                    id="r-gst"
                    placeholder="22AAAAA0000A1Z5"
                    value={form.gstNumber}
                    onChange={(e) => update("gstNumber", e.target.value)}
                    data-ocid="register.gst.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-addr">Office Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea
                      id="r-addr"
                      placeholder="Full office address"
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      data-ocid="register.address.textarea"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="r-city">City *</Label>
                    <Input
                      id="r-city"
                      placeholder="Mumbai"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      data-ocid="register.city.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="r-state">State *</Label>
                    <Input
                      id="r-state"
                      placeholder="Maharashtra"
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      data-ocid="register.state.input"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-3 border border-border">
                  Upload your KYC documents for account verification. Accepted
                  formats: PDF, JPG, PNG (max 5MB each).
                </p>
                {[
                  {
                    key: "panCard",
                    label: "PAN Card *",
                    hint: "Required for tax compliance",
                  },
                  {
                    key: "gstCert",
                    label: "GST Certificate",
                    hint: "If GST registered",
                  },
                  {
                    key: "agencyLogo",
                    label: "Agency Logo",
                    hint: "For your branded portal",
                  },
                ].map(({ key, label, hint }) => (
                  <div key={key} className="space-y-1.5">
                    <Label>{label}</Label>
                    <label
                      className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/40 hover:bg-muted/30 transition-colors"
                      data-ocid={`register.${key}.dropzone`}
                    >
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFile(key, e.target.files)}
                        data-ocid={`register.${key}.upload_button`}
                      />
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Upload className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {(form[key as keyof typeof form] as File | null)
                            ?.name || "Click to upload"}
                        </p>
                        <p className="text-xs text-muted-foreground">{hint}</p>
                      </div>
                      {(form[key as keyof typeof form] as File | null) && (
                        <CheckCircle2 className="w-5 h-5 text-accent ml-auto flex-shrink-0" />
                      )}
                    </label>
                  </div>
                ))}
              </>
            )}

            {step === 3 && (
              <>
                <div className="bg-muted/50 rounded-xl border border-border p-5 space-y-3">
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    Application Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    {[
                      ["Name", `${form.firstName} ${form.lastName}`],
                      ["Email", form.email],
                      ["Phone", form.phone],
                      ["Agency", form.agencyName],
                      [
                        "City",
                        `${form.city}${form.state ? `, ${form.state}` : ""}`,
                      ],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium text-foreground">
                          {val || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Checkbox
                    id="reg-agree"
                    checked={form.agreed}
                    onCheckedChange={(v) => update("agreed", !!v)}
                    data-ocid="register.terms.checkbox"
                  />
                  <Label
                    htmlFor="reg-agree"
                    className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                  >
                    I agree to the{" "}
                    <span className="text-primary">Terms & Conditions</span>,{" "}
                    <span className="text-primary">Privacy Policy</span> and{" "}
                    <span className="text-primary">Refund Policy</span> of
                    FiveStar Travel.
                  </Label>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-2">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={back}
                  data-ocid="register.back.secondary_button"
                >
                  Back
                </Button>
              )}
              {step < REG_STEPS.length - 1 ? (
                <Button
                  type="button"
                  className="flex-1 bg-primary text-primary-foreground"
                  onClick={next}
                  data-ocid="register.next.primary_button"
                >
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1 bg-accent text-white hover:bg-accent/90"
                  disabled={!form.agreed}
                  data-ocid="register.submit.primary_button"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Already have an account?{" "}
          <button
            type="button"
            className="text-primary hover:underline font-medium"
            onClick={() => onNavigate("login")}
            data-ocid="register.go_to_login.link"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
