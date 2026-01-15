"use client";

import { useState } from "react";
import { PasswordIcon } from "@/components/icons";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [history, setHistory] = useState<string[]>([]);

  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  const generate = () => {
    let chars = "";
    if (options.uppercase) chars += charSets.uppercase;
    if (options.lowercase) chars += charSets.lowercase;
    if (options.numbers) chars += charSets.numbers;
    if (options.symbols) chars += charSets.symbols;

    if (!chars) {
      chars = charSets.lowercase;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    const newPassword = Array.from(array, (n) => chars[n % chars.length]).join("");
    setPassword(newPassword);
    setHistory((prev) => [newPassword, ...prev.slice(0, 9)]);
  };

  const copyPassword = (pw: string) => {
    navigator.clipboard.writeText(pw);
  };

  const getStrength = () => {
    if (!password) return { label: "", color: "", width: "0%" };

    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "25%" };
    if (score <= 4) return { label: "Medium", color: "bg-yellow-500", width: "50%" };
    if (score <= 5) return { label: "Strong", color: "bg-green-500", width: "75%" };
    return { label: "Very Strong", color: "bg-green-400", width: "100%" };
  };

  const strength = getStrength();

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <PasswordIcon className="w-8 h-8" />
        Password Generator
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Length: {length}</label>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>8</span>
            <span>64</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(options) as (keyof typeof options)[]).map((key) => (
            <label
              key={key}
              className="flex items-center gap-3 px-4 py-3 bg-card border border-card-border rounded-lg cursor-pointer hover:border-primary transition-colors"
            >
              <input
                type="checkbox"
                checked={options[key]}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                className="w-4 h-4 accent-primary"
              />
              <span className="capitalize">{key}</span>
              <span className="text-muted text-sm ml-auto">
                {key === "uppercase" && "A-Z"}
                {key === "lowercase" && "a-z"}
                {key === "numbers" && "0-9"}
                {key === "symbols" && "!@#$"}
              </span>
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
        >
          Generate Password
        </button>

        {password && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Password</label>
              <button
                onClick={() => copyPassword(password)}
                className="text-sm text-primary hover:underline"
              >
                Copy
              </button>
            </div>
            <div className="px-4 py-3 bg-card border border-card-border rounded-lg">
              <code className="text-green-400 break-all">{password}</code>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted">Strength</span>
                <span>{strength.label}</span>
              </div>
              <div className="h-2 bg-card-border rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all`}
                  style={{ width: strength.width }}
                />
              </div>
            </div>
          </div>
        )}

        {history.length > 1 && (
          <div>
            <label className="block text-sm font-medium mb-2 text-muted">History</label>
            <div className="space-y-2">
              {history.slice(1).map((pw, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 bg-card border border-card-border rounded-lg"
                >
                  <code className="text-sm text-muted truncate flex-1 mr-4">{pw}</code>
                  <button
                    onClick={() => copyPassword(pw)}
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
