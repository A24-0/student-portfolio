document.addEventListener('DOMContentLoaded',()=>{
  const currentPath = location.pathname.replace(/\\/g,'/');
  document.querySelectorAll('.main-nav .nav-link').forEach(link=>{
    try{
      const href = new URL(link.getAttribute('href'), location.origin).pathname;
      if(currentPath.endsWith(href)) link.classList.add('active');
    }catch(e){/* ignore */}
  });
});


