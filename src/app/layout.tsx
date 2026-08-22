import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";

export const metadata: Metadata = {
  title: "GHK — Pharmaceutical-Grade Research Compounds | GHKpep.com",
  description: "Reference-grade research peptides with independent ISO 17025 testing. Eight-stage independent testing on every batch. Verified purity, documented potency, transparent COAs.",
  keywords: "GHK, GHK-Cu, research peptides, UK, peptides, BPC-157, NAD+, TB-500, MOTS-C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#ededed] min-h-screen flex flex-col">
        <AgeGate />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
