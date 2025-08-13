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
