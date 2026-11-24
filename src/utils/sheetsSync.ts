import {
  ALL_SEGMENTS,
  DEFAULT_BRAND_CONFIG,
  DEFAULT_CATALOGS,
  DEFAULT_PRODUCTS,
  getDefaultExplodedBlueprint,
} from '../data';
import {
  BrandConfig,
  CatalogItem,
  ProductItem,
  ProductPart,
  ProductSegment,
  SiteDataBundle,
} from '../types';
import { APPS_SCRIPT_URL } from './analytics';

const LOCAL_LOGO_OVERRIDE_KEY = 'zaynova_sheet_logo_override';
const LOCAL_SHEET_ENDPOINT_KEY = 'zaynova_custom_apps_script_url';

export function getActiveAppsScriptUrl(): string {
  try {
    return localStorage.getItem(LOCAL_SHEET_ENDPOINT_KEY) || APPS_SCRIPT_URL;
  } catch {
    return APPS_SCRIPT_URL;
  }
}

export function setCustomAppsScriptUrl(url: string) {
  try {
    if (url.trim()) {
      localStorage.setItem(LOCAL_SHEET_ENDPOINT_KEY, url.trim());
    } else {
      localStorage.removeItem(LOCAL_SHEET_ENDPOINT_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export function getLocalLogoOverride(): string {
  try {
    return localStorage.getItem(LOCAL_LOGO_OVERRIDE_KEY) || '';
  } catch {
    return '';
  }
}

export function setLocalLogoOverride(url: string) {
  try {
    if (url.trim()) {
      localStorage.setItem(LOCAL_LOGO_OVERRIDE_KEY, url.trim());
    } else {
      localStorage.removeItem(LOCAL_LOGO_OVERRIDE_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

/**
 * Automatically converts Google Drive share URLs into direct image URLs so sheet images always load.
 */
export function normalizeSheetImageUrl(rawUrl: string): string {
  const trimmed = String(rawUrl || '').trim();
  if (!trimmed) return '';

  const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1200`;
  }

  const idMatch = trimmed.match(/drive\.google\.com\/.*[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1200`;
  }

  return trimmed;
}

function resolveSegment(rawCategory: string): ProductSegment {
  const clean = rawCategory.trim().toLowerCase();
  const exact = ALL_SEGMENTS.find((s) => s.toLowerCase() === clean);
  if (exact) return exact;

  if (clean.includes('tiller') || clean.includes('cultivator') || clean.includes('weeder') || clean.includes('agro-industrial'))
    return 'Agro-Industrial Machinery';
  if (clean.includes('brush') || clean.includes('chainsaw') || clean.includes('hedge') || clean.includes('auger') || clean.includes('lawn') || clean.includes('forestry') || clean.includes('garden machinery'))
    return 'Garden & Forestry';
  if (clean.includes('diesel')) return 'Diesel Machines';
  if (clean.includes('solar')) return 'Solar';
  if (clean.includes('spray') || clean.includes('fog') || clean.includes('mist') || clean.includes('fumig'))
    return 'Spraying & Crop Protection';
  if (clean.includes('pump')) return 'Water Pumps & Fluid';
  if (clean.includes('generator') || clean.includes('inverter') || clean.includes('engine'))
    return 'Engines & Power Generation';
  if (clean.includes('pressure') || clean.includes('washer') || clean.includes('vacuum') || clean.includes('clean'))
    return 'Pressure Washing & Cleaning';
  if (clean.includes('compressor')) return 'Air Compressors';
  if (clean.includes('weld') || clean.includes('motor') || clean.includes('industrial'))
    return 'Industrial Equipment';
  if (clean.includes('concrete') || clean.includes('compactor') || clean.includes('rammer') || clean.includes('trowel') || clean.includes('construction'))
    return 'Construction Equipment';
  if (clean.includes('chipper') || clean.includes('splitter') || clean.includes('corn') || clean.includes('chaff') || clean.includes('wood'))
    return 'Wood & Agro Processing';
  if (clean.includes('trencher') || clean.includes('dumper') || clean.includes('blower') || clean.includes('special'))
    return 'Special Machinery';
  if (clean.includes('drill') || clean.includes('grinder') || clean.includes('brushless') || clean.includes('power tool'))
    return 'Power Tools';
  if (clean.includes('hand tool')) return 'Hand & Garden Tools';
  if (clean.includes('spare') || clean.includes('part') || clean.includes('carburetor') || clean.includes('piston'))
    return 'Spare Parts & Aftermarket';
  if (clean.includes('electric')) return 'Electric Machines';

  return 'Garden & Forestry';
}

function parseSheetParts(rawParts: unknown, fallbackParts: ProductPart[]): ProductPart[] {
  if (!rawParts) return fallbackParts;
  if (Array.isArray(rawParts) && rawParts.length > 0) {
    return rawParts.map((item: any, idx: number) => ({
      id: String(item.id || `part-${idx + 1}`),
      partCode: String(item.partCode || `OEM-${idx + 101}`),
      name: String(item.name || 'Internal Component'),
      material: String(item.material || 'Forged Alloy'),
      functionDesc: String(item.functionDesc || 'Precision OEM assembly component.'),
      serviceInterval: String(item.serviceInterval || '500 Hours'),
      xPercent: Number(item.xPercent) || 20 + ((idx * 14) % 70),
      yPercent: Number(item.yPercent) || 45,
    }));
  }

  if (typeof rawParts === 'string' && rawParts.trim()) {
    const trimmed = rawParts.trim();
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parseSheetParts(parsed, fallbackParts);
      } catch {
        // fallback below
      }
    }
    const items = trimmed
      .split('|')
      .map((entry, idx) => {
        const [partCode, name, material, functionDesc] = entry.split(':').map((s) => s.trim());
        if (!name) return null;
        return {
          id: `sheet-part-${idx + 1}`,
          partCode: partCode || `OEM-${idx + 101}`,
          name,
          material: material || 'Industrial Alloy',
          functionDesc: functionDesc || 'Precision OEM replacement assembly.',
          serviceInterval: '500 Hours',
          xPercent: 18 + ((idx * 13) % 72),
          yPercent: idx % 2 === 0 ? 40 : 58,
        };
      })
      .filter(Boolean) as ProductPart[];
    if (items.length > 0) return items;
  }

  return fallbackParts;
}

function normalizeProductRow(raw: Record<string, any>, idx: number): ProductItem | null {
  const name = String(raw.name || raw.Name || raw['Product Name'] || '').trim();
  const sku = String(raw.sku || raw.SKU || raw.Model || `ZYN-${idx + 100}`).trim();
  if (!name) return null;

  const matchedCategory = resolveSegment(String(raw.category || raw.Category || 'Garden & Forestry'));

  const rawStatus = String(raw.status || raw.Status || 'Export Ready').trim();
  const validStatuses: ProductItem['status'][] = [
    'In Production',
    'Export Ready',
    'OEM Available',
  ];
  const matchedStatus =
    validStatuses.find((s) => s.toLowerCase() === rawStatus.toLowerCase()) || 'Export Ready';

  const highlightsRaw = raw.highlights || raw.Highlights || '';
  const highlights =
    typeof highlightsRaw === 'string' && highlightsRaw.trim()
      ? highlightsRaw
          .split('|')
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined;

  const defaultBlueprint = getDefaultExplodedBlueprint(matchedCategory);
  const explodedUrl = normalizeSheetImageUrl(
    String(raw.explodedImageUrl || raw['Exploded Image URL'] || '')
  );

  return {
    id: String(raw.id || sku.toLowerCase().replace(/[^a-z0-9]/g, '-')),
    sku,
    name,
    name_es: raw.name_es || undefined,
    name_pt: raw.name_pt || undefined,
    name_fr: raw.name_fr || undefined,
    name_ar: raw.name_ar || undefined,
    name_de: raw.name_de || undefined,
    category: matchedCategory,
    powerSpec: String(raw.powerSpec || raw['Power Spec'] || raw.Power || '2.0 kW').trim(),
    displacement: String(raw.displacement || raw.Displacement || raw.Engine || '52 cc').trim(),
    weight: String(raw.weight || raw.Weight || '7.2 kg').trim(),
    moq: Number(raw.moq || raw.MOQ || 25) || 25,
    cartonQty: Number(raw.cartonQty || raw['Carton Qty'] || 1) || 1,
    container40HqQty: Number(raw.container40HqQty || raw['40ft HQ Qty'] || 800) || 800,
    fobPriceRange: String(
      raw.fobPriceRange || raw['FOB Price'] || 'Contact Export Desk'
    ).trim(),
    description: String(
      raw.description || raw.Description || 'Industrial export power equipment.'
    ).trim(),
    description_es: raw.description_es || undefined,
    description_pt: raw.description_pt || undefined,
    description_fr: raw.description_fr || undefined,
    description_ar: raw.description_ar || undefined,
    description_de: raw.description_de || undefined,
    imageUrl: normalizeSheetImageUrl(
      String(raw.imageUrl || raw['Image URL'] || raw.image || '')
    ),
    explodedImageUrl: explodedUrl || defaultBlueprint.explodedImageUrl,
    parts: parseSheetParts(raw.parts || raw['Parts'], defaultBlueprint.parts),
    status: matchedStatus,
    highlights,
  };
}

function normalizeCatalogRow(raw: Record<string, any>, idx: number): CatalogItem | null {
  const title = String(raw.title || raw.Title || raw['Catalog Title'] || '').trim();
  if (!title) return null;

  return {
    id: String(raw.id || `cat-${idx + 1}`),
    title,
    edition: String(raw.edition || raw.Edition || '2026 Export Edition').trim(),
    category: String(raw.category || raw.Category || 'Full Lineup').trim(),
    language: String(raw.language || raw.Language || 'Multilingual').trim(),
    pageCount: String(raw.pageCount || raw['Pages'] || '24 Pages').trim(),
    fileSize: String(raw.fileSize || raw['File Type'] || 'Technical Spec Sheet').trim(),
    description: String(raw.description || raw.Description || '').trim(),
    coverImage: normalizeSheetImageUrl(
      String(raw.coverImage || raw['Cover Image URL'] || '')
    ),
    downloadUrl: String(raw.downloadUrl || raw['Download PDF URL'] || '').trim(),
  };
}

export async function fetchSiteDataFromSheets(): Promise<SiteDataBundle> {
  const localLogo = normalizeSheetImageUrl(getLocalLogoOverride());
  const endpoint = getActiveAppsScriptUrl();

  try {
    const response = await fetch(`${endpoint}?action=get_site_data&t=${Date.now()}`);
    if (!response.ok) throw new Error('Non-200 response from Apps Script');

    const payload = await response.json();

    if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
      const sheetProducts = Array.isArray(payload.products)
        ? (payload.products
            .map((r: any, i: number) => normalizeProductRow(r, i))
            .filter(Boolean) as ProductItem[])
        : [];

      const sheetCatalogs = Array.isArray(payload.catalogs)
        ? (payload.catalogs
            .map((r: any, i: number) => normalizeCatalogRow(r, i))
            .filter(Boolean) as CatalogItem[])
        : [];

      const settings = payload.brandSettings || {};
      const sheetLogo = normalizeSheetImageUrl(String(settings.logoUrl || ''));

      const brandConfig: BrandConfig = {
        brandName: String(settings.brandName || DEFAULT_BRAND_CONFIG.brandName),
        logoUrl: localLogo || sheetLogo,
        exportEmail: String(settings.exportEmail || DEFAULT_BRAND_CONFIG.exportEmail),
        hqLocation: String(settings.hqLocation || DEFAULT_BRAND_CONFIG.hqLocation),
      };

      const hasSheetContent =
        sheetProducts.length > 0 ||
        sheetCatalogs.length > 0 ||
        Boolean(sheetLogo);

      return {
        products: sheetProducts.length > 0 ? sheetProducts : DEFAULT_PRODUCTS,
        catalogs: sheetCatalogs.length > 0 ? sheetCatalogs : DEFAULT_CATALOGS,
        brandConfig,
        source: hasSheetContent ? 'google-sheet' : 'default',
        lastSyncedAt: new Date().toLocaleTimeString(),
      };
    }
  } catch {
    // Expected if the existing Apps Script hasn't added the get_site_data handler yet
  }

  return {
    products: DEFAULT_PRODUCTS,
    catalogs: DEFAULT_CATALOGS,
    brandConfig: {
      ...DEFAULT_BRAND_CONFIG,
      logoUrl: localLogo || DEFAULT_BRAND_CONFIG.logoUrl,
    },
    source: 'default',
  };
}

export function downloadCatalogSpecSheet(
  catalog: CatalogItem,
  products: ProductItem[],
  brandConfig: BrandConfig
) {
  if (catalog.downloadUrl && catalog.downloadUrl.startsWith('http')) {
    const anchor = document.createElement('a');
    anchor.href = catalog.downloadUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.download = `${catalog.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return;
  }

  const productRowsHtml = products
    .map(
      (p) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #e1e4e8;font-family:monospace;font-weight:600;">${p.sku}</td>
        <td style="padding:10px;border-bottom:1px solid #e1e4e8;font-weight:600;">${p.name}</td>
        <td style="padding:10px;border-bottom:1px solid #e1e4e8;">${p.category}</td>
        <td style="padding:10px;border-bottom:1px solid #e1e4e8;">${p.displacement} · ${p.powerSpec}</td>
        <td style="padding:10px;border-bottom:1px solid #e1e4e8;">${p.weight}</td>
        <td style="padding:10px;border-bottom:1px solid #e1e4e8;">${
          p.subModels && p.subModels.length > 0 ? `${p.subModels.length} Core Models` : p.status
        }</td>
      </tr>`
    )
    .join('');

  const logoHeaderHtml = brandConfig.logoUrl
    ? `<img src="${brandConfig.logoUrl}" alt="${brandConfig.brandName}" style="height:44px;margin-bottom:6px;object-fit:contain;" />`
    : '';

  const htmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${catalog.title} - ${brandConfig.brandName}</title>
</head>
<body style="font-family:Arial,Helvetica,sans-serif;color:#111417;margin:40px;line-height:1.5;">
  <div style="border-bottom:3px solid #65C800;padding-bottom:16px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;">
    <div>
      ${logoHeaderHtml}
      <h1 style="margin:0;font-size:24px;letter-spacing:0.04em;">${brandConfig.brandName} INDUSTRIAL CORPORATION</h1>
      <p style="margin:4px 0 0;color:#525b66;font-size:13px;">${catalog.title} · ${catalog.edition}</p>
    </div>
    <div style="text-align:right;font-size:12px;color:#525b66;">
      <div>International Distributor &amp; OEM Division</div>
      <div>${brandConfig.exportEmail}</div>
    </div>
  </div>
  <p style="font-size:14px;color:#333;">${catalog.description}</p>
  <h2 style="font-size:16px;margin-top:24px;margin-bottom:12px;">Technical Specification Matrix</h2>
  <table style="width:100%;border-collapse:collapse;font-size:13px;text-align:left;">
    <thead>
      <tr style="background:#111417;color:#fff;">
        <th style="padding:10px;">Series / SKU</th>
        <th style="padding:10px;">Product Line</th>
        <th style="padding:10px;">Segment</th>
        <th style="padding:10px;">Spec &amp; Output</th>
        <th style="padding:10px;">Net Weight</th>
        <th style="padding:10px;">Lineup Scope</th>
      </tr>
    </thead>
    <tbody>
      ${productRowsHtml}
    </tbody>
  </table>
  <p style="margin-top:32px;font-size:11px;color:#666;">Issued by ${brandConfig.brandName} Industrial Corporation · ISO 9001:2015 &amp; CE Homologated. Submit dealer &amp; importer inquiries via the official portal form.</p>
</body>
</html>`;

  const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${catalog.id || 'zaynova-catalog'}-export-spec.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadProductsCsvTemplate(products: ProductItem[]) {
  const headers = [
    'sku',
    'name',
    'category',
    'powerSpec',
    'displacement',
    'weight',
    'moq',
    'cartonQty',
    'container40HqQty',
    'fobPriceRange',
    'description',
    'imageUrl',
    'explodedImageUrl',
    'parts',
    'status',
    'name_es',
    'name_pt',
    'name_fr',
    'name_ar',
    'name_de',
  ];
  const escapeCsv = (val: any) => `"${String(val ?? '').replace(/"/g, '""')}"`;
  const rows = products.map((p) =>
    [
      p.sku,
      p.name,
      p.category,
      p.powerSpec,
      p.displacement,
      p.weight,
      p.moq,
      p.cartonQty,
      p.container40HqQty,
      p.fobPriceRange,
      p.description,
      p.imageUrl.startsWith('http') ? p.imageUrl : '',
      p.explodedImageUrl && p.explodedImageUrl.startsWith('http') ? p.explodedImageUrl : '',
      p.parts
        ? p.parts
            .map((pt) => `${pt.partCode}:${pt.name}:${pt.material}:${pt.functionDesc}`)
            .join(' | ')
        : '',
      p.status,
      p.name_es || '',
      p.name_pt || '',
      p.name_fr || '',
      p.name_ar || '',
      p.name_de || '',
    ]
      .map(escapeCsv)
      .join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Zaynova_Products_Sheet_Template.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const ALL_IN_ONE_APPS_SCRIPT = `// ZAYNOVA GLOBAL EXPORT - GOOGLE SHEETS CMS & VISITOR ANALYTICS CONNECTOR
// Create tabs inside your Google Spreadsheet:
// 1. "AnalyticsLogs" (Auto-created for visitor counts, selected options, quotes & meetings)
// 2. "Products" (Columns: sku, name, category, powerSpec, displacement, weight, moq, cartonQty, container40HqQty, fobPriceRange, description, imageUrl, explodedImageUrl, parts, status)
// 3. "Catalogs" (Columns: id, title, edition, category, language, pageCount, description, coverImage, downloadUrl)
// 4. "BrandSettings" (Columns: key, value  -> Row example: key="logoUrl", value="https://drive.google.com/file/d/.../view")

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.action === "send_partner_email" && data.sendEmailNotification && data.notifyRecipient) {
      MailApp.sendEmail({
        to: String(data.notifyRecipient),
        replyTo: data["Client Email"] || undefined,
        subject: data.emailSubject || ("New ZAYNOVA Partner Inquiry " + (data["Inquiry Number"] || "")),
        body: data.emailText || JSON.stringify(data, null, 2),
        htmlBody: data.emailHtml || undefined
      });
      return ContentService.createTextOutput(JSON.stringify({ result: "email_sent" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("AnalyticsLogs") || ss.getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Visitor ID", "Visit Count", "Language", "Event Type",
        "Event Detail", "Selected Options", "Client Name", "Company", "Country",
        "Contact Mobile", "Email Address", "Product / Stream", "Order Volume",
        "Meeting Slot", "Inquiry Number", "Message", "IP Address", "Location", "ISP"
      ]);
    }

    sheet.appendRow([
      data["Timestamp"] || new Date().toISOString(),
      data["Visitor ID"] || "",
      data["Visit Count"] || 1,
      data["Language"] || "EN",
      data["Event Type"] || "",
      data["Event Detail"] || "",
      data["Selected Options"] || "",
      data["Client Name"] || "",
      data["Company"] || "",
      data["Country"] || "",
      data["Client Phone"] || "",
      data["Client Email"] || "",
      data["Project Type"] || "",
      data["Order Volume"] || "",
      data["Meeting Slot"] || "",
      data["Inquiry Number"] || "",
      data["Message"] || "",
      data["IP Address"] || "",
      data["Location"] || "",
      data["ISP"] || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sheetToObjects(sheet) {
  if (!sheet || sheet.getLastRow() <= 1) return [];
  var values = sheet.getDataRange().getValues();
  var headers = values[0];
  var list = [];
  for (var i = 1; i < values.length; i++) {
    if (!values[i][0] && !values[i][1]) continue;
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[String(headers[j]).trim()] = values[i][j];
    }
    list.push(obj);
  }
  return list;
}

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "get_analytics";

    if (action === "get_site_data") {
      var products = sheetToObjects(ss.getSheetByName("Products"));
      var catalogs = sheetToObjects(ss.getSheetByName("Catalogs"));
      var settingsRows = sheetToObjects(ss.getSheetByName("BrandSettings"));
      var brandSettings = {};
      settingsRows.forEach(function(r) {
        if (r.key && r.value !== undefined) brandSettings[String(r.key).trim()] = r.value;
        if (r.logoUrl) brandSettings.logoUrl = r.logoUrl;
        if (r.brandName) brandSettings.brandName = r.brandName;
        if (r.exportEmail) brandSettings.exportEmail = r.exportEmail;
      });
      return ContentService.createTextOutput(JSON.stringify({
        products: products,
        catalogs: catalogs,
        brandSettings: brandSettings
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var logSheet = ss.getSheetByName("AnalyticsLogs") || ss.getActiveSheet();
    var rows = sheetToObjects(logSheet).reverse();
    return ContentService.createTextOutput(JSON.stringify(rows))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
