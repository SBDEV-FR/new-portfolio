// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Language Toggle
let currentLang = 'en';
const langButtons = document.querySelectorAll('.lang-btn');

function switchLanguage(lang) {
    currentLang = lang;

    // Update active button
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });

    // Update placeholders for form inputs
    document.querySelectorAll('[data-placeholder-en]').forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });

    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Language button event listeners
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
    });
});

// Load saved language preference
const savedLang = localStorage.getItem('preferredLanguage');
if (savedLang) {
    switchLanguage(savedLang);
}

// Cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;

    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';

    requestAnimationFrame(animateGlow);
}

animateGlow();

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(8, 8, 16, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(8, 8, 16, 0.9)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Neural network animation
const neuralNetwork = document.querySelector('.neural-network');

function createNode() {
    const node = document.createElement('div');
    node.style.position = 'absolute';
    node.style.width = '8px';
    node.style.height = '8px';
    node.style.borderRadius = '50%';
    node.style.background = 'var(--primary)';
    node.style.boxShadow = '0 0 10px var(--primary)';
    node.style.left = Math.random() * 100 + '%';
    node.style.top = Math.random() * 100 + '%';
    node.style.opacity = '0';
    node.style.animation = `nodeFloat ${3 + Math.random() * 3}s infinite ease-in-out`;
    node.style.animationDelay = Math.random() * 2 + 's';

    return node;
}

if (neuralNetwork) {
    for (let i = 0; i < 20; i++) {
        neuralNetwork.appendChild(createNode());
    }
}

// Add CSS animation for nodes
const style = document.createElement('style');
style.textContent = `
    @keyframes nodeFloat {
        0%, 100% {
            opacity: 0;
            transform: translate(0, 0) scale(1);
        }
        50% {
            opacity: 1;
            transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Project cards interaction
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// Skill category animation
const skillCategories = document.querySelectorAll('.skill-category');

skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    category.style.transitionDelay = `${index * 0.1}s`;
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

skillCategories.forEach(category => {
    skillObserver.observe(category);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Formspree will handle the actual submission
        // After submission, you might want to show a success message
        setTimeout(() => {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroText && heroVisual) {
        heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Education cards animation
const educationCards = document.querySelectorAll('.education-card');

educationCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.15}s`;
});

const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

educationCards.forEach(card => {
    educationObserver.observe(card);
});

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 500);
}

// Add dynamic background particles
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'var(--primary)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.opacity = Math.random() * 0.5;
    particle.style.pointerEvents = 'none';
    particle.style.animation = `particleFade ${2 + Math.random() * 3}s ease-in-out infinite`;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles periodically
setInterval(createParticle, 500);

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFade {
        0%, 100% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 0.5;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(particleStyle);

// Console easter egg
console.log('%c👋 Hello fellow developer!', 'color: #a78bfa; font-size: 20px; font-weight: bold;');
console.log('%cLooking at the code? I appreciate your curiosity!', 'color: #ec4899; font-size: 14px;');
console.log('%cFeel free to reach out if you want to collaborate!', 'color: #06b6d4; font-size: 14px;');