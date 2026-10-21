/* ---------- Games ---------- */
const GM={
 rain:{n:"Word Rain",i:"🌧️",c:"#00b4ff",d:"Words fall from the sky. Type one and press Enter to zap it. Wrong word: −5 points. Miss a word and lose a life."},
 burst:{n:"Speed Burst",i:"⚡",c:"#ff9f1a",d:"One word at a time. Type it and press Enter. Correct: +1 point. Wrong: −1 point."},
 scramble:{n:"Scramble Dash",i:"🧩",c:"#7c5cff",d:"Letters are mixed up. Work out the word, type it and press Enter. Wrong: −3 points."},
 blitz:{n:"Letter Blitz",i:"🎯",c:"#ff4fd8",d:"Hit the letters in order, no Enter needed. Right key: +1. Wrong key: −1. Finish a set for a bonus."}};
const P={easy:"cat dog sun run sky map key fun car red blue fish tree book jump star moon rain wind fast".split(" "),
medium:"planet rocket silver garden window python system random pocket button screen travel bridge energy forest".split(" "),
hard:"keyboard algorithm challenge adventure lightning mountain universe developer technology wonderful champion telescope experience adventure orchestra".split(" ")};
const LN={easy:{sp:1.1,gap:2000,n:4},medium:{sp:1.7,gap:1600,n:6},hard:{sp:2.3,gap:1300,n:8}};
let G=null,gid="",glv="easy",gtm=60;
$("#glist").innerHTML=Object.entries(GM).map(([k,g])=>`<div class="card hov gc" style="--c:${g.c}"><div class="ic">${g.i}</div><h3>${g.n}</h3><p>${g.d}</p><button class="btn pri" data-g="${k}">▶ Play</button></div>`).join("");
$("#glist").onclick=e=>{const k=e.target.dataset.g;if(!k)return;gid=k;$("#glist").hidden=true;$("#gset").hidden=false;$("#gic").textContent=GM[k].i;$("#gt").textContent=GM[k].n;$("#gd").textContent=GM[k].d};
tg("#glv",LV,glv,v=>glv=v);tg("#gtm",[[30,"30s"],[60,"60s"],[90,"90s"]],gtm,v=>gtm=+v);
function stop(){if(G){cancelAnimationFrame(G.raf);clearInterval(G.a);clearInterval(G.b);clearInterval(G.c);G=null}}
function showList(){stop();$("#glist").hidden=false;$("#gset").hidden=true;$("#garena").hidden=true}
$("#gback").onclick=showList;$("#gquit").onclick=showList;
const pick=()=>{const a=P[glv];return a[Math.floor(Math.random()*a.length)]};
function nextItem(){
  if(gid=="blitz"){G.w=Array.from({length:LN[glv].n},()=>"abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random()*26)]).join("");G.i=0;paint();return}
  G.w=pick();
  if(gid=="scramble"){let s=G.w;for(let k=0;k<20&&s==G.w;k++)s=[...G.w].sort(()=>Math.random()-.5).join("");$("#cur").textContent=s.toUpperCase()}
  else $("#cur").textContent=G.w;
}
function paint(){$("#cur").innerHTML=[...G.w].map((c,i)=>`<span class="${i<G.i?"ok":""}">${c.toUpperCase()}</span>`).join("")}
$("#gstart").onclick=startGame;
function startGame(){
  stop();const g=GM[gid],L=LN[glv],ar=$("#garena"),rain=gid=="rain";
  $("#gset").hidden=true;ar.hidden=false;ar.className="stage "+gid;ar.style.setProperty("--c",g.c);
  $("#gn").textContent=g.i+" "+g.n;$("#sky").style.display=rain?"block":"none";$("#cur").style.display=rain?"none":"block";$("#sky").innerHTML="";
  $("#gres").innerHTML="";$("#fb").textContent="";const gi=$("#gi");gi.value="";gi.className="";gi.disabled=false;
  gi.placeholder=gid=="blitz"?"Type the letters shown…":"Type the word and press Enter…";gi.focus({preventScroll:true});
  G={score:0,t:gtm,lives:5,ok:0,bad:0,ws:[]};
  $("#gS").textContent=0;$("#gT").textContent=gtm;$("#gXl").textContent=rain?"Lives":"Misses";$("#gX").textContent=rain?5:0;
  if(rain){
    G.b=setInterval(()=>{const e=document.createElement("div"),w=pick();e.className="w";e.textContent=w;$("#sky").append(e);
      const x=Math.random()*Math.max(10,$("#sky").clientWidth-140);e.style.transform=`translate(${x}px,0)`;G.ws.push({w,e,x,y:0})},L.gap);
    let last=performance.now();const me=G,loop=t=>{if(G!==me)return;const dt=Math.min(80,t-last)/40;last=t;const h=$("#sky").clientHeight;
      for(const o of [...G.ws]){o.y+=(L.sp+G.score/80)*dt;o.e.style.transform=`translate(${o.x}px,${o.y}px)`;
        if(o.y>h-30){o.e.remove();G.ws.splice(G.ws.indexOf(o),1);G.lives--;$("#gX").textContent=G.lives;flash(false,"💥 Missed a word!");if(G.lives<=0){end("Game over!");return}}}
      G.raf=requestAnimationFrame(loop)};G.raf=requestAnimationFrame(loop);
  }else nextItem();
  G.a=setInterval(()=>{G.t--;$("#gT").textContent=G.t;if(G.t<=0)end("Time up!")},1000);
}
function flash(ok,m){const f=$("#fb"),el=$("#gi");f.className="fb "+(ok?"g":"r");f.textContent=m;el.className="";void el.offsetWidth;el.className=ok?"g":"r"}
function score(p){G.score=Math.max(0,G.score+p);$("#gS").textContent=G.score}
function end(msg){
  const s=G.score,ok=G.ok,bad=G.bad,k="tw_"+gid,b=bestGet(k),nb=s>b,el=Math.max(1,gtm-G.t),g=GM[gid];if(nb)bestSet(k,s);stop();$("#gi").disabled=true;
  const wpm=Math.round((gid=="blitz"?ok/5:ok)/(el/60)),acc=ok+bad?Math.round(ok/(ok+bad)*100):100;
  showResult({icon:g.i,title:g.n+" ("+glv+")",msg:msg+" Here is how you did.",score:s,wpm,acc,det:ok+" correct · "+bad+" wrong · "+el+" seconds · Best "+Math.max(b,s)+(nb?" 🎉":""),again:startGame,close:showList});
}
function submit(){
  if(!G||gid=="blitz")return;const el=$("#gi"),v=el.value.trim().toLowerCase();el.value="";if(!v)return;
  let ok,p;
  if(gid=="rain"){const i=G.ws.findIndex(o=>o.w==v);ok=i>-1;if(ok){G.ws[i].e.remove();G.ws.splice(i,1);p=v.length}else p=-5}
  else{ok=v==G.w;p=gid=="scramble"?(ok?v.length:-3):(ok?1:-1);if(ok||gid=="burst")nextItem()}
  ok?G.ok++:G.bad++;if(gid!="rain")$("#gX").textContent=G.bad;
  score(p);flash(ok,ok?"✓ Correct! +"+p:"✗ Wrong! −"+Math.abs(p));
}
$("#gi").addEventListener("keydown",e=>{if(e.key=="Enter"||e.key==" "){if(gid!="blitz"){e.preventDefault();submit()}}});
$("#gi").addEventListener("input",()=>{
  if(!G||gid!="blitz")return;const el=$("#gi"),c=el.value.slice(-1).toLowerCase();el.value="";if(!c.trim())return;
  if(c==G.w[G.i]){G.i++;G.ok++;score(1);flash(true,"✓ +1");if(G.i>=G.w.length){score(G.w.length);flash(true,"🔥 Set complete! +"+G.w.length);nextItem()}else paint()}
  else{G.bad++;$("#gX").textContent=G.bad;score(-1);flash(false,"✗ Wrong key −1")}
});
