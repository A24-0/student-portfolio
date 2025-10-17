document.addEventListener('DOMContentLoaded',()=>{
  const grid = document.getElementById('projects-grid');
  if(!grid) return;
  const cards = Array.from(grid.querySelectorAll('.project-card'));
  const chips = document.querySelectorAll('.filters .chip');

  function applyFilter(tag){
    cards.forEach(card=>{
      const tags = (card.getAttribute('data-tags')||'').toLowerCase();
      const show = tag==='all' || tags.includes(tag);
      card.style.display = show ? '' : 'none';
    });
  }

  chips.forEach(chip=>{
    chip.addEventListener('click',()=>{
      chips.forEach(c=>c.setAttribute('aria-pressed','false'));
      chip.setAttribute('aria-pressed','true');
      applyFilter(chip.dataset.filter);
    });
  });
});


