// Tab switching with GSAP
document.querySelectorAll(".tab-btn").forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.target;
        const activeSection = document.querySelector(".tab-content.active");

        if (activeSection && activeSection.id !== targetId) {
            // Animate out current section
            gsap.to(activeSection, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    activeSection.classList.remove("active");

                    const targetSection = document.getElementById(targetId);

                    // Make sure the new section is visible before animating
                    targetSection.classList.add("active");
                    gsap.set(targetSection, { display: "block", opacity: 1 });

                    // Reset all previous styles
                    gsap.set(targetSection.querySelectorAll("li, p"), { clearProps: "all" });

                    // Unique animations per section
                    if (targetId === "skills" || targetId === "projects") {
                        gsap.from(targetSection.querySelectorAll("li"), {
                            opacity: 0,
                            y: 20,
                            duration: 0.6,
                            ease: "bounce.out",
                            stagger: 0.1
                        });
                    } else {
                        gsap.from(targetSection, {
                            opacity: 0,
                            y: 20,
                            duration: 0.4
                        });
                    }
                }
            });
        }
    });
});

// Hero name & role spring pop
gsap.from("#name", { y: -50, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
gsap.from("#role", { y: 20, opacity: 0, duration: 1, delay: 0.3, ease: "power2.out" });


// Page load animation
window.addEventListener("DOMContentLoaded", () => {
    gsap.from("#resume-card", { opacity: 0, scale: 0.9, duration: 0.8, ease: "power2.out" });
    gsap.from(".tab-btn", { opacity: 0, y: -10, stagger: 0.08, delay: 0.5, duration: 0.4 });
    gsap.from(".tab-content.active p, .tab-content.active ul li", {
        opacity: 0,
        x: -20,
        stagger: 0.08,
        delay: 0.8,
        duration: 0.4
    });
});

// Simple particle animation
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
for (let i = 0; i < 50; i++) {
    particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();
