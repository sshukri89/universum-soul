const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.main-nav');
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const filters=document.querySelectorAll('.filters button');
const projects=document.querySelectorAll('.project');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f=btn.dataset.filter;
  projects.forEach(p=>p.classList.toggle('hidden',f!=='all'&&!p.dataset.cat.split(' ').includes(f)));
}));

const lb=document.querySelector('.lightbox'),lbImg=lb?.querySelector('img');
document.querySelectorAll('.image-btn').forEach(b=>b.addEventListener('click',()=>{
  lbImg.src=b.dataset.img;lb.classList.add('open');document.body.style.overflow='hidden'
}));
function closeLb(){lb?.classList.remove('open');document.body.style.overflow=''}
lb?.querySelector('.lightbox-close')?.addEventListener('click',closeLb);
lb?.addEventListener('click',e=>{if(e.target===lb)closeLb()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLb()});

const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));

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

function setLanguage(lang){
  document.documentElement.lang=lang;
  localStorage.setItem('universum-language',lang);
  document.querySelectorAll('[data-en][data-nl]').forEach(el=>{
    el.textContent=el.dataset[lang];
  });
  document.querySelectorAll('[data-en-html][data-nl-html]').forEach(el=>{
    el.innerHTML=el.dataset[`${lang}Html`];
  });
  document.querySelectorAll('[data-placeholder-en][data-placeholder-nl]').forEach(el=>{
    el.placeholder=el.dataset[`placeholder${lang==='en'?'En':'Nl'}`];
  });
  document.querySelectorAll('.lang-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===lang));
  document.title=lang==='en'
    ?'Universum Soul | Bespoke memorial stones and Islamic monuments'
    :'Universum Soul | Maatwerk grafstenen en islamitische grafmonumenten';
}
document.querySelectorAll('.lang-btn').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
setLanguage(localStorage.getItem('universum-language')||new URLSearchParams(location.search).get('lang')||'nl');