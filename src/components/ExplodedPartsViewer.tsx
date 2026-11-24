import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { ProductPart } from '../types';
import { TranslationBundle } from '../i18n/translations';

interface ExplodedPartsViewerProps {
  imageUrl: string;
  parts: ProductPart[];
  title: string;
  t: TranslationBundle;
  onSelectPart?: (part: ProductPart) => void;
}

export default function ExplodedPartsViewer({
  imageUrl,
  parts,
  title,
  t,
  onSelectPart,
}: ExplodedPartsViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setImgFailed(false);
  }, [imageUrl, parts]);

  const safeIndex = Math.min(activeIndex, Math.max(0, parts.length - 1));
  const activePart = parts[safeIndex];

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    if (parts[idx] && onSelectPart) {
      onSelectPart(parts[idx]);
    }
  };

  if (!parts || parts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left: Cinematic Dark Engineering Viewport with Interactive Hotspots */}
      <div className="lg:col-span-7 bg-[#0F1215] rounded-xl border border-[#262B31] overflow-hidden flex flex-col justify-between">
        <div className="relative aspect-[4/3] w-full bg-[#0F1215] overflow-hidden">
          {imageUrl && !imgFailed ? (
            <img
              src={imageUrl}
              alt={`${title} Internal Exploded Assembly`}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <Layers className="w-10 h-10 text-[#7BE300] mb-2" />
              <span className="text-sm font-display text-white">{title}</span>
            </div>
          )}

          {/* Subtle cinematic edge vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F1215] via-transparent to-[#0F1215]/30" />

          {/* Interactive Numbered Component Hotspots */}
          {parts.map((part, idx) => {
            const isActive = idx === safeIndex;
            const num = String(idx + 1).padStart(2, '0');
            return (
              <button
                key={part.id}
                type="button"
                onClick={() => handleSelect(idx)}
                style={{ left: `${part.xPercent}%`, top: `${part.yPercent}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-mono text-[11px] font-bold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg ${
                  isActive
                    ? 'bg-[#65C800] text-[#111417] ring-4 ring-[#65C800]/35 scale-115 z-20'
                    : 'bg-[#111417]/85 text-white border border-white/40 hover:border-[#7BE300] hover:scale-105 z-10'
                }`}
                title={`${num}. ${part.name}`}
                aria-label={`Inspect ${part.name}`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Active Part Engineering Readout Strip */}
        {activePart && (
          <div className="p-5 bg-[#14181C] border-t border-white/10 text-white space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#7BE300] font-mono">
                  <span>{String(safeIndex + 1).padStart(2, '0')}</span>
                  <span aria-hidden="true">/</span>
                  <span>{activePart.partCode}</span>
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                  {activePart.name}
                </h4>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    handleSelect((safeIndex - 1 + parts.length) % parts.length)
                  }
                  className="p-2 rounded-lg border border-white/15 hover:border-white/40 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous Part"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect((safeIndex + 1) % parts.length)}
                  className="p-2 rounded-lg border border-white/15 hover:border-white/40 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next Part"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {activePart.functionDesc}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs">
              <div>
                <span className="text-gray-400 block text-[11px]">
                  {t.engineering.materialLabel}
                </span>
                <span className="font-mono font-semibold text-white">
                  {activePart.material}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">
                  {t.engineering.intervalLabel}
                </span>
                <span className="font-mono font-semibold text-[#7BE300]">
                  {activePart.serviceInterval}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right: Interactive Bill of Materials (BOM) List */}
      <div className="lg:col-span-5 bg-white border border-[#E1E4E8] rounded-xl flex flex-col overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F8F9FA] border-b border-[#E1E4E8]">
          <div className="text-xs font-semibold text-[#111417]">{title}</div>
          <div className="text-[11px] text-[#525B66] mt-0.5">
            {t.engineering.selectPartHint}
          </div>
        </div>

        <div className="divide-y divide-[#E1E4E8] overflow-y-auto flex-1">
          {parts.map((part, idx) => {
            const isActive = idx === safeIndex;
            const num = String(idx + 1).padStart(2, '0');
            return (
              <button
                key={part.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`w-full text-start px-5 py-3.5 transition-colors flex items-start gap-3.5 cursor-pointer ${
                  isActive ? 'bg-[#F8F9FA]' : 'hover:bg-[#F8F9FA]/60'
                }`}
              >
                <span
                  className={`font-mono text-xs font-bold w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                    isActive
                      ? 'bg-[#111417] text-[#7BE300]'
                      : 'bg-[#F1F3F6] text-[#525B66]'
                  }`}
                >
                  {num}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-[#111417] truncate">
                      {part.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#525B66] mt-0.5">
                    <span className="font-mono font-medium text-[#387500]">
                      {part.partCode}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{part.material}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
