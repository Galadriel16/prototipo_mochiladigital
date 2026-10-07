import type { ReactNode } from 'react';
import { DecorativeItem } from './DecorativeItem';
export function BackpackScene({ children }: { children: ReactNode }) {
  return <section className="backpack" aria-label="Interior de tu mochila"><div className="bag-handle" aria-hidden="true"/><div className="bag-lining"><div className="bag-seam" aria-hidden="true"/>{children}<DecorativeItem /><div className="bag-footer"><span>MI MOCHILA</span><span>Todo un mundo por descubrir</span></div></div></section>;
}
