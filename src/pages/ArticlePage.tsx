import React, { useEffect, useState } from 'react';
import { ChevronRight, Clock, Calendar, Share2, Bookmark, Check, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, ArrowRight, ShoppingBag, ExternalLink, ThumbsUp } from 'lucide-react';
import { Article, Category, Author, AffiliateProduct } from '../types';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface ArticlePageProps {
  articleSlug: string;
  categories: Category[];
  authors: Author[];
  affiliateProducts: AffiliateProduct[];
  onNavigate: (view: string, param?: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  articleSlug,
  categories,
  authors,
  affiliateProducts,
  onNavigate
}) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles/${articleSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.article) {
          setArticle(data.article);
          setRelated(data.related || []);
        }
      })
      .catch((err) => console.error('Error loading article:', err))
      .finally(() => setLoading(false));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleSlug]);

  // Reading progress scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = `${(totalScroll / windowHeight) * 100}`;
        setReadingProgress(Number(scroll));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-10 h-10 border-3 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs font-semibold text-stone-600">Loading research guide...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-editorial text-2xl font-bold text-stone-900 mb-3">Article Not Found</h2>
        <p className="text-stone-600 text-sm mb-6">The research guide you requested does not exist or may have been updated.</p>
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 bg-emerald-800 text-white text-xs font-bold rounded-xl"
        >
          Return to SavorZero Home
        </button>
      </div>
    );
  }

  const category = categories.find((c) => c.slug === article.category) || categories[0];
  const author = authors.find((a) => a.id === article.author) || authors[0];
  const attachedGear = affiliateProducts.filter((p) => article.affiliateProductIds?.includes(p.id));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div>
      {/* Sticky Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200 z-50">
        <div
          className="h-full bg-emerald-700 transition-all duration-75"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-600 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => onNavigate('category', category.slug)} className="hover:text-emerald-800">
            {category.title}
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-stone-900 font-bold truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-md uppercase tracking-wider">
              {category.title}
            </span>
            <span className="text-xs text-stone-600 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
            <span className="text-xs text-stone-600">•</span>
            <span className="text-xs text-stone-600 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Last Updated: {article.lastUpdated}
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal border-l-2 border-emerald-700 pl-4 py-1 italic">
            {article.excerpt}
          </p>

          {/* Author Byline & E-E-A-T Credential Badge */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-12 h-12 rounded-full object-cover border border-emerald-700"
              />
              <div>
                <div className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <span>{author.name}</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded font-semibold">
                    Verified Expert
                  </span>
                </div>
                <div className="text-xs text-stone-600">{author.role}</div>
                <div className="text-[11px] text-stone-600 line-clamp-1">{author.credentials}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 cursor-pointer transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-xs bg-stone-100">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full aspect-[16/9] object-cover"
          />
          <div className="p-3 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-600 flex justify-between">
            <span>SavorZero Editorial Test Kitchen Archives • 100% Celiac-Safe Protocol</span>
            <span>Photograph verified for contextual accuracy</span>
          </div>
        </div>

        {/* FTC & Affiliate Disclaimer Box */}
        <div className="p-4 bg-stone-100/80 border-l-4 border-amber-600 rounded-r-xl text-xs text-stone-700 leading-relaxed">
          <strong className="text-stone-900 font-bold block mb-0.5">
            FTC & Editorial Transparency Notice:
          </strong>
          This guide was independently researched and written according to our rigorous E-E-A-T editorial standards. It may contain verified Amazon Associates affiliate links. If you purchase recommended equipment through these links, SavorZero earns a small commission at no additional cost to you, which funds our independent testing laboratory.
        </div>

        {/* Top In-Article AdSense Banner */}
        <AdSenseBanner slot="leaderboard" />

        {/* Main Article Content (Rendered HTML) */}
        <div
          className="prose prose-stone max-w-none text-stone-800 leading-relaxed text-sm sm:text-base space-y-4 [&>h2]:font-editorial [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:text-stone-900 [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:font-editorial [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-stone-900 [&>h3]:mt-6 [&>h3]:mb-2 [&>p]:leading-relaxed [&>p]:text-stone-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Mid-Article AdSense Banner */}
        <AdSenseBanner slot="in-article" />

        {/* Verified Affiliate Product Callout Box (If attached gear exists) */}
        {attachedGear.length > 0 && (
          <div className="my-10 bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-800" />
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Test Kitchen Recommended Equipment (Amazon Affiliate)
                </span>
              </div>
              <span className="text-[10px] bg-emerald-800 text-white font-bold px-2 py-0.5 rounded">
                Verified ROI
              </span>
            </div>

            <div className="space-y-6">
              {attachedGear.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col sm:flex-row gap-5 items-start justify-between shadow-xs"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full sm:w-36 h-36 object-cover rounded-xl border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                        {prod.badge || 'Editor Pick'}
                      </span>
                      <span className="text-sm font-bold text-stone-900">{prod.price}</span>
                    </div>

                    <h4 className="font-editorial text-base font-bold text-stone-900">
                      {prod.name}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="text-emerald-900 space-y-0.5">
                        <strong className="block text-[10px] uppercase text-emerald-800">Pros:</strong>
                        {prod.pros?.slice(0, 2).map((p, i) => (
                          <div key={i}>✓ {p}</div>
                        ))}
                      </div>
                      <div className="text-stone-600 space-y-0.5">
                        <strong className="block text-[10px] uppercase text-stone-600">Note:</strong>
                        {prod.cons?.slice(0, 1).map((c, i) => (
                          <div key={i}>• {c}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto shrink-0 self-end sm:self-center">
                    <a
                      href={prod.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                    >
                      <span>Check Amazon Price</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Structured FAQ Section */}
        {article.faq && article.faq.length > 0 && (
          <div className="my-10 border border-stone-200 rounded-3xl p-6 sm:p-8 bg-white space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <HelpCircle className="w-5 h-5 text-emerald-800" />
              <h3 className="font-editorial text-xl font-bold text-stone-900">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="divide-y divide-stone-100 space-y-3">
              {article.faq.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="pt-3 first:pt-0">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left flex justify-between items-center py-2 text-sm font-bold text-stone-900 hover:text-emerald-800 transition-colors cursor-pointer"
                    >
                      <span>{item.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-stone-600 shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-600 shrink-0 ml-2" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pb-3 pl-1 animate-in fade-in duration-150">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Author Bio Card (E-E-A-T) */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-800 shrink-0"
          />
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-editorial text-lg font-bold text-stone-900">
                  Written by {author.name}
                </h4>
                <div className="text-xs text-emerald-800 font-semibold">{author.role}</div>
              </div>
              <span className="text-[11px] text-stone-600 font-medium">
                {author.articlesCount} Articles Published
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">{author.bio}</p>
            <div className="text-[11px] text-stone-600 font-medium pt-1">
              <strong>Verified Credentials:</strong> {author.credentials}
            </div>
          </div>
        </div>

        {/* Related Inquiries */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-stone-200 space-y-4">
            <h3 className="font-editorial text-2xl font-bold text-stone-900">
              Related Research Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate('article', rel.slug)}
                  className="bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                      {category.title}
                    </span>
                    <h5 className="text-xs font-bold text-stone-900 line-clamp-2 mb-2">
                      {rel.title}
                    </h5>
                    <p className="text-[11px] text-stone-600 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
                    <span>{rel.readingTime}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
