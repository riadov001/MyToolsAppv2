"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  {
    id: "ai",
    label: "Intelligence Artificielle",
    icon: "🤖",
    color: "#DC2626",
    tagline: "L'IA au cœur de chaque décision",
    features: [
      {
        icon: "🧠",
        title: "Analyse IA",
        desc: "Votre IA analyse vos données, détecte les tendances cachées et prédit votre CA des prochaines semaines avec une précision chirurgicale.",
        badge: "Bientôt",
      },
      {
        icon: "💬",
        title: "Chatbot IA",
        desc: "Assistant virtuel disponible 24h/24 pour répondre aux clients, qualifier les demandes et prendre des rendez-vous à votre place.",
        badge: "Bientôt",
      },
      {
        icon: "🔍",
        title: "Scan OCR avec IA",
        desc: "Photographiez une carte grise, une facture ou un bon de commande. L'IA extrait et intègre automatiquement toutes les données.",
        badge: "Bientôt",
      },
      {
        icon: "⚙️",
        title: "Configurateur IA",
        desc: "L'IA configure automatiquement vos devis et prestations selon le profil du client, l'historique et les tendances du marché.",
        badge: "Bientôt",
      },
      {
        icon: "📈",
        title: "Analyse Commerciale IA",
        desc: "Identifiez les leviers de croissance, réduisez vos coûts et maximisez votre CA grâce à des recommandations IA personnalisées.",
        badge: "Bientôt",
      },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    icon: "📡",
    color: "#3B82F6",
    tagline: "Connecté à vos clients, en tout instant",
    features: [
      {
        icon: "💬",
        title: "Chat interne",
        desc: "Messagerie instantanée entre collaborateurs du garage. Partagez des devis, photos et notes sans quitter l'application.",
        badge: "Bientôt",
      },
      {
        icon: "🗣️",
        title: "Chat avec clients",
        desc: "Communiquez directement avec vos clients depuis l'app. Envoyez des mises à jour, photos du véhicule, et validations en temps réel.",
        badge: "Bientôt",
      },
      {
        icon: "✉️",
        title: "Emails automatisés",
        desc: "Envoi automatique de devis, confirmations, rappels et factures par email avec vos modèles personnalisés et votre logo.",
        badge: "Bientôt",
      },
      {
        icon: "📱",
        title: "Notifications SMS",
        desc: "SMS automatiques de confirmation, rappel de RDV et suivi d'intervention. Vos clients sont informés à chaque étape.",
        badge: "Bientôt",
      },
      {
        icon: "⏰",
        title: "Rappels automatiques",
        desc: "Relances intelligentes pour les devis non signés, factures impayées et rendez-vous à confirmer. Zéro oubli, zéro perte.",
        badge: "Bientôt",
      },
    ],
  },
  {
    id: "planning",
    label: "Planning & Opérations",
    icon: "📅",
    color: "#8B5CF6",
    tagline: "Pilotez votre atelier comme un pro",
    features: [
      {
        icon: "🗓️",
        title: "Agenda interactif",
        desc: "Planning visuel drag & drop avec vue jour / semaine / mois. Assignez des techniciens, gérez les postes de travail et les durées estimées.",
        badge: "Bientôt",
      },
      {
        icon: "🔄",
        title: "Gestion intelligente des réservations",
        desc: "L'IA optimise automatiquement les créneaux selon la charge, les compétences disponibles et le type d'intervention.",
        badge: "Bientôt",
      },
      {
        icon: "📊",
        title: "Rapport quotidien personnalisé",
        desc: "Chaque matin, un rapport synthétique de votre journée : RDV du jour, CA prévisionnel, alertes prioritaires. 100% configurable.",
        badge: "Bientôt",
      },
      {
        icon: "🔴",
        title: "Suivi temps réel de l'activité",
        desc: "Tableau de bord live : statut de chaque intervention, technicien actif, véhicule en cours, temps restant estimé.",
        badge: "Bientôt",
      },
    ],
  },
  {
    id: "documents",
    label: "Documents & Finance",
    icon: "📋",
    color: "#10B981",
    tagline: "La gestion financière sans friction",
    features: [
      {
        icon: "📄",
        title: "Modèles de documents",
        desc: "Bibliothèque de modèles personnalisables pour vos devis, factures, conditions générales et bons de travaux. Votre identité, partout.",
        badge: "Bientôt",
      },
      {
        icon: "🧾",
        title: "Factures électroniques",
        desc: "Conformité totale à la réglementation 2026. Factures e-invoice au format Factur-X envoyées directement au Portail Public de Facturation.",
        badge: "Bientôt",
      },
      {
        icon: "📒",
        title: "Module Expert Comptabilité",
        desc: "Journal comptable automatisé, rapprochement bancaire, exports FEC, bilan simplifié. Votre expert-comptable récupère tout en un clic.",
        badge: "Bientôt",
      },
    ],
  },
  {
    id: "openbanking",
    label: "OpenBanking & Finance IA",
    icon: "🏦",
    color: "#06B6D4",
    tagline: "Propulsé par MyTools Budget Tracker — PWA disponible dès maintenant",
    features: [
      {
        icon: "⚡",
        title: "MyTools Budget Tracker",
        desc: "Notre module comptabilité est propulsé par l'API MyTools Budget Tracker — une plateforme indépendante déjà disponible en PWA et bientôt sur App Store et Google Play.",
        badge: "PWA Live",
      },
      {
        icon: "🏦",
        title: "OpenBanking",
        desc: "Connectez directement vos comptes bancaires professionnels via OpenBanking. Vos flux financiers sont synchronisés en temps réel, sans aucune ressaisie manuelle.",
        badge: "Bientôt",
      },
      {
        icon: "📸",
        title: "Scan IA — Relevés & Tickets",
        desc: "Photographiez vos relevés bancaires, tickets de caisse et factures fournisseurs. L'IA extrait, lit et catégorise chaque ligne automatiquement dans Budget Tracker.",
        badge: "Bientôt",
      },
      {
        icon: "🗂️",
        title: "Catégorisation IA automatique",
        desc: "Chaque transaction est analysée et classée par l'IA : carburant, pièces, sous-traitance, charges fixes. Votre comptabilité se constitue d'elle-même.",
        badge: "Bientôt",
      },
      {
        icon: "🔗",
        title: "Intégration native MyTools Admin",
        desc: "Vos données Budget Tracker s'intègrent directement dans MyTools Admin. Devis, factures et achats alimentent votre dossier comptable sans aucune double saisie.",
        badge: "Bientôt",
      },
      {
        icon: "🧮",
        title: "TVA & Dossier comptable",
        desc: "Journal, grand livre, déclarations TVA préremplies, bilan simplifié. Votre dossier est constitué en continu — prêt à tout moment pour votre expert-comptable.",
        badge: "Bientôt",
      },
    ],
  },
  {
    id: "immersive",
    label: "Expérience Immersive",
    icon: "🥽",
    color: "#F59E0B",
    tagline: "Le futur de l'automobile, dès aujourd'hui",
    features: [
      {
        icon: "🎮",
        title: "Simulateur 3D",
        desc: "Visualisez les réparations à effectuer en 3D avant intervention. Montrez à votre client exactement ce qui sera fait, avec photos et animations.",
        badge: "Vision",
      },
      {
        icon: "🥽",
        title: "Réalité Virtuelle",
        desc: "Visite virtuelle de votre garage, essai de configurateurs de véhicules et démonstrations immersives directement depuis l'application.",
        badge: "Vision",
      },
      {
        icon: "🖼️",
        title: "Galerie Médias",
        desc: "Archivez toutes les photos de chaque véhicule, avant/après intervention. Partagez en un tap avec vos clients ou votre assurance.",
        badge: "Bientôt",
      },
    ],
  },
];

