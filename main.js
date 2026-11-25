(() => {
  // ?static renders everything revealed (used for full-page previews)
  if (location.search.includes('static')) document.documentElement.classList.add('static');
  const nav = document.querySelector('.nav');
  if (document.documentElement.classList.contains('static')) { document.querySelectorAll('.rule').forEach(r=>r.classList.add('struck')); }
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), {passive:true});

  // Strike through food rules as they scroll into view
  const ruleIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('struck'); ruleIO.unobserve(e.target); }
  }), {rootMargin:'0px 0px -35% 0px'});
  document.querySelectorAll('.rule').forEach((r,i) => { r.style.transitionDelay = (i*60)+'ms'; ruleIO.observe(r); });

  // Gentle reveals
  const els = document.querySelectorAll('.card, .note, .step-list li, .polaroid, .about__copy, .faq__list details');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), {threshold:.15});
  els.forEach((el,i) => { el.classList.add('reveal'); el.style.transitionDelay = ((i%3)*110)+'ms'; io.observe(el); });

  // Count-up facts
  const cIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count; let n = 0;
    if (end === 0) { el.textContent = '0'; cIO.unobserve(el); return; }
    el.textContent = '0';
    const t = setInterval(() => { n++; el.textContent = n; if (n >= end) clearInterval(t); }, 110);
    cIO.unobserve(el);
  }), {threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el => cIO.observe(el));

  // Cutting board tilts toward the cursor
  const board = document.querySelector('.board');
  if (board && matchMedia('(hover:hover)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    addEventListener('mousemove', e => {
      const x = (e.clientX / innerWidth - .5), y = (e.clientY / innerHeight - .5);
      board.style.transform = `rotate(${x*8}deg) translate(${x*-14}px, ${y*-10}px)`;
    });
  }
})();
