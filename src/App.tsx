import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Menu,
  Package,
  Search,
  Send,
  ShieldCheck,
  Wrench,
  X,
} from 'lucide-react';
import BrandLogo from './components/BrandLogo';
import ProductDetailModal, { getLocalizedProductField } from './components/ProductDetailModal';
import BulkQuoteAndMeetingModal from './components/BulkQuoteAndMeetingModal';
import ExplodedPartsViewer from './components/ExplodedPartsViewer';
import AdminDashboard from './components/AdminDashboard';
import {
  ALL_SEGMENTS,
  BRUSHCUTTER_PARTS,
  CHAINSAW_PARTS,
  DEFAULT_BRAND_CONFIG,
  DEFAULT_CATALOGS,
  DEFAULT_PRODUCTS,
  EXPLODED_IMAGES,
  GLOBAL_GLOBE_IMAGE,
  HERO_SLIDES,
  OHV_ENGINE_PUMP_PARTS,
  POWERTOOL_GEARBOX_PARTS,
  PUMP_TURBINE_PARTS,
} from './data';
import { TRANSLATIONS } from './i18n/translations';
import { LanguageCode, ProductItem, ProductSegment, SiteDataBundle } from './types';
import { notifyPartnerLead, trackEvent } from './utils/analytics';
import { fetchSiteDataFromSheets } from './utils/sheetsSync';
import { downloadAllInOnePdfCatalogue } from './utils/pdfCatalog';

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'de', label: 'Deutsch' },
];

type QuickGroupKey =
  | 'all'
  | 'gardenForestry'
  | 'agroSolar'
  | 'powerPumps'
  | 'constructionWashing'
  | 'toolsSpares';

const QUICK_GROUP_MAP: Record<Exclude<QuickGroupKey, 'all'>, ProductSegment[]> = {
  gardenForestry: ['Garden & Forestry', 'Hand & Garden Tools'],
  agroSolar: [
    'Agro-Industrial Machinery',
    'Solar',
    'Spraying & Crop Protection',
    'Wood & Agro Processing',
  ],
  powerPumps: [
    'Engines & Power Generation',
    'Water Pumps & Fluid',
    'Diesel Machines',
    'Electric Machines',
  ],
  constructionWashing: [
    'Construction Equipment',
    'Pressure Washing & Cleaning',
    'Air Compressors',
    'Industrial Equipment',
    'Special Machinery',
  ],
  toolsSpares: ['Power Tools', 'Hand & Garden Tools', 'Spare Parts & Aftermarket'],
};

type AssemblyTabKey =
  | 'brushcutter'
  | 'chainsaw'
  | 'ohvEnginePump'
  | 'pumpTurbine'
  | 'powerToolGearbox';

function ProductImageCard({ src, alt, sku }: { src: string; alt: string; sku: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#F1F3F6] text-[#525B66] p-6 text-center">
        <Wrench className="w-9 h-9 text-[#387500] mb-2" />
        <span className="font-mono text-xs font-semibold text-[#111417]">{sku}</span>
        <span className="text-xs mt-1 line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
    />
  );
}

function CatalogCoverCard({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#F1F3F6]">
        <BookOpen className="w-10 h-10 text-[#387500]" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover"
    />
  );
}

