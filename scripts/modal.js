document.addEventListener('DOMContentLoaded',()=>{
  const grid = document.getElementById('projects-grid');
  if(!grid) return;

  // Create modal elements once
  const backdrop = document.createElement('div');
  backdrop.className = 'sp-modal-backdrop';
  backdrop.setAttribute('aria-hidden','true');

  const modal = document.createElement('div');
  modal.className = 'sp-modal';
  modal.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">Детали проекта</h3>
      <button class="modal-close" aria-label="Закрыть">×</button>
    </div>
    <div class="modal-body"></div>
  `;

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  const body = modal.querySelector('.modal-body');
  const titleEl = modal.querySelector('.modal-title');
  const closeBtn = modal.querySelector('.modal-close');

  function openModal({title, html}){
    titleEl.textContent = title || 'Детали проекта';
    body.innerHTML = html || '';
    backdrop.setAttribute('aria-hidden','false');
    document.addEventListener('keydown',onKeyDown);
  }

  function closeModal(){
    backdrop.setAttribute('aria-hidden','true');
    body.innerHTML = '';
    document.removeEventListener('keydown',onKeyDown);
  }

  function onKeyDown(e){
    if(e.key === 'Escape') closeModal();
  }

  backdrop.addEventListener('click',(e)=>{
    if(e.target === backdrop) closeModal();
  });
  closeBtn.addEventListener('click', closeModal);

  // Delegate clicks from project cards
  function buildContentFromCard(card){
    const img = card.querySelector('img');
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    const tech = Array.from(card.querySelectorAll('.badge')).map(b=>b.textContent).join(', ');
    const content = `
      ${img ? `<img src="${img.getAttribute('src')}" alt="${img.getAttribute('alt')||''}">` : ''}
      ${p ? `<p>${p.textContent}</p>` : ''}
      ${tech ? `<p><strong>Технологии:</strong> ${tech}</p>` : ''}
    `;
    openModal({title: h3 ? h3.textContent : 'Проект', html: content});
  }

  grid.addEventListener('click',(e)=>{
    // Prevent following links inside cards; open modal instead
    const link = e.target.closest('a');
    if(link && link.closest('.project-card')){
      e.preventDefault();
    }

    const card = e.target.closest('.project-card, .card');
    if(!card) return;
    buildContentFromCard(card);
  });

  // Also bind direct click handlers to each card (for robustness)
  document.querySelectorAll('#projects-grid .project-card, #projects-grid .card').forEach(card=>{
    card.addEventListener('click',(e)=>{
      if(e.target.closest('button')) return;
      const link = e.target.closest('a');
      if(link){ e.preventDefault(); }
      buildContentFromCard(card);
    });
  });
});



