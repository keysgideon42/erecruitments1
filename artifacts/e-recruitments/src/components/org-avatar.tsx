import { useState } from "react";

const ORG_COLORS = [
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-teal-600",
  "bg-emerald-600",
  "bg-cyan-600",
  "bg-rose-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-sky-600",
];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return ORG_COLORS[Math.abs(hash) % ORG_COLORS.length];
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

interface OrgAvatarProps {
  name: string;
  logoUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function OrgAvatar({ name, logoUrl, size = "md", className = "" }: OrgAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-base",
    lg: "w-16 h-16 text-lg",
  };

  const color = getColor(name);
  const initials = getInitials(name);
  const base = `${sizeClasses[size]} rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0 ${color} ${className}`;

  if (logoUrl && !imgError) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl border border-slate-100 bg-white p-1 shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden ${className}`}>
        <img
          src={logoUrl}
          alt={name}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={base}>
      {initials}
    </div>
  );
}
