/* Rosmary Barrios Store · catálogo, ficha de producto y pedido por WhatsApp */
(function () {
  const WA = (window.RB_BUSINESS && window.RB_BUSINESS.whatsappIntl) || '584246688030';

  /* ==========================================================
     PRODUCTOS: para cambiar precios, textos o fotos, edita aquí.
     price: número en dólares (ej. 25) o null para "Precio por WhatsApp".
     cat: cejas | pestanas | micro
     warn: clave de ADVERTENCIAS (abajo) que se muestra en la ficha.
     ========================================================== */
  const PRODUCTS = [
    { id: 'dermografo', name: 'Dermógrafo RB', cat: 'micro', tag: 'Micropigmentación', img: 'dermografo', bg: 'light', fit: 'cover', price: null, warn: 'dermografo',
      lead: 'Máquina inalámbrica para micropigmentación, en aluminio aeronáutico: ligera, resistente y de diseño premium.',
      specs: ['Diseño ergonómico', 'Ajuste del stroke', 'Pantalla funcional digital', 'Batería extraíble e intercambiable, inalámbrica', 'Conector tipo C', 'Motor sin núcleo PP (Precision Pro)'],
      options: ['Negro', 'Silver', 'Coffee'] },
    { id: 'kit-cejas', name: 'Kit de pinzas para cejas', cat: 'cejas', tag: 'Cejas · Kit', img: 'kit-cejas', bg: 'light', fit: 'cover', price: null, warn: 'herramienta',
      lead: 'Las tres herramientas para diseño y depilación de cejas: pinza viselada, pinza puntiaguda y tijera.',
      specs: ['Acero inoxidable, hecho a mano', 'Color azul', 'Pinza viselada de 25°: 3.54" × 0.5"', 'Pinza puntiaguda: 3.54" × 0.17"', 'Tijera ergonómica: 4.72" × 0.78"'] },
    { id: 'viselada', name: 'Pinza viselada', cat: 'cejas', tag: 'Cejas', img: 'viselada', bg: 'dark', fit: 'contain', price: null, warn: 'herramienta',
      lead: 'Punta inclinada a 25° que se adapta a la forma de la ceja y facilita la depilación del vello grueso.',
      specs: ['Acero inoxidable, hecho a mano', '3.54" × 0.5"', 'Incluye estuche RB'] },
    { id: 'puntiaguda', name: 'Pinza puntiaguda', cat: 'cejas', tag: 'Cejas', img: 'puntiaguda', bg: 'dark', fit: 'contain', price: null, warn: 'herramienta',
      lead: 'Para vellos muy cortos o finos, vellos encarnados y astillas. Ideal en cejas, barbilla y otras zonas del rostro.',
      specs: ['Acero inoxidable, hecho a mano', '3.54" × 0.17"', 'Incluye estuche RB'] },
    { id: 'tijera', name: 'Tijera para cejas', cat: 'cejas', tag: 'Cejas', img: 'tijera', bg: 'dark', fit: 'contain', price: null, warn: 'herramienta',
      lead: 'Tijera de resorte para cortar y emparejar el vello facial, como el de las cejas, durante el diseño.',
      specs: ['Acero inoxidable, hecho a mano', 'Ergonómica: 4.72" × 0.78"', 'Incluye estuche RB'] },
    { id: 'kit-pestanas', name: 'Kit de pinzas para pestañas', cat: 'pestanas', tag: 'Pestañas · Kit', img: 'kit-pestanas', bg: 'light', fit: 'cover', price: null, warn: 'herramienta',
      lead: 'Pinza recta, curva y panzona: aislamiento, técnica clásica y volumen en un solo kit.',
      specs: ['Acero inoxidable, hecho a mano', 'Color azul · estilo moderno', 'Pinza recta: 3.54" × 0.39"', 'Pinza curva: 4.72" × 0.39"', 'Pinza panzona: 4.33" × 0.39"'] },
    { id: 'recta', name: 'Pinza recta', cat: 'pestanas', tag: 'Pestañas', img: 'recta', bg: 'dark', fit: 'contain', price: null, warn: 'herramienta',
      lead: 'Se utiliza para aislar (separar) las pestañas naturales antes de colocar la extensión.',
      specs: ['Acero inoxidable, hecho a mano', '3.54" × 0.39"', 'Incluye estuche RB'] },
    { id: 'curva', name: 'Pinza curva', cat: 'pestanas', tag: 'Pestañas', img: 'curva', bg: 'dark', fit: 'contain', price: null, warn: 'herramienta',
      lead: 'Ideal para aplicar extensiones de pestañas en técnica clásica.',
      specs: ['Acero inoxidable, hecho a mano', '4.72" × 0.39"', 'Incluye estuche RB'] },
    { id: 'panzona', name: 'Pinza panzona', cat: 'pestanas', tag: 'Pestañas', img: 'panzona', bg: 'dark', fit: 'contain', price: null, warn: 'herramienta',
      lead: 'Ideal para extensiones de pestañas en técnica de volumen y fibra tecnológica.',
      specs: ['Acero inoxidable, hecho a mano', '4.33" × 0.39"', 'Incluye estuche RB'] },
    { id: 'pega', name: 'Pega de pestañas', cat: 'pestanas', tag: 'Pestañas · Insumo', img: 'pega', bg: 'light', fit: 'cover', price: null, warn: 'pega',
      lead: 'Adhesivo negro de secado rápido para extensiones de pestañas, con retención de 5 a 6 semanas.',
      specs: ['Secado: 3–4 segundos', 'Retención: 5–6 semanas (según fabricante; varía según técnica y cuidado)', 'Color negro · 5 ml', 'Libre de látex y formaldehído (según fabricante)', 'Aprobado por ITQA (según fabricante)', 'Aplicar a 22–25 °C con humedad de 50–70 %'] },
    { id: 'hilo', name: 'Hilo tinturado', cat: 'cejas', tag: 'Cejas · Insumo', img: 'hilo', bg: 'light', fit: 'cover', price: null, warn: null,
      lead: 'Hilo para diseño y mapeo de cejas, en presentación cilíndrica tipo lápiz.',
      specs: ['Color blanco · acabado natural', 'Forma cilíndrica (lápiz)', 'Contenido: 30 metros'] },
    { id: 'henna', name: 'Henna para cejas', cat: 'cejas', tag: 'Cejas · Insumo', img: 'henna', bg: 'dark', fit: 'cover', price: null, warn: 'henna',
      lead: 'Henna de uso profesional para cejas, de la línea Rosmary Barrios.',
      specs: ['Uso profesional para cejas', 'Consulta tonos y presentación por WhatsApp'] }
  ];

  const ADVERTENCIAS = {
    herramienta: { short: 'Uso profesional. Desinfecta antes de cada uso.',
      items: ['Uso profesional o por personas capacitadas.', 'Limpia y desinfecta o esteriliza antes y después de cada uso.', 'No compartas la herramienta sin desinfectarla.', 'Mantén fuera del alcance de niños.'] },
    pega: { short: 'Contiene cianoacrilato. Solo uso profesional.',
      items: ['Contiene cianoacrilato. Uso exclusivo de profesionales capacitados.', 'No aplicar sobre la piel, el párpado ni el ojo.', 'Haz una prueba de sensibilidad antes del primer uso con cada clienta.', 'Trabaja en un área ventilada y mantén el envase bien cerrado.', 'En caso de contacto con los ojos, lava con abundante agua y busca atención médica.', 'Mantén fuera del alcance de niños.'] },
    henna: { short: 'Haz prueba de alergia 48 h antes de cada aplicación.',
      items: ['Haz una prueba de alergia en la piel 48 horas antes de cada aplicación, incluso si ya la usaste antes.', 'No uses sobre piel irritada, con heridas o con alguna afección.', 'Evita el contacto con los ojos; si ocurre, lava con abundante agua.', 'Suspende el uso si aparece picazón, ardor, enrojecimiento o inflamación, y consulta a un médico.', 'Mantén fuera del alcance de niños.'] },
    dermografo: { short: 'Solo para profesionales con formación en micropigmentación.',
      items: ['Uso exclusivo de profesionales formados en micropigmentación y normas de bioseguridad.', 'Usa agujas y cartuchos desechables, estériles y de un solo uso.', 'Desinfecta el equipo entre clientas y protégelo con barreras desechables.', 'Sigue las instrucciones del fabricante para carga y mantenimiento de la batería.'] }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const imgSrc = p => 'assets/img/' + p.img + '.webp';
  const fmt = n => '$' + (Number.isInteger(n) ? n : n.toFixed(2));
  const priceHTML = p => p.price == null ? '<span class="price">Precio por WhatsApp</span>'
    : `<span class="price"><b>${fmt(p.price)}</b><small>Ref. en Bs. a tasa BCV del día</small></span>`;
  const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));

  /* ---------- catálogo ---------- */
  const grid = $('#grid');
  grid.innerHTML = PRODUCTS.map((p, i) => `
<article class="card reveal" style="--d:${(i % 4) * .07}s" data-cat="${p.cat}" data-id="${p.id}">
  <button type="button" class="ph ph-${p.bg} shine" data-view="${p.id}" aria-label="Ver ficha de ${esc(p.name)}"><img src="${imgSrc(p)}" alt="${esc(p.name)}" loading="lazy" decoding="async" width="600" height="750" style="object-fit:${p.fit}"></button>
  <div class="cbody">
    <p class="eyebrow">${esc(p.tag)}</p>
    <h3>${esc(p.name)}</h3>
    <p class="lead">${esc(p.lead)}</p>
    ${p.options ? `<fieldset class="opts"><legend>Color</legend>${p.options.map((o, j) => `<label><input type="radio" name="opt-${p.id}" value="${esc(o)}"${j ? '' : ' checked'}><span>${esc(o)}</span></label>`).join('')}</fieldset>` : ''}
    <button type="button" class="link-btn" data-view="${p.id}">Ver ficha y cuidados</button>
    <div class="cfoot">${priceHTML(p)}<button type="button" class="btn btn-add" data-add="${p.id}">Agregar</button></div>
  </div>
</article>`).join('');
  $$('.card', grid).forEach(window.RB_reveal || (c => c.classList.add('in')));

  $$('.chip').forEach(ch => ch.addEventListener('click', () => {
    $$('.chip').forEach(c => c.setAttribute('aria-pressed', c === ch ? 'true' : 'false'));
    const f = ch.dataset.f;
    $$('.card', grid).forEach(c => {
      const show = f === 'all' || c.dataset.cat === f;
      if (show) { c.hidden = false; requestAnimationFrame(() => c.classList.remove('leaving')); c.classList.add('in'); }
      else { c.classList.add('leaving'); setTimeout(() => { if (c.classList.contains('leaving')) c.hidden = true; }, 300); }
    });
  }));

  /* ---------- pedido ---------- */
  const order = new Map();
  const STORE_KEY = 'rb-pedido';
  try { (JSON.parse(localStorage.getItem(STORE_KEY)) || []).forEach(([k, v]) => { if (byId[v.id]) order.set(k, v); }); } catch (e) {}
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify([...order])); } catch (e) {} };

  function optionOf(id) { const o = $(`input[name="opt-${id}"]:checked`); return o ? o.value : null; }
  function add(id, opt) {
    const p = byId[id]; const key = id + (opt ? ':' + opt : '');
    const cur = order.get(key) || { id, opt, qty: 0 }; cur.qty++; order.set(key, cur);
    render();
    const badge = $('#count'); badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
    const live = $('#cart-live'); if (live) live.textContent = p.name + ' agregado al pedido';
  }
  const label = v => byId[v.id].name + (v.opt ? ' (' + v.opt + ')' : '');

  function render() {
    const list = $('#items'); list.innerHTML = '';
    let n = 0, total = 0, allPriced = true;
    order.forEach((v, k) => {
      const p = byId[v.id]; n += v.qty;
      if (p.price == null) allPriced = false; else total += p.price * v.qty;
      const li = document.createElement('li');
      li.innerHTML = `<img src="${imgSrc(p)}" alt="" width="56" height="70" style="object-fit:${p.fit}"><span>${esc(label(v))}</span>`;
      const q = document.createElement('div'); q.className = 'qty';
      const minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Quitar uno de ' + label(v));
      const out = document.createElement('output'); out.textContent = v.qty;
      const plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Agregar uno de ' + label(v));
      minus.onclick = () => { v.qty--; if (v.qty <= 0) order.delete(k); render(); };
      plus.onclick = () => { v.qty++; render(); };
      q.append(minus, out, plus); li.append(q); list.append(li);
    });
    $('#count').textContent = n; $('#count').hidden = n === 0;
    $('#empty').hidden = n > 0;
    $('#order-form').hidden = n === 0;
    const st = $('#subtotal');
    st.hidden = !(n && allPriced);
    if (n && allPriced) $('#subtotal-v').textContent = fmt(total);
    save(); updateLink();
  }

  function updateLink() {
    const lines = ['Hola, quiero hacer este pedido en Rosmary Barrios Store:'];
    order.forEach(v => lines.push('• ' + v.qty + ' × ' + label(v)));
    const nm = $('#c-name').value.trim(), ct = $('#c-city').value.trim(), dl = $('#c-delivery').value;
    if (nm) lines.push('Nombre: ' + nm);
    if (ct) lines.push('Ciudad: ' + ct);
    if (dl) lines.push('Entrega: ' + dl);
    if ($('#c-news').checked) lines.push('Acepto recibir novedades por WhatsApp.');
    lines.push('Leí y acepto los Términos y la Política de privacidad.');
    lines.push('¿Me confirman precio, disponibilidad y forma de pago? Gracias.');
    $('#send').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n'));
    const ok = $('#c-terms').checked && order.size > 0;
    $('#send').setAttribute('aria-disabled', ok ? 'false' : 'true');
    $('#send').tabIndex = ok ? 0 : -1;
    $('#terms-hint').hidden = $('#c-terms').checked;
  }
  ['#c-name', '#c-city', '#c-delivery', '#c-terms', '#c-news'].forEach(s => { $(s).addEventListener('input', updateLink); $(s).addEventListener('change', updateLink); });
  $('#send').addEventListener('click', e => { if ($('#send').getAttribute('aria-disabled') === 'true') e.preventDefault(); });

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    const id = b.dataset.add; add(id, b.dataset.opt !== undefined ? (b.dataset.opt || null) : optionOf(id));
    if (b.classList.contains('btn-add')) {
      const t = b.textContent; b.textContent = '✓ Agregado'; b.classList.add('done');
      setTimeout(() => { b.textContent = t; b.classList.remove('done'); }, 1300);
    }
  });

  /* capas (pedido y ficha): abrir, cerrar y mantener el foco dentro */
  let lastFocus = null;
  function openLayer(el) {
    lastFocus = document.activeElement; el.hidden = false; document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('open')));
    const f = el.querySelector('.close'); if (f) f.focus();
  }
  function closeLayer(el) {
    el.classList.remove('open'); document.body.style.overflow = '';
    setTimeout(() => { el.hidden = true; }, 380);
    if (lastFocus) lastFocus.focus();
  }
  function trap(el, e) {
    if (e.key !== 'Tab') return;
    const f = $$('a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])', el).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
  const drawer = $('#drawer'), modal = $('#modal');
  [drawer, modal].forEach(el => {
    el.addEventListener('click', e => { if (e.target === el) closeLayer(el); });
    el.addEventListener('keydown', e => { if (e.key === 'Escape') closeLayer(el); else trap(el, e); });
    $('.close', el).addEventListener('click', () => closeLayer(el));
  });
  $$('[data-open-order]').forEach(b => b.addEventListener('click', () => openLayer(drawer)));

  /* ---------- ficha de producto ---------- */
  document.addEventListener('click', e => {
    const v = e.target.closest('[data-view]'); if (!v) return;
    const p = byId[v.dataset.view]; const w = p.warn && ADVERTENCIAS[p.warn];
    $('#modal-body').innerHTML = `
<div class="mimg ph-${p.bg}"><img src="${imgSrc(p)}" alt="${esc(p.name)}" style="object-fit:${p.fit}"></div>
<div class="mtext">
  <p class="eyebrow">${esc(p.tag)}</p>
  <h2 id="modal-title">${esc(p.name)}</h2>
  <p class="lead">${esc(p.lead)}</p>
  <h3>Ficha técnica</h3>
  <ul>${p.specs.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
  ${w ? `<div class="mwarn"><b>Advertencias de uso</b><ul>${w.items.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>` : ''}
  ${p.options ? `<fieldset class="opts"><legend>Color</legend>${p.options.map((o, j) => `<label><input type="radio" name="mopt" value="${esc(o)}"${(optionOf(p.id) || p.options[0]) === o ? ' checked' : ''}><span>${esc(o)}</span></label>`).join('')}</fieldset>` : ''}
  <div class="cfoot">${priceHTML(p)}<button type="button" class="btn btn-solid" id="modal-add">Agregar al pedido</button></div>
  <p class="note">Más información en <a href="legal/advertencias.html">Advertencias de uso</a> y <a href="legal/devoluciones.html">Garantía</a>.</p>
</div>`;
    $('#modal-add').onclick = () => {
      const o = $('input[name="mopt"]:checked', modal); add(p.id, o ? o.value : null);
      $('#modal-add').textContent = '✓ Agregado';
      setTimeout(() => { closeLayer(modal); openLayer(drawer); }, 500);
    };
    openLayer(modal);
  });

  /* ---------- video de portada ---------- */
  const vid = $('.hero-video'), tog = $('.hero-toggle');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (vid && tog) {
    const set = p => { tog.textContent = p ? '▶' : '❚❚'; tog.setAttribute('aria-label', p ? 'Reproducir video' : 'Pausar video'); };
    if (reduce) { vid.removeAttribute('autoplay'); vid.pause(); set(true); }
    tog.addEventListener('click', () => { if (vid.paused) { vid.play(); set(false); } else { vid.pause(); set(true); } });
  }

  /* ---------- parallax, línea de pasos y menú activo ---------- */
  const par = $$('[data-parallax]'), steps = $('.steps');
  const links = $$('nav.menu a[href^="#"]');
  const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  let ticking = false;
  function frame() {
    ticking = false; const vh = innerHeight;
    if (!reduce) par.forEach(el => {
      const r = el.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const k = +el.dataset.parallax; el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * -k).toFixed(1)}px, 0)`;
    });
    if (steps) { const r = steps.getBoundingClientRect(); steps.style.setProperty('--p', Math.max(0, Math.min(1, (vh * .85 - r.top) / (r.height + vh * .35))).toFixed(3)); }
    let cur = null; secs.forEach(s => { if (s.getBoundingClientRect().top < vh * .4) cur = s; });
    links.forEach(a => a.setAttribute('aria-current', cur && a.getAttribute('href') === '#' + cur.id ? 'true' : 'false'));
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', frame); frame();

  /* ---------- copiar número ---------- */
  const copy = $('#copy-num');
  if (copy) copy.addEventListener('click', () => {
    const msg = $('#copy-msg');
    const done = () => { msg.textContent = 'Número copiado: 0424-668-8030'; };
    const fallback = () => { const r = document.createRange(); r.selectNodeContents($('#wa-num')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); msg.textContent = 'Número seleccionado: cópialo con tu teclado.'; };
    try { navigator.clipboard.writeText('0424-668-8030').then(done, fallback); } catch (e) { fallback(); }
  });

  render();
})();
