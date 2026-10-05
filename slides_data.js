// Minimalist presentation metadata & test questions
const PRESENTATION = {
  title: "CIV_L3: Sistemas Estructurales",
  subject: "Construcción IV • E.T.S.I.E.",
  totalSlides: 49,
  chapters: [
    { id: 1, name: "1. Introducción & Perfiles", range: [1, 9], slideStart: 1 },
    { id: 2, name: "2. Nudos Articulados", range: [10, 17], slideStart: 10 },
    { id: 3, name: "3. Vigas Continuas", range: [18, 23], slideStart: 18 },
    { id: 4, name: "4. Nudos Rígidos", range: [24, 29], slideStart: 24 },
    { id: 5, name: "5. Estructuras Especiales", range: [30, 33], slideStart: 30 },
    { id: 6, name: "6. Estabilidad & Arriostrados", range: [34, 36], slideStart: 34 },
    { id: 7, name: "7. Juntas de Dilatación", range: [37, 49], slideStart: 37 }
  ],
  quiz: [
    {
      id: 1,
      question: "¿Cuál es la longitud máxima admisible de un edificio de estructura metálica sin junta de dilatación?",
      options: ["25 metros", "40 metros", "60 metros", "80 metros"],
      correct: 1,
      slideRef: 38,
      explanation: "La diapositiva 38 establece taxativamente: 'La disposición de la junta no debe sobrepasar nunca en longitud los 40 m'."
    },
    {
      id: 2,
      question: "Para que un nudo soldado soporte-viga por soldadura de alma sea ARTICULADO, ¿qué condición debe cumplir la longitud m?",
      options: [
        "m ≥ 2/3 · halma",
        "1/2 · halma ≤ m ≤ 2/3 · halma",
        "m ≤ 1/4 · halma",
        "m = halma + soldadura en alas"
      ],
      correct: 1,
      slideRef: 16,
      explanation: "Diapositiva 16: Unión articulada 1/2 halma ≤ m ≤ 2/3 halma. Si m ≥ 2/3 halma, pasa a ser unión semirrígida."
    },
    {
      id: 3,
      question: "¿Cuál es el valor máximo aproximado para la garganta de soldadura (g)?",
      options: [
        "gmax ≈ 0.20 · e",
        "gmax ≈ 0.60 · e",
        "gmax ≈ 1.20 · e",
        "gmax fijo de 15 mm"
      ],
      correct: 1,
      slideRef: 12,
      explanation: "Diapositiva 12 y 19: 'Garganta en función de los espesores (e) a unir: gmax aprox 0,60 e'."
    },
    {
      id: 4,
      question: "¿Se realiza junta de dilatación en la cimentación de un edificio de estructura metálica?",
      options: [
        "Sí, la zapata se corta con junta de 5 cm",
        "No, en la cimentación NO HAY JUNTA (zapata común con una o dos placas)",
        "Solo si hay más de 3 plantas",
        "Únicamente en juntas perpendiculares al forjado"
      ],
      correct: 1,
      slideRef: 49,
      explanation: "Diapositiva 49: 'Juntas en arranque de CIMENTACIÓN: En la cimentación NO HAY JUNTA. Dos casos: una placa o doble placa'."
    },
    {
      id: 5,
      question: "¿Cuál es la separación mínima exigida entre soportes en una junta de dilatación de doble pilar?",
      options: ["2 cm", "5 cm", "10 cm", "20 cm"],
      correct: 1,
      slideRef: 40,
      explanation: "Diapositivas 40 y 44: 'Separación mínima entre soportes 5 cm'."
    },
    {
      id: 6,
      question: "Según el DB SE-AE Art. 5.3, ¿cómo deben ser los planos de arriostramiento?",
      options: [
        "Un único plano diagonal central",
        "Al menos en 2 direcciones no paralelas y por lo menos 3 planos triangulados no concurrentes en el mismo pilar",
        "Dos planos paralelos en fachada principal",
        "Nudos rígidos sin arriostramientos"
      ],
      correct: 1,
      slideRef: 35,
      explanation: "Diapositiva 35: DB SE AE Art. 5.3 exige al menos 2 direcciones no paralelas y por lo menos 3 planos triangulados no concurrentes."
    },
    {
      id: 7,
      question: "En un soporte compuesto de dos UPN empresillados abiertos para paso de viga continua, ¿cuántas presillas mínimas se exigen?",
      options: [
        "2 presillas (un hueco)",
        "3 presillas (dos huecos)",
        "4 presillas (tres huecos)",
        "6 presillas (cinco huecos)"
      ],
      correct: 2,
      slideRef: 19,
      explanation: "Diapositiva 19: 'Formado por dos cordones (UPN empresillados abiertos). Presillas mínimas 4 (tres huecos)'."
    },
    {
      id: 8,
      question: "¿Qué caracteriza geométricamente a la Viga Vierendeel?",
      options: [
        "Gran número de diagonales cruzadas",
        "Ausencia de diagonales trianguladas: vanos rectangulares con nudos rígidos (con/sin refuerzo)",
        "Solo funciona para apoyos articulados simples",
        "Forma de arco parabólico continuo"
      ],
      correct: 1,
      slideRef: 32,
      explanation: "Diapositiva 32: Viga Vierendeel sin diagonales, dejando espacios libres para puertas o ventanas, con nudos rígidos a flexión."
    },
    {
      id: 9,
      question: "En la junta perpendicular al forjado con único pilar y única viga (Tipo 5), ¿cómo se resuelve el movimiento térmico?",
      options: [
        "Cortando la viga por la mitad",
        "Disponiendo apoyos deslizantes en la unión forjado-viga",
        "Con neopreno bajo la zapata",
        "Rigidizando el pilar superior"
      ],
      correct: 1,
      slideRef: 48,
      explanation: "Diapositiva 48: 'Viga única: se resuelve disponiendo en la unión forjado-viga apoyos deslizantes'."
    },
    {
      id: 10,
      question: "Cuando un soporte simple discontinuo recibe una viga continua simple, ¿sobre qué elemento apoya la viga?",
      options: [
        "Soldadura directa corrida",
        "Sobre un redondo o barra rectangular maciza con vuelo de chapa de 10-15 mm",
        "Una junta elástica de silicona",
        "Un perfil tubular hueco"
      ],
      correct: 1,
      slideRef: 23,
      explanation: "Diapositiva 23: 'El pilar no tiene continuidad y la viga se apoya sobre un redondo o rectangular macizo. Vuelo chapa 10-15 mm'."
    }
  ]
};
