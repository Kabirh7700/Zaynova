import { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=1200",
  afterImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
  beforeLabel = "Muted Concrete (Before ZAYNOVA)",
  afterLabel = "Ultra-Luxury Bespoke Arch Residence (After ZAYNOVA)"
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-950/40 border border-gold-800/40 rounded-full text-xs text-gold-300 font-outfit uppercase tracking-widest mb-3">
          <Sparkles className="w-3 w-3 animate-pulse text-gold-400" />
          Aesthetic Metamorphosis
        </div>
        <h3 id="transformation-title" className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">
          See The Transformation
        </h3>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Slide the cursor across the living envelope to witness how ZAYNOVA transforms raw concrete structures into meticulously finished luxury spaces.
        </p>
      </div>

      {/* Interactive Canvas Container */}
      <div 
        ref={containerRef}
        id="before-after-container"
        className="relative h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden select-none border border-neutral-800 bg-neutral-900 cursor-ew-resize gold-glow"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* After Image Container (Full block, behind) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={afterImage} 
            alt="After Renovation" 
            className="w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gold-500/30 text-gold-300 text-xs font-outfit uppercase tracking-widest">
            {afterLabel}
          </div>
        </div>

        {/* Before Image Container (Clipped block, front) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden" 
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-[450px] sm:w-[940px] md:w-[1200px] h-full" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
            <img 
              src={beforeImage} 
              alt="Before Renovation" 
              className="w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300 text-xs font-outfit uppercase tracking-widest whitespace-nowrap">
            {beforeLabel}
          </div>
        </div>

        {/* Floating Split Handle Line */}
        <div 
          className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-gold-400 flex items-center justify-center text-gold-400 shadow-xl gold-glow">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
