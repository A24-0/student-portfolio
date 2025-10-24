document.addEventListener('DOMContentLoaded',()=>{
  const currentPath = location.pathname.replace(/\\/g,'/');
  document.querySelectorAll('.main-nav .nav-link').forEach(link=>{
    try{
      const href = new URL(link.getAttribute('href'), location.origin).pathname;
      if(currentPath.endsWith(href)) link.classList.add('active');
    }catch(e){/* ignore */}
  });

  // Mobile navigation toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if(toggle && nav){
    toggle.addEventListener('click',()=>{
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    // Close menu on outside click
    document.addEventListener('click',(e)=>{
      if(!nav.classList.contains('is-open')) return;
      if(e.target.closest('.nav-toggle') || e.target.closest('#site-nav')) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
    });
  }
});


