import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { formatDate, readingTime } from "@/lib/utils";
import BlogClientContainer from "@/components/BlogClientContainer";
import { ArrowLeft, Calendar, Clock, AlertTriangle } from "lucide-react";

export const revalidate = 3600; // Hourly revalidation

interface Post {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: boolean;
  published_at: string;
  seo_title?: string;
  seo_description?: string;
  categories: { name: string; slug: string } | null;
  authors: { name: string; avatar: string; bio: string } | null;
}

// 1. Fetch post by slug helper
async function getPost(slug: string): Promise<{ post: Post | null; isDbConnected: boolean }> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        cover_image,
        published,
        published_at,
        seo_title,
        seo_description,
        categories (name, slug),
        authors (name, avatar, bio)
      `)
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!error && data) {
      return { post: data as unknown as Post, isDbConnected: true };
    }
  } catch (e) {
    console.error("Supabase post query failed:", e);
  }

  // Fallback to mock data if DB query fails or tables don't exist
  const MOCK_POSTS: Post[] = [
    {
      id: "mock-1",
      title: "AI-Powered Diagnostics: Reimagining Early Disease Detection",
      slug: "ai-powered-diagnostics-early-detection",
      excerpt: "New machine learning algorithms are identifying subtle patterns in medical imaging years before physical symptoms manifest.",
      content: `
        <p>Artificial Intelligence is no longer a futuristic concept in medicine; it is actively rewriting the standards of patient care. In recent months, clinical trials across the globe have demonstrated that deep learning algorithms can identify anomalies in MRI and CT scans with accuracy rates that rival, and in some cases exceed, senior radiologists.</p>
        
        <h2>The Power of Early Pattern Recognition</h2>
        <p>Traditional diagnostic methods rely heavily on the visual identification of pathological changes. However, by the time a tumor or vascular change is visible to the human eye on an imaging scan, the underlying disease may have already progressed. AI models trained on millions of historical scans look deeper. They analyze micro-textures, pixel density variations, and subtle symmetry anomalies that escape human detection.</p>
        
        <blockquote>
          "We are shifting from a reactive diagnostic model to a predictive one. AI allows us to see the storm forming long before the first drop of rain falls."
          <cite>— Dr. Elena Rostova, Director of Medtech Research</cite>
        </blockquote>

        <h2>Key Breakthroughs in 2026</h2>
        <p>Neurological and cardiovascular diagnostic suites are receiving rapid upgrades using automated image classification.</p>
        <h3>Oncology Applications</h3>
        <p>Neural networks identifying early-stage breast cancer lesions up to two years before they manifest as mammographically detectable masses.</p>
        <h3>Cardiology Screenings</h3>
        <p>Algorithms predicting risk of acute cardiac events by analyzing minor coronary calcification patterns on routine chest X-rays.</p>

        <h2>Navigating the Regulatory and Ethical Landscape</h2>
        <p>While the potential is astronomical, integrating AI into daily clinical workflows introduces challenges. Healthcare providers must address questions of algorithmic bias, data privacy, and the 'black box' problem—where developers cannot easily explain how an AI reached a specific conclusion.</p>
      `,
      cover_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      published: true,
      published_at: new Date("2026-07-02").toISOString(),
      seo_title: "AI-Powered Diagnostics: Reimagining Early Disease Detection",
      seo_description: "Learn how machine learning algorithms identify subtle patterns in medical imaging years before physical symptoms manifest.",
      categories: { name: "Artificial Intelligence", slug: "artificial-intelligence" },
      authors: { name: "Dr. Elena Rostova", avatar: "", bio: "Director of MedTech research focusing on clinical deep learning validation." }
    },
    {
      id: "mock-2",
      title: "Robotic Surgery Enters the Nano-Scale Era",
      slug: "robotic-surgery-nano-scale",
      excerpt: "Miniaturized surgical robots are transitioning from labs to operating tables, promising ultra-precise, stitchless surgeries.",
      content: `
        <p>The field of surgical robotics is undergoing a dramatic transformation. While systems like da Vinci pioneered laparoscopic precision, the next wave of innovation focuses on the micro and nano-scales. Engineers have developed micro-catheters and wireless capsule robots that can navigate the human circulatory system to perform targeted interventions.</p>
        
        <h2>Inside the World of Micro-Robotics</h2>
        <p>These tiny devices, often smaller than a grain of rice, are guided externally using electromagnetic fields. They can navigate through delicate blood vessels in the brain to clear blockages or deliver microscopic payloads of chemotherapy directly to the core of a tumor, bypassing healthy tissues entirely.</p>
        
        <h2>Key Clinical Advantages</h2>
        <p>By minimizing the incision size to a microscopic level, patients experience significantly less trauma.</p>
        <h3>Ultra-Fast Recovery</h3>
        <p>Reduction in average hospital stay from 5 days to under 12 hours for complex vascular procedures.</p>
        <h3>Extremely Low Infection Rates</h3>
        <p>Incredibly low rates of post-operative infection due to the non-invasive nature of the electromagnetic guides.</p>
      `,
      cover_image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      published: true,
      published_at: new Date("2026-06-28").toISOString(),
      categories: { name: "Surgical Robotics", slug: "surgical-robotics" },
      authors: { name: "Marcus Vance", avatar: "", bio: "Senior tech writer covering robotic engineering and surgical advances." }
    }
  ];

  const matched = MOCK_POSTS.find((p) => p.slug === slug);
  return { post: matched || null, isDbConnected: false };
}

// 2. Generate Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPost(slug);

  if (!post) {
    return {
      title: "Article Not Found - The MedTech Pulse",
    };
  }

  const title = post.seo_title || `${post.title} - The MedTech Pulse`;
  const description = post.seo_description || post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.published_at,
      images: [
        {
          url: post.cover_image,
          width: 800,
          height: 450,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.cover_image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { post, isDbConnected } = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Parse Table of Contents and inject anchor IDs into HTML headings dynamically
  const headings: { level: number; text: string; id: string }[] = [];
  let headingIndex = 0;

  // Regex to match <h2> and <h3> tags and extract their clean text content
  const headingRegex = /<h([23])>(.*?)<\/h\1>/g;
  let match;
  while ((match = headingRegex.exec(post.content)) !== null) {
    const level = parseInt(match[1]);
    const rawText = match[2];
    const text = rawText.replace(/<\/?[^>]+(>|$)/g, ""); // Strip nested tags
    const id = `${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${headingIndex++}`;
    headings.push({ level, text, id });
  }

  // Re-write the HTML body content to inject matching id="..." parameters
  let processedContent = post.content;
  let replacerIndex = 0;
  processedContent = post.content.replace(/<h([23])>(.*?)<\/h\1>/g, (m, level, text) => {
    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
    const id = `${cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${replacerIndex++}`;
    return `<h${level} id="${id}">${text}</h${level}>`;
  });

  const getInitials = (name: string) => {
    if (!name) return "MP";
    const parts = name.split(" ");
    return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_80%_20%,rgba(94,51,170,0.02),transparent_40%)] py-12">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog Feed
        </Link>

        {/* Database Warning indicator if missing env */}
        {!isDbConnected && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-800 dark:text-yellow-200 rounded-2xl text-xs font-semibold text-center">
            ⚠️ Supabase environment variables are missing or connection failed. Showing dynamic mock article content.
          </div>
        )}

        {/* Article Meta Header */}
        <header className="space-y-4 mb-8">
          {post.categories && (
            <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full">
              {post.categories.name}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-text-primary leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-b border-glass-border pb-6">
            {post.authors && (
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-bold text-sm flex items-center justify-center shadow-sm select-none">
                  {getInitials(post.authors.name)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary">{post.authors.name}</span>
                  <span className="text-xs text-text-muted">
                    {formatDate(post.published_at)} • {readingTime(post.content)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-glass-border shadow-md bg-bg-tertiary mb-12">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Core Layout containing TOC and post content */}
        <BlogClientContainer
          postTitle={post.title}
          postSlug={post.slug}
          postCategorySlug={post.categories?.slug || "general"}
          postCategoryName={post.categories?.name || "General"}
          headings={headings}
          articleHtml={processedContent}
        />

        {/* Author Bio Box */}
        {post.authors && post.authors.bio && (
          <section className="mt-16 p-8 bg-bg-secondary rounded-3xl border border-glass-border shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-bold text-xl flex items-center justify-center shadow-sm select-none shrink-0">
              {getInitials(post.authors.name)}
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-text-primary">About {post.authors.name}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{post.authors.bio}</p>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
