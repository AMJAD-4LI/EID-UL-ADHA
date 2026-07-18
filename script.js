// Create Floating Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// Create Floating Lanterns
function createLanterns() {
    const lanternsContainer = document.getElementById('lanterns');
    const lanternCount = 10;
    const lanternEmojis = ['�', '✨', '⭐', '🕋', '☪️'];
    
    for (let i = 0; i < lanternCount; i++) {
        const lantern = document.createElement('div');
        lantern.className = 'lantern';
        lantern.textContent = lanternEmojis[Math.floor(Math.random() * lanternEmojis.length)];
        lantern.style.left = (Math.random() * 80 + 10) + '%';
        lantern.style.top = (Math.random() * 60) + '%';
        lantern.style.animationDuration = (Math.random() * 4 + 6) + 's';
        lantern.style.animationDelay = Math.random() * 5 + 's';
        lantern.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        lanternsContainer.appendChild(lantern);
    }
}

// Music Button Toggle
function setupMusicButton() {
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    musicBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        const musicText = musicBtn.querySelector('.music-text');
        
        if (isPlaying) {
            bgMusic.play();
            musicText.textContent = 'PLAYING';
            musicBtn.style.boxShadow = '0 6px 30px rgba(212, 175, 55, 0.6)';
            musicBtn.style.background = 'linear-gradient(135deg, #f5d76e 0%, #d4af37 50%, #f5d76e 100%)';
        } else {
            bgMusic.pause();
            musicText.textContent = 'MUSIC';
            musicBtn.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.3)';
            musicBtn.style.background = 'var(--gold-gradient)';
        }
    });
}

