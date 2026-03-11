"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 px-4 md:px-8">
      <div className="absolute inset-0 bg-grid opacity-100" />
      <div className="absolute inset-0 hero-glow" />
      <SpeedLines />

      <div className="relative z-10 max-w-7xl mx-auto w-full py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left — Text */}
          <div className="flex-1 w-full text-center lg:text-left">

            {/* PWA Badge — disponible MAINTENANT */}
            <motion.a
              href="https://saas.mytoolsgroup.eu"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-green-500/10 border border-green-500/30 hover:border-green-400/60 rounded-full px-4 py-2 mb-6 cursor-pointer transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="font-michroma text-green-400 text-[10px] md:text-xs tracking-widest uppercase group-hover:text-green-300 transition-colors">
                PWA disponible — Accédez maintenant →
              </span>
            </motion.a>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-michroma text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-widest mb-2"
            >
              MY<span className="text-[#DC2626]">TOOLS</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4 justify-center lg:justify-start mb-8"
            >
              <div className="h-0.5 w-12 bg-[#DC2626] speedbar" />
              <span className="font-michroma text-xl md:text-2xl text-[#A8A8A8] tracking-[0.3em] uppercase">
                ADMIN
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-michroma text-[#A8A8A8] text-sm md:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4 tracking-wide"
            >
              Votre garage dans votre poche.
              <br />
              <span className="text-white">Devis. Factures. Clients. Réservations.</span>
              <br />
              Tout en temps réel, partout.
            </motion.p>

            {/* Marketing accroche */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col gap-2 mb-10 max-w-md mx-auto lg:mx-0"
            >
              {[
                "Zéro paperasse. 100% digital.",
                "Gérez depuis votre canapé ou votre atelier.",
                "Conçu pour les pros de l'automobile.",
              ].map((line, i) => (
                <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-4 h-0.5 bg-[#DC2626] flex-shrink-0" />
                  <span className="font-michroma text-[#666] text-xs tracking-widest uppercase">{line}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12"
            >
              {/* PWA CTA — disponible */}
              <a
                href="https://saas.mytoolsgroup.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-michroma text-xs tracking-widest uppercase px-6 py-4 rounded-lg transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] overflow-hidden relative"
              >
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                Utiliser la PWA
              </a>

              {/* Mobile app — coming soon */}
              <div className="group relative inline-flex items-center justify-center gap-3 border border-[#2A2A2A] hover:border-[#DC2626]/40 text-[#A8A8A8] font-michroma text-xs tracking-widest uppercase px-6 py-4 rounded-lg transition-all cursor-default">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                App Mobile
                <span className="absolute -top-2.5 -right-2 bg-[#DC2626] font-michroma text-white text-[8px] tracking-widest px-2 py-0.5 rounded-full uppercase">
                  Bientôt
                </span>
              </div>
            </motion.div>

            {/* Store badges — coming soon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap items-center gap-3 justify-center lg:justify-start"
            >
              <span className="font-michroma text-[#666] text-[10px] tracking-widest uppercase">Bientôt disponible sur</span>
              <div className="flex items-center gap-2">
                <StoreBadge icon="🍎" label="App Store" />
                <StoreBadge icon="▶" label="Google Play" />
              </div>
            </motion.div>
          </div>

          {/* Right — Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center items-center w-full"
          >
            <div className="relative w-full max-w-[260px] md:max-w-[300px]">
              <div className="absolute inset-0 bg-[#DC2626]/15 blur-3xl rounded-full" />
              <PhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 border border-[#2A2A2A] rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-1 bg-[#DC2626] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

function SpeedLines() {
  const lines = [
    { top: "20%", width: "120px", delay: 0 },
    { top: "35%", width: "80px", delay: 0.3 },
    { top: "55%", width: "150px", delay: 0.6 },
    { top: "70%", width: "60px", delay: 0.9 },
    { top: "80%", width: "100px", delay: 0.15 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          className="absolute right-0 h-px bg-gradient-to-l from-transparent via-[#DC2626]/30 to-transparent"
          style={{ top: l.top, width: l.width }}
          animate={{ x: [0, -300, 0], opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            delay: l.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function StoreBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-[#161616] border border-[#2A2A2A] rounded-lg px-3 py-1.5 opacity-60">
      <span className="text-sm">{icon}</span>
      <span className="font-michroma text-[#666] text-[9px] tracking-widest uppercase">{label}</span>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-full aspect-[9/19.5] bg-[#161616] border border-[#2A2A2A] rounded-[44px] overflow-hidden shadow-2xl shadow-black/80">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0A0A0A] rounded-b-2xl z-10" />

      <div className="p-4 pt-10 h-full flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-michroma text-[#666] text-[9px] tracking-widest uppercase">Bonjour</div>
            <div className="font-michroma text-white text-xs tracking-wide">Admin</div>
          </div>
          <div className="w-7 h-7 bg-[#DC2626] rounded-xl flex items-center justify-center">
            <span className="font-michroma text-white text-[8px]">MT</span>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-2">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-[#0A0A0A] rounded-2xl p-2.5 border border-[#2A2A2A]">
              <div className="font-michroma text-[#666] text-[7px] tracking-widest uppercase">{kpi.label}</div>
              <div className={`font-michroma font-bold text-sm mt-1 ${kpi.color}`}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="bg-[#0A0A0A] rounded-2xl p-2.5 border border-[#2A2A2A] flex-1">
          <div className="font-michroma text-[#666] text-[7px] tracking-widest uppercase mb-2">6 mois</div>
          <div className="flex items-end gap-1 h-16">
            {[35, 60, 45, 75, 65, 100].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  background:
                    i === 5
                      ? "linear-gradient(180deg, #DC2626 0%, rgba(220,38,38,0.2) 100%)"
                      : "rgba(220,38,38,0.2)",
                }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* PWA Badge inside phone */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
          <span className="font-michroma text-green-400 text-[7px] tracking-widest uppercase">PWA en ligne</span>
        </div>

        {/* Tab bar */}
        <div className="flex justify-around pb-1 border-t border-[#2A2A2A] pt-2">
          {["📊", "📄", "🧾", "📅", "👥"].map((icon, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${
                i === 0 ? "bg-[#DC2626]" : ""
              }`}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const kpis = [
  { label: "CA Mois", value: "12 840 €", color: "text-green-400" },
  { label: "En attente", value: "3 200 €", color: "text-[#DC2626]" },
  { label: "Clients", value: "247", color: "text-white" },
  { label: "RDV aujourd'hui", value: "18", color: "text-white" },
];
