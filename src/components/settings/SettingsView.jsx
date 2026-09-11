import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Globe, Clock, Bell, Check } from "lucide-react";

function SettingRow({ label, hint, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <Label className="text-[13px] text-foreground">{label}</Label>
        {hint && <p className="mt-0.5 text-[11px] text-fg-secondary">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

// Settings module — crawl configuration, schedule, and alert preferences.
export default function SettingsView() {
  const [domain, setDomain] = useState("example.com");
  const [maxDepth, setMaxDepth] = useState([5]);
  const [maxPages, setMaxPages] = useState("5000");
  const [followParams, setFollowParams] = useState(true);
  const [respectRobots, setRespectRobots] = useState(true);
  const [userAgent, setUserAgent] = useState("strata-bot");
  const [frequency, setFrequency] = useState("weekly");
  const [autoCrawl, setAutoCrawl] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [severity, setSeverity] = useState("high");
  const [webhook, setWebhook] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-4 py-5 lg:px-6 lg:py-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="eyebrow">Settings</div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">Crawl configuration &amp; preferences</h2>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--border-hover)]"
          style={saved ? { borderColor: "var(--success)", color: "var(--success)" } : {}}
        >
          {saved ? <><Check className="h-4 w-4" /> Saved</> : "Save changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Left: Crawl Config + Schedule */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="surface p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <Globe className="h-4 w-4" style={{ color: "var(--accent-brand)" }} />
              <span className="eyebrow">Crawl Configuration</span>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <Label className="text-[13px] text-foreground">Target Domain</Label>
                <Input value={domain} onChange={(e) => setDomain(e.target.value)} className="mt-1.5 font-mono text-sm" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-[13px] text-foreground">Max Crawl Depth</Label>
                  <span className="tabular font-mono text-[11px] text-fg-secondary">{maxDepth[0]} levels</span>
                </div>
                <Slider value={maxDepth} onValueChange={setMaxDepth} max={10} min={1} step={1} className="mt-3" />
              </div>
              <div>
                <Label className="text-[13px] text-foreground">Max Pages per Crawl</Label>
                <Input type="number" value={maxPages} onChange={(e) => setMaxPages(e.target.value)} className="mt-1.5 font-mono text-sm" />
              </div>
              <Separator />
              <SettingRow label="Follow query parameters" hint="Crawl URLs with ?utm_source, ?page, etc.">
                <Switch checked={followParams} onCheckedChange={setFollowParams} />
              </SettingRow>
              <SettingRow label="Respect robots.txt" hint="Honor disallow directives">
                <Switch checked={respectRobots} onCheckedChange={setRespectRobots} />
              </SettingRow>
              <div>
                <Label className="text-[13px] text-foreground">Crawler User Agent</Label>
                <Select value={userAgent} onValueChange={setUserAgent}>
                  <SelectTrigger className="mt-1.5 font-mono text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strata-bot">strata-bot/1.0</SelectItem>
                    <SelectItem value="googlebot">Googlebot (simulate)</SelectItem>
                    <SelectItem value="bingbot">Bingbot (simulate)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
            className="surface p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" style={{ color: "var(--accent-brand)" }} />
              <span className="eyebrow">Crawl Schedule</span>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <Label className="text-[13px] text-foreground">Crawl Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="mt-1.5 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="manual">Manual only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <SettingRow label="Auto-crawl on schedule" hint="Run crawls automatically without manual trigger">
                <Switch checked={autoCrawl} onCheckedChange={setAutoCrawl} />
              </SettingRow>
              {autoCrawl && frequency !== "manual" && (
                <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-0)] px-3 py-2.5">
                  <div className="eyebrow">Next Scheduled Crawl</div>
                  <div className="mt-1 font-mono text-xs text-foreground">
                    {frequency === "daily" ? "Tomorrow" : frequency === "weekly" ? "Mon, Sep 15" : "Oct 1, 2026"} · 03:00 UTC
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right: Alert Preferences + Project Info */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}
            className="surface p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4" style={{ color: "var(--accent-brand)" }} />
              <span className="eyebrow">Alert Preferences</span>
            </div>
            <div className="flex flex-col gap-4">
              <SettingRow label="Email notifications" hint="Receive alerts when new issues are found">
                <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </SettingRow>
              <div>
                <Label className="text-[13px] text-foreground">Alert Severity Threshold</Label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger className="mt-1.5 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical only</SelectItem>
                    <SelectItem value="high">High &amp; above</SelectItem>
                    <SelectItem value="all">All issues</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[13px] text-foreground">Slack Webhook URL</Label>
                <Input placeholder="https://hooks.slack.com/..." value={webhook} onChange={(e) => setWebhook(e.target.value)} className="mt-1.5 font-mono text-xs" />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="eyebrow mb-3">Project</div>
            <div className="flex flex-col gap-2">
              {[
                { label: "Project", value: "example.com" },
                { label: "Plan", value: "Pro" },
                { label: "Pages crawled", value: "1,842" },
                { label: "Last crawl", value: "Sep 11, 2026" },
                { label: "Crawls this month", value: "3 / 10" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-fg-secondary">{r.label}</span>
                  <span className="tabular text-foreground">{r.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
