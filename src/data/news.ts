export interface NewsItem { id: string; title: string; date: string; summary: string; url?: string; }
// Ejemplos ficticios, no son anuncios oficiales del MEP.
export const news: NewsItem[] = [
  { id: '1', title: 'Tu próxima lectura empieza aquí', date: '2026-10-01', summary: 'Ejemplo: explorá el catálogo de bibliotecas y encontrá una nueva lectura.' },
  { id: '2', title: 'Organizá tus recursos favoritos', date: '2026-09-28', summary: 'Ejemplo: guardá tus recursos en los marcadores para tenerlos a mano en este navegador.' },
  { id: '3', title: 'Un espacio para tu curiosidad', date: '2026-09-22', summary: 'Ejemplo: recorré los cuadernos de la mochila y descubrí los sitios educativos configurados.' },
];
