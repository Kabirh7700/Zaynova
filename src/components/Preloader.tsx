import { motion } from 'motion/react';

export default function Preloader() {
  return (
    <motion.div
          id="brand-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.98,
            filter: "blur(8px)",
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-mate select-none overflow-hidden"
        >
          {/* Content container inside preloader */}
          <div className="relative flex flex-col items-center max-w-lg px-8 text-center">
            
            {/* SVG Logo - Animate building blocks with premium gold drop shadows */}
            <motion.div
              id="preloader-logo-container"
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
              }}
              className="relative w-40 h-40 md:w-48 md:h-48 mb-8 flex items-center justify-center"
            >
              <svg className="w-full h-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Multi-stop luxury warm antique gold metallic gradient with realistic highlight/shadow bands */}
                  <linearGradient id="preloader-gold-metal" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#704A15" />       {/* Deep shadow bronze */}
                    <stop offset="20%" stopColor="#B38A3E" />      {/* Warm medium gold */}
                    <stop offset="40%" stopColor="#F5E4BE" />      {/* Bright champagne metallic light */}
                    <stop offset="60%" stopColor="#C99F4A" />      {/* Polished luster gold */}
                    <stop offset="80%" stopColor="#875E20" />      {/* Rich dark brass shade */}
                    <stop offset="100%" stopColor="#D9B771" />     {/* Soft satin gold highlight */}
                  </linearGradient>
                  
                  {/* Highlights and glowing lines */}
                  <linearGradient id="preloader-gold-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />       {/* Direct light specular highlight */}
                    <stop offset="35%" stopColor="#F7E6C1" />      {/* Soft warm champagne */}
                    <stop offset="70%" stopColor="#C5963B" />      {/* Golden core */}
                    <stop offset="100%" stopColor="#754E15" />     {/* Dark edge shadow */}
                  </linearGradient>

                  <filter id="preloader-logo-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="1.8" dy="2.8" stdDeviation="1.8" floodColor="#000000" floodOpacity="0.95" />
                    <feDropShadow dx="-0.4" dy="-0.4" stdDeviation="0.4" floodColor="#FFFFFF" floodOpacity="0.1" />
                  </filter>
                </defs>

                <g filter="url(#preloader-logo-shadow)">
                  {/* Detailed ZAYNOVA Main Emblems with staggered stroke elements */}
                  
                  {/* Main 'Z' - Top horizontal bar and left vertical descent serif */}
                  <motion.path 
                    d="M 12.5 38 C 12.5 25 13.8 14 13.8 14 H 80 L 71 23 H 20.2 V 34 C 20.2 36 19.5 38 18 38 H 12.5 Z" 
                    fill="url(#preloader-gold-metal)"
                    stroke="url(#preloader-gold-glow)"
                    strokeWidth="0.4"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
                  />

                  {/* Main 'Z' - Thick Central Slanted Diagonal Body */}
                  <motion.path 
                    d="M 80 14 L 12 88 H 28.5 L 84.5 23 L 80 14 Z" 
                    fill="url(#preloader-gold-metal)"
                    stroke="url(#preloader-gold-glow)"
                    strokeWidth="0.4"
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Main 'Z' - Bottom Left Horizontal bar and base serif */}
                  <motion.path 
                    d="M 12 88 H 32 V 79.5 H 24.5 L 24.5 81.5 H 12 V 88 Z" 
                    fill="url(#preloader-gold-metal)"
                    stroke="url(#preloader-gold-glow)"
                    strokeWidth="0.4"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
                  />

                  {/* Elegant Slash accent line */}
                  <motion.path 
                    d="M 84.5 14.5 L 34.5 76" 
                    stroke="url(#preloader-gold-glow)" 
                    strokeWidth="1.9" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6, duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Gabled Architectural Roof representation */}
                  <motion.path 
                    d="M 44 74.5 L 51 67.5 L 58 74.5" 
                    stroke="url(#preloader-gold-glow)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                  />

                  {/* 2x2 Modular grid window elements */}
                  <g fill="url(#preloader-gold-metal)">
                    <motion.rect x="45.5" y="77" width="4.5" height="4.5" rx="0.5" stroke="url(#preloader-gold-glow)" strokeWidth="0.3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9, duration: 0.4 }} />
                    <motion.rect x="52" y="77" width="4.5" height="4.5" rx="0.5" stroke="url(#preloader-gold-glow)" strokeWidth="0.3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0, duration: 0.4 }} />
                    <motion.rect x="45.5" y="83.5" width="4.5" height="4.5" rx="0.5" stroke="url(#preloader-gold-glow)" strokeWidth="0.3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0, duration: 0.4 }} />
                    <motion.rect x="52" y="83.5" width="4.5" height="4.5" rx="0.5" stroke="url(#preloader-gold-glow)" strokeWidth="0.3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1, duration: 0.4 }} />
                  </g>

                   {/* Ascending skyscraper pillar constructs (Chiseled 3D design matching screenshot exactly) */}
                   <g stroke="url(#preloader-gold-glow)" strokeWidth="0.25">
                     {/* Column 1 - Left Panel (High-Gloss Highlight) & Right Panel (Shadow Rich Gold) */}
                     <g>
                       <motion.path 
                         d="M 60 88 V 48 L 62 46.25 V 88 Z" 
                         fill="url(#preloader-gold-glow)" 
                         initial={{ scaleY: 0, originY: 1 }} 
                         animate={{ scaleY: 1 }} 
                         transition={{ delay: 0.7, duration: 1 }} 
                       />
                       <motion.path 
                         d="M 62 88 V 46.25 L 64 44.5 V 88 Z" 
                         fill="url(#preloader-gold-metal)" 
                         initial={{ scaleY: 0, originY: 1 }} 
                         animate={{ scaleY: 1 }} 
                         transition={{ delay: 0.7, duration: 1 }} 
                       />
                     </g>
                     {/* Column 2 - Tallest central skyscraper segment */}
                     <g>
                       <motion.path 
                         d="M 67 88 V 38 L 69 36.25 V 88 Z" 
                         fill="url(#preloader-gold-glow)" 
                         initial={{ scaleY: 0, originY: 1 }} 
                         animate={{ scaleY: 1 }} 
                         transition={{ delay: 0.8, duration: 1 }} 
                       />
                       <motion.path 
                         d="M 69 88 V 36.25 L 71 34.5 V 88 Z" 
                         fill="url(#preloader-gold-metal)" 
                         initial={{ scaleY: 0, originY: 1 }} 
                         animate={{ scaleY: 1 }} 
                         transition={{ delay: 0.8, duration: 1 }} 
                       />
                     </g>
                     {/* Column 3 - Step down segment */}
                     <g>
                       <motion.path 
                         d="M 74 88 V 58 L 76 56.25 V 88 Z" 
                         fill="url(#preloader-gold-glow)" 
                         initial={{ scaleY: 0, originY: 1 }} 
                         animate={{ scaleY: 1 }} 
                         transition={{ delay: 0.9, duration: 1 }} 
                       />
                       <motion.path 
                         d="M 76 88 V 56.25 L 78 54.5 V 88 Z" 
                         fill="url(#preloader-gold-metal)" 
                         initial={{ scaleY: 0, originY: 1 }} 
                         animate={{ scaleY: 1 }} 
                         transition={{ delay: 0.9, duration: 1 }} 
                       />
                     </g>
                     {/* Column 4 - Outer short segment */}
                     <g>
                       <motion.path 
                         d="M 81 88 V 66 L 83 64.25 V 88 Z" 
                         fill="url(#preloader-gold-glow)" 
                         initial={{ scaleY: 0, originY: 1 }} 
                         animate={{ scaleY: 1 }} 
                         transition={{ delay: 1.0, duration: 1 }} 
                       />
                       <motion.path 
                         d="M 83 88 V 64.25 L 85 62.5 V 88 Z" 
                         fill="url(#preloader-gold-metal)" 
                         initial={{ scaleY: 0, originY: 1 }} 
                         animate={{ scaleY: 1 }} 
                         transition={{ delay: 1.0, duration: 1 }} 
                       />
                     </g>
                   </g>

                  {/* Bottom structural girder anchor */}
                  <motion.rect 
                    x="41" y="88.2" width="46" height="1.8" 
                    fill="url(#preloader-gold-metal)" rx="0.5"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                  />
                </g>
              </svg>
              
              {/* Gold light shine effect that animations left-to-right across the logo */}
              <div className="absolute inset-0 overflow-hidden mix-blend-color-dodge rounded-full pointer-events-none">
                <motion.div 
                  initial={{ x: "-150%", skewX: -20 }}
                  animate={{ x: "150%" }}
                  transition={{ delay: 1.5, duration: 1.3, ease: "circIn" }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </div>
            </motion.div>

            {/* Branded Company Name: "ZAYNOVA" using beautiful Cinzel Roman Serif typeface */}
            <h1 className="overflow-hidden mb-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF7] via-[#DFB971] to-[#91652C]"
              >
                ZAYNOVA
              </motion.div>
            </h1>

            {/* Custom Divider line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.5 }}
              transition={{ delay: 1.3, duration: 1 }}
              className="h-[1px] w-28 bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-4"
            />

            {/* Subtitles: "INTERIOR • RENOVATION • CIVIL" */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.26em" }}
                transition={{ delay: 1.3, duration: 1.4, ease: "easeOut" }}
                className="font-outfit text-[11px] sm:text-xs md:text-sm text-gold-400 font-light uppercase tracking-[0.26em]"
              >
                Interior • Renovation • Civil
              </motion.div>
            </div>

            {/* Elegant luxury loading indicator (Minimal custom spinner/line) */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-neutral-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-2/3 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
              />
            </div>

          </div>
        </motion.div>
  );
}
