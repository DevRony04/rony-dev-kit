"use client";

import { useState } from "react";
import { SchemaIcon } from "@/components/icons";

interface ValidationIssue {
  path: string;
  message: string;
}

interface JsonSchema {
  type?: string | string[];
  properties?: Record<string, JsonSchema>;
  required?: string[];
  additionalProperties?: boolean | JsonSchema;
  items?: JsonSchema;
  enum?: unknown[];
  const?: unknown;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: "email" | "uri" | "date-time";
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  minItems?: number;
  maxItems?: number;
  minProperties?: number;
  maxProperties?: number;
  anyOf?: JsonSchema[];
  allOf?: JsonSchema[];
  oneOf?: JsonSchema[];
}

const DEFAULT_SCHEMA = {
  type: "object",
  required: ["name", "age", "email", "roles"],
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 2 },
    age: { type: "integer", minimum: 18 },
    email: { type: "string", format: "email" },
    roles: {
      type: "array",
      minItems: 1,
      items: {
        type: "string",
        enum: ["admin", "editor", "viewer"],
      },
    },
    address: {
      type: "object",
      required: ["city", "zip"],
      additionalProperties: false,
      properties: {
        city: { type: "string" },
        zip: { type: "string", pattern: "^\\d{5}$" },
      },
    },
  },
};

const DEFAULT_JSON = {
  name: "Ada Lovelace",
  age: 28,
  email: "ada@example.com",
  roles: ["admin"],
  address: {
    city: "London",
    zip: "12345",
  },
};

