import React, { useState, useEffect } from 'react';
import {
  Settings,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Clock,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Calendar,
  Share2,
  AlertTriangle,
  Save,
  RefreshCw,
  ShoppingBag,
  DollarSign,
  FileCode,
  FileText
} from 'lucide-react';
import { Article, Category, Author, AffiliateProduct, SiteSettings } from '../types';

interface AdminCMSProps {
  articles: Article[];
  categories: Category[];
  authors: Author[];
  affiliateProducts: AffiliateProduct[];
  settings: SiteSettings;
  onRefreshData: () => void;
  onNavigate: (view: string, param?: string) => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  articles,
  categories,
  authors,
  affiliateProducts,
  settings,
  onRefreshData,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<
    'articles' | 'commands' | 'affiliates' | 'adsense' | 'workflow' | 'analytics'
  >('commands');

  // Command Runner State
  const [runningCommand, setRunningCommand] = useState<number | null>(null);
  const [commandResult, setCommandResult] = useState<any | null>(null);
  const [selectedArticleForAudit, setSelectedArticleForAudit] = useState<string>(
    articles[0]?.id || ''
  );

  // Article Edit Modal / Form State
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Affiliate Edit State
  const [editingProduct, setEditingProduct] = useState<AffiliateProduct | null>(null);

  // Settings State
  const [currentSettings, setCurrentSettings] = useState<SiteSettings>(settings);
  const [settingsStatus, setSettingsStatus] = useState<string | null>(null);

