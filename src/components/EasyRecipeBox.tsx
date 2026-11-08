import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  Heart,
  ChefHat,
  Check,
  RotateCcw,
  Play,
  Pause,
  Award,
  ArrowRight,
  Flame,
  Volume2
} from 'lucide-react';

export interface EasyRecipe {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  difficulty: 'Super Easy' | '10-Min Quick' | 'No-Cook';
  scrapHero: string;
  moneySaved: string;
  category: 'sweet' | 'savory' | 'snack';
  image: string;
  servingsBase: number;
  ingredients: { amount: number; unit: string; name: string }[];
  steps: string[];
  chefTip: string;
  flowerGarnishIdea: string;
}

export const EASY_RECIPES: EasyRecipe[] = [
  {
    id: 'berry-chia-parfait',
    title: '10-Minute Bruised Berry & Chia Rose Parfait',
    emoji: '🍓',
    tagline: 'Rescues soft, bruised strawberries and raspberries into a dreamy floral breakfast bowl',
    prepTime: '5 mins',
    cookTime: '0 mins',
    totalTime: '10 mins',
    difficulty: 'No-Cook',
    scrapHero: 'Soft / Bruised Strawberries & Blackberries',
    moneySaved: '$6.50 vs cafe smoothie',
    category: 'sweet',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    servingsBase: 2,
    ingredients: [
      { amount: 1.5, unit: 'cups', name: 'bruised or soft berries (mashed with a fork)' },
      { amount: 3, unit: 'tbsp', name: 'black or white chia seeds' },
      { amount: 1, unit: 'cup', name: 'creamy almond, oat, or Greek coconut yogurt' },
      { amount: 1, unit: 'tbsp', name: 'pure maple syrup or floral honey' },
      { amount: 0.5, unit: 'tsp', name: 'vanilla extract or rosewater' },
      { amount: 2, unit: 'tbsp', name: 'certified gluten-free granola or toasted coconut' },
      { amount: 1, unit: 'pinch', name: 'edible dried rose petals or fresh mint (optional)' }
    ],
    steps: [
      'Gently wash soft berries. Instead of tossing bruised edges, roughly mash them in a pretty glass bowl with maple syrup and vanilla.',
      'In a small jar, stir chia seeds into 1/4 cup warm water or milk and let swell for 3 minutes until thick and jammy.',
      'Fold the quick chia jam together with half of the mashed berry compote.',
      'Layer your dessert glasses: 2 spoonfuls of yogurt, 2 spoonfuls of berry chia compote, repeat.',
      'Top with crispy gluten-free granola, a berry heart, and delicate edible flower petals for a bakery-worthy treat!'
    ],
    chefTip: 'Never throw away soft berries! Freezing them on a tray or turning them into chia jam halts mold and gives you 7 days of breakfast bliss.',
    flowerGarnishIdea: 'Dust with organic dried rose petals or fresh lavender buds for a fragrant cottagecore finish.'
  },
  {
    id: 'cinnamon-french-toast-sticks',
    title: '8-Minute Crispy Cinnamon French Toast Sticks',
    emoji: '🥖',
    tagline: 'Transforms stone-hard gluten-free bread slices into golden, buttery dippers',
    prepTime: '3 mins',
    cookTime: '5 mins',
    totalTime: '8 mins',
    difficulty: 'Super Easy',
    scrapHero: 'Dry / Stale Gluten-Free Bread Loaves',
    moneySaved: '$8.00 rescued bread',
    category: 'sweet',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80',
    servingsBase: 2,
    ingredients: [
      { amount: 4, unit: 'thick slices', name: 'stale, dry gluten-free bread' },
      { amount: 2, unit: 'large', name: 'eggs (or 1/2 cup almond milk + 1 tbsp cornstarch)' },
      { amount: 0.25, unit: 'cup', name: 'milk of choice' },
      { amount: 1, unit: 'tsp', name: 'ground cinnamon' },
      { amount: 1, unit: 'tsp', name: 'vanilla bean paste' },
      { amount: 2, unit: 'tbsp', name: 'butter or coconut oil for frying' },
      { amount: 2, unit: 'tbsp', name: 'cinnamon sugar for coating' }
    ],
    steps: [
      'Slice stale dry gluten-free bread into thick 1-inch "finger" sticks.',
      'In a shallow rimmed dish, whisk together eggs, milk, cinnamon, and vanilla until smooth and frothy.',
      'Dip bread sticks for 5 seconds per side. Stale dry bread drinks up the custard without getting soggy!',
      'Melt butter in a skillet over medium heat. Fry sticks for 2 minutes per side until deeply golden and crispy.',
      'Immediately roll in cinnamon sugar while warm. Serve with warm maple syrup or fruit drizzle.'
    ],
    chefTip: 'Gluten-free bread is actually better when stale for French toast because the dry crumb holds structural integrity in the pan.',
    flowerGarnishIdea: 'Serve on a vintage plate dusted with powdered sugar and a fresh edible pansy.'
  },
  {
    id: 'broccoli-cheddar-fritters',
    title: 'Golden 3-Ingredient Broccoli Stem & Cheddar Fritters',
    emoji: '🥦',
    tagline: 'Grates thick, tough broccoli and cauliflower stalks into crunchy cheesy bites',
    prepTime: '5 mins',
    cookTime: '6 mins',
    totalTime: '11 mins',
    difficulty: 'Super Easy',
    scrapHero: 'Tough Broccoli Stems & Crowns',
    moneySaved: '$5.20 grocery value',
    category: 'savory',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    servingsBase: 2,
    ingredients: [
      { amount: 2, unit: 'cups', name: 'grated broccoli stems (outer woody peel shaved off)' },
      { amount: 0.75, unit: 'cup', name: 'sharp cheddar or parmesan, finely shredded' },
      { amount: 1, unit: 'large', name: 'egg' },
      { amount: 2, unit: 'tbsp', name: 'gluten-free flour, almond meal, or cornstarch' },
      { amount: 0.5, unit: 'tsp', name: 'garlic powder, sea salt & black pepper' },
      { amount: 1.5, unit: 'tbsp', name: 'olive oil for pan-crisping' }
    ],
    steps: [
      'Use a box grater to shred broccoli stalks into delicate matchstick shreds.',
      'In a bowl, toss shredded broccoli stems, cheddar, egg, gluten-free flour, garlic powder, and salt together until slightly sticky.',
      'Heat olive oil in a non-stick pan over medium heat.',
      'Drop 4 small mounds into the pan and press flat with a spatula into round patties.',
      'Cook 3 minutes until cheese forms a crispy lace rim, flip and cook 2 more minutes. Serve with garlic herb yogurt dip!'
    ],
    chefTip: 'Broccoli stems have more vitamin C and sweetness than the florets! Don’t throw away half the vegetable weight.',
    flowerGarnishIdea: 'Garnish with yellow mustard flowers or micro-greens for a garden pop.'
  },
  {
    id: 'velvety-herb-stem-pasta',
    title: '15-Minute Velvety Scrap Herb & Garlic Pasta',
    emoji: '🍝',
    tagline: 'Blends leftover parsley, cilantro stems and limp spinach into bright green velvet sauce',
    prepTime: '5 mins',
    cookTime: '10 mins',
    totalTime: '15 mins',
    difficulty: '10-Min Quick',
    scrapHero: 'Herb Stems & Wilted Greens',
    moneySaved: '$7.50 pesto jar savings',
    category: 'savory',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281741?auto=format&fit=crop&w=800&q=80',
    servingsBase: 2,
    ingredients: [
      { amount: 8, unit: 'oz', name: 'gluten-free pasta (penne, spaghetti, or fusilli)' },
      { amount: 2, unit: 'cups', name: 'herb stems (parsley, cilantro, basil) & wilted spinach' },
      { amount: 0.33, unit: 'cup', name: 'extra-virgin olive oil' },
      { amount: 2, unit: 'cloves', name: 'garlic, smashed' },
      { amount: 0.33, unit: 'cup', name: 'grated parmesan or nutritional yeast' },
      { amount: 1, unit: 'tbsp', name: 'fresh lemon juice' },
      { amount: 0.25, unit: 'cup', name: 'reserved starchy pasta cooking water' }
    ],
    steps: [
      'Boil gluten-free pasta in salted water according to box instructions. Save 1/4 cup hot pasta water before draining!',
      'While pasta boils, toss herb stems, garlic, olive oil, parmesan, lemon juice, salt, and pepper into a high-speed blender.',
      'Blend for 60 seconds until a silky, bright emerald-green sauce forms.',
      'Toss drained hot pasta directly in the pan with the green herb sauce and a splash of reserved hot pasta water.',
      'Stir vigorously for 30 seconds until the sauce clings like glossy velvet. Finish with cracked pink peppercorns!'
    ],
    chefTip: 'Herb stems hold the highest concentration of aromatic essential oils. Blending them breaks down the fibers into silky perfection.',
    flowerGarnishIdea: 'Sprinkle with fresh borage blossoms or chive flowers for romantic color.'
  },
  {
    id: 'single-bowl-banana-cookies',
    title: 'Single-Bowl 3-Ingredient Overripe Banana Oat Bites',
    emoji: '🍌',
    tagline: 'Only 3 ingredients! No flour, no refined sugar, and saves spotted brown bananas',
    prepTime: '4 mins',
    cookTime: '12 mins',
    totalTime: '16 mins',
    difficulty: 'Super Easy',
    scrapHero: 'Overripe Black-Spotted Bananas',
    moneySaved: '$4.00 snack savings',
    category: 'sweet',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    servingsBase: 3,
    ingredients: [
      { amount: 2, unit: 'medium', name: 'very ripe, spotted brown bananas' },
      { amount: 1.25, unit: 'cups', name: 'certified gluten-free rolled oats' },
      { amount: 0.33, unit: 'cup', name: 'dark chocolate chips, dried cranberries, or walnut bits' },
      { amount: 0.5, unit: 'tsp', name: 'cinnamon & pinch of pink sea salt' }
    ],
    steps: [
      'Preheat oven or toaster oven to 350°F (175°C) and line a baking sheet with parchment.',
      'In a mixing bowl, mash the spotted bananas with a fork until smooth and liquid.',
      'Pour in gluten-free oats, cinnamon, and chocolate chips. Stir together until a thick, spoonable dough forms.',
      'Scoop 8 round dollops onto the baking sheet and gently flatten into cute cookie rounds.',
      'Bake for 12 minutes until edges are set and golden. Soft, chewy, and naturally sweet!'
    ],
    chefTip: 'The browner the banana peels, the higher the natural fructose and sweeter the cookies—zero added sugar needed!',
    flowerGarnishIdea: 'Serve on a floral napkin alongside a cup of chamomile or rosebud tea.'
  },
  {
    id: 'lemon-herb-crunchy-chickpeas',
    title: 'Crispy Lemon Peel & Herb Roasted Crunchy Chickpeas',
    emoji: '🍋',
    tagline: 'Turns squeezed lemon rinds and herb stems into a zesty, high-protein snack',
    prepTime: '5 mins',
    cookTime: '20 mins',
    totalTime: '25 mins',
    difficulty: 'Super Easy',
    scrapHero: 'Squeezed Lemon Peels & Dried Herbs',
    moneySaved: '$4.50 chip savings',
    category: 'snack',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    servingsBase: 2,
    ingredients: [
      { amount: 1, unit: 'can (15 oz)', name: 'cooked chickpeas (rinsed and thoroughly dried with a towel)' },
      { amount: 1, unit: 'tbsp', name: 'lemon peel, finely grated (from squeezed lemons)' },
      { amount: 1.5, unit: 'tbsp', name: 'olive oil' },
      { amount: 1, unit: 'tsp', name: 'dried thyme, oregano, or rosemary stems crushed' },
      { amount: 0.5, unit: 'tsp', name: 'smoked paprika, garlic powder, and flaky sea salt' }
    ],
    steps: [
      'Rub chickpeas in a clean towel until completely dry (dry chickpeas = ultimate crunch!).',
      'Toss chickpeas with olive oil, finely grated lemon peel zest, crushed dried herbs, and spices.',
      'Spread onto a baking sheet in a single layer with breathing room.',
      'Roast at 400°F (200°C) for 20 minutes (or air fry for 12 mins at 390°F) until shatteringly crisp.',
      'Let cool for 5 minutes—they get crunchier as they cool! Enjoy as a wholesome snack or salad crouton.'
    ],
    chefTip: 'Before discarding squeezed lemons into the compost, always zest them! Keep a jar of dried citrus zest in the spice cabinet.',
    flowerGarnishIdea: 'Toss with edible calendula petals for vibrant yellow sunshine contrast.'
  }
];

