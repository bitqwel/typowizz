const $=s=>document.querySelector(s);
const tg=(id,opts,cur,fn)=>{const e=$(id);e.innerHTML="";opts.forEach(o=>{const b=document.createElement("button");b.textContent=o[1];b.className=o[0]==cur?"on":"";b.onclick=()=>{[...e.children].forEach(c=>c.className="");b.className="on";fn(o[0])};e.append(b)})};
const LV=[["easy","Easy"],["medium","Medium"],["hard","Hard"]];
function bestGet(k){try{return +localStorage.getItem(k)||0}catch(e){return 0}}
function bestSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}


/* ---------- Result + certificate ---------- */
let R=null;
function showResult(r){
  R=r;const m=$("#modal");$("#mc").className="mcard";
  $("#mc").innerHTML=`<h2>${r.icon} ${r.title}</h2><p class="mut">${r.msg||(r.wpm<30?"Time is up! Keep practising, you are getting there.":r.wpm<60?"Time is up! Nice work, a solid speed.":r.wpm<90?"Time is up! Fast fingers, excellent.":"Time is up! Lightning speed, wizard level.")}</p>
  <div class="big3"><div><b>${r.score}</b><span>Score</span></div><div><b>${r.wpm}</b><span>WPM</span></div><div><b>${r.acc}%</b><span>Accuracy</span></div></div>
  <p class="mut">${r.det}</p><p><b>🏆 Get your certificate</b></p>
  <input type="text" id="nm" placeholder="Enter your name" maxlength="28" autocomplete="off">
  <div class="row"><button class="btn pri" id="mk">Create certificate</button><button class="btn" id="ag">↻ Play again</button><button class="btn" id="cl">Close</button></div>`;
  m.hidden=false;const nm=$("#nm");nm.focus({preventScroll:true});
  $("#mk").onclick=()=>{const n=nm.value.trim();if(!n){nm.className="r";nm.placeholder="Please type your name first";return}certify(n)};
  nm.onkeydown=e=>{if(e.key=="Enter")$("#mk").click()};
  $("#ag").onclick=()=>{m.hidden=true;r.again()};$("#cl").onclick=()=>{m.hidden=true;r.close()};
}
async function certify(n){
  try{await document.fonts.load("800 40px Orbitron")}catch(e){}
  const r=R,c=document.createElement("canvas");c.width=1200;c.height=850;const x=c.getContext("2d");
  x.fillStyle="#fff";x.fillRect(0,0,1200,850);
  const g=x.createLinearGradient(0,0,1200,850);g.addColorStop(0,"#00b4ff");g.addColorStop(.55,"#7c5cff");g.addColorStop(1,"#ff4fd8");
  x.strokeStyle=g;x.lineWidth=16;x.strokeRect(28,28,1144,794);x.lineWidth=3;x.strokeRect(58,58,1084,734);x.textAlign="center";
  const t=(s,y,f,col)=>{x.font=f;x.fillStyle=col;x.fillText(s,600,y)};
  t("⌨ TYPOWIZZ",150,"800 40px Orbitron,Arial,sans-serif",g);
  t("CERTIFICATE OF ACHIEVEMENT",235,"800 50px Orbitron,Arial,sans-serif","#10142b");
  t("This certifies that",310,"26px Arial,sans-serif","#5d6585");
  let fs=84,f;do{f=`italic 700 ${fs}px Georgia,serif`;x.font=f;fs-=4}while(x.measureText(n).width>980&&fs>32);
  t(n,415,f,g);x.fillStyle=g;x.fillRect(300,440,600,4);
  t("completed "+r.title+" on Typowizz with",505,"26px Arial,sans-serif","#5d6585");
  [[r.wpm,"WPM"],[r.score,"SCORE"],[r.acc+"%","ACCURACY"]].forEach((s,i)=>{const cx=300+i*300;x.fillStyle="#10142b";x.font="800 62px Orbitron,Arial,sans-serif";x.fillText(s[0],cx,625);x.fillStyle="#5d6585";x.font="600 20px Arial,sans-serif";x.fillText(s[1],cx,660)});
  t(new Date().toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"})+"  ·  ID TW-"+Math.random().toString(36).slice(2,8).toUpperCase(),735,"20px Arial,sans-serif","#5d6585");
  t("typowizz  ·  built by @bitqwel",768,"600 18px Arial,sans-serif","#7c5cff");
  const m=$("#modal");$("#mc").className="mcard w";
  $("#mc").innerHTML=`<h2>🏆 Your certificate</h2><img alt="Typowizz certificate" src="${c.toDataURL("image/png")}"><p class="mut">Press and hold (phone) or right-click (computer) the image to save it, or take a screenshot.</p><div class="row"><button class="btn pri" id="ag">↻ Play again</button><button class="btn" id="cl">Close</button></div>`;
  $("#ag").onclick=()=>{m.hidden=true;r.again()};$("#cl").onclick=()=>{m.hidden=true;r.close()};
}
