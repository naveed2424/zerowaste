import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('savorzero_cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('savorzero_cookie_consent', 'accepted_all');
    setVisible(false);
  };

  const handleDeclineNonEssential = () => {
    localStorage.setItem('savorzero_cookie_consent', 'declined_non_essential');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-white/95 backdrop-blur-md border-t border-stone-300 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-3xl">
          <Cookie className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <div className="text-xs text-stone-700 leading-relaxed">
            <strong className="text-stone-900 font-semibold">Your Privacy & Cookie Choices:</strong> We use essential cookies to maintain website integrity and optional analytics/advertising cookies (such as Google AdSense & Amazon Associates) to deliver personalized eco-culinary content and sustain our independent research. See our{' '}
            <span className="text-emerald-800 underline font-medium">Privacy Policy</span> and{' '}
            <span className="text-emerald-800 underline font-medium">Cookie Policy</span>.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            onClick={handleDeclineNonEssential}
            className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            Essential Only
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex-1 md:flex-none px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
};
