import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Layers, Wrench, X } from 'lucide-react';
import { LanguageCode, ProductItem, ProductSubModel } from '../types';
import { TranslationBundle } from '../i18n/translations';
import { getDefaultExplodedBlueprint } from '../data';
import ExplodedPartsViewer from './ExplodedPartsViewer';
import { trackEvent } from '../utils/analytics';

interface ProductDetailModalProps {
  product: ProductItem | null;
  initialMode?: 'studio' | 'exploded';
  initialSubModelSku?: string;
  lang: LanguageCode;
  t: TranslationBundle;
  onClose: () => void;
  onRequestQuery: (product: ProductItem, modelLabel: string) => void;
  onBookMeeting: (product: ProductItem, modelLabel: string) => void;
}

export function getLocalizedProductField(
  product: ProductItem,
  field: 'name' | 'description',
  lang: LanguageCode
): string {
  if (lang === 'es' && product[`${field}_es`]) return product[`${field}_es`] as string;
  if (lang === 'pt' && product[`${field}_pt`]) return product[`${field}_pt`] as string;
  if (lang === 'fr' && product[`${field}_fr`]) return product[`${field}_fr`] as string;
  if (lang === 'ar' && product[`${field}_ar`]) return product[`${field}_ar`] as string;
  if (lang === 'de' && product[`${field}_de`]) return product[`${field}_de`] as string;
  return product[field];
}

