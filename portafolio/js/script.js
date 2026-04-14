
// Three.js Background Animation
const initThreeJS = () => {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();

    // Orthographic camera for a 2D-like abstract feel, or Perspective for depth. 
    // Using Perspective for particle depth.
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Particles - Geometric abstractions
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 300; // Minimalist count
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        // Random spread
        posArray[i] = (Math.random() - 0.5) * 15; // Spread range
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material: Theme color points
    const material = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x1A73E8, // Accent color
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Connecting lines (optional, improves "Network" feel)
    // For simplicity and performance, keeping just points rotating for now.

    camera.position.z = 3;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Gentle constant rotation
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;

        // Interactive movement
        particlesMesh.rotation.y += mouseX * 0.005; // Influence
        particlesMesh.rotation.x += mouseY * 0.005;

        // Scroll influence
        const scrollY = window.scrollY;
        camera.position.y = -(scrollY * 0.001); // Move camera down as we scroll

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Video Gallery Navigation (Arrows)
const initGalleryNavigation = () => {
    const scrollContainer = document.querySelector('.gallery-scroll');
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');

    if (prevBtn && nextBtn && scrollContainer) {
        prevBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -320, behavior: 'smooth' }); // ~card width + gap
        });

        nextBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }
};

// Project Experience Pills
const initProjectPills = () => {
    const pills = document.querySelectorAll('.pill-btn');
    const categories = document.querySelectorAll('.project-category');

    if (!pills.length) return;

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // 1. Reset all pills
            pills.forEach(p => p.classList.remove('active'));
            // 2. Activate clicked pill
            pill.classList.add('active');

            // 3. Hide all content
            categories.forEach(cat => cat.classList.remove('active'));

            // 4. Show target content
            const targetId = pill.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initGalleryNavigation();
    initProjectPills();
});
