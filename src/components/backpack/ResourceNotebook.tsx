import type { EducationalResource } from '../../types/resource';
import { BackpackItem } from './BackpackItem';
export function ResourceNotebook({ resource, selected, onSelect }: { resource: EducationalResource; selected: boolean; onSelect: () => void }) {
  return <BackpackItem id={`resource-${resource.id}`} className={`resource-notebook ${resource.objectType} cover-${resource.color}`} label={`Seleccionar ${resource.name}`} help="Seleccioná para explorar" selected={selected} onActivate={onSelect}><span className="notebook-topline">RECURSO EDUCATIVO <span aria-hidden="true">↗</span></span><span className="resource-symbol" aria-hidden="true">{resource.symbol}</span><span className="notebook-name">{resource.shortName ?? resource.name}</span><span className="notebook-bottom">{selected ? '✓ Seleccionado' : 'MEP · Costa Rica'}</span></BackpackItem>;
}
