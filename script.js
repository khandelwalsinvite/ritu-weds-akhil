/**
 * Wedding invitation — client logic (vanilla JS, no dependencies).
 * Everything shown on the page is read from config.js.
 */
(function () {
  'use strict';

  const cfg = window.WEDDING_CONFIG || {};
  const feat = cfg.features || {};
  const $ = (id) => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', () => {
    fillStaticText();
    fillCouple();
    renderEvents();
    initCountdown();
    renderGreetings();
    fillClosing();
    initOpening();
    initMusic();
    initShareAndContact();
    initDeveloperCredit();
    $('btnBackToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    initReveal();
  });

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function setText(id, text) { const el = $(id); if (el) el.textContent = text ?? ''; }
  // one block per line, so each line wraps and balances on its own
  function setLines(id, text) {
    const el = $(id);
    if (el) el.innerHTML = String(text ?? '').split('\n').map((l) => `<span class="ln">${esc(l)}</span>`).join('');
  }
  const DEVA_DIGITS = ['०','१','२','३','४','५','६','७','८','९'];
  function toEngDigits(s) {
    if (!s) return '';
    return String(s).replace(/[०-९]/g, (d) => String(DEVA_DIGITS.indexOf(d))).replace(/ऋतु/g, 'रितु');
  }

  /* ---------- hero, opening and other [data-text] slots ---------- */
  function fillStaticText() {
    const b = cfg.bride || {}, g = cfg.groom || {}, w = cfg.wedding || {}, t = cfg.wording || {};
    const values = {
      mantra: t.mantra,
      blessing: t.blessing,
      heroLabel: t.heroLabel,
      inviteLine: t.inviteLine,
      hostParents: b.parentsHi,
      brideName: b.nameHi, groomName: g.nameHi,
      brideNameEn: b.nameEn, groomNameEn: g.nameEn,
      dateHi: `${w.weekdayHi ? w.weekdayHi + ', ' : ''}${toEngDigits(w.day)} ${w.monthHi} ${toEngDigits(w.year)}`,
      dateEn: w.dateEn,
      place: [w.venueHi, w.cityHi].filter(Boolean).join(' · ')
    };
    document.querySelectorAll('[data-text]').forEach((el) => {
      const v = values[el.dataset.text];
      if (v === undefined) return;
      el.textContent = v;
    });

    document.title = `शुभ विवाह निमंत्रण | ${b.nameHi || ''} संग ${g.nameHi || ''}`;
  }

  /* ---------- couple & families ---------- */
  function fillCouple() {
    const b = cfg.bride || {}, g = cfg.groom || {};
    const photoWrap = $('couplePhotoContainer');
    if (photoWrap) {
      if (feat.showCouplePhoto === false) photoWrap.hidden = true;
      else if (cfg.assets?.couplePhoto) $('couplePhotoImg').src = cfg.assets.couplePhoto;
    }
    setText('brideFull', [b.titleHi, toEngDigits(b.nameHi)].filter(Boolean).join(' '));
    setText('brideRel', b.relationHi);
    setText('brideParents', b.parentsHi);
    setText('brideGrand', b.grandparentsHi);
    setText('brideRes', b.residenceHi ? `निवासी: ${b.residenceHi}` : '');
    setText('groomFull', [g.titleHi, g.nameHi].filter(Boolean).join(' '));
    setText('groomRel', g.relationHi);
    setText('groomParents', g.parentsHi);
    setText('groomRes', g.residenceHi ? `निवासी: ${g.residenceHi}` : '');
    ['brideGrand', 'brideRes', 'groomRes'].forEach((id) => { const el = $(id); if (el && !el.textContent) el.hidden = true; });

    const sh = $('shloka');
    if (sh) { if (cfg.wording?.shloka) setLines('shloka', cfg.wording.shloka); else sh.hidden = true; }
  }

  /* ---------- events (grouped by date) ---------- */
  const ICON_PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>';
  const ICON_CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';

  function calendarUrl(e) {
    const c = e.calendar;
    if (!c) return '';
    const p = new URLSearchParams({
      action: 'TEMPLATE',
      text: c.title,
      dates: `${c.start}/${c.end || c.start}`,
      ctz: 'Asia/Kolkata',
      location: [e.venueHi, e.addressHi].filter(Boolean).join(', '),
      details: `${e.titleHi}${e.titleEn ? ' (' + e.titleEn + ')' : ''}`
    });
    return `https://calendar.google.com/calendar/render?${p.toString()}`;
  }

  function eventCard(e) {
    const times = Array.isArray(e.times) ? e.times : [];
    const single = times.length === 1 && !times[0].label;
    const timeRows = times.map((t) =>
      `<div class="time-row">${t.label ? `<span>${esc(t.label)}</span>` : ''}<span>${esc(t.time)}</span></div>`).join('');

    const actions = [];
    if (feat.showDirectionsButtons !== false && e.mapsUrl) {
      actions.push(`<a class="chip" href="${esc(e.mapsUrl)}" target="_blank" rel="noopener noreferrer">${ICON_PIN}<span>मार्ग देखें</span></a>`);
    }
    const cal = feat.showAddToCalendar === true ? calendarUrl(e) : '';
    if (cal) actions.push(`<a class="chip" href="${esc(cal)}" target="_blank" rel="noopener noreferrer">${ICON_CAL}<span>कैलेंडर में जोड़ें</span></a>`);

    return `
      <article class="event">
        <h3>${esc(e.titleHi)}</h3>
        ${e.titleEn ? `<p class="en">${esc(e.titleEn)}</p>` : ''}
        <div class="times${single ? ' single' : ''}">${timeRows}</div>
        <div class="venue">
          <strong>${esc(e.venueHi)}</strong>
          ${e.addressHi ? `<p>${esc(e.addressHi)}</p>` : ''}
        </div>
        ${actions.length ? `<div class="event-actions">${actions.join('')}</div>` : ''}
      </article>`;
  }

  function renderEvents() {
    const section = $('sectionEvents');
    const box = $('eventsContainer');
    const events = (cfg.events || []).filter((e) => e && e.titleHi);
    if (!box || !events.length) { if (section) section.hidden = true; return; }

    const groups = [];
    events.forEach((e) => {
      let grp = groups.find((x) => x.iso === e.iso);
      if (!grp) { grp = { iso: e.iso, day: e.day, monthEn: e.monthEn, weekdayEn: e.weekdayEn, monthHi: e.monthHi, weekdayHi: e.weekdayHi, dayNote: e.dayNote || (e.iso === '2026-11-21' ? cfg.wording?.busTravelNote : ''), items: [] }; groups.push(grp); }
      grp.items.push(e);
    });

    box.innerHTML = groups.map((g) => `
      <div class="day">
        <div class="day-date">
          <span class="dd-num">${esc(toEngDigits(g.day))}</span>
          <span class="dd-meta">${esc(g.monthEn || g.monthHi)}<br>${esc(g.weekdayEn || g.weekdayHi)}</span>
        </div>
        <div class="day-cards">${g.dayNote ? `<div class="bus-banner-card"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="13" rx="2"></rect><path d="M4 11h16M4 17l2 3M20 17l-2 3M7 8h.01M17 8h.01"></path></svg><p>${esc(g.dayNote)}</p></div>` : ''}${g.items.map(eventCard).join('')}</div>
      </div>`).join('');

    if ($('busNote')) $('busNote').hidden = true;
  }

  /* ---------- countdown ---------- */
  function initCountdown() {
    const section = $('sectionCountdown');
    if (!section) return;
    const target = new Date(cfg.wedding?.countdownTargetISO || '').getTime();
    if (feat.showCountdown === false || isNaN(target)) { section.hidden = true; return; }

    const els = { d: $('cdDays'), h: $('cdHours'), m: $('cdMinutes'), s: $('cdSeconds') };
    const pad = (n) => String(n).padStart(2, '0');
    let timer;

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        Object.values(els).forEach((el) => (el.textContent = '00'));
        $('cdDone').hidden = false;
        clearInterval(timer);
        return;
      }
      els.d.textContent = pad(Math.floor(diff / 864e5));
      els.h.textContent = pad(Math.floor((diff % 864e5) / 36e5));
      els.m.textContent = pad(Math.floor((diff % 36e5) / 6e4));
      els.s.textContent = pad(Math.floor((diff % 6e4) / 1e3));
    }
    tick();
    timer = setInterval(tick, 1000);
  }

  /* ---------- family greetings & firms ---------- */
  function renderGreetings() {
    const fg = cfg.familyGroups;
    const section = $('sectionGreetings');
    if (fg && feat.showFamilyGroups !== false && Array.isArray(fg.groups) && fg.groups.length && section) {
      $('greetBody').innerHTML = fg.groups.map((grp) => `
        <div class="grp">
          <div class="grp-label">${esc(grp.label)}</div>
          <p class="grp-names">${String(grp.names).split(/,\s*/).filter(Boolean).map((n) => `<span class="n">${esc(n)}</span>`).join('')}</p>
        </div>`).join('');
      if (fg.openByDefault) $('greetDetails').open = true;
      section.hidden = false;
    }

    const firms = $('firms');
    if (firms && fg && Array.isArray(fg.firms) && fg.firms.length) {
      firms.innerHTML = '<p class="firms-label">प्रतिष्ठान</p>' + fg.firms.map((f) => `
        <div class="firm">
          <strong>${esc(f.name)}</strong>
          <span>${esc(f.address)}</span>
          <span>मो. ${esc(f.phone)}</span>
        </div>`).join('');
    }
  }

  /* ---------- closing ---------- */
  function fillClosing() {
    const t = cfg.wording || {};
    setText('closingHeading', t.thankYouHeading);
    setText('closingMessage', t.thankYouMessage);
    setText('familySignoff', t.familySignoff);
    if (t.balAagrah) {
      setLines('balQuote', t.balAagrah);
      setText('balKids', t.balAagrahChildren ? `स्नेही बच्चे: ${t.balAagrahChildren}` : '');
      $('balAagrah').hidden = false;
    }
  }

  /* ---------- share & contact ---------- */
  function initShareAndContact() {
    const shareBtn = $('btnShareWhatsapp');
    if (shareBtn) {
      if (feat.showWhatsAppShare === false) shareBtn.hidden = true;
      else shareBtn.addEventListener('click', () => {
        const s = cfg.share || {};
        const url = (s.url || '').trim() || window.location.href;
        const text = `${s.message || ''}\n\n${url}`.trim();
        const fallback = () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        if (navigator.share) {
          navigator.share({ title: s.title, text: s.message, url }).catch((err) => { if (err.name !== 'AbortError') fallback(); });
        } else fallback();
      });
    }

    const contact = $('btnContact');
    const phone = (cfg.contact?.phone || '').replace(/\D/g, '');
    if (contact) {
      if (feat.showContactButton === false || !phone) contact.hidden = true;
      else contact.href = `https://wa.me/${phone}?text=${encodeURIComponent(cfg.contact.prefilledMessage || '')}`;
    }
  }

  /* ---------- opening screen ---------- */
  function initOpening() {
    const overlay = $('openingOverlay');
    const btn = $('openInvitationBtn');
    if (!overlay || !btn) return;
    if (feat.enableOpeningReveal === false) { overlay.hidden = true; return; }

    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    btn.addEventListener('click', () => {
      overlay.classList.add('revealed');
      document.body.style.overflow = '';
      startMusic();
      setTimeout(() => { overlay.hidden = true; }, 850);
    });
  }

  /* ---------- developer credit ---------- */
  function initDeveloperCredit() {
    const dev = cfg.developer;
    const container = $('developerCredit');
    if (!dev || dev.show === false) {
      if (container) container.hidden = true;
      return;
    }
    if (!container) return;
    container.hidden = false;

    setText('devName', dev.name || 'Lubhit Khandelwal');
    if (dev.titleEn) {
      const tag = $('devTagline');
      if (tag) tag.innerHTML = `${esc(dev.titleEn)} <span class="heart">❤️</span> by`;
    }

    const emailEl = $('devEmail');
    if (emailEl && dev.email) {
      emailEl.href = 'mailto:' + dev.email;
      setText('devEmailText', dev.email);
    } else if (emailEl) {
      emailEl.hidden = true;
    }

    const phoneEl = $('devPhone');
    const waEl = $('devWhatsapp');
    const cleanPhone = (dev.phone || '').replace(/\D/g, '');

    if (phoneEl && cleanPhone) {
      const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone;
      phoneEl.href = 'tel:+' + fullPhone;
      setText('devPhoneText', dev.phoneDisplay || ('+' + fullPhone));
    } else if (phoneEl) {
      phoneEl.hidden = true;
    }

    if (waEl && cleanPhone) {
      const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone;
      const waMsg = encodeURIComponent(dev.whatsappMessage || 'नमस्ते लुभित! डिजिटल शादी की पत्रिका के संबंध में संपर्क करना चाहते हैं।');
      waEl.href = 'https://wa.me/' + fullPhone + '?text=' + waMsg;
    } else if (waEl) {
      waEl.hidden = true;
    }
  }

  /* ---------- music (never autoplays; starts only after a tap) ---------- */
  let audio = null, playing = false;

  function setMusicUI(on) {
    playing = on;
    const b = $('musicToggleBtn');
    if (!b) return;
    b.classList.toggle('playing', on);
    b.setAttribute('aria-label', on ? 'संगीत रोकें' : 'संगीत चलाएँ');
  }
  function startMusic() {
    if (!audio || playing) return;
    audio.volume = 0.45;
    audio.play().then(() => setMusicUI(true)).catch(() => setMusicUI(false));
  }
  function initMusic() {
    const b = $('musicToggleBtn');
    audio = $('weddingAudio');
    if (!b || !audio) return;
    if (feat.showMusicPlayer === false || !cfg.assets?.musicPath) return;
    audio.src = cfg.assets.musicPath;
    b.hidden = false;
    b.addEventListener('click', () => {
      if (playing) { audio.pause(); setMusicUI(false); } else startMusic();
    });
  }

  /* ---------- soft reveal on scroll ---------- */
  function initReveal() {
    const items = document.querySelectorAll(
      '.section-head, .host, .lead, .arch, .person, .shloka, .day-date, .event, .bus-note, .countdown > *, .greetings details, .closing > *, .actions'
    );
    items.forEach((el) => el.classList.add('reveal'));
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => io.observe(el));
  }
})();
