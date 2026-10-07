import { useState } from 'react';
import { resources } from '../data/resources';
import { readLocal, writeLocal } from '../services/storage';
const key = 'mochila:v1:favorites';
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => readLocal<string[]>(key, [], (v): v is string[] => Array.isArray(v) && v.every(id => typeof id === 'string' && resources.some(r => r.id === id))));
  const [error, setError] = useState(false);
  function toggle(id: string) { const next = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id]; setFavorites(next); setError(!writeLocal(key, next)); }
  return { favorites, toggle, error };
}
