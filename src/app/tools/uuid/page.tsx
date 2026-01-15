"use client";

import { useState } from "react";
import { UUIDIcon } from "@/components/icons";

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState<"default" | "uppercase" | "no-dashes">("default");

  const generateUUID = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      let uuid = crypto.randomUUID();
      if (format === "uppercase") {
        uuid = uuid.toUpperCase();
      } else if (format === "no-dashes") {
        uuid = uuid.replace(/-/g, "");
      }
      newUuids.push(uuid);
    }
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  const copyOne = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <UUIDIcon className="w-8 h-8" />
        UUID Generator
      </h1>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Count</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as typeof format)}
              className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="default">Default (lowercase)</option>
              <option value="uppercase">UPPERCASE</option>
              <option value="no-dashes">No dashes</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateUUID}
          className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
        >
          Generate UUID{count > 1 ? "s" : ""}
        </button>

        {uuids.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Generated UUIDs</label>
              <button
                onClick={copyAll}
                className="text-sm text-primary hover:underline"
              >
                Copy All
              </button>
            </div>
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 bg-card border border-card-border rounded-lg"
                >
                  <code className="text-green-400">{uuid}</code>
                  <button
                    onClick={() => copyOne(uuid)}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
