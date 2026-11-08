import React, { useState } from 'react';
import { ChevronRight, Clock, Calendar, ArrowRight, Leaf, Filter } from 'lucide-react';
import { Category, Article, Author } from '../types';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface CategoryPageProps {
  categorySlug: string;
  categories: Category[];
  articles: Article[];
  authors: Author[];
  onNavigate: (view: string, param?: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  categories,
  articles,
  authors,
  onNavigate
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const category = categories.find((c) => c.slug === categorySlug) || categories[0];
  const categoryArticles = articles.filter((a) => a.category === category.slug);

  // Extract all unique tags in this category
  const allTags = Array.from(new Set(categoryArticles.flatMap((a) => a.tags || [])));

  const filteredArticles = selectedTag === 'all'
    ? categoryArticles
    : categoryArticles.filter((a) => a.tags?.includes(selectedTag));

  const getAuthor = (authorId: string) => {
    return authors.find((a) => a.id === authorId) || authors[0];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-600 font-medium">
        <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-700">Categories</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-900 font-bold">{category.title}</span>
      </nav>

      {/* Category Header Hero */}
      <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="p-8 sm:p-12 lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>Pillar Archive • {categoryArticles.length} Research Guides</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            {category.title}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            {category.description}
          </p>

          <div className="pt-2 text-xs text-stone-600">
            All guides in this pillar are fact-checked and verified for zero food waste protocols and gluten-free celiac safety standards.
          </div>
        </div>

        <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden bg-stone-100">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Sub-tag Filtering */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-stone-200 pb-4">
          <span className="text-xs font-bold text-stone-700 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Topic Focus:</span>
          </span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedTag === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All Guides ({categoryArticles.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onNavigate('article', article.slug)}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] text-stone-600 mb-2">
                  <span className="flex items-center gap-1 font-semibold text-emerald-800">
                    <Clock className="w-3 h-3" />
                    {article.readingTime}
                  </span>
                  <span>•</span>
                  <span>Updated {article.lastUpdated}</span>
                </div>

                <h2 className="font-editorial text-lg font-bold text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug mb-2">
                  {article.title}
                </h2>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1">
                  {article.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-700 font-medium">
                By {getAuthor(article.author)?.name.split(',')[0]}
              </span>
              <span className="font-bold text-emerald-800 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Read Full Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8">
          <p className="text-stone-600 text-sm">
            No articles found for the selected topic filter.
          </p>
          <button
            onClick={() => setSelectedTag('all')}
            className="mt-3 px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-xl"
          >
            Show All Articles
          </button>
        </div>
      )}

      {/* AdSense Unit */}
      <AdSenseBanner slot="in-article" />
    </div>
  );
};
