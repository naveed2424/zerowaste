import React, { useState } from 'react';
import { ShoppingBag, Star, ExternalLink, ShieldCheck, ArrowRight, Check, X, Filter } from 'lucide-react';
import { AffiliateProduct } from '../types';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface GearPageProps {
  products: AffiliateProduct[];
  onNavigate: (view: string, param?: string) => void;
}

export const GearPage: React.FC<GearPageProps> = ({ products, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>2026 Test Kitchen Reviews & Affiliate Recommendations</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            Tested Zero-Waste Kitchen Gear
          </h1>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Every product on this page underwent minimum 90-day testing in our zero-waste test kitchen. We evaluate food shelf-life extension, ease of sanitization, durability, and whether the tool verifiable saves enough groceries to pay for its upfront purchase price.
          </p>

          <div className="p-4 bg-stone-50 border-l-4 border-emerald-700 rounded-r-xl text-xs text-stone-700 leading-relaxed">
            <strong className="text-stone-900">Affiliate Transparency:</strong> When you purchase through our verified Amazon links, SavorZero earns an associate commission at zero additional cost to you. We do not accept sponsored rankings or free gear in exchange for positive reviews.
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
        <span className="text-xs font-bold text-stone-700 flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter by Gear Type:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {cat === 'all' ? 'All Tested Tools' : cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-emerald-900/90 backdrop-blur-md text-emerald-100 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                  {product.badge || 'Tested'}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 text-stone-900 text-sm font-extrabold px-3 py-1 rounded-lg shadow-sm">
                  {product.price}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                    <span>{product.brand}</span>
                    <span className="text-amber-700 font-semibold flex items-center gap-1">
                      ★ {product.rating} ({product.reviewCount.toLocaleString()} Amazon reviews)
                    </span>
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-stone-900 leading-snug">
                    {product.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {product.description}
                </p>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-950 mb-1.5 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>Why It Saves Money:</span>
                    </div>
                    <ul className="space-y-1 text-emerald-900">
                      {product.pros?.map((pro, i) => (
                        <li key={i}>✓ {pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1">
                      <X className="w-3 h-3 text-stone-600" />
                      <span>Limitations to Note:</span>
                    </div>
                    <ul className="space-y-1 text-stone-600">
                      {product.cons?.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-stone-600">
                ASIN: <code className="font-mono">{product.amazonAsin}</code>
              </span>

              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                <span>Check Live Price on Amazon</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* AdSense Unit */}
      <AdSenseBanner slot="leaderboard" />
    </div>
  );
};
