/* ========================================
   THE GRAND PORTFOLIO VILLA
   Interactive JavaScript
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initDoorInteraction();
    initRoomCards();
    createStars();
});

/* ========================================
   PRELOADER
   ======================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const loadingFill = document.querySelector('.loading-bar-fill');
    
    // Simulate loading
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide preloader after loading
            setTimeout(() => {
                preloader.classList.add('hidden');
                // Add entrance animation
                document.querySelector('.villa-facade').style.animation = 'fadeInUp 1s ease-out';
                document.querySelector('.knock-prompt').style.animation = 'fadeInUp 1s ease-out 0.5s both';
            }, 500);
        }
        loadingFill.style.width = progress + '%';
    }, 200);
}

/* ========================================
   STARS ANIMATION
   ======================================== */
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    // Add more dynamic stars
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            background: ${Math.random() > 0.8 ? '#ffd700' : '#ffffff'};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.5};
            animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
            animation-delay: ${Math.random() * 2}s;
        `;
        starsContainer.appendChild(star);
    }
}

/* ========================================
   DOOR INTERACTION
   ======================================== */
function initDoorInteraction() {
    const doorFrame = document.getElementById('door-frame');
    const knockEffect = document.getElementById('knock-effect');
    const knockPrompt = document.getElementById('knock-prompt');
    
    if (!doorFrame) return;
    
    let isKnocking = false;
    
    doorFrame.addEventListener('click', (e) => {
        if (isKnocking) return;
        isKnocking = true;
        
        // Create knock sound effect (visual)
        createKnockEffect(e);
        
        // Show knock ripple effect
        knockEffect.classList.add('active');
        setTimeout(() => {
            knockEffect.classList.remove('active');
        }, 500);
        
        // Animate knock
        doorFrame.style.animation = 'doorShake 0.3s ease-in-out';
        setTimeout(() => {
            doorFrame.style.animation = '';
        }, 300);
        
        // Open door after delay
        setTimeout(() => {
            openDoor(doorFrame);
        }, 800);
    });
    
    // Add hover effect
    doorFrame.addEventListener('mouseenter', () => {
        if (!isKnocking) {
            knockPrompt.style.transform = 'translateX(-50%) scale(1.1)';
        }
    });
    
    doorFrame.addEventListener('mouseleave', () => {
        if (!isKnocking) {
            knockPrompt.style.transform = 'translateX(-50%) scale(1)';
        }
    });
}

function createKnockEffect(e) {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 50px;
        height: 50px;
        border: 2px solid rgba(201, 168, 76, 0.8);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(1);
        pointer-events: none;
        z-index: 10000;
        animation: knockWave 0.5s ease-out forwards;
    `;
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 500);
}

function openDoor(doorFrame) {
    // Hide knock prompt
    const knockPrompt = document.getElementById('knock-prompt');
    if (knockPrompt) {
        knockPrompt.style.opacity = '0';
        knockPrompt.style.transition = 'opacity 0.3s ease';
    }
    
    // Open the door
    doorFrame.classList.add('opening');
    
    // Create light effect from inside
    setTimeout(() => {
        const lightEffect = document.createElement('div');
        lightEffect.style.cssText = `
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse at bottom, rgba(255, 215, 0, 0.3), transparent 70%);
            z-index: 5;
            animation: lightBurst 1.5s ease-out forwards;
            pointer-events: none;
        `;
        doorFrame.appendChild(lightEffect);
    }, 300);
    
    // Transition to gallery
    setTimeout(() => {
        transitionToScene('entrance-scene', 'gallery-scene');
        initGalleryAnimation();
    }, 1500);
}

/* ========================================
   SCENE TRANSITIONS
   ======================================== */
function transitionToScene(fromSceneId, toSceneId) {
    const fromScene = document.getElementById(fromSceneId);
    const toScene = document.getElementById(toSceneId);
    
    if (!fromScene || !toScene) return;
    
    // Fade out current scene
    fromScene.style.opacity = '0';
    fromScene.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        fromScene.classList.remove('active');
        fromScene.style.opacity = '';
        fromScene.style.transition = '';
        
        // Show new scene
        toScene.classList.add('active');
        toScene.style.opacity = '0';
        
        // Force reflow
        toScene.offsetHeight;
        
        // Fade in new scene
        toScene.style.transition = 'opacity 0.8s ease';
        toScene.style.opacity = '1';
    }, 800);
}

