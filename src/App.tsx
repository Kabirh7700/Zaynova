import { useState, useEffect, FormEvent } from 'react';
import { AnimatePresence } from 'motion/react';
import { trackEvent } from './utils/analytics';
import { 
  Compass, Home, Briefcase, HardHat, ChefHat, Layers, Armchair, Grid, 
  Paintbrush, Palette, SquareDot, Zap, Droplet, Sparkles, Maximize, 
  Scissors, Key, Building, MapPin, FileText, Award, Cpu, CheckCircle, 
  Feather, Phone, Mail, Send, Menu, X, ArrowRight, ChevronLeft, 
  ChevronRight, Plus, Minus, Star, Check, MessageSquare
} from 'lucide-react';
import { 
  SERVICES, PROJECTS, TESTIMONIALS, PROCESS_STEPS, FAQS, 
  WHY_CHOOSE_US_POINTS, TRUST_INDICATORS, STATS 
} from './data';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import LeadModal from './components/LeadModal';
import Preloader from './components/Preloader';
import AdminDashboard from './components/AdminDashboard';

// Import local image assets for correct bundler path resolution
import luxuryInteriorHero from './assets/images/luxury_interior_hero_1781267401231.jpg';
import luxuryKitchen from './assets/images/luxury_kitchen_1781267417904.jpg';
import luxuryOffice from './assets/images/luxury_office_1781267434698.jpg';

// Interactive Custom Premium Logo with Architectural & Civil Elements
export function ZaynovaLogo({ className = "h-11 w-11", showText = true, textClass = "text-xl md:text-2xl" }) {
  return (
    <div className="flex items-center gap-3">
      <svg className={`${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Multi-stop luxury warm antique gold metallic gradient with realistic highlight/shadow bands */}
          <linearGradient id="logo-premium-gold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#704A15" />       {/* Deep shadow bronze */}
            <stop offset="20%" stopColor="#B38A3E" />      {/* Warm medium gold */}
            <stop offset="40%" stopColor="#F5E4BE" />      {/* Bright champagne metallic light */}
            <stop offset="60%" stopColor="#C99F4A" />      {/* Polished luster gold */}
            <stop offset="80%" stopColor="#875E20" />      {/* Rich dark brass shade */}
            <stop offset="100%" stopColor="#D9B771" />     {/* Soft satin gold highlight */}
          </linearGradient>
          
          {/* Dynamic golden-glow and specular edge reflection gradient */}
          <linearGradient id="logo-gold-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />       {/* Direct light specular highlight */}
            <stop offset="35%" stopColor="#F7E6C1" />      {/* Soft warm champagne */}
            <stop offset="70%" stopColor="#C5963B" />      {/* Golden core */}
            <stop offset="100%" stopColor="#754E15" />     {/* Dark edge shadow */}
          </linearGradient>

          {/* Strong multi-layered drop shadow filter to create the embossed 3D pop off the dark background */}
          <filter id="gold-shadow-filter" x="-20%" y="-20%" width="145%" height="145%">
            <feDropShadow dx="1.8" dy="2.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.95" />
            <feDropShadow dx="-0.4" dy="-0.4" stdDeviation="0.4" floodColor="#FFFFFF" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* ZAYNOVA Premium Gold Logo Emblem - Exact Architectural Geometry from the Image */}
        <g filter="url(#gold-shadow-filter)">
          
          {/* Main "Z" - Top Horizontal Bar with beautiful descending left curved serif hook */}
          <path 
            d="M 12.5 38 C 12.5 25 13.8 14 13.8 14 H 80 L 71 23 H 20.2 V 34 C 20.2 36 19.5 38 18 38 H 12.5 Z" 
            fill="url(#logo-premium-gold)" 
            stroke="url(#logo-gold-glow)"
            strokeWidth="0.4"
          />

          {/* Main "Z" - Thick Central Slanted Diagonal Body */}
          <path 
            d="M 80 14 L 12 88 H 28.5 L 84.5 23 L 80 14 Z" 
            fill="url(#logo-premium-gold)" 
            stroke="url(#logo-gold-glow)"
            strokeWidth="0.4"
          />

          {/* Main "Z" - Bottom Left Horizontal Bar & Ascent Serif */}
          <path 
            d="M 12 88 H 32 V 79.5 H 24.5 L 24.5 81.5 H 12 V 88 Z" 
            fill="url(#logo-premium-gold)" 
            stroke="url(#logo-gold-glow)"
            strokeWidth="0.4"
          />

          {/* Thin Companion Accent Parallel Slash */}
          <path 
            d="M 84.5 14.5 L 34.5 76" 
            stroke="url(#logo-gold-glow)" 
            strokeWidth="1.9" 
            strokeLinecap="round" 
          />

          {/* Gabled Architectural Roof (Thickened solid gold representation) */}
          <path 
            d="M 44 74.5 L 51 67.5 L 58 74.5" 
            stroke="url(#logo-gold-glow)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />

          {/* Window pane (2x2 grid representing construction blocks with micro-bevel) */}
          <g fill="url(#logo-premium-gold)">
            <rect x="45.5" y="77" width="4.5" height="4.5" rx="0.5" stroke="url(#logo-gold-glow)" strokeWidth="0.3" />
            <rect x="52" y="77" width="4.5" height="4.5" rx="0.5" stroke="url(#logo-gold-glow)" strokeWidth="0.3" />
            <rect x="45.5" y="83.5" width="4.5" height="4.5" rx="0.5" stroke="url(#logo-gold-glow)" strokeWidth="0.3" />
            <rect x="52" y="83.5" width="4.5" height="4.5" rx="0.5" stroke="url(#logo-gold-glow)" strokeWidth="0.3" />
          </g>

          {/* Civil Pillars / Skyscraper Block (Chiseled 3D design matching screenshot exactly) */}
          <g stroke="url(#logo-gold-glow)" strokeWidth="0.25">
            {/* Column 1 - Left Panel (High-Gloss Highlight) & Right Panel (Shadow Rich Gold) */}
            <path d="M 60 88 V 48 L 62 46.25 V 88 Z" fill="url(#logo-gold-glow)" />
            <path d="M 62 88 V 46.25 L 64 44.5 V 88 Z" fill="url(#logo-premium-gold)" />
            {/* Column 2 - Tallest central skyscraper segment */}
            <path d="M 67 88 V 38 L 69 36.25 V 88 Z" fill="url(#logo-gold-glow)" />
            <path d="M 69 88 V 36.25 L 71 34.5 V 88 Z" fill="url(#logo-premium-gold)" />
            {/* Column 3 - Step down segment */}
            <path d="M 74 88 V 58 L 76 56.25 V 88 Z" fill="url(#logo-gold-glow)" />
            <path d="M 76 88 V 56.25 L 78 54.5 V 88 Z" fill="url(#logo-premium-gold)" />
            {/* Column 4 - Outer short segment */}
            <path d="M 81 88 V 66 L 83 64.25 V 88 Z" fill="url(#logo-gold-glow)" />
            <path d="M 83 88 V 64.25 L 85 62.5 V 88 Z" fill="url(#logo-premium-gold)" />
          </g>

          {/* Foundation support girder (Horizontal bottom anchor line) */}
          <rect x="41" y="88.2" width="46" height="1.8" fill="url(#logo-premium-gold)" rx="0.5" />
        </g>
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-medium tracking-[0.34em] text-white ${textClass} leading-none`}>
            ZAYNOVA
          </span>
          <span className="text-[9px] text-gold-400 font-outfit tracking-[0.2em] uppercase mt-1 leading-none">
            Interior • Renovation • Civil
          </span>
        </div>
      )}
    </div>
  );
}

