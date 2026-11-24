// ZAYNOVA Global Trade Analytics & Google Sheets Telemetry Engine
// Tracks visitor identity, repeat visit count, selected options, language, country, and B2B leads.

export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxt7m1RwwNj7qhyI01T-hJCqtt265S7kVX4tbhEU21Zw494WvVKr8MjE2S_SVwEYu1WNw/exec';

function getEndpointUrl(): string {
  try {
    return localStorage.getItem('zaynova_custom_apps_script_url') || APPS_SCRIPT_URL;
  } catch {
    return APPS_SCRIPT_URL;
  }
}

const LOGS_STORAGE_KEY = 'zaynova_analytics_logs';
const VISITOR_ID_KEY = 'zaynova_visitor_id';
const VISIT_COUNT_KEY = 'zaynova_visit_count';
const SESSION_COUNTED_KEY = 'zaynova_session_visit_counted';
const SESSION_OPTIONS_KEY = 'zaynova_session_options';

let visitorIp = 'Resolving...';
let visitorLocation = 'Global';
let visitorCountry = 'Global';
let visitorIsp = 'Resolving...';
let geoResolved = false;

const resolveVisitorGeo = async () => {
  if (geoResolved) return;
  try {
    const response = await fetch('https://ipapi.co/json/', { mode: 'cors' });
    if (response.ok) {
      const data = await response.json();
      visitorIp = data.ip || 'Unknown IP';
      visitorCountry = data.country_name || 'Global';
      visitorLocation =
        `${data.city || ''}, ${data.region_code || ''}, ${data.country_name || ''}`
          .replace(/^,\s*|,\s*$/g, '')
          .replace(/,\s*,/g, ',')
          .trim() || 'Global';
      visitorIsp = data.org || 'Unknown ISP';
      geoResolved = true;
      return;
    }
  } catch {
    try {
      const fallback = await fetch('https://api.ipify.org?format=json');
      if (fallback.ok) {
        const fbData = await fallback.json();
        visitorIp = fbData.ip || 'Unknown IP';
      }
    } catch {
      visitorIp = 'Direct Client';
    }
    visitorLocation = 'Global (Approx)';
    visitorIsp = 'Direct Access';
    geoResolved = true;
  }
};

resolveVisitorGeo();

export function getVisitorIdentity(): { visitorId: string; visitCount: number } {
  try {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
      visitorId = `VIS-${rand}`;
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }

    let visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0', 10);
    if (isNaN(visitCount)) visitCount = 0;

    if (!sessionStorage.getItem(SESSION_COUNTED_KEY)) {
      visitCount += 1;
      localStorage.setItem(VISIT_COUNT_KEY, String(visitCount));
      sessionStorage.setItem(SESSION_COUNTED_KEY, '1');
    }

    return { visitorId, visitCount: Math.max(1, visitCount) };
  } catch {
    return { visitorId: 'VIS-SESSION', visitCount: 1 };
  }
}

export function recordSelectedOption(optionLabel: string): string[] {
  try {
    const raw = sessionStorage.getItem(SESSION_OPTIONS_KEY);
    const existing: string[] = raw ? JSON.parse(raw) : [];
    if (optionLabel && !existing.includes(optionLabel)) {
      existing.push(optionLabel);
      if (existing.length > 25) existing.shift();
      sessionStorage.setItem(SESSION_OPTIONS_KEY, JSON.stringify(existing));
    }
    return existing;
  } catch {
    return [optionLabel];
  }
}

