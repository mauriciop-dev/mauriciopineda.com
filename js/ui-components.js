// Carousel component for automatic fade-in slideshow
// This component is designed to be generic and safe to use on any page
// It will only activate if it finds a container with the ID #authoritySlide

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the authority slider if the container exists
    const authoritySlideContainer = document.getElementById('authoritySlide');
    
    if (authoritySlideContainer) {
        initAuthoritySlide();
    }
});

function initAuthoritySlide() {
    // Define the slides with their respective content
    const slides = [
        {
            // Slide 1: Autoridad - Using IMG_20220723_160112.jpg (available image)
            img: '../fotos/IMG_20220723_160112.jpg',
            alt: 'Colaboración con organizaciones multilaterales',
            title: 'Experiencia colaborando con organizaciones multilaterales y entidades estatales de alto nivel'
        },
        {
            // Slide 2: Liderazgo y Capacitación - Using IMG_20171127_164209752.jpg (available image)
            img: '../fotos/IMG_20171127_164209752.jpg',
            alt: 'Capacitación grupal en campo',
            title: 'Capacidad probada para liderar equipos y transmitir estrategias comerciales efectivas en territorio'
        },
        {
            // Slide 3: Comunicación - Using IMG_20221103_121737.jpg (available image)
            img: '../fotos/IMG_20221103_121737.jpg',
            alt: 'Comunicación efectiva en terreno',
            title: 'Comunicador eficaz con habilidades para la negociación y la presentación de proyectos ante audiencias directivas'
        },
        {
            // Slide 4: Reconocimiento - Using IMG_0599.JPG (available image)
            img: '../fotos/IMG_0599.JPG',
            alt: 'Participación en foros de gestión',
            title: 'Participación activa en foros nacionales e internacionales de gestión y desarrollo'
        }
    ];

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide
    const fadeDuration = 1000; // 1 second for fade transition

    // Create slide elements
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'authority-slider-wrapper';
    authoritySlideContainer.innerHTML = ''; // Clear container
    authoritySlideContainer.appendChild(sliderWrapper);

    // Create slides
    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `authority-slide ${index === 0 ? 'active' : ''}`;
        slideElement.style.backgroundImage = `url('${slide.img}')`;
        slideElement.innerHTML = `
            <div class="slide-content">
                <h3 class="slide-title">${slide.title}</h3>
            </div>
        `;
        sliderWrapper.appendChild(slideElement);
    });

    // Add navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    authoritySlideContainer.appendChild(dotsContainer);

    // Get references to elements for manipulation
    const slidesElements = authoritySlideContainer.querySelectorAll('.authority-slide');
    const dotsElements = authoritySlideContainer.querySelectorAll('.dot');

    // Function to go to specific slide
    function goToSlide(index) {
        // Remove active class from current slide and dot
        slidesElements[currentSlide].classList.remove('active');
        dotsElements[currentSlide].classList.remove('active');

        // Add active class to new slide and dot
        currentSlide = index;
        slidesElements[currentSlide].classList.add('active');
        dotsElements[currentSlide].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        goToSlide(nextIndex);
    }

    // Start automatic sliding
    let slideIntervalId = setInterval(nextSlide, slideInterval);

    // Pause on hover
    authoritySlideContainer.addEventListener('mouseenter', () => {
        clearInterval(slideIntervalId);
    });

    authoritySlideContainer.addEventListener('mouseleave', () => {
        slideIntervalId = setInterval(nextSlide, slideInterval);
    });

    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    authoritySlideContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    authoritySlideContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    }, { passive: true });

    function handleGesture() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                let prevIndex = currentSlide - 1;
                if (prevIndex < 0) {
                    prevIndex = slides.length - 1;
                }
                goToSlide(prevIndex);
            }
        }
    }
}