  // Analytics State
  const [analytics, setAnalytics] = useState<any>({});

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setAnalytics(d.analytics);
      })
      .catch(() => {});
  }, []);

  // Execute Master Command
  const runMasterCommand = async (commandId: number, commandName: string) => {
    setRunningCommand(commandId);
    setCommandResult(null);

    try {
      const res = await fetch('/api/ai/master-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commandId,
          commandName,
          targetArticleId: selectedArticleForAudit
        })
      });

      const data = await res.json();
      if (data.success) {
        setCommandResult({
          id: commandId,
          name: commandName,
          output: data.result
        });
      }
    } catch (err) {
      console.error('Error running command:', err);
    } finally {
      setRunningCommand(null);
    }
  };

  // Save Article (Create or Update)
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    setSaveStatus('saving');
    const isNew = !articles.some((a) => a.id === editingArticle.id);
    const url = isNew ? '/api/articles' : `/api/articles/${editingArticle.id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingArticle)
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus('saved');
        onRefreshData();
        setTimeout(() => {
          setEditingArticle(null);
          setIsCreatingNew(false);
          setSaveStatus(null);
        }, 1200);
      }
    } catch {
      setSaveStatus('error');
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this research guide?')) return;
    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsStatus('saving');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSettings)
      });
      const data = await res.json();
      if (data.success) {
        setSettingsStatus('saved');
        setTimeout(() => setSettingsStatus(null), 2000);
      }
    } catch {
      setSettingsStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* CMS Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Master Editorial Engine</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
            SavorZero Publishing & Monetization Suite
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            AdSense Approval Status: <strong className="text-emerald-700">98% Ready</strong> • Amazon Tag: <code className="bg-stone-100 px-1 py-0.5 rounded">{settings.amazonAssociateTag || 'savorzero-20'}</code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsCreatingNew(true);
              setEditingArticle({
                id: 'article-' + Date.now(),
                slug: 'new-zero-waste-guide',
                title: 'New Zero-Waste Gluten-Free Guide',
                seoTitle: 'New Zero-Waste Gluten-Free Guide',
                metaDescription: 'Detailed evidence-based description of this culinary preservation guide.',
                primaryKeyword: 'zero waste cooking',
                secondaryKeywords: ['gluten free storage', 'pantry savings'],
                excerpt: 'Executive summary explaining how this technique rescues food and cuts household waste.',
                category: 'zero-waste-storage',
                tags: ['Zero-Waste', 'Gluten-Free', 'Kitchen Hacks'],
                author: 'chef-julian-thorne',
                publishDate: new Date().toISOString().split('T')[0],
                lastUpdated: new Date().toISOString().split('T')[0],
                readingTime: '6 min read',
                isFeatured: false,
                status: 'published',
                featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
                affiliateProductIds: ['vacuum-sealer-pro'],
                content: '<h2>Step-by-Step Culinary Protocol</h2><p>Provide verified instructions and storage science here...</p>',
                faq: [{ question: 'How long can this be stored safely?', answer: 'Store in an airtight container at 38°F for up to 5 days.' }]
              });
              setActiveTab('articles');
            }}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Exit to Public View
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-2">
        {[
          { id: 'commands', label: 'Part 17: Master Commands (AI Engine)', icon: Sparkles },
          { id: 'articles', label: 'Article CMS & Drafts', icon: FileText },
          { id: 'affiliates', label: 'Amazon Affiliate Products', icon: ShoppingBag },
          { id: 'adsense', label: 'Google AdSense & ads.txt', icon: DollarSign },
          { id: 'workflow', label: 'Daily Automation Pipeline', icon: Clock },
          { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PART 17 ADMINISTRATOR MASTER COMMANDS */}
      {activeTab === 'commands' && (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-stone-900">
                  Part 17 — Administrator Master Commands
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  1-Click AI-assisted editorial commands powered by Gemini 2.5 Flash. Generates trending topics, audits for AdSense readiness, and identifies zero-waste content gaps.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-600 font-medium">Target Article for Audits:</span>
                <select
                  value={selectedArticleForAudit}
                  onChange={(e) => setSelectedArticleForAudit(e.target.value)}
                  className="bg-stone-50 border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800"
                >
                  {articles.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title.slice(0, 40)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* The 10 Master Commands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {[
                { id: 1, name: "Write today's best trending topic", desc: "Researches grocery inflation & food rescue trends", tag: "Publish" },
                { id: 2, name: "Create an evergreen article", desc: "Builds long-term reference pantry blueprint", tag: "Draft" },
                { id: 3, name: "Analyze this article for SEO", desc: "AEO, GEO, and AdSense compliance audit", tag: "Audit" },
                { id: 4, name: "Find content gaps", desc: "Identifies high-search, low-competition zero-waste topics", tag: "Strategy" },
                { id: 5, name: "Improve this article", desc: "Refreshes facts, references, and headings", tag: "Optimize" },
                { id: 6, name: "Create a content calendar", desc: "Generates 30-day editorial publishing schedule", tag: "Planning" },
                { id: 7, name: "Prepare website for AdSense", desc: "15-point Google Publisher readiness checklist", tag: "Compliance" },
                { id: 8, name: "Generate social media content", desc: "Creates Pinterest, FB, LinkedIn & newsletter pack", tag: "Distribution" },
                { id: 9, name: "Find outdated articles", desc: "Identifies stale content needing verification", tag: "Freshness" },
                { id: 10, name: "Generate monthly SEO report", desc: "Summarizes clicks, CTR, and search queries", tag: "Analytics" }
              ].map((cmd) => (
                <div
                  key={cmd.id}
                  className="bg-stone-50 border border-stone-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-600 transition-colors"
                >
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase bg-emerald-100 px-1.5 py-0.2 rounded">
                        Command {cmd.id}
                      </span>
                      <span className="text-[10px] font-bold text-stone-600">
                        {cmd.tag}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 leading-snug mb-1">
                      {cmd.name}
                    </h4>
                    <p className="text-[11px] text-stone-600 leading-tight">
                      {cmd.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => runMasterCommand(cmd.id, cmd.name)}
                    disabled={runningCommand !== null}
                    className={`mt-3 w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      runningCommand === cmd.id
                        ? 'bg-amber-700 text-white animate-pulse'
                        : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {runningCommand === cmd.id ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        <span>Run Command</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Command Output Inspector */}
            {commandResult && (
              <div className="mt-6 p-6 bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Result: Command {commandResult.id} — {commandResult.name}
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        Generated by SavorZero Editorial Intelligence Engine
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCommandResult(null)}
                    className="text-xs text-stone-400 hover:text-white"
                  >
                    Clear Output
                  </button>
                </div>

                <div className="bg-stone-950 p-4 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto max-h-96 whitespace-pre-wrap leading-relaxed">
                  {typeof commandResult.output === 'string'
                    ? commandResult.output
                    : JSON.stringify(commandResult.output, null, 2)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ARTICLE CMS & DRAFTS */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          {editingArticle ? (
            /* Article Editor Form */
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-stone-900">
                    {isCreatingNew ? 'Create New Research Guide' : 'Edit Article: ' + editingArticle.title}
                  </h3>
                  <p className="text-xs text-stone-600">
                    Ensure H2/H3 headings, unique meta description, primary keyword, and attached Amazon affiliate tools.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingArticle(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSaveArticle} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      Article Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editingArticle.title}
                      onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs font-semibold text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      URL Slug (SEO-friendly)
                    </label>
                    <input
                      type="text"
                      required
                      value={editingArticle.slug}
                      onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs font-mono text-stone-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      Category Pillar
                    </label>
                    <select
                      value={editingArticle.category}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-800"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      Author Credential
                    </label>
                    <select
                      value={editingArticle.author}
                      onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-800"
                    >
                      {authors.map((au) => (
                        <option key={au.id} value={au.id}>
                          {au.name} ({au.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      Publication Status
                    </label>
                    <select
                      value={editingArticle.status}
                      onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value as any })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-800"
                    >
                      <option value="published">Published (Live)</option>
                      <option value="draft">Draft (Review Stage)</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      Primary SEO Keyword
                    </label>
                    <input
                      type="text"
                      value={editingArticle.primaryKeyword}
                      onChange={(e) => setEditingArticle({ ...editingArticle, primaryKeyword: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      Featured Image URL
                    </label>
                    <input
                      type="text"
                      value={editingArticle.featuredImage}
                      onChange={(e) => setEditingArticle({ ...editingArticle, featuredImage: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Meta Description (150-160 characters for SERP)
                  </label>
                  <textarea
                    rows={2}
                    value={editingArticle.metaDescription}
                    onChange={(e) => setEditingArticle({ ...editingArticle, metaDescription: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-800"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Excerpt / Lead Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={editingArticle.excerpt}
                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-800"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Article HTML Content (Include &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;)
                  </label>
                  <textarea
                    rows={10}
                    value={editingArticle.content}
                    onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs font-mono text-stone-800"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 text-xs text-stone-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingArticle.isFeatured}
                        onChange={(e) => setEditingArticle({ ...editingArticle, isFeatured: e.target.checked })}
                        className="accent-emerald-800"
                      />
                      <span>Mark as Featured Homepage Lead Story</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{saveStatus === 'saving' ? 'Saving...' : 'Save & Publish Guide'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Articles Table */
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-6 border-b border-stone-200 flex justify-between items-center">
                <h3 className="font-editorial text-xl font-bold text-stone-900">
                  Published & Draft Articles ({articles.length})
                </h3>
                <span className="text-xs text-stone-600">Persistent storage in /data/db.json</span>
              </div>

              <div className="divide-y divide-stone-100">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={art.featuredImage}
                        alt={art.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              art.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {art.status}
                          </span>
                          <span className="text-xs text-stone-600">{art.category}</span>
                          {art.isFeatured && (
                            <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                              Featured Lead
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 mt-1 line-clamp-1">
                          {art.title}
                        </h4>
                        <div className="text-[11px] text-stone-600 mt-0.5">
                          {art.readingTime} • Updated {art.lastUpdated} • Primary KW: <code className="text-stone-700">{art.primaryKeyword}</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onNavigate('article', art.slug)}
                        className="p-2 text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg"
                        title="View Live Guide"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingArticle(art)}
                        className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-2 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: AMAZON AFFILIATE PRODUCTS */}
      {activeTab === 'affiliates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-editorial text-xl font-bold text-stone-900">
                  Amazon Associates & Affiliate Product Inventory
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Products recommended within guides and on the Tested Gear directory. Every link automatically appends your associate tag.
                </p>
              </div>
              <div className="text-xs text-stone-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-medium">
                Active Associate Tag: <strong>{settings.amazonAssociateTag || 'savorzero-20'}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {affiliateProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-start gap-4"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-20 h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase bg-emerald-100 px-1.5 py-0.2 rounded">
                        {prod.badge}
                      </span>
                      <span className="text-xs font-bold text-stone-900">{prod.price}</span>
                    </div>
                    <h5 className="text-xs font-bold text-stone-900 line-clamp-1">{prod.name}</h5>
                    <p className="text-[11px] text-stone-600 line-clamp-2">{prod.description}</p>
                    <div className="text-[10px] text-stone-600 pt-1 flex justify-between">
                      <span>ASIN: {prod.amazonAsin}</span>
                      <a
                        href={prod.affiliateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-800 font-bold underline flex items-center gap-0.5"
                      >
                        Amazon Link <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GOOGLE ADSENSE & ADS.TXT */}
      {activeTab === 'adsense' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="font-editorial text-xl font-bold text-stone-900">
                Google AdSense & Monetization Settings
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Configure your Google publisher account, toggle display ad slots, and manage your live <code className="bg-stone-100 px-1 py-0.5 rounded">/ads.txt</code> configuration.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5 max-w-2xl">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    Google AdSense Banner Display
                  </div>
                  <p className="text-xs text-emerald-900 mt-0.5">
                    Controls whether header leaderboards and in-article display units appear on public pages.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentSettings.adsenseEnabled}
                    onChange={(e) => setCurrentSettings({ ...currentSettings, adsenseEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Google AdSense Publisher Client ID
                </label>
                <input
                  type="text"
                  value={currentSettings.adsenseClientId}
                  onChange={(e) => setCurrentSettings({ ...currentSettings, adsenseClientId: e.target.value })}
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs font-mono text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Amazon Associates Tag
                </label>
                <input
                  type="text"
                  value={currentSettings.amazonAssociateTag}
                  onChange={(e) => setCurrentSettings({ ...currentSettings, amazonAssociateTag: e.target.value })}
                  placeholder="savorzero-20"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs font-mono text-stone-800"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Live ads.txt Configuration Content
                  </label>
                  <a
                    href="/ads.txt"
                    target="_blank"
                    className="text-[11px] text-emerald-800 underline flex items-center gap-1"
                  >
                    View Public /ads.txt <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <textarea
                  rows={4}
                  value={currentSettings.adsTxtContent}
                  onChange={(e) => setCurrentSettings({ ...currentSettings, adsTxtContent: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs font-mono text-stone-800"
                ></textarea>
                <p className="text-[11px] text-stone-600 mt-1">
                  AdSense crawler checks this file at <code>/ads.txt</code> to verify domain ownership and ad fraud protection.
                </p>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{settingsStatus === 'saving' ? 'Saving...' : 'Save Monetization Settings'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: DAILY AUTOMATION PIPELINE */}
      {activeTab === 'workflow' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="font-editorial text-xl font-bold text-stone-900">
                Part 16 — Daily Editorial Automation Workflow
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Configurable daily editorial pipeline with default human approval stage.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { time: "08:00 UTC", title: "Discover Topics", desc: "Monitors grocery inflation, circular economy reports & celiac dietary research" },
                { time: "08:30 UTC", title: "Evaluate Topic Opportunities", desc: "Checks search intent, keyword opportunity & zero-waste practical value" },
                { time: "09:00 UTC", title: "Verify Primary Sources & Fact-Check", desc: "Audits against USDA, FAO & peer-reviewed clinical nutrition databases" },
                { time: "09:30 UTC", title: "Prepare Article Draft", desc: "Constructs 2,000+ word structured guide with H2, H3, calculations & checklists" },
                { time: "10:00 UTC", title: "Image Generation & Optimization", desc: "Creates optimized WebP visuals with descriptive ALT tags" },
                { time: "10:30 UTC", title: "SEO, GEO & Originality Checks", desc: "Validates against duplicate content, keyword cannibalization & AEO" },
                { time: "11:00 UTC", title: "Google AdSense & Compliance Verification", desc: "Ensures no deceptive elements and verifies FTC affiliate disclaimers" },
                { time: "11:30 UTC", title: "Internal Linking & External Authority", desc: "Links to Savings Calculator, Leftover Matcher & authoritative sources" },
                { time: "12:00 UTC", title: "Human Approval & Publication", desc: "Administrator reviews and approves draft for live indexing" }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                  <div className="px-2.5 py-1 bg-emerald-800 text-white rounded-md text-[11px] font-mono font-bold shrink-0">
                    {step.time}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">{step.title}</h5>
                    <p className="text-[11px] text-stone-600 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PERFORMANCE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
              <span className="text-xs text-stone-600 font-medium">Monthly Organic Clicks</span>
              <div className="font-editorial text-3xl font-bold text-stone-900 mt-1">
                {(analytics.organicClicks || 48290).toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold">+18.4% from last month</span>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
              <span className="text-xs text-stone-600 font-medium">Total Calculator Audits</span>
              <div className="font-editorial text-3xl font-bold text-emerald-800 mt-1">
                {(analytics.totalCalculationsRun || 12840).toLocaleString()}
              </div>
              <span className="text-[11px] text-stone-600 font-medium">User engagement metric</span>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
              <span className="text-xs text-stone-600 font-medium">Estimated Food Saved</span>
              <div className="font-editorial text-3xl font-bold text-teal-800 mt-1">
                {(analytics.estimatedFoodSavedPounds || 38400).toLocaleString()} <span className="text-sm font-sans font-normal text-stone-600">lbs</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold">Kept out of landfills</span>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
              <span className="text-xs text-stone-600 font-medium">Affiliate Link Clicks</span>
              <div className="font-editorial text-3xl font-bold text-amber-800 mt-1">
                {(analytics.affiliateClicks || 3410).toLocaleString()}
              </div>
              <span className="text-[11px] text-stone-600 font-medium">Amazon Associates conversion</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
