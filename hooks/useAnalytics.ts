"use client";

import { useEffect, useState } from "react";
import { getAnalyticsOverview, getAnalyticsRevenue, getAnalyticsSegments, getAnalyticsTopLeads } from "../lib/api";

export type AnalyticsState = {
  overview: any;
  segments: any;
  revenue: any;
  topLeads: any;
};

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsState>({
    overview: null,
    segments: null,
    revenue: null,
    topLeads: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const [overview, segments, topLeads, revenue] = await Promise.all([
          getAnalyticsOverview(),
          getAnalyticsSegments(),
          getAnalyticsTopLeads(),
          getAnalyticsRevenue(),
        ]);
        setData({ overview, segments, topLeads, revenue });
      } catch (err) {
        setError("Unable to load analytics right now.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return { data, loading, error };
};
