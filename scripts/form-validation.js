document.addEventListener('DOMContentLoaded',()=>{
  const form = document.getElementById('contact-form');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    const name = form.elements.namedItem('name');
    const email = form.elements.namedItem('email');
    const message = form.elements.namedItem('message');

    // Clear previous state
    const errorSummary = document.getElementById('form-errors');
    const fields = [name, email, message];
    const fieldErrors = {
      name: document.getElementById('name-error'),
      email: document.getElementById('email-error'),
      message: document.getElementById('message-error')
    };
    Object.values(fieldErrors).forEach(node=>{ if(node) node.textContent = ''; });
    fields.forEach(input=>{ if(input) input.setAttribute('aria-invalid','false'); });
    if(errorSummary) errorSummary.textContent = '';

    // Validate
    let valid = true;
    const errors = [];

    if(!name || !name.value.trim()){
      valid = false;
      errors.push('Укажите имя.');
      if(name){
        name.setAttribute('aria-invalid','true');
        if(fieldErrors.name) fieldErrors.name.textContent = 'Поле имя обязательно для заполнения.';
      }
    }

    const emailValue = email && String(email.value).trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailValue){
      valid = false;
      errors.push('Укажите адрес электронной почты.');
      if(email){
        email.setAttribute('aria-invalid','true');
        if(fieldErrors.email) fieldErrors.email.textContent = 'Поле почта обязательно для заполнения.';
      }
    } else if(!emailRe.test(emailValue)){
      valid = false;
      errors.push('Почта указана в неверном формате.');
      if(email){
        email.setAttribute('aria-invalid','true');
        if(fieldErrors.email) fieldErrors.email.textContent = 'Введите корректный адрес электронной почты.';
      }
    }

    if(!message || !String(message.value).trim()){
      valid = false;
      errors.push('Введите сообщение.');
      if(message){
        message.setAttribute('aria-invalid','true');
        if(fieldErrors.message) fieldErrors.message.textContent = 'Поле сообщение обязательно для заполнения.';
      }
    }

    if(!valid){
      e.preventDefault();
      if(errorSummary){
        errorSummary.classList.remove('sr-only');
        errorSummary.textContent = `Пожалуйста, исправьте ошибки: ${errors.join(' ')}`;
      }
      // focus first invalid
      const firstInvalid = fields.find(i => i && i.getAttribute('aria-invalid') === 'true');
      if(firstInvalid) firstInvalid.focus();
    }
  });
});


