// ============================================================
//   ULTRA-PREMIUM PORTFOLIO — INTERACTIVE ENGINE
// ============================================================

// ====== PRELOADER ======
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 2200);
});

// ====== CUSTOM CURSOR ======
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth follow for ring
    function animateCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Scale up cursor on hover over links/buttons
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '60px';
            cursorRing.style.height = '60px';
            cursorRing.style.borderColor = 'rgba(6, 182, 212, 0.7)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.borderColor = 'rgba(6, 182, 212, 0.5)';
        });
    });
}

// ====== PARTICLE BACKGROUND ======
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity * 0.6})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ====== TYPED TEXT ANIMATION ======
const typedElement = document.getElementById('typed');
if (typedElement) {
    const phrases = [
        'ML Pipelines.',
        'Generative AI Solutions.',
        'Data Dashboards.',
        'Intelligent Systems.',
        'FastAPI Backends.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();
}

// ====== NAVBAR SCROLL ======
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Sticky navbar
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 200;
        if (window.pageYOffset >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ====== MOBILE NAV ======
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navLinks');

if (burger && navMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
}

// ====== REVEAL ON SCROLL (INTERSECTION OBSERVER) ======
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ====== ANIMATED STAT COUNTERS ======
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 30);
}

// ====== ANIMATED SKILL BARS ======
const skillBars = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

// ====== CV MODAL ======
const modal = document.getElementById('cv-modal');
const openBtn = document.getElementById('open-cv');
const closeBtn = document.getElementById('close-modal');
const pdfContainer = document.getElementById('modal-pdf-container');

function openCVModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Wait a frame so the modal is rendered and has dimensions
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Clear any previous iframe
            pdfContainer.innerHTML = '';

            // Get the exact pixel dimensions of the container
            const rect = pdfContainer.getBoundingClientRect();
            const w = Math.floor(rect.width);
            const h = Math.floor(rect.height);

            // Create iframe with exact pixel dimensions
            const iframe = document.createElement('iframe');
            iframe.src = 'Generalised CV.pdf#toolbar=1&view=FitH';
            iframe.width = w;
            iframe.height = h;
            iframe.style.border = 'none';
            iframe.style.display = 'block';
            iframe.style.background = '#fff';
            pdfContainer.appendChild(iframe);
        });
    });
}

function closeCVModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    // Clean up iframe
    if (pdfContainer) pdfContainer.innerHTML = '';
}

if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', openCVModal);
    closeBtn.addEventListener('click', closeCVModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCVModal();
    });
}

// CV Section "View CV" button
const openCvSection = document.getElementById('open-cv-section');
if (openCvSection) {
    openCvSection.addEventListener('click', openCVModal);
}


