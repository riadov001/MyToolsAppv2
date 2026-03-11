"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-6 md:px-0">
      <div className="absolute inset-0 bg-grid opacity-100" />
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full bg-brand-red/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 py-20">
          <div className="flex-1 w-full text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-3 md:px-4 py-1.5 mb-6 md:mb-8 justify-center lg:justify-start w-full lg:w-auto"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-brand-red text-xs md:text-sm font-semibold tracking-wider uppercase font-inter">
                Application Pro — Accès administrateur
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-michroma text-4xl md:text-6xl lg:text-7xl text-text-primary leading-tight tracking-wide mb-4 md:mb-6"
            >
              MY<span className="text-brand-red">TOOLS</span>
              <br />
              <span className="text-2xl md:text-4xl lg:text-5xl text-text-secondary tracking-widest">
                ADMIN
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-inter text-text-secondary text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10"
            >
              La gestion complète de votre garage dans votre poche. Devis, factures, réservations et clients — en temps réel, depuis votre smartphone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-12"
            >
              <a
                href="mailto:contact@mytoolsgroup.eu?subject=Demande accès MyTools Admin"
                className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all hover:shadow-lg hover:shadow-brand-red/25 text-sm md:text-base font-inter"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Demander l'accès
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 border border-dark-border hover:border-brand-red/40 text-text-secondary hover:text-text-primary font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all text-sm md:text-base font-inter"
              >
                Découvrir
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-6 md:gap-8 justify-center lg:justify-start"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-xl md:text-2xl font-bold text-brand-red font-inter">{s.value}</div>
                  <div className="text-text-tertiary text-xs md:text-sm mt-0.5 font-inter">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center items-center w-full"
          >
            <div className="relative w-full max-w-xs md:max-w-sm">
              <div className="absolute inset-0 bg-brand-red/20 blur-3xl rounded-full scale-75" />
              <PhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-tertiary text-xs tracking-widest uppercase font-inter">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-brand-red to-transparent" />
      </motion.div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-full aspect-[9/16] max-w-xs mx-auto bg-dark-surface border border-dark-border rounded-[44px] overflow-hidden shadow-2xl shadow-black/60">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-dark-base rounded-b-2xl z-10" />
      <div className="p-5 pt-12 h-full flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center">
            <span className="font-michroma text-white text-xs">MT</span>
          </div>
          <div>
            <div className="text-text-tertiary text-xs">Bonjour,</div>
            <div className="text-text-primary font-bold text-sm">Admin</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-dark-elevated rounded-2xl p-3 border border-dark-border">
              <div className="text-text-tertiary text-xs uppercase tracking-wide font-inter">{kpi.label}</div>
              <div className={`font-bold text-base mt-1 font-inter ${kpi.color}`}>{kpi.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-dark-elevated rounded-2xl p-3 border border-dark-border flex-1">
          <div className="text-text-tertiary text-xs uppercase tracking-wide mb-2 font-inter">6 mois</div>
          <div className="flex items-end gap-1.5 h-20">
            {[40, 65, 50, 80, 70, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: `${h}%`,
                  background: i === 5
                    ? "linear-gradient(180deg, #DC2626 0%, rgba(220,38,38,0.3) 100%)"
                    : "rgba(220,38,38,0.3)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-around pt-2 pb-1 border-t border-dark-border">
          {["📊", "📄", "🧾", "📅", "👥"].map((icon, i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${
                i === 0 ? "bg-brand-red" : ""
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

const stats = [
  { value: "5", label: "Modules" },
  { value: "iOS+Android", label: "Plateformes" },
  { value: "Temps réel", label: "Synchronisation" },
];

const kpis = [
  { label: "CA Mois", value: "12 840 €", color: "text-green-400" },
  { label: "Attente", value: "3 200 €", color: "text-brand-red-light" },
  { label: "Clients", value: "247", color: "text-text-primary" },
  { label: "RDV", value: "18", color: "text-text-primary" },
];
