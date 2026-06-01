import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const Icon = {
  arrow: (p: P) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  arrowDown: (p: P) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}><path d="M8 3v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  check: (p: P) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  phone: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  warning: (p: P) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}><path d="M8 5v4m0 2.5v.01M8 1L1 14h14L8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  plus: (p: P) => (
    <svg viewBox="0 0 16 16" fill="none" {...p}><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  search: (p: P) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" /><path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
  ),
  fb: (p: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.4-2 2-2h2V2.2C16.5 2.1 15.2 2 14 2c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h3z" /></svg>
  ),
};

type LogoProps = { dark?: boolean; logoUrl?: string };

// When a Yext-uploaded logo URL is present, render JUST the image (the file
// already contains the KATTED24 wordmark, so the SVG mark + text fallback is
// only shown when no logo image is set on the entity).
export const Logo = ({ dark = false, logoUrl }: LogoProps) => {
  if (logoUrl) {
    return (
      <span className="logo logo-image">
        <img src={logoUrl} alt="Katted24" />
      </span>
    );
  }
  return (
    <span className="logo">
      <span className="logo-mark">
        <svg viewBox="0 0 32 32" width="20" height="20" fill="none" aria-hidden="true">
          <path d="M4 12 L16 5 L28 12 V24 H4 Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" fill="none" />
          <path d="M4 12 L16 5 L28 12" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" fill="rgba(255,255,255,0.15)" />
          <path d="M10 24 V14 M22 24 V14 M16 24 V9" stroke="#fff" strokeWidth="1.2" opacity="0.6" />
        </svg>
      </span>
      <span className="logo-text" style={dark ? { color: "#fff" } : undefined}>KATTED<span className="num">24</span></span>
    </span>
  );
};