/* ========================================
   GALLERY ANIMATIONS
   ======================================== */
function initGalleryAnimation() {
    const roomCards = document.querySelectorAll('.room-card');
    
    roomCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Animate chandelier
    const chandelier = document.querySelector('.chandelier');
    if (chandelier) {
        chandelier.style.animation = 'chandelierSwing 3s ease-in-out infinite';
    }
}

/* ========================================
   ROOM INTERACTIONS
   ======================================== */
function initRoomCards() {
    // Already handled by onclick in HTML
}

function openRoom(roomName) {
    const roomContent = document.getElementById('room-content');
    
    // Add door opening animation
    const card = document.querySelector(`[data-room="${roomName}"]`);
    if (card) {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }
    
    // Load room content based on name
    let content = '';
    
    switch(roomName) {
        case 'awards':
            content = getAwardsContent();
            break;
        case 'achievements':
            content = getAchievementsContent();
            break;
        case 'experience':
            content = getExperienceContent();
            break;
        case 'projects':
            content = getProjectsContent();
            break;
        case 'gallery':
            content = getGalleryContent();
            break;
        default:
            content = '<p>Room content not found</p>';
    }
    
    // Set content
    roomContent.innerHTML = content;
    
    // Transition to room scene
    setTimeout(() => {
        transitionToScene('gallery-scene', 'room-scene');
        initRoomAnimations();
    }, 300);
}

function initRoomAnimations() {
    // Animate content cards
    const cards = document.querySelectorAll('.content-card, .achievement-badge, .timeline-item, .project-card, .gallery-item');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}

/* ========================================
   NAVIGATION
   ======================================== */
function goBackToEntrance() {
    // Reset door state
    const doorFrame = document.getElementById('door-frame');
    const knockPrompt = document.getElementById('knock-prompt');
    
    if (doorFrame) {
        doorFrame.classList.remove('opening');
    }
    if (knockPrompt) {
        knockPrompt.style.opacity = '1';
    }
    
    transitionToScene('gallery-scene', 'entrance-scene');
}

function goBackToGallery() {
    transitionToScene('room-scene', 'gallery-scene');
}

/* ========================================
   ROOM CONTENT GENERATORS
   ======================================== */

function getAwardsContent() {
    return `
        <div class="room-header">
            <div class="room-header-icon">🏆</div>
            <h1>The Trophy Hall</h1>
            <p>A collection of prestigious awards and honors earned through dedication and excellence</p>
            <div class="divider"></div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Professional Awards</h2>
            
            <div class="content-card">
                <h3 class="card-title">Excellence in Innovation Award</h3>
                <p class="card-subtitle">National Technology Council</p>
                <p class="card-date">2024</p>
                <p class="card-description">Recognized for groundbreaking contributions to software architecture and innovative solutions that transformed industry standards. This award celebrates individuals who push the boundaries of technology.</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">Best Digital Experience Design</h3>
                <p class="card-subtitle">International Design Summit</p>
                <p class="card-date">2023</p>
                <p class="card-description">Awarded for creating an immersive user experience that seamlessly blended aesthetics with functionality, setting new benchmarks in interactive design.</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">Rising Star in Tech</h3>
                <p class="card-subtitle">Global Tech Awards</p>
                <p class="card-date">2022</p>
                <p class="card-description">Honored as an emerging leader in technology, demonstrating exceptional talent and potential for future impact in the digital landscape.</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">Open Source Contributor of the Year</h3>
                <p class="card-subtitle">Open Source Foundation</p>
                <p class="card-date">2021</p>
                <p class="card-description">Recognized for significant contributions to open source projects that benefited thousands of developers worldwide.</p>
            </div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Academic Honors</h2>
            
            <div class="content-card">
                <h3 class="card-title">Summa Cum Laude</h3>
                <p class="card-subtitle">University of Technology</p>
                <p class="card-date">2020</p>
                <p class="card-description">Graduated with highest honors in Computer Science, maintaining a perfect GPA while conducting advanced research in artificial intelligence.</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">Research Excellence Award</h3>
                <p class="card-subtitle">Graduate Research Council</p>
                <p class="card-date">2019</p>
                <p class="card-description">Awarded for outstanding thesis research on machine learning algorithms that improved prediction accuracy by 40%.</p>
            </div>
        </div>
    `;
}

