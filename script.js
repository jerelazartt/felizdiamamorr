/* ============ CORAZONES DE FONDO ============ */
(function () {
  const container = document.querySelector('.hearts-bg');
  const emojis = ['💖', '💗', '💕', '💘', '🌹', '💝', '🥰', '✨'];
  for (let i = 0; i < 16; i++) {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + 'vw';
    span.style.fontSize = 14 + Math.random() * 26 + 'px';
    span.style.animationDuration = 12 + Math.random() * 14 + 's';
    span.style.animationDelay = Math.random() * 14 + 's';
    container.appendChild(span);
  }
})();

/* ============ DESTELLOS ============ */
(function () {
  const container = document.querySelector('.sparkles-bg');
  for (let i = 0; i < 26; i++) {
    const span = document.createElement('span');
    span.style.left = Math.random() * 100 + 'vw';
    span.style.top = Math.random() * 100 + 'vh';
    span.style.width = span.style.height = 3 + Math.random() * 5 + 'px';
    span.style.animationDelay = Math.random() * 3 + 's';
    container.appendChild(span);
  }
})();

/* ============ TIMER DE AMOR ============ */
const LOVE_START = new Date('2025-05-30T00:00:00-03:00'); // 30 de mayo 2025, hora de Argentina

function getArgentinaNow() {
  const parts = {};
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(new Date()).forEach((p) => {
    parts[p.type] = p.value;
  });
  const hour = parts.hour === '24' ? 0 : parseInt(parts.hour, 10);
  return new Date(Date.UTC(+parts.year, +parts.month - 1, +parts.day, hour, +parts.minute, +parts.second));
}

function formatNum(n) {
  return String(n).padStart(2, '0');
}

function updateTimer() {
  const now = getArgentinaNow();
  const diff = Math.max(0, now - LOVE_START);

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) - Math.floor(years * 365.25);
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('years').textContent = formatNum(years);
  document.getElementById('days').textContent = formatNum(days);
  document.getElementById('hours').textContent = formatNum(hours);
  document.getElementById('minutes').textContent = formatNum(minutes);
  document.getElementById('seconds').textContent = formatNum(seconds);
}

updateTimer();
setInterval(updateTimer, 1000);

/* ============ CARTA ============ */
const openLetterBtn = document.getElementById('openLetter');
const letterPaper = document.getElementById('letterPaper');
const sealSymbols = ['💌', '📬', '💘', '😘', '💖'];

if (openLetterBtn) {
  let clicks = 0;
  openLetterBtn.addEventListener('click', () => {
    clicks++;
    if (clicks >= 3) {
      letterPaper.classList.add('open');
      openLetterBtn.disabled = true;
      burstHearts(openLetterBtn, 14);
    } else {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        const audio = new Ctx();
        const o = audio.createOscillator();
        const g = audio.createGain();
        o.connect(g);
        g.connect(audio.destination);
        o.frequency.value = 520 + clicks * 130;
        g.gain.setValueAtTime(0.08, audio.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.25);
        o.start();
        o.stop(audio.currentTime + 0.25);
      }
      openLetterBtn.textContent = sealSymbols[clicks] || sealSymbols[2];
      burstHearts(openLetterBtn, 5);
    }
  });
}

/* ============ RAZONES ============ */
const addReasonBtn = document.getElementById('addReasonBtn');
const reasonsGrid = document.getElementById('reasonsGrid');
const ideas = [
  'Por aguantarme cuando estoy de mal humor',
  'Por todas las veces que comemos juntos',
  'Por cómo mandas audios de 5 minutos contándome las cosas que te pasan',
  'Porque siempre estás para mí en los peores momentos',
  'Por jugar al Free Fire conmigo',
  'Porque con vos siempre me siento feliz'
];
let ideaIndex = 0;