// Smooth Scroll for Navigation Links
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animation for Elements
function setupScrollAnimations() {
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
    
    const animatedElements = document.querySelectorAll('.message-card, .stats-card, .blessing-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Navbar Background on Scroll
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(2, 27, 22, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(2, 27, 22, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Parallax Effect for Glow Circles
function setupParallax() {
    const glowCircles = document.querySelectorAll('.glow-circle');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        glowCircles.forEach((circle, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            circle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Sacred Light Ray Animation Enhancement
function enhanceSacredLight() {
    const sacredLight = document.querySelector('.sacred-light-rays');
    if (sacredLight) {
        setInterval(() => {
            const intensity = Math.random() * 0.3 + 0.3;
            sacredLight.style.opacity = intensity;
        }, 3000);
    }
}

// Personalized Greeting Modal Functionality
function setupGreetingModal() {
    const modal = document.getElementById('greetingModal');
    const userNameInput = document.getElementById('userName');
    const continueBtn = document.getElementById('continueBtn');
    const skipBtn = document.getElementById('skipBtn');

    // Fixed sender name
    const fixedSenderName = 'Ali Melwana';

    // Always show modal first, regardless of saved name
    modal.classList.remove('hidden');

    // Check if user has already entered their name
    const savedUserName = localStorage.getItem('eidUserName');

    if (savedUserName) {
        userNameInput.value = savedUserName;
    }

    // Continue button handler
    continueBtn.addEventListener('click', () => {
        const userName = userNameInput.value.trim() || 'Guest';

        localStorage.setItem('eidUserName', userName);

        modal.classList.add('hidden');
        updatePersonalizedGreeting(userName, fixedSenderName);
    });

    // Skip button handler
    skipBtn.addEventListener('click', () => {
        localStorage.setItem('eidUserName', 'Guest');
        modal.classList.add('hidden');
        updatePersonalizedGreeting('Guest', fixedSenderName);
    });
}

// Update personalized greeting throughout the website
function updatePersonalizedGreeting(userName, senderName) {
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && userName !== 'Guest') {
        heroTitle.textContent = `EID UL ADHA MUBARAK, ${capitalizeName(userName)}`;
    }

    // Update message card
    const cardTitle = document.querySelector('.card-title');
    if (cardTitle && userName !== 'Guest') {
        cardTitle.textContent = `EID UL ADHA MUBARAK, ${capitalizeName(userName)}`;
    }

    // Update footer with sender info
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        if (senderName) {
            footerText.innerHTML = `Eid ul Adha Mubarak ${capitalizeName(userName)} - Warm wishes from <span class="sender-name">${senderName}</span>`;
        } else {
            footerText.textContent = `Eid ul Adha Mubarak ${capitalizeName(userName)} - May Allah Accept Your Sacrifices`;
        }
    }

    // Add personalized greeting section after hero
    addPersonalizedGreetingSection(userName, senderName);
    
    // Add sender signature section
    addSenderSignatureSection(senderName);
}

// Add personalized greeting section
function addPersonalizedGreetingSection(userName, senderName) {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    // Check if greeting section already exists
    if (document.querySelector('.personalized-greeting')) return;

    const greetingDiv = document.createElement('div');
    greetingDiv.className = 'personalized-greeting';
    
    const urduName = transliterateToUrdu(userName);
    const urduSender = senderName ? transliterateToUrdu(senderName) : '';
    
    let greetingHTML = `
        <p class="personalized-english">Eid ul Adha Mubarak, ${capitalizeName(userName)}</p>
        <p class="personalized-urdu">${urduName} کو عید الاضحی مبارک</p>
    `;

    if (senderName) {
        greetingHTML += `
            <p class="personalized-sender">Warm wishes from <span class="sender-name">${senderName}</span></p>
            <p class="personalized-sender-urdu">${urduSender} کی طرف سے دلی عید مبارک</p>
        `;
    }

    greetingDiv.innerHTML = greetingHTML;
    greetingDiv.style.animation = 'fade-up 1s ease-out';
    
    const heroContent = heroSection.querySelector('.hero-content');
    if (heroContent) {
        heroContent.insertBefore(greetingDiv, heroContent.querySelector('.cta-button'));
    }
}

// Simple name transliteration to Urdu (basic implementation)
function transliterateToUrdu(name) {
    const nameLower = name.toLowerCase().trim();
    
    // Common name transliterations
    const nameMap = {
        'ali': 'علی',
        'ali melwana': 'علی میلوانہ',
        'melwana': 'میلوانہ',
        'ahmad': 'احمد',
        'ahmed': 'احمد',
        'muhammad': 'محمد',
        'mohammad': 'محمد',
        'mohammed': 'محمد',
        'fatima': 'فاطمہ',
        'aisha': 'عائشہ',
        'khadija': 'خدیجہ',
        'zainab': 'زینب',
        'umar': 'عمر',
        'usman': 'عثمان',
        'abubakar': 'ابوبکر',
        'abubakr': 'ابوبکر',
        'hassan': 'حسن',
        'hussein': 'حسین',
        'hussain': 'حسین',
        'bilal': 'بلال',
        'khalid': 'خالد',
        'saad': 'سعد',
        'zaid': 'زید',
        'yusuf': 'یوسف',
        'yusuf': 'یوسف',
        'ibrahim': 'ابراہیم',
        'ibrahim': 'ابراہیم',
        'ismail': 'اسماعیل',
        'ismail': 'اسماعیل',
        'muslim': 'مسلم',
        'guest': 'مہمان',
        'amjad': 'امجد',
        'hassan': 'حسن',
        'hussain': 'حسین'
    };

    // Check if name exists in map
    if (nameMap[nameLower]) {
        return nameMap[nameLower];
    }

    // If not found, return original name (could be enhanced with better transliteration)
    return name;
}

// Capitalize first letter of name
function capitalizeName(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// Add sender signature section
function addSenderSignatureSection(senderName) {
    const messageSection = document.querySelector('.message-section');
    if (!messageSection) return;

    // Check if signature section already exists
    if (document.querySelector('.sender-signature')) return;

    const signatureDiv = document.createElement('div');
    signatureDiv.className = 'sender-signature';
    
    const urduSender = senderName ? transliterateToUrdu(senderName) : '';
    
    signatureDiv.innerHTML = `
        <p class="signature-text">Special Eid Greetings By <span class="sender-name">${senderName}</span></p>
        <p class="signature-urdu">${urduSender} کی طرف سے خصوصی عید مبارک</p>
    `;

    signatureDiv.style.animation = 'fade-up 1s ease-out 0.3s both';
    
    const messageCard = messageSection.querySelector('.message-card');
    if (messageCard) {
        messageCard.appendChild(signatureDiv);
    }
}

// Change Name functionality
function setupChangeNameButton() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const changeNameBtn = document.createElement('button');
    changeNameBtn.className = 'change-name-btn';
    changeNameBtn.innerHTML = '✎ Change Name';

    changeNameBtn.addEventListener('click', () => {
        localStorage.removeItem('eidUserName');
        localStorage.removeItem('eidSenderName');
        location.reload();
    });

    const navbarRight = navbar.querySelector('.navbar-right');
    if (navbarRight) {
        navbarRight.appendChild(changeNameBtn);
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createLanterns();
    setupMusicButton();
    setupSmoothScroll();
    setupScrollAnimations();
    setupNavbarScroll();
    setupParallax();
    enhanceSacredLight();
    setupGreetingModal();
    setupChangeNameButton();
});
