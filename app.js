/* =========================================================
   ✏️  EDIT THIS BLOCK — your name, bio and social links.
   Leave a link as "" to hide that icon.
   ========================================================= */
const CONFIG = {
  name: "Urvashi Gupta",
  role: "Chemistry Researcher · Spectroscopy",
  bio: "I turn dense spectroscopy concepts into visual, bite-sized notes. Save · Share · Follow.",
  socials: {
    instagram: "https://www.instagram.com/chemistry_researchhub_urvashi/",
    linkedin:  "https://www.linkedin.com/in/urvashi-gupta-84773b232/",
    youtube:   "",
    x:         "https://x.com/cy22d123",
    scholar:   "https://scholar.google.com/citations?user=cDyPcq4AAAAJ&hl=en",
    email:     "mailto:guptaurvashi080@gmail.com",
  },
};

/* ---------------- Notes data ---------------- */
const TOPICS = {
  fundamentals: { label: "Fundamentals", sym: "Fd", color: "var(--c-fund)", desc: "Series 01 · the language of light and matter" },
  uv:           { label: "UV-Vis Spectroscopy", sym: "Uv", color: "var(--c-uv)", desc: "Series 02 · electronic transitions, from basics to advanced" },
  ir:           { label: "IR Spectroscopy", sym: "Ir", color: "var(--c-ir)", desc: "Series 03 · molecular vibrations and functional groups" },
};

const NOTES = [
  { topic: "fundamentals", n: 1, title: "What is Spectroscopy?", sub: "Light–matter interactions, EMR & transitions",
    chips: ["ΔE = hν", "EM spectrum", "Beer–Lambert"], k: "absorption emission scattering energy planck electromagnetic spectrum transitions electronic vibrational rotational nuclear spin spectrometer reading spectrum" },
  { topic: "fundamentals", n: 2, title: "Major Techniques & Applications", sub: "UV-Vis, IR, Raman, NMR, AAS, MS at a glance",
    chips: ["techniques", "selection rules"], k: "uv-vis ir raman fluorescence nmr atomic absorption emission aas icp mass spectrometry ms advanced concepts time-resolved 2d surface computational tddft applications" },
  { topic: "fundamentals", n: 3, title: "Series Recap", sub: "Key techniques & where they're used",
    chips: ["recap", "FTIR", "XPS"], k: "thank you recap uv-vis ftir raman nmr xps ms key applications structure elucidation" },

  { topic: "uv", n: 1, title: "UV-Vis: From Basics to Advanced", sub: "Principle, instrumentation, analysis & applications",
    chips: ["cover", "HOMO→LUMO"], k: "introduction spectrophotometer cuvette lambda max homo lumo electronic transition" },
  { topic: "uv", n: 2, title: "Basics, Principle & Why We Use It", sub: "Regions, λmax, chromophores & auxochromes",
    chips: ["π→π*", "n→π*", "λmax"], k: "uv visible regions principle absorption conjugation solvent substituents ph absorbance transmittance chromophore auxochrome red shift" },
  { topic: "uv", n: 3, title: "Instrumentation & Data Collection", sub: "Single vs double beam, lamps, cuvettes",
    chips: ["deuterium lamp", "monochromator"], k: "single beam double beam light source deuterium tungsten halogen monochromator cuvette quartz experimental steps settings slit width baseline good practice common problems" },
  { topic: "uv", n: 4, title: "Beer–Lambert Law & Data Processing", sub: "Calibration curves, baseline, plotting",
    chips: ["A = εbc", "calibration"], k: "beer lambert law absorbance molar absorptivity path length concentration calibration curve plotting baseline blank correction processing tools mistakes" },
  { topic: "uv", n: 5, title: "Spectrum Reading & Interpretation", sub: "Band intensity, shape and shifts",
    chips: ["bathochromic", "hypsochromic"], k: "read spectrum band intensity position shifts bathochromic red hypsochromic blue band shape shoulder overlap charge transfer d-d laporte interpretation tips" },
  { topic: "uv", n: 6, title: "Applications, Advantages & Limitations", sub: "Where UV-Vis shines, and where it doesn't",
    chips: ["band gap", "kinetics"], k: "applications concentration reaction monitoring metal complexes pharmaceuticals biomolecules nanoparticles environmental advantages limitations band gap kinetics over-interpretation" },
  { topic: "uv", n: 7, title: "UV-Vis Recap", sub: "Key applications in one page",
    chips: ["recap"], k: "thank you recap quantitative analysis purity quality control complex formation" },

  { topic: "ir", n: 1, title: "IR: From Basic to Advanced", sub: "Principle, instrumentation, interpretation & applications",
    chips: ["cover", "FTIR"], k: "introduction ftir transmittance wavenumber c=o o-h functional groups" },
  { topic: "ir", n: 2, title: "Basics, Principle & Why We Use It", sub: "IR regions, Hooke's law, vibration types",
    chips: ["Hooke's law", "dipole"], k: "near mid far ir regions principle dipole moment hooke law force constant reduced mass stretching bending scissoring rocking wagging twisting ir active inactive" },
  { topic: "ir", n: 3, title: "Instrumentation, Sampling & Data Collection", sub: "FTIR, ATR, KBr pellets & settings",
    chips: ["ATR-FTIR", "KBr pellet"], k: "dispersive ftir interferometer detector dtgs mct atr experiment transmission cell kbr pellet nujol mull gas cell thin film resolution scans background" },
  { topic: "ir", n: 4, title: "Data Processing & Baseline Correction", sub: "Background, atmospheric correction, smoothing",
    chips: ["baseline", "CO₂/H₂O"], k: "plot ir data background correction baseline atmospheric co2 h2o smoothing savitzky golay normalization peak picking software omnic opus origin mistakes good practice" },
  { topic: "ir", n: 5, title: "Peak Analysis & Interpretation", sub: "Functional-group ranges & band shapes",
    chips: ["group table", "fingerprint"], k: "read ir spectrum band shape intensity strong medium weak broad sharp functional group ranges o-h n-h c-h c≡n c=o c=c c-o no2 fingerprint conjugation hydrogen bonding ring strain troubleshooting report" },
  { topic: "ir", n: 6, title: "Applications, Advantages & Limitations", sub: "When to trust IR, and when to combine it",
    chips: ["polymers", "ATR mapping"], k: "applications structure verification polymer pharmaceuticals coordination biomolecules quantitative advantages limitations water co2 interference microscopy over-interpret" },
  { topic: "ir", n: 7, title: "IR Recap", sub: "Key applications in one page",
    chips: ["recap"], k: "thank you recap functional group identification structure confirmation purity" },
].map((n) => ({
  ...n,
  id: `${n.topic}-${String(n.n).padStart(2, "0")}`,
  src: `notes/${n.topic}/${String(n.n).padStart(2, "0")}.jpg`,
  thumb: `notes/${n.topic}/${String(n.n).padStart(2, "0")}-thumb.jpg`,
}));

