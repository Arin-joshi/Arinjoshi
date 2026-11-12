"use client";

import React, { useState, useRef, useEffect } from "react";
import { PERSONAL_INFO } from "@/constants";
import {
  Mail,
  MapPin,
  Send,
  Check,
  Copy,
  Code2,
  Github,
  Linkedin,
  MessageCircle,
  PhoneCall,
  ChevronDown,
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
    <section id="contact" className="py-11 sm:py-20 border-t border-black/[0.06] dark:border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="max-w-2xl space-y-2 mb-7 sm:mb-12">
          <div className="text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Contact
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Open to Software Development Engineer roles, real-time web platforms, and full-stack product engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">

          {/* Left Column: Unified Direct Communication Hub (Compact & Crisp on Mobile) */}
          <div className="lg:col-span-5 w-full min-w-0">
            <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800/80">

              {/* Row 1: Instant Phone Channels (WhatsApp + Direct Call side-by-side) */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-code uppercase tracking-wider text-zinc-400">
                    Instant Reach
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-code font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {PERSONAL_INFO.phone}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={PERSONAL_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 dark:bg-emerald-500/15 dark:hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-colors active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.phone}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-100/90 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/70 text-zinc-900 dark:text-zinc-100 text-xs font-semibold transition-colors active:scale-[0.98]"
                  >
                    <PhoneCall className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Call Direct</span>
                  </a>
                </div>
              </div>

              {/* Row 2: Direct Email (Full address + 1-click Copy) */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono-code uppercase tracking-wider text-zinc-400">
                        Direct Email
                      </div>
                      <a
                        href={PERSONAL_INFO.socials.email}
                        className="text-xs sm:text-sm font-semibold font-mono-code text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all block"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors active:scale-95 cursor-pointer shrink-0 border border-zinc-200/80 dark:border-zinc-700/70"
                    title={copiedEmail ? "Copied!" : "Copy email address"}
                    aria-label={copiedEmail ? "Email copied" : "Copy email"}
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Row 3: Location & Social Profiles */}
              <div className="p-4 sm:p-5 space-y-3 bg-zinc-50/60 dark:bg-zinc-900/40">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div className="text-xs leading-snug">
                    <div className="font-semibold text-zinc-950 dark:text-white">
                      {PERSONAL_INFO.location}
                    </div>
                    <div className="text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400 mt-0.5">
                      IST (UTC+5:30) · Open to Remote &amp; Relocation
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-zinc-800/90 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-[0.98] transition-colors border border-zinc-200/80 dark:border-zinc-700/70"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-zinc-800/90 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white active:scale-[0.98] transition-colors border border-zinc-200/80 dark:border-zinc-700/70"
                  >
                    <Github className="w-3.5 h-3.5 shrink-0" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-zinc-800/90 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 active:scale-[0.98] transition-colors border border-zinc-200/80 dark:border-zinc-700/70"
                  >
                    <Code2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>LeetCode</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Direct Opportunity Form */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

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
