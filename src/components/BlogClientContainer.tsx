"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useToast } from "./ToastContext";
import { Link2, Send, ChevronRight } from "lucide-react";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  text: string;
}

interface BlogClientContainerProps {
  postTitle: string;
  postSlug: string;
  postCategorySlug: string;
  postCategoryName: string;
  headings: Heading[];
  articleHtml: string;
}

export default function BlogClientContainer({
  postTitle,
  postSlug,
  postCategorySlug,
  postCategoryName,
  headings,
  articleHtml,
}: BlogClientContainerProps) {
  const { showToast } = useToast();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Dr. Joshua Davis",
      avatar: "JD",
      date: "2 hours ago",
      text: "Outstanding article. The integration of high-resolution sensors into patient bio-wearables is going to revolutionize continuous care pipelines.",
    },
  ]);

  // Compute scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (windowScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Share handlers
  const handleShare = (platform: "copy" | "twitter" | "linkedin") => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    if (platform === "copy") {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => showToast("Link copied to clipboard!"))
        .catch((err) => console.error("Clipboard copy failed:", err));
    } else if (platform === "twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Read: ${postTitle}`
      )}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, "_blank", "width=600,height=400");
    } else if (platform === "linkedin") {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`;
      window.open(linkedinUrl, "_blank", "width=600,height=400");
    }
  };

  // Comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Math.random().toString(36).substring(2, 9),
        author: "You (Reader)",
        avatar: "ME",
        date: "Just now",
        text: commentText.trim(),
      };
      setComments((prev) => [newComment, ...prev]);
      setCommentText("");
      showToast("Comment posted successfully!");
    }
  };

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-20 left-0 w-full h-1 bg-transparent z-40">
        <div
          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-r-md transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-8 items-start">
        {/* Left Column: Sticky Table of Contents (Hidden on mobile) */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-28 p-6 bg-bg-secondary rounded-2xl border border-glass-border shadow-sm">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-text-primary mb-4">
            Table of Contents
          </h4>
          {headings.length > 0 ? (
            <ul className="space-y-3">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{ paddingLeft: heading.level === 3 ? "12px" : "0" }}
                >
                  <a
                    href={`#${heading.id}`}
                    className={`text-xs font-semibold hover:text-brand-primary transition-colors text-text-secondary flex items-start gap-1`}
                  >
                    <ChevronRight size={12} className="mt-0.5 shrink-0 text-text-muted" />
                    <span className="line-clamp-2 leading-relaxed">{heading.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-text-muted">No sections available.</p>
          )}

          {/* Inline Share Links */}
          <div className="border-t border-glass-border mt-6 pt-6">
            <h5 className="text-xs font-bold uppercase text-text-muted mb-3">Share Article</h5>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleShare("twitter")}
                className="w-8 h-8 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-150 cursor-pointer"
                title="Share on Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="w-8 h-8 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-150 cursor-pointer"
                title="Share on LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="w-8 h-8 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-150 cursor-pointer"
                title="Copy Link"
              >
                <Link2 size={14} />
              </button>
            </div>
          </div>
        </aside>

        {/* Right Column: Article details */}
        <div className="lg:col-span-3 space-y-12">
          {/* Content Body */}
          <div
            className="article-rich-text text-text-primary"
            dangerouslySetInnerHTML={{ __html: articleHtml }}
          />

          {/* Share controls (Shown on mobile inside flow) */}
          <div className="flex lg:hidden items-center justify-between p-6 bg-bg-secondary border border-glass-border rounded-2xl shadow-sm">
            <span className="text-sm font-bold text-text-primary">Share this article:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleShare("twitter")}
                className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary transition-all cursor-pointer"
              >
                <Link2 size={15} />
              </button>
            </div>
          </div>

          {/* Dynamic Comments Discussion */}
          <section className="pt-10 border-t border-glass-border">
            <h3 className="text-xl md:text-2xl font-bold font-display text-text-primary mb-6">
              Discussion
            </h3>

            <form onSubmit={handleCommentSubmit} className="space-y-4 mb-10">
              <textarea
                required
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts or questions on this topic..."
                className="w-full p-4 bg-bg-secondary text-text-primary border border-glass-border rounded-2xl outline-none text-sm resize-y focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2 text-sm"
              >
                Post Comment
                <Send size={14} />
              </button>
            </form>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-4 p-5 bg-bg-secondary border border-glass-border rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-bg-tertiary text-text-secondary font-bold text-sm flex items-center justify-center shrink-0 shadow-sm border border-glass-border">
                    {comment.avatar}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-text-primary">{comment.author}</span>
                      <span className="text-xs text-text-muted">{comment.date}</span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
