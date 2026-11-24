import { LanguageCode, ProductSegment } from '../types';

export interface ImporterFaqItem {
  q: string;
  a: string;
}

export interface TranslationBundle {
  code: LanguageCode;
  nativeName: string;
  shortLabel: string;
  dir: 'ltr' | 'rtl';
  nav: {
    aboutUs: string;
    products: string;
    spareParts: string;
    catalogs: string;
    contactUs: string;
    becomeDealer: string;
  };
  utility: {
    globalExport: string;
    languageLabel: string;
  };
  hero: {
    weAreTitle: string;
    subheadline: string;
    searchPlaceholder: string;
    searchBtn: string;
    presenceLead: string;
    presenceEmphasis: string;
    stat1Val: string;
    stat1Label: string;
    stat2Val: string;
    stat2Label: string;
    stat3Val: string;
    stat3Label: string;
    ctaDealer: string;
    ctaMeeting: string;
  };
  products: {
    sectionTitle: string;
    sectionSubtitle: string;
    allCategories: string;
    segmentSelectLabel: string;
    categories: Record<ProductSegment, string>;
    quickGroups: {
      all: string;
      gardenForestry: string;
      agroSolar: string;
      powerPumps: string;
      constructionWashing: string;
      toolsSpares: string;
    };
    specs: {
      power: string;
      displacement: string;
      weight: string;
      modelsLabel: string;
      units: string;
    };
    exploreModels: string;
    inspectParts: string;
    inquireBtn: string;
    modelsInSeries: string;
    selectModelHint: string;
    applicationLabel: string;
    emptyTitle: string;
    emptyReset: string;
  };
  engineering: {
    sectionTitle: string;
    sectionSubtitle: string;
    tabBrushCutter: string;
    tabChainsaw: string;
    tabOhvEnginePump: string;
    tabPumpTurbine: string;
    tabPowerToolGearbox: string;
    partCodeLabel: string;
    materialLabel: string;
    intervalLabel: string;
    selectPartHint: string;
    openFullSpecs: string;
  };
  catalogs: {
    sectionTitle: string;
    sectionSubtitle: string;
    masterBadge: string;
    masterTitle: string;
    masterDesc: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    activeLangHint: string;
    downloadBtn: string;
    generatingBtn: string;
    floatingLabel: string;
  };
  exportSection: {
    sectionTitle: string;
    sectionSubtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    scheduleMeetingBtn: string;
    requestQueryBtn: string;
    faqTitle: string;
    faqSubtitle: string;
    faqs: ImporterFaqItem[];
    onboardingStepsTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    inlineFormTitle: string;
    inlineFormSubtitle: string;
    preferredDivisionLabel: string;
    inquiryTypeLabel: string;
    submitInlineBtn: string;
  };
  modals: {
    tabQuote: string;
    tabMeeting: string;
    viewStudio: string;
    viewExploded: string;
    companyName: string;
    contactName: string;
    country: string;
    email: string;
    phone: string;
    productInterest: string;
    businessRole: string;
    targetCity: string;
    meetingDate: string;
    meetingTime: string;
    meetingTopic: string;
    notes: string;
    followupNotice: string;
    submitQuote: string;
    submitMeeting: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    close: string;
    sendModelQuery: string;
    bookModelMeeting: string;
    technicalSpecs: string;
    seriesHighlights: string;
  };
  footer: {
    description: string;
    navigationTitle: string;
    exportComplianceTitle: string;
    complianceLine1: string;
    complianceLine2: string;
    complianceLine3: string;
    copyright: string;
    adminLink: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationBundle> = {
  en: {
    code: 'en',
    nativeName: 'English',
    shortLabel: 'EN',
    dir: 'ltr',
    nav: {
      aboutUs: 'About Us',
      products: 'Products',
      spareParts: 'Spare Parts',
      catalogs: 'Catalogue',
      contactUs: 'Importer Desk',
      becomeDealer: 'Become Our Distributor',
    },
    utility: {
      globalExport: 'ZAYNOVA Industrial Corporation · ISO 9001 & CE Certified Machinery Manufacturer',
      languageLabel: 'Language',
    },
    hero: {
      weAreTitle: 'ENGINEERED FOR UNSTOPPABLE POWER',
      subheadline:
        'Global manufacturer of Agro-Industrial, Forestry, Solar, Construction & Power Tool machinery engineered for national importers and regional distributors.',
      searchPlaceholder: 'Search machines or models (Brush Cutter, Chainsaw, Tiller, Solar Pump...)',
      searchBtn: 'Search',
      presenceLead: 'Presence',
      presenceEmphasis: 'Global',
      stat1Val: '3+',
      stat1Label: 'CONTINENTS',
      stat2Val: '48+',
      stat2Label: 'TARGET MARKETS',
      stat3Val: '40+',
      stat3Label: 'CORE MODELS',
      ctaDealer: 'Become Our Distributor',
      ctaMeeting: 'Schedule a Meeting',
    },
    products: {
      sectionTitle: 'Core Product Divisions',
      sectionSubtitle:
        'Select any flagship product line below to explore all its models, examine internal spare-parts engineering, or submit a direct importer & distributor application.',
      allCategories: 'All Divisions',
      segmentSelectLabel: 'Division:',
      categories: {
        'Agro-Industrial Machinery': 'Agro-Industrial Machinery',
        'Garden & Forestry': 'Garden & Forestry',
        'Diesel Machines': 'Diesel Machines',
        'Electric Machines': 'Electric Machines',
        Solar: 'Solar Equipment',
        'Spraying & Crop Protection': 'Spraying & Fumigation',
        'Water Pumps & Fluid': 'Water Pumps & Fluid',
        'Engines & Power Generation': 'Engines & Power Gen',
        'Pressure Washing & Cleaning': 'Pressure Washing & Cleaning',
        'Air Compressors': 'Air Compressors',
        'Industrial Equipment': 'Industrial Equipment',
        'Construction Equipment': 'Construction Equipment',
        'Wood & Agro Processing': 'Wood & Agro Processing',
        'Special Machinery': 'Special Machinery',
        'Power Tools': 'Power Tools (AC / DC)',
        'Hand & Garden Tools': 'Hand & Garden Tools',
        'Spare Parts & Aftermarket': 'Spare Parts & Aftermarket',
      },
      quickGroups: {
        all: 'All Core Lines',
        gardenForestry: 'Garden & Forestry',
        agroSolar: 'Agro & Solar',
        powerPumps: 'Generators & Pumps',
        constructionWashing: 'Construction & Washing',
        toolsSpares: 'Tools & OEM Spares',
      },
      specs: {
        power: 'Output Range',
        displacement: 'Engine / Spec',
        weight: 'Net Weight',
        modelsLabel: 'Models',
        units: 'lines',
      },
      exploreModels: 'Explore Models',
      inspectParts: 'Inspect Parts',
      inquireBtn: 'Send Query',
      modelsInSeries: 'Available Models in This Series',
      selectModelHint:
        'Select any model below to inspect full specs, view internal parts, or connect with our trade directors.',
      applicationLabel: 'Primary Application',
      emptyTitle: 'No machinery matches your current filter.',
      emptyReset: 'Reset Filters',
    },
    engineering: {
      sectionTitle: 'Internal Assembly & OEM Spare Parts',
      sectionSubtitle:
        'Examine precision internal engineering across our powertrains. Click any numbered callout for alloy specs, OEM part codes, and service intervals.',
      tabBrushCutter: 'Brush Cutter & Agro',
      tabChainsaw: 'Chainsaw Powertrain',
      tabOhvEnginePump: '4-Stroke OHV Engine & Pump',
      tabPumpTurbine: 'Turbine & Triplex Washer',
      tabPowerToolGearbox: 'Brushless Power Tool & Gear',
      partCodeLabel: 'OEM Part Code',
      materialLabel: 'Metallurgy / Alloy',
      intervalLabel: 'Service Interval',
      selectPartHint: 'Select a numbered callout on the diagram or choose a component below.',
      openFullSpecs: 'Explore Series Models',
    },
    catalogs: {
      sectionTitle: 'All-in-One Master Product Catalogue (PDF)',
      sectionSubtitle:
        'One unified specification manual covering every ZAYNOVA division, sub-model, and OEM spare-part architecture — generated instantaneously in your active site language.',
      masterBadge: 'COMPLETE ALL-IN-ONE EDITION · PDF',
      masterTitle: 'ZAYNOVA 2026 Master Machinery & OEM Export Catalogue',
      masterDesc:
        'No need to download separate brochures. Download one complete, structured PDF manual spanning Forestry Brush Cutters & Chainsaws, Power Tillers, Solar Borehole Pumps, Sprayers, Generators, Water Pumps, Pressure Washers, Construction Machinery, Power Tools & OEM Spares.',
      bullet1: 'Includes All 9 Core Divisions & 40+ Commercial Models in One PDF',
      bullet2: 'Full Engine Specs, Output Ratings, Weights & Primary Applications',
      bullet3: 'Instant PDF Generation in English, Español, Português, Français, العربية & Deutsch',
      activeLangHint: 'Active Download Language:',
      downloadBtn: 'Download Complete PDF Catalogue',
      generatingBtn: 'Generating PDF...',
      floatingLabel: 'PDF Catalogue',
    },
    exportSection: {
      sectionTitle: 'Built for Serious Importers & Regional Distributors',
      sectionSubtitle:
        'Everything an international importer needs before launching a territory — factory endurance validation, protected spare-parts supply, full customs compliance, and direct onboarding through our application form.',
      pillar1Title: '500-Hour Endurance Validation',
      pillar1Desc:
        'Automated dynamometer load testing, Nikasil cylinder plating, and carburetors calibrated for tropical and alpine climates.',
      pillar2Title: '10-Year OEM Spare Parts Supply',
      pillar2Desc:
        'Barcoded aftermarket spare-parts support covering carburetors, piston kits, ignition coils, guide bars, and triplex seals.',
      pillar3Title: 'CE, EPA & Euro-V Homologation',
      pillar3Desc:
        'Complete customs documentation packs including Certificate of Origin, CE/Euro-V certificates, and multilingual manuals.',
      scheduleMeetingBtn: 'Book Video Consultation',
      requestQueryBtn: 'Open Quick Form',
      faqTitle: 'Importer & Distributor Questions Answered',
      faqSubtitle:
        'Clear answers to every commercial, technical, and logistics question importers evaluate before partnering with ZAYNOVA.',
      faqs: [
        {
          q: 'Do you grant exclusive territory rights to national importers and regional distributors?',
          a: 'Yes. Qualified partners who commit to structured market coverage and after-sales service receive protected regional or country-level distribution agreements so you never compete against unauthorized direct imports in your assigned territory.',
        },
        {
          q: 'How are spare parts and warranty replacements handled after container delivery?',
          a: 'Every ZAYNOVA shipment includes recommended fast-moving service kits (carburetors, recoil starters, piston rings, seals, ignition modules) plus barcoded access to our 10-year OEM spare parts bank. Warranty claims are verified via serial number photo/video and settled in your next dispatch.',
        },
        {
          q: 'Which international certifications and import customs documents are provided?',
          a: 'All shipments are accompanied by ISO 9001:2015 manufacturing assurance, CE safety conformity, Euro-V emission certificates (for applicable engines), Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin, and SGS/BV pre-shipment inspection readiness.',
        },
        {
          q: 'Can importers combine multiple product divisions in a single shipment?',
          a: 'Yes. Importers routinely consolidate Brush Cutters, Chainsaws, Power Tillers, Solar Pumps, Sprayers, Generators, Construction equipment, and OEM Spare Parts together in one coordinated dispatch.',
        },
        {
          q: 'Do you support OEM / private-label customization or regional specification tuning?',
          a: 'Yes. In addition to authorized ZAYNOVA branded distribution, our engineering lines support regional plug/voltage standards (110V/220V/230V, 50Hz/60Hz), multilingual packaging, and customized starter kits for national retail chains.',
        },
        {
          q: 'How do I start a partnership discussion and receive distributor terms?',
          a: 'Simply submit the Importer & Distributor Application Form on this page with your business details, country, and phone/WhatsApp number. Our regional trade director will contact you directly with full technical dossiers and dealership terms.',
        },
      ],
      onboardingStepsTitle: '3-Step Authorized Importer Onboarding',
      step1Title: '1. Submit Partner Form',
      step1Desc: 'Share your company profile, target territory, and machinery lines of interest.',
      step2Title: '2. Territory & Spec Review',
      step2Desc: 'Direct consultation on customs norms, voltage/emissions specs, and territory availability.',
      step3Title: '3. Sample Evaluation & Dispatch',
      step3Desc: 'Inspect sample units, finalize spare-parts allocation, and launch distribution.',
      inlineFormTitle: 'Importer & Distributor Partnership Form',
      inlineFormSubtitle:
        'Want to import ZAYNOVA machinery or become our regional distributor? Fill out this form — our trade team will connect with you directly.',
      preferredDivisionLabel: 'Primary Divisions of Interest',
      inquiryTypeLabel: 'Partnership Goal',
      submitInlineBtn: 'Submit Importer / Distributor Application',
    },
    modals: {
      tabQuote: 'Distributor / Importer Inquiry',
      tabMeeting: 'Book Consultation',
      viewStudio: 'Models & Overview',
      viewExploded: 'Inspect Internal Parts',
      companyName: 'Company / Importing Firm Name',
      contactName: 'Director / Buyer Full Name',
      country: 'Country / Import Market',
      email: 'Business Email Address',
      phone: 'WhatsApp / Direct Phone Number',
      productInterest: 'Interested Product Line / Model',
      businessRole: 'Business Profile',
      targetCity: 'City / Distribution Territory',
      meetingDate: 'Preferred Date',
      meetingTime: 'Preferred Time & Timezone',
      meetingTopic: 'Discussion Agenda',
      notes: 'Your Questions, Territory Details & Requirements',
      followupNotice:
        'Connect directly via this application form — our trade directors will respond via your phone/WhatsApp and business contact.',
      submitQuote: 'Submit Application',
      submitMeeting: 'Confirm Meeting Slot',
      submitting: 'Submitting Application...',
      successTitle: 'Application Registered with ZAYNOVA Trade Desk',
      successBody:
        'Thank you for applying to partner with ZAYNOVA. Your importer profile and questions have been logged—our regional trade director will contact you shortly.',
      close: 'Close',
      sendModelQuery: 'Inquire About This Model',
      bookModelMeeting: 'Schedule Model Briefing',
      technicalSpecs: 'Selected Model Specifications',
      seriesHighlights: 'Engineering Highlights',
    },
    footer: {
      description:
        'ZAYNOVA Industrial Corporation engineers agro-industrial machinery, forestry equipment, solar borehole pumps, construction tools, power tools, and OEM spare parts for global importers.',
      navigationTitle: 'Corporate Directory',
      exportComplianceTitle: 'Quality & Compliance',
      complianceLine1: 'ISO 9001:2015 Quality Management',
      complianceLine2: 'CE · Euro-V · GS Safety Homologation',
      complianceLine3: '10-Year OEM Spare Parts Commitment',
      copyright: '© 2026 ZAYNOVA Industrial Corporation. All Rights Reserved.',
      adminLink: 'Executive Portal & CMS',
    },
  },

  es: {
    code: 'es',
    nativeName: 'Español',
    shortLabel: 'ES',
    dir: 'ltr',
    nav: {
      aboutUs: 'Nosotros',
      products: 'Productos',
      spareParts: 'Repuestos',
      catalogs: 'Catálogo PDF',
      contactUs: 'Importadores',
      becomeDealer: 'Ser Distribuidor',
    },
    utility: {
      globalExport: 'Corporación Industrial ZAYNOVA · Fabricante Certificado ISO 9001 y CE',
      languageLabel: 'Idioma',
    },
    hero: {
      weAreTitle: 'INGENIERÍA DE POTENCIA SIN LÍMITES',
      subheadline:
        'Fabricante global de maquinaria agroindustrial, forestal, solar, construcción y herramientas eléctricas para importadores nacionales y distribuidores regionales.',
      searchPlaceholder: 'Buscar máquinas o modelos (Desbrozadora, Motosierra, Motocultor...)',
      searchBtn: 'Buscar',
      presenceLead: 'Presencia',
      presenceEmphasis: 'Global',
      stat1Val: '3+',
      stat1Label: 'CONTINENTES',
      stat2Val: '48+',
      stat2Label: 'MERCADOS OBJETIVO',
      stat3Val: '40+',
      stat3Label: 'MODELOS PRINCIPALES',
      ctaDealer: 'Ser Distribuidor',
      ctaMeeting: 'Agendar Reunión',
    },
    products: {
      sectionTitle: 'Divisiones Principales de Producto',
      sectionSubtitle:
        'Haga clic en cualquier línea de producto para ver todos sus modelos disponibles, inspeccionar sus piezas internas o enviar su solicitud de distribuidor.',
      allCategories: 'Todas las Divisiones',
      segmentSelectLabel: 'División:',
      categories: {
        'Agro-Industrial Machinery': 'Maquinaria Agroindustrial',
        'Garden & Forestry': 'Jardín y Forestal',
        'Diesel Machines': 'Máquinas Diésel',
        'Electric Machines': 'Máquinas Eléctricas',
        Solar: 'Equipos Solares',
        'Spraying & Crop Protection': 'Fumigación y Aspersión',
        'Water Pumps & Fluid': 'Bombas de Agua',
        'Engines & Power Generation': 'Motores y Generadores',
        'Pressure Washing & Cleaning': 'Hidrolavado y Limpieza',
        'Air Compressors': 'Compresores de Aire',
        'Industrial Equipment': 'Equipos Industriales',
        'Construction Equipment': 'Maquinaria de Construcción',
        'Wood & Agro Processing': 'Procesamiento Forestal',
        'Special Machinery': 'Maquinaria Especial',
        'Power Tools': 'Herramientas Eléctricas',
        'Hand & Garden Tools': 'Herramientas Manuales',
        'Spare Parts & Aftermarket': 'Repuestos OEM',
      },
      quickGroups: {
        all: 'Líneas Principales',
        gardenForestry: 'Jardín y Forestal',
        agroSolar: 'Agro y Solar',
        powerPumps: 'Generadores y Bombas',
        constructionWashing: 'Construcción y Lavado',
        toolsSpares: 'Herramientas y Repuestos',
      },
      specs: {
        power: 'Potencia',
        displacement: 'Especificación',
        weight: 'Peso Neto',
        modelsLabel: 'Modelos',
        units: 'líneas',
      },
      exploreModels: 'Ver Modelos',
      inspectParts: 'Ver Piezas',
      inquireBtn: 'Enviar Consulta',
      modelsInSeries: 'Modelos Disponibles en Esta Serie',
      selectModelHint:
        'Seleccione un modelo para ver su ficha técnica, despiece interno o contactar con nuestra dirección comercial.',
      applicationLabel: 'Aplicación Principal',
      emptyTitle: 'Ninguna máquina coincide con su filtro actual.',
      emptyReset: 'Restablecer Filtros',
    },
    engineering: {
      sectionTitle: 'Arquitectura Interna y Repuestos OEM',
      sectionSubtitle:
        'Examine la ingeniería interna de cada equipo. Haga clic en cualquier número para ver material, código OEM e intervalo de servicio.',
      tabBrushCutter: 'Desbrozadora y Agro',
      tabChainsaw: 'Motor Motosierra',
      tabOhvEnginePump: 'Motor OHV 4T y Bomba',
      tabPumpTurbine: 'Turbina e Hidrolavadora',
      tabPowerToolGearbox: 'Herramienta Brushless',
      partCodeLabel: 'Código OEM',
      materialLabel: 'Aleación / Material',
      intervalLabel: 'Intervalo de Servicio',
      selectPartHint: 'Seleccione un punto numerado en el diagrama o un componente inferior.',
      openFullSpecs: 'Explorar Modelos de la Serie',
    },
    catalogs: {
      sectionTitle: 'Catálogo Maestro Todo-en-Uno (PDF)',
      sectionSubtitle:
        'Un único catálogo técnico oficial con todas las divisiones y modelos ZAYNOVA, generado automáticamente en PDF en el idioma activo del sitio.',
      masterBadge: 'EDICIÓN COMPLETA TODO-EN-UNO · PDF',
      masterTitle: 'Catálogo Maestro de Exportación ZAYNOVA 2026',
      masterDesc:
        'Sin catálogos separados por producto. Descargue un solo archivo PDF completo con Desbrozadoras, Motosierras, Motocultores, Bombas Solares, Fumigadoras, Generadores, Bombas de Agua, Hidrolavadoras, Construcción, Herramientas y Repuestos OEM.',
      bullet1: 'Incluye las 9 Divisiones y más de 40 Modelos en un Solo PDF',
      bullet2: 'Especificaciones Técnicas, Potencia, Peso y Aplicaciones',
      bullet3: 'Descarga Instantánea en Español, English, Português, Français, العربية y Deutsch',
      activeLangHint: 'Idioma de Descarga Activo:',
      downloadBtn: 'Descargar Catálogo Completo (PDF)',
      generatingBtn: 'Generando PDF...',
      floatingLabel: 'Catálogo PDF',
    },
    exportSection: {
      sectionTitle: 'Respaldo Real para Importadores y Distribuidores',
      sectionSubtitle:
        'Todo lo que un importador serio evalúa antes de iniciar una alianza: pruebas de durabilidad, suministro garantizado de repuestos, documentación aduanera completa y registro directo mediante formulario.',
      pillar1Title: 'Validación de 500 Horas en Banco',
      pillar1Desc:
        'Pruebas de carga continuas, cilindros Nikasil y carburadores calibrados para climas tropicales y de altura.',
      pillar2Title: 'Repuestos OEM por 10 Años',
      pillar2Desc:
        'Cobertura completa de carburadores, pistones, bobinas, espadas y sellos mecánicos codificados.',
      pillar3Title: 'Homologación CE, EPA y Euro-V',
      pillar3Desc:
        'Certificados de Origen, cumplimiento técnico internacional y manuales multilingües.',
      scheduleMeetingBtn: 'Agendar Videollamada',
      requestQueryBtn: 'Abrir Formulario',
      faqTitle: 'Preguntas Frecuentes de Importadores',
      faqSubtitle:
        'Resolvemos cada duda comercial, técnica y aduanera antes de conectar con nuestro equipo comercial.',
      faqs: [
        {
          q: '¿Ofrecen exclusividad territorial para importadores nacionales o regionales?',
          a: 'Sí. Los distribuidores e importadores calificados que asumen desarrollo comercial y servicio posventa en su zona cuentan con acuerdos de protección territorial para evitar competencia desleal en su país.',
        },
        {
          q: '¿Cómo garantizan repuestos y servicio posventa tras la importación?',
          a: 'Cada despacho puede incluir kits de desgaste rápido (carburadores, pistones, bobinas, sellos y espadas) además de acceso continuo a nuestro banco de repuestos OEM codificados durante 10 años.',
        },
        {
          q: '¿Qué certificaciones y documentos aduaneros entregan para nacionalizar la carga?',
          a: 'Suministramos dossier completo: ISO 9001:2015, certificaciones CE y Euro-V, Factura Comercial, Lista de Empaque, Conocimiento de Embarque, Certificado de Origen e inspección SGS/BV previa al embarque.',
        },
        {
          q: '¿Se pueden consolidar varias líneas de maquinaria en un mismo envío?',
          a: 'Sí. Nuestros importadores combinan desbrozadoras, motosierras, motocultores, bombas solares, fumigadoras, generadores, equipos de construcción y repuestos en un mismo despacho.',
        },
        {
          q: '¿Permiten personalización OEM o adaptación técnica por país?',
          a: 'Sí, adaptamos estándares eléctricos (110V/220V/230V, 50/60Hz), manuales multilingües y configuración para cadenas de ferretería o proyectos OEM.',
        },
        {
          q: '¿Cómo iniciar la evaluación para ser distribuidor autorizado?',
          a: 'Complete el formulario oficial de Importadores y Distribuidores en esta misma sección con sus datos y país; un director regional se pondrá en contacto directamente.',
        },
      ],
      onboardingStepsTitle: 'Proceso de Alta en 3 Pasos',
      step1Title: '1. Enviar Formulario',
      step1Desc: 'Indique su empresa, país/territorio y divisiones de interés.',
      step2Title: '2. Revisión Técnica y Territorial',
      step2Desc: 'Validación de normas aduaneras, especificaciones y disponibilidad de zona.',
      step3Title: '3. Muestras y Despacho',
      step3Desc: 'Evaluación de unidades, paquete de repuestos y lanzamiento comercial.',
      inlineFormTitle: 'Formulario para Importadores y Distribuidores',
      inlineFormSubtitle:
        '¿Desea importar equipos ZAYNOVA o representar la marca en su país? Complete este formulario para conectar directamente.',
      preferredDivisionLabel: 'Divisiones de Mayor Interés',
      inquiryTypeLabel: 'Objetivo Comercial',
      submitInlineBtn: 'Enviar Solicitud de Importador / Distribuidor',
    },
    modals: {
      tabQuote: 'Solicitud de Importador / Distribuidor',
      tabMeeting: 'Agendar Reunión',
      viewStudio: 'Modelos y Resumen',
      viewExploded: 'Ver Piezas Internas',
      companyName: 'Empresa / Importadora',
      contactName: 'Nombre del Director / Comprador',
      country: 'País / Mercado',
      email: 'Correo Comercial',
      phone: 'WhatsApp / Teléfono Directo',
      productInterest: 'Línea o Modelo de Interés',
      businessRole: 'Perfil Comercial',
      targetCity: 'Ciudad / Territorio',
      meetingDate: 'Fecha Preferida',
      meetingTime: 'Hora y Zona Horaria',
      meetingTopic: 'Tema de la Reunión',
      notes: 'Sus dudas, territorio y requerimientos',
      followupNotice:
        'Complete este formulario oficial: nuestro equipo comercial se comunicará directamente por teléfono/WhatsApp y su correo registrado.',
      submitQuote: 'Enviar Solicitud',
      submitMeeting: 'Confirmar Reunión',
      submitting: 'Enviando solicitud...',
      successTitle: 'Solicitud Registrada en ZAYNOVA',
      successBody:
        'Gracias por conectar con ZAYNOVA. Hemos recibido su perfil de importador y sus consultas; un director regional le contactará a la brevedad.',
      close: 'Cerrar',
      sendModelQuery: 'Consultar Este Modelo',
      bookModelMeeting: 'Agendar Reunión del Modelo',
      technicalSpecs: 'Especificaciones del Modelo',
      seriesHighlights: 'Aspectos de Ingeniería',
    },
    footer: {
      description:
        'ZAYNOVA Industrial Corporation fabrica maquinaria agroindustrial, forestal, bombas solares, construcción, herramientas y repuestos OEM para importadores globales.',
      navigationTitle: 'Directorio Corporativo',
      exportComplianceTitle: 'Calidad y Normativa',
      complianceLine1: 'Gestión de Calidad ISO 9001:2015',
      complianceLine2: 'Homologación CE · Euro-V · GS',
      complianceLine3: 'Compromiso de Repuestos OEM por 10 Años',
      copyright: '© 2026 ZAYNOVA Industrial Corporation. Todos los derechos reservados.',
      adminLink: 'Portal Ejecutivo y CMS',
    },
  },

  pt: {
    code: 'pt',
    nativeName: 'Português',
    shortLabel: 'PT',
    dir: 'ltr',
    nav: {
      aboutUs: 'Sobre Nós',
      products: 'Produtos',
      spareParts: 'Peças OEM',
      catalogs: 'Catálogo PDF',
      contactUs: 'Importadores',
      becomeDealer: 'Seja Nosso Distribuidor',
    },
    utility: {
      globalExport: 'ZAYNOVA Industrial Corporation · Fabricante Certificado ISO 9001 & CE',
      languageLabel: 'Idioma',
    },
    hero: {
      weAreTitle: 'ENGENHARIA DE POTÊNCIA SEM LIMITES',
      subheadline:
        'Fabricante global de máquinas agroindustriais, florestais, solares, construção civil e ferramentas elétricas para importadores e distribuidores regionais.',
      searchPlaceholder: 'Pesquisar máquinas ou modelos (Roçadeira, Motosserra, Motocultivador...)',
      searchBtn: 'Buscar',
      presenceLead: 'Presença',
      presenceEmphasis: 'Global',
      stat1Val: '3+',
      stat1Label: 'CONTINENTES',
      stat2Val: '48+',
      stat2Label: 'MERCADOS-ALVO',
      stat3Val: '40+',
      stat3Label: 'MODELOS PRINCIPAIS',
      ctaDealer: 'Seja Nosso Distribuidor',
      ctaMeeting: 'Agendar Reunião',
    },
    products: {
      sectionTitle: 'Divisões Principais de Produto',
      sectionSubtitle:
        'Clique em qualquer linha de produto abaixo para ver todos os modelos disponíveis, inspecionar peças internas ou enviar sua candidatura como distribuidor.',
      allCategories: 'Todas as Divisões',
      segmentSelectLabel: 'Divisão:',
      categories: {
        'Agro-Industrial Machinery': 'Maquinário Agroindustrial',
        'Garden & Forestry': 'Jardim e Florestal',
        'Diesel Machines': 'Máquinas a Diesel',
        'Electric Machines': 'Máquinas Elétricas',
        Solar: 'Energia Solar',
        'Spraying & Crop Protection': 'Pulverização e Fumigação',
        'Water Pumps & Fluid': 'Bombas d’Água',
        'Engines & Power Generation': 'Motores e Geradores',
        'Pressure Washing & Cleaning': 'Lavadoras e Limpeza',
        'Air Compressors': 'Compressores de Ar',
        'Industrial Equipment': 'Equipamentos Industriais',
        'Construction Equipment': 'Construção Civil',
        'Wood & Agro Processing': 'Processamento Madeira e Agro',
        'Special Machinery': 'Máquinas Especiais',
        'Power Tools': 'Ferramentas Elétricas',
        'Hand & Garden Tools': 'Ferramentas Manuais',
        'Spare Parts & Aftermarket': 'Peças de Reposição OEM',
      },
      quickGroups: {
        all: 'Linhas Principais',
        gardenForestry: 'Jardim e Florestal',
        agroSolar: 'Agro e Solar',
        powerPumps: 'Geradores e Bombas',
        constructionWashing: 'Construção e Lavagem',
        toolsSpares: 'Ferramentas e Peças',
      },
      specs: {
        power: 'Potência',
        displacement: 'Especificação',
        weight: 'Peso Líquido',
        modelsLabel: 'Modelos',
        units: 'linhas',
      },
      exploreModels: 'Ver Modelos',
      inspectParts: 'Ver Peças',
      inquireBtn: 'Enviar Consulta',
      modelsInSeries: 'Modelos Disponíveis Nesta Série',
      selectModelHint:
        'Selecione qualquer modelo abaixo para ver especificações, peças internas ou solicitar contato comercial.',
      applicationLabel: 'Aplicação Principal',
      emptyTitle: 'Nenhuma máquina corresponde ao filtro selecionado.',
      emptyReset: 'Limpar Filtros',
    },
    engineering: {
      sectionTitle: 'Arquitetura Interna e Peças OEM',
      sectionSubtitle:
        'Examine cada subconjunto interno em detalhes. Clique em qualquer ponto numerado para ver liga metálica, código OEM e intervalos.',
      tabBrushCutter: 'Roçadeira e Agro',
      tabChainsaw: 'Motor Motosserra',
      tabOhvEnginePump: 'Motor OHV 4T e Bomba',
      tabPumpTurbine: 'Turbina e Lavadora',
      tabPowerToolGearbox: 'Ferramenta Brushless',
      partCodeLabel: 'Código OEM',
      materialLabel: 'Metalurgia / Liga',
      intervalLabel: 'Intervalo de Revisão',
      selectPartHint: 'Selecione um marcador numerado no diagrama ou escolha um componente.',
      openFullSpecs: 'Explorar Modelos da Série',
    },
    catalogs: {
      sectionTitle: 'Catálogo Geral Tudo-em-Um (PDF)',
      sectionSubtitle:
        'Um único catálogo oficial reunindo todas as divisões e modelos ZAYNOVA, gerado instantaneamente em PDF no idioma ativo do site.',
      masterBadge: 'EDIÇÃO COMPLETA TUDO-EM-UM · PDF',
      masterTitle: 'Catálogo Mestre de Exportação ZAYNOVA 2026',
      masterDesc:
        'Sem catálogos separados. Baixe um único arquivo PDF completo abrangendo Roçadeiras, Motosserras, Motocultivadores, Bombas Solares, Pulverizadores, Geradores, Bombas d’Água, Lavadoras, Construção Civil, Ferramentas e Peças OEM.',
      bullet1: 'Todas as 9 Divisões e mais de 40 Modelos em um Único PDF',
      bullet2: 'Especificações de Motor, Potência, Peso e Aplicações',
      bullet3: 'Download Direto em Português, English, Español, Français, العربية e Deutsch',
      activeLangHint: 'Idioma Ativo do PDF:',
      downloadBtn: 'Baixar Catálogo Completo (PDF)',
      generatingBtn: 'Gerando PDF...',
      floatingLabel: 'Catálogo PDF',
    },
    exportSection: {
      sectionTitle: 'Estrutura Completa para Importadores e Distribuidores',
      sectionSubtitle:
        'Tudo o que um importador precisa avaliar antes de fechar parceria: testes de durabilidade em banco, garantia de peças de reposição, conformidade aduaneira e atendimento direto via formulário.',
      pillar1Title: 'Validação de 500 Horas em Dinamômetro',
      pillar1Desc:
        'Testes contínuos de carga, revestimento Nikasil e carburadores calibrados para climas tropicais e temperados.',
      pillar2Title: 'Peças OEM por 10 Anos',
      pillar2Desc:
        'Estoque garantido de carburadores, kits de pistão, bobinas, sabres e retentores codificados.',
      pillar3Title: 'Homologação CE, EPA e Euro-V',
      pillar3Desc:
        'Certificados de Origem, documentação internacional e manuais multilíngues.',
      scheduleMeetingBtn: 'Agendar Reunião',
      requestQueryBtn: 'Abrir Formulário',
      faqTitle: 'Dúvidas Comuns de Importadores e Distribuidores',
      faqSubtitle:
        'Transparência técnica, comercial e logística para você iniciar sua importação com segurança.',
      faqs: [
        {
          q: 'A ZAYNOVA oferece exclusividade territorial para importadores e distribuidores?',
          a: 'Sim. Parceiros qualificados com cobertura estruturada e pós-venda recebem proteção territorial em nível nacional ou regional, evitando concorrência direta não autorizada no mesmo mercado.',
        },
        {
          q: 'Como funciona o fornecimento de peças de reposição e garantia?',
          a: 'Cada embarque pode incluir kits de manutenção preventiva e acesso contínuo ao nosso banco de peças OEM codificadas por 10 anos. Garantias são processadas por número de série e enviadas no embarque seguinte.',
        },
        {
          q: 'Quais certificados e documentos acompanham a exportação?',
          a: 'Fornecemos pacote aduaneiro completo: ISO 9001:2015, conformidade CE, Euro-V, Fatura Comercial, Packing List, B/L, Certificado de Origem e liberação para inspeção SGS/BV.',
        },
        {
          q: 'É possível consolidar várias linhas de máquinas no mesmo embarque?',
          a: 'Sim. Importadores consolidam Roçadeiras, Motosserras, Motocultivadores, Bombas Solares, Pulverizadores, Geradores, Construção e Peças OEM juntos.',
        },
        {
          q: 'Há suporte para customização OEM ou adequação elétrica regional?',
          a: 'Sim, adaptamos padrões elétricos (110V/220V/230V, 50/60Hz), manuais no idioma local e configurações OEM para grandes redes.',
        },
        {
          q: 'Como iniciar a negociação para representar a ZAYNOVA?',
          a: 'Preencha o formulário de Importadores e Distribuidores nesta página com sua empresa, país e WhatsApp/Telefone. Nosso diretor regional entrará em contato diretamente.',
        },
      ],
      onboardingStepsTitle: 'Credenciamento em 3 Etapas',
      step1Title: '1. Enviar Formulário',
      step1Desc: 'Informe sua empresa, território e linhas de maior demanda.',
      step2Title: '2. Análise Técnica e Territorial',
      step2Desc: 'Alinhamento de certificações locais, voltagens e disponibilidade de região.',
      step3Title: '3. Amostras e Embarque',
      step3Desc: 'Avaliação técnica, definição de peças de reposição e início da operação.',
      inlineFormTitle: 'Formulário de Importadores e Distribuidores',
      inlineFormSubtitle:
        'Quer importar máquinas ZAYNOVA ou atuar como distribuidor autorizado? Preencha abaixo para falar diretamente com nossa equipe.',
      preferredDivisionLabel: 'Divisões de Interesse',
      inquiryTypeLabel: 'Objetivo da Parceria',
      submitInlineBtn: 'Enviar Candidatura de Importador / Distribuidor',
    },
    modals: {
      tabQuote: 'Candidatura Importador / Distribuidor',
      tabMeeting: 'Agendar Reunião',
      viewStudio: 'Modelos e Visão Geral',
      viewExploded: 'Ver Peças Internas',
      companyName: 'Empresa / Importadora',
      contactName: 'Nome do Diretor / Comprador',
      country: 'País / Mercado',
      email: 'E-mail Comercial',
      phone: 'WhatsApp / Telefone Direto',
      productInterest: 'Linha ou Modelo de Interesse',
      businessRole: 'Perfil Comercial',
      targetCity: 'Cidade / Região',
      meetingDate: 'Data Preferida',
      meetingTime: 'Horário e Fuso',
      meetingTopic: 'Pauta da Reunião',
      notes: 'Suas dúvidas, mercado e requisitos',
      followupNotice:
        'Preencha este formulário oficial — nossa diretoria comercial entrará em contato diretamente pelo seu WhatsApp/telefone e e-mail cadastrado.',
      submitQuote: 'Enviar Solicitação',
      submitMeeting: 'Confirmar Reunião',
      submitting: 'Enviando solicitação...',
      successTitle: 'Solicitação Registrada pela ZAYNOVA',
      successBody:
        'Obrigado pelo interesse. Recebemos seu perfil comercial e suas dúvidas; nosso diretor regional entrará em contato em breve.',
      close: 'Fechar',
      sendModelQuery: 'Consultar Este Modelo',
      bookModelMeeting: 'Agendar Reunião do Modelo',
      technicalSpecs: 'Especificações do Modelo',
      seriesHighlights: 'Destaques de Engenharia',
    },
    footer: {
      description:
        'A ZAYNOVA Industrial Corporation projeta máquinas agroindustriais, florestais, bombas solares, construção civil, ferramentas e peças OEM para importadores globais.',
      navigationTitle: 'Diretório Corporativo',
      exportComplianceTitle: 'Qualidade e Conformidade',
      complianceLine1: 'Gestão de Qualidade ISO 9001:2015',
      complianceLine2: 'Certificações CE · Euro-V · GS',
      complianceLine3: 'Compromisso de Peças OEM por 10 Anos',
      copyright: '© 2026 ZAYNOVA Industrial Corporation. Todos os direitos reservados.',
      adminLink: 'Portal Executivo e CMS',
    },
  },

  fr: {
    code: 'fr',
    nativeName: 'Français',
    shortLabel: 'FR',
    dir: 'ltr',
    nav: {
      aboutUs: 'À Propos',
      products: 'Produits',
      spareParts: 'Pièces OEM',
      catalogs: 'Catalogue PDF',
      contactUs: 'Importateurs',
      becomeDealer: 'Devenir Distributeur',
    },
    utility: {
      globalExport: 'ZAYNOVA Industrial Corporation · Constructeur Certifié ISO 9001 & CE',
      languageLabel: 'Langue',
    },
    hero: {
      weAreTitle: 'CONÇU POUR UNE PUISSANCE SANS LIMITE',
      subheadline:
        'Constructeur mondial de machines agro-industrielles, forestières, solaires, BTP et outillage électroportatif pour importateurs nationaux et distributeurs agréés.',
      searchPlaceholder: 'Rechercher une machine ou référence (Débroussailleuse, Tronçonneuse...)',
      searchBtn: 'Rechercher',
      presenceLead: 'Présence',
      presenceEmphasis: 'Mondiale',
      stat1Val: '3+',
      stat1Label: 'CONTINENTS',
      stat2Val: '48+',
      stat2Label: 'MARCHÉS CIBLES',
      stat3Val: '40+',
      stat3Label: 'MODÈLES CLÉS',
      ctaDealer: 'Devenir Distributeur',
      ctaMeeting: 'Planifier un Entretien',
    },
    products: {
      sectionTitle: 'Divisions Produits Principales',
      sectionSubtitle:
        'Sélectionnez une gamme ci-dessous pour découvrir tous ses modèles, inspecter les pièces internes ou déposer une demande d’importateur agréé.',
      allCategories: 'Toutes les Divisions',
      segmentSelectLabel: 'Division :',
      categories: {
        'Agro-Industrial Machinery': 'Machinisme Agro-Industriel',
        'Garden & Forestry': 'Jardin & Forêt',
        'Diesel Machines': 'Machines Diesel',
        'Electric Machines': 'Machines Électriques',
        Solar: 'Équipements Solaires',
        'Spraying & Crop Protection': 'Pulvérisation & Traitement',
        'Water Pumps & Fluid': 'Motopompes & Fluides',
        'Engines & Power Generation': 'Moteurs & Groupes Électrogènes',
        'Pressure Washing & Cleaning': 'Haute Pression & Nettoyage',
        'Air Compressors': 'Compresseurs d’Air',
        'Industrial Equipment': 'Équipements Industriels',
        'Construction Equipment': 'Matériel BTP & Chantier',
        'Wood & Agro Processing': 'Traitement Bois & Agro',
        'Special Machinery': 'Machines Spéciales',
        'Power Tools': 'Outillage Électroportatif',
        'Hand & Garden Tools': 'Outils à Main & Jardin',
        'Spare Parts & Aftermarket': 'Pièces Détachées OEM',
      },
      quickGroups: {
        all: 'Gammes Principales',
        gardenForestry: 'Jardin & Forêt',
        agroSolar: 'Agro & Solaire',
        powerPumps: 'Groupes & Pompes',
        constructionWashing: 'BTP & Haute Pression',
        toolsSpares: 'Outillage & Pièces OEM',
      },
      specs: {
        power: 'Puissance',
        displacement: 'Moteur / Spéc.',
        weight: 'Poids Net',
        modelsLabel: 'Modèles',
        units: 'gammes',
      },
      exploreModels: 'Voir les Modèles',
      inspectParts: 'Voir les Pièces',
      inquireBtn: 'Envoyer Demande',
      modelsInSeries: 'Modèles Disponibles dans Cette Série',
      selectModelHint:
        'Sélectionnez un modèle ci-dessous pour consulter sa fiche technique, ses composants internes ou contacter notre direction export.',
      applicationLabel: 'Application Principale',
      emptyTitle: 'Aucune machine ne correspond à votre recherche.',
      emptyReset: 'Réinitialiser',
    },
    engineering: {
      sectionTitle: 'Architecture Interne & Pièces OEM',
      sectionSubtitle:
        'Explorez la conception mécanique de nos groupes motopropulseurs. Cliquez sur un repère numéroté pour afficher l’alliage, le code OEM et l’intervalle d’entretien.',
      tabBrushCutter: 'Débroussailleuse & Agro',
      tabChainsaw: 'Moteur Tronçonneuse',
      tabOhvEnginePump: 'Moteur OHV 4T & Pompe',
      tabPumpTurbine: 'Turbine & Nettoyeur HP',
      tabPowerToolGearbox: 'Outil Brushless & Engrenage',
      partCodeLabel: 'Code Pièce OEM',
      materialLabel: 'Métallurgie / Alliage',
      intervalLabel: 'Périodicité d’Entretien',
      selectPartHint: 'Cliquez sur un numéro du schéma ou choisissez un composant ci-dessous.',
      openFullSpecs: 'Explorer les Modèles de la Série',
    },
    catalogs: {
      sectionTitle: 'Catalogue Général Tout-en-Un (PDF)',
      sectionSubtitle:
        'Un catalogue technique unifié regroupant l’ensemble des gammes et modèles ZAYNOVA, généré instantanément en PDF dans la langue sélectionnée sur le site.',
      masterBadge: 'ÉDITION COMPLÈTE TOUT-EN-UN · PDF',
      masterTitle: 'Catalogue Maître Export ZAYNOVA 2026',
      masterDesc:
        'Plus besoin de télécharger plusieurs brochures séparées. Téléchargez un seul PDF complet couvrant Débroussailleuses, Tronçonneuses, Motoculteurs, Pompes Solaires, Pulvérisateurs, Groupes Électrogènes, Motopompes, Nettoyeurs HP, BTP, Outillage & Pièces OEM.',
      bullet1: 'Toutes les 9 Divisions & 40+ Modèles Professionnels dans un Seul PDF',
      bullet2: 'Spécifications Moteur, Puissances, Poids & Applications',
      bullet3: 'Génération PDF Directe en Français, English, Español, Português, العربية & Deutsch',
      activeLangHint: 'Langue Active du PDF :',
      downloadBtn: 'Télécharger le Catalogue Complet (PDF)',
      generatingBtn: 'Génération du PDF...',
      floatingLabel: 'Catalogue PDF',
    },
    exportSection: {
      sectionTitle: 'Conçu pour les Importateurs & Distributeurs Engagés',
      sectionSubtitle:
        'Toutes les garanties attendues par un importateur national : validation d’endurance en usine, continuité des pièces OEM, conformité douanière complète et mise en relation directe via formulaire.',
      pillar1Title: 'Validation d’Endurance 500 Heures',
      pillar1Desc:
        'Tests automatisés sur banc dynamométrique, cylindres traités Nikasil et carburateurs réglés pour climats tropicaux et alpins.',
      pillar2Title: 'Approvisionnement Pièces OEM 10 Ans',
      pillar2Desc:
        'Disponibilité codifiée de carburateurs, kits piston, bobines d’allumage, guides-chaînes et joints haute pression.',
      pillar3Title: 'Homologation CE, EPA & Euro-V',
      pillar3Desc:
        'Dossiers d’importation complets avec Certificat d’Origine, déclarations CE/Euro-V et notices multilingues.',
      scheduleMeetingBtn: 'Planifier un Entretien',
      requestQueryBtn: 'Ouvrir le Formulaire',
      faqTitle: 'Questions Fréquentes des Importateurs',
      faqSubtitle:
        'Réponses claires aux questions commerciales, techniques et douanières avant de rejoindre le réseau ZAYNOVA.',
      faqs: [
        {
          q: 'Accordez-vous une exclusivité territoriale aux importateurs nationaux ou régionaux ?',
          a: 'Oui. Les partenaires qualifiés assurant une couverture commerciale structurée et le service après-vente bénéficient d’accords de protection territoriale afin d’éviter toute concurrence parallèle sur leur marché.',
        },
        {
          q: 'Comment sont gérées les pièces détachées et la garantie après livraison ?',
          a: 'Chaque expédition inclut les pièces d’usure courante et un accès permanent à notre stock OEM codifié garanti 10 ans. Les demandes de garantie sont traitées par numéro de série avec remplacement intégré.',
        },
        {
          q: 'Quels documents douaniers et certifications fournissez-vous à l’export ?',
          a: 'Nous remettons un dossier complet : certification usine ISO 9001:2015, conformité CE, certificats Euro-V, Facture Commerciale, Liste de Colisage, Connaissement, Certificat d’Origine et inspection SGS/BV sur demande.',
        },
        {
          q: 'Peut-on regrouper plusieurs gammes de machines dans une seule expédition ?',
          a: 'Oui. Les importateurs combinent couramment Débroussailleuses, Tronçonneuses, Motoculteurs, Pompes Solaires, Pulvérisateurs, Groupes Électrogènes, Matériel BTP et Pièces OEM dans un même chargement.',
        },
        {
          q: 'Proposez-vous des adaptations techniques ou du marquage OEM ?',
          a: 'Oui, nous adaptons les tensions/fréquences locales (110V/220V/230V, 50/60Hz), les manuels multilingues et les coffrets OEM pour les réseaux professionnels.',
        },
        {
          q: 'Comment démarrer une discussion pour devenir distributeur ZAYNOVA ?',
          a: 'Remplissez simplement le formulaire Partenaire Importateur sur cette page avec votre société, pays et numéro WhatsApp/téléphone. Notre directeur de zone vous contactera directement.',
        },
      ],
      onboardingStepsTitle: 'Processus d’Agrément en 3 Étapes',
      step1Title: '1. Soumettre le Formulaire',
      step1Desc: 'Présentez votre société, votre pays et les gammes prioritaires.',
      step2Title: '2. Étude Territoriale & Technique',
      step2Desc: 'Validation des normes locales, spécifications et disponibilité de zone.',
      step3Title: '3. Échantillons & Lancement',
      step3Desc: 'Contrôle des machines tests, dotation pièces OEM et déploiement.',
      inlineFormTitle: 'Formulaire Importateur & Distributeur Agréé',
      inlineFormSubtitle:
        'Vous souhaitez importer la gamme ZAYNOVA ou représenter la marque dans votre pays ? Complétez ce formulaire pour échanger directement.',
      preferredDivisionLabel: 'Divisions Prioritaires',
      inquiryTypeLabel: 'Objectif du Partenariat',
      submitInlineBtn: 'Envoyer ma Candidature Importateur / Distributeur',
    },
    modals: {
      tabQuote: 'Demande Importateur / Distributeur',
      tabMeeting: 'Planifier un Entretien',
      viewStudio: 'Modèles & Aperçu',
      viewExploded: 'Voir les Pièces Internes',
      companyName: 'Société / Entreprise d’Importation',
      contactName: 'Nom Complet du Dirigeant / Acheteur',
      country: 'Pays / Marché',
      email: 'E-mail Professionnel',
      phone: 'WhatsApp / Téléphone Direct',
      productInterest: 'Gamme ou Modèle Souhaité',
      businessRole: 'Profil d’Activité',
      targetCity: 'Ville / Zone Couverte',
      meetingDate: 'Date Souhaitée',
      meetingTime: 'Heure & Fuseau Horaire',
      meetingTopic: 'Objet de l’Entretien',
      notes: 'Vos questions, zone géographique et besoins',
      followupNotice:
        'Remplissez ce formulaire officiel : notre direction export vous contactera directement via votre WhatsApp/téléphone et votre e-mail.',
      submitQuote: 'Envoyer la Demande',
      submitMeeting: 'Confirmer le Rendez-vous',
      submitting: 'Envoi en cours...',
      successTitle: 'Demande Enregistrée par ZAYNOVA',
      successBody:
        'Merci pour votre intérêt envers ZAYNOVA. Votre profil importateur et vos questions ont bien été transmis ; notre responsable export vous contactera très prochainement.',
      close: 'Fermer',
      sendModelQuery: 'Demande sur ce Modèle',
      bookModelMeeting: 'Entretien sur ce Modèle',
      technicalSpecs: 'Spécifications du Modèle',
      seriesHighlights: 'Points Clés d’Ingénierie',
    },
    footer: {
      description:
        'ZAYNOVA Industrial Corporation conçoit des équipements agro-industriels, forestiers, pompes solaires, matériel BTP, outillage et pièces OEM pour les importateurs mondiaux.',
      navigationTitle: 'Annuaire Entreprise',
      exportComplianceTitle: 'Qualité & Conformité',
      complianceLine1: 'Management Qualité ISO 9001:2015',
      complianceLine2: 'Homologations CE · Euro-V · GS',
      complianceLine3: 'Engagement Pièces OEM 10 Ans',
      copyright: '© 2026 ZAYNOVA Industrial Corporation. Tous droits réservés.',
      adminLink: 'Portail Exécutif & CMS',
    },
  },

  ar: {
    code: 'ar',
    nativeName: 'العربية',
    shortLabel: 'AR',
    dir: 'rtl',
    nav: {
      aboutUs: 'عن الشركة',
      products: 'المنتجات',
      spareParts: 'قطع الغيار',
      catalogs: 'الكتالوج PDF',
      contactUs: 'بوابة المستوردين',
      becomeDealer: 'كن موزعنا المعتمد',
    },
    utility: {
      globalExport: 'مؤسسة ZAYNOVA الصناعية · مصنّع معدات معتمد ISO 9001 و CE',
      languageLabel: 'اللغة',
    },
    hero: {
      weAreTitle: 'هندسة القوة الفائقة بلا حدود',
      subheadline:
        'مصنّع عالمي للمعدات الزراعية والصناعية والغابات والطاقة الشمسية والإنشاءات والعدد الكهربائية للمستوردين والموزعين المعتمدين.',
      searchPlaceholder: 'ابحث عن معدة أو موديل (قاطعة أعشاب، منشار، حراثة، مضخة شمسية...)',
      searchBtn: 'بحث',
      presenceLead: 'انتشار',
      presenceEmphasis: 'عالمي',
      stat1Val: '+3',
      stat1Label: 'قارات',
      stat2Val: '+48',
      stat2Label: 'سوقاً مستهدفاً',
      stat3Val: '+40',
      stat3Label: 'موديلاً رئيسياً',
      ctaDealer: 'كن موزعنا المعتمد',
      ctaMeeting: 'حجز موعد اجتماع',
    },
    products: {
      sectionTitle: 'خطوط المنتجات الرئيسية',
      sectionSubtitle:
        'اضغط على أي فئة منتجات لاستعراض كافة الموديلات التابعة لها، فحص الأجزاء الداخلية، أو تقديم طلب وكالة واستيراد مباشر.',
      allCategories: 'جميع القطاعات',
      segmentSelectLabel: 'القطاع:',
      categories: {
        'Agro-Industrial Machinery': 'المعدات الزراعية والصناعية',
        'Garden & Forestry': 'الحدائق والغابات',
        'Diesel Machines': 'معدات الديزل',
        'Electric Machines': 'المعدات الكهربائية',
        Solar: 'معدات الطاقة الشمسية',
        'Spraying & Crop Protection': 'الرش وحماية المحاصيل',
        'Water Pumps & Fluid': 'مضخات المياه',
        'Engines & Power Generation': 'المحركات والمولدات',
        'Pressure Washing & Cleaning': 'غسالات الضغط والتنظيف',
        'Air Compressors': 'ضواغط الهواء',
        'Industrial Equipment': 'المعدات الصناعية واللحام',
        'Construction Equipment': 'معدات البناء والإنشاءات',
        'Wood & Agro Processing': 'تجهيز الأخشاب والأعلاف',
        'Special Machinery': 'الآلات الخاصة',
        'Power Tools': 'العدد الكهربائية',
        'Hand & Garden Tools': 'العدد اليدوية',
        'Spare Parts & Aftermarket': 'قطع الغيار الأصلية OEM',
      },
      quickGroups: {
        all: 'الخطوط الرئيسية',
        gardenForestry: 'الحدائق والغابات',
        agroSolar: 'الزراعة والطاقة الشمسية',
        powerPumps: 'المولدات والمضخات',
        constructionWashing: 'البناء والغسيل',
        toolsSpares: 'العدد وقطع الغيار',
      },
      specs: {
        power: 'نطاق القدرة',
        displacement: 'المواصفة',
        weight: 'الوزن الصافي',
        modelsLabel: 'موديلات',
        units: 'فئات',
      },
      exploreModels: 'استعراض الموديلات',
      inspectParts: 'فحص الأجزاء',
      inquireBtn: 'إرسال استفسار',
      modelsInSeries: 'الموديلات المتوفرة في هذه السلسلة',
      selectModelHint:
        'اختر أي موديل أدناه لمعاينة المواصفات الفنية، فحص القطع الداخلية، أو التواصل مع إدارة التصدير.',
      applicationLabel: 'الاستخدام الرئيسي',
      emptyTitle: 'لا توجد معدات تطابق خيارات البحث الحالية.',
      emptyReset: 'إعادة ضبط الفلاتر',
    },
    engineering: {
      sectionTitle: 'الهندسة الداخلية وقطع الغيار الأصلية',
      sectionSubtitle:
        'استعرض التصميم الداخلي الدقيق لمعداتنا. اضغط على أي رقم للاطلاع على نوع السبيكة ورمز القطعة OEM.',
      tabBrushCutter: 'قاطعة الأعشاب والزراعة',
      tabChainsaw: 'محرك منشار الجنزير',
      tabOhvEnginePump: 'محرك OHV ومضخة',
      tabPumpTurbine: 'التوربين ومضخة الضغط',
      tabPowerToolGearbox: 'العدد اللاسلكية والتروس',
      partCodeLabel: 'رمز القطعة OEM',
      materialLabel: 'السبيكة / المعدن',
      intervalLabel: 'فترة الصيانة',
      selectPartHint: 'اختر نقطة مرقمة على الرسم أو اختر مكوناً من القائمة.',
      openFullSpecs: 'استعراض موديلات السلسلة',
    },
    catalogs: {
      sectionTitle: 'الكتالوج الشامل لجميع المنتجات (PDF)',
      sectionSubtitle:
        'دليل تقني موحّد يجمع كافة خطوط الإنتاج والموديلات في ملف PDF واحد يتم إنشاؤه فوراً بلغة الموقع المختارة.',
      masterBadge: 'الإصدار الشامل الكامل · PDF',
      masterTitle: 'كتالوج ZAYNOVA الشامل للتصدير 2026',
      masterDesc:
        'لا حاجة لتحميل كتالوجات منفصلة لكل منتج. حمّل ملف PDF واحد شامل يضم قاطعات الأعشاب والمناشير والحراثات والمضخات الشمسية والرشاشات والمولدات ومضخات المياه وغسالات الضغط ومعدات البناء والعدد الكهربائية وقطع الغيار.',
      bullet1: 'يشمل جميع الأقسام الـ 9 وأكثر من 40 موديلاً في ملف PDF واحد',
      bullet2: 'مواصفات المحركات، القدرات، الأوزان والاستخدامات الرئيسية',
      bullet3: 'تحميل فوري بالعربية أو English أو Español أو Português أو Français أو Deutsch',
      activeLangHint: 'لغة التحميل النشطة:',
      downloadBtn: 'تحميل الكتالوج الشامل (PDF)',
      generatingBtn: 'جاري إنشاء ملف PDF...',
      floatingLabel: 'الكتالوج PDF',
    },
    exportSection: {
      sectionTitle: 'منظومة متكاملة للمستوردين والموزعين المعتمدين',
      sectionSubtitle:
        'كل ما يحتاجه المستورد قبل اتخاذ قرار الشراكة: اختبارات التحمل المصنعية، ضمان توفر قطع الغيار، مستندات التخليص الجمركي، والتقديم المباشر عبر النموذج الرسمي.',
      pillar1Title: 'اختبارات تحمل 500 ساعة',
      pillar1Desc:
        'اختبارات حمل آلية وطلاء نيكاسيل للأسطوانات ومعايرة للأجواء الحارة والمرتفعات.',
      pillar2Title: 'دعم قطع الغيار OEM لمدة 10 سنوات',
      pillar2Desc:
        'توفير مستمر للكربوراتير وأطقم البساتم والملفات والألواح ومانعات التسرب المرمزة.',
      pillar3Title: 'اعتمادات CE و EPA و Euro-V',
      pillar3Desc:
        'شهادات منشأ ومطابقة دولية كاملة وكتيبات تشغيل متعددة اللغات.',
      scheduleMeetingBtn: 'حجز اجتماع فيديو',
      requestQueryBtn: 'فتح نموذج الطلب',
      faqTitle: 'إجابات على تساؤلات المستوردين والموزعين',
      faqSubtitle:
        'إجابات واضحة حول الوكالات الحصرية، قطع الغيار، التخليص الجمركي، وضمان الجودة قبل التعاقد.',
      faqs: [
        {
          q: 'هل تمنحون حقوق توزيع حصرية للمستوردين في بلدانهم؟',
          a: 'نعم. يحصل الشركاء المعتمدون الملتزمون بتغطية السوق وخدمة ما بعد البيع على اتفاقيات حماية إقليمية أو وطنية لضمان عدم منافستهم باستيراد غير مصرح به في نفس المنطقة.',
        },
        {
          q: 'كيف يتم توفير قطع الغيار ومعالجة مطالبات الضمان؟',
          a: 'تتضمن الشحنات أطقم صيانة سريعة الحركة مع توفر دائم لبنك قطع الغيار الأصلية OEM المرمزة لمدة 10 سنوات، وتُعالج مطالبات الضمان عبر الرقم التسلسلي وتُرسل مع الشحنة التالية.',
        },
        {
          q: 'ما هي الشهادات ومستندات التخليص الجمركي المرفقة؟',
          a: 'نوفر ملف تصدير متكامل يشمل شهادة ISO 9001:2015، مطابقة CE، شهادات الانبعاثات Euro-V، الفاتورة التجارية، بيان التعبئة، بوليصة الشحن، شهادة المنشأ، وإمكانية الفحص المسبق عبر SGS أو BV.',
        },
        {
          q: 'هل يمكن للمستورد دمج عدة خطوط إنتاج في شحنة واحدة؟',
          a: 'نعم، يمكن دمج قاطعات الأعشاب والمناشير والحراثات والمضخات الشمسية والرشاشات والمولدات ومعدات البناء وقطع الغيار في شحنة واحدة متكاملة.',
        },
        {
          q: 'هل تدعمون تعديل المواصفات الكهربائية أو التصنيع الخاص OEM؟',
          a: 'نعم، ندعم مواصفات الجهد والتردد الإقليمية (110V/220V/230V – 50/60Hz) والكتيبات متعددة اللغات وبرامج العلامة الخاصة للشبكات الكبرى.',
        },
        {
          q: 'كيف أبدأ إجراءات الاعتماد كمستورد أو موزع؟',
          a: 'يرجى تعبئة نموذج طلب المستوردين والموزعين في هذه الصفحة مع بيانات الشركة والدولة ورقم الهاتف/الواتساب، وسيتواصل معكم مدير المبيعات الدولية مباشرة.',
        },
      ],
      onboardingStepsTitle: 'خطوات اعتماد المستورد في 3 مراحل',
      step1Title: '1. إرسال النموذج',
      step1Desc: 'شارك بيانات شركتك والدولة وخطوط المعدات المطلوبة.',
      step2Title: '2. مراجعة المنطقة والمواصفات',
      step2Desc: 'تأكيد توفر الوكالة الحصرية والمطابقة الفنية والجهد الكهربائي.',
      step3Title: '3. العينات والشحن',
      step3Desc: 'فحص عينات التشغيل وتحديد حزمة قطع الغيار وبدء التوزيع.',
      inlineFormTitle: 'نموذج طلب مستورد وموزع معتمد',
      inlineFormSubtitle:
        'هل ترغب في استيراد معدات ZAYNOVA أو الحصول على وكالة توزيع؟ قم بتعبئة النموذج للتواصل المباشر مع فريقنا.',
      preferredDivisionLabel: 'القطاعات المطلوبة',
      inquiryTypeLabel: 'هدف الشراكة',
      submitInlineBtn: 'إرسال طلب المستورد / الموزع',
    },
    modals: {
      tabQuote: 'طلب مستورد / موزع',
      tabMeeting: 'حجز اجتماع',
      viewStudio: 'الموديلات والنظرة العامة',
      viewExploded: 'فحص الأجزاء الداخلية',
      companyName: 'اسم الشركة / مؤسسة الاستيراد',
      contactName: 'الاسم الكامل للمسؤول',
      country: 'الدولة / السوق',
      email: 'البريد الإلكتروني الرسمي',
      phone: 'رقم واتساب / الهاتف المباشر',
      productInterest: 'خط الإنتاج أو الموديل المطلوب',
      businessRole: 'نوع النشاط التجاري',
      targetCity: 'المدينة / الإقليم',
      meetingDate: 'التاريخ المفضل',
      meetingTime: 'الوقت والمنطقة الزمنية',
      meetingTopic: 'موضوع الاجتماع',
      notes: 'تساؤلاتك، تفاصيل السوق والمتطلبات',
      followupNotice:
        'تواصل معنا مباشرة عبر هذا النموذج الرسمي — سيتواصل معك مدير التصدير الإقليمي عبر هاتفك والواتساب.',
      submitQuote: 'إرسال الطلب',
      submitMeeting: 'تأكيد حجز الاجتماع',
      submitting: 'جاري الإرسال...',
      successTitle: 'تم تسجيل طلبك لدى ZAYNOVA',
      successBody:
        'شكراً لتواصلك مع ZAYNOVA. تم استلام ملف المستورد الخاص بك واستفساراتك، وسيتواصل معك مدير التصدير الإقليمي قريباً.',
      close: 'إغلاق',
      sendModelQuery: 'استفسار عن هذا الموديل',
      bookModelMeeting: 'حجز اجتماع للموديل',
      technicalSpecs: 'مواصفات الموديل المختار',
      seriesHighlights: 'أبرز المواصفات الهندسية',
    },
    footer: {
      description:
        'تصنع مؤسسة ZAYNOVA الصناعية المعدات الزراعية والغابات والمضخات الشمسية ومعدات البناء والعدد الكهربائية وقطع الغيار الأصلية للمستوردين حول العالم.',
      navigationTitle: 'الدليل المؤسسي',
      exportComplianceTitle: 'الجودة والاعتمادات',
      complianceLine1: 'إدارة الجودة ISO 9001:2015',
      complianceLine2: 'اعتمادات السلامة CE · Euro-V · GS',
      complianceLine3: 'التزام بتوفير قطع الغيار الأصلية لمدة 10 سنوات',
      copyright: '© 2026 ZAYNOVA Industrial Corporation. جميع الحقوق محفوظة.',
      adminLink: 'البوابة التنفيذية وإدارة المحتوى',
    },
  },

  de: {
    code: 'de',
    nativeName: 'Deutsch',
    shortLabel: 'DE',
    dir: 'ltr',
    nav: {
      aboutUs: 'Über uns',
      products: 'Produkte',
      spareParts: 'Ersatzteile',
      catalogs: 'PDF-Katalog',
      contactUs: 'Importeure',
      becomeDealer: 'Händler werden',
    },
    utility: {
      globalExport: 'ZAYNOVA Industrial Corporation · ISO 9001 & CE Zertifizierter Maschinenhersteller',
      languageLabel: 'Sprache',
    },
    hero: {
      weAreTitle: 'GEBAUT FÜR KOMPROMISSLOSE KRAFT',
      subheadline:
        'Globaler Hersteller für Agrar-, Forst-, Solar-, Bau- und Elektrowerkzeug-Maschinensysteme für Landesimporteure und Fachhändler.',
      searchPlaceholder: 'Maschine suchen (Freischneider, Motorsäge, Motorhacke, Solarpumpe...)',
      searchBtn: 'Suchen',
      presenceLead: 'Präsenz',
      presenceEmphasis: 'Global',
      stat1Val: '3+',
      stat1Label: 'KONTINENTE',
      stat2Val: '48+',
      stat2Label: 'ZIELMÄRKTE',
      stat3Val: '40+',
      stat3Label: 'KERNMODELLE',
      ctaDealer: 'Händler werden',
      ctaMeeting: 'Termin vereinbaren',
    },
    products: {
      sectionTitle: 'Zentrale Produktlinien',
      sectionSubtitle:
        'Klicken Sie auf eine Hauptproduktlinie, um alle zugehörigen Modelle zu öffnen, Bauteile zu prüfen oder direkt als Importeur anzufragen.',
      allCategories: 'Alle Sparten',
      segmentSelectLabel: 'Sparte:',
      categories: {
        'Agro-Industrial Machinery': 'Agrar- & Landtechnik',
        'Garden & Forestry': 'Garten- & Forsttechnik',
        'Diesel Machines': 'Dieselmaschinen',
        'Electric Machines': 'Elektromaschinen',
        Solar: 'Solartechnik',
        'Spraying & Crop Protection': 'Sprüh- & Pflanzenschutz',
        'Water Pumps & Fluid': 'Wasserpumpen',
        'Engines & Power Generation': 'Motoren & Stromerzeuger',
        'Pressure Washing & Cleaning': 'Hochdruck & Reinigung',
        'Air Compressors': 'Druckluftkompressoren',
        'Industrial Equipment': 'Industrietechnik',
        'Construction Equipment': 'Baumaschinen',
        'Wood & Agro Processing': 'Holzverarbeitung',
        'Special Machinery': 'Sondermaschinen',
        'Power Tools': 'Elektrowerkzeuge',
        'Hand & Garden Tools': 'Handwerkzeuge',
        'Spare Parts & Aftermarket': 'OEM-Ersatzteile',
      },
      quickGroups: {
        all: 'Hauptlinien',
        gardenForestry: 'Garten & Forst',
        agroSolar: 'Agrar & Solar',
        powerPumps: 'Generatoren & Pumpen',
        constructionWashing: 'Bau & Hochdruck',
        toolsSpares: 'Werkzeuge & Ersatzteile',
      },
      specs: {
        power: 'Leistung',
        displacement: 'Spezifikation',
        weight: 'Gewicht',
        modelsLabel: 'Modelle',
        units: 'Linien',
      },
      exploreModels: 'Modelle öffnen',
      inspectParts: 'Bauteile prüfen',
      inquireBtn: 'Anfrage senden',
      modelsInSeries: 'Modelle in dieser Produktreihe',
      selectModelHint:
        'Wählen Sie ein Modell für vollständige Daten, Innenbauteile oder eine direkte Rücksprache.',
      applicationLabel: 'Einsatzbereich',
      emptyTitle: 'Keine Maschinen entsprechen Ihrer aktuellen Auswahl.',
      emptyReset: 'Filter zurücksetzen',
    },
    engineering: {
      sectionTitle: 'Konstruktionsaufbau & OEM-Ersatzteile',
      sectionSubtitle:
        'Prüfen Sie jede Baugruppe im Detail. Klicken Sie auf eine Positionsnummer für Werkstoffdaten und OEM-Teilenummern.',
      tabBrushCutter: 'Freischneider & Agrar',
      tabChainsaw: 'Motorsägen-Triebwerk',
      tabOhvEnginePump: '4-Takt OHV & Pumpe',
      tabPumpTurbine: 'Turbine & Hochdruck',
      tabPowerToolGearbox: 'Brushless-Werkzeug',
      partCodeLabel: 'OEM-Teilenummer',
      materialLabel: 'Werkstoff / Legierung',
      intervalLabel: 'Wartungsintervall',
      selectPartHint: 'Wählen Sie eine Positionsnummer im Bild oder unten aus der Liste.',
      openFullSpecs: 'Serienmodelle öffnen',
    },
    catalogs: {
      sectionTitle: 'All-in-One Gesamtkatalog (PDF)',
      sectionSubtitle:
        'Ein einheitliches technisches Handbuch für alle ZAYNOVA-Produktlinien und Modelle — direkt als PDF in Ihrer gewählten Website-Sprache.',
      masterBadge: 'GESAMTAUSGABE ALL-IN-ONE · PDF',
      masterTitle: 'ZAYNOVA 2026 Gesamtkatalog für Importeure',
      masterDesc:
        'Kein separates Herunterladen einzelner Broschüren nötig. Ein vollständiges PDF mit Freischneidern, Motorsägen, Motorhacken, Solarpumpen, Sprühgeräten, Generatoren, Wasserpumpen, Hochdruckreinigern, Baumaschinen, Elektrowerkzeugen und OEM-Ersatzteilen.',
      bullet1: 'Alle 9 Produktlinien & über 40 Fachmodelle in einem PDF',
      bullet2: 'Technische Daten, Leistungsbereiche, Gewichte & Einsatzgebiete',
      bullet3: 'Sofort-Download auf Deutsch, English, Español, Português, Français & العربية',
      activeLangHint: 'Aktive PDF-Sprache:',
      downloadBtn: 'Gesamtkatalog herunterladen (PDF)',
      generatingBtn: 'PDF wird erstellt...',
      floatingLabel: 'PDF-Katalog',
    },
    exportSection: {
      sectionTitle: 'Gebaut für Nationale Importeure & Fachhändler',
      sectionSubtitle:
        'Alles, was professionelle Importeure vor einer Partnerschaft prüfen: Werksdauerläufe, gesicherte Ersatzteilversorgung, vollständige Zollpapiere und direkte Bewerbung über unser Partnerformular.',
      pillar1Title: '500-Stunden-Dauerlaufprüfung',
      pillar1Desc:
        'Automatisierte Prüfstandstests, Nikasil-Zylinderlaufbahnen und kalibrierte Vergaser für alle Klimazonen.',
      pillar2Title: '10 Jahre OEM-Ersatzteilversorgung',
      pillar2Desc:
        'Lückenlose Belieferung mit Vergasern, Kolbenkits, Zündspulen, Führungsschienen und Dichtungssätzen.',
      pillar3Title: 'CE, EPA & Euro-V Konformität',
      pillar3Desc:
        'Internationale Prüfzertifikate, Ursprungszeugnisse und mehrsprachige Betriebsanleitungen.',
      scheduleMeetingBtn: 'Termin vereinbaren',
      requestQueryBtn: 'Formular öffnen',
      faqTitle: 'Häufige Fragen von Importeuren',
      faqSubtitle:
        'Klare Antworten zu Gebietsschutz, Ersatzteilen, Zolldokumenten und technischer Abwicklung.',
      faqs: [
        {
          q: 'Gewährt ZAYNOVA Gebietsschutz für Landesimporteure und Regionalhändler?',
          a: 'Ja. Qualifizierte Partner mit strukturierter Marktabdeckung und Servicewerkstatt erhalten vertraglich geschützte Verkaufsgebiete ohne parallele Direktkonkurrenz.',
        },
        {
          q: 'Wie sind Ersatzteile und Garantiefälle nach Auslieferung geregelt?',
          a: 'Jede Lieferung kann mit Service-Kits ausgestattet werden und greift auf unsere 10-jährige codierte OEM-Ersatzteilversorgung zurück. Garantien werden unkompliziert über die Seriennummer abgewickelt.',
        },
        {
          q: 'Welche Zertifikate und Exportdokumente liegen den Lieferungen bei?',
          a: 'Vollständige Importunterlagen inklusive ISO 9001:2015, CE-Konformität, Euro-V-Abgaszertifikaten, Handelsrechnung, Packliste, Konnossement, Ursprungszeugnis sowie SGS/BV-Prüfbereitschaft.',
        },
        {
          q: 'Können verschiedene Produktlinien gemeinsam versendet werden?',
          a: 'Ja. Importeure bündeln regelmäßig Forstgeräte, Bodenfräsen, Solarpumpen, Generatoren, Baugeräte und Ersatzteile in einer gemeinsamen Sendung.',
        },
        {
          q: 'Unterstützt ZAYNOVA regionale Spannungsnormen oder OEM-Anpassungen?',
          a: 'Ja, wir konfigurieren Stecker/Spannungen (110V/220V/230V, 50/60Hz), mehrsprachige Handbücher und OEM-Sets passend für Ihren Zielmarkt.',
        },
        {
          q: 'Wie kann ich mich als autorisierter Importeur oder Händler bewerben?',
          a: 'Füllen Sie einfach das Partnerformular auf dieser Seite mit Firmendaten, Land und Telefon/WhatsApp aus. Unser Exportleiter meldet sich direkt bei Ihnen.',
        },
      ],
      onboardingStepsTitle: 'Händleraufnahme in 3 Schritten',
      step1Title: '1. Formular senden',
      step1Desc: 'Firmenprofil, Zielland und gewünschte Sparten angeben.',
      step2Title: '2. Gebiets- & Technikprüfung',
      step2Desc: 'Abstimmung zu Normen, Spannungen und Gebietsverfügbarkeit.',
      step3Title: '3. Muster & Marktstart',
      step3Desc: 'Prüfung der Mustergeräte, Ersatzteilpaket und Verkaufsstart.',
      inlineFormTitle: 'Importeur- & Fachhändler-Formular',
      inlineFormSubtitle:
        'Möchten Sie ZAYNOVA-Maschinen importieren oder regional vertreiben? Senden Sie uns direkt Ihre Anfrage über dieses Formular.',
      preferredDivisionLabel: 'Gewünschte Produktsparten',
      inquiryTypeLabel: 'Partnerschaftsziel',
      submitInlineBtn: 'Importeur- / Händleranfrage absenden',
    },
    modals: {
      tabQuote: 'Importeur- / Händleranfrage',
      tabMeeting: 'Termin buchen',
      viewStudio: 'Modelle & Übersicht',
      viewExploded: 'Bauteile prüfen',
      companyName: 'Firma / Importunternehmen',
      contactName: 'Name des Geschäftsführers / Einkäufers',
      country: 'Land / Zielmarkt',
      email: 'Geschäftliche E-Mail-Adresse',
      phone: 'WhatsApp / Direkte Telefonnummer',
      productInterest: 'Interessierte Produktlinie / Modell',
      businessRole: 'Unternehmensprofil',
      targetCity: 'Stadt / Vertriebsgebiet',
      meetingDate: 'Wunschdatum',
      meetingTime: 'Uhrzeit & Zeitzone',
      meetingTopic: 'Gesprächsthema',
      notes: 'Ihre Fragen, Marktinfos & Anforderungen',
      followupNotice:
        'Nutzen Sie dieses offizielle Formular — unser Exportteam kontaktiert Sie direkt über Ihre angegebene Telefon-/WhatsApp-Nummer.',
      submitQuote: 'Anfrage absenden',
      submitMeeting: 'Termin bestätigen',
      submitting: 'Wird übertragen...',
      successTitle: 'Anfrage bei ZAYNOVA registriert',
      successBody:
        'Vielen Dank für Ihr Interesse an ZAYNOVA. Ihr Importeur-Profil und Ihre Fragen wurden übermittelt — unser Exportleiter meldet sich in Kürze persönlich.',
      close: 'Schließen',
      sendModelQuery: 'Anfrage zu diesem Modell',
      bookModelMeeting: 'Modell-Termin buchen',
      technicalSpecs: 'Modellspezifikationen',
      seriesHighlights: 'Konstruktionsmerkmale',
    },
    footer: {
      description:
        'ZAYNOVA Industrial Corporation entwickelt Agrar-, Forst-, Solar-, Bau-, Druckluftmaschinen, Elektrowerkzeuge und OEM-Ersatzteile für globale Importeure.',
      navigationTitle: 'Unternehmensverzeichnis',
      exportComplianceTitle: 'Qualität & Normen',
      complianceLine1: 'ISO 9001:2015 Qualitätsmanagement',
      complianceLine2: 'CE · Euro-V · GS Sicherheitsprüfung',
      complianceLine3: '10 Jahre OEM-Ersatzteilgarantie',
      copyright: '© 2026 ZAYNOVA Industrial Corporation. Alle Rechte vorbehalten.',
      adminLink: 'Executive-Portal & CMS',
    },
  },
};
