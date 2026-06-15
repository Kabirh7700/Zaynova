import React, { useState, useEffect, FormEvent } from 'react';
import { 
  X, Check, Lock, ShieldAlert, Sparkles, RefreshCw, Search, Trash2, 
  Copy, ExternalLink, Eye, EyeOff, UserCheck, Smartphone, Mail, 
  FileSpreadsheet, TrendingUp, BarChart3, Database, ChevronRight, CheckCircle2,
  MousePointerClick, Trophy, Activity, HelpCircle, Eye as ViewIcon, Compass
} from 'lucide-react';
import { getLocalLogs, clearLocalLogs, fetchRemoteLogs } from '../utils/analytics';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Data state
  const [logs, setLogs] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<'local' | 'sheets'>('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'PAGE_VIEW' | 'BUTTON_CLICK' | 'FORM_SUBMISSION'>('ALL');
  
  // Loading & Action states
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [showAppsScriptGuide, setShowAppsScriptGuide] = useState(false);

  // Load data & sanitize blank rows (such as rows deleted or cleared on Google Sheets)
  const loadData = async (forceSource?: 'local' | 'sheets') => {
    setIsRefreshing(true);
    setErrorMessage('');
    const source = forceSource || dataSource;
    
    const filterValidLogs = (items: any[]) => {
      return (items || []).filter(log => 
        log && 
        log.timestamp && String(log.timestamp).trim() !== '' &&
        log.eventType && String(log.eventType).trim() !== ''
      );
    };

    if (source === 'sheets') {
      try {
        const remoteData = await fetchRemoteLogs();
        setLogs(filterValidLogs(remoteData));
      } catch (err) {
        setErrorMessage('Failed to fetch from Google Sheets direct API. Reading local cache fallback instead.');
        setDataSource('local');
        setLogs(filterValidLogs(getLocalLogs()));
      } finally {
        setIsRefreshing(false);
      }
    } else {
      setLogs(filterValidLogs(getLocalLogs()));
      // Introduce a premium micro-spinner delay for authentic feedback
      setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    }
  };

  // Reload logs on authentication or change in source
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadData();
    }
  }, [isAuthenticated, isOpen, dataSource]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcode.trim().toLowerCase();
    
    // Accepts the mobile prefix '87500' or the boutique name 'zaynova'
    if (cleanPass === '87500' || cleanPass === 'zaynova' || cleanPass === 'kabir7700') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator Access Code. Access Denied.');
    }
  };

  const handleClearLogs = () => {
    if (window.confirm('Do you really want to clear the local testing logs? Note: This will not delete entries on your Google Sheets.')) {
      clearLocalLogs();
      loadData('local');
    }
  };

  // Allows removing a single log row from the current dashboard state & client-side database (localStorage)
  const handleDeleteIndividualLog = (logToDelete: any) => {
    if (window.confirm('Are you sure you want to remove this log entry from your view? Note: If this came from Google Sheets, please also delete the row directly in your Google Spreadsheet to prevent it from re-appearing on the next sync.')) {
      // 1. Remove from local component state logs
      const updatedLogs = logs.filter((l: any) => l !== logToDelete);
      setLogs(updatedLogs);
      
      // 2. Also remove from local zaynova_analytics_logs if it is stored in localStorage
      try {
        const localLogs = getLocalLogs();
        const updatedLocal = localLogs.filter((l: any) => {
          const matches = l.timestamp === logToDelete.timestamp && 
                          l.eventType === logToDelete.eventType && 
                          l.eventDetail === logToDelete.eventDetail;
          return !matches;
        });
        localStorage.setItem("zaynova_analytics_logs", JSON.stringify(updatedLocal));
      } catch (err) {
        console.warn("Could not clean log from localStorage:", err);
      }
    }
  };

  // Upgraded dynamic Apps Script that supports POST (writes) and GET (fetches rows) simultaneously!
  const upgradedAppsScriptCode = `// ZAYNOVA DUAL-MODE ENTERPRISE GOOGLE SHEETS CONNECTOR (Supports Writes & Real-Time Reads)
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Event Type", "Event Detail", "Client Name", 
        "Contact Mobile", "Email Address", "Project Type", "Inquiry Number", 
        "Area Size SqFt", "Quality Grade", "Calculated Budget", "Message", 
        "IP Address", "Location", "ISP"
      ]);
    }
    
    // Append data row
    sheet.appendRow([
      data["Timestamp"] || data["timestamp"] || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data["Event Type"] || data["eventType"] || "",
      data["Event Detail"] || data["eventDetail"] || "",
      data["Client Name"] || data["clientName"] || "",
      data["Client Phone"] || data["clientPhone"] || "",
      data["Client Email"] || data["clientEmail"] || "",
      data["Project Type"] || data["projectType"] || "",
      data["Inquiry Number"] || data["inquiryNum"] || "",
      data["Area Size SqFt"] || data["areaSizeSqFt"] || "",
      data["Quality Grade"] || data["qualityGrade"] || "",
      data["Calculated Budget"] || data["calculatedBudget"] || "",
      data["Message"] || data["message"] || "",
      data["IP Address"] || data["visitorIp"] || "",
      data["Location"] || data["visitorLocation"] || "",
      data["ISP"] || data["visitorIsp"] || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success", info: "Row Appended successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Support GET requests so the website admin console can view tracked logs in real-time
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    
    if (lastRow <= 1) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    var dataRange = sheet.getRange(2, 1, lastRow - 1, lastColumn);
    var values = dataRange.getValues();
    var resultList = [];
    
    // Reverse loop to get newest submissions first
    for (var i = values.length - 1; i >= 0; i--) {
      // Skip empty or cleared rows (checks if Timestamp/col1 is blank)
      if (!values[i][0] || values[i][0].toString().trim() === "") {
        continue;
      }
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        var headerKey = headers[j];
        var val = values[i][j];
        
        // Match frontend expected keys
        if (headerKey === "Timestamp") obj.timestamp = val;
        else if (headerKey === "Event Type") obj.eventType = val;
        else if (headerKey === "Event Detail") obj.eventDetail = val;
        else if (headerKey === "Client Name") obj.clientName = val;
        else if (headerKey === "Contact Mobile") obj.clientPhone = val;
        else if (headerKey === "Email Address") obj.clientEmail = val;
        else if (headerKey === "Project Type") obj.projectType = val;
        else if (headerKey === "Inquiry Number") obj.inquiryNum = val;
        else if (headerKey === "Area Size SqFt") obj.areaSizeSqFt = val;
        else if (headerKey === "Quality Grade") obj.qualityGrade = val;
        else if (headerKey === "Calculated Budget") obj.calculatedBudget = val;
        else if (headerKey === "Message") obj.message = val;
        else if (headerKey === "IP Address") obj.visitorIp = val;
        else if (headerKey === "Location") obj.visitorLocation = val;
        else if (headerKey === "ISP") obj.visitorIsp = val;
        else obj[headerKey] = val;
      }
      resultList.push(obj);
    }
    
    return ContentService.createTextOutput(JSON.stringify(resultList))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(upgradedAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  if (!isOpen) return null;

  // Filter & Search computation
  const filteredLogs = logs.filter(log => {
    const matchesFilter = filterType === 'ALL' || log.eventType === filterType;
    
    const searchString = searchQuery.toLowerCase();
    const rawMatch = !searchQuery || 
      (log.clientName || '').toLowerCase().includes(searchString) ||
      (log.clientPhone || '').toLowerCase().includes(searchString) ||
      (log.clientEmail || '').toLowerCase().includes(searchString) ||
      (log.eventType || '').toLowerCase().includes(searchString) ||
      (log.eventDetail || '').toLowerCase().includes(searchString) ||
      (log.projectType || '').toLowerCase().includes(searchString) ||
      (log.visitorLocation || '').toLowerCase().includes(searchString) ||
      (log.inquiryNum || '').toLowerCase().includes(searchString) ||
      (log.message || '').toLowerCase().includes(searchString);

    return matchesFilter && rawMatch;
  });

  // Calculate high quality stats aggregates (skipping empty or cleared rows)
  const rawDataForStats = (dataSource === 'local' ? getLocalLogs() : logs).filter((log: any) => 
    log && 
    log.timestamp && String(log.timestamp).trim() !== '' &&
    log.eventType && String(log.eventType).trim() !== ''
  );
  const pageViewsCount = rawDataForStats.filter(l => l.eventType === 'PAGE_VIEW').length;
  const engagementClicksCount = rawDataForStats.filter(l => l.eventType === 'BUTTON_CLICK').length;
  const formLeadsCount = rawDataForStats.filter(l => l.eventType === 'FORM_SUBMISSION').length;
  const totalSystemHits = rawDataForStats.length;
  const conversionRate = pageViewsCount > 0 
    ? ((formLeadsCount / pageViewsCount) * 100).toFixed(1) 
    : "0.0";

  // Dynamic ranking logic: Group click/interaction details by popularity count
  const actionPopularity: { [key: string]: number } = {};
  const locationPopularity: { [key: string]: number } = {};
  const projectPopularity: { [key: string]: number } = {};

  rawDataForStats.forEach(log => {
    if (log.eventType === 'BUTTON_CLICK' && log.eventDetail) {
      actionPopularity[log.eventDetail] = (actionPopularity[log.eventDetail] || 0) + 1;
    }
    if (log.visitorLocation) {
      locationPopularity[log.visitorLocation] = (locationPopularity[log.visitorLocation] || 0) + 1;
    }
    if (log.projectType && log.projectType !== 'N/A') {
      projectPopularity[log.projectType] = (projectPopularity[log.projectType] || 0) + 1;
    }
  });

  // Convert to sorted lists
  const sortedActions = Object.entries(actionPopularity)
    .map(([detail, count]) => ({ detail, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const sortedLocations = Object.entries(locationPopularity)
    .map(([loc, count]) => ({ loc, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const sortedProjects = Object.entries(projectPopularity)
    .map(([proj, count]) => ({ proj, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <div id="zaynova-admin-portal" className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fade-in">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-6xl shadow-2xl overflow-hidden relative max-h-[95vh] flex flex-col">
        
        {/* Banner Glow Decorative Lines */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-600 via-gold-400 to-emerald-500" />

        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-900 bg-neutral-950/80 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            <div>
              <h2 className="font-outfit text-white text-md tracking-widest font-semibold uppercase flex items-center gap-2">
                ZAYNOVA <span className="text-gold-400 text-xs font-light">Interactive Analytics & Security Desk</span>
              </h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-normal mt-0.5">
                Bespoke Luxury Architecture Visitor & Click Action Intelligence Console
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white transition-all cursor-pointer"
            title="Exit System Console"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Box */}
        {!isAuthenticated ? (
          /* SECURITY VAULT PASSCODE SCREEN */
          <div className="flex-1 p-8 py-20 flex flex-col items-center justify-center max-w-md mx-auto text-center">
            <div className="h-16 w-16 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex items-center justify-center text-gold-400 shadow-xl mb-6">
              <Lock className="w-8 h-8 animate-pulse text-gold-500" />
            </div>
            
            <h3 className="font-outfit text-white text-lg uppercase tracking-widest font-semibold">
              Administrator Verification Required
            </h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Enter the secure administrator access code to display tracking reports, action leaderboards, city metrics, and form leads databases.
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full mt-6 space-y-4">
              <div className="relative">
                <input 
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter access code"
                  required
                  className="w-full bg-neutral-900/65 border border-neutral-800 focus:border-gold-500 rounded-xl py-3.5 pl-4 pr-12 text-center text-white text-sm outline-none transition-all font-mono tracking-widest"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <div className="flex items-center gap-2 bg-red-950/20 border border-red-900/50 rounded-xl p-3 text-red-400 text-xs justify-center">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-gold-600 to-gold-400 hover:scale-[1.02] active:scale-95 text-white font-outfit uppercase tracking-widest text-xs font-semibold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer gold-shadow"
              >
                Unlock Administrator Stream
              </button>
            </form>
          </div>
        ) : (
          /* CORE ADMIN METRICS & EVENT LOOPS SCREEN */
          <div className="flex-1 overflow-y-auto flex flex-col min-h-0 bg-neutral-950">
            
            {/* STATS OVERVIEW CONTROLLERS ROW */}
            <div className="p-6 bg-gradient-to-b from-neutral-930 to-neutral-950/20 border-b border-neutral-900 grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Stat Card 1: Visitors */}
              <div className="bg-neutral-900/40 border border-neutral-800/60 p-4 rounded-xl flex items-center justify-between relative group hover:border-neutral-750 transition-all">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-outfit tracking-wider">Total Browser Entries</span>
                  <div className="font-mono font-bold text-2xl text-white mt-1">{pageViewsCount}</div>
                  <p className="text-[9px] text-gray-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-2.5 h-2.5 text-emerald-400" /> 
                    Live sessions logged
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-neutral-950 flex items-center justify-center text-gray-400">
                  <BarChart3 className="w-5 h-5 text-gold-500" />
                </div>
              </div>

              {/* Stat Card 2: Interactive Actions */}
              <div className="bg-neutral-900/40 border border-neutral-800/60 p-4 rounded-xl flex items-center justify-between relative group hover:border-neutral-750 transition-all">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-outfit tracking-wider">Interactive Clicks</span>
                  <div className="font-mono font-bold text-2xl text-white mt-1">{engagementClicksCount}</div>
                  <p className="text-[9px] text-sky-400 mt-1 flex items-center gap-1">
                    <MousePointerClick className="w-2.5 h-2.5 text-sky-400" />
                    Clicks from A to Z
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-neutral-950 flex items-center justify-center text-gray-400">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              {/* Stat Card 3: Form Leads Submitted */}
              <div className="bg-neutral-900/40 border border-neutral-800/60 p-4 rounded-xl flex items-center justify-between relative group hover:border-neutral-750 transition-all">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-outfit tracking-wider">Form Leads Captured</span>
                  <div className="font-mono font-bold text-2xl text-gold-400 mt-1">{formLeadsCount}</div>
                  <p className="text-[9px] text-gold-400 mt-1 flex items-center gap-1">
                    <Database className="w-2.5 h-2.5 text-gold-500" /> 
                    Spreadsheet synced
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-neutral-950 flex items-center justify-center text-gold-400">
                  <FileSpreadsheet className="w-5 h-5 text-gold-500" />
                </div>
              </div>

              {/* Stat Card 4: Session conversion Ratio */}
              <div className="bg-neutral-900/40 border border-neutral-800/60 p-4 rounded-xl flex items-center justify-between relative group hover:border-neutral-750 transition-all">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-outfit tracking-wider">Conversion Ratio</span>
                  <div className="font-mono font-bold text-2xl text-emerald-400 mt-1">{conversionRate}%</div>
                  <p className="text-[9px] text-gray-400 mt-1">Visits vs. Lead signups</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-neutral-950 flex items-center justify-center text-emerald-400">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* DYNAMIC METRIC INTERACTIVE CHARTS / LEADERBOARD BENTO */}
            <div className="mx-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Leaderboard: Popular Button Clicks / Dynamic Actions */}
              <div className="bg-neutral-900/30 border border-neutral-900 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-4 h-4 text-gold-400" />
                    <h4 className="font-outfit text-white text-xs uppercase tracking-widest font-semibold">
                      ACTION ENGAGEMENTS RANKING
                    </h4>
                  </div>
                  
                  {sortedActions.length === 0 ? (
                    <p className="text-[11px] text-gray-500 italic py-4">No click interactions recorded yet. Click some CTAs on the site to trigger!</p>
                  ) : (
                    <div className="space-y-3">
                      {sortedActions.map((item, index) => (
                        <div key={index} className="flex items-center gap-2.5 justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-4 h-4 rounded bg-neutral-800 text-[9px] font-bold text-gray-400 flex items-center justify-center font-mono">
                              {index + 1}
                            </span>
                            <span className="text-[11px] text-gray-300 truncate" title={item.detail}>
                              {item.detail}
                            </span>
                          </div>
                          <span className="px-1.5 py-0.5 rounded bg-sky-950/40 text-sky-400 text-[10px] font-mono font-bold shrink-0">
                            {item.count} clicks
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-[9px] text-gray-500 font-mono mt-4 pt-3 border-t border-neutral-900/60 flex items-center justify-between">
                  <span>A TO Z BUTTON METER ENGINE</span>
                  <span className="text-gold-400">UPDATED REAL-TIME</span>
                </div>
              </div>

              {/* Geo location stats */}
              <div className="bg-neutral-900/30 border border-neutral-900 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-outfit text-white text-xs uppercase tracking-widest font-semibold">
                      VISITOR GEO LOCATIONS
                    </h4>
                  </div>

                  {sortedLocations.length === 0 ? (
                    <p className="text-[11px] text-gray-500 italic py-4">Location stats empty</p>
                  ) : (
                    <div className="space-y-3">
                      {sortedLocations.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-[11px] text-gray-300">
                            <span className="truncate">📍 {item.loc}</span>
                            <span className="font-mono text-gray-400">{item.count} visitors</span>
                          </div>
                          <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
                            <div 
                              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                              style={{ width: `${(item.count / Math.max(...sortedLocations.map(l => l.count))) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-[9px] text-gray-500 font-mono mt-4 pt-3 border-t border-neutral-900/60 flex items-center justify-between">
                  <span>IP LOCATION TELEMETRY</span>
                  <span className="text-emerald-400">ACTIVE IP LOCATOR</span>
                </div>
              </div>

              {/* Product stream popularity */}
              <div className="bg-neutral-900/30 border border-neutral-900 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Compass className="w-4 h-4 text-gold-400" />
                    <h4 className="font-outfit text-white text-xs uppercase tracking-widest font-semibold">
                      POPULAR DESIGN STREAMS
                    </h4>
                  </div>

                  {sortedProjects.length === 0 ? (
                    <p className="text-[11px] text-gray-500 italic py-4">No project inquiry submissions catalogued yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {sortedProjects.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-[11px] text-gray-300">
                            <span className="truncate">✦ {item.proj}</span>
                            <span className="font-mono font-bold text-gold-400">{item.count} leads</span>
                          </div>
                          <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-gold-600 to-gold-400 h-full rounded-full transition-all duration-500" 
                              style={{ width: `${(item.count / Math.max(...sortedProjects.map(p => p.count))) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-[9px] text-gray-500 font-mono mt-4 pt-3 border-t border-neutral-900/60 flex items-center justify-between">
                  <span>STREAM ATTRACTION SCORE</span>
                  <span className="text-gold-400">METAPLANNER SYNC</span>
                </div>
              </div>

            </div>

            {/* ACTION CENTER PANEL & DATA-SOURCE SWITCHERS */}
            <div className="p-6 bg-neutral-950/60 border-b border-neutral-900/80 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mt-4">
              
              {/* Data Source Toggle */}
              <div className="flex bg-neutral-900 p-1 rounded-xl self-start gap-1">
                <button 
                  onClick={() => setDataSource('local')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor pointer ${
                    dataSource === 'local' 
                      ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-white shadow' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Local Testing Logs
                </button>
                <button 
                  onClick={() => {
                    setDataSource('sheets');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    dataSource === 'sheets' 
                      ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-white shadow' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  Google Sheet Live
                </button>
              </div>

              {/* Central Actions: Clean log, refresh stats, upgrade instructions */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button 
                  onClick={() => setShowAppsScriptGuide(!showAppsScriptGuide)}
                  className="px-3.5 py-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-gray-300 hover:text-gold-400 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  Spreadsheet Fetch Setup Guide
                </button>
                
                <button 
                  onClick={handleClearLogs}
                  className="p-2 bg-neutral-900 border border-neutral-800 hover:border-red-900/30 text-gray-400 hover:text-red-400 rounded-xl transition-all cursor-pointer"
                  title="Clear Local Cache Log Entries"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => loadData()}
                  disabled={isRefreshing}
                  className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-gray-200 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-gold-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Polling Feed...' : 'Sync Raw rows'}
                </button>
              </div>
            </div>

            {/* APPS SCRIPT UPGRADE MODULE - OPEN ON TOGGLE */}
            {showAppsScriptGuide && (
              <div className="m-6 p-6 bg-neutral-900/50 border border-neutral-800/80 rounded-xl animate-scale-up space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-outfit text-white text-sm font-semibold tracking-wide uppercase text-gold-400">
                      Syncing Google Sheets directly to this Admin Feed
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Currently, Formsubmit.co accepts submissions beautifully. If you want this live website dashboard to also read and pull all active rows from Google Sheets, upgrade your standard Google Apps Script macro with the script below:
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowAppsScriptGuide(false)}
                    className="text-gray-500 hover:text-white text-xs uppercase"
                  >
                    Hide [x]
                  </button>
                </div>

                {/* Steps instructions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-gray-400">
                  <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-lg">
                    <span className="font-mono text-gold-400 font-semibold text-xs block mb-1">STEP 1</span>
                    Open your Google Sheet, click on <span className="text-white">Extensions</span> → <span className="text-white">Apps Script</span>. Remove previous codes.
                  </div>
                  <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-lg">
                    <span className="font-mono text-gold-400 font-semibold text-xs block mb-1">STEP 2</span>
                    Paste the script below. It works both ways: writes leads on POST and fetches logged rows instantly on GET.
                  </div>
                  <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-lg">
                    <span className="font-mono text-gold-400 font-semibold text-xs block mb-1">STEP 3</span>
                    Click <span className="text-white">Deploy → New Deployment</span>. Select <span className="text-white">Web App</span>, Execute as "Me", Access: "Anyone". Authorize Google and replace macro url.
                  </div>
                </div>

                {/* Script Code blocks */}
                <div className="relative">
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button 
                      onClick={copyScriptToClipboard}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-[10px] font-semibold tracking-wide flex items-center gap-1 cursor-pointer transition-all"
                    >
                      {copiedScript ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Passed to Clipboard
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Full Script
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 bg-neutral-950 border border-neutral-900 rounded-xl text-[10px] font-mono text-gray-300 overflow-x-auto max-h-[220px] select-all">
                    {upgradedAppsScriptCode}
                  </pre>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mx-6 mt-6 p-3 bg-amber-950/20 border border-amber-900/50 text-amber-300 rounded-xl text-xs font-medium">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* EVENT STREAM STREAM MODULE AREA */}
            <div className="flex-1 p-6 flex flex-col min-h-0">
              
              {/* SEARCH AND FILTERS */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4 items-stretch justify-between">
                
                {/* Search query box */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search logs by Client Name, Phone, ISP, Location..."
                    className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-gold-500 rounded-xl py-2 pl-10 pr-4 text-white text-xs outline-none transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Event type filters pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  <button 
                    onClick={() => setFilterType('ALL')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
                      filterType === 'ALL' 
                        ? 'bg-neutral-800 text-white' 
                        : 'bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    All Streams ({filteredLogs.length})
                  </button>
                  <button 
                    onClick={() => setFilterType('FORM_SUBMISSION')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
                      filterType === 'FORM_SUBMISSION' 
                        ? 'bg-gold-550/25 text-gold-300 border border-gold-500/30' 
                        : 'bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    Leads/Forms ({logs.filter(l => l.eventType === 'FORM_SUBMISSION').length})
                  </button>
                  <button 
                    onClick={() => setFilterType('BUTTON_CLICK')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
                      filterType === 'BUTTON_CLICK' 
                        ? 'bg-blue-950/30 text-blue-300 border border-blue-800/30' 
                        : 'bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    Engagements ({logs.filter(l => l.eventType === 'BUTTON_CLICK').length})
                  </button>
                  <button 
                    onClick={() => setFilterType('PAGE_VIEW')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
                      filterType === 'PAGE_VIEW' 
                        ? 'bg-neutral-850 text-emerald-300 border border-neutral-800' 
                        : 'bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    Traffic/Visits ({logs.filter(l => l.eventType === 'PAGE_VIEW').length})
                  </button>
                </div>
              </div>

              {/* STREAM LOG FEED TABLE */}
              <div className="flex-1 overflow-x-auto min-h-0 bg-neutral-900/20 border border-neutral-900/60 rounded-xl overflow-y-auto">
                {filteredLogs.length === 0 ? (
                  <div className="p-12 text-center text-xs text-gray-500 flex flex-col items-center justify-center space-y-2">
                    <ShieldAlert className="w-8 h-8 text-neutral-800" />
                    <p className="font-outfit uppercase tracking-wider text-gray-400">No matching analytics records detected</p>
                    <p className="text-[10px] text-gray-600 max-w-md antialiased">
                      {searchQuery 
                        ? `Change search parameters or clear the query "${searchQuery}" to view complete list.` 
                        : 'Create a new Page View, click some Call/WhatsApp buttons, or submit a mock free site-visit/quotation in the client app to trigger live trackers!'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-900">
                    {filteredLogs.map((log, idx) => {
                      // Styling badge according to Event Type
                      let typeColor = "text-emerald-400 bg-neutral-905 border-neutral-800";
                      let typeLabel = "TRAFFIC VISIT";
                      
                      if (log.eventType === 'FORM_SUBMISSION') {
                        typeColor = "text-gold-400 bg-gold-950/20 border-gold-900/[0.15]";
                        typeLabel = "LEAD SIGNUP";
                      } else if (log.eventType === 'BUTTON_CLICK') {
                        typeColor = "text-sky-400 bg-sky-950/15 border-sky-900/[0.15]";
                        typeLabel = "HOTLINK CLICK";
                      }

                      const hasClientData = log.clientName && log.clientName !== 'N/A';

                      return (
                        <div key={idx} className="p-4 hover:bg-neutral-900/30 transition-all flex flex-col md:flex-row gap-4 justify-between items-start text-xs font-mono">
                          
                          {/* Stream Left: timestamp/badge & basic event details */}
                          <div className="space-y-1.5 max-w-xl">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] text-gray-500 font-sans tracking-tight">{log.timestamp}</span>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-semibold border ${typeColor} tracking-widest`}>
                                {typeLabel}
                              </span>
                              {log.inquiryNum && log.inquiryNum !== 'N/A' && (
                                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-neutral-800 text-white">Inquiry {log.inquiryNum}</span>
                              )}
                            </div>
                            
                            <h5 className="text-white text-xs font-sans tracking-wide leading-relaxed font-semibold">
                              {log.eventDetail}
                            </h5>

                            {/* Client particulars highlighted if form submission */}
                            {hasClientData && (
                              <div className="bg-neutral-950/60 border border-neutral-900 p-3 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-2 font-sans font-normal text-xs text-gray-300">
                                <div>
                                  <span className="text-[9px] text-gray-500 block uppercase tracking-wider">Client Full Name</span>
                                  <span className="text-white text-xs font-medium">{log.clientName}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[9px] text-gray-500 block uppercase tracking-wider">Contact Mobile</span>
                                  <a href={`tel:${log.clientPhone}`} className="text-emerald-400 hover:underline inline-flex items-center gap-1 text-xs font-semibold">
                                    <Smartphone className="w-3 h-3" /> {log.clientPhone}
                                  </a>
                                </div>
                                {log.clientEmail && log.clientEmail !== 'N/A' && (
                                  <div className="mt-1">
                                    <span className="text-[9px] text-gray-500 block uppercase tracking-wider">Email Address</span>
                                    <a href={`mailto:${log.clientEmail}`} className="text-gray-400 hover:underline inline-flex items-center gap-1 text-xs">
                                      <Mail className="w-3 h-3" /> {log.clientEmail}
                                    </a>
                                  </div>
                                )}
                                {log.projectType && log.projectType !== 'N/A' && (
                                  <div className="mt-1">
                                    <span className="text-[9px] text-gray-500 block uppercase tracking-wider">Requested Stream</span>
                                    <span className="text-neutral-200">{log.projectType}</span>
                                  </div>
                                )}
                                {log.areaSizeSqFt && log.areaSizeSqFt !== 'N/A' && (
                                  <div className="mt-1">
                                    <span className="text-[9px] text-gray-500 block uppercase tracking-wider">Estimated Area</span>
                                    <span className="text-neutral-200 font-semibold">{log.areaSizeSqFt}</span>
                                  </div>
                                )}
                                {log.calculatedBudget && log.calculatedBudget !== 'N/A' && (
                                  <div className="mt-1">
                                    <span className="text-[9px] text-gray-500 block uppercase tracking-wider font-semibold text-gold-400">Luxury Budget</span>
                                    <span className="text-gold-300 font-bold">{log.calculatedBudget} ({log.qualityGrade})</span>
                                  </div>
                                )}
                                {log.message && log.message !== 'N/A' && (
                                  <div className="col-span-1 sm:col-span-2 mt-2 pt-1.5 border-t border-neutral-900/60">
                                    <span className="text-[9px] text-gray-500 block uppercase tracking-wider">Bespoke Requirements Message</span>
                                    <p className="text-gray-400 font-normal mt-0.5 leading-relaxed text-[11px] italic bg-neutral-900/30 p-2 rounded border border-neutral-855">
                                      "{log.message}"
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}

                          </div>

                          {/* Stream Right: IP address & metadata info */}
                          <div className="text-right text-[10px] text-gray-550 space-y-1 self-stretch md:self-auto flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end border-t md:border-t-0 border-neutral-905 pt-2 md:pt-0">
                            <div>
                              <span className="text-white font-mono bg-neutral-900/70 py-0.5 px-1.5 rounded">{log.visitorIp || "N/A"}</span>
                            </div>
                            <div className="text-gray-400 font-sans mt-1">
                              📍 {log.visitorLocation || "India"}
                            </div>
                            <div className="text-gray-650 font-sans text-[9px] mt-0.5 truncate max-w-[150px]">
                              {log.visitorIsp || "System Core Access"}
                            </div>
                            <div className="mt-2 shrink-0">
                              <button 
                                onClick={() => handleDeleteIndividualLog(log)}
                                className="p-1 px-1.5 bg-neutral-950 hover:bg-red-950/20 border border-neutral-900 hover:border-red-900/50 rounded-lg text-gray-500 hover:text-red-400 transition-all flex items-center justify-center gap-1 cursor-pointer font-sans text-[9px]"
                                title="Remove this log entry from view"
                              >
                                <Trash2 className="w-3 h-3 text-red-500/80" /> Clear Row
                              </button>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Admin Instructions Footer */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-900 text-center text-[10px] text-gray-500 flex flex-wrap gap-x-6 gap-y-2 justify-center">
              <span>Google Sheet URL: <a href="https://docs.google.com/spreadsheets/d/1YH11X8rEHoBXT0SsmeCMTC2hZE6aji-IrEe9V-9V7VM/edit?usp=sharing" target="_blank" rel="noreferrer" className="text-gold-500 underline hover:text-white inline-flex items-center gap-0.5">1YH11X8rEHoBXT0Ssme... <ExternalLink className="w-2.5 h-2.5" /></a></span>
              <span>Spreadsheet Synced Macro: <span className="text-emerald-400 font-mono">Formsubmit Ajax Relay</span></span>
              <span>Authorization state: <span className="text-emerald-400 font-semibold flex inline-flex items-center gap-0.5"><CheckCircle2 className="w-2.5 h-2.5" /> Activated</span></span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
