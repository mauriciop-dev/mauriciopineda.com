(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));


  // Project labels update the example card on hover, focus, or tap.
  const projectExamples = {
    culture: {
      category: 'CULTURA Y PARTICIPACIÓN', title: 'Cultura viva comunitaria',
      place: 'Puente Aranda · Bogotá · 2013',
      description: 'Coordinación de un proyecto con la Secretaría de Cultura de Bogotá para fortalecer procesos culturales comunitarios y participación local.',
      tags: ['Cultura comunitaria', 'Gestión pública']
    },
    poverty: {
      category: 'DESARROLLO SOCIAL', title: 'Red Unidos: superación de pobreza',
      place: 'Boyacá y Vichada · 2016–2017',
      description: 'Coordinación territorial en 31 municipios de Boyacá: más de 368 familias superaron la pobreza extrema. En Vichada, planes integrales apoyaron a 4 comunidades indígenas.',
      tags: ['31 municipios', 'Enfoque diferencial']
    },
    infrastructure: {
      category: 'INFRAESTRUCTURA COMUNITARIA', title: 'Obras y servicios para comunidades rurales',
      place: 'Hacarí y El Tarra · Catatumbo',
      description: 'Articulación de alcaldías, Gobernación de Norte de Santander, comunidades y entidades públicas para gestionar infraestructura educativa, deportiva, social y de agua potable.',
      tags: ['Gobernanza local', 'Infraestructura']
    },
    migration: {
      category: 'MIGRACIÓN E INCLUSIÓN', title: 'Rutas de atención e inclusión para población migrante',
      place: 'Arauca · 2019',
      description: 'Diseño de una estrategia para instalar 8 puntos de información al migrante y acompañamiento a iniciativas de inclusión educativa, atención y fortalecimiento productivo.',
      tags: ['8 puntos de información', 'Inclusión']
    },
    peace: {
      category: 'PAZ Y REPARACIÓN COLECTIVA', title: 'Articulación para la reparación colectiva',
      place: 'Filo Gringo · El Tarra · Catatumbo',
      description: 'Trabajo con la alcaldía, la Unidad para las Víctimas (UARIV) y comunidades rurales para apoyar la gestión del plan integral de reparación colectiva.',
      tags: ['UARIV', 'Construcción de paz']
    },
    policy: {
      category: 'ANÁLISIS DE POLÍTICA PÚBLICA', title: 'Transporte escolar en Bogotá',
      place: 'Personería de Bogotá',
      description: 'Análisis de política pública sobre transporte escolar para la Personería de Bogotá, con enfoque en la revisión institucional del servicio y sus retos de gestión.',
      tags: ['Política pública', 'Educación']
    },
    investment: {
      category: 'INVERSIÓN Y ARTICULACIÓN', title: 'Mesa de Obras por Impuestos',
      place: 'Norte de Santander',
      description: 'Participación en la Mesa de Obras por Impuestos de Norte de Santander, articulando actores alrededor de prioridades de inversión y oportunidades de desarrollo territorial.',
      tags: ['Alianzas', 'Inversión territorial']
    },
    digital: {
      category: 'TECNOLOGÍA CON PROPÓSITO', title: 'Seguimiento inteligente de proyectos',
      place: 'Analítica de datos · Power BI · Copilot',
      description: 'Dashboards de Power BI y apoyo de Copilot para el seguimiento de proyectos en tiempo real, con indicadores, alertas y consultas que facilitan decisiones oportunas.',
      tags: ['Power BI', 'IA aplicada']
    }
  };
  const chips = [...document.querySelectorAll('.project-chip')];
  const exampleCard = document.getElementById('project-example');
  if (chips.length && exampleCard) {
    const category = document.getElementById('example-category');
    const count = document.getElementById('example-count');
    const title = document.getElementById('example-title');
    const place = document.getElementById('example-place');
    const description = document.getElementById('example-description');
    const tags = document.getElementById('example-tags');
    function showExample(id) {
      const data = projectExamples[id];
      if (!data) return;
      chips.forEach((chip, index) => {
        const active = chip.dataset.case === id;
        chip.setAttribute('aria-pressed', String(active));
        if (active) count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(chips.length).padStart(2, '0');
      });
      category.textContent = data.category;
      title.textContent = data.title;
      place.textContent = data.place;
      description.textContent = data.description;
      tags.replaceChildren(...data.tags.map(label => {
        const tag = document.createElement('span');
        tag.textContent = label;
        return tag;
      }));
    }
    chips.forEach(chip => {
      chip.addEventListener('mouseenter', () => showExample(chip.dataset.case));
      chip.addEventListener('focus', () => showExample(chip.dataset.case));
      chip.addEventListener('click', () => showExample(chip.dataset.case));
    });
    showExample('infrastructure');
  }

  if (!window.THREE || reduceMotion) return;
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 4.5;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const count = window.innerWidth < 650 ? 120 : 240;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - .5) * 15;
    positions[i * 3 + 1] = (Math.random() - .5) * 10;
    positions[i * 3 + 2] = (Math.random() - .5) * 10;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x4388ed, size: .035, transparent: true, opacity: .65, sizeAttenuation: true }));
  scene.add(points);
  let mouseX = 0, mouseY = 0, scrollY = 0;
  window.addEventListener('pointermove', event => { mouseX = event.clientX / window.innerWidth - .5; mouseY = event.clientY / window.innerHeight - .5; }, { passive: true });
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  function resize() { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); }
  window.addEventListener('resize', resize, { passive: true });
  let frame;
  function animate() {
    frame = requestAnimationFrame(animate);
    points.rotation.y += .00035 + mouseX * .0008;
    points.rotation.x += .00015 + mouseY * .0005;
    camera.position.y = -(scrollY * .00035);
    renderer.render(scene, camera);
  }
  animate();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else animate();
  });
})();
