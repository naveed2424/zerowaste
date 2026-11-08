import React, { useState } from 'react';
import { ShieldCheck, Mail, Send, CheckCircle2, AlertCircle, FileText, UserCheck, HeartHandshake } from 'lucide-react';
import { Author } from '../types';

interface LegalPageProps {
  pageType:
    | 'about'
    | 'contact'
    | 'privacy'
    | 'cookie-policy'
    | 'terms'
    | 'editorial-policy'
    | 'affiliate-disclosure';
  authors: Author[];
  onNavigate: (view: string, param?: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ pageType, authors, onNavigate }) => {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Editorial Inquiry / Fact Check');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* 1. ABOUT US PAGE */}
      {pageType === 'about' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-8 shadow-xs">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Independent Editorial Charter</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900">
              About SavorZero: The Sustainable Kitchen & Nutrition Journal
            </h1>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Founded in 2026, <strong>SavorZero</strong> is an evidence-based independent digital publication dedicated to solving the twin challenges of rising grocery inflation and catastrophic kitchen food waste. We specialize in 100% celiac-safe gluten-free culinary nutrition and zero-waste food preservation engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <h3 className="font-editorial text-lg font-bold text-stone-900">Our Core Mission</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                To empower 500,000 households globally to reduce their domestic food waste by at least 70%, saving $1,500+ annually while eliminating landfill methane emissions and eating nourishing, chef-grade meals.
              </p>
            </div>
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <h3 className="font-editorial text-lg font-bold text-stone-900">100% Gluten-Free Safety</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We maintain zero tolerance for allergen cross-contamination. Every recipe and preservation technique is audited against strict clinical standards for celiac disease and non-celiac gluten sensitivity.
              </p>
            </div>
          </div>

          {/* Author Profiles & Credentials */}
          <div className="space-y-6 pt-4 border-t border-stone-200">
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              Our Editorial Board & Clinical Specialists
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {authors.map((author) => (
                <div key={author.id} className="p-5 border border-stone-200 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-800"
                    />
                    <div>
                      <h4 className="font-editorial text-base font-bold text-stone-900">{author.name}</h4>
                      <p className="text-xs text-emerald-800 font-medium">{author.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{author.bio}</p>
                  <div className="text-[11px] text-stone-600 font-medium pt-2 border-t border-stone-100">
                    <strong>Credentials:</strong> {author.credentials}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. CONTACT US PAGE */}
      {pageType === 'contact' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-8 shadow-xs">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Communication</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900">
              Contact the SavorZero Editorial Board
            </h1>
            <p className="text-stone-700 text-sm leading-relaxed">
              Have a zero-waste recipe question, a fact-check correction, a product review inquiry, or feedback on our grocery savings calculator? Our team responds within 24 to 48 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="font-editorial text-xl font-bold text-emerald-950">
                Message Received by Editorial Staff
              </h3>
              <p className="text-xs text-emerald-900 max-w-md mx-auto">
                Thank you, {name}. A member of our clinical nutrition or culinary testing desk will review your inquiry at <strong>{email}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-xl"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option>Editorial Inquiry / Fact Check</option>
                  <option>Gluten-Free Safety Clarification</option>
                  <option>Savings Calculator Feedback</option>
                  <option>Kitchen Tool Testing Recommendation</option>
                  <option>Media, Press & Syndicate Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Detailed Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details of your question or suggestion..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Editorial Board</span>
              </button>
            </form>
          )}

          <div className="pt-6 border-t border-stone-100 text-xs text-stone-600 flex flex-wrap gap-6">
            <div>
              <strong>Editorial Inquiries:</strong> editorial@savorzero.org
            </div>
            <div>
              <strong>AdSense & Partnerships:</strong> partnerships@savorzero.org
            </div>
          </div>
        </div>
      )}

      {/* 3. PRIVACY POLICY */}
      {pageType === 'privacy' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed shadow-xs">
          <h1 className="font-editorial text-3xl font-bold text-stone-900">
            Privacy Policy (GDPR, CCPA & Global Standard)
          </h1>
          <p className="text-stone-600">Last updated: November 2026</p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">1. Data Controller Overview</h3>
          <p>
            SavorZero (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the website https://savorzero.org. We respect the privacy rights of all readers across the United States, United Kingdom, European Union, Canada, Australia, and worldwide. This policy outlines how information is collected, processed, and safeguarded.
          </p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">2. Information We Collect</h3>
          <p>
            - <strong>Voluntary Information:</strong> When you subscribe to our newsletter, submit a contact form, or log a savings calculation, we collect your name and email address. We never sell, lease, or rent subscriber data to third parties.
          </p>
          <p>
            - <strong>Automated Analytics & Cookies:</strong> We utilize Google Analytics 4 and Google AdSense technologies. These services use cookies and web beacons to monitor non-personally identifiable metrics (such as browser type, time spent on pages, and geographic country) to improve reader experience and serve compliant advertisements.
          </p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">3. Advertising & Google AdSense</h3>
          <p>
            We adhere to Google Publisher Policies. Google may use advertising cookies to personalize advertisements based on previous visits to this and other sites. Users may opt out of personalized advertising by visiting Google Ads Settings.
          </p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">4. Your GDPR / CCPA Rights</h3>
          <p>
            European and California residents possess the right to access, rectify, or request erasure of personal data held by SavorZero. To exercise your rights, email privacy@savorzero.org.
          </p>
        </div>
      )}

      {/* 4. COOKIE POLICY */}
      {pageType === 'cookie-policy' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed shadow-xs">
          <h1 className="font-editorial text-3xl font-bold text-stone-900">
            Cookie Policy
          </h1>
          <p className="text-stone-600">Last updated: November 2026</p>

          <p>
            This Cookie Policy explains what cookies are, how SavorZero uses them, and how you can manage your browser preferences.
          </p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">Types of Cookies Used</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Strictly Necessary Cookies:</strong> Essential for website navigation, user sessions, and core security functions.
            </li>
            <li>
              <strong>Performance & Analytics Cookies:</strong> Anonymous telemetry used to understand reader traffic patterns and popular topics (e.g., Google Analytics).
            </li>
            <li>
              <strong>Advertising Cookies (Google AdSense):</strong> Used to deliver non-intrusive, relevant advertisements and prevent repetitive ad display.
            </li>
            <li>
              <strong>Affiliate Tracking Cookies (Amazon Associates):</strong> Temporary cookies set when clicking verified product links to attribute qualifying purchases.
            </li>
          </ul>

          <p className="pt-2">
            You can modify cookie preferences at any time in your browser settings or via our on-screen Cookie Consent Banner.
          </p>
        </div>
      )}

      {/* 5. TERMS & CONDITIONS */}
      {pageType === 'terms' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed shadow-xs">
          <h1 className="font-editorial text-3xl font-bold text-stone-900">
            Terms and Conditions
          </h1>
          <p className="text-stone-600">Last updated: November 2026</p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">1. Acceptance of Terms</h3>
          <p>
            By accessing SavorZero, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use this service.
          </p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">2. Dietary & Medical Disclaimer</h3>
          <p>
            All culinary and nutritional content on SavorZero is provided for informational and educational purposes only. While our content is reviewed by registered dietitians, it does not constitute individual medical diagnosis or prescriptive therapy. Individuals with severe celiac disease or anaphylactic food allergies must always exercise their own diligence with ingredient packaging and manufacturing certifications.
          </p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">3. Intellectual Property</h3>
          <p>
            All original articles, calculators, research graphics, and algorithms are the property of SavorZero Publishing Group and protected by international copyright laws.
          </p>
        </div>
      )}

      {/* 6. EDITORIAL POLICY */}
      {pageType === 'editorial-policy' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed shadow-xs">
          <h1 className="font-editorial text-3xl font-bold text-stone-900">
            Editorial & Fact-Checking Policy (E-E-A-T)
          </h1>
          <p className="text-stone-600">Our Commitment to Accuracy, Rigor, and Reader Trust</p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">1. Experience & Expertise</h3>
          <p>
            We require that every culinary guide and nutritional audit is authored or peer-reviewed by qualified professionals with documented credentials in clinical nutrition, food science, or professional zero-waste culinary arts.
          </p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">2. Primary Source Verification</h3>
          <p>
            We do not publish unsubstantiated rumors, viral food trends without empirical basis, or artificial AI-hallucinated statistics. All food waste data references authoritative primary sources, including the USDA Economic Research Service, the FAO, European Commission circular food mandates, and peer-reviewed journals.
          </p>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">3. Corrections Transparency</h3>
          <p>
            When a factual error is discovered, we promptly correct the text and append an editorial correction note detailing the nature of the update and the timestamp. Readers can report discrepancies to <code>corrections@savorzero.org</code>.
          </p>
        </div>
      )}

      {/* 7. AFFILIATE DISCLOSURE */}
      {pageType === 'affiliate-disclosure' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed shadow-xs">
          <h1 className="font-editorial text-3xl font-bold text-stone-900">
            FTC & Amazon Associates Affiliate Disclosure
          </h1>
          <p className="text-stone-600">Full Commercial Transparency</p>

          <div className="p-5 bg-amber-50 border-l-4 border-amber-600 rounded-r-xl text-stone-800 text-xs sm:text-sm leading-relaxed">
            <strong>Amazon Associates Statement:</strong> SavorZero is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
          </div>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">How We Monetize</h3>
          <p>
            To keep SavorZero accessible to all readers without a paid paywall, we earn revenue through:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Verified Affiliate Commissions:</strong> If you purchase a recommended kitchen tool (like an airtight vacuum sealer or borosilicate glass containers) via an Amazon link, we receive a small percentage of the sale. This never increases your purchase price.
            </li>
            <li>
              <strong>Google AdSense Display Units:</strong> Clearly marked advertisement banners compliant with Google publisher policies.
            </li>
          </ul>

          <h3 className="font-editorial text-lg font-bold text-stone-900 pt-2">Independence Guarantee</h3>
          <p>
            We never accept paid payments to give a positive review to any kitchen tool. If a tool fails our shelf-life or durability testing, we do not recommend it.
          </p>
        </div>
      )}
    </div>
  );
};
