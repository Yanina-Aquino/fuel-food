// füel. · validación de formularios con mensajes claros
window.Forms = (() => {
  const rules = {
    required: v => v.trim() ? '' : 'Completá este campo',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Revisá el email, parece incompleto',
    tel: v => v.replace(/\D/g, '').length >= 8 ? '' : 'Necesitamos un teléfono para avisarte cuando el repartidor esté en camino',
    cp: v => /^[A-Za-z]?\d{4}([A-Za-z]{3})?$/.test(v.replace(/\s/g, '')) ? '' : 'Ingresá un código postal de 4 números, por ejemplo 1414',
    password: v => v.length >= 8 ? '' : 'Usá al menos 8 caracteres',
    card: v => { const n = v.replace(/\D/g, ''); if (n.length < 15) return 'El número de tarjeta tiene 15 o 16 dígitos';
      let s = 0, alt = false; for (let i = n.length - 1; i >= 0; i--) { let d = +n[i]; if (alt) { d *= 2; if (d > 9) d -= 9; } s += d; alt = !alt; }
      return s % 10 === 0 ? '' : 'Revisá el número, no coincide con una tarjeta válida'; },
    exp: v => { const m = v.match(/^(\d{2})\s*\/\s*(\d{2})$/); if (!m) return 'Usá el formato MM / AA';
      const mm = +m[1], yy = 2000 + +m[2]; if (mm < 1 || mm > 12) return 'El mes va de 01 a 12';
      const now = new Date(); return (yy > now.getFullYear() || (yy === now.getFullYear() && mm >= now.getMonth() + 1)) ? '' : 'La tarjeta está vencida'; },
    cvc: v => /^\d{3,4}$/.test(v.trim()) ? '' : 'Son los 3 dígitos del dorso'
  };

  const check = input => {
    const field = input.closest('.field'); if (!field) return true;
    const list = (input.dataset.rules || '').split(' ').filter(Boolean);
    const opt = input.dataset.optional !== undefined;
    let msg = '';
    for (const r of list) { if (opt && !input.value.trim()) break; msg = rules[r](input.value); if (msg) break; }
    let err = field.querySelector('.field-error');
    if (msg) {
      if (!err) { err = document.createElement('span'); err.className = 'field-error'; err.id = input.id + '-err'; field.appendChild(err); }
      err.textContent = msg; field.classList.add('has-error');
      input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', err.id);
    } else {
      if (err) err.remove(); field.classList.remove('has-error'); input.removeAttribute('aria-invalid');
    }
    return !msg;
  };

  const bind = (form, onValid) => {
    form.noValidate = true;
    form.querySelectorAll('[data-rules]').forEach(i => {
      i.addEventListener('blur', () => { if (i.value) check(i); });
      i.addEventListener('input', () => { if (i.closest('.has-error')) check(i); });
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const inputs = [...form.querySelectorAll('[data-rules]')];
      const bad = inputs.filter(i => !check(i));
      if (bad.length) { bad[0].focus(); return; }
      onValid(Object.fromEntries(new FormData(form)));
    });
  };

  const fill = (form, data) => { if (!data) return; Object.entries(data).forEach(([k, v]) => {
    const el = form.elements[k]; if (!el) return;
    if (el instanceof RadioNodeList) [...el].forEach(r => r.checked = r.value === v); else el.value = v; }); };

  return { bind, fill, check };
})();
