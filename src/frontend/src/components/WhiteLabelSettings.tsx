import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Copy,
  Edit2,
  ExternalLink,
  Globe,
  Layers,
  Lock,
  Mail,
  Palette,
  Save,
  Shield,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";

const MODULES = [
  { name: "Flights", key: "flights", default: 8 },
  { name: "Hotels", key: "hotels", default: 10 },
  { name: "Tours", key: "tours", default: 12 },
  { name: "Visa", key: "visa", default: 5 },
  { name: "Transfers", key: "transfers", default: 7 },
  { name: "Cruises", key: "cruises", default: 9 },
];

const SUB_AGENTS = [
  {
    id: 1,
    name: "Rajesh Travels",
    email: "rajesh@travels.in",
    commission: 8,
    status: "Active",
    bookings: 142,
  },
  {
    id: 2,
    name: "Priya Tours",
    email: "priya@tours.com",
    commission: 7,
    status: "Active",
    bookings: 98,
  },
  {
    id: 3,
    name: "Mumbai Holidays",
    email: "info@mumbaiholidays.in",
    commission: 9,
    status: "Active",
    bookings: 213,
  },
  {
    id: 4,
    name: "Delhi Adventures",
    email: "delhi@adventures.co",
    commission: 6,
    status: "Inactive",
    bookings: 54,
  },
  {
    id: 5,
    name: "Goa Getaways",
    email: "goa@getaways.in",
    commission: 8,
    status: "Active",
    bookings: 176,
  },
];

const FONTS = ["Poppins", "Inter", "Sora", "Plus Jakarta Sans", "Outfit"];

