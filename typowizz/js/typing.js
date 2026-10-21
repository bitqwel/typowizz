const TEXTS={
easy:["The sun is up and the sky is blue. I like to walk to the park with my dog. We run and play all day. When the sun goes down we go home and eat a warm meal.","A small cat sat on a red mat. It looked at the big green tree and then it went to sleep. The wind was soft and the day was calm and nice.","We can all learn to type fast. Sit up straight, keep your hands on the keys, and look at the screen. Go slow at first and then go a little faster each day."],
medium:["Typing is a skill that gets better with steady practice. Instead of looking at the keyboard, try to remember where each letter lives. Over time your fingers will move on their own, and you will write faster with fewer mistakes.","Every morning the town woke up slowly. Shops opened their doors, bakers carried warm bread to the window, and children hurried along the street with heavy bags. It was an ordinary day, and that made it perfect.","The best way to improve is to stay relaxed. Tense hands make more errors and tire quickly. Take a deep breath, keep a steady rhythm, and focus on accuracy first. Speed will follow naturally."],
hard:["In 2026, over 5,000 developers shipped 3 new tools; however, only 12% of them were fully documented. Clear writing, careful testing, and patient review (not luck) made the difference - every single time.","Quick brown foxes jumped over 7 lazy dogs at exactly 9:45 a.m.; nobody noticed, except the farmer, who muttered, 2 times, that such nonsense was impossible, unreasonable, and totally unexpected.","Precision matters: a misplaced comma, a missing semicolon, or an extra space can change the meaning completely. Type carefully, check your work, and remember - consistency beats raw speed!"]};
/* ---------- Typing test ---------- */
let kind="paragraph",lvl="easy",lim=60,txt="",t0=0,iv=0,done=false;
tg("#kd",[["paragraph","Paragraph"],["essay","Essay"]],kind,v=>kind=v);
tg("#lvl",LV,lvl,v=>lvl=v);
tg("#tm",[[30,"30s"],[60,"1 min"],[120,"2 min"],[0,"No limit"]],lim,v=>lim=+v);
$("#go").onclick=()=>{$("#setup").hidden=true;$("#play").hidden=false;reset()};
$("#back").onclick=()=>{clearInterval(iv);$("#play").hidden=true;$("#setup").hidden=false};
$("#toType").onclick=()=>$("#typing").scrollIntoView({behavior:"smooth"});
function reset(){
  clearInterval(iv);done=false;t0=0;
  const ps=[...TEXTS[lvl]].sort(()=>Math.random()-.5);
  txt=kind=="essay"?ps.join(" "):ps[0];
  $("#txt").innerHTML=[...txt].map(c=>"<span>"+(c=="<"?"&lt;":c)+"</span>").join("");
  $("#ta").value="";$("#ta").disabled=false;$("#txt").scrollTop=0;prev=0;
  $("#sW").textContent=0;$("#sA").textContent="100%";$("#sT").textContent=lim||0;$("#sB").textContent=bestGet("tw_best")||"–";
  sp=[...$("#txt").children];mark(true);$("#ta").focus({preventScroll:true});
}
function stats(){
  const v=$("#ta").value,el=Math.max((Date.now()-t0)/1000,.01);let ok=0;
  for(let i=0;i<v.length;i++)if(v[i]==txt[i])ok++;
  return{ok,n:v.length,el,wpm:Math.round(ok/5/(el/60)),acc:v.length?Math.round(ok/v.length*100):100};
}
let sp=[],prev=0;
function mark(full){
  const v=$("#ta").value,n=v.length;let a=0,b=sp.length-1;
  if(!full&&Math.abs(n-prev)<=1){a=Math.max(0,Math.min(n,prev)-1);b=Math.min(sp.length-1,Math.max(n,prev)+1)}
  for(let i=a;i<=b;i++)sp[i].className=i<n?(v[i]==txt[i]?"ok":"bad"):(i==n?"cur":"");
  prev=n;const c=sp[Math.min(n,sp.length-1)];if(c)$("#txt").scrollTop=Math.max(0,c.offsetTop-90);
}
function tick(){
  if(!t0||done)return;const s=stats();
  $("#sW").textContent=s.wpm;$("#sA").textContent=s.acc+"%";
  if(lim){const left=Math.max(0,Math.ceil(lim-s.el));$("#sT").textContent=left;if(left<=0)finish()}else $("#sT").textContent=Math.floor(s.el);
}
function finish(){
  if(done)return;done=true;clearInterval(iv);const s=stats();
  const secs=(lim&&s.el>=lim)?lim:Math.max(1,Math.round(s.el)),wpm=Math.round(s.ok/5/(secs/60));$("#ta").disabled=true;
  $("#sW").textContent=wpm;$("#sA").textContent=s.acc+"%";
  const nb=wpm>bestGet("tw_best");if(nb)bestSet("tw_best",wpm);$("#sB").textContent=bestGet("tw_best");
  const bad=s.n-s.ok;
  showResult({icon:"⌨",title:"Typing "+kind+" ("+lvl+")",score:Math.max(0,s.ok*10-bad*5),wpm,acc:s.acc,det:s.ok+" correct · "+bad+" mistakes · "+secs+" seconds"+(nb&&wpm>0?" · 🎉 New best!":""),again:reset,close:()=>$("#back").click()});
}
$("#ta").addEventListener("input",()=>{
  if(done)return;
  if(!t0){t0=Date.now();iv=setInterval(tick,100)}
  mark();tick();if($("#ta").value.length>=txt.length)finish();
});
$("#ta").addEventListener("keydown",e=>{if(e.key=="Escape")reset()});
$("#new").onclick=reset;
$("#txt").onclick=()=>$("#ta").focus({preventScroll:true});
$("#ta").addEventListener("focus",()=>$("#txt").classList.add("f"));$("#ta").addEventListener("blur",()=>$("#txt").classList.remove("f"));
$("#ta").addEventListener("paste",e=>e.preventDefault());
