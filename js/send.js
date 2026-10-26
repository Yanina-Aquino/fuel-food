// füel. · envío de formularios con Netlify Forms (sin servidor propio).
// Los mensajes llegan a tu panel de Netlify (Forms) y, si lo configurás, a tu mail.
window.Send = async (form, data) => {
  const body = new URLSearchParams({ 'form-name': form.getAttribute('name'), ...data }).toString();
  const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  if (!res.ok) throw new Error('envío fallido');
};

window.bindSend = form => {
  const ok = form.querySelector('[data-ok]'), err = form.querySelector('[data-err]'), btn = form.querySelector('[type="submit"]');
  Forms.bind(form, async data => {
    if (data['bot-field']) return; // campo trampa para bots
    err.hidden = true; btn.disabled = true; const label = btn.textContent; btn.textContent = 'Enviando…';
    try {
      await Send(form, data);
      form.querySelectorAll('.fields, [type="submit"]').forEach(e => e.hidden = true);
      ok.hidden = false; ok.focus();
    } catch (e) {
      err.hidden = false; btn.disabled = false; btn.textContent = label;
    }
  });
};
