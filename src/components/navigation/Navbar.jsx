import { useState, useRef, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import gsap from 'gsap';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/cosmos-project', label: 'Cosmos Project' },
  { path: '/selected-projects', label: 'Selected Projects' },
  { path: '/cosmic-lab', label: 'Cosmic Lab' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const menuLinksRef = useRef([]);

  const toggleMenu = () => setIsOpen(!isOpen);

  useLayoutEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'expo.out',
        pointerEvents: 'auto'
      });
      gsap.to(menuLinksRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.1,
        ease: 'power2.out'
      });
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
        pointerEvents: 'none'
      });
      gsap.to(menuLinksRef.current, {
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  // Close menu when location changes
  useLayoutEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 py-8 px-4 w-auto transition-all duration-300">
        <div className="flex items-center justify-center gap-4">
          
          {/* Desktop Links (Pill Style) */}
          <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full overflow-hidden glass-panel border border-white/10 shadow-2xl">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-all whitespace-nowrap",
                    isActive 
                      ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/5" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu toggle (Floating or integrated) */}
          <button 
            className="md:hidden z-50 text-white/70 hover:text-white p-3 rounded-full glass-panel border border-white/10 transition-all active:scale-95 shadow-2xl"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isOpen}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <span className={cn(
                "absolute block w-5 h-0.5 bg-current transition-all duration-300",
                isOpen ? "rotate-45" : "-translate-y-1.5"
              )} />
              <span className={cn(
                "absolute block w-5 h-0.5 bg-current transition-all duration-300",
                isOpen ? "opacity-0" : "opacity-100"
              )} />
              <span className={cn(
                "absolute block w-5 h-0.5 bg-current transition-all duration-300",
                isOpen ? "-rotate-45" : "translate-y-1.5"
              )} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-40 md:hidden bg-cosmo-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 opacity-0 pointer-events-none"
      >
        <div className="flex flex-col gap-6 items-center">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                ref={el => menuLinksRef.current[index] = el}
                to={link.path}
                className={cn(
                  "text-2xl font-bold uppercase tracking-[0.3em] transition-all py-2 opacity-0 translate-y-4",
                  isActive ? "text-white" : "text-white/30 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        
        {/* Decorative element */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-cosmo-blue/50 to-transparent" />
      </div>
    </>
  );
}
