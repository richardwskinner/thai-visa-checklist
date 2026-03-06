"use client";

import { useEffect, useState } from "react";

export type ChecklistCustomItem = {
  id: string;
  text: string;
};

type CustomizationState = {
  hiddenItemKeys: string[];
  customItemsBySection: Record<string, ChecklistCustomItem[]>;
};

const EMPTY_CUSTOMIZATION_STATE: CustomizationState = {
  hiddenItemKeys: [],
  customItemsBySection: {},
};

export function useChecklistCustomization(storageKey: string) {
  const [isCustomizeMode, setIsCustomizeMode] = useState(false);
  const [draftBySection, setDraftBySection] = useState<Record<string, string>>({});
  const [customizationState, setCustomizationState] = useState<CustomizationState>(() => {
    if (typeof window === "undefined") return EMPTY_CUSTOMIZATION_STATE;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return EMPTY_CUSTOMIZATION_STATE;
      const parsed = JSON.parse(raw) as Partial<CustomizationState>;
      return {
        hiddenItemKeys: Array.isArray(parsed.hiddenItemKeys) ? parsed.hiddenItemKeys : [],
        customItemsBySection:
          parsed.customItemsBySection && typeof parsed.customItemsBySection === "object"
            ? (parsed.customItemsBySection as Record<string, ChecklistCustomItem[]>)
            : {},
      };
    } catch {
      return EMPTY_CUSTOMIZATION_STATE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(customizationState));
    } catch {
      // ignore
    }
  }, [storageKey, customizationState]);

  const hideBaseItem = (itemKey: string) => {
    setCustomizationState((prev) => {
      if (prev.hiddenItemKeys.includes(itemKey)) return prev;
      return { ...prev, hiddenItemKeys: [...prev.hiddenItemKeys, itemKey] };
    });
  };

  const addCustomItem = (sectionTitle: string) => {
    const text = (draftBySection[sectionTitle] || "").trim();
    if (!text) return;
    const newItem: ChecklistCustomItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
    };
    setCustomizationState((prev) => ({
      ...prev,
      customItemsBySection: {
        ...prev.customItemsBySection,
        [sectionTitle]: [...(prev.customItemsBySection[sectionTitle] ?? []), newItem],
      },
    }));
    setDraftBySection((prev) => ({ ...prev, [sectionTitle]: "" }));
  };

  const removeCustomItem = (sectionTitle: string, itemId: string) => {
    setCustomizationState((prev) => ({
      ...prev,
      customItemsBySection: {
        ...prev.customItemsBySection,
        [sectionTitle]: (prev.customItemsBySection[sectionTitle] ?? []).filter((item) => item.id !== itemId),
      },
    }));
  };

  const setDraftForSection = (sectionTitle: string, value: string) => {
    setDraftBySection((prev) => ({ ...prev, [sectionTitle]: value }));
  };

  const resetCustomizations = () => {
    setCustomizationState(EMPTY_CUSTOMIZATION_STATE);
    setDraftBySection({});
    setIsCustomizeMode(false);
  };

  return {
    isCustomizeMode,
    setIsCustomizeMode,
    hiddenItemKeys: customizationState.hiddenItemKeys,
    customItemsBySection: customizationState.customItemsBySection,
    draftBySection,
    setDraftForSection,
    hideBaseItem,
    addCustomItem,
    removeCustomItem,
    resetCustomizations,
  };
}
