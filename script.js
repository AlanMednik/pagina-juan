document.addEventListener('DOMContentLoaded', () => {
    
    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- REVEAL ON SCROLL ---
    const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // --- MOBILE MENU ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    // --- TESTIMONIALS CAROUSEL ---
    const track = document.getElementById('tTrack');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 24; // Width + gap

    // Create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('c-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.c-dot');

    const updateCarousel = () => {
        // Handle responsive: only 1 card on mobile, more on desktop
        const containerWidth = track.parentElement.offsetWidth;
        const visibleCards = Math.floor(containerWidth / (cardWidth - 24));
        const maxIndex = cards.length - visibleCards;
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateCarousel();
    };

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= cards.length) currentIndex = 0;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = cards.length - 1;
        updateCarousel();
    });

    // Auto slide
    let autoSlideInterval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= cards.length) currentIndex = 0;
        updateCarousel();
    }, 5000);

    const pauseAutoSlide = () => clearInterval(autoSlideInterval);
    const resumeAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            currentIndex++;
            if (currentIndex >= cards.length) currentIndex = 0;
            updateCarousel();
        }, 5000);
    };

    track.addEventListener('mouseenter', pauseAutoSlide);
    track.addEventListener('mouseleave', resumeAutoSlide);

    window.addEventListener('resize', updateCarousel);

    // --- APPOINTMENT FORM ---
    const appointmentForm = document.getElementById('appointmentForm');
    const formSuccess = document.getElementById('formSuccess');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state (simple)
            const submitBtn = appointmentForm.querySelector('.form-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                appointmentForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Confetti or effect if we wanted, but let's keep it clean
                console.log('Turno reservado:', {
                    nombre: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    date: document.getElementById('date').value,
                    time: document.getElementById('time').value,
                    service: document.getElementById('service').value,
                    location: document.getElementById('location').value
                });
            }, 1500);
        });
    }

    // --- HERO PARTICLES (CUSTOM SIMPLE CANVAS) ---
    // Adding some drifting rasta-colored dots for flare
    const hero = document.getElementById('hero');
    const canvas = document.createElement('canvas');
    canvas.className = 'hero-particles';
    hero.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    const colors = ['#CC2222', '#E8B800', '#2E8B2E'];

    const resizeCanvas = () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    };

    class Particle {
        constructor() {
            this.init();
        }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const initParticles = () => {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    };

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    resizeCanvas();
    initParticles();
    animateParticles();

});
