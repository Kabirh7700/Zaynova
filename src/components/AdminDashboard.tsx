import { FormEvent, useEffect, useState } from 'react';
import {
  BarChart3,
  Calendar,
  Check,
  Copy,
  Database,
  Download,
  Eye,
  EyeOff,
  FileSpreadsheet,
  Globe,
  Lock,
  RefreshCw,
  Search,
  ShieldAlert,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import {
  APPS_SCRIPT_URL,
  clearLocalLogs,
  fetchRemoteLogs,
  getLocalLogs,
  StoredAnalyticsLog,
} from '../utils/analytics';
import {
  ALL_IN_ONE_APPS_SCRIPT,
  downloadProductsCsvTemplate,
  getActiveAppsScriptUrl,
  getLocalLogoOverride,
  setCustomAppsScriptUrl,
  setLocalLogoOverride,
} from '../utils/sheetsSync';
import { ProductItem } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  products: ProductItem[];
  sheetSource: 'default' | 'google-sheet';
  onClose: () => void;
  onRefreshSiteData: () => Promise<void>;
}

export default function AdminDashboard({
  isOpen,
  products,
  sheetSource,
  onClose,
  onRefreshSiteData,
}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeSection, setActiveSection] = useState<'analytics' | 'cms'>('analytics');
  const [logs, setLogs] = useState<StoredAnalyticsLog[]>([]);
  const [dataSource, setDataSource] = useState<'local' | 'sheets'>('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [logoInput, setLogoInput] = useState(() => getLocalLogoOverride());
  const [endpointInput, setEndpointInput] = useState(() => getActiveAppsScriptUrl());
  const [cmsSavedMsg, setCmsSavedMsg] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);

  const loadLogs = async (forceSource?: 'local' | 'sheets') => {
    setIsRefreshing(true);
    setErrorMessage('');
    const source = forceSource || dataSource;

    if (source === 'sheets') {
      try {
        const remote = await fetchRemoteLogs();
        setLogs(
          (remote || []).filter(
            (r: any) =>
              r && (r.timestamp || r.Timestamp) && (r.eventType || r['Event Type'])
          )
        );
      } catch {
        setErrorMessage(
          'Live Google Sheet GET feed requires the updated All-in-One Apps Script in the CMS tab. Showing local session telemetry.'
        );
        setDataSource('local');
        setLogs(getLocalLogs());
      } finally {
        setIsRefreshing(false);
      }
    } else {
      setLogs(getLocalLogs());
      setTimeout(() => setIsRefreshing(false), 300);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadLogs();
    }
  }, [isAuthenticated, isOpen, dataSource]);

  if (!isOpen) return null;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    if (clean === 'zaynova' || clean === '87500') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid access code. Use your ZAYNOVA admin passcode.');
    }
  };

  const handleSaveLogoPreview = async () => {
    setLocalLogoOverride(logoInput);
    await onRefreshSiteData();
    setCmsSavedMsg('Brand logo updated across header, footer & catalogs.');
    setTimeout(() => setCmsSavedMsg(''), 3000);
  };

  const handleSaveEndpoint = async () => {
    setCustomAppsScriptUrl(endpointInput);
    await onRefreshSiteData();
    setCmsSavedMsg('Google Apps Script endpoint updated and resynced.');
    setTimeout(() => setCmsSavedMsg(''), 3000);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(ALL_IN_ONE_APPS_SCRIPT);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Aggregate unique visitors & max visit counts
  const visitorMap = new Map<
    string,
    {
      visitorId: string;
      maxVisitCount: number;
      country: string;
      location: string;
      ip: string;
      lastLanguage: string;
      options: Set<string>;
      lastSeen: string;
      eventsCount: number;
    }
  >();

  logs.forEach((log: any) => {
    const vid = String(log.visitorId || log['Visitor ID'] || 'UNKNOWN');
    const vCount = Number(log.visitCount || log['Visit Count'] || 1) || 1;
    const existing = visitorMap.get(vid);
    const opts = String(log.selectedOptions || log['Selected Options'] || '')
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean);

    if (!existing) {
      visitorMap.set(vid, {
        visitorId: vid,
        maxVisitCount: vCount,
        country: String(log.country || log.Country || log.visitorLocation || 'Global'),
        location: String(log.visitorLocation || log.Location || 'Global'),
        ip: String(log.visitorIp || log['IP Address'] || ''),
        lastLanguage: String(log.language || log.Language || 'EN'),
        options: new Set(opts),
        lastSeen: String(log.timestamp || log.Timestamp || ''),
        eventsCount: 1,
      });
    } else {
      existing.maxVisitCount = Math.max(existing.maxVisitCount, vCount);
      existing.eventsCount += 1;
      opts.forEach((o) => existing.options.add(o));
    }
  });

  const uniqueVisitors = Array.from(visitorMap.values());
  const totalQuotes = logs.filter(
    (l: any) => (l.eventType || l['Event Type']) === 'BULK_QUOTE_SUBMIT'
  ).length;
  const totalMeetings = logs.filter(
    (l: any) => (l.eventType || l['Event Type']) === 'MEETING_BOOKING'
  ).length;
  const totalDownloads = logs.filter(
    (l: any) => (l.eventType || l['Event Type']) === 'CATALOG_DOWNLOAD'
  ).length;

  const filteredLogs = logs.filter((log: any) => {
    const eType = String(log.eventType || log['Event Type'] || '');
    const matchesFilter = filterType === 'ALL' || eType === filterType;
    const q = searchQuery.toLowerCase();
    if (!q) return matchesFilter;
    const blob = JSON.stringify(log).toLowerCase();
    return matchesFilter && blob.includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E1E4E8] rounded-xl w-full max-w-6xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#121518] text-white flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-display text-base font-bold tracking-tight">
              ZAYNOVA Executive Analytics &amp; Google Sheet CMS
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Visitor Frequency · Option Selections · Spreadsheet Product, Part &amp; Logo Sync
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="p-8 md:p-14 max-w-md mx-auto text-center space-y-5">
            <div className="w-12 h-12 rounded-xl bg-[#F1F3F6] border border-[#E1E4E8] flex items-center justify-center mx-auto text-[#111417]">
              <Lock className="w-6 h-6 text-[#387500]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#111417]">
                Administrator Access
              </h3>
              <p className="text-xs text-[#525B66] mt-1">
                Enter your ZAYNOVA passcode to view repeat visitor counts, selected options, and Google Sheet sync controls.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-3">
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Passcode (zaynova)"
                  className="w-full rounded-lg border border-[#E1E4E8] px-4 py-2.5 text-sm text-center font-mono focus:outline-none focus:border-[#4D9E00]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525B66] hover:text-[#111417] cursor-pointer"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && (
                <div className="text-xs text-red-600 flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{loginError}</span>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#111417] hover:bg-[#1C2024] text-white text-sm font-semibold cursor-pointer"
              >
                Unlock Console
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
            {/* Section Switcher Bar */}
            <div className="px-6 py-3 border-b border-[#E1E4E8] bg-[#F8F9FA] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 bg-[#E1E4E8]/60 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveSection('analytics')}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeSection === 'analytics'
                      ? 'bg-white text-[#111417] shadow-sm'
                      : 'text-[#525B66] hover:text-[#111417]'
                  }`}
                >
                  Visitor &amp; Option Telemetry
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('cms')}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeSection === 'cms'
                      ? 'bg-white text-[#111417] shadow-sm'
                      : 'text-[#525B66] hover:text-[#111417]'
                  }`}
                >
                  Google Sheet CMS &amp; Brand Logo
                </button>
              </div>

              <div className="text-xs text-[#525B66] flex items-center gap-2">
                <span>Active Data Source:</span>
                <span className="font-mono font-semibold text-[#111417]">
                  {sheetSource === 'google-sheet' ? 'Google Sheets Live' : 'Factory Catalog'}
                </span>
              </div>
            </div>

            {activeSection === 'analytics' ? (
              <div className="p-6 space-y-6">
                {/* Summary KPI Strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border border-[#E1E4E8] bg-white">
                    <div className="flex items-center justify-between text-xs text-[#525B66]">
                      <span>Unique Visitors</span>
                      <Users className="w-4 h-4 text-[#387500]" />
                    </div>
                    <div className="font-mono text-2xl font-bold text-[#111417] tabular-nums mt-1">
                      {uniqueVisitors.length}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-[#E1E4E8] bg-white">
                    <div className="flex items-center justify-between text-xs text-[#525B66]">
                      <span>Catalog Downloads</span>
                      <Download className="w-4 h-4 text-[#387500]" />
                    </div>
                    <div className="font-mono text-2xl font-bold text-[#111417] tabular-nums mt-1">
                      {totalDownloads}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-[#E1E4E8] bg-white">
                    <div className="flex items-center justify-between text-xs text-[#525B66]">
                      <span>Meetings Booked</span>
                      <Calendar className="w-4 h-4 text-[#387500]" />
                    </div>
                    <div className="font-mono text-2xl font-bold text-[#111417] tabular-nums mt-1">
                      {totalMeetings}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-[#E1E4E8] bg-white">
                    <div className="flex items-center justify-between text-xs text-[#525B66]">
                      <span>Bulk Quotes</span>
                      <BarChart3 className="w-4 h-4 text-[#387500]" />
                    </div>
                    <div className="font-mono text-2xl font-bold text-[#111417] tabular-nums mt-1">
                      {totalQuotes}
                    </div>
                  </div>
                </div>

                {/* Visitor Frequency & Selected Options Matrix */}
                <div className="border border-[#E1E4E8] rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#E1E4E8] flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-[#111417]">
                      Visitor Repeat Counts &amp; Selected Options
                    </h3>
                    <span className="text-xs text-[#525B66] font-mono tabular-nums">
                      {uniqueVisitors.length} tracked profiles
                    </span>
                  </div>
                  <div className="overflow-x-auto max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-white border-b border-[#E1E4E8] text-[#525B66]">
                        <tr>
                          <th className="py-2.5 px-4 font-medium">Visitor ID</th>
                          <th className="py-2.5 px-4 font-medium">Visits</th>
                          <th className="py-2.5 px-4 font-medium">Location / IP</th>
                          <th className="py-2.5 px-4 font-medium">Lang</th>
                          <th className="py-2.5 px-4 font-medium">Options Selected</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E1E4E8]">
                        {uniqueVisitors.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-6 text-center text-[#525B66]">
                              No visitor activity recorded yet.
                            </td>
                          </tr>
                        ) : (
                          uniqueVisitors.map((v) => (
                            <tr key={v.visitorId} className="hover:bg-[#F8F9FA]">
                              <td className="py-2.5 px-4 font-mono font-semibold text-[#111417]">
                                {v.visitorId}
                              </td>
                              <td className="py-2.5 px-4 font-mono tabular-nums font-bold text-[#387500]">
                                {v.maxVisitCount}x
                              </td>
                              <td className="py-2.5 px-4 text-[#525B66]">
                                {v.location} {v.ip ? `(${v.ip})` : ''}
                              </td>
                              <td className="py-2.5 px-4 font-mono">{v.lastLanguage}</td>
                              <td className="py-2.5 px-4 text-[#111417]">
                                {Array.from(v.options).join(' · ') || 'Browsing'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Controls & Live Event Feed */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDataSource('local')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        dataSource === 'local'
                          ? 'bg-[#111417] text-white'
                          : 'border border-[#E1E4E8] text-[#525B66]'
                      }`}
                    >
                      Session Feed
                    </button>
                    <button
                      type="button"
                      onClick={() => setDataSource('sheets')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                        dataSource === 'sheets'
                          ? 'bg-[#111417] text-white'
                          : 'border border-[#E1E4E8] text-[#525B66]'
                      }`}
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>Google Sheet Live</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#525B66] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search logs..."
                        className="pl-8 pr-3 py-1.5 rounded-lg border border-[#E1E4E8] text-xs focus:outline-none focus:border-[#4D9E00]"
                      />
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border border-[#E1E4E8] text-xs bg-white"
                    >
                      <option value="ALL">All Events</option>
                      <option value="PAGE_VIEW">Page Views</option>
                      <option value="LANGUAGE_CHANGE">Language Switches</option>
                      <option value="PRODUCT_VIEW">Product Views</option>
                      <option value="CATALOG_DOWNLOAD">Catalog Downloads</option>
                      <option value="MEETING_BOOKING">Meetings Booked</option>
                      <option value="BULK_QUOTE_SUBMIT">Bulk Quotes</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => loadLogs()}
                      className="p-1.5 rounded-lg border border-[#E1E4E8] hover:bg-[#F1F3F6] cursor-pointer"
                      title="Refresh"
                    >
                      <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        clearLocalLogs();
                        loadLogs('local');
                      }}
                      className="p-1.5 rounded-lg border border-[#E1E4E8] text-red-600 hover:bg-red-50 cursor-pointer"
                      title="Clear local logs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-lime-50 border border-lime-200 text-lime-900 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="border border-[#E1E4E8] rounded-lg overflow-hidden max-h-64 overflow-y-auto divide-y divide-[#E1E4E8]">
                  {filteredLogs.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#525B66]">
                      No matching telemetry records found.
                    </div>
                  ) : (
                    filteredLogs.slice(0, 60).map((log: any, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F8F9FA]"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-[#525B66]">
                            <span className="font-mono text-[11px]">
                              {log.timestamp || log.Timestamp}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono font-semibold text-[#111417]">
                              {log.eventType || log['Event Type']}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono text-[#387500]">
                              {log.visitorId || log['Visitor ID']} (Visit #
                              {log.visitCount || log['Visit Count'] || 1})
                            </span>
                          </div>
                          <div className="font-medium text-[#111417] mt-1">
                            {log.eventDetail || log['Event Detail']}
                          </div>
                          {(log.clientName && log.clientName !== 'N/A') ||
                          (log['Client Name'] && log['Client Name'] !== 'N/A') ? (
                            <div className="text-[#525B66] mt-0.5">
                              {log.clientName || log['Client Name']} ·{' '}
                              {log.companyName || log.Company || ''} ·{' '}
                              {log.country || log.Country || ''} ·{' '}
                              {log.clientPhone || log['Contact Mobile'] || ''}
                            </div>
                          ) : null}
                        </div>
                        <div className="text-right font-mono text-[11px] text-[#525B66] shrink-0">
                          <div>{log.language || log.Language || 'EN'}</div>
                          <div>{log.visitorLocation || log.Location || 'Global'}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              /* CMS & Logo Setup Tab */
              <div className="p-6 space-y-6">
                {/* Connected Endpoint Info */}
                <div className="p-5 rounded-lg border border-[#E1E4E8] bg-[#F8F9FA] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#111417]">
                        Connected Google Apps Script Endpoint
                      </h3>
                      <p className="text-xs text-[#525B66] mt-0.5">
                        Currently synced to the spreadsheet bound to this Apps Script deployment URL:
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={endpointInput}
                      onChange={(e) => setEndpointInput(e.target.value)}
                      placeholder={APPS_SCRIPT_URL}
                      className="flex-1 rounded-lg border border-[#E1E4E8] bg-white px-3.5 py-2 text-xs font-mono text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                    />
                    <button
                      type="button"
                      onClick={handleSaveEndpoint}
                      className="px-4 py-2 rounded-lg bg-[#111417] text-white text-xs font-semibold hover:bg-[#1C2024] cursor-pointer whitespace-nowrap"
                    >
                      Save &amp; Sync URL
                    </button>
                  </div>
                </div>

                {/* Brand Logo URL Preview / Sheet Test */}
                <div className="p-5 rounded-lg border border-[#E1E4E8] bg-white space-y-3">
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#111417]">
                      ZAYNOVA Brand Logo (Sheet Synced or Instant Preview)
                    </h3>
                    <p className="text-xs text-[#525B66] mt-0.5">
                      Add a row in your Google Sheet <code className="font-mono bg-[#F1F3F6] px-1 py-0.5 rounded">BrandSettings</code> tab with <code className="font-mono bg-[#F1F3F6] px-1 py-0.5 rounded">key = logoUrl</code> and <code className="font-mono bg-[#F1F3F6] px-1 py-0.5 rounded">value = your image or Google Drive share URL</code>.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={logoInput}
                      onChange={(e) => setLogoInput(e.target.value)}
                      placeholder="https://drive.google.com/file/d/... or direct PNG/SVG logo URL"
                      className="flex-1 rounded-lg border border-[#E1E4E8] bg-white px-3.5 py-2 text-xs text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                    />
                    <button
                      type="button"
                      onClick={handleSaveLogoPreview}
                      className="px-4 py-2 rounded-lg bg-[#65C800] hover:bg-[#7BE300] text-[#111417] text-xs font-bold cursor-pointer whitespace-nowrap"
                    >
                      Apply Logo
                    </button>
                  </div>
                  {cmsSavedMsg && (
                    <div className="text-xs text-emerald-700 font-medium">{cmsSavedMsg}</div>
                  )}
                </div>

                {/* CSV Template Download & Live Resync */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-lg border border-[#E1E4E8] bg-white space-y-3">
                    <div className="flex items-center gap-2 font-display text-sm font-bold text-[#111417]">
                      <FileSpreadsheet className="w-4 h-4 text-[#387500]" />
                      <span>1. Download Products CSV Template</span>
                    </div>
                    <p className="text-xs text-[#525B66] leading-relaxed">
                      Import into a sheet tab named <strong className="text-[#111417]">Products</strong>. Supports <code className="font-mono">imageUrl</code>, <code className="font-mono">explodedImageUrl</code>, <code className="font-mono">parts</code>, and Google Drive share links.
                    </p>
                    <button
                      type="button"
                      onClick={() => downloadProductsCsvTemplate(products)}
                      className="px-4 py-2 rounded-lg border border-[#111417] text-[#111417] hover:bg-[#111417] hover:text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Products Template (.CSV)</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-lg border border-[#E1E4E8] bg-white space-y-3">
                    <div className="flex items-center gap-2 font-display text-sm font-bold text-[#111417]">
                      <Globe className="w-4 h-4 text-[#387500]" />
                      <span>2. Resync Live Spreadsheet Data</span>
                    </div>
                    <p className="text-xs text-[#525B66] leading-relaxed">
                      Tabs supported: <code className="font-mono">Products</code>,{' '}
                      <code className="font-mono">Catalogs</code>,{' '}
                      <code className="font-mono">BrandSettings</code>, and{' '}
                      <code className="font-mono">AnalyticsLogs</code>.
                    </p>
                    <button
                      type="button"
                      onClick={onRefreshSiteData}
                      className="px-4 py-2 rounded-lg bg-[#111417] hover:bg-[#1C2024] text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#7BE300]" />
                      <span>Force Resync From Google Sheet</span>
                    </button>
                  </div>
                </div>

                {/* All-in-One Apps Script Copy Box */}
                <div className="p-5 rounded-lg border border-[#E1E4E8] bg-white space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#121518]">
                        3. All-in-One Google Apps Script (Two-Way Sync)
                      </h4>
                      <p className="text-xs text-[#525B66]">
                        In your Google Sheet open Extensions → Apps Script, paste this code, and Deploy → New Deployment → Web App (Access: Anyone).
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyScript}
                      className="px-3.5 py-2 rounded-lg bg-[#121518] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedScript ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Apps Script</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-lg bg-[#121518] text-gray-200 font-mono text-[11px] overflow-x-auto max-h-64 select-all">
                    {ALL_IN_ONE_APPS_SCRIPT}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
