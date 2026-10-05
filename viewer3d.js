// 3D Interactive Structural Viewer using Three.js
// Visualizing Steel Structural Systems (CIV_L3)

class StructuralViewer3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    if (typeof THREE === 'undefined') {
      this.container.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center space-y-3">
        <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400 font-bold text-xl">3D</div>
        <p class="text-sm">El visor 3D requiere conexión para cargar la librería Three.js WebGL.</p>
      </div>`;
      return;
    }

    this.currentModelType = 'frame'; // 'frame', 'joint', 'truss', 'expansion'
    this.isWireframe = false;
    this.isDeforming = false;
    this.deformationPhase = 0;

    this.init();
    this.setupEvents();
    this.loadModel(this.currentModelType);
    this.animate();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0f1d);
    this.scene.fog = new THREE.FogExp2(0x0a0f1d, 0.015);

    // Camera
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(18, 14, 24);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Orbit Controls
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.05; // Don't go below ground
      this.controls.minDistance = 2;
      this.controls.maxDistance = 80;
    }

    // Grid Floor
    const gridHelper = new THREE.GridHelper(40, 40, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -0.01;
    this.scene.add(gridHelper);

    // Floor Shadow Plane
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070b14,
      roughness: 0.9,
      metalness: 0.1
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.02;
    floorMesh.receiveShadow = true;
    this.scene.add(floorMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(20, 30, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    this.scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x38bdf8, 1.2, 50);
    accentLight.position.set(-15, 12, -10);
    this.scene.add(accentLight);

    const warmLight = new THREE.PointLight(0xf59e0b, 1.0, 50);
    warmLight.position.set(15, 8, -15);
    this.scene.add(warmLight);

    // Materials Palette
    this.materials = {
      steelDark: new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.85,
        roughness: 0.35,
        name: 'steelDark'
      }),
      steelBlue: new THREE.MeshStandardMaterial({
        color: 0x1e3a8a,
        metalness: 0.8,
        roughness: 0.3,
        name: 'steelBlue'
      }),
      steelBeam: new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        metalness: 0.75,
        roughness: 0.4,
        name: 'steelBeam'
      }),
      braceRed: new THREE.MeshStandardMaterial({
        color: 0xef4444,
        metalness: 0.6,
        roughness: 0.35,
        name: 'braceRed'
      }),
      braceGold: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.7,
        roughness: 0.3,
        name: 'braceGold'
      }),
      concreteFloor: new THREE.MeshStandardMaterial({
        color: 0x64748b,
        metalness: 0.1,
        roughness: 0.8,
        transparent: true,
        opacity: 0.6,
        name: 'concreteFloor'
      }),
      weldGlow: new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xd97706,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        name: 'weldGlow'
      }),
      jointHighlight: new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.8,
        roughness: 0.3,
        name: 'jointHighlight'
      }),
      plateBase: new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.85,
        roughness: 0.4,
        name: 'plateBase'
      })
    };

    // Group for current dynamic model
    this.modelGroup = new THREE.Group();
    this.scene.add(this.modelGroup);
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      if (!this.container) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  // Helper to create an I-Beam profile (IPE or HEB)
  createIBeamGeometry(length, h, b, tw, tf) {
    const shape = new THREE.Shape();
    const halfH = h / 2;
    const halfB = b / 2;
    const halfTw = tw / 2;

    // Outer contour of I section
    shape.moveTo(-halfB, halfH);
    shape.lineTo(halfB, halfH);
    shape.lineTo(halfB, halfH - tf);
    shape.lineTo(halfTw, halfH - tf);
    shape.lineTo(halfTw, -halfH + tf);
    shape.lineTo(halfB, -halfH + tf);
    shape.lineTo(halfB, -halfH);
    shape.lineTo(-halfB, -halfH);
    shape.lineTo(-halfB, -halfH + tf);
    shape.lineTo(-halfTw, -halfH + tf);
    shape.lineTo(-halfTw, halfH - tf);
    shape.lineTo(-halfB, halfH - tf);
    shape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: length,
      bevelEnabled: false
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }

  // Clear current model
  clearModel() {
    while (this.modelGroup.children.length > 0) {
      const obj = this.modelGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      this.modelGroup.remove(obj);
    }
  }

  // Switch between models
  loadModel(type) {
    this.currentModelType = type;
    this.clearModel();

    if (type === 'frame') {
      this.buildPortalFrameModel();
      this.camera.position.set(16, 12, 20);
      if (this.controls) this.controls.target.set(0, 5, 0);
    } else if (type === 'joint') {
      this.buildJointDetailModel();
      this.camera.position.set(4, 3, 5);
      if (this.controls) this.controls.target.set(0, 1.5, 0);
    } else if (type === 'truss') {
      this.buildTrussComparisonModel();
      this.camera.position.set(0, 6, 22);
      if (this.controls) this.controls.target.set(0, 3, 0);
    } else if (type === 'expansion') {
      this.buildExpansionJointModel();
      this.camera.position.set(8, 6, 10);
      if (this.controls) this.controls.target.set(0, 2, 0);
    }

    this.applyWireframe();
    if (this.controls) this.controls.update();
  }

  // MODEL 1: Full Portico Steel Building with DB-SE-AE 5.3 Triangulation Bracing
  buildPortalFrameModel() {
    const bayX = 6;
    const bayZ = 6;
    const storyH = 3.8;
    const stories = 2;
    const colsX = 3;
    const colsZ = 3;

    // Create Columns (HEB 300)
    for (let ix = 0; ix < colsX; ix++) {
      for (let iz = 0; iz < colsZ; iz++) {
        const x = (ix - (colsX - 1) / 2) * bayX;
        const z = (iz - (colsZ - 1) / 2) * bayZ;

        // Base plate
        const baseGeo = new THREE.BoxGeometry(0.8, 0.1, 0.8);
        const baseMesh = new THREE.Mesh(baseGeo, this.materials.plateBase);
        baseMesh.position.set(x, 0.05, z);
        baseMesh.castShadow = true;
        this.modelGroup.add(baseMesh);

        // Column continuous
        const colGeo = this.createIBeamGeometry(storyH * stories, 0.5, 0.5, 0.1, 0.12);
        const colMesh = new THREE.Mesh(colGeo, this.materials.steelDark);
        colMesh.rotation.x = Math.PI / 2;
        colMesh.position.set(x, (storyH * stories) / 2, z);
        colMesh.castShadow = true;
        this.modelGroup.add(colMesh);
      }
    }

    // Beams (IPE 300) along X and Z for each story
    for (let s = 1; s <= stories; s++) {
      const y = s * storyH;

      // Beams along X
      for (let iz = 0; iz < colsZ; iz++) {
        const z = (iz - (colsZ - 1) / 2) * bayZ;
        for (let ix = 0; ix < colsX - 1; ix++) {
          const x = (ix - (colsX - 1) / 2 + 0.5) * bayX;
          const beamGeo = this.createIBeamGeometry(bayX, 0.45, 0.25, 0.06, 0.09);
          const beamMesh = new THREE.Mesh(beamGeo, this.materials.steelBeam);
          beamMesh.rotation.y = Math.PI / 2;
          beamMesh.position.set(x, y, z);
          beamMesh.castShadow = true;
          this.modelGroup.add(beamMesh);
        }
      }

      // Beams along Z
      for (let ix = 0; ix < colsX; ix++) {
        const x = (ix - (colsX - 1) / 2) * bayX;
        for (let iz = 0; iz < colsZ - 1; iz++) {
          const z = (iz - (colsZ - 1) / 2 + 0.5) * bayZ;
          const beamGeo = this.createIBeamGeometry(bayZ, 0.4, 0.22, 0.05, 0.08);
          const beamMesh = new THREE.Mesh(beamGeo, this.materials.steelBlue);
          beamMesh.position.set(x, y, z);
          beamMesh.castShadow = true;
          this.modelGroup.add(beamMesh);
        }
      }

      // Semitransparent Floor Slab
      const slabGeo = new THREE.BoxGeometry((colsX - 1) * bayX + 0.6, 0.12, (colsZ - 1) * bayZ + 0.6);
      const slabMesh = new THREE.Mesh(slabGeo, this.materials.concreteFloor);
      slabMesh.position.set(0, y + 0.1, 0);
      this.modelGroup.add(slabMesh);
    }

    // DB-SE-AE 5.3 BRACING: 3 non-concurrent triangulated planes in ≥2 directions!
    // Plane 1: Front Facade X direction (z = -bayZ)
    this.addCrossBracing(
      new THREE.Vector3(-bayX, 0, -bayZ),
      new THREE.Vector3(0, 0, -bayZ),
      storyH,
      this.materials.braceGold
    );

    // Plane 2: Right Facade Z direction (x = bayX)
    this.addCrossBracing(
      new THREE.Vector3(bayX, 0, -bayZ),
      new THREE.Vector3(bayX, 0, 0),
      storyH,
      this.materials.braceGold
    );

    // Plane 3: Left Facade Z direction (x = -bayX, bay 2) -> NOT concurrent in the same column!
    this.addCrossBracing(
      new THREE.Vector3(-bayX, 0, 0),
      new THREE.Vector3(-bayX, 0, bayZ),
      storyH,
      this.materials.braceRed
    );
  }

  addCrossBracing(p1, p2, height, material) {
    const dX = p2.x - p1.x;
    const dZ = p2.z - p1.z;
    const lenHoriz = Math.hypot(dX, dZ);
    const diagLen = Math.hypot(lenHoriz, height);
    const angleHoriz = Math.atan2(dZ, dX);
    const angleElev = Math.atan2(height, lenHoriz);

    // Diagonal 1 (Bottom Left to Top Right)
    const braceGeo1 = new THREE.CylinderGeometry(0.06, 0.06, diagLen, 8);
    const bMesh1 = new THREE.Mesh(braceGeo1, material);
    bMesh1.position.set((p1.x + p2.x) / 2, height / 2, (p1.z + p2.z) / 2);
    bMesh1.rotation.y = -angleHoriz + Math.PI / 2;
    bMesh1.rotation.z = angleElev;
    bMesh1.castShadow = true;
    this.modelGroup.add(bMesh1);

    // Diagonal 2 (Bottom Right to Top Left)
    const braceGeo2 = new THREE.CylinderGeometry(0.06, 0.06, diagLen, 8);
    const bMesh2 = new THREE.Mesh(braceGeo2, material);
    bMesh2.position.set((p1.x + p2.x) / 2, height / 2, (p1.z + p2.z) / 2);
    bMesh2.rotation.y = -angleHoriz + Math.PI / 2;
    bMesh2.rotation.z = -angleElev;
    bMesh2.castShadow = true;
    this.modelGroup.add(bMesh2);
  }

  // MODEL 2: Joint Detail (Nudo Articulado vs Rígido)
  buildJointDetailModel() {
    // Column HEB 300
    const colGeo = this.createIBeamGeometry(4.0, 0.5, 0.5, 0.1, 0.12);
    const colMesh = new THREE.Mesh(colGeo, this.materials.steelDark);
    colMesh.rotation.x = Math.PI / 2;
    colMesh.position.set(0, 1.8, 0);
    colMesh.castShadow = true;
    this.modelGroup.add(colMesh);

    // Beam IPE 300
    const beamLength = 3.2;
    const beamGeo = this.createIBeamGeometry(beamLength, 0.45, 0.25, 0.06, 0.09);
    const beamMesh = new THREE.Mesh(beamGeo, this.materials.steelBeam);
    beamMesh.rotation.y = Math.PI / 2;
    beamMesh.position.set(beamLength / 2 + 0.25, 1.8, 0);
    beamMesh.castShadow = true;
    this.modelGroup.add(beamMesh);

    // Seat cleat / Apoyo inferior (Unión b/c)
    const seatGeo = new THREE.BoxGeometry(0.35, 0.03, 0.26);
    const seatMesh = new THREE.Mesh(seatGeo, this.materials.jointHighlight);
    seatMesh.position.set(0.25 + 0.15, 1.8 - 0.24, 0);
    this.modelGroup.add(seatMesh);

    // Triangular stiffener / Cartela bajo el asiento (Apoyo rigidizado)
    const cartelaShape = new THREE.Shape();
    cartelaShape.moveTo(0, 0);
    cartelaShape.lineTo(0.28, 0);
    cartelaShape.lineTo(0, -0.35);
    cartelaShape.closePath();
    const cartelaGeo = new THREE.ExtrudeGeometry(cartelaShape, { depth: 0.03, bevelEnabled: false });
    cartelaGeo.center();
    const cartelaMesh = new THREE.Mesh(cartelaGeo, this.materials.jointHighlight);
    cartelaMesh.position.set(0.25 + 0.14, 1.8 - 0.42, 0);
    this.modelGroup.add(cartelaMesh);

    // Vertical Web Weld Bead (m: 1/2 a 2/3 de h_alma)
    const weldGeo = new THREE.BoxGeometry(0.04, 0.24, 0.08);
    const weldMesh1 = new THREE.Mesh(weldGeo, this.materials.weldGlow);
    weldMesh1.position.set(0.26, 1.8, 0.04);
    this.modelGroup.add(weldMesh1);

    const weldMesh2 = new THREE.Mesh(weldGeo, this.materials.weldGlow);
    weldMesh2.position.set(0.26, 1.8, -0.04);
    this.modelGroup.add(weldMesh2);

    // Stiffener plates in column web (Rigidizadores para cuando se analiza nudo rígido)
    const stiffUpperGeo = new THREE.BoxGeometry(0.48, 0.02, 0.22);
    const stiffUpper = new THREE.Mesh(stiffUpperGeo, this.materials.braceGold);
    stiffUpper.position.set(0, 1.8 + 0.21, 0);
    this.modelGroup.add(stiffUpper);

    const stiffLowerGeo = new THREE.BoxGeometry(0.48, 0.02, 0.22);
    const stiffLower = new THREE.Mesh(stiffLowerGeo, this.materials.braceGold);
    stiffLower.position.set(0, 1.8 - 0.21, 0);
    this.modelGroup.add(stiffLower);
  }

  // MODEL 3: Special Trusses (Pratt vs Vierendeel)
  buildTrussComparisonModel() {
    // Group 1: Viga Pratt (Left side)
    const prattGroup = new THREE.Group();
    prattGroup.position.set(0, 4.5, -3);
    this.buildPrattTruss(prattGroup);
    this.modelGroup.add(prattGroup);

    // Group 2: Viga Vierendeel (Right side / Lower)
    const vierGroup = new THREE.Group();
    vierGroup.position.set(0, 1.0, 3);
    this.buildVierendeelTruss(vierGroup);
    this.modelGroup.add(vierGroup);
  }

  buildPrattTruss(parent) {
    const bays = 6;
    const bayW = 2.4;
    const height = 1.8;
    const halfLen = (bays * bayW) / 2;

    // Top and Bottom Chords
    const chordGeo = new THREE.BoxGeometry(bays * bayW, 0.2, 0.2);
    const topChord = new THREE.Mesh(chordGeo, this.materials.steelBeam);
    topChord.position.set(0, height, 0);
    parent.add(topChord);

    const botChord = new THREE.Mesh(chordGeo, this.materials.steelBeam);
    botChord.position.set(0, 0, 0);
    parent.add(botChord);

    // Verticals and Diagonals
    for (let i = 0; i <= bays; i++) {
      const x = -halfLen + i * bayW;
      // Vertical (Montante - a compresión)
      const vertGeo = new THREE.CylinderGeometry(0.06, 0.06, height, 8);
      const vertMesh = new THREE.Mesh(vertGeo, this.materials.steelDark);
      vertMesh.position.set(x, height / 2, 0);
      parent.add(vertMesh);

      // Pratt Diagonals (A tracción: inclinadas hacia el centro)
      if (i < bays) {
        const diagLen = Math.hypot(bayW, height);
        const diagGeo = new THREE.CylinderGeometry(0.05, 0.05, diagLen, 8);
        const diagMesh = new THREE.Mesh(diagGeo, this.materials.braceGold);
        diagMesh.position.set(x + bayW / 2, height / 2, 0);

        const angle = Math.atan2(height, bayW);
        if (i < bays / 2) {
          // Left half: points up-right towards center
          diagMesh.rotation.z = -angle;
        } else {
          // Right half: points up-left towards center
          diagMesh.rotation.z = angle;
        }
        parent.add(diagMesh);
      }
    }
  }

  buildVierendeelTruss(parent) {
    const bays = 5;
    const bayW = 2.6;
    const height = 1.8;
    const halfLen = (bays * bayW) / 2;

    // Rigid Top and Bottom Chords (Thicker than Pratt because of bending!)
    const chordGeo = new THREE.BoxGeometry(bays * bayW, 0.32, 0.28);
    const topChord = new THREE.Mesh(chordGeo, this.materials.steelBlue);
    topChord.position.set(0, height, 0);
    parent.add(topChord);

    const botChord = new THREE.Mesh(chordGeo, this.materials.steelBlue);
    botChord.position.set(0, 0, 0);
    parent.add(botChord);

    // Rigid Verticals (No diagonals at all! Pure open rectangular frames)
    for (let i = 0; i <= bays; i++) {
      const x = -halfLen + i * bayW;
      const vertGeo = new THREE.BoxGeometry(0.32, height, 0.28);
      const vertMesh = new THREE.Mesh(vertGeo, this.materials.steelBlue);
      vertMesh.position.set(x, height / 2, 0);
      parent.add(vertMesh);

      // Corner Haunches / Cartelas de refuerzo de nudo rígido
      if (i > 0 && i < bays) {
        const haunchGeo = new THREE.ConeGeometry(0.2, 0.2, 4);
        const h1 = new THREE.Mesh(haunchGeo, this.materials.jointHighlight);
        h1.position.set(x + 0.2, height - 0.2, 0);
        parent.add(h1);

        const h2 = new THREE.Mesh(haunchGeo, this.materials.jointHighlight);
        h2.position.set(x - 0.2, height - 0.2, 0);
        parent.add(h2);
      }
    }
  }

  // MODEL 4: Expansion Joint Detail (Doble Pilar vs Pilar Único con Apoyo Deslizante)
  buildExpansionJointModel() {
    // Model A: Doble Pilar (Separación 5 cm)
    const gap = 0.5; // Scaled for visual clarity

    // Left Column
    const colLeft = this.createIBeamGeometry(3.5, 0.45, 0.45, 0.08, 0.1);
    const colLeftMesh = new THREE.Mesh(colLeft, this.materials.steelDark);
    colLeftMesh.rotation.x = Math.PI / 2;
    colLeftMesh.position.set(-2.5 - gap / 2, 1.75, 0);
    colLeftMesh.castShadow = true;
    this.modelGroup.add(colLeftMesh);

    // Left Beam
    const beamLeft = this.createIBeamGeometry(3.0, 0.4, 0.22, 0.05, 0.08);
    const beamLeftMesh = new THREE.Mesh(beamLeft, this.materials.steelBeam);
    beamLeftMesh.rotation.y = Math.PI / 2;
    beamLeftMesh.position.set(-2.5 - gap / 2 - 1.5, 2.2, 0);
    this.modelGroup.add(beamLeftMesh);

    // Right Column
    const colRight = this.createIBeamGeometry(3.5, 0.45, 0.45, 0.08, 0.1);
    const colRightMesh = new THREE.Mesh(colRight, this.materials.steelDark);
    colRightMesh.rotation.x = Math.PI / 2;
    colRightMesh.position.set(-2.5 + gap / 2, 1.75, 0);
    colRightMesh.castShadow = true;
    this.modelGroup.add(colRightMesh);

    // Right Beam
    const beamRight = this.createIBeamGeometry(3.0, 0.4, 0.22, 0.05, 0.08);
    const beamRightMesh = new THREE.Mesh(beamRight, this.materials.steelBeam);
    beamRightMesh.rotation.y = Math.PI / 2;
    beamRightMesh.position.set(-2.5 + gap / 2 + 1.5, 2.2, 0);
    this.modelGroup.add(beamRightMesh);

    // Common Foundation Plate (Rule: NO HAY JUNTA EN CIMENTACIÓN!)
    const foundGeo = new THREE.BoxGeometry(2.4, 0.2, 1.2);
    const foundMesh = new THREE.Mesh(foundGeo, this.materials.plateBase);
    foundMesh.position.set(-2.5, 0.1, 0);
    this.modelGroup.add(foundMesh);

    // Model B: Pilar Único con Apoyo Deslizante (Tipo 2 o Tipo 4)
    const singleCol = this.createIBeamGeometry(3.5, 0.5, 0.5, 0.1, 0.12);
    const singleColMesh = new THREE.Mesh(singleCol, this.materials.steelBlue);
    singleColMesh.rotation.x = Math.PI / 2;
    singleColMesh.position.set(3.5, 1.75, 0);
    this.modelGroup.add(singleColMesh);

    // Left fixed beam
    const sBeamLeft = this.createIBeamGeometry(2.8, 0.4, 0.22, 0.05, 0.08);
    const sBeamLeftMesh = new THREE.Mesh(sBeamLeft, this.materials.steelBeam);
    sBeamLeftMesh.rotation.y = Math.PI / 2;
    sBeamLeftMesh.position.set(3.5 - 1.6, 2.2, 0);
    this.modelGroup.add(sBeamLeftMesh);

    // Right sliding beam (Dynamic sliding animation)
    const sBeamRight = this.createIBeamGeometry(2.8, 0.4, 0.22, 0.05, 0.08);
    this.slidingBeamMesh = new THREE.Mesh(sBeamRight, this.materials.jointHighlight);
    this.slidingBeamMesh.rotation.y = Math.PI / 2;
    this.slidingBeamMesh.position.set(3.5 + 1.65, 2.2, 0);
    this.modelGroup.add(this.slidingBeamMesh);

    // Slotted bracket / Chapa con coliso
    const bracketGeo = new THREE.BoxGeometry(0.8, 0.06, 0.35);
    const bracketMesh = new THREE.Mesh(bracketGeo, this.materials.weldGlow);
    bracketMesh.position.set(3.5 + 0.35, 1.95, 0);
    this.modelGroup.add(bracketMesh);
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    this.applyWireframe();
    return this.isWireframe;
  }

  applyWireframe() {
    Object.values(this.materials).forEach(mat => {
      mat.wireframe = this.isWireframe;
    });
  }

  toggleDeformation() {
    this.isDeforming = !this.isDeforming;
    return this.isDeforming;
  }

  resetCamera() {
    if (this.currentModelType === 'frame') {
      this.camera.position.set(16, 12, 20);
      if (this.controls) this.controls.target.set(0, 5, 0);
    } else if (this.currentModelType === 'joint') {
      this.camera.position.set(4, 3, 5);
      if (this.controls) this.controls.target.set(0, 1.5, 0);
    } else if (this.currentModelType === 'truss') {
      this.camera.position.set(0, 6, 22);
      if (this.controls) this.controls.target.set(0, 3, 0);
    } else if (this.currentModelType === 'expansion') {
      this.camera.position.set(8, 6, 10);
      if (this.controls) this.controls.target.set(0, 2, 0);
    }
    if (this.controls) this.controls.update();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.controls) this.controls.update();

    // Subtle idle animation or deformation
    if (this.isDeforming) {
      this.deformationPhase += 0.04;
      const offset = Math.sin(this.deformationPhase) * 0.15;

      // Animate expansion sliding beam
      if (this.slidingBeamMesh) {
        this.slidingBeamMesh.position.x = 3.5 + 1.65 + offset;
      }

      // Animate frame drift under wind
      if (this.currentModelType === 'frame') {
        this.modelGroup.rotation.z = Math.sin(this.deformationPhase * 0.5) * 0.02;
      }
    } else {
      if (this.slidingBeamMesh) {
        this.slidingBeamMesh.position.x = 3.5 + 1.65;
      }
      if (this.currentModelType === 'frame') {
        this.modelGroup.rotation.z = 0;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}

window.StructuralViewer3D = StructuralViewer3D;
