"use client";

import React, { useState } from "react";
import { useToast } from "./ToastContext";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast("Successfully subscribed to The Medtech Pulse newsletter!");
      setEmail("");
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 mb-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-glass-border p-8 md:p-12 shadow-xl group">
        {/* Ambient Gradient Background Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-primary/10 blur-3xl transition-all duration-700 group-hover:bg-brand-primary/15" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <div>
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-text-primary mb-3">
              Stay Ahead in Medtech
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Subscribe to our weekly digest for the latest industry breakthroughs, FDA clearances, and medical guidelines directly to your inbox.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-4 flex items-center text-text-muted">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your professional email"
                className="w-full pl-11 pr-4 py-4 bg-bg-secondary text-text-primary border border-glass-border rounded-2xl outline-none text-base transition-all duration-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-brand-primary/20 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
