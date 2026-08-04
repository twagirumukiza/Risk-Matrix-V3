const d=JSON.parse(localStorage.getItem('risks')||'[]');const tb=document.getElementById('tb');function L(c){return c<5?'F':c<10?'M':c<17?'E':'C'};function R(){tb.innerHTML='';count.textContent='Risques:'+d.length;grid.innerHTML='';for(let y=5;y>=1;y--)for(let x=1;x<=5;x++){let e=document.createElement('div');e.className='cell';let n=d.filter(r=>r.i==y&&r.p==x).length;e.textContent=n||'';grid.appendChild(e)}d.forEach(r=>tb.innerHTML+=`<tr><td>${r.r}</td><td>${r.i}</td><td>${r.p}</td><td>${r.i*r.p} ${L(r.i*r.p)}</td><td>${r.o}</td></tr>`);localStorage.setItem('risks',JSON.stringify(d));}
newBtn.onclick=()=>dlg.showModal();save.onclick=(e)=>{e.preventDefault();d.push({r:r.value,o:o.value,i:+i.value,p:+p.value});dlg.close();R()};csv.onclick=()=>{let t='Risque,Impact,Prob,Criticite,Resp\n'+d.map(r=>`${r.r},${r.i},${r.p},${r.i*r.p},${r.o}`).join('\n');let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t]));a.download='risques.csv';a.click()};R();

window.editRisk=function(idx){
 const r=JSON.parse(localStorage.getItem('risks')||'[]');
 let x=r[idx]; if(!x) return;
 x.r=prompt('Description',x.r)||x.r;
 x.o=prompt('Responsable',x.o)||x.o;
 x.i=Math.max(1,Math.min(5,parseInt(prompt('Impact 1-5',x.i))||x.i));
 x.p=Math.max(1,Math.min(5,parseInt(prompt('Probabilité 1-5',x.p))||x.p));
 localStorage.setItem('risks',JSON.stringify(r));
 location.reload();
}
window.deleteRisk=function(idx){
 if(!confirm('Supprimer ce risque ?')) return;
 const r=JSON.parse(localStorage.getItem('risks')||'[]');
 r.splice(idx,1);
 localStorage.setItem('risks',JSON.stringify(r));
 location.reload();
}
