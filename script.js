
const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){toggle.addEventListener('click',()=>links.classList.toggle('open'));}
const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const counters=document.querySelectorAll('[data-count]');
const counterIO=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const target=+el.dataset.count;let start=0;const duration=1200;const t0=performance.now();function tick(t){const p=Math.min((t-t0)/duration,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3))).toLocaleString('tr-TR')+(target<100?'+':'');if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);counterIO.unobserve(el);});},{threshold:.6});
counters.forEach(c=>counterIO.observe(c));
