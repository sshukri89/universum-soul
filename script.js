const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.main-nav');
const closeMenu=()=>{
  nav?.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
  document.body.classList.remove('menu-open');
};
menuBtn?.addEventListener('click',()=>{
  const open=nav?.classList.toggle('open')||false;
  menuBtn.setAttribute('aria-expanded',String(open));
  document.body.classList.toggle('menu-open',open);
});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',event=>{
  if(nav?.classList.contains('open')&&!nav.contains(event.target)&&!menuBtn?.contains(event.target)) closeMenu();
});
window.addEventListener('resize',()=>{if(window.innerWidth>980)closeMenu()});

const filters=document.querySelectorAll('.filters button');
const projects=document.querySelectorAll('.project');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f=btn.dataset.filter;
  projects.forEach(p=>p.classList.toggle('hidden',f!=='all'&&!p.dataset.cat.split(' ').includes(f)));
}));

const lb=document.querySelector('.lightbox'),lbImg=lb?.querySelector('img');
let lightboxTrigger=null;
document.querySelectorAll('.image-btn').forEach(b=>b.addEventListener('click',()=>{
  if(!lb||!lbImg)return;
  lightboxTrigger=b;
  const preview=b.querySelector('img');
  lbImg.src=preview?.currentSrc||preview?.src||b.dataset.img;
  lbImg.alt=preview?.alt||'';
  lb.classList.add('open');document.body.style.overflow='hidden';
  lb.querySelector('.lightbox-close')?.focus();
}));
function closeLb(){if(!lb?.classList.contains('open'))return;lb.classList.remove('open');document.body.style.overflow='';lightboxTrigger?.focus()}
lb?.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();lb.querySelector('.lightbox-close')?.focus()}});
lb?.querySelector('.lightbox-close')?.addEventListener('click',closeLb);
lb?.addEventListener('click',e=>{if(e.target===lb)closeLb()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLb();closeMenu()}});

const revealElements=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}
  }),{threshold:.12});
  revealElements.forEach(e=>io.observe(e));
}else{
  revealElements.forEach(e=>e.classList.add('visible'));
}

function openWhatsApp(message){
  window.open(`https://wa.me/31629771933?text=${encodeURIComponent(message)}`,'_blank','noopener');
}

document.getElementById('contact-form')?.addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(e.currentTarget);
  const lang=document.documentElement.lang==='en'?'en':'nl';
  const msg=lang==='en'
    ?`Hello Universum Soul,\n\nName: ${f.get('name')}\nEmail: ${f.get('email')}\nPhone: ${f.get('phone')||'Not provided'}\n\nMessage:\n${f.get('message')}`
    :`Hallo Universum Soul,\n\nNaam: ${f.get('name')}\nE-mail: ${f.get('email')}\nTelefoon: ${f.get('phone')||'Niet ingevuld'}\n\nBericht:\n${f.get('message')}`;
  openWhatsApp(msg);
});

document.getElementById('quote-form')?.addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(e.currentTarget);
  const lang=document.documentElement.lang==='en'?'en':'nl';
  const msg=lang==='en'
    ?`Hello Universum Soul,\n\nI would like a no-obligation quote.\n\nFirst name: ${f.get('firstName')}\nLast name: ${f.get('lastName')}\nEmail: ${f.get('email')}\nPhone: ${f.get('phone')}\nCemetery: ${f.get('cemetery')||'Not provided'}\nType of monument: ${f.get('monument')}\n\nWishes:\n${f.get('message')}`
    :`Hallo Universum Soul,\n\nIk wil graag een vrijblijvende offerte.\n\nVoornaam: ${f.get('firstName')}\nAchternaam: ${f.get('lastName')}\nE-mail: ${f.get('email')}\nTelefoon: ${f.get('phone')}\nBegraafplaats: ${f.get('cemetery')||'Niet ingevuld'}\nSoort monument: ${f.get('monument')}\n\nWensen:\n${f.get('message')}`;
  openWhatsApp(msg);
});

