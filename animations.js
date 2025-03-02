// Animation JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Create floating background shapes
    CreateFloatingShapes();
    
    // Create particle effects
    CreateParticles();
    
    // Initialize GSAP animations
    InitializeGSAP();
    
    // Add hover effects for buttons
    SetupButtonEffects();
    
    // Setup custom cursor
    SetupCustomCursor();
    
    // Setup page transitions
    SetupPageTransitions();
    
    // Setup theme toggle
    SetupThemeToggle();
});

function CreateFloatingShapes() {
    const background = document.querySelector('.animated-background');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.classList.add('floating-shape');
        
        // Random properties
        const size = Math.random() * 300 + 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set styles
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.backgroundColor = color;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        
        // Different animation duration and delay for each shape
        shape.style.animationDuration = `${15 + Math.random() * 15}s`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        
        background.appendChild(shape);
    }
}

function CreateParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const initialX = Math.random() * window.innerWidth;
        const initialY = Math.random() * window.innerHeight;
        
        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${initialX}px`;
        particle.style.top = `${initialY}px`;
        
        // Different animation duration and delay for each particle
        particle.style.animationDuration = `${10 + Math.random() * 20}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

function InitializeGSAP() {
    // Removed title animations
    
    // Animate buttons with a more prominent entrance
    gsap.from('.home-button', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'back.out(1.7)'
    });
    
    // Add a subtle scale animation to the button wrapper
    gsap.from('.button-wrapper', {
        scale: 0.95,
        opacity: 0.8,
        duration: 1.5,
        ease: 'elastic.out(1, 0.3)'
    });
}

function SetupButtonEffects() {
    const buttons = document.querySelectorAll('.home-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button.querySelector('.button-icon'), {
                rotation: 5,
                scale: 1.2,
                duration: 0.3
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button.querySelector('.button-icon'), {
                rotation: 0,
                scale: 1,
                duration: 0.3
            });
        });
    });
}

function SetupCustomCursor() {
    // Check if device is likely to be mobile/tablet
    if (window.innerWidth > 768) {
        // Create cursor elements
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        
        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('cursor-outline');
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
        
        // Add custom-cursor class to body
        document.body.classList.add('custom-cursor');
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            // Update cursor position with smooth animation using GSAP
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            
            gsap.to(cursorOutline, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .home-button, [onclick]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
        
        // Handle cursor visibility when leaving/entering window
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
    }
}

function SetupPageTransitions() {
    // Create transition element
    const transitionElement = document.createElement('div');
    transitionElement.classList.add('page-transition');
    document.body.appendChild(transitionElement);
    
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('[onclick*="window.location"]');
    
    navButtons.forEach(button => {
        // Override the onclick attribute
        const originalOnClick = button.getAttribute('onclick');
        const url = originalOnClick.split("'")[1] || originalOnClick.split('"')[1];
        
        button.removeAttribute('onclick');
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Trigger transition animation
            transitionElement.classList.add('active');
            
            // Navigate to the new page after animation completes
            setTimeout(() => {
                window.location.href = url;
            }, 500); // Half the animation duration
        });
    });
}

function SetupThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
        themeSwitch.checked = savedTheme === 'dark-theme';
    }
    
    // Theme toggle event listener
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
            
            // Animate transition to dark theme
            gsap.to('.floating-shape', {
                opacity: 0.1,
                duration: 1,
                stagger: 0.1
            });
        } else {
            document.body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
            
            // Animate transition to light theme
            gsap.to('.floating-shape', {
                opacity: 0.05,
                duration: 1,
                stagger: 0.1
            });
        }
        
        // Add a flash effect to the theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        gsap.fromTo(themeToggle, 
            { boxShadow: '0 0 20px rgba(52, 152, 219, 0.8)' },
            { boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', duration: 1 }
        );
    });
    
    // Add hover animation to theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('mouseenter', () => {
        gsap.to(themeToggle, {
            y: -3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    themeToggle.addEventListener('mouseleave', () => {
        gsap.to(themeToggle, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}

// Add a function to create a subtle parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    // Apply subtle parallax to buttons
    gsap.to('.home-button', {
        x: mouseX * 20,
        y: mouseY * 20,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Apply subtle parallax to background shapes
    gsap.to('.floating-shape', {
        x: mouseX * 40,
        y: mouseY * 40,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.1
    });
}); 