import { Eye } from "lucide-react";

export default function ExampleLink({
  href,
  label = "Example",
  className = "",
  onClick,
}: {
  href: string;
  label?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 bg-gradient-to-b from-white to-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition hover:border-slate-400 hover:from-slate-50 hover:to-slate-100 hover:text-slate-900 print:hidden ${className}`}
    >
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-slate-600">
        <Eye className="h-3 w-3" />
      </span>
      {label}
    </a>
  );
}
