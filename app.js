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

/* ---------------- Page context ----------------
   Every page sets <body data-page="home|fundamentals|uv|ir|nmr|quiz" data-base="">.
   data-base is the relative path back to the site root ("" on the home page, "../" in a topic folder). */
const PAGE = document.body.dataset.page || "home";
const BASE = document.body.dataset.base || "";
const on = (sel, fn) => { if (document.querySelector(sel)) fn(); };

/* ---------------- Notes data ---------------- */
// slug = the page folder; tools = what that page's Mini Lab contains (shown on the home page).
const TOPICS = {
  fundamentals: { label: "Fundamentals of Spectroscopy", short: "Fundamentals", sym: "hν", slug: "fundamentals", color: "var(--c-fund)",
    desc: "Series 01 · the language of light and matter", sub: "EMR · transitions · techniques",
    tools: ["EM spectrum explorer"] },
  uv: { label: "UV-Vis Spectroscopy", short: "UV-Vis", sym: "UV", slug: "uv-vis", color: "var(--c-uv)",
    desc: "Series 02 · electronic transitions, from basics to advanced", sub: "electronic transitions · λmax",
    tools: ["Beer–Lambert calculator", "Calibration curve builder"] },
  ir: { label: "IR Spectroscopy", short: "IR", sym: "IR", slug: "ir", color: "var(--c-ir)",
    desc: "Series 03 · molecular vibrations and functional groups", sub: "vibrations · functional groups",
    tools: ["IR peak finder", "Hooke's law calculator"] },
  raman: { label: "Raman Spectroscopy", short: "Raman", sym: "RAMAN", slug: "raman", color: "var(--c-raman)",
    desc: "Series 04 · inelastic light scattering and vibrational fingerprints", sub: "Stokes · anti-Stokes · selection rules",
    tools: ["Raman shift calculator", "IR vs Raman activity"] },
  nmr: { label: "NMR Spectroscopy", short: "NMR", sym: "NMR", slug: "nmr", color: "var(--c-nmr)",
    desc: "Series 05 · 1D ¹H & ¹³C NMR, from basics to advanced", sub: "¹H · ¹³C · splitting · DEPT",
    tools: ["Chemical shift explorer", "Splitting simulator", "DBE calculator", "¹³C & DEPT viewer"] },
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

  { topic: "nmr", n: 1, title: "NMR: From Basics to Advanced", sub: "1D ¹H & ¹³C NMR: what the series covers",
    chips: ["cover", "¹H & ¹³C"], k: "nuclear magnetic resonance introduction radiofrequency rf nuclear spin acetone 1h 13c principle chemical shift splitting integration dbe interpretation applications" },
  { topic: "nmr", n: 2, title: "Principle of NMR Spectroscopy", sub: "Spin states, Larmor frequency, instrument & relaxation",
    chips: ["ΔE = γħB₀", "T₁ / T₂"], k: "basics principle instrumentation spin non-zero magnetic field key equations gyromagnetic ratio larmor resonance condition spin states m +1/2 -1/2 magnet rf transmitter receiver detector relaxation t1 spin-lattice t2 spin-spin deuterated solvents cdcl3 lock" },
  { topic: "nmr", n: 3, title: "Chemical Shift, Shielding & Deshielding", sub: "δ scale, TMS reference & factors affecting shift",
    chips: ["δ (ppm)", "TMS", "upfield"], k: "chemical shift formula ppm tms tetramethylsilane reference shielding deshielding electron density upfield downfield 1h shift scale ranges alkyl allylic benzylic vinylic aromatic aldehyde carboxylic acid electronegativity anisotropy hybridization hydrogen bonding solvent effects ethane methoxy" },
  { topic: "nmr", n: 4, title: "¹H NMR Essentials", sub: "Signals, equivalence, integration & D₂O exchange",
    chips: ["integration", "D₂O exchange"], k: "1h proton number of signals equivalent non-equivalent protons ethanol isopropyl integration area exchangeable protons oh nh broad d2o exchange deuterium deuterated solvents cdcl3 dmso cd3od tms toluene" },
  { topic: "nmr", n: 5, title: "Spin–Spin Splitting & Coupling", sub: "Multiplicity, n+1 rule, Pascal's triangle & J",
    chips: ["n + 1 rule", "J (Hz)", "Pascal"], k: "spin spin splitting coupling multiplicity n+1 rule singlet doublet triplet quartet multiplet pascal triangle intensities coupling constant j hertz vicinal geminal long-range ethyl group complex multiplets doublet of doublets dd" },
  { topic: "nmr", n: 6, title: "Degree of Unsaturation (DBE)", sub: "Double-bond equivalents: rings & π bonds",
    chips: ["DBE", "rings + π"], k: "degree of unsaturation double bond equivalent dbe formula 2c+2+n-h-x halogen oxygen sulfur ignored ring triple bond benzene c6h6 c5h10o cyclopentanone structure elucidation" },
  { topic: "nmr", n: 7, title: "Worked ¹H NMR Example", sub: "Step-by-step: ethyl acetate",
    chips: ["ethyl acetate", "worked"], k: "worked example ethyl acetate c4h8o2 dbe calculation spectrum signal assignment quartet singlet triplet integration 3h 2h 3h multiplicity reasoning workflow och2 ch3co" },
  { topic: "nmr", n: 8, title: "¹³C NMR Fundamentals", sub: "Carbon environments, decoupling & what ¹³C tells us",
    chips: ["0–220 ppm", "decoupling", "NOE"], k: "13c carbon nmr unique carbon environment signal shift range 0-220 proton decoupled singlets peak areas not quantitative noe nuclear overhauser relaxation acetone symmetry comparison structure elucidation" },
  { topic: "nmr", n: 9, title: "¹³C Shift Ranges & DEPT", sub: "Classifying carbons with DEPT-45/90/135",
    chips: ["DEPT-135", "quaternary"], k: "13c chemical shift ranges alkyl heteroatom alkyne alkene aromatic carbonyl ester acid amide aldehyde ketone dept dept-45 dept-90 dept-135 ch ch2 ch3 methine methylene methyl quaternary carbon positive negative absent carbon multiplicity" },
  { topic: "nmr", n: 10, title: "NMR Recap", sub: "Key topics of the series in one page",
    chips: ["recap"], k: "thank you recap principle chemical shift integration splitting j dbe 1h interpretation 13c dept" },
  { topic: "nmr", n: 11, title: "NMR Interpretation Cheat Sheet", sub: "From spectrum to structure, all on one page",
    chips: ["cheat sheet", "structure"], k: "nmr interpretation spectrum to structure chemical shift table integration splitting multiplicity quintet coupling constant 13c key points dept experiments dbe structure elucidation stepwise example ethyl acetate 400 mhz" },

  { topic: "raman", n: 1, title: "Raman: From Basics to Advanced", sub: "Principle, instrumentation, analysis & applications",
    chips: ["cover", "fingerprint"], k: "raman spectroscopy introduction vibrational inelastic scattering molecular fingerprint anti-stokes rayleigh stokes spectrum 520 1332 1580 vibrational modes phase crystallinity" },
  { topic: "raman", n: 2, title: "History, Definition & Principle", sub: "C. V. Raman, the Raman effect & polarizability",
    chips: ["1928", "μ = αE"], k: "history discovery c v raman k s krishnan 1928 nobel prize 1930 definition laser monochromatic raman effect rayleigh elastic inelastic induced dipole polarizability alpha why we use raman non-destructive complementary ir" },
  { topic: "raman", n: 3, title: "Rayleigh, Stokes & Anti-Stokes Scattering", sub: "Energy-level diagram & why Stokes is stronger",
    chips: ["Stokes", "virtual state"], k: "rayleigh stokes anti-stokes scattering incident light energy level diagram virtual state typical spectrum why stokes stronger boltzmann population temperature" },
  { topic: "raman", n: 4, title: "Raman Shift, Formulas & Worked Example", sub: "Δν̃, wavelengths and the intensity ratio",
    chips: ["Δν̃ (cm⁻¹)", "I(AS)/I(S)"], k: "raman shift formula wavenumber stokes line anti-stokes line wavelength formulas worked example 532 nm 1000 cm-1 561.9 505.1 intensity ratio temperature estimation vibrational population key formula tips" },
  { topic: "raman", n: 5, title: "Selection Rules & Raman vs IR", sub: "Polarizability, mutual exclusion, CO₂ and O₂/N₂",
    chips: ["dα/dQ ≠ 0", "mutual exclusion"], k: "selection rules raman ir polarizability dipole moment physical meaning mutual exclusion centrosymmetric co2 symmetric stretch asymmetric bend o2 n2 homonuclear diatomic complementary aqueous samples water" },
  { topic: "raman", n: 6, title: "Instrumentation, Lasers & Setup", sub: "Spectrometer parts, lasers, good practice",
    chips: ["532/633/785 nm", "notch filter"], k: "instrumentation laser source sample microscope optics notch edge filter spectrograph monochromator ccd detector common lasers 532 633 785 fluorescence sample types working flow experimental steps good practice calibrate silicon 520.7 common problems sample burning cosmic ray spikes micro-raman confocal mapping" },
  { topic: "raman", n: 7, title: "Spectrum Interpretation & Peak Assignment", sub: "Position, intensity, width & typical regions",
    chips: ["D & G bands", "FWHM"], k: "spectrum interpretation peak assignment axes peak position intensity resonance enhancement peak width fwhm baseline fluorescence typical regions fingerprint c-h stretching lattice metal-ligand aromatic ring c=c carbon d band 1350 g band 1580" },
  { topic: "raman", n: 8, title: "Data Processing, Plotting & Peak Fitting", sub: "Cosmic rays, baseline, smoothing & fitting",
    chips: ["baseline", "Voigt fit"], k: "data processing raw data pre-processing cosmic rays baseline correction polynomial als fluorescence subtraction smoothing savitzky golay normalization peak fitting gaussian lorentzian voigt how to plot raw vs corrected fitted overlapping peaks useful plots mapping common mistakes" },
  { topic: "raman", n: 9, title: "Advanced Techniques & Applications", sub: "SERS, resonance Raman, FT-Raman, TERS, CARS",
    chips: ["SERS", "TERS", "CARS"], k: "advanced techniques sers surface enhanced au ag resonance raman ft-raman 1064 nm confocal micro-raman ters tip enhanced cars coherent anti-stokes applications pharmaceuticals polymers nanomaterials semiconductors carbon graphene cnt organometallics biological mapping" },
  { topic: "raman", n: 10, title: "Raman Recap", sub: "Key applications in one page",
    chips: ["recap"], k: "thank you recap raman spectroscopy key applications material identification reaction monitoring phase crystallinity carbon d g 2d band" },
  { topic: "raman", n: 11, title: "Bonus: O, P, Q, R & S Branches", sub: "Rotational–vibrational fine structure",
    chips: ["bonus", "ΔJ = ±2"], k: "bonus rotational vibrational branches o p q r s selection rules delta j raman infrared energy level rigid rotor rotational constant b band origin numerical example" },
].map((n) => ({
  ...n,
  id: `${n.topic}-${String(n.n).padStart(2, "0")}`,
  src: `${BASE}notes/${n.topic}/${String(n.n).padStart(2, "0")}.jpg`,
  thumb: `${BASE}notes/${n.topic}/${String(n.n).padStart(2, "0")}-thumb.jpg`,
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

/* ---------------- Shared header, footer & lightbox ---------------- */
const FLASK = `<svg viewBox="0 0 64 64" class="brand-flask" aria-hidden="true"><path d="M24 6h16v4h-3v14l15 26a6 6 0 0 1-5 9H17a6 6 0 0 1-5-9l15-26V10h-3z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/><path d="M18 44h28l5 8a3 3 0 0 1-3 4H16a3 3 0 0 1-3-4z" class="liquid"/><circle cx="28" cy="38" r="2.4" class="bubble b1"/><circle cx="35" cy="32" r="1.8" class="bubble b2"/></svg>`;
const HOME = BASE || "./";
(function chrome() {
  const links = Object.entries(TOPICS).map(([k, t]) =>
    `<a href="${BASE}${t.slug}/" class="${PAGE === k ? "active" : ""}" style="--c:${t.color}">${t.short}</a>`).join("");
  const nav = $("#nav");
  if (nav) nav.innerHTML = `
    <a href="${HOME}" class="brand">${FLASK}<span>Urvashi <b>Gupta</b></span></a>
    <nav class="nav-links" aria-label="Topics">${links}</nav>
    <button id="themeToggle" class="icon-btn" aria-label="Toggle light/dark theme" title="Toggle theme">
      <svg viewBox="0 0 24 24" class="i-sun"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      <svg viewBox="0 0 24 24" class="i-moon"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>
    </button>`;
  const foot = $("#footer");
  if (foot) foot.innerHTML = `
    <nav class="foot-links"><a href="${HOME}">Home</a>${Object.values(TOPICS).map((t) => `<a href="${BASE}${t.slug}/">${t.short}</a>`).join("")}</nav>
    <p>© ${new Date().getFullYear()} Urvashi Gupta · Made with <span class="spectrum-text">hν</span> and curiosity.</p>`;
  if ($("#groups")) document.body.insertAdjacentHTML("beforeend", `
  <div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true" aria-label="Note viewer">
    <div class="lb-top">
      <div class="lb-title"><span class="tag" id="lbTag"></span><b id="lbTitle"></b><span class="muted" id="lbCount"></span></div>
      <div class="lb-actions">
        <button class="icon-btn" id="lbZoomOut" title="Zoom out" aria-label="Zoom out"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M8 11h6M20 20l-3.5-3.5"/></svg></button>
        <button class="icon-btn" id="lbZoomIn" title="Zoom in" aria-label="Zoom in"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M8 11h6M11 8v6M20 20l-3.5-3.5"/></svg></button>
        <a class="icon-btn" id="lbDownload" title="Download" aria-label="Download" download><svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg></a>
        <button class="icon-btn" id="lbShare" title="Copy link" aria-label="Copy link"><svg viewBox="0 0 24 24"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg></button>
        <button class="icon-btn" id="lbClose" title="Close (Esc)" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </div>
    </div>
    <div class="lb-stage" id="lbStage">
      <button class="lb-nav prev" id="lbPrev" aria-label="Previous page"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
      <div class="lb-img-wrap" id="lbWrap"><img id="lbImg" alt="" draggable="false" /></div>
      <button class="lb-nav next" id="lbNext" aria-label="Next page"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
    </div>
    <div class="lb-strip" id="lbStrip"></div>
  </div>`);
  if (!$("#toast")) document.body.insertAdjacentHTML("beforeend", `<div class="toast" id="toast"></div>`);
})();
let read = new Set(store.get("readNotes", []));

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
  if ($("#authorName")) {
    $("#authorName").textContent = CONFIG.name;
    $("#authorRole").textContent = CONFIG.role;
    $("#authorBio").textContent = CONFIG.bio;
  }
  const html = Object.entries(CONFIG.socials)
    .filter(([k, url]) => url && ICONS[k])
    .map(([k, url]) => {
      const [label, brand, svg] = ICONS[k];
      const ext = !url.startsWith("mailto:");
      return `<a class="social" href="${url}" ${ext ? 'target="_blank" rel="noopener"' : ""} aria-label="${label}" title="${label}" style="--brand:${brand}"><svg viewBox="0 0 24 24">${svg}</svg></a>`;
    }).join("");
  $$(".socials").forEach((el) => (el.innerHTML = html));
})();

/* ---------------- Notes gallery + lightbox ---------------- */
on("#groups", () => {
  const filter = TOPICS[PAGE] ? PAGE : "all";
  let query = "";
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
    attachTilt();
  }

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
    $("#lbTitle").textContent = `p. ${n.n} · ${n.title}`;
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


  renderNotes();
  const m = location.hash.match(/note=([\w-]+)/);
  if (m && NOTES.some((n) => n.id === m[1])) openLightbox(m[1]);
});

