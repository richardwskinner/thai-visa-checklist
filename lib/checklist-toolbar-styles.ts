export const checklistBackButtonClass =
  "h-10 justify-start rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 hover:bg-slate-50 sm:h-11";

export const checklistActionButtonClass =
  "h-10 flex-1 basis-0 rounded-2xl bg-white px-3 text-sm hover:bg-slate-50 sm:h-11 sm:flex-none sm:basis-auto sm:px-4";

export const checklistTextSizeGroupClass =
  "order-2 basis-full h-10 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm sm:order-none sm:h-11 sm:basis-auto";

export function checklistTextSizeButtonClass(selected: boolean, tone: "pink" | "blue") {
  if (selected) {
    return tone === "pink"
      ? "rounded-lg px-2.5 py-1 text-sm font-medium transition capitalize bg-pink-600 text-white"
      : "rounded-lg px-2.5 py-1 text-sm font-medium transition capitalize bg-blue-700 text-white";
  }
  return "rounded-lg px-2.5 py-1 text-sm font-medium transition capitalize bg-slate-100 text-slate-700 hover:bg-slate-200";
}