export function getSelectedOptions(): string[] {
  try {
    const raw = sessionStorage.getItem(SESSION_OPTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export type TrackEventType =
  | 'PAGE_VIEW'
  | 'LANGUAGE_CHANGE'
  | 'CATEGORY_SELECT'
  | 'PRODUCT_VIEW'
  | 'CATALOG_DOWNLOAD'
  | 'WHATSAPP_COUNTRY_SELECT'
  | 'MEETING_BOOKING'
  | 'BULK_QUOTE_SUBMIT'
  | 'BUTTON_CLICK';

export interface TrackingPayload {
  eventType: TrackEventType;
  eventDetail: string;
  language?: string;
  optionTag?: string;
  clientName?: string;
  companyName?: string;
  country?: string;
  clientPhone?: string;
  clientEmail?: string;
  projectType?: string;
  orderVolume?: string;
  meetingDate?: string;
  meetingTime?: string;
  inquiryNum?: string;
  message?: string;
}

export interface StoredAnalyticsLog {
  timestamp: string;
  visitorId: string;
  visitCount: number;
  language: string;
  eventType: string;
  eventDetail: string;
  selectedOptions: string;
  clientName: string;
  companyName: string;
  country: string;
  clientPhone: string;
  clientEmail: string;
  projectType: string;
  orderVolume: string;
  meetingDate: string;
  inquiryNum: string;
  message: string;
  visitorIp: string;
  visitorLocation: string;
  visitorIsp: string;
}

export const trackEvent = async (payload: TrackingPayload) => {
  try {
    await resolveVisitorGeo();

    const { visitorId, visitCount } = getVisitorIdentity();
    if (payload.optionTag) {
      recordSelectedOption(payload.optionTag);
    }
    const selectedOptionsStr = getSelectedOptions().join(' | ') || payload.eventDetail;

    const timestampUTC = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
    const lang = payload.language || localStorage.getItem('zaynova_lang') || 'en';

    const data = {
      // Title-case & legacy-compatible keys for existing Google Apps Script
      Timestamp: timestampUTC,
      'Visitor ID': visitorId,
      'Visit Count': visitCount,
      Language: lang.toUpperCase(),
      'Event Type': payload.eventType,
      'Event Detail': payload.eventDetail,
      'Selected Options': selectedOptionsStr,
      'Client Name': payload.clientName || 'N/A',
      Company: payload.companyName || 'N/A',
      Country: payload.country || visitorCountry,
      'Client Phone': payload.clientPhone || 'N/A',
      'Client Email': payload.clientEmail || 'N/A',
      'Project Type': payload.projectType || payload.eventDetail || 'N/A',
      'Order Volume': payload.orderVolume || 'N/A',
      'Meeting Slot': payload.meetingDate
        ? `${payload.meetingDate} ${payload.meetingTime || ''}`.trim()
        : 'N/A',
      'Inquiry Number': payload.inquiryNum ? `#${payload.inquiryNum}` : 'N/A',
      Message: payload.message || 'N/A',
      'IP Address': visitorIp,
      Location: visitorLocation,
      ISP: visitorIsp,

      // CamelCase fallback fields
      timestamp: timestampUTC,
      visitorId,
      visitCount,
      language: lang.toUpperCase(),
      eventType: payload.eventType,
      eventDetail: payload.eventDetail,
      selectedOptions: selectedOptionsStr,
      clientName: payload.clientName || 'N/A',
      companyName: payload.companyName || 'N/A',
      country: payload.country || visitorCountry,
      clientPhone: payload.clientPhone || 'N/A',
      clientEmail: payload.clientEmail || 'N/A',
      projectType: payload.projectType || 'N/A',
      orderVolume: payload.orderVolume || 'N/A',
      meetingDate: payload.meetingDate
        ? `${payload.meetingDate} ${payload.meetingTime || ''}`.trim()
        : 'N/A',
      inquiryNum: payload.inquiryNum ? `#${payload.inquiryNum}` : 'N/A',
      message: payload.message || 'N/A',
      visitorIp,
      visitorLocation,
      visitorIsp,
    };

    try {
      const rawLogs = localStorage.getItem(LOGS_STORAGE_KEY);
      const logs: StoredAnalyticsLog[] = rawLogs ? JSON.parse(rawLogs) : [];
      const newLog: StoredAnalyticsLog = {
        timestamp: timestampUTC,
        visitorId,
        visitCount,
        language: lang.toUpperCase(),
        eventType: payload.eventType,
        eventDetail: payload.eventDetail,
        selectedOptions: selectedOptionsStr,
        clientName: payload.clientName || 'N/A',
        companyName: payload.companyName || 'N/A',
        country: payload.country || visitorCountry,
        clientPhone: payload.clientPhone || 'N/A',
        clientEmail: payload.clientEmail || 'N/A',
        projectType: payload.projectType || payload.eventDetail || 'N/A',
        orderVolume: payload.orderVolume || 'N/A',
        meetingDate: payload.meetingDate
          ? `${payload.meetingDate} ${payload.meetingTime || ''}`.trim()
          : 'N/A',
        inquiryNum: payload.inquiryNum ? `#${payload.inquiryNum}` : 'N/A',
        message: payload.message || 'N/A',
        visitorIp,
        visitorLocation,
        visitorIsp,
      };
      logs.unshift(newLog);
      if (logs.length > 250) logs.pop();
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
    } catch (err) {
      console.warn('Could not persist local analytics log:', err);
    }

    fetch(getEndpointUrl(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((err) => console.warn('Google Sheet Tracker non-blocking warning:', err));
  } catch (error) {
    console.error('Tracker failure:', error);
  }
};

export interface PartnerLeadNotifyInput {
  inquiryType: string;
  inquiryNum: string;
  companyName?: string;
  contactName: string;
  country: string;
  phone: string;
  email: string;
  preferredDivisions?: string;
  partnershipRole?: string;
  targetCity?: string;
  meetingDate?: string;
  meetingTime?: string;
  meetingTopic?: string;
  language?: string;
  notes?: string;
}

export const notifyPartnerLead = async (payload: PartnerLeadNotifyInput): Promise<void> => {
  try {
    await fetch('/api/partner-inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        appsScriptUrl: getEndpointUrl(),
      }),
    });
  } catch (error) {
    console.warn('Partner lead notification non-blocking warning:', error);
  }
};

export const getLocalLogs = (): StoredAnalyticsLog[] => {
  try {
    const rawLogs = localStorage.getItem(LOGS_STORAGE_KEY);
    return rawLogs ? JSON.parse(rawLogs) : [];
  } catch {
    return [];
  }
};

export const clearLocalLogs = () => {
  try {
    localStorage.removeItem(LOGS_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
};

export const fetchRemoteLogs = async (): Promise<StoredAnalyticsLog[]> => {
  const response = await fetch(`${getEndpointUrl()}?action=get_analytics&t=${Date.now()}`);
  if (response.ok) {
    const data = await response.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.rows)) return data.rows;
  }
  throw new Error('Remote Google Sheets GET endpoint returned invalid or empty data');
};
