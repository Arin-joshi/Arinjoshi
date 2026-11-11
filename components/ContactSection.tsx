"use client";

import React, { useState, useRef, useEffect } from "react";
import { PERSONAL_INFO } from "@/constants";
import {
  Mail,
  MapPin,
  Send,
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  FileDown,
  MessageCircle,
  PhoneCall,
  ChevronDown,
  Sparkles
} from "lucide-react";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-Time SDE Opportunity",
    message: "",
  });

  const subjectOptions = [
    { value: "Full-Time SDE Opportunity", label: "Full-Time SDE Opportunity" },
    { value: "Senior Frontend / Full-Stack Role", label: "Senior Frontend / Full-Stack Role" },
    { value: "Contract / Architecture Consultation", label: "Contract / Architecture Consultation" },
    { value: "New Product Collaboration", label: "New Product Collaboration" },
    { value: "General Engineering Inquiry", label: "General Engineering Inquiry" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject + " - from " + formData.name
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-black/[0.06] dark:border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Apple-grade Section Header */}
        <div className="max-w-2xl space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide border border-blue-500/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Communication Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-950 dark:text-white tracking-tight">
            Let&apos;s Build Something Resilient
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Open to high-impact Software Development Engineer roles, real-time distributed platforms, and product engineering challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Connection Channels (Apple Native Card Style) */}
          <div className="lg:col-span-5 w-full min-w-0 space-y-4">

            {/* WhatsApp Premium Card */}
            <a
              href={PERSONAL_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] hover:-translate-y-0.5 flex items-center justify-between gap-4 transition-all duration-200 group cursor-pointer block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(16,185,129,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-zinc-950 dark:text-white flex items-center gap-2">
                    <span>Chat on WhatsApp</span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-code">
                    {PERSONAL_INFO.phone} • Quick Response
                  </div>
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-500 group-hover:text-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 flex items-center justify-center transition-all group-hover:scale-105 shrink-0">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>

            {/* Direct Phone Card */}
            <div className="p-5 rounded-3xl bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-black/[0.12] dark:hover:border-white/[0.15] transition-all duration-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider">Direct Phone</div>
                  <a
                    href={PERSONAL_INFO.socials.phone}
                    className="text-sm font-semibold text-zinc-950 dark:text-white font-mono-code hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              <a
                href={PERSONAL_INFO.socials.phone}
                className="px-3.5 py-2 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/90 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold font-mono-code text-zinc-800 dark:text-zinc-200 transition-all active:scale-95 shrink-0 border border-black/[0.04] dark:border-white/[0.06] shadow-xs"
              >
                Call Direct
              </a>
            </div>

            {/* Email Card with 1-Click Copy */}
            <div className="p-5 rounded-3xl bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-black/[0.12] dark:hover:border-white/[0.15] transition-all duration-200 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(99,102,241,0.25),inset_0_1px_0_rgba(255,255,255,0.35)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono-code text-zinc-400 uppercase tracking-wider">Direct Email</div>
                    <div className="text-sm font-semibold text-zinc-950 dark:text-white font-mono-code truncate">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/90 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95 cursor-pointer shrink-0 border border-black/[0.04] dark:border-white/[0.06]"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono-code font-semibold">
                      <Check className="w-4 h-4" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex gap-2.5">
                <a
                  href={PERSONAL_INFO.socials.email}
                  className="flex-1 text-center py-2.5 px-4 rounded-xl bg-gradient-to-b from-zinc-900 to-black hover:from-zinc-800 hover:to-zinc-950 text-white dark:from-white dark:to-zinc-100 dark:hover:from-zinc-100 dark:hover:to-zinc-200 dark:text-zinc-950 text-xs font-semibold shadow-xs active:scale-[0.98] transition-all"
                >
                  Open Mail Client
                </a>
                <a
                  href={PERSONAL_INFO.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center gap-1.5 transition-all active:scale-[0.98] border border-black/[0.04] dark:border-white/[0.06]"
                >
                  <FileDown className="w-3.5 h-3.5 text-blue-500" />
                  <span>Resume</span>
                </a>
              </div>
            </div>

            {/* Location & Social Row */}
            <div className="p-5 rounded-3xl bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-black/[0.12] dark:hover:border-white/[0.15] transition-all duration-200 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(244,63,94,0.25),inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-950 dark:text-white">
                    {PERSONAL_INFO.location}
                  </div>
                  <div className="text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400">
                    Timezone: {PERSONAL_INFO.timezone} (UTC+5:30) • Open to Global Relocation
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/90 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 active:scale-[0.98] transition-all border border-black/[0.04] dark:border-white/[0.06]"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/90 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white active:scale-[0.98] transition-all border border-black/[0.04] dark:border-white/[0.06]"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Opportunity Form (Apple High-End Inset Form) */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className="rounded-3xl bg-white/90 dark:bg-[#121217]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.08] p-7 sm:p-9 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6),0_1px_2px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]">

              <div className="mb-6 space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                  Send Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  Fill this out to generate an email directly to Arin Joshi.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight flex items-center justify-between">
                      <span>Your Name</span>
                      <span className="text-[10px] text-zinc-400 font-normal">Required</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-zinc-100/75 dark:bg-zinc-800/40 hover:bg-zinc-100/95 dark:hover:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 focus:bg-white dark:focus:bg-[#0c0c10] focus:border-blue-500/80 dark:focus:border-blue-400/80 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-blue-400/20 text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all duration-200 focus:outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight flex items-center justify-between">
                      <span>Your Email / Organization</span>
                      <span className="text-[10px] text-zinc-400 font-normal">Required</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-zinc-100/75 dark:bg-zinc-800/40 hover:bg-zinc-100/95 dark:hover:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 focus:bg-white dark:focus:bg-[#0c0c10] focus:border-blue-500/80 dark:focus:border-blue-400/80 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-blue-400/20 text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all duration-200 focus:outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                </div>

                  {/* Apple Custom Select Dropdown (Zero Native OS Blue Menu) */}
                  <div className="space-y-2 relative" ref={dropdownRef}>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight flex items-center justify-between">
                      <span>Subject / Discussion Topic</span>
                      <span className="text-[10px] text-zinc-400 font-normal">Select Topic</span>
                    </label>

                    <div className="relative">
                        {/* Trigger Button */}
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-zinc-100/75 dark:bg-zinc-800/40 hover:bg-zinc-100/95 dark:hover:bg-zinc-800/60 border ${isDropdownOpen
                            ? "border-blue-500/80 dark:border-blue-400/80 ring-4 ring-blue-500/15 dark:ring-blue-400/20 bg-white dark:bg-[#0c0c10]"
                            : "border-zinc-200/80 dark:border-zinc-700/60"
                          } text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-all duration-200 focus:outline-none flex items-center justify-between cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]`}
                        aria-haspopup="listbox"
                        aria-expanded={isDropdownOpen}
                      >
                      <span className="truncate">{formData.subject}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 shrink-0 ml-2 ${isDropdownOpen ? "rotate-180 text-blue-500 dark:text-blue-400" : ""
                          }`}
                      />
                    </button>

                    {/* Floating Apple Glass Menu */}
                    {isDropdownOpen && (
                      <div
                        role="listbox"
                        className="absolute z-50 left-0 right-0 mt-2 p-1.5 rounded-2xl bg-white/95 dark:bg-[#14141a]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-[0_16px_40px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] space-y-1 animate-in fade-in zoom-in-95 duration-150"
                      >
                        {subjectOptions.map((opt) => {
                          const isSelected = formData.subject === opt.value;

                          return (
                            <button
                              key={opt.value}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setFormData({ ...formData, subject: opt.value });
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-between cursor-pointer ${isSelected
                                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs"
                                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 hover:text-zinc-950 dark:hover:text-white"
                                }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && (
                                <Check className="w-4 h-4 shrink-0 ml-2 text-emerald-400 dark:text-emerald-600" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight flex items-center justify-between">
                    <span>Message</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Required</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about the engineering challenge, team, or project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-zinc-100/75 dark:bg-zinc-800/40 hover:bg-zinc-100/95 dark:hover:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 focus:bg-white dark:focus:bg-[#0c0c10] focus:border-blue-500/80 dark:focus:border-blue-400/80 focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-blue-400/20 text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all duration-200 focus:outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] resize-none"
                  />
                </div>

                {/* Apple Signature High-Tactile Submit Button */}
                <button
                  type="submit"
                  className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black hover:from-zinc-800 hover:to-zinc-900 text-white dark:from-white dark:via-zinc-100 dark:to-zinc-200 dark:hover:from-zinc-100 dark:hover:to-zinc-300 dark:text-black font-semibold text-sm shadow-[0_2px_10px_rgba(0,0,0,0.14),0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.15),0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.9)] active:scale-[0.985] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Send Message via Email</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
