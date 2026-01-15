"use client";

import { useState } from "react";
import { JSONIcon } from "@/components/icons";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const format = () => {
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Please enter JSON");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const minify = () => {
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Please enter JSON");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const validate = () => {
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Please enter JSON");
      return;
    }

    try {
      JSON.parse(input);
      setOutput("✓ Valid JSON");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <JSONIcon className="w-8 h-8" />
        JSON Formatter
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            rows={10}
            className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Indent:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="px-3 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={format}
            className="px-4 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
          >
            Format
          </button>
          <button
            onClick={minify}
            className="px-4 py-3 bg-card border border-card-border rounded-lg hover:border-primary transition-colors"
          >
            Minify
          </button>
          <button
            onClick={validate}
            className="px-4 py-3 bg-card border border-card-border rounded-lg hover:border-primary transition-colors"
          >
            Validate
          </button>
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
              {output !== "✓ Valid JSON" && (
                <button
                  onClick={copyOutput}
                  className="text-sm text-primary hover:underline"
                >
                  Copy
                </button>
              )}
            </div>
            {output === "✓ Valid JSON" ? (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
                {output}
              </div>
            ) : (
              <textarea
                value={output}
                readOnly
                rows={10}
                className="w-full px-4 py-2 bg-card border border-card-border rounded-lg resize-none text-green-400"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
