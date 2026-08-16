(function(){
  "use strict";

  /* ============================= DATA ============================= */
  const now = Date.now();
  const DAY = 86400000;
  const daysAgo = n => now - n*DAY;

  const CENTER = { lat: 26.9124, lng: 75.7873 }; // Jaipur

  const facilities = [
    {
      id:'f1', tag:'JPR-01', name:'Hawa Mahal Public Convenience', type:'Public Convenience',
      lat:26.9239, lng:75.8267,
      official:{ status:'operational', lastServiced: daysAgo(3), claim:'Fully functional, serviced regularly.' },
      checkins:[
        { ts:daysAgo(9), water:'none', functionality:'nonfunctional', soap:'no', lighting:'no', accessibility:'none', wastebins:'overflow', cleanliness:1, comment:'No water for over a week, extremely dirty.' },
        { ts:daysAgo(6), water:'limited', functionality:'some_broken', soap:'no', lighting:'no', accessibility:'partial', wastebins:'overflow', cleanliness:1, comment:'Still broken, smells terrible.' },
        { ts:daysAgo(3), water:'none', functionality:'nonfunctional', soap:'no', lighting:'no', accessibility:'none', wastebins:'overflow', cleanliness:1, comment:'One stall locked, other overflowing.' },
        { ts:daysAgo(1), water:'none', functionality:'nonfunctional', soap:'no', lighting:'no', accessibility:'none', wastebins:'overflow', cleanliness:2, comment:'Tourists avoiding it entirely. Needs urgent repair.' }
      ]
    },
    {
      id:'f2', tag:'JPR-02', name:'Chandpole Community Toilet', type:'Community Toilet',
      lat:26.9198, lng:75.8149,
      official:{ status:'operational', lastServiced: daysAgo(2), claim:'Recently serviced, fully operational.' },
      checkins:[
        { ts:daysAgo(5), water:'good', functionality:'working', soap:'yes', lighting:'yes', accessibility:'functional', wastebins:'clean', cleanliness:5, comment:'' },
        { ts:daysAgo(2), water:'good', functionality:'working', soap:'yes', lighting:'yes', accessibility:'functional', wastebins:'clean', cleanliness:4, comment:'' },
        { ts:daysAgo(0.5), water:'good', functionality:'working', soap:'yes', lighting:'yes', accessibility:'functional', wastebins:'partial', cleanliness:4, comment:'Clean, well kept.' }
      ]
    },
    {
      id:'f3', tag:'JPR-03', name:'Jaipur Junction Platform Toilet', type:'Railway Platform Toilet',
      lat:26.9196, lng:75.7877,
      official:{ status:'under_maintenance', lastServiced: daysAgo(15), claim:'Under maintenance, repair pending.' },
      checkins:[
        { ts:daysAgo(6), water:'limited', functionality:'some_broken', soap:'no', lighting:'yes', accessibility:'partial', wastebins:'partial', cleanliness:2, comment:'' },
        { ts:daysAgo(3), water:'none', functionality:'nonfunctional', soap:'no', lighting:'yes', accessibility:'none', wastebins:'overflow', cleanliness:1, comment:'Matches the maintenance notice at least.' },
        { ts:daysAgo(1), water:'none', functionality:'nonfunctional', soap:'no', lighting:'no', accessibility:'none', wastebins:'overflow', cleanliness:1, comment:'' }
      ]
    },
    {
      id:'f4', tag:'JPR-04', name:'Statue Circle Park Toilet', type:'Park Toilet Block',
      lat:26.9067, lng:75.8081,
      official:{ status:'operational', lastServiced: daysAgo(4), claim:'Operational, minor upkeep only.' },
      checkins:[
        { ts:daysAgo(8), water:'good', functionality:'working', soap:'yes', lighting:'yes', accessibility:'functional', wastebins:'clean', cleanliness:4, comment:'' },
        { ts:daysAgo(4), water:'limited', functionality:'some_broken', soap:'no', lighting:'yes', accessibility:'partial', wastebins:'partial', cleanliness:3, comment:'One tap broken, still usable.' },
        { ts:daysAgo(1), water:'limited', functionality:'some_broken', soap:'no', lighting:'yes', accessibility:'partial', wastebins:'partial', cleanliness:3, comment:'Same issue as last week — not fixed yet.' }
      ]
    },
    {
      id:'f5', tag:'JPR-05', name:'Bapu Bazaar Toilet Complex', type:'Market Complex Toilet',
      lat:26.9155, lng:75.8231,
      official:{ status:'operational', lastServiced: daysAgo(1), claim:'Fully functional.' },
      checkins:[
        { ts:daysAgo(4), water:'good', functionality:'working', soap:'yes', lighting:'yes', accessibility:'functional', wastebins:'clean', cleanliness:5, comment:'' },
        { ts:daysAgo(1), water:'good', functionality:'working', soap:'yes', lighting:'yes', accessibility:'functional', wastebins:'clean', cleanliness:5, comment:'' }
      ]
    },
    {
      id:'f6', tag:'JPR-06', name:'Johari Bazaar Community Toilet', type:'Community Toilet',
      lat:26.9169, lng:75.8258,
      official:{ status:'operational', lastServiced: daysAgo(20), claim:'Serviced monthly, operational.' },
      checkins:[
        { ts:daysAgo(12), water:'none', functionality:'nonfunctional', soap:'no', lighting:'no', accessibility:'none', wastebins:'overflow', cleanliness:1, comment:'' },
        { ts:daysAgo(8), water:'none', functionality:'nonfunctional', soap:'no', lighting:'no', accessibility:'none', wastebins:'overflow', cleanliness:1, comment:'12 days now, nobody has come.' },
        { ts:daysAgo(4), water:'limited', functionality:'nonfunctional', soap:'no', lighting:'no', accessibility:'none', wastebins:'overflow', cleanliness:1, comment:'' },
        { ts:daysAgo(1), water:'none', functionality:'nonfunctional', soap:'no', lighting:'no', accessibility:'none', wastebins:'overflow', cleanliness:1, comment:'Still broken.' }
      ]
    },
    {
      id:'f7', tag:'JPR-07', name:'Sindhi Camp Bus Stand Toilet', type:'Bus Stand Toilet',
      lat:26.9231, lng:75.7935,
      official:{ status:'operational', lastServiced: daysAgo(6), claim:'Operational with regular cleaning.' },
      checkins:[
        { ts:daysAgo(5), water:'good', functionality:'working', soap:'no', lighting:'yes', accessibility:'partial', wastebins:'partial', cleanliness:3, comment:'' },
        { ts:daysAgo(2), water:'limited', functionality:'working', soap:'no', lighting:'yes', accessibility:'partial', wastebins:'partial', cleanliness:3, comment:'No soap again.' }
      ]
    }
  ];

  let flags = [
    {
      id:'flag-seed-1', facilityId:'f1', facilityName:'Hawa Mahal Public Convenience', severity:'major',
      ts:daysAgo(2),
      message:'9 days of consistent malfunction reports (water, functionality, waste) contradict the official "Operational" status.',
      status:'Pending Municipal Action'
    },
    {
      id:'flag-seed-2', facilityId:'f6', facilityName:'Johari Bazaar Community Toilet', severity:'major',
      ts:daysAgo(6),
      message:'12 days of non-functional reports despite official record showing no issue.',
      status:'Acknowledged — Repair Scheduled'
    }
  ];

  /* ============================= PERSISTENCE ============================= */
  // Keeps user-submitted check-ins and generated flags across page refreshes.
  // Facility metadata (name/location/official record) always comes from the
  // seed data above; only check-ins + flags are saved, so editing the seed
  // data in code later still works normally.
  const STORAGE_KEY = 'swachhtrust_v1';

  function saveState(){
    try{
      const payload = {
        checkins: Object.fromEntries(facilities.map(f => [f.id, f.checkins])),
        flags
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }catch(e){
      // Storage can be unavailable (private browsing, sandboxed preview, quota) —
      // fail silently so the app still works in-memory for this session.
      console.warn('[SwachhTrust] could not save state:', e);
    }
  }

  function loadState(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return;
      const payload = JSON.parse(raw);
      if(payload && payload.checkins){
        facilities.forEach(f=>{
          if(Array.isArray(payload.checkins[f.id])) f.checkins = payload.checkins[f.id];
        });
      }
      if(payload && Array.isArray(payload.flags)) flags = payload.flags;
    }catch(e){
      console.warn('[SwachhTrust] could not load saved state, using seed data:', e);
    }
  }

  function resetDemoData(){
    try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
    location.reload();
  }

  /* ============================= SCORING ============================= */
  const METRIC_SCORES = {
    water:{ good:100, limited:50, none:0 },
    functionality:{ working:100, some_broken:50, nonfunctional:0 },
    soap:{ yes:100, no:0 },
    lighting:{ yes:100, no:0 },
    accessibility:{ functional:100, partial:50, none:0 },
    wastebins:{ clean:100, partial:50, overflow:0 }
  };

  function checkinScore(c){
    const parts = [
      METRIC_SCORES.water[c.water],
      METRIC_SCORES.functionality[c.functionality],
      METRIC_SCORES.soap[c.soap],
      METRIC_SCORES.lighting[c.lighting],
      METRIC_SCORES.accessibility[c.accessibility],
      METRIC_SCORES.wastebins[c.wastebins],
      (c.cleanliness/5)*100
    ];
    return parts.reduce((a,b)=>a+b,0)/parts.length;
  }

  function sortedCheckins(f){ return [...f.checkins].sort((a,b)=>a.ts-b.ts); }

  function trustScore(f){
    const recent = sortedCheckins(f).slice(-3);
    if(recent.length===0) return null;
    const s = recent.map(checkinScore);
    return Math.round(s.reduce((a,b)=>a+b,0)/s.length);
  }

  function bucket(score){
    if(score==null) return 'unknown';
    if(score>=70) return 'good';
    if(score>=40) return 'okay';
    return 'needs_repair';
  }

  const isBadReport = c => c.functionality !== 'working';

  function recentBadCount(f, days=10){
    const cutoff = now - days*DAY;
    return f.checkins.filter(c => c.ts>=cutoff && isBadReport(c)).length;
  }

  function daysSilent(f){
    const sorted = sortedCheckins(f);
    let streakStart = null;
    for(let i=sorted.length-1;i>=0;i--){
      if(isBadReport(sorted[i])){ streakStart = sorted[i].ts; }
      else break;
    }
    if(streakStart==null) return 0;
    return Math.max(0, Math.round((now-streakStart)/DAY));
  }

  function evaluateDiscrepancy(f){
    const score = trustScore(f);
    const b = bucket(score);
    const officialGood = f.official.status === 'operational';
    const bad = recentBadCount(f,10);
    if(officialGood && b==='needs_repair' && bad>=3) return { level:'major', bad };
    if(officialGood && (b==='needs_repair' || (b==='okay' && bad>=2))) return { level:'minor', bad };
    return { level:'none', bad };
  }

  function computeAll(){
    return facilities.map(f=>{
      const score = trustScore(f);
      return {
        f, score, bucket: bucket(score),
        discrepancy: evaluateDiscrepancy(f),
        silent: daysSilent(f)
      };
    });
  }

  function ensureFlagged(f, computed){
    if(computed.discrepancy.level !== 'major') return null;
    if(flags.some(fl=>fl.facilityId===f.id)) return null;
    const newFlag = {
      id:'flag-'+f.id+'-'+Date.now(),
      facilityId:f.id, facilityName:f.name, severity:'major',
      ts: now,
      message: `${computed.silent} day(s) of consistent malfunction reports contradict the official "Operational" status.`,
      status:'Sent to Municipal Corporation — just now'
    };
    flags.unshift(newFlag);
    return newFlag;
  }

  /* ============================= HELPERS ============================= */
  const LABELS = {
    water:{ good:'Good', limited:'Limited', none:'Not available' },
    functionality:{ working:'🟢 All working', some_broken:'🟡 Some broken', nonfunctional:'🔴 Mostly/fully non-functional' },
    soap:{ yes:'✅ Available', no:'❌ Not available' },
    lighting:{ yes:'✅ Working', no:'❌ Not working' },
    accessibility:{ functional:'✅ Functional', partial:'⚠️ Partial', none:'❌ Not accessible' },
    wastebins:{ clean:'🟢 Clean', partial:'🟡 Partially full', overflow:'🔴 Overflowing' },
    status:{ operational:'Operational', under_maintenance:'Under Maintenance', closed:'Closed' }
  };
  const TONE = {
    water:{good:'pos',limited:'mid',none:'neg'},
    functionality:{working:'pos',some_broken:'mid',nonfunctional:'neg'},
    soap:{yes:'pos',no:'neg'},
    lighting:{yes:'pos',no:'neg'},
    accessibility:{functional:'pos',partial:'mid',none:'neg'},
    wastebins:{clean:'pos',partial:'mid',overflow:'neg'}
  };
  const BUCKET_LABEL = { good:'Good', okay:'Okay', needs_repair:'Needs Repair', unknown:'No data' };

  function relTime(ts){
    const diff = now - ts;
    const h = diff/3600000;
    if(h < 1) return 'just now';
    if(h < 24) return Math.round(h)+'h ago';
    const d = Math.round(h/24);
    return d+'d ago';
  }
  function fmtDate(ts){
    return new Date(ts).toLocaleDateString('en-IN',{ day:'numeric', month:'short' });
  }
  const esc = s => (s||'').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ============================= STATE ============================= */
  let selectedId = null;
  let listFilter = 'all';
  let map, markersLayer;
  const markerRefs = {};

  /* ============================= GAUGE (semi-donut) ============================= */
  function polar(cx,cy,r,angleDeg){
    const rad = angleDeg*Math.PI/180;
    return { x: cx + r*Math.cos(rad), y: cy + r*Math.sin(rad) };
  }
  function arcPath(cx,cy,r,a0,a1){
    const p0 = polar(cx,cy,r,a0);
    const p1 = polar(cx,cy,r,a1);
    const large = (a1-a0) > 180 ? 1 : 0;
    return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`;
  }

  function renderGauge(counts, total){
    const svg = document.getElementById('gaugeSvg');
    const cx=180, cy=185, r=140, sw=30;
    let html = `<path d="${arcPath(cx,cy,r,180,360)}" stroke="#DADCD2" stroke-width="${sw}" fill="none" stroke-linecap="butt"/>`;
    const order = [['good',counts.good,'var(--green)'], ['okay',counts.okay,'var(--amber)'], ['needs_repair',counts.needs_repair,'var(--red)']];
    let a = 180;
    order.forEach(([key,val,color])=>{
      if(val<=0) return;
      const frac = val/total;
      const a1 = a + frac*180;
      html += `<path d="${arcPath(cx,cy,r,a,a1)}" stroke="${color}" stroke-width="${sw}" fill="none" stroke-linecap="butt"/>`;
      a = a1;
    });
    svg.innerHTML = html;

    const legend = document.getElementById('gaugeLegend');
    legend.innerHTML = order.map(([key,val,color])=>{
      const pct = total ? Math.round(val/total*100) : 0;
      return `<span class="legend-item"><span class="swatch" style="background:${color}"></span>${BUCKET_LABEL[key]} <b>${val}</b> <span style="color:var(--ink-muted)">(${pct}%)</span></span>`;
    }).join('');
  }

  /* ============================= RENDER: DASHBOARD ============================= */
  function renderDashboard(all){
    const counts = { good:0, okay:0, needs_repair:0 };
    let sum=0, n=0, discRepancyCount=0;
    all.forEach(c=>{
      if(counts[c.bucket]!==undefined) counts[c.bucket]++;
      if(c.score!=null){ sum+=c.score; n++; }
      if(c.discrepancy.level!=='none') discRepancyCount++;
    });
    const total = all.length;
    renderGauge(counts, total);
    document.getElementById('cityScoreNum').textContent = n ? Math.round(sum/n) : '—';
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statDiscrepancy').textContent = discRepancyCount;
    document.getElementById('statFlags').textContent = flags.length;
    document.getElementById('statBad').textContent = counts.needs_repair;
  }

  /* ============================= RENDER: MAP ============================= */
  function initMap(){
    map = L.map('map', { scrollWheelZoom:false }).setView([CENTER.lat, CENTER.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom:19,
      attribution:'&copy; OpenStreetMap contributors'
    }).addTo(map);
    markersLayer = L.layerGroup().addTo(map);
  }

  function colorFor(bucketKey){
    return bucketKey==='good' ? '#2E7D5B' : bucketKey==='okay' ? '#C97F1F' : '#B23A2E';
  }

  function makeIcon(bucketKey, flagged){
    const color = colorFor(bucketKey);
    const html = `<div class="${flagged?'pin-pulse':''}"><div class="pin-dot" style="width:18px;height:18px;background:${color};"></div></div>`;
    return L.divIcon({ html, className:'', iconSize:[18,18], iconAnchor:[9,9] });
  }

  function renderMap(all){
    markersLayer.clearLayers();
    all.forEach(c=>{
      const flagged = c.discrepancy.level==='major';
      const marker = L.marker([c.f.lat, c.f.lng], { icon: makeIcon(c.bucket, flagged) });
      marker.on('click', ()=> selectFacility(c.f.id));
      marker.bindTooltip(c.f.name, { direction:'top', offset:[0,-10] });
      marker.addTo(markersLayer);
      markerRefs[c.f.id] = marker;
    });
  }

  document.getElementById('locateBtn').addEventListener('click', ()=>{
    if(!navigator.geolocation){ alert('Geolocation not supported by this browser.'); return; }
    navigator.geolocation.getCurrentPosition(pos=>{
      const { latitude, longitude } = pos.coords;
      L.circleMarker([latitude, longitude], {
        radius:8, color:'#2A5DFF', weight:2, fillColor:'#2A5DFF', fillOpacity:.6
      }).addTo(markersLayer).bindTooltip('You are here', { permanent:false });
      map.setView([latitude, longitude], 14);
    }, ()=>{
      alert('Location permission denied — showing demo facilities around Jaipur instead.');
    }, { timeout:6000 });
  });

  /* ============================= RENDER: LIST ============================= */
  const FILTERS = [
    { key:'all', label:'All' },
    { key:'good', label:'Good' },
    { key:'okay', label:'Okay' },
    { key:'needs_repair', label:'Needs repair' },
    { key:'discrepancy', label:'Discrepancy' }
  ];
  function renderFilterBar(){
    const bar = document.getElementById('filterBar');
    bar.innerHTML = FILTERS.map(f=>`<button class="chip ${listFilter===f.key?'active':''}" data-filter="${f.key}">${f.label}</button>`).join('');
    bar.querySelectorAll('.chip').forEach(btn=>{
      btn.addEventListener('click', ()=>{ listFilter = btn.dataset.filter; renderAll(); });
    });
  }

  function renderList(all){
    let items = all;
    if(listFilter==='discrepancy') items = all.filter(c=>c.discrepancy.level!=='none');
    else if(listFilter!=='all') items = all.filter(c=>c.bucket===listFilter);

    const body = document.getElementById('listBody');
    if(items.length===0){
      body.innerHTML = `<div class="detail-empty">No facilities match this filter.</div>`;
      return;
    }
    body.innerHTML = items.map(c=>{
      const flagged = c.discrepancy.level!=='none';
      return `
      <div class="ticket b-${c.bucket} ${selectedId===c.f.id?'selected':''}" data-id="${c.f.id}">
        <div class="row1">
          <span class="tid">#${c.f.tag}</span>
          ${flagged?`<span class="badge flagwarn">${c.discrepancy.level==='major'?'Discrepancy':'Watch'}</span>`:''}
        </div>
        <h4>${esc(c.f.name)}</h4>
        <div class="type">${esc(c.f.type)}</div>
        <div class="scoreline">
          <span class="badge ${c.bucket}">${BUCKET_LABEL[c.bucket]}</span>
          <span class="mono" style="font-size:.78rem;color:var(--ink-muted)">Trust ${c.score ?? '—'}/100</span>
        </div>
      </div>`;
    }).join('');
    body.querySelectorAll('.ticket').forEach(el=>{
      el.addEventListener('click', ()=> selectFacility(el.dataset.id));
    });
  }

  /* ============================= RENDER: DETAIL ============================= */
  function renderDetail(all){
    const card = document.getElementById('detailCard');
    if(!selectedId){
      card.innerHTML = `<div class="detail-empty">Select a facility on the map or list above to see its inspection ticket.</div>`;
      return;
    }
    const c = all.find(x=>x.f.id===selectedId);
    if(!c){ card.innerHTML = `<div class="detail-empty">Facility not found.</div>`; return; }
    const f = c.f;
    const latest = sortedCheckins(f)[sortedCheckins(f).length-1];
    const disc = c.discrepancy;

    let stamp = '';
    if(disc.level==='major') stamp = `<div class="stamp">Discrepancy Flagged</div>`;
    else if(disc.level==='minor') stamp = `<div class="stamp minor">Under Watch</div>`;

    let discNote = '';
    if(disc.level==='major'){
      discNote = `<div class="discrepancy-note"><b>Major discrepancy detected</b>
        Official record says "${LABELS.status[f.official.status]}", but crowd reports show malfunction for ${c.silent} day(s) straight (${disc.bad} bad report(s) in the last 10 days). Auto-flagged for priority repair.</div>`;
    } else if(disc.level==='minor'){
      discNote = `<div class="discrepancy-note minor"><b>Pattern forming</b>
        ${disc.bad} recent malfunction report(s) while the official record still says "${LABELS.status[f.official.status]}". One more within 10 days will trigger an automatic priority-repair flag.</div>`;
    }

    const metricRows = ['water','functionality','soap','lighting','accessibility','wastebins'].map(key=>{
      const val = latest[key];
      const tone = TONE[key][val];
      return `<div class="compare-cell"><div class="k">${key}</div><div class="v ${tone}">${LABELS[key][val]}</div></div>`;
    }).join('') + `<div class="compare-cell"><div class="k">Cleanliness</div><div class="v ${latest.cleanliness>=4?'pos':latest.cleanliness>=3?'mid':'neg'}">${'★'.repeat(latest.cleanliness)}${'☆'.repeat(5-latest.cleanliness)}</div></div>`;

    const timeline = sortedCheckins(f).slice(-5).reverse().map(ci=>`
      <div class="tl-item">
        <span class="tl-time">${fmtDate(ci.ts)}</span>
        <span class="tl-body"><b>${LABELS.functionality[ci.functionality]}</b> · water: ${LABELS.water[ci.water]} · ${'★'.repeat(ci.cleanliness)}${'☆'.repeat(5-ci.cleanliness)}
        ${ci.comment ? `<br><span class="tl-comment">"${esc(ci.comment)}"</span>` : ''}</span>
      </div>`).join('');

    card.innerHTML = `
      ${stamp}
      <div class="detail-head">
        <div>
          <span class="tid">#${f.tag}</span>
          <h3>${esc(f.name)}</h3>
          <span class="type">${esc(f.type)}</span>
        </div>
        <div class="score-block">
          <div class="num ${c.bucket}">${c.score ?? '—'}</div>
          <div class="cap">Trust score · ${BUCKET_LABEL[c.bucket]}</div>
        </div>
      </div>
      ${discNote}
      <div class="compare-explain">Latest crowd check-in (${relTime(latest.ts)}) — the official record only logs a single overall status, which is exactly the reporting gap this ticket exposes:</div>
      <div class="compare-grid">${metricRows}</div>
      <div class="official-block">
        <div>
          <div class="k">Official record</div>
          <div class="v">${esc(f.official.claim)}</div>
        </div>
        <div style="text-align:right">
          <span class="official-badge">${LABELS.status[f.official.status]}</span>
          <div class="cap" style="margin-top:6px;color:var(--official)">Last serviced ${relTime(f.official.lastServiced)}</div>
        </div>
      </div>
      <div class="timeline">
        <h4>Recent check-ins</h4>
        ${timeline}
      </div>
      <button class="btn ghost" id="addCheckinBtn">+ Add your check-in for this facility</button>
    `;
    document.getElementById('addCheckinBtn').addEventListener('click', ()=>{
      document.getElementById('facilitySelect').value = f.id;
      document.getElementById('report').scrollIntoView({ behavior:'smooth', block:'start' });
    });
  }

  /* ============================= RENDER: FLAGS ============================= */
  function renderFlags(){
    const list = document.getElementById('flagList');
    if(flags.length===0){
      list.innerHTML = `<div class="flag-empty">No priority flags yet — the discrepancy engine hasn't caught a persistent mismatch.</div>`;
      return;
    }
    const sorted = [...flags].sort((a,b)=>b.ts-a.ts);
    list.innerHTML = sorted.map(fl=>`
      <div class="flag-card ${fl.severity}">
        <div class="flag-top">
          <span class="sev">${fl.severity} discrepancy</span>
          <span class="flag-status">${esc(fl.status)}</span>
        </div>
        <div><b>${esc(fl.facilityName)}</b></div>
        <div class="flag-memo">
          <span class="to">TO: Jaipur Municipal Corporation — Sanitation Dept.</span><br>
          SUBJECT: Priority repair required — ${esc(fl.facilityName)}<br>
          ${esc(fl.message)}<br>
          <span style="color:var(--ink-muted)">— auto-generated by SwachhTrust Discrepancy Engine</span>
        </div>
        <div class="flag-time">${relTime(fl.ts)}</div>
      </div>
    `).join('');
  }

  /* ============================= FORM ============================= */
  const OPTIONS = {
    water:[['good','Good'],['limited','Limited'],['none','Not available']],
    functionality:[['working','🟢 All working'],['some_broken','🟡 Some broken'],['nonfunctional','🔴 Mostly/fully non-functional']],
    soap:[['yes','✅ Available'],['no','❌ Not available']],
    lighting:[['yes','✅ Working'],['no','❌ Not working']],
    accessibility:[['functional','✅ Functional'],['partial','⚠️ Partial'],['none','❌ Not accessible']],
    wastebins:[['clean','🟢 Clean'],['partial','🟡 Partially full'],['overflow','🔴 Overflowing']]
  };
  const DEFAULTS = { water:'good', functionality:'working', soap:'yes', lighting:'yes', accessibility:'functional', wastebins:'clean' };
  let starValue = 5;

  function buildPillGroup(key){
    const el = document.getElementById('pg-'+key);
    el.innerHTML = OPTIONS[key].map(([val,label],i)=>{
      const id = `opt-${key}-${val}`;
      const checked = val===DEFAULTS[key] ? 'checked' : '';
      return `<input type="radio" name="${key}" id="${id}" value="${val}" ${checked}><label for="${id}">${label}</label>`;
    }).join('');
  }
  Object.keys(OPTIONS).forEach(buildPillGroup);

  function buildStars(){
    const el = document.getElementById('starRating');
    el.innerHTML = [1,2,3,4,5].map(n=>`<button type="button" data-n="${n}" aria-label="${n} star">★</button>`).join('');
    el.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        starValue = parseInt(btn.dataset.n,10);
        paintStars();
      });
    });
    paintStars();
  }
  function paintStars(){
    document.querySelectorAll('#starRating button').forEach(btn=>{
      btn.classList.toggle('filled', parseInt(btn.dataset.n,10) <= starValue);
    });
  }
  buildStars();

  function buildFacilitySelect(){
    const sel = document.getElementById('facilitySelect');
    sel.innerHTML = facilities.map(f=>`<option value="${f.id}">${esc(f.name)}</option>`).join('');
  }
  buildFacilitySelect();

  document.getElementById('checkinForm').addEventListener('submit', e=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    const facilityId = document.getElementById('facilitySelect').value;
    const f = facilities.find(x=>x.id===facilityId);
    if(!f) return;

    const checkin = {
      ts: Date.now(),
      water: fd.get('water') || DEFAULTS.water,
      functionality: fd.get('functionality') || DEFAULTS.functionality,
      soap: fd.get('soap') || DEFAULTS.soap,
      lighting: fd.get('lighting') || DEFAULTS.lighting,
      accessibility: fd.get('accessibility') || DEFAULTS.accessibility,
      wastebins: fd.get('wastebins') || DEFAULTS.wastebins,
      cleanliness: starValue,
      comment: document.getElementById('commentField').value.trim()
    };
    f.checkins.push(checkin);

    const all = computeAll();
    const cRec = all.find(x=>x.f.id===f.id);
    const newFlag = ensureFlagged(f, cRec);

    selectedId = f.id;
    renderAll();
    saveState();

    const toast = document.getElementById('formToast');
    if(newFlag){
      toast.className = 'toast escalate show';
      toast.textContent = `Check-in submitted — this pushed ${f.name} into a MAJOR discrepancy. A priority-repair flag was just sent to the Municipal Corporation.`;
      document.getElementById('flags').scrollIntoView({ behavior:'smooth', block:'start' });
    } else {
      toast.className = 'toast show';
      toast.textContent = `Check-in submitted for ${f.name}. Trust score and discrepancy status updated.`;
    }
    e.target.reset();
    Object.keys(DEFAULTS).forEach(key=>{
      const input = document.querySelector(`input[name="${key}"][value="${DEFAULTS[key]}"]`);
      if(input) input.checked = true;
    });
    starValue = 5; paintStars();
    document.getElementById('facilitySelect').value = facilityId;
  });

  document.getElementById('reportNowBtn').addEventListener('click', ()=>{
    document.getElementById('report').scrollIntoView({ behavior:'smooth', block:'start' });
  });

  document.getElementById('resetDataBtn').addEventListener('click', ()=>{
    if(confirm('Clear all submitted check-ins and reset to the original demo data?')) resetDemoData();
  });

  /* ============================= SELECT / RENDER ALL ============================= */
  function selectFacility(id){
    selectedId = id;
    renderAll();
    document.getElementById('detail').scrollIntoView({ behavior:'smooth', block:'start' });
    const marker = markerRefs[id];
    if(marker) marker.openTooltip();
  }

  function safeRun(label, fn){
    try{ fn(); }
    catch(e){ console.error(`[SwachhTrust] ${label} render failed — rest of the page will still update:`, e); }
  }

  function renderAll(){
    const all = computeAll();
    // Each section renders independently: if one throws (e.g. the map, which
    // depends on the Leaflet CDN), the others still update instead of the
    // whole page silently freezing.
    safeRun('dashboard', () => renderDashboard(all));
    safeRun('filterBar', renderFilterBar);
    safeRun('map', () => renderMap(all));
    safeRun('list', () => renderList(all));
    safeRun('detail', () => renderDetail(all));
    safeRun('flags', renderFlags);
  }

  /* ============================= CLOCK ============================= */
  function tickClock(){
    const el = document.getElementById('liveClock');
    el.textContent = new Date().toLocaleString('en-IN', { weekday:'short', hour:'2-digit', minute:'2-digit', second:'2-digit' });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ============================= INIT ============================= */
  loadState();
  safeRun('map init', initMap);
  renderAll();

})();