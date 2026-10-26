// füel. · estado guardado en el navegador (carrito, entrega, pedido, sesión).
// IMPORTANTE: es una versión de demostración. Para vender de verdad, esto se reemplaza por un backend (ver README).
window.Store = (() => {
  const KEY = 'fuel.v1';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const write = s => localStorage.setItem(KEY, JSON.stringify(s));
  const get = k => read()[k];
  const set = (k, v) => { const s = read(); s[k] = v; write(s); };
  const money = n => '$' + Math.round(n).toLocaleString('es-AR');

  const cart = () => get('cart') || { size: 12, items: {} };
  const saveCart = c => set('cart', c);
  const count = c => Object.values((c || cart()).items).reduce((a, b) => a + b, 0);
  const totals = (c = cart()) => {
    const plan = FUEL.plans[c.size];
    const n = count(c);
    const subtotal = n * plan.price;
    return { n, size: c.size, plan, subtotal, shipping: plan.shipping, total: subtotal + plan.shipping, complete: n === c.size };
  };

  return { get, set, money, cart, saveCart, count, totals, clear: k => set(k, undefined) };
})();
