/**
 * Personal Portfolio Website - Main JavaScript
 * Handles navigation, form submission, and interactive features
 */

// ==========================================
// Force Dark Theme
// ==========================================
const html = document.documentElement;
html.setAttribute('data-theme', 'dark');

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
    
    // Load GitHub repositories
    loadGitHubProjects();
    
    console.log('Portfolio website loaded successfully! 🚀');
});

// ==========================================
// GitHub Projects Loading
// ==========================================
async function loadGitHubProjects() {
    const username = 'NikolasNeofytou';
    
    try {
        // Fetch pinned repos first, then fall back to recent repos
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        // Filter out forks and sort by stars and updated date
        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => {
                // Prioritize repos with stars, then by updated date
                if (b.stargazers_count !== a.stargazers_count) {
                    return b.stargazers_count - a.stargazers_count;
                }
                return new Date(b.updated_at) - new Date(a.updated_at);
            })
            .slice(0, 6); // Get top 6 repos
        
        // Update the project cards
        const projectCards = document.querySelectorAll('.project-card');
        
        filteredRepos.forEach((repo, index) => {
            if (index < projectCards.length) {
                const card = projectCards[index];
                
                // Update project image with gradient based on language/name
                const projectImage = card.querySelector('.project-image');
                
                // Generate gradient colors based on language or repo name
                const gradients = {
                    'JavaScript': 'linear-gradient(135deg, #f7df1e 0%, #f0db4f 100%)',
                    'Python': 'linear-gradient(135deg, #306998 0%, #ffd43b 100%)',
                    'TypeScript': 'linear-gradient(135deg, #007acc 0%, #3178c6 100%)',
                    'Java': 'linear-gradient(135deg, #f89820 0%, #5382a1 100%)',
                    'C++': 'linear-gradient(135deg, #00599c 0%, #004482 100%)',
                    'C': 'linear-gradient(135deg, #555555 0%, #283593 100%)',
                    'HTML': 'linear-gradient(135deg, #e34c26 0%, #f06529 100%)',
                    'CSS': 'linear-gradient(135deg, #264de4 0%, #2965f1 100%)',
                    'Ruby': 'linear-gradient(135deg, #cc342d 0%, #e34c26 100%)',
                    'Go': 'linear-gradient(135deg, #00add8 0%, #5dc9e2 100%)',
                    'Rust': 'linear-gradient(135deg, #ce422b 0%, #e34c26 100%)',
                    'PHP': 'linear-gradient(135deg, #777bb3 0%, #8892bf 100%)',
                    'Swift': 'linear-gradient(135deg, #ffac45 0%, #f05138 100%)',
                    'Kotlin': 'linear-gradient(135deg, #7f52ff 0%, #a97bff 100%)',
                    'default': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                };
                
                const gradient = gradients[repo.language] || gradients['default'];
                projectImage.style.background = gradient;
                
                // Add language icon if available
                const repoName = repo.name.replace(/-|_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                projectImage.innerHTML = `
                    <div class="project-gradient-overlay">
                        <div class="project-icon">
                            <i class="fab fa-github"></i>
                        </div>
                        <div class="project-gradient-title">${repoName}</div>
                    </div>
                `;
                
                // Update overlay link
                const overlay = card.querySelector('.project-overlay');
                if (overlay) {
                    overlay.innerHTML = `
                        <a href="${repo.html_url}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i>
                        </a>
                    `;
                }
                
                // Update project content
                const projectTitle = card.querySelector('.project-title');
                const projectDescription = card.querySelector('.project-description');
                const projectTech = card.querySelector('.project-tech');
                
                if (projectTitle) {
                    projectTitle.textContent = repo.name.replace(/-|_/g, ' ')
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                }
                
                if (projectDescription) {
                    projectDescription.textContent = repo.description || 'A project by Nikolas Neofytou';
                }
                
                if (projectTech) {
                    projectTech.innerHTML = '';
                    
                    // Add language tag
                    if (repo.language) {
                        const langTag = document.createElement('span');
                        langTag.className = 'tech-tag';
                        langTag.textContent = repo.language;
                        projectTech.appendChild(langTag);
                    }
                    
                    // Add stars if any
                    if (repo.stargazers_count > 0) {
                        const starsTag = document.createElement('span');
                        starsTag.className = 'tech-tag';
                        starsTag.innerHTML = `<i class="fas fa-star"></i> ${repo.stargazers_count}`;
                        projectTech.appendChild(starsTag);
                    }
                    
                    // Add topics as tags (up to 3)
                    if (repo.topics && repo.topics.length > 0) {
                        repo.topics.slice(0, 3).forEach(topic => {
                            const topicTag = document.createElement('span');
                            topicTag.className = 'tech-tag';
                            topicTag.textContent = topic;
                            projectTech.appendChild(topicTag);
                        });
                    }
                }
            }
        });
        
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        // Keep the existing static content if API fails
    }
}

