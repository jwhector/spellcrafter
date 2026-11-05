const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1300,height:900}});
 const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file://'+__dirname+'/audit.html');
 await p.waitForFunction(()=>/Took/.test(document.getElementById('status').textContent),null,{timeout:120000});
 console.log(await p.textContent('#status'));
 console.log(await p.textContent('#summary'));
 await p.screenshot({path:__dirname+'/shot1.png'});
 await p.evaluate(()=>{document.querySelectorAll('.scope input[type=checkbox]').forEach(c=>c.checked=true);});
 await p.click('#run');
 await p.waitForFunction(()=>/Took/.test(document.getElementById('status').textContent)&&!document.getElementById('run').disabled,null,{timeout:500000});
 console.log(await p.textContent('#status'));
 console.log(await p.textContent('#summary'));
 for(const l of ['rare','strong','jumps','problems','weak','all']){
   await p.click('.lens[data-l='+l+']');
   if(l!=='problems'){ const rows=await p.$$('#rows tr[data-c]'); for(const r of rows.slice(0,15)) await r.click(); }
 }
 await p.click('.lens[data-l=all]'); await p.selectOption('#f-col','G');
 const rows=await p.$$('#rows tr[data-c]'); console.log('G rows shown',rows.length); for(const r of rows.slice(0,30)) await r.click();
 await p.screenshot({path:__dirname+'/shot2.png'});
 const probs=await p.evaluate(()=>{ var out=[]; document.querySelector('.lens[data-l=problems]').click(); document.querySelectorAll('.problem').forEach(function(x){ out.push(x.textContent.slice(0,160)); }); return out; });
 console.log(probs.join('\n'));
 console.log('errors',errs.slice(0,10), errs.length);
 await b.close();
})();
