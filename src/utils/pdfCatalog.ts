import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TranslationBundle } from '../i18n/translations';
import { BrandConfig, LanguageCode, ProductItem } from '../types';
import { getLocalizedProductField } from '../components/ProductDetailModal';
import { DEFAULT_UPLOADED_LOGO } from '../components/BrandLogo';

interface PdfLabels {
  docTitle: string;
  docSubtitle: string;
  editionBadge: string;
  scopeNote: string;
  colSeries: string;
  colModelSku: string;
  colName: string;
  colSpec: string;
  colOutput: string;
  colWeight: string;
  colApp: string;
  standardsTitle: string;
  standardsItems: string[];
  importerCta: string;
  footerPage: string;
}

const PDF_LABELS: Record<LanguageCode, PdfLabels> = {
  en: {
    docTitle: 'ZAYNOVA ALL-IN-ONE MASTER EXPORT CATALOGUE',
    docSubtitle: 'Complete Agro-Industrial, Forestry, Solar, Construction & Power Tool Lineup',
    editionBadge: '2026 MASTER EDITION · ENGLISH',
    scopeNote:
      'Covers all 9 flagship ZAYNOVA product divisions and 40+ commercial models engineered for authorized national importers and regional distributors.',
    colSeries: 'Series',
    colModelSku: 'Model SKU',
    colName: 'Machine / Model Description',
    colSpec: 'Engine / Spec',
    colOutput: 'Output Range',
    colWeight: 'Net Weight',
    colApp: 'Primary Application',
    standardsTitle: 'Importer Assurance & Manufacturing Standards',
    standardsItems: [
      '500-Hour Continuous Dynamometer Endurance Validation on Powerheads',
      '10-Year OEM Spare Parts Commitment (Carburetors, Pistons, Ignition, Bars & Seals)',
      'Full Export Documentation: ISO 9001:2015, CE, Euro-V & Certificate of Origin',
      'Mixed-Division Consolidation & Exclusive Country/Regional Territory Programs',
    ],
    importerCta:
      'Interested in becoming an Authorized ZAYNOVA Importer or Distributor? Submit the Importer & Distributor Partnership Form on our official portal.',
    footerPage: 'ZAYNOVA Industrial Corporation · Page',
  },
  es: {
    docTitle: 'CATÁLOGO MAESTRO DE EXPORTACIÓN TODO-EN-UNO ZAYNOVA',
    docSubtitle: 'Línea Completa Agroindustrial, Forestal, Solar, Construcción y Herramientas',
    editionBadge: 'EDICIÓN MAESTRA 2026 · ESPAÑOL',
    scopeNote:
      'Incluye las 9 divisiones principales de ZAYNOVA y más de 40 modelos comerciales diseñados para importadores nacionales y distribuidores regionales.',
    colSeries: 'Serie',
    colModelSku: 'Modelo SKU',
    colName: 'Descripción del Equipo / Modelo',
    colSpec: 'Motor / Espec.',
    colOutput: 'Potencia',
    colWeight: 'Peso Neto',
    colApp: 'Aplicación Principal',
    standardsTitle: 'Garantía para Importadores y Estándares de Manufactura',
    standardsItems: [
      'Validación de Resistencia de 500 Horas Continuas en Dinamómetro',
      'Compromiso de Repuestos OEM por 10 Años (Carburadores, Pistones, Bobinas y Sellos)',
      'Documentación de Importación Completa: ISO 9001:2015, CE, Euro-V y Certificado de Origen',
      'Consolidación Mixta de Equipos y Protección Territorial Exclusiva para Distribuidores',
    ],
    importerCta:
      '¿Interesado en ser Importador o Distribuidor Autorizado ZAYNOVA? Complete el formulario de solicitud comercial en nuestro portal oficial.',
    footerPage: 'Corporación Industrial ZAYNOVA · Página',
  },
  pt: {
    docTitle: 'CATÁLOGO MESTRE DE EXPORTAÇÃO TUDO-EM-UM ZAYNOVA',
    docSubtitle: 'Linha Completa Agroindustrial, Florestal, Solar, Construção e Ferramentas',
    editionBadge: 'EDIÇÃO MESTRE 2026 · PORTUGUÊS',
    scopeNote:
      'Abrange todas as 9 divisões principais da ZAYNOVA e mais de 40 modelos comerciais desenvolvidos para importadores nacionais e distribuidores regionais.',
    colSeries: 'Série',
    colModelSku: 'Modelo SKU',
    colName: 'Descrição da Máquina / Modelo',
    colSpec: 'Motor / Espec.',
    colOutput: 'Potência',
    colWeight: 'Peso Líq.',
    colApp: 'Aplicação Principal',
    standardsTitle: 'Garantia ao Importador e Padrões de Manufatura',
    standardsItems: [
      'Validação Contínua de 500 Horas em Dinamômetro nos Conjuntos Motores',
      'Compromisso de Peças OEM por 10 Anos (Carburadores, Pistões, Bobinas e Retentores)',
      'Documentação Completa de Exportação: ISO 9001:2015, CE, Euro-V e Certificado de Origem',
      'Consolidação Mista de Linhas e Programas de Exclusividade Territorial',
    ],
    importerCta:
      'Interessado em ser Importador ou Distribuidor Autorizado ZAYNOVA? Preencha o formulário de parceria comercial em nosso portal oficial.',
    footerPage: 'ZAYNOVA Industrial Corporation · Página',
  },
  fr: {
    docTitle: 'CATALOGUE GÉNÉRAL TOUT-EN-UN EXPORT ZAYNOVA',
    docSubtitle: 'Gamme Complète Agro-Industrielle, Forestière, Solaire, BTP & Outillage',
    editionBadge: 'ÉDITION MAÎTRE 2026 · FRANÇAIS',
    scopeNote:
      'Regroupe les 9 divisions phares ZAYNOVA et plus de 40 modèles professionnels conçus pour les importateurs nationaux et distributeurs agréés.',
    colSeries: 'Série',
    colModelSku: 'Réf. Modèle',
    colName: 'Désignation Machine / Modèle',
    colSpec: 'Moteur / Spéc.',
    colOutput: 'Puissance',
    colWeight: 'Poids Net',
    colApp: 'Application Principale',
    standardsTitle: 'Engagements Importateurs & Normes Industrielles',
    standardsItems: [
      'Validation d’Endurance Continue 500 Heures sur Banc Dynamométrique',
      'Approvisionnement Garanti 10 Ans en Pièces Détachées OEM Codifiées',
      'Dossier Douanier Complet : ISO 9001:2015, CE, Euro-V & Certificat d’Origine',
      'Expéditions Multi-Gammes Consolidées & Exclusivité Territoriale Distributeur',
    ],
    importerCta:
      'Vous souhaitez devenir Importateur ou Distributeur Agréé ZAYNOVA ? Remplissez le formulaire de candidature partenaire sur notre portail officiel.',
    footerPage: 'ZAYNOVA Industrial Corporation · Page',
  },
  de: {
    docTitle: 'ZAYNOVA GESAMTKATALOG ALL-IN-ONE EXPORT',
    docSubtitle: 'Komplettprogramm Agrar-, Forst-, Solar-, Bau- & Elektrowerkzeugtechnik',
    editionBadge: 'HAUPTAUSGABE 2026 · DEUTSCH',
    scopeNote:
      'Umfasst alle 9 ZAYNOVA-Kernproduktlinien sowie über 40 Fachhandelsmodelle für autorisierte Landesimporteure und Regionalhändler.',
    colSeries: 'Serie',
    colModelSku: 'Modell-Nr.',
    colName: 'Maschinen- / Modellbezeichnung',
    colSpec: 'Motor / Spez.',
    colOutput: 'Leistung',
    colWeight: 'Gewicht',
    colApp: 'Haupteinsatzbereich',
    standardsTitle: 'Importeursicherheit & Fertigungsstandards',
    standardsItems: [
      '500-Stunden-Dauerlaufprüfung aller Antriebsaggregate auf dem Prüfstand',
      '10 Jahre garantierte OEM-Ersatzteilversorgung (Vergaser, Kolben, Zündung, Schienen)',
      'Vollständige Exportdokumente: ISO 9001:2015, CE, Euro-V & Ursprungszeugnis',
      'Gemischte Sortimentskonsolidierung & regionale Exklusivpartnerschaften',
    ],
    importerCta:
      'Möchten Sie autorisierter ZAYNOVA-Importeur oder Fachhändler werden? Senden Sie Ihre Anfrage direkt über das Partnerformular auf unserer Website.',
    footerPage: 'ZAYNOVA Industrial Corporation · Seite',
  },
  ar: {
    docTitle: 'الكتالوج الشامل لجميع معدات ZAYNOVA للتصدير',
    docSubtitle: 'المعدات الزراعية والغابات والطاقة الشمسية والبناء والعدد الكهربائية',
    editionBadge: 'إصدار 2026 الشامل · العربية',
    scopeNote:
      'يغطي كافة خطوط الإنتاج التسعة الرئيسية وأكثر من 40 موديلاً صناعياً للمستوردين والموزعين المعتمدين.',
    colSeries: 'السلسلة',
    colModelSku: 'رمز الموديل',
    colName: 'المعدة / الموديل',
    colSpec: 'المحرك / المواصفة',
    colOutput: 'القدرة',
    colWeight: 'الوزن',
    colApp: 'الاستخدام الرئيسي',
    standardsTitle: 'ضمانات المستورد ومعايير التصنيع العالمية',
    standardsItems: [
      'اختبارات تحمل مستمرة لمدة 500 ساعة على منصات القياس',
      'التزام بتوفير قطع الغيار الأصلية OEM لمدة 10 سنوات',
      'ملف شحن وجمركة متكامل: ISO 9001 و CE و Euro-V وشهادة المنشأ',
      'إمكانية دمج عدة خطوط في شحنة واحدة مع حماية الوكالة الإقليمية',
    ],
    importerCta:
      'هل ترغب في أن تصبح مستورداً أو موزعاً معتمداً لـ ZAYNOVA؟ قم بتعبئة نموذج طلب الوكالة مباشرة عبر الموقع الرسمي.',
    footerPage: 'ZAYNOVA Industrial Corporation · صفحة',
  },
};

