import { useState, FormEvent } from 'react';
import { X, Calendar, Calculator, Check, Phone, Mail, FileText, Send, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'site-visit' | 'quotation';
  selectedServiceTitle?: string;
}

export default function LeadModal({
  isOpen,
  onClose,
  initialType = 'site-visit',
  selectedServiceTitle = ''
}: LeadModalProps) {
  const [modalType, setModalType] = useState<'site-visit' | 'quotation'>(initialType);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(selectedServiceTitle || 'Residential Interiors');
  const [areaSize, setAreaSize] = useState<number>(1000); // in sqft for calculation
  const [qualityGrade, setQualityGrade] = useState<'Standard' | 'Luxury' | 'Ultra-Elite'>('Luxury');
  const [customMessage, setCustomMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Let's create an elegant real-time calculation formula for luxury estimates (strictly for client guidance and supreme trust)
  const calculateEstimate = () => {
    let ratePerSqFt = 900; // default standard interior
    if (projectType.toLowerCase().includes('kitchen')) {
      ratePerSqFt = 1800;
    } else if (projectType.toLowerCase().includes('civil') || projectType.toLowerCase().includes('structure')) {
      ratePerSqFt = 1500;
    } else if (projectType.toLowerCase().includes('office') || projectType.toLowerCase().includes('commercial')) {
      ratePerSqFt = 1200;
    } else if (projectType.toLowerCase().includes('bath')) {
      ratePerSqFt = 2000;
    }

    if (qualityGrade === 'Luxury') {
      ratePerSqFt *= 1.4;
    } else if (qualityGrade === 'Ultra-Elite') {
      ratePerSqFt *= 2.1;
    }

    const value = areaSize * ratePerSqFt;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    setIsSubmitting(true);

    try {
      // Get next inquiry number dynamically
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

      // Send real email via formsubmit.co. No complex server keys required, works completely dynamically
      const payload = {
        _subject: `Zaynova Inquiry #${inquiryNum} | Lead: ${name} (${modalType === 'site-visit' ? 'Site Visit' : 'Estimate Inquiry'})`,
        _template: "box",
        "INQUIRY NUMBER": `#${inquiryNum}`,
        "CLIENT NAME": name,
        "CONTACT MOBILE": phone,
        "EMAIL ADDRESS": email || 'N/A',
        "INQUIRY NATURE": modalType === 'site-visit' ? 'Free Site Visit Consultation' : 'Instant Luxury Cost Estimate',
        "PROJECT STREAM": projectType,
        "ESTIMATED AREA (SQFT)": modalType === 'quotation' ? `${areaSize} Sq. Ft.` : 'N/A',
        "FINISHING TIER": modalType === 'quotation' ? qualityGrade : 'N/A',
        "CALCULATED BUDGET": modalType === 'quotation' ? calculateEstimate() : 'N/A',
        "BESPOKE MESSAGE": customMessage || 'No specific requirements message provided.',
        "SUBMISSION TIMELINE": new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' (IST)'
      };

      // Simultaneously track lead submission in Google Sheets via our tracker
      trackEvent({
        eventType: 'FORM_SUBMISSION',
        eventDetail: modalType === 'site-visit' ? 'Secure Site Visit Modal Form' : 'Instant Luxury Estimate Modal Form',
        clientName: name,
        clientPhone: phone,
        clientEmail: email || 'N/A',
        projectType: projectType,
        inquiryNum: inquiryNum,
        estimatedAreaSqFt: modalType === 'quotation' ? `${areaSize} Sq. Ft.` : 'N/A',
        qualityGrade: modalType === 'quotation' ? qualityGrade : 'N/A',
        calculatedBudget: modalType === 'quotation' ? calculateEstimate() : 'N/A',
        message: customMessage || 'No specific requirements message provided.'
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
        console.error('Failed to submit form to email server.', response.statusText);
      }
    } catch (err) {
      console.error('Form submission network error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleWhatsAppRedirect = () => {
    trackEvent({
      eventType: 'BUTTON_CLICK',
      eventDetail: `Clicked 'Instantly ping via WhatsApp' inside Lead Modal (${modalType === 'site-visit' ? 'Site Visit' : 'Estimate'})`
    });
    const textMsg = `Hello ZAYNOVA! My name is ${name}. I would like to inquire about a ${qualityGrade} quality ${projectType} project of approx ${areaSize} Sq. Ft. Email: ${email}. Mobile: ${phone}. Msg: ${customMessage}`;
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/918750083150?text=${encoded}`, '_blank');
  };

  return (
    <div id="lead-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        id="lead-modal"
        className="relative w-full max-w-2xl bg-dark-charcoal border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl gold-glow animate-fade-in text-left"
      >
        {/* Header Tab Headers */}
        <div className="flex border-b border-neutral-800">
          <button 
            type="button"
            id="tab-site-visit"
            onClick={() => { setModalType('site-visit'); setIsSubmitted(false); }}
            className={`flex-1 py-4 text-center font-outfit text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${modalType === 'site-visit' ? 'bg-neutral-900 border-b-2 border-gold-500 text-gold-300 font-medium' : 'text-gray-400 hover:text-white bg-neutral-950/40'}`}
          >
            <Calendar className="w-4 h-4 text-gold-500" />
            Book Free Site Visit
          </button>
          <button 
            type="button"
            id="tab-quotation"
            onClick={() => { setModalType('quotation'); setIsSubmitted(false); }}
            className={`flex-1 py-4 text-center font-outfit text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${modalType === 'quotation' ? 'bg-neutral-900 border-b-2 border-gold-500 text-gold-300 font-medium' : 'text-gray-400 hover:text-white bg-neutral-950/40'}`}
          >
            <Calculator className="w-4 h-4 text-gold-500" />
            Instant Luxury Estimate
          </button>
          
          <button 
            id="close-modal-button"
            onClick={onClose}
            className="px-4 text-gray-500 hover:text-white border-l border-neutral-800 transition-colors"
            title="Close dialogue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-gold-950/40 border border-gold-500/40 flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-gold-400" />
            </div>
            <h4 className="text-2xl font-display font-medium text-white mb-3">Form Submitted Safely</h4>
            <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed mb-6">
              Thank you, <span className="text-gold-300 font-medium">{name}</span>. Our premium site engineer and project planners will review your request regarding <span className="text-white">{projectType}</span> and call you within 24 business hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
              <button 
                type="button"
                id="modal-success-wa"
                onClick={handleWhatsAppRedirect}
                className="flex items-center justify-center gap-2 bg-emerald-900/40 hover:bg-emerald-800/80 border border-emerald-500/30 text-emerald-300 py-3 px-5 rounded-xl font-outfit text-sm transition-all"
              >
                Send via WhatsApp Instead
              </button>
              <button 
                type="button"
                id="modal-success-close"
                onClick={onClose}
                className="bg-neutral-800 hover:bg-neutral-700 text-white py-3 px-5 rounded-xl font-outfit text-sm transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Context Notice */}
            <div className="flex gap-3 items-center bg-gold-950/20 border border-gold-800/20 p-4 rounded-xl">
              <Sparkles className="w-5 h-5 text-gold-500 shrink-0" />
              <p className="text-xs text-gold-200/95 leading-normal">
                {modalType === 'site-visit' 
                  ? 'Our senior site execution engineer will visit your location with laser telemetry, examine structural coordinates, and conduct material consultations completely free.'
                  : 'Adjust variables to generate an estimated luxury execution budget. Secure a locked proposal rate with a formal quotation inquiry.'}
              </p>
            </div>

            {/* Grid inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-outfit mb-1.5" htmlFor="field-name">Your Full Name *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                    <FileText className="w-4 h-4" />
                  </span>
                  <input 
                    id="field-name"
                    type="text" 
                    required 
                    placeholder="E.g., Siddharth Roy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-gold-500 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-outfit mb-1.5" htmlFor="field-phone">Phone Number *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input 
                    id="field-phone"
                    type="tel" 
                    required 
                    placeholder="E.g., +91 99999 99999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-gold-500 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-outfit mb-1.5" htmlFor="field-email">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    id="field-email"
                    type="email" 
                    placeholder="E.g., siddharth@luxury.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-gold-500 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-outfit mb-1.5" htmlFor="field-project">Project Stream / Service *</label>
                <select 
                  id="field-project"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-gold-500 rounded-xl py-3 px-4 text-white text-sm outline-none transition-all"
                >
                  <option value="Residential Interiors">Residential Interiors</option>
                  <option value="Modular Kitchen Concept">Modular Kitchens</option>
                  <option value="Complete Home Renovation">Home Renovation</option>
                  <option value="Executive Office Renovation">Office Renovation</option>
                  <option value="Structural Civil Works">Civil Works</option>
                  <option value="Custom Modular Wardrobes">Modular Wardrobes</option>
                  <option value="Bathroom & Spa Renovation">Bathroom Renovation</option>
                  <option value="Suspended POP False Ceilings">False Ceiling (POP)</option>
                  <option value="Bespoke Commercial Interior">Commercial Interior Solutions</option>
                </select>
              </div>
            </div>

            {/* Estimation Calculator Details (ONLY visible in estimation tab or customized) */}
            {modalType === 'quotation' && (
              <div className="space-y-4 p-5 bg-neutral-950/40 border border-neutral-800 rounded-2xl">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-900">
                  <span className="text-xs uppercase font-outfit tracking-wider text-gold-400 uppercase">Live Luxury Budget Calculator</span>
                  <div className="px-2 py-0.5 bg-gold-900/30 text-[10px] text-gold-200 border border-gold-800/40 rounded">Beta V2.1</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1" htmlFor="field-area">Estimated Super Area: <span className="text-white font-mono">{areaSize} Sq. Ft.</span></label>
                    <input 
                      id="field-area"
                      type="range"
                      min="200" 
                      max="10000" 
                      step="50"
                      value={areaSize} 
                      onChange={(e) => setAreaSize(parseInt(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                      <span>200 SqFt</span>
                      <span>5,000 SqFt</span>
                      <span>10,000 SqFt</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1.5" htmlFor="field-finish">Finishing Tier & Art Glass</label>
                    <div className="flex gap-2">
                      {['Standard', 'Luxury', 'Ultra-Elite'].map((grade) => (
                        <button
                          type="button"
                          id={`finish-btn-${grade}`}
                          key={grade}
                          onClick={() => setQualityGrade(grade as any)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-outfit border transition-all ${qualityGrade === grade ? 'bg-gold-900/30 border-gold-400 text-gold-300' : 'bg-neutral-950/50 border-neutral-800 text-gray-400 hover:text-white'}`}
                        >
                          {grade}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Estimate Result panel */}
                <div className="pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-neutral-900">
                  <div>
                    <div className="text-[10px] uppercase text-gray-500 tracking-wider font-outfit">Projected Material & Labor Budget</div>
                    <div className="text-lg md:text-xl font-mono text-gold-400 font-semibold">{calculateEstimate()}</div>
                  </div>
                  <div className="text-[10px] text-neutral-500 leading-normal max-w-xs">
                    *Estimates include soft-close hardware, 120-point inspections, and complete engineering reports.
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-outfit mb-1.5" htmlFor="field-msg">Bespoke Requirements / Project Details</label>
              <textarea 
                id="field-msg"
                rows={3}
                placeholder="Describe your site details, design vision, specific timelines, structural prerequisites..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-gold-500 rounded-xl p-4 text-white text-sm outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2">
              <button 
                type="button"
                id="modal-wa-direct-button"
                onClick={handleWhatsAppRedirect}
                className="px-4 py-2 border border-neutral-800 hover:border-emerald-600 hover:text-emerald-400 rounded-xl text-xs font-outfit text-gray-400 text-center transition-all cursor-pointer"
              >
                ⚡ Instantly ping via WhatsApp
              </button>

              <div className="flex gap-2">
                <button 
                  type="button"
                  id="modal-cancel-button"
                  onClick={onClose}
                  className="px-5 py-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="modal-submit-button"
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:gold-gradient-bg ${!isSubmitting ? 'hover:scale-[1.02]' : 'opacity-70 cursor-not-allowed'} text-white font-outfit font-medium text-sm px-6 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer gold-shadow`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {modalType === 'site-visit' ? 'Secure Site Visit' : 'Request Lock Quotation'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
