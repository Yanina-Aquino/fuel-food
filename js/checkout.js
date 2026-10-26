// füel. · entrega y pago (comparten el resumen lateral)
(() => {
  const page = document.body.dataset.page;
  const t = Store.totals();
  if (!t.complete) { location.replace('armar.html'); return; }
  const arrow = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg>';
  const c = Store.cart(), ent = Store.get('entrega');

  if (page === 'pago' && !ent) { location.replace('entrega.html'); return; }

  const items = Object.entries(c.items).map(([id, q]) => {
    const d = FUEL.dishes.find(x => x.id === id);
    return `<div class="line-item"><img src="${d.img}" alt=""><div><span>${d.name}</span><span class="mono muted">${q} × ${Store.money(t.plan.price)}</span></div></div>`;
  }).join('');
  const cta = page === 'entrega' ? `Ir al pago ${arrow}` : `Pagar ${Store.money(t.total)} y confirmar ${arrow}`;
  document.getElementById('summary').innerHTML = `
    <div class="summary__block"><div class="row"><h2>Tu caja</h2><a href="armar.html" class="mono" style="color:var(--fuel-olive)">editar</a></div>
      <div class="progress"><span style="width:100%"></span></div><span class="mono muted">Caja de ${t.size} viandas · completa</span></div>
    ${page === 'pago' ? `<div class="summary__block" style="font-size:15px"><span>${ent.dia} · ${ent.franja}</span><span>${ent.calle} ${ent.altura}, ${ent.localidad}</span></div>` : `<div class="summary__block" style="max-height:300px; overflow:auto">${items}</div>`}
    <div class="summary__block summary__foot">
      <div class="row muted"><span>${t.n} viandas × ${Store.money(t.plan.price)}</span><span class="mono">${Store.money(t.subtotal)}</span></div>
      <div class="row" style="color:var(--fuel-olive)"><span>Envío en frío</span><span class="mono">${t.shipping ? Store.money(t.shipping) : 'bonificado'}</span></div>
      <div class="row row--total"><span>Total</span><strong>${Store.money(t.total)}</strong></div>
      <button type="button" class="btn btn--primary btn--lg" id="go">${cta}</button>
      <p class="mono muted" style="text-align:center; font-size:12px">${page === 'entrega' ? 'todavía no se cobra nada' : 'pago protegido · datos encriptados'}</p>
    </div>`;

  const form = document.getElementById('form');
  document.getElementById('go').addEventListener('click', () => form.requestSubmit());

  if (page === 'entrega') {
    const box = form.querySelector('.choices');
    box.innerHTML = FUEL.deliveryDays.map((d, i) => `<label class="choice"><input type="radio" name="dia" value="${d.label}"${i ? '' : ' checked'}><span><strong>${d.label}</strong><small>${d.note}</small></span><span class="tick"></span></label>`).join('');
    Forms.fill(form, ent || Store.get('user'));
    if (![...form.elements.dia].some(r => r.checked)) form.elements.dia[0].checked = true;
    Forms.bind(form, data => { Store.set('entrega', data); location.href = 'pago.html'; });
  }

  if (page === 'pago') {
    const cardBox = document.getElementById('card-fields'), wallet = document.getElementById('wallet-fields');
    const sync = () => { const isCard = form.elements.metodo.value === 'tarjeta';
      cardBox.hidden = !isCard; wallet.hidden = isCard;
      cardBox.querySelectorAll('[data-rules]').forEach(i => { if (isCard) { i.dataset.rules = i.dataset.r || i.dataset.rules; } else { i.dataset.r = i.dataset.rules; i.dataset.rules = ''; } }); };
    form.querySelectorAll('[name="metodo"]').forEach(r => r.addEventListener('change', sync));
    const num = form.elements.numero, exp = form.elements.vence;
    num.addEventListener('input', () => { num.value = num.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); });
    exp.addEventListener('input', () => { const d = exp.value.replace(/\D/g, '').slice(0, 4); exp.value = d.length > 2 ? d.slice(0, 2) + ' / ' + d.slice(2) : d; });
    Forms.bind(form, () => {
      const btn = document.getElementById('go'); btn.disabled = true; btn.textContent = 'Procesando…';
      setTimeout(() => {
        const order = { id: 40000 + Math.floor(Math.random() * 9000), date: new Date().toISOString(), entrega: ent, items: c.items, size: c.size, n: t.n, total: t.total, status: 'preparing' };
        Store.set('lastOrder', order);
        Store.set('orders', [order, ...(Store.get('orders') || [])]);
        Store.set('subscription', { status: 'active', size: c.size, items: c.items, dia: ent.dia, franja: ent.franja });
        if (!Store.get('user')) Store.set('user', { nombre: ent.nombre, apellido: ent.apellido, email: ent.email });
        Store.saveCart({ size: c.size, items: {} });
        location.href = 'confirmacion.html';
      }, 900);
    });
  }
})();