export default function SchemaValidator() {
  const [schemaInput, setSchemaInput] = useState(
    JSON.stringify(DEFAULT_SCHEMA, null, 2)
  );
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(DEFAULT_JSON, null, 2)
  );
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    setError("");
    setIssues([]);
    setIsValid(false);

    if (!schemaInput.trim() || !jsonInput.trim()) {
      setError("Please provide both a schema and JSON data");
      return;
    }

    try {
      const schema = JSON.parse(schemaInput) as JsonSchema;
      const data = JSON.parse(jsonInput) as unknown;
      const validationIssues = validateAgainstSchema(data, schema);

      if (validationIssues.length === 0) {
        setIsValid(true);
      } else {
        setIssues(validationIssues);
      }
    } catch (parseError) {
      setError(
        parseError instanceof Error
          ? parseError.message
          : "Invalid JSON input"
      );
    }
  };

  const loadDefaults = () => {
    setSchemaInput(JSON.stringify(DEFAULT_SCHEMA, null, 2));
    setJsonInput(JSON.stringify(DEFAULT_JSON, null, 2));
    setError("");
    setIssues([]);
    setIsValid(false);
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <SchemaIcon className="w-8 h-8" />
        JSON Schema Validator
      </h1>

      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              JSON Schema
            </label>
            <textarea
              value={schemaInput}
              onChange={(event) => setSchemaInput(event.target.value)}
              rows={14}
              className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary resize-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">JSON Data</label>
            <textarea
              value={jsonInput}
              onChange={(event) => setJsonInput(event.target.value)}
              rows={14}
              className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary resize-none font-mono text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={validate}
            className="px-4 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
          >
            Validate
          </button>
          <button
            onClick={loadDefaults}
            className="px-4 py-3 bg-card border border-card-border rounded-lg hover:border-primary transition-colors"
          >
            Load Sample
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {isValid && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
            ✓ JSON is valid for this schema
          </div>
        )}

        {issues.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Validation Errors</h2>
              <span className="text-xs text-muted">
                {issues.length} issue{issues.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="space-y-2">
              {issues.map((issue, index) => (
                <div
                  key={`${issue.path}-${index}`}
                  className="px-4 py-2 bg-card border border-card-border rounded-lg"
                >
                  <p className="text-sm text-muted mb-1">{issue.path}</p>
                  <p className="text-sm text-red-400">{issue.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function validateAgainstSchema(value: unknown, schema: JsonSchema): ValidationIssue[] {
  return collectIssues(value, schema, "$");
}

function collectIssues(value: unknown, schema: JsonSchema, path: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (schema.allOf && schema.allOf.length > 0) {
    schema.allOf.forEach((subSchema) => {
      issues.push(...collectIssues(value, subSchema, path));
    });
  }

  if (schema.anyOf && schema.anyOf.length > 0) {
    const matches = schema.anyOf.map((subSchema) =>
      collectIssues(value, subSchema, path)
    );
    if (!matches.some((match) => match.length === 0)) {
      issues.push({
        path,
        message: "Value does not match any of the allowed schemas",
      });
    }
  }

  if (schema.oneOf && schema.oneOf.length > 0) {
    const matchCount = schema.oneOf.filter(
      (subSchema) => collectIssues(value, subSchema, path).length === 0
    ).length;
    if (matchCount !== 1) {
      issues.push({
        path,
        message: "Value must match exactly one schema option",
      });
    }
  }

  if (schema.const !== undefined && value !== schema.const) {
    issues.push({ path, message: `Value must equal ${formatValue(schema.const)}` });
  }

  if (schema.enum && !schema.enum.some((entry) => entry === value)) {
    issues.push({
      path,
      message: `Value must be one of: ${schema.enum.map(formatValue).join(", ")}`,
    });
  }

  if (schema.type) {
    const matchesType = ensureType(value, schema.type);
    if (!matchesType) {
      issues.push({
        path,
        message: `Expected type ${formatType(schema.type)}, got ${describeType(value)}`,
      });
      return issues;
    }
  }

  if (schema.type && matchesSchemaType(schema.type, "object") && isObject(value)) {
    issues.push(...validateObject(value, schema, path));
  }

  if (schema.type && matchesSchemaType(schema.type, "array") && Array.isArray(value)) {
    issues.push(...validateArray(value, schema, path));
  }

  if (schema.type && matchesSchemaType(schema.type, "string") && typeof value === "string") {
    issues.push(...validateString(value, schema, path));
  }

  if (schema.type && matchesSchemaType(schema.type, "number") && typeof value === "number") {
    issues.push(...validateNumber(value, schema, path));
  }

  if (schema.type && matchesSchemaType(schema.type, "integer") && typeof value === "number") {
    issues.push(...validateInteger(value, schema, path));
  }

  return issues;
}

function validateObject(
  value: Record<string, unknown>,
  schema: JsonSchema,
  path: string
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const properties = schema.properties ?? {};
  const required = schema.required ?? [];

  required.forEach((key) => {
    if (!(key in value)) {
      issues.push({
        path: `${path}.${key}`,
        message: "Property is required",
      });
    }
  });

  if (schema.minProperties !== undefined) {
    if (Object.keys(value).length < schema.minProperties) {
      issues.push({
        path,
        message: `Expected at least ${schema.minProperties} properties`,
      });
    }
  }

  if (schema.maxProperties !== undefined) {
    if (Object.keys(value).length > schema.maxProperties) {
      issues.push({
        path,
        message: `Expected at most ${schema.maxProperties} properties`,
      });
    }
  }

  Object.entries(properties).forEach(([key, propertySchema]) => {
    if (key in value) {
      issues.push(
        ...collectIssues(value[key], propertySchema, `${path}.${key}`)
      );
    }
  });

  const allowedKeys = new Set(Object.keys(properties));
  const extraKeys = Object.keys(value).filter((key) => !allowedKeys.has(key));

  if (schema.additionalProperties === false && extraKeys.length > 0) {
    extraKeys.forEach((key) => {
      issues.push({
        path: `${path}.${key}`,
        message: "Additional properties are not allowed",
      });
    });
  }

  if (
    schema.additionalProperties &&
    typeof schema.additionalProperties === "object" &&
    extraKeys.length > 0
  ) {
    extraKeys.forEach((key) => {
      issues.push(
        ...collectIssues(
          value[key],
          schema.additionalProperties as JsonSchema,
          `${path}.${key}`
        )
      );
    });
  }

  return issues;
}

function validateArray(
  value: unknown[],
  schema: JsonSchema,
  path: string
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (schema.minItems !== undefined && value.length < schema.minItems) {
    issues.push({
      path,
      message: `Expected at least ${schema.minItems} items`,
    });
  }

  if (schema.maxItems !== undefined && value.length > schema.maxItems) {
    issues.push({
      path,
      message: `Expected at most ${schema.maxItems} items`,
    });
  }

  if (schema.items) {
    value.forEach((entry, index) => {
      issues.push(...collectIssues(entry, schema.items as JsonSchema, `${path}[${index}]`));
    });
  }

  return issues;
}

function validateString(
  value: string,
  schema: JsonSchema,
  path: string
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (schema.minLength !== undefined && value.length < schema.minLength) {
    issues.push({
      path,
      message: `Expected at least ${schema.minLength} characters`,
    });
  }

  if (schema.maxLength !== undefined && value.length > schema.maxLength) {
    issues.push({
      path,
      message: `Expected at most ${schema.maxLength} characters`,
    });
  }

  if (schema.pattern) {
    try {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value)) {
        issues.push({
          path,
          message: `Value does not match pattern ${schema.pattern}`,
        });
      }
    } catch {
      issues.push({
        path,
        message: `Invalid pattern: ${schema.pattern}`,
      });
    }
  }

  if (schema.format) {
    const formatIssue = validateFormat(value, schema.format, path);
    if (formatIssue) {
      issues.push(formatIssue);
    }
  }

  return issues;
}

function validateNumber(
  value: number,
  schema: JsonSchema,
  path: string
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (schema.minimum !== undefined && value < schema.minimum) {
    issues.push({
      path,
      message: `Value must be >= ${schema.minimum}`,
    });
  }

  if (schema.maximum !== undefined && value > schema.maximum) {
    issues.push({
      path,
      message: `Value must be <= ${schema.maximum}`,
    });
  }

  if (schema.exclusiveMinimum !== undefined && value <= schema.exclusiveMinimum) {
    issues.push({
      path,
      message: `Value must be > ${schema.exclusiveMinimum}`,
    });
  }

  if (schema.exclusiveMaximum !== undefined && value >= schema.exclusiveMaximum) {
    issues.push({
      path,
      message: `Value must be < ${schema.exclusiveMaximum}`,
    });
  }

  if (schema.multipleOf !== undefined && value % schema.multipleOf !== 0) {
    issues.push({
      path,
      message: `Value must be a multiple of ${schema.multipleOf}`,
    });
  }

  return issues;
}

function validateInteger(
  value: number,
  schema: JsonSchema,
  path: string
): ValidationIssue[] {
  if (!Number.isInteger(value)) {
    return [{ path, message: "Value must be an integer" }];
  }

  return validateNumber(value, schema, path);
}

function validateFormat(
  value: string,
  format: "email" | "uri" | "date-time",
  path: string
): ValidationIssue | null {
  if (format === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { path, message: "Value must be a valid email" };
    }
  }

  if (format === "uri") {
    try {
      new URL(value);
    } catch {
      return { path, message: "Value must be a valid URI" };
    }
  }

  if (format === "date-time") {
    if (Number.isNaN(Date.parse(value))) {
      return { path, message: "Value must be a valid date-time string" };
    }
  }

  return null;
}

function ensureType(value: unknown, type: string | string[]): boolean {
  const types = Array.isArray(type) ? type : [type];
  return types.some((entry) => matchesSchemaType(entry, describeType(value)));
}

function matchesSchemaType(type: string | string[], target: string): boolean {
  const types = Array.isArray(type) ? type : [type];
  return types.includes(target);
}

function describeType(value: unknown): string {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return "array";
  }

  if (typeof value === "number") {
    return Number.isInteger(value) ? "integer" : "number";
  }

  return typeof value;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatType(type: string | string[]): string {
  return Array.isArray(type) ? type.join(" | ") : type;
}

function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return `"${value}"`;
  }

  return String(value);
}
