import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Calculator,
  Utensils,
  ShoppingBag,
  ShieldCheck,
  Settings,
  Menu,
  X,
  ChevronDown,
  Heart
} from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  categories: Category[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  categories,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-pink-200/70 transition-all shadow-xs">
      {/* Top Editorial Notice Bar with Cute Floral Heart */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white text-xs px-4 py-1.5 text-center font-medium flex items-center justify-center gap-2 shadow-xs">
        <span className="text-sm">🌸</span>
        <span>Zero-Waste Floral Kitchen: Discover easy 10-minute recipes & save $1,840/year on groceries!</span>
        <button
          onClick={() => onNavigate('recipes')}
          className="underline hover:text-pink-100 font-bold ml-1 cursor-pointer transition-colors"
        >
          View Easy Recipes ✨
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all text-xl">
                🌸
              </div>
              <div>
                <span className="font-editorial text-2xl font-bold tracking-tight text-stone-900 block leading-tight group-hover:text-rose-600 transition-colors">
                  SavorZero
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-rose-700 block">
                  Floral Zero-Waste & Gluten-Free Kitchen
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  currentView === 'home'
                    ? 'text-rose-700 bg-pink-100 font-extrabold'
                    : 'text-stone-700 hover:text-rose-600 hover:bg-pink-50/70'
                }`}
              >
                Home
              </button>

              {/* Easy Recipes Tab */}
              <button
                onClick={() => onNavigate('recipes')}
                className={`px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                  currentView === 'recipes'
                    ? 'text-rose-700 bg-pink-100 font-extrabold shadow-xs'
                    : 'text-rose-800 hover:text-rose-950 hover:bg-pink-50'
                }`}
              >
                <span>🍓</span>
                <span>Easy Recipes</span>
                <span className="text-[10px] bg-rose-600 text-white px-2 py-0.2 rounded-full font-bold">
                  Quick!
                </span>
              </button>

              {/* Seasonal Meal Planner & Waste-Free Grocery Generator */}
              <button
                onClick={() => onNavigate('planner')}
                className={`px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                  currentView === 'planner'
                    ? 'text-rose-700 bg-pink-100 font-extrabold shadow-xs'
                    : 'text-stone-700 hover:text-rose-600 hover:bg-pink-50/70'
                }`}
              >
                <span>📅</span>
                <span>Meal Planner</span>
                <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.2 rounded-full font-bold">
                  Smart List
                </span>
              </button>

              {/* Food Waste Savings Calculator */}
              <button
                onClick={() => onNavigate('calculator')}
                className={`px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                  currentView === 'calculator'
                    ? 'text-rose-700 bg-pink-100 font-extrabold shadow-xs'
                    : 'text-stone-700 hover:text-rose-600 hover:bg-pink-50/70'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-rose-600" />
                <span>Savings Calculator</span>
                <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                  $ Tool
                </span>
              </button>

              {/* Leftover Rescue AI Tool */}
              <button
                onClick={() => onNavigate('rescue')}
                className={`px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                  currentView === 'rescue'
                    ? 'text-rose-700 bg-pink-100 font-extrabold'
                    : 'text-stone-700 hover:text-rose-600 hover:bg-pink-50/70'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Leftover Rescue</span>
              </button>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                onMouseLeave={() => setCategoryDropdownOpen(false)}
              >
                <button
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1 transition-colors ${
                    currentView === 'category'
                      ? 'text-rose-700 bg-pink-100 font-extrabold'
                      : 'text-stone-700 hover:text-rose-600 hover:bg-pink-50/70'
                  }`}
                >
                  <span>Pillars</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {categoryDropdownOpen && (
                  <div className="absolute left-0 mt-0 w-80 bg-white rounded-2xl shadow-xl border border-pink-200/90 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-1 text-[10px] font-bold text-rose-700 uppercase tracking-wider border-b border-pink-100 mb-2">
                      🌸 6 Editorial Guides
                    </div>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onNavigate('category', cat.slug);
                          setCategoryDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-pink-50/70 transition-colors flex items-start justify-between group"
                      >
                        <div>
                          <div className="text-xs font-bold text-stone-900 group-hover:text-rose-700">
                            {cat.title}
                          </div>
                          <div className="text-[11px] text-stone-500 line-clamp-1">
                            {cat.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tested Eco-Gear (Amazon Affiliates) */}
              <button
                onClick={() => onNavigate('gear')}
                className={`px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                  currentView === 'gear'
                    ? 'text-rose-700 bg-pink-100 font-extrabold'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-pink-50/70'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-stone-600" />
                <span>Tested Gear</span>
              </button>

              {/* About Us */}
              <button
                onClick={() => onNavigate('about')}
                className={`px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1 transition-colors ${
                  currentView === 'about'
                    ? 'text-rose-700 bg-pink-100 font-extrabold'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-pink-50/70'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Editorial Board</span>
              </button>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input / Trigger */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-white border border-pink-300 rounded-xl px-2.5 py-1.5 shadow-sm">
                  <Search className="w-4 h-4 text-pink-600 mr-2" />
                  <input
                    type="text"
                    placeholder="Search recipes, tips..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="text-xs text-stone-800 focus:outline-none w-44 sm:w-60"
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="text-stone-500 hover:text-stone-800 ml-1 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-stone-600 hover:text-rose-600 hover:bg-pink-50 rounded-xl transition-colors cursor-pointer"
                  title="Search articles & recipes"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Admin CMS Access Button */}
            <button
              onClick={() => onNavigate('admin')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-pink-300 hover:text-rose-700 hover:bg-pink-50/50'
              }`}
              title="Editorial CMS & AI Commands"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin CMS</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-rose-600 hover:bg-pink-50 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-pink-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="pb-2 mb-2 border-b border-pink-100">
            <input
              type="text"
              placeholder="Search recipes, zero-waste guides..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-xs bg-pink-50/50 border border-pink-200 rounded-xl px-3 py-2"
            />
          </div>
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-bold text-stone-800 rounded-xl hover:bg-pink-50"
          >
            Home 🌸
          </button>
          <button
            onClick={() => {
              onNavigate('recipes');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-bold text-rose-800 bg-pink-50 rounded-xl flex items-center justify-between"
          >
            <span>🍓 Easy Recipes Box</span>
            <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">
              10-Min
            </span>
          </button>
          <button
            onClick={() => {
              onNavigate('planner');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-bold text-emerald-900 bg-emerald-50 rounded-xl flex items-center justify-between"
          >
            <span>📅 Seasonal Meal Planner</span>
            <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded-full font-bold">
              Smart List
            </span>
          </button>
          <button
            onClick={() => {
              onNavigate('calculator');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-bold text-stone-800 rounded-xl hover:bg-pink-50 flex items-center justify-between"
          >
            <span>💰 Savings Calculator</span>
            <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">
              Tool
            </span>
          </button>
          <button
            onClick={() => {
              onNavigate('rescue');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-bold text-stone-800 rounded-xl hover:bg-pink-50"
          >
            ✨ Leftover Recipe Matcher
          </button>
          <button
            onClick={() => {
              onNavigate('gear');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-bold text-stone-800 rounded-xl hover:bg-pink-50"
          >
            🛍️ Tested Eco-Kitchen Gear
          </button>
          <button
            onClick={() => {
              onNavigate('about');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-bold text-stone-800 rounded-xl hover:bg-pink-50"
          >
            🛡️ Editorial Board & E-E-A-T
          </button>
        </div>
      )}
    </header>
  );
};