/* ---------------- Helpers ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const SUP = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
function sci(x, digits = 3) {
  if (!isFinite(x)) return "–";
  if (x === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -2 && e <= 4) return (+x.toPrecision(digits)).toString();
  const m = x / 10 ** e;
  return `${m.toFixed(digits - 1)} × 10${String(e).split("").map((c) => SUP[c]).join("")}`;
}
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 1800);
}

/* ---------------- Theme ---------------- */
(function theme() {
  const saved = store.get("theme", null);
  const initial = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  document.documentElement.dataset.theme = initial;
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    store.set("theme", next);
  });
})();

/* ---------------- Profile & socials ---------------- */
const ICONS = {
  instagram: ['Instagram', '#e1306c', '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>'],
  linkedin:  ['LinkedIn', '#0a66c2', '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10.5V17M8 7.3v.01M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17"/>'],
  youtube:   ['YouTube', '#ff0033', '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>'],
  x:         ['X (Twitter)', '#111111', '<path d="M4 4h4.5L20 20h-4.5z"/><path d="M19.5 4 13.6 10.6M4.5 20l5.9-6.6"/>'],
  scholar:   ['Google Scholar', '#4285f4', '<path d="M12 3 2 9l10 6 10-6z"/><path d="M6 11.5v4.5c3 3 9 3 12 0v-4.5M22 9v6"/>'],
  email:     ['Email', '#9b5de5', '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>'],
};
(function profile() {
  $("#authorName").textContent = CONFIG.name;
  $("#authorRole").textContent = CONFIG.role;
  $("#authorBio").textContent = CONFIG.bio;
  const html = Object.entries(CONFIG.socials)
    .filter(([k, url]) => url && ICONS[k])
    .map(([k, url]) => {
      const [label, brand, svg] = ICONS[k];
      const ext = !url.startsWith("mailto:");
      return `<a class="social" href="${url}" ${ext ? 'target="_blank" rel="noopener"' : ""} aria-label="${label}" title="${label}" style="--brand:${brand}"><svg viewBox="0 0 24 24">${svg}</svg></a>`;
    }).join("");
  $("#socials").innerHTML = html;
  $("#socials2").innerHTML = html;
  $("#year").textContent = new Date().getFullYear();
})();

