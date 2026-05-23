import { useEffect, useState } from "react";
import { Menu, X, Camera } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#packages", label: "Packages" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const bookTo = user ? "/dashboard" : "/login";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/95 backdrop-blur shadow-[0_2px_20px_-8px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2">
          <Camera className={`h-6 w-6 ${scrolled || open ? "text-ink" : "text-white"}`} strokeWidth={2.2} />
          <span className={`font-display text-2xl font-bold ${scrolled || open ? "text-ink" : "text-white"}`}>
            Magic<span className="text-primary">Light</span>
            <span className="text-primary">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-ink" : "text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <Link to={bookTo} className="btn-primary !py-2.5 !px-5 text-sm">{user ? "My Dashboard" : "Book Now"}</Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-6 w-6 text-ink" />
          ) : (
            <Menu className={`h-6 w-6 ${scrolled ? "text-ink" : "text-white"}`} />
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="container-px mx-auto py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-ink font-medium">
                {l.label}
              </a>
            ))}
            <Link to={bookTo} onClick={() => setOpen(false)} className="btn-primary mt-2">{user ? "My Dashboard" : "Book Now"}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
