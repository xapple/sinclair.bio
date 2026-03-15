import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;
const LANGS = ['en', 'fr'];

function startPreviewServer() {
  const server = spawn('pnpm', ['preview'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false,
  });
  server.stderr.on('data', (d) => process.stderr.write(d));
  return server;
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  throw new Error(`Server at ${url} did not respond within ${timeoutMs}ms`);
}

const server = startPreviewServer();

try {
  console.log('Waiting for preview server...');
  await waitForServer(BASE_URL);
  console.log('Server ready.');

  const browser = await puppeteer.launch({ headless: true });

  for (const lang of LANGS) {
    const page = await browser.newPage();
    const url = `${BASE_URL}/${lang}/cv`;
    console.log(`Generating cv-${lang}.pdf from ${url}...`);

    await page.goto(url, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: false,
      margin: { top: '2cm', bottom: '2cm', left: '1.5cm', right: '1.5cm' },
    });

    writeFileSync(`cv-${lang}.pdf`, pdf);
    console.log(`✓ cv-${lang}.pdf`);
    await page.close();
  }

  await browser.close();
} finally {
  server.kill();
}
