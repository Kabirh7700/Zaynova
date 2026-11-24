import { useEffect, useState } from 'react';
import defaultDarkLogo from '../assets/images/zaynova_logo_dark_1794575027433.jpg';

export const DEFAULT_UPLOADED_LOGO = defaultDarkLogo;

interface BrandLogoProps {
  logoUrl?: string;
  brandName?: string;
  darkSurface?: boolean;
  sizeClass?: string;
}

export default function BrandLogo({
  logoUrl,
  brandName = 'ZAYNOVA',
  darkSurface = true,
  sizeClass = 'h-14 sm:h-16',
}: BrandLogoProps) {
  const activeSrc = logoUrl?.trim() ? logoUrl.trim() : DEFAULT_UPLOADED_LOGO;
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [activeSrc]);

  if (!imgFailed) {
    return (
      <div className="flex items-center gap-3.5 shrink-0">
        <div
          className={`rounded-lg overflow-hidden flex items-center justify-center shrink-0 bg-[#06080A] px-1.5 py-0.5 border border-[#7BE300]/35 shadow-[0_0_20px_rgba(123,227,0,0.2)]`}
        >
          <img
            src={activeSrc}
            alt={brandName}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className={`${sizeClass} w-auto max-w-[190px] object-contain`}
          />
        </div>
        <span
          className={`font-display font-extrabold tracking-wide text-xl sm:text-2xl whitespace-nowrap ${
            darkSurface ? 'text-white' : 'text-[#111417]'
          }`}
        >
          {brandName}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3.5 shrink-0">
      <svg
        className={`${sizeClass} w-12 shrink-0`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="6" fill="#06080A" stroke="#7BE300" strokeOpacity="0.4" />
        <path d="M10 11H30L26.5 16H17.5L29.5 29H10L13.5 24H21.5L10 11Z" fill="#7BE300" />
      </svg>
      <span
        className={`font-display font-extrabold tracking-wide text-xl sm:text-2xl whitespace-nowrap ${
          darkSurface ? 'text-white' : 'text-[#111417]'
        }`}
      >
        {brandName}
      </span>
    </div>
  );
}
