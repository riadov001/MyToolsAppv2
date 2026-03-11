import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyTools Admin — Gestion de garage simplifée",
  description:
    "L'application mobile pour gérer votre garage en temps réel. Devis, factures, réservations, clients. Accès exclusive aux garages partenaires MyTools.",
  keywords:
    "garage, gestion, devis, factures, réservations, clients, mytools, admin, automobile",
  authors: [{ name: "MyTools Group", url: "https://www.mytoolsgroup.eu" }],
  creator: "MyTools Group",
  metadataBase: new URL("https://www.mytoolsgroup.eu"),
  openGraph: {
    title: "MyTools Admin",
    description: "L'application mobile pour gérer votre garage en temps réel.",
    url: "https://www.mytoolsgroup.eu",
    siteName: "MyTools Admin",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-dark-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
