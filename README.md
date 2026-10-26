# füel. — web

Sitio estático en HTML, CSS y JavaScript, sin dependencias. No hay que instalar nada: se publica tal cual en Netlify, Netlify o GitHub Pages.

**La guía completa (estado, pruebas, accesibilidad, cómo publicar y qué falta) está en [`GUIA-DEL-PROYECTO.md`](GUIA-DEL-PROYECTO.md).**

## Páginas
| Archivo | Qué es | Estado |
|---|---|---|
| `index.html` | Home | ✅ completo |
| `menu.html` | Menú con filtros y detalle de cada plato | ✅ completo |
| `planes.html` | Planes y precios | ✅ completo |
| `faq.html` | Preguntas frecuentes | ✅ completo |
| `armar.html` | Armador de caja (paso 1) | ✅ funciona |
| `entrega.html` | Datos de entrega (paso 2) | ✅ valida los datos |
| `pago.html` | Pago (paso 3) | ⚠️ valida la tarjeta, **no cobra** |
| `confirmacion.html` | Pedido confirmado | ✅ funciona |
| `login.html` / `registro.html` | Cuentas | ⚠️ funcionan **solo en ese navegador** |
| `panel.html` | Suscripción, pedidos, datos | ⚠️ funciona **solo en ese navegador** |
| `404.html` | Página no encontrada | ✅ |

## Cómo se cambia cada cosa
- **Platos, precios, días de entrega:** `js/data.js`. Es el único archivo que hay que tocar.
- **Colores y tipografías:** `css/tokens.css`.
- **Header y footer:** `js/layout.js` (se actualizan en todas las páginas a la vez).
- **Textos de cada página:** directamente en su `.html`.

## Qué falta para vender de verdad
Hoy la caja, el pedido y las cuentas se guardan en el navegador de cada persona (`js/store.js`). Es suficiente para mostrar y probar, pero no para vender. Hacen falta tres piezas:

1. **Cobros — Mercado Pago.** Checkout Pro para el primer pago y *Suscripciones* para el cobro semanal. Reemplaza la función de envío del formulario en `js/checkout.js`.
2. **Cuentas y pedidos — Supabase** (gratis para empezar). Login real con email, y una base con tablas `perfiles`, `suscripciones` y `pedidos`. Reemplaza `js/store.js`.
3. **Mails — Resend o el propio Supabase.** Confirmación de pedido y aviso de entrega.

Las tres necesitan claves secretas que **no** pueden ir en este repositorio público. Se configuran como variables de entorno en Netlify y se usan desde *Netlify Functions*.

Este trabajo conviene hacerlo con **Claude Code** sobre este mismo repo: el diseño, los datos y los nombres de cada pieza ya están listos para conectarse.
