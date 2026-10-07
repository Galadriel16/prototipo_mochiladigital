import { useEffect, useState } from 'react';
import { localAnalyticsService } from '../services/analytics/localAnalyticsService';
export function useVisitCounts() {
  const [counts, setCounts] = useState(() => localAnalyticsService.getCounts());
  useEffect(() => { const update = () => setCounts(localAnalyticsService.getCounts()); window.addEventListener('mochila:visits', update); window.addEventListener('storage', update); return () => { window.removeEventListener('mochila:visits', update); window.removeEventListener('storage', update); }; }, []);
  return counts;
}
