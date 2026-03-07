"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { allowPrintWithEmailGate } from "@/lib/print-email-gate";
import { checklistActionButtonClass } from "@/lib/checklist-toolbar-styles";

type ChecklistPrintMenuProps = {
  source: string;
  tone: "pink" | "blue";
  onPrint: () => void;
  className?: string;
};

const toneClasses = {
  pink: "bg-pink-600 hover:bg-pink-700",
  blue: "bg-blue-700 hover:bg-blue-800",
} as const;

export default function ChecklistPrintMenu({
  source,
  tone,
  onPrint,
  className,
}: ChecklistPrintMenuProps) {
  const handleOpenPrintDialog = async () => {
    const allowed = await allowPrintWithEmailGate(source);
    if (!allowed) return;
    onPrint();
    window.print();
  };

  return (
    <Button className={cn(checklistActionButtonClass, toneClasses[tone], className)} onClick={() => void handleOpenPrintDialog()}>
      <Printer className="mr-2 h-4 w-4" /> Print
    </Button>
  );
}
