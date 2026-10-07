import type { EducationalResource } from '../../types/resource';
import { safeResourceUrl, recordResourceOpening } from '../../services/navigation';
export function ResourceDetails({ resource, onFavorite, favorite, onStorageError }: { resource: EducationalResource; favorite?: boolean; onFavorite?: () => void; onStorageError: () => void }) {
  const url = safeResourceUrl(resource);
  return <><p className="panel-kicker">RECURSO SELECCIONADO</p><p>{resource.description}</p><div className="resource-detail-symbol" aria-hidden="true">{resource.symbol}</div><p className="muted">Sitio externo · Se abre en una pestaña nueva.</p><div className="panel-actions">{url ? <a className="primary-button" href={url} target="_blank" rel="noopener noreferrer" onClick={() => { if (!recordResourceOpening(resource)) onStorageError(); }}>Abrir sitio <span aria-hidden="true">↗</span><span className="sr-only"> (pestaña nueva)</span></a> : <p role="alert">El enlace de este recurso no está disponible.</p>}{onFavorite && <button className="secondary-button" type="button" onClick={onFavorite} aria-pressed={favorite}>{favorite ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}</button>}</div></>;
}