/* ---------------- Notes gallery ---------------- */
let filter = "all";
let query = "";
let read = new Set(store.get("readNotes", []));
let visible = [];

function renderNotes() {
  const q = query.trim().toLowerCase();
  const match = (n) =>
    (filter === "all" || n.topic === filter) &&
    (!q || `${n.title} ${n.sub} ${n.chips.join(" ")} ${n.k}`.toLowerCase().includes(q));
  visible = NOTES.filter(match);

  const html = Object.entries(TOPICS).map(([key, t]) => {
    const items = visible.filter((n) => n.topic === key);
    if (!items.length) return "";
    return `
      <div class="group" style="--c:${t.color}">
        <div class="group-head"><span class="sym-chip">${t.sym}</span><h3>${t.label}</h3><span class="muted small">${t.desc}</span><span class="line"></span></div>
        <div class="grid">
          ${items.map((n) => `
            <button class="card ${read.has(n.id) ? "read" : ""}" data-id="${n.id}" style="--c:${t.color}">
              <div class="thumb">
                <span class="page-no">p. ${n.n}/${NOTES.filter((x) => x.topic === key).length}</span>
                <span class="read-badge">✓ read</span>
                <img src="${n.thumb}" alt="${n.title}" loading="lazy" />
              </div>
              <div class="meta">
                <h4>${n.title}</h4>
                <p>${n.sub}</p>
                <div class="chips">${n.chips.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
              </div>
            </button>`).join("")}
        </div>
      </div>`;
  }).join("");
  $("#groups").innerHTML = html;
  $("#empty").hidden = visible.length > 0;
  $("#readCount").textContent = read.size;
  attachTilt();
}

function setFilter(f) {
  filter = f;
  $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.filter === f));
  renderNotes();
}
$$(".tab").forEach((t) => t.addEventListener("click", () => setFilter(t.dataset.filter)));
$$(".element[data-filter]").forEach((el) => el.addEventListener("click", () => {
  setFilter(el.dataset.filter);
  $("#notes").scrollIntoView({ behavior: "smooth" });
}));
$("#search").addEventListener("input", (e) => { query = e.target.value; renderNotes(); });
$("#groups").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) openLightbox(card.dataset.id);
});

function attachTilt() {
  if (matchMedia("(hover: none)").matches) return;
  $$(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });
}

/* ---------------- Lightbox ---------------- */
const lb = $("#lightbox"), lbImg = $("#lbImg"), lbWrap = $("#lbWrap");
let lbList = [], lbIndex = 0, zoom = 1;

