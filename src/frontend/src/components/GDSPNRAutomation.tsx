import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Copy,
  Download,
  HelpCircle,
  Plus,
  RefreshCw,
  Send,
  Terminal,
  Ticket,
  User,
  X,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

type GDSSystem = "Amadeus" | "Sabre";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "info";
  content: string;
  timestamp: string;
}

interface PNRData {
  segments: {
    flight: string;
    class: string;
    date: string;
    route: string;
    status: string;
  }[];
  passengers: string[];
  contact: string;
  ticketDeadline: string;
  status: "building" | "complete" | "issued";
  pnrCode: string;
}

const CMD_HELP: Record<string, string> = {
  SS: "Sell segment: SS {airline}{flight} {class} {date} {origin}{dest}",
  NM: "Add passenger name: NM1 {LASTNAME}/{FIRSTNAME}",
  AP: "Add contact: AP {city} {phone}",
  TKTL: "Ticket time limit: TKTL{date}",
  ER: "End and save PNR",
  TTP: "Issue ticket (ticketing)",
  CN: "Cancel segment or PNR",
  HELP: "Show available commands",
};

function getTimestamp() {
  return new Date().toLocaleTimeString("en-IN", { hour12: false });
}

function processSabreCommand(cmd: string): string {
  const upper = cmd.trim().toUpperCase();
  if (upper.startsWith("0") || upper.match(/^\d+[A-Z]/))
    return "OK - SEGMENT SOLD";
  if (upper.startsWith("-")) return "NAME ADDED";
  if (upper.startsWith("9")) return "CONTACT ADDED";
  if (upper.startsWith("T") && upper.includes("TAW"))
    return "TICKET TIME LIMIT SET";
  if (upper === "ER")
    return `PNR SAVED - ${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  if (upper === "TTP") return "TICKET ISSUED SUCCESSFULLY";
  if (upper.startsWith("XE")) return "SEGMENT CANCELLED";
  return "COMMAND PROCESSED";
}

function processAmadeusCommand(
  cmd: string,
  pnr: PNRData,
  setPnr: (p: PNRData) => void,
): string {
  const upper = cmd.trim().toUpperCase();

  if (upper.startsWith("SS")) {
    // Parse: SS MU564 Y 10APR DELPVG
    const match = upper.match(
      /SS\s+([A-Z0-9]+)\s+([A-Z])\s+(\d+[A-Z]+)\s+([A-Z]{6})/,
    );
    if (match) {
      const [, flightNum, cls, date, route] = match;
      const seg = {
        flight: flightNum,
        class: cls,
        date,
        route: `${route.slice(0, 3)} → ${route.slice(3)}`,
        status: "HK1",
      };
      setPnr({ ...pnr, segments: [...pnr.segments, seg] });
      return `OK - SEGMENT CONFIRMED HK1 | ${flightNum} ${cls} ${date} ${route.slice(0, 3)}→${route.slice(3)}`;
    }
    return "OK - SEGMENT CONFIRMED HK1";
  }

  if (upper.startsWith("NM")) {
    const namePart = cmd.slice(2).trim();
    const cleanName = namePart.replace(/^\d+/, "").trim();
    setPnr({ ...pnr, passengers: [...pnr.passengers, cleanName] });
    return `NAME ADDED: ${cleanName}`;
  }

  if (upper.startsWith("AP")) {
    const contact = cmd.slice(2).trim();
    setPnr({ ...pnr, contact });
    return `CONTACT ADDED: ${contact}`;
  }

  if (upper.startsWith("TKTL")) {
    const deadline = cmd.slice(4).trim();
    setPnr({ ...pnr, ticketDeadline: deadline });
    return `TICKET TIME LIMIT SET: ${deadline}`;
  }

  if (upper === "ER") {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    setPnr({ ...pnr, status: "complete", pnrCode: code });
    return `END OF TRANSACTION - PNR SAVED: ${code}`;
  }

  if (upper === "TTP") {
    setPnr({ ...pnr, status: "issued" });
    return "TICKET(S) ISSUED SUCCESSFULLY — E-TICKET GENERATED";
  }

  if (upper.startsWith("CN") || upper.startsWith("XI")) {
    return "SEGMENT/PNR CANCELLED";
  }

  if (upper === "HELP") {
    return Object.entries(CMD_HELP)
      .map(([k, v]) => `${k.padEnd(8)} — ${v}`)
      .join("\n");
  }

  return `PROCESSED: ${upper}`;
}

const QUICK_COMMANDS = [
  { label: "New PNR", icon: Plus, cmd: "" },
  { label: "Add Pax", icon: User, cmd: "NM1 SHARMA/RAHUL MR" },
  { label: "Sell Segment", icon: Zap, cmd: "SS MU564 Y 10APR DELPVG" },
  { label: "Issue Ticket", icon: Ticket, cmd: "TTP" },
];

const BATCH_SAMPLE = `--- PNR 1 ---
SS MU564 Y 10APR DELPVG
NM1 SHARMA/RAHUL MR
AP DEL +919812345678
TKTL10APR
ER
TTP

--- PNR 2 ---
SS AI302 Y 12APR BOMSIN
NM1 GUPTA/PRIYA MS
AP BOM +919876543210
TKTL12APR
ER
TTP`;

export function GDSPNRAutomation() {
  const [gdsSystem, setGdsSystem] = useState<GDSSystem>("Amadeus");
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 0,
      type: "info",
      content: `FIVESTAR TRAVEL — GDS TERMINAL v2.4 (${"Amadeus"} MODE)`,
      timestamp: getTimestamp(),
    },
    {
      id: 1,
      type: "info",
      content:
        "Type HELP for available commands. Start with: SS MU564 Y 10APR DELPVG",
      timestamp: getTimestamp(),
    },
  ]);
  const [pnr, setPnr] = useState<PNRData>({
    segments: [],
    passengers: [],
    contact: "",
    ticketDeadline: "",
    status: "building",
    pnrCode: "",
  });
  const [batchText, setBatchText] = useState(BATCH_SAMPLE);
  const [batchResults, setBatchResults] = useState<string[]>([]);
  const [batchRunning, setBatchRunning] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  let lineId = lines.length;

  function addLine(type: TerminalLine["type"], content: string) {
    lineId++;
    return { id: lineId, type, content, timestamp: getTimestamp() };
  }

  function handleCommand(cmd?: string) {
    const rawCmd = (cmd ?? input).trim();
    if (!rawCmd) return;

    const newLines: TerminalLine[] = [];
    newLines.push(addLine("input", `> ${rawCmd}`));

    let response: string;
    if (gdsSystem === "Amadeus") {
      response = processAmadeusCommand(rawCmd, pnr, setPnr);
    } else {
      response = processSabreCommand(rawCmd);
    }

    const isError = response.includes("INVALID") || response.includes("ERROR");
    for (const line of response.split("\n")) {
      newLines.push(addLine(isError ? "error" : "output", line));
    }

    setLines((prev) => [...prev, ...newLines]);
    setInput("");
    setTimeout(
      () => terminalEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommand();
    }
  }

  function resetPNR() {
    setPnr({
      segments: [],
      passengers: [],
      contact: "",
      ticketDeadline: "",
      status: "building",
      pnrCode: "",
    });
    setLines([
      addLine(
        "info",
        `FIVESTAR TRAVEL — GDS TERMINAL v2.4 (${gdsSystem} MODE)`,
      ),
      addLine("info", "New PNR session started. Type HELP for commands."),
    ]);
  }

  async function runBatch() {
    setBatchRunning(true);
    setBatchResults([]);
    const pnrBlocks = batchText
      .split(/---\s*PNR\s*\d+\s*---/)
      .filter((b) => b.trim());
    const results: string[] = [];
    for (const block of pnrBlocks) {
      const cmds = block.trim().split("\n").filter(Boolean);
      const pnrResults: string[] = [];
      let batchPnrData: PNRData = {
        segments: [],
        passengers: [],
        contact: "",
        ticketDeadline: "",
        status: "building",
        pnrCode: "",
      };
      for (const cmd of cmds) {
        const resp = processAmadeusCommand(cmd, batchPnrData, (p) => {
          batchPnrData = p;
        });
        pnrResults.push(`  ${cmd} → ${resp.split("\n")[0]}`);
      }
      results.push(
        `PNR ${results.length + 1}: ${batchPnrData.pnrCode || "PENDING"}\n${pnrResults.join("\n")}`,
      );
      await new Promise((r) => setTimeout(r, 300));
    }
    setBatchResults(results);
    setBatchRunning(false);
  }

  function exportPNR() {
    const content = `PNR EXPORT — FIVESTAR TRAVEL\n${"-".repeat(40)}\nPNR Code: ${pnr.pnrCode || "NOT SAVED"}\nStatus: ${pnr.status.toUpperCase()}\n\nSEGMENTS:\n${pnr.segments.map((s) => `  ${s.flight} ${s.class} ${s.date} ${s.route} [${s.status}]`).join("\n")}\n\nPASSENGERS:\n${pnr.passengers.map((p, i) => `  ${i + 1}. ${p}`).join("\n")}\n\nCONTACT: ${pnr.contact}\nTKTL: ${pnr.ticketDeadline}\n\nExported: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pnr-${pnr.pnrCode || "draft"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4" data-ocid="gds.panel">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="font-display font-bold text-foreground text-lg">
              GDS Terminal
            </h2>
            <p className="text-xs text-muted-foreground">
              Amadeus / Sabre style PNR automation
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* GDS Toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden text-xs font-semibold">
            {(["Amadeus", "Sabre"] as GDSSystem[]).map((sys) => (
              <button
                key={sys}
                type="button"
                data-ocid={`gds.${sys.toLowerCase()}.toggle`}
                className={`px-3 py-1.5 transition-colors ${
                  gdsSystem === sys
                    ? "bg-primary text-white"
                    : "bg-card text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setGdsSystem(sys)}
              >
                {sys}
              </button>
            ))}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={resetPNR}
            data-ocid="gds.reset.button"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> New PNR
          </Button>
          <Button size="sm" onClick={exportPNR} data-ocid="gds.export.button">
            <Download className="w-3.5 h-3.5 mr-1" /> Export PNR
          </Button>
        </div>
      </div>

      <Tabs defaultValue="terminal">
        <TabsList data-ocid="gds.tabs">
          <TabsTrigger value="terminal" data-ocid="gds.terminal.tab">
            Terminal
          </TabsTrigger>
          <TabsTrigger value="batch" data-ocid="gds.batch.tab">
            Batch Processor
          </TabsTrigger>
          <TabsTrigger value="commands" data-ocid="gds.commands.tab">
            Command Reference
          </TabsTrigger>
        </TabsList>

        {/* Terminal Tab */}
        <TabsContent value="terminal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Terminal panel */}
            <div className="lg:col-span-2 space-y-3">
              {/* Quick commands */}
              <div className="flex flex-wrap gap-2">
                {QUICK_COMMANDS.map((qc) => (
                  <Button
                    key={qc.label}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    data-ocid={`gds.quick.${qc.label.toLowerCase().replace(" ", "_")}.button`}
                    onClick={() => {
                      if (qc.cmd) {
                        setInput(qc.cmd);
                      } else {
                        resetPNR();
                      }
                    }}
                  >
                    <qc.icon className="w-3 h-3 mr-1" />
                    {qc.label}
                  </Button>
                ))}
              </div>

              {/* Terminal output */}
              <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-gray-400 text-xs font-mono ml-2">
                    GDS Terminal — {gdsSystem}
                  </span>
                  <button
                    type="button"
                    className="ml-auto text-gray-500 hover:text-gray-300 transition-colors"
                    title="Copy all"
                    data-ocid="gds.copy.button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        lines.map((l) => l.content).join("\n"),
                      )
                    }
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <ScrollArea className="h-64">
                  <div className="p-4 font-mono text-xs space-y-0.5">
                    {lines.map((line) => (
                      <div
                        key={line.id}
                        className={`leading-relaxed ${
                          line.type === "input"
                            ? "text-cyan-400"
                            : line.type === "error"
                              ? "text-red-400"
                              : line.type === "info"
                                ? "text-yellow-400"
                                : "text-green-300"
                        }`}
                      >
                        <span className="text-gray-600 mr-2">
                          [{line.timestamp}]
                        </span>
                        {line.content}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/60 border-t border-gray-800">
                  <span className="text-cyan-400 font-mono text-sm font-bold">
                    &gt;
                  </span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      gdsSystem === "Amadeus"
                        ? "SS MU564 Y 10APR DELPVG"
                        : "0MU564Y10APR.DEL"
                    }
                    className="flex-1 bg-transparent font-mono text-sm text-white placeholder-gray-600 outline-none"
                    data-ocid="gds.command.input"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-500 h-7 px-3"
                    onClick={() => handleCommand()}
                    data-ocid="gds.send.button"
                  >
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* PNR Preview panel */}
            <div className="space-y-3">
              <Card className="bg-card/60 border-border">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm flex items-center justify-between">
                    PNR Preview
                    <Badge
                      className={`text-[10px] ${
                        pnr.status === "issued"
                          ? "bg-green-500/15 text-green-400 border-green-500/30"
                          : pnr.status === "complete"
                            ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                            : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      {pnr.status === "issued"
                        ? "TICKETED"
                        : pnr.status === "complete"
                          ? "SAVED"
                          : "BUILDING"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3 text-xs">
                  {pnr.pnrCode && (
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-2 text-center">
                      <p className="text-muted-foreground text-[10px]">
                        PNR Code
                      </p>
                      <p className="font-mono font-bold text-primary text-base">
                        {pnr.pnrCode}
                      </p>
                    </div>
                  )}

                  {/* Segments */}
                  <div>
                    <p className="text-muted-foreground font-semibold mb-1 uppercase tracking-wide text-[10px]">
                      Segments
                    </p>
                    {pnr.segments.length === 0 ? (
                      <p className="text-muted-foreground/50 italic">
                        No segments yet
                      </p>
                    ) : (
                      pnr.segments.map((seg) => (
                        <div
                          key={seg.flight + seg.date}
                          className="bg-muted/40 rounded p-1.5 mb-1"
                        >
                          <span className="font-mono text-foreground">
                            {seg.flight}
                          </span>
                          <span className="text-muted-foreground mx-1">/</span>
                          <span className="text-blue-400">{seg.class}</span>
                          <span className="text-muted-foreground mx-1">
                            {seg.date}
                          </span>
                          <span className="text-green-400">{seg.route}</span>
                          <Badge className="ml-1 text-[9px] h-4 bg-green-500/15 text-green-400 border-green-500/30">
                            {seg.status}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Passengers */}
                  <div>
                    <p className="text-muted-foreground font-semibold mb-1 uppercase tracking-wide text-[10px]">
                      Passengers
                    </p>
                    {pnr.passengers.length === 0 ? (
                      <p className="text-muted-foreground/50 italic">
                        No passengers yet
                      </p>
                    ) : (
                      pnr.passengers.map((p) => (
                        <div
                          key={p}
                          className="flex items-center gap-1 text-foreground"
                        >
                          <User className="w-3 h-3 text-muted-foreground" />
                          {p}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Contact & Deadline */}
                  {pnr.contact && (
                    <div>
                      <p className="text-muted-foreground font-semibold uppercase tracking-wide text-[10px]">
                        Contact
                      </p>
                      <p className="text-foreground font-mono">{pnr.contact}</p>
                    </div>
                  )}
                  {pnr.ticketDeadline && (
                    <div>
                      <p className="text-muted-foreground font-semibold uppercase tracking-wide text-[10px]">
                        Ticket Deadline
                      </p>
                      <p className="text-orange-400 font-mono">
                        {pnr.ticketDeadline}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {pnr.status === "complete" && (
                    <Button
                      size="sm"
                      className="w-full bg-green-600 hover:bg-green-500 text-xs mt-2"
                      onClick={() => handleCommand("TTP")}
                      data-ocid="gds.issue_ticket.button"
                    >
                      <Ticket className="w-3 h-3 mr-1" /> Issue Ticket
                    </Button>
                  )}
                  {pnr.status === "issued" && (
                    <div className="flex items-center gap-1 text-green-400 font-semibold">
                      <CheckCircle className="w-4 h-4" /> E-Ticket Generated
                    </div>
                  )}
                  {pnr.segments.length > 0 && pnr.status === "building" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => handleCommand("ER")}
                      data-ocid="gds.save_pnr.button"
                    >
                      Save PNR (ER)
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Batch Processor Tab */}
        <TabsContent value="batch">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">Paste Multiple PNRs</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <Textarea
                    value={batchText}
                    onChange={(e) => setBatchText(e.target.value)}
                    className="font-mono text-xs h-72 bg-gray-950 text-green-300 border-gray-700 resize-none"
                    placeholder={BATCH_SAMPLE}
                    data-ocid="gds.batch.textarea"
                  />
                  <Button
                    className="w-full mt-3"
                    onClick={runBatch}
                    disabled={batchRunning}
                    data-ocid="gds.batch.submit_button"
                  >
                    {batchRunning ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" /> Process All PNRs
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="h-full">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">Batch Results</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  {batchResults.length === 0 ? (
                    <div
                      className="flex flex-col items-center justify-center h-48 text-muted-foreground text-sm"
                      data-ocid="gds.batch.empty_state"
                    >
                      <Terminal className="w-8 h-8 mb-2 opacity-30" />
                      <p>Results will appear here</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-72">
                      <div className="space-y-3">
                        {batchResults.map((result, i) => (
                          <div
                            key={result.slice(0, 15) + String(i)}
                            className="bg-muted/40 rounded-lg p-3 font-mono text-xs"
                            data-ocid={`gds.batch.item.${i + 1}`}
                          >
                            {result.split("\n").map((line, j) => (
                              <div
                                key={j === 0 ? `header-${line}` : line}
                                className={
                                  j === 0
                                    ? "text-primary font-bold mb-1"
                                    : "text-muted-foreground"
                                }
                              >
                                {line}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Command Reference Tab */}
        <TabsContent value="commands">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(CMD_HELP).map(([cmd, desc]) => (
              <Card
                key={cmd}
                className="bg-card/60 hover:bg-card transition-colors cursor-pointer"
                onClick={() => setInput(`${cmd} `)}
                data-ocid={`gds.cmd.${cmd.toLowerCase()}.card`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded text-sm flex-shrink-0 min-w-[3rem] text-center">
                      {cmd}
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{desc}</p>
                      {cmd !== "HELP" && (
                        <button
                          type="button"
                          className="text-xs text-primary hover:underline mt-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInput(`${cmd} `);
                          }}
                          data-ocid={`gds.cmd.${cmd.toLowerCase()}.button`}
                        >
                          Use command →
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Syntax Examples */}
          <Card className="mt-4">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-400" />
                Full PNR Example ({gdsSystem})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <pre className="bg-gray-950 text-green-300 font-mono text-xs p-4 rounded-lg overflow-x-auto">
                {gdsSystem === "Amadeus"
                  ? "SS MU564 Y 10APR DELPVG\nNM1 SHARMA/RAHUL MR\nAP DEL +919812345678\nTKTL10APR\nER\n> END OF TRANSACTION - PNR SAVED: 7FVQBD\nTTP\n> TICKET ISSUED: 781-1234567890"
                  : "0MU564Y10APR.DEL\n-SHARMA/RAHUL MR\n9-+919812345678\nT-TAW/10APR\nER\n> PNR SAVED: K9XMPL\nTTP\n> TICKET ISSUED"}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