export const EasyRecipeBox: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<EasyRecipe>(EASY_RECIPES[0]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'sweet' | 'savory' | 'snack'>('all');
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isCookMode, setIsCookMode] = useState<boolean>(false);

  // Kitchen Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(300); // 5 mins
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerInitial, setTimerInitial] = useState<number>(300);

  // Surprise random recipe
  const handleSurpriseMe = () => {
    const remaining = EASY_RECIPES.filter((r) => r.id !== selectedRecipe.id);
    const random = remaining[Math.floor(Math.random() * remaining.length)];
    setSelectedRecipe(random);
    setCheckedIngredients({});
    setCompletedSteps({});
  };

  // Switch recipe
  const selectRecipe = (recipe: EasyRecipe) => {
    setSelectedRecipe(recipe);
    setCheckedIngredients({});
    setCompletedSteps({});
  };

  // Toggle ingredient
  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Toggle step
  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Filtered recipes
  const filteredRecipes = filterCategory === 'all'
    ? EASY_RECIPES
    : EASY_RECIPES.filter((r) => r.category === filterCategory);

  // Timer tick
  React.useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const setTimerPreset = (minutes: number) => {
    const sec = minutes * 60;
    setTimerInitial(sec);
    setTimerSeconds(sec);
    setTimerRunning(false);
  };

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-pink-200/80 shadow-xl overflow-hidden my-8 foodie-card relative">
      {/* Decorative Floral Header Corner Motif */}
      <div className="absolute top-2 right-4 text-3xl select-none opacity-40 pointer-events-none">
        🌸 🌿 🍓
      </div>

      {/* Header Banner - Girly, Foodie, Warm Rose Palette */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white p-6 sm:p-10 relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1 rounded-full text-xs font-semibold text-pink-50 mb-3">
            <span className="text-base">🌸</span>
            <span>Zero-Waste Kitchen Magic • Quick & Super Easy</span>
            <span className="text-base">✨</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 drop-shadow-xs">
            The Easy Zero-Waste Recipe Box
          </h2>

          <p className="text-pink-100 text-sm sm:text-base leading-relaxed max-w-2xl">
            Wholesome, 100% gluten-free treats and 10-minute meals that rescue lonely fridge leftovers. Delicious, foolproof, and decorated with love!
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSurpriseMe}
              className="px-4 py-2 bg-white text-pink-700 hover:bg-pink-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Surprise Me with an Easy Recipe! 🎲</span>
            </button>

            <button
              onClick={() => setIsCookMode(!isCookMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                isCookMode
                  ? 'bg-rose-900 text-white border-rose-800 shadow-inner'
                  : 'bg-pink-600/80 hover:bg-pink-600 text-white border-white/30'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>{isCookMode ? 'Exit Cooking Mode' : 'Enter Interactive Cooking Mode 👩‍🍳'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="bg-pink-50/70 border-b border-pink-100 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-pink-900 uppercase tracking-wider flex items-center gap-1 mr-1">
            <span>Filter Cravings:</span>
          </span>
          {[
            { id: 'all', label: 'All Recipes 🌸' },
            { id: 'sweet', label: 'Sweet Treats 🍓' },
            { id: 'savory', label: 'Savory & Cheesy 🧀' },
            { id: 'snack', label: 'Crunchy Snacks 🥨' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-pink-100 border border-pink-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-rose-800 font-semibold flex items-center gap-1">
          <span>{filteredRecipes.length} Quick Rescues Ready</span>
        </div>
      </div>

      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Quick Recipe Cards Carousel / Selector */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center justify-between border-b border-pink-100 pb-2">
            <span>Select a Recipe to Make:</span>
            <span className="text-[11px] text-pink-700 font-normal">Tap to inspect</span>
          </h3>

          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {filteredRecipes.map((recipe) => {
              const isSelected = selectedRecipe.id === recipe.id;
              return (
                <div
                  key={recipe.id}
                  onClick={() => selectRecipe(recipe)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 relative overflow-hidden group ${
                    isSelected
                      ? 'border-rose-400 bg-rose-50/80 shadow-md ring-2 ring-rose-300/40'
                      : 'border-stone-200/80 bg-white hover:border-pink-300 hover:bg-pink-50/30'
                  }`}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-16 h-16 rounded-xl object-cover border border-pink-100 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold text-rose-700 bg-pink-100 px-2 py-0.5 rounded-full">
                        {recipe.emoji} {recipe.difficulty}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {recipe.moneySaved}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-rose-800 transition-colors">
                      {recipe.title}
                    </h4>

                    <div className="text-[11px] text-stone-600 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 font-medium text-stone-700">
                        <Clock className="w-3 h-3 text-pink-600" />
                        {recipe.totalTime}
                      </span>
                      <span>•</span>
                      <span className="truncate text-rose-800 font-medium">
                        Saves: {recipe.scrapHero}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cute Kitchen Mini Timer Widget */}
          <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-100/60 border border-pink-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-600" />
                <span>Mini Kitchen Timer</span>
              </span>
              <span className="font-mono text-base font-extrabold text-rose-900 bg-white px-2.5 py-0.5 rounded-lg border border-pink-200 shadow-xs">
                {formatTime(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[3, 5, 10, 15].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTimerPreset(m)}
                    className="px-2 py-1 bg-white hover:bg-pink-100 text-stone-700 rounded-md text-[10px] font-bold border border-pink-200 transition-colors cursor-pointer"
                  >
                    {m}m
                  </button>
                ))}
              </div>

              <div className="flex-1 flex justify-end gap-1.5">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                    timerRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{timerRunning ? 'Pause' : 'Start'}</span>
                </button>
                <button
                  onClick={() => {
                    setTimerSeconds(timerInitial);
                    setTimerRunning(false);
                  }}
                  className="p-1 text-stone-600 hover:text-stone-900 bg-white rounded-lg border border-pink-200 cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {timerSeconds === 0 && (
              <div className="text-[11px] font-bold text-rose-800 text-center animate-bounce">
                Ding! Timer is up! Check your yummy food! 🍓✨
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Full Recipe Details & Cook Mode */}
        <div className="lg:col-span-7 bg-[#FFFDF9] border border-pink-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Recipe Title & Hero Details */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-pink-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{selectedRecipe.emoji}</span>
                <span className="text-xs font-bold text-rose-800 bg-pink-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {selectedRecipe.difficulty} • 100% Gluten-Free
                </span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {selectedRecipe.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 italic">
                {selectedRecipe.tagline}
              </p>
            </div>

            <div className="flex sm:flex-col items-end gap-1 shrink-0">
              <span className="text-[11px] text-stone-600">Total Time</span>
              <span className="text-sm font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl">
                {selectedRecipe.totalTime}
              </span>
            </div>
          </div>

          {/* Servings Scaler */}
          <div className="p-3 bg-pink-50/60 rounded-xl border border-pink-100 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <span>Portion Scaler:</span>
              <span className="text-rose-700 font-normal text-[11px]">
                (Serving {selectedRecipe.servingsBase * servingsMultiplier} {selectedRecipe.servingsBase * servingsMultiplier === 1 ? 'person' : 'people'})
              </span>
            </span>

            <div className="flex items-center gap-1">
              {[1, 2, 4].map((mult) => (
                <button
                  key={mult}
                  onClick={() => setServingsMultiplier(mult)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    servingsMultiplier === mult
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-pink-100 border border-pink-200'
                  }`}
                >
                  {mult}x
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients Checklist */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>Ingredients Checklist</span>
                <span className="text-[10px] text-pink-700 font-normal">
                  (Tap to check off as you grab them 🌸)
                </span>
              </h4>
              <span className="text-[11px] text-stone-600">
                {Object.values(checkedIngredients).filter(Boolean).length} / {selectedRecipe.ingredients.length} ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedRecipe.ingredients.map((ing, idx) => {
                const isChecked = Boolean(checkedIngredients[idx]);
                const scaledAmount = Number((ing.amount * servingsMultiplier).toFixed(2));
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-300 text-stone-600 line-through'
                        : 'bg-white border-stone-200 hover:border-pink-300 text-stone-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 text-[10px] transition-colors ${
                        isChecked ? 'bg-emerald-600 text-white font-bold' : 'border border-stone-300'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3" />}
                    </div>
                    <span className="leading-tight">
                      <strong className="font-semibold text-stone-900">
                        {scaledAmount} {ing.unit}
                      </strong>{' '}
                      {ing.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step-by-Step Cooking Walkthrough */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Step-by-Step Preparation:
            </h4>

            <div className="space-y-2.5">
              {selectedRecipe.steps.map((step, idx) => {
                const isDone = Boolean(completedSteps[idx]);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${
                      isDone
                        ? 'bg-pink-50/70 border-pink-300 text-stone-600 opacity-80'
                        : 'bg-white border-stone-200 hover:border-pink-300 text-stone-800'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                        isDone
                          ? 'bg-pink-600 text-white'
                          : 'bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </span>
                    <p className={`leading-relaxed flex-1 ${isDone ? 'line-through' : ''}`}>
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floral Presentation Idea */}
          <div className="p-4 bg-gradient-to-r from-pink-50 to-amber-50 rounded-2xl border border-pink-200/80 flex items-start gap-3">
            <span className="text-xl">🌸</span>
            <div className="text-xs leading-relaxed">
              <strong className="font-bold text-pink-950 block mb-0.5">
                Floral Aesthetic Touch:
              </strong>
              <span className="text-pink-900">{selectedRecipe.flowerGarnishIdea}</span>
            </div>
          </div>

          {/* Chef Zero-Waste Secret */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div className="text-xs leading-relaxed">
              <strong className="font-bold text-emerald-950 block mb-0.5">
                Zero-Waste Culinary Secret:
              </strong>
              <span className="text-emerald-900">{selectedRecipe.chefTip}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
