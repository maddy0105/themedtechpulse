"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // Helper to extract author initials
  const getInitials = (name: string) => {
    if (!name) return "MP";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <article className="flex flex-col h-full bg-bg-secondary rounded-2xl border border-glass-border shadow-sm hover:shadow-xl hover:border-brand-primary/50 transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-bg-tertiary">
        <span className="absolute top-4 left-4 bg-bg-secondary text-brand-secondary text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 border border-glass-border">
          {article.tag}
        </span>
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-6">
        {/* Meta Info */}
        <div className="flex items-center space-x-4 text-xs text-text-muted font-medium mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-display text-text-primary mb-3 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
          <Link href={`/article/${article.id}`}>
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {article.excerpt}
        </p>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-glass-border mt-auto">
          {/* Author */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-bold text-xs flex items-center justify-center shadow-sm select-none">
              {getInitials(article.author)}
            </div>
            <span className="text-xs font-semibold text-text-secondary">
              {article.author}
            </span>
          </div>

          {/* Read Button */}
          <Link
            href={`/article/${article.id}`}
            className="text-xs font-extrabold text-brand-primary flex items-center gap-1 group-hover:text-brand-secondary transition-colors"
          >
            Read
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
