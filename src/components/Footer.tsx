import React from 'react';
import { Leaf, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  categories: Category[];
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ categories, onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-emerald-100 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="font-editorial text-2xl font-bold text-white block">
                  SavorZero
                </span>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-medium">
                  Zero-Waste & Gluten-Free Living
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-md">
              An evidence-based editorial publication and circular gastronomy journal. We empower conscious kitchens to cut grocery bills by up to $2,100/year through scientifically proven shelf-life extension, 100% gluten-free culinary excellence, and creative leftover recycling.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>E-E-A-T Verified Editorial Standards</span>
              </div>
              <span>•</span>
              <span>Peer-Reviewed Nutrition</span>
            </div>
          </div>

          {/* Column 3: 6 Main Categories */}
          <div>
            <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-4">
              Editorial Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onNavigate('category', c.slug)}
                    className="text-stone-400 hover:text-emerald-400 transition-colors text-left flex items-center gap-1 group"
                  >
                    <span>{c.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Free Interactive Tools */}
          <div>
            <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-4">
              Interactive Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('recipes')}
                  className="text-pink-300 hover:text-pink-200 transition-colors flex items-center gap-1.5 font-bold"
                >
                  <span>🌸 Easy Recipes Box (10-Min)</span>
                  <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-semibold">New</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('planner')}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-bold"
                >
                  <span>📅 Seasonal Meal Planner</span>
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 px-1.5 py-0.2 rounded font-semibold">Smart List</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium text-emerald-300"
                >
                  <span>Grocery Savings Calculator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rescue')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors"
                >
                  Leftover Food Rescue & Recipes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gear')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors"
                >
                  Tested Amazon Eco-Kitchen Gear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors"
                >
                  Our Authors & Fact-Checkers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Publisher Admin CMS</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Compliance & Legal */}
          <div>
            <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-stone-400 hover:text-stone-200 transition-colors"
                >
                  Privacy Policy (GDPR/CCPA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cookie-policy')}
                  className="text-stone-400 hover:text-stone-200 transition-colors"
                >
                  Cookie Policy & Consent
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-stone-400 hover:text-stone-200 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editorial-policy')}
                  className="text-stone-400 hover:text-stone-200 transition-colors"
                >
                  Editorial & Corrections Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('affiliate-disclosure')}
                  className="text-stone-400 hover:text-stone-200 transition-colors font-medium text-amber-300"
                >
                  Affiliate Disclosure (FTC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-stone-400 hover:text-stone-200 transition-colors"
                >
                  Contact Editorial Board
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Amazon Associates & AdSense Mandatory Disclosure Block */}
        <div className="py-6 border-b border-stone-800 text-xs text-stone-300 space-y-2 leading-relaxed">
          <p>
            <strong className="text-stone-200">FTC & Amazon Associates Disclaimer:</strong> SavorZero is a participant in the Amazon Services LLC Associates Program and selected culinary affiliate networks. When readers click verified links to recommended tools (such as vacuum sealers, glass containers, and composters) and make a qualifying purchase, we may receive a small commission at no additional cost to you. Our editorial ratings and testing methodologies remain strictly independent.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-stone-300 pt-1">
            <a href="/ads.txt" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline flex items-center gap-1">
              ads.txt verified <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline flex items-center gap-1">
              sitemap.xml <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline flex items-center gap-1">
              robots.txt <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-300 gap-4">
          <p>© 2026 SavorZero Publishing Group. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered for sustainability, zero food waste & healthy gluten-free living <Heart className="w-3 h-3 text-red-500 fill-current inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
