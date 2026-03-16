import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Download,
  FileCheck,
  FileText,
  Globe,
  PlusCircle,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";

const glassBg = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const DOCS = [
  {
    name: "GST Certificate",
    status: "Verified",
    date: "12 Jan 2026",
    size: "245 KB",
  },
  { name: "PAN Card", status: "Verified", date: "12 Jan 2026", size: "182 KB" },
  {
    name: "Trade License",
    status: "Pending",
    date: "02 Mar 2026",
    size: "1.2 MB",
  },
  {
    name: "Bank Details Letter",
    status: "Verified",
    date: "15 Jan 2026",
    size: "98 KB",
  },
  {
    name: "IATA Certificate",
    status: "Rejected",
    date: "20 Feb 2026",
    size: "512 KB",
  },
];

const CONTRACTS = [
  {
    name: "Master Service Agreement",
    partner: "FiveStar Travel Admin",
    start: "01 Jan 2026",
    end: "31 Dec 2026",
    commission: "12%",
    status: "Active",
  },
  {
    name: "Hotel Inventory Contract",
    partner: "Grand Hyatt Dubai",
    start: "01 Jan 2026",
    end: "30 Jun 2026",
    commission: "8%",
    status: "Active",
  },
  {
    name: "Tour Operator Agreement",
    partner: "Desert Safari LLC",
    start: "15 Feb 2026",
    end: "15 Feb 2027",
    commission: "15%",
    status: "Active",
  },
  {
    name: "Transfer Services Contract",
    partner: "City Cabs Dubai",
    start: "01 Mar 2026",
    end: "28 Feb 2027",
    commission: "10%",
    status: "Pending",
  },
];

const ALL_DESTINATIONS = [
  "Dubai",
  "Abu Dhabi",
  "Delhi",
  "Mumbai",
  "Paris",
  "London",
  "Singapore",
  "Bangkok",
  "Bali",
  "Maldives",
  "Tokyo",
  "New York",
  "Sydney",
];

