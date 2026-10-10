/* Composition denominators differ from within-type coverage and national totals. */
(() => {
  'use strict';
  const el=id=>document.getElementById(id);
  let representation,national,cells,specs,views={},focus=0,waffleFocus='',queue=Promise.resolve();
  function selectType(code){
    focus=Number(code)||0;
    if(views['representation-chart'])views['representation-chart'].signal('representationFocus',focus).runAsync();
    const r=focus?representation.find(d=>d.mvg_code===focus):representation.filter(d=>d.default_comparison).reduce((a,b)=>a.representation_difference_pp<b.representation_difference_pp?a:b);
    el('representation-insight').textContent=`${r.mvg_name} makes up ${r.share_of_classified_native_pct.toFixed(1)}% of all classified native vegetation, but ${r.share_of_mapped_protected_classified_native_pct.toFixed(1)}% within publicly mapped protection: ${Math.abs(r.representation_difference_pp).toFixed(1)} percentage points ${r.representation_difference_pp<0?'lower':'higher'}.`;
  }
  function selectCoverage(category){
    waffleFocus=category||'';
    if(views['national-waffle'])views['national-waffle'].signal('waffleFocus',waffleFocus).runAsync();
    el('waffle-detail').textContent=waffleFocus?`${waffleFocus}: ${(waffleFocus==='Protected'?national.protected_pct:national.not_protected_pct).toFixed(2)}% of national land in the official CAPAD 2024 snapshot. Click this category again to clear.`:'Each square represents one percentage point of national land. Hover for cell details; click green or grey to highlight its category.';
  }
  async function drawCharts(){
    const s=JSON.parse(JSON.stringify(specs[0]));s.data={values:representation};s.params[0].value=focus;
    const width=Math.floor(el('representation-chart').clientWidth),narrow=window.innerWidth<600;
    const centre=narrow?160:240,side=Math.max(70,Math.floor((width-centre-36)/2));
    for(const i of [0,2])s.hconcat[i].width=side;
    s.hconcat[1].width=centre;s.hconcat[1].mark.fontSize=narrow?11:13;
    // Short centre labels fit narrow layouts; official names remain in every tooltip.
    if(narrow)s.transform[1].calculate='datum.mvg_code == 1 ? "Rainforests / vines" : datum.mvg_code == 3 ? "Eucalypt open forests" : datum.mvg_code == 5 ? "Eucalypt woodlands" : datum.mvg_code == 9 ? "Melaleuca woodland" : datum.mvg_code == 14 ? "Mallee woodland" : datum.mvg_name';
    if(views['representation-chart'])views['representation-chart'].finalize();
    views['representation-chart']=(await vegaEmbed('#representation-chart',s,{renderer:'svg',actions:false,tooltip:{theme:'light'}})).view;
    views['representation-chart'].addEventListener('click',(_e,item)=>{if(item?.datum?.mvg_code)selectType(focus===item.datum.mvg_code?0:item.datum.mvg_code);});
    const w=JSON.parse(JSON.stringify(specs[1]));w.data={values:cells};w.params[0].value=waffleFocus;w.width=w.height=Math.min(340,Math.floor(el('national-waffle').clientWidth));
    if(views['national-waffle'])views['national-waffle'].finalize();
    views['national-waffle']=(await vegaEmbed('#national-waffle',w,{renderer:'svg',actions:false,tooltip:{theme:'light'}})).view;
    views['national-waffle'].addEventListener('click',(_e,item)=>{const category=item?.datum?.coverage;if(category)selectCoverage(waffleFocus===category?'':category);});
    selectType(focus);selectCoverage(waffleFocus);el('balance-status').textContent='Hover for values. Click a vegetation row or a waffle category to highlight it; click again to clear.';
  }
  function draw(){queue=queue.then(drawCharts).catch(e=>{console.error(e);el('balance-status').textContent='Final comparisons could not load. '+e.message;});return queue;}
  async function start(){
    try{
      const load=async u=>{const r=await fetch(u);if(!r.ok)throw Error(u+': HTTP '+r.status);return r.json();};
      let totals;[representation,totals,cells,...specs]=await Promise.all(['data/chart11_representation.json','data/chart12_national_protection.json','data/chart12_waffle_cells.json','specs/chart11_representation_butterfly.vl.json','specs/chart12_national_waffle.vl.json'].map(load));national=totals[0];
      el('national-protected-value').textContent=national.protected_pct.toFixed(2)+'%';el('national-remainder-value').textContent=national.not_protected_pct.toFixed(2)+'%';
      el('national-insight').textContent=`${national.protected_pct.toFixed(2)}% of national land was protected on 30 June 2024 — about ${(national.protected_area_ha/100).toLocaleString('en-AU',{maximumFractionDigits:0})} km².`;
      await draw();let timer,previous=window.innerWidth;window.addEventListener('resize',()=>{if(previous===window.innerWidth)return;previous=window.innerWidth;clearTimeout(timer);timer=setTimeout(draw,250);});
    }catch(e){console.error(e);el('balance-status').textContent='Final comparison data could not load. '+e.message;}
  }
  start();
})();
