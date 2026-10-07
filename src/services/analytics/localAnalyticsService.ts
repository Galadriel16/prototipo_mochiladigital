import { readLocal, writeLocal } from '../storage';
export interface AnalyticsService { getCounts(): Record<string, number>; recordVisit(id: string): boolean; }
const key = 'mochila:v1:visits';
let memory: Record<string, number> = {};
let storageUnavailable = false;
export const localAnalyticsService: AnalyticsService = {
  getCounts: () => storageUnavailable ? { ...memory } : readLocal<Record<string, number>>(key, memory, (v): v is Record<string, number> => typeof v === 'object' && v !== null && !Array.isArray(v) && Object.values(v).every(n => Number.isSafeInteger(n) && n >= 0)),
  recordVisit(id) { const counts = { ...this.getCounts() }; counts[id] = (counts[id] ?? 0) + 1; memory = counts; const saved = writeLocal(key, counts); storageUnavailable = !saved; window.dispatchEvent(new Event('mochila:visits')); return saved; },
};
