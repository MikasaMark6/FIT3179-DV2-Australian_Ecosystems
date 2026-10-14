/* Independent ALA record module; it does not share the vegetation selection. */
(() => {
  'use strict';
  const el = id => document.getElementById(id);
  let features, boundaries, view, queue = Promise.resolve();
  function selectedFeatures() {
    const regional = el('bird-view').value !== 'all';
    return features.filter(f => !regional || (f.properties.longitude >= 110 && f.properties.longitude <= 156 && f.properties.latitude >= -45 && f.properties.latitude <= -9));
  }
  function updateSummary() {
    const minimum = Number(el('bird-minimum').value);
    const rows = selectedFeatures().filter(f => f.properties.record_count >= minimum);
    const high=rows.filter(f=>f.properties.recorded_species_richness>=200);
    const eastern=high.filter(f=>f.properties.longitude>=140).length;
    el('bird-insight').textContent=high.length?`${eastern} of ${high.length} displayed grids with at least 200 recorded species lie east of 140° E.`:'No displayed grids have at least 200 recorded species.';
    el('bird-status').textContent = `${rows.length.toLocaleString('en-AU')} of ${selectedFeatures().length.toLocaleString('en-AU')} recorded grids shown · ${minimum ? `At least ${minimum.toLocaleString('en-AU')} records per grid` : 'All record counts'}`;
  }
  function buildSpec() {
    const width = Math.max(240, Math.min(760, Math.floor(el('bird-map').clientWidth)));
    const all = el('bird-view').value === 'all';
    const box = all ? [95, -56, 170, -8] : [110, -45, 156, -9];
    const [west, south, east, north] = box;
    const fit = {type:'Feature', geometry:{type:'Polygon', coordinates:[[[west,south],[west,north],[east,north],[east,south],[west,south]]]}};
    return {
      $schema:'https://vega.github.io/schema/vega-lite/v5.json', background:null,
      width, height:Math.round(Math.min(610, width * (all ? 0.66 : 0.88))), padding:8,
      config:{font:'Arial',view:{stroke:null},legend:{labelFontSize:13,titleFontSize:13,titleFontWeight:'normal'}},
      projection:{type:'mercator',fit},
      params:[{name:'minimumRecords',value:Number(el('bird-minimum').value)}],
      layer:[
        {data:{values:boundaries,format:{type:'topojson',feature:'regions'}},mark:{type:'geoshape',fill:'#e2e6dd',stroke:'#fffdf7',strokeWidth:0.4,clip:true}},
        {data:{values:selectedFeatures()},transform:[{filter:'datum.properties.record_count >= minimumRecords'}],
          mark:{type:'geoshape',stroke:'#fffdf7',strokeWidth:0.25,clip:true},
          encoding:{
            color:{field:'properties.recorded_species_richness',type:'quantitative',scale:{domain:[0,350],range:['#edf2e4','#bdd6b6','#6baf9a','#2c7c83','#23435a'],clamp:true},
              legend:{title:'Recorded bird species per 50 km grid',orient:'bottom',direction:'horizontal',gradientLength:Math.min(width,330),values:[0,100,200,300,350],titleLimit:Math.max(240,width)}},
            tooltip:[
              {field:'properties.grid_id',type:'nominal',title:'50 km grid'},
              {field:'properties.recorded_species_richness',type:'quantitative',title:'Recorded species',format:',.0f'},
              {field:'properties.record_count',type:'quantitative',title:'Occurrence records',format:',.0f'},
              {field:'properties.year',type:'ordinal',title:'Observation year'},
              {field:'properties.longitude',type:'quantitative',title:'Grid centre longitude',format:'.2f'},
              {field:'properties.latitude',type:'quantitative',title:'Grid centre latitude',format:'.2f'}
            ]
          }
        }
      ]
    };
  }
  function draw() {
    queue = queue.then(async () => {
      if(view) view.finalize();
      const result = await vegaEmbed('#bird-map',buildSpec(),{renderer:'svg',actions:false,tooltip:{theme:'light'}});
      view = result.view;
      updateSummary();
    }).catch(error => {
      console.error(error);
      const high=rows.filter(f=>f.properties.recorded_species_richness>=200);
    const eastern=high.filter(f=>f.properties.longitude>=140).length;
    el('bird-insight').textContent=high.length?`${eastern} of ${high.length} displayed grids with at least 200 recorded species lie east of 140° E.`:'No displayed grids have at least 200 recorded species.';
    el('bird-status').textContent = 'Bird map could not load. '+error.message;
    });
    return queue;
  }
  async function start() {
    try {
      const load = async name => {const r=await fetch('data/'+name);if(!r.ok)throw Error(name+': HTTP '+r.status);return r.json();};
      const [birds,regions] = await Promise.all([load('chart04_bird_grid_50km.geojson'),load('ibra71_regions.topojson')]);
      features=birds.features; boundaries=regions;
      await draw();
      el('bird-view').addEventListener('change',draw);
      el('bird-minimum').addEventListener('change',async () => {
        await queue;
        if(view) await view.signal('minimumRecords',Number(el('bird-minimum').value)).runAsync();
        updateSummary();
      });
      let timer,previousWidth=window.innerWidth;
      window.addEventListener('resize',() => {if(previousWidth===window.innerWidth)return;previousWidth=window.innerWidth;clearTimeout(timer);timer=setTimeout(draw,250);});
    } catch(error) {console.error(error);el('bird-status').textContent='Bird data could not load. '+error.message;}
  }
  start();
})();
