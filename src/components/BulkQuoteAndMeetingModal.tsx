import { FormEvent, useEffect, useState } from 'react';
import { Calendar, Check, FileSpreadsheet, Send, X } from 'lucide-react';
import { TranslationBundle } from '../i18n/translations';
import { LanguageCode } from '../types';
import { notifyPartnerLead, trackEvent } from '../utils/analytics';

interface BulkQuoteAndMeetingModalProps {
  isOpen: boolean;
  initialTab: 'quote' | 'meeting';
  preselectedProduct?: string;
  lang: LanguageCode;
  t: TranslationBundle;
  onClose: () => void;
}

const BUSINESS_PROFILES = [
  'Regional Importer / Distributor',
  'Hardware & Agri Dealer / Retail Chain',
  'OEM / Private Label Brand Partner',
  'Commercial Forestry / Agro Contractor',
  'Institutional / Project Procurement',
];

const MEETING_TOPICS = [
  'Authorized Dealership & Territory',
  'Product Line & Model Walkthrough',
  'OEM / Private Label Partnership',
  'CE / Euro-V Compliance & Manuals',
  'Spare Parts Program & After-Sales',
];

export default function BulkQuoteAndMeetingModal({
  isOpen,
  initialTab,
  preselectedProduct = '',
  lang,
  t,
  onClose,
}: BulkQuoteAndMeetingModalProps) {
  const [activeTab, setActiveTab] = useState<'quote' | 'meeting'>(initialTab);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productInterest, setProductInterest] = useState(
    preselectedProduct || 'Brush Cutters, Chainsaws & Agro Tillers'
  );
  const [businessRole, setBusinessRole] = useState(BUSINESS_PROFILES[0]);
  const [targetCity, setTargetCity] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('10:00 AM CET (Europe / Africa)');
  const [meetingTopic, setMeetingTopic] = useState(MEETING_TOPICS[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
    setIsSubmitted(false);
    if (preselectedProduct) {
      setProductInterest(preselectedProduct);
    }
  }, [initialTab, preselectedProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !country || !phone || !email) return;
    setIsSubmitting(true);

    try {
      const current = parseInt(localStorage.getItem('zaynova_inquiry_counter') || '1', 10) || 1;
      localStorage.setItem('zaynova_inquiry_counter', String(current + 1));
      const inquiryNum = String(current).padStart(4, '0');

      const isMeeting = activeTab === 'meeting';

      await Promise.all([
        trackEvent({
          eventType: isMeeting ? 'MEETING_BOOKING' : 'BULK_QUOTE_SUBMIT',
          eventDetail: isMeeting
            ? `Booked Dealer Meeting: ${meetingTopic} (${country})`
            : `Dealer Query: ${productInterest} (${businessRole} - ${country})`,
          language: lang,
          optionTag: isMeeting
            ? `Meeting:${country}:${meetingTopic}`
            : `Lead:${country}:${businessRole}`,
          clientName: contactName,
          companyName: companyName || 'Independent Dealer',
          country,
          clientPhone: phone,
          clientEmail: email,
          projectType: productInterest,
          orderVolume: isMeeting ? meetingTopic : businessRole,
          meetingDate: isMeeting ? meetingDate : undefined,
          meetingTime: isMeeting ? meetingTime : undefined,
          inquiryNum,
          message:
            `${targetCity ? `Territory: ${targetCity}. ` : ''}${notes}`.trim() ||
            'Direct dealer follow-up requested',
        }),
        notifyPartnerLead({
          inquiryType: isMeeting
            ? 'Distributor Video Consultation Booking'
            : 'Importer & Distributor Partnership Modal',
          inquiryNum,
          companyName: companyName || 'Independent Dealer',
          contactName,
          country,
          phone,
          email,
          preferredDivisions: productInterest,
          partnershipRole: isMeeting ? meetingTopic : businessRole,
          targetCity,
          meetingDate: isMeeting ? meetingDate : '',
          meetingTime: isMeeting ? meetingTime : '',
          meetingTopic: isMeeting ? meetingTopic : '',
          language: lang,
          notes: notes || 'Direct dealer follow-up requested',
        }),
      ]);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      dir={t.dir}
    >
      <div className="bg-white border border-[#E1E4E8] rounded-xl w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Top Segmented Tabs + Close */}
        <div className="flex items-center border-b border-[#E1E4E8] bg-[#F8F9FA]">
          <button
            type="button"
            onClick={() => {
              setActiveTab('quote');
              setIsSubmitted(false);
            }}
            className={`flex-1 py-3.5 px-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'quote'
                ? 'bg-white text-[#111417] border-b-2 border-[#4D9E00]'
                : 'text-[#525B66] hover:text-[#111417]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#387500]" />
            <span>{t.modals.tabQuote}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('meeting');
              setIsSubmitted(false);
            }}
            className={`flex-1 py-3.5 px-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'meeting'
                ? 'bg-white text-[#111417] border-b-2 border-[#4D9E00]'
                : 'text-[#525B66] hover:text-[#111417]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#387500]" />
            <span>{t.modals.tabMeeting}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3.5 text-[#525B66] hover:text-[#111417] border-s border-[#E1E4E8] cursor-pointer"
            aria-label={t.modals.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 md:p-10 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#111417]">
              {t.modals.successTitle}
            </h3>
            <p className="text-sm text-[#525B66] max-w-md mx-auto leading-relaxed">
              {t.modals.successBody}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-[#111417] text-sm font-semibold text-white hover:bg-[#1C2024] cursor-pointer"
              >
                {t.modals.close}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-7 space-y-4 overflow-y-auto">
            <div className="px-3.5 py-2.5 rounded-lg bg-[#F8F9FA] border border-[#E1E4E8] text-xs text-[#525B66]">
              {t.modals.followupNotice}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#111417] mb-1">
                  {t.modals.companyName}
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. AgroDistributors Ltd / Hardware Co."
                  className="w-full rounded-lg border border-[#E1E4E8] px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111417] mb-1">
                  {t.modals.contactName} *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full rounded-lg border border-[#E1E4E8] px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#111417] mb-1">
                  {t.modals.email} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="director@company.com"
                  className="w-full rounded-lg border border-[#E1E4E8] px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111417] mb-1">
                  {t.modals.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+49 / +55 / +971 / +91..."
                  className="w-full rounded-lg border border-[#E1E4E8] px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#111417] mb-1">
                  {t.modals.country} *
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Germany, Brazil, UAE, India, Spain..."
                  className="w-full rounded-lg border border-[#E1E4E8] px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111417] mb-1">
                  {t.modals.productInterest}
                </label>
                <input
                  type="text"
                  value={productInterest}
                  onChange={(e) => setProductInterest(e.target.value)}
                  className="w-full rounded-lg border border-[#E1E4E8] px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                />
              </div>
            </div>

            {activeTab === 'quote' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#111417] mb-1">
                    {t.modals.businessRole}
                  </label>
                  <select
                    value={businessRole}
                    onChange={(e) => setBusinessRole(e.target.value)}
                    className="w-full rounded-lg border border-[#E1E4E8] px-3.5 py-2.5 text-sm text-[#111417] bg-white focus:outline-none focus:border-[#4D9E00]"
                  >
                    {BUSINESS_PROFILES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111417] mb-1">
                    {t.modals.targetCity}
                  </label>
                  <input
                    type="text"
                    value={targetCity}
                    onChange={(e) => setTargetCity(e.target.value)}
                    placeholder="City / State / Distribution Zone"
                    className="w-full rounded-lg border border-[#E1E4E8] px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-[#F8F9FA] border border-[#E1E4E8]">
                <div>
                  <label className="block text-xs font-medium text-[#111417] mb-1">
                    {t.modals.meetingDate} *
                  </label>
                  <input
                    type="date"
                    required
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3 py-2 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111417] mb-1">
                    {t.modals.meetingTime}
                  </label>
                  <select
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3 py-2 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                  >
                    <option value="10:00 AM CET (Europe / Africa)">10:00 AM CET</option>
                    <option value="11:30 AM GST (Middle East)">11:30 AM GST</option>
                    <option value="02:00 PM BRT (Brazil / LATAM)">02:00 PM BRT</option>
                    <option value="04:00 PM EST (North America)">04:00 PM EST</option>
                    <option value="03:00 PM IST (Asia-Pacific)">03:00 PM IST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111417] mb-1">
                    {t.modals.meetingTopic}
                  </label>
                  <select
                    value={meetingTopic}
                    onChange={(e) => setMeetingTopic(e.target.value)}
                    className="w-full rounded-lg border border-[#E1E4E8] bg-white px-3 py-2 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00]"
                  >
                    {MEETING_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#111417] mb-1">
                {t.modals.notes}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us about your regional market, preferred product lines, or dealership inquiry..."
                className="w-full rounded-lg border border-[#E1E4E8] px-3.5 py-2.5 text-sm text-[#111417] focus:outline-none focus:border-[#4D9E00] resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E1E4E8]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#525B66] hover:text-[#111417] cursor-pointer"
              >
                {t.modals.close}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg bg-[#65C800] hover:bg-[#7BE300] text-[#111417] text-sm font-bold transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60 whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? t.modals.submitting
                    : activeTab === 'meeting'
                    ? t.modals.submitMeeting
                    : t.modals.submitQuote}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
