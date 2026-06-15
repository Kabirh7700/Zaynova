// ZAYNOVA Bespoke Luxury Analytics & Sheets Integration Engine
// Connects tracking events (Page Views, Button Clicks, Form Submissions) directly to Google Sheets

let visitorIp = "Fetching...";
let visitorLocation = "Fetching...";
let visitorIsp = "Fetching...";

// Safely resolve visitor details in the background on load
const fetchVisitorInfo = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/", { mode: "cors" });
    if (response.ok) {
      const data = await response.json();
      visitorIp = data.ip || "Unknown IP";
      visitorLocation = `${data.city || ""}, ${data.region_code || ""}, ${data.country_name || ""}`.replace(/^, |, $/, "").trim() || "India";
      visitorIsp = data.org || "Unknown ISP";
    }
  } catch (err) {
    // Silent fallback
    try {
      const fallbackRes = await fetch("https://api.ipify.org?format=json");
      if (fallbackRes.ok) {
        const fbData = await fallbackRes.json();
        visitorIp = fbData.ip || "Unknown IP";
        visitorLocation = "India (Approx)";
        visitorIsp = "Unknown ISP";
      }
    } catch {
      visitorIp = "Local Client";
      visitorLocation = "India (Approx)";
      visitorIsp = "Direct Access";
    }
  }
};

// Fire off the background visitor resolution
fetchVisitorInfo();

export interface TrackingPayload {
  eventType: "PAGE_VIEW" | "BUTTON_CLICK" | "FORM_SUBMISSION";
  eventDetail: string;
  // Lead info (if available)
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
  projectType?: string;
  inquiryNum?: string;
  estimatedAreaSqFt?: string;
  qualityGrade?: string;
  calculatedBudget?: string;
  message?: string;
}

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxt7m1RwwNj7qhyI01T-hJCqtt265S7kVX4tbhEU21Zw494WvVKr8MjE2S_SVwEYu1WNw/exec";

/**
 * Sends structured events to Google Sheets using Apps Script
 */
export const trackEvent = async (payload: TrackingPayload) => {
  try {
    const timestampIST = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " (IST)";
    
    // Create a rich, multi-compatible flat object containing both CamelCase and bold uppercase formats
    // This ensures whatever naming scheme the Apps Script checks for, it will match beautifully!
    const data = {
      Timestamp: timestampIST,
      "Event Type": payload.eventType,
      "Event Detail": payload.eventDetail,
      "Client Name": payload.clientName || "N/A",
      "Client Phone": payload.clientPhone || "N/A",
      "Client Email": payload.clientEmail || "N/A",
      "Project Type": payload.projectType || payload.eventDetail || "N/A",
      "Inquiry Number": payload.inquiryNum ? `#${payload.inquiryNum}` : "N/A",
      "Area Size SqFt": payload.estimatedAreaSqFt || "N/A",
      "Quality Grade": payload.qualityGrade || "N/A",
      "Calculated Budget": payload.calculatedBudget || "N/A",
      Message: payload.message || "N/A",
      "IP Address": visitorIp,
      Location: visitorLocation,
      ISP: visitorIsp,
      
      // Also provide camelCase fields as a reliable fallback
      timestamp: timestampIST,
      eventType: payload.eventType,
      eventDetail: payload.eventDetail,
      clientName: payload.clientName || "N/A",
      clientPhone: payload.clientPhone || "N/A",
      clientEmail: payload.clientEmail || "N/A",
      projectType: payload.projectType || "N/A",
      inquiryNum: payload.inquiryNum || "N/A",
      areaSizeSqFt: payload.estimatedAreaSqFt || "N/A",
      qualityGrade: payload.qualityGrade || "N/A",
      calculatedBudget: payload.calculatedBudget || "N/A",
      visitorIp: visitorIp,
      visitorLocation: visitorLocation,
      visitorIsp: visitorIsp
    };

    // Also save locally under zaynova_analytics_logs for the real-time Admin portal
    try {
      const rawLogs = localStorage.getItem("zaynova_analytics_logs");
      const logs = rawLogs ? JSON.parse(rawLogs) : [];
      
      const newLog = {
        timestamp: timestampIST,
        eventType: payload.eventType,
        eventDetail: payload.eventDetail,
        clientName: payload.clientName || "N/A",
        clientPhone: payload.clientPhone || "N/A",
        clientEmail: payload.clientEmail || "N/A",
        projectType: payload.projectType || payload.eventDetail || "N/A",
        inquiryNum: payload.inquiryNum ? `#${payload.inquiryNum}` : "N/A",
        areaSizeSqFt: payload.estimatedAreaSqFt || "N/A",
        qualityGrade: payload.qualityGrade || "N/A",
        calculatedBudget: payload.calculatedBudget || "N/A",
        message: payload.message || "N/A",
        visitorIp: visitorIp,
        visitorLocation: visitorLocation,
        visitorIsp: visitorIsp
      };
      
      logs.unshift(newLog); // Put news first
      
      // Limit to last 200 logs to avoid over-filling localStorage
      if (logs.length > 200) logs.pop();
      
      localStorage.setItem("zaynova_analytics_logs", JSON.stringify(logs));
    } catch (err) {
      console.warn("Could not write event log to localStorage:", err);
    }

    // Send fire-and-forget background analytics log
    // We use standard POST, with no-cors / fallback to handle Apps Script redirects seamlessly
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Crucial for Google Apps Script to prevent cross-origin preflight blockers
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).catch(e => console.warn("Google Sheet Tracker non-blocking warning:", e));

  } catch (error) {
    console.error("Tracker Failure:", error);
  }
};

/**
 * Retrieves locally accumulated analytics logs
 */
export const getLocalLogs = () => {
  try {
    const rawLogs = localStorage.getItem("zaynova_analytics_logs");
    return rawLogs ? JSON.parse(rawLogs) : [];
  } catch {
    return [];
  }
};

/**
 * Clears the locally stored events
 */
export const clearLocalLogs = () => {
  try {
    localStorage.removeItem("zaynova_analytics_logs");
    return true;
  } catch {
    return false;
  }
};

/**
 * Fetches remote logs from Google Spreadsheet if GET is enabled on the web app
 */
export const fetchRemoteLogs = async (): Promise<any[]> => {
  try {
    // Perform a standard secure GET request to the Google Apps Script Web App
    // (with cache-busting to get fresh data)
    const response = await fetch(`${APPS_SCRIPT_URL}?action=get_analytics&t=${Date.now()}`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.rows)) {
        return data.rows;
      }
    }
    throw new Error("Invalid or empty response format");
  } catch (error) {
    console.error("Google Sheets API remote fetch unavailable yet:", error);
    throw error;
  }
};
