import React, { useState, useMemo } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingDown,
  Leaf,
  AlertCircle,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Share2,
  Sparkles,
  Heart,
  Smile,
  Users
} from 'lucide-react';
import { AffiliateProduct } from '../types';

interface FoodWasteCalculatorProps {
  affiliateProducts?: AffiliateProduct[];
  onNavigate?: (view: string, param?: string) => void;
}

export const FoodWasteCalculator: React.FC<FoodWasteCalculatorProps> = ({
  affiliateProducts = [],
  onNavigate
}) => {
  // Calculator State
  const [householdSize, setHouseholdSize] = useState<number>(3);
  const [weeklyGrocerySpend, setWeeklyGrocerySpend] = useState<number>(180);
  const [estimatedWastePercent, setEstimatedWastePercent] = useState<number>(30); // 30% national average
  const [isGlutenFree, setIsGlutenFree] = useState<boolean>(true);
  const [mealPlanningHabit, setMealPlanningHabit] = useState<'none' | 'partial' | 'strict'>('partial');
  const [storageMethod, setStorageMethod] = useState<'basic' | 'glass' | 'vacuum'>('glass');
  const [copied, setCopied] = useState(false);
  const [recorded, setRecorded] = useState(false);

  // Quick Household Presets for Easy 1-Click Setup
  const applyPreset = (preset: 'solo' | 'couple' | 'family4' | 'family5') => {
    if (preset === 'solo') {
      setHouseholdSize(1);
      setWeeklyGrocerySpend(95);
      setEstimatedWastePercent(25);
    } else if (preset === 'couple') {
      setHouseholdSize(2);
      setWeeklyGrocerySpend(160);
      setEstimatedWastePercent(28);
    } else if (preset === 'family4') {
      setHouseholdSize(4);
      setWeeklyGrocerySpend(280);
      setEstimatedWastePercent(35);
    } else if (preset === 'family5') {
      setHouseholdSize(5);
      setWeeklyGrocerySpend(370);
      setEstimatedWastePercent(38);
    }
  };

  // Financial & Waste Calculations
  const calculations = useMemo(() => {
    // Gluten-free specialty factor: GF items cost ~1.8x more than wheat items
    const gfMultiplier = isGlutenFree ? 1.25 : 1.0;

    // Baseline weekly wasted grocery dollars
    const rawWeeklyWaste = (weeklyGrocerySpend * (estimatedWastePercent / 100)) * gfMultiplier;

    // Potential achievable waste reduction based on habits & storage
    let achievableReduction = 0.70; // 70% reduction possible
    if (mealPlanningHabit === 'strict') achievableReduction += 0.15;
    if (mealPlanningHabit === 'none') achievableReduction -= 0.10;
    if (storageMethod === 'vacuum') achievableReduction += 0.10;
    if (storageMethod === 'glass') achievableReduction += 0.05;

    achievableReduction = Math.min(0.92, Math.max(0.40, achievableReduction));

    const weeklySavings = rawWeeklyWaste * achievableReduction;
    const monthlySavings = weeklySavings * 4.33;
    const annualSavings = weeklySavings * 52;

    // Environmental metrics
    const foodLbsSavedAnnual = Math.round((annualSavings / 3.4) * (householdSize * 0.75 + 0.5));
    const co2eKgAvoided = Math.round(foodLbsSavedAnnual * 2.1);
    const milesEquiv = Math.round(co2eKgAvoided * 2.45);

    // Categories breakdown
    const produceLoss = Math.round(annualSavings * 0.38);
    const bakeryLoss = Math.round(annualSavings * (isGlutenFree ? 0.28 : 0.18));
    const leftoversLoss = Math.round(annualSavings * 0.20);
    const dairyPantryLoss = Math.max(0, Math.round(annualSavings - (produceLoss + bakeryLoss + leftoversLoss)));

    return {
      rawWeeklyWaste: Math.round(rawWeeklyWaste),
      weeklySavings: Math.round(weeklySavings),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      foodLbsSavedAnnual,
      co2eKgAvoided,
      milesEquiv,
      breakdown: {
        produceLoss,
        bakeryLoss,
        leftoversLoss,
        dairyPantryLoss
      }
    };
  }, [householdSize, weeklyGrocerySpend, estimatedWastePercent, isGlutenFree, mealPlanningHabit, storageMethod]);

  const handleRecordCalculation = async () => {
    try {
      await fetch('/api/calculator/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          savings: calculations.annualSavings,
          foodSavedLbs: calculations.foodLbsSavedAnnual
        })
      });
      setRecorded(true);
      setTimeout(() => setRecorded(false), 3000);
    } catch {
      // quiet fail
    }
  };

  const handleShare = () => {
    const text = `🌸 I tested my kitchen grocery waste on SavorZero: Our household can save $${calculations.annualSavings.toLocaleString()}/year and prevent ${calculations.foodLbsSavedAnnual} lbs of food waste!`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-pink-200/90 shadow-xl overflow-hidden my-8 foodie-card relative">
      {/* Cute Floating Floral Badges */}
      <div className="absolute top-3 right-4 select-none opacity-40 pointer-events-none text-2xl hidden sm:block">
        🌸 🥑 🍓 🌿
      </div>

      {/* Header Banner - Foodie Pastel Warm Floral Style */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white p-6 sm:p-10 relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1 rounded-full text-xs font-semibold text-pink-50 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Smart Foodie Audit • Super Easy 1-Click Calculator</span>
            <span>🌸</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Food Waste & Grocery Savings Calculator
          </h2>
          <p className="text-pink-100 text-sm sm:text-base leading-relaxed">
            See how much cash you can save each month by simply keeping fresh produce crisp, rescuing stale gluten-free bread, and storing dinner leftovers properly!
          </p>

          {/* 1-Click Easy Presets */}
          <div className="mt-5 pt-3 border-t border-white/20">
            <span className="text-xs font-bold text-pink-100 uppercase tracking-wider block mb-2">
              ⚡ 1-Click Instant Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'solo', label: 'Solo Kitchen (1 Person) 🌸', icon: '👤' },
                { id: 'couple', label: 'Sweet Couple (2 People) 🥑', icon: '👫' },
                { id: 'family4', label: 'Family of 4 🍓', icon: '👨‍👩‍👧‍👦' },
                { id: 'family5', label: 'Big Family (5+ People) 🍰', icon: '🏡' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id as any)}
                  className="px-3.5 py-1.5 bg-white/90 hover:bg-white text-stone-800 text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
                >
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2 border-b border-pink-100 pb-3">
            <Calculator className="w-4 h-4 text-rose-600" />
            <span>Customize Your Kitchen Profile:</span>
          </h3>

          {/* Household Size */}
          <div className="p-4 bg-pink-50/40 rounded-2xl border border-pink-100/80">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-pink-600" />
                <span>Household Size:</span>
              </label>
              <span className="text-xs font-bold text-rose-800 bg-white px-3 py-1 rounded-full border border-pink-200 shadow-xs">
                {householdSize} {householdSize === 1 ? 'Person' : 'People'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={householdSize}
              onChange={(e) => setHouseholdSize(Number(e.target.value))}
              className="w-full accent-rose-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-500 px-1 mt-1 font-medium">
              <span>Solo</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6+</span>
            </div>
          </div>

          {/* Weekly Grocery Spend */}
          <div className="p-4 bg-pink-50/40 rounded-2xl border border-pink-100/80">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Weekly Grocery Budget:</span>
              </label>
              <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
                ${weeklyGrocerySpend}/week
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={weeklyGrocerySpend}
              onChange={(e) => setWeeklyGrocerySpend(Number(e.target.value))}
              className="w-full accent-rose-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-500 px-1 mt-1 font-medium">
              <span>$50/wk</span>
              <span>$150/wk</span>
              <span>$300/wk</span>
              <span>$500/wk</span>
            </div>
          </div>

          {/* Estimated Food Waste */}
          <div className="p-4 bg-pink-50/40 rounded-2xl border border-pink-100/80">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-amber-600" />
                <span>Estimated Food Thrown Out (%):</span>
              </label>
              <span className="text-xs font-bold text-amber-900 bg-white px-3 py-1 rounded-full border border-amber-200 shadow-xs">
                {estimatedWastePercent}% (avg home is ~30%)
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="2"
              value={estimatedWastePercent}
              onChange={(e) => setEstimatedWastePercent(Number(e.target.value))}
              className="w-full accent-amber-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* 100% Gluten-Free Toggle */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-900">
                  🌾 100% Gluten-Free Household?
                </span>
                <span className="text-[10px] bg-amber-700 text-white font-bold px-2 py-0.5 rounded">
                  +183% Specialty Price
                </span>
              </div>
              <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                Gluten-free artisan loaves & flours cost 180% more than wheat. Rescuing them yields much bigger money savings!
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={isGlutenFree}
                onChange={(e) => setIsGlutenFree(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>

          {/* Storage Setup */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              Primary Kitchen Food Storage:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'basic', label: 'Plastic Film & Bags', desc: 'Standard wraps' },
                { id: 'glass', label: 'Airtight Glass Jars', desc: 'Airtight seals 🌸' },
                { id: 'vacuum', label: 'Vacuum Sealing', desc: 'Zero oxygen / 5x life' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setStorageMethod(opt.id as any)}
                  className={`p-3 text-left rounded-2xl border text-xs transition-all cursor-pointer ${
                    storageMethod === opt.id
                      ? 'border-rose-500 bg-rose-50 text-rose-950 font-bold shadow-xs'
                      : 'border-stone-200 hover:border-pink-300 bg-white text-stone-700'
                  }`}
                >
                  <div>{opt.label}</div>
                  <div className="text-[10px] text-stone-500 font-normal mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Savings Projections */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-[#FFFDF9] border border-pink-200/90 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-pink-100">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1">
                <span>🌸 Your Yearly Money Saved:</span>
              </span>
              <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Guaranteed Recapture
              </span>
            </div>

            {/* Giant Annual Savings Number */}
            <div className="my-6 text-center">
              <div className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
                Potential Money Back In Your Pocket
              </div>
              <div className="font-editorial text-5xl sm:text-6xl font-extrabold text-stone-900 tracking-tight">
                ${calculations.annualSavings.toLocaleString()}
                <span className="text-lg font-sans font-medium text-rose-600">/yr</span>
              </div>
              <p className="text-xs text-stone-600 mt-2">
                That is <strong className="text-stone-900">${calculations.monthlySavings}/month</strong> or <strong className="text-stone-900">${calculations.weeklySavings}/week</strong> saved from the trash!
              </p>
            </div>

            {/* Environmental Impact Counter */}
            <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-pink-100 my-4 text-center">
              <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100">
                <div className="text-xs text-stone-600 font-medium">Food Rescued</div>
                <div className="text-xl font-bold text-rose-900 mt-0.5">
                  {calculations.foodLbsSavedAnnual} <span className="text-xs font-normal text-stone-500">lbs/yr</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div className="text-xs text-stone-600 font-medium">CO2e Prevented</div>
                <div className="text-xl font-bold text-emerald-800 mt-0.5">
                  {calculations.co2eKgAvoided} <span className="text-xs font-normal text-stone-500">kg/yr</span>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-stone-700">Fresh Produce & Berries 🍓</span>
                <span className="font-bold text-stone-900">${calculations.breakdown.produceLoss}/yr</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '38%' }}></div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-stone-700">
                  {isGlutenFree ? 'Gluten-Free Breads & Bakery 🥖' : 'Bread & Grains'}
                </span>
                <span className="font-bold text-stone-900">${calculations.breakdown.bakeryLoss}/yr</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: isGlutenFree ? '28%' : '18%' }}></div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-stone-700">Dinner Leftovers & Sauces 🍝</span>
                <span className="font-bold text-stone-900">${calculations.breakdown.leftoversLoss}/yr</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-pink-100">
              <button
                onClick={handleShare}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-pink-200 rounded-xl text-xs font-semibold text-rose-800 hover:bg-pink-50 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied Results!' : 'Share Savings 🌸'}</span>
              </button>

              <button
                onClick={handleRecordCalculation}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{recorded ? 'Saved to Audit!' : 'Log My Savings ✨'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
