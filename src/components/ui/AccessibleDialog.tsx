import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
export function AccessibleDialog({ title, onClose, children, returnFocusId }: { title: string; onClose: () => void; children: ReactNode; returnFocusId?: string }) {
  const ref = useRef<HTMLDialogElement>(null); const titleId = useId();
  useEffect(() => {
    const dialog = ref.current!; const previous = document.activeElement;
    dialog.showModal();
    return () => { dialog.close(); const target = returnFocusId ? document.getElementById(returnFocusId) : previous; if (target instanceof HTMLElement && target.isConnected) target.focus(); };
  }, [returnFocusId]);
  return <dialog ref={ref} aria-labelledby={titleId} onCancel={e => { e.preventDefault(); onClose(); }} onKeyDown={e => {
    if (e.key !== 'Tab') return;
    const controls = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary')).filter(el => el.getClientRects().length > 0);
    const first = controls[0]; const last = controls[controls.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  }} className="dialog"><div className="dialog-heading"><h2 id={titleId}>{title}</h2><button type="button" className="close-button" onClick={onClose} aria-label="Cerrar panel">×</button></div>{children}</dialog>;
}
