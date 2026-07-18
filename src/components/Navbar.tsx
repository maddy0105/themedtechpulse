"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeContext";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Medtech News", href: "/news" },
    { label: "Patient Awareness", href: "/awareness" },
    { label: "About Us", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 left-0 w-full h-20 bg-glass-bg/70 backdrop-blur-md border-b border-glass-border z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 select-none group" aria-label="The Medtech Pulse Home">
          <svg className="h-10 w-auto" viewBox="0 0 320 60" xmlns="http://www.w3.org/2000/svg">
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
              fill="var(--text-primary, #1a0533)"
              className="fill-text-primary transition-colors duration-300 tracking-wide"
            >
              THE MEDTECH PULSE
            </text>
          </svg>
          {/* Pulse Dot Indicator */}
          <span className="relative flex h-2.5 w-2.5 -top-1 ml-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent"></span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? "text-brand-primary bg-bg-tertiary"
                  : "text-text-secondary hover:text-brand-primary hover:bg-bg-tertiary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-glass-border bg-bg-secondary text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-200 hover:rotate-12 cursor-pointer shadow-sm"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-text-primary hover:text-brand-primary transition-colors cursor-pointer"
            aria-label="Open Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-bg-secondary border-b border-glass-border flex flex-col p-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-semibold p-3 rounded-xl transition-colors ${
                isActive(item.href)
                  ? "text-brand-primary bg-bg-tertiary"
                  : "text-text-secondary hover:text-brand-primary hover:bg-bg-tertiary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
