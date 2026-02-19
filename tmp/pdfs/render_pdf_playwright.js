const { chromium } = require('playwright');
const path = require('path');

async function render(inputHtml, outputPdf) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = 'file:///' + path.resolve(inputHtml).replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.pdf({
    path: outputPdf,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '16mm', bottom: '20mm', left: '16mm' }
  });
  await browser.close();
  console.log(`PDF written: ${outputPdf}`);
}

(async () => {
  await render('output/ch01_a1_mi_cuerpo.html', 'output/ch01_a1_mi_cuerpo.pdf');
  await render('output/ch01_a2_mi_cuerpo.html', 'output/ch01_a2_mi_cuerpo.pdf');
})();