function openLightbox(id) {
  lbList = visible.some((n) => n.id === id) ? visible : NOTES;
  lbIndex = Math.max(0, lbList.findIndex((n) => n.id === id));
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  showSlide();
}
function closeLightbox() {
  lb.hidden = true;
  document.body.style.overflow = "";
  history.replaceState(null, "", location.pathname + location.search);
}
function showSlide() {
  const n = lbList[lbIndex];
  const t = TOPICS[n.topic];
  setZoom(1);
  lbImg.style.opacity = 0;
  lbImg.onload = () => (lbImg.style.opacity = 1);
  lbImg.src = n.src;
  lbImg.alt = n.title;
  $("#lbTitle").textContent = n.title;
  const tag = $("#lbTag");
  tag.textContent = t.sym;
  tag.className = "tag " + (n.topic === "fundamentals" ? "" : n.topic);
  $("#lbCount").textContent = `${lbIndex + 1} / ${lbList.length}`;
  $("#lbDownload").href = n.src;
  $("#lbDownload").setAttribute("download", `UrvashiGupta-${n.id}.jpg`);
  $("#lbStrip").innerHTML = lbList.map((x, i) =>
    `<button class="${i === lbIndex ? "on" : ""}" data-i="${i}" aria-label="${x.title}"><img src="${x.thumb}" alt="" loading="lazy"/></button>`).join("");
  $("#lbStrip .on")?.scrollIntoView({ inline: "center", block: "nearest" });
  history.replaceState(null, "", `#note=${n.id}`);
  if (!read.has(n.id)) {
    read.add(n.id);
    store.set("readNotes", [...read]);
    $(`.card[data-id="${n.id}"]`)?.classList.add("read");
    $("#readCount").textContent = read.size;
  }
  // preload neighbours
  [lbIndex - 1, lbIndex + 1].forEach((i) => { const x = lbList[(i + lbList.length) % lbList.length]; if (x) new Image().src = x.src; });
}
function go(d) { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showSlide(); }
function setZoom(z, cx, cy) {
  const prev = zoom;
  zoom = Math.min(3, Math.max(1, z));
  if (zoom === 1) {
    lbWrap.classList.remove("zoomed");
    lbImg.style.width = "";
    return;
  }
  const fitW = Math.min(lbWrap.clientWidth - 16, (lbWrap.clientHeight) * (lbImg.naturalWidth / lbImg.naturalHeight || 0.8));
  const fx = cx ?? 0.5, fy = cy ?? 0.3;
  lbWrap.classList.add("zoomed");
  lbImg.style.width = fitW * zoom + "px";
  if (prev !== zoom) {
    lbWrap.scrollLeft = (lbWrap.scrollWidth - lbWrap.clientWidth) * fx;
    lbWrap.scrollTop = (lbWrap.scrollHeight - lbWrap.clientHeight) * fy;
  }
}

$("#lbClose").onclick = closeLightbox;
$("#lbPrev").onclick = () => go(-1);
$("#lbNext").onclick = () => go(1);
$("#lbZoomIn").onclick = () => setZoom(zoom + 0.75);
$("#lbZoomOut").onclick = () => setZoom(zoom - 0.75);
$("#lbShare").onclick = async () => {
  try { await navigator.clipboard.writeText(location.href); toast("Link copied ✓"); }
  catch { toast("Copy the URL from the address bar"); }
};
$("#lbStrip").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { lbIndex = +b.dataset.i; showSlide(); } });
lb.addEventListener("click", (e) => { if (e.target === lb || e.target.id === "lbStage") closeLightbox(); });

