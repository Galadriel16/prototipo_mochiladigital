import type { EducationalResource } from '../types/resource';
import { localAnalyticsService } from './analytics/localAnalyticsService';
export function safeResourceUrl(resource: EducationalResource): string | undefined {
  try { const url = new URL(resource.url); return url.protocol === 'https:' ? url.href : undefined; } catch { return undefined; }
}
export function recordResourceOpening(resource: EducationalResource): boolean {
  if (!safeResourceUrl(resource)) return false;
  return localAnalyticsService.recordVisit(resource.id);
}
