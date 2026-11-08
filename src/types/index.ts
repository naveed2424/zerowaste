export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  lastUpdated: string;
  readingTime: string;
  isFeatured: boolean;
  status: 'published' | 'draft' | 'scheduled';
  featuredImage: string;
  affiliateProductIds: string[];
  content: string;
  faq?: FAQItem[];
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  articleCount?: number;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  credentials: string;
  articlesCount: number;
}

export interface AffiliateProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  amazonAsin: string;
  badge?: string;
  pros: string[];
  cons: string[];
  image: string;
  description: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  adsenseClientId: string;
  adsenseEnabled: boolean;
  inArticleAds: boolean;
  amazonAssociateTag: string;
  adsTxtContent: string;
  autoPublishEnabled: boolean;
  dailyWorkflowTime: string;
}

export interface SavingsCalculatorState {
  householdSize: number;
  weeklyGrocerySpend: number;
  estimatedWastePercent: number;
  isGlutenFree: boolean;
  mealPlanningHabit: 'none' | 'partial' | 'strict';
  fridgeOrganizationHabit: 'poor' | 'average' | 'excellent';
}

export interface LeftoverRescueResult {
  title: string;
  difficulty: string;
  prepTime: string;
  cookTime: string;
  estimatedSavings: string;
  scrapsRescued: string[];
  ingredients: string[];
  instructions: string[];
  chefZeroWasteTip: string;
  storageGuidance: string;
}
