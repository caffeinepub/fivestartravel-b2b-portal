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
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

const glassBg = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const SERVICE_TYPES = [
  "Flight",
  "Hotel",
  "Tour",
  "Transfer",
  "Visa",
  "Cruise",
  "Insurance",
  "Package",
];

interface Rule {
  id: string;
  label: string;
  value: string;
  type: string;
  status: string;
}

const GLOBAL_RULES: Rule[] = SERVICE_TYPES.map((s, i) => ({
  id: `GR${i + 1}`,
  label: s,
  value: `${10 + i * 2}%`,
  type: s,
  status: "Active",
}));
const AGENT_RULES: Rule[] = [
  {
    id: "AR1",
    label: "Rahul Sharma (AG001)",
    value: "15%",
    type: "Hotel",
    status: "Active",
  },
  {
    id: "AR2",
    label: "Priya Menon (AG002)",
    value: "12%",
    type: "Flight",
    status: "Active",
  },
  {
    id: "AR3",
    label: "Arun Kumar (AG003)",
    value: "18%",
    type: "All",
    status: "Inactive",
  },
];
const SEASONAL_RULES: Rule[] = [
  {
    id: "SR1",
    label: "Peak Season (Dec-Jan)",
    value: "+25%",
    type: "All",
    status: "Active",
  },
  {
    id: "SR2",
    label: "Off-Season (Jul-Aug)",
    value: "-15%",
    type: "Hotel",
    status: "Active",
  },
  {
    id: "SR3",
    label: "Diwali Special",
    value: "+30%",
    type: "Package",
    status: "Active",
  },
];
const DESTINATION_RULES: Rule[] = [
  { id: "DR1", label: "Dubai", value: "20%", type: "Hotel", status: "Active" },
  {
    id: "DR2",
    label: "Europe",
    value: "22%",
    type: "Package",
    status: "Active",
  },
  {
    id: "DR3",
    label: "Maldives",
    value: "25%",
    type: "Hotel",
    status: "Active",
  },
];

function RuleTable({
  rules,
  ocidPrefix,
}: { rules: Rule[]; ocidPrefix: string }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <Table>
        <TableHeader>
          <TableRow style={{ background: "rgba(255,255,255,0.05)" }}>
            {["Rule", "Service Type", "Markup", "Status", "Actions"].map(
              (h) => (
                <TableHead key={h} className="text-slate-400">
                  {h}
                </TableHead>
              ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((r, i) => (
            <TableRow
              key={r.id}
              className="border-white/10"
              data-ocid={`${ocidPrefix}.row.${i + 1}`}
            >
              <TableCell className="text-white font-medium">
                {r.label}
              </TableCell>
              <TableCell className="text-slate-300 text-sm">{r.type}</TableCell>
              <TableCell>
                <span className="text-orange-400 font-bold">{r.value}</span>
              </TableCell>
              <TableCell>
                <span
                  className={`text-xs px-2 py-1 rounded-full border font-medium ${
                    r.status === "Active"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                  }`}
                >
                  {r.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-blue-400 hover:text-blue-300 h-7 px-1"
                    data-ocid={`${ocidPrefix}.edit_button.${i + 1}`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 h-7 px-1"
                    data-ocid={`${ocidPrefix}.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function SupplierPricingEngine() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Global Default Markup", value: "15%", color: "#F97316" },
          { label: "Active Pricing Rules", value: "14", color: "#3B82F6" },
          { label: "Revenue Impact", value: "+2.4L", color: "#10B981" },
        ].map((s, i) => (
          <div
            key={s.label}
            className="rounded-2xl p-4"
            style={glassBg}
            data-ocid={`pricing.stat.card.${i + 1}`}
          >
            <p className="text-slate-400 text-sm">{s.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <Tabs defaultValue="global">
        <TabsList className="bg-white/5 border border-white/10">
          {["global", "agent", "destination", "seasonal"].map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              data-ocid={`pricing.${t}.tab`}
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-slate-400 capitalize"
            >
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="global">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">Global Markup Rules</h3>
            <Button
              size="sm"
              style={{ background: "#F97316" }}
              className="text-white"
              onClick={() => setShowAdd(!showAdd)}
              data-ocid="pricing.global.open_modal_button"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Rule
            </Button>
          </div>
          {showAdd && (
            <div
              className="rounded-xl p-4 mb-4 grid grid-cols-3 gap-3"
              style={glassBg}
            >
              <div>
                <Label className="text-slate-400 text-xs">Service Type</Label>
                <Select>
                  <SelectTrigger
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    data-ocid="pricing.global.type.select"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-400 text-xs">Markup %</Label>
                <Input
                  className="mt-1 bg-white/5 border-white/10 text-white"
                  placeholder="e.g. 15"
                  data-ocid="pricing.global.markup.input"
                />
              </div>
              <div className="flex items-end">
                <Button
                  className="w-full bg-green-600 text-white"
                  data-ocid="pricing.global.save.button"
                  onClick={() => setShowAdd(false)}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
          <RuleTable rules={GLOBAL_RULES} ocidPrefix="pricing.global" />
        </TabsContent>
        <TabsContent value="agent">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">Agent-Specific Markup</h3>
            <Button
              size="sm"
              style={{ background: "#3B82F6" }}
              className="text-white"
              data-ocid="pricing.agent.open_modal_button"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Rule
            </Button>
          </div>
          <RuleTable rules={AGENT_RULES} ocidPrefix="pricing.agent" />
        </TabsContent>
        <TabsContent value="destination">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">
              Destination Markup Rules
            </h3>
            <Button
              size="sm"
              style={{ background: "#8B5CF6" }}
              className="text-white"
              data-ocid="pricing.destination.open_modal_button"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Rule
            </Button>
          </div>
          <RuleTable
            rules={DESTINATION_RULES}
            ocidPrefix="pricing.destination"
          />
        </TabsContent>
        <TabsContent value="seasonal">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">
              Seasonal &amp; Promotional Pricing
            </h3>
            <Button
              size="sm"
              style={{ background: "#10B981" }}
              className="text-white"
              data-ocid="pricing.seasonal.open_modal_button"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Rule
            </Button>
          </div>
          <RuleTable rules={SEASONAL_RULES} ocidPrefix="pricing.seasonal" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
