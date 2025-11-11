/**
 * Personal Portfolio Website - Main JavaScript
 * Handles theme switching, navigation, form submission, and interactive features
 */

// ==========================================
// Theme Management
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Load saved theme or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ==========================================
// Mobile Navigation
// ==========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    
    navMenu.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
});

// ==========================================
// Navbar Scroll Effect
// ==========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// Smooth Scrolling for Navigation Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Back to Top Button
// ==========================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// Active Navigation Link Highlighting
// ==========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ==========================================
// Contact Form Handling
// ==========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (validateForm(formData)) {
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        showFormMessage('success', 'Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    } else {
        showFormMessage('error', 'Please fill in all fields correctly.');
    }
});

// Form validation
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.trim().length < 2) {
        return false;
    }
    
    if (!data.email || !emailRegex.test(data.email)) {
        return false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        return false;
    }
    
    return true;
}

// Show form message
function showFormMessage(type, message) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        animation: fadeIn 0.3s ease-out;
        ${type === 'success' 
            ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;
    
    contactForm.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// ==========================================
// Intersection Observer for Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
    '.project-card, .skill-category, .contact-item, .about-content'
);

animatedElements.forEach(element => {
    observer.observe(element);
});

// ==========================================
// Typing Effect for Hero Section (Optional)
// ==========================================
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
const roles = [
    'Web Developer & Designer',
    'Frontend Specialist',
    'UI/UX Enthusiast',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        heroSubtitle.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroSubtitle.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before starting new word
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Uncomment the line below to enable the typing effect
// setTimeout(typeEffect, 1000);

// ==========================================
// Project Card Tilt Effect (Optional)
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ==========================================
// Lazy Loading Images
// ==========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// Performance: Reduce motion for users who prefer it
// ==========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}

// ==========================================
// Console Easter Egg
// ==========================================
console.log(
    '%c👋 Hello, fellow developer!',
    'font-size: 20px; font-weight: bold; color: #3498db;'
);
console.log(
    '%cInterested in the code? Check out the repository!',
    'font-size: 14px; color: #2c3e50;'
);

// ==========================================
// Initialize
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Initial navigation highlight
    highlightNavigation();
    
    console.log('Portfolio website loaded successfully! 🚀');
});

// ==========================================
// Substack Posts Loading
// ==========================================
async function loadSubstackPosts() {
    const substackContainer = document.getElementById('substackPosts');
    const substackUsername = 'nikolasneofytou';
    
    try {
        // Note: Due to CORS restrictions, we'll show placeholder posts
        // In production, you would need a backend proxy or use Substack's RSS feed
        const placeholderPosts = [
            {
                title: "Latest Insights on Technology and Development",
                date: "Recent",
                excerpt: "Exploring the intersection of innovation, coding practices, and creative problem-solving in modern software development.",
                link: `https://substack.com/@${substackUsername}`
            },
            {
                title: "Thoughts on Building Better Applications",
                date: "Recent",
                excerpt: "Sharing experiences and lessons learned from building practical applications that solve real-world problems.",
                link: `https://substack.com/@${substackUsername}`
            },
            {
                title: "The Journey of a Developer and Creator",
                date: "Recent",
                excerpt: "Reflections on balancing multiple creative pursuits including development, writing, and photography.",
                link: `https://substack.com/@${substackUsername}`
            }
        ];
        
        // Clear loading message
        substackContainer.innerHTML = '';
        
        // Display posts
        placeholderPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'writing-card';
            postCard.innerHTML = `
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                </div>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="read-more">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            `;
            
            postCard.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A') {
                    window.open(post.link, '_blank');
                }
            });
            
            substackContainer.appendChild(postCard);
        });
        
        // Add note about connecting to actual Substack feed
        const note = document.createElement('div');
        note.className = 'writing-placeholder';
        note.style.fontSize = '0.9rem';
        note.style.padding = '1rem';
        note.innerHTML = `
            <p><i class="fas fa-info-circle"></i> These are placeholder posts. 
            Visit <a href="https://substack.com/@${substackUsername}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color);">
            my Substack</a> to read actual articles.</p>
        `;
        substackContainer.appendChild(note);
        
    } catch (error) {
        console.error('Error loading Substack posts:', error);
        substackContainer.innerHTML = `
            <div class="writing-placeholder">
                <p><i class="fas fa-exclamation-circle"></i> Unable to load posts. 
                Please visit <a href="https://substack.com/@${substackUsername}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color);">
                my Substack directly</a>.</p>
            </div>
        `;
    }
}

// ==========================================
// Initialize on Load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Initial navigation highlight
    highlightNavigation();
    
    // Load Substack posts
    loadSubstackPosts();
    
    console.log('Portfolio website loaded successfully! 🚀');
});
