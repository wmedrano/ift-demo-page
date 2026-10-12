// The 6 Roboto-only samples with separated specimen text vs test commentary
const ROBOTO_SAMPLES = [
  {
    name: "Basic Latin",
    explanation: `
      <p><strong>Initial Font Baseline:</strong> In this first sample, only basic Latin characters are needed. In an IFT deployment, the browser receives a small initial base font containing core Latin glyphs and table maps.</p>
      <p>Because browser engine support for <code>tech(incremental)</code> is not yet active, the text below renders in our distinct <strong>Courier New (monospace slab-serif) fallback</strong>. When IFT is supported, it seamlessly upgrades to Roboto's thin (100) and regular (400) proportional sans-serif.</p>
    `,
    titleHtml: '<span style="font-weight: 100;">In this first sample only basic latin support is loaded.</span>',
    titleTag: "weight: 100",
    paragraphHtml: `
      <span style="font-weight: 400;">
        A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets. It always does one good.
      </span>
    `,
    paragraphTag: "weight: 400"
  },
  {
    name: "Vietnamese Diacritics",
    explanation: `
      <p><strong>Cross-Subset Kerning &amp; Composed Characters:</strong> Vietnamese relies heavily on stacked diacritics (like <mark class="highlight-target">ộ</mark> and <mark class="highlight-target">ậ</mark>). With traditional <code>unicode-range</code> slicing, interacting codepoints often split across arbitrary subsets, causing broken diacritics and missing kerning between Latin and Vietnamese characters.</p>
      <p>IFT solves this by extending the existing font binary with a patch, maintaining full OpenType functional equivalence without broken kerning.</p>
    `,
    titleHtml: '<span style="font-weight: 100;">Bầu trời trong xanh thăm thẳm, không một gợn mây.</span>',
    titleTag: "weight: 100 · Vietnamese",
    paragraphHtml: `
      <span style="font-weight: 400;">
        Phải áp dụng chế độ giáo dục miễn phí, ít nhất là ở bậc tiểu học và giáo dục cơ sở.<br/><br/>
        Chúng tôi đã đạt tới độ cao rất lớn trong khí quyển vì bầu trời tối đen và các vì sao không còn lấp lánh. Ảo giác về đường chân trời khiến đám mây ảm đạm bên dưới lõm xuống và chiếc xe như trôi bồng bềnh giữa quả cầu khổng lồ tăm tối.
      </span>
    `,
    paragraphTag: "weight: 400 · Vietnamese"
  },
  {
    name: "Cyrillic + Greek",
    explanation: `
      <p><strong>Multi-Script Single-Patch Augmentation:</strong> Here the text encounters both Greek and Cyrillic alphabets. With IFT, the encoder can group related scripts or frequency bands so the client fetches the needed glyph patches in a single parallel round-trip rather than downloading dozens of discrete subset slices.</p>
    `,
    titleHtml: '<span style="font-weight: 100;">Алая вспышка осветила силуэт зазубренного крыла.</span>',
    titleTag: "weight: 100 · Cyrillic",
    paragraphHtml: `
      <span style="font-weight: 400;">
        <strong>[Greek]</strong> Είναι προικισμένοι με λογική και συνείδηση, και οφείλουν να συμπεριφέρονται μεταξύ τους με πνεύμα αδελφοσύνης. Όλοι οι άνθρωποι γεννιούνται ελεύθεροι και ίσοι στην αξιοπρέπεια και τα δικαιώματα.<br/><br/>
        <strong>[Cyrillic]</strong> Высокая гравитация выматывала его, но мышцы изо всех сил пытались приспособиться. Обессиленный, он уже не валился в постель сразу после занятий. Кошмары, не покидавшие его, стали только хуже.
      </span>
    `,
    paragraphTag: "weight: 400 · Greek & Cyrillic"
  },
  {
    name: "Cyrillic Kerning & Punctuation",
    explanation: `
      <p><strong>Cross-Script Punctuation Kerning:</strong> Kerning between punctuation marks and Cyrillic letters is often broken in <code>unicode-range</code> subsetting because punctuation kerning rules are typically defined only in the Latin subset file. IFT patches the actual <code>GPOS</code> kerning table directly, guaranteeing identical typography across scripts.</p>
    `,
    titleHtml: '<span style="font-weight: 100;">Возвращаться назад предстояло в одиночку.</span>',
    titleTag: "weight: 100 · Cyrillic",
    paragraphHtml: `
      <span style="font-weight: 400;">
        Мелкие детали значительно замедлили бы работу, поэтому, вопреки моему первоначальному намерению, я решил создать существо огромного размера: мощное, около двух с половиной метров ростом. Потратив несколько месяцев на сбор материалов, я приступил к делу.
      </span>
    `,
    paragraphTag: "weight: 400 · Cyrillic"
  },
  {
    name: "Small Caps (c2sc, smcp)",
    explanation: `
      <p><strong>OpenType Layout Feature Loading:</strong> True small caps (<code>font-variant: small-caps</code> via <code>c2sc</code> and <code>smcp</code>) are usually omitted from standard web font subsets to save bandwidth, causing browsers to synthesize fake scaled-down capitals. IFT allows optional layout tables and alternate glyphs to be fetched on demand only when small-caps styling is used.</p>
    `,
    titleHtml: '<span style="font-variant: small-caps; font-weight: 100; font-size: 1.15em;">Small Caps &amp; Petite Capitals</span>',
    titleTag: "features: c2sc, smcp · weight: 100",
    paragraphHtml: `
      <span style="font-variant: small-caps; font-weight: 400; font-size: 1.1em;">
        The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. This text exercises genuine OpenType small caps glyph substitution rather than artificial browser synthesis.
      </span>
    `,
    paragraphTag: "features: c2sc, smcp · weight: 400"
  },
  {
    name: "Variable Design Space Augmentation",
    explanation: `
      <p><strong>On-Demand Axis Extension:</strong> Instead of forcing the client to download variation deltas (<code>gvar</code>, <code>HVAR</code>) for every conceivable width and weight axis extreme upfront, IFT segments the design space so the <strong>condensed width (<code>wdth: 75%</code>)</strong> and <strong>black weight (<code>wght: 900</code>)</strong> data are only transferred when the page styling requests them.</p>
    `,
    titleHtml: '<span style="font-weight: 300; font-stretch: 75%;">Variable <span style="font-weight: 900;">Design Space</span> Augmentation (Condensed)</span>',
    titleTag: "stretch: 75% · weights: 300 & 900",
    paragraphHtml: `
      <span style="font-weight: 400; font-stretch: 75%;">
        Here the width axis (wdth: 75%) has been requested on demand to display this paragraph in Roboto's condensed style, paired with a variable bold (900) title.
      </span>
    `,
    paragraphTag: "stretch: 75% · weight: 400"
  }
];

