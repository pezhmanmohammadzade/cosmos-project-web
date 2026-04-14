import { Link, useLocation } from 'react-router-dom';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/cosmos-project', label: 'Cosmos Project' },
  { path: '/selected-projects', label: 'Selected Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand / Logo Removed */}
        <div className="w-24 h-8 invisible" aria-hidden="true" />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2 p-1.5 rounded-full glass-panel">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all",
                  isActive 
                    ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu toggle (placeholder for clean structure) */}
        <button 
          className="md:hidden text-white/70 hover:text-white p-2"
          aria-label="Toggle mobile menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

      </div>
    </nav>
  );
}