/* ---------------- EM spectrum explorer ---------------- */
on("#emSlider", () => {
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
});

/* ---------------- Beer–Lambert ---------------- */
on("#bl-A", () => {
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
});

/* ---------------- IR data ---------------- */
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
/* ---------------- IR peak finder ---------------- */
on("#irSlider", () => {
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
});

/* ---------------- UV-Vis: calibration curve ---------------- */
on("#calRows", () => {
  let calData = [[0, 0.002], [0.2, 0.131], [0.4, 0.262], [0.6, 0.385], [0.8, 0.521], [1.0, 0.648]];
  function renderCalRows() {
    $("#calRows").innerHTML = calData.map(([c, a], i) => `
      <div class="cal-row" data-i="${i}">
        <input type="number" step="any" data-k="0" value="${c}" aria-label="Concentration ${i + 1}" />
        <input type="number" step="any" data-k="1" value="${a}" aria-label="Absorbance ${i + 1}" />
        <button class="x-btn" data-del="${i}" aria-label="Remove standard" title="Remove">×</button>
      </div>`).join("");
  }
  function updateCal() {
    const pts = calData.filter(([c, a]) => isFinite(c) && isFinite(a));
    const n = pts.length;
    const svg = $("#calPlot");
    const W = 320, Hh = 170, L = 34, B = 22, T = 10, R = 10;
    if (n < 2) {
      svg.innerHTML = `<text class="axis-t" x="160" y="85" text-anchor="middle">Add at least two standards</text>`;
      ["#calFit", "#calR2", "#calC"].forEach((s) => ($(s).textContent = "–"));
      $("#calWarn").textContent = ""; return;
    }
    const mx = pts.reduce((s, p) => s + p[0], 0) / n, my = pts.reduce((s, p) => s + p[1], 0) / n;
    const sxx = pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0), sxy = pts.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0);
    const syy = pts.reduce((s, p) => s + (p[1] - my) ** 2, 0);
    const m = sxy / sxx, b = my - m * mx;
    const r2 = syy ? (sxy * sxy) / (sxx * syy) : 1;
    const Au = parseFloat($("#calUnknown").value);
    const cu = (Au - b) / m;
    const xmax = Math.max(...pts.map((p) => p[0]), isFinite(cu) ? cu : 0) * 1.1 || 1;
    const ymax = Math.max(...pts.map((p) => p[1]), isFinite(Au) ? Au : 0) * 1.15 || 1;
    const X = (x) => L + (x / xmax) * (W - L - R), Y = (y) => Hh - B - (y / ymax) * (Hh - B - T);
    let g = `<line class="ax" x1="${L}" y1="${Hh - B}" x2="${W - R}" y2="${Hh - B}"/><line class="ax" x1="${L}" y1="${T}" x2="${L}" y2="${Hh - B}"/>`;
    g += `<text class="axis-t" x="${W - R}" y="${Hh - 6}" text-anchor="end">c (mM)</text><text class="axis-t" x="${L - 4}" y="${T + 6}" text-anchor="end">A</text>`;
    g += `<text class="axis-t" x="${L - 4}" y="${Hh - B + 3}" text-anchor="end">0</text><text class="axis-t" x="${L - 4}" y="${Y(ymax / 1.15) + 3}" text-anchor="end">${(ymax / 1.15).toFixed(2)}</text>`;
    g += `<line class="fit" x1="${X(0)}" y1="${Y(Math.max(0, b))}" x2="${X(xmax)}" y2="${Y(m * xmax + b)}"/>`;
    if (isFinite(cu) && cu >= 0) g += `<path class="guide" d="M${L} ${Y(Au)} H${X(cu)} V${Hh - B}"/><circle class="unk" cx="${X(cu)}" cy="${Y(Au)}" r="5"/>`;
    g += pts.map((p) => `<circle class="pt" cx="${X(p[0])}" cy="${Y(p[1])}" r="4"/>`).join("");
    svg.innerHTML = g;
    $("#calFit").textContent = `A = ${m.toFixed(3)}c ${b < 0 ? "−" : "+"} ${Math.abs(b).toFixed(3)}`;
    $("#calR2").textContent = r2.toFixed(4);
    $("#calC").textContent = isFinite(cu) ? `${cu.toFixed(3)} mM` : "–";
    const lo = Math.min(...pts.map((p) => p[1])), hi = Math.max(...pts.map((p) => p[1]));
    $("#calWarn").textContent = r2 < 0.99 ? "⚠ R² < 0.99: check for an outlier or non-linearity (high A)." :
      Au > hi || Au < lo ? "⚠ Unknown lies outside the standards: you're extrapolating, so dilute or add standards." :
      hi > 1.5 ? "⚠ Some standards have A > 1.5, where Beer–Lambert may deviate." : "";
  }
  $("#calRows").addEventListener("input", (e) => {
    const row = e.target.closest(".cal-row"); if (!row) return;
    calData[+row.dataset.i][+e.target.dataset.k] = parseFloat(e.target.value);
    updateCal();
  });
  $("#calRows").addEventListener("click", (e) => {
    const d = e.target.dataset.del; if (d === undefined) return;
    calData.splice(+d, 1); renderCalRows(); updateCal();
  });
  $("#calAdd").addEventListener("click", () => {
    const last = calData[calData.length - 1] || [0, 0];
    calData.push([+(last[0] + 0.2).toFixed(3), +(last[1] + 0.13).toFixed(3)]);
    renderCalRows(); updateCal();
  });
  $("#calUnknown").addEventListener("input", updateCal);
  renderCalRows(); updateCal();
});