function getAchievementsContent() {
    return `
        <div class="room-header">
            <div class="room-header-icon">⭐</div>
            <h1>The Star Chamber</h1>
            <p>Milestones and achievements that mark the journey of growth and excellence</p>
            <div class="divider"></div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Career Milestones</h2>
            
            <div class="achievement-grid">
                <div class="achievement-badge">
                    <div class="badge-icon">🚀</div>
                    <h3 class="badge-title">50+ Projects Delivered</h3>
                    <p class="badge-year">Across 8 years</p>
                </div>
                
                <div class="achievement-badge">
                    <div class="badge-icon">👥</div>
                    <h3 class="badge-title">Led 10+ Teams</h3>
                    <p class="badge-year">100+ team members</p>
                </div>
                
                <div class="achievement-badge">
                    <div class="badge-icon">📈</div>
                    <h3 class="badge-title">200% Revenue Growth</h3>
                    <p class="badge-year">Product line expansion</p>
                </div>
                
                <div class="achievement-badge">
                    <div class="badge-icon">🌐</div>
                    <h3 class="badge-title">Global Impact</h3>
                    <p class="badge-year">20+ countries reached</p>
                </div>
                
                <div class="achievement-badge">
                    <div class="badge-icon">📚</div>
                    <h3 class="badge-title">5 Publications</h3>
                    <p class="badge-year">Peer-reviewed journals</p>
                </div>
                
                <div class="achievement-badge">
                    <div class="badge-icon">🎤</div>
                    <h3 class="badge-title">20+ Speaking Events</h3>
                    <p class="badge-year">International conferences</p>
                </div>
            </div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Technical Achievements</h2>
            
            <div class="content-card">
                <h3 class="card-title">Platform Scalability Achievement</h3>
                <p class="card-date">2024</p>
                <p class="card-description">Architected a system capable of handling 1 million concurrent users with 99.99% uptime, reducing infrastructure costs by 60% while improving performance by 3x.</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">AI Integration Pioneer</h3>
                <p class="card-date">2023</p>
                <p class="card-description">Successfully integrated AI/ML capabilities into production systems, resulting in 45% improvement in user engagement and 30% reduction in manual processes.</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">Zero-Downtime Migration</h3>
                <p class="card-date">2022</p>
                <p class="card-description">Led the seamless migration of legacy systems to modern architecture with zero downtime, serving 500,000+ daily active users throughout the transition.</p>
            </div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Personal Milestones</h2>
            
            <div class="content-card">
                <h3 class="card-title">Mentorship Program Founder</h3>
                <p class="card-date">2021 - Present</p>
                <p class="card-description">Established a mentorship program that has guided 50+ junior developers, with 80% achieving senior positions within 2 years.</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">Community Building</h3>
                <p class="card-date">2020 - Present</p>
                <p class="card-description">Built and nurtured a tech community of 10,000+ members, hosting monthly meetups and workshops that fostered collaboration and learning.</p>
            </div>
        </div>
    `;
}

