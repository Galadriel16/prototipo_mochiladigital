import type { ReactNode } from 'react';
interface Props { id?: string; label: string; help: string; className?: string; selected?: boolean; onActivate: () => void; children: ReactNode; }
export function BackpackItem({ id, label, help, className = '', selected, onActivate, children }: Props) {
  return <button id={id} type="button" className={`backpack-item ${className} ${selected ? 'is-selected' : ''}`} aria-label={label} aria-pressed={selected} title={help} onClick={onActivate}>{children}<span className="item-help">{help}</span></button>;
}
