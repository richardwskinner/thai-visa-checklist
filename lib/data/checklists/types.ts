export interface ChecklistItem {
  text: string;
  subItems?: string[];
  required?: boolean;
  noteLink?: string;
  noteUrl?: string;
  financialMethods?: Array<"bank" | "thai-income" | "foreign-income" | "monthly-income" | "combination">;
}

export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export interface ChecklistData {
  title: string;
  subtitle: string;
  sections: ChecklistSection[];
  tips: string[];
  lastUpdated?: string;
  id?: string;
}