/* ---------------- IR: Hooke's law ---------------- */
on("#hookA", () => {
  const ATOMS = { H: 1.008, D: 2.014, C: 12.011, N: 14.007, O: 15.999, F: 18.998, S: 32.06, Cl: 35.45, Br: 79.9 };
  const BONDS = [
    ["C–H", "C", "H", 500], ["C–D", "C", "D", 500], ["O–H", "O", "H", 760], ["N–H", "N", "H", 640],
    ["C–C", "C", "C", 450], ["C=C", "C", "C", 960], ["C≡C", "C", "C", 1560], ["C–O", "C", "O", 500],
    ["C=O", "C", "O", 1200], ["C≡N", "C", "N", 1750], ["C–Cl", "C", "Cl", 340],
  ];
  const AMU = 1.66054e-27, C_CM = 2.998e10;
  let hookOrder = 1, hookPhase = 0, hookWnVal = 1700;
  $("#hookA").innerHTML = $("#hookB").innerHTML = Object.keys(ATOMS).map((a) => `<option>${a}</option>`).join("");
  $("#hookPresets").innerHTML = BONDS.map((b, i) => `<button class="pill" data-i="${i}">${b[0]}</button>`).join("");
  function setBond(i) {
    const [, a, b, k] = BONDS[i];
    $("#hookA").value = a; $("#hookB").value = b; $("#hookK").value = k;
    hookOrder = BONDS[i][0].includes("≡") ? 3 : BONDS[i][0].includes("=") ? 2 : 1;
    $$("#hookPresets .pill").forEach((p) => p.classList.toggle("on", +p.dataset.i === i));
    updateHook();
  }
  function updateHook(fromUser) {
    if (fromUser) $$("#hookPresets .pill").forEach((p) => p.classList.remove("on"));
    const m1 = ATOMS[$("#hookA").value], m2 = ATOMS[$("#hookB").value], k = +$("#hookK").value;
    const mu = (m1 * m2) / (m1 + m2);
    const wn = Math.sqrt(k / (mu * AMU)) / (2 * Math.PI * C_CM);
    hookWnVal = wn;
    $("#hookKv").textContent = k;
    $("#hookMu").textContent = `${mu.toFixed(3)} u`;
    $("#hookWn").textContent = `${Math.round(wn)} cm⁻¹`;
    const hits = IR.filter((r) => wn >= r.lo && wn <= r.hi && r.g !== "Fingerprint");
    $("#hookRegion").textContent = hits.length ? hits.map((h) => h.g).filter((v, i, a) => a.indexOf(v) === i).join(", ") :
      wn < 1500 ? "fingerprint region" : wn > 3700 ? "above common bands" : "no common group";
    const ref = Math.sqrt(500 / ((12.011 * 1.008) / 13.019 * AMU)) / (2 * Math.PI * C_CM);
    $("#hookNote").innerHTML = `Heavier atoms → larger μ → <b>lower</b> ν̃. Stiffer (multiple) bonds → larger k → <b>higher</b> ν̃. This bond vibrates at <b>${(wn / ref).toFixed(2)}×</b> the C–H frequency.`;
  }
  function drawSpring() {
    hookPhase += 0.02 + hookWnVal / 40000;
    const m1 = ATOMS[$("#hookA").value], m2 = ATOMS[$("#hookB").value];
    const r1 = 7 + Math.cbrt(m1) * 3.2, r2 = 7 + Math.cbrt(m2) * 3.2;
    const amp = 10 * (m2 / (m1 + m2)), amp2 = 10 * (m1 / (m1 + m2));
    const s = Math.sin(hookPhase * 6);
    const x1 = 60 - amp * s, x2 = 240 + amp2 * s;
    const coils = 6 + Math.round((+$("#hookK").value) / 220);
    let d = "";
    for (let o = 0; o < hookOrder; o++) {
      const off = (o - (hookOrder - 1) / 2) * 7;
      d += `M${x1 + r1} ${30 + off}`;
      const a = x1 + r1 + 6, bb = x2 - r2 - 6, step = (bb - a) / coils;
      d += ` L${a} ${30 + off}`;
      for (let i = 0; i < coils; i++) d += ` L${a + step * (i + 0.5)} ${30 + off + (i % 2 ? 6 : -6)}`;
      d += ` L${bb} ${30 + off} L${x2 - r2} ${30 + off} `;
    }
    $("#spring").innerHTML = `<path class="coil" d="${d}"/><circle class="atom a1" cx="${x1}" cy="30" r="${r1}"/><text x="${x1}" y="34" text-anchor="middle">${$("#hookA").value}</text><circle class="atom a2" cx="${x2}" cy="30" r="${r2}"/><text x="${x2}" y="34" text-anchor="middle">${$("#hookB").value}</text>`;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(drawSpring);
  }
  $("#hookPresets").addEventListener("click", (e) => { const b = e.target.closest(".pill"); if (b) setBond(+b.dataset.i); });
  ["#hookA", "#hookB"].forEach((s) => $(s).addEventListener("change", () => updateHook(true)));
  $("#hookK").addEventListener("input", () => updateHook(true));
  setBond(8); drawSpring();
});