// ==========================================
// Substack Posts Loading
// ==========================================
async function loadSubstackPosts() {
    const substackContainer = document.getElementById('substackPosts');
    const substackUsername = 'nikolasneofytou';
    
    try {
        // Try multiple CORS proxies in order
        const rssUrl = `https://${substackUsername}.substack.com/feed`;
        const proxies = [
            `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
            `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`
        ];
        
        let xmlText = null;
        let lastError = null;
        
        // Try each proxy
        for (const proxyUrl of proxies) {
            try {
                const response = await fetch(proxyUrl, { 
                    method: 'GET',
                    headers: {
                        'Accept': 'application/xml, text/xml, */*'
                    }
                });
                
                if (response.ok) {
                    xmlText = await response.text();
                    if (xmlText && xmlText.includes('<rss') || xmlText.includes('<feed')) {
                        break; // Success, exit loop
                    }
                }
            } catch (err) {
                lastError = err;
                continue; // Try next proxy
            }
        }
        
        if (!xmlText) {
            throw lastError || new Error('All proxies failed');
        }
        
        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Check for parsing errors
        if (xmlDoc.querySelector('parsererror')) {
            throw new Error('Error parsing RSS feed');
        }
        
        // Get all items (posts)
        const items = xmlDoc.querySelectorAll('item');
        
        if (items.length === 0) {
            throw new Error('No posts found in feed');
        }
        
        // Clear loading message
        substackContainer.innerHTML = '';
        
        // Display the first 3 posts
        const postsToShow = Math.min(3, items.length);
        
        for (let i = 0; i < postsToShow; i++) {
            const item = items[i];
            
            const title = item.querySelector('title')?.textContent || 'Untitled Post';
            const link = item.querySelector('link')?.textContent || `https://${substackUsername}.substack.com`;
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const description = item.querySelector('description')?.textContent || item.querySelector('content\\:encoded')?.textContent || '';
            
            // Extract featured image
            let imageUrl = '';
            
            // Try to get image from media:content or enclosure
            const mediaContent = item.querySelector('media\\:content, content');
            const enclosure = item.querySelector('enclosure[type^="image"]');
            
            if (mediaContent && mediaContent.getAttribute('url')) {
                imageUrl = mediaContent.getAttribute('url');
            } else if (enclosure && enclosure.getAttribute('url')) {
                imageUrl = enclosure.getAttribute('url');
            } else {
                // Try to extract first image from description/content
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = description;
                const firstImg = tempDiv.querySelector('img');
                if (firstImg && firstImg.src) {
                    imageUrl = firstImg.src;
                }
            }
            
            // Format date
            let formattedDate = 'Recent';
            if (pubDate) {
                try {
                    const date = new Date(pubDate);
                    if (!isNaN(date.getTime())) {
                        formattedDate = date.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                        });
                    }
                } catch (e) {
                    formattedDate = 'Recent';
                }
            }
            
            // Extract excerpt (remove HTML tags and limit length)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = description;
            let excerpt = tempDiv.textContent.trim();
            if (excerpt.length > 150) {
                excerpt = excerpt.slice(0, 150) + '...';
            }
            if (!excerpt) {
                excerpt = 'Click to read this article on Substack.';
            }
            
            // Create post card with image
            const postCard = document.createElement('div');
            postCard.className = 'writing-card';
            
            const imageHTML = imageUrl ? `
                <div class="writing-card-image">
                    <img src="${imageUrl}" alt="${title}" loading="lazy">
                </div>
            ` : '';
            
            postCard.innerHTML = `
                ${imageHTML}
                <div class="writing-card-content">
                    <h3>${title}</h3>
                    <div class="post-meta">
                        <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                    </div>
                    <p class="post-excerpt">${excerpt}</p>
                    <a href="${link}" target="_blank" rel="noopener noreferrer" class="read-more">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            
            postCard.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A' && e.target.tagName !== 'IMG') {
                    window.open(link, '_blank');
                }
            });
            
            substackContainer.appendChild(postCard);
        }
        
    } catch (error) {
        console.error('Error loading Substack posts:', error);
        
        // Fallback: Show message to visit Substack directly
        substackContainer.innerHTML = `
            <div class="writing-placeholder">
                <p><i class="fas fa-info-circle"></i> 
                Visit <a href="https://${substackUsername}.substack.com" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); font-weight: 600;">
                my Substack</a> to read my latest articles and posts.</p>
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
    
    // Load GitHub repositories
    loadGitHubProjects();
    
    // Load Substack posts
    loadSubstackPosts();
    
    // Initialize photo gallery lightbox
    initPhotoGallery();
    
    console.log('Portfolio website loaded successfully! 🚀');
});

// ==========================================
// Photo Gallery Lightbox
// ==========================================
function initPhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const photos = Array.from(photoItems);
    
    // Open lightbox when clicking a photo
    photoItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigate photos
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevPhoto();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextPhoto();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevPhoto();
        } else if (e.key === 'ArrowRight') {
            showNextPhoto();
        }
    });
    
    function openLightbox() {
        const img = photos[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrevPhoto() {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        const img = photos[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
    }
    
    function showNextPhoto() {
        currentIndex = (currentIndex + 1) % photos.length;
        const img = photos[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
    }
}

