"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "space-y-4",
        caption: "relative flex items-center justify-center pt-1",
        caption_label: "px-10 text-sm font-medium",
        nav: "absolute inset-x-0 top-2 flex items-center justify-between px-1",
        button_previous: cn(
          "h-7 w-7 rounded-none border-0 bg-transparent p-0 text-slate-700 shadow-none opacity-60 hover:bg-transparent hover:opacity-100"
        ),
        button_next: cn(
          "h-7 w-7 rounded-none border-0 bg-transparent p-0 text-slate-700 shadow-none opacity-60 hover:bg-transparent hover:opacity-100"
        ),
        month_caption: "mx-auto w-full px-10 text-center text-sm font-medium",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...iconProps }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" {...iconProps} />
          ) : (
            <ChevronRight className="h-4 w-4" {...iconProps} />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }
