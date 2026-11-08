import React from 'react';
import { ExternalLink, Info } from 'lucide-react';

interface AdSenseBannerProps {
  slot: 'leaderboard' | 'in-article' | 'sidebar';
  clientId?: string;
  enabled?: boolean;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slot,
  clientId = 'ca-pub-9842109842109842',
  enabled = true
}) => {
  if (!enabled) return null;

  return (
    <div className="w-full my-6 flex flex-col items-center">
      {/* Google AdSense Compliant Label */}
      <div className="flex items-center gap-1 text-[10px] text-stone-600 uppercase tracking-widest font-semibold mb-1">
        <span>Advertisement</span>
        <Info className="w-2.5 h-2.5" />
      </div>

      {slot === 'leaderboard' && (
        <div className="w-full max-w-[728px] h-[90px] bg-stone-100 border border-stone-200 rounded-lg flex items-center justify-between px-6 py-2 shadow-xs text-stone-700 hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              AdSense
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">
                Eco-Kitchen Preservation Tech • Partner Showcase
              </div>
              <div className="text-[11px] text-stone-600">
                Certified BPA-free glass pantry canisters & airtight silicone systems.
              </div>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs font-semibold text-emerald-800 border border-emerald-700 px-2.5 py-1 rounded bg-white">
              Learn More
            </span>
          </div>
        </div>
      )}

      {slot === 'in-article' && (
        <div className="w-full max-w-2xl bg-stone-50 border border-stone-200/90 rounded-xl p-5 shadow-xs my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                Google Ad
              </div>
              <div>
                <h5 className="text-xs font-bold text-stone-900">
                  Organic Gluten-Free Bulk Pantry Delivery
                </h5>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                  Save 25% on certified celiac-safe flours, sprouted oats, and zero-waste bulk grain deliveries.
                </p>
              </div>
            </div>
            <button className="text-xs font-bold bg-stone-900 text-white px-3 py-1.5 rounded-lg shrink-0 hover:bg-stone-800">
              Visit Sponsor
            </button>
          </div>
        </div>
      )}

      {slot === 'sidebar' && (
        <div className="w-full h-[250px] bg-stone-100 border border-stone-200 rounded-xl flex flex-col justify-between p-4 shadow-xs text-stone-700">
          <div className="flex justify-between items-center text-[10px] text-stone-600">
            <span>Sponsored Unit</span>
            <span>AdChoices</span>
          </div>
          <div className="text-center py-4">
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-white mx-auto flex items-center justify-center font-bold text-xs mb-2">
              Ad
            </div>
            <div className="text-xs font-bold text-stone-900">
              Smart Countertop Composter
            </div>
            <div className="text-[11px] text-stone-600 mt-1">
              Convert dinner leftovers into odorless garden nutrients in 4 hours.
            </div>
          </div>
          <div className="text-center">
            <span className="text-xs font-bold text-emerald-800 hover:underline">
              Check Verified Discount →
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
