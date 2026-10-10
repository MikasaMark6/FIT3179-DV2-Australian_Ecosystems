/* Official bioregional totals and public vegetation overlay have separate scopes. */
(() => {
  'use strict';
  const el=id=>document.getElementById(id);
  let regions,vegetation,boundaries,specs,views={},regionFocus='',vegetationFocus=0,queue=Promise.resolve();
  const applicable=()=>regions.filter(r=>r.terrestrial_comparison_applicable);
  const visible=()=>applicable().filter(r=>el('protection-view').value==='all'||!['PSI','ITI'].includes(r.bioregion_code));
  const format=n=>n.toLocaleString('en-AU',{maximumFractionDigits:0});
  function details(row,pinned=false){
    for(const n of [8,9]){
      el('protection-name-'+n).textContent=row?row.bioregion_name:'Explore a bioregion';
      el('protection-detail-'+n).textContent=row?`${row.protected_pct.toFixed(2)}% protected · ${format(row.protected_area_km2)} km² protected. ${pinned?'Click again or clear to release this selection.':'Click to keep this region selected in both maps.'}`:'Hover for details. Click a region or circle to compare its coverage and protected area in both maps.';
    }
  }
  function selectRegion(code){
    regionFocus=code||'';
    for(const id of ['protection-map','protection-symbols'])if(views[id])views[id].signal('regionFocus',regionFocus).runAsync();
    el('protection-region').value=regionFocus;el('protection-clear').disabled=!regionFocus;
    details(regions.find(r=>r.bioregion_code===regionFocus),Boolean(regionFocus));
  }
  function selectVegetation(code){
    vegetationFocus=Number(code)||0;
    if(views['vegetation-protection'])views['vegetation-protection'].signal('vegetationFocus',vegetationFocus).runAsync();
    const row=vegetationFocus?vegetation.find(r=>r.mvg_code===vegetationFocus):vegetation.filter(r=>r.default_comparison).reduce((a,b)=>a.mapped_protection_pct<b.mapped_protection_pct?a:b);
    el('vegetation-protection-insight').textContent=`${row.mvg_name}: ${row.mapped_protection_pct.toFixed(1)}% of its extant area is covered by public CAPAD boundaries${vegetationFocus?'.':', the lowest share among these ten types.'}`;
  }
  async function embedMap(id,index){
    const s=JSON.parse(JSON.stringify(specs[index]));
    s.width=Math.max(240,Math.floor(el(id).clientWidth));s.height=Math.round(s.width*(el('protection-view').value==='all'?.62:.78));
    // Projection fits the filtered boundary geometry, including curved geographic edges.
    s.params[0].value=regionFocus;s.data={values:boundaries,format:{type:'topojson',feature:'regions'}};
    const allowed=visible().map(r=>r.bioregion_code);
    s.transform[s.transform.length-1]={filter:`indexof(${JSON.stringify(allowed)}, datum.bioregion_code) >= 0`};
    if(index===1){s.layer[1].data={values:visible()};s.layer[1].transform=[];}
    if(views[id])views[id].finalize();
    const v=views[id]=(await vegaEmbed('#'+id,s,{renderer:'svg',actions:false,tooltip:{theme:'light'}})).view;
    v.addEventListener('click',(_e,item)=>{const code=item?.datum?.bioregion_code;if(code)selectRegion(regionFocus===code?'':code);});
    v.addEventListener('pointermove',(_e,item)=>{if(!regionFocus)details(regions.find(r=>r.bioregion_code===item?.datum?.bioregion_code));});
    v.addEventListener('pointerleave',()=>details(regions.find(r=>r.bioregion_code===regionFocus),Boolean(regionFocus)));
  }
  async function embedVegetation(){
    const id='vegetation-protection',s=JSON.parse(JSON.stringify(specs[2])),narrow=window.innerWidth<600;
    s.data={values:vegetation};s.params[0].value=vegetationFocus;s.width=Math.max(130,Math.floor(el(id).clientWidth)-(narrow?148:265)-32);
    s.encoding.y.axis.labelLimit=narrow?145:265;s.encoding.y.axis.labelFontSize=narrow?12:14;
    if(views[id])views[id].finalize();
    views[id]=(await vegaEmbed('#'+id,s,{renderer:'svg',actions:false,tooltip:{theme:'light'}})).view;
    views[id].addEventListener('click',(_e,item)=>{const code=item?.datum?.mvg_code;if(code)selectVegetation(vegetationFocus===code?0:code);});
    selectVegetation(vegetationFocus);
  }
  function draw(){
    queue=queue.then(async()=>{
      if(!visible().some(r=>r.bioregion_code===regionFocus))regionFocus='';
      await embedMap('protection-map',0);await embedMap('protection-symbols',1);await embedVegetation();selectRegion(regionFocus);
      el('protection-status').textContent=`${visible().length} of 87 bioregions with applicable terrestrial statistics shown. ${el('protection-view').value==='all'?'Includes the two external island regions.':'Choose All applicable regions to include two external island regions.'} Coral Sea and Subantarctic Islands have no applicable terrestrial comparison.`;
    }).catch(e=>{console.error(e);el('protection-status').textContent='Protection charts could not load. '+e.message;});return queue;
  }
  async function start(){
    try{
      const load=async u=>{const r=await fetch(u);if(!r.ok)throw Error(u+': HTTP '+r.status);return r.json();};
      [regions,vegetation,boundaries,...specs]=await Promise.all(['data/chart08_09_ibra_protection.json','data/chart10_public_protection.json','data/ibra71_regions.topojson','specs/chart08_protection_choropleth.vl.json','specs/chart09_protection_symbols.vl.json','specs/chart10_vegetation_protection.vl.json'].map(load));
      applicable().sort((a,b)=>a.bioregion_name.localeCompare(b.bioregion_name)).forEach(r=>{const o=document.createElement('option');o.value=r.bioregion_code;o.textContent=r.bioregion_name;el('protection-region').appendChild(o);});
      el('protection-insight').textContent=`13 of 87 bioregions with applicable terrestrial statistics have less than 5% of their land protected.`;
      const largest=applicable().reduce((a,b)=>a.protected_area_km2>b.protected_area_km2?a:b);
      el('protection-area-insight').textContent=`${largest.bioregion_name} has the largest protected area: ${format(largest.protected_area_km2)} km², covering ${largest.protected_pct.toFixed(1)}% of the bioregion.`;
      await draw();
      el('protection-view').addEventListener('change',draw);
      el('protection-region').addEventListener('change',async e=>{const code=e.target.value;if(['PSI','ITI'].includes(code)&&el('protection-view').value!=='all'){el('protection-view').value='all';await draw();}selectRegion(code);});
      el('protection-clear').addEventListener('click',()=>selectRegion(''));
      let timer,previous=window.innerWidth;window.addEventListener('resize',()=>{if(previous===window.innerWidth)return;previous=window.innerWidth;clearTimeout(timer);timer=setTimeout(draw,250);});
    }catch(e){console.error(e);el('protection-status').textContent='Protection data could not load. '+e.message;}
  }
  start();
})();
