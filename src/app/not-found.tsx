import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_80%_20%,rgba(94,51,170,0.04),transparent_45%)] flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full bg-bg-secondary border border-glass-border rounded-3xl p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle size={32} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold font-display text-text-primary">
            404 - Page Not Found
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            The page you are looking for does not exist or has been moved. Check the URL or return to the blog feed.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 w-full py-3 font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer text-sm"
          >
            <ArrowLeft size={16} />
            Back to Blog Feed
          </Link>
        </div>
      </div>
    </div>
  );
}