/* ---------------- NMR: chemical shift explorer ---------------- */
on("#shiftRuler", () => {
  const SHIFTS = {
    H: { max: 13, step: 0.05, unit: "ppm", ranges: [
      { g: "TMS reference", lo: 0, hi: 0.1, f: "Si(CH₃)₄, δ = 0 by definition" },
      { g: "Alkyl (sp³ C–H)", lo: 0.8, hi: 1.5, f: "e.g. ethane CH₃ ≈ 0.9" },
      { g: "O–H / N–H", lo: 1, hi: 5, f: "variable, broad, vanishes with D₂O", ex: true },
      { g: "Allylic / benzylic", lo: 1.6, hi: 2.5, f: "e.g. toluene CH₃ ≈ 2.3" },
      { g: "α to C=O", lo: 2.1, hi: 2.7, f: "–CH₂–C=O, CH₃CO– ≈ 2.0–2.1" },
      { g: "C–O / C–X (Cl, Br, I)", lo: 3, hi: 4.5, f: "e.g. –OCH₃ ≈ 3.3, –OCH₂– ≈ 4.1" },
      { g: "Vinylic (C=CH)", lo: 4.5, hi: 6.5, f: "alkene protons" },
      { g: "Aromatic (Ar–H)", lo: 6.5, hi: 8.5, f: "ring-current deshielding (anisotropy)" },
      { g: "Aldehyde (–CHO)", lo: 9, hi: 10, f: "strongly deshielded by C=O" },
      { g: "Carboxylic acid (–COOH)", lo: 10, hi: 13, f: "broad, H-bonded" },
    ] },
    C: { max: 220, step: 1, unit: "ppm", ranges: [
      { g: "Alkyl (sp³ C)", lo: 0, hi: 50, f: "CH₃, CH₂, CH, C" },
      { g: "C–O, C–N, C–X", lo: 50, hi: 90, f: "carbon on a heteroatom, e.g. –OCH₂– ≈ 60" },
      { g: "Alkyne (C≡C)", lo: 65, hi: 90, f: "sp carbons" },
      { g: "Alkene / aromatic (sp²)", lo: 100, hi: 160, f: "benzene ≈ 128" },
      { g: "Ester / acid / amide C=O", lo: 160, hi: 220, f: "e.g. ethyl acetate C=O ≈ 170" },
      { g: "Aldehyde / ketone C=O", lo: 190, hi: 220, f: "e.g. acetone C=O ≈ 206" },
    ] },
  };
  let nuc = "H";
  const SHIFT_COLORS = ["#9aa3c2", "#b388ff", "#f4c95d", "#00f5d4", "#ff6b9a", "#c4f36b", "#60a5fa", "#fb923c", "#f472b6", "#a78bfa"];
  function shiftLanes(ranges) {
    const lanes = [];
    return ranges.map((r) => {
      let l = lanes.findIndex((end) => r.lo >= end);
      if (l === -1) { lanes.push(0); l = lanes.length - 1; }
      lanes[l] = r.hi;
      return l;
    });
  }
  function updateShift() {
    const S = SHIFTS[nuc], d = +$("#shiftSlider").value;
    const W = 800, L = 10, R = 10;
    const X = (v) => L + ((S.max - v) / S.max) * (W - L - R);
    const lanes = shiftLanes(S.ranges), nl = Math.max(...lanes) + 1, lh = Math.min(22, 72 / nl - 3);
    let g = S.ranges.map((r, i) => {
      const on = d >= r.lo && d <= r.hi;
      const w = Math.max(3, X(r.lo) - X(r.hi));
      return `<g class="sr ${on ? "on" : ""}" style="--sc:${SHIFT_COLORS[i % SHIFT_COLORS.length]}"><rect x="${X(r.hi)}" y="${20 + lanes[i] * (lh + 3)}" width="${w}" height="${lh}" rx="4"/>${w > 60 ? `<text x="${X(r.hi) + 5}" y="${20 + lanes[i] * (lh + 3) + lh / 2 + 4}">${r.g}</text>` : ""}</g>`;
    }).join("");
    const step = nuc === "H" ? 1 : 20;
    for (let t = 0; t <= S.max; t += step) g += `<line class="tick" x1="${X(t)}" x2="${X(t)}" y1="96" y2="101"/><text class="axis-t" x="${X(t)}" y="113" text-anchor="middle">${t}</text>`;
    g += `<line class="ax" x1="${L}" x2="${W - R}" y1="96" y2="96"/><line class="cursor" x1="${X(d)}" x2="${X(d)}" y1="0" y2="100"/>`;
    g += `<text class="axis-t dir" x="${L}" y="12">← downfield (deshielded)</text><text class="axis-t dir" x="${W - R}" y="12" text-anchor="end">upfield (shielded) →</text>`;
    $("#shiftRuler").innerHTML = g;
    const mhz = +$("#shiftMHz").value * (nuc === "H" ? 1 : 0.2515);
    $("#shiftD").textContent = `${d.toFixed(nuc === "H" ? 2 : 0)} ppm`;
    $("#shiftHz").textContent = `${Math.round(d * mhz).toLocaleString()} Hz`;
    const frac = d / S.max;
    $("#shiftShield").textContent = frac < 0.25 ? "Shielded · upfield" : frac < 0.5 ? "Moderately deshielded" : "Strongly deshielded · downfield";
    const hits = S.ranges.filter((r) => d >= r.lo && d <= r.hi);
    $("#shiftMatches").innerHTML = hits.length
      ? hits.map((r) => `<li class="${r.ex ? "artifact" : ""}"><b>${r.g}</b><span>${r.f}</span><em>${r.lo}–${r.hi}</em></li>`).join("")
      : `<li class="none">No common ${nuc === "H" ? "¹H" : "¹³C"} environment here. Try ${nuc === "H" ? "7.3 (aromatic) or 9.5 (aldehyde)" : "128 (aromatic) or 206 (ketone)"}.</li>`;
  }
  $("#shiftNuc").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b || b.dataset.nuc === nuc) return;
    nuc = b.dataset.nuc;
    $$("#shiftNuc button").forEach((x) => x.classList.toggle("on", x === b));
    const sl = $("#shiftSlider"); sl.max = SHIFTS[nuc].max; sl.step = SHIFTS[nuc].step;
    sl.value = nuc === "H" ? 7.2 : 128;
    updateShift();
  });
  $("#shiftSlider").addEventListener("input", updateShift);
  $("#shiftMHz").addEventListener("change", updateShift);
  $("#shiftRuler").addEventListener("click", (e) => {
    const r = e.currentTarget.getBoundingClientRect(), S = SHIFTS[nuc];
    const frac = ((e.clientX - r.left) / r.width * 800 - 10) / 780;
    $("#shiftSlider").value = Math.max(0, Math.min(S.max, S.max * (1 - frac)));
    updateShift();
  });
  updateShift();
});

