"use client";

import React, { useState, useMemo } from "react";
import { ARTICLES } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import Newsletter from "@/components/Newsletter";
import { Search, FolderOpen } from "lucide-react";

export default function AwarenessHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Filter to awareness articles only
  const awarenessArticles = useMemo(() => {
    return ARTICLES.filter((art) => art.category === "awareness");
  }, []);

  // Compute unique tags for filters
  const uniqueTags = useMemo(() => {
    const tags = awarenessArticles.map((art) => art.tag);
    return ["all", ...Array.from(new Set(tags))];
  }, [awarenessArticles]);

  // Filter and search articles dynamically
  const filteredArticles = useMemo(() => {
    return awarenessArticles.filter((art) => {
      const matchesTag = selectedTag === "all" || art.tag === selectedTag;
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [awarenessArticles, selectedTag, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_80%_20%,rgba(94,51,170,0.04),transparent_45%)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hub Header */}
        <div className="border-b border-glass-border pb-8 mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
            Patient Education
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-text-primary mt-2">
            Health, Disease & Conditions
          </h1>

          {/* Controls: Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mt-8">
            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <span className="absolute inset-y-0 left-4 flex items-center text-text-muted">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-bg-secondary text-text-primary border border-glass-border rounded-full outline-none text-sm transition-all focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
              />
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2">
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white border-transparent shadow-md shadow-brand-primary/20"
                      : "bg-bg-secondary text-text-secondary border-glass-border hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {tag === "all" ? "All" : tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-in fade-in duration-300">
            {filteredArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 border border-glass-border rounded-3xl bg-bg-secondary shadow-sm mb-16 text-center">
            <FolderOpen size={48} className="text-text-muted mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-text-primary mb-2">No articles found</h3>
            <p className="text-text-secondary text-sm max-w-md">
              Try adjusting your search terms or filters to find what you are looking for.
            </p>
          </div>
        )}

        {/* Newsletter Signup Banner */}
        <Newsletter />
      </div>
    </div>
  );
}