// Map Lucide icons dynamically from data definitions
function ServiceIcon({ name, className = "w-6 h-6 text-gold-400" }: { name: string; className?: string }) {
  const icons: Record<string, any> = {
    Compass, Home, Briefcase, HardHat, ChefHat, Layers, Armchair, Grid, 
    Paintbrush, Palette, SquareDot, Zap, Droplet, Sparkles, Maximize, 
    Scissors, Key, Building, MapPin, FileText, Award, Cpu, CheckCircle, Feather
  };
  const IconComp = icons[name] || SquareDot;
  return <IconComp className={className} />;
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  // Auto-dismiss original preloader animation after 3.2s precisely
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'interior' | 'renovation' | 'civil'>('all');
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] = useState<string>('all');
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [activeFAQId, setActiveFAQId] = useState<string | null>(null);
  
  // Testimonial state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Modal interactions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'site-visit' | 'quotation'>('site-visit');
  const [selectedService, setSelectedService] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Contact form submission flow
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactType, setContactType] = useState('Residential Interiors');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Scroll effect to upgrade Navigation bar style
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent page scrolling while preloader is visible
  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

  // Track page view event when user enters and the preloader hides
  useEffect(() => {
    if (!showPreloader) {
      trackEvent({
        eventType: 'PAGE_VIEW',
        eventDetail: 'Visitor entered ZAYNOVA luxury interface'
      });
    }
  }, [showPreloader]);

  const openModal = (type: 'site-visit' | 'quotation', serviceTitle = '') => {
    setModalType(type);
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;
    
    setContactSubmitting(true);

    try {
      // Get next inquiry number dynamically from the same local counter
      const current = localStorage.getItem('zaynova_inquiry_counter');
      let count = 1;
      if (current) {
        const parsed = parseInt(current, 10);
        if (!isNaN(parsed)) {
          count = parsed;
        }
      }
      const nextCount = count + 1;
      localStorage.setItem('zaynova_inquiry_counter', nextCount.toString());
      const inquiryNum = count.toString().padStart(3, '0');

      const payload = {
        _subject: `Zaynova Inquiry #${inquiryNum} | Contact: ${contactName} (${contactType})`,
        _template: "box",
        "INQUIRY NUMBER": `#${inquiryNum}`,
        "CLIENT NAME": contactName,
        "CONTACT MOBILE": contactPhone,
        "EMAIL ADDRESS": contactEmail || 'N/A',
        "PROJECT STREAM": contactType,
        "DETAILS / REQUIREMENTS": contactMsg || 'No specific requirements message provided.',
        "SUBMISSION TIMELINE": new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' (IST)'
      };

      // Logging Contact Form submissions dynamically to Google Sheets
      trackEvent({
        eventType: 'FORM_SUBMISSION',
        eventDetail: `Footer Contact/Inquiry Form (${contactType})`,
        clientName: contactName,
        clientPhone: contactPhone,
        clientEmail: contactEmail || 'N/A',
        projectType: contactType,
        inquiryNum: inquiryNum,
        message: contactMsg || 'No specific requirements message provided.'
      });

      const response = await fetch('https://formsubmit.co/ajax/45c305c0a323d36e4c27fbab7a90f7c4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error('Failed to submit contact form to email server.', response.statusText);
      }
    } catch (err) {
      console.error('Contact form submission network error:', err);
    } finally {
      setContactSubmitting(false);
      setContactSuccess(true);
    }
  };

  const handleWAInquiry = () => {
    trackEvent({
      eventType: 'BUTTON_CLICK',
      eventDetail: `Clicked 'WhatsApp Direct' in footer form: Name: ${contactName || 'N/A'}, Phone: ${contactPhone || 'N/A'}`
    });
    const message = `Hello ZAYNOVA! I'd like to get in touch. Name: ${contactName || 'Client'}, Mobile: ${contactPhone || 'N/A'}, Project Type: ${contactType}, Message: ${contactMsg || 'General Inquiry'}`;
    window.open(`https://wa.me/918750083150?text=${encodeURIComponent(message)}`, '_blank');
  };

  const carouselNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const carouselPrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Filter 18 services based on tab
  const filteredServices = SERVICES.filter(service => {
    if (activeTab === 'all') return true;
    return service.category === activeTab;
  });

  // Unique service categories listed under Projects
  const portfolioCategories = ['all', 'Living Rooms', 'Bedrooms', 'Modular Kitchens', 'Bathrooms', 'Office Interiors', 'False Ceiling Projects', 'Civil Work Projects', 'Commercial Projects'];
  const filteredProjects = selectedPortfolioCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedPortfolioCategory);

  // Gallery items matched with categorizations
  const GALLERY_ITEMS = [
    { id: 1, category: 'Interiors', tag: 'Living Room', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800' },
    { id: 2, category: 'Renovation', tag: 'Kitchen', image: luxuryKitchen },
    { id: 3, category: 'Commercial', tag: 'Office Lobby', image: luxuryOffice },
    { id: 4, category: 'Civil Works', tag: 'Reinforcement', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800' },
    { id: 5, category: 'Residential', tag: 'Master Bedroom', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800' },
    { id: 6, category: 'Interiors', tag: 'Luxury Dining', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800' },
    { id: 7, category: 'Residential', tag: 'Custom Closet', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800' },
    { id: 8, category: 'Renovation', tag: 'Spa Washroom', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800' },
    { id: 9, category: 'Civil Works', tag: 'Ceiling Frame', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' }
  ];

  const filteredGallery = galleryFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category.toLowerCase() === galleryFilter.toLowerCase() || (galleryFilter === 'Residential' && (item.category === 'Residential' || item.category === 'Interiors')));

  return (
    <div className="bg-dark-mate text-gray-100 min-h-screen relative selection:bg-gold-500 selection:text-black antialiased font-sans">
      
      {/* Premium Company Branded Preloader on first load */}
      <AnimatePresence>
        {showPreloader && <Preloader />}
      </AnimatePresence>
      
      {/* ---------------- NAVIGATION ---------------- */}
      <header 
        id="luxury-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          navScrolled 
            ? 'py-4 bg-dark-charcoal/90 backdrop-blur-md border-b border-gold-800/20 shadow-xl' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Brand Logo */}
          <a href="#home" id="nav-logo-link" className="cursor-pointer">
            <ZaynovaLogo />
          </a>

          {/* Desktop Nav Actions */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
            <a 
              href="#home" 
              onClick={() => trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Jumped to Section from Desktop Header: Home' })}
              className="text-gray-300 hover:text-white transition-colors text-sm font-outfit uppercase tracking-wider"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Jumped to Section from Desktop Header: About' })}
              className="text-gray-300 hover:text-white transition-colors text-sm font-outfit uppercase tracking-wider"
            >
              About
            </a>
            <a 
              href="#services" 
              onClick={() => trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Jumped to Section from Desktop Header: Services' })}
              className="text-gray-300 hover:text-white transition-colors text-sm font-outfit uppercase tracking-wider"
            >
              Services
            </a>
            <a 
              href="#projects" 
              onClick={() => trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Jumped to Section from Desktop Header: Projects' })}
              className="text-gray-300 hover:text-white transition-colors text-sm font-outfit uppercase tracking-wider"
            >
              Projects
            </a>
            <a 
              href="#process" 
              onClick={() => trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Jumped to Section from Desktop Header: Process' })}
              className="text-gray-300 hover:text-white transition-colors text-sm font-outfit uppercase tracking-wider"
            >
              Process
            </a>
            <a 
              href="#gallery" 
              onClick={() => trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Jumped to Section from Desktop Header: Gallery' })}
              className="text-gray-300 hover:text-white transition-colors text-sm font-outfit uppercase tracking-wider"
            >
              Gallery
            </a>
            <a 
              href="#contact" 
              onClick={() => trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Jumped to Section from Desktop Header: Contact' })}
              className="text-gray-300 hover:text-white transition-colors text-sm font-outfit uppercase tracking-wider"
            >
              Contact
            </a>
          </nav>

          {/* Nav CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              type="button"
              id="nav-btn-site-visit"
              onClick={() => {
                trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Header - Get Free Site Visit' });
                openModal('site-visit');
              }}
              className="px-4 py-2 text-xs font-outfit uppercase tracking-wider text-gold-300 hover:text-white border border-gold-600/50 hover:border-gold-400 bg-gold-950/20 rounded-md transition-all cursor-pointer"
            >
              Get Free Site Visit
            </button>
            <button 
              type="button"
              id="nav-btn-quotation"
              onClick={() => {
                trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Header - Request Quotation' });
                openModal('quotation');
              }}
              className="px-4 py-2 text-xs font-outfit uppercase tracking-wider text-white bg-gradient-to-r from-gold-600 to-gold-500 hover:scale-[1.03] transition-all rounded-md cursor-pointer font-medium shadow-md gold-shadow"
            >
              Request Quotation
            </button>
          </div>

          {/* Mobile Menu Action Icon */}
          <button 
            type="button"
            id="mobile-menu-burger"
            onClick={() => {
              trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: mobileMenuOpen ? 'Closed Burger Mobile Menu' : 'Opened Burger Mobile Menu' });
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden text-gray-300 hover:text-white p-1"
            title="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gold-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Slide Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="fixed inset-0 z-30 lg:hidden bg-dark-mate/95 backdrop-blur-lg flex flex-col pt-28 px-6 pb-8 space-y-6 animate-fade-in border-b border-gold-900/40">
          <button
            type="button"
            onClick={() => {
              trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Closed Mobile Menu Drawer via X' });
              setMobileMenuOpen(false);
            }}
            className="absolute top-6 right-6 text-gray-400 hover:text-white"
            title="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col space-y-4">
            {['Home', 'About', 'Services', 'Projects', 'Process', 'Gallery', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => {
                  trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: `Jumped to Section from Mobile Menu: ${item}` });
                  setMobileMenuOpen(false);
                }}
                className="text-white hover:text-gold-400 py-2 border-b border-neutral-900 font-display text-lg tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <button 
              type="button"
              id="mobile-nav-site-visit"
              onClick={() => { 
                trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Mobile Drawer - Get Free Site Visit' });
                openModal('site-visit'); 
                setMobileMenuOpen(false); 
              }}
              className="w-full text-center py-3 text-sm font-outfit uppercase tracking-wider text-gold-300 border border-gold-500/30 rounded-xl bg-gold-950/15"
            >
              Get Free Site Visit
            </button>
            <button 
              type="button"
              id="mobile-nav-quotation"
              onClick={() => { 
                trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Mobile Drawer - Request Quotation' });
                openModal('quotation'); 
                setMobileMenuOpen(false); 
              }}
              className="w-full text-center py-3 text-sm font-outfit uppercase tracking-wider text-white bg-gold-600 rounded-xl font-medium"
            >
              Request Quotation
            </button>
          </div>
        </div>
      )}


      {/* ---------------- HERO SECTION ---------------- */}
      <section 
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden pt-12"
      >
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={luxuryInteriorHero} 
            alt="Zaynova Premium Architectural Residence Layout" 
            className="w-full h-full object-cover scale-[1.03] opacity-65"
            referrerPolicy="no-referrer"
          />
          {/* Heavy gradient vignette elements representing ultra-exclusive design feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-mate via-dark-mate/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-mate via-transparent to-dark-mate/30"></div>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Floating animated gold background architectural geometry particles */}
        <div className="absolute inset-0 z-1 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-10 w-[1px] h-48 bg-gradient-to-b from-gold-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-1/4 right-20 w-48 h-[1px] bg-gradient-to-l from-gold-400 to-transparent"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-gold-500/25 rounded-full filter blur-xl animate-pulse"></div>
        </div>

        {/* Hero Content Space */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
          {/* Luxury Gold Icon Overlay */}
          <div className="inline-flex justify-center mb-6 animate-fade-in">
            <div className="p-3 bg-black/80 rounded-2xl border border-gold-500/30 shadow-2xl gold-glow">
              <ZaynovaLogo showText={false} className="w-16 h-16" />
            </div>
          </div>

          <h2 className="text-xs uppercase tracking-[0.4em] font-outfit text-gold-300 font-medium mb-3">
            Luxury Spaces. Built Right.
          </h2>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-medium text-white mb-6 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Transforming Spaces <br />
            <span className="gold-gradient-text italic font-normal font-serif">Into Timeless Luxury</span>
          </h1>

          <p className="text-zinc-300 text-base md:text-xl font-sans font-light max-w-3xl mx-auto mb-10 leading-relaxed">
            Premium Interior, Renovation & Civil Work Solutions for high-end Homes, Offices & Commercial Spaces. Executed with uncompromised engineering precision and absolute pricing transparency.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <button 
              type="button"
              id="hero-request-quotation"
              onClick={() => {
                trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Hero Header Action - Request Quotation' });
                openModal('quotation');
              }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-white font-outfit uppercase tracking-widest text-xs font-semibold rounded-xl shadow-2xl gold-shadow hover:scale-105 transition-all text-center cursor-pointer"
            >
              Request Quotation
            </button>
            <button 
              type="button"
              id="hero-book-site-visit"
              onClick={() => {
                trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Hero Header Action - Book Free Site Visit' });
                openModal('site-visit');
              }}
              className="w-full sm:w-auto px-8 py-4 border border-gold-400/40 hover:border-gold-300 bg-black/50 hover:bg-black/80 backdrop-blur text-gold-300 hover:text-white font-outfit uppercase tracking-widest text-xs font-semibold rounded-xl transition-all text-center cursor-pointer"
            >
              Book Free Site Visit
            </button>
          </div>
        </div>

        {/* Fine-line arrow slide indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
          <a href="#trust-badges" className="flex flex-col items-center gap-2 text-gray-500 hover:text-gold-400 transition-colors">
            <span className="text-[10px] font-mono tracking-widest uppercase">Explore Excellence</span>
            <div className="w-1 h-12 bg-gradient-to-b from-gold-500 to-transparent rounded-full"></div>
          </a>
        </div>
      </section>


      {/* ---------------- TRUST INDICATORS (BADGES) ---------------- */}
      <section id="trust-badges" className="py-12 bg-dark-charcoal border-y border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
            {TRUST_INDICATORS.map((badge, idx) => (
              <div 
                key={badge.title}
                id={`trust-badge-${idx}`}
                className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-black/20 border border-transparent hover:border-gold-500/10 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gold-950/30 border border-gold-500/30 flex items-center justify-center mb-3">
                  <Check className="w-4 h-4 text-gold-400" />
                </div>
                <h4 className="text-[13px] font-outfit font-medium text-white uppercase tracking-wider mb-1 leading-snug">
                  {badge.title}
                </h4>
                <p className="text-[11px] text-gray-400 leading-normal">
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------- ABOUT SECTION ---------------- */}
      <section id="about" className="py-24 bg-dark-mate relative overflow-hidden">
        {/* Delicate golden geometric line overlays */}
        <div className="absolute top-1/2 -right-32 w-96 h-96 border border-gold-900/10 rounded-full select-none pointer-events-none filter blur-sm"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Editorial Frame Layout */}
            <div className="col-span-1 lg:col-span-5 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden border border-neutral-800 gold-glow bg-neutral-900/50">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"
                  alt="High Finish Living Room Design"
                  className="w-full aspect-[4/5] object-cover filter brightness-[0.85] contrast-[1.05] hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Architectural Badge overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-5 rounded-xl border border-gold-500/25 flex items-center gap-4">
                  <ZaynovaLogo showText={false} className="w-12 h-12 shrink-0 animate-spin-slow" />
                  <div>
                    <div className="text-white font-display text-sm uppercase tracking-wider">Premium Execution</div>
                    <div className="text-gold-400 text-xs font-mono">120-Point Site Guidelines</div>
                  </div>
                </div>
              </div>

              {/* Back Gold Mesh Grid Accent */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[radial-gradient(#c59239_1px,transparent_1px)] [background-size:16px_16px] opacity-25 z-0"></div>
            </div>

            {/* Editorial Text Container */}
            <div className="col-span-1 lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-8 bg-gold-400"></div>
                  <span className="text-xs uppercase tracking-[0.3em] font-outfit text-gold-400 font-medium">The Signature Standard</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
                  About ZAYNOVA
                </h3>
              </div>

              <div className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed font-light">
                <p>
                  ZAYNOVA delivers premium interior, renovation and civil work solutions tailored to modern residential and commercial spaces. Our approach combines design excellence, technical expertise and quality execution to create spaces that are both functional and visually stunning.
                </p>
                <p>
                  Whether it is a complete home renovation, luxury interior transformation, office fit-out or custom construction project, our focus remains on unmatched quality, absolute cost transparency, and strict on-time client satisfaction guidelines.
                </p>
                <p className="border-l-2 border-gold-500/60 pl-4 py-1.5 italic text-gold-200 text-base font-serif bg-gold-950/10">
                  "We do not build simple spaces. We curate architectural legacy coordinates designed to enrich life and empower corporations."
                </p>
              </div>

              {/* Structural Bullet Stats */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-900">
                <div>
                  <div className="text-gold-400 text-2xl font-mono font-medium">100%</div>
                  <h5 className="text-white font-outfit text-xs font-medium uppercase tracking-wider mt-1">Contractual Transparency</h5>
                  <p className="text-[11px] text-gray-400 mt-1">Every line-item listed clearly in advance with fixed margins.</p>
                </div>
                <div>
                  <div className="text-gold-400 text-2xl font-mono font-medium">24/7</div>
                  <h5 className="text-white font-outfit text-xs font-medium uppercase tracking-wider mt-1">Supervised Tracking</h5>
                  <p className="text-[11px] text-gray-400 mt-1">Dedicated site engineers inspect tolerances to the millimeter.</p>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-outfit font-semibold text-white hover:text-gold-300 transition-colors group"
                >
                  Initiate Design Dialogue 
                  <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ---------------- SERVICES SECTION (18 SERVICES) ---------------- */}
      <section id="services" className="py-24 bg-dark-charcoal border-y border-neutral-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-outfit text-gold-400 font-medium">Comprehensive Corporate Solutions</span>
            <h3 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Our Premium Services
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light">
              We specialize in modern residences, high-end commercial spaces, structural modification, and detailed civil executions with absolute luxury standards.
            </p>

            {/* Premium Category Filter Tabs */}
            <div className="flex justify-center flex-wrap gap-2 pt-6">
              {[
                { id: 'all', label: 'All Services (18)' },
                { id: 'interior', label: 'Interior Design & Modular Masterpieces' },
                { id: 'renovation', label: 'Complete Luxury Renovations' },
                { id: 'civil', label: 'Civil & Engineering Infrastructure' }
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  id={`srv-tab-${tab.id}`}
                  onClick={() => {
                    trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: `Switched Services Tab to: ${tab.label}` });
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-outfit uppercase tracking-widest transition-all duration-300 border cursor-pointer ${
                    activeTab === tab.id 
                    ? 'bg-gold-500 text-black border-gold-400 font-medium font-semibold' 
                    : 'bg-black/40 text-gray-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 18 Services Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => (
              <div 
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative bg-dark-mate p-8 rounded-2xl border border-neutral-800 hover:border-gold-500/30 transition-all duration-500 flex flex-col justify-between gold-glow-hover"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-dark-charcoal rounded-xl border border-neutral-800 group-hover:border-gold-500/20 group-hover:bg-gold-950/20 transition-all">
                      <ServiceIcon name={service.iconName} className="w-6 h-6 text-gold-400" />
                    </div>
                    <span className="text-xs font-mono text-neutral-600 font-medium">0{idx + 1}</span>
                  </div>

                  <h4 className="text-lg font-display font-medium text-white mb-3 group-hover:text-gold-200 transition-colors">
                    {service.title}
                  </h4>

                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-neutral-900/60 pt-4">
                    {service.features.map(feat => (
                      <li key={feat} className="flex items-center gap-2 text-[11px] text-gray-300">
                        <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: `Clicked 'Custom Consultant Plan' for service: ${service.title}` });
                      openModal('site-visit', service.title);
                    }}
                    className="w-full text-center py-2.5 rounded-lg border border-neutral-800 hover:border-gold-500/25 text-xs text-gray-400 hover:text-white font-outfit uppercase tracking-widest transition-all hover:bg-gold-950/10 cursor-pointer"
                  >
                    Custom Consultant Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section id="why-choose-us" className="py-24 bg-dark-mate relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-outfit text-gold-400 font-medium">The Zaynova Commitment</span>
            <h3 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
              Why Discerning Clients Choose ZAYNOVA
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              We stand apart through radical transparency, high engineering specifications, and hand-delivered luxury endings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US_POINTS.map((point, idx) => (
              <div 
                key={point.title}
                id={`why-choose-us-tile-${idx}`}
                className="p-8 bg-dark-charcoal border border-neutral-800/80 rounded-2xl hover:border-gold-500/10 transition-all group hover:bg-neutral-900"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-mono text-neutral-700 font-semibold group-hover:text-gold-500 transition-colors">
                    0{idx + 1}
                  </span>
                  <div className="h-[1px] w-6 bg-gold-500/40"></div>
                  <h4 className="text-md font-display font-medium text-white tracking-wide">
                    {point.title}
                  </h4>
                </div>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------- OUR PROCESS (TIMELINE) ---------------- */}
      <section id="process" className="py-24 bg-dark-charcoal border-y border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-outfit text-gold-400 font-medium">Flat Workflow Mechanics</span>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Our Professional Process
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Every millimeter of execution coordinate obeys a rigorous, milestone-driven pathway to flawless delivery.
            </p>
          </div>

          {/* Interactive Steps Grid-Timeline */}
          <div className="relative">
            {/* Center connector line (Desktop only) */}
            <div className="absolute top-[4.5rem] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-gold-900/30 via-gold-500/20 to-gold-900/30 hidden xl:block z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 relative z-10">
              {PROCESS_STEPS.map((step) => (
                <div 
                  key={step.stepNumber}
                  id={`process-step-${step.stepNumber}`}
                  className="group flex flex-col items-center text-center p-6 bg-dark-mate border border-neutral-800/60 rounded-2xl hover:border-gold-500/20 transition-all duration-300"
                >
                  {/* Step Code circular bubble */}
                  <div className="w-12 h-12 rounded-full bg-dark-charcoal border border-neutral-800 group-hover:border-gold-400 flex items-center justify-center text-xs font-mono text-gold-400 font-bold mb-4 shadow-md transition-all group-hover:bg-gold-950/20">
                    {step.stepNumber}
                  </div>

                  <h4 className="text-sm font-display font-medium text-white mb-2 uppercase tracking-wider">
                    {step.title}
                  </h4>

                  <p className="text-[11px] text-gray-400 leading-normal font-light">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12 bg-neutral-950/40 p-4 rounded-xl border border-neutral-800 inline-block mx-auto max-w-full">
            <p className="text-xs text-gray-400">
              ⚡ Site visits and expert measurements are 100% complimentary.{' '}
              <button 
                type="button"
                onClick={() => openModal('site-visit')}
                className="text-gold-400 underline font-medium hover:text-gold-200 cursor-pointer"
              >
                Register Your Coordinates Now &rarr;
              </button>
            </p>
          </div>
        </div>
      </section>


      {/* ---------------- PROJECT SHOWCASE ---------------- */}
      <section id="projects" className="py-24 bg-dark-mate relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] font-outfit text-gold-400 font-medium">Prestige Portfolio</span>
              <h3 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                Our Project Showcase
              </h3>
              <p className="text-gray-400 max-w-xl text-sm font-light">
                Explore real photographs from high-end duplex villas, customized premium kitchens, corporate fit-outs, and structural civil projects.
              </p>
            </div>

            {/* Portfolio Categories Filters Box */}
            <div className="flex flex-wrap gap-2 max-w-2xl">
              {portfolioCategories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  id={`portfolio-cat-${cat}`}
                  onClick={() => {
                    trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: `Filtered Showcase Portfolio by cat: ${cat}` });
                    setSelectedPortfolioCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-outfit uppercase tracking-wider transition-all cursor-pointer ${
                    selectedPortfolioCategory === cat
                    ? 'bg-gold-500 text-black font-semibold'
                    : 'bg-dark-charcoal text-gray-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {cat === 'all' ? 'All (8)' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid list of showcase items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id}
                id={`project-card-${proj.id}`}
                className="group bg-dark-charcoal rounded-xl overflow-hidden border border-neutral-800/80 hover:border-gold-500/25 transition-all duration-500"
              >
                {/* Visual Block */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover group-hover:scale-115 transition-all duration-700 opacity-85"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-gold-900/30 px-2.5 py-1 rounded text-[9px] font-outfit uppercase tracking-widest text-gold-300">
                    {proj.category}
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-5 space-y-2">
                  <div className="text-[10px] uppercase font-mono text-gray-500 tracking-wider">
                    {proj.location}
                  </div>
                  <h4 className="text-white font-display text-sm font-medium tracking-wide group-hover:text-gold-200 transition-colors">
                    {proj.title}
                  </h4>
                  <div className="flex justify-between items-center text-[11px] text-gray-400 pt-3 border-t border-neutral-900">
                    <span>{proj.size}</span>
                    <span className="text-gold-400">{proj.scope}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------- BEFORE & AFTER COMPARISON SECTION ---------------- */}
      <section className="py-24 bg-dark-charcoal border-y border-neutral-900 relative">
        <BeforeAfterSlider />
      </section>


      {/* ---------------- GALLERY SECTION (MASONRY) ---------------- */}
      <section id="gallery" className="py-24 bg-dark-mate relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-outfit text-gold-400 font-medium">Bespoke Catalogues</span>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Luxury Masonry Gallery
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Sift through our customized luxury project segments capturing elite craftsmanship finishes. Click images to expand.
            </p>

            {/* Gallery Filters */}
            <div className="flex justify-center flex-wrap gap-2 pt-6">
              {['All', 'Residential', 'Commercial', 'Interiors', 'Renovation', 'Civil Works'].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  id={`gallery-filter-${cat}`}
                  onClick={() => {
                    trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: `Filtered Luxury Masonry Gallery category: ${cat}` });
                    setGalleryFilter(cat);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-outfit uppercase tracking-wider transition-all cursor-pointer ${
                    galleryFilter === cat
                    ? 'bg-gold-500 text-black font-semibold'
                    : 'bg-dark-charcoal text-gray-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id}
                id={`gallery-item-${item.id}`}
                onClick={() => {
                  trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: `Expanded image Lightbox for: ${item.tag} (${item.category} catalogue)` });
                  setLightboxImage(item.image);
                }}
                className="break-inside-avoid relative rounded-xl overflow-hidden border border-neutral-800 group cursor-zoom-in gold-glow-hover transition-all"
              >
                <img 
                  src={item.image} 
                  alt={item.tag} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.85] hover:brightness-[0.95]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Smooth Hover Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase text-gold-300 font-outfit tracking-widest mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-white font-display text-sm uppercase tracking-wider">
                    {item.tag}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-1">ZAYNOVA Certified Premium finish</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ---------------- CLIENT TESTIMONIALS ---------------- */}
      <section className="py-24 bg-dark-charcoal border-y border-neutral-900 relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] font-outfit text-gold-400 font-medium">Verifiable Client Feedback</span>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight mt-2">
              Our Client Testimonials
            </h3>
          </div>

          <div id="testimonial-carousel" className="relative p-8 md:p-12 bg-dark-mate rounded-3xl border border-neutral-800 shadow-2xl gold-glow text-center">
            {/* Elegant massive gold decorative citation quote mark */}
            <div className="absolute top-4 left-6 text-7xl font-serif text-gold-900/30 select-none">“</div>
            
            <div className="space-y-6">
              {/* Star Rating */}
              <div className="flex justify-center gap-1">
                {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>

              <blockquote className="text-gray-300 text-base md:text-xl font-light italic leading-relaxed max-w-2xl mx-auto">
                "{TESTIMONIALS[currentTestimonial].review}"
              </blockquote>

              <div>
                <cite className="not-italic text-white font-display font-medium block text-base uppercase tracking-wider">
                  {TESTIMONIALS[currentTestimonial].name}
                </cite>
                <span className="text-xs text-gold-400 font-outfit uppercase tracking-widest mt-1 block">
                  {TESTIMONIALS[currentTestimonial].projectType}
                </span>
              </div>
            </div>

            {/* Slider Switch controls */}
            <div className="flex justify-center gap-4 mt-8">
              <button 
                type="button"
                id="testimonial-prev-btn"
                onClick={carouselPrev}
                className="p-2.5 rounded-full border border-neutral-800 hover:border-gold-500/30 text-gray-400 hover:text-white bg-black/40 transition-all cursor-pointer"
                title="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                type="button"
                id="testimonial-next-btn"
                onClick={carouselNext}
                className="p-2.5 rounded-full border border-neutral-800 hover:border-gold-500/30 text-gray-400 hover:text-white bg-black/40 transition-all cursor-pointer"
                title="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ---------------- STATISTICS SECTION ---------------- */}
      <section className="py-16 bg-dark-mate relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div 
                key={stat.label}
                id={`stat-display-${idx}`}
                className="text-center space-y-2 p-6 bg-dark-charcoal/50 border border-neutral-800/40 rounded-2xl"
              >
                <div className="text-4xl md:text-5xl font-display font-medium text-gold-400 flex items-center justify-center font-mono">
                  <span>{stat.value}</span>
                  <span className="text-gold-300 ml-1">{stat.suffix}</span>
                </div>
                <div className="text-xs font-outfit uppercase tracking-widest text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
              ✓ All metrics represent genuine supervised work orders, completed consulting contracts, and verified on-site structures.
            </span>
          </div>
        </div>
      </section>


      {/* ---------------- FAQ SECTION ---------------- */}
      <section id="faq" className="py-24 bg-dark-charcoal border-y border-neutral-900 relative">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-outfit text-gold-400 font-medium">Resolving Inquiries</span>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Discover detailed specifications about our project timelines, turnkey services, and cost methodologies.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = activeFAQId === faq.id;
              return (
                <div 
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="bg-dark-mate rounded-2xl border border-neutral-800 overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!isOpen) {
                        trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: `Expanded FAQ: "${faq.question}"` });
                      }
                      setActiveFAQId(isOpen ? null : faq.id);
                    }}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 text-white hover:text-gold-200 transition-colors"
                  >
                    <span className="font-display font-medium text-sm md:text-base leading-relaxed">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-neutral-900 border border-neutral-800 text-gold-400 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-[300px] border-t border-neutral-900/60' : 'max-h-0'
                    }`}
                  >
                    <div className="p-6 text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ---------------- DEEPLINK CTA CONVERSION SECTION ---------------- */}
      <section className="py-24 bg-gradient-to-b from-dark-mate to-black relative">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-950/40 border border-gold-800/40 rounded-full text-xs text-gold-300 font-outfit uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Architectural Precision Guaranteed
          </div>

          <h2 className="text-3xl md:text-6xl font-display font-medium text-white tracking-tight">
            Ready To Transform <br />
            <span className="gold-gradient-text italic font-normal font-serif">Your Space?</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
            Let ZAYNOVA bringing your structural vision to life with complete interior blueprints, modular wardrobes, and elite civil modifications. Consultations are complimentary on-site.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 max-w-2xl mx-auto">
            {/* Lead buttons */}
            <button 
              type="button"
              id="cta-request-quotation"
              onClick={() => {
                trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Lower Section - Request Quotation' });
                openModal('quotation');
              }}
              className="px-6 py-4 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:scale-[1.03] text-white font-outfit uppercase tracking-widest text-xs font-semibold rounded-xl shadow-lg transition-all cursor-pointer gold-shadow"
            >
              Request Quotation
            </button>
            <button 
              type="button"
              id="cta-book-site-visit"
              onClick={() => {
                trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Lower Section - Book Free Site Visit' });
                openModal('site-visit');
              }}
              className="px-6 py-4 border border-gold-500/30 hover:border-gold-300 bg-gold-950/10 text-gold-300 hover:text-white font-outfit uppercase tracking-widest text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              Book Free Site Visit
            </button>
            <a 
              href="tel:+918750083150"
              id="cta-call-direct"
              onClick={() => {
                trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Direct Phone Hub - Call Now (+918750083150)' });
              }}
              className="px-6 py-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white font-outfit uppercase tracking-widest text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              Call Now
            </a>
            <a 
              href="https://wa.me/918750083150?text=Hello%20ZAYNOVA!%20I'd%20like%20to%20discuss%20a%20new%20interior%20renovation%20project." 
              target="_blank"
              rel="noreferrer"
              id="cta-whatsapp-direct"
              onClick={() => {
                trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked WhatsApp Hotlink - WhatsApp Us (+918750083150)' });
              }}
              className="px-6 py-4 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-800/40 hover:border-emerald-500/50 text-emerald-300 font-outfit uppercase tracking-widest text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>


      {/* ---------------- CONTACT & FORM SECTION ---------------- */}
      <section id="contact" className="py-24 bg-dark-charcoal border-y border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Details & Maps Box */}
            <div className="space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.3em] font-outfit text-gold-400 font-medium">Global Headquarters</span>
                <ZaynovaLogo textClass="text-2xl md:text-3xl" />
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                  Specializing in complete residential, commercial and office interior solutions, renovation services, civil works, modular furniture, painting, tiles and premium plumbing.
                </p>

                <div className="space-y-4 pt-4 border-t border-neutral-900">
                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-lg bg-dark-mate border border-neutral-800 text-gold-400 mt-1">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-white font-outfit text-sm font-medium uppercase tracking-wider">Office Coordinates</h5>
                      <p className="text-xs text-gray-400 mt-1">Plot No. A-42, Sector-2, Noida, Gautam Buddha Nagar, Uttar Pradesh - 201301</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-lg bg-dark-mate border border-neutral-800 text-gold-400 mt-1">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-white font-outfit text-sm font-medium uppercase tracking-wider">Communications Desk</h5>
                      <p className="text-xs text-gray-400 mt-1">
                        <a href="tel:+918750083150" className="hover:text-gold-300 transition-colors">+91 87500 83150</a> (Click to Call)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-lg bg-dark-mate border border-neutral-800 text-gold-400 mt-1">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-white font-outfit text-sm font-medium uppercase tracking-wider">Secure Email Address</h5>
                      <p className="text-xs text-gray-400 mt-1">
                        <a href="mailto:kabirhussain7700@gmail.com" className="hover:text-gold-300 transition-colors">kabirhussain7700@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breathtaking Dark Premium Google Maps Mockup */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-850 h-[220px] bg-neutral-950/40 p-4 shrink-0 flex flex-col justify-end">
                {/* Abstract grid representation resembling high-tech maps coordinates */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,146,57,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,146,57,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0"></div>
                <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gold-500/10 rounded-full filter blur-3xl"></div>
                
                {/* Simulated luxury coordinates road map layout */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 200" fill="none">
                  <path d="M10 50 H390 M100 10 V190 M250 10 V190 M50 100 L350 100" stroke="#c59239" strokeWidth="1" />
                  <circle cx="250" cy="100" r="15" fill="#c59239" fillOpacity="0.3" stroke="#c59239" strokeWidth="2" />
                </svg>

                <div className="relative z-10 p-4 bg-black/85 backdrop-blur-md rounded-xl border border-gold-900/40 flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-xs text-gold-300 font-mono tracking-widest uppercase">GPS Live Position</div>
                    <div className="text-white text-xs">Zaynova Sector-2 HQ, Noida</div>
                  </div>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-3 py-1.5 bg-gold-900/30 text-gold-300 hover:text-white border border-gold-500/30 rounded text-[10px] font-mono tracking-wider transition-all"
                  >
                    Open Earth Maps &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Leads Capture Form Box */}
            <div id="contact-form-block" className="p-8 md:p-10 bg-dark-mate rounded-3xl border border-neutral-850 gold-glow relative overflow-hidden">
              <h4 className="text-2xl font-display font-medium text-white mb-2 tracking-wide">
                Submit An Inquiry
              </h4>
              <p className="text-xs text-gold-400 font-outfit uppercase tracking-widest mb-8">
                Connect With Our Estimator Cell
              </p>

              {contactSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-12 h-12 rounded-full bg-gold-950/20 border border-gold-500/40 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 text-gold-400" />
                  </div>
                  <h5 className="text-white text-xl font-display font-medium">Dialogue Initiated Successfully</h5>
                  <p className="text-gray-400 text-xs leading-relaxed max-w-sm mx-auto">
                    Your records matching <span className="text-gold-300 font-medium">{contactType}</span> have been locked. An administrator will call your number instantly.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button 
                      type="button"
                      onClick={handleWAInquiry}
                      className="px-4 py-2.5 bg-emerald-900/30 border border-emerald-700/30 text-emerald-300 rounded-lg text-xs"
                    >
                      Instant WhatsApp Routing
                    </button>
                    <button 
                      type="button"
                      onClick={() => setContactSuccess(false)}
                      className="text-gray-500 hover:text-white text-[11px] underline"
                    >
                      Reset Form Fields
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-outfit tracking-wider text-gray-400 mb-1" htmlFor="contact-field-name">Your Customer Name *</label>
                    <input 
                      id="contact-field-name"
                      type="text" 
                      required 
                      placeholder="E.g., Devendra Singh"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-gold-500 rounded-xl py-3 px-4 text-white text-xs outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-outfit tracking-wider text-gray-400 mb-1" htmlFor="contact-field-phone">Phone Number / Mobile *</label>
                    <input 
                      id="contact-field-phone"
                      type="tel" 
                      required 
                      placeholder="E.g., +91 87500 83150"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-gold-500 rounded-xl py-3 px-4 text-white text-xs outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-outfit tracking-wider text-gray-400 mb-1" htmlFor="contact-field-email">Email Address</label>
                    <input 
                      id="contact-field-email"
                      type="email" 
                      placeholder="E.g., devendra@mansion.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-gold-500 rounded-xl py-3 px-4 text-white text-xs outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-outfit tracking-wider text-gray-400 mb-1" htmlFor="contact-field-project">Select Project Category *</label>
                    <select 
                      id="contact-field-project"
                      value={contactType}
                      onChange={(e) => setContactType(e.target.value)}
                      className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-gold-500 rounded-xl py-3 px-4 text-white text-xs outline-none transition-all"
                    >
                      <option value="Residential Interiors">Residential Interiors</option>
                      <option value="Modular Kitchen Concept">Modular Kitchens</option>
                      <option value="Complete Home Renovation">Home Renovation</option>
                      <option value="Executive Office Renovation">Office Renovation</option>
                      <option value="Structural Civil Works">Civil Works</option>
                      <option value="Custom Modular Wardrobes">Modular Wardrobes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-outfit tracking-wider text-gray-400 mb-1" htmlFor="contact-field-msg">Bespoke Project Description *</label>
                    <textarea 
                      id="contact-field-msg"
                      rows={3} 
                      placeholder="Briefly state your spatial size, configuration requirements, and material budgets..."
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-gold-500 rounded-xl p-4 text-white text-xs outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button 
                      type="submit"
                      id="contact-submit-inquiry"
                      disabled={contactSubmitting}
                      className="flex-1 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:gold-gradient-bg text-white py-3 px-6 rounded-xl font-outfit uppercase tracking-widest text-xs font-semibold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {contactSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Inquiry
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      id="contact-whatsapp-direct"
                      onClick={handleWAInquiry}
                      className="border border-emerald-900 bg-emerald-950/15 hover:bg-emerald-950/40 text-emerald-400 rounded-xl font-outfit uppercase tracking-widest text-xs font-semibold py-3 px-4 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                      WhatsApp Direct
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-black py-16 border-t border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left box Logo */}
            <div className="md:col-span-4 space-y-4">
              <ZaynovaLogo />
              <p className="text-gray-500 text-xs max-w-sm leading-relaxed mt-4">
                Specializing in ultra-premium residential and commercial turnkey transformations, civil engineering, modular systems, and rigorous design curation.
              </p>
              <div className="text-neutral-600 text-[11px] font-mono">
                REG No. LUX-88402/ZAYN
              </div>
            </div>

            {/* Mid Quick Links */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-white text-xs uppercase tracking-widest font-outfit font-medium mb-4 pb-2 border-b border-neutral-900 inline-block">
                  Site Map
                </h5>
                <ul className="space-y-2.5 text-xs text-gray-500">
                  <li><a href="#home" className="hover:text-gold-300 transition-colors">Home Landing</a></li>
                  <li><a href="#about" className="hover:text-gold-300 transition-colors">About Story</a></li>
                  <li><a href="#services" className="hover:text-gold-300 transition-colors">Premium Grid</a></li>
                  <li><a href="#projects" className="hover:text-gold-300 transition-colors">Portfolio</a></li>
                </ul>
              </div>

              <div>
                <h5 className="text-white text-xs uppercase tracking-widest font-outfit font-medium mb-4 pb-2 border-b border-neutral-900 inline-block">
                  Support Cells
                </h5>
                <ul className="space-y-2.5 text-xs text-gray-500">
                  <li><a href="#process" className="hover:text-gold-300 transition-colors">Work Timeline</a></li>
                  <li><a href="#gallery" className="hover:text-gold-300 transition-colors">Interior Gallery</a></li>
                  <li><a href="#faq" className="hover:text-gold-300 transition-colors">FAQ Bureau</a></li>
                  <li><a href="#contact" className="hover:text-gold-300 transition-colors">Concierge Desk</a></li>
                </ul>
              </div>
            </div>

            {/* Right Socials & Contact highlights */}
            <div className="md:col-span-4 space-y-4">
              <h5 className="text-white text-xs uppercase tracking-widest font-outfit font-medium">
                Follow ZAYNOVA Standard
              </h5>
              <div className="flex gap-3 pt-2">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  id="instagram-social"
                  className="w-10 h-10 rounded-lg bg-dark-charcoal border border-neutral-850 text-gray-400 hover:text-gold-400 flex items-center justify-center transition-all"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  id="facebook-social"
                  className="w-10 h-10 rounded-lg bg-dark-charcoal border border-neutral-850 text-gray-400 hover:text-gold-400 flex items-center justify-center transition-all"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/918750083150" 
                  target="_blank" 
                  rel="noreferrer"
                  id="whatsapp-social"
                  className="w-10 h-10 rounded-lg bg-dark-charcoal border border-neutral-850 text-gray-400 hover:text-gold-400 flex items-center justify-center transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                </a>
              </div>
              <div className="text-[10px] text-gray-600 leading-normal">
                WhatsApp: +91 87500 83150 <br />
                Mon - Sat: 9:00 AM - 7:30 PM (IST)
              </div>
            </div>
          </div>

          {/* Extreme bottom copyright bounds */}
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-neutral-600">
              &copy; 2026 ZAYNOVA. Architectural & Civil Systems. All Rights Reserved.
            </span>
            <div className="flex gap-4 text-[10px] text-neutral-600 font-outfit">
              <a href="#about" className="hover:text-gold-500">Corporate Transparency Policy</a>
              <a href="#process" className="hover:text-gold-500">120-Point Inspection Charter</a>
              <button 
                type="button" 
                onClick={() => setIsAdminOpen(true)} 
                className="hover:text-gold-300 transition-colors cursor-pointer text-left uppercase text-[9px] tracking-widest font-mono text-neutral-500 hover:underline"
              >
                [ Admin Panel ]
              </button>
            </div>
          </div>
        </div>
      </footer>


      {/* ---------------- CONVERSION FLOATING DRAWER CONTROLS ---------------- */}
      {/* Absolute floating quick communication lines */}
      <div id="floating-communication-bar" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Floating Quick WhatsApp */}
        <a 
          href="https://wa.me/918750083150?text=Hello%20ZAYNOVA!%20I%20would%20like%20to%20receive%20a%20luxury%20design%20catalogue."
          target="_blank"
          rel="noreferrer"
          id="floating-wa-link"
          onClick={() => {
            trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Floating Quick action - WhatsApp Us' });
          }}
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 hover:scale-110 text-white flex items-center justify-center shadow-xl transition-all relative group"
          title="WhatsApp Us"
        >
          {/* Notification ping ripple badge */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border border-dark-mate flex items-center justify-center text-[8px] font-mono font-bold text-white">1</span>
          
          <WhatsAppIcon className="w-6 h-6 text-white fill-white" />
          <span className="absolute right-14 bg-black/85 backdrop-blur border border-emerald-500/30 text-emerald-300 text-[10px] font-outfit uppercase tracking-wider py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </a>

        {/* Floating Quick Consultation click to Call */}
        <a 
          href="tel:+918750083150"
          id="floating-call-link"
          onClick={() => {
            trackEvent({ eventType: 'BUTTON_CLICK', eventDetail: 'Clicked Floating Quick action - Call Concierge Direct' });
          }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 hover:scale-110 text-white flex items-center justify-center shadow-xl transition-all relative group gold-shadow"
          title="Direct Call Desk"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-14 bg-black/85 backdrop-blur border border-gold-500/30 text-gold-300 text-[10px] font-outfit uppercase tracking-wider py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md pointer-events-none whitespace-nowrap">
            Call Concierge
          </span>
        </a>
      </div>


      {/* ---------------- LIGHTBOX MODAL ---------------- */}
      {lightboxImage && (
        <div 
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            type="button"
            className="absolute top-6 right-6 text-gray-400 hover:text-white p-2"
            title="Close image preview"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[85vh]">
            <img 
              src={lightboxImage} 
              alt="Expanded Preview" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-neutral-800"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}


      {/* ---------------- MODIFIED LEAD FORM DIALOG MODAL ---------------- */}
      <LeadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={modalType}
        selectedServiceTitle={selectedService}
      />

      {/* ---------------- BESPOKE ADMINISTRATIVE AUDIT CONSOLE ---------------- */}
      <AdminDashboard 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}

// Simple custom inline SVG icon for Instagram
function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

// Simple custom inline SVG icon for Facebook
function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

// Simple custom inline SVG icon for WhatsApp
function WhatsAppIcon({ className = "w-4 h-4 fill-current" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
