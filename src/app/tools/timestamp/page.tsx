"use client";

import { useState, useEffect } from "react";
import { TimestampIcon } from "@/components/icons";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateString, setDateString] = useState("");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timezone, setTimezone] = useState("local");

  useEffect(() => {
    const t = setTimeout(() => setCurrentTime(Date.now()), 0);
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  const timestampToDate = (ts: string) => {
    const num = parseInt(ts);
    if (isNaN(num)) return null;
    
    const ms = ts.length <= 10 ? num * 1000 : num;
    const date = new Date(ms);
    
    if (isNaN(date.getTime())) return null;
    return date;
  };

  const formatDate = (date: Date) => {
    if (timezone === "utc") {
      return date.toISOString();
    }
    return date.toLocaleString();
  };

  const handleTimestampChange = (value: string) => {
    setTimestamp(value);
    const date = timestampToDate(value);
    if (date) {
      setDateString(formatDate(date));
    } else {
      setDateString("");
    }
  };

  const handleDateChange = (value: string) => {
    setDateString(value);
    try {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setTimestamp(Math.floor(date.getTime() / 1000).toString());
      }
    } catch {
      // Invalid date
    }
  };

  const setNow = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
    handleTimestampChange(now.toString());
  };

  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const currentDate = new Date(currentTime);
  const currentUnix = Math.floor(currentTime / 1000);

  const presets = [
    { label: "1 hour ago", offset: -3600 },
    { label: "1 day ago", offset: -86400 },
    { label: "1 week ago", offset: -604800 },
    { label: "1 hour later", offset: 3600 },
    { label: "1 day later", offset: 86400 },
    { label: "1 week later", offset: 604800 },
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <TimestampIcon className="w-8 h-8" />
        Timestamp Converter
      </h1>

      <div className="space-y-6">
        {/* Current time display */}
        <div className="p-4 bg-card border border-card-border rounded-lg">
          <div className="text-sm text-muted mb-2">Current Time</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted mb-1">Unix Timestamp</div>
              <div className="flex items-center gap-2">
                <code className="text-xl text-green-400">{currentUnix}</code>
                <button
                  onClick={() => copyValue(currentUnix.toString())}
                  className="text-sm text-primary hover:underline"
                >
                  Copy
                </button>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Human Readable</div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{currentDate.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timezone toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setTimezone("local")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timezone === "local"
                ? "bg-primary text-white"
                : "bg-card border border-card-border hover:border-primary"
            }`}
          >
            Local Time
          </button>
          <button
            onClick={() => setTimezone("utc")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timezone === "utc"
                ? "bg-primary text-white"
                : "bg-card border border-card-border hover:border-primary"
            }`}
          >
            UTC
          </button>
        </div>

        {/* Converter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Unix Timestamp</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={timestamp}
                onChange={(e) => handleTimestampChange(e.target.value)}
                placeholder="e.g., 1699900800"
                className="flex-1 px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary"
              />
              <button
                onClick={setNow}
                className="px-3 py-2 bg-card border border-card-border rounded-lg hover:border-primary transition-colors text-sm"
              >
                Now
              </button>
            </div>
            <p className="text-xs text-muted mt-1">Seconds or milliseconds</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date & Time</label>
            <input
              type="text"
              value={dateString}
              onChange={(e) => handleDateChange(e.target.value)}
              placeholder="e.g., 2024-01-15 12:00:00"
              className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-muted mt-1">ISO 8601 or locale format</p>
          </div>
        </div>

        {/* Presets */}
        <div>
          <label className="block text-sm font-medium mb-2">Quick Presets</label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  const ts = currentUnix + preset.offset;
                  handleTimestampChange(ts.toString());
                }}
                className="px-3 py-1.5 bg-card border border-card-border rounded-lg text-sm hover:border-primary transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Parsed details */}
        {timestamp && timestampToDate(timestamp) && (
          <div className="p-4 bg-card border border-card-border rounded-lg">
            <h3 className="font-medium mb-3">Parsed Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {(() => {
                const date = timestampToDate(timestamp)!;
                return (
                  <>
                    <div>
                      <div className="text-muted">Year</div>
                      <div className="font-mono">{date.getFullYear()}</div>
                    </div>
                    <div>
                      <div className="text-muted">Month</div>
                      <div className="font-mono">{date.toLocaleString("default", { month: "long" })}</div>
                    </div>
                    <div>
                      <div className="text-muted">Day</div>
                      <div className="font-mono">{date.getDate()}</div>
                    </div>
                    <div>
                      <div className="text-muted">Weekday</div>
                      <div className="font-mono">{date.toLocaleString("default", { weekday: "long" })}</div>
                    </div>
                    <div>
                      <div className="text-muted">Hour</div>
                      <div className="font-mono">{date.getHours().toString().padStart(2, "0")}</div>
                    </div>
                    <div>
                      <div className="text-muted">Minute</div>
                      <div className="font-mono">{date.getMinutes().toString().padStart(2, "0")}</div>
                    </div>
                    <div>
                      <div className="text-muted">Second</div>
                      <div className="font-mono">{date.getSeconds().toString().padStart(2, "0")}</div>
                    </div>
                    <div>
                      <div className="text-muted">Timezone</div>
                      <div className="font-mono">{Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
