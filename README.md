# 🏗️ CIV_L3: Sistemas Estructurales Metálicos
### Aplicación Web Interactiva de Estudio & Realidad Virtual 3D
**Asignatura:** Construcción IV • **Escuela:** E.T.S.I.E. (Escuela Técnica Superior de Ingeniería de Edificación)

---

## 🌟 Características de la Aplicación

Esta aplicación web interactiva transforma los apuntes universitarios de la asignatura (49 diapositivas y 63 ilustraciones técnicas) en una plataforma de estudio moderna, elegante y de alto rendimiento.

### 1. 📚 Temario Completo y Diapositivas Digitalizadas
- **7 Módulos Temáticos**:
  1. *Introducción y Perfiles Laminados* (IPE, HEB, HEA, HEM, UPN, L).
  2. *Estructuras Isostáticas*: Nudos Articulados (soldadura directa de alma, apoyos rigidizados y no rigidizados, casquillos angulares, criterio $1/2 h_{alma} \le m \le 2/3 h_{alma}$ y garganta $g \le 0.60 e$).
  3. *Estructuras de Vigas Continuas*: Soportes UPN empresillados abiertos con 4 presillas mínimas / 3 huecos, vigas gemelas empresilladas y apoyo articulado sobre barra maciza con vuelo de chapa de 10-15 mm.
  4. *Estructuras Hiperestáticas*: Nudos rígidos a flexión completa, rigidizadores trapezoidales, reducciones de pilares y cartelas de transición.
  5. *Estructuras Especiales*: Celosías de gran luz entre plantas, Viga Pratt (diagonales a tracción), Viga Vierendeel (sin triangulaciones, nudos rígidos y cartelas) y Arco Poligonal.
  6. *Estabilidad Horizontal y Arriostramientos*: Código Técnico DB-SE-AE Art. 5.3 (mínimo 2 direcciones no paralelas y por lo menos 3 planos triangulados no concurrentes).
  7. *Juntas de Dilatación*: Límite $L \le 40\text{ m}$, Matriz de 5 Tipos (Paralelas 1 y 2, Perpendiculares 3, 4 y 5) y la regla de oro: **¡En cimentación NO hay junta!**
- **Buscador en tiempo real**: Filtra conceptos, fórmulas o detalles constructivos al instante.
- **Marcadores y Notas Personales**: Guarda tus apuntes de clase con sincronización en `localStorage`.

### 2. 🧊 Laboratorio 3D Interactivo (Realidad Virtual / WebGL)
- Desarrollado con **Three.js** y **OrbitControls** con renderizado acelerado por hardware:
  - **Modelo 1: Pórtico y Arriostramientos DB-SE-AE**: Visualización espacial de los 3 planos triangulados en 2 direcciones.
  - **Modelo 2: Detalle de Nudo Viga-Pilar**: Soportes HEB 300, vigas IPE 300, cordones de soldadura y rigidizadores.
  - **Modelo 3: Comparativa Pratt vs Vierendeel**: Diferencias estructurales y de transmisión de esfuerzos.
  - **Modelo 4: Junta de Dilatación 3D**: Doble pilar con separación de 5 cm vs Pilar único con apoyo deslizante y coliso.
- **Herramientas 3D**: Vista en alambre (*wireframe*), simulación de cargas y desplazamiento por dilatación térmica, y rotación libre 360°.

### 3. 📐 Calculadoras & Comprobadores Estructurales
- **Comprobador de Soldadura de Nudo**: Evalúa si la longitud de cordón $m$ clasifica la unión como *Articulada* o *Semirrígida*, calculando la garganta máxima $g \approx 0.60 e$.
- **Calculador de Dilatación Térmica**: Determina el alargamiento $\Delta L = \alpha \cdot L \cdot \Delta T$, verifica el límite de 40 m y dimensiona la holgura 'e' del taladro coliso.
- **Asistente Selector de Juntas**: Árbol interactivo que te guía al tipo de junta exacto (Tipo 1 al 5).
- **Validador DB-SE-AE Art. 5.3**: Checklist de estabilidad horizontal.

### 4. 🎯 Modo Test & Examen
- Cuestionario de 10 preguntas tipo test con corrección en tiempo real, puntuación y explicaciones pedagógicas detalladas de cada respuesta.

### 5. 🃏 Flashcards 3D
- 8 tarjetas mnemotécnicas interactivas con efecto de giro 3D para memorizar tolerancias críticas (40 m, 5 cm, 4 presillas, 10-15 mm, etc.).

### 6. 🖼️ Galería de Planos en Alta Resolución
- Acceso a todas las 63 imágenes y planos de detalle originales, ampliables con visor *Lightbox* con zoom interactivo (+, -, reset).

---

## 🚀 Cómo Abrir y Usar la App

La aplicación está lista para usar de dos formas sencillas:

### Opción 1: Navegador Directo
Simplemente abre el archivo `index.html` en tu navegador favorito (Chrome, Edge, Firefox, Safari):
- Doble clic en `index.html` o abre la URL:
  `file:///C:/Users/Adrian/Downloads/app/index.html`

### Opción 2: Servidor Local (Recomendado para 3D óptimo)
Si tienes un servidor local activo (o ejecutando `python -m http.server 8080`), ingresa a:
👉 **http://localhost:8080**
