"use client";

import { useState, useEffect } from "react";
import * as jose from "jose";
import { JWTIcon } from "@/components/icons";

type Tab = "generate" | "decode";

export default function JWTTools() {
  const [activeTab, setActiveTab] = useState<Tab>("generate");

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <JWTIcon className="w-8 h-8" />
        JWT Tools
      </h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("generate")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "generate"
              ? "bg-primary text-white"
              : "bg-card border border-card-border hover:border-primary"
          }`}
        >
          Generate
        </button>
        <button
          onClick={() => setActiveTab("decode")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "decode"
              ? "bg-primary text-white"
              : "bg-card border border-card-border hover:border-primary"
          }`}
        >
          Decode
        </button>
      </div>

      {activeTab === "generate" && <GenerateJWT />}
      {activeTab === "decode" && <DecodeJWT />}
    </div>
  );
}

function GenerateJWT() {
  const [secret, setSecret] = useState("");
  const [payload, setPayload] = useState(
    JSON.stringify({ sub: "1234567890", name: "John Doe", iat: 0 }, null, 2)
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setPayload(
        JSON.stringify({ sub: "1234567890", name: "John Doe", iat: Math.floor(Date.now() / 1000) }, null, 2)
      );
    }, 0);
    return () => clearTimeout(t);
  }, []);
  const [algorithm, setAlgorithm] = useState("HS256");
  const [expiresIn, setExpiresIn] = useState("1h");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const generateSecret = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const newSecret = Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
    setSecret(newSecret);
  };

  const generateToken = async () => {
    setError("");
    setToken("");

    if (!secret) {
      setError("Please enter or generate a secret");
      return;
    }

    try {
      const parsedPayload = JSON.parse(payload);
      const secretKey = new TextEncoder().encode(secret);

      const jwt = await new jose.SignJWT(parsedPayload)
        .setProtectedHeader({ alg: algorithm })
        .setExpirationTime(expiresIn)
        .sign(secretKey);

      setToken(jwt);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate token");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Secret Key</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter your secret key"
            className="flex-1 px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary"
          />
          <button
            onClick={generateSecret}
            className="px-4 py-2 bg-card border border-card-border rounded-lg hover:border-primary transition-colors"
          >
            Generate
          </button>
          {secret && (
            <button
              onClick={() => copyToClipboard(secret)}
              className="px-4 py-2 bg-card border border-card-border rounded-lg hover:border-primary transition-colors"
            >
              Copy
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Algorithm</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="HS256">HS256</option>
            <option value="HS384">HS384</option>
            <option value="HS512">HS512</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Expires In</label>
          <select
            value={expiresIn}
            onChange={(e) => setExpiresIn(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="15m">15 minutes</option>
            <option value="1h">1 hour</option>
            <option value="24h">24 hours</option>
            <option value="7d">7 days</option>
            <option value="30d">30 days</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Payload (JSON)</label>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          rows={6}
          className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <button
        onClick={generateToken}
        className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
      >
        Generate JWT
      </button>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {token && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Generated Token</label>
            <button
              onClick={() => copyToClipboard(token)}
              className="text-sm text-primary hover:underline"
            >
              Copy
            </button>
          </div>
          <textarea
            value={token}
            readOnly
            rows={4}
            className="w-full px-4 py-2 bg-card border border-card-border rounded-lg resize-none text-green-400"
          />
        </div>
      )}
    </div>
  );
}

function DecodeJWT() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<{ header: object; payload: object } | null>(null);
  const [error, setError] = useState("");

  const decodeToken = () => {
    setError("");
    setDecoded(null);

    if (!token.trim()) {
      setError("Please enter a JWT token");
      return;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format - must have 3 parts separated by dots");
      }

      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

      setDecoded({ header, payload });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to decode token");
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT token here..."
          rows={4}
          className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <button
        onClick={decodeToken}
        className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
      >
        Decode JWT
      </button>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {decoded && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-blue-400">Header</label>
            <pre className="p-4 bg-card border border-card-border rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-purple-400">Payload</label>
            <pre className="p-4 bg-card border border-card-border rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          {decoded.payload && typeof decoded.payload === "object" && (
            <div className="p-4 bg-card border border-card-border rounded-lg space-y-2">
              <h3 className="font-medium mb-3">Token Info</h3>
              {"iat" in decoded.payload && (
                <p className="text-sm">
                  <span className="text-muted">Issued At:</span>{" "}
                  {formatDate(decoded.payload.iat as number)}
                </p>
              )}
              {"exp" in decoded.payload && (
                <p className="text-sm">
                  <span className="text-muted">Expires:</span>{" "}
                  {formatDate(decoded.payload.exp as number)}
                  {(decoded.payload.exp as number) * 1000 < Date.now() && (
                    <span className="ml-2 text-red-400">(Expired)</span>
                  )}
                </p>
              )}
              {"sub" in decoded.payload && (
                <p className="text-sm">
                  <span className="text-muted">Subject:</span> {decoded.payload.sub as string}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
