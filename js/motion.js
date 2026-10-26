// füel. · animaciones al hacer scroll, aviso flotante y detalles de interacción
window.Motion = (() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // aparición escalonada de bloques al entrar en pantalla.
  // El contenido nunca queda oculto: solo se esconde si el navegador confirma que puede animarlo,
  // y hay un respaldo por posición y un tope de tiempo que muestra todo.
  const root = document.documentElement;
  const SEL = '.section-head, .dish, .step, .quote, .plan, .card, .banner__box, .faq details, .trust__item, .order, .page-head';
  const show = el => el.classList.add('is-in');
  const inView = el => el.getBoundingClientRect().top < innerHeight * 0.92;
  const io = !reduce && 'IntersectionObserver' in window
    ? new IntersectionObserver(es => { root.classList.add('motion-ready'); es.forEach(e => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' })
    : null;
  const sweep = () => document.querySelectorAll('.reveal:not(.is-in)').forEach(el => { if (inView(el)) show(el); });
  let ticking = false;
  const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { sweep(); ticking = false; }); };
  if (!reduce) { addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); }
  const failsafe = () => setTimeout(() => document.querySelectorAll('.reveal').forEach(show), 1500);

  const reveal = (scope = document) => {
    if (reduce) return;
    scope.querySelectorAll(SEL).forEach(el => {
      if (el.classList.contains('reveal') || el.closest('.hero, .summary, .modal')) return;
      const sibs = [...el.parentElement.children].filter(c => c.classList.contains(el.classList[0] || '_') || c.tagName === el.tagName);
      el.style.setProperty('--d', Math.min(Math.max(sibs.indexOf(el), 0), 5) * 70 + 'ms');
      el.classList.add('reveal');
      if (inView(el)) show(el);
      if (io) io.observe(el);
    });
    failsafe();
  };

  // sombra del header al bajar
  const header = () => document.querySelector('.site-header');
  addEventListener('scroll', () => { const h = header(); if (h) h.classList.toggle('is-scrolled', scrollY > 8); }, { passive: true });

  // aviso flotante
  let toastEl, timer;
  const toast = msg => {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite'); document.body.appendChild(toastEl); }
    toastEl.innerHTML = `<span class="toast__dot"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FBF9F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span>${msg}`;
    toastEl.classList.add('is-on'); clearTimeout(timer); timer = setTimeout(() => toastEl.classList.remove('is-on'), 2200);
  };

  const bump = el => { if (!el || reduce) return; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); };

  document.addEventListener('DOMContentLoaded', () => reveal());
  if (document.readyState !== 'loading') reveal();
  return { reveal, toast, bump };
})();
