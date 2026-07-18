"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ToastContext";
import { User, CheckCircle2, Mail, Phone } from "lucide-react";

export default function About() {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      showToast(`Thank you ${form.name}! Your inquiry has been sent to our editorial desk.`);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_80%_20%,rgba(94,51,170,0.04),transparent_45%)] py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* About Hero Branding Area */}
        <section className="text-center py-12 md:py-16 relative">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
            Our Identity
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-text-primary mt-2 mb-6">
            About The Medtech Pulse
          </h1>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            The Medtech Pulse is a premium platform focusing on the intersections of medical technology advancements, FDA guidelines, and preventative patient education.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 border-t border-glass-border">
          {/* Mission */}
          <div className="bg-bg-secondary p-8 rounded-3xl border border-glass-border shadow-sm flex flex-col space-y-4">
            <h2 className="text-2xl font-bold font-display text-text-primary">
              Our Mission
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              Our mission is simple: to make medical technology developments and clinical health insights transparent and accessible. We track regulatory changes, product innovations, and healthcare shifts to deliver digestible, expert-backed information for researchers, providers, and patients.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-bg-secondary p-8 rounded-3xl border border-glass-border shadow-sm flex flex-col space-y-4">
            <h2 className="text-2xl font-bold font-display text-text-primary">
              Our Vision
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              We envision a world where patients and medical practitioners navigate the complexities of health technology together. By providing transparent, comprehensive updates and clear, actionable disease management resources, we help bridge the gap between complex science and clinical reality.
            </p>
            <ul className="flex flex-col space-y-3 pt-2">
              {[
                "Creating a highly engaged medtech community",
                "Reducing medical misinformation on online spaces",
                "Uplifting patient wellness and early condition diagnostics",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <CheckCircle2 size={16} className="text-brand-secondary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Meet The Founders Section */}
        <section className="py-16 border-t border-glass-border text-center">
          <div className="mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
              Leadership
            </span>
            <h2 className="text-2xl md:text-3.5xl font-extrabold font-display text-text-primary mt-1">
              Meet the Founders
            </h2>
            <p className="text-text-secondary text-sm mt-2 max-w-md mx-auto">
              The visionaries behind The Medtech Pulse, driving editorial excellence and technological engagement in healthcare media.
            </p>
          </div>

          <div className="flex justify-center">
            {/* Founder Card */}
            <div className="bg-bg-secondary rounded-3xl border border-glass-border shadow-md hover:border-brand-primary/50 hover:shadow-xl transition-all duration-300 p-8 max-w-sm w-full text-center group">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-brand-primary/10 to-brand-primary/20 border-4 border-bg-tertiary flex items-center justify-center text-brand-primary transition-all duration-300 group-hover:border-brand-primary">
                <User size={56} />
              </div>
              <h3 className="text-xl font-bold font-display text-text-primary mb-1">
                Sunny Dharaiya
              </h3>
              <div className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-4">
                Founder
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Sunny is a digital product strategist and health enthusiast. Focusing on platform engineering, reader experience, and digital distribution, he leads the technological vision of The Medtech Pulse, bridging premium content with state-of-the-art web accessibility.
              </p>
              <div className="flex justify-center space-x-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-150"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-150"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="mailto:editor@themedtechpulse.com"
                  className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-all duration-150"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 border-t border-glass-border">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Info Column */}
            <div className="lg:col-span-2 flex flex-col space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
                  Get In Touch
                </span>
                <h2 className="text-2xl md:text-3.5xl font-extrabold font-display text-text-primary mt-1">
                  Contact The Pulse Desk
                </h2>
                <p className="text-text-secondary text-sm mt-3 leading-relaxed">
                  Interested in contributing? Or have a medtech product press release you would like our editorial team to review? Drop us a line.
                </p>
              </div>

              <ul className="flex flex-col space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Editorial Desk</h4>
                    <p className="text-xs text-text-secondary mt-0.5">editor@themedtechpulse.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Media & Partnerships</h4>
                    <p className="text-xs text-text-secondary mt-0.5">+91 (124) 4900-MEDTECH</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-3">
              <div className="bg-bg-secondary border border-glass-border p-8 rounded-3xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="px-4 py-3 bg-bg-secondary text-text-primary border border-glass-border rounded-xl outline-none text-sm focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="px-4 py-3 bg-bg-secondary text-text-primary border border-glass-border rounded-xl outline-none text-sm focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="contact-subject" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="contact-subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Inquiry / Feedback / Contribution"
                      className="px-4 py-3 bg-bg-secondary text-text-primary border border-glass-border rounded-xl outline-none text-sm focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      id="contact-message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your inquiry in detail..."
                      className="px-4 py-3 bg-bg-secondary text-text-primary border border-glass-border rounded-xl outline-none text-sm h-32 resize-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl cursor-pointer hover:shadow-lg hover:shadow-brand-primary/20 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 text-sm"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