if (addReasonBtn) {
  addReasonBtn.addEventListener('click', () => {
    const idea = ideas[ideaIndex % ideas.length];
    ideaIndex++;

    const card = document.createElement('div');
    card.className = 'reason-card fade-in';
    const icons = ['🌷', '🍔', '🎤', '🤝', '🎮', '😊'];
    card.innerHTML =
      '<span class="reason-icon">' + icons[ideaIndex % icons.length] + '</span><p>' + idea + '</p>';
    reasonsGrid.appendChild(card);

    requestAnimationFrame(() => card.classList.add('visible'));
    burstHearts(addReasonBtn, 8);

    if (ideaIndex >= ideas.length) {
      addReasonBtn.textContent = 'Siempre voy a tener razones para amarte 💞';
      addReasonBtn.disabled = true;
      addReasonBtn.style.opacity = '0.7';
    }
  });
}

/* ============ LIGHTBOX DE FOTOS ============ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const frame = lightbox.querySelector('.lightbox-frame');
  burstHearts(frame, 26);

  if (!lightboxImg.complete) {
    lightboxImg.addEventListener(
      'load',
      () => {
        burstHearts(frame, 26);
        heartRain(frame);
      },
      { once: true }
    );
  } else {
    heartRain(frame);
  }
}

function heartRain(frame) {
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement('div');
    heart.className = 'burst-heart';
    heart.textContent = ['💖', '💗', '💕', '💘', '🌹', '✨'][Math.floor(Math.random() * 6)];
    const rect = frame.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + (Math.random() * 80 - 40) + 'px';
    heart.style.top = rect.top + rect.height / 2 + (Math.random() * 80 - 40) + 'px';
    heart.style.setProperty('--dx', (Math.random() * 240 - 120) + 'px');
    heart.style.setProperty('--dy', (-120 - Math.random() * 160) + 'px');
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1300);
  }
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

if (lightbox) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxImg.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

function makeClickable(card, src) {
  card.style.cursor = 'zoom-in';
  card.addEventListener('click', () => openLightbox(src));
}

/* ============ FOTOS PERSONALES ============ */
(function () {
  const grid = document.getElementById('momentsGrid');
  if (!grid) return;

  const names = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
  const imgs = names.map((n) => n);

  const heartSvg =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
      '<rect width="400" height="400" fill="%23ffe3ee"/>' +
      '<text x="50%" y="54%" font-size="180" text-anchor="middle">💖</text>' +
      '</svg>'
    );

  grid.querySelectorAll('.moment-card-placeholder').forEach((card) => {
    makeClickable(card, heartSvg);
  });

  let added = 0;
  imgs.forEach((src) => {
    const img = new Image();
    img.onload = () => {
      const card = document.createElement('div');
      card.className = 'moment-card fade-in';
      card.innerHTML = '<img src="' + src + '" alt="Momento nuestro" class="moment-img-real">';
      makeClickable(card, src);
      grid.appendChild(card);
      requestAnimationFrame(() => card.classList.add('visible'));
      added++;
      if (added > 0) {
        grid.querySelectorAll('.moment-card-placeholder').forEach((c) => c.remove());
      }
    };
    img.src = src;
  });
})();

/* ============ GRAN BOTON ============ */
const bigHeartBtn = document.getElementById('bigHeartBtn');
if (bigHeartBtn) {
  bigHeartBtn.addEventListener('click', () => {
    burstHearts(bigHeartBtn, 24);
    const phrases = [
      'Y yo a ti, siempre 💖',
      'Sí, claro que me amas 🥰',
      'Yo también te amo más 😘',
      'Eres mi todo 💘',
      'Nunca lo dudé 🌹',
      'Feliz día de la novia 🎉'
    ];
    setTimeout(() => {
      bigHeartBtn.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    }, 400);
    setTimeout(() => {
      bigHeartBtn.textContent = 'Toca aquí si me amas 💖';
    }, 2600);
  });
}

/* ============ EXPLOSION DE CORAZONES ============ */
function burstHearts(element, count) {
  const rect = element.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'burst-heart';
    heart.textContent = ['💖', '💗', '💕', '💘', '🌹', '✨'][Math.floor(Math.random() * 6)];
    heart.style.left = cx + 'px';
    heart.style.top = cy + 'px';
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const dist = 90 + Math.random() * 140;
    heart.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    heart.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1300);
  }
}

/* ============ REVELAR AL HACER SCROLL ============ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll('.timer-section, .letter-section, .reasons-section, .moments-section, .music-section, .closing-section, footer')
  .forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
