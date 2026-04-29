// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

// Lenis requestAnimationFrame loop
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
gsap.from('.badge', {
    y: -20,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from('.hero-title', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out"
});

gsap.from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power3.out"
});

// Animate Section Headers on Scroll
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Terminal Cards Slow Reveal Effect (Typewriter / Stagger)
gsap.utils.toArray('.terminal-card').forEach(card => {
    
    // First reveal the card itself
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Then sequentially reveal the lines inside like a terminal
    const lines = card.querySelectorAll('.line, .code-block, .status-badge, .divider');
    const listItems = card.querySelectorAll('.check-list li');
    const decisionBox = card.querySelector('.decision-box');

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: card,
            start: "top 75%",
        }
    });

    if(lines.length > 0) {
        tl.from(lines, {
            opacity: 0,
            x: -10,
            duration: 0.4,
            stagger: 0.3,
            ease: "power2.out"
        });
    }

    if(listItems.length > 0) {
        tl.to(listItems, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.4, // Slow reveal for checks
            ease: "power2.out"
        }, "+=0.2");
    }

    if(decisionBox) {
        tl.to(decisionBox, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
        }, "+=0.5");
    }
});

// CTA Section
gsap.from('.cta-section h2, .cta-section p, .code-copy', {
    scrollTrigger: {
        trigger: '.cta-section',
        start: "top 95%", // Trigger earlier
    },
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

gsap.from('.resource-card', {
    scrollTrigger: {
        trigger: '.resources-grid',
        start: "top 100%", // Trigger as soon as it enters the viewport
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

// Copy to clipboard interaction
const codeCopy = document.querySelector('.code-copy');
if (codeCopy) {
    codeCopy.addEventListener('click', () => {
        const codeText = codeCopy.innerText;
        navigator.clipboard.writeText(codeText);
        
        const originalHtml = codeCopy.innerHTML;
        codeCopy.innerHTML = `<code style="color: var(--color-green)">Copied!</code>`;
        
        setTimeout(() => {
            codeCopy.innerHTML = originalHtml;
        }, 2000);
    });
}

// Click Spark Animation (from ReactBits concept)
document.addEventListener('click', (e) => {
    // Number of sparks per click
    const numSparks = 10;
    const colors = ['#06b6d4', '#d946ef', '#eab308', '#10b981'];
    
    for (let i = 0; i < numSparks; i++) {
        const spark = document.createElement('div');
        spark.classList.add('spark');
        document.body.appendChild(spark);
        
        // Set initial position to the click coordinates
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        
        // Apply random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        spark.style.backgroundColor = color;
        spark.style.boxShadow = `0 0 10px ${color}`;
        
        // Calculate random explosion trajectory
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 60;
        
        const destX = Math.cos(angle) * distance;
        const destY = Math.sin(angle) * distance;
        
        // Animate spark flying outwards and fading
        gsap.to(spark, {
            x: destX,
            y: destY,
            scale: 0,
            opacity: 0,
            duration: 0.6 + Math.random() * 0.4,
            ease: "power3.out",
            onComplete: () => {
                spark.remove(); // Clean up DOM
            }
        });
    }
});
