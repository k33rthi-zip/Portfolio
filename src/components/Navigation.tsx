import { personalInfo } from "@/data/portfolio-data";

interface NavigationProps {
  scrolled?: boolean;
}

const links = [
  { label: "Home", href: "#main-content" },
  { label: "Experience", href: "#work" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation(_props: NavigationProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border px-8 md:px-16 lg:px-24"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-base sm:text-lg md:text-xl font-bold">{personalInfo.name}</span>
            <span className="text-sm sm:text-base md:text-lg font-semibold text-muted-foreground">{personalInfo.title}</span>
          </div>

          <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm sm:text-base md:text-lg font-semibold hover:text-muted-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