async function loadLogoDataUrl(logoSrc: string): Promise<string | null> {
  const src = logoSrc?.trim() ? logoSrc.trim() : DEFAULT_UPLOADED_LOGO;
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => resolve(null), 1600);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      window.clearTimeout(timer);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 400;
        canvas.height = img.naturalHeight || 300;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => {
      window.clearTimeout(timer);
      resolve(null);
    };
    img.src = src;
  });
}

function buildRows(products: ProductItem[], lang: LanguageCode, t: TranslationBundle) {
  const rows: string[][] = [];
  products.forEach((p) => {
    const localizedName = getLocalizedProductField(p, 'name', lang);
    const catLabel = t.products.categories[p.category] || p.category;
    if (p.subModels && p.subModels.length > 0) {
      p.subModels.forEach((m) => {
        rows.push([
          `${p.sku}\n(${catLabel})`,
          m.sku,
          m.name,
          m.displacement,
          m.powerSpec,
          m.weight,
          m.application,
        ]);
      });
    } else {
      rows.push([
        catLabel,
        p.sku,
        localizedName,
        p.displacement,
        p.powerSpec,
        p.weight,
        getLocalizedProductField(p, 'description', lang),
      ]);
    }
  });
  return rows;
}

/**
 * Renders crisp Arabic RTL pages onto offscreen Canvas so jsPDF outputs clean Arabic glyphs without encoding distortion.
 */
