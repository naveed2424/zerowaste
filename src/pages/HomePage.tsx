import React, { useState } from 'react';
import {
  Leaf,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle,
  ShieldCheck,
  Mail,
  Heart,
  Star,
  ShoppingBag,
  ChefHat
} from 'lucide-react';
import { Article, Category, Author, AffiliateProduct, SiteSettings } from '../types';
import { FoodWasteCalculator } from '../components/FoodWasteCalculator';
import { LeftoverRescueTool } from '../components/LeftoverRescueTool';
import { EasyRecipeBox } from '../components/EasyRecipeBox';
import { SeasonalMealPlanner } from '../components/SeasonalMealPlanner';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface HomePageProps {
  articles: Article[];
  categories: Category[];
  authors: Author[];
  affiliateProducts: AffiliateProduct[];
  settings: SiteSettings;
  onNavigate: (view: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  categories,
  authors,
  affiliateProducts,
  settings,
  onNavigate
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  // Identify featured article
  const featuredArticle = articles.find((a) => a.isFeatured) || articles[0];
  const sideTrendingArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);
  const remainingArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, interests: ['gluten-free', 'zero-waste'] })
      });
      const data = await res.json();
      if (data.success) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
      }
    } catch {
      setNewsletterStatus('error');
    }
  };

  const getAuthor = (authorId: string) => {
    return authors.find((a) => a.id === authorId) || authors[0];
  };

  const getCategory = (catSlug: string) => {
    return categories.find((c) => c.slug === catSlug) || categories[0];
  };

  return (
    <div className="space-y-16 pb-16 relative">
      {/* AdSense Top Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <AdSenseBanner slot="leaderboard" clientId={settings.adsenseClientId} enabled={settings.adsenseEnabled} />
      </div>

      {/* Hero Welcome with Soft Pastel Foodie & Flower Accent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 pt-2">
          <div className="inline-flex items-center gap-2 bg-pink-100/90 border border-pink-200 text-rose-800 text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <span>🌸</span>
            <span>Mindful Kitchen • Zero Food Waste • 100% Gluten-Free</span>
            <span>🍓</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Delicious Kitchen Magic with Zero Food Waste
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Turn leftover crusts into golden pastries, rescue wilted berries into floral parfaits, and discover how much grocery money you can save with simple mindful habits!
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('recipes')}
              className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>🍓</span>
              <span>Easy 10-Min Recipes</span>
            </button>
            <button
              onClick={() => onNavigate('planner')}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>📅</span>
              <span>Seasonal Meal Planner</span>
              <span className="text-[10px] bg-emerald-600 px-1.5 py-0.2 rounded-full font-bold">New</span>
            </button>
            <button
              onClick={() => onNavigate('calculator')}
              className="px-5 py-2.5 bg-white hover:bg-pink-50 text-stone-800 border border-pink-200 text-xs font-bold rounded-2xl shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>💰</span>
              <span>Savings Calculator</span>
            </button>
          </div>
        </div>

        {/* Hero Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Featured Lead Story (8 cols) */}
          {featuredArticle && (
            <div className="lg:col-span-8 bg-white/95 backdrop-blur-md rounded-3xl border border-pink-200/80 shadow-md overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all foodie-card">
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                <img
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-rose-900/90 backdrop-blur-md text-pink-100 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl shadow-xs flex items-center gap-1.5">
                  <span>🌸</span>
                  <span>{getCategory(featuredArticle.category)?.title || 'Featured Guide'}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 text-xs text-stone-500 mb-3 font-medium">
                    <span className="flex items-center gap-1 font-bold text-rose-700">
                      <Clock className="w-3.5 h-3.5 text-pink-600" />
                      {featuredArticle.readingTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Updated {featuredArticle.lastUpdated}
                    </span>
                  </div>

                  <h2
                    onClick={() => onNavigate('article', featuredArticle.slug)}
                    className="font-editorial text-2xl sm:text-3xl font-extrabold text-stone-900 group-hover:text-rose-700 transition-colors cursor-pointer leading-tight mb-3"
                  >
                    {featuredArticle.title}
                  </h2>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-pink-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={getAuthor(featuredArticle.author)?.avatar}
                      alt={getAuthor(featuredArticle.author)?.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-rose-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        {getAuthor(featuredArticle.author)?.name}
                      </div>
                      <div className="text-[11px] text-rose-700 font-medium">
                        {getAuthor(featuredArticle.author)?.role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('article', featuredArticle.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 uppercase tracking-wider group-hover:translate-x-1 transition-transform cursor-pointer bg-pink-50 hover:bg-pink-100 px-3.5 py-1.5 rounded-xl border border-pink-200"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Side Trending / Most Read Stories (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-pink-200/80 p-6 sm:p-7 shadow-sm foodie-card">
              <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-rose-600" />
                  <span>Trending Kitchen Inquiries</span>
                </span>
                <span className="text-[11px] text-rose-800 font-bold bg-pink-100 px-2 py-0.5 rounded-full">
                  Top Read
                </span>
              </div>

              <div className="divide-y divide-pink-100 space-y-4">
                {sideTrendingArticles.map((art, idx) => (
                  <div
                    key={art.id}
                    onClick={() => onNavigate('article', art.slug)}
                    className="pt-4 first:pt-0 group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-editorial text-2xl font-bold text-pink-300 group-hover:text-rose-600 transition-colors">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                          {getCategory(art.category)?.title}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-rose-700 transition-colors line-clamp-2 leading-snug">
                          {art.title}
                        </h3>
                        <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-2">
                          <span>{art.readingTime}</span>
                          <span>•</span>
                          <span>By {getAuthor(art.author)?.name.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Recipe Teaser Box */}
            <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-amber-500 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-white/20 px-2 py-0.5 rounded-full text-pink-50 inline-block mb-2">
                  🍓 Quick Kitchen Hack
                </span>
                <h3 className="font-editorial text-xl font-bold mb-1.5">
                  Got Bruised Berries or Stale Bread?
                </h3>
                <p className="text-xs text-pink-100 leading-relaxed">
                  Don&apos;t toss them! Turn them into 8-minute French toast sticks or delicious berry rose chia jam in under 10 minutes.
                </p>
              </div>

              <button
                onClick={() => onNavigate('recipes')}
                className="mt-4 w-full py-2.5 px-4 bg-white text-rose-800 font-bold text-xs rounded-xl hover:bg-pink-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              >
                <span>Open Easy Recipe Box 🌸</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW CORE HIGHLIGHT: The Easy Zero-Waste Recipe Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EasyRecipeBox />
      </section>

      {/* CORE TOOL: Food Waste & Grocery Savings Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FoodWasteCalculator affiliateProducts={affiliateProducts} onNavigate={onNavigate} />
      </section>

      {/* NEW FEATURE: Seasonal Meal Planner & Waste-Free Consolidated Grocery List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SeasonalMealPlanner />
      </section>

      {/* The 6 Main Editorial Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-pink-200 pb-4">
          <div>
            <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>🌸</span>
              <span>Editorial Architecture</span>
            </div>
            <h2 className="font-editorial text-3xl font-bold text-stone-900">
              The Six Main Content Pillars
            </h2>
          </div>
          <p className="text-xs text-stone-600 max-w-md mt-2 sm:mt-0">
            Researched and fact-checked by our clinical nutritionists and zero-waste chefs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('category', cat.slug)}
              className="bg-white rounded-3xl border border-pink-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between foodie-card"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-[11px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                    {cat.articleCount || 3} Published Inquiries
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-stone-900 group-hover:text-rose-700 transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-rose-700 group-hover:text-rose-900">
                  <span>Explore Topic Archive</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leftover Rescue & Recipe Tool Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeftoverRescueTool />
      </section>

      {/* In-Article / Mid-Page AdSense Unit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSenseBanner slot="in-article" clientId={settings.adsenseClientId} enabled={settings.adsenseEnabled} />
      </div>

      {/* Latest Published Editorial Inquiries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-pink-200 pb-4">
          <div>
            <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
              Evidence-Based Guides
            </div>
            <h2 className="font-editorial text-3xl font-bold text-stone-900">
              Latest Published Articles
            </h2>
          </div>
          <span className="text-xs text-stone-500 mt-2 sm:mt-0 font-medium">
            🌸 AdSense-Compliant • 100% Original Editorial Research
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate('article', article.slug)}
              className="bg-white rounded-3xl border border-pink-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between foodie-card"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                    {getCategory(article.category)?.title}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
                    <span className="font-bold text-rose-700">{article.readingTime}</span>
                    <span>•</span>
                    <span>{article.publishDate}</span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-stone-900 group-hover:text-rose-700 transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-pink-100 flex items-center justify-between text-xs">
                <span className="text-stone-700 font-medium">
                  By {getAuthor(article.author)?.name.split(',')[0]}
                </span>
                <span className="font-bold text-rose-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Curated Tested Amazon Kitchen Gear (Affiliate Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-rose-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-pink-500/20 text-pink-200 border border-pink-400/30 text-xs font-bold px-3.5 py-1 rounded-full mb-3">
              <ShoppingBag className="w-3.5 h-3.5 text-pink-300" />
              <span>Tested & Verified Kitchen Equipment (Amazon Affiliate)</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold mb-3">
              Kitchen Gear That Pays for Itself
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              We spent 6 months testing 30+ reusable kitchen tools. These verified selections prevent oxygen degradation, eliminate single-use plastic film, and preserve expensive gluten-free staples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {affiliateProducts.map((p) => (
              <div
                key={p.id}
                className="bg-stone-800/90 border border-stone-700 hover:border-pink-400 rounded-2xl p-5 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 mb-3">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-pink-300 uppercase tracking-wider">
                      {p.badge}
                    </span>
                    <span className="text-xs font-bold text-white">{p.price}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 mb-2">
                    {p.name}
                  </h4>
                  <div className="text-[11px] text-amber-300 mb-2">
                    ★ {p.rating} ({p.reviewCount.toLocaleString()} reviews)
                  </div>
                </div>

                <a
                  href={p.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl transition-all text-center block mt-2 shadow-xs"
                >
                  View on Amazon →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2 relative z-10">
            <span>* FTC Disclosure: SavorZero earns affiliate fees on qualifying Amazon purchases at no extra cost to you.</span>
            <button
              onClick={() => onNavigate('gear')}
              className="text-pink-300 hover:text-pink-200 font-semibold underline"
            >
              Read our full 2026 Kitchen Gear Testing Methodology →
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Lead Magnet */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-pink-50 via-rose-50/50 to-amber-50/40 border border-pink-200 rounded-3xl p-8 sm:p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white mx-auto flex items-center justify-center mb-4 shadow-sm text-xl">
            🌸
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
            Free 7-Day Zero-Waste Gluten-Free Meal Plan & Recipe Book
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            Download our weekly grocery prep guide with quick 10-minute dinner recipes, scrap preservation tips, and our staple list that cuts $35/week off grocery bills.
          </p>

          {newsletterStatus === 'success' ? (
            <div className="p-4 bg-emerald-100 text-emerald-900 rounded-2xl text-xs font-bold inline-flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>Success! Your 7-Day Recipe PDF is on its way to your inbox! 🌸✨</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 bg-white border border-pink-200 rounded-xl px-4 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Send Free PDF 🍓
              </button>
            </form>
          )}

          <div className="text-[11px] text-stone-500 mt-3">
            Zero spam. Unsubscribe anytime with 1-click. Compliant with GDPR/CCPA privacy standards.
          </div>
        </div>
      </section>

      {/* E-E-A-T Editorial Credibility & Trust Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-pink-200/80 p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-pink-100 text-rose-700 flex items-center justify-center font-bold text-lg">
                🌸
              </div>
              <h4 className="font-editorial text-base font-bold text-stone-900">
                Peer-Reviewed Clinical Nutrition
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every gluten-free culinary guide is audited by registered dietitians for strict celiac cross-contamination safety protocols.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                🌿
              </div>
              <h4 className="font-editorial text-base font-bold text-stone-900">
                Circular Kitchen Philosophy
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Zero-waste is not an aesthetic—it is a culinary engineering discipline that cuts landfill methane and household costs.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-lg">
                ✨
              </div>
              <h4 className="font-editorial text-base font-bold text-stone-900">
                Zero Deceptive Marketing
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clear separation between our independent editorial tests, Google AdSense units, and verified Amazon Associate product recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
