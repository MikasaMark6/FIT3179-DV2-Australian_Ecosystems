/* One equal-size representative point per Ramsar site. */
(() => {
  'use strict';
  const el=id=>document.getElementById(id);
  const stateNames={ACT:'Australian Capital Territory',NSW:'New South Wales',NT:'Northern Territory',QLD:'Queensland',SA:'South Australia',TAS:'Tasmania',VIC:'Victoria',WA:'Western Australia',EXT:'External territories'};
  let sites,boundaries,view,selected=0,queue=Promise.resolve();
  function rows() {
    const all=el('wetland-view').value==='all',state=el('wetland-state').value;
    return sites.filter(s=>(all||(s.longitude>=110&&s.longitude<=156&&s.latitude>=-45&&s.latitude<=-9))&&(state==='all'||s.state===state));
  }
  function showDetails(site, pinned=false) {
    el('wetland-name').textContent=site?.site_name||'Explore a wetland';
    el('wetland-detail').textContent=site?`${pinned?'Selected site · ':''}${stateNames[site.state]||site.state} · Ramsar site ${site.site_code}. Designation date(s): ${site.designation_dates}.`:'Hover for details. Click a dot to keep its site information here; click it again to clear.';
  }
  function inspect(site) {
    selected=site?.site_code||0;
    showDetails(site,Boolean(selected));
    el('wetland-clear').disabled=!selected;
    if(view)view.signal('selectedSite',selected).runAsync();
  }
  function spec() {
    const width=Math.max(240,Math.floor(el('wetland-map').clientWidth));
    const all=el('wetland-view').value==='all';
    const [west,south,east,north]=all?[95,-45,162,-9]:[110,-45,156,-9];
    return {
      $schema:'https://vega.github.io/schema/vega-lite/v5.json',background:null,width,height:Math.round(width*(all?0.62:0.78)),padding:0,autosize:'none',
      config:{font:'Arial',view:{stroke:null}},
      projection:{type:'mercator',fit:{type:'Feature',geometry:{type:'Polygon',coordinates:[[[west,south],[west,north],[east,north],[east,south],[west,south]]]}}},
      params:[{name:'selectedSite',value:selected}],
      layer:[
        {data:{values:boundaries,format:{type:'topojson',feature:'regions'}},mark:{type:'geoshape',fill:'#e2e6dd',stroke:'#fffdf7',strokeWidth:0.5,clip:true}},
        {data:{values:rows()},mark:{type:'circle',size:85,fill:'#2c7c83',stroke:'#fffdf7',strokeWidth:1.3,clip:true,cursor:'pointer'},encoding:{
          longitude:{field:'longitude',type:'quantitative'},latitude:{field:'latitude',type:'quantitative'},
          opacity:{condition:{test:'selectedSite == 0 || datum.site_code == selectedSite',value:0.95},value:0.35},
          tooltip:[{field:'site_name',type:'nominal',title:'Ramsar site'},{field:'state',type:'nominal',title:'State / territory'},{field:'designation_dates',type:'nominal',title:'Designation date(s)'},{field:'site_code',type:'nominal',title:'Site code'}]
        }},
        {data:{values:rows()},transform:[{filter:'datum.site_code == selectedSite'}],mark:{type:'circle',size:190,fillOpacity:0,stroke:'#a06b21',strokeWidth:2,clip:true,tooltip:false},encoding:{longitude:{field:'longitude',type:'quantitative'},latitude:{field:'latitude',type:'quantitative'}}}
      ]
    };
  }
  function draw() {
    queue=queue.then(async()=>{
      if(!rows().some(s=>s.site_code===selected))selected=0;
      if(view)view.finalize();
      // Native SVG targets avoid coordinate drift when a canvas is resized by CSS.
      view=(await vegaEmbed('#wetland-map',spec(),{renderer:'svg',actions:false,tooltip:{theme:'light'}})).view;
      view.addEventListener('click',(_event,item)=>{if(item?.datum?.site_code)inspect(selected===item.datum.site_code?null:item.datum);});
      view.addEventListener('pointermove',(_event,item)=>{
        if(selected)return;
        showDetails(item?.datum?.site_code?item.datum:null);
      });
      view.addEventListener('pointerleave',()=>{
        showDetails(sites.find(s=>s.site_code===selected),Boolean(selected));
      });
      inspect(sites.find(s=>s.site_code===selected));
      el('wetland-status').textContent=`${rows().length} of 67 sites shown · ${el('wetland-view').value==='all'?'Includes external-territory locations':'Four external-territory sites are outside this view; choose All site locations to include them'}`;
    }).catch(e=>{console.error(e);el('wetland-status').textContent='Wetland map could not load. '+e.message;});
    return queue;
  }
  async function start() {
    try{
      const load=async n=>{const r=await fetch('data/'+n);if(!r.ok)throw Error(n+': HTTP '+r.status);return r.json();};
      [sites,boundaries]=await Promise.all([load('chart05_ramsar_sites.json'),load('ibra71_regions.topojson')]);
      await draw();
      el('wetland-view').addEventListener('change',draw);
      el('wetland-state').addEventListener('change',()=>{if(el('wetland-state').value==='EXT')el('wetland-view').value='all';return draw();});
      el('wetland-clear').addEventListener('click',()=>inspect(null));
      let timer,previousWidth=window.innerWidth;
      window.addEventListener('resize',()=>{if(previousWidth===window.innerWidth)return;previousWidth=window.innerWidth;clearTimeout(timer);timer=setTimeout(draw,250);});
    }catch(e){console.error(e);el('wetland-status').textContent='Wetland data could not load. '+e.message;}
  }
  start();
})();
