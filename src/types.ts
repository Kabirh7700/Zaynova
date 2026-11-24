export type LanguageCode = 'en' | 'es' | 'pt' | 'fr' | 'ar' | 'de';

export type ProductSegment =
  | 'Agro-Industrial Machinery'
  | 'Garden & Forestry'
  | 'Diesel Machines'
  | 'Electric Machines'
  | 'Solar'
  | 'Spraying & Crop Protection'
  | 'Water Pumps & Fluid'
  | 'Engines & Power Generation'
  | 'Pressure Washing & Cleaning'
  | 'Air Compressors'
  | 'Industrial Equipment'
  | 'Construction Equipment'
  | 'Wood & Agro Processing'
  | 'Special Machinery'
  | 'Power Tools'
  | 'Hand & Garden Tools'
  | 'Spare Parts & Aftermarket';

export interface ProductPart {
  id: string;
  partCode: string;
  name: string;
  material: string;
  functionDesc: string;
  serviceInterval: string;
  xPercent: number;
  yPercent: number;
}

export interface ProductSubModel {
  sku: string;
  name: string;
  powerSpec: string;
  displacement: string;
  weight: string;
  application: string;
}

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: ProductSegment;
  powerSpec: string;
  displacement: string;
  weight: string;
  description: string;
  imageUrl: string;
  explodedImageUrl?: string;
  parts?: ProductPart[];
  subModels?: ProductSubModel[];
  status: 'In Production' | 'Export Ready' | 'OEM Available';
  highlights?: string[];
  // Optional internal export fields (kept optional for CSV compatibility, never rendered publicly)
  moq?: number;
  cartonQty?: number;
  container40HqQty?: number;
  fobPriceRange?: string;
  // Optional multilingual fields
  name_es?: string;
  name_pt?: string;
  name_fr?: string;
  name_ar?: string;
  name_de?: string;
  description_es?: string;
  description_pt?: string;
  description_fr?: string;
  description_ar?: string;
  description_de?: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  edition: string;
  category: string;
  language: string;
  pageCount: string;
  fileSize: string;
  description: string;
  coverImage: string;
  downloadUrl: string;
}

export interface BrandConfig {
  brandName: string;
  logoUrl: string;
  exportEmail: string;
  hqLocation: string;
}

export interface SiteDataBundle {
  products: ProductItem[];
  catalogs: CatalogItem[];
  brandConfig: BrandConfig;
  source: 'default' | 'google-sheet';
  lastSyncedAt?: string;
}
