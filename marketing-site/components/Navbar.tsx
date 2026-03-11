"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
      if (isHome) {
        e.preventDefault();
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
      }
    },
    [isHome]
  );

  const navLinks = [
    { href: isHome ? "#features" : "/#features", anchor: "#features", label: "Fonctionnalités" },
    { href: isHome ? "#how-it-works" : "/#how-it-works", anchor: "#how-it-works", label: "Comment ça marche" },
    { href: "/support", anchor: null, label: "Support" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#2A2A2A]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
          <div className="relative w-8 h-8 shrink-0">
            <Image src="/logo.png" alt="MyTools" fill className="object-contain" />
          </div>
          <span className="font-michroma text-white text-xs md:text-sm tracking-[0.2em] uppercase hidden sm:inline">
            MYTOOLS
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={link.anchor ? (e) => handleAnchor(e, link.anchor!) : undefined}
              className="font-michroma text-[#A8A8A8] hover:text-white text-xs tracking-widest uppercase transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="https://saas.mytoolsgroup.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-michroma text-xs tracking-widest uppercase text-[#A8A8A8] hover:text-white border border-[#2A2A2A] hover:border-[#DC2626]/50 px-4 py-2 rounded-lg transition-all duration-200"
          >
            Application
          </a>
          <a
            href="mailto:contact@mytoolsgroup.eu?subject=Demande accès MyTools Admin"
            className="font-michroma text-xs tracking-widest uppercase text-white bg-[#DC2626] hover:bg-[#B91C1C] px-4 py-2 rounded-lg transition-all duration-200"
          >
            Accès Admin
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#A8A8A8] hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#161616] border-b border-[#2A2A2A] overflow-hidden"
          >
            <div className="px-4 py-5 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={link.anchor ? (e) => handleAnchor(e, link.anchor!) : () => setMenuOpen(false)}
                  className="font-michroma text-[#A8A8A8] hover:text-white text-xs tracking-widest uppercase transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3 border-t border-[#2A2A2A]">
                <a
                  href="https://saas.mytoolsgroup.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-michroma text-xs tracking-widest uppercase text-center text-[#A8A8A8] border border-[#2A2A2A] px-4 py-3 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Application PWA
                </a>
                <a
                  href="mailto:contact@mytoolsgroup.eu?subject=Demande accès MyTools Admin"
                  className="font-michroma text-xs tracking-widest uppercase text-center text-white bg-[#DC2626] px-4 py-3 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Demander l'accès Admin
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