export function WhiteLabelSettings() {
  const [portalActive, setPortalActive] = useState(true);
  const [brandedEmails, setBrandedEmails] = useState(true);
  const [customDomain, setCustomDomain] = useState("travel.myagency.in");
  const [domainConnected, setDomainConnected] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#1E3A8A");
  const [secondaryColor, setSecondaryColor] = useState("#F97316");
  const [portalName, setPortalName] = useState("MyAgency Travel");
  const [selectedFont, setSelectedFont] = useState("Poppins");
  const [defaultMarkup, setDefaultMarkup] = useState(10);
  const [moduleMarkups, setModuleMarkups] = useState<Record<string, number>>(
    Object.fromEntries(MODULES.map((m) => [m.key, m.default])),
  );
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Portal Status */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: portalActive
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(239,68,68,0.15)",
                }}
              >
                <Shield
                  className="w-4 h-4"
                  style={{ color: portalActive ? "#22C55E" : "#EF4444" }}
                />
              </div>
              <span className="text-slate-300 text-sm font-medium">
                Portal Status
              </span>
            </div>
            <Switch
              checked={portalActive}
              onCheckedChange={setPortalActive}
              data-ocid="whitelabel.switch"
            />
          </div>
          <p
            className="text-lg font-bold"
            style={{ color: portalActive ? "#22C55E" : "#EF4444" }}
          >
            {portalActive ? "Active" : "Inactive"}
          </p>
          <p className="text-slate-500 text-xs mt-0.5">
            White-label portal is {portalActive ? "live" : "offline"}
          </p>
        </div>

        {/* Custom Domain */}
        <div
          className="rounded-2xl p-5 sm:col-span-1"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(37,99,235,0.15)" }}
            >
              <Globe className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-slate-300 text-sm font-medium">
              Custom Domain
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="flex-1 bg-transparent text-white text-sm border-b border-slate-600 pb-0.5 focus:outline-none focus:border-blue-400 min-w-0"
              data-ocid="whitelabel.input"
            />
            {domainConnected && (
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-slate-500 text-xs mt-2">
            {domainConnected ? "SSL secured · Connected" : "Not connected"}
          </p>
        </div>

        {/* Branded Emails */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(249,115,22,0.15)" }}
              >
                <Mail className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-slate-300 text-sm font-medium">
                Branded Emails
              </span>
            </div>
            <Switch
              checked={brandedEmails}
              onCheckedChange={setBrandedEmails}
              data-ocid="whitelabel.switch"
            />
          </div>
          <p className="text-lg font-bold text-white">
            {brandedEmails ? "Enabled" : "Disabled"}
          </p>
          <p className="text-slate-500 text-xs mt-0.5">
            Send confirmations from your domain
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger value="branding" data-ocid="whitelabel.tab">
            <Palette className="w-3.5 h-3.5 mr-1.5" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="domain" data-ocid="whitelabel.tab">
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            Domain
          </TabsTrigger>
          <TabsTrigger value="commission" data-ocid="whitelabel.tab">
            <Layers className="w-3.5 h-3.5 mr-1.5" />
            Commission
          </TabsTrigger>
          <TabsTrigger value="subagents" data-ocid="whitelabel.tab">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            Sub-Agents
          </TabsTrigger>
        </TabsList>

        {/* Branding Tab */}
        <TabsContent value="branding">
          <div
            className="rounded-2xl p-6 space-y-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h3 className="text-white font-semibold text-base">
              Brand Customization
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Portal Name */}
              <div>
                <Label className="text-slate-400 text-xs mb-2 block">
                  Portal Name
                </Label>
                <Input
                  value={portalName}
                  onChange={(e) => setPortalName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                  data-ocid="whitelabel.input"
                />
              </div>
              {/* Font */}
              <div>
                <Label className="text-slate-400 text-xs mb-2 block">
                  Font Family
                </Label>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm text-white border"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                  data-ocid="whitelabel.select"
                >
                  {FONTS.map((f) => (
                    <option key={f} value={f} style={{ background: "#1E293B" }}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              {/* Primary Color */}
              <div>
                <Label className="text-slate-400 text-xs mb-2 block">
                  Primary Color
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border-0 cursor-pointer p-0.5"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                    data-ocid="whitelabel.input"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="bg-white/5 border-white/10 text-white font-mono text-sm"
                    data-ocid="whitelabel.input"
                  />
                </div>
              </div>
              {/* Secondary Color */}
              <div>
                <Label className="text-slate-400 text-xs mb-2 block">
                  Secondary / Accent Color
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border-0 cursor-pointer p-0.5"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                    data-ocid="whitelabel.input"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="bg-white/5 border-white/10 text-white font-mono text-sm"
                    data-ocid="whitelabel.input"
                  />
                </div>
              </div>
            </div>
            {/* Logo Upload */}
            <div>
              <Label className="text-slate-400 text-xs mb-2 block">
                Brand Logo
              </Label>
              <div
                className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-orange-400 transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
                data-ocid="whitelabel.dropzone"
              >
                <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">
                  Drop your logo here or{" "}
                  <span style={{ color: "#F97316" }}>browse</span>
                </p>
                <p className="text-slate-600 text-xs mt-1">
                  PNG, SVG · Max 2MB · Recommended 200×60px
                </p>
              </div>
            </div>
            {/* Preview */}
            <div>
              <Label className="text-slate-400 text-xs mb-2 block">
                Live Preview
              </Label>
              <div
                className="rounded-xl p-4 flex items-center gap-4"
                style={{
                  background: primaryColor,
                  border: `2px solid ${secondaryColor}`,
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className="text-white font-bold text-sm"
                    style={{ fontFamily: selectedFont }}
                  >
                    {portalName}
                  </p>
                  <p className="text-white/70 text-xs">{customDomain}</p>
                </div>
                <div className="ml-auto">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: secondaryColor }}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Domain Tab */}
        <TabsContent value="domain">
          <div
            className="rounded-2xl p-6 space-y-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h3 className="text-white font-semibold text-base">
              Domain & SSL Settings
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-400 text-xs mb-2 block">
                  Custom Domain
                </Label>
                <div className="flex gap-3">
                  <Input
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className="bg-white/5 border-white/10 text-white flex-1"
                    placeholder="yourdomain.com"
                    data-ocid="whitelabel.input"
                  />
                  <Button
                    style={{
                      background: "linear-gradient(135deg,#F97316,#FB923C)",
                    }}
                    className="text-white border-0"
                    onClick={() => setDomainConnected(true)}
                    data-ocid="whitelabel.primary_button"
                  >
                    <ExternalLink className="w-4 h-4 mr-1.5" />
                    Connect
                  </Button>
                </div>
              </div>
              {/* SSL */}
              <div
                className="rounded-xl p-4 flex items-center gap-3"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                <Lock className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-400 text-sm font-semibold">
                    SSL Certificate Active
                  </p>
                  <p className="text-slate-500 text-xs">
                    Auto-renewed · Expires Dec 2026
                  </p>
                </div>
                <Badge className="ml-auto bg-green-500/20 text-green-300 border-green-500/30">
                  Secured
                </Badge>
              </div>
              {/* CNAME */}
              <div>
                <Label className="text-slate-400 text-xs mb-2 block">
                  CNAME Record (add to your DNS)
                </Label>
                <div
                  className="rounded-xl p-4 flex items-center justify-between"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <code className="text-blue-300 text-sm">
                    cname.fivestartravel.in
                  </code>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
                    onClick={() =>
                      navigator.clipboard.writeText("cname.fivestartravel.in")
                    }
                    data-ocid="whitelabel.button"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Commission Tab */}
        <TabsContent value="commission">
          <div
            className="rounded-2xl p-6 space-y-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h3 className="text-white font-semibold text-base">
              Markup & Commission Settings
            </h3>
            <div>
              <Label className="text-slate-400 text-xs mb-2 block">
                Default Markup (%)
              </Label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={defaultMarkup}
                  onChange={(e) => setDefaultMarkup(Number(e.target.value))}
                  className="flex-1"
                  data-ocid="whitelabel.input"
                />
                <span className="text-white font-bold text-lg w-12 text-right">
                  {defaultMarkup}%
                </span>
              </div>
            </div>
            <div>
              <Label className="text-slate-400 text-xs mb-3 block">
                Per-Module Overrides
              </Label>
              <div className="space-y-3">
                {MODULES.map((mod, idx) => (
                  <div
                    key={mod.key}
                    className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    data-ocid={`whitelabel.item.${idx + 1}`}
                  >
                    <span className="text-slate-300 text-sm font-medium w-24">
                      {mod.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={30}
                        value={moduleMarkups[mod.key]}
                        onChange={(e) =>
                          setModuleMarkups((prev) => ({
                            ...prev,
                            [mod.key]: Number(e.target.value),
                          }))
                        }
                        className="w-28"
                        data-ocid="whitelabel.input"
                      />
                      <span className="text-white font-semibold text-sm w-10 text-right">
                        {moduleMarkups[mod.key]}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Sub-Agents Tab */}
        <TabsContent value="subagents">
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold text-base">
                Sub-Agent Network
              </h3>
              <Button
                size="sm"
                style={{
                  background: "linear-gradient(135deg,#F97316,#FB923C)",
                }}
                className="text-white border-0 text-xs"
                data-ocid="whitelabel.primary_button"
              >
                <Users className="w-3.5 h-3.5 mr-1.5" />
                Add Sub-Agent
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="border-b"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    <th className="text-left text-slate-500 text-xs pb-3 font-medium">
                      Agent
                    </th>
                    <th className="text-left text-slate-500 text-xs pb-3 font-medium">
                      Email
                    </th>
                    <th className="text-center text-slate-500 text-xs pb-3 font-medium">
                      Commission
                    </th>
                    <th className="text-center text-slate-500 text-xs pb-3 font-medium">
                      Bookings
                    </th>
                    <th className="text-center text-slate-500 text-xs pb-3 font-medium">
                      Status
                    </th>
                    <th className="text-center text-slate-500 text-xs pb-3 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SUB_AGENTS.map((agent, idx) => (
                    <tr
                      key={agent.id}
                      className="border-b"
                      style={{ borderColor: "rgba(255,255,255,0.05)" }}
                      data-ocid={`whitelabel.item.${idx + 1}`}
                    >
                      <td className="text-white py-3 font-medium">
                        {agent.name}
                      </td>
                      <td className="text-slate-400 py-3 text-xs">
                        {agent.email}
                      </td>
                      <td className="text-center py-3">
                        <span className="text-orange-400 font-semibold">
                          {agent.commission}%
                        </span>
                      </td>
                      <td className="text-center py-3 text-slate-300">
                        {agent.bookings}
                      </td>
                      <td className="text-center py-3">
                        <Badge
                          className={
                            agent.status === "Active"
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                          }
                        >
                          {agent.status}
                        </Badge>
                      </td>
                      <td className="text-center py-3">
                        <button
                          type="button"
                          className="text-slate-400 hover:text-orange-400 transition-colors bg-transparent border-0 cursor-pointer p-1"
                          data-ocid={`whitelabel.edit_button.${idx + 1}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {saved && (
          <span
            className="text-green-400 text-sm flex items-center gap-1.5"
            data-ocid="whitelabel.success_state"
          >
            <CheckCircle2 className="w-4 h-4" />
            Settings saved!
          </span>
        )}
        <Button
          onClick={handleSave}
          style={{
            background: "linear-gradient(135deg,#F97316,#FB923C)",
            boxShadow: "0 8px 20px rgba(249,115,22,0.3)",
          }}
          className="text-white border-0 px-8"
          data-ocid="whitelabel.save_button"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
