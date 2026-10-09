/* Rosmary Barrios Store · comportamiento compartido (tienda + páginas legales) */

/* ==========================================================
   DATOS DEL NEGOCIO: cámbialos aquí y se actualizan en toda la web
   (pie de página y páginas legales). Lo que quede en null se
   muestra resaltado en amarillo como "pendiente".
   ========================================================== */
window.RB_BUSINESS = {
  marca: 'Rosmary Barrios Store',
  razonSocial: 'Rosmary Barrios Store', // cámbialo por la razón social si la tienes
  rif: 'J-50078623-9',
  direccion: 'Las Virtudes, Punto Fijo, estado Falcón, Venezuela',
  ciudad: 'Punto Fijo, estado Falcón',
  correo: 'rosmarybarrios07@gmail.com',
  whatsapp: '0424-668-8030',
  whatsappIntl: '584246688030',
  horario: 'De 10:00 a. m. a 8:00 p. m.',
  instagram: 'rosmarybarriosstore', // sin @
  diasReclamo: 7,             // días para reportar un defecto de fábrica
  diasAcademiaReembolso: null,// días antes del curso para pedir reembolso
  registroSanitario: null,    // registro o notificación sanitaria de henna y pega
  actualizado: '9 de octubre de 2026'
};

(function () {
  const B = window.RB_BUSINESS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* rellenar datos legales */
  $$('[data-b]').forEach(el => {
    const v = B[el.dataset.b];
    if (v === null || v === undefined || v === '') {
      el.textContent = (el.dataset.label || el.dataset.b) + ' pendiente';
      el.classList.add('fill-me');
    } else if (el.dataset.b === 'instagram') {
      el.textContent = '@' + v;
      if (el.tagName === 'A') el.href = 'https://instagram.com/' + v;
    } else if (el.dataset.b === 'correo' && el.tagName === 'A') {
      el.textContent = v; el.href = 'mailto:' + v;
    } else el.textContent = v;
  });
  $$('[data-if]').forEach(el => { if (!B[el.dataset.if]) el.hidden = true; });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* encabezado que se vuelve translúcido */
  const top = $('header.top');
  const onScroll = () => top && top.classList.toggle('scrolled', scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* menú móvil */
  const burger = $('.burger'), mnav = $('.mobile-nav');
  if (burger && mnav) {
    const set = open => {
      burger.setAttribute('aria-expanded', open); mnav.classList.toggle('open', open);
      mnav.setAttribute('aria-hidden', !open); document.body.style.overflow = open ? 'hidden' : '';
      $$('a', mnav).forEach(a => a.tabIndex = open ? 0 : -1);
    };
    set(false);
    burger.addEventListener('click', () => set(burger.getAttribute('aria-expanded') !== 'true'));
    $$('a', mnav).forEach(a => a.addEventListener('click', () => set(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape' && mnav.classList.contains('open')) { set(false); burger.focus(); } });
  }

  /* aparición al hacer scroll */
  const io = 'IntersectionObserver' in window && !reduce ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: .08 }) : null;
  window.RB_reveal = el => { if (io) io.observe(el); else el.classList.add('in'); };
  $$('.reveal, .mask-line, [data-reveal]').forEach(window.RB_reveal);

  /* contadores */
  const counters = $$('[data-count]');
  if (counters.length) {
    const run = el => {
      const end = +el.dataset.count, pre = el.dataset.pre || '', t0 = performance.now(), dur = 1600;
      if (reduce) { el.textContent = pre + end; return; }
      const step = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        el.textContent = pre + Math.round(end * e); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    const co = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } }), { threshold: .6 }) : null;
    counters.forEach(c => co ? co.observe(c) : run(c));
  }

  /* cursor y botones magnéticos (solo computadoras con mouse) */
  if (fine && !reduce) {
    const dot = document.createElement('div'), ring = document.createElement('div');
    dot.className = 'cursor-dot hide'; ring.className = 'cursor-ring hide';
    dot.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
    document.body.append(dot, ring);
    let x = -100, y = -100, rx = x, ry = y;
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; dot.classList.remove('hide'); ring.classList.remove('hide'); }, { passive: true });
    document.addEventListener('pointerleave', () => { dot.classList.add('hide'); ring.classList.add('hide'); });
    (function loop() {
      rx += (x - rx) * .18; ry += (y - ry) * .18;
      dot.style.transform = `translate(${x}px, ${y}px)`; ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('pointerover', e => {
      ring.classList.toggle('big', !!e.target.closest('a, button, .ph, .tile, summary, label, input, select'));
    });
    document.addEventListener('pointermove', e => {
      const b = e.target.closest('.btn'); if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * .18).toFixed(1) + 'px');
      b.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * .28).toFixed(1) + 'px');
    }, { passive: true });
    document.addEventListener('pointerout', e => {
      const b = e.target.closest('.btn'); if (b && !b.contains(e.relatedTarget)) { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); }
    });
  }

  /* globo del WhatsApp flotante */
  const bubble = $('.wa-bubble');
  if (bubble) {
    let closed = false;
    try { closed = sessionStorage.getItem('rb-bubble') === '1'; } catch (e) {}
    if (!closed) setTimeout(() => bubble.classList.add('show'), 6000);
    const x = $('button', bubble);
    if (x) x.addEventListener('click', () => { bubble.classList.remove('show'); try { sessionStorage.setItem('rb-bubble', '1'); } catch (e) {} });
  }
})();
