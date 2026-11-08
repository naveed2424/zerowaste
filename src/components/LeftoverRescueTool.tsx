import React, { useState } from 'react';
import {
  Sparkles,
  Utensils,
  Clock,
  ChefHat,
  Check,
  Plus,
  ArrowRight,
  Heart,
  Smile
} from 'lucide-react';
import { LeftoverRescueResult } from '../types';

const COMMON_SCRAPS = [
  '🥖 Stale Gluten-Free Bread',
  '🥦 Broccoli & Cauliflower Stems',
  '🥕 Limp Celery & Carrots',
  '🍚 Cooked Rice / Quinoa',
  '🥛 Sour Milk / Buttermilk',
  '🍌 Overripe Spotted Bananas',
  '🍋 Citrus Rinds & Lemon Peels',
  '🌿 Herb Stems (Parsley/Cilantro)',
  '🍗 Roast Chicken Bones / Scraps',
  '🧅 Onion & Shallot Skins',
  '🧀 Parmesan Rinds',
  '🍎 Apple Peels & Cores'
];

export const LeftoverRescueTool: React.FC = () => {
  const [selectedScraps, setSelectedScraps] = useState<string[]>([
    '🥖 Stale Gluten-Free Bread',
    '🥦 Broccoli & Cauliflower Stems'
  ]);
  const [customInput, setCustomInput] = useState('');
  const [dietary, setDietary] = useState<string[]>(['100% Gluten-Free']);
  const [prepTime, setPrepTime] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeResult, setRecipeResult] = useState<LeftoverRescueResult | null>(null);

  const toggleScrap = (scrap: string) => {
    if (selectedScraps.includes(scrap)) {
      setSelectedScraps(selectedScraps.filter((s) => s !== scrap));
    } else {
      setSelectedScraps([...selectedScraps, scrap]);
    }
  };

  const addCustomScrap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    if (!selectedScraps.includes(customInput.trim())) {
      setSelectedScraps([...selectedScraps, customInput.trim()]);
    }
    setCustomInput('');
  };

  const handleGenerateRecipe = async () => {
    if (selectedScraps.length === 0) return;
    setIsLoading(true);

    try {
      // Strip emojis from scrap names when passing to backend
      const cleanScraps = selectedScraps.map((s) => s.replace(/[\u{1F300}-\u{1F6FF}]/gu, '').trim());

      const res = await fetch('/api/ai/leftover-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: cleanScraps,
          dietaryRequirements: dietary,
          prepTimeMinutes: prepTime
        })
      });

      const data = await res.json();
      if (data.success && data.recipe) {
        setRecipeResult(data.recipe);
      }
    } catch (err) {
      console.error('Error generating leftover recipe:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-pink-200/90 shadow-xl overflow-hidden my-8 foodie-card relative">
      {/* Decorative Floral Header Corner */}
      <div className="absolute top-2 right-4 text-3xl select-none opacity-40 pointer-events-none">
        🌸 🌿 ✨
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white p-6 sm:p-10 relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1 rounded-full text-xs font-semibold text-pink-50 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>AI Culinary Matcher • Turn Any Scraps into Dinner</span>
            <span>🌸</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Leftover Food Rescue & Scrap Re-purposer
          </h2>
          <p className="text-pink-100 text-sm sm:text-base leading-relaxed">
            What odds and ends are hanging out in your fridge right now? Tap them below, and our chef engine will whip up an easy, mouthwatering, 100% gluten-free meal!
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Scrap Selector */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
              Select Your Leftover Items (Tap to Add 🌸):
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_SCRAPS.map((scrap) => {
                const isSelected = selectedScraps.includes(scrap);
                return (
                  <button
                    key={scrap}
                    type="button"
                    onClick={() => toggleScrap(scrap)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
                        : 'bg-white text-stone-700 hover:bg-pink-50 border border-pink-200/80'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                    {scrap}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add Custom Ingredient */}
          <form onSubmit={addCustomScrap} className="flex gap-2">
            <input
              type="text"
              placeholder="Or type a custom leftover (e.g. wilted kale, cooked sweet potato)..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 text-xs bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          {/* Current Selection Basket */}
          <div className="p-4 bg-pink-50/60 rounded-2xl border border-pink-200/80">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1">
                <span>🧺 Your Rescue Basket ({selectedScraps.length})</span>
              </span>
              {selectedScraps.length > 0 && (
                <button
                  onClick={() => setSelectedScraps([])}
                  className="text-[10px] text-rose-600 hover:text-rose-800 font-bold"
                >
                  Clear All
                </button>
              )}
            </div>

            {selectedScraps.length === 0 ? (
              <p className="text-xs text-stone-500 italic">No scraps selected yet. Tap any delicious ingredient above!</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {selectedScraps.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 text-xs bg-white border border-pink-200 px-2.5 py-1 rounded-lg text-stone-800 font-medium shadow-2xs"
                  >
                    <span>{s}</span>
                    <button
                      onClick={() => toggleScrap(s)}
                      className="text-stone-400 hover:text-rose-600 ml-1 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Dietary Safeguards */}
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
              Dietary Safeguards:
            </label>
            <div className="flex flex-wrap gap-3 text-xs">
              {['100% Gluten-Free 🌾', 'Dairy-Free 🥛', 'Plant-Based 🌱', 'Under 20 Mins ⚡'].map((diet) => (
                <label key={diet} className="inline-flex items-center gap-1.5 text-stone-700 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={dietary.includes(diet)}
                    onChange={(e) => {
                      if (e.target.checked) setDietary([...dietary, diet]);
                      else setDietary(dietary.filter((d) => d !== diet));
                    }}
                    className="accent-rose-600 rounded"
                  />
                  <span>{diet}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateRecipe}
            disabled={selectedScraps.length === 0 || isLoading}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98 ${
              selectedScraps.length === 0 || isLoading
                ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Creating Delicious Recipe with Flowers... 🌸</span>
              </>
            ) : (
              <>
                <ChefHat className="w-4 h-4" />
                <span>Rescue These Ingredients & Cook Now ✨</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Recipe Transformation Result */}
        <div className="lg:col-span-7">
          {recipeResult ? (
            <div className="bg-[#FFFDF9] border border-pink-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-rose-800 bg-pink-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    🌸 Zero-Waste Chef Transformation
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5">
                    {recipeResult.title}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-stone-500">Estimated Rescue Value</div>
                  <div className="text-lg font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    {recipeResult.estimatedSavings}
                  </div>
                </div>
              </div>

              {/* Quick Details Badges */}
              <div className="flex flex-wrap gap-4 text-xs text-stone-700 py-1 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-rose-600" />
                  <span>Prep: {recipeResult.prepTime} | Cook: {recipeResult.cookTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-rose-600" />
                  <span>Difficulty: {recipeResult.difficulty}</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                  <span>🌾 100% Celiac-Safe Gluten-Free</span>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Ingredients Needed:
                </h4>
                <ul className="text-xs text-stone-800 space-y-1.5 list-disc pl-4">
                  {recipeResult.ingredients.map((ing, idx) => (
                    <li key={idx} className="leading-relaxed">{ing}</li>
                  ))}
                </ul>
              </div>

              {/* Step by step Instructions */}
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Easy Step-by-Step Instructions:
                </h4>
                <ol className="text-xs text-stone-800 space-y-2 list-decimal pl-4">
                  {recipeResult.instructions.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">{step}</li>
                  ))}
                </ol>
              </div>

              {/* Chef Zero-Waste Tip */}
              {recipeResult.chefZeroWasteTip && (
                <div className="p-4 bg-gradient-to-r from-pink-50 to-amber-50 border-l-4 border-rose-500 rounded-r-2xl">
                  <h5 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-1">
                    🌸 Chef Julian&apos;s Zero-Waste Secret:
                  </h5>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    {recipeResult.chefZeroWasteTip}
                  </p>
                </div>
              )}

              {/* Storage guidance */}
              {recipeResult.storageGuidance && (
                <p className="text-[11px] text-stone-600 italic">
                  <strong>Safe Storage:</strong> {recipeResult.storageGuidance}
                </p>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[380px] border-2 border-dashed border-pink-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-pink-50/20">
              <span className="text-5xl mb-3 animate-pulse-soft">🌸🍓</span>
              <h4 className="font-editorial text-xl font-bold text-stone-800">
                Your Zero-Waste Recipe Will Bloom Here!
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mt-1 leading-relaxed">
                Choose any leftovers on the left and tap &quot;Rescue These Ingredients&quot; to generate an easy-to-make gluten-free creation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
