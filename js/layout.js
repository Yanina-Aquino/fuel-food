// füel. · header y footer compartidos. Se cambian acá y se actualizan en todas las páginas.
(() => {
  const LOGO = (fill, dots) => `<svg viewBox="0 0 196 112" role="img" aria-label="füel."><text x="8" y="100" font-family="Outfit, sans-serif" font-size="100" font-weight="600" letter-spacing="-4" fill="${fill}">fuel</text><circle cx="63.4" cy="37" r="6" fill="${dots}"/><circle cx="81.4" cy="37" r="6" fill="${dots}"/><circle cx="178" cy="90" r="10" fill="${dots}"/></svg>`;
  const page = document.body.dataset.page || '';
  const L = (window.FUEL && FUEL.legal) || {};
  const user = Store.get('user');
  const n = Store.count();

  const STEPS = ['Elegir platos', 'Entrega', 'Pago'];
  const step = +document.body.dataset.step || 0;
  const check = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A5B17" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  const stepper = step ? `<div class="stepper container" aria-label="Paso ${step} de 3">${STEPS.map((s, i) => {
    const k = i + 1, st = k < step ? 'done' : k === step ? 'on' : '';
    return `<span class="stepper__item ${st}"><span class="stepper__dot">${st === 'done' ? check : k}</span><span class="stepper__label">${s}</span></span>`;
  }).join('<span class="stepper__line"></span>')}</div>` : '';

  const link = (href, label, key) => `<a href="${href}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`;
  const header = `
  <header class="site-header">
    <div class="container site-header__row">
      <a href="index.html" class="logo" aria-label="füel. inicio">${LOGO('#9EBC42', '#4A5B17')}</a>
      <nav class="nav" aria-label="Principal">${link('menu.html', 'Menú', 'menu')}${link('planes.html', 'Planes', 'planes')}${link('faq.html', 'FAQ', 'faq')}</nav>
      <div class="header-actions">
        ${user ? `<a href="panel.html" class="avatar" aria-label="Mi panel">${(user.nombre[0] + (user.apellido || ' ')[0]).toUpperCase()}</a>`
               : `<a href="login.html" class="link-login">Ingresar</a>`}
        <a href="armar.html" class="btn btn--primary">Armá tu caja${n ? `<span class="badge-count">${n}</span>` : ''}</a>
        <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22251A" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      </div>
    </div>
    ${stepper}
  </header>`;

  const footer = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">${LOGO('#FBF9F6', '#9EBC42').replace('<svg ', '<svg width="104" ')}<p style="color:#D9D4C8">Comida real para tu semana.</p></div>
        <div class="footer-col"><h4>Explorar</h4><a href="menu.html">Menú completo</a><a href="planes.html">Planes</a><a href="origen.html">Nuestro origen</a><a href="empresas.html">Para empresas</a></div>
        <div class="footer-col"><h4>Ayuda</h4><a href="faq.html">Preguntas frecuentes</a><a href="zonas.html">Zonas de entrega</a><a href="contacto.html">Contacto</a></div>
        <div class="footer-col"><h4>Newsletter</h4><p style="color:#D9D4C8; font-size:15px">El menú de cada semana, antes que nadie.</p>
          <form class="newsletter" data-newsletter><label for="nl" class="sr-only">Email</label><input id="nl" type="email" placeholder="tu@mail.com" required><button class="btn btn--primary" type="submit">Suscribirme</button></form>
          <p class="newsletter-ok" hidden>Listo, te escribimos el próximo lunes.</p></div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 füel.${L.razonSocial ? ' · ' + L.razonSocial : ''}${L.cuit ? ' · CUIT ' + L.cuit : ''}</span>
        <nav aria-label="Legales"><a href="terminos.html">Términos y condiciones</a><a href="privacidad.html">Privacidad</a><a href="arrepentimiento.html" style="color:var(--fuel-matcha); font-weight:600">Botón de arrepentimiento</a>${L.dataFiscalUrl ? '<a href="' + L.dataFiscalUrl + '" target="_blank" rel="noopener">Data fiscal</a>' : ''}</nav>
      </div>
    </div>
  </footer>`;

  const h = document.getElementById('site-header'); if (h) h.outerHTML = '<a href="#main" class="skip-link">Saltar al contenido</a>' + header;
  const f = document.getElementById('site-footer'); if (f) f.outerHTML = footer;
  const main = document.querySelector('main'); if (main && !main.id) main.id = 'main';
  if (main) main.setAttribute('tabindex', '-1');

  document.querySelectorAll('.menu-toggle').forEach(btn => {
    const header = btn.closest('.site-header');
    const close = () => { header.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', () => btn.setAttribute('aria-expanded', header.classList.toggle('is-open')));
    header.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && header.classList.contains('is-open')) { close(); btn.focus(); } });
  });
  document.querySelectorAll('[data-newsletter]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault(); form.hidden = true; const ok = form.nextElementSibling; ok.hidden = false; ok.setAttribute('role', 'status');
  }));
  document.querySelectorAll('.faq details').forEach(d => d.addEventListener('toggle', () => {
    if (d.open) document.querySelectorAll('.faq details').forEach(o => { if (o !== d) o.open = false; });
  }));
})();
