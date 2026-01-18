/* DARK MODE */
const darkToggle=document.getElementById("darkToggle");
if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
  darkToggle.textContent="Light Mode";
}else{darkToggle.textContent="Dark Mode";}
darkToggle.onclick=()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",document.body.classList.contains("dark")?"dark":"light");
  darkToggle.textContent=document.body.classList.contains("dark")?"Light Mode":"Dark Mode";
};

/* FULL VIEW (JUARA + ALBUM) */
const modal=document.getElementById("imageModal");
const modalImg=document.getElementById("modalImg");

/* tombol fullview juara */
document.querySelectorAll(".fullview-btn").forEach(b=>{
  b.onclick=()=>{
    modal.style.display="flex";
    modalImg.src=b.dataset.img;
  }
});

/* album apresiasi member */
document.querySelectorAll(".album-img").forEach(img=>{
  img.onclick=()=>{
    modal.style.display="flex";
    modalImg.src=img.dataset.full || img.src;
  }
});

modal.onclick=e=>{
  if(e.target===modal) modal.style.display="none";
};

/* MUSIC */
const music=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicBtn");
const volumeSlider=document.getElementById("volumeSlider");
music.volume=localStorage.getItem("volume")?parseFloat(localStorage.getItem("volume")):0.5;
volumeSlider.value=music.volume;
if(localStorage.getItem("music")==="play"){
  music.play().catch(()=>{});
  musicBtn.textContent="Pause Music";
}
musicBtn.onclick=()=>{
  if(music.paused){
    music.play();
    musicBtn.textContent="Pause Music";
    localStorage.setItem("music","play");
  }else{
    music.pause();
    musicBtn.textContent="Play Music";
    localStorage.setItem("music","pause");
  }
};
volumeSlider.oninput=()=>{
  music.volume=volumeSlider.value;
  localStorage.setItem("volume",volumeSlider.value);
};

/* COUNTDOWN */
const deadline = new Date(2026, 0, 18, 12, 0, 0).getTime();
const nextDeadline = new Date(2026, 0, 26, 8, 0, 0).getTime();
setInterval(()=>{
  const now=Date.now();
  const d1=deadline-now;
  const d2=nextDeadline-now;
  const format=t=>{
    const d=Math.floor(t/86400000);
    const h=Math.floor(t/3600000)%24;
    const m=Math.floor(t/60000)%60;
    const s=Math.floor(t/1000)%60;
    return `${d} hari ${h} jam ${m} menit ${s} detik`;
  };
  document.getElementById("countdown").innerHTML=
    d1<=0?"⛔ Deadline Tugas Telah Berakhir":`⏳ Deadline: ${format(d1)}`;
  document.getElementById("nextCountdown").innerHTML=
    d2<=0?"🎉 Tugas Baru Telah Dibuka!":`📅 Tugas Selanjutnya: ${format(d2)}`;
},1000);

/* SECURITY */
document.addEventListener("contextmenu",e=>e.preventDefault());
document.addEventListener("keydown",e=>{
  if(e.key==="F12"||(e.ctrlKey&&e.shiftKey)||e.ctrlKey&&e.key==="u"){
    e.preventDefault();
    alert("Akses dibatasi!");
  }
});
document.querySelectorAll("img").forEach(i=>i.draggable=false);

/* PARTICLE EFFECT */
const canvas=document.getElementById("particleCanvas");
const ctx=canvas.getContext("2d");
function resize(){
  canvas.width=innerWidth;
  canvas.height=innerHeight;
}
resize();
addEventListener("resize",resize);

const particles=[];
for(let i=0;i<80;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2+1.5,
    vx:(Math.random()-.5)*0.6,
    vy:(Math.random()-.5)*0.6,
    o:Math.random()*0.6+0.4
  });
}
(function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation="lighter";
  particles.forEach(p=>{
    p.x+=p.vx; 
    p.y+=p.vy;
    if(p.x<0||p.x>canvas.width)p.vx*=-1;
    if(p.y<0||p.y>canvas.height)p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${p.o})`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
})();