let currentIndex = 0;
let currentFontMode = "ift";

// Font detection helper using canvas measurement ratio
function testElementFont(fontStack, weight, stretch, sampleChar) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const stretchStr = stretch ? stretch + " " : "";
  ctx.font = `${weight} ${stretchStr}72px ${fontStack}`;
  const w_i = ctx.measureText("iii").width;
  const w_m = ctx.measureText("MMM").width;
  return Math.abs(w_i - w_m) < 0.1 ? "Courier New (Fallback)" : "Roboto (Sans-serif)";
}

function checkActiveFont() {
  const fontStack = currentFontMode === "fallback"
    ? "Courier New, monospace"
    : (currentFontMode === "system" ? "Roboto, sans-serif" : '"Roboto", "Courier New", Courier, monospace');

  const titleWeight = currentIndex === 5 ? "300" : "100";
  const titleStretch = currentIndex === 5 ? "75%" : "100%";
  const titleFont = testElementFont(fontStack, titleWeight, titleStretch);
  const paraFont = testElementFont(fontStack, "400", currentIndex === 5 ? "75%" : "100%");

  const titleTagEl = document.getElementById("title-font-detected");
  const paraTagEl = document.getElementById("para-font-detected");
  if (titleTagEl) titleTagEl.textContent = "Font: " + titleFont;
  if (paraTagEl) paraTagEl.textContent = "Font: " + paraFont;

  const indicator = document.getElementById("font-status-indicator");
  const statusText = document.getElementById("font-status-text");
  const renderedAs = document.getElementById("rendered-as-val");

  if (currentFontMode === "fallback") {
    indicator.className = "active-font-indicator indicator-forced";
    statusText.textContent = "Forced Fallback (Courier New)";
    renderedAs.textContent = "Courier New (Monospace)";
  } else if (currentFontMode === "system") {
    indicator.className = "active-font-indicator indicator-forced";
    statusText.textContent = "Forced System Roboto";
    renderedAs.textContent = "System Roboto (Sans-serif)";
  } else {
    if (titleFont.includes("Fallback") && paraFont.includes("Fallback")) {
      indicator.className = "active-font-indicator indicator-fallback";
      statusText.textContent = "Rendering in: Courier New (Fallback)";
      renderedAs.textContent = "Courier New (Monospace Fallback)";
    } else if (!titleFont.includes("Fallback") && !paraFont.includes("Fallback")) {
      indicator.className = "active-font-indicator indicator-ift";
      statusText.textContent = "Rendering in: Roboto (IFT Web Font)";
      renderedAs.textContent = "Roboto (IFT Web Font)";
    } else {
      indicator.className = "active-font-indicator indicator-fallback";
      statusText.textContent = `Mixed: Title=${titleFont}, Body=${paraFont}`;
      renderedAs.textContent = `Title=${titleFont}, Body=${paraFont}`;
    }
  }
}

