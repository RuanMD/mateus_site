import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const DIST_DIR = resolve(PROJECT_ROOT, 'dist');
const BASE_URL = 'https://advogandoparaenfermagem.com.br';

// Load and filter cities (only valid 2-char state codes)
const cities = JSON.parse(readFileSync(resolve(PROJECT_ROOT, 'src/data/cities.json'), 'utf-8'))
  .filter(c => c.state.length === 2);

// Group by state
const byState = {};
for (const city of cities) {
  if (!byState[city.state]) byState[city.state] = [];
  byState[city.state].push(city);
}

// Ensure output directories exist
const sitemapsDir = resolve(DIST_DIR, 'sitemaps');
if (!existsSync(sitemapsDir)) mkdirSync(sitemapsDir, { recursive: true });

const today = new Date().toISOString().split('T')[0];
const stateFiles = [];

// Generate one sitemap per state
for (const [state, stateCities] of Object.entries(byState).sort()) {
  const urls = stateCities.map(city => `  <url>
    <loc>${BASE_URL}/aposentadoria-especial-da-enfermagem-${city.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const filename = `sitemap-cities-${state}.xml`;
  writeFileSync(resolve(sitemapsDir, filename), xml, 'utf-8');
  stateFiles.push(filename);
}

// Generate sitemap index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
${stateFiles.map(f => `  <sitemap>
    <loc>${BASE_URL}/sitemaps/${f}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

writeFileSync(resolve(DIST_DIR, 'sitemap-index.xml'), sitemapIndex, 'utf-8');

console.log(`Generated ${stateFiles.length} state sitemaps + 1 index (${cities.length} city URLs total)`);
