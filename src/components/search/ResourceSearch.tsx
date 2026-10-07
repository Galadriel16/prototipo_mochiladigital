import { useState } from 'react';
import { resources } from '../../data/resources';
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
export function ResourceSearch({ onSelect }: { onSelect: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const results = terms.length ? resources.filter(r => terms.every(t => normalize([r.name, ...r.keywords].join(' ')).includes(t))) : [];
  return <section className="search-section" aria-label="Búsqueda de recursos"><div className="search-row"><label htmlFor="resource-search">¿Qué querés aprender hoy?</label><div className="search-input"><span aria-hidden="true">⌕</span><input id="resource-search" type="search" placeholder="Buscá un recurso, tema o palabra clave" value={query} onChange={e => setQuery(e.target.value)}/></div></div>{terms.length > 0 && <div className="search-results"><p role="status">{results.length ? `${results.length} ${results.length === 1 ? 'recurso encontrado' : 'recursos encontrados'}` : 'No encontramos recursos. Probá con otra palabra.'}</p><ul>{results.map(r => <li key={r.id}><button onClick={() => { setQuery(''); onSelect(r.id); }}>{r.name}<span aria-hidden="true">→</span></button></li>)}</ul></div>}</section>;
}
