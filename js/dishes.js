// füel. · tarjeta de plato y modal de detalle (usados en Menú y Armá tu caja)
window.Dishes = (() => {
  const T = FUEL.tagLabels;
  const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></svg>';
  const tags = d => [...d.tags.slice(0, 2).map(t => T[t]), d.top ? 'Más pedido' : null, d.nuevo ? 'Nuevo' : null].filter(Boolean).slice(0, 2).map(t => `<span class="tag">${t}</span>`).join('');

  const card = (d, foot) => `
    <article class="dish" data-id="${d.id}">
      <img src="${d.img}" alt="${d.name}" loading="lazy" width="720" height="540">
      <div class="dish__tags">${tags(d)}</div>
      <div><h3>${d.name}</h3><p class="muted">${d.desc}</p></div>
      <div class="macros"><span>${d.kcal} kcal</span><span>P ${d.p} g</span><span>C ${d.c} g</span><span>G ${d.g} g</span></div>
      <div class="dish__foot">${foot || ''}<button type="button" class="link-arrow" data-detail="${d.id}">Ver detalles ${arrow}</button></div>
    </article>`;

  let modal;
  const open = (id, actionHtml) => {
    const d = FUEL.dishes.find(x => x.id === id); if (!d) return;
    if (!modal) { modal = document.createElement('dialog'); modal.className = 'modal'; document.body.appendChild(modal);
      modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.modal__close')) modal.close(); }); }
    modal.innerHTML = `
      <button class="modal__close" aria-label="Cerrar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22251A" stroke-width="1.9" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg></button>
      <div class="modal__grid">
        <img class="modal__img" src="${d.img}" alt="${d.name}">
        <div class="modal__body">
          <div style="display:flex; flex-direction:column; gap:12px; padding-right:40px">
            <h2 style="font-size:28px; line-height:1.12; letter-spacing:-.025em">${d.name}</h2>
            <div class="dish__tags">${d.tags.map(t => `<span class="tag">${T[t]}</span>`).join('')}</div>
          </div>
          <p class="muted">${d.desc} Se calienta en 3 minutos.</p>
          <div style="display:flex; flex-direction:column; gap:10px"><span class="overline">Información nutricional</span>
            <div class="macro-grid"><div><strong>${d.kcal}</strong><span>kcal</span></div><div><strong>${d.p} g</strong><span>proteína</span></div><div><strong>${d.c} g</strong><span>carbos</span></div><div><strong>${d.g} g</strong><span>grasas</span></div></div></div>
          <div style="display:flex; flex-direction:column; gap:8px"><span class="overline">Ingredientes</span><p class="muted" style="font-size:14px">${d.ingredientes}</p>
            ${d.alergenos ? `<p class="warn">Alérgenos: ${d.alergenos}</p>` : ''}</div>
          ${actionHtml ? `<div style="margin-top:auto; padding-top:20px; border-top:1px solid var(--fuel-border)">${actionHtml(d)}</div>` : ''}
        </div>
      </div>`;
    modal.showModal();
  };

  return { card, open, close: () => modal && modal.close() };
})();