/* ---------------- NMR: splitting simulator ---------------- */
on("#splitPlot", () => {
  const MULT = ["singlet (s)", "doublet (d)", "triplet (t)", "quartet (q)", "quintet", "sextet", "septet"];
  const MULT_EX = [
    "e.g. CH₃CO– of ethyl acetate: no H on the neighbouring carbon.",
    "e.g. a CH next to one H.",
    "e.g. CH₃ of an ethyl group, split by the 2 CH₂ protons.",
    "e.g. CH₂ of an ethyl group, split by the 3 CH₃ protons.",
    "e.g. central CH₂ of –CH₂CH₂CH₂– (equal J).",
    "e.g. CH₂ of a propyl group between CH₃ and CH₂ (equal J).",
    "e.g. CH of an isopropyl group, split by two CH₃ (6 H).",
  ];
  const binom = (n) => { const r = [1]; for (let k = 1; k <= n; k++) r.push((r[k - 1] * (n - k + 1)) / k); return r; };
  $("#pascal").innerHTML = Array.from({ length: 7 }, (_, n) => `<div class="prow" data-n="${n}"><em>n=${n}</em>${binom(n).map((v) => `<span>${v}</span>`).join("")}</div>`).join("");
  function updateSplit() {
    const n = +$("#splitN").value, J = +$("#splitJ").value;
    const co = binom(n), mx = Math.max(...co);
    const W = 320, Hh = 150, span = 70, w = 1.1;
    const X = (hz) => W / 2 + (hz / span) * (W / 2 - 10);
    const lines = co.map((c, k) => [(k - n / 2) * J, c / mx]);
    let d = "";
    for (let px = 0; px <= W; px += 1) {
      const hz = ((px - W / 2) / (W / 2 - 10)) * span;
      let y = 0;
      for (const [p, h] of lines) y += h / (1 + ((hz - p) / w) ** 2);
      d += `${px ? "L" : "M"}${px} ${(Hh - 22 - Math.min(1.05, y) * 105).toFixed(1)} `;
    }
    let g = `<line class="ax" x1="0" x2="${W}" y1="${Hh - 22}" y2="${Hh - 22}"/><path class="trace nmr" d="${d}"/>`;
    if (n > 0) {
      const y0 = Hh - 22 - 112;
      g += `<path class="jbar" d="M${X(lines[0][0])} ${y0 + 4} V${y0} H${X(lines[1][0])} V${y0 + 4}"/><text class="axis-t" x="${(X(lines[0][0]) + X(lines[1][0])) / 2}" y="${y0 - 3}" text-anchor="middle">J</text>`;
    }
    g += co.map((c, k) => `<text class="axis-t" x="${X(lines[k][0])}" y="${Hh - 22 - lines[k][1] * 105 - 4}" text-anchor="middle">${c}</text>`).join("");
    for (let t = -60; t <= 60; t += 20) g += `<text class="axis-t" x="${X(t)}" y="${Hh - 8}" text-anchor="middle">${t > 0 ? "+" : ""}${t}</text>`;
    g += `<text class="axis-t" x="${W - 4}" y="${Hh - 24}" text-anchor="end">Hz</text>`;
    $("#splitPlot").innerHTML = g;
    $("#splitNv").textContent = n;
    $("#splitJv").textContent = J.toFixed(1);
    $("#splitName").textContent = MULT[n];
    $("#splitRatio").textContent = co.join(" : ");
    $("#splitW").textContent = `${(n * J).toFixed(1)} Hz`;
    $$("#pascal .prow").forEach((r) => r.classList.toggle("on", +r.dataset.n === n));
    $("#pascal").dataset.ex = MULT_EX[n];
  }
  ["#splitN", "#splitJ"].forEach((s) => $(s).addEventListener("input", updateSplit));
  updateSplit();
});

/* ---------------- NMR: DBE calculator ---------------- */
on("#dbeIn", () => {
  const DBE_PRESETS = [["Benzene", "C6H6"], ["Cyclopentanone", "C5H10O"], ["Ethyl acetate", "C4H8O2"], ["Ethanol", "C2H6O"],
    ["Acetonitrile", "C2H3N"], ["Chlorobenzene", "C6H5Cl"], ["Pyridine", "C5H5N"], ["Aspirin", "C9H8O4"]];
  $("#dbePresets").innerHTML = DBE_PRESETS.map(([n, f]) => `<button class="pill" data-f="${f}" title="${n}">${n}</button>`).join("");
  function updateDBE() {
    const raw = $("#dbeIn").value.replace(/\s/g, "");
    const cnt = {}; let ok = /^([A-Z][a-z]?\d*)+$/.test(raw);
    for (const [, el, num] of raw.matchAll(/([A-Z][a-z]?)(\d*)/g)) cnt[el] = (cnt[el] || 0) + (num ? +num : 1);
    const known = ["C", "H", "D", "N", "O", "S", "F", "Cl", "Br", "I", "P", "Si"];
    const bad = Object.keys(cnt).filter((e) => !known.includes(e));
    const C = (cnt.C || 0) + (cnt.Si || 0), Hn = (cnt.H || 0) + (cnt.D || 0), N = (cnt.N || 0) + (cnt.P || 0);
    const X = (cnt.F || 0) + (cnt.Cl || 0) + (cnt.Br || 0) + (cnt.I || 0);
    const dbe = (2 * C + 2 + N - Hn - X) / 2;
    $$("#dbePresets .pill").forEach((p) => p.classList.toggle("on", p.dataset.f === raw));
    if (!ok || !C || bad.length) {
      $("#dbeWork").innerHTML = ""; $("#dbeVal").textContent = "?";
      $("#dbeMeaning").textContent = bad.length ? `Unknown element: ${bad.join(", ")}` : "Type a formula like C6H6 or C4H8O2";
      $("#dbeHint").textContent = ""; return;
    }
    const ign = ["O", "S"].filter((e) => cnt[e]).map((e) => `${e}${cnt[e] > 1 ? cnt[e] : ""}`);
    $("#dbeWork").innerHTML = `<span>C = ${C}</span><span>H = ${Hn}</span><span>N = ${N}</span><span>X = ${X}</span>${ign.length ? `<span class="ign">${ign.join(", ")} ignored</span>` : ""}
      <code>(2×${C} + 2 + ${N} − ${Hn} − ${X}) / 2 = ${2 * C + 2 + N - Hn - X} / 2</code>`;
    $("#dbeVal").textContent = Number.isInteger(dbe) ? dbe : dbe.toFixed(1);
    if (dbe < 0 || !Number.isInteger(dbe)) {
      $("#dbeMeaning").textContent = "Not a valid neutral molecule";
      $("#dbeHint").textContent = "DBE must be a whole number ≥ 0. Check the H / halogen count."; return;
    }
    const M = ["Saturated, no rings or π bonds", "One ring or one double bond (e.g. C=O)", "Two π bonds, a ring + a double bond, or one triple bond",
      "Three rings / π bonds in any combination"];
    $("#dbeMeaning").textContent = dbe < 4 ? M[dbe] : `${dbe} rings + π bonds in total`;
    $("#dbeHint").textContent = dbe >= 4 ? "DBE ≥ 4 often signals a benzene ring (1 ring + 3 C=C). Use ¹H/¹³C NMR (aromatic δ) to confirm." :
      dbe === 0 ? "Open-chain and fully saturated: only single bonds." : "DBE alone can't tell a ring from a π bond. NMR helps decide.";
  }
  $("#dbeIn").addEventListener("input", updateDBE);
  $("#dbePresets").addEventListener("click", (e) => { const b = e.target.closest(".pill"); if (b) { $("#dbeIn").value = b.dataset.f; updateDBE(); } });
  updateDBE();
});

