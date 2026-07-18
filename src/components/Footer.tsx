"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-bg-secondary border-t border-glass-border pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2 select-none group" aria-label="The Medtech Pulse Home">
              <svg className="h-9 w-auto" viewBox="0 0 320 60" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 30 H35 L42 18 L49 42 L56 6 L63 36 L70 26 L76 33 L82 30 H105"
                  fill="none"
                  stroke="var(--color-primary, #5e33aa)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-brand-primary transition-all duration-300 group-hover:stroke-brand-secondary"
                />
                <text
                  x="112"
                  y="38"
                  fontFamily="var(--font-display), Outfit, sans-serif"
                  fontSize="20"
                  fontWeight="800"
                  fill="var(--logo-text-color, #1a0533)"
                  className="fill-text-primary transition-colors duration-300 tracking-wide"
                >
                  THE MEDTECH PULSE
                </text>
              </svg>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              A premium news, intelligence, and patient-awareness platform focused on the dynamic landscape of medical technology and wellness education.
            </p>
          </div>

          {/* Sitemap Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-text-primary">
              Sitemap
            </h4>
            <ul className="flex flex-col space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Medtech News", href: "/news" },
                { label: "Patient Awareness", href: "/awareness" },
                { label: "About Us", href: "/about" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-brand-primary flex items-center gap-1 group transition-all duration-150"
                  >
                    <ChevronRight size={14} className="text-text-muted group-hover:translate-x-0.5 group-hover:text-brand-primary transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-text-primary">
              Connect With Us
            </h4>
            <p className="text-text-secondary text-sm leading-relaxed">
              Have an editorial tip or press release? Get in touch with our founders.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary hover:-translate-y-1 transition-all shadow-sm"
                aria-label="Twitter"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary hover:-translate-y-1 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary hover:-translate-y-1 transition-all shadow-sm"
                aria-label="YouTube"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-glass-border pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted font-medium">
          <p>© 2026 The Medtech Pulse. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
            <Link href="/about" className="hover:text-brand-primary transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