const DOC_STATUS: Record<string, string> = {
  Verified: "bg-green-500/20 text-green-400 border-green-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function SupplierCompanyProfile() {
  const [destinations, setDestinations] = useState([
    "Dubai",
    "Delhi",
    "Mumbai",
    "London",
    "Singapore",
  ]);
  const [newDest, setNewDest] = useState("");

  function addDest() {
    if (newDest && !destinations.includes(newDest)) {
      setDestinations([...destinations, newDest]);
      setNewDest("");
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="registration">
        <TabsList className="bg-white/5 border border-white/10">
          {[
            { value: "registration", label: "Registration", icon: Building2 },
            { value: "documents", label: "Documents", icon: FileText },
            { value: "contracts", label: "Contracts", icon: FileCheck },
            { value: "destinations", label: "Destinations", icon: Globe },
          ].map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              data-ocid={`profile.${value}.tab`}
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-slate-400 gap-1"
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="registration">
          <div className="rounded-2xl p-6" style={glassBg}>
            <h3 className="text-white font-semibold mb-4">
              Company Registration Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  [
                    "Company Name",
                    "profile.reg.company.input",
                    "Sunrise Hospitality Pvt Ltd",
                  ],
                  [
                    "Contact Person",
                    "profile.reg.contact.input",
                    "Ramesh Gupta",
                  ],
                  [
                    "Email",
                    "profile.reg.email.input",
                    "ramesh@sunrisehospitality.in",
                  ],
                  ["Phone", "profile.reg.phone.input", "+91-9812345678"],
                  [
                    "Website",
                    "profile.reg.website.input",
                    "www.sunrisehospitality.in",
                  ],
                  ["GST Number", "profile.reg.gst.input", "07AABCS1429B1Z5"],
                  ["PAN Number", "profile.reg.pan.input", "AABCS1429B"],
                  [
                    "CIN / Registration No.",
                    "profile.reg.cin.input",
                    "U63030MH2018PTC314938",
                  ],
                  ["IATA Number", "profile.reg.iata.input", "IATA-IN-123456"],
                ] as [string, string, string][]
              ).map(([label, ocid, val]) => (
                <div key={label}>
                  <Label className="text-slate-400 text-xs">{label}</Label>
                  <Input
                    defaultValue={val}
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    data-ocid={ocid}
                  />
                </div>
              ))}
              <div>
                <Label className="text-slate-400 text-xs">Company Type</Label>
                <Select defaultValue="dmc">
                  <SelectTrigger
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    data-ocid="profile.reg.type.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "DMC",
                      "Supplier",
                      "Tour Operator",
                      "Hotel Chain",
                      "Airline",
                      "Transfer Company",
                    ].map((t) => (
                      <SelectItem
                        key={t}
                        value={t.toLowerCase().replace(" ", "-")}
                      >
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-400 text-xs">Country</Label>
                <Select defaultValue="india">
                  <SelectTrigger
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    data-ocid="profile.reg.country.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "India",
                      "UAE",
                      "UK",
                      "USA",
                      "Singapore",
                      "Australia",
                    ].map((c) => (
                      <SelectItem key={c} value={c.toLowerCase()}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label className="text-slate-400 text-xs">
                  Registered Address
                </Label>
                <Input
                  defaultValue="SCO 48, Sector 30C, Chandigarh, India - 160030"
                  className="mt-1 bg-white/5 border-white/10 text-white"
                  data-ocid="profile.reg.address.input"
                />
              </div>
            </div>
            <Button
              className="mt-4 bg-orange-600 text-white hover:opacity-90"
              data-ocid="profile.reg.save.button"
            >
              Save Registration Details
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="space-y-4">
            <div
              className="rounded-2xl p-6 border-2 border-dashed border-white/20 text-center cursor-pointer hover:border-orange-500/50 transition-colors"
              data-ocid="profile.docs.dropzone"
            >
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-white font-medium">Upload Document</p>
              <p className="text-slate-400 text-sm">
                Drag and drop or click to browse. PDF, JPG, PNG up to 10MB
              </p>
              <Button
                size="sm"
                className="mt-3 bg-orange-600 text-white"
                data-ocid="profile.docs.upload.button"
              >
                <Upload className="w-4 h-4 mr-1" /> Choose File
              </Button>
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ background: "rgba(255,255,255,0.05)" }}>
                    {[
                      "Document",
                      "Upload Date",
                      "Size",
                      "Status",
                      "Action",
                    ].map((h) => (
                      <TableHead key={h} className="text-slate-400">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DOCS.map((doc, i) => (
                    <TableRow
                      key={doc.name}
                      className="border-white/10"
                      data-ocid={`profile.docs.row.${i + 1}`}
                    >
                      <TableCell className="text-white font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-orange-400" />
                          {doc.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm">
                        {doc.date}
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm">
                        {doc.size}
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${DOC_STATUS[doc.status]}`}>
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-400 hover:text-blue-300 h-7 px-2"
                          data-ocid={`profile.docs.download_button.${i + 1}`}
                        >
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contracts">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">Contract Management</h3>
              <Button
                size="sm"
                style={{ background: "#F97316" }}
                className="text-white"
                data-ocid="profile.contracts.open_modal_button"
              >
                <PlusCircle className="w-4 h-4 mr-1" /> Add Contract
              </Button>
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ background: "rgba(255,255,255,0.05)" }}>
                    {[
                      "Contract Name",
                      "Partner",
                      "Start Date",
                      "End Date",
                      "Commission",
                      "Status",
                      "Action",
                    ].map((h) => (
                      <TableHead key={h} className="text-slate-400">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CONTRACTS.map((c, i) => (
                    <TableRow
                      key={c.name}
                      className="border-white/10"
                      data-ocid={`profile.contracts.row.${i + 1}`}
                    >
                      <TableCell className="text-white font-medium text-sm">
                        {c.name}
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm">
                        {c.partner}
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm">
                        {c.start}
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm">
                        {c.end}
                      </TableCell>
                      <TableCell className="text-orange-400 font-medium">
                        {c.commission}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${c.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}`}
                        >
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-400 h-7 px-1"
                          data-ocid={`profile.contracts.download_button.${i + 1}`}
                        >
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="destinations">
          <div className="rounded-2xl p-6" style={glassBg}>
            <h3 className="text-white font-semibold mb-2">
              Service Destinations
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Destinations where you provide travel services
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {destinations.map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm"
                  style={{
                    background: "rgba(249,115,22,0.2)",
                    border: "1px solid rgba(249,115,22,0.4)",
                  }}
                >
                  <Globe className="w-3 h-3 text-orange-400" />
                  <span className="text-white">{d}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setDestinations(destinations.filter((x) => x !== d))
                    }
                    data-ocid="profile.dest.remove.button"
                    className="text-orange-300 hover:text-red-400 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Select value={newDest} onValueChange={setNewDest}>
                <SelectTrigger
                  className="bg-white/5 border-white/10 text-white"
                  data-ocid="profile.dest.select"
                >
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_DESTINATIONS.filter(
                    (d) => !destinations.includes(d),
                  ).map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={newDest}
                onChange={(e) => setNewDest(e.target.value)}
                placeholder="Or type custom"
                className="bg-white/5 border-white/10 text-white"
                data-ocid="profile.dest.input"
              />
              <Button
                style={{ background: "#F97316" }}
                className="text-white flex-shrink-0"
                onClick={addDest}
                data-ocid="profile.dest.add.button"
              >
                <PlusCircle className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