/* ---------------- NMR: 13C & DEPT viewer ---------------- */
on("#deptPlot", () => {
  const DEPT_MOLS = [
    { name: "Ethyl acetate", f: "CH₃COOCH₂CH₃", c: [[170.5, "C", "C=O (ester)"], [60.2, "CH2", "–OCH₂–"], [20.8, "CH3", "CH₃CO–"], [14.3, "CH3", "–CH₂CH₃"]] },
    { name: "Acetone", f: "(CH₃)₂CO", c: [[206.7, "C", "C=O (ketone)"], [30.8, "CH3", "2 × CH₃ (equivalent)"]] },
    { name: "Ethanol", f: "CH₃CH₂OH", c: [[58.3, "CH2", "–CH₂OH"], [18.4, "CH3", "CH₃–"]] },
    { name: "Butan-2-one", f: "CH₃COCH₂CH₃", c: [[209.3, "C", "C=O (ketone)"], [36.9, "CH2", "–COCH₂–"], [29.4, "CH3", "CH₃CO–"], [7.9, "CH3", "–CH₂CH₃"]] },
    { name: "Propan-2-ol", f: "(CH₃)₂CHOH", c: [[64.0, "CH", "CH–OH"], [25.3, "CH3", "2 × CH₃"]] },
    { name: "tert-Butanol", f: "(CH₃)₃COH", c: [[69.1, "C", "C–OH (quaternary)"], [31.3, "CH3", "3 × CH₃"]] },
    { name: "Toluene", f: "C₆H₅CH₃", c: [[137.9, "C", "ipso C"], [129.1, "CH", "ortho CH"], [128.3, "CH", "meta CH"], [125.4, "CH", "para CH"], [21.5, "CH3", "Ar–CH₃"]] },
  ];
  const DEPT_RULE = { C: [0.45, 0, 0, 0], CH: [0.9, 1, 1, 1], CH2: [0.85, 1, 0, -1], CH3: [1, 1, 0, 1] };
  const TYPE_NAME = { C: "quaternary C", CH: "CH (methine)", CH2: "CH₂ (methylene)", CH3: "CH₃ (methyl)" };
  let deptMol = 0;
  $("#deptMols").innerHTML = DEPT_MOLS.map((m, i) => `<button class="pill" data-i="${i}">${m.name}</button>`).join("");
  function deptSummary(m) {
    const t = (k) => m.c.filter((x) => x[1] === k).length;
    return `<b>${m.name}</b> <span class="muted">${m.f}</span><p>${m.c.length} ¹³C signals: ${t("CH3")} CH₃ · ${t("CH2")} CH₂ · ${t("CH")} CH · ${t("C")} C</p><p class="muted small">Hover or tap a peak.</p>`;
  }
  function updateDept() {
    const m = DEPT_MOLS[deptMol];
    $$("#deptMols .pill").forEach((p) => p.classList.toggle("on", +p.dataset.i === deptMol));
    const W = 800, L = 92, R = 14, lane = 74, top = 6;
    const X = (d) => L + ((220 - d) / 220) * (W - L - R);
    const names = ["¹³C {¹H}", "DEPT-45", "DEPT-90", "DEPT-135"];
    let g = "";
    names.forEach((nm, li) => {
      const y0 = top + li * lane, base = li === 3 ? y0 + lane / 2 + 4 : y0 + lane - 10;
      g += `<text class="lane-t" x="6" y="${y0 + lane / 2 + 4}">${nm}</text><line class="ax" x1="${L}" x2="${W - R}" y1="${base}" y2="${base}"/>`;
      m.c.forEach(([d, type], i) => {
        const h = DEPT_RULE[type][li];
        if (!h) return;
        const len = h * (li === 3 ? lane / 2 - 8 : lane - 18);
        g += `<line class="stick t-${type} ${h < 0 ? "neg" : ""}" data-i="${i}" x1="${X(d)}" x2="${X(d)}" y1="${base}" y2="${base - len}"/>`;
      });
    });
    const axY = top + 4 * lane + 4;
    for (let t = 0; t <= 220; t += 20) g += `<text class="axis-t" x="${X(t)}" y="${axY + 10}" text-anchor="middle">${t}</text>`;
    g += `<text class="axis-t" x="${W - R}" y="${axY + 22}" text-anchor="end">δ (ppm)</text>`;
    g += m.c.map(([d], i) => `<rect class="hit" data-i="${i}" x="${X(d) - 9}" y="0" width="18" height="${axY}"/>`).join("");
    $("#deptPlot").innerHTML = g;
    $("#deptInfo").innerHTML = deptSummary(m);
  }
  function deptFocus(i) {
    const m = DEPT_MOLS[deptMol];
    $$("#deptPlot .stick").forEach((s) => s.classList.toggle("dim", i !== null && +s.dataset.i !== i));
    if (i === null) { $("#deptInfo").innerHTML = deptSummary(m); return; }
    const [d, type, lbl] = m.c[i], r = DEPT_RULE[type];
    const seen = ["DEPT-45", "DEPT-90", "DEPT-135"].map((n, k) => `${n}: ${r[k + 1] > 0 ? "up ▲" : r[k + 1] < 0 ? "down ▼" : "absent"}`).join("<br>");
    $("#deptInfo").innerHTML = `<b>δ ${d} ppm</b> <span class="tchip t-${type}">${TYPE_NAME[type]}</span><p>${lbl}</p><p class="muted small">${seen}</p>`;
  }
  $("#deptMols").addEventListener("click", (e) => { const b = e.target.closest(".pill"); if (b) { deptMol = +b.dataset.i; updateDept(); } });
  $("#deptPlot").addEventListener("pointerover", (e) => { if (e.target.dataset.i !== undefined) deptFocus(+e.target.dataset.i); });
  $("#deptPlot").addEventListener("pointerleave", () => deptFocus(null));
  updateDept();
});

/* ---------------- Raman: shift & Stokes/anti-Stokes calculator ---------------- */
on("#ramL0", () => {
  const HCK = 1.438777; // hc/k in cm·K
  const LASERS = [532, 633, 785, 1064];
  $("#ramLasers").innerHTML = LASERS.map((l) => `<button class="pill" data-l="${l}">${l} nm</button>`).join("");
  function updateRaman() {
    const l0 = +$("#ramL0").value, dv = +$("#ramDv").value, T = +$("#ramT").value;
    $("#ramDvv").textContent = dv; $("#ramTv").textContent = T;
    $$("#ramLasers .pill").forEach((p) => p.classList.toggle("on", +p.dataset.l === l0));
    const v0 = 1e7 / l0, vs = v0 - dv, vas = v0 + dv;
    const ratio = Math.pow(vas / vs, 4) * Math.exp(-HCK * dv / T);
    $("#ramV0").textContent = `${Math.round(v0).toLocaleString()} cm⁻¹`;
    $("#ramLs").textContent = vs > 0 ? `${(1e7 / vs).toFixed(1)} nm` : "–";
    $("#ramLas").textContent = `${(1e7 / vas).toFixed(1)} nm`;
    $("#ramRatio").textContent = ratio < 1e-3 ? sci(ratio, 3) : ratio.toFixed(3);
    // spectrum: Rayleigh (clipped), Stokes = 1, anti-Stokes = ratio
    const W = 320, Hh = 150, base = Hh - 24, span = 3200;
    const X = (s) => W / 2 + (s / span) * (W / 2 - 12);
    const peaks = [[0, 1.6, 30], [dv, 0.75, 34], [-dv, 0.75 * ratio, 34]];
    let d = "";
    for (let px = 0; px <= W; px++) {
      const s = ((px - W / 2) / (W / 2 - 12)) * span;
      let y = 0;
      for (const [c, h, w] of peaks) y += h / (1 + ((s - c) / w) ** 2);
      d += `${px ? "L" : "M"}${px} ${(base - Math.min(1.05, y) * 100).toFixed(1)} `;
    }
    let g = `<line class="ax" x1="0" x2="${W}" y1="${base}" y2="${base}"/><path class="trace raman" d="${d}"/>`;
    const lbl = (s, t, y) => `<text class="axis-t" x="${X(s)}" y="${y}" text-anchor="middle">${t}</text>`;
    g += lbl(0, "Rayleigh", 12) + lbl(dv, "Stokes", base - 82) + lbl(-dv, "anti-Stokes", base - Math.max(8, 75 * Math.min(1, ratio)) - 6);
    for (const t of [-3000, -1500, 0, 1500, 3000]) g += lbl(t, t > 0 ? `+${t}` : t, Hh - 8);
    $("#ramPlot").innerHTML = g;
    $("#ramNote").innerHTML = `At ${T} K the anti-Stokes line is <b>${ratio < 0.01 ? "much weaker than" : ratio < 0.5 ? "weaker than" : "nearly as strong as"}</b> the Stokes line: fewer molecules start in v = 1. Raise T or lower Δν̃ to see it grow.`;
  }
  $("#ramLasers").addEventListener("click", (e) => { const b = e.target.closest(".pill"); if (b) { $("#ramL0").value = b.dataset.l; updateRaman(); } });
  ["#ramL0", "#ramDv", "#ramT"].forEach((s) => $(s).addEventListener("input", updateRaman));
  updateRaman();
});

/* ---------------- Raman: IR vs Raman activity ---------------- */
on("#actMols", () => {
  // [mode, wavenumber, IR active, Raman active, why]
  const MOLS = [
    { name: "CO₂", note: "Linear and centrosymmetric, so mutual exclusion applies.", centro: true, modes: [
      ["ν₁ symmetric stretch", 1340, false, true, "Bond lengths change together: polarizability changes, dipole stays zero."],
      ["ν₂ bend", 667, true, false, "Bending creates a dipole, but polarizability changes cancel by symmetry."],
      ["ν₃ asymmetric stretch", 2349, true, false, "One bond stretches as the other shrinks: an oscillating dipole."]] },
    { name: "O₂", note: "Homonuclear diatomic: no dipole at any bond length.", centro: true, modes: [
      ["O=O stretch", 1556, false, true, "Δμ = 0 (IR inactive) but Δα ≠ 0 (Raman active)."]] },
    { name: "N₂", note: "Homonuclear diatomic: no dipole at any bond length.", centro: true, modes: [
      ["N≡N stretch", 2331, false, true, "Δμ = 0 (IR inactive) but Δα ≠ 0 (Raman active)."]] },
    { name: "HCl", note: "Heteronuclear diatomic, no centre of symmetry.", centro: false, modes: [
      ["H–Cl stretch", 2886, true, true, "Both the dipole and the polarizability change as the bond stretches."]] },
    { name: "H₂O", note: "Bent (C₂ᵥ), no centre of symmetry, so modes can be active in both.", centro: false, modes: [
      ["ν₁ symmetric stretch", 3657, true, true, "Dipole and polarizability both change."],
      ["ν₂ bend", 1595, true, true, "Dipole and polarizability both change."],
      ["ν₃ asymmetric stretch", 3756, true, true, "Dipole and polarizability both change."]] },
  ];
  let cur = 0;
  $("#actMols").innerHTML = MOLS.map((m, i) => `<button class="pill" data-i="${i}">${m.name}</button>`).join("");
  const yes = (v, lbl) => `<span class="act ${v ? "on" : "off"}">${lbl} ${v ? "✓" : "✗"}</span>`;
  function render() {
    const m = MOLS[cur];
    $$("#actMols .pill").forEach((p) => p.classList.toggle("on", +p.dataset.i === cur));
    $("#actNote").innerHTML = `${m.centro ? '<span class="tchip t-C">centrosymmetric</span> ' : ""}${m.note}`;
    $("#actList").innerHTML = m.modes.map(([n, wn, ir, ra, why]) => `
      <li><div class="act-head"><b>${n}</b><em>${wn} cm⁻¹</em></div>
      <div class="act-row">${yes(ir, "IR")}${yes(ra, "Raman")}</div><p class="muted small">${why}</p></li>`).join("");
  }
  $("#actMols").addEventListener("click", (e) => { const b = e.target.closest(".pill"); if (b) { cur = +b.dataset.i; render(); } });
  render();
});