// click to zoom / drag to pan / swipe to navigate
let drag = null, moved = false;
lbWrap.addEventListener("pointerdown", (e) => {
  drag = { x: e.clientX, y: e.clientY, sl: lbWrap.scrollLeft, st: lbWrap.scrollTop }; moved = false;
});
window.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
  if (zoom > 1) { lbWrap.scrollLeft = drag.sl - dx; lbWrap.scrollTop = drag.st - dy; }
});
window.addEventListener("pointerup", (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (zoom === 1 && moved && Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  else if (!moved && e.target === lbImg) {
    const r = lbImg.getBoundingClientRect();
    if (zoom === 1) setZoom(2, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    else setZoom(1);
  } else if (!moved && e.target === lbWrap) closeLightbox();
  drag = null;
});
lbWrap.addEventListener("wheel", (e) => {
  if (!e.ctrlKey) return;
  e.preventDefault();
  setZoom(zoom + (e.deltaY < 0 ? 0.25 : -0.25));
}, { passive: false });

window.addEventListener("keydown", (e) => {
  if (lb.hidden) {
    if (e.key === "/" && document.activeElement !== $("#search")) { e.preventDefault(); $("#search").focus(); }
    return;
  }
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") go(1);
  if (e.key === "ArrowLeft") go(-1);
  if (e.key === "+" || e.key === "=") setZoom(zoom + 0.75);
  if (e.key === "-") setZoom(zoom - 0.75);
});

/* ---------------- EM spectrum explorer ---------------- */
const REGIONS = [
  { name: "Gamma rays", lo: -12, hi: -11, probe: "nuclear transitions" },
  { name: "X-rays", lo: -11, hi: -8, probe: "core electrons (XPS)" },
  { name: "Ultraviolet", lo: -8, hi: Math.log10(4e-7), probe: "electronic transitions (UV-Vis)" },
  { name: "Visible", lo: Math.log10(4e-7), hi: Math.log10(7e-7), probe: "electronic transitions · colour" },
  { name: "Infrared", lo: Math.log10(7e-7), hi: -3, probe: "molecular vibrations (IR, Raman)" },
  { name: "Microwave", lo: -3, hi: -1, probe: "molecular rotations" },
  { name: "Radio", lo: -1, hi: 1, probe: "nuclear spin (NMR)" },
];
const H = 6.626e-34, C = 2.998e8, EV = 1.602e-19;

function wavelengthToRGB(nm) {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else if (nm <= 780) { r = 1; }
  let f = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : nm > 700 ? 0.3 + 0.7 * (780 - nm) / 80 : 1;
  const c = (v) => Math.round(255 * Math.pow(v * f, 0.8));
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}
function fmtLambda(m) {
  const units = [[1e-12, "pm"], [1e-9, "nm"], [1e-6, "µm"], [1e-3, "mm"], [1, "m"]];
  let [div, u] = units[0];
  for (const [d, un] of units) if (m >= d) { div = d; u = un; }
  const v = m / div;
  return `${v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toFixed(2)} ${u}`;
}
let wavePeriod = 60, phase = 0, waveColor = "";
function updateEM() {
  const lg = +$("#emSlider").value;
  const lam = 10 ** lg;
  const nu = C / lam;
  const wn = 0.01 / lam;
  const E = H * nu;
  const i = REGIONS.findIndex((r) => lg >= r.lo && lg < r.hi);
  const reg = REGIONS[i === -1 ? REGIONS.length - 1 : i];
  const idx = REGIONS.indexOf(reg);
  const pos = (idx + (lg - reg.lo) / (reg.hi - reg.lo)) / REGIONS.length;
  $("#emMarker").style.left = `calc(${Math.min(1, Math.max(0, pos)) * 100}% - 1.5px)`;
  $("#emLambda").textContent = fmtLambda(lam);
  $("#emFreq").textContent = sci(nu) + " Hz";
  $("#emWn").textContent = sci(wn) + " cm⁻¹";
  $("#emE").textContent = `${sci(E / EV)} eV`;
  $("#emRegion").textContent = reg.name;
  $("#emProbe").textContent = reg.probe;
  const nm = lam * 1e9;
  const sw = $("#emSwatch");
  if (nm >= 380 && nm <= 780) { waveColor = wavelengthToRGB(nm); sw.style.background = waveColor; }
  else { waveColor = ""; sw.style.background = "repeating-linear-gradient(45deg, var(--surface), var(--surface) 6px, var(--border) 6px, var(--border) 12px)"; }
  $("#wavePath").style.stroke = waveColor || "";
  $("#wavePath").style.filter = waveColor ? `drop-shadow(0 0 6px ${waveColor})` : "";
  wavePeriod = 6 + ((lg + 12) / 13) * 260;
}
function drawWave() {
  phase += 0.04;
  let d = "M0 30";
  for (let x = 0; x <= 600; x += 2) d += ` L${x} ${30 + 22 * Math.sin((x / wavePeriod) * 2 * Math.PI - phase * (60 / wavePeriod + 1))}`;
  $("#wavePath").setAttribute("d", d);
  requestAnimationFrame(drawWave);
}
$("#emSlider").addEventListener("input", updateEM);
updateEM(); drawWave();

/* ---------------- Beer–Lambert ---------------- */
let solve = "A";
const bl = { A: $("#bl-A"), e: $("#bl-e"), b: $("#bl-b"), c: $("#bl-c") };
function updateBL() {
  const v = Object.fromEntries(Object.entries(bl).map(([k, el]) => [k, parseFloat(el.value)]));
  let r;
  if (solve === "A") r = v.e * v.b * v.c;
  if (solve === "e") r = v.A / (v.b * v.c);
  if (solve === "b") r = v.A / (v.e * v.c);
  if (solve === "c") r = v.A / (v.e * v.b);
  const units = { A: "", e: " L mol⁻¹ cm⁻¹", b: " cm", c: " mol L⁻¹" };
  const names = { A: "A", e: "ε", b: "b", c: "c" };
  const ok = isFinite(r) && r >= 0;
  if (ok) bl[solve].value = +r.toPrecision(4);
  $("#blResult").textContent = ok ? `${names[solve]} = ${sci(r, 4)}${units[solve]}` : "Enter positive values";
  const A = solve === "A" ? r : v.A;
  const T = 10 ** -A;
  $("#blT").textContent = isFinite(T) ? `T = ${(T * 100).toFixed(T < 0.01 ? 3 : 1)} % transmitted` : "";
  $("#blWarn").textContent = A > 2 ? "⚠ A > 2: beyond the reliable linear range, so dilute the sample" :
    A > 0 && A < 0.1 ? "⚠ A < 0.1: weak signal (ideal ≈ 0.2–0.8)" : "";
  $("#cuvLiquid").style.opacity = isFinite(A) ? Math.min(1, 0.12 + A / 2) : 0.2;
  $("#beamOut").style.opacity = isFinite(T) ? Math.max(0.1, T) : 1;
}
$$(".solve-for button").forEach((b) => b.addEventListener("click", () => {
  solve = b.dataset.solve;
  $$(".solve-for button").forEach((x) => x.classList.toggle("on", x === b));
  $$(".fields label").forEach((l) => {
    const s = l.dataset.var === solve;
    l.classList.toggle("solved", s);
    l.querySelector("input").readOnly = s;
  });
  updateBL();
}));
Object.values(bl).forEach((el) => el.addEventListener("input", updateBL));
$(".fields label[data-var='A']").classList.add("solved");
bl.A.readOnly = true;
updateBL();

/* ---------------- IR peak finder ---------------- */
const IR = [
  { g: "O–H", lo: 3200, hi: 3600, f: "broad (H-bonding)" },
  { g: "N–H", lo: 3300, hi: 3500, f: "medium" },
  { g: "C–H (sp²)", lo: 3000, hi: 3100, f: "medium" },
  { g: "C–H (sp³)", lo: 2850, hi: 2960, f: "medium–strong" },
  { g: "C≡N", lo: 2220, hi: 2260, f: "sharp" },
  { g: "C≡C", lo: 2100, hi: 2260, f: "weak" },
  { g: "C=O", lo: 1650, hi: 1850, f: "strong, sharp" },
  { g: "C=C", lo: 1600, hi: 1680, f: "variable" },
  { g: "Aromatic C=C", lo: 1570, hi: 1630, f: "~1600" },
  { g: "Aromatic C=C", lo: 1470, hi: 1530, f: "~1500" },
  { g: "NO₂", lo: 1520, hi: 1580, f: "~1550 (asym.)" },
  { g: "NO₂", lo: 1320, hi: 1380, f: "~1350 (sym.)" },
  { g: "C–O", lo: 1000, hi: 1300, f: "strong" },
  { g: "Fingerprint", lo: 400, hi: 1500, f: "unique pattern" },
];
const ARTIFACTS = [
  { g: "CO₂ (artifact)", lo: 2330, hi: 2370, f: "atmospheric, so correct it" },
  { g: "CO₂ (artifact)", lo: 655, hi: 685, f: "atmospheric bend" },
  { g: "H₂O (artifact)", lo: 1610, hi: 1650, f: "water vapour" },
  { g: "H₂O (artifact)", lo: 3620, hi: 3680, f: "water vapour" },
];
const DIPS = [[3350, 230, 0.55], [2925, 35, 0.35], [2860, 25, 0.25], [2240, 12, 0.3], [1715, 18, 0.75], [1640, 15, 0.25], [1600, 8, 0.2], [1500, 8, 0.18], [1450, 12, 0.3], [1375, 8, 0.2], [1240, 20, 0.35], [1100, 25, 0.5], [880, 10, 0.2], [750, 12, 0.3]];
const xOf = (wn) => ((4000 - wn) / 3600) * 400;
function irTrace() {
  let d = "";
  for (let wn = 4000; wn >= 400; wn -= 4) {
    let t = 0.92;
    for (const [c, w, depth] of DIPS) t -= depth * Math.exp(-((wn - c) ** 2) / (2 * w * w));
    d += `${d ? "L" : "M"}${xOf(wn).toFixed(1)} ${(10 + (1 - t) * 85).toFixed(1)} `;
  }
  return d;
}
const TRACE = irTrace();
function updateIR(v) {
  v = Math.min(4000, Math.max(400, +v || 400));
  $("#irSlider").value = v; $("#irNum").value = v;
  const hits = IR.filter((r) => v >= r.lo && v <= r.hi);
  const arts = ARTIFACTS.filter((r) => v >= r.lo && v <= r.hi);
  const bands = [...hits, ...arts].filter((r) => r.g !== "Fingerprint" || hits.length === 1)
    .map((r) => `<rect class="band" x="${xOf(r.hi)}" y="0" width="${xOf(r.lo) - xOf(r.hi)}" height="110"/>`).join("");
  const ticks = [4000, 3000, 2000, 1500, 1000, 500].map((t) => `<text class="axis-t" x="${xOf(t) + (t === 4000 ? 2 : -10)}" y="106">${t}</text>`).join("");
  $("#irSpec").innerHTML = `${bands}<path class="trace" d="${TRACE}"/><line class="cursor" x1="${xOf(v)}" x2="${xOf(v)}" y1="0" y2="110"/>${ticks}`;
  const li = (r, cls = "") => `<li class="${cls}"><b>${r.g}</b><span>${r.f}</span><em>${r.lo}–${r.hi}</em></li>`;
  $("#irMatches").innerHTML = hits.length || arts.length
    ? hits.map((r) => li(r)).join("") + arts.map((r) => li(r, "artifact")).join("")
    : `<li class="none">No common functional group here. Try 1715 (C=O) or 3400 (O–H).</li>`;
}
$("#irSlider").addEventListener("input", (e) => updateIR(e.target.value));
$("#irNum").addEventListener("change", (e) => updateIR(e.target.value));
$("#irSpec").addEventListener("click", (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  updateIR(Math.round((4000 - ((e.clientX - r.left) / r.width) * 3600) / 5) * 5);
});
updateIR(1715);

/* ---------------- Molecule background ---------------- */
(function molecules() {
  const cv = $("#molecules"), ctx = cv.getContext("2d");
  let W, H2, atoms = [], mouse = { x: -999, y: -999 };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function resize() {
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = cv.width = innerWidth * dpr; H2 = cv.height = innerHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const n = Math.round(Math.min(70, (innerWidth * innerHeight) / 22000));
    atoms = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H2,
      vx: (Math.random() - 0.5) * 0.35 * dpr, vy: (Math.random() - 0.5) * 0.35 * dpr,
      r: (1.5 + Math.random() * 2.5) * dpr, dot: Math.random() < 0.35,
    }));
    cv._dpr = dpr;
  }
  function frame() {
    const s = getComputedStyle(document.documentElement);
    const line = s.getPropertyValue("--mol-line").trim(), dot = s.getPropertyValue("--mol-dot").trim();
    const dpr = cv._dpr, maxD = 130 * dpr;
    ctx.clearRect(0, 0, W, H2);
    for (const a of atoms) {
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H2) a.vy *= -1;
      const dx = mouse.x * dpr - a.x, dy = mouse.y * dpr - a.y, d = Math.hypot(dx, dy);
      if (d < 160 * dpr) { a.x -= dx * 0.004; a.y -= dy * 0.004; }
    }
    for (let i = 0; i < atoms.length; i++) for (let j = i + 1; j < atoms.length; j++) {
      const a = atoms[i], b = atoms[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < maxD) {
        const o = (1 - d / maxD) * 0.55;
        ctx.strokeStyle = `rgba(${line},${o})`; ctx.lineWidth = dpr;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        if (d < maxD * 0.35 && (i + j) % 3 === 0) { // double bond
          const nx = -(b.y - a.y) / d * 3 * dpr, ny = (b.x - a.x) / d * 3 * dpr;
          ctx.beginPath(); ctx.moveTo(a.x + nx, a.y + ny); ctx.lineTo(b.x + nx, b.y + ny); ctx.stroke();
        }
      }
    }
    for (const a of atoms) {
      ctx.fillStyle = a.dot ? `rgba(${dot},.9)` : `rgba(${line},.9)`;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  addEventListener("resize", resize);
  addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize(); frame();
})();

/* ---------------- Reveal + counters ---------------- */
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (!en.isIntersecting) return;
  en.target.classList.add("in");
  $$("[data-count]", en.target).forEach((el) => {
    const end = +el.dataset.count; let cur = 0;
    const step = () => { cur = Math.min(end, cur + Math.ceil(end / 20)); el.textContent = cur; if (cur < end) requestAnimationFrame(step); };
    step();
  });
  io.unobserve(en.target);
}), { threshold: 0.12 });
$$(".reveal").forEach((el) => io.observe(el));

/* ---------------- Init ---------------- */
renderNotes();
const m = location.hash.match(/note=([\w-]+)/);
if (m && NOTES.some((n) => n.id === m[1])) openLightbox(m[1]);
