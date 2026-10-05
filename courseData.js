// Comprehensive data structure for CIV_L3: Sistemas Estructurales
const COURSE_DATA = {
  meta: {
    code: "CIV_L3",
    subject: "Construcción IV - E.T.S.I.E.",
    title: "Sistemas Estructurales: Tipología, Uniones, Arriostramientos y Juntas",
    subtitle: "Plataforma Interactiva de Estudio de Ingeniería de la Edificación y Estructuras Metálicas",
    edition: "2025/2026",
    slidesCount: 49,
    imagesCount: 63
  },
  modules: [
    {
      id: "mod-1",
      number: 1,
      title: "Introducción y Perfiles Laminados",
      shortTitle: "Perfiles y Entramados",
      icon: "layers",
      slidesRange: [1, 9],
      badge: "Fundamentos",
      description: "Tipología de perfiles de acero laminado (IPE, HEB, HEA, HEM, UPN), conceptos de modulación de entramados ortogonales y esquematización de juntas en planta.",
      topics: [
        "Clasificación de perfiles laminados en caliente y huecos",
        "Configuración de entramados: soportes HEB y vigas IPE",
        "Dirección de forjado y luces de vigas",
        "Identificación de juntas de dilatación en planta (JD1, JD2, JDA, JDB, JDC)"
      ],
      slides: [
        {
          slideNumber: 1,
          title: "Índice General del Tema CIV_L3",
          category: "General",
          images: [],
          content: `
            <p class="lead">Esquema temático del curso de Tipología Estructural en Estructura Metálica.</p>
            <div class="grid md:grid-cols-2 gap-4 mt-4">
              <div class="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <h4 class="font-semibold text-amber-400 mb-2">Bloques Estructurales</h4>
                <ul class="space-y-1.5 text-sm text-slate-300">
                  <li><strong>1. Introducción:</strong> Esquemas y entramados.</li>
                  <li><strong>2. Estructuras Totalmente Isostáticas:</strong> Nudos articulados.</li>
                  <li><strong>3. Estructuras de Vigas Continuas:</strong> Nudos articulados continuos.</li>
                  <li><strong>4. Estructuras Hiperestáticas:</strong> Nudos rígidos.</li>
                </ul>
              </div>
              <div class="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <h4 class="font-semibold text-amber-400 mb-2">Comportamiento Global</h4>
                <ul class="space-y-1.5 text-sm text-slate-300">
                  <li><strong>5. Estructuras Especiales:</strong> Celosías Pratt, Vierendeel y Arco Poligonal.</li>
                  <li><strong>6. Estabilidad Horizontal:</strong> Arriostrados según DB-SE-AE Art. 5.3.</li>
                  <li><strong>7. Juntas en Edificación Metálica:</strong> Paralelas y perpendiculares a forjado.</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          slideNumber: 2,
          title: "Perfiles y Entramados Estructurales",
          category: "Introducción",
          images: [],
          content: `
            <p>Los entramados metálicos constituyen la osamenta resistente del edificio formada por barras verticales (soportes o pilares) y horizontales (vigas principales, jácenas o carreras y viguetas secundarias).</p>
            <div class="p-4 my-3 rounded-lg bg-blue-950/30 border border-blue-800/40 text-blue-200 text-sm">
              <strong>Clave de diseño:</strong> La elección del tipo de nudo (articulado o rígido) condiciona completamente el diagrama de momentos flectores, las deformaciones y la necesidad de arriostramientos para la estabilidad global del edificio.
            </div>
          `
        },
        {
          slideNumber: 3,
          title: "Familias de Perfiles Laminados en Caliente",
          category: "Perfiles",
          images: ["image1.jpeg"],
          content: `
            <p>Las secciones de perfiles metálicos estandarizados de acero estructural comprenden:</p>
            <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300">
              <li><strong>Serie IPE:</strong> Perfiles de alas paralelas con alma esbelta. Ideales para <em>vigas sometidas a flexión simple</em> en el plano fuerte.</li>
              <li><strong>Series HE (HEA, HEB, HEM):</strong> Perfiles de alas anchas. Con alto radio de giro en ambos ejes, óptimos para <em>soportes a compresión y flexocompresión</em> (HEB estándar, HEA ligero, HEM reforzado).</li>
              <li><strong>Serie UPN:</strong> Perfiles en U, utilizados en pares empresillados para pilares compuestos o correas.</li>
              <li><strong>Perfiles Angulares (L):</strong> Para celosías, cruces de arriostramiento y casquillos de unión.</li>
            </ul>
          `
        },
        {
          slideNumber: 4,
          title: "Dimensiones y Geometría de Perfiles Estructurales",
          category: "Perfiles",
          images: ["image3.png", "image2.png"],
          content: `
            <p>Estudio de las relaciones geométricas de las tablas normalizadas de perfiles de acero laminado:</p>
            <div class="grid sm:grid-cols-2 gap-3 my-3 text-sm">
              <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-700">
                <span class="text-xs uppercase tracking-wider text-slate-400">Parámetros Críticos</span>
                <p class="font-mono text-cyan-300 mt-1">h: Canto total<br>b: Ancho de ala<br>tw / ea: Espesor del alma<br>tf / ef: Espesor del ala<br>r: Radio de acuerdo</p>
              </div>
              <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-700">
                <span class="text-xs uppercase tracking-wider text-slate-400">Comportamiento Mecánico</span>
                <p class="text-slate-300 mt-1">El momento de inercia $I_y$ frente al eje fuerte es marcadamente superior en IPE, mientras que en HEB la relación $I_y/I_z$ es mucho más equilibrada, reduciendo la esbeltez por pandeo.</p>
              </div>
            </div>
          `
        },
        {
          slideNumber: 5,
          title: "Comparativa de Capacidades de Perfiles",
          category: "Perfiles",
          images: ["image5.png", "image4.png"],
          content: `
            <p>Análisis de secciones transversales y comparación de rendimiento peso/resistencia entre IPE y HEB:</p>
            <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300 mt-2">
              <li>En vigas de forjado, el perfil IPE proporciona mayor módulo resistente $W_y$ por kilogramo de acero utilizado.</li>
              <li>En pilares, los perfiles HEB ofrecen menor esbeltez mecánica $\\lambda = L_k / i$ frente a pandeo por eje débil ($z$).</li>
            </ul>
          `
        },
        {
          slideNumber: 6,
          title: "Detalles Seccionales y Normalización",
          category: "Perfiles",
          images: ["image7.png", "image6.png"],
          content: `
            <p>Tolerancias dimensionales, radios de curvatura interior y acuerdos alma-ala indispensables para verificar interferencias en las uniones soldadas y atornilladas.</p>
          `
        },
        {
          slideNumber: 7,
          title: "Configuración del Entramado Estructural en Planta",
          category: "Entramados",
          images: ["image8.png"],
          content: `
            <p>Disposición espacial de la retícula estructural en un edificio tipo de oficinas o residencial:</p>
            <div class="p-4 rounded-xl bg-slate-800/60 border border-slate-700 my-3">
              <ul class="space-y-2 text-sm text-slate-300">
                <li><strong class="text-white">Modulación de pilares:</strong> Rejilla ortogonal con luces habituales de 5 a 8 metros.</li>
                <li><strong class="text-white">Vigas maestras o carreras:</strong> Enlazan los soportes y reciben las cargas del forjado.</li>
                <li><strong class="text-white">Dirección de forjado:</strong> Define la orientación de las viguetas o chapa grecada, condicionando si las juntas de dilatación son paralelas o perpendiculares a la carga.</li>
              </ul>
            </div>
          `
        },
        {
          slideNumber: 8,
          title: "Plano General de Estructura Metálica",
          category: "Entramados",
          images: ["image9.png"],
          content: `
            <p>Vista general del entramado porticado con identificación de ejes estructurales, crujías y alineaciones.</p>
          `
        },
        {
          slideNumber: 9,
          title: "Esquema Maestro de Juntas de Dilatación en Entramado",
          category: "Entramados",
          images: ["image90.png", "image9.png", "image80.png", "image10.png"],
          content: `
            <p class="font-semibold text-amber-300">Plano de referencia para todo el proyecto CIV_L3:</p>
            <p class="text-sm text-slate-300 mt-1">Soportes estándar <strong class="text-white">HEB 300</strong> y vigas maestras <strong class="text-white">IPE 300</strong> con modulación de juntas:</p>
            <div class="grid sm:grid-cols-2 gap-3 my-3 text-sm">
              <div class="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg">
                <span class="font-bold text-emerald-400">Juntas Paralelas al Forjado</span>
                <ul class="mt-1 space-y-1 text-slate-300">
                  <li><strong>JD1:</strong> Doble pilar (separación $\\ge 5$ cm)</li>
                  <li><strong>JD2:</strong> Un pilar / dos vigas (apoyo deslizante)</li>
                </ul>
              </div>
              <div class="p-3 bg-purple-950/30 border border-purple-800/40 rounded-lg">
                <span class="font-bold text-purple-400">Juntas Perpendiculares al Forjado</span>
                <ul class="mt-1 space-y-1 text-slate-300">
                  <li><strong>JDA:</strong> Doble pilar / doble viga</li>
                  <li><strong>JDB:</strong> Un pilar / dos vigas</li>
                  <li><strong>JDC:</strong> Un pilar / una viga pasante</li>
                </ul>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-2",
      number: 2,
      title: "Estructuras Isostáticas: Nudos Articulados",
      shortTitle: "Nudos Articulados",
      icon: "git-commit",
      slidesRange: [10, 17],
      badge: "Uniones Isostáticas",
      description: "Análisis exhaustivo de nudos articulados soporte-viga en pórticos isostáticos: soldadura directa de alma, apoyos rigidizados y no rigidizados, casquillos angulares y reglas críticas de soldadura.",
      topics: [
        "Unión a): Soldadura directa de alma a soporte",
        "Unión b): Apoyo no rigidizado (chapa o perfil de apoyo)",
        "Unión c): Apoyo rigidizado con cartela inferior",
        "Unión d): Casquillos angulares soldados",
        "Unión e): Mixta soldada/atornillada con angulares",
        "Condición matemática: 1/2 h_alma ≤ m ≤ 2/3 h_alma",
        "Límite semirrígido: m ≥ 2/3 h_alma",
        "Dimensionado de garganta: g_max ≈ 0.60 e"
      ],
      slides: [
        {
          slideNumber: 10,
          title: "Clasificación de Pórticos y Nudos Articulados",
          category: "Teoría de Nudos",
          images: [],
          content: `
            <p>En una <strong>estructura totalmente isostática</strong>, todos los nudos de unión entre vigas y soportes se calculan y construyen como <strong>articulaciones perfectas</strong> (apoyos simples sin coacción al giro relativo).</p>
            <div class="p-3 my-2 bg-slate-800/50 rounded-lg border border-slate-700 text-sm">
              <strong class="text-cyan-300">Ventajas y Consecuencias:</strong>
              <ul class="list-disc pl-5 mt-1 space-y-1 text-slate-300">
                <li>No se transmiten momentos flectores de la viga al pilar (el pilar trabaja predominantemente a compresión centrada).</li>
                <li>El cálculo de esfuerzos es directo e insensible a pequeños asientos diferenciales.</li>
                <li><strong>Obligación:</strong> La estructura es deformable frente a esfuerzos horizontales; <em>requiere obligatoriamente un sistema de arriostramiento independiente</em> (triangulaciones).</li>
              </ul>
            </div>
          `
        },
        {
          slideNumber: 11,
          title: "Los 4 Tipos Básicos de Enlace Articulado Soporte-Viga",
          category: "Tipología de Nudo",
          images: ["image11.png", "image10.jpeg"],
          content: `
            <p>Resumen gráfico de las cuatro soluciones constructivas normalizadas:</p>
            <div class="grid sm:grid-cols-2 gap-3 my-3 text-sm">
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-amber-400 font-bold">a) Soldadura directa de alma</span>
                <p class="text-slate-400 text-xs mt-1">El alma de la viga se suelda frontalmente al soporte mediante cordones verticales de ángulo.</p>
              </div>
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-amber-400 font-bold">b) Apoyo no rigidizado</span>
                <p class="text-slate-400 text-xs mt-1">La viga apoya sobre un perfil angular o chapa en ménsula soldada al soporte sin cartela inferior.</p>
              </div>
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-amber-400 font-bold">c) Apoyo rigidizado</span>
                <p class="text-slate-400 text-xs mt-1">El perfil de apoyo se refuerza inferiormente con una cartela triangular soldada al soporte para grandes esfuerzos cortantes.</p>
              </div>
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-amber-400 font-bold">d) Casquillos angulares</span>
                <p class="text-slate-400 text-xs mt-1">La transmisión de cortante se realiza a través de perfiles en L soldados a ambos lados del alma.</p>
              </div>
            </div>
          `
        },
        {
          slideNumber: 12,
          title: "Detalle Constructivo 1: Soldadura Directa de Alma",
          category: "Detalle Constructivo",
          images: ["image10.jpeg", "image12.png", "image13.png"],
          content: `
            <div class="space-y-3">
              <div class="p-4 rounded-xl bg-amber-950/20 border border-amber-600/40 text-amber-200 text-sm">
                <h4 class="font-bold flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span> Regla Fundamental de Soldadura</h4>
                <p class="mt-1"><strong>Espesor de Garganta ($g$):</strong> La garganta del cordón está en función directa de los espesores a unir (alma $e$). Se adopta como valor máximo de diseño:
                <div class="text-base font-mono font-bold text-amber-300 my-1">g_{max} \\approx 0.60 \\cdot e</div>
                donde $e$ es el espesor del elemento más delgado (generalmente el alma de la viga IPE).</p>
              </div>
              <p class="text-sm text-slate-300">
                Separación constructiva recomendada: se mantiene una distancia libre de alas de <strong>15 mm a 30 cm</strong> para asegurar que las alas de la viga no toquen el soporte ni restrinjan el giro de la flexión.
              </p>
            </div>
          `
        },
        {
          slideNumber: 13,
          title: "Detalle Constructivo 2: Apoyo No Rigidizado",
          category: "Detalle Constructivo",
          images: ["image14.png", "image10.jpeg"],
          content: `
            <p>En la unión sobre apoyo no rigidizado, se suelda previamente al soporte un perfil en L o una chapa plana de asiento.</p>
            <ul class="list-disc pl-5 space-y-1.5 text-sm text-slate-300 mt-2">
              <li>Facilita enormemente el montaje en obra, ya que la viga descansa en el asiento antes de recibir la soldadura de fijación.</li>
              <li>La longitud de la chapa de apoyo suele ser de unos 30 cm con espesores estándar de 15 mm.</li>
              <li>El ala inferior de la viga apoya libremente o se puntea ligeramente para evitar desplazamientos accidentales sin coaccionar el giro.</li>
            </ul>
          `
        },
        {
          slideNumber: 14,
          title: "Detalle Constructivo 3: Apoyo Rigidizado con Cartela",
          category: "Detalle Constructivo",
          images: ["image15.png", "image10.jpeg"],
          content: `
            <p>Cuando la reacción de apoyo (esfuerzo cortante $V_{Ed}$) es elevada, el angular o chapa de asiento flectaría si estuviera en voladizo.</p>
            <div class="p-3 my-2 bg-slate-900 border border-slate-700 rounded-lg text-sm">
              <strong class="text-cyan-300">Mecanismo de la Cartela Rigidizadora:</strong>
              <p class="mt-1 text-slate-300">Se añade una chapa triangular o trapecial vertical soldada por debajo del asiento y a la cara del soporte. La cartela traslada la fuerza cortante directamente al soporte como compresión y rasante, multiplicando la capacidad portante sin rigidizar a flexión la viga.</p>
            </div>
          `
        },
        {
          slideNumber: 15,
          title: "Detalle Constructivo 4: Unión con Angulares de Alma",
          category: "Detalle Constructivo",
          images: ["image16.png", "image10.jpeg"],
          content: `
            <p>Se disponen dos perfiles angulares (L) colocados simétricamente a ambos lados del alma de la viga.</p>
            <p class="text-sm text-slate-300 mt-1">Los angulares se sueldan verticalmente a la cara del pilar y a las caras laterales del alma. Al no vincular las alas superior ni inferior, el par de fuerzas de momento flector no puede desarrollarse y el nudo opera como articulado.</p>
          `
        },
        {
          slideNumber: 16,
          title: "Criterio de Longitud de Soldadura: Nudo Articulado vs Semirrígido",
          category: "Fórmula Clave",
          images: ["image17.jpeg", "image10.jpeg"],
          content: `
            <div class="space-y-4">
              <div class="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-amber-950/30 to-slate-900 border border-amber-500/50">
                <span class="text-xs uppercase tracking-widest font-black text-amber-400">¡REGLA DE ORO DE EXAMEN CIV_L3!</span>
                <div class="grid sm:grid-cols-2 gap-4 mt-3">
                  <div class="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-lg">
                    <span class="font-bold text-emerald-300 text-sm">NUDO ARTICULADO</span>
                    <div class="text-lg font-mono font-black text-emerald-400 my-1">
                      \\frac{1}{2} h_{alma} \\le m \\le \\frac{2}{3} h_{alma}
                    </div>
                    <p class="text-xs text-slate-300">La longitud de soldadura $m$ debe cubrir entre el 50% y el 66.7% de la altura neta del alma ($h_{alma}$). Asegura flexibilidad al giro.</p>
                  </div>
                  <div class="p-3 bg-rose-950/40 border border-rose-500/50 rounded-lg">
                    <span class="font-bold text-rose-300 text-sm">NUDO SEMIRRÍGIDO</span>
                    <div class="text-lg font-mono font-black text-rose-400 my-1">
                      m \\ge \\frac{2}{3} h_{alma}
                    </div>
                    <p class="text-xs text-slate-300">Si la soldadura $m$ supera los dos tercios del canto del alma, la unión adquiere rigidez a flexión excesiva y pasa a comportarse como semirrígida.</p>
                  </div>
                </div>
              </div>
              <p class="text-xs text-slate-400">Si la soldadura es demasiado corta ($m < \\frac{1}{2} h_{alma}$), no resiste la solicitación de cortante; si es demasiado larga ($m > \\frac{2}{3} h_{alma}$), se coacciona el giro y aparecen momentos parásitos no previstos.</p>
            </div>
          `
        },
        {
          slideNumber: 17,
          title: "Detalle Constructivo 5: Unión Mixta Soldada / Atornillada",
          category: "Detalle Constructivo",
          images: ["image18.png", "image10.jpeg"],
          content: `
            <p>La unión e) combina dos procesos de ejecución:</p>
            <ul class="list-disc pl-5 space-y-1.5 text-sm text-slate-300 mt-2">
              <li><strong>Taller:</strong> Los casquillos angulares se sueldan de fábrica al soporte en posición controlada.</li>
              <li><strong>Obra:</strong> La viga se introduce entre los angulares y se conecta mediante <em>tornillos de alta resistencia</em> que atraviesan los taladros del alma.</li>
              <li>Esta solución elimina soldaduras en obra de difícil ejecución postural y acelera extraordinariamente los tiempos de izado y montaje.</li>
            </ul>
          `
        }
      ]
    },
    {
      id: "mod-3",
      number: 3,
      title: "Entramados de Vigas Continuas (Isostáticas)",
      shortTitle: "Vigas Continuas",
      icon: "trending-up",
      slidesRange: [18, 23],
      badge: "Vigas Continuas",
      description: "Soluciones de continuidad de vigas en nudos articulados: soportes compuestos UPN empresillados con 4 presillas mínimas, vigas gemelas y apoyos sobre barra maciza de pilar discontinuo.",
      topics: [
        "Soporte compuesto UPN empresillado abierto (4 presillas mínimas, 3 huecos)",
        "Dimensiones de presillas: 300 mm, 200 mm, separación 100 cm",
        "Paso de viga IPE por el interior del soporte UPN",
        "Soporte simple con Viga Gemela empresillada",
        "Soporte compuesto cerrado + Viga Gemela con/sin junta de dilatación",
        "Pilar simple con viga continua y apoyo en barra maciza redonda (vuelo 10-15 mm)"
      ],
      slides: [
        {
          slideNumber: 18,
          title: "Concepto de Viga Continua con Nudos Articulados",
          category: "Vigas Continuas",
          images: [],
          content: `
            <p>Una <strong>viga continua</strong> apoyada sobre múltiples soportes reduce drásticamente el momento flector positivo en el centro de vano ($M_{max} = qL^2/8$ en biapoyada frente a $\\approx qL^2/12$ a $qL^2/16$ en continua) a cambio de generar momentos negativos en los apoyos.</p>
            <p class="text-sm text-slate-300 mt-2">Sin embargo, cuando los nudos de soporte son articulados, el pilar no resiste momento flector de la viga: la continuidad es <em>exclusiva de la viga consigo misma</em> a través de los apoyos.</p>
          `
        },
        {
          slideNumber: 19,
          title: "Soporte Compuesto UPN Empresillado Abierto",
          category: "Soporte Compuesto",
          images: ["image19.png", "image22.png", "image21.png", "image20.png"],
          content: `
            <div class="space-y-3">
              <p>El pilar se materializa con dos perfiles UPN enfrentados, separados una distancia suficiente para permitir el paso continuo de la viga IPE por su interior.</p>
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-700 text-sm">
                <span class="text-amber-400 font-bold">Reglas Constructivas Clave:</span>
                <ul class="list-disc pl-5 mt-1 space-y-1 text-slate-300 text-xs">
                  <li><strong>Presillas Mínimas:</strong> Se deben disponer como mínimo <strong class="text-amber-300">4 presillas por planta</strong>, delimitando <strong class="text-amber-300">3 huecos</strong> libres.</li>
                  <li><strong>Dimensiones de Presilla:</strong> Chapas de 300 mm de ancho, 200 mm de altura o 410×250 mm según esfuerzo.</li>
                  <li><strong>Separación entre Presillas:</strong> Aproximadamente 100 cm entre ejes para garantizar el arriostramiento contra pandeo individual de las ramas.</li>
                  <li><strong>Chapa de Asiento:</strong> Espesor de 40 mm, longitud mayor que el ala de la viga, soldada a tope al soporte. Garganta $g \\approx 5$ mm ($g \\approx 0.6 e$).</li>
                  <li><strong>Rigidización del Alma:</strong> Es necesario rigidizar el alma de la viga en la zona de paso para absorber la compresión concentrada.</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          slideNumber: 20,
          title: "Detalles y Cordones de Soldadura en Soporte UPN",
          category: "Detalle Constructivo",
          images: ["image19.png", "image24.png", "image23.png", "image22.png", "image21.png"],
          content: `
            <p>Secciones y alzados constructivos del encuentro:</p>
            <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300 mt-2">
              <li>El vuelo lateral de la chapa de apoyo debe ser de al menos 40 mm más ancho que el ala de la viga para alojar cordones de ángulo longitudinales.</li>
              <li>Espesores de presilla calibrados para asegurar que el radio de giro equivalente del soporte compuesto cumpla la esbeltez mecánica global.</li>
            </ul>
          `
        },
        {
          slideNumber: 21,
          title: "Solución de Viga Gemela sobre Soporte Simple",
          category: "Viga Gemela",
          images: ["image25.png", "image26.png"],
          content: `
            <p>Cuando el pilar es continuo y de perfil simple (por ejemplo un HEB continuo de planta a planta), no es posible atravesarlo con una viga simple.</p>
            <div class="p-3 rounded-lg bg-slate-900 border border-slate-700 text-sm my-2">
              <strong class="text-cyan-300">La Solución de Viga Gemela:</strong>
              <p class="mt-1 text-slate-300">Se disponen <strong class="text-white">dos vigas IPE idénticas de la misma serie y canto</strong>, colocadas paralelamente abrazando el pilar a ambos lados. Las dos vigas se empresillan entre sí a lo largo del vano para trabajar solidariamente y apoyan en angulares o perfiles soldados a las caras del pilar.</p>
            </div>
          `
        },
        {
          slideNumber: 22,
          title: "Soporte Compuesto Cerrado + Viga Gemela",
          category: "Viga Gemela",
          images: ["image25.png", "image27.png", "image26.png"],
          content: `
            <p>Variante para grandes cargas y edificios de múltiples alturas: combinación de un soporte compuesto cerrado (dos UPN soldados con chapa continua de cierre) con una viga gemela continua.</p>
            <p class="text-sm text-slate-300 mt-2">Permite resolver al mismo tiempo la continuidad estructural y alojar <em>juntas de dilatación con apoyos deslizantes</em> en una de las dos vigas del par gemelo.</p>
          `
        },
        {
          slideNumber: 23,
          title: "Soporte Simple + Viga Simple con Pilar Discontinuo",
          category: "Pilar Discontinuo",
          images: [],
          content: `
            <div class="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-sm space-y-2">
              <h4 class="font-bold text-amber-300">Mecanismo de Barra Maciza y Vuelo de Chapa</h4>
              <p class="text-slate-300">En este caso, <strong class="text-white">el pilar no tiene continuidad física vertical</strong>. El pilar inferior culmina en una placa de coronación.</p>
              <ul class="list-disc pl-5 space-y-1 text-slate-300">
                <li>La viga IPE pasa continua sobre la placa de coronación del soporte.</li>
                <li>Para materializar una línea de apoyo articulada perfecta y permitir el libre giro, la viga se apoya sobre un <strong class="text-amber-400">redondo o barra maciza rectangular</strong> de acero calibrado.</li>
                <li><strong>Vuelo de chapa:</strong> Se exige un vuelo de chapa de <strong class="text-cyan-300">10 a 15 mm</strong> a cada lado.</li>
                <li>El pilar de la planta superior arranca apoyado directamente sobre la cara superior de la viga, provisto de su propia placa base y rigidizadores de alma alineados.</li>
              </ul>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-4",
      number: 4,
      title: "Estructuras Hiperestáticas: Nudos Rígidos",
      shortTitle: "Nudos Rígidos",
      icon: "maximize-2",
      slidesRange: [24, 29],
      badge: "Hiperestáticas",
      description: "Diseño y detalle de nudos rígidos capaces de transmitir momento flector completo: rigidizadores trapezoidales, cartelas en nudos extremos y medianeros, reducciones fuertes de pilar y vigas de distinto canto.",
      topics: [
        "Definición y diagrama de momento en nudos rígidos",
        "Soporte simple y viga simple con rigidizadores de alma",
        "Viga de mayor sección que soporte: rigidizadores trapezoidales",
        "Nudos rígidos extremos/medianeros con reducciones de sección",
        "Nudos rígidos intermedios con reducción fuerte de pilar",
        "Viga continua de distinto canto mediante cartelas y refuerzos"
      ],
      slides: [
        {
          slideNumber: 24,
          title: "Fundamentos de Estructuras Hiperestáticas de Acero",
          category: "Teoría de Nudos Rígidos",
          images: [],
          content: `
            <p>En los <strong>pórticos hiperestáticos rígidos</strong>, la unión soporte-viga impide el giro relativo entre las barras ($\Delta \theta = 0$), manteniendo constante el ángulo de 90° entre ellas durante la deformación.</p>
            <div class="grid sm:grid-cols-2 gap-3 my-3 text-sm">
              <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg">
                <span class="text-cyan-400 font-bold">Distribución de Momentos</span>
                <p class="text-slate-300 text-xs mt-1">Los momentos flectores positivos en vano se reducen notablemente al transferir flector negativo a los extremos. Esto permite reducir el canto de las vigas.</p>
              </div>
              <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg">
                <span class="text-cyan-400 font-bold">Autonomía frente a Viento</span>
                <p class="text-slate-300 text-xs mt-1">Los pórticos rígidos tienen rigidez propia frente a cargas horizontales de viento y sismo sin necesidad estricta de cruces de arriostramiento en todos los vanos.</p>
              </div>
            </div>
          `
        },
        {
          slideNumber: 25,
          title: "Viga de Mayor Sección que el Soporte: Rigidizadores Trapezoidales",
          category: "Rigidizadores",
          images: ["image28.png", "image31.png", "image30.png", "image29.png"],
          content: `
            <div class="space-y-3">
              <p>Cuando el canto de la viga excede el ancho o canto del soporte, las alas de la viga sobresalen de la zona de contacto del pilar.</p>
              <div class="p-3 bg-amber-950/20 border border-amber-600/40 rounded-lg text-sm">
                <strong class="text-amber-300">Solución con Rigidizadores Trapezoidales:</strong>
                <p class="mt-1 text-slate-300 text-xs">Se instalan chapas rigidizadoras de geometría trapezoidal soldadas al alma del pilar en la prolongación de las alas de la viga. Estas chapas canalizan la fuerza de tracción del ala superior y la fuerza de compresión del ala inferior a través del núcleo del pilar, impidiendo la abolladura del alma.</p>
              </div>
            </div>
          `
        },
        {
          slideNumber: 26,
          title: "Nudo Rígido Soporte Simple y Viga Simple",
          category: "Detalle Constructivo",
          images: ["image28.png", "image30.png", "image29.png", "image32.png"],
          content: `
            <p>Detalle constructivo de nudo rígido estándar soldado a tope o con chapa frontal atornillada:</p>
            <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300 mt-2">
              <li>El ala superior de la viga transmite el esfuerzo de <strong>tracción</strong> (o compresión si hay inversión de momento).</li>
              <li>El ala inferior transmite el esfuerzo de <strong>compresión</strong> directo.</li>
              <li>El alma de la viga transmite la totalidad del <strong>esfuerzo cortante</strong> $V_{Ed}$.</li>
              <li>Se colocan rigidizadores horizontales en el pilar en coincidencia exacta con ambas alas de la viga.</li>
            </ul>
          `
        },
        {
          slideNumber: 27,
          title: "Nudo Rígido con Reducciones Fuertes de Pilar",
          category: "Transiciones de Pilar",
          images: ["image28.png", "image33.png", "image30.png", "image29.png"],
          content: `
            <p>En edificios en altura, la sección del pilar se reduce en las plantas superiores (por ejemplo, pasando de un HEB 300 en planta baja a un HEB 200 en plantas altas).</p>
            <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-sm my-2">
              <strong class="text-cyan-300">Nudos Extremos vs Intermedios:</strong>
              <ul class="list-disc pl-5 mt-1 space-y-1 text-slate-300 text-xs">
                <li><strong>Nudo Extremo / Medianero:</strong> La viga acomete sólo por un lado. El cambio de sección del pilar genera una excentricidad que se resuelve con chapa de transición y cartelas biseladas.</li>
                <li><strong>Nudo Intermedio:</strong> La viga es pasante a ambos lados del pilar, requiriendo placas de reparto continuas para transmitir el axil del pilar superior al inferior sin aplastar el alma de la viga.</li>
              </ul>
            </div>
          `
        },
        {
          slideNumber: 28,
          title: "Reducciones Pilar-Viga y Encuentro Medianero",
          category: "Detalle Constructivo",
          images: ["image28.png", "image35.png", "image34.png"],
          content: `
            <p>Sección y alzado de nudo rígido en fachada medianera con reducción escalonada:</p>
            <p class="text-sm text-slate-300 mt-1">Uso de rigidizadores inclinados a 45° para absorber el decalaje entre las caras exteriores de pilares de distinta escuadría.</p>
          `
        },
        {
          slideNumber: 29,
          title: "Viga Continua de Distinto Canto: Cartelas y Refuerzos",
          category: "Vigas de Canto Variable",
          images: ["image28.png", "image36.png"],
          content: `
            <div class="space-y-3">
              <p>Cuando un vano tiene mayor luz o sobrecarga que el contiguo, las vigas continuas pueden presentar diferentes cantos (por ejemplo, IPE 400 frente a IPE 300).</p>
              <div class="p-3 rounded-lg bg-emerald-950/20 border border-emerald-600/40 text-sm">
                <strong class="text-emerald-300">Rigidización mediante Cartelas Inferiores:</strong>
                <p class="text-slate-300 text-xs mt-1">El salto de canto se regulariza mediante una <strong class="text-white">cartela inferior acartelada</strong> obtenida cortando en diagonal una sección del mismo perfil. La cartela aumenta el canto en la zona de máximo momento flector negativo sobre el apoyo y suaviza la trayectoria de las tensiones principales.</p>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-5",
      number: 5,
      title: "Estructuras Especiales: Celosías y Grandes Luces",
      shortTitle: "Estructuras Especiales",
      icon: "box",
      slidesRange: [30, 33],
      badge: "Grandes Luces",
      description: "Jácenas y vigas trianguladas entre plantas para plantas bajas diáfanas y espacios exentos: Viga Pratt, Viga Vierendeel (con y sin refuerzo) y Arco Poligonal.",
      topics: [
        "Plantas bajas diáfanas: apeo de pilares mediante celosías de planta completa",
        "Viga Pratt: montantes a compresión y diagonales a tracción",
        "Viga Vierendeel: pórtico de nudos rígidos sin diagonales para paso de puertas/pasillos",
        "Viga Vierendeel con refuerzo de cartelas en esquinas",
        "Arco Poligonal funicular de grandes luces"
      ],
      slides: [
        {
          slideNumber: 30,
          title: "Introducción a Sistemas Especiales de Celosía",
          category: "Grandes Luces",
          images: [],
          content: `
            <p>Las <strong>estructuras especiales</strong> resuelven luces singulares y requerimientos arquitectónicos de permeabilidad espacial:</p>
            <ul class="list-disc pl-5 space-y-1.5 text-sm text-slate-300 mt-2">
              <li>Vestíbulos monumentales o accesos de vehículos que exigen eliminar pilares en planta baja.</li>
              <li>Apeos de fachadas completas de plantas intermedias sobre grandes vanos exentos.</li>
              <li>Aprovechamiento de la altura completa de una planta (2.5 a 3.5 m) para materializar una gran viga triangulada.</li>
            </ul>
          `
        },
        {
          slideNumber: 31,
          title: "Viga Triangulada de Planta Completa y Viga Pratt",
          category: "Viga Pratt",
          images: ["image38.png", "image37.png"],
          content: `
            <div class="space-y-3">
              <p>Sección transversal de edificio donde los pilares de las plantas superiores apoyan directamente sobre los nudos superiores de una <strong>viga de celosía entre plantas</strong>.</p>
              <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-sm">
                <span class="text-amber-400 font-bold">Viga Pratt:</span>
                <p class="text-slate-300 text-xs mt-1">Configuración clásica de triangulación donde las <strong>diagonales están orientadas para trabajar exclusivamente a tracción</strong> bajo carga gravitatoria descendente, mientras que los <strong>montantes verticales trabajan a compresión</strong>. Esto optimiza el peso de acero al evitar el pandeo en las barras más largas (las diagonales).</p>
              </div>
            </div>
          `
        },
        {
          slideNumber: 32,
          title: "Viga Vierendeel: Con y Sin Refuerzo",
          category: "Viga Vierendeel",
          images: ["image39.png", "image37.png"],
          content: `
            <div class="space-y-3">
              <p>Inventada por Arthur Vierendeel, es una celosía que <strong>carece por completo de diagonales trianguladas</strong>, formada únicamente por cordones horizontales y montantes verticales.</p>
              <div class="grid sm:grid-cols-2 gap-3 text-sm">
                <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg">
                  <span class="text-cyan-400 font-bold">Funcionalidad Arquitectónica</span>
                  <p class="text-slate-300 text-xs mt-1">Los vanos completamente rectangulares permiten el paso libre de puertas, ventanas, pasillos o conducciones técnicas de climatización a través de la propia viga.</p>
                </div>
                <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg">
                  <span class="text-cyan-400 font-bold">Mecanismo de Resistencia</span>
                  <p class="text-slate-300 text-xs mt-1">Al no haber diagonales, el esfuerzo cortante se absorbe por <em>flexión y cortante en los montantes y cordones</em>, exigiendo nudos perfectamente rígidos con o sin cartelas de esquina para mitigar picos de tensión.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          slideNumber: 33,
          title: "Arco Poligonal",
          category: "Arco Poligonal",
          images: ["image40.png", "image37.png"],
          content: `
            <p>El <strong>Arco Poligonal</strong> adapta el eje directriz de la estructura a la curva funicular de las cargas:</p>
            <ul class="list-disc pl-5 space-y-1 text-sm text-slate-300 mt-2">
              <li>Funciona predominantemente a esfuerzo axil de compresión, minimizando los momentos flectores en toda la luz.</li>
              <li>Ideal para cubiertas de naves industriales, hangares, polideportivos o estaciones de transporte de grandes luces.</li>
            </ul>
          `
        }
      ]
    },
    {
      id: "mod-6",
      number: 6,
      title: "Estabilidad Horizontal y Arriostramientos (DB-SE-AE)",
      shortTitle: "Arriostramientos",
      icon: "shield-check",
      slidesRange: [34, 36],
      badge: "Normativa CTE",
      description: "Requisitos normativos obligatorios según DB-SE-AE Art. 5.3: arriostramiento en al menos 2 direcciones no paralelas y por lo menos 3 planos triangulados no concurrentes en el mismo pilar.",
      topics: [
        "Código Técnico de la Edificación: CTE DB-SE-AE Art. 5.3",
        "Condición 1: Al menos 2 direcciones no paralelas entre sí",
        "Condición 2: Por lo menos TRES planos triangulados",
        "Condición 3: No concurrentes en el mismo pilar",
        "Justificación contra torsión horizontal del edificio",
        "Tipos de arriostramiento: Cruces de San Andrés, diagonales y núcleos rígidos"
      ],
      slides: [
        {
          slideNumber: 34,
          title: "La Necesidad de Estabilidad Frente a Cargas Horizontales",
          category: "Estabilidad Global",
          images: [],
          content: `
            <p>Los edificios de estructura metálica articulada son mecanismos cinemáticos deformables frente a fuerzas de viento o sismo en el plano horizontal.</p>
            <p class="text-sm text-slate-300 mt-2">Para garantizar el equilibrio y la rigidez lateral, la estructura debe incluir <strong>sistemas de arriostramiento vertical y diafragmas horizontales rígidos</strong> (los forjados) que canalicen las fuerzas hasta la cimentación.</p>
          `
        },
        {
          slideNumber: 35,
          title: "Prescripción Normativa Fundamental: CTE DB-SE-AE Art. 5.3",
          category: "Artículo 5.3",
          images: ["image42.png", "image41.png"],
          content: `
            <div class="space-y-4">
              <div class="p-4 rounded-xl bg-gradient-to-r from-blue-950/50 to-indigo-950/40 border-2 border-indigo-500/60 shadow-lg">
                <div class="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-2">
                  <span class="px-2 py-0.5 rounded bg-indigo-600/40 text-indigo-200">DB-SE-AE Art. 5.3</span>
                  Exigencia Básica de Estabilidad
                </div>
                <blockquote class="text-base font-semibold text-white italic border-l-4 border-indigo-400 pl-3 my-2">
                  "Los sistemas de arriostramiento deben disponerse al menos en DOS DIRECCIONES no paralelas entre sí, y en por lo menos TRES PLANOS TRIANGULADOS no concurrentes en el mismo pilar."
                </blockquote>
              </div>
              <div class="grid sm:grid-cols-3 gap-3 text-xs">
                <div class="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <strong class="text-amber-400 block mb-1">1. Dos Direcciones</strong>
                  <p class="text-slate-300">Garantiza resistencia frente a viento frontal ($X$) y viento lateral ($Y$).</p>
                </div>
                <div class="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <strong class="text-amber-400 block mb-1">2. Tres Planos</strong>
                  <p class="text-slate-300">El número mínimo matemático de planos para fijar los 3 grados de libertad del sólido rígido en el plano ($u_x$, $u_y$, $\theta_z$).</p>
                </div>
                <div class="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <strong class="text-amber-400 block mb-1">3. No Concurrentes</strong>
                  <p class="text-slate-300">Si concurriesen en el mismo punto, la estructura sería libre de girar por torsión alrededor de ese pilar.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          slideNumber: 36,
          title: "Aplicación en Planta: Ejemplos de Distribución de Arriostramientos",
          category: "Planta de Estructura",
          images: ["image43.png", "image41.png"],
          content: `
            <p>Análisis en planta de la disposición correcta de cruces de arriostramiento en fachada y patios:</p>
            <ul class="list-disc pl-5 space-y-1.5 text-sm text-slate-300 mt-2">
              <li>Se sitúan preferentemente en crujías ciegas de fachada, núcleos de ascensores o cajas de escalera.</li>
              <li>La simetría en planta es crucial para evitar que el centro de rigidez ($CR$) se distancie del centro de masas ($CM$), lo que provocaría amplificación por torsión accidental.</li>
            </ul>
          `
        }
      ]
    },
    {
      id: "mod-7",
      number: 7,
      title: "Juntas de Dilatación en Edificios Metálicos",
      shortTitle: "Juntas de Dilatación",
      icon: "minimize-2",
      slidesRange: [37, 49],
      badge: "Detalles Constructivos",
      description: "Catálogo completo de los 5 tipos de juntas de dilatación en estructuras de acero: paralelas vs perpendiculares al forjado, doble pilar vs pilar único, apoyos deslizantes y regla de oro en cimentación.",
      topics: [
        "Función: absorber dilataciones higrotérmicas y evitar grietas (L ≤ 40 m)",
        "Juntas Paralelas: Tipo 1 (Doble pilar / doble viga, mín 5 cm)",
        "Juntas Paralelas: Tipo 2 (Único pilar / doble viga con apoyo fijo y móvil con holgura e)",
        "Juntas Perpendiculares: Tipo 3 (Doble pilar / doble viga)",
        "Juntas Perpendiculares: Tipo 4 (Único pilar / doble viga: viga interrumpida vs vigas pasantes)",
        "Juntas Perpendiculares: Tipo 5 (Único pilar / viga única con apoyos deslizantes en forjado)",
        "¡Regla de Oro en Cimentación!: NO HAY JUNTA, zapata común con placa única o doble placa"
      ],
      slides: [
        {
          slideNumber: 37,
          title: "Introducción al Bloque de Juntas de Dilatación",
          category: "Juntas",
          images: [],
          content: `
            <p>Las variaciones estacionales de temperatura provocan alargamientos y acortamientos en las piezas de acero según la ley $\\Delta L = \\alpha \\cdot L \\cdot \\Delta T$ (donde $\\alpha_{acero} \\approx 1.2 \\times 10^{-5} \\text{ ºC}^{-1}$).</p>
            <p class="text-sm text-slate-300 mt-2">Si el edificio no cuenta con juntas de dilatación, las coacciones impuestas inducen tensiones internas gigantescas que fisuran forjados, tabiquerías y fachadas.</p>
          `
        },
        {
          slideNumber: 38,
          title: "Funciones y Longitud Máxima Sin Junta (≤ 40 m)",
          category: "Criterios Generales",
          images: ["image45.jpeg", "image44.jpeg"],
          content: `
            <div class="space-y-3">
              <div class="p-3 bg-red-950/20 border border-red-500/40 rounded-lg text-sm">
                <span class="font-bold text-red-300">Límite Normativo Dimensional:</span>
                <p class="text-slate-300 text-xs mt-1">La distancia entre juntas de dilatación consecutivas en estructuras metálicas ordinarias <strong class="text-white">NO DEBE SOBREPASAR NUNCA LOS 40 METROS</strong> de longitud en planta ($L \\le 40 \\text{ m}$).</p>
              </div>
              <p class="text-sm text-slate-300">
                Resumen de la clasificación en 5 tipologías constructivas según la dirección del forjado y el número de pilares/vigas.
              </p>
            </div>
          `
        },
        {
          slideNumber: 39,
          title: "Matriz Clasificatoria de los 5 Tipos de Juntas",
          category: "Clasificación",
          images: ["image46.png"],
          content: `
            <div class="overflow-x-auto my-2">
              <table class="w-full text-xs text-left text-slate-300 border border-slate-700">
                <thead class="bg-slate-800 text-amber-300 font-bold">
                  <tr>
                    <th class="p-2 border border-slate-700">Tipo</th>
                    <th class="p-2 border border-slate-700">Orientación al Forjado</th>
                    <th class="p-2 border border-slate-700">Configuración Pilares</th>
                    <th class="p-2 border border-slate-700">Configuración Vigas</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800">
                  <tr class="hover:bg-slate-800/40">
                    <td class="p-2 font-bold text-white">Tipo 1</td>
                    <td class="p-2 text-emerald-400">PARALELA</td>
                    <td class="p-2">Doble pilar</td>
                    <td class="p-2">Doble viga</td>
                  </tr>
                  <tr class="hover:bg-slate-800/40">
                    <td class="p-2 font-bold text-white">Tipo 2</td>
                    <td class="p-2 text-emerald-400">PARALELA</td>
                    <td class="p-2">Único pilar</td>
                    <td class="p-2">Doble viga (fijo + móvil)</td>
                  </tr>
                  <tr class="hover:bg-slate-800/40">
                    <td class="p-2 font-bold text-white">Tipo 3</td>
                    <td class="p-2 text-purple-400">PERPENDICULAR</td>
                    <td class="p-2">Doble pilar</td>
                    <td class="p-2">Doble viga</td>
                  </tr>
                  <tr class="hover:bg-slate-800/40">
                    <td class="p-2 font-bold text-white">Tipo 4</td>
                    <td class="p-2 text-purple-400">PERPENDICULAR</td>
                    <td class="p-2">Único pilar</td>
                    <td class="p-2">Doble viga (interrumpida o pasante)</td>
                  </tr>
                  <tr class="hover:bg-slate-800/40">
                    <td class="p-2 font-bold text-white">Tipo 5</td>
                    <td class="p-2 text-purple-400">PERPENDICULAR</td>
                    <td class="p-2">Único pilar</td>
                    <td class="p-2">Única viga (apoyo deslizante en forjado)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        },
        {
          slideNumber: 40,
          title: "Tipo 1: Paralela al Forjado - Doble Pilar (I)",
          category: "Junta Tipo 1",
          images: ["image47.jpeg"],
          content: `
            <div class="space-y-3">
              <p>La estructura se divide físicamente en dos bloques independientes mediante una línea de doble soporte.</p>
              <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-sm">
                <span class="text-amber-400 font-bold">Criterios de Ejecución:</span>
                <ul class="list-disc pl-5 mt-1 space-y-1 text-slate-300 text-xs">
                  <li><strong>Separación mínima entre soportes:</strong> <strong class="text-white">5 centímetros</strong> ($d \\ge 5$ cm).</li>
                  <li><strong>Tipo de Nudos:</strong> Los nudos podrán ser de <em>cualquier tipo</em> (rígidos, semirrígidos o articulados), dado que cada bloque tiene su propia columna y viga.</li>
                  <li>Ambos módulos deben ser autónomos y no sobrepasar los 40 m de longitud cada uno.</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          slideNumber: 41,
          title: "Tipo 1: Paralela al Forjado - Doble Pilar (II)",
          category: "Junta Tipo 1",
          images: ["image47.jpeg", "image48.png"],
          content: `
            <p>Detalle axonométrico y en sección de la junta de doble pilar paralela a las viguetas del forjado:</p>
            <p class="text-sm text-slate-300 mt-1">Se observa la separación neta continua de 5 cm que recorre todos los niveles, incluyendo pavimentos y falsos techos protegidos con perfiles de junta cubre-juntas elásticos.</p>
          `
        },
        {
          slideNumber: 42,
          title: "Tipo 2: Paralela al Forjado - Único Pilar (I)",
          category: "Junta Tipo 2",
          images: ["image50.png", "image49.png"],
          content: `
            <div class="space-y-3">
              <p>Se utiliza una única hilera de pilares para ambos módulos, duplicando únicamente las vigas que acometen al soporte.</p>
              <div class="p-3 bg-blue-950/20 border border-blue-600/40 rounded-lg text-sm">
                <strong class="text-cyan-300">Mecanismo Fijo + Móvil:</strong>
                <p class="text-slate-300 text-xs mt-1">Uno de los apoyos de viga es <strong class="text-white">FIJO</strong> (articulado o empotrado) y el otro apoyo de la viga adyacente es <strong class="text-white">MÓVIL DESLIZANTE</strong> con taladros colisos.</p>
                <p class="text-slate-300 text-xs mt-1">La holgura $"e"$ permite el libre desplazamiento horizontal térmico, evitando que los esfuerzos axiles de un bloque se transmitan al otro.</p>
              </div>
            </div>
          `
        },
        {
          slideNumber: 43,
          title: "Tipo 2: Paralela al Forjado - Único Pilar (II)",
          category: "Junta Tipo 2",
          images: ["image50.png", "image49.png", "image51.png"],
          content: `
            <p>Detalle constructivo de la chapa de apoyo con agujeros rasgados (colisos) y arandelas de neopreno o teflón para garantizar un coeficiente de fricción reducido durante toda la vida útil de la estructura.</p>
          `
        },
        {
          slideNumber: 44,
          title: "Tipo 3: Perpendicular al Forjado - Doble Pilar",
          category: "Junta Tipo 3",
          images: ["image53.png", "image52.png"],
          content: `
            <p>En este caso, la junta corta transversalmente la dirección de las viguetas o chapa portante del forjado.</p>
            <ul class="list-disc pl-5 space-y-1.5 text-sm text-slate-300 mt-2">
              <li>Se disponen dos pilares paralelos y dos vigas independientes.</li>
              <li><strong>Separación mínima:</strong> $5$ cm entre las caras exteriores de los soportes.</li>
              <li>Los nudos pueden ser de cualquier tipo (rígidos o articulados).</li>
              <li>El forjado se interrumpe limpiamente en la línea entre ambas vigas.</li>
            </ul>
          `
        },
        {
          slideNumber: 45,
          title: "Tipo 4: Perpendicular al Forjado - Único Pilar",
          category: "Junta Tipo 4",
          images: ["image47.jpeg", "image52.png"],
          content: `
            <p>Se emplea un único pilar central y se duplican las vigas o carreras, disponiendo una de ellas con apoyo deslizante en su enlace al soporte.</p>
            <p class="text-sm text-slate-300 mt-1">Existen dos soluciones geométricas según si la viga se interrumpe en el soporte o lo sobrepasa.</p>
          `
        },
        {
          slideNumber: 46,
          title: "Tipo 4 - Solución 1: Viga Interrumpida en el Soporte",
          category: "Junta Tipo 4",
          images: ["image47.jpeg", "image52.png", "image54.png"],
          content: `
            <div class="space-y-2">
              <strong class="text-amber-400 text-sm">Solución 1: Interrupción en Soporte</strong>
              <p class="text-sm text-slate-300">Las vigas de ambos vanos llegan y terminan sobre la cabeza o ménsula del soporte común. Una viga se fija rígidamente o con pasador y la otra apoya sobre una placa de teflón con colisos que absorbe la carrera de dilatación térmica.</p>
            </div>
          `
        },
        {
          slideNumber: 47,
          title: "Tipo 4 - Solución 2: Vigas Pasantes a Ambos Lados del Pilar",
          category: "Junta Tipo 4",
          images: ["image47.jpeg", "image52.png", "image55.png"],
          content: `
            <div class="space-y-2">
              <strong class="text-cyan-400 text-sm">Solución 2: Vigas Gemelas Pasantes</strong>
              <p class="text-sm text-slate-300">Las dos vigas discurren continuas sobrevolando las caras laterales del soporte continuo. Una de las vigas se ancla fijamente al pilar y la gemela desliza sobre casquillos de apoyo lubricados.</p>
            </div>
          `
        },
        {
          slideNumber: 48,
          title: "Tipo 5: Perpendicular al Forjado - Único Pilar y Única Viga",
          category: "Junta Tipo 5",
          images: ["image57.png", "image56.png"],
          content: `
            <div class="space-y-3">
              <p class="font-semibold text-emerald-300">La solución más limpia estructuralmente:</p>
              <p class="text-sm text-slate-300">Se mantiene <strong class="text-white">un único pilar y una única viga maestra continua</strong>, sin duplicar perfiles principales.</p>
              <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg text-sm">
                <span class="text-amber-400 font-bold">Mecanismo de Deslizamiento en Forjado:</span>
                <p class="text-slate-300 text-xs mt-1">La junta de dilatación se resuelve no en la estructura principal, sino en el encuentro forjado-viga: las viguetas o placas del forjado de uno de los sectores apoyan en la viga mediante <em>apoyos deslizantes de neopreno o teflón</em> con vuelo suficiente para dilatarse libremente.</p>
              </div>
            </div>
          `
        },
        {
          slideNumber: 49,
          title: "Juntas en Arranque de Cimentación: ¡NO HAY JUNTA!",
          category: "Cimentación",
          images: ["image59.png", "image58.png", "image60.png"],
          content: `
            <div class="space-y-4">
              <div class="p-4 rounded-xl bg-gradient-to-r from-red-950/60 via-amber-950/40 to-slate-900 border-2 border-red-500/70 shadow-lg">
                <div class="flex items-center gap-2 text-rose-300 font-black text-xs uppercase tracking-widest mb-1">
                  <span class="px-2 py-0.5 rounded bg-rose-600/40 text-rose-200">PREGUNTA CLAVE DE EXAMEN</span>
                  E.T.S.I.E.
                </div>
                <h3 class="text-xl font-bold text-white mb-2">En la Cimentación NUNCA se Hace Junta de Dilatación</h3>
                <p class="text-sm text-slate-200">
                  A diferencia de la estructura aérea, el terreno y los elementos enterrados no sufren gradientes térmicos apreciables. Dividir la zapata crearía riesgos inadmisibles de <strong>asientos diferenciales</strong> entre ambos bloques.
                </p>
              </div>
              <div class="grid sm:grid-cols-2 gap-3 text-sm">
                <div class="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <span class="text-amber-400 font-bold">Caso 1: Placa de Asiento Única</span>
                  <p class="text-slate-300 text-xs mt-1">Ambos pilares de la junta apoyan sobre una sola gran placa base compartida sobre la zapata común.</p>
                </div>
                <div class="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <span class="text-amber-400 font-bold">Caso 2: Doble Placa de Asiento</span>
                  <p class="text-slate-300 text-xs mt-1">Cada pilar dispone de su propia placa base independiente, pero ambas descansan directamente sobre el mismo pozo o zapata corrida rígida de hormigón armado.</p>
                </div>
              </div>
            </div>
          `
        }
      ]
    }
  ],
  quizQuestions: [
    {
      id: 1,
      question: "¿Cuál es la longitud máxima admisible de un edificio de estructura metálica ordinaria sin necesidad de disponer una junta de dilatación?",
      options: [
        "25 metros",
        "40 metros",
        "60 metros",
        "No existe límite siempre que se dimensione a viento"
      ],
      correct: 1,
      explanation: "Según las diapositivas y la normativa española (NCSR-02 / CTE), la disposición de la junta de dilatación en estructuras de acero no debe sobrepasar nunca en longitud los 40 metros."
    },
    {
      id: 2,
      question: "Para que un nudo soldado soporte-viga por soldadura directa de alma funcione como ARTICULADO, ¿qué condición debe cumplir la longitud del cordón de soldadura m?",
      options: [
        "m ≥ 2/3 · halma",
        "m ≤ 1/4 · halma",
        "1/2 · halma ≤ m ≤ 2/3 · halma",
        "m = halma completa más cordones en las alas"
      ],
      correct: 2,
      explanation: "La condición fundamental para unión articulada es 1/2 halma ≤ m ≤ 2/3 halma. Si m ≥ 2/3 halma la unión adquiere rigidez excesiva y pasa a comportarse como semirrígida."
    },
    {
      id: 3,
      question: "En un nudo soldado de acero, ¿cuál es el valor aproximado de la garganta máxima de soldadura (g_max) en función del espesor a unir (e)?",
      options: [
        "g_max ≈ 0.20 · e",
        "g_max ≈ 0.60 · e",
        "g_max ≈ 1.50 · e",
        "g_max es siempre fija de 12 mm independientemente del espesor"
      ],
      correct: 1,
      explanation: "La garganta de la soldadura está en función de los espesores del alma o chapas a unir, considerándose como máxima admisible g ≈ 0.60 · e."
    },
    {
      id: 4,
      question: "¿Se debe realizar junta de dilatación en la cimentación (zapatas / losa) de un edificio con junta aérea?",
      options: [
        "Sí, la zapata debe dividirse siempre con junta de 10 cm",
        "No, en la cimentación NO hay junta; se dispone una zapata común con una o dos placas de asiento",
        "Solo si el suelo es rocoso",
        "Sí, pero únicamente si el edificio supera los 20 metros"
      ],
      correct: 1,
      explanation: "En la cimentación NUNCA hay junta de dilatación para evitar asientos diferenciales y porque las variaciones térmicas en el subsuelo son despreciables."
    },
    {
      id: 5,
      question: "¿Cuál es la separación mínima recomendada entre las caras de los soportes en una junta de dilatación de doble pilar?",
      options: [
        "1 cm",
        "3 cm",
        "5 cm",
        "15 cm"
      ],
      correct: 2,
      explanation: "En las juntas de dilatación de doble pilar (tanto paralelas como perpendiculares al forjado), la separación mínima entre soportes es de 5 cm."
    },
    {
      id: 6,
      question: "Según el DB-SE-AE Art. 5.3, ¿cuántos planos triangulados de arriostramiento se exigen como mínimo para garantizar la estabilidad horizontal?",
      options: [
        "Al menos 1 plano en la dirección principal",
        "Al menos en 2 direcciones no paralelas y por lo menos 3 planos triangulados no concurrentes en el mismo pilar",
        "4 planos perpendiculares dos a dos",
        "Basta con nudos rígidos en todas las plantas"
      ],
      correct: 1,
      explanation: "El DB-SE-AE Art. 5.3 exige al menos en 2 direcciones no paralelas entre sí, y en por lo menos TRES planos triangulados no concurrentes en el mismo pilar para evitar traslaciones y giro por torsión."
    },
    {
      id: 7,
      question: "En un soporte compuesto formado por dos perfiles UPN empresillados abiertos para permitir el paso de una viga continua, ¿cuántas presillas mínimas por planta se exigen?",
      options: [
        "2 presillas (un solo hueco)",
        "3 presillas (dos huecos)",
        "4 presillas (tres huecos)",
        "6 presillas (cinco huecos)"
      ],
      correct: 2,
      explanation: "La norma y los apuntes exigen presillas mínimas 4 (delimitando 3 huecos libres) para arriostrar adecuadamente el pilar compuesto UPN."
    },
    {
      id: 8,
      question: "¿Qué caracteriza estructuralmente a una Viga Vierendeel frente a una Viga Pratt?",
      options: [
        "La Vierendeel tiene más diagonales trianguladas que la Pratt",
        "La Vierendeel carece de diagonales trianguladas y trabaja mediante nudos rígidos a flexión y cortante",
        "La Vierendeel solo se fabrica en madera laminada",
        "La Vierendeel es únicamente para apoyos simples isostáticos"
      ],
      correct: 1,
      explanation: "La viga Vierendeel es un entramado sin triangulaciones diagonales formado por marcos rectangulares con nudos rígidos, lo que permite huecos diáfanos para puertas o pasillos."
    },
    {
      id: 9,
      question: "En una junta perpendicular al forjado resuelta con pilar único y viga única (Tipo 5), ¿dónde se materializa la junta deslizante?",
      options: [
        "Cortando el pilar longitudinalmente",
        "En la unión entre el forjado (viguetas) y la viga mediante apoyos deslizantes",
        "En la base del pilar con neopreno",
        "En los arriostramientos de fachada"
      ],
      correct: 1,
      explanation: "En la junta Tipo 5 la viga es continua y única sobre el pilar, y el desplazamiento térmico se absorbe disponiendo apoyos deslizantes en el enlace entre viguetas de forjado y la viga."
    },
    {
      id: 10,
      question: "Cuando una viga continua apoya sobre un soporte simple discontinuo (el pilar no continúa físicamente arriba), ¿qué elemento se coloca para materializar la línea de apoyo articulada?",
      options: [
        "Un angular soldado a ambas alas",
        "Un redondo o barra maciza rectangular con vuelo de chapa de 10-15 mm",
        "Una capa de mortero autonivelante de 5 cm",
        "Un tensor de cable cruzado"
      ],
      correct: 1,
      explanation: "La viga apoya sobre un redondo o barra rectangular maciza con un vuelo de chapa de 10-15 mm para asegurar el giro articulado sin coaccionar."
    }
  ],
  flashcards: [
    {
      category: "Juntas de Dilatación",
      front: "¿Longitud máxima de edificio de acero sin junta de dilatación?",
      back: "≤ 40 metros. Si se supera, es imperativo diseñar juntas según NCSR-02 / CTE.",
      tip: "Ver Slide 38"
    },
    {
      category: "Nudos Articulados",
      front: "¿Rango de longitud de soldadura 'm' para nudo articulado?",
      back: "1/2 halma ≤ m ≤ 2/3 halma.\nSi m ≥ 2/3 halma, pasa a ser SEMIRRÍGIDO.",
      tip: "Ver Slide 16"
    },
    {
      category: "Soldadura",
      front: "¿Garganta máxima recomendada en cordón de ángulo?",
      back: "g_max ≈ 0.60 · e\n(en función del espesor 'e' a unir, ej. alma de viga).",
      tip: "Ver Slide 12 y 19"
    },
    {
      category: "Cimentación",
      front: "¿Cómo se resuelve la junta de dilatación en cimentación?",
      back: "¡EN CIMENTACIÓN NO HAY JUNTA!\nSe mantiene zapata común con placa única o doble placa de reparto para evitar asientos diferenciales.",
      tip: "Ver Slide 49"
    },
    {
      category: "Juntas de Doble Pilar",
      front: "¿Separación mínima entre soportes en junta de doble pilar?",
      back: "5 cm de separación mínima libre entre caras de pilares (Slide 40 y 44).",
      tip: "Tipos 1 y 3"
    },
    {
      category: "Soporte UPN",
      front: "¿Presillas mínimas en soporte compuesto UPN abierto?",
      back: "Mínimo 4 presillas por planta, delimitando 3 huecos libres. Separación típica de ~100 cm.",
      tip: "Ver Slide 19"
    },
    {
      category: "Normativa CTE",
      front: "¿Regla de Arriostramiento DB-SE-AE Art. 5.3?",
      back: "Al menos en 2 direcciones no paralelas entre sí, y en por lo menos 3 planos triangulados no concurrentes en el mismo pilar.",
      tip: "Ver Slide 35"
    },
    {
      category: "Viga Vierendeel",
      front: "¿Qué distingue a la Viga Vierendeel de la Viga Pratt?",
      back: "La Vierendeel NO tiene diagonales; transmite cortante mediante flexión en sus montantes y nudos rígidos (a menudo con cartelas de refuerzo).",
      tip: "Ver Slide 32"
    }
  ]
};

if (typeof window !== 'undefined') {
  window.COURSE_DATA = COURSE_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = COURSE_DATA;
}