/* ---------------- Quiz (one per topic page) ---------------- */
// [question, [A, B, C, D], correct index, explanation]. Week 01/02 questions come from the weekly quiz posters in notes/quiz/.
const QUIZZES = {
  fundamentals: { title: "Fundamentals quiz", sub: "6 questions on light, energy and techniques", poster: null, qs: [
    ["Photon energy E = hν is…", ["Directly proportional to frequency", "Inversely proportional to frequency", "Independent of frequency", "Proportional to wavelength"], 0, "E = hν = hc/λ: higher frequency (shorter wavelength) means more energy per photon."],
    ["Which region has the highest energy per photon?", ["Radio", "Microwave", "Infrared", "Ultraviolet"], 3, "Energy rises with frequency: radio < microwave < IR < visible < UV < X-ray < γ."],
    ["Molecular vibrations are mainly probed with…", ["Radio waves", "Infrared radiation", "X-rays", "γ-rays"], 1, "Vibrational energy gaps match IR photons (IR spectroscopy; Raman probes them by scattering)."],
    ["NMR spectroscopy uses which part of the spectrum?", ["Radio frequency", "Visible", "Ultraviolet", "X-ray"], 0, "Nuclear spin transitions in a magnetic field are tiny energy gaps, matched by radio-frequency radiation."],
    ["Wavenumber ν̃ is defined as…", ["λ / c", "1 / λ", "c × λ", "h × ν"], 1, "ν̃ = 1/λ, usually in cm⁻¹. It is proportional to energy."],
    ["Raman spectroscopy is based on which light–matter interaction?", ["Absorption", "Emission", "Inelastic scattering", "Diffraction"], 2, "Raman measures photons scattered with a small change in energy (inelastic scattering)."],
  ] },
  uv: { title: "UV-Vis quiz", sub: "Includes questions 3–5 from the Week 01 quiz poster", poster: "notes/quiz/02.jpg", posterLabel: "Week 01 poster", qs: [
    ["Which transition occurs between ligand-field-split metal orbitals in a transition-metal complex?", ["σ → σ*", "π → π*", "d–d transition", "Nuclear spin transition"], 2, "d–d transitions happen between the split d orbitals. They are Laporte-forbidden, so usually weak."],
    ["At fixed molar absorptivity, absorbance is directly proportional to which quantities?", ["Concentration only", "Path length only", "Concentration and path length", "Temperature and pressure"], 2, "Beer–Lambert: A = εbc, so A ∝ b and A ∝ c."],
    ["What happens to λmax in a bathochromic shift?", ["Moves to shorter wavelength", "Moves to longer wavelength", "Only intensity decreases", "The band disappears"], 1, "Bathochromic = red shift, to longer λ (e.g. extended conjugation). Hypsochromic = blue shift."],
    ["Which lamp is normally used as the UV source in a spectrophotometer?", ["Tungsten–halogen", "Deuterium", "Sodium vapour", "Nernst glower"], 1, "A deuterium lamp covers the UV; a tungsten–halogen lamp covers the visible region."],
    ["Which cuvette material should be used for measurements below ~300 nm?", ["Glass", "Plastic", "Quartz", "Any of these"], 2, "Glass and plastic absorb UV light; quartz is transparent down to ~190 nm."],
  ] },
  ir: { title: "IR quiz", sub: "Includes questions 1–2 from the Week 01 quiz poster", poster: "notes/quiz/02.jpg", posterLabel: "Week 01 poster", qs: [
    ["Which stretching vibration generally occurs at the highest IR frequency?", ["C–C", "C–H", "C=O", "C–O"], 1, "H is very light, so the C–H reduced mass is small and ν̃ ∝ √(k/μ) is high (~2850–3100 cm⁻¹). Try it in the Hooke's law calculator."],
    ["Which group typically gives a strong IR absorption around 1650–1750 cm⁻¹?", ["O–H", "C=O", "C–H", "C–O"], 1, "The carbonyl stretch is strong and sharp at ~1650–1850 cm⁻¹ because of its large dipole change."],
    ["For a vibration to be IR active, it must…", ["Change the polarizability", "Change the dipole moment", "Involve a hydrogen atom", "Be symmetric"], 1, "IR absorption requires an oscillating dipole moment (dμ/dQ ≠ 0)."],
    ["A broad, strong band at 3200–3600 cm⁻¹ most likely indicates…", ["C≡N", "C=O", "Hydrogen-bonded O–H", "Aromatic C=C"], 2, "Hydrogen bonding spreads the O–H stretch into a broad band."],
    ["The fingerprint region of an IR spectrum is roughly…", ["4000–3000 cm⁻¹", "2500–2000 cm⁻¹", "1500–400 cm⁻¹", "Above 4000 cm⁻¹"], 2, "Below ~1500 cm⁻¹ the pattern of bends and skeletal modes is unique to each molecule."],
  ] },
  raman: { title: "Raman quiz", sub: "Questions 1–5 are the Week 02 quiz poster", poster: "notes/quiz/03.jpg", posterLabel: "Week 02 poster", qs: [
    ["Which condition must be satisfied for a vibrational mode to be Raman active?", ["Change in dipole moment", "Change in polarizability", "Permanent dipole moment", "Change in magnetic moment"], 1, "Raman activity needs a change in polarizability. A change in dipole moment is the IR selection rule."],
    ["In Raman scattering, the line at a lower frequency than the incident radiation is called the…", ["Rayleigh line", "Anti-Stokes line", "Stokes line", "Fluorescence line"], 2, "Stokes: the photon gives energy to the molecule and scatters at hν₀ − hν(vib). Anti-Stokes is at hν₀ + hν(vib)."],
    ["Which of the following statements is correct?", ["Raman and IR are always complementary.", "Stokes lines are generally more intense than anti-Stokes lines at room temperature.", "A Raman spectrum gives electronic transitions.", "Rayleigh scattering results in a shift in wavenumber."], 1, "Most molecules sit in the ground vibrational level (Boltzmann), so Stokes lines are stronger. Rayleigh is elastic, with no shift."],
    ["For a centrosymmetric molecule, which statement is true?", ["A vibrational mode is both IR and Raman active.", "IR-active modes are Raman inactive and vice versa.", "All vibrational modes are Raman active.", "Raman activity is independent of symmetry."], 1, "This is the rule of mutual exclusion, e.g. CO₂: the symmetric stretch is Raman-only and the asymmetric stretch is IR-only."],
    ["The Raman shift (Δν) is defined as:", ["Δν = ν(scattered) − ν(incident)", "Δν = ν(incident) − ν(scattered)", "Δν = λ(scattered) − λ(incident)", "Δν = 1/λ(scattered) − 1/λ(incident)"], 1, "Δν = ν(incident) − ν(scattered), positive for Stokes lines. In wavenumbers that is 1/λ(incident) − 1/λ(scattered), so option D has the sign reversed."],
    ["Which excitation laser is usually chosen to reduce fluorescence background?", ["532 nm", "633 nm", "785 nm", "All give equal fluorescence"], 2, "Longer-wavelength (lower-energy) lasers like 785 nm, or 1064 nm in FT-Raman, excite less fluorescence."],
    ["SERS gets its huge signal enhancement from…", ["A cooled CCD detector", "Nanostructured Au/Ag surfaces", "A notch filter", "Higher laser power"], 1, "Surface-Enhanced Raman Spectroscopy uses nanostructured metals such as Au and Ag."],
  ] },
  nmr: { title: "NMR quiz", sub: "12 questions from Spectroscopic Series 5/7", poster: "notes/nmr/11.jpg", posterLabel: "Revise: cheat sheet", qs: [
    ["Which compound is the standard reference at δ = 0 ppm?", ["CDCl₃", "Tetramethylsilane (TMS)", "D₂O", "Benzene"], 1, "TMS, Si(CH₃)₄, gives one sharp, intense signal that is defined as δ = 0 ppm."],
    ["How many energy levels does a spin-½ nucleus have in a magnetic field B₀?", ["1", "2", "3", "4"], 1, "Two: m = +½ and m = −½. RF absorption (ΔE = hν = γħB₀) flips the spin between them."],
    ["NMR absorption happens when the RF frequency matches the…", ["Larmor frequency ν₀ = γB₀/2π", "Spectrometer's proton frequency only", "Coupling constant J", "Relaxation rate 1/T₁"], 0, "Resonance condition: ν = ν₀, the Larmor frequency, which depends on γ and B₀."],
    ["Higher electron density around a proton moves its signal…", ["Downfield, to higher δ", "Upfield, to lower δ", "Nowhere; δ is fixed", "Off the spectrum"], 1, "Electrons shield the nucleus from B₀, so it resonates upfield (right) at lower δ."],
    ["An aldehyde (–CHO) proton typically appears at about…", ["0.8–1.5 ppm", "3.0–4.5 ppm", "6.5–8.5 ppm", "9–10 ppm"], 3, "The C=O strongly deshields the aldehyde H, pushing it to δ ≈ 9–10 ppm."],
    ["The CH₂ of an ethyl group (CH₃–CH₂–) appears as a…", ["Singlet", "Doublet", "Triplet", "Quartet"], 3, "n = 3 neighbouring CH₃ protons → n + 1 = 4 lines (quartet, 1:3:3:1)."],
    ["Why is the CH₃CO– signal of ethyl acetate (δ ≈ 2.0) a singlet?", ["It is next to a CH₂", "There are no H on the neighbouring carbon", "It exchanges with D₂O", "It is aromatic"], 1, "The acetyl CH₃ is bonded to the C=O carbon, which carries no H, so n = 0 → singlet."],
    ["After a D₂O shake, which ¹H signal disappears?", ["CH₃", "Aromatic Ar–H", "O–H", "CHO"], 2, "Labile O–H / N–H protons exchange with deuterium, and ²H is not seen in ¹H NMR."],
    ["What is the DBE of benzene, C₆H₆?", ["2", "3", "4", "6"], 2, "DBE = (2×6 + 2 − 6)/2 = 4: one ring + three C=C."],
    ["Routine ¹³C peak areas are not quantitative mainly because of…", ["Proton decoupling removes carbons", "NOE and different relaxation times (T₁)", "100 % natural abundance of ¹³C", "Solvent overlap"], 1, "NOE boosts carbons with attached H, and carbons relax at different rates, so intensities are unequal."],
    ["In a DEPT-135 spectrum, CH₂ carbons appear…", ["Positive (up)", "Negative (down)", "Absent", "As doublets"], 1, "DEPT-135: CH and CH₃ point up, CH₂ points down, and quaternary C is absent."],
    ["Which carbons are absent from all DEPT spectra?", ["CH₃", "CH₂", "CH", "Quaternary C"], 3, "DEPT relies on polarisation transfer from attached H, so carbons with no H (C=O, ipso C) don't appear."],
  ] },
};
on("#quizCard", () => {
  const quiz = QUIZZES[PAGE], t = TOPICS[PAGE];
  let answers = [];
  const best = store.get("quizBest", {});
  const id = `topic-${PAGE}`;
  $("#quizTitle").textContent = quiz.title; $("#quizSub").textContent = quiz.sub;
  $("#quizTag").textContent = t.sym; $("#quizTag").className = `tag ${PAGE === "fundamentals" ? "" : PAGE}`;
  const poster = $("#quizPoster");
  if (quiz.poster) { poster.href = BASE + quiz.poster; poster.textContent = quiz.posterLabel; } else poster.remove();
  function renderQuiz() {
    answers = new Array(quiz.qs.length).fill(null);
    $("#quizQs").innerHTML = quiz.qs.map(([q, opts], i) => `
      <li class="qq" data-q="${i}">
        <p class="qtext"><span class="qn">${i + 1}</span>${q}</p>
        <div class="opts">${opts.map((o, j) => `<button class="opt" data-o="${j}"><span class="ol">${"ABCD"[j]}</span><span>${o}</span></button>`).join("")}</div>
        <p class="explain" hidden></p>
      </li>`).join("");
    updateQuizScore();
  }
  function updateQuizScore() {
    const done = answers.filter((a) => a !== null).length;
    const right = answers.filter((a, i) => a === quiz.qs[i][2]).length;
    const total = quiz.qs.length;
    $("#quizScore").textContent = `${right}/${total}`;
    $("#quizRing").style.setProperty("--p", (right / total) * 100);
    $("#quizProg").style.width = `${(done / total) * 100}%`;
    $("#quizBest").textContent = best[id] !== undefined ? `best: ${best[id]}/${total}` : `${done}/${total} answered`;
    if (done < total) { $("#quizMsg").textContent = done ? `${total - done} to go…` : "Tap an option to answer."; return; }
    const pct = right / total;
    $("#quizMsg").textContent = pct === 1 ? `🎉 Perfect ${right}/${total}! Comment your score on Instagram.` :
      pct >= 0.7 ? `Great work: ${right}/${total}. Review the explanations for the ones you missed.` :
      `${right}/${total}. Revise the notes and try again!`;
    if (best[id] === undefined || right > best[id]) { best[id] = right; store.set("quizBest", best); }
    $("#quizBest").textContent = `best: ${best[id]}/${total}`;
  }
  $("#quizQs").addEventListener("click", (e) => {
    const opt = e.target.closest(".opt"); if (!opt) return;
    const li = opt.closest(".qq"), qi = +li.dataset.q;
    if (answers[qi] !== null) return;
    const choice = +opt.dataset.o, [, , correct, why] = quiz.qs[qi];
    answers[qi] = choice;
    $$(".opt", li).forEach((b, j) => { b.disabled = true; b.classList.toggle("right", j === correct); b.classList.toggle("wrong", j === choice && j !== correct); });
    li.classList.add(choice === correct ? "ok" : "bad");
    const ex = $(".explain", li); ex.hidden = false;
    ex.innerHTML = `<b>${choice === correct ? "✓ Correct." : `✗ Answer: ${"ABCD"[correct]}.`}</b> ${why}`;
    updateQuizScore();
  });
  $("#quizReset").addEventListener("click", () => { renderQuiz(); $("#quizCard").scrollIntoView({ behavior: "smooth", block: "start" }); });
  renderQuiz();
});

