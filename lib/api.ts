import axios from "axios";
import { API_BASE } from "./constants";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLeads = async (params?: Record<string, string | number | undefined>) => {
  const { data } = await api.get("/leads/", { params });
  return data;
};

export const getLead = async (id: string) => {
  const { data } = await api.get(`/leads/${id}`);
  return data;
};

export const createLead = async (payload: Record<string, unknown>) => {
  const { data } = await api.post("/leads/", payload);
  return data;
};

export const updateLead = async (id: string, payload: Record<string, unknown>) => {
  const { data } = await api.patch(`/leads/${id}`, payload);
  return data;
};

export const deleteLead = async (id: string) => {
  const { data } = await api.delete(`/leads/${id}`);
  return data;
};

export const qualifyLead = async (id: string) => {
  const { data } = await api.post(`/leads/${id}/qualify`);
  return data;
};

export const rescoreLead = async (id: string) => {
  const { data } = await api.post(`/leads/${id}/rescore`);
  return data;
};

export const generateOutreach = async (
  id: string,
  payload: { message_type: string; tone: string; custom_instructions?: string }
) => {
  const { data } = await api.post(`/leads/${id}/outreach`, payload);
  return data;
};

export const getAnalyticsOverview = async () => {
  const { data } = await api.get("/analytics/overview");
  return data;
};

export const getAnalyticsSegments = async () => {
  const { data } = await api.get("/analytics/segments");
  return data;
};

export const getAnalyticsTopLeads = async () => {
  const { data } = await api.get("/analytics/top-leads");
  return data;
};

export const getAnalyticsRevenue = async () => {
  const { data } = await api.get("/analytics/revenue-forecast");
  return data;
};
