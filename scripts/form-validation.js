document.addEventListener('DOMContentLoaded',()=>{
  const form = document.getElementById('contact-form');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    const name = form.elements.namedItem('name');
    const email = form.elements.namedItem('email');
    const message = form.elements.namedItem('message');

    let valid = true;
    [name,email,message].forEach(input=>{
      if(!input || !input.value.trim()) valid = false;
    });
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) valid = false;

    if(!valid){
      e.preventDefault();
      alert('Проверьте корректность полей формы.');
    }
  });
});