function getExperienceContent() {
    return `
        <div class="room-header">
            <div class="room-header-icon">📜</div>
            <h1>The Chronicle Room</h1>
            <p>A timeline of professional experience and the journey through the world of technology</p>
            <div class="divider"></div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Professional Journey</h2>
            
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-date">2022 - Present</div>
                    <h3 class="timeline-title">Senior Software Architect</h3>
                    <p class="timeline-company">TechVision Industries</p>
                    <p class="timeline-description">Leading the architectural design of enterprise-scale applications. Spearheading the adoption of microservices architecture, resulting in 40% improvement in deployment frequency and 60% reduction in system downtime.</p>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-date">2020 - 2022</div>
                    <h3 class="timeline-title">Full Stack Development Lead</h3>
                    <p class="timeline-company">Digital Dynamics Corp</p>
                    <p class="timeline-description">Managed a team of 12 developers building next-generation web applications. Introduced CI/CD pipelines and automated testing, reducing bug count by 70% and improving time-to-market by 50%.</p>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-date">2018 - 2020</div>
                    <h3 class="timeline-title">Software Engineer II</h3>
                    <p class="timeline-company">InnovateTech Solutions</p>
                    <p class="timeline-description">Developed and maintained critical backend services processing 1M+ transactions daily. Optimized database queries resulting in 3x performance improvement and implemented real-time analytics dashboard.</p>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-date">2016 - 2018</div>
                    <h3 class="timeline-title">Junior Developer</h3>
                    <p class="timeline-company">StartupHub Technologies</p>
                    <p class="timeline-description">Built responsive web applications and RESTful APIs. Contributed to the development of a SaaS platform that grew from 0 to 10,000 users in its first year.</p>
                </div>
            </div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Technical Skills</h2>
            
            <div class="content-card">
                <h3 class="card-title">Frontend Technologies</h3>
                <p class="card-description">React, Vue.js, Angular, TypeScript, Next.js, Nuxt.js, Tailwind CSS, SASS, Three.js, WebGL</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">Backend & Infrastructure</h3>
                <p class="card-description">Node.js, Python, Go, Java, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, GCP, Azure</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">Architecture & Patterns</h3>
                <p class="card-description">Microservices, Event-Driven Architecture, CQRS, Domain-Driven Design, Clean Architecture, REST, GraphQL</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">AI & Machine Learning</h3>
                <p class="card-description">TensorFlow, PyTorch, Natural Language Processing, Computer Vision, Recommendation Systems, LLM Integration</p>
            </div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Education</h2>
            
            <div class="content-card">
                <h3 class="card-title">Master of Science in Computer Science</h3>
                <p class="card-subtitle">University of Technology</p>
                <p class="card-date">2014 - 2016</p>
                <p class="card-description">Specialized in Artificial Intelligence and Distributed Systems. Thesis on "Scalable Machine Learning Pipelines for Real-time Data Processing."</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">Bachelor of Science in Software Engineering</h3>
                <p class="card-subtitle">National Institute of Technology</p>
                <p class="card-date">2010 - 2014</p>
                <p class="card-description">Graduated with honors. Active member of the coding club and hackathon champion.</p>
            </div>
        </div>
    `;
}

