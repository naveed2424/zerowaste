import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ShoppingBag,
  Sparkles,
  Leaf,
  Plus,
  Trash2,
  Check,
  Copy,
  Printer,
  ChevronRight,
  Clock,
  Heart,
  ArrowRight,
  RefreshCw,
  Info,
  CheckCircle2,
  Layers,
  Utensils
} from 'lucide-react';
import { EASY_RECIPES, EasyRecipe } from './EasyRecipeBox';

// Additional Seasonal Recipes for diversity
export interface MealSlotItem {
  recipeId: string;
  title: string;
  emoji: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cookTime: string;
  scrapHero: string;
  ingredients: { amount: number; unit: string; name: string; aisle: string }[];
}

export const EXTRA_SEASONAL_RECIPES: MealSlotItem[] = [
  {
    recipeId: 'spring-radish-pasta',
    title: 'Spring Radish Green & Pea Stem Risotto',
    emoji: '🌸',
    category: 'dinner',
    cookTime: '22 mins',
    scrapHero: 'Radish tops & Pea pods',
    ingredients: [
      { amount: 1.5, unit: 'cups', name: 'Arborio rice (certified GF)', aisle: 'Grains & Bakery' },
      { amount: 2, unit: 'cups', name: 'radish greens & tender spinach', aisle: 'Fresh Produce' },
      { amount: 4, unit: 'cups', name: 'warm vegetable scrap stock', aisle: 'Condiments & Oils' },
      { amount: 0.5, unit: 'cup', name: 'parmesan or nutritional yeast', aisle: 'Dairy & Proteins' },
      { amount: 2, unit: 'tbsp', name: 'cold-pressed olive oil', aisle: 'Condiments & Oils' }
    ]
  },
  {
    recipeId: 'summer-panzanella',
    title: 'Heirloom Tomato & Stale Bread Panzanella',
    emoji: '☀️',
    category: 'lunch',
    cookTime: '15 mins',
    scrapHero: 'Stale gluten-free bread crusts',
    ingredients: [
      { amount: 3, unit: 'cups', name: 'cubed stale gluten-free bread', aisle: 'Grains & Bakery' },
      { amount: 3, unit: 'medium', name: 'ripe summer tomatoes (chopped with juices)', aisle: 'Fresh Produce' },
      { amount: 1, unit: 'cup', name: 'English cucumber & red onion', aisle: 'Fresh Produce' },
      { amount: 0.5, unit: 'cup', name: 'fresh basil leaves', aisle: 'Fresh Produce' },
      { amount: 3, unit: 'tbsp', name: 'cold-pressed olive oil', aisle: 'Condiments & Oils' },
      { amount: 1.5, unit: 'tbsp', name: 'red wine vinegar', aisle: 'Condiments & Oils' }
    ]
  },
  {
    recipeId: 'autumn-squash-soup',
    title: 'Roasted Squash & Golden Seed Crisp Soup',
    emoji: '🍂',
    category: 'dinner',
    cookTime: '25 mins',
    scrapHero: 'Roasted squash seeds & peelings',
    ingredients: [
      { amount: 1, unit: 'medium', name: 'butternut squash (peeled & seeded)', aisle: 'Fresh Produce' },
      { amount: 0.5, unit: 'cup', name: 'squash seeds (toasted with smoked paprika)', aisle: 'Snacks & Seeds' },
      { amount: 3, unit: 'cups', name: 'vegetable scrap stock', aisle: 'Condiments & Oils' },
      { amount: 0.75, unit: 'cup', name: 'coconut milk or cream', aisle: 'Dairy & Proteins' },
      { amount: 1, unit: 'tsp', name: 'ground ginger & nutmeg', aisle: 'Spices & Seasonings' }
    ]
  },
  {
    recipeId: 'winter-citrus-carrots',
    title: 'Honey Citrus Glazed Rainbow Carrots',
    emoji: '❄️',
    category: 'dinner',
    cookTime: '20 mins',
    scrapHero: 'Squeezed orange peels & carrot tops',
    ingredients: [
      { amount: 1.5, unit: 'lbs', name: 'whole carrots with green tops', aisle: 'Fresh Produce' },
      { amount: 2, unit: 'tbsp', name: 'orange zest & juice (from squeezed peels)', aisle: 'Fresh Produce' },
      { amount: 1.5, unit: 'tbsp', name: 'floral honey or maple syrup', aisle: 'Condiments & Oils' },
      { amount: 1.5, unit: 'tbsp', name: 'butter or olive oil', aisle: 'Condiments & Oils' }
    ]
  }
];