async function generateArabicCanvasPdf(
  products: ProductItem[],
  brandConfig: BrandConfig,
  labels: PdfLabels,
  t: TranslationBundle,
  logoDataUrl: string | null
) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const rows = buildRows(products, 'ar', t);

  const pageW = 1240;
  const pageH = 1754;
  const rowsPerPage = 14;
  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));

  for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
    const canvas = document.createElement('canvas');
    canvas.width = pageW;
    canvas.height = pageH;
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, pageW, pageH);

    // Top Obsidian Header
    ctx.fillStyle = '#06080A';
    ctx.fillRect(0, 0, pageW, pageIdx === 0 ? 250 : 130);
    ctx.fillStyle = '#65C800';
    ctx.fillRect(0, pageIdx === 0 ? 250 : 130, pageW, 8);

    if (logoDataUrl && pageIdx === 0) {
      const img = new Image();
      img.src = logoDataUrl;
      await new Promise((r) => {
        img.onload = r;
        img.onerror = r;
      });
      ctx.drawImage(img, 60, 42, 160, 120);
    }

    ctx.direction = 'rtl';
    ctx.textAlign = 'right';

    ctx.fillStyle = '#7BE300';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(labels.editionBadge, pageW - 60, pageIdx === 0 ? 70 : 52);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText(labels.docTitle, pageW - 60, pageIdx === 0 ? 128 : 102);

    if (pageIdx === 0) {
      ctx.fillStyle = '#D1D5DB';
      ctx.font = '22px sans-serif';
      ctx.fillText(labels.docSubtitle, pageW - 60, 178);
      ctx.fillText(labels.scopeNote, pageW - 60, 218);
    }

    // Table Header
    const startY = pageIdx === 0 ? 295 : 175;
    ctx.fillStyle = '#111417';
    ctx.fillRect(50, startY, pageW - 100, 56);

    ctx.fillStyle = '#7BE300';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(labels.colModelSku, pageW - 70, startY + 36);
    ctx.fillText(labels.colName, pageW - 260, startY + 36);
    ctx.fillText(labels.colSpec, pageW - 680, startY + 36);
    ctx.fillText(labels.colOutput, pageW - 880, startY + 36);
    ctx.fillText(labels.colWeight, pageW - 1060, startY + 36);

    const slice = rows.slice(pageIdx * rowsPerPage, (pageIdx + 1) * rowsPerPage);
    let y = startY + 60;
    slice.forEach((row, rIdx) => {
      if (rIdx % 2 === 0) {
        ctx.fillStyle = '#F8F9FA';
        ctx.fillRect(50, y, pageW - 100, 82);
      }
      ctx.strokeStyle = '#E1E4E8';
      ctx.strokeRect(50, y, pageW - 100, 82);

      ctx.fillStyle = '#111417';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(row[1], pageW - 70, y + 34);

      ctx.font = '18px sans-serif';
      ctx.fillText(row[2].slice(0, 42), pageW - 260, y + 32);
      ctx.fillStyle = '#525B66';
      ctx.font = '15px sans-serif';
      ctx.fillText(row[6].slice(0, 56), pageW - 260, y + 60);

      ctx.fillStyle = '#111417';
      ctx.font = '17px sans-serif';
      ctx.fillText(row[3], pageW - 680, y + 36);
      ctx.fillText(row[4], pageW - 880, y + 36);
      ctx.fillText(row[5], pageW - 1060, y + 36);

      y += 84;
    });

    if (pageIdx === totalPages - 1) {
      const boxY = Math.min(y + 24, pageH - 210);
      ctx.fillStyle = '#06080A';
      ctx.fillRect(50, boxY, pageW - 100, 145);
      ctx.fillStyle = '#7BE300';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(labels.standardsTitle, pageW - 75, boxY + 42);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '18px sans-serif';
      ctx.fillText(labels.importerCta, pageW - 75, boxY + 95);
    }

    ctx.fillStyle = '#525B66';
    ctx.font = '18px sans-serif';
    ctx.fillText(
      `${brandConfig.brandName} · ${labels.footerPage} ${pageIdx + 1} / ${totalPages}`,
      pageW - 60,
      pageH - 36
    );

    if (pageIdx > 0) doc.addPage();
    const pageData = canvas.toDataURL('image/jpeg', 0.92);
    doc.addImage(pageData, 'JPEG', 0, 0, 210, 297);
  }

  doc.save(`ZAYNOVA-All-in-One-Catalogue-AR.pdf`);
}