const badgeStyle: Record<string, string> = {
  "Bientôt": "border-[#DC2626]/40 text-[#DC2626]",
  "Vision": "border-[#F59E0B]/40 text-[#F59E0B]",
  "PWA Live": "border-green-500/40 text-green-400 bg-green-500/5",
};

export default function Roadmap() {
  const [activecat, setActivecat] = useState(0);
  const cat = categories[activecat];

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Dynamic background glow per category */}
      <motion.div
        key={activecat}
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background: `radial-gradient(ellipse 1000px 500px at 30% 60%, ${cat.color}08 0%, transparent 65%)`,
        }}
      />

      {/* Horizontal speed line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DC2626]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#DC2626]" />
            <span className="font-michroma text-[#DC2626] text-xs tracking-[0.3em] uppercase">Roadmap & Vision</span>
            <div className="h-px w-12 bg-[#DC2626]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-michroma text-3xl md:text-5xl text-white tracking-widest uppercase mb-4 leading-tight"
          >
            La plateforme du<br />
            <span className="text-[#DC2626]">futur automobile</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-michroma text-[#666] text-xs md:text-sm tracking-widest leading-relaxed max-w-2xl mx-auto"
          >
            MyTools Group ne s'arrête pas à la gestion du quotidien.<br />
            Chaque trimestre, de nouvelles fonctionnalités repoussent les limites de ce qu'un garage peut accomplir.
          </motion.p>
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => setActivecat(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 font-michroma text-[9px] tracking-widest uppercase"
              style={{
                borderColor: i === activecat ? c.color : "#2A2A2A",
                background: i === activecat ? `${c.color}15` : "#161616",
                color: i === activecat ? "#fff" : "#666",
                boxShadow: i === activecat ? `0 0 20px ${c.color}20` : "none",
              }}
            >
              <span className="text-sm">{c.icon}</span>
              <span className="hidden sm:inline">{c.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Category tagline */}
        <motion.div
          key={`tag-${activecat}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 justify-center mb-10"
        >
          <div className="h-px w-8" style={{ background: cat.color }} />
          <span className="font-michroma text-xs tracking-widest uppercase" style={{ color: cat.color }}>
            {cat.tagline}
          </span>
          <div className="h-px w-8" style={{ background: cat.color }} />
        </motion.div>

        {/* Features grid */}
        <motion.div
          key={`grid-${activecat}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {cat.features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="group relative bg-[#161616] border border-[#2A2A2A] rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:border-opacity-50"
              style={{ ["--hover-color" as string]: cat.color }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${cat.color}08 0%, transparent 60%)` }}
              />
              {/* Bottom line */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(to right, ${cat.color}60, transparent)` }}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
                    style={{ background: `${cat.color}12`, borderColor: `${cat.color}25` }}
                  >
                    {f.icon}
                  </div>
                  <span
                    className={`font-michroma text-[8px] tracking-widest uppercase px-2 py-1 rounded border ${badgeStyle[f.badge]}`}
                  >
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-michroma text-white text-xs tracking-widest uppercase mb-2">{f.title}</h3>
                <p className="font-michroma text-[#666] text-[10px] tracking-wide leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature count banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 relative bg-gradient-to-r from-[#161616] via-[#1A1A1A] to-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid opacity-20" />

          {/* Animated speed lines */}
          {[25, 50, 75].map((top, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#DC2626]/20 to-transparent"
              style={{ top: `${top}%`, width: "100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 5 + i * 1.5, delay: i * 0.8, ease: "linear" }}
            />
          ))}

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-michroma text-white text-lg md:text-xl tracking-widest uppercase mb-1">
                26+ fonctionnalités en développement
              </div>
              <div className="font-michroma text-[#666] text-[10px] tracking-widest">
                IA · OpenBanking · Communication · Finance · Immersif · Planning
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { n: "5", label: "Modules IA" },
                { n: "6", label: "OpenBanking" },
                { n: "5", label: "Com." },
                { n: "4", label: "Planning" },
                { n: "3", label: "Finance" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-michroma text-[#DC2626] text-2xl">{s.n}</div>
                  <div className="font-michroma text-[#444] text-[8px] tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="group relative flex-shrink-0 inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-michroma text-[10px] tracking-widest uppercase px-6 py-3 rounded-lg transition-all overflow-hidden"
            >
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              Accès anticipé →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
