import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { FloatingPetals } from './components/FloatingPetals';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { GearPage } from './pages/GearPage';
import { LegalPage } from './pages/LegalPage';
import { AdminCMS } from './pages/AdminCMS';
import { FoodWasteCalculator } from './components/FoodWasteCalculator';
import { LeftoverRescueTool } from './components/LeftoverRescueTool';
import { EasyRecipeBox } from './components/EasyRecipeBox';
import { SeasonalMealPlanner } from './components/SeasonalMealPlanner';
import { Article, Category, Author, AffiliateProduct, SiteSettings } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [affiliateProducts, setAffiliateProducts] = useState<AffiliateProduct[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'SavorZero',
    tagline: 'Floral Zero-Waste & Gluten-Free Kitchen',
    description: 'The premier editorial publication for zero-waste food preservation and gluten-free culinary treats.',
    contactEmail: 'editorial@savorzero.org',
    adsenseClientId: 'ca-pub-9842109842109842',
    adsenseEnabled: true,
    inArticleAds: true,
    amazonAssociateTag: 'savorzero-20',
    adsTxtContent: 'google.com, pub-9842109842109842, DIRECT, f08c47fec0942fa0\namazon.com, savorzero-20, DIRECT',
    autoPublishEnabled: false,
    dailyWorkflowTime: '08:00 AM UTC'
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch initial database items from Express API
  const refreshData = async () => {
    try {
      const [artRes, catRes, authRes, affRes, setRes] = await Promise.all([
        fetch('/api/articles?includeDrafts=true').then((r) => r.json()),
        fetch('/api/categories').then((r) => r.json()),
        fetch('/api/authors').then((r) => r.json()),
        fetch('/api/affiliate-products').then((r) => r.json()),
        fetch('/api/settings').then((r) => r.json())
      ]);

      if (artRes.success) setArticles(artRes.articles);
      if (catRes.success) setCategories(catRes.categories);
      if (authRes.success) setAuthors(authRes.authors);
      if (affRes.success) setAffiliateProducts(affRes.products);
      if (setRes.success) setSettings(setRes.settings);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();

    // Browser URL popstate handler
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setCurrentView('home');
      } else if (path.startsWith('/category/')) {
        setCurrentView('category');
        setViewParam(path.replace('/category/', ''));
      } else if (path.startsWith('/article/')) {
        setCurrentView('article');
        setViewParam(path.replace('/article/', ''));
      } else if (path === '/recipes') {
        setCurrentView('recipes');
      } else if (path === '/planner') {
        setCurrentView('planner');
      } else if (path === '/calculator') {
        setCurrentView('calculator');
      } else if (path === '/rescue') {
        setCurrentView('rescue');
      } else if (path === '/gear') {
        setCurrentView('gear');
      } else if (path === '/admin') {
        setCurrentView('admin');
      } else if (
        ['/about', '/contact', '/privacy', '/cookie-policy', '/terms', '/editorial-policy', '/affiliate-disclosure'].includes(
          path
        )
      ) {
        setCurrentView(path.replace('/', ''));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL
    let newPath = '/';
    if (view === 'home') newPath = '/';
    else if (view === 'category' && param) newPath = `/category/${param}`;
    else if (view === 'article' && param) newPath = `/article/${param}`;
    else if (view === 'recipes') newPath = '/recipes';
    else if (view === 'planner') newPath = '/planner';
    else if (view === 'calculator') newPath = '/calculator';
    else if (view === 'rescue') newPath = '/rescue';
    else if (view === 'gear') newPath = '/gear';
    else if (view === 'admin') newPath = '/admin';
    else newPath = `/${view}`;

    window.history.pushState({}, '', newPath);
  };

  // Filter articles by search query if present
  const displayArticles = searchQuery.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.primaryKeyword?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : articles;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-stone-900 selection:bg-pink-100 selection:text-pink-950 font-sans relative">
      {/* Animated Floating Petals (Cherry blossoms & rose petals in the background!) */}
      <FloatingPetals />

      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        categories={categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Router */}
      <main className="flex-1 relative z-20">
        {searchQuery.trim() && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white/95 border border-pink-200 rounded-3xl p-6 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-editorial text-xl font-bold text-stone-900 flex items-center gap-2">
                  <span>🌸 Search Results for: &quot;{searchQuery}&quot;</span>
                  <span className="text-xs text-rose-700 font-normal">
                    ({displayArticles.length} guides found)
                  </span>
                </h3>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-semibold text-rose-700 hover:underline"
                >
                  Clear Search
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      handleNavigate('article', art.slug);
                      setSearchQuery('');
                    }}
                    className="p-4 bg-pink-50/40 rounded-2xl border border-pink-100 hover:border-pink-300 transition-colors cursor-pointer"
                  >
                    <span className="text-[10px] font-bold uppercase text-rose-700">
                      {art.category}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 mt-1 line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                      {art.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View Routing */}
        {!searchQuery.trim() && (
          <>
            {currentView === 'home' && (
              <HomePage
                articles={displayArticles}
                categories={categories}
                authors={authors}
                affiliateProducts={affiliateProducts}
                settings={settings}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'recipes' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <EasyRecipeBox />
              </div>
            )}

            {currentView === 'planner' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SeasonalMealPlanner />
              </div>
            )}

            {currentView === 'category' && (
              <CategoryPage
                categorySlug={viewParam}
                categories={categories}
                articles={displayArticles}
                authors={authors}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'article' && (
              <ArticlePage
                articleSlug={viewParam}
                categories={categories}
                authors={authors}
                affiliateProducts={affiliateProducts}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'calculator' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <FoodWasteCalculator affiliateProducts={affiliateProducts} onNavigate={handleNavigate} />
              </div>
            )}

            {currentView === 'rescue' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <LeftoverRescueTool />
              </div>
            )}

            {currentView === 'gear' && (
              <GearPage products={affiliateProducts} onNavigate={handleNavigate} />
            )}

            {[
              'about',
              'contact',
              'privacy',
              'cookie-policy',
              'terms',
              'editorial-policy',
              'affiliate-disclosure'
            ].includes(currentView) && (
              <LegalPage
                pageType={currentView as any}
                authors={authors}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'admin' && (
              <AdminCMS
                articles={articles}
                categories={categories}
                authors={authors}
                affiliateProducts={affiliateProducts}
                settings={settings}
                onRefreshData={refreshData}
                onNavigate={handleNavigate}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer categories={categories} onNavigate={handleNavigate} />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner />
    </div>
  );
}
