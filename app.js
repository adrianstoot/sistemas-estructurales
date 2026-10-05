// Main JavaScript Application for CIV_L3: Sistemas Estructurales
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // State Management
  const state = {
    currentTab: 'content',
    currentSlideIndex: 0,
    currentModuleFilter: 'all',
    searchQuery: '',
    bookmarks: JSON.parse(localStorage.getItem('civ_bookmarks') || '[]'),
    personalNotes: JSON.parse(localStorage.getItem('civ_notes') || '{}'),
    showingBookmarksOnly: false,
    
    // Quiz State
    quizIndex: 0,
    quizScore: 0,
    quizAnswered: false,

    // Flashcard State
    flashcardIndex: 0,
    flashcardFlipped: false,

    // Lightbox State
    lightboxZoom: 1.0,
    lightboxImageSrc: '',

    // Joint decision tree
    jointDir: 'parallel', // 'parallel' or 'perp'
    jointPillar: 'double', // 'double' or 'single'

    // 3D Viewer instance
    viewer3d: null
  };

  // Flatten all slides into an indexed list
  const allSlides = [];
  COURSE_DATA.modules.forEach(mod => {
    mod.slides.forEach(slide => {
      allSlides.push({
        ...slide,
        moduleId: mod.id,
        moduleNumber: mod.number,
        moduleTitle: mod.title
      });
    });
  });

  // DOM Elements
  const tabButtons = document.querySelectorAll('.nav-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const globalSearchInput = document.getElementById('globalSearchInput');
  const globalSearchInputMobile = document.getElementById('globalSearchInputMobile');
  const moduleSelectFilter = document.getElementById('moduleSelectFilter');
  const slideListContainer = document.getElementById('slideListContainer');
  const activeSlideBadge = document.getElementById('activeSlideBadge');
  const activeCategoryBadge = document.getElementById('activeCategoryBadge');
  const activeSlideTitle = document.getElementById('activeSlideTitle');
  const activeSlideContent = document.getElementById('activeSlideContent');
  const activeSlideImagesContainer = document.getElementById('activeSlideImagesContainer');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const slideCounterText = document.getElementById('slideCounterText');
  const bookmarkCurrentBtn = document.getElementById('bookmarkCurrentBtn');
  const bookmarksToggleBtn = document.getElementById('bookmarksToggleBtn');
  const bookmarkCountBadge = document.getElementById('bookmarkCountBadge');
  const slideNotesTextarea = document.getElementById('slideNotesTextarea');
  const noteSaveIndicator = document.getElementById('noteSaveIndicator');
  const modulesOverviewGrid = document.getElementById('modulesOverviewGrid');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const printSummaryBtn = document.getElementById('printSummaryBtn');

  // Lightbox DOM Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const resetZoomBtn = document.getElementById('resetZoomBtn');
  const zoomLevelText = document.getElementById('zoomLevelText');

  // ========================================================
  // 1. NAVIGATION & TAB SWITCHING
  // ========================================================
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      switchTab(tabTarget);
    });
  });

  function switchTab(tabId) {
    state.currentTab = tabId;

    tabButtons.forEach(b => {
      if (b.getAttribute('data-tab') === tabId) {
        b.classList.add('active-nav-tab');
        b.classList.remove('text-slate-400');
      } else {
        b.classList.remove('active-nav-tab');
        b.classList.add('text-slate-400');
      }
    });

    tabPanes.forEach(p => {
      if (p.id === `tab-${tabId}`) {
        p.classList.remove('hidden');
      } else {
        p.classList.add('hidden');
      }
    });

    // Lazy load or resize 3D viewer when entering viewer3d tab
    if (tabId === 'viewer3d') {
      if (!state.viewer3d) {
        state.viewer3d = new window.StructuralViewer3D('threeCanvasContainer');
      } else {
        setTimeout(() => {
          if (state.viewer3d.renderer && state.viewer3d.camera) {
            const container = document.getElementById('threeCanvasContainer');
            state.viewer3d.camera.aspect = container.clientWidth / container.clientHeight;
            state.viewer3d.camera.updateProjectionMatrix();
            state.viewer3d.renderer.setSize(container.clientWidth, container.clientHeight);
          }
        }, 50);
      }
    }

    if (window.lucide) lucide.createIcons();
  }

  // ========================================================
  // 2. RENDER MODULES OVERVIEW & SLIDE NAVIGATION
  // ========================================================
  function renderModulesOverview() {
    modulesOverviewGrid.innerHTML = '';
    COURSE_DATA.modules.forEach(mod => {
      const card = document.createElement('div');
      card.className = 'glass-panel rounded-xl p-3 cursor-pointer glass-panel-hover border border-slate-800 transition-all text-left';
      card.innerHTML = `
        <div class="flex items-center justify-between text-[11px] mb-1">
          <span class="font-mono text-amber-400 font-bold">M${mod.number}</span>
          <span class="text-slate-400 font-mono">${mod.slides.length} diap.</span>
        </div>
        <h4 class="text-xs font-bold text-white line-clamp-1">${mod.shortTitle}</h4>
        <p class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">${mod.badge}</p>
      `;
      card.addEventListener('click', () => {
        moduleSelectFilter.value = mod.number.toString();
        state.currentModuleFilter = mod.number.toString();
        // Jump to first slide of this module
        const firstIndex = allSlides.findIndex(s => s.moduleNumber === mod.number);
        if (firstIndex !== -1) {
          goToSlide(firstIndex);
        }
        renderSlideList();
      });
      modulesOverviewGrid.appendChild(card);
    });
  }

  function getFilteredSlides() {
    return allSlides.filter(slide => {
      // Module filter
      if (state.currentModuleFilter !== 'all' && slide.moduleNumber.toString() !== state.currentModuleFilter) {
        return false;
      }
      // Bookmarks only filter
      if (state.showingBookmarksOnly && !state.bookmarks.includes(slide.slideNumber)) {
        return false;
      }
      // Search query filter
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        const textMatch = (slide.title + ' ' + slide.category + ' ' + slide.content).toLowerCase().includes(query);
        return textMatch;
      }
      return true;
    });
  }

  function renderSlideList() {
    slideListContainer.innerHTML = '';
    const filtered = getFilteredSlides();

    if (filtered.length === 0) {
      slideListContainer.innerHTML = `
        <div class="text-center py-6 text-slate-500">
          <i data-lucide="search-x" class="w-6 h-6 mx-auto mb-2 opacity-50"></i>
          <p>No se encontraron diapositivas.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    filtered.forEach(slide => {
      const realIndex = allSlides.findIndex(s => s.slideNumber === slide.slideNumber);
      const isCurrent = realIndex === state.currentSlideIndex;
      const isBookmarked = state.bookmarks.includes(slide.slideNumber);

      const item = document.createElement('button');
      item.className = `w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 border ${
        isCurrent
          ? 'bg-sky-950/60 border-sky-500/50 text-white shadow-md'
          : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-800/60 hover:text-white'
      }`;

      item.innerHTML = `
        <span class="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${
          isCurrent ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
        }">
          ${slide.slideNumber.toString().padStart(2, '0')}
        </span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-1">
            <span class="font-semibold truncate text-xs ${isCurrent ? 'text-sky-300' : 'text-slate-200'}">
              ${slide.title}
            </span>
            ${isBookmarked ? '<span class="text-amber-400 text-xs">★</span>' : ''}
          </div>
          <span class="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
            <span>M${slide.moduleNumber}</span> •
            <span>${slide.category}</span>
            ${slide.images.length > 0 ? `• <span class="text-sky-400">${slide.images.length} fotos</span>` : ''}
          </span>
        </div>
      `;

      item.addEventListener('click', () => {
        goToSlide(realIndex);
      });

      slideListContainer.appendChild(item);
    });

    if (window.lucide) lucide.createIcons();
  }

  function goToSlide(index) {
    if (index < 0 || index >= allSlides.length) return;
    state.currentSlideIndex = index;
    renderActiveSlide();
    renderSlideList();

    // Scroll active slide item into view
    const activeEl = slideListContainer.querySelector('.bg-sky-950\\/60');
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function renderActiveSlide() {
    const slide = allSlides[state.currentSlideIndex];
    if (!slide) return;

    activeSlideBadge.textContent = `Diapositiva ${slide.slideNumber} de ${allSlides.length}`;
    activeCategoryBadge.textContent = `Módulo ${slide.moduleNumber} • ${slide.category}`;
    activeSlideTitle.textContent = slide.title;
    activeSlideContent.innerHTML = slide.content;
    slideCounterText.textContent = `${state.currentSlideIndex + 1} de ${allSlides.length}`;

    // Bookmark icon state
    const isBookmarked = state.bookmarks.includes(slide.slideNumber);
    if (isBookmarked) {
      bookmarkCurrentBtn.classList.add('text-amber-400');
      bookmarkCurrentBtn.classList.remove('text-slate-400');
    } else {
      bookmarkCurrentBtn.classList.remove('text-amber-400');
      bookmarkCurrentBtn.classList.add('text-slate-400');
    }

    // Personal Notes
    slideNotesTextarea.value = state.personalNotes[slide.slideNumber] || '';

    // Render Slide Images
    activeSlideImagesContainer.innerHTML = '';
    if (slide.images && slide.images.length > 0) {
      const grid = document.createElement('div');
      grid.className = `grid gap-4 mt-4 ${
        slide.images.length === 1 ? 'grid-cols-1' : slide.images.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
      }`;

      slide.images.forEach((imgName, idx) => {
        const imgCard = document.createElement('div');
        imgCard.className = 'group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer shadow-lg hover:border-sky-500/50 transition-all';
        imgCard.innerHTML = `
          <div class="aspect-video w-full overflow-hidden flex items-center justify-center p-2 bg-slate-950/70">
            <img 
              src="assets/media/${imgName}" 
              alt="Esquema ${imgName}" 
              class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div class="absolute inset-0 bg-sky-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
            <span class="px-3 py-1.5 rounded-lg bg-sky-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-lg">
              <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i> Ampliar Detalle
            </span>
          </div>
          <div class="p-2 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
            <span class="font-mono text-slate-400">Figura ${idx + 1}</span>
            <span class="text-sky-400 text-[10px]">HD Zoom</span>
          </div>
        `;
        imgCard.addEventListener('click', () => {
          openLightbox(`assets/media/${imgName}`, `${slide.title} — Detalle ${idx + 1} (Diapositiva ${slide.slideNumber})`);
        });
        grid.appendChild(imgCard);
      });

      activeSlideImagesContainer.appendChild(grid);
    }

    if (window.lucide) lucide.createIcons();
  }

  // Previous & Next Slide Controls
  prevSlideBtn.addEventListener('click', () => {
    goToSlide(state.currentSlideIndex - 1);
  });
  nextSlideBtn.addEventListener('click', () => {
    goToSlide(state.currentSlideIndex + 1);
  });

  // Keyboard navigation (Arrow keys)
  document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }
    if (e.key === 'ArrowLeft') {
      goToSlide(state.currentSlideIndex - 1);
    } else if (e.key === 'ArrowRight') {
      goToSlide(state.currentSlideIndex + 1);
    } else if (e.key === ' ' && state.currentTab === 'flashcards') {
      e.preventDefault();
      toggleFlashcardFlip();
    }
  });

  // Filter and Search Events
  moduleSelectFilter.addEventListener('change', (e) => {
    state.currentModuleFilter = e.target.value;
    renderSlideList();
  });

  function handleSearch(query) {
    state.searchQuery = query;
    renderSlideList();
  }
  globalSearchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  globalSearchInputMobile.addEventListener('input', (e) => handleSearch(e.target.value));

  // Bookmarking
  bookmarkCurrentBtn.addEventListener('click', () => {
    const slide = allSlides[state.currentSlideIndex];
    const idx = state.bookmarks.indexOf(slide.slideNumber);
    if (idx === -1) {
      state.bookmarks.push(slide.slideNumber);
    } else {
      state.bookmarks.splice(idx, 1);
    }
    localStorage.setItem('civ_bookmarks', JSON.stringify(state.bookmarks));
    updateBookmarkBadge();
    renderActiveSlide();
    renderSlideList();
  });

  bookmarksToggleBtn.addEventListener('click', () => {
    state.showingBookmarksOnly = !state.showingBookmarksOnly;
    bookmarksToggleBtn.classList.toggle('text-amber-400', state.showingBookmarksOnly);
    renderSlideList();
  });

  function updateBookmarkBadge() {
    if (state.bookmarks.length > 0) {
      bookmarkCountBadge.classList.remove('hidden');
    } else {
      bookmarkCountBadge.classList.add('hidden');
    }
  }

  // Personal Notes Autosave
  let noteTimeout;
  slideNotesTextarea.addEventListener('input', (e) => {
    clearTimeout(noteTimeout);
    const text = e.target.value;
    const slideNum = allSlides[state.currentSlideIndex].slideNumber;
    state.personalNotes[slideNum] = text;

    noteTimeout = setTimeout(() => {
      localStorage.setItem('civ_notes', JSON.stringify(state.personalNotes));
      noteSaveIndicator.classList.remove('opacity-0');
      setTimeout(() => noteSaveIndicator.classList.add('opacity-0'), 1500);
    }, 600);
  });

  // Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.documentElement.classList.toggle('dark');
  });

  // Print Summary
  printSummaryBtn.addEventListener('click', () => {
    window.print();
  });

  // ========================================================
  // 3. 3D VIEWER CONTROLS
  // ========================================================
  const modelSelectButtons = document.querySelectorAll('.model-select-btn');
  const model3dTitle = document.getElementById('model3dTitle');
  const model3dDescription = document.getElementById('model3dDescription');
  const toggleWireframeBtn = document.getElementById('toggleWireframeBtn');
  const toggleDeformationBtn = document.getElementById('toggleDeformationBtn');
  const resetCameraBtn = document.getElementById('resetCameraBtn');

  const modelDescriptions = {
    frame: {
      title: 'Pórtico Porticado Arriostrado (DB-SE-AE Art. 5.3)',
      desc: 'Estructura ortogonal con soportes HEB y vigas IPE. Se destacan los 3 planos triangulados en 2 direcciones no paralelas exigidos para estabilidad horizontal.'
    },
    joint: {
      title: 'Detalle de Nudo Viga-Pilar (Articulado vs Rígido)',
      desc: 'Pilar continuo HEB 300 con viga IPE 300, asiento rigidizado inferior y cordón de soldadura vertical en alma (1/2 a 2/3 de h_alma).'
    },
    truss: {
      title: 'Comparativa de Celosías: Pratt vs Vierendeel',
      desc: 'Viga Pratt con diagonales a tracción y montantes a compresión vs Viga Vierendeel de recuadros rectangulares rígidos sin diagonales para paso de puertas.'
    },
    expansion: {
      title: 'Detalle 3D de Juntas de Dilatación (≤ 40 m)',
      desc: 'Comparación: Bloque izquierdo con Doble Pilar (separación 5 cm) vs Bloque derecho con Pilar Único y apoyo deslizante con coliso.'
    }
  };

  modelSelectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-model');
      modelSelectButtons.forEach(b => {
        b.classList.remove('bg-sky-600', 'text-white');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('bg-sky-600', 'text-white');
      btn.classList.remove('text-slate-400');

      if (state.viewer3d) {
        state.viewer3d.loadModel(type);
      }
      if (modelDescriptions[type]) {
        model3dTitle.textContent = modelDescriptions[type].title;
        model3dDescription.textContent = modelDescriptions[type].desc;
      }
    });
  });

  toggleWireframeBtn.addEventListener('click', () => {
    if (state.viewer3d) {
      const isWire = state.viewer3d.toggleWireframe();
      toggleWireframeBtn.classList.toggle('bg-sky-900', isWire);
    }
  });

  toggleDeformationBtn.addEventListener('click', () => {
    if (state.viewer3d) {
      const isDeform = state.viewer3d.toggleDeformation();
      toggleDeformationBtn.classList.toggle('bg-amber-900', isDeform);
    }
  });

  resetCameraBtn.addEventListener('click', () => {
    if (state.viewer3d) {
      state.viewer3d.resetCamera();
    }
  });

  // ========================================================
  // 4. CALCULATORS & CRITERIA CHECKERS
  // ========================================================
  // Calc 1: Weld
  const calcProfileSelect = document.getElementById('calcProfileSelect');
  const calcHalmaInput = document.getElementById('calcHalmaInput');
  const calcEspesorInput = document.getElementById('calcEspesorInput');
  const calcMRange = document.getElementById('calcMRange');
  const calcMVal = document.getElementById('calcMVal');
  const calcMRatio = document.getElementById('calcMRatio');
  const calcWeldStatusBadge = document.getElementById('calcWeldStatusBadge');
  const calcWeldExplanation = document.getElementById('calcWeldExplanation');
  const calcGargantaMax = document.getElementById('calcGargantaMax');

  const ipeProfiles = {
    '160': { halma: 127, e: 5.0 },
    '200': { halma: 159, e: 5.6 },
    '240': { halma: 190, e: 6.2 },
    '300': { halma: 249, e: 7.1 },
    '360': { halma: 299, e: 8.0 },
    '400': { halma: 331, e: 8.6 },
    '500': { halma: 415, e: 10.2 }
  };

  calcProfileSelect.addEventListener('change', () => {
    const val = calcProfileSelect.value;
    if (ipeProfiles[val]) {
      calcHalmaInput.value = ipeProfiles[val].halma;
      calcEspesorInput.value = ipeProfiles[val].e;
      calcMRange.max = Math.round(ipeProfiles[val].halma * 1.1);
      calcMRange.value = Math.round(ipeProfiles[val].halma * 0.58);
      updateWeldCalculation();
    }
  });

  calcHalmaInput.addEventListener('input', updateWeldCalculation);
  calcEspesorInput.addEventListener('input', updateWeldCalculation);
  calcMRange.addEventListener('input', updateWeldCalculation);

  function updateWeldCalculation() {
    const halma = parseFloat(calcHalmaInput.value) || 200;
    const e = parseFloat(calcEspesorInput.value) || 7.0;
    const m = parseFloat(calcMRange.value);

    calcMVal.textContent = m;
    const ratio = (m / halma) * 100;
    calcMRatio.textContent = `${ratio.toFixed(1)}% de halma`;

    const minArtic = halma * 0.5;
    const maxArtic = halma * (2 / 3);

    const gMax = 0.60 * e;
    calcGargantaMax.textContent = `g_max ≈ ${gMax.toFixed(2)} mm`;

    if (m >= minArtic && m <= maxArtic) {
      calcWeldStatusBadge.className = 'text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      calcWeldStatusBadge.textContent = 'NUDO ARTICULADO ✓';
      calcWeldExplanation.textContent = `La longitud m (${m} mm) se encuentra en el rango admisible [${minArtic.toFixed(1)} mm - ${maxArtic.toFixed(1)} mm] (1/2 halma ≤ m ≤ 2/3 halma). Permite el giro elástico y no induce flexión en el soporte.`;
    } else if (m > maxArtic) {
      calcWeldStatusBadge.className = 'text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30';
      calcWeldStatusBadge.textContent = 'NUDO SEMIRRÍGIDO ⚠️';
      calcWeldExplanation.textContent = `La soldadura supera los 2/3 de halma (${maxArtic.toFixed(1)} mm). El nudo adquiere rigidez excesiva, restringe el giro y transmitirá momento flector imprevisto al pilar.`;
    } else {
      calcWeldStatusBadge.className = 'text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30';
      calcWeldStatusBadge.textContent = 'LONGITUD INSUFICIENTE ⚠️';
      calcWeldExplanation.textContent = `La soldadura es menor a 1/2 de halma (${minArtic.toFixed(1)} mm). Riesgo de sobretensión por esfuerzo cortante en los cordones de ángulo.`;
    }
  }

  // Calc 2: Thermal Expansion
  const calcLengthInput = document.getElementById('calcLengthInput');
  const calcDeltaTInput = document.getElementById('calcDeltaTInput');
  const calcThermalStatusBadge = document.getElementById('calcThermalStatusBadge');
  const calcDeltaLVal = document.getElementById('calcDeltaLVal');
  const calcHolguraColiso = document.getElementById('calcHolguraColiso');
  const calcThermalAdvice = document.getElementById('calcThermalAdvice');

  function updateThermalCalculation() {
    const L = parseFloat(calcLengthInput.value) || 30;
    const dT = parseFloat(calcDeltaTInput.value) || 40;
    const alpha = 1.2e-5; // 1/ºC

    const deltaL_mm = alpha * L * dT * 1000;
    calcDeltaLVal.textContent = `${deltaL_mm.toFixed(2)} mm`;

    const holgura = Math.max(15, Math.ceil(deltaL_mm * 1.4));
    calcHolguraColiso.textContent = `≥ ${holgura} mm`;

    if (L <= 40) {
      calcThermalStatusBadge.className = 'text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      calcThermalStatusBadge.textContent = 'CUMPLE L ≤ 40 m ✓';
      calcThermalAdvice.textContent = `La longitud de ${L} m está dentro del límite máximo admitido de 40 metros. No es estrictamente necesaria una junta intermedia adicional.`;
    } else {
      calcThermalStatusBadge.className = 'text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30';
      calcThermalStatusBadge.textContent = 'EXCEDE 40 m ⚠️';
      calcThermalAdvice.textContent = `¡Atención! La longitud de ${L} m supera los 40 m máximos permitidos por NCSR-02 / E.T.S.I.E. Debe dividirse el edificio con al menos una junta de dilatación (Tipos 1 a 5).`;
    }
  }
  calcLengthInput.addEventListener('input', updateThermalCalculation);
  calcDeltaTInput.addEventListener('input', updateThermalCalculation);

  // Tool 3: Joint Decision Tree
  const jointDirParallel = document.getElementById('jointDirParallel');
  const jointDirPerp = document.getElementById('jointDirPerp');
  const jointPillarDouble = document.getElementById('jointPillarDouble');
  const jointPillarSingle = document.getElementById('jointPillarSingle');
  const jointDecisionTypeBadge = document.getElementById('jointDecisionTypeBadge');
  const jointDecisionTitle = document.getElementById('jointDecisionTitle');
  const jointDecisionDetail = document.getElementById('jointDecisionDetail');
  const jumpToJointSlideBtn = document.getElementById('jumpToJointSlideBtn');

  function updateJointDecision() {
    let typeName = 'TIPO 1';
    let title = '';
    let detail = '';
    let targetSlide = 40;

    if (state.jointDir === 'parallel') {
      if (state.jointPillar === 'double') {
        typeName = 'TIPO 1';
        title = 'Paralela al Forjado — Doble Pilar / Doble Viga';
        detail = 'Separación mínima entre soportes ≥ 5 cm. Nudos de cualquier tipo (rígidos, semirrígidos o articulados). Cada bloque es independiente.';
        targetSlide = 40;
      } else {
        typeName = 'TIPO 2';
        title = 'Paralela al Forjado — Único Pilar / Doble Viga';
        detail = 'Se mantiene una sola línea de pilares. Un apoyo de viga es fijo y el adyacente es móvil deslizante con coliso y holgura "e".';
        targetSlide = 42;
      }
    } else {
      if (state.jointPillar === 'double') {
        typeName = 'TIPO 3';
        title = 'Perpendicular al Forjado — Doble Pilar / Doble Viga';
        detail = 'Corta transversalmente la dirección de las viguetas. Doble pilar con separación ≥ 5 cm y doble viga portante.';
        targetSlide = 44;
      } else {
        typeName = 'TIPO 4 / TIPO 5';
        title = 'Perpendicular al Forjado — Único Pilar';
        detail = 'Tipo 4: Doble viga con apoyo deslizante (interrumpida o pasante). Tipo 5: Única viga pasante con apoyos deslizantes en el forjado.';
        targetSlide = 45;
      }
    }

    jointDecisionTypeBadge.textContent = typeName;
    jointDecisionTitle.textContent = title;
    jointDecisionDetail.textContent = detail;
    jumpToJointSlideBtn.textContent = `Ver diapositiva de detalle (Slide ${targetSlide}) →`;
    jumpToJointSlideBtn.onclick = () => {
      switchTab('content');
      const idx = allSlides.findIndex(s => s.slideNumber === targetSlide);
      if (idx !== -1) goToSlide(idx);
    };
  }

  jointDirParallel.addEventListener('click', () => {
    state.jointDir = 'parallel';
    jointDirParallel.className = 'joint-dir-btn p-2.5 rounded-lg border border-sky-500/50 bg-sky-950/40 text-sky-300 text-left';
    jointDirPerp.className = 'joint-dir-btn p-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 text-left';
    updateJointDecision();
  });
  jointDirPerp.addEventListener('click', () => {
    state.jointDir = 'perp';
    jointDirPerp.className = 'joint-dir-btn p-2.5 rounded-lg border border-sky-500/50 bg-sky-950/40 text-sky-300 text-left';
    jointDirParallel.className = 'joint-dir-btn p-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 text-left';
    updateJointDecision();
  });

  jointPillarDouble.addEventListener('click', () => {
    state.jointPillar = 'double';
    jointPillarDouble.className = 'joint-pillar-btn p-2.5 rounded-lg border border-sky-500/50 bg-sky-950/40 text-sky-300 text-left';
    jointPillarSingle.className = 'joint-pillar-btn p-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 text-left';
    updateJointDecision();
  });
  jointPillarSingle.addEventListener('click', () => {
    state.jointPillar = 'single';
    jointPillarSingle.className = 'joint-pillar-btn p-2.5 rounded-lg border border-sky-500/50 bg-sky-950/40 text-sky-300 text-left';
    jointPillarDouble.className = 'joint-pillar-btn p-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 text-left';
    updateJointDecision();
  });

  // Tool 4: DB-SE-AE Checklist
  const chkSeAe1 = document.getElementById('chkSeAe1');
  const chkSeAe2 = document.getElementById('chkSeAe2');
  const chkSeAe3 = document.getElementById('chkSeAe3');
  const chkSeAeResult = document.getElementById('chkSeAeResult');

  function updateChecklist() {
    const allChecked = chkSeAe1.checked && chkSeAe2.checked && chkSeAe3.checked;
    if (allChecked) {
      chkSeAeResult.className = 'p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 flex items-center gap-2';
      chkSeAeResult.innerHTML = '<i data-lucide="shield-check" class="w-5 h-5 text-emerald-400"></i><span>¡La disposición estructural CUMPLE íntegramente el Art. 5.3 DB-SE-AE!</span>';
    } else {
      chkSeAeResult.className = 'p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-300 flex items-center gap-2';
      chkSeAeResult.innerHTML = '<i data-lucide="alert-triangle" class="w-5 h-5 text-rose-400"></i><span>INCUMPLIMIENTO NORMATIVO: Riesgo de mecanismo cinemático o torsión.</span>';
    }
    if (window.lucide) lucide.createIcons();
  }
  chkSeAe1.addEventListener('change', updateChecklist);
  chkSeAe2.addEventListener('change', updateChecklist);
  chkSeAe3.addEventListener('change', updateChecklist);

  // ========================================================
  // 5. QUIZ / EXAM MODE
  // ========================================================
  const quizScoreText = document.getElementById('quizScoreText');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizQuestionTitle = document.getElementById('quizQuestionTitle');
  const quizOptionsContainer = document.getElementById('quizOptionsContainer');
  const quizFeedbackBox = document.getElementById('quizFeedbackBox');
  const quizNextBtn = document.getElementById('quizNextBtn');
  const quizRestartBtn = document.getElementById('quizRestartBtn');
  const quizQuestionBox = document.getElementById('quizQuestionBox');
  const quizCompletedBox = document.getElementById('quizCompletedBox');
  const quizFinalScoreSummary = document.getElementById('quizFinalScoreSummary');
  const quizRetryFinalBtn = document.getElementById('quizRetryFinalBtn');

  function renderQuizQuestion() {
    state.quizAnswered = false;
    quizFeedbackBox.classList.add('hidden');
    quizNextBtn.classList.add('opacity-50', 'pointer-events-none');

    const total = COURSE_DATA.quizQuestions.length;
    quizScoreText.textContent = `Pregunta ${state.quizIndex + 1} de ${total}`;
    quizProgressBar.style.width = `${((state.quizIndex + 1) / total) * 100}%`;

    const q = COURSE_DATA.quizQuestions[state.quizIndex];
    quizQuestionTitle.textContent = q.question;
    quizOptionsContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'quiz-opt-btn w-full text-left p-3.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm transition-all flex items-center justify-between';
      optBtn.innerHTML = `
        <span>${opt}</span>
        <span class="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-400">
          ${String.fromCharCode(65 + idx)}
        </span>
      `;

      optBtn.addEventListener('click', () => {
        if (state.quizAnswered) return;
        handleQuizAnswer(idx, q);
      });

      quizOptionsContainer.appendChild(optBtn);
    });
  }

  function handleQuizAnswer(selectedIdx, q) {
    state.quizAnswered = true;
    quizNextBtn.classList.remove('opacity-50', 'pointer-events-none');

    const buttons = quizOptionsContainer.querySelectorAll('.quiz-opt-btn');
    const isCorrect = selectedIdx === q.correct;

    if (isCorrect) {
      state.quizScore++;
    }

    buttons.forEach((btn, idx) => {
      if (idx === q.correct) {
        btn.className = 'quiz-opt-btn w-full text-left p-3.5 rounded-xl border border-emerald-500 bg-emerald-950/40 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center justify-between';
      } else if (idx === selectedIdx && !isCorrect) {
        btn.className = 'quiz-opt-btn w-full text-left p-3.5 rounded-xl border border-rose-500 bg-rose-950/40 text-rose-200 text-xs sm:text-sm flex items-center justify-between';
      } else {
        btn.classList.add('opacity-40');
      }
    });

    quizFeedbackBox.classList.remove('hidden');
    if (isCorrect) {
      quizFeedbackBox.className = 'p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm space-y-1';
      quizFeedbackBox.innerHTML = `<strong>¡Correcto!</strong> <p class="text-xs text-slate-300 mt-1">${q.explanation}</p>`;
    } else {
      quizFeedbackBox.className = 'p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-200 text-xs sm:text-sm space-y-1';
      quizFeedbackBox.innerHTML = `<strong>Respuesta incorrecta.</strong> <p class="text-xs text-slate-300 mt-1">${q.explanation}</p>`;
    }
  }

  quizNextBtn.addEventListener('click', () => {
    if (state.quizIndex < COURSE_DATA.quizQuestions.length - 1) {
      state.quizIndex++;
      renderQuizQuestion();
    } else {
      showQuizCompleted();
    }
  });

  function showQuizCompleted() {
    quizQuestionBox.classList.add('hidden');
    quizNextBtn.classList.add('hidden');
    quizCompletedBox.classList.remove('hidden');

    const total = COURSE_DATA.quizQuestions.length;
    const pct = Math.round((state.quizScore / total) * 100);
    quizFinalScoreSummary.textContent = `Has acertado ${state.quizScore} de ${total} preguntas (${pct}%). ${
      pct >= 70 ? '¡Excelente! Tienes los conceptos dominados.' : 'Te sugerimos repasar las diapositivas y fórmulas.'
    }`;
  }

  function restartQuiz() {
    state.quizIndex = 0;
    state.quizScore = 0;
    quizQuestionBox.classList.remove('hidden');
    quizNextBtn.classList.remove('hidden');
    quizCompletedBox.classList.add('hidden');
    renderQuizQuestion();
  }
  quizRestartBtn.addEventListener('click', restartQuiz);
  quizRetryFinalBtn.addEventListener('click', restartQuiz);

  // ========================================================
  // 6. FLASHCARDS 3D
  // ========================================================
  const activeFlashcard = document.getElementById('activeFlashcard');
  const fcCategory = document.getElementById('fcCategory');
  const fcCounter = document.getElementById('fcCounter');
  const fcFrontText = document.getElementById('fcFrontText');
  const fcBackText = document.getElementById('fcBackText');
  const fcTip = document.getElementById('fcTip');
  const fcPrevBtn = document.getElementById('fcPrevBtn');
  const fcNextBtn = document.getElementById('fcNextBtn');
  const fcFlipBtn = document.getElementById('fcFlipBtn');

  function renderFlashcard() {
    state.flashcardFlipped = false;
    activeFlashcard.classList.remove('is-flipped');

    const total = COURSE_DATA.flashcards.length;
    const card = COURSE_DATA.flashcards[state.flashcardIndex];

    fcCategory.textContent = card.category;
    fcCounter.textContent = `${state.flashcardIndex + 1} / ${total}`;
    fcFrontText.textContent = card.front;
    fcBackText.textContent = card.back;
    fcTip.textContent = card.tip;
  }

  function toggleFlashcardFlip() {
    state.flashcardFlipped = !state.flashcardFlipped;
    activeFlashcard.classList.toggle('is-flipped', state.flashcardFlipped);
  }

  activeFlashcard.addEventListener('click', toggleFlashcardFlip);
  fcFlipBtn.addEventListener('click', toggleFlashcardFlip);

  fcPrevBtn.addEventListener('click', () => {
    state.flashcardIndex = (state.flashcardIndex - 1 + COURSE_DATA.flashcards.length) % COURSE_DATA.flashcards.length;
    renderFlashcard();
  });
  fcNextBtn.addEventListener('click', () => {
    state.flashcardIndex = (state.flashcardIndex + 1) % COURSE_DATA.flashcards.length;
    renderFlashcard();
  });

  // ========================================================
  // 7. VISUAL GALLERY
  // ========================================================
  const galleryGridContainer = document.getElementById('galleryGridContainer');
  const galleryModuleFilter = document.getElementById('galleryModuleFilter');

  function renderGallery() {
    galleryGridContainer.innerHTML = '';
    const selectedMod = galleryModuleFilter.value;

    allSlides.forEach(slide => {
      if (selectedMod !== 'all' && slide.moduleNumber.toString() !== selectedMod) {
        return;
      }

      slide.images.forEach((imgName, imgIdx) => {
        const item = document.createElement('div');
        item.className = 'glass-panel rounded-xl overflow-hidden cursor-pointer group hover:border-sky-500/50 transition-all border border-slate-800';
        item.innerHTML = `
          <div class="aspect-square bg-slate-950 flex items-center justify-center p-2 overflow-hidden">
            <img 
              src="assets/media/${imgName}" 
              alt="${imgName}" 
              class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div class="p-2.5 bg-slate-900 text-[11px] space-y-0.5 border-t border-slate-800">
            <span class="font-mono text-amber-400 font-bold block text-[10px]">Slide ${slide.slideNumber}</span>
            <p class="font-semibold text-slate-200 line-clamp-1">${slide.title}</p>
          </div>
        `;

        item.addEventListener('click', () => {
          openLightbox(`assets/media/${imgName}`, `Slide ${slide.slideNumber}: ${slide.title}`);
        });

        galleryGridContainer.appendChild(item);
      });
    });
  }

  galleryModuleFilter.addEventListener('change', renderGallery);

  // ========================================================
  // 8. LIGHTBOX MODAL & IMAGE ZOOM
  // ========================================================
  function openLightbox(src, caption) {
    state.lightboxImageSrc = src;
    state.lightboxZoom = 1.0;
    lightboxImg.src = src;
    lightboxImg.style.transform = `scale(1.0)`;
    zoomLevelText.textContent = '100%';
    lightboxCaption.textContent = caption;
    lightboxModal.classList.remove('hidden');
  }

  function closeLightbox() {
    lightboxModal.classList.add('hidden');
    lightboxImg.src = '';
  }

  closeLightboxBtn.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  zoomInBtn.addEventListener('click', () => {
    state.lightboxZoom = Math.min(3.5, state.lightboxZoom + 0.3);
    lightboxImg.style.transform = `scale(${state.lightboxZoom})`;
    zoomLevelText.textContent = `${Math.round(state.lightboxZoom * 100)}%`;
  });

  zoomOutBtn.addEventListener('click', () => {
    state.lightboxZoom = Math.max(0.6, state.lightboxZoom - 0.3);
    lightboxImg.style.transform = `scale(${state.lightboxZoom})`;
    zoomLevelText.textContent = `${Math.round(state.lightboxZoom * 100)}%`;
  });

  resetZoomBtn.addEventListener('click', () => {
    state.lightboxZoom = 1.0;
    lightboxImg.style.transform = `scale(1.0)`;
    zoomLevelText.textContent = '100%';
  });

  // ESC to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  // ========================================================
  // INITIALIZATION
  // ========================================================
  renderModulesOverview();
  renderSlideList();
  renderActiveSlide();
  renderQuizQuestion();
  renderFlashcard();
  renderGallery();
  updateBookmarkBadge();
  updateWeldCalculation();
  updateThermalCalculation();
  updateJointDecision();
  updateChecklist();
});
