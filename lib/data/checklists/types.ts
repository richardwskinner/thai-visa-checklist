export interface ChecklistItem {
  text: string;
  required?: boolean;
  noteLink?: string;
  noteUrl?: string;
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
