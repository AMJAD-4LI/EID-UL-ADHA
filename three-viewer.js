// 3D Text Viewer for Eid ul Adha - Three.js Implementation
let scene, camera, renderer, textMesh;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationVelocity = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let autoRotate = true;
let lastInteractionTime = Date.now();
let particles = [];
let userName = 'Guest';

// Initialize Three.js Scene
function initThreeJS() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x021b16);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        preserveDrawingBuffer: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xd4af37, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf5d76e, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xf4a460, 0.6, 100);
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);

    // Create 3D text
    create3DText();

    // Create festive particles
    createFestiveParticles();

    // Event listeners
    setupControls(canvas);
    setupButtons();

    // Handle resize
    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    animate();
}

// Create 3D text using canvas texture
function create3DText() {
    const text = `Eid Mubarak\n${userName}`;
    
    // Create canvas for text texture
    const textCanvas = document.createElement('canvas');
    const ctx = textCanvas.getContext('2d');
    textCanvas.width = 1024;
    textCanvas.height = 512;

    // Draw text on canvas
    ctx.fillStyle = '#021b16';
    ctx.fillRect(0, 0, textCanvas.width, textCanvas.height);

    // Add gradient background
    const gradient = ctx.createLinearGradient(0, 0, textCanvas.width, textCanvas.height);
    gradient.addColorStop(0, '#021b16');
    gradient.addColorStop(0.5, '#03241d');
    gradient.addColorStop(1, '#042e24');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, textCanvas.width, textCanvas.height);

    // Draw text
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 80px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add glow effect
    ctx.shadowColor = '#f5d76e';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw main text
    ctx.fillText('EID MUBARAK', textCanvas.width / 2, textCanvas.height / 2 - 40);
    
    // Draw user name
    ctx.font = 'bold 60px Cinzel, serif';
    ctx.fillText(userName, textCanvas.width / 2, textCanvas.height / 2 + 60);

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(textCanvas);
    texture.needsUpdate = true;

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(6, 3);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0xd4af37,
        emissiveIntensity: 0.1
    });

    textMesh = new THREE.Mesh(geometry, material);
    scene.add(textMesh);
}

// Create festive particles
function createFestiveParticles() {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        // Gold/amber colors
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
            colors[i * 3] = 0.83;     // R
            colors[i * 3 + 1] = 0.69; // G
            colors[i * 3 + 2] = 0.22; // B
        } else if (colorChoice < 0.66) {
            colors[i * 3] = 0.96;     // R
            colors[i * 3 + 1] = 0.84; // G
            colors[i * 3 + 2] = 0.38; // B
        } else {
            colors[i * 3] = 1.0;      // R
            colors[i * 3 + 1] = 0.84; // G
            colors[i * 3 + 2] = 0.43; // B
        }

        sizes[i] = Math.random() * 0.1 + 0.05;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    particles.push(particleSystem);
}

// Setup mouse/touch controls
function setupControls(canvas) {
    // Mouse events
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('wheel', onMouseWheel);

    // Touch events
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onTouchEnd);
}

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
    autoRotate = false;
    lastInteractionTime = Date.now();
}

function onMouseMove(event) {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    rotationVelocity.x = deltaY * 0.005;
    rotationVelocity.y = deltaX * 0.005;

    previousMousePosition = { x: event.clientX, y: event.clientY };
    lastInteractionTime = Date.now();
}

function onMouseUp() {
    isDragging = false;
    lastInteractionTime = Date.now();
}

function onMouseWheel(event) {
    event.preventDefault();
    camera.position.z += event.deltaY * 0.01;
    camera.position.z = Math.max(2, Math.min(10, camera.position.z));
    lastInteractionTime = Date.now();
}

function onTouchStart(event) {
    if (event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        autoRotate = false;
        lastInteractionTime = Date.now();
    }
}

function onTouchMove(event) {
    if (!isDragging || event.touches.length !== 1) return;
    event.preventDefault();

    const deltaX = event.touches[0].clientX - previousMousePosition.x;
    const deltaY = event.touches[0].clientY - previousMousePosition.y;

    rotationVelocity.x = deltaY * 0.005;
    rotationVelocity.y = deltaX * 0.005;

    previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    lastInteractionTime = Date.now();
}

