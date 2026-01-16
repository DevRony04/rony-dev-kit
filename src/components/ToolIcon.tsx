import { JWTIcon, UUIDIcon, Base64Icon, HashIcon, JSONIcon, PasswordIcon, RegexIcon, SchemaIcon, TimestampIcon } from "./icons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  jwt: JWTIcon,
  uuid: UUIDIcon,
  base64: Base64Icon,
  hash: HashIcon,
  json: JSONIcon,
  password: PasswordIcon,
  regex: RegexIcon,
  schema: SchemaIcon,
  timestamp: TimestampIcon,
};

export function ToolIcon({ icon, className = "w-6 h-6" }: { icon: string; className?: string }) {
  const IconComponent = iconMap[icon];
  
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  
  return <span className={className}>🔧</span>;
}
