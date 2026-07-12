document.addEventListener('DOMContentLoaded',()=>{
  const sidebar=document.getElementById('sidebar');
  if(!sidebar)return;
  let h='<div class="brand">'+NAV.brand+'</div><nav><a href="/">Home</a>';
  NAV.groups.forEach(g=>{
    h+='<div class="nav-group"><button class="nav-toggle" aria-expanded="false">'+g.label+'</button><div class="submenu">';
    g.items.forEach(i=>{h+='<a href="'+i.href+'">'+i.text+'</a>'});
    h+='</div></div>'
  });
  h+='</nav>';
  sidebar.innerHTML=h;
  const p=(location.pathname.replace(/\/index\.html$/,'/').replace(/\/+$/,'')||'/').toLowerCase();
  document.querySelectorAll('.sidebar a').forEach(a=>{
    const u=(a.getAttribute('href').replace(/\/+$/,'')||'/').toLowerCase();
    if(u===p){
      a.classList.add('active');
      const g=a.closest('.nav-group');
      if(g){g.classList.add('is-open');g.querySelector('.nav-toggle').setAttribute('aria-expanded','true')}
    }
  });
  document.querySelectorAll('.nav-toggle').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.nav-group').forEach(g=>{g.classList.remove('is-open');g.querySelector('.nav-toggle').setAttribute('aria-expanded','false')});
      if(b.getAttribute('aria-expanded')!=='true'){const g=b.closest('.nav-group');g.classList.add('is-open');b.setAttribute('aria-expanded','true')}
    })
  })
});