function onTouchEnd() {
    isDragging = false;
    lastInteractionTime = Date.now();
}

// Setup button functionality
function setupButtons() {
    const closeBtn = document.getElementById('closeViewerBtn');
    const screenshotBtn = document.getElementById('screenshotBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeViewer);
    }

    if (screenshotBtn) {
        screenshotBtn.addEventListener('click', takeScreenshot);
    }

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', shareWhatsApp);
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Apply rotation with inertia
    rotationVelocity.x *= 0.95;
    rotationVelocity.y *= 0.95;

    targetRotation.x += rotationVelocity.x;
    targetRotation.y += rotationVelocity.y;

    // Auto-rotate when idle
    if (autoRotate || (Date.now() - lastInteractionTime > 3000)) {
        autoRotate = true;
        targetRotation.y += 0.005;
        targetRotation.x += 0.002;
    }

    // Smooth rotation
    if (textMesh) {
        textMesh.rotation.x += (targetRotation.x - textMesh.rotation.x) * 0.1;
        textMesh.rotation.y += (targetRotation.y - textMesh.rotation.y) * 0.1;
    }

    // Animate particles
    particles.forEach(particleSystem => {
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
    });

    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas || !camera || !renderer) return;

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

// Open viewer with user name
function openViewer(name) {
    userName = name || 'Guest';
    const modal = document.getElementById('viewerModal');
    
    if (modal) {
        modal.classList.add('active');
        
        // Initialize Three.js after modal is visible
        setTimeout(() => {
            initThreeJS();
        }, 100);
    }
}

// Close viewer
function closeViewer() {
    const modal = document.getElementById('viewerModal');
    if (modal) {
        modal.classList.remove('active');
        
        // Cleanup Three.js
        if (renderer) {
            renderer.dispose();
            renderer = null;
        }
    }
}

// Take screenshot
function takeScreenshot() {
    if (!renderer) return;

    renderer.render(scene, camera);
    const dataURL = renderer.domElement.toDataURL('image/png');

    // Create download link
    const link = document.createElement('a');
    link.download = `Eid-Mubarak-${userName}.png`;
    link.href = dataURL;
    link.click();
}

// Share on WhatsApp
function shareWhatsApp() {
    const message = `Eid ul Adha Mubarak ${userName}! 🌙✨\n\nWarm wishes from Ali Melwana\n\nhttps://eid-ul-adha.com`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Export functions for use in main script
window.Eid3DViewer = {
    open: openViewer,
    close: closeViewer
};

// Auto-open after greeting modal
document.addEventListener('DOMContentLoaded', () => {
    // Add button to personalized greeting section to open 3D viewer
    setTimeout(() => {
        add3DViewerButton();
    }, 2000);
});

function add3DViewerButton() {
    const greetingSection = document.querySelector('.personalized-greeting');
    if (!greetingSection) return;

    const viewerBtn = document.createElement('button');
    viewerBtn.className = 'viewer-trigger-btn';
    viewerBtn.innerHTML = '✨ View 3D Wish';
    viewerBtn.style.cssText = `
        margin-top: 1.5rem;
        padding: 1rem 2rem;
        background: linear-gradient(135deg, #d4af37 0%, #f5d76e 50%, #d4af37 100%);
        border: none;
        border-radius: 50px;
        font-family: 'Cinzel', serif;
        font-size: 1rem;
        font-weight: 600;
        color: #021b16;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 30px rgba(212, 175, 55, 0.4);
        letter-spacing: 2px;
    `;

    viewerBtn.addEventListener('mouseenter', () => {
        viewerBtn.style.transform = 'translateY(-2px) scale(1.02)';
        viewerBtn.style.boxShadow = '0 6px 40px rgba(212, 175, 55, 0.6)';
    });

    viewerBtn.addEventListener('mouseleave', () => {
        viewerBtn.style.transform = 'translateY(0) scale(1)';
        viewerBtn.style.boxShadow = '0 4px 30px rgba(212, 175, 55, 0.4)';
    });

    viewerBtn.addEventListener('click', () => {
        const savedUserName = localStorage.getItem('eidUserName') || 'Guest';
        window.Eid3DViewer.open(savedUserName);
    });

    greetingSection.appendChild(viewerBtn);
}
