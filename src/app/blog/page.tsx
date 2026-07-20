import React from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ARTICLES } from "@/data/articles";
import Newsletter from "@/components/Newsletter";
import { Search, Calendar, Clock, User, ArrowRight, Sparkles, Database } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  tag?: string;
  date?: string;
  readTime?: string;
  author?: string;
  image?: any;
  excerpt?: string;
}

// Convert local ARTICLES to SanityPost format as seamless fallback
const FALLBACK_POSTS: SanityPost[] = ARTICLES.map((art) => ({
  _id: `fallback-${art.id}`,
  title: art.title,
  slug: `article-${art.id}`,
  category: art.category === "news" ? "News" : "Awareness",
  tag: art.tag,
  date: art.date,
  readTime: art.readTime,
  author: art.author,
  image: art.image,
  excerpt: art.excerpt,
}));

async function getSanityPosts(): Promise<{ posts: SanityPost[]; isLiveSanity: boolean }> {
  try {
    const query = `*[_type == "post"] | order(date desc, _createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      category,
      tag,
      date,
      readTime,
      author,
      image,
      excerpt
    }`;
    const posts = await client.fetch<SanityPost[]>(query);
    if (posts && posts.length > 0) {
      return { posts, isLiveSanity: true };
    }
  } catch (error) {
    console.error("Sanity fetch warning (using fallback data):", error);
  }
  return { posts: FALLBACK_POSTS, isLiveSanity: false };
}

function getImageUrl(imageSource: any, fallbackUrl?: string): string {
  if (!imageSource) {
    return fallbackUrl || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800";
  }
  if (typeof imageSource === "string") {
    return imageSource;
  }
  try {
    return urlFor(imageSource).width(800).height(450).url();
  } catch {
    return fallbackUrl || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800";
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const search = typeof resolvedParams.search === "string" ? resolvedParams.search.toLowerCase() : "";
  const selectedCategory = typeof resolvedParams.category === "string" ? resolvedParams.category : "All";

  const { posts: allPosts, isLiveSanity } = await getSanityPosts();

  // Extract unique categories
  const rawCategories = Array.from(
    new Set(allPosts.map((p) => p.category).filter((c): c is string => Boolean(c)))
  );
  const categories = ["All", ...rawCategories];

  // Filter posts based on category & search term
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(search)) ||
      (post.tag && post.tag.toLowerCase().includes(search));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_80%_20%,rgba(94,51,170,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(192,132,252,0.05),transparent_50%)]">
      {/* Header Banner */}
      <section className="pt-12 pb-8 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-glass-border pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={14} />
              <span>Sanity Powered CMS</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display leading-tight text-text-primary">
              MedTech <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-500 to-indigo-500">Blog & Insights</span>
            </h1>
            <p className="text-text-secondary text-sm md:text-base mt-2 max-w-2xl">
              Explore the latest breakthroughs in healthcare technology, medical robotics, AI diagnostics, and patient education.
            </p>
          </div>

          {/* Sanity Live Status Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-secondary border border-glass-border text-xs font-medium text-text-muted shadow-sm self-start md:self-auto">
            <Database size={14} className={isLiveSanity ? "text-emerald-500" : "text-amber-500"} />
            <span>{isLiveSanity ? "Live Sanity CMS Content" : "Sample Demo Posts"}</span>
            <Link href="/studio" className="ml-2 underline font-bold text-brand-primary hover:text-brand-secondary">
              Open Studio →
            </Link>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                    isActive
                      ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                      : "bg-bg-secondary border-glass-border text-text-secondary hover:text-text-primary hover:border-brand-primary/40"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Search Form */}
          <form action="/blog" method="GET" className="relative w-full md:w-72">
            {selectedCategory !== "All" && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 bg-bg-secondary border border-glass-border rounded-xl text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all shadow-sm"
            />
            <Search size={16} className="absolute left-3 top-3 text-text-muted" />
          </form>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-8 max-w-7xl mx-auto px-6">
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center bg-bg-secondary border border-glass-border rounded-3xl">
            <h3 className="text-xl font-bold text-text-primary mb-2">No Articles Found</h3>
            <p className="text-text-secondary text-sm mb-6">
              No articles matched your criteria "{search || selectedCategory}".
            </p>
            <Link
              href="/blog"
              className="px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-secondary transition-colors"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Hero Article */}
            {featuredPost && (
              <div className="group relative bg-bg-secondary border border-glass-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-bg-tertiary">
                    <img
                      src={getImageUrl(featuredPost.image)}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {featuredPost.category && (
                          <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                            {featuredPost.category}
                          </span>
                        )}
                        {featuredPost.tag && (
                          <span className="px-3 py-1 bg-bg-tertiary text-text-secondary border border-glass-border text-[10px] font-semibold rounded-md">
                            {featuredPost.tag}
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-tight text-text-primary group-hover:text-brand-primary transition-colors">
                        <Link href={`/article/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      {featuredPost.excerpt && (
                        <p className="text-text-secondary text-sm leading-relaxed line-clamp-4">
                          {featuredPost.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-glass-border flex items-center justify-between text-xs text-text-muted">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center font-bold text-xs">
                          {featuredPost.author ? featuredPost.author.charAt(0) : "M"}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-text-primary">
                            {featuredPost.author || "MedTech Pulse Team"}
                          </span>
                          <span className="text-[11px] text-text-muted">
                            {featuredPost.date || "Recent"}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/article/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1 font-bold text-brand-primary hover:text-brand-secondary transition-colors"
                      >
                        <span>Read</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Remaining Grid of Articles */}
            {remainingPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-bold font-display text-text-primary mb-6">
                  Latest Articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post) => (
                    <article
                      key={post._id}
                      className="group bg-bg-secondary border border-glass-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Article Image */}
                        <div className="aspect-[16/9] overflow-hidden bg-bg-tertiary relative">
                          <img
                            src={getImageUrl(post.image)}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {post.category && (
                            <span className="absolute top-3 left-3 px-3 py-1 bg-brand-primary/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                              {post.category}
                            </span>
                          )}
                        </div>

                        {/* Article Meta & Content */}
                        <div className="p-6 space-y-3">
                          {post.tag && (
                            <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wide block">
                              {post.tag}
                            </span>
                          )}

                          <h3 className="text-lg font-bold font-display text-text-primary group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
                            <Link href={`/article/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>

                          {post.excerpt && (
                            <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-6 pb-6 pt-2 border-t border-glass-border/50 flex items-center justify-between text-[11px] text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <User size={12} />
                          <span>{post.author || "MedTech"}</span>
                        </div>

                        {post.readTime && (
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            <span>{post.readTime}</span>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Bottom Newsletter Signup */}
      <div className="py-12 border-t border-glass-border mt-12">
        <Newsletter />
      </div>
    </div>
  );
}