export function App() {
  const [lang, setLang] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('zaynova_lang') as LanguageCode | null;
    return saved && TRANSLATIONS[saved] ? saved : 'en';
  });

  const t = TRANSLATIONS[lang];

  const [siteData, setSiteData] = useState<SiteDataBundle>({
    products: DEFAULT_PRODUCTS,
    catalogs: DEFAULT_CATALOGS,
    brandConfig: DEFAULT_BRAND_CONFIG,
    source: 'default',
  });

  const [quickGroup, setQuickGroup] = useState<QuickGroupKey>('all');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | ProductSegment>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Automatic Hero Slideshow & Globe Fallback
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [heroCarouselPaused, setHeroCarouselPaused] = useState(false);
  const [globeImgError, setGlobeImgError] = useState(false);

  // Cinematic Exploded Assembly Showcase State
  const [assemblyTab, setAssemblyTab] = useState<AssemblyTabKey>('brushcutter');

  // Modals state
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [activeProductMode, setActiveProductMode] = useState<'studio' | 'exploded'>('studio');
  const [matchedSubModelSku, setMatchedSubModelSku] = useState<string>('');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryModalTab, setInquiryModalTab] = useState<'quote' | 'meeting'>('quote');
  const [preselectedModel, setPreselectedModel] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);

  // Unified PDF download, Importer FAQ & Direct Partnership Form state
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);
  const [inlineCompany, setInlineCompany] = useState('');
  const [inlineName, setInlineName] = useState('');
  const [inlineCountry, setInlineCountry] = useState('');
  const [inlinePhone, setInlinePhone] = useState('');
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlineRole, setInlineRole] = useState('National / Exclusive Importer');
  const [inlineDivisions, setInlineDivisions] = useState(
    'Brush Cutters, Chainsaws & Agro Tillers'
  );
  const [inlineNotes, setInlineNotes] = useState('');
  const [inlineSubmitting, setInlineSubmitting] = useState(false);
  const [inlineSubmitted, setInlineSubmitted] = useState(false);

  const syncFromSheet = useCallback(async () => {
    const bundle = await fetchSiteDataFromSheets();
    setSiteData(bundle);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    localStorage.setItem('zaynova_lang', lang);
  }, [lang, t.dir]);

  useEffect(() => {
    syncFromSheet();
    trackEvent({
      eventType: 'PAGE_VIEW',
      eventDetail: 'Visited ZAYNOVA Global Machinery & Distributor Portal',
      language: lang,
      optionTag: `Lang:${lang.toUpperCase()}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (heroCarouselPaused || HERO_SLIDES.length <= 1) return;
    const timer = window.setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [heroCarouselPaused]);

  const handleLanguageChange = (nextLang: LanguageCode) => {
    setLang(nextLang);
    trackEvent({
      eventType: 'LANGUAGE_CHANGE',
      eventDetail: `Switched Storefront Language to ${TRANSLATIONS[nextLang].nativeName}`,
      language: nextLang,
      optionTag: `Lang:${nextLang.toUpperCase()}`,
    });
  };

  const handleQuickGroupSelect = (group: QuickGroupKey) => {
    setQuickGroup(group);
    setSelectedCategory('ALL');
    trackEvent({
      eventType: 'CATEGORY_SELECT',
      eventDetail: `Filtered Quick Division: ${group}`,
      language: lang,
      optionTag: `Group:${group}`,
    });
  };

  const handleCategorySelect = (cat: 'ALL' | ProductSegment) => {
    setSelectedCategory(cat);
    setQuickGroup('all');
    trackEvent({
      eventType: 'CATEGORY_SELECT',
      eventDetail: `Filtered Machinery Division: ${cat}`,
      language: lang,
      optionTag: `Seg:${cat}`,
    });
  };

  const handleInspectProduct = (
    product: ProductItem,
    mode: 'studio' | 'exploded' = 'studio'
  ) => {
    let subSku = '';
    const q = searchQuery.trim().toLowerCase();
    if (q && product.subModels && product.subModels.length > 0) {
      const hit = product.subModels.find(
        (m) =>
          m.sku.toLowerCase().includes(q) ||
          m.name.toLowerCase().includes(q) ||
          m.application.toLowerCase().includes(q)
      );
      if (hit) subSku = hit.sku;
    }

    setMatchedSubModelSku(subSku);
    setActiveProductMode(mode);
    setActiveProduct(product);
    trackEvent({
      eventType: 'PRODUCT_VIEW',
      eventDetail: `Opened ${mode === 'exploded' ? 'Exploded Parts' : 'Models'} for ${
        product.sku
      } (${product.name})`,
      language: lang,
      projectType: product.sku,
      optionTag: `SKU:${product.sku}${mode === 'exploded' ? ':Parts' : ''}`,
    });
  };

  const openQuoteModal = (tab: 'quote' | 'meeting', modelLabel = '') => {
    setInquiryModalTab(tab);
    setPreselectedModel(modelLabel);
    setInquiryModalOpen(true);
    trackEvent({
      eventType: 'BUTTON_CLICK',
      eventDetail: `Opened ${tab === 'meeting' ? 'Meeting Booking' : 'Dealer Query'} Modal${
        modelLabel ? ` for ${modelLabel}` : ''
      }`,
      language: lang,
      optionTag: tab === 'meeting' ? 'Intent:Meeting' : 'Intent:DealerQuery',
    });
  };

  const handleDownloadMasterPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      await downloadAllInOnePdfCatalogue(
        siteData.products,
        siteData.brandConfig,
        lang,
        t
      );
      trackEvent({
        eventType: 'CATALOG_DOWNLOAD',
        eventDetail: `Downloaded All-in-One PDF Catalogue (${TRANSLATIONS[lang].nativeName})`,
        language: lang,
        projectType: 'ALL_IN_ONE_PDF_2026',
        optionTag: `PDF:${lang.toUpperCase()}`,
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleInlinePartnerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !inlineName.trim() ||
      !inlineCountry.trim() ||
      !inlinePhone.trim() ||
      !inlineEmail.trim()
    ) {
      return;
    }
    setInlineSubmitting(true);
    try {
      const current =
        parseInt(localStorage.getItem('zaynova_inquiry_counter') || '1', 10) || 1;
      localStorage.setItem('zaynova_inquiry_counter', String(current + 1));
      const inquiryNum = String(current).padStart(4, '0');

      await Promise.all([
        trackEvent({
          eventType: 'BULK_QUOTE_SUBMIT',
          eventDetail: `Importer/Distributor Form: ${inlineDivisions} (${inlineRole} - ${inlineCountry})`,
          language: lang,
          optionTag: `Partner:${inlineCountry}:${inlineRole}`,
          clientName: inlineName.trim(),
          companyName: inlineCompany.trim() || 'Independent Importer',
          country: inlineCountry.trim(),
          clientPhone: inlinePhone.trim(),
          clientEmail: inlineEmail.trim(),
          projectType: inlineDivisions.trim(),
          orderVolume: inlineRole,
          inquiryNum,
          message:
            inlineNotes.trim() ||
            'Direct importer & distributor partnership request via portal.',
        }),
        notifyPartnerLead({
          inquiryType: 'Importer & Distributor Partnership Application',
          inquiryNum,
          companyName: inlineCompany.trim() || 'Independent Importer',
          contactName: inlineName.trim(),
          country: inlineCountry.trim(),
          phone: inlinePhone.trim(),
          email: inlineEmail.trim(),
          preferredDivisions: inlineDivisions.trim(),
          partnershipRole: inlineRole,
          language: lang,
          notes:
            inlineNotes.trim() ||
            'Direct importer & distributor partnership request via portal.',
        }),
      ]);
      setInlineSubmitted(true);
    } finally {
      setInlineSubmitting(false);
    }
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return siteData.products.filter((p) => {
      const segmentMatch =
        selectedCategory !== 'ALL'
          ? p.category === selectedCategory
          : quickGroup === 'all'
          ? true
          : QUICK_GROUP_MAP[quickGroup].includes(p.category);

      if (!segmentMatch) return false;
      if (!q) return true;

      const localizedName = getLocalizedProductField(p, 'name', lang).toLowerCase();
      const localizedDesc = getLocalizedProductField(p, 'description', lang).toLowerCase();
      const highlightsText = (p.highlights || []).join(' ').toLowerCase();
      const categoryText = (t.products.categories[p.category] || p.category).toLowerCase();
      const subModelsText = (p.subModels || [])
        .map((m) => `${m.sku} ${m.name} ${m.displacement} ${m.powerSpec} ${m.application}`)
        .join(' ')
        .toLowerCase();

      return (
        p.sku.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        localizedName.includes(q) ||
        localizedDesc.includes(q) ||
        p.displacement.toLowerCase().includes(q) ||
        p.powerSpec.toLowerCase().includes(q) ||
        highlightsText.includes(q) ||
        categoryText.includes(q) ||
        subModelsText.includes(q)
      );
    });
  }, [siteData.products, selectedCategory, quickGroup, searchQuery, lang, t.products.categories]);

  const activeAssemblyConfig = useMemo(() => {
    if (assemblyTab === 'chainsaw') {
      const matched =
        siteData.products.find((p) => p.id === 'line-chainsaws' || p.sku.includes('CS')) ||
        siteData.products.find((p) => p.category === 'Garden & Forestry');
      return {
        imageUrl: EXPLODED_IMAGES.chainsaw,
        parts: CHAINSAW_PARTS,
        title: matched
          ? `${matched.sku} · ${getLocalizedProductField(matched, 'name', lang)}`
          : 'ZYN-CS Series · Pro Timber Chainsaw Assembly',
        product: matched || siteData.products[0],
      };
    }

    if (assemblyTab === 'ohvEnginePump') {
      const matched =
        siteData.products.find((p) => p.id === 'line-power-pumps' || p.sku.includes('GP')) ||
        siteData.products.find(
          (p) =>
            p.category === 'Agro-Industrial Machinery' ||
            p.category === 'Engines & Power Generation' ||
            p.category === 'Water Pumps & Fluid'
        );
      return {
        imageUrl: matched?.explodedImageUrl || EXPLODED_IMAGES.ohvEnginePump,
        parts:
          matched?.parts && matched.parts.length > 0 ? matched.parts : OHV_ENGINE_PUMP_PARTS,
        title: matched
          ? `${matched.sku} · ${getLocalizedProductField(matched, 'name', lang)}`
          : '4-Stroke OHV Engine, Alternator & Centrifugal Pump Cutaway',
        product: matched || siteData.products[0],
      };
    }

    if (assemblyTab === 'pumpTurbine') {
      const matched =
        siteData.products.find((p) => p.id === 'line-washing-air' || p.sku.includes('PW')) ||
        siteData.products.find((p) => p.category === 'Pressure Washing & Cleaning');
      return {
        imageUrl: matched?.explodedImageUrl || EXPLODED_IMAGES.pumpTurbine,
        parts: matched?.parts && matched.parts.length > 0 ? matched.parts : PUMP_TURBINE_PARTS,
        title: matched
          ? `${matched.sku} · ${getLocalizedProductField(matched, 'name', lang)}`
          : 'ZYN-PW Series · Triplex Plunger Pump & Turbine Powertrain',
        product: matched || siteData.products[0],
      };
    }

    if (assemblyTab === 'powerToolGearbox') {
      const matched =
        siteData.products.find((p) => p.id === 'line-tools-spares' || p.sku.includes('OEM')) ||
        siteData.products.find((p) => p.category === 'Power Tools');
      return {
        imageUrl: matched?.explodedImageUrl || EXPLODED_IMAGES.powerToolGearbox,
        parts:
          matched?.parts && matched.parts.length > 0
            ? matched.parts
            : POWERTOOL_GEARBOX_PARTS,
        title: matched
          ? `${matched.sku} · ${getLocalizedProductField(matched, 'name', lang)}`
          : 'ZYN-OEM Series · Brushless Motor & Planetary Steel Gearbox',
        product: matched || siteData.products[0],
      };
    }

    const matched =
      siteData.products.find((p) => p.id === 'line-brushcutters' || p.sku.includes('BC')) ||
      siteData.products.find((p) => p.category === 'Garden & Forestry');
    return {
      imageUrl: matched?.explodedImageUrl || EXPLODED_IMAGES.brushcutter,
      parts: matched?.parts && matched.parts.length > 0 ? matched.parts : BRUSHCUTTER_PARTS,
      title: matched
        ? `${matched.sku} · ${getLocalizedProductField(matched, 'name', lang)}`
        : 'ZYN-BC Series · Heavy Clearing Brush Cutter & Agro Shaft',
      product: matched || siteData.products[0],
    };
  }, [assemblyTab, siteData.products, lang]);

  const handleAssemblyTabSwitch = (key: AssemblyTabKey, logLabel: string) => {
    setAssemblyTab(key);
    trackEvent({
      eventType: 'BUTTON_CLICK',
      eventDetail: `Switched Blueprint: ${logLabel}`,
      language: lang,
      optionTag: `Blueprint:${key}`,
    });
  };

  const quickTabs: { key: QuickGroupKey; label: string }[] = [
    { key: 'all', label: t.products.quickGroups.all },
    { key: 'gardenForestry', label: t.products.quickGroups.gardenForestry },
    { key: 'agroSolar', label: t.products.quickGroups.agroSolar },
    { key: 'powerPumps', label: t.products.quickGroups.powerPumps },
    { key: 'constructionWashing', label: t.products.quickGroups.constructionWashing },
    { key: 'toolsSpares', label: t.products.quickGroups.toolsSpares },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#06080A] text-[#111417]" dir={t.dir}>
      {/* Non-Sticky Corporate Utility Bar with Language Selector */}
      <div className="bg-[#06080A] text-gray-300 border-b border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-300 truncate">
            <Globe className="w-3.5 h-3.5 text-[#7BE300] shrink-0" />
            <span className="truncate">{t.utility.globalExport}</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <label className="flex items-center gap-2 text-xs text-gray-300">
              <span className="sr-only">{t.utility.languageLabel}</span>
              <select
                aria-label={t.utility.languageLabel}
                value={lang}
                onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
                className="bg-[#111417] border border-white/20 hover:border-[#65C800] text-white text-xs font-medium rounded px-2.5 py-1 focus:outline-none focus:border-[#65C800] cursor-pointer"
              >
                {LANGUAGES.map((item) => (
                  <option key={item.code} value={item.code} className="bg-[#111417] text-white">
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Strict 3-Zone Obsidian Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#06080A]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Enlarged Highlighted ZAYNOVA Logo */}
          <a href="#about" className="shrink-0 focus-visible:outline-none">
            <BrandLogo
              logoUrl={siteData.brandConfig.logoUrl}
              brandName={siteData.brandConfig.brandName}
              darkSurface
              sizeClass="h-14 sm:h-16"
            />
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-gray-200">
            <a
              href="#about"
              className="hover:text-[#7BE300] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.aboutUs}
            </a>
            <a
              href="#products"
              className="hover:text-[#7BE300] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.products}
            </a>
            <a
              href="#engineering"
              className="hover:text-[#7BE300] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.spareParts}
            </a>
            <a
              href="#catalogs"
              className="hover:text-[#7BE300] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.catalogs}
            </a>
            <a
              href="#contact"
              className="hover:text-[#7BE300] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.contactUs}
            </a>
          </nav>

          {/* Zone 3: 1 Primary CTA Action (+ Mobile Menu Button) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openQuoteModal('quote')}
              className="px-4 sm:px-5 py-2.5 rounded-lg bg-[#65C800] hover:bg-[#7BE300] text-[#111417] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.becomeDealer}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#06080A] px-4 py-4 space-y-3 text-gray-200">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-[#7BE300]"
            >
              {t.nav.aboutUs}
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-[#7BE300]"
            >
              {t.nav.products}
            </a>
            <a
              href="#engineering"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-[#7BE300]"
            >
              {t.nav.spareParts}
            </a>
            <a
              href="#catalogs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-[#7BE300]"
            >
              {t.nav.catalogs}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-[#7BE300]"
            >
              {t.nav.contactUs}
            </a>
          </div>
        )}
      </header>

      {/* Subtle Desktop Right-Edge Vertical Catalogue Quick-Jump Tab */}
      <a
        href="#catalogs"
        className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-[#65C800] text-[#111417] border border-r-0 border-[#E1E4E8] rounded-l-lg px-2 py-4 text-xs font-bold tracking-wider uppercase shadow-md transition-colors items-center justify-center"
        style={{ writingMode: 'vertical-rl' }}
      >
        {t.catalogs.floatingLabel}
      </a>

      <main className="flex-1">
        {/* SECTION 1: WE ARE ZAYNOVA — Centered Search + Industrial Campus Aerial Hero */}
        <section id="about" className="bg-[#06080A] text-white pt-10 pb-12 lg:pt-14 lg:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1
                className="font-display font-extrabold tracking-tight text-white uppercase leading-tight"
                style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.65rem)' }}
              >
                {t.hero.weAreTitle}
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {t.hero.subheadline}
              </p>
            </div>

            {/* Centered Automatic Branded Machinery & Manufacturing Carousel */}
            <div
              className="max-w-6xl mx-auto pt-1"
              onMouseEnter={() => setHeroCarouselPaused(true)}
              onMouseLeave={() => setHeroCarouselPaused(false)}
            >
              <div
                dir="ltr"
                className="relative aspect-[16/9] max-h-[520px] w-full rounded-xl overflow-hidden border border-white/15 bg-[#111417] shadow-2xl"
              >
                <div
                  className="flex h-full w-full transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${heroSlideIdx * 100}%)` }}
                >
                  {HERO_SLIDES.map((slide) => {
                    const matchedProduct = slide.targetProductId
                      ? siteData.products.find((p) => p.id === slide.targetProductId)
                      : undefined;

                    return (
                      <div key={slide.id} className="relative w-full h-full shrink-0">
                        <img
                          src={slide.imageUrl}
                          alt={slide.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06080A]/90 via-[#06080A]/15 to-transparent pointer-events-none" />

                        <div
                          dir={t.dir}
                          className="absolute bottom-0 inset-x-0 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-start"
                        >
                          <div className="space-y-1 max-w-2xl">
                            <div className="font-mono text-xs font-bold tracking-wider text-[#7BE300]">
                              {slide.seriesCode}
                            </div>
                            <div className="font-display text-lg sm:text-2xl font-bold text-white leading-snug">
                              {slide.title}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-300">{slide.subtitle}</p>
                          </div>

                          {matchedProduct && (
                            <button
                              type="button"
                              onClick={() => handleInspectProduct(matchedProduct, 'studio')}
                              className="px-4 py-2.5 rounded-lg bg-[#65C800] hover:bg-[#7BE300] text-[#111417] text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 self-start sm:self-end cursor-pointer transition-colors"
                            >
                              <span>{t.products.exploreModels}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Previous / Next Controls */}
                <button
                  type="button"
                  onClick={() =>
                    setHeroSlideIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                  }
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#06080A]/70 hover:bg-[#65C800] text-white hover:text-[#111417] border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length)}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#06080A]/70 hover:bg-[#65C800] text-white hover:text-[#111417] border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Subtle Slide Indicator Bars */}
                <div className="hidden sm:flex items-center gap-1.5 absolute top-4 right-4 bg-[#06080A]/65 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setHeroSlideIdx(idx)}
                      aria-label={`Slide ${idx + 1}: ${slide.seriesCode}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === heroSlideIdx ? 'w-6 bg-[#7BE300]' : 'w-2 bg-white/35 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PRESENCE GLOBAL + Wireframe Network Globe */}
        <section className="bg-[#06080A] text-white py-14 lg:py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Presence Global + Stacked Bold KPIs */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2
                    className="font-display font-extrabold text-white leading-[1.05] tracking-tight"
                    style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.25rem)' }}
                  >
                    {t.hero.presenceLead}
                  </h2>
                  <div
                    className="font-display font-light text-white leading-[1.1] tracking-tight"
                    style={{ fontSize: 'clamp(2.1rem, 3.6vw, 3.1rem)' }}
                  >
                    {t.hero.presenceEmphasis}
                  </div>
                  <div className="h-1 w-28 bg-[#7BE300] mt-3" />
                </div>

                <div className="space-y-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#7BE300] tabular-nums">
                      {t.hero.stat1Val}
                    </span>
                    <span className="text-sm sm:text-base font-medium tracking-[0.16em] text-gray-200 uppercase">
                      {t.hero.stat1Label}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#7BE300] tabular-nums">
                      {t.hero.stat2Val}
                    </span>
                    <span className="text-sm sm:text-base font-medium tracking-[0.16em] text-gray-200 uppercase">
                      {t.hero.stat2Label}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#7BE300] tabular-nums">
                      {t.hero.stat3Val}
                    </span>
                    <span className="text-sm sm:text-base font-medium tracking-[0.16em] text-gray-200 uppercase">
                      {t.hero.stat3Label}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => openQuoteModal('quote')}
                    className="px-5 py-3 rounded-lg bg-[#65C800] hover:bg-[#7BE300] text-[#111417] text-sm font-bold transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>{t.hero.ctaDealer}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => openQuoteModal('meeting')}
                    className="px-5 py-3 rounded-lg border border-white/25 hover:border-white text-white text-sm font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#7BE300]" />
                    <span>{t.hero.ctaMeeting}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Glowing 3D Network Wireframe Globe */}
              <div className="lg:col-span-7">
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#06080A] flex items-center justify-center">
                  {!globeImgError ? (
                    <img
                      src={GLOBAL_GLOBE_IMAGE}
                      alt="ZAYNOVA Global Distributor & Export Network"
                      referrerPolicy="no-referrer"
                      onError={() => setGlobeImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center border border-white/10 rounded-xl p-8 text-center">
                      <Globe className="w-16 h-16 text-[#7BE300] mb-3" />
                      <span className="font-display text-lg font-bold text-white">
                        ZAYNOVA Global Distribution Network
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CORE PRODUCT DIVISIONS (1 Card Per Line -> Click to Explore All Models) */}
        <section id="products" className="py-16 lg:py-20 bg-[#F8F9FA] border-b border-[#E1E4E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111417] tracking-tight">
                  {t.products.sectionTitle}
                </h2>
                <p className="text-sm text-[#525B66] mt-2 leading-relaxed">
                  {t.products.sectionSubtitle}
                </p>
              </div>
              <div className="text-xs font-mono text-[#525B66] tabular-nums shrink-0">
                {filteredProducts.length} / {siteData.products.length} {t.products.specs.units}
              </div>
            </div>

            {/* Clean Division Filter Bar: Quick Tabs + 17-Segment Dropdown + Search */}
            <div className="space-y-3">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1 p-1 bg-[#E1E4E8]/70 rounded-lg overflow-x-auto">
                    {quickTabs.map((tab) => {
                      const isActive = quickGroup === tab.key && selectedCategory === 'ALL';
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => handleQuickGroupSelect(tab.key)}
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isActive
                              ? 'bg-white text-[#111417] shadow-sm'
                              : 'text-[#525B66] hover:text-[#111417]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <label className="flex items-center gap-2 bg-white border border-[#E1E4E8] rounded-lg px-3 py-2 text-xs font-semibold text-[#111417] shrink-0">
                    <span className="text-[#525B66] whitespace-nowrap">
                      {t.products.segmentSelectLabel}
                    </span>
                    <select
                      aria-label={t.products.segmentSelectLabel}
                      value={selectedCategory}
                      onChange={(e) =>
                        handleCategorySelect(e.target.value as 'ALL' | ProductSegment)
                      }
                      className="bg-transparent font-semibold text-[#111417] focus:outline-none cursor-pointer max-w-[200px]"
                    >
                      <option value="ALL">{t.products.allCategories}</option>
                      {ALL_SEGMENTS.map((seg) => (
                        <option key={seg} value={seg}>
                          {t.products.categories[seg] || seg}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Live Model / Sub-Product / Part Search */}
                <div className="relative w-full lg:w-72 shrink-0">
                  <Search className="w-4 h-4 text-[#525B66] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.hero.searchPlaceholder}
                    className="w-full bg-white border border-[#E1E4E8] focus:border-[#4D9E00] rounded-lg pl-10 pr-4 py-2 text-sm text-[#111417] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3-Column Core Product Division Cards (Zero Pricing, Zero MOQ) */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E1E4E8] rounded-xl p-12 text-center space-y-3">
                <p className="text-sm text-[#525B66]">{t.products.emptyTitle}</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuickGroup('all');
                    setSelectedCategory('ALL');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-lg bg-[#111417] text-white text-xs font-semibold cursor-pointer"
                >
                  {t.products.emptyReset}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const pName = getLocalizedProductField(product, 'name', lang);
                  const pDesc = getLocalizedProductField(product, 'description', lang);
                  const catLabel = t.products.categories[product.category] || product.category;
                  const subCount = product.subModels?.length || 0;

                  return (
                    <article
                      key={product.id}
                      className="group bg-white border border-[#E1E4E8] hover:border-[#111417]/40 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <button
                        type="button"
                        onClick={() => handleInspectProduct(product, 'studio')}
                        className="aspect-[4/3] w-full bg-[#F1F3F6] overflow-hidden border-b border-[#E1E4E8] cursor-pointer text-left"
                      >
                        <ProductImageCard
                          src={product.imageUrl}
                          alt={pName}
                          sku={product.sku}
                        />
                      </button>

                      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-[#525B66]">
                            <span className="font-mono font-semibold text-[#111417]">
                              {product.sku}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="truncate">{catLabel}</span>
                            {subCount > 0 && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="text-[#387500] font-semibold whitespace-nowrap tabular-nums">
                                  {subCount} {t.products.specs.modelsLabel}
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="font-display text-base font-bold text-[#111417] leading-snug">
                            <button
                              type="button"
                              onClick={() => handleInspectProduct(product, 'studio')}
                              className="text-start hover:text-[#387500] transition-colors cursor-pointer"
                            >
                              {pName}
                            </button>
                          </h3>

                          <p className="text-xs text-[#525B66] leading-relaxed line-clamp-2">
                            {pDesc}
                          </p>
                        </div>

                        <div className="space-y-3.5">
                          <div className="grid grid-cols-2 gap-3 border-t border-b border-[#E1E4E8] py-2.5 text-xs">
                            <div>
                              <div className="text-[11px] text-[#525B66]">
                                {t.products.specs.displacement}
                              </div>
                              <div className="font-mono font-semibold text-[#111417] tabular-nums truncate">
                                {product.displacement}
                              </div>
                            </div>
                            <div>
                              <div className="text-[11px] text-[#525B66]">
                                {t.products.specs.power}
                              </div>
                              <div className="font-mono font-semibold text-[#111417] tabular-nums truncate">
                                {product.powerSpec}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleInspectProduct(product, 'exploded')}
                              className="flex-1 py-2.5 px-2.5 rounded-lg border border-[#E1E4E8] hover:border-[#111417] text-xs font-semibold text-[#111417] transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-1.5"
                            >
                              <Layers className="w-3.5 h-3.5 text-[#387500]" />
                              <span>{t.products.inspectParts}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleInspectProduct(product, 'studio')}
                              className="flex-1 py-2.5 px-2.5 rounded-lg bg-[#111417] hover:bg-[#1C2024] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-1.5"
                            >
                              <span>{t.products.exploreModels}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#7BE300]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4: Cinematic Internal Assembly & OEM Spare Parts Explorer */}
        <section id="engineering" className="py-16 lg:py-20 bg-white border-b border-[#E1E4E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111417] tracking-tight">
                  {t.engineering.sectionTitle}
                </h2>
                <p className="text-sm text-[#525B66] mt-2 leading-relaxed">
                  {t.engineering.sectionSubtitle}
                </p>
              </div>

              {activeAssemblyConfig.product && (
                <button
                  type="button"
                  onClick={() =>
                    handleInspectProduct(activeAssemblyConfig.product, 'studio')
                  }
                  className="px-4 py-2 rounded-lg border border-[#111417] text-xs font-semibold text-[#111417] hover:bg-[#111417] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-auto"
                >
                  {t.engineering.openFullSpecs}
                </button>
              )}
            </div>

            {/* 5-Tab Segmented Engineering Blueprint Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#F1F3F6] rounded-lg overflow-x-auto w-full lg:w-fit">
              <button
                type="button"
                onClick={() =>
                  handleAssemblyTabSwitch('brushcutter', 'Brush Cutter & Agro Shaft')
                }
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  assemblyTab === 'brushcutter'
                    ? 'bg-[#111417] text-[#7BE300] shadow-sm'
                    : 'text-[#525B66] hover:text-[#111417]'
                }`}
              >
                {t.engineering.tabBrushCutter}
              </button>
              <button
                type="button"
                onClick={() => handleAssemblyTabSwitch('chainsaw', 'Chainsaw Powertrain')}
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  assemblyTab === 'chainsaw'
                    ? 'bg-[#111417] text-[#7BE300] shadow-sm'
                    : 'text-[#525B66] hover:text-[#111417]'
                }`}
              >
                {t.engineering.tabChainsaw}
              </button>
              <button
                type="button"
                onClick={() =>
                  handleAssemblyTabSwitch('ohvEnginePump', '4-Stroke OHV Engine & Pump')
                }
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  assemblyTab === 'ohvEnginePump'
                    ? 'bg-[#111417] text-[#7BE300] shadow-sm'
                    : 'text-[#525B66] hover:text-[#111417]'
                }`}
              >
                {t.engineering.tabOhvEnginePump}
              </button>
              <button
                type="button"
                onClick={() =>
                  handleAssemblyTabSwitch('pumpTurbine', 'Turbine & Triplex Washer')
                }
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  assemblyTab === 'pumpTurbine'
                    ? 'bg-[#111417] text-[#7BE300] shadow-sm'
                    : 'text-[#525B66] hover:text-[#111417]'
                }`}
              >
                {t.engineering.tabPumpTurbine}
              </button>
              <button
                type="button"
                onClick={() =>
                  handleAssemblyTabSwitch('powerToolGearbox', 'Brushless Power Tool & Gear')
                }
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  assemblyTab === 'powerToolGearbox'
                    ? 'bg-[#111417] text-[#7BE300] shadow-sm'
                    : 'text-[#525B66] hover:text-[#111417]'
                }`}
              >
                {t.engineering.tabPowerToolGearbox}
              </button>
            </div>

            <ExplodedPartsViewer
              imageUrl={activeAssemblyConfig.imageUrl}
              parts={activeAssemblyConfig.parts}
              title={activeAssemblyConfig.title}
              t={t}
              onSelectPart={(part) =>
                trackEvent({
                  eventType: 'BUTTON_CLICK',
                  eventDetail: `Inspected Internal Part: ${part.partCode} - ${part.name}`,
                  language: lang,
                  optionTag: `Part:${part.partCode}`,
                })
              }
            />
          </div>
        </section>

        {/* SECTION 5: Unified All-in-One Multilingual Master PDF Catalogue */}
        <section id="catalogs" className="py-16 lg:py-20 bg-[#F8F9FA] border-b border-[#E1E4E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111417] tracking-tight">
                {t.catalogs.sectionTitle}
              </h2>
              <p className="text-sm text-[#525B66] mt-2 leading-relaxed">
                {t.catalogs.sectionSubtitle}
              </p>
            </div>

            <div className="bg-white border border-[#E1E4E8] rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 bg-[#06080A] min-h-[260px] lg:min-h-[380px] relative overflow-hidden border-b lg:border-b-0 lg:border-e border-[#E1E4E8]">
                <CatalogCoverCard
                  src={siteData.catalogs[0]?.coverImage || ''}
                  alt={t.catalogs.masterTitle}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080A]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold text-[#7BE300] tracking-wider">
                    2026 MASTER PDF · {t.shortLabel}
                  </span>
                  <span className="font-mono text-[11px] text-gray-200 bg-[#06080A]/80 border border-white/15 px-2.5 py-1 rounded">
                    {siteData.products.length} {t.products.specs.units.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#387500] uppercase tracking-wider">
                    <FileText className="w-4 h-4" />
                    <span>{t.catalogs.masterBadge}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111417] leading-snug">
                    {t.catalogs.masterTitle}
                  </h3>

                  <p className="text-sm text-[#525B66] leading-relaxed">
                    {t.catalogs.masterDesc}
                  </p>

                  <ul className="space-y-2 pt-1 text-xs sm:text-sm text-[#111417]">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#4D9E00] shrink-0 mt-0.5" />
                      <span>{t.catalogs.bullet1}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#4D9E00] shrink-0 mt-0.5" />
                      <span>{t.catalogs.bullet2}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#4D9E00] shrink-0 mt-0.5" />
                      <span>{t.catalogs.bullet3}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E1E4E8] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-[#525B66]">
                      {t.catalogs.activeLangHint}{' '}
                      <span className="font-bold text-[#111417]">{t.nativeName}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {LANGUAGES.map((item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => handleLanguageChange(item.code)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                            lang === item.code
                              ? 'bg-[#111417] text-[#7BE300]'
                              : 'bg-[#F1F3F6] text-[#525B66] hover:text-[#111417]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadMasterPdf}
                    disabled={isGeneratingPdf}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#65C800] hover:bg-[#7BE300] text-[#111417] text-sm font-bold transition-colors inline-flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {isGeneratingPdf
                        ? t.catalogs.generatingBtn
                        : `${t.catalogs.downloadBtn} (${t.nativeName})`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Global Manufacturing Standards, Importer FAQs & Direct Partner Form */}
        <section id="contact" className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
            {/* Top Overview & 3 Engineering Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111417] tracking-tight">
                  {t.exportSection.sectionTitle}
                </h2>
                <p className="text-sm text-[#525B66] leading-relaxed">
                  {t.exportSection.sectionSubtitle}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openQuoteModal('meeting')}
                    className="px-5 py-2.5 rounded-lg bg-[#111417] hover:bg-[#1C2024] text-white text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#7BE300]" />
                    <span>{t.exportSection.scheduleMeetingBtn}</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-[#F8F9FA] border border-[#E1E4E8] space-y-2">
                  <Wrench className="w-5 h-5 text-[#387500]" />
                  <h3 className="font-display text-sm font-bold text-[#111417]">
                    {t.exportSection.pillar1Title}
                  </h3>
                  <p className="text-xs text-[#525B66] leading-relaxed">
                    {t.exportSection.pillar1Desc}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F8F9FA] border border-[#E1E4E8] space-y-2">
                  <Package className="w-5 h-5 text-[#387500]" />
                  <h3 className="font-display text-sm font-bold text-[#111417]">
                    {t.exportSection.pillar2Title}
                  </h3>
                  <p className="text-xs text-[#525B66] leading-relaxed">
                    {t.exportSection.pillar2Desc}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F8F9FA] border border-[#E1E4E8] space-y-2">
                  <ShieldCheck className="w-5 h-5 text-[#387500]" />
                  <h3 className="font-display text-sm font-bold text-[#111417]">
                    {t.exportSection.pillar3Title}
                  </h3>
                  <p className="text-xs text-[#525B66] leading-relaxed">
                    {t.exportSection.pillar3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* 3-Step Importer Onboarding Roadmap */}
            <div className="rounded-xl bg-[#06080A] text-white p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-white">
                  {t.exportSection.onboardingStepsTitle}
                </h3>
                <span className="font-mono text-xs text-[#7BE300]">
                  ISO 9001 · CE · EURO-V · OEM
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-1.5">
                  <div className="font-display text-sm font-bold text-[#7BE300]">
                    {t.exportSection.step1Title}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {t.exportSection.step1Desc}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-1.5">
                  <div className="font-display text-sm font-bold text-[#7BE300]">
                    {t.exportSection.step2Title}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {t.exportSection.step2Desc}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-1.5">
                  <div className="font-display text-sm font-bold text-[#7BE300]">
                    {t.exportSection.step3Title}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {t.exportSection.step3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* 2-Column Doubt-Clearing FAQ + Direct Importer & Distributor Application Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Importer FAQ Accordion */}
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#387500] uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4" />
                    <span>IMPORTER &amp; DISTRIBUTOR CLARITY</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111417]">
                    {t.exportSection.faqTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525B66] leading-relaxed">
                    {t.exportSection.faqSubtitle}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {t.exportSection.faqs.map((item, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border transition-colors ${
                          isOpen
                            ? 'border-[#4D9E00] bg-[#F8F9FA]'
                            : 'border-[#E1E4E8] bg-white hover:border-[#111417]/30'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                          aria-expanded={isOpen}
                          className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-start cursor-pointer"
                        >
                          <span className="font-display text-sm font-bold text-[#111417] leading-snug">
                            {item.q}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#387500] shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs sm:text-sm text-[#525B66] leading-relaxed border-t border-[#E1E4E8]/80 pt-3">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Direct Importer & Distributor Application Form */}
              <div className="lg:col-span-6 bg-[#F8F9FA] border border-[#E1E4E8] rounded-2xl p-6 sm:p-7 space-y-5">
                <div className="space-y-1.5">
                  <h3 className="font-display text-xl font-bold text-[#111417]">
                    {t.exportSection.inlineFormTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525B66] leading-relaxed">
                    {t.exportSection.inlineFormSubtitle}
                  </p>
                </div>

                {inlineSubmitted ? (
                  <div className="bg-white border border-emerald-200 rounded-xl p-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-[#111417]">
                      {t.modals.successTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#525B66] leading-relaxed">
                      {t.modals.successBody}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setInlineSubmitted(false);
                          setInlineNotes('');
                        }}
                        className="px-4 py-2 rounded-lg border border-[#E1E4E8] bg-[#F8F9FA] text-xs font-semibold text-[#111417] cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                      <button
                        type="button"
                        onClick={() => openQuoteModal('meeting')}
                        className="px-4 py-2 rounded-lg bg-[#111417] text-xs font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#7BE300]" />
                        <span>{t.exportSection.scheduleMeetingBtn}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInlinePartnerSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#111417] mb-1">
                          {t.modals.companyName}
                        </label>
                        <input
                          type="text"
                          value={inlineCompany}
                          onChange={(e) => setInlineCompany(e.target.value)}
                          placeholder="Agro Machinery Imports Ltd."
                          className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#111417] mb-1">
                          {t.modals.contactName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={inlineName}
                          onChange={(e) => setInlineName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#111417] mb-1">
                          {t.modals.country} *
                        </label>
                        <input
                          type="text"
                          required
                          value={inlineCountry}
                          onChange={(e) => setInlineCountry(e.target.value)}
                          placeholder="Brazil, France, Germany, Spain, UAE..."
                          className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#111417] mb-1">
                          {t.modals.phone} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={inlinePhone}
                          onChange={(e) => setInlinePhone(e.target.value)}
                          placeholder="+33 / +49 / +55 / +971..."
                          className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#111417] mb-1">
                          {t.modals.email} *
                        </label>
                        <input
                          type="email"
                          required
                          value={inlineEmail}
                          onChange={(e) => setInlineEmail(e.target.value)}
                          placeholder="buyer@company.com"
                          className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#111417] mb-1">
                          {t.exportSection.inquiryTypeLabel}
                        </label>
                        <select
                          value={inlineRole}
                          onChange={(e) => setInlineRole(e.target.value)}
                          className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                        >
                          <option value="National / Exclusive Importer">
                            National / Exclusive Importer
                          </option>
                          <option value="Regional Distributor / Wholesaler">
                            Regional Distributor / Wholesaler
                          </option>
                          <option value="Hardware & Agri Retail Chain">
                            Hardware &amp; Agri Retail Chain
                          </option>
                          <option value="OEM / Private Label Partner">
                            OEM / Private Label Partner
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111417] mb-1">
                        {t.exportSection.preferredDivisionLabel}
                      </label>
                      <input
                        type="text"
                        value={inlineDivisions}
                        onChange={(e) => setInlineDivisions(e.target.value)}
                        className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111417] mb-1">
                        {t.modals.notes}
                      </label>
                      <textarea
                        rows={3}
                        value={inlineNotes}
                        onChange={(e) => setInlineNotes(e.target.value)}
                        placeholder="Territory coverage, target machinery lines, or any technical questions..."
                        className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={inlineSubmitting}
                      className="w-full py-3.5 px-5 rounded-lg bg-[#65C800] hover:bg-[#7BE300] text-[#111417] text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {inlineSubmitting
                          ? t.modals.submitting
                          : t.exportSection.submitInlineBtn}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Obsidian Corporate Footer with Enlarged Highlighted Brand Logo */}
      <footer className="bg-[#06080A] text-gray-300 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-4">
              <BrandLogo
                logoUrl={siteData.brandConfig.logoUrl}
                brandName={siteData.brandConfig.brandName}
                darkSurface
                sizeClass="h-14 sm:h-16"
              />
              <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                {t.footer.description}
              </p>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
                {t.footer.navigationTitle}
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-400">
                <li>
                  <a href="#products" className="hover:text-white transition-colors">
                    {t.nav.products}
                  </a>
                </li>
                <li>
                  <a href="#engineering" className="hover:text-white transition-colors">
                    {t.nav.spareParts}
                  </a>
                </li>
                <li>
                  <a href="#catalogs" className="hover:text-white transition-colors">
                    {t.nav.catalogs}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openQuoteModal('meeting')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {t.hero.ctaMeeting}
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2.5">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
                {t.footer.exportComplianceTitle}
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-400">
                <li>{t.footer.complianceLine1}</li>
                <li>{t.footer.complianceLine2}</li>
                <li>{t.footer.complianceLine3}</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <span>{t.footer.copyright}</span>
            <button
              type="button"
              onClick={() => setAdminOpen(true)}
              className="text-gray-400 hover:text-[#7BE300] font-mono text-[11px] transition-colors cursor-pointer"
            >
              [ {t.footer.adminLink} ]
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductDetailModal
        product={activeProduct}
        initialMode={activeProductMode}
        initialSubModelSku={matchedSubModelSku}
        lang={lang}
        t={t}
        onClose={() => setActiveProduct(null)}
        onRequestQuery={(_product, modelLabel) => {
          setActiveProduct(null);
          openQuoteModal('quote', modelLabel);
        }}
        onBookMeeting={(_product, modelLabel) => {
          setActiveProduct(null);
          openQuoteModal('meeting', modelLabel);
        }}
      />

      <BulkQuoteAndMeetingModal
        isOpen={inquiryModalOpen}
        initialTab={inquiryModalTab}
        preselectedProduct={preselectedModel}
        lang={lang}
        t={t}
        onClose={() => setInquiryModalOpen(false)}
      />

      <AdminDashboard
        isOpen={adminOpen}
        products={siteData.products}
        sheetSource={siteData.source}
        onClose={() => setAdminOpen(false)}
        onRefreshSiteData={syncFromSheet}
      />
    </div>
  );
}

export default App;
