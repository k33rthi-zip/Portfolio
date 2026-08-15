import { profileLinks } from "@/data/portfolio-data";

const base =
  "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5";

export default function HeroLinks() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <a
        href={profileLinks.resume}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open resume PDF in a new tab"
        className={`${base} border-2 border-pine/30 bg-cream/70 text-pine hover:border-pine`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
          <path d="M6 2h8l4 4v16H6Z" fill="currentColor" opacity="0.9" />
          <path d="M14 2v4h4" fill="var(--color-cream)" opacity="0.7" />
          <rect x="9" y="12" width="6" height="1.8" fill="var(--color-cream)" />
          <rect x="9" y="16" width="6" height="1.8" fill="var(--color-cream)" />
        </svg>
        Resume
      </a>

      <a
        href={profileLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className={`${base} border-2 border-pine/30 bg-cream/70 text-pine hover:border-pine`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
          <rect x="1" y="1" width="22" height="22" rx="4" fill="currentColor" />
          <circle cx="7" cy="7" r="2" fill="var(--color-cream)" />
          <rect x="5.4" y="10" width="3.2" height="9" fill="var(--color-cream)" />
          <path d="M11 10h3v1.4c.7-1.1 1.9-1.7 3.2-1.7 2.2 0 3.8 1.4 3.8 4.2V19h-3.2v-4.5c0-1.3-.6-2-1.7-2s-1.9.8-1.9 2.1V19H11Z" fill="var(--color-cream)" />
        </svg>
        LinkedIn
      </a>

      <a
        href={profileLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className={`${base} border-2 border-pine/30 bg-cream/70 text-pine hover:border-pine`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
          <path
            fill="currentColor"
            d="M12 1.5A10.5 10.5 0 0 0 8.7 22c.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5.2 0-1.1.4-2 1-2.7-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1a9.8 9.8 0 0 1 5.2 0c2-1.3 2.9-1 2.9-1 .6 1.4.2 2.5.1 2.8.6.7 1 1.6 1 2.7 0 4-2.4 4.9-4.7 5.2.4.3.7 1 .7 2v3c0 .3.2.6.7.5A10.5 10.5 0 0 0 12 1.5Z"
          />
        </svg>
        GitHub
      </a>
    </div>
  );
}
