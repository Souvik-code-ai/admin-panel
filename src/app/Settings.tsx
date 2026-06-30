import { useState, useRef } from "react";
import { PageHeader } from "./components/ui/Pageheader";
import { Card } from "./components/ui/card";
import {
  ImageIcon,
  X,
  Upload,
  Instagram,
  Check,
  Star,
  ChevronRight,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react";
import { Btn } from "./components/ui/Btn";
export const SettingsPage = () => {
  const [seo, setSeo] = useState({
    title: "APEX Brand Activation | Event Marketing Agency",
    description:
      "APEX is a leading event marketing and brand activation agency with offices across 8 global cities. Specialists in experiential marketing, exhibitions, and digital campaigns.",
    keywords:
      "event marketing, brand activation, exhibitions, experiential, MENA",
  });

  const [social, setSocial] = useState({
    instagram: "@apexbrandactivation",
    twitter: "@apexevents",
    linkedin: "company/apex-brand-activation",
    facebook: "apexbrandactivation",
  });

  // ── logo state ─────────────────────────────────────────────────────────────
  const [logo, setLogo] = useState<string>("");
  const [logoError, setLogoError] = useState<string>("");
  const logoRef = useRef<HTMLInputElement>(null);

  // ── logo upload handler ────────────────────────────────────────────────────

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. File size check — must be ≤ 500 KB
    const maxBytes = 500 * 1024; // 500 KB
    if (file.size > maxBytes) {
      setLogoError(
        `File too large (${(file.size / 1024).toFixed(0)} KB). Maximum allowed size is 500 KB.`,
      );
      e.target.value = "";
      return;
    }

    // 2. Resolution check — must be exactly 500×500 px
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth !== 500 || img.naturalHeight !== 500) {
          setLogoError(
            `Image must be exactly 500×500 px (uploaded: ${img.naturalWidth}×${img.naturalHeight} px).`,
          );
          return;
        }
        // All checks passed
        setLogoError("");
        setLogo(ev.target!.result as string);
      };
      img.src = ev.target!.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeLogo = () => {
    setLogo("");
    setLogoError("");
  };

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure your website, SEO, social media presence, and legal content."
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* ── Website Branding ── */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-5 flex items-center gap-2">
              <div className="w-6 h-6 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                <ImageIcon size={13} className="text-[#0F4C81]" />
              </div>
              Website Branding
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Company Logo */}
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                  Company Logo
                </p>

                {logo ? (
                  /* ── Preview state ── */
                  <div className="border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-3 bg-[#F8FAFC]">
                    <img
                      src={logo}
                      alt="Company logo"
                      className="w-16 h-16 object-contain rounded-lg border border-[#E2E8F0] bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#0F172A]">
                        Logo uploaded
                      </p>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">
                        500×500 px · PNG/SVG
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeLogo}
                      title="Remove logo"
                      className="w-6 h-6 rounded-full bg-[#F1F5F9] hover:bg-red-50 flex items-center justify-center text-[#94A3B8] hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  /* ── Upload zone ── */
                  <div
                    onClick={() => logoRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group ${
                      logoError
                        ? "border-red-400 bg-red-50 hover:border-red-500"
                        : "border-[#E2E8F0] hover:border-[#0F4C81]"
                    }`}
                  >
                    <Upload
                      size={20}
                      className={`mx-auto mb-2 transition-colors ${
                        logoError
                          ? "text-red-400"
                          : "text-[#94A3B8] group-hover:text-[#0F4C81]"
                      }`}
                    />
                    <p className="text-xs text-[#64748B]">
                      Click to upload Company Logo
                    </p>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">
                      PNG, SVG · Exactly 500×500 px · Max 500 KB
                    </p>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  ref={logoRef}
                  type="file"
                  accept="image/png,image/svg+xml"
                  className="hidden"
                  onChange={handleLogoChange}
                />

                {/* Inline error */}
                {logoError && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1">
                    <span className="flex-shrink-0 mt-0.5">⚠</span>
                    {logoError}
                  </p>
                )}

                {/* Requirement hint (only when no error and no logo) */}
                {!logoError && !logo && (
                  <p className="text-[10px] text-[#94A3B8] mt-1.5">
                    Required: 500×500 px resolution, max 500 KB
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* ── SEO Settings ── */}
          {/* <Card className="p-6">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-5 flex items-center gap-2">
              <div className="w-6 h-6 bg-[#ECFDF5] rounded-lg flex items-center justify-center">
                <Globe size={13} className="text-emerald-600" />
              </div>
              SEO Settings
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                  Page Title
                </label>
                <input
                  value={seo.title}
                  onChange={(e) =>
                    setSeo((s) => ({ ...s, title: e.target.value }))
                  }
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81]"
                />
                <p className="text-[10px] text-[#94A3B8] mt-1">
                  {seo.title.length}/60 characters recommended
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                  Meta Description
                </label>
                <textarea
                  value={seo.description}
                  onChange={(e) =>
                    setSeo((s) => ({ ...s, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] resize-none"
                />
                <p className="text-[10px] text-[#94A3B8] mt-1">
                  {seo.description.length}/160 characters recommended
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                  Keywords
                </label>
                <input
                  value={seo.keywords}
                  onChange={(e) =>
                    setSeo((s) => ({ ...s, keywords: e.target.value }))
                  }
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81]"
                />
              </div>
            </div>
          </Card> */}

          {/* ── Social Media Links ── */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-5 flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FFF7ED] rounded-lg flex items-center justify-center">
                <Instagram size={13} className="text-[#F97316]" />
              </div>
              Social Media Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Instagram,
                  label: "Instagram",
                  key: "instagram",
                  color: "text-pink-500",
                  prefix: "instagram.com/",
                },
                {
                  icon: Twitter,
                  label: "Twitter / X",
                  key: "twitter",
                  color: "text-sky-500",
                  prefix: "x.com/",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  key: "linkedin",
                  color: "text-blue-600",
                  prefix: "linkedin.com/",
                },
                {
                  icon: Facebook,
                  label: "Facebook",
                  key: "facebook",
                  color: "text-blue-700",
                  prefix: "facebook.com/",
                },
              ].map((s) => (
                <div key={s.key}>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wide mb-1.5 flex items-center gap-1.5 ${s.color}`}
                  >
                    <s.icon size={11} />
                    {s.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs">
                      {s.prefix}
                    </span>
                    <input
                      value={(social as any)[s.key]}
                      onChange={(e) =>
                        setSocial((prev) => ({
                          ...prev,
                          [s.key]: e.target.value,
                        }))
                      }
                      className="w-full border border-[#E2E8F0] rounded-lg pl-[4.5rem] pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-3 pb-8">
            <Btn>Save All Settings</Btn>
            <Btn variant="secondary">Reset to Defaults</Btn>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-4">
          <Card className="p-5 border-l-4 border-l-[#0F4C81]">
            <p className="text-xs font-semibold text-[#0F4C81] mb-2">
              SEO Best Practices
            </p>
            <ul className="space-y-2">
              {[
                "Keep page titles under 60 characters",
                "Meta descriptions should be 120-160 chars",
                "Use primary keywords naturally in content",
                "Add alt text to all images for accessibility",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-xs text-[#64748B]"
                >
                  <Check
                    size={11}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5 border-l-4 border-l-[#F97316]">
            <p className="text-xs font-semibold text-[#F97316] mb-2">
              Social Media Tips
            </p>
            <ul className="space-y-2">
              {[
                "Post consistently across all platforms",
                "Use branded hashtags for campaigns",
                "Engage with comments within 2 hours",
                "Track performance with platform analytics",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-xs text-[#64748B]"
                >
                  <Star
                    size={11}
                    className="text-[#F97316] mt-0.5 flex-shrink-0 fill-[#F97316]"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>

          {/* Logo requirements card */}
          <Card className="p-5 border-l-4 border-l-emerald-500">
            <p className="text-xs font-semibold text-emerald-600 mb-2">
              Logo Requirements
            </p>
            <ul className="space-y-2">
              {[
                "Exactly 500×500 px resolution",
                "Maximum file size: 500 KB",
                "Formats accepted: PNG or SVG",
                "Use transparent background for best results",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-xs text-[#64748B]"
                >
                  <Check
                    size={11}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <p className="text-xs font-semibold text-[#0F172A] mb-3">
              Quick Actions
            </p>
            <div className="space-y-2">
              {[
                "Clear Cache",
                "Rebuild Sitemap",
                "Export Backup",
                "Preview Website",
              ].map((a) => (
                <button
                  key={a}
                  className="w-full text-left text-xs text-[#64748B] hover:text-[#0F4C81] py-2 px-3 rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center justify-between group"
                >
                  {a}
                  <ChevronRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
