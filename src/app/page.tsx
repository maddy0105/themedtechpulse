import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { ARTICLES } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  // Filter news and awareness categories
  const newsArticles = ARTICLES.filter((art) => art.category === "news").slice(0, 3);
  const awarenessArticles = ARTICLES.filter((art) => art.category === "awareness").slice(0, 3);

  // Featured Story (ID 7)
  const featuredArticle = ARTICLES.find((art) => art.id === 7) || ARTICLES[0];

  // Top Stories (IDs 8, 9, 10, 11, 12)
  const topStoriesIds = [8, 9, 10, 11, 12];
  const topStories = ARTICLES.filter((art) => topStoriesIds.includes(art.id)).sort(
    (a, b) => topStoriesIds.indexOf(a.id) - topStoriesIds.indexOf(b.id)
  );

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_80%_20%,rgba(94,51,170,0.06),transparent_40%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(192,132,252,0.04),transparent_50%)]">
      {/* Hero Branding Section */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Featured Story (Left 2 Columns on large screens) */}
          <div className="lg:col-span-2 group">
            <Link href={`/article/${featuredArticle.id}`} className="flex flex-col space-y-4">
              <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-glass-border shadow-md bg-bg-tertiary">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              
              <div className="flex flex-col space-y-3">
                <span className="self-start px-3 py-1 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-md">
                  {featuredArticle.tag}
                </span>
                
                <h2 className="text-2xl md:text-4xl font-extrabold font-display leading-tight text-text-primary group-hover:text-brand-primary transition-colors">
                  {featuredArticle.title}
                </h2>
                
                <p className="text-text-secondary text-sm md:text-base leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex items-center space-x-4 text-xs font-semibold text-text-muted">
                  <span>By {featuredArticle.author}</span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Top Stories List (Right Column) */}
          <div className="w-full bg-bg-secondary border border-glass-border rounded-3xl p-6 md:p-8 shadow-sm">
            <span className="block w-10 h-1 bg-red-600 rounded-full mb-4"></span>
            <h3 className="text-sm font-extrabold tracking-widest uppercase text-text-primary mb-6">
              Top Stories
            </h3>
            <ul className="flex flex-col space-y-5">
              {topStories.map((art, index) => (
                <li
                  key={art.id}
                  className="flex gap-4 items-start pb-5 border-b border-glass-border last:border-b-0 last:pb-0"
                >
                  <span className="text-lg font-extrabold text-text-primary/70 font-display">
                    {index + 1}.
                  </span>
                  <Link
                    href={`/article/${art.id}`}
                    className="text-sm font-bold text-text-primary hover:text-brand-primary transition-colors leading-snug"
                  >
                    {art.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </section>

      {/* Medtech News & Updates */}
      <section className="py-16 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
                Industry Insights
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold font-display text-text-primary mt-1">
                Medtech News & Updates
              </h2>
            </div>
            <Link
              href="/news"
              className="text-sm font-bold text-brand-primary hover:text-brand-secondary flex items-center gap-1 group transition-colors"
            >
              View All Updates
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </div>
      </section>

      {/* Health Conditions & Patient Awareness */}
      <section className="py-16 border-t border-glass-border bg-bg-tertiary/50 dark:bg-bg-tertiary/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
                Patient Education
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold font-display text-text-primary mt-1">
                Health, Disease & Conditions
              </h2>
            </div>
            <Link
              href="/awareness"
              className="text-sm font-bold text-brand-primary hover:text-brand-secondary flex items-center gap-1 group transition-colors"
            >
              Browse All Blogs
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awarenessArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Banner */}
      <div className="py-12">
        <Newsletter />
      </div>
    </div>
  );
}