// Helper to convert EasyRecipe to MealSlotItem
function easyRecipeToSlotItem(r: EasyRecipe, cat: 'breakfast' | 'lunch' | 'dinner' | 'snack'): MealSlotItem {
  return {
    recipeId: r.id,
    title: r.title,
    emoji: r.emoji,
    category: cat,
    cookTime: r.totalTime,
    scrapHero: r.scrapHero,
    ingredients: r.ingredients.map((ing) => {
      let aisle = 'Fresh Produce';
      const n = ing.name.toLowerCase();
      if (n.includes('bread') || n.includes('flour') || n.includes('oat') || n.includes('pasta') || n.includes('rice')) {
        aisle = 'Grains & Bakery';
      } else if (n.includes('egg') || n.includes('yogurt') || n.includes('milk') || n.includes('cheese') || n.includes('cheddar') || n.includes('parmesan')) {
        aisle = 'Dairy & Proteins';
      } else if (n.includes('oil') || n.includes('syrup') || n.includes('honey') || n.includes('vinegar') || n.includes('butter')) {
        aisle = 'Condiments & Oils';
      } else if (n.includes('cinnamon') || n.includes('salt') || n.includes('powder') || n.includes('pepper') || n.includes('seeds') || n.includes('vanilla')) {
        aisle = 'Spices & Seasonings';
      }
      return {
        amount: ing.amount,
        unit: ing.unit,
        name: ing.name,
        aisle
      };
    })
  };
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export const SeasonalMealPlanner: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<Season>('autumn');
  const [copiedList, setCopiedList] = useState(false);
  const [checkedPantryItems, setCheckedPantryItems] = useState<Record<string, boolean>>({});
  const [selectorModalOpen, setSelectorModalOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<{ day: string; meal: 'breakfast' | 'lunch' | 'dinner' | 'snack' } | null>(null);

  // Weekly Meal Plan Grid State: { 'Monday': { breakfast: MealSlotItem, lunch: ..., ... } }
  const [weeklyPlan, setWeeklyPlan] = useState<Record<string, Partial<Record<'breakfast' | 'lunch' | 'dinner' | 'snack', MealSlotItem>>>>(() => {
    // Default zero-waste paired plan (shows clear scrap reuse across days!)
    const r1 = easyRecipeToSlotItem(EASY_RECIPES[0], 'breakfast'); // Berry parfait
    const r2 = easyRecipeToSlotItem(EASY_RECIPES[1], 'breakfast'); // French toast sticks
    const r3 = easyRecipeToSlotItem(EASY_RECIPES[2], 'lunch'); // Broccoli fritters
    const r4 = easyRecipeToSlotItem(EASY_RECIPES[3], 'dinner'); // Herb pasta
    const r5 = easyRecipeToSlotItem(EASY_RECIPES[4], 'snack'); // Banana cookies
    const r6 = easyRecipeToSlotItem(EASY_RECIPES[5], 'snack'); // Roasted chickpeas

    return {
      Monday: {
        breakfast: r1,
        lunch: r3,
        dinner: r4,
        snack: r5
      },
      Tuesday: {
        breakfast: r2,
        dinner: EXTRA_SEASONAL_RECIPES[2], // Autumn Squash Soup
        snack: r6
      },
      Wednesday: {
        lunch: r3,
        dinner: r4,
        snack: r5
      },
      Thursday: {
        breakfast: r1,
        dinner: EXTRA_SEASONAL_RECIPES[0], // Risotto
        snack: r6
      },
      Friday: {
        breakfast: r2,
        lunch: r3,
        dinner: r4
      },
      Saturday: {
        breakfast: r1,
        dinner: EXTRA_SEASONAL_RECIPES[1], // Panzanella
        snack: r5
      },
      Sunday: {
        breakfast: r2,
        dinner: EXTRA_SEASONAL_RECIPES[3] // Winter citrus carrots
      }
    };
  });

  // Seasonal Details
  const seasonInfo = {
    spring: {
      name: 'Spring Awakening 🌸',
      tagline: 'Tender herbs, sweet peas, crisp radishes, and early strawberries',
      scrapSynergy: 'Herb stems & radish leaves blended into velvety pestos and broths',
      savingsMultiplier: 'Save ~38% on in-season peak produce',
      color: 'from-pink-500 to-emerald-600'
    },
    summer: {
      name: 'Summer Harvest ☀️',
      tagline: 'Vine-ripened tomatoes, sweet corn, zucchini, and sun berries',
      scrapSynergy: 'Overripe tomatoes & stale bread become golden Tuscan Panzanella',
      savingsMultiplier: 'Save ~44% on abundant local vegetables',
      color: 'from-amber-500 to-rose-500'
    },
    autumn: {
      name: 'Autumn Comfort 🍂',
      tagline: 'Butternut squash, crisp apples, broccoli crowns, and warming roots',
      scrapSynergy: 'Broccoli stalks grated into fritters & seeds roasted for soup croutons',
      savingsMultiplier: 'Save ~35% on hearty bulk-storage root staples',
      color: 'from-orange-500 to-rose-600'
    },
    winter: {
      name: 'Winter Preservation ❄️',
      tagline: 'Hearty brassicas, sweet citrus, pantry beans, and aged cheeses',
      scrapSynergy: 'Citrus rinds for degreaser & cheese rinds simmered for umami broth',
      savingsMultiplier: 'Save ~42% by minimizing fresh spoilage through vacuum batching',
      color: 'from-teal-600 to-pink-600'
    }
  }[selectedSeason];

  // Consolidated Shopping List Calculation
  const consolidatedShoppingList = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        aisle: string;
        totalAmount: number;
        unit: string;
        usedInMeals: string[];
      }
    >();

    Object.entries(weeklyPlan).forEach(([day, meals]) => {
      Object.entries(meals).forEach(([mealType, slot]) => {
        if (!slot || !slot.ingredients) return;
        slot.ingredients.forEach((ing) => {
          // Normalize key
          const key = ing.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          const mealTag = `${day.slice(0, 3)} ${mealType}`;

          if (map.has(key)) {
            const existing = map.get(key)!;
            // Sum if same unit
            if (existing.unit === ing.unit) {
              existing.totalAmount += ing.amount;
            }
            if (!existing.usedInMeals.includes(mealTag)) {
              existing.usedInMeals.push(mealTag);
            }
          } else {
            map.set(key, {
              name: ing.name,
              aisle: ing.aisle,
              totalAmount: ing.amount,
              unit: ing.unit,
              usedInMeals: [mealTag]
            });
          }
        });
      });
    });

    // Group by aisle
    const grouped: Record<
      string,
      {
        name: string;
        totalAmount: number;
        unit: string;
        usedInMeals: string[];
        isMultiMeal: boolean;
      }[]
    > = {};

    map.forEach((item) => {
      const isMultiMeal = item.usedInMeals.length > 1;
      if (!grouped[item.aisle]) grouped[item.aisle] = [];
      grouped[item.aisle].push({
        name: item.name,
        totalAmount: Number(item.totalAmount.toFixed(1)),
        unit: item.unit,
        usedInMeals: item.usedInMeals,
        isMultiMeal
      });
    });

    return grouped;
  }, [weeklyPlan]);

  // Compute Total Unique Ingredients and Shared Synergy
  const stats = useMemo(() => {
    let totalItems = 0;
    let sharedItems = 0;
    Object.values(consolidatedShoppingList).forEach((items) => {
      items.forEach((it) => {
        totalItems++;
        if (it.isMultiMeal) sharedItems++;
      });
    });

    const efficiencyScore = totalItems > 0 ? Math.round((sharedItems / totalItems) * 100) + 30 : 85;
    const estimatedSavings = Math.min(68, Math.round(sharedItems * 6.5 + 24));

    return {
      totalItems,
      sharedItems,
      efficiencyScore: Math.min(98, efficiencyScore),
      estimatedSavings
    };
  }, [consolidatedShoppingList]);

  // Open recipe picker for a slot
  const openRecipeSelector = (day: string, meal: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setTargetSlot({ day, meal });
    setSelectorModalOpen(true);
  };

  // Add recipe to slot
  const assignRecipeToSlot = (item: MealSlotItem) => {
    if (!targetSlot) return;
    setWeeklyPlan((prev) => ({
      ...prev,
      [targetSlot.day]: {
        ...prev[targetSlot.day],
        [targetSlot.meal]: item
      }
    }));
    setSelectorModalOpen(false);
    setTargetSlot(null);
  };

  // Remove meal from slot
  const removeMealFromSlot = (day: string, meal: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setWeeklyPlan((prev) => {
      const dayMeals = { ...prev[day] };
      delete dayMeals[meal];
      return { ...prev, [day]: dayMeals };
    });
  };

  // 1-Click Auto Fill
  const autoFillSeasonal = (season: Season) => {
    setSelectedSeason(season);
    // Instant smart seasonal rotation
    const r1 = easyRecipeToSlotItem(EASY_RECIPES[0], 'breakfast');
    const r2 = easyRecipeToSlotItem(EASY_RECIPES[1], 'breakfast');
    const r3 = easyRecipeToSlotItem(EASY_RECIPES[2], 'lunch');
    const r4 = easyRecipeToSlotItem(EASY_RECIPES[3], 'dinner');
    const r5 = easyRecipeToSlotItem(EASY_RECIPES[4], 'snack');
    const r6 = easyRecipeToSlotItem(EASY_RECIPES[5], 'snack');

    const seasonalDinner =
      season === 'spring'
        ? EXTRA_SEASONAL_RECIPES[0]
        : season === 'summer'
        ? EXTRA_SEASONAL_RECIPES[1]
        : season === 'autumn'
        ? EXTRA_SEASONAL_RECIPES[2]
        : EXTRA_SEASONAL_RECIPES[3];

    setWeeklyPlan({
      Monday: { breakfast: r1, lunch: r3, dinner: seasonalDinner, snack: r5 },
      Tuesday: { breakfast: r2, lunch: r3, dinner: r4, snack: r6 },
      Wednesday: { breakfast: r1, lunch: r3, dinner: seasonalDinner, snack: r5 },
      Thursday: { breakfast: r2, dinner: r4, snack: r6 },
      Friday: { breakfast: r1, lunch: r3, dinner: seasonalDinner },
      Saturday: { breakfast: r2, dinner: r4, snack: r5 },
      Sunday: { breakfast: r1, dinner: seasonalDinner, snack: r6 }
    });
  };

  // Copy shopping list text
  const copyShoppingList = () => {
    let text = `🌸 SavorZero Consolidated Zero-Waste Shopping List (${seasonInfo.name})\n`;
    text += `Efficiency Score: ${stats.efficiencyScore}% | Estimated Savings: $${stats.estimatedSavings}\n\n`;

    Object.entries(consolidatedShoppingList).forEach(([aisle, items]) => {
      text += `--- ${aisle} ---\n`;
      items.forEach((it) => {
        const checked = checkedPantryItems[it.name] ? '[Already in Pantry] ' : '[ ] ';
        const multi = it.isMultiMeal ? ` (Shared in ${it.usedInMeals.join(', ')})` : '';
        text += `${checked}${it.totalAmount} ${it.unit} ${it.name}${multi}\n`;
      });
      text += `\n`;
    });

    text += `* Generated on SavorZero • 100% Gluten-Free & Zero-Waste Planned!`;

    navigator.clipboard?.writeText(text);
    setCopiedList(true);
    setTimeout(() => setCopiedList(false), 2500);
  };

  const printShoppingList = () => {
    window.print();
  };

  // All available recipes to choose from
  const allAvailableRecipes: MealSlotItem[] = useMemo(() => {
    const list = EASY_RECIPES.map((r) => easyRecipeToSlotItem(r, r.category === 'sweet' ? 'breakfast' : 'lunch'));
    return [...list, ...EXTRA_SEASONAL_RECIPES];
  }, []);

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-pink-200/90 shadow-xl overflow-hidden my-8 foodie-card relative">
      {/* Decorative Floral Header Corner */}
      <div className="absolute top-3 right-5 text-3xl select-none opacity-40 pointer-events-none">
        🌸 🌿 🥑 🍓
      </div>

      {/* Header Banner - Foodie Floral Warm Rose */}
      <div className={`bg-gradient-to-r ${seasonInfo.color} text-white p-6 sm:p-10 relative overflow-hidden transition-all duration-500`}>
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1 rounded-full text-xs font-semibold text-pink-50 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Seasonal Circular Meal Architecture • Zero Grocery Leftovers</span>
            <span>🌸</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Seasonal Meal Planner & Waste-Free Grocery List
          </h2>

          <p className="text-pink-100 text-sm sm:text-base leading-relaxed max-w-2xl">
            Pick your favorite quick gluten-free recipes for the week. Our zero-waste engine automatically merges shared ingredients into one consolidated shopping list so zero packages get forgotten or spoiled!
          </p>

          {/* Season Switcher Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white mr-1 flex items-center gap-1">
              <span>Choose Season:</span>
            </span>
            {[
              { id: 'spring', label: 'Spring 🌸', desc: 'Peas, greens, herbs' },
              { id: 'summer', label: 'Summer ☀️', desc: 'Tomatoes, corn, berries' },
              { id: 'autumn', label: 'Autumn 🍂', desc: 'Squash, apples, roots' },
              { id: 'winter', label: 'Winter ❄️', desc: 'Citrus, hearty broths' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => autoFillSeasonal(s.id as Season)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  selectedSeason === s.id
                    ? 'bg-white text-stone-900 ring-2 ring-white/60 font-extrabold scale-102'
                    : 'bg-white/20 hover:bg-white/30 text-white border border-white/25'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Seasonal Synergy Notice */}
      <div className="bg-pink-50/70 border-b border-pink-100 px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-rose-900 font-semibold">
          <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>{seasonInfo.name}:</strong> {seasonInfo.tagline} • <span className="text-rose-700 italic">{seasonInfo.scrapSynergy}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            {seasonInfo.savingsMultiplier}
          </span>
          <button
            onClick={() => autoFillSeasonal(selectedSeason)}
            className="text-[11px] font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 underline cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Season Plan</span>
          </button>
        </div>
      </div>

      {/* Weekly Planner Grid */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-pink-100 pb-3">
          <div>
            <h3 className="font-editorial text-xl font-bold text-stone-900 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-rose-600" />
              <span>Your Weekly 7-Day Meal Architecture</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Click &quot;+ Add&quot; on any meal slot to pair ingredients and eliminate packaging waste.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-stone-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Produce Shared</span>
            </span>
            <span className="flex items-center gap-1.5 text-stone-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>100% Gluten-Free</span>
            </span>
          </div>
        </div>

        {/* 7 Days Columns / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3.5">
          {DAYS_OF_WEEK.map((day) => {
            const meals = weeklyPlan[day] || {};
            const mealSlots: ('breakfast' | 'lunch' | 'dinner' | 'snack')[] = [
              'breakfast',
              'lunch',
              'dinner',
              'snack'
            ];

            return (
              <div
                key={day}
                className="bg-stone-50/70 border border-pink-200/60 rounded-2xl p-3 flex flex-col justify-between space-y-2.5 shadow-2xs hover:border-pink-300 transition-colors"
              >
                <div className="text-center pb-1.5 border-b border-pink-100">
                  <span className="text-xs font-extrabold text-rose-900 block">{day}</span>
                  <span className="text-[10px] text-stone-600 font-medium">
                    {Object.keys(meals).length} meals planned
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  {mealSlots.map((mealType) => {
                    const item = meals[mealType];
                    const label = {
                      breakfast: 'Breakfast 🥐',
                      lunch: 'Lunch 🥗',
                      dinner: 'Dinner 🍲',
                      snack: 'Snack 🍓'
                    }[mealType];

                    return (
                      <div key={mealType} className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider block">
                          {label}
                        </span>

                        {item ? (
                          <div className="p-2 bg-white rounded-xl border border-pink-200 shadow-2xs text-xs relative group flex flex-col justify-between hover:border-rose-400 transition-all">
                            <button
                              onClick={() => removeMealFromSlot(day, mealType)}
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-600 p-0.5 rounded transition-opacity"
                              title="Remove Meal"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>

                            <div>
                              <div className="font-bold text-stone-900 line-clamp-1 pr-3 flex items-center gap-1">
                                <span>{item.emoji}</span>
                                <span className="truncate">{item.title}</span>
                              </div>
                              <div className="text-[10px] text-emerald-800 font-medium truncate mt-0.5">
                                ♻️ {item.scrapHero}
                              </div>
                            </div>

                            <div className="text-[10px] text-stone-600 mt-1 flex items-center justify-between">
                              <span className="flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5 text-pink-600" />
                                {item.cookTime}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => openRecipeSelector(day, mealType)}
                            className="w-full py-2 px-2 border border-dashed border-pink-200/90 hover:border-rose-400 bg-white/70 hover:bg-pink-50/50 rounded-xl text-[11px] font-semibold text-rose-700/80 hover:text-rose-800 flex items-center justify-center gap-1 transition-all cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONSOLIDATED SMART SHOPPING LIST SECTION */}
      <div className="bg-[#FFFDF9] border-t border-pink-200 p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Zero-Waste Intelligence Engine</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-stone-900">
              Consolidated Zero-Waste Grocery List
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Automatically merged ingredients across all 7 days with shared recipe synergies highlighted.
            </p>
          </div>

          {/* Action Buttons: Copy & Print */}
          <div className="flex items-center gap-2">
            <button
              onClick={copyShoppingList}
              className="px-4 py-2 bg-white hover:bg-pink-50 text-rose-800 border border-pink-200 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedList ? 'Copied to Clipboard! 🌸' : 'Copy Shopping List'}</span>
            </button>

            <button
              onClick={printShoppingList}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Clean List</span>
            </button>
          </div>
        </div>

        {/* Real-Time Efficiency & Waste Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-pink-50/60 rounded-2xl border border-pink-100 text-center">
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
              Package Utilization Score
            </span>
            <div className="font-editorial text-3xl font-extrabold text-stone-900 mt-0.5">
              {stats.efficiencyScore}%
            </div>
            <span className="text-[10px] text-stone-600">Zero leftover ingredients left behind</span>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Est. Grocery Savings This Week
            </span>
            <div className="font-editorial text-3xl font-extrabold text-emerald-800 mt-0.5">
              ${stats.estimatedSavings}
            </div>
            <span className="text-[10px] text-stone-600">Through bulk synergy & zero spoilage</span>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 text-center">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
              Shared Ingredients Synergy
            </span>
            <div className="font-editorial text-3xl font-extrabold text-stone-900 mt-0.5">
              {stats.sharedItems} <span className="text-base font-sans text-stone-600 font-normal">items</span>
            </div>
            <span className="text-[10px] text-stone-600">Reused across multiple meals</span>
          </div>
        </div>

        {/* Grouped Grocery Aisles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {Object.entries(consolidatedShoppingList).map(([aisle, items]) => (
            <div
              key={aisle}
              className="bg-white rounded-2xl border border-pink-200/80 p-4 space-y-3 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider border-b border-pink-100 pb-2 flex items-center justify-between">
                  <span>{aisle}</span>
                  <span className="text-[10px] font-bold text-rose-700 bg-pink-100 px-2 py-0.2 rounded-full">
                    {items.length} items
                  </span>
                </h4>

                <div className="divide-y divide-pink-50 space-y-2 pt-2">
                  {items.map((item, idx) => {
                    const isChecked = Boolean(checkedPantryItems[item.name]);
                    return (
                      <div
                        key={idx}
                        onClick={() =>
                          setCheckedPantryItems((prev) => ({
                            ...prev,
                            [item.name]: !prev[item.name]
                          }))
                        }
                        className={`pt-2 first:pt-0 flex items-start gap-2.5 transition-all cursor-pointer select-none text-xs ${
                          isChecked ? 'opacity-40 line-through' : ''
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-[10px] mt-0.5 ${
                            isChecked
                              ? 'bg-emerald-600 text-white font-bold'
                              : 'border border-pink-300 hover:border-rose-500'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-stone-900 leading-snug">
                            {item.totalAmount} {item.unit} {item.name}
                          </div>

                          {/* Zero-Waste Synergy Tag */}
                          {item.isMultiMeal && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-md font-bold mt-1">
                              <span>✨ Shared in {item.usedInMeals.join(', ')}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-[10px] text-stone-600 pt-2 border-t border-pink-50 flex items-center justify-between">
                <span>Tip: Tap checkbox if already in pantry</span>
              </div>
            </div>
          ))}
        </div>

        {/* Circular Kitchen Scrap Chain Blueprint */}
        <div className="p-5 bg-gradient-to-r from-pink-50 via-rose-50/60 to-amber-50/50 rounded-2xl border border-pink-200 space-y-3">
          <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>This Week&apos;s Circular Kitchen Scrap Chain:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white/90 rounded-xl border border-pink-100 space-y-1">
              <strong className="text-stone-900 block font-bold text-[11px]">1. Broccoli & Herb Stems</strong>
              <p className="text-[11px] text-stone-600">
                Tender florets used in Monday dinner ➡️ thick stalks grated into Tuesday lunch fritters with 0% scrap loss.
              </p>
            </div>
            <div className="p-3 bg-white/90 rounded-xl border border-pink-100 space-y-1">
              <strong className="text-stone-900 block font-bold text-[11px]">2. Stale Bread & Crusts</strong>
              <p className="text-[11px] text-stone-600">
                Sandwich loaf heels saved in bread bin ➡️ toasted into Thursday French toast sticks & weekend panzanella salad.
              </p>
            </div>
            <div className="p-3 bg-white/90 rounded-xl border border-pink-100 space-y-1">
              <strong className="text-stone-900 block font-bold text-[11px]">3. Citrus Rinds & Berry Bottoms</strong>
              <p className="text-[11px] text-stone-600">
                Lemon peels infused in cleaning vinegar ➡️ soft bruised berries mashed with chia seeds for breakfast jars.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RECIPE SELECTION MODAL */}
      {selectorModalOpen && targetSlot && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-pink-200 max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                <div>
                  <h4 className="font-editorial text-lg font-bold text-stone-900">
                    Add Recipe to {targetSlot.day} {targetSlot.meal.toUpperCase()}
                  </h4>
                  <p className="text-xs text-stone-500">
                    Choose from chef-tested 100% gluten-free zero-waste rescues.
                  </p>
                </div>
                <button
                  onClick={() => setSelectorModalOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* Recipe List */}
              <div className="divide-y divide-pink-100 max-h-[50vh] overflow-y-auto pr-1 mt-3 space-y-1">
                {allAvailableRecipes.map((r) => (
                  <div
                    key={r.recipeId}
                    onClick={() => assignRecipeToSlot(r)}
                    className="p-3 rounded-xl hover:bg-pink-50 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{r.emoji}</span>
                      <div>
                        <h5 className="text-xs font-bold text-stone-900 group-hover:text-rose-700">
                          {r.title}
                        </h5>
                        <div className="text-[11px] text-stone-500 flex items-center gap-2">
                          <span>⏱️ {r.cookTime}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">Rescues: {r.scrapHero}</span>
                        </div>
                      </div>
                    </div>

                    <button className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold group-hover:bg-rose-700 transition-colors">
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-pink-100 flex justify-end">
              <button
                onClick={() => setSelectorModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