/* ---------------- Home: topic tiles, tool index, stats ---------------- */
on("#elements", () => {
  const keys = Object.keys(TOPICS);
  $("#elements").innerHTML = keys.map((k, i) => {
    const t = TOPICS[k], pages = NOTES.filter((n) => n.topic === k).length;
    return `
      <a class="element" href="${t.slug}/" style="--c:${t.color}" data-len="${t.sym.length}">
        <span class="z">${String(i + 1).padStart(2, "0")}</span><span class="mass">${pages} pages</span>
        <span class="sym">${t.sym}</span>
        <span class="el-name">${t.short}</span>
        <span class="el-sub">${t.sub}</span>
        <span class="el-go">Open <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </a>`;
  }).join("");
  $("#toolIndex").innerHTML = keys.map((k) => {
    const t = TOPICS[k];
    return `<div class="tool-col" style="--c:${t.color}"><h3><span class="sym-chip">${t.sym}</span>${t.short}</h3>
      ${t.tools.map((name) => `<a href="${t.slug}/#lab" class="tool-link">${name}<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>`).join("")}</div>`;
  }).join("");
  $("#statNotes").dataset.count = NOTES.length;
  $("#statTopics").dataset.count = keys.length;
  $("#readCount").textContent = NOTES.filter((n) => read.has(n.id)).length;
  // old one-page links like /#note=ir-03 now live on the topic page
  const m = location.hash.match(/note=(\w+)-\d+/);
  if (m && TOPICS[m[1]]) location.replace(`${TOPICS[m[1]].slug}/${location.hash}`);
});

/* ---------------- Topic page: header stats ---------------- */
on("#topicHero", () => {
  const t = TOPICS[PAGE], keys = Object.keys(TOPICS), i = keys.indexOf(PAGE);
  $("#topicPages").textContent = NOTES.filter((n) => n.topic === PAGE).length;
  $("#topicTools").textContent = t.tools.length;
  $("#topicRead").textContent = NOTES.filter((n) => n.topic === PAGE && read.has(n.id)).length;
  const prev = TOPICS[keys[i - 1]], next = TOPICS[keys[i + 1]];
  $("#topicPager").innerHTML =
    (prev ? `<a class="pager prev" href="${BASE}${prev.slug}/" style="--c:${prev.color}"><small>← Previous topic</small><b>${prev.label}</b></a>` : "<span></span>") +
    (next ? `<a class="pager next" href="${BASE}${next.slug}/" style="--c:${next.color}"><small>Next topic →</small><b>${next.label}</b></a>` : `<a class="pager next" href="${HOME}"><small>Finished the series? →</small><b>Back to all topics</b></a>`);
});

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

