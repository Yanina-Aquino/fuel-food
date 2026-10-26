// füel. · datos del menú y planes. Para cambiar platos o precios, se edita solo este archivo.
window.FUEL = {
  dishes: [
    { id: 'curry', name: 'Curry de garbanzos y calabaza', desc: 'Arroz yamaní, leche de coco, espinaca.', img: 'img/curry.jpg', tags: ['sin-tacc', 'plant-based'], kcal: 480, p: 22, c: 54, g: 14,
      ingredientes: 'Garbanzo, calabaza, arroz yamaní, leche de coco, espinaca, cebolla, ajo, jengibre, curry, aceite de oliva, sal marina.', alergenos: '' },
    { id: 'wok', name: 'Wok de tofu, brócoli y sésamo', desc: 'Fideos de konjac, jengibre, lima.', img: 'img/wok.jpg', tags: ['bajo-carbos', 'alto-proteina', 'plant-based'], kcal: 420, p: 32, c: 18, g: 16,
      ingredientes: 'Tofu, brócoli, fideos de konjac, sésamo, jengibre, lima, salsa de soja, ajo.', alergenos: 'Contiene soja y sésamo.' },
    { id: 'bowl', name: 'Bowl de quinoa, palta y remolacha', desc: 'Hummus de zanahoria, semillas, lima.', img: 'img/bowl.jpg', tags: ['sin-tacc', 'plant-based'], kcal: 510, p: 19, c: 48, g: 22, top: true,
      ingredientes: 'Quinoa, palta, remolacha asada, zanahoria, garbanzo, semillas de girasol y calabaza, lima.', alergenos: '' },
    { id: 'zapallitos', name: 'Zapallitos rellenos de lentejas', desc: 'Puré rústico de coliflor y perejil.', img: 'img/zapallitos.jpg', tags: ['bajo-carbos', 'sin-tacc', 'plant-based'], kcal: 390, p: 24, c: 26, g: 13,
      ingredientes: 'Zapallito, lenteja, coliflor, tomate, cebolla, perejil, aceite de oliva.', alergenos: '' },
    { id: 'tarta', name: 'Tarta de puerro y ricota de almendras', desc: 'Masa de mijo, ensalada de estación.', img: 'img/tarta.jpg', tags: ['sin-tacc', 'plant-based'], kcal: 460, p: 20, c: 38, g: 21,
      ingredientes: 'Harina de mijo, puerro, ricota de almendras, cebolla, nuez moscada, hojas verdes.', alergenos: 'Contiene frutos secos.' },
    { id: 'chili', name: 'Chili de porotos negros', desc: 'Polenta cremosa, palta, cilantro.', img: 'img/chili.jpg', tags: ['plant-based', 'alto-proteina'], kcal: 530, p: 26, c: 58, g: 15, nuevo: true,
      ingredientes: 'Poroto negro, tomate, morrón, cebolla, polenta, palta, cilantro, comino, pimentón.', alergenos: '' },
    { id: 'noquis', name: 'Ñoquis de calabaza y salvia', desc: 'Salsa de tomate lento, nuez tostada.', img: 'img/noquis.jpg', tags: ['sin-tacc', 'alto-proteina', 'plant-based'], kcal: 470, p: 28, c: 52, g: 12,
      ingredientes: 'Calabaza, fécula de mandioca, harina de garbanzo, tomate, salvia, nuez.', alergenos: 'Contiene frutos secos.' },
    { id: 'ensalada', name: 'Ensalada tibia de lentejas', desc: 'Zanahoria asada, rúcula, vinagreta de mostaza.', img: 'img/ensalada.jpg', tags: ['bajo-carbos', 'sin-tacc', 'plant-based'], kcal: 380, p: 21, c: 34, g: 11,
      ingredientes: 'Lenteja, zanahoria, rúcula, mostaza, vinagre de manzana, aceite de oliva.', alergenos: 'Contiene mostaza.' }
  ],
  tagLabels: { 'sin-tacc': 'Sin TACC', 'plant-based': 'Plant-based', 'bajo-carbos': 'Bajo en carbos', 'alto-proteina': 'Alto en proteína' },
  plans: {
    6:  { name: 'Plan Medio', price: 4600, shipping: 2400 },
    12: { name: 'Plan Completo', price: 4200, shipping: 0 },
    18: { name: 'Plan Parejas', price: 3900, shipping: 0 }
  },
  deliveryDays: (() => {
    // próximo martes y viernes con al menos 48 h de anticipación
    const out = [], d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 2);
    const fmt = x => x.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^./, c => c.toUpperCase());
    while (out.length < 2) { if (d.getDay() === 2 || d.getDay() === 5) out.push({ label: fmt(d), note: d.getDay() === 2 ? '7 franjas disponibles' : '4 franjas disponibles' }); d.setDate(d.getDate() + 1); }
    return out;
  })(),
  zones: [
    // cp: rangos de código postal que cubre cada zona. Editalos con los reales.
    { name: 'CABA', areas: 'Todos los barrios', days: 'Martes y viernes', cp: [[1000, 1499]] },
    { name: 'GBA Norte', areas: 'Vicente López, San Isidro, San Fernando, Tigre', days: 'Martes y viernes', cp: [[1600, 1649]] },
    { name: 'GBA Oeste', areas: 'Morón, Haedo, Ramos Mejía, Castelar, Ituzaingó', days: 'Martes', cp: [[1700, 1714]] },
    { name: 'GBA Sur', areas: 'Avellaneda, Lanús, Lomas de Zamora, Quilmes', days: 'Viernes', cp: [[1824, 1834], [1870, 1879]] }
  ],
  slots: ['9:00 a 13:00', '13:00 a 17:00', '17:00 a 21:00']
};
