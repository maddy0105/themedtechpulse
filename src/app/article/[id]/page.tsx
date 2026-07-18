"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ARTICLES, Article } from "@/data/articles";
import { useToast } from "@/components/ToastContext";
import { ArrowLeft, Link2, Send, AlertTriangle } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  text: string;
}

export default function ArticlePage({ params }: PageProps) {
  const { id } = use(params);
  const articleId = parseInt(id);
  const { showToast } = useToast();
  const router = useRouter();

  // Find the article
  const article = ARTICLES.find((art) => art.id === articleId);

  // States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Dr. Joshua Davis",
      avatar: "JD",
      date: "2 hours ago",
      text: "This is a major step forward. The integration of high-resolution bio-sensors into daily wear will unlock predictive medicine at an unprecedented level. Looking forward to clinical trial publications.",
    },
  ]);

  // Compute scroll progress for reading bar
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

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto p-8 border border-glass-border bg-bg-secondary rounded-3xl shadow-md">
          <AlertTriangle size={48} className="text-brand-accent mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-text-primary mb-2">Article Not Found</h3>
          <p className="text-text-secondary text-sm mb-6">
            The article you are trying to access does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="px-6 py-3 text-sm font-semibold text-white bg-brand-primary rounded-xl hover:bg-brand-secondary transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Get author initials
  const getInitials = (name: string) => {
    if (!name) return "MP";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Share handlers
  const handleShare = (platform: "copy" | "twitter" | "linkedin") => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    if (platform === "copy") {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          showToast("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Could not copy link: ", err);
        });
    } else if (platform === "twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Read: ${article.title}`
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
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_80%_20%,rgba(94,51,170,0.02),transparent_40%)] py-12 relative">
      {/* Scroll Progress Bar (aligned just below header height) */}
      <div className="fixed top-20 left-0 w-full h-1 bg-transparent z-40">
        <div
          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-r-md transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href={article.category === "news" ? "/news" : "/awareness"}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to {article.category === "news" ? "Medtech News" : "Patient Awareness"}
        </Link>

        {/* Article Container */}
        <article className="space-y-8">
          <header className="space-y-4">
            <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full">
              {article.tag}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display text-text-primary leading-tight">
              {article.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-glass-border pb-6">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-bold text-sm flex items-center justify-center shadow-sm select-none">
                  {getInitials(article.author)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary">{article.author}</span>
                  <span className="text-xs text-text-muted">
                    {article.date} • {article.readTime}
                  </span>
                </div>
              </div>

              {/* Share Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare("twitter")}
                  className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary hover:bg-bg-tertiary transition-all duration-150 cursor-pointer"
                  title="Share on Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary hover:bg-bg-tertiary transition-all duration-150 cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary hover:bg-bg-tertiary transition-all duration-150 cursor-pointer"
                  title="Copy Link"
                >
                  <Link2 size={16} />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-glass-border shadow-md bg-bg-tertiary">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div
            className="article-rich-text text-text-primary"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* Discussion Section */}
        <section className="mt-16 pt-10 border-t border-glass-border">
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

          {/* Comments List */}
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
  );
}
