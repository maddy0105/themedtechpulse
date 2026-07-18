import React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { formatDate, readingTime } from "@/lib/utils";
import Newsletter from "@/components/Newsletter";
import { Search, ChevronLeft, ChevronRight, Calendar, Clock, User, ArrowRight } from "lucide-react";

export const revalidate = 3600; // Revalidate hourly

interface Post {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: boolean;
  published_at: string;
  categories: { name: string; slug: string } | null;
  authors: { name: string; avatar: string } | null;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const search = typeof resolvedParams.search === "string" ? resolvedParams.search : "";
  const selectedCategory = typeof resolvedParams.category === "string" ? resolvedParams.category : "";
  const currentPage = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page) : 1;

  const limit = 6;
  const offset = (currentPage - 1) * limit;

  // 1. Fetch categories
  let categoriesList: { name: string; slug: string }[] = [];
  try {
    const { data: categories } = await supabase
      .from("categories")
      .select("name, slug")
      .order("name", { ascending: true });
    categoriesList = categories || [];
  } catch (e) {
    console.error("Failed to fetch categories from Supabase", e);
  }

  // 2. Fetch posts
  let posts: Post[] = [];
  let totalCount = 0;
  let isDbConnected = false;

  try {
    // Check if category slug maps to an ID
    let categoryId: string | null = null;
    if (selectedCategory) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", selectedCategory)
        .single();
      if (cat) categoryId = cat.id;
    }

    let query = supabase
      .from("posts")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        content,
        cover_image,
        published,
        published_at,
        categories (name, slug),
        authors (name, avatar)
      `,
        { count: "exact" }
      )
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    // Apply pagination range
    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (!error && data) {
      posts = data as unknown as Post[];
      totalCount = count || 0;
      isDbConnected = true;
    }
  } catch (e) {
    console.error("Failed to query posts from Supabase:", e);
  }

  // 3. Fallback mock data if Supabase tables don't exist yet or connection fails
  if (!isDbConnected || posts.length === 0) {
    const MOCK_POSTS: Post[] = [
      {
        id: "mock-1",
        title: "AI-Powered Diagnostics: Reimagining Early Disease Detection",
        slug: "ai-powered-diagnostics-early-detection",
        excerpt: "New machine learning algorithms are identifying subtle patterns in medical imaging years before physical symptoms manifest.",
        content: "<p>Artificial Intelligence is no longer a futuristic concept in medicine...</p>",
        cover_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        published: true,
        published_at: new Date("2026-07-02").toISOString(),
        categories: { name: "Artificial Intelligence", slug: "artificial-intelligence" },
        authors: { name: "Dr. Elena Rostova", avatar: "https://images.unsplash.com/photo-1559757175-5700dde675bc" }
      },
      {
        id: "mock-2",
        title: "Robotic Surgery Enters the Nano-Scale Era",
        slug: "robotic-surgery-nano-scale",
        excerpt: "Miniaturized surgical robots are transitioning from labs to operating tables, promising ultra-precise, stitchless surgeries.",
        content: "<p>The field of surgical robotics is undergoing a dramatic transformation...</p>",
        cover_image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        published: true,
        published_at: new Date("2026-06-28").toISOString(),
        categories: { name: "Surgical Robotics", slug: "surgical-robotics" },
        authors: { name: "Marcus Vance", avatar: "" }
      },
      {
        id: "mock-3",
        title: "Next-Gen Bio-Wearables: Continuous Health Tracking Beyond Steps",
        slug: "next-gen-bio-wearables-continuous-tracking",
        excerpt: "The boundary between consumer fitness trackers and medical-grade diagnostic devices is dissolving, capturing real-time hormone and glucose levels.",
        content: "<p>A quiet revolution is happening on our wrists and skin...</p>",
        cover_image: "https://images.unsplash.com/photo-1510017808638-f507213a914e?auto=format&fit=crop&q=80&w=800",
        published: true,
        published_at: new Date("2026-06-15").toISOString(),
        categories: { name: "Wearable Tech", slug: "wearable-tech" },
        authors: { name: "Sarah Jenkins", avatar: "" }
      },
      {
        id: "mock-4",
        title: "Understanding Cardiovascular Health: Practical Steps for Heart Longevity",
        slug: "understanding-cardiovascular-health-longevity",
        excerpt: "Heart disease remains a leading cause of mortality worldwide. Learn the modern science of heart health and actionable lifestyle changes.",
        content: "<p>Cardiovascular disease affects millions of lives globally...</p>",
        cover_image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
        published: true,
        published_at: new Date("2026-07-01").toISOString(),
        categories: { name: "Cardiology", slug: "cardiology" },
        authors: { name: "Dr. Amit Patel, FACC", avatar: "" }
      },
      {
        id: "mock-5",
        title: "Demystifying Diabetes: Types, Symptoms, and Modern Management",
        slug: "demystifying-diabetes-types-management",
        excerpt: "Diabetes is a complex metabolic condition, but with modern technology and lifestyle interventions, patients can achieve full remission.",
        content: "<p>Diabetes is one of the most common chronic conditions in the world today...</p>",
        cover_image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800",
        published: true,
        published_at: new Date("2026-06-25").toISOString(),
        categories: { name: "Endocrinology", slug: "endocrinology" },
        authors: { name: "Dr. Sarah Al-Mansoori", avatar: "" }
      }
    ];

    // Filter mock categories dynamically
    categoriesList = [
      { name: "Artificial Intelligence", slug: "artificial-intelligence" },
      { name: "Surgical Robotics", slug: "surgical-robotics" },
      { name: "Wearable Tech", slug: "wearable-tech" },
      { name: "Cardiology", slug: "cardiology" },
      { name: "Endocrinology", slug: "endocrinology" }
    ];

    // Filter mock data locally
    const filteredMock = MOCK_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || post.categories?.slug === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    totalCount = filteredMock.length;
    posts = filteredMock.slice(offset, offset + limit);
  }

  const totalPages = Math.ceil(totalCount / limit);

  // Helper to build URLs
  const getQueryUrl = (params: { [key: string]: string | number | null }) => {
    const nextParams = new URLSearchParams();
    if (search) nextParams.set("search", search);
    if (selectedCategory) nextParams.set("category", selectedCategory);
    if (currentPage > 1) nextParams.set("page", currentPage.toString());

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value.toString());
      }
    }
    const queryString = nextParams.toString();
    return `/blog${queryString ? `?${queryString}` : ""}`;
  };

  const getInitials = (name: string) => {
    if (!name) return "MP";
    const parts = name.split(" ");
    return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_80%_20%,rgba(94,51,170,0.04),transparent_45%)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hub Header */}
        <div className="border-b border-glass-border pb-8 mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
            SEO Blog Platform
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-text-primary mt-2">
            The MedTech Pulse Blog
          </h1>

          {/* Search and Filters bar */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mt-8">
            {/* Search Form */}
            <form action="/blog" method="GET" className="relative max-w-md w-full">
              <span className="absolute inset-y-0 left-4 flex items-center text-text-muted">
                <Search size={18} />
              </span>
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 bg-bg-secondary text-text-primary border border-glass-border rounded-full outline-none text-sm transition-all focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
              />
              {selectedCategory && (
                <input type="hidden" name="category" value={selectedCategory} />
              )}
            </form>

            {/* Category selection */}
            <div className="flex flex-wrap gap-2">
              <Link
                href={getQueryUrl({ category: null, page: 1 })}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  !selectedCategory
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white border-transparent shadow-md"
                    : "bg-bg-secondary text-text-secondary border-glass-border hover:border-brand-primary hover:text-brand-primary"
                }`}
              >
                All Categories
              </Link>
              {categoriesList.map((cat) => (
                <Link
                  key={cat.slug}
                  href={getQueryUrl({ category: cat.slug, page: 1 })}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCategory === cat.slug
                      ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white border-transparent shadow-md"
                      : "bg-bg-secondary text-text-secondary border-glass-border hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Database Warning indicator if missing env */}
        {!isDbConnected && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-800 dark:text-yellow-200 rounded-2xl text-xs font-semibold text-center">
            ⚠️ Supabase environment variables are missing or connection failed. Showing interactive mock data for demonstration.
          </div>
        )}

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col h-full bg-bg-secondary rounded-2xl border border-glass-border shadow-sm hover:shadow-xl hover:border-brand-primary/50 transition-all duration-300 overflow-hidden group"
              >
                {/* Cover Image */}
                <div className="relative w-full h-48 overflow-hidden bg-bg-tertiary">
                  {post.categories && (
                    <span className="absolute top-4 left-4 bg-bg-secondary text-brand-secondary text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 border border-glass-border">
                      {post.categories.name}
                    </span>
                  )}
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex items-center space-x-4 text-xs text-text-muted font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {formatDate(post.published_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {readingTime(post.content)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-text-primary mb-3 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-glass-border mt-auto">
                    {post.authors && (
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-bold text-xs flex items-center justify-center shadow-sm select-none">
                          {getInitials(post.authors.name)}
                        </div>
                        <span className="text-xs font-semibold text-text-secondary">
                          {post.authors.name}
                        </span>
                      </div>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-extrabold text-brand-primary flex items-center gap-1 group-hover:text-brand-secondary transition-colors"
                    >
                      Read Article
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 border border-glass-border rounded-3xl bg-bg-secondary shadow-sm mb-12 text-center">
            <h3 className="text-xl font-bold text-text-primary mb-2">No articles found</h3>
            <p className="text-text-secondary text-sm max-w-sm">
              Try adjusting your filters or search query to find matching MedTech Pulse articles.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mb-16">
            <Link
              href={getQueryUrl({ page: Math.max(1, currentPage - 1) })}
              className={`p-2 rounded-xl border border-glass-border bg-bg-secondary text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-all ${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }`}
              aria-label="Previous Page"
            >
              <ChevronLeft size={20} />
            </Link>
            <span className="text-sm font-semibold text-text-secondary">
              Page {currentPage} of {totalPages}
            </span>
            <Link
              href={getQueryUrl({ page: Math.min(totalPages, currentPage + 1) })}
              className={`p-2 rounded-xl border border-glass-border bg-bg-secondary text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-all ${
                currentPage === totalPages ? "pointer-events-none opacity-50" : ""
              }`}
              aria-label="Next Page"
            >
              <ChevronRight size={20} />
            </Link>
          </div>
        )}

        {/* Newsletter Banner */}
        <Newsletter />
      </div>
    </div>
  );
}
