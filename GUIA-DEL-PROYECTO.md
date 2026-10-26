# füel. — guía completa del proyecto

Este documento resume el estado de la web, lo que se revisó, cómo se publica y qué falta para vender. Está pensado para leerlo de arriba hacia abajo.

---

## 1. Estado actual

| Área | Estado |
|---|---|
| Diseño y contenido de las 12 páginas | ✅ Listo |
| Celular, tablet y computadora | ✅ Listo |
| Animaciones e interacciones | ✅ Listo |
| Accesibilidad (WCAG 2.1 AA) | ✅ Revisado |
| Peso de imágenes | ✅ Optimizado: de ~25 MB a ~1,3 MB |
| Armado de caja, entrega y confirmación | ✅ Funciona |
| Cobro con tarjeta o Mercado Pago | ❌ Falta conectar |
| Cuentas y pedidos guardados en un servidor | ❌ Falta conectar |
| Mails de confirmación | ❌ Falta conectar |

Hoy la caja, las cuentas y los pedidos se guardan **en el navegador de cada persona**. Sirve para mostrar y probar el recorrido completo, pero no para vender: si alguien cambia de celular, no ve su cuenta, y vos no te enterás de los pedidos. La sección 6 explica cómo resolverlo.

---

## 2. Páginas

| Archivo | Qué hace |
|---|---|
| `index.html` | Home: hero, beneficios, platos destacados, cómo funciona, testimonios, planes, preguntas |
| `menu.html` | Los 8 platos con filtros y ficha de cada uno (ingredientes, macros, alérgenos) |
| `planes.html` | Los 3 planes. Cada botón abre el armador con el tamaño de caja ya elegido |
| `faq.html` | Preguntas frecuentes por tema |
| `armar.html` | Paso 1. Elegís platos, cambiás el tamaño, ves el total en vivo |
| `entrega.html` | Paso 2. Datos, dirección, día y franja, con validación de cada campo |
| `pago.html` | Paso 3. Tarjeta o billetera, con validación de número, vencimiento y CVC |
| `confirmacion.html` | Pedido confirmado, con número de orden y resumen |
| `login.html` · `registro.html` | Ingreso y creación de cuenta |
| `panel.html` | Suscripción (pausar, cancelar, reactivar), historial y datos personales |
| `origen.html` | Nuestro origen: cómo cocinamos |
| `zonas.html` | Buscador por código postal y zonas con sus días |
| `empresas.html` | Pedidos para empresas, con formulario de propuesta |
| `contacto.html` | Formulario de contacto |
| `recuperar.html` | Pedido de recuperación de contraseña |
| `404.html` | Página que aparece si alguien entra a una dirección que no existe |

---

## 3. Recorridos probados

Cada uno se probó de punta a punta y sin errores en la consola.

**Compra completa**
1. Armá tu caja → agregar 12 platos → el botón se habilita recién con la caja completa.
2. Entrega → con campos vacíos, cada campo muestra su mensaje de error. Con los datos completos, pasa al pago.
3. Pago → rechaza una tarjeta con un número inválido, una tarjeta vencida y un CVC de 2 dígitos. Con datos válidos, confirma.
4. Confirmación → muestra número de orden, total, día, dirección y caja.
5. Panel → muestra la suscripción activa y el pedido en el historial.

**Gestión de la suscripción**
- Pausar una semana → el estado cambia a "Pausada esta semana".
- Cancelar → antes pregunta si querés cancelar y ofrece pausar → estado "Cancelada".
- Reactivar → vuelve a "Suscripción activa".

**Protecciones del recorrido**
- Entrar a `entrega.html` con la caja incompleta lleva de vuelta al armador.
- Entrar a `pago.html` sin cargar la entrega lleva de vuelta a la entrega.
- Entrar a `panel.html` sin una sesión iniciada lleva al login.
- Si la sesión ya está iniciada, login y registro llevan directo al panel.
- Achicar la caja (de 18 a 12, por ejemplo) quita platos de más automáticamente.
- No se puede agregar un plato más si la caja ya está completa.

---

## 4. Accesibilidad

| Criterio | Cómo se resolvió |
|---|---|
| Contraste de texto 4,5:1 | Medido en todos los textos. El botón principal pasó a texto tinta sobre matcha (antes, crema sobre matcha daba 2:1) |
| Áreas táctiles de 44 px como mínimo | Todos los botones, enlaces del menú y controles de cantidad |
| Navegación con teclado | Todo se puede usar con Tab y Enter. El foco se ve con un borde oliva |
| "Saltar al contenido" | Primer enlace de cada página, visible al apretar Tab |
| Lectores de pantalla | Cada campo tiene su etiqueta. Los errores se asocian al campo y se anuncian. Barra de progreso y estados con su descripción |
| Menú mobile | Se cierra con Escape o al tocar un enlace |
| Ventanas emergentes | Se cierran con Escape o tocando afuera |
| Movimiento reducido | Si la persona tiene activada "reducir movimiento" en su sistema, las animaciones se apagan |
| Idioma | Todas las páginas declaradas en español de Argentina |

---

## 5. Publicar en Netlify

