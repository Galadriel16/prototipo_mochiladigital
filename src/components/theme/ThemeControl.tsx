import type { Theme } from '../../hooks/useTheme';
export function ThemeControl({ theme, onChange }: { theme: Theme; onChange: (value: string) => void }) {
  return <div className="theme-control"><label htmlFor="theme">Apariencia</label><select id="theme" value={theme} onChange={e => onChange(e.target.value)}><option value="system">Sistema</option><option value="light">Claro</option><option value="dark">Oscuro</option></select></div>;
}