export default function ProductDetailModal({
  product,
  initialMode = 'studio',
  initialSubModelSku = '',
  lang,
  t,
  onClose,
  onRequestQuery,
  onBookMeeting,
}: ProductDetailModalProps) {
  const [viewMode, setViewMode] = useState<'studio' | 'exploded'>(initialMode);
  const [selectedModelIdx, setSelectedModelIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setViewMode(initialMode);
    setImgError(false);
    if (product?.subModels && product.subModels.length > 0 && initialSubModelSku) {
      const idx = product.subModels.findIndex(
        (m) => m.sku.toLowerCase() === initialSubModelSku.toLowerCase()
      );
      setSelectedModelIdx(idx >= 0 ? idx : 0);
    } else {
      setSelectedModelIdx(0);
    }
  }, [product, initialMode, initialSubModelSku]);

  if (!product) return null;

  const localizedName = getLocalizedProductField(product, 'name', lang);
  const localizedDesc = getLocalizedProductField(product, 'description', lang);
  const fallbackBlueprint = getDefaultExplodedBlueprint(product.category);
  const explodedImg = product.explodedImageUrl || fallbackBlueprint.explodedImageUrl;
  const partsList =
    product.parts && product.parts.length > 0 ? product.parts : fallbackBlueprint.parts;

  const subModels: ProductSubModel[] = product.subModels || [];
  const activeSubModel: ProductSubModel | null =
    subModels.length > 0 ? subModels[Math.min(selectedModelIdx, subModels.length - 1)] : null;

  const activeSku = activeSubModel ? activeSubModel.sku : product.sku;
  const activeTitle = activeSubModel ? activeSubModel.name : localizedName;
  const activePower = activeSubModel ? activeSubModel.powerSpec : product.powerSpec;
  const activeDisp = activeSubModel ? activeSubModel.displacement : product.displacement;
  const activeWeight = activeSubModel ? activeSubModel.weight : product.weight;
  const activeInquiryLabel = `${activeSku} - ${activeTitle}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      dir={t.dir}
    >
      <div className="bg-white border border-[#E1E4E8] rounded-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Modal Header with Models / Exploded View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[#E1E4E8] sticky top-0 bg-white z-20">
          <div className="flex items-center gap-3 text-xs text-[#525B66]">
            <span className="font-mono font-semibold text-[#111417]">{activeSku}</span>
            <span aria-hidden="true">·</span>
            <span>{t.products.categories[product.category] || product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#387500] font-medium">{product.status}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#F1F3F6] rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('studio')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'studio'
                    ? 'bg-white text-[#111417] shadow-sm'
                    : 'text-[#525B66] hover:text-[#111417]'
                }`}
              >
                {t.modals.viewStudio}
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('exploded');
                  trackEvent({
                    eventType: 'BUTTON_CLICK',
                    eventDetail: `Opened Exploded Parts View: ${activeSku}`,
                    language: lang,
                    optionTag: `PartsView:${activeSku}`,
                  });
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'exploded'
                    ? 'bg-[#111417] text-[#7BE300] shadow-sm'
                    : 'text-[#525B66] hover:text-[#111417]'
                }`}
              >
                {t.modals.viewExploded}
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#525B66] hover:text-[#111417] hover:bg-[#F1F3F6] transition-colors cursor-pointer"
              aria-label={t.modals.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewMode === 'exploded' ? (
          <div className="p-6 md:p-8 space-y-6 bg-[#F8F9FA]">
            <ExplodedPartsViewer
              imageUrl={explodedImg}
              parts={partsList}
              title={`${activeSku} · ${activeTitle}`}
              t={t}
              onSelectPart={(part) =>
                trackEvent({
                  eventType: 'BUTTON_CLICK',
                  eventDetail: `Inspected Part ${part.partCode} (${part.name}) on ${activeSku}`,
                  language: lang,
                  optionTag: `Part:${part.partCode}`,
                })
              }
            />

            <div className="pt-4 border-t border-[#E1E4E8] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#525B66]">{t.modals.followupNotice}</div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onBookMeeting(product, activeInquiryLabel)}
                  className="px-4 py-2.5 rounded-lg border border-[#E1E4E8] bg-white hover:border-[#111417] text-[#111417] text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#387500]" />
                  <span>{t.modals.bookModelMeeting}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRequestQuery(product, activeInquiryLabel)}
                  className="px-5 py-2.5 rounded-lg bg-[#65C800] hover:bg-[#7BE300] text-[#111417] text-xs sm:text-sm font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.modals.sendModelQuery}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-8 items-start">
            {/* Left Studio Image & Highlights */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-[#F1F3F6] rounded-lg border border-[#E1E4E8] aspect-[4/3] overflow-hidden flex items-center justify-center">
                {product.imageUrl && !imgError ? (
                  <img
                    src={product.imageUrl}
                    alt={localizedName}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-[#525B66]">
                    <Wrench className="w-10 h-10 text-[#387500] mb-2" />
                    <span className="font-mono text-xs font-semibold text-[#111417]">
                      {activeSku}
                    </span>
                    <span className="text-xs mt-1">{activeTitle}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setViewMode('exploded')}
                className="w-full py-2.5 px-4 rounded-lg border border-[#111417] text-[#111417] hover:bg-[#111417] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#387500]" />
                <span>{t.modals.viewExploded}</span>
              </button>

              {product.highlights && product.highlights.length > 0 && (
                <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#E1E4E8] space-y-2">
                  <div className="text-xs font-semibold text-[#111417]">
                    {t.modals.seriesHighlights}
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#525B66]">
                    {product.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-[#387500] font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Hierarchical Models Selector + Technical Specifications + Lead Capture */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#111417] tracking-tight">
                  {localizedName}
                </h2>
                <p className="text-sm text-[#525B66] leading-relaxed mt-2">{localizedDesc}</p>
              </div>

              {/* Models Selection Grid (When Product Line Contains Multiple Models) */}
              {subModels.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-semibold text-[#111417]">
                      {t.products.modelsInSeries} ({subModels.length})
                    </h3>
                    <span className="text-[11px] text-[#525B66]">{t.products.selectModelHint}</span>
                  </div>

                  <div className="divide-y divide-[#E1E4E8] border border-[#E1E4E8] rounded-lg overflow-hidden bg-white">
                    {subModels.map((model, idx) => {
                      const isSelected = idx === selectedModelIdx;
                      return (
                        <button
                          key={model.sku}
                          type="button"
                          onClick={() => {
                            setSelectedModelIdx(idx);
                            trackEvent({
                              eventType: 'PRODUCT_VIEW',
                              eventDetail: `Selected Model inside Series: ${model.sku} (${model.name})`,
                              language: lang,
                              projectType: model.sku,
                              optionTag: `Model:${model.sku}`,
                            });
                          }}
                          className={`w-full text-start px-4 py-3 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-[#111417] text-white'
                              : 'hover:bg-[#F8F9FA] text-[#111417]'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 text-xs">
                              <span
                                className={`font-mono font-bold ${
                                  isSelected ? 'text-[#7BE300]' : 'text-[#387500]'
                                }`}
                              >
                                {model.sku}
                              </span>
                              <span
                                className={`font-display text-sm font-bold truncate ${
                                  isSelected ? 'text-white' : 'text-[#111417]'
                                }`}
                              >
                                {model.name}
                              </span>
                            </div>
                            <div
                              className={`text-[11px] mt-0.5 truncate ${
                                isSelected ? 'text-gray-300' : 'text-[#525B66]'
                              }`}
                            >
                              {model.application}
                            </div>
                          </div>

                          <div
                            className={`text-xs font-mono shrink-0 tabular-nums ${
                              isSelected ? 'text-[#7BE300]' : 'text-[#525B66]'
                            }`}
                          >
                            {model.displacement}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Selected Model Technical Specs (ZERO Pricing, ZERO MOQ) */}
              <div>
                <h3 className="text-xs font-semibold text-[#111417] mb-2.5">
                  {t.modals.technicalSpecs} · <span className="font-mono">{activeSku}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#E1E4E8] rounded-lg divide-y sm:divide-y-0 sm:divide-x divide-[#E1E4E8] bg-[#F8F9FA]">
                  <div className="p-3.5">
                    <div className="text-[11px] text-[#525B66]">
                      {t.products.specs.displacement}
                    </div>
                    <div className="font-mono text-sm font-semibold text-[#111417] tabular-nums mt-0.5">
                      {activeDisp}
                    </div>
                  </div>
                  <div className="p-3.5">
                    <div className="text-[11px] text-[#525B66]">{t.products.specs.power}</div>
                    <div className="font-mono text-sm font-semibold text-[#111417] tabular-nums mt-0.5">
                      {activePower}
                    </div>
                  </div>
                  <div className="p-3.5">
                    <div className="text-[11px] text-[#525B66]">{t.products.specs.weight}</div>
                    <div className="font-mono text-sm font-semibold text-[#111417] tabular-nums mt-0.5">
                      {activeWeight}
                    </div>
                  </div>
                </div>
                {activeSubModel?.application && (
                  <div className="mt-2.5 px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E4E8] text-xs text-[#525B66]">
                    <span className="font-semibold text-[#111417]">
                      {t.products.applicationLabel}:{' '}
                    </span>
                    <span>{activeSubModel.application}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E1E4E8] space-y-3">
                <p className="text-xs text-[#525B66]">{t.modals.followupNotice}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onRequestQuery(product, activeInquiryLabel)}
                    className="px-5 py-2.5 rounded-lg bg-[#65C800] hover:bg-[#7BE300] text-[#111417] text-sm font-bold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.modals.sendModelQuery}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookMeeting(product, activeInquiryLabel)}
                    className="px-4 py-2.5 rounded-lg border border-[#E1E4E8] hover:border-[#111417] text-[#111417] text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4 text-[#387500]" />
                    <span>{t.modals.bookModelMeeting}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
