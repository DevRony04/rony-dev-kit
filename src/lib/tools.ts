export interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const tools: Tool[] = [
  {
    name: "JWT Tools",
    slug: "jwt",
    description: "Generate, decode, and verify JWT tokens",
    icon: "jwt",
  },
  {
    name: "UUID Generator",
    slug: "uuid",
    description: "Generate UUIDs in various formats",
    icon: "uuid",
  },
  {
    name: "Base64",
    slug: "base64",
    description: "Encode and decode Base64 strings",
    icon: "base64",
  },
  {
    name: "Hash Generator",
    slug: "hash",
    description: "Generate MD5, SHA-1, SHA-256 hashes",
    icon: "hash",
  },
  {
    name: "JSON Formatter",
    slug: "json",
    description: "Format, validate, and minify JSON",
    icon: "json",
  },
  {
    name: "Password Generator",
    slug: "password",
    description: "Generate secure random passwords",
    icon: "password",
  },
];
