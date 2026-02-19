// Google Analytics event tracking helpers

type EventParams = Record<string, string | number | boolean | null | undefined>;

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: EventParams
    ) => void;
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: EventParams
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Specific tracking functions for common events
export const analytics = {
  // Track checklist item toggle
  trackChecklistItem: (visaType: string, itemName: string, checked: boolean) => {
    trackEvent('checklist_item_toggle', {
      visa_type: visaType,
      item_name: itemName,
      action: checked ? 'checked' : 'unchecked',
    });
  },

  // Track print button click
  trackPrint: (visaType: string) => {
    trackEvent('print_checklist', {
      visa_type: visaType,
    });
  },

  // Track checklist reset
  trackReset: (visaType: string) => {
    trackEvent('reset_checklist', {
      visa_type: visaType,
    });
  },

  // Track contact form submission
  trackContactSubmit: (success: boolean) => {
    trackEvent('contact_form_submit', {
      success: success,
    });
  },

  // Track calendar export
  trackCalendarExport: (type: 'google' | 'ics') => {
    trackEvent('calendar_export', {
      export_type: type,
    });
  },

  // Track 90-day calculator usage
  trackCalculatorUse: () => {
    trackEvent('90day_calculator_use');
  },

  // Track font size change
  trackFontSizeChange: (size: string, visaType: string) => {
    trackEvent('font_size_change', {
      font_size: size,
      visa_type: visaType,
    });
  },

  // Track homepage checklist selection
  trackHomepageSelect: (checklist: string, destination: string) => {
    trackEvent('homepage_select_checklist', {
      checklist,
      destination,
    });
  },
};
