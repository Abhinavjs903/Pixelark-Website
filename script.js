const panels = document.querySelectorAll('.panel');
const container = document.getElementById('scrollContainer');
const menuItems = document.querySelectorAll('.menu-item');

let activeIndex = 0;
let currentX = 0;

// Smooth horizontal scroll
function goToPanel(index){
  currentX = index * window.innerWidth;
  container.style.transform = `translateX(-${currentX}px)`;
  panels.forEach((p,i)=>{
    if(i===index) gsap.to(p,{opacity:1, x:0, duration:0.6, ease:'power2.out'});
    else gsap.to(p,{opacity:0, x:120, duration:0.6, ease:'power2.out'});
  });
  menuItems.forEach(m=>m.classList.remove('active'));
  menuItems[index].classList.add('active');
  activeIndex = index;
}

// Menu clicks
menuItems.forEach((mi,idx)=>{
  mi.addEventListener('click',()=>goToPanel(idx));
});

// Mouse wheel scroll
window.addEventListener('wheel', e=>{
  if(e.deltaY>0 && activeIndex<panels.length-1) goToPanel(activeIndex+1);
  if(e.deltaY<0 && activeIndex>0) goToPanel(activeIndex-1);
});

// Initialize
goToPanel(0);

// ===== Cursor =====
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover effect for clickable elements
document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// ===== Grid particles =====
const particleCount = 50;
for(let i=0;i<particleCount;i++){
    const particle = document.createElement('div');
    particle.className = 'grid-particle';
    particle.style.left = Math.random()*100+'%';
    particle.style.top = Math.random()*100+'%';
    particle.style.width = Math.random()*4+2+'px';
    particle.style.height = Math.random()*4+2+'px';
    particle.style.animationDuration = (5+Math.random()*5)+'s';
    document.body.appendChild(particle);
}

// ===== Spark lines =====
const sparkCount = 30;
for(let i=0;i<sparkCount;i++){
    const spark = document.createElement('div');
    spark.className='spark-line';
    spark.style.left = Math.random()*100+'%';
    spark.style.top = -100 + Math.random()*50 + 'px';
    spark.style.animationDuration = (4+Math.random()*5)+'s';
    document.body.appendChild(spark);
}
