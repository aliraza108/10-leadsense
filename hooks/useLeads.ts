"use client";

import { useCallback, useEffect, useState } from "react";
import { createLead, generateOutreach, getLead, getLeads, qualifyLead, rescoreLead, updateLead } from "../lib/api";

export type Lead = {
  id: string;
  full_name?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  company_name?: string;
  industry?: string;
  status?: string;
  score?: number;
  intent_score?: number;
  fit_score?: number;
  budget_score?: number;
  conversion_probability?: number;
  recommended_action?: string;
  added_at?: string;
  [key: string]: unknown;
};

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeads();
      const items = Array.isArray(data) ? data : data?.items ?? [];
      const normalized = items.map((lead: Lead) => ({
        ...lead,
        id: lead.id || (lead as any)._id || crypto.randomUUID(),
      }));
      setLeads(normalized);
    } catch (err) {
      setError("Unable to load leads. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const addLead = async (payload: Record<string, unknown>) => {
    const data = await createLead(payload);
    return data;
  };

  const qualify = async (id: string) => {
    const data = await qualifyLead(id);
    return data;
  };

  const rescore = async (id: string) => {
    const data = await rescoreLead(id);
    return data;
  };

  const fetchLead = async (id: string) => {
    const data = await getLead(id);
    return data;
  };

  const outreach = async (id: string, payload: { message_type: string; tone: string; custom_instructions?: string }) => {
    const data = await generateOutreach(id, payload);
    return data;
  };

  const update = async (id: string, payload: Record<string, unknown>) => {
    const data = await updateLead(id, payload);
    return data;
  };

  return {
    leads,
    setLeads,
    loading,
    error,
    fetchLeads,
    addLead,
    qualify,
    rescore,
    fetchLead,
    outreach,
    update,
  };
};
