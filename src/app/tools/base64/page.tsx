"use client";

import { useState } from "react";
import { Base64Icon } from "@/components/icons";

type Mode = "encode" | "decode";

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const process = () => {
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Please enter some text");
      return;
    }

    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError(mode === "encode" ? "Failed to encode" : "Invalid Base64 string");
    }
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Base64Icon className="w-8 h-8" />
        Base64 Encoder/Decoder
      </h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === "encode"
              ? "bg-primary text-white"
              : "bg-card border border-card-border hover:border-primary"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === "decode"
              ? "bg-primary text-white"
              : "bg-card border border-card-border hover:border-primary"
          }`}
        >
          Decode
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text..." : "Enter Base64 string..."}
            rows={6}
            className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={process}
            className="flex-1 px-4 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
          >
            {mode === "encode" ? "Encode" : "Decode"}
          </button>
          {output && (
            <button
              onClick={swap}
              className="px-4 py-3 bg-card border border-card-border rounded-lg hover:border-primary transition-colors"
            >
              ↕️ Swap
            </button>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Result</label>
              <button
                onClick={copyOutput}
                className="text-sm text-primary hover:underline"
              >
                Copy
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              rows={6}
              className="w-full px-4 py-2 bg-card border border-card-border rounded-lg resize-none text-green-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
