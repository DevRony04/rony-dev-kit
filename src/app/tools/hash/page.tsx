"use client";

import { useState } from "react";
import { HashIcon } from "@/components/icons";

type Algorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<Algorithm, string>>({
    "SHA-1": "",
    "SHA-256": "",
    "SHA-384": "",
    "SHA-512": "",
  });

  const algorithms: Algorithm[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

  const generateHashes = async () => {
    if (!input) {
      setHashes({ "SHA-1": "", "SHA-256": "", "SHA-384": "", "SHA-512": "" });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const results: Record<Algorithm, string> = {
      "SHA-1": "",
      "SHA-256": "",
      "SHA-384": "",
      "SHA-512": "",
    };

    for (const algo of algorithms) {
      const hashBuffer = await crypto.subtle.digest(algo, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      results[algo] = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    setHashes(results);
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <HashIcon className="w-8 h-8" />
        Hash Generator
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            rows={4}
            className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <button
          onClick={generateHashes}
          className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
        >
          Generate Hashes
        </button>

        {Object.values(hashes).some((h) => h) && (
          <div className="space-y-3">
            {algorithms.map((algo) => (
              <div key={algo}>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-muted">{algo}</label>
                  <button
                    onClick={() => copyHash(hashes[algo])}
                    className="text-sm text-primary hover:underline"
                  >
                    Copy
                  </button>
                </div>
                <div className="px-4 py-2 bg-card border border-card-border rounded-lg">
                  <code className="text-green-400 text-sm break-all">{hashes[algo]}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
