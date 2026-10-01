/* ============ BLACKOUT STORE — main.js ============ */
(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // Unsplash: ogni foto è scelta per la keyword indicata accanto
  const img = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

  // Se un'immagine non carica, ripiega su Picsum usando la keyword come seed
  document.addEventListener("error", (e) => {
    const el = e.target;
    if (el.tagName !== "IMG" || el.dataset.fallback) return;
    el.dataset.fallback = "1";
    const seed = encodeURIComponent(el.dataset.keyword || el.alt || "streetwear");
    el.src = `https://picsum.photos/seed/${seed}/800/1000?grayscale`;
  }, true);

  /* ---------- DATI ---------- */
  // cat = chiave del filtro · isNew = badge "Nuovo" · soldOut = prodotto esaurito
  // sizesOff = singole taglie non disponibili
  const products = [
    { name: "Void Heavy Hoodie", cat: "felpe", catLabel: "Felpa", price: 89, isNew: true,
      imgs: ["1556821840-3a63f95609a7", "1620799140408-edc6dcb6d633"], keyword: "streetwear felpa con cappuccio",
      desc: "Felpa con cappuccio oversize in cotone felpato heavyweight 450 gsm. Cappuccio doppio strato, polsini a costine e ricamo tono su tono sul petto.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"], sizesOff: ["XS"] },
    { name: "Blackout Logo Tee", cat: "tshirt", catLabel: "T-shirt", price: 39,
      imgs: ["1618354691373-d851c5c3a990", "1583743814966-8936f5b7be1a"], keyword: "t-shirt nera streetwear",
      desc: "T-shirt boxy fit in jersey 240 gsm con stampa serigrafica del logo circolare. Collo a costina spesso che non si deforma.",
      sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Urban Cargo Pant", cat: "pantaloni", catLabel: "Pantaloni cargo", price: 95, isNew: true,
      imgs: ["1473966968600-fa801b869a1a", "1624378439575-d8705ad7ae80"], keyword: "pantaloni cargo urban",
      desc: "Pantalone cargo in ripstop di cotone con tasche a soffietto, coulisse al fondo e vita regolabile. Taglio affusolato che cade dritto sulle sneakers.",
      sizes: ["28", "30", "32", "34", "36"], sizesOff: ["36"] },
    { name: "Rust Bomber", cat: "giacche", catLabel: "Giacca bomber", price: 149,
      imgs: ["1591047139829-d91aecb6caea", "1544022613-e87ca75a784a"], keyword: "giacca bomber urban",
      desc: "Bomber in nylon satinato idrorepellente con imbottitura leggera, tasca portapenne sulla manica e fodera arancio signature.",
      sizes: ["S", "M", "L", "XL"] },
    { name: "Volt Runner", cat: "sneakers", catLabel: "Sneakers", price: 139, isNew: true,
      imgs: ["1606107557195-0e29a4b5b4aa", "1542291026-7eec264c27ff"], keyword: "sneakers neon urban",
      desc: "Runner in mesh tecnico colore volt, tomaia traspirante e suola a contrasto. Per chi non passa inosservato.",
      sizes: ["39", "40", "41", "42", "43", "44"] },
    { name: "Washed Dad Cap", cat: "accessori", catLabel: "Cappellino", price: 32,
      imgs: ["1521369909029-2afed882baee", "1575428652377-a2d80e2277fc"], keyword: "cappellino streetwear",
      desc: "Cappellino a sei pannelli in cotone lavato effetto vintage, logo ricamato tono su tono e chiusura regolabile in metallo.",
      sizes: ["Unica"] },
    { name: "Original Graphic Tee", cat: "tshirt", catLabel: "T-shirt", price: 45, soldOut: true,
      imgs: ["1576566588028-4147f3842f27", "1622445275463-afa2ab738c34"], keyword: "t-shirt grafica streetwear",
      desc: "Graphic tee in edizione limitata con artwork ispirato alla cultura giapponese. Cotone organico, stampa ad acqua morbida al tatto.",
      sizes: ["S", "M", "L", "XL"] },
    { name: "Night Rider Jacket", cat: "giacche", catLabel: "Giacca in pelle", price: 229, soldOut: true,
      imgs: ["1551028719-00167b16eac5", "1520975954732-35dd22299614"], keyword: "giacca pelle nera streetwear",
      desc: "Biker in pelle di agnello nera con zip asimmetrica, cerniere in metallo brunito e fodera trapuntata. Invecchia con te.",
      sizes: ["S", "M", "L", "XL"] },
    { name: "Crewneck Chalk", cat: "felpe", catLabel: "Felpa", price: 75,
      imgs: ["1620799140408-edc6dcb6d633", "1578587018452-892bacefd3f2"], keyword: "felpa girocollo streetwear",
      desc: "Felpa girocollo in french terry garzato, vestibilità rilassata e spalla scesa. Il capo base che sta sotto a tutto.",
      sizes: ["XS", "S", "M", "L", "XL"] },
    { name: "Fleece Jogger", cat: "pantaloni", catLabel: "Jogger", price: 69, isNew: true,
      imgs: ["1506629082955-511b1aa562c8", "1515886657613-9f3515b0c78f"], keyword: "jogger tuta streetwear",
      desc: "Jogger in felpa garzata con tasche profonde, elastico in vita con coulisse e fondo a costina. Dal divano alla strada senza cambiarti.",
      sizes: ["XS", "S", "M", "L", "XL"], sizesOff: ["XL"] },
    { name: "Raw Denim Trucker", cat: "giacche", catLabel: "Giacca denim", price: 135, isNew: true,
      imgs: ["1611312449408-fcece27cdbb7", "1552374196-1ab2a1c593e8"], keyword: "giacca denim streetwear",
      desc: "Giacca in denim grezzo 14 oz con colletto in velluto a coste. Cuciture contrastanti e bottoni personalizzati Blackout.",
      sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Air Low Triple White", cat: "sneakers", catLabel: "Sneakers", price: 119,
      imgs: ["1600269452121-4f2416e55c28", "1512374382149-233c42b6a83b"], keyword: "sneakers bianche urban style",
      desc: "L'intramontabile sneaker bassa total white in pelle pieno fiore. Suola in gomma cupsole e intersuola ammortizzata.",
      sizes: ["40", "41", "42", "43", "44", "45"], sizesOff: ["40"] },
    { name: "Selvedge Denim 5-Pocket", cat: "pantaloni", catLabel: "Jeans", price: 110,
      imgs: ["1542272604-787c3835535d", "1516826957135-700dedea698c"], keyword: "jeans streetwear",
      desc: "Jeans cinque tasche in denim selvedge giapponese, taglio straight e lavaggio scuro. Si adatta al corpo col tempo.",
      sizes: ["28", "30", "32", "34", "36"] },
    { name: "Court Bred Mid", cat: "sneakers", catLabel: "Sneakers", price: 159, soldOut: true,
      imgs: ["1552346154-21d32810aba3", "1605348532760-6753d2c43329"], keyword: "sneakers basket rosse nere",
      desc: "Silhouette mid da basket in pelle rossa, nera e bianca. Il colorway che ha fatto la storia, andato a ruba in 48 ore.",
      sizes: ["40", "41", "42", "43", "44"] },
    { name: "Shadow Shades", cat: "accessori", catLabel: "Occhiali da sole", price: 59,
      imgs: ["1572635196237-14b3f281503f", "1511499767150-a48a237f0083"], keyword: "occhiali da sole streetwear",
      desc: "Occhiali da sole in acetato nero opaco con lenti polarizzate categoria 3. Custodia rigida con logo incluso.",
      sizes: ["Unica"] },
    { name: "Nightshift Backpack", cat: "accessori", catLabel: "Zaino", price: 79, soldOut: true,
      imgs: ["1553062407-98eeb64c6a62", "1523381210434-271e8be1f52b"], keyword: "zaino streetwear nero",
      desc: "Zaino urbano in cordura con scomparto imbottito per laptop 16\", tasca segreta sul retro e patch gialla riflettente.",
      sizes: ["Unica"] }
  ];

  const lookbook = [
    { id: "1523398002811-999ca8dec234", cap: "Sottopasso, ore 23", size: "big", keyword: "cultura urbana streetwear" },
    { id: "1516826957135-700dedea698c", cap: "Porto canale", size: "tall", keyword: "street style uomo" },
    { id: "1509631179647-0177331693ae", cap: "Green room", size: "", keyword: "moda streetwear donna" },
    { id: "1600185365483-26d7a4cc7519", cap: "Air drop", size: "", keyword: "sneakers urban style" },
    { id: "1520975954732-35dd22299614", cap: "Brick & leather", size: "tall", keyword: "giacca pelle urban" },
    { id: "1515886657613-9f3515b0c78f", cap: "Court session", size: "wide", keyword: "tuta streetwear" },
    { id: "1503342217505-b0a15ec3261c", cap: "Peace sign", size: "", keyword: "t-shirt streetwear donna" },
    { id: "1549298916-b41d501d3772", cap: "Workwear kicks", size: "", keyword: "sneakers streetwear" },
    { id: "1544022613-e87ca75a784a", cap: "Utility mood", size: "tall", keyword: "giacca utility streetwear" },
    { id: "1605348532760-6753d2c43329", cap: "Court classic", size: "wide", keyword: "sneakers basket" },
    { id: "1517841905240-472988babdf9", cap: "Denim & hood", size: "", keyword: "felpa denim streetwear" },
    { id: "1496345875659-11f7dd282d1d", cap: "Shades on", size: "", keyword: "moda streetwear uomo" }
  ];

  const reviews = [
    { name: "Marco R.", city: "Pescara", stars: 5, text: "La Void Hoodie è pesante e morbida come poche. Dopo dieci lavaggi è ancora perfetta." },
    { name: "Giulia T.", city: "Chieti", stars: 5, text: "Negozio con un'energia pazzesca, ragazzi super preparati. Il release party era da non perdere." },
    { name: "Alessio D.", city: "Montesilvano", stars: 4, text: "Cargo perfetti, taglio moderno. Unica pecca: la mia taglia è finita in due giorni." },
    { name: "Sara M.", city: "Francavilla", stars: 5, text: "Finalmente brand indipendenti veri a Pescara. Ho trovato capi che non vedo addosso a nessuno." },
    { name: "Luca P.", city: "Teramo", stars: 5, text: "Spedizione veloce e packaging curato. Il bomber rust è ancora meglio dal vivo." },
    { name: "Nicole B.", city: "L'Aquila", stars: 4, text: "Grande selezione di sneakers e prezzi onesti. Ci torno per il prossimo drop." },
    { name: "Davide C.", city: "Pescara", stars: 5, text: "Il posto dove la cultura street di Pescara si incontra. Musica, graffiti e vestiti fatti bene." }
  ];

  /* ---------- NAV ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // voce attiva nel menu desktop
  const navLinks = $$(".nav__links a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id], footer[id]").forEach((s) => spy.observe(s));

  /* ---------- MENU MOBILE ---------- */
  const burger = $("#burger");
  const menu = $("#mobileMenu");
  const setMenu = (open) => {
    burger.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("no-scroll", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Chiudi menu" : "Apri menu");
    menu.setAttribute("aria-hidden", !open);
  };
  $$(".mobile-menu__links a").forEach((a, i) => (a.style.transitionDelay = `${0.05 + i * 0.04}s`));
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 900 && menu.classList.contains("is-open")) setMenu(false); });

  /* ---------- HERO: titolo lettera per lettera + glitch ---------- */
  const title = $("#heroTitle");
  let delay = 0.35;
  ["BLACKOUT", "STORE"].forEach((word) => {
    const w = document.createElement("span");
    w.className = "word";
    w.setAttribute("aria-hidden", "true");
    [...word].forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "ch" + (word === "BLACKOUT" && i >= 5 ? " ch--accent" : "");
      s.textContent = ch;
      s.style.animationDelay = `${delay.toFixed(2)}s`;
      delay += 0.07;
      w.appendChild(s);
    });
    title.appendChild(w);
  });
  const glitch = () => {
    title.classList.remove("is-glitching");
    void title.offsetWidth;
    title.classList.add("is-glitching");
  };
  setTimeout(glitch, (delay + 0.4) * 1000);
  setInterval(glitch, 6000);
  title.addEventListener("mouseenter", glitch);

  /* ---------- SCROLL REVEAL ---------- */
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-visible");
      revealer.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  const observeReveal = (els) => els.forEach((el) => revealer.observe(el));
  observeReveal($$(".reveal"));

  // contatori "chi siamo"
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, end = +el.dataset.count, start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1200, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counterObs.observe(el));

  /* ---------- PRODOTTI ---------- */
  const grid = $("#productGrid");
  const euro = (n) => `€ ${n.toFixed(2).replace(".", ",")}`;
  const heartSVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>`;

  // wishlist dimostrativa, ricordata nel browser se possibile
  const wishlist = new Set((() => {
    try { return JSON.parse(localStorage.getItem("blackout-wishlist")) || []; } catch { return []; }
  })());
  const saveWishlist = () => {
    try { localStorage.setItem("blackout-wishlist", JSON.stringify([...wishlist])); } catch { /* storage non disponibile */ }
  };

  grid.innerHTML = products.map((p, i) => {
    const badge = p.soldOut ? `<span class="card__badge card__badge--soldout">Sold Out</span>`
      : p.isNew ? `<span class="card__badge card__badge--new">Nuovo</span>` : "";
    const wished = wishlist.has(p.name);
    return `
    <article class="card${p.soldOut ? " is-soldout" : ""}" data-cat="${p.cat}" data-index="${i}" tabindex="0" role="button" aria-label="${p.name}, ${euro(p.price)}${p.soldOut ? ", esaurito" : ""}. Apri dettaglio">
      <div class="card__media">
        ${badge}
        <button class="wish${wished ? " is-active" : ""}" data-index="${i}" aria-pressed="${wished}" aria-label="${wished ? "Rimuovi" : "Aggiungi"} ${p.name} ${wished ? "dalla" : "alla"} wishlist">${heartSVG}</button>
        <img class="img-main" src="${img(p.imgs[0], 700)}" alt="${p.catLabel} ${p.name}" loading="lazy" data-keyword="${p.keyword}">
        <img class="img-alt" src="${img(p.imgs[1], 700)}" alt="" loading="lazy" data-keyword="${p.keyword}">
        <span class="card__quick">${p.soldOut ? "Esaurito · Vedi dettagli" : "Vedi dettagli"}</span>
      </div>
      <div class="card__info">
        <div><h3 class="card__name">${p.name}</h3><span class="card__cat">${p.catLabel}</span></div>
        <span class="card__price">${euro(p.price)}</span>
      </div>
    </article>`;
  }).join("");

  const cards = $$(".card", grid);
  const staggerReveal = (els) => els.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 0.08}s`; });
  staggerReveal(cards);
  observeReveal(cards);

  /* ---------- FILTRI (uscita morbida → entrata sfalsata) ---------- */
  const filterBtns = $$(".filter");
  let filterTimer;
  filterBtns.forEach((btn) => btn.addEventListener("click", () => {
    if (btn.classList.contains("is-active")) return;
    filterBtns.forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", b === btn);
    });
    const f = btn.dataset.filter;
    const matches = (c) => f === "all" || c.dataset.cat === f;

    // 1) le card visibili svaniscono
    cards.forEach((c) => { if (!c.classList.contains("is-hidden")) c.classList.add("is-leaving"); });

    clearTimeout(filterTimer);
    filterTimer = setTimeout(() => {
      // 2) aggiorno la griglia e faccio entrare le nuove card una dopo l'altra
      const shown = [];
      cards.forEach((c) => {
        c.classList.remove("is-leaving", "is-visible");
        c.classList.toggle("is-hidden", !matches(c));
        if (matches(c)) shown.push(c);
      });
      shown.forEach((c, i) => (c.style.transitionDelay = `${Math.min(i, 7) * 0.06}s`));
      requestAnimationFrame(() => requestAnimationFrame(() => shown.forEach((c) => c.classList.add("is-visible"))));
    }, 300);
  }));

  /* ---------- WISHLIST ---------- */
  const wishCount = $("#wishCount");
  const wishBtn = $("#wishBtn");
  const updateWishCount = () => { wishCount.textContent = wishlist.size; };
  updateWishCount();

  grid.addEventListener("click", (e) => {
    const heart = e.target.closest(".wish");
    if (!heart) return;
    e.stopPropagation();
    const p = products[+heart.dataset.index];
    const on = !wishlist.has(p.name);
    on ? wishlist.add(p.name) : wishlist.delete(p.name);
    saveWishlist();
    heart.classList.toggle("is-active", on);
    heart.setAttribute("aria-pressed", on);
    heart.setAttribute("aria-label", `${on ? "Rimuovi" : "Aggiungi"} ${p.name} ${on ? "dalla" : "alla"} wishlist`);
    heart.classList.remove("pop"); void heart.offsetWidth; heart.classList.add("pop");
    updateWishCount();
    wishBtn.classList.remove("bump"); void wishBtn.offsetWidth; wishBtn.classList.add("bump");
    toast(on ? `♥ ${p.name} aggiunto alla wishlist` : `${p.name} rimosso dalla wishlist`);
  }, true);

  wishBtn.addEventListener("click", () => {
    if (!wishlist.size) return toast("La tua wishlist è vuota");
    const names = [...wishlist];
    toast(`♥ Wishlist: ${names.slice(0, 3).join(", ")}${names.length > 3 ? ` e altri ${names.length - 3}` : ""}`);
  });

  /* ---------- MODALE PRODOTTO ---------- */
  const modal = $("#productModal");
  const pmImg = $("#pmImg");
  const pmAdd = $("#pmAdd");
  let current = null, selectedSize = null, lastFocus = null;

  const openModal = (i) => {
    const p = products[i];
    const off = p.sizesOff || [];
    current = p; selectedSize = null; lastFocus = document.activeElement;
    pmImg.src = img(p.imgs[0], 1000);
    pmImg.alt = `${p.catLabel} ${p.name}`;
    pmImg.dataset.keyword = p.keyword;
    delete pmImg.dataset.fallback;
    $("#pmCat").textContent = p.soldOut ? `${p.catLabel} · Sold Out` : p.isNew ? `${p.catLabel} · Nuovo` : p.catLabel;
    $("#pmName").textContent = p.name;
    $("#pmPrice").textContent = euro(p.price);
    $("#pmDesc").textContent = p.desc;
    $("#pmThumbs").innerHTML = p.imgs.map((id, k) =>
      `<button class="${k === 0 ? "is-active" : ""}" data-src="${img(id, 1000)}" aria-label="Foto ${k + 1}"><img src="${img(id, 160)}" alt="" data-keyword="${p.keyword}"></button>`).join("");
    $("#pmSizes").innerHTML = p.sizes.map((s) => {
      const na = p.soldOut || off.includes(s);
      return `<button class="size" data-size="${s}" ${na ? `disabled aria-label="${s} esaurita"` : ""}>${s}</button>`;
    }).join("");
    if (!p.soldOut && p.sizes.length === 1) { selectedSize = p.sizes[0]; $(".size", modal).classList.add("is-active"); }
    pmAdd.disabled = !!p.soldOut;
    pmAdd.textContent = p.soldOut ? "Sold Out" : "Aggiungi al carrello";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => $(".modal__close", modal).focus(), 50);
  };
  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };

  grid.addEventListener("click", (e) => { const c = e.target.closest(".card"); if (c) openModal(+c.dataset.index); });
  grid.addEventListener("keydown", (e) => {
    if (e.target.closest(".wish")) return;
    const c = e.target.closest(".card");
    if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openModal(+c.dataset.index); }
  });
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) return closeModal();
    const thumb = e.target.closest(".pm__thumbs button");
    if (thumb) {
      $$(".pm__thumbs button", modal).forEach((b) => b.classList.toggle("is-active", b === thumb));
      pmImg.style.opacity = 0;
      setTimeout(() => { delete pmImg.dataset.fallback; pmImg.src = thumb.dataset.src; pmImg.style.opacity = 1; }, 200);
    }
    const size = e.target.closest(".size");
    if (size && !size.disabled) {
      selectedSize = size.dataset.size;
      $$(".size", modal).forEach((b) => b.classList.toggle("is-active", b === size));
    }
  });

  const cartCount = $("#cartCount");
  const cartBtn = $("#cartBtn");
  let cart = 0;
  pmAdd.addEventListener("click", () => {
    if (current.soldOut) return;
    if (!selectedSize) {
      const sizes = $("#pmSizes");
      sizes.classList.remove("shake"); void sizes.offsetWidth; sizes.classList.add("shake");
      toast("Seleziona prima una taglia");
      return;
    }
    cart++;
    cartCount.textContent = cart;
    cartBtn.classList.remove("bump"); void cartBtn.offsetWidth; cartBtn.classList.add("bump");
    toast(`✓ ${current.name} (${selectedSize}) aggiunto al carrello`);
    closeModal();
  });
  cartBtn.addEventListener("click", () => toast(cart ? `Hai ${cart} ${cart === 1 ? "articolo" : "articoli"} nel carrello (demo)` : "Il carrello è vuoto"));

  /* ---------- PARALLASSE ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = $(".hero");
  const heroBg = $("[data-parallax-hero]");
  const heroContent = $("#heroContent");
  const layers = $$("[data-parallax]");
  let ticking = false;

  const parallax = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    // hero: lo sfondo scende al 40% della velocità di scroll, il contenuto sfuma
    const hh = hero.offsetHeight;
    if (y < hh) {
      heroBg.style.transform = `translate3d(0, ${y * 0.4}px, 0)`;
      heroContent.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      heroContent.style.opacity = Math.max(0, 1 - y / (hh * 0.8));
    }
    // altre sezioni: offset proporzionale alla distanza dal centro dello schermo
    layers.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const speed = parseFloat(el.dataset.parallax) || 0.25;
      const offset = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  };
  if (!reduceMotion) {
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } };
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    parallax();
  }

  /* ---------- COUNTDOWN NUOVO DROP ---------- */
  // Drop ogni due sabati alle 18:00: se la data è passata, passa al successivo
  const DROP_EVERY = 14 * 24 * 3600 * 1000;
  let dropAt = new Date(2026, 9, 17, 18, 0, 0).getTime();
  const nextDrop = () => { while (dropAt <= Date.now()) dropAt += DROP_EVERY; };
  nextDrop();

  const cdNums = Object.fromEntries($$(".countdown__num").map((el) => [el.dataset.unit, el]));
  const cdBox = $("#countdown");
  const dropDate = $("#dropDate");
  const pad = (n) => String(n).padStart(2, "0");
  const renderDate = () => {
    dropDate.textContent = new Intl.DateTimeFormat("it-IT", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
      .format(dropAt).replace(",", " · ore");
  };
  renderDate();

  const tickCountdown = () => {
    let diff = dropAt - Date.now();
    if (diff <= 0) {
      cdBox.classList.add("is-live");
      toast("Il Drop 07 è live! 🔥");
      nextDrop(); renderDate();
      diff = dropAt - Date.now();
    }
    const t = Math.floor(diff / 1000);
    const vals = { d: Math.floor(t / 86400), h: Math.floor(t / 3600) % 24, m: Math.floor(t / 60) % 60, s: t % 60 };
    Object.entries(vals).forEach(([k, v]) => {
      const el = cdNums[k], txt = pad(v);
      if (el.textContent === txt) return;
      el.textContent = txt;
      el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick");
    });
    cdBox.setAttribute("aria-label", `Mancano ${vals.d} giorni, ${vals.h} ore, ${vals.m} minuti e ${vals.s} secondi al drop`);
  };
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- TOAST ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-shown"), 2600);
  }

  /* ---------- LOOKBOOK + LIGHTBOX ---------- */
  const mosaic = $("#mosaic");
  mosaic.innerHTML = lookbook.map((l, i) => `
    <button class="mosaic__item${l.size ? " mosaic__item--" + l.size : ""}" data-index="${i}" data-caption="${l.cap}" aria-label="Apri foto: ${l.cap}">
      <img src="${img(l.id, l.size === "big" ? 1000 : 700)}" alt="${l.keyword}" loading="lazy" data-keyword="${l.keyword}">
    </button>`).join("");
  const tiles = $$(".mosaic__item", mosaic);
  tiles.forEach((t, i) => (t.style.transitionDelay = `${(i % 4) * 0.07}s`));
  observeReveal(tiles);

  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  let lbIndex = 0, lbLastFocus = null;
  const showLb = (i, animate = true) => {
    lbIndex = (i + lookbook.length) % lookbook.length;
    const l = lookbook[lbIndex];
    const apply = () => {
      delete lbImg.dataset.fallback;
      lbImg.dataset.keyword = l.keyword;
      lbImg.src = img(l.id, 1600);
      lbImg.alt = l.keyword;
      lbCap.textContent = `${l.cap} — ${lbIndex + 1}/${lookbook.length}`;
    };
    if (!animate) return apply();
    lbImg.classList.add("is-changing");
    setTimeout(() => {
      apply();
      const done = () => lbImg.classList.remove("is-changing");
      if (lbImg.complete) done(); else lbImg.onload = lbImg.onerror = done;
    }, 250);
  };
  const openLb = (i) => {
    lbLastFocus = document.activeElement;
    showLb(i, false);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => $(".lightbox__close", lb).focus(), 50);
  };
  const closeLb = () => {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lbLastFocus) lbLastFocus.focus({ preventScroll: true });
  };
  mosaic.addEventListener("click", (e) => { const t = e.target.closest(".mosaic__item"); if (t) openLb(+t.dataset.index); });
  $("#lbPrev").addEventListener("click", () => showLb(lbIndex - 1));
  $("#lbNext").addEventListener("click", () => showLb(lbIndex + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest("[data-lb-close]")) closeLb(); });

  // swipe su mobile
  let touchX = null;
  lb.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  document.addEventListener("keydown", (e) => {
    if (lb.classList.contains("is-open")) {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") showLb(lbIndex + 1);
      if (e.key === "ArrowLeft") showLb(lbIndex - 1);
    } else if (modal.classList.contains("is-open") && e.key === "Escape") closeModal();
    else if (menu.classList.contains("is-open") && e.key === "Escape") setMenu(false);
  });

  /* ---------- RECENSIONI (carosello infinito) ---------- */
  const stars = (n) => "★".repeat(n) + `<span class="off">${"★".repeat(5 - n)}</span>`;
  const reviewHTML = (r) => `
    <article class="review">
      <div class="review__stars" aria-label="${r.stars} stelle su 5">${stars(r.stars)}</div>
      <p>“${r.text}”</p>
      <div class="review__who">
        <span class="review__avatar">${r.name[0]}</span>
        <div><b>${r.name}</b><span>${r.city} · Acquisto verificato</span></div>
      </div>
    </article>`;
  const track = $("#reviewsTrack");
  // duplico la lista per un loop senza interruzioni
  track.innerHTML = reviews.map(reviewHTML).join("") + reviews.map(reviewHTML).join("");
  $$(".review", track).slice(reviews.length).forEach((r) => r.setAttribute("aria-hidden", "true"));
  track.addEventListener("touchstart", () => track.classList.add("is-paused"), { passive: true });
  track.addEventListener("touchend", () => setTimeout(() => track.classList.remove("is-paused"), 1500));

  /* ---------- NEWSLETTER ---------- */
  const form = $("#newsletterForm"), email = $("#email"), msg = $("#newsletterMsg");
  const showMsg = (text, ok) => {
    msg.textContent = text;
    msg.className = "newsletter__msg is-shown " + (ok ? "is-ok" : "is-err");
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      email.classList.remove("is-error"); void email.offsetWidth; email.classList.add("is-error");
      showMsg("Inserisci un indirizzo email valido.", false);
      return;
    }
    email.classList.remove("is-error");
    form.classList.add("is-done");
    email.disabled = true;
    showMsg("Sei dentro. Controlla la tua inbox per il codice -10% ✦", true);
  });
  email.addEventListener("input", () => email.classList.remove("is-error"));

  /* ---------- CURSORE STREETWEAR ---------- */
  // Solo con mouse/trackpad e senza "riduci movimento": su touch resta tutto nativo
  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const STAR = "M1 -19 L2.9 -6.9 L10.6 -11.3 L7.9 -3.3 L18 -0.6 L6.3 2.6 L11 12.3 L3.1 7.4 L0.7 19.5 L-2.8 6.7 L-10.2 11 L-8.1 3.4 L-17.5 -0.9 L-6 -2.5 L-11.7 -10.9 L-3.1 -7.6Z";
    const cur = document.createElement("div");
    cur.className = "cursor";
    cur.setAttribute("aria-hidden", "true");
    cur.innerHTML = `<div class="cursor__star"><svg viewBox="-20 -20 40 40"><path class="edge" d="${STAR}"/><path class="face" d="${STAR}"/></svg></div><div class="cursor__tip"></div>`;
    const sparks = Array.from({ length: 12 }, () => cur.appendChild(Object.assign(document.createElement("span"), { className: "cursor__spark" })));
    document.body.appendChild(cur);
    document.documentElement.classList.add("has-cursor");

    const tip = $(".cursor__tip", cur);
    const star = $(".cursor__star", cur);
    const CLICKABLE = "a, button, [role='button'], [role='tab'], label, summary, .mosaic__item";
    const TEXT = "input, textarea, select, [contenteditable]";
    let mx = -100, my = -100, sx = -100, sy = -100, raf = 0, sparkIdx = 0, hoverEl = null;

    // la stella insegue la punta con un lerp; il loop si ferma quando è arrivata
    const loop = () => {
      sx += (mx - sx) * 0.22;
      sy += (my - sy) * 0.22;
      star.style.transform = `translate3d(${sx}px, ${sy}px, 0)`;
      raf = Math.abs(mx - sx) + Math.abs(my - sy) > 0.2 ? requestAnimationFrame(loop) : 0;
    };

    // scintille: pool fisso di elementi animati via WAAPI (solo transform/opacity)
    const burst = (n, dist) => {
      for (let i = 0; i < n; i++) {
        const s = sparks[sparkIdx++ % sparks.length];
        const a = (i / n) * 360 + Math.random() * 30;
        const d = dist * (0.7 + Math.random() * 0.6);
        const rad = (a * Math.PI) / 180;
        const from = `translate3d(${mx}px, ${my}px, 0) rotate(${a + 90}deg)`;
        const to = `translate3d(${mx + Math.cos(rad) * d}px, ${my + Math.sin(rad) * d}px, 0) rotate(${a + 90}deg) scaleY(.2)`;
        s.animate([{ transform: from, opacity: 1 }, { transform: to, opacity: 0 }], { duration: 420, easing: "cubic-bezier(.2,.8,.3,1)" });
      }
    };

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (!cur.classList.contains("is-visible")) { sx = mx; sy = my; } // niente "volo" dall'angolo al rientro
      tip.style.transform = `translate3d(${mx}px, ${my}px, 0) rotate(45deg)`;
      cur.classList.add("is-visible");
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });

    document.addEventListener("mouseover", (e) => {
      const t = e.target instanceof Element ? e.target : null;
      cur.classList.toggle("is-text", !!(t && t.closest(TEXT)));
      const el = t && t.closest(CLICKABLE);
      if (el === hoverEl) return;
      hoverEl = el;
      cur.classList.toggle("is-hover", !!el);
      if (el) burst(5, 22);
    });
    document.documentElement.addEventListener("mouseleave", () => cur.classList.remove("is-visible"));
    window.addEventListener("mousedown", () => { cur.classList.add("is-down"); burst(8, 34); });
    window.addEventListener("mouseup", () => cur.classList.remove("is-down"));
  }

  /* ---------- VARIE ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
