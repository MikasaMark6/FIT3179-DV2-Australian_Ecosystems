/* Same NVIS version and common known footprint; independent Part 3 focus. */
(() => {
  'use strict';
  const el=id=>document.getElementById(id);
  let pairs,remaining,specs,views={},focus=0,queue=Promise.resolve();
  const comparison=()=>pairs.filter(d=>d.default_comparison);
  function annotations(){
    const largest=focus?pairs.find(d=>d.mvg_code===focus):comparison().reduce((a,b)=>Math.abs(a.net_category_area_difference_km2)>Math.abs(b.net_category_area_difference_km2)?a:b);
    const difference=largest.net_category_area_difference_km2;
    el('extent-insight').textContent=`${largest.mvg_name}: extant area is ${Math.abs(difference).toLocaleString('en-AU',{maximumFractionDigits:0})} km² ${difference<0?'smaller':'larger'} than its estimated pre-1750 category area.`;
    const low=focus?remaining.find(d=>d.mvg_code===focus):remaining.filter(d=>d.default_comparison).reduce((a,b)=>a.same_category_remaining_pct<b.same_category_remaining_pct?a:b);
    el('remaining-insight').textContent=`${low.mvg_name}: ${low.same_category_remaining_pct.toFixed(1)}% of its estimated historical area is still mapped as the same vegetation category.`;
    el('landscape-selection').textContent=focus?largest.mvg_name:'All 10 comparison types';
  }
  function setFocus(code){
    focus=Number(code)||0;
    if(focus&&!comparison().some(d=>d.mvg_code===focus))focus=0;
    for(const v of Object.values(views))v.signal('landscapeFocus',focus).runAsync();
    annotations();
  }
  async function embed(id,spec,data){
    const s=JSON.parse(JSON.stringify(spec));
    s.data={values:data};s.params[0].value=focus;
    const narrow=window.innerWidth<600;
    s.width=Math.max(130,Math.floor(el(id).clientWidth)-(narrow?148:265)-32);
    for(const layer of s.layer){layer.encoding.y.axis.labelLimit=narrow?145:265;layer.encoding.y.axis.labelFontSize=narrow?12:14;}
    s.config.axis.titleLimit=s.width;
    if(views[id])views[id].finalize();
    views[id]=(await vegaEmbed('#'+id,s,{renderer:'svg',actions:false,tooltip:{theme:'light'}})).view;
    views[id].addEventListener('click',(_event,item)=>{if(item?.datum?.mvg_code)setFocus(focus===item.datum.mvg_code?0:item.datum.mvg_code);});
  }
  function draw(){
    queue=queue.then(async()=>{await embed('extent-chart',specs[0],pairs);await embed('remaining-chart',specs[1],remaining);annotations();el('landscape-status').textContent='Hover for values. Click a type to highlight both charts; click again to clear.';})
      .catch(e=>{console.error(e);el('landscape-status').textContent='Landscape charts could not load. '+e.message;});
    return queue;
  }
  async function start(){
    try{
      const load=async url=>{const r=await fetch(url,url.startsWith('specs/')?{cache:'no-cache'}:{});if(!r.ok)throw Error(url+': HTTP '+r.status);return r.json();};
      [pairs,remaining,...specs]=await Promise.all([load('data/chart06_pre1750_vs_extant.json'),load('data/chart07_same_category_remaining.json'),load('specs/chart06_connected_dot.vl.json'),load('specs/chart07_lollipop.vl.json')]);
      await draw();
      let timer,previous=window.innerWidth;window.addEventListener('resize',()=>{if(previous===window.innerWidth)return;previous=window.innerWidth;clearTimeout(timer);timer=setTimeout(draw,250);});
    }catch(e){console.error(e);el('landscape-status').textContent='Landscape data could not load. '+e.message;}
  }
  start();
})();
