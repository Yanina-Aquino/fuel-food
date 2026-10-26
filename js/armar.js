// füel. · armador de caja
(() => {
  const FILTERS = [['todos', 'Todos'], ['plant-based', 'Plant-based'], ['sin-tacc', 'Sin TACC'], ['bajo-carbos', 'Bajo en carbos']];
  let active = 'todos';
  const fEl = document.getElementById('filters'), grid = document.getElementById('grid'), sum = document.getElementById('summary');
  const arrow = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg>';

  const qtyCtrl = (id, q, full) => q
    ? `<div class="qty" aria-label="Cantidad"><button type="button" data-rm="${id}" aria-label="Quitar uno">−</button><output>${q}</output><button type="button" data-add="${id}" aria-label="Agregar uno"${full ? ' disabled' : ''}>+</button></div>`
    : `<button type="button" class="btn btn--ink btn--sm" data-add="${id}"${full ? ' disabled' : ''}>Agregar +</button>`;

  const change = (id, delta) => {
    const c = Store.cart(), t = Store.totals(c);
    if (delta > 0 && t.n >= c.size) return;
    const q = (c.items[id] || 0) + delta;
    if (q > 0) c.items[id] = q; else delete c.items[id];
    Store.saveCart(c); render();
    if (window.Motion) {
      const d = FUEL.dishes.find(x => x.id === id), t2 = Store.totals();
      Motion.bump(document.querySelector('.badge-count'));
      document.querySelectorAll(`[data-id="${id}"] .qty output`).forEach(Motion.bump);
      if (delta > 0) Motion.toast(t2.complete ? 'Tu caja está completa' : `${d.name.split(',')[0]} · ${t2.n} de ${t2.size}`);
    }
  };

  const render = () => {
    const c = Store.cart(), t = Store.totals(c), full = t.n >= c.size;
    const cta = document.querySelector('.header-actions .btn--primary');
    if (cta) { let b = cta.querySelector('.badge-count'); if (t.n) { if (!b) { b = document.createElement('span'); b.className = 'badge-count'; cta.appendChild(b); } b.textContent = t.n; } else if (b) b.remove(); }
    fEl.innerHTML = FILTERS.map(([id, l]) => `<button type="button" class="chip" aria-pressed="${id === active}" data-f="${id}">${l}</button>`).join('');
    const list = FUEL.dishes.filter(d => active === 'todos' || d.tags.includes(active));
    grid.innerHTML = list.map(d => Dishes.card(d, qtyCtrl(d.id, c.items[d.id] || 0, full))).join('');

    const items = Object.entries(c.items).map(([id, q]) => {
      const d = FUEL.dishes.find(x => x.id === id);
      return `<div class="line-item"><img src="${d.img}" alt=""><div><span>${d.name}</span><span class="mono muted">${q} × ${Store.money(t.plan.price)}</span></div>${qtyCtrl(id, q, full)}</div>`;
    }).join('');
    const falta = c.size - t.n;
    sum.innerHTML = `
      <div class="summary__block">
        <div class="row"><h2>Tu caja</h2>
          <div class="size-picker" role="group" aria-label="Tamaño de la caja">${[6, 12, 18].map(n => `<button type="button" data-size="${n}" aria-pressed="${n === c.size}">${n}</button>`).join('')}</div></div>
        <div class="progress${t.complete ? ' is-complete' : ''}" role="progressbar" aria-valuemin="0" aria-valuemax="${c.size}" aria-valuenow="${t.n}"><span style="width:${Math.min(100, t.n / c.size * 100)}%"></span></div>
        <div class="row mono muted"><span>Caja de ${c.size} viandas · ${t.n} elegidas</span><span style="color:var(--fuel-olive)">${falta > 0 ? 'faltan ' + falta : 'completa'}</span></div>
      </div>
      <div class="summary__block" style="max-height:360px; overflow:auto">${items || '<p class="muted" style="text-align:center; padding:24px 0"><strong style="display:block; color:var(--fuel-ink); margin-bottom:6px">Tu caja está vacía</strong>Elegí tus platos favoritos del menú para empezar.</p>'}</div>
      <div class="summary__block summary__foot">
        <div class="row muted"><span>${t.n} viandas × ${Store.money(t.plan.price)}</span><span class="mono">${Store.money(t.subtotal)}</span></div>
        <div class="row" style="color:var(--fuel-olive)"><span>Envío en frío</span><span class="mono">${t.shipping ? Store.money(t.shipping) : 'sin cargo'}</span></div>
        <div class="row row--total"><span>Subtotal</span><strong>${Store.money(t.total)}</strong></div>
        <a href="entrega.html" class="btn btn--primary btn--lg"${t.complete ? '' : ' aria-disabled="true" tabindex="-1"'}>Continuar a entrega ${arrow}</a>
        <p class="mono muted" style="text-align:center; font-size:12px">${t.complete ? 'tu caja está lista' : `Elegí ${falta} viandas más para continuar`}</p>
      </div>`;
  };

  document.addEventListener('click', e => {
    const a = e.target.closest('[data-add]'), r = e.target.closest('[data-rm]'), f = e.target.closest('[data-f]'), s = e.target.closest('[data-size]'), d = e.target.closest('[data-detail]');
    if (a) change(a.dataset.add, 1);
    else if (r) change(r.dataset.rm, -1);
    else if (f) { active = f.dataset.f; render(); }
    else if (s) {
      const c = Store.cart(); c.size = +s.dataset.size;
      let over = Store.count(c) - c.size;
      for (const id of Object.keys(c.items).reverse()) { while (over > 0 && c.items[id] > 0) { c.items[id]--; over--; } if (!c.items[id]) delete c.items[id]; }
      Store.saveCart(c); render();
    }
    else if (d) Dishes.open(d.dataset.detail, dish => `<button type="button" class="btn btn--primary" style="width:100%" data-add="${dish.id}" data-close>Agregar a la caja · ${Store.money(Store.totals().plan.price)}</button>`);
    if (e.target.closest('[data-close]')) Dishes.close();
  });

  const qs = new URLSearchParams(location.search);
  if (qs.get('plan') && FUEL.plans[qs.get('plan')]) { const c = Store.cart(); c.size = +qs.get('plan'); Store.saveCart(c); }
  render();
  if (window.Motion) Motion.reveal();
})();
