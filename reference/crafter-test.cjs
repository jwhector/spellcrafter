const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1200,height:900}});
  const errs=[]; p.on('pageerror', e=>errs.push(e.message)); p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); });
  const t0=Date.now();
  await p.goto('file://'+process.argv[2]); await p.waitForTimeout(500);
  console.log('load ms', Date.now()-t0);
  const n = await p.$$eval('#presets .chipbtn', x=>x.length);
  for (let i=0;i<n;i++){ await p.click(`#presets .chipbtn[data-p="${i}"]`); const r=await p.$eval('#reading', e=>e.textContent); const name=await p.$eval(`#presets .chipbtn[data-p="${i}"]`, e=>e.textContent); if(i>=19) console.log('---',name,'\n',r.slice(0,400)); }
  // sweep centers x shapes with toggles
  const centers = await p.$$eval('#center option', o=>o.map(x=>x.value));
  const shapes = await p.$$eval('#shape option', o=>o.map(x=>x.value));
  for (const c of centers) for (const s of shapes) { await p.selectOption('#center', c); await p.selectOption('#shape', s); await p.check('#i-linger'); await p.uncheck('#i-linger'); }
  console.log('errors', errs);
  await p.click('#presets .chipbtn[data-p="23"]');
  await p.screenshot({path:'shot.png', fullPage:false});
  await b.close();
})();
