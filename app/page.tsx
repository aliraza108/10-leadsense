"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsBar from "../components/StatsBar";
import HowItWorks from "../components/HowItWorks";
import LeadPipeline from "../components/LeadPipeline/LeadPipeline";
import AddLeadModal from "../components/AddLeadModal";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import OutreachGallery from "../components/OutreachGallery";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import { useLeads } from "../hooks/useLeads";

export default function HomePage() {
  const leadState = useLeads();
  const [addOpen, setAddOpen] = useState(false);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const handleCreateLead = async (payload: Record<string, unknown>) => {
    const created = await leadState.addLead(payload);
    const normalized = { ...created, id: created.id || created._id || crypto.randomUUID() };
    leadState.setLeads((prev) => [normalized, ...prev]);
    setHighlightId(normalized.id);
    return normalized;
  };

  const handleQualify = async (id: string) => {
    await leadState.qualify(id);
    await leadState.fetchLeads();
  };

  return (
    <div className="relative">
      <Navbar onAddLead={() => setAddOpen(true)} />
      <main className="pt-20">
        <HeroSection />
        <StatsBar />
        <HowItWorks />
        <LeadPipeline
          leads={leadState.leads}
          loading={leadState.loading}
          error={leadState.error}
          onRetry={leadState.fetchLeads}
          highlightId={highlightId}
          onAddLead={() => setAddOpen(true)}
          onGenerateOutreach={async (id, type, tone) => {
            const result = await leadState.outreach(id, { message_type: type, tone, custom_instructions: "" });
            return result?.message || result?.text || "";
          }}
          onRequalify={async (id) => {
            await leadState.qualify(id);
            await leadState.fetchLeads();
          }}
        />
        <AnalyticsDashboard />
        <OutreachGallery />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />

      <AddLeadModal
        open={addOpen}
        onOpenChange={setAddOpen}
        onCreate={handleCreateLead}
        onQualify={handleQualify}
      />
    </div>
  );
}
