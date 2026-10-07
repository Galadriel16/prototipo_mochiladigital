import { useEffect, useState } from 'react';
import { resources } from '../data/resources';
import { BackpackScene } from '../components/backpack/BackpackScene';
import { ResourceNotebook } from '../components/backpack/ResourceNotebook';
import { ResourceDetails } from '../components/backpack/ResourceDetails';
import { AccessibleDialog } from '../components/ui/AccessibleDialog';
import { SchoolObjects } from '../components/backpack/SchoolObjects';
import type { ToolPanel } from '../components/backpack/SchoolObjects';
import { ToolContent, panelTitles } from '../components/backpack/ToolContent';
import { mockAuthService } from '../services/auth/mockAuthService';
import type { User } from '../services/auth/auth.types';
import { useFavorites } from '../hooks/useFavorites';
import { useVisitCounts } from '../hooks/useVisitCounts';
import { ResourceSearch } from '../components/search/ResourceSearch';
import { ThemeControl } from '../components/theme/ThemeControl';
import { useTheme } from '../hooks/useTheme';
export function App() {
  const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null); const [panel, setPanel] = useState<ToolPanel | null>(null);
  const [storageError, setStorageError] = useState(false);
  const { favorites, toggle, error } = useFavorites(); const counts = useVisitCounts();
  const selected = resources.find(r => r.id === selectedId);
  const { theme, changeTheme, error: themeError } = useTheme();
  useEffect(() => { let active = true; mockAuthService.getCurrentUser().then(u => { if (active) { setUser(u); setLoading(false); } }); return () => { active = false; }; }, []);
  function selectResource(id: string) { setPanel(null); document.getElementById(`resource-${id}`)?.focus(); setSelectedId(id); }
  async function signOut() { await mockAuthService.signOut(); setPanel(null); setSelectedId(null); setUser(null); }
  async function enterDemo() { await mockAuthService.enterDemo(); setUser(await mockAuthService.getCurrentUser()); }
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><header className="header"><div className="brand"><span className="brand-mark" aria-hidden="true">m<span>·</span>d</span><div><strong>Mochila Digital</strong><span>Ministerio de Educación Pública · Costa Rica</span></div></div><div className="header-controls"><span className="prototype-badge">Prototipo interactivo</span><ThemeControl theme={theme} onChange={changeTheme}/></div></header><main id="contenido" tabIndex={-1}>
  {themeError && <p role="status">No se pudo guardar la apariencia en este navegador.</p>}
  {loading ? <p role="status">Preparando tu mochila…</p> : !user ? <section className="demo-entry"><p className="eyebrow">SESIÓN DE DEMOSTRACIÓN CERRADA</p><h1>Tu mochila te espera.</h1><p>Ingresá con un perfil ficticio. No necesitás credenciales.</p><button className="primary-button" onClick={enterDemo}>Entrar a la demostración</button></section> : <>
  <div className="intro"><div><p className="eyebrow">TU ESPACIO PARA APRENDER</p><h1>Lo que necesitás,<br/>en tu mochila<span>.</span></h1><p>Explorá, descubrí y llevá tu aprendizaje más lejos.</p></div><div className="intro-note">Una mochila.<br/><strong>Muchas posibilidades.</strong><span>Seleccioná un objeto para comenzar.</span></div></div>
  <ResourceSearch onSelect={selectResource}/>
  {(storageError || error) && <p role="status">No se pudo guardar la preferencia local. Los cambios podrían perderse al recargar.</p>}
  <BackpackScene><div className="scene-heading"><h2>¡Hola, Alex! ¿Qué vamos a descubrir?</h2><p>Tocá un objeto o recorré tu mochila con el teclado.</p></div><SchoolObjects user={user} favoriteCount={favorites.length} onOpen={p => { setSelectedId(null); setPanel(p); }}/><div className="resource-section-title"><h2>Tus cuadernos de aprendizaje</h2><span>8 recursos para explorar</span></div><div className="resource-grid">{resources.map(r => <ResourceNotebook key={r.id} resource={r} selected={selectedId === r.id} onSelect={() => selectResource(r.id)} />)}</div></BackpackScene>
  </>}</main><footer className="site-footer"><strong>Mochila Digital</strong><span>Prototipo frontend · Datos ficticios · Sin conexión institucional</span></footer>
  {selected && <AccessibleDialog key={selected.id} title={selected.name} returnFocusId={`resource-${selected.id}`} onClose={() => setSelectedId(null)}><ResourceDetails resource={selected} onStorageError={() => setStorageError(true)} favorite={favorites.includes(selected.id)} onFavorite={() => toggle(selected.id)}/>{(storageError || error) && <p role="status">No se pudo guardar el cambio en este navegador.</p>}</AccessibleDialog>}
  {panel && user && <AccessibleDialog key={panel} title={panelTitles[panel]} onClose={() => setPanel(null)}><ToolContent panel={panel} user={user} favorites={favorites} counts={counts} onSelect={selectResource} onToggle={toggle} onSignOut={signOut}/></AccessibleDialog>}
  </>;
}
