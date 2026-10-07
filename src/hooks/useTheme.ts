import { useEffect, useState } from 'react';
import { readLocal, writeLocal } from '../services/storage';
export type Theme = 'light' | 'dark' | 'system';
const isTheme = (v: unknown): v is Theme => v === 'light' || v === 'dark' || v === 'system';
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readLocal<Theme>('mochila:v1:theme', 'system', isTheme));
  const [error, setError] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => { document.documentElement.dataset.theme = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme; };
    apply(); media.addEventListener('change', apply); return () => media.removeEventListener('change', apply);
  }, [theme]);
  function changeTheme(value: string) { if (isTheme(value)) { setTheme(value); setError(!writeLocal('mochila:v1:theme', value)); } }
  return { theme, changeTheme, error };
}
