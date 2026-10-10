/* Local Vega-Lite charts. Map data are already in EPSG:9473 projected metres. */
'use strict';
const FAMILIES = ['Forests and vine thickets','Woodlands and open woodlands','Mixed woodland / shrub / grass types','Shrublands, heathlands and forblands','Grasslands, herblands, sedges and rushes','Mangroves','Inland aquatic','Cleared / non-native / built','Unclassified native','Naturally bare','Regrowth / modified native','Unknown / no data'];
const COLORS = ['#305d49','#7d936b','#adba97','#b88749','#d7b865','#477e88','#7dadbb','#d0cdc7','#e6ded0','#e9d7ba','#b8c6aa','#f0edea'];
const LABELS={1:'Rainforests & vine thickets',2:'Tall open eucalypt forests',3:'Open eucalypt forests',4:'Low open eucalypt forests',5:'Eucalypt woodlands',6:'Acacia forests & woodlands',7:'Callitris forests & woodlands',8:'Casuarina forests & woodlands',9:'Melaleuca forests & woodlands',10:'Other forests & woodlands',11:'Open eucalypt woodlands',12:'Tropical eucalypt woodland / grass',13:'Open acacia woodlands',14:'Mallee woodlands & shrublands',15:'Low forest & tall closed shrub',16:'Acacia shrublands',17:'Other shrublands',18:'Heathlands',19:'Tussock grasslands',20:'Hummock grasslands',21:'Other grass / herbs / sedges / rushes',22:'Chenopod / samphire shrub & forb',23:'Mangroves',31:'Other open woodlands',32:'Open & sparse mallee'};
const STATES=['NSW','VIC','QLD','SA','WA','TAS','NT','ACT'];
let classes,areas,stateRows,grid,cellCodes,lookup,views={},focus=0,ready=false,renderQueue=Promise.resolve();
const $=id=>document.getElementById(id);
const base={ $schema:'https://vega.github.io/schema/vega-lite/v5.json', background:null, padding:8, config:{font:'Arial',view:{stroke:null},axis:{labelFontSize:14,titleFontSize:14,titleFontWeight:'normal',labelColor:'#344b3f',titleColor:'#344b3f',gridColor:'#e4e8dd',domain:false,ticks:false,labelPadding:8,titlePadding:15},legend:{labelFontSize:13,titleFontSize:13,labelColor:'#344b3f',titleColor:'#344b3f'}}};
const color={field:'display_family',type:'nominal',scale:{domain:FAMILIES,range:COLORS},legend:null};
const focusParams=()=>[{name:'focused',value:focus}];
const opacity={condition:{test:'focused == 0 || datum.mvg_code == focused',value:1},value:0.2};
function allowedCodes(){return areas.filter(d=>$('scope').value==='all'||d.default_comparison).sort((a,b)=>b.extent_km2-a.extent_km2).map(d=>d.mvg_code);}
async function embed(id,spec){
 if(views[id]) views[id].finalize();
 const result=await vegaEmbed('#'+id,spec,{renderer:id==='map'?'svg':'canvas',actions:false,tooltip:{theme:'light'}});
 views[id]=result.view;
 if(id!=='map')result.view.addEventListener('click',(_event,item)=>{if(item?.datum?.mvg_code)setFocus(focus===item.datum.mvg_code?0:item.datum.mvg_code);});
 return result.view;
}
function announceFocus(){
 const d=lookup.get(focus);
 $('status').textContent=focus?`Selected: ${d.mvg_name}. All three charts highlight this type; percentages remain unchanged.`:'Ready · Hover for details. Click a map location, bar or heatmap cell to highlight a type.';
 $('selection-name').textContent=focus?d.mvg_name:'All native vegetation types';
 $('clear').disabled=focus===0;
}
function applyFocus(){
 for(const v of Object.values(views))v.signal('focused',focus).runAsync();
 $('focus').value=String(focus);announceFocus();
}
function setFocus(code){
 const n=Number(code)||0;
 if(n && !lookup.get(n)?.classified_native)return;
 focus=n;
 if(focus && !allowedCodes().includes(focus)){$('scope').value='all';redraw();}
 else applyFocus();
}
function codeAtPoint(px,py,width,height){
 if(px<0||py<0||px>=width||py>=height)return 0;
 const column=Math.floor(px/width*grid.width),row=Math.floor(py/height*grid.height);
 return cellCodes[row*grid.width+column];
}
function mapDetails(code){
 const d=lookup.get(code);
 if(!d){$('map-type').textContent='Explore the vegetation mosaic';$('map-type-note').textContent='Move over the map to identify a group. Click a native type to highlight it across the three charts.';return;}
 $('map-type').textContent=d.mvg_name;
 $('map-type-note').textContent=`MVG ${d.mvg_code} · ${d.classified_native?'Click to select this native type.':'Mapped context class; excluded from native comparisons.'}`;
}
async function drawMap(){
 const w=Math.max(230,Math.floor($('map').clientWidth));
 const extentX=grid.width*grid.affine_gdal[1],extentY=-grid.height*grid.affine_gdal[5],height=w*extentY/extentX;
 const imageMark={type:'image',width:w,height,align:'left',baseline:'top',aspect:false,tooltip:false};
 const imageEncoding={x:{value:0},y:{value:0},url:{field:'url',type:'nominal'}};
 // Lossless display images preserve every 5 km cell. Only two image marks are drawn;
 // the original grid remains the source for exact cell lookup and official tooltips.
 await embed('map',{...base,padding:0,autosize:'none',width:w,height,params:focusParams(),layer:[
  {data:{values:[{url:'assets/maps/vegetation_base.png'}]},mark:imageMark,encoding:{...imageEncoding,opacity:{condition:{test:'focused == 0',value:1},value:0.22}}},
  {data:{values:classes.filter(d=>d.classified_native).map(d=>({mvg_code:d.mvg_code,url:`assets/maps/mvg_${d.mvg_code}.png`}))},transform:[{filter:'datum.mvg_code == focused'}],mark:imageMark,encoding:imageEncoding}
 ]});
 const svg=$('map').querySelector('svg');
 if(!svg)return;
 const hit=e=>{const r=svg.getBoundingClientRect();return codeAtPoint(e.clientX-r.left,e.clientY-r.top,r.width,r.height);};
 let pending=0;
 svg.addEventListener('pointermove',e=>{const code=hit(e);if(code===pending)return;pending=code;mapDetails(code);svg.style.cursor=lookup.get(code)?.classified_native?'pointer':'default';});
 svg.addEventListener('pointerleave',()=>{pending=0;mapDetails(0);});
 svg.addEventListener('click',e=>{const code=hit(e);mapDetails(code);if(lookup.get(code)?.classified_native)setFocus(focus===code?0:code);});
}
async function drawComparisons(){const codes=allowedCodes(), rows=areas.filter(d=>codes.includes(d.mvg_code)).map(d=>({...d,label:LABELS[d.mvg_code],million_km2:d.extent_km2/1e6})), labels=codes.map(c=>LABELS[c]);const narrow=window.innerWidth<600; const left=narrow?148:265; const total=Math.floor($('bar').clientWidth);const width=Math.max(130,total-left-32);const labelLimit=narrow?145:265;
await embed('bar',{...base,width,height:rows.length*34,params:focusParams(),data:{values:rows},mark:{type:'bar',cornerRadiusEnd:2,height:21},encoding:{y:{field:'label',type:'nominal',sort:labels,axis:{title:null,labelLimit,labelFontSize:narrow?12:14}},x:{field:'million_km2',type:'quantitative',scale:{domain:[0,1.5],nice:false,zero:true},axis:{title:'Mapped extant area (million km²)',values:[0,0.5,1,1.5],format:'.1f'}},color,opacity,tooltip:[{field:'mvg_name',type:'nominal',title:'Official NVIS group'},{field:'extent_km2',type:'quantitative',title:'Extant area (km²)',format:',.0f'},{field:'share_of_classified_native_pct',type:'quantitative',title:'Share of classified native area (%)',format:'.2f'}]}});
await embed('heatmap',{...base,width,height:rows.length*34,params:focusParams(),data:{values:stateRows.filter(d=>codes.includes(d.mvg_code)).map(d=>({...d,label:LABELS[d.mvg_code],native_area_km2:d.native_area_ha/100}))},mark:{type:'rect',stroke:'#fffdf7',strokeWidth:2,cornerRadius:2},encoding:{x:{field:'state_code',type:'ordinal',sort:STATES,axis:{title:null,orient:'top',labelAngle:0,labelFontSize:narrow?11:14}},y:{field:'label',type:'nominal',sort:labels,axis:{title:null,labelLimit,labelFontSize:narrow?12:14}},color:{field:'share_of_state_classified_native_pct',type:'quantitative',scale:{domain:[0,50],range:['#f0f2e8','#c5d4b5','#779466','#305d49']},legend:{title:'Share of state classified native area (%)',orient:'bottom',direction:'horizontal',gradientLength:Math.min(width,330),values:[0,10,20,30,40,50],titleLimit:Math.max(width,200),titleFontSize:narrow?11:13}},opacity,tooltip:[{field:'state_name',type:'nominal',title:'State / territory'},{field:'mvg_name',type:'nominal',title:'Official NVIS group'},{field:'share_of_state_classified_native_pct',type:'quantitative',title:'Share of classified native area (%)',format:'.2f'},{field:'native_area_km2',type:'quantitative',title:'Mapped group area (km²)',format:',.0f'}]}});}
function redraw(all=false){
 renderQueue=renderQueue.then(async()=>{
  $('scope').disabled=true;
  try{if(all)await drawMap();await drawComparisons();applyFocus();}
  catch(e){console.error(e);$('status').textContent='Unable to render charts: '+e.message;$('status').classList.add('error');}
  finally{$('scope').disabled=false;}
 });return renderQueue;
}
async function start(){try{
const names=['vegetation_classes','chart02_native_vegetation_area','chart03_state_native_composition','chart01_nvis_display_grid'];[classes,areas,stateRows,grid]=await Promise.all(names.map(async n=>{const r=await fetch('data/'+n+'.json');if(!r.ok)throw Error(`${n}: HTTP ${r.status}`);return r.json();}));
lookup=new Map(classes.map(d=>[d.mvg_code,d]));
cellCodes=new Uint8Array(grid.width*grid.height);
for(const row of grid.rows)for(const [start,count,code] of row.runs)cellCodes.fill(code,row.row*grid.width+start,row.row*grid.width+start+count);
classes.filter(d=>d.classified_native).forEach(d=>{const o=document.createElement('option');o.value=d.mvg_code;o.textContent=d.mvg_name;$('focus').appendChild(o);});
FAMILIES.forEach((f,i)=>{const node=document.createElement('div');node.className='legend-item';const swatch=document.createElement('span');swatch.className='swatch';swatch.style.background=COLORS[i];const text=document.createElement('span');text.textContent=f;node.append(swatch,text);$(i<6?'legend':'other-legend').appendChild(node);});
const hummock=areas.find(d=>d.mvg_code===20);$('area-insight').textContent=`Hummock grasslands cover ${(hummock.extent_km2/1e6).toFixed(2)} million km² — ${hummock.share_of_classified_native_pct.toFixed(1)}% of classified native vegetation nationally.`;
const peak=stateRows.reduce((a,b)=>a.share_of_state_classified_native_pct>b.share_of_state_classified_native_pct?a:b);$('state-insight').textContent=`${peak.mvg_name} account for ${peak.share_of_state_classified_native_pct.toFixed(1)}% of classified native vegetation in ${peak.state_name}.`;
await redraw(true);ready=true;$('scope').addEventListener('change',()=>{if(focus && !allowedCodes().includes(focus))focus=0;redraw();});$('focus').addEventListener('change',e=>setFocus(e.target.value));$('clear').addEventListener('click',()=>setFocus(0));let timer;let oldWidth=window.innerWidth;window.addEventListener('resize',()=>{if(window.innerWidth===oldWidth)return;oldWidth=window.innerWidth;clearTimeout(timer);timer=setTimeout(()=>redraw(true),250);});
// Expose views for development checks; no data values or denominators are recomputed in the browser.
window.dv2={get views(){return views;},get ready(){return ready;},get focus(){return focus;},setFocus,allowedCodes,codeAtPoint};
}catch(e){console.error(e);$('status').classList.add('error');$('status').textContent='Data could not load. Start this folder through a local web server (see README). '+e.message;}}
start();