export async function downloadAllInOnePdfCatalogue(
  products: ProductItem[],
  brandConfig: BrandConfig,
  lang: LanguageCode,
  t: TranslationBundle
) {
  const labels = PDF_LABELS[lang] || PDF_LABELS.en;
  const logoDataUrl = await loadLogoDataUrl(brandConfig.logoUrl);

  if (lang === 'ar') {
    await generateArabicCanvasPdf(products, brandConfig, labels, t, logoDataUrl);
    return;
  }

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Cover Header Banner (Obsidian Black + Volt-Lime Accent)
  doc.setFillColor(6, 8, 10);
  doc.rect(0, 0, pageWidth, 48, 'F');
  doc.setFillColor(101, 200, 0);
  doc.rect(0, 48, pageWidth, 2.2, 'F');

  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, 'JPEG', 14, 9, 34, 26);
    } catch {
      // ignore image placement issue
    }
  }

  const textLeft = logoDataUrl ? 54 : 14;
  doc.setTextColor(123, 227, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(labels.editionBadge, textLeft, 15);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(labels.docTitle, textLeft, 24);

  doc.setTextColor(210, 215, 222);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(labels.docSubtitle, textLeft, 32);

  doc.setFontSize(8);
  const wrappedScope = doc.splitTextToSize(labels.scopeNote, pageWidth - textLeft - 14);
  doc.text(wrappedScope, textLeft, 39);

  // Full All-in-One Product & Sub-Model Table
  const tableRows = buildRows(products, lang, t);

  autoTable(doc, {
    startY: 56,
    head: [
      [
        labels.colSeries,
        labels.colModelSku,
        labels.colName,
        labels.colSpec,
        labels.colOutput,
        labels.colWeight,
        labels.colApp,
      ],
    ],
    body: tableRows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 7.5,
      cellPadding: 2.5,
      textColor: [17, 20, 23],
      lineColor: [225, 228, 232],
      lineWidth: 0.2,
      valign: 'middle',
    },
    headStyles: {
      fillColor: [17, 20, 23],
      textColor: [123, 227, 0],
      fontStyle: 'bold',
      fontSize: 7.8,
    },
    alternateRowStyles: {
      fillColor: [248, 249, 250],
    },
    columnStyles: {
      0: { cellWidth: 26, fontStyle: 'bold' },
      1: { cellWidth: 22, fontStyle: 'bold' },
      2: { cellWidth: 38 },
      3: { cellWidth: 22 },
      4: { cellWidth: 22 },
      5: { cellWidth: 16 },
      6: { cellWidth: 36 },
    },
    margin: { left: 14, right: 14, bottom: 20 },
  });

  // Final Importer Assurance Box (ZERO Pricing, ZERO MOQ, ZERO Email)
  const finalY = ((doc as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY || 180) + 8;
  const boxStartY = finalY > pageHeight - 58 ? (doc.addPage(), 20) : finalY;

  doc.setFillColor(6, 8, 10);
  doc.roundedRect(14, boxStartY, pageWidth - 28, 44, 2, 2, 'F');
  doc.setDrawColor(101, 200, 0);
  doc.roundedRect(14, boxStartY, pageWidth - 28, 44, 2, 2, 'S');

  doc.setTextColor(123, 227, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(labels.standardsTitle, 19, boxStartY + 8);

  doc.setTextColor(235, 238, 242);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  labels.standardsItems.forEach((item, i) => {
    doc.text(`• ${item}`, 19, boxStartY + 15 + i * 5);
  });

  doc.setTextColor(123, 227, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  const ctaWrapped = doc.splitTextToSize(labels.importerCta, pageWidth - 38);
  doc.text(ctaWrapped, 19, boxStartY + 37);

  // Page numbers on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 110, 120);
    doc.text(
      `${labels.footerPage} ${i} / ${totalPages} · ISO 9001:2015 & CE`,
      14,
      pageHeight - 8
    );
  }

  doc.save(`ZAYNOVA-All-in-One-Catalogue-${lang.toUpperCase()}.pdf`);
}
