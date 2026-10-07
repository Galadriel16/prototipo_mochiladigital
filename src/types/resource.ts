export interface EducationalResource {
  id: string; name: string; shortName?: string; description: string; url: string;
  icon?: string; keywords: string[]; objectType: 'notebook' | 'folder'; external: true;
  color: string; symbol: string;
}