function getProjectsContent() {
    return `
        <div class="room-header">
            <div class="room-header-icon">🏗️</div>
            <h1>The Workshop</h1>
            <p>A showcase of innovative projects and technical creations</p>
            <div class="divider"></div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Featured Projects</h2>
            
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-image">🌐</div>
                    <div class="project-info">
                        <h3 class="project-title">E-Commerce Platform</h3>
                        <p class="project-tech">React, Node.js, MongoDB, Stripe</p>
                        <p class="project-description">Built a full-featured e-commerce platform handling 100K+ daily transactions with real-time inventory management, AI-powered recommendations, and seamless payment processing.</p>
                        <a href="#" class="project-link">View Project →</a>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-image">🤖</div>
                    <div class="project-info">
                        <h3 class="project-title">AI Chat Assistant</h3>
                        <p class="project-tech">Python, TensorFlow, FastAPI, React</p>
                        <p class="project-description">Developed an intelligent chat assistant using NLP and machine learning, capable of understanding context and providing accurate responses with 95% satisfaction rate.</p>
                        <a href="#" class="project-link">View Project →</a>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-image">📊</div>
                    <div class="project-info">
                        <h3 class="project-title">Real-time Analytics Dashboard</h3>
                        <p class="project-tech">Vue.js, D3.js, WebSocket, PostgreSQL</p>
                        <p class="project-description">Created a real-time analytics platform processing millions of data points daily, featuring interactive visualizations and customizable reporting tools.</p>
                        <a href="#" class="project-link">View Project →</a>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-image">🎮</div>
                    <div class="project-info">
                        <h3 class="project-title">3D Portfolio Experience</h3>
                        <p class="project-tech">Three.js, WebGL, GSAP, Blender</p>
                        <p class="project-description">Designed and developed an immersive 3D portfolio website with interactive environments, particle effects, and smooth camera transitions.</p>
                        <a href="#" class="project-link">View Project →</a>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-image">📱</div>
                    <div class="project-info">
                        <h3 class="project-title">Cross-Platform Mobile App</h3>
                        <p class="project-tech">React Native, Firebase, Redux</p>
                        <p class="project-description">Built a social networking app with 50K+ downloads, featuring real-time messaging, content sharing, and location-based services.</p>
                        <a href="#" class="project-link">View Project →</a>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-image">☁️</div>
                    <div class="project-info">
                        <h3 class="project-title">Cloud Infrastructure Manager</h3>
                        <p class="project-tech">Go, Terraform, AWS, Docker</p>
                        <p class="project-description">Developed a tool for managing cloud infrastructure with automated scaling, cost optimization, and disaster recovery capabilities.</p>
                        <a href="#" class="project-link">View Project →</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Open Source Contributions</h2>
            
            <div class="content-card">
                <h3 class="card-title">Component Library</h3>
                <p class="card-tech">2.5K+ GitHub Stars</p>
                <p class="card-description">Created and maintain a popular UI component library used by thousands of developers worldwide. Features 100+ accessible, customizable components.</p>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">CLI Tool</h3>
                <p class="card-tech">1K+ GitHub Stars</p>
                <p class="card-description">Built a developer productivity tool that automates common tasks, reducing development setup time by 80%.</p>
            </div>
        </div>
    `;
}

function getGalleryContent() {
    return `
        <div class="room-header">
            <div class="room-header-icon">🖼️</div>
            <h1>The Art Gallery</h1>
            <p>A visual showcase of designs, creations, and artistic endeavors</p>
            <div class="divider"></div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">UI/UX Designs</h2>
            
            <div class="gallery-grid">
                <div class="gallery-item">
                    <div class="gallery-placeholder">🎨</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Dashboard Redesign</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">📱</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Mobile App Design</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">🖥️</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">SaaS Platform UI</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">🎯</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Landing Page Design</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">🎪</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Event Website</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">💎</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Brand Identity</h4>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">3D & Motion Graphics</h2>
            
            <div class="gallery-grid">
                <div class="gallery-item">
                    <div class="gallery-placeholder">🎬</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Product Animation</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">🌍</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">3D Environment</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">✨</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Particle Effects</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">🎭</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Character Design</h4>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Photography</h2>
            
            <div class="gallery-grid">
                <div class="gallery-item">
                    <div class="gallery-placeholder">📷</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Urban Architecture</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">🌅</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Nature & Landscapes</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">🌃</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Street Photography</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">🎭</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Portrait Photography</h4>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="room-section">
            <h2 class="section-title">Illustrations</h2>
            
            <div class="gallery-grid">
                <div class="gallery-item">
                    <div class="gallery-placeholder">✏️</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Digital Art</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">🖌️</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Concept Art</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">📐</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Technical Illustrations</h4>
                    </div>
                </div>
                
                <div class="gallery-item">
                    <div class="gallery-placeholder">🎨</div>
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">Icon Sets</h4>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scroll for room content
function smoothScrollTo(element, duration = 500) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Add CSS animation for door shake
const style = document.createElement('style');
style.textContent = `
    @keyframes doorShake {
        0%, 100% { transform: translateX(-50%) rotate(0deg); }
        25% { transform: translateX(-50%) rotate(-2deg); }
        50% { transform: translateX(-50%) rotate(2deg); }
        75% { transform: translateX(-50%) rotate(-1deg); }
    }
    
    @keyframes lightBurst {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
    }
    
    @keyframes chandelierSwing {
        0%, 100% { transform: rotate(-1deg); }
        50% { transform: rotate(1deg); }
    }
`;
document.head.appendChild(style);