**Una sola vez**
1. Subí el contenido de esta carpeta al repo `fuel-food` con GitHub Desktop: *Commit to main* y después *Push origin*.
2. En Netlify: *Add new project → Import an existing project → GitHub* y elegí `fuel-food`.
3. Dejá todos los campos vacíos (*Build command* y *Publish directory*) y tocá **Deploy**.
4. En un minuto tenés la web en una dirección del tipo `fuel-food.netlify.app`. En *Project configuration → Change project name* la podés cambiar por `fuel` u otra libre.
5. Opcional: *Domain management → Add a domain* para usar `fuel.com.ar`.

**Formularios (Contacto, Empresas y Recuperar contraseña)**
Usan **Netlify Forms**, sin servidor propio y sin costo por envío.
1. Después del primer deploy, entrá a *Forms* y tocá **Enable form detection**.
2. Volvé a publicar: *Deploys → Trigger deploy → Deploy project*.
3. En *Forms* van a aparecer `contacto`, `empresas` y `recuperar`. En *Form notifications* agregá tu mail para recibir cada mensaje.

**Cada vez que cambies algo**
1. Reemplazás los archivos en la carpeta `fuel-food`.
2. En GitHub Desktop: *Commit* y *Push*.
3. Netlify publica el cambio solo, en uno o dos minutos.

**Plan gratuito: qué incluye**
- 300 créditos por mes. Cada publicación exitosa usa 15 y cada GB de tráfico usa 20.
- Los formularios, las vistas previas y las publicaciones fallidas no gastan créditos.
- Si se terminan los créditos, la web se pausa hasta el mes siguiente. Se ve en *Usage & billing*.
- Para no gastar de más: juntá varios cambios en un solo Push en vez de subir de a uno.

**Qué archivo tocar para cada cosa**
- Platos, precios, días de entrega y zonas por código postal → `js/data.js`
- Colores y tipografías → `css/tokens.css`
- Header y footer (cambian en todas las páginas a la vez) → `js/layout.js`
- Animaciones → `css/motion.css`
- Textos → el `.html` de cada página

---

## 6. Lo que falta para vender

Son tres piezas, y se arman con **Claude Code** sobre este mismo repo.

| Pieza | Servicio sugerido | Qué reemplaza |
|---|---|---|
| Cobros únicos y semanales | Mercado Pago (Checkout Pro + Suscripciones) | El envío del formulario en `js/checkout.js` |
| Cuentas y pedidos | Supabase (plan gratuito) | `js/store.js` |
| Mails de confirmación | Resend o los mails de Supabase | — (nuevo) |

Las claves de estos servicios son secretas: **nunca van en el repo**. Se cargan en Netlify, en *Project configuration → Environment variables*, y se usan desde *Netlify Functions*.

**Texto para pegarle a Claude Code al empezar:**

> Este repo es la web de füel., un e-commerce de viandas por suscripción. Es HTML, CSS y JS sin framework, publicado en Netlify. Hoy el estado vive en `js/store.js` (localStorage). Necesito: 1) Supabase para registro, login y las tablas perfiles, suscripciones y pedidos; 2) Mercado Pago Checkout Pro para el primer pago y Suscripciones para el cobro semanal, con webhook en una Netlify Function que marque el pedido como pagado; 3) mail de confirmación con Resend. Mantené el diseño, los textos y la estructura de archivos actuales. Las claves van como variables de entorno de Netlify. Los formularios de contacto ya usan Netlify Forms (js/send.js) y pueden quedar así. Leé `GUIA-DEL-PROYECTO.md` y `js/checkout.js` antes de empezar.

---

## 7. Antes de lanzar: lo que no es código

Revisalo con una contadora o una abogada. No es asesoramiento legal.

- [ ] **Botón de arrepentimiento**: en Argentina, la Resolución 424/2020 exige un acceso visible para revocar la compra. Va en el footer.
- [ ] **Términos y condiciones y política de privacidad**: hoy no existen. Hay que redactarlas y sumar las páginas.
- [ ] **Datos fiscales**: CUIT, razón social y el QR de Data Fiscal de ARCA en el footer.
- [ ] **Habilitaciones de alimentos**: registro del establecimiento y de los productos (RNE / RNPA) ante la autoridad bromatológica que corresponda.
- [ ] **Rotulado**: los alérgenos y la información nutricional de la web tienen que coincidir con la etiqueta real de cada plato.
- [ ] **Precios con impuestos incluidos**: confirmá que los precios de `js/data.js` sean finales.
- [ ] **Mail de contacto**: `hola@fuel.com.ar` aparece en el footer, el FAQ y el login. Tiene que existir y recibir mensajes.
- [ ] **Dominio**: registrar `fuel.com.ar` en NIC Argentina si lo vas a usar.

---

## 8. Mejoras sugeridas para más adelante

- Medir visitas y conversión: Plausible o Google Analytics, con el aviso de cookies correspondiente.
- Que el menú y los precios se carguen desde Supabase, así los cambiás sin tocar código.
- Avisos por WhatsApp cuando el pedido sale.
- Validar el código postal contra la zona de cobertura real.
- Un panel interno para ver los pedidos del día.
