type ChecklistCustomizedBadgeProps = {
  isCustomized: boolean;
};

export default function ChecklistCustomizedBadge({ isCustomized }: ChecklistCustomizedBadgeProps) {
  if (!isCustomized) return null;

  return (
    <div className="absolute right-3 top-3 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900 sm:right-4 sm:top-4">
      Customised version
    </div>
  );
}