function updateSample(index) {
  currentIndex = Math.max(0, Math.min(ROBOTO_SAMPLES.length - 1, index));
  const sample = ROBOTO_SAMPLES[currentIndex];

  // Update Nav buttons
  document.querySelectorAll(".sample-btn").forEach((btn) => {
    btn.classList.toggle("active", parseInt(btn.dataset.index, 10) === currentIndex);
  });

  document.getElementById("prev-btn").disabled = currentIndex === 0;
  document.getElementById("next-btn").disabled = currentIndex === ROBOTO_SAMPLES.length - 1;
  document.getElementById("sample-counter").textContent = `${currentIndex + 1} of ${ROBOTO_SAMPLES.length}`;

  // Update Explanation card
  document.getElementById("info-header-title").textContent = `About Sample ${currentIndex + 1}: ${sample.name}`;
  document.getElementById("info-explanation").innerHTML = sample.explanation;

  // Update Specimen stage
  document.getElementById("specimen-heading-title").textContent = `Sample ${currentIndex + 1}: ${sample.name}`;
  document.getElementById("title-tag").textContent = sample.titleTag;
  document.getElementById("paragraph-tag").textContent = sample.paragraphTag;

  document.getElementById("demo-title").innerHTML = sample.titleHtml;
  document.getElementById("demo-paragraph").innerHTML = sample.paragraphHtml;

  checkActiveFont();
}

function setFontMode(mode) {
  currentFontMode = mode;
  const titleEl = document.getElementById("demo-title");
  const paraEl = document.getElementById("demo-paragraph");

  titleEl.className = "specimen-title specimen-text font-mode-" + (mode === "ift" ? "ift" : (mode === "fallback" ? "fallback" : "system-roboto"));
  paraEl.className = "specimen-paragraph specimen-text font-mode-" + (mode === "ift" ? "ift" : (mode === "fallback" ? "fallback" : "system-roboto"));

  document.querySelectorAll(".toggle-option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.mode === mode);
  });

  checkActiveFont();
}

// Track Network Font Resource sizes
let totalBytes = 0;
if (typeof PerformanceObserver !== "undefined") {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (
        entry.name.includes("fonts.sandbox.google.com") ||
        entry.name.includes("fonts.googleapis.com") ||
        entry.name.includes("fonts.gstatic.com")
      ) {
        totalBytes += entry.transferSize || entry.encodedBodySize || 0;
      }
    });
    const kb = Math.round(totalBytes / 1000).toLocaleString() + " KB";
    document.getElementById("transfer-val").textContent = kb;
  });
  observer.observe({ type: "resource", buffered: true });
}

window.addEventListener("DOMContentLoaded", () => {
  // Detect native browser support for tech(incremental)
  const hasIftSupport = typeof CSS !== "undefined" && CSS.supports && CSS.supports("font-tech(incremental)");
  const supportEl = document.getElementById("browser-support-val");
  if (supportEl) {
    supportEl.textContent = hasIftSupport ? "Supported (Enabled)" : "Not Supported (Draft/Experimental)";
    supportEl.style.color = hasIftSupport ? "var(--color-green)" : "var(--color-amber)";
  }

  // Stepper click handlers
  document.getElementById("prev-btn").addEventListener("click", () => updateSample(currentIndex - 1));
  document.getElementById("next-btn").addEventListener("click", () => updateSample(currentIndex + 1));

  // Sidebar click handlers
  document.querySelectorAll(".sample-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateSample(parseInt(btn.dataset.index, 10));
    });
  });

  // Font mode toggle handlers
  document.querySelectorAll(".toggle-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      setFontMode(opt.dataset.mode);
    });
  });

  // Endpoint dropdown handler
  const endpointSelect = document.getElementById("endpoint-select");
  if (endpointSelect) {
    endpointSelect.addEventListener("change", (e) => {
      const link = document.getElementById("google-fonts-ift");
      if (link) {
        link.href = e.target.value;
        setTimeout(() => {
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(checkActiveFont);
          } else {
            checkActiveFont();
          }
        }, 500);
      }
    });
  }

  updateSample(0);

  // Check font after stylesheets load
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(checkActiveFont);
  }
});
