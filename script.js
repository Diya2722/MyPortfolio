/* ─── script.js ─────────────────────────────────────────
   Portfolio — Interactive Script
   Features:
     1. Dark / Light theme toggle (persisted in localStorage)
     2. Header shrink on scroll
     3. Mobile nav toggle
     4. Scroll reveal (IntersectionObserver)
     5. Active nav link highlighting
     6. Hero typing animation (role words)
     7. Terminal code typewriter (tag-safe)
     8. Skill filter tabs
     9. Lightbox (certs + experience logo)
    10. Resume viewer modal
    11. Contact form simulation
    12. Back-to-top visibility
    13. Cursor glow tracking
──────────────────────────────────────────────────────── */

(function () {
    "use strict";

    /* ══════════════════════════════════════════════════
       1. THEME TOGGLE
    ══════════════════════════════════════════════════ */
    const html = document.documentElement;
    const themeToggle = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("dp-theme") || "dark";
    applyTheme(savedTheme);

    function applyTheme(theme) {
        html.setAttribute("data-theme", theme);
        // Tailwind dark class on body
        document.body.classList.toggle("dark", theme === "dark");
        document.body.classList.toggle("light", theme === "light");
        localStorage.setItem("dp-theme", theme);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = html.getAttribute("data-theme");
            applyTheme(current === "dark" ? "light" : "dark");
        });
    }

    /* ══════════════════════════════════════════════════
       2. HEADER SHRINK
    ══════════════════════════════════════════════════ */
    const header = document.getElementById("header");
    function handleHeaderScroll() {
        header.classList.toggle("scrolled", window.scrollY > 60);
    }
    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    /* ══════════════════════════════════════════════════
       3. MOBILE NAV TOGGLE
    ══════════════════════════════════════════════════ */
    const mobileToggle = document.getElementById("mobile-nav-toggle");
    const navbar = document.getElementById("navbar");
    const hamburgerIcon = document.getElementById("hamburger-icon");

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("open");
            mobileToggle.setAttribute("aria-expanded", isOpen);
            hamburgerIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        });

        // Close on nav link click
        navbar.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("open");
                hamburgerIcon.className = "fa-solid fa-bars";
                mobileToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ══════════════════════════════════════════════════
       4. SCROLL REVEAL (IntersectionObserver)
    ══════════════════════════════════════════════════ */
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObs = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        revealEls.forEach(el => revealObs.observe(el));
    } else {
        // Fallback for old browsers
        revealEls.forEach(el => el.classList.add("visible"));
    }

    /* ══════════════════════════════════════════════════
       5. ACTIVE NAV LINK ON SCROLL
    ══════════════════════════════════════════════════ */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        let current = "";
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
        });
        navLinks.forEach(link => {
            const href = link.getAttribute("href").replace("#", "");
            link.classList.toggle("active", href === current);
        });
    }
    window.addEventListener("scroll", updateActiveLink, { passive: true });

    /* ══════════════════════════════════════════════════
       6. HERO TYPING ANIMATION (words loop)
    ══════════════════════════════════════════════════ */
    const typedEl = document.getElementById("hero-typed");
    const roles = [
        "enterprise Java apps",
        "Spring Boot backends",
        "React-powered UIs",
        "end-to-end web solutions",
        "RESTful API systems",
    ];
    let roleIdx = 0, charIdx = 0, deleting = false;

    function typeRole() {
        const current = roles[roleIdx];
        if (!deleting) {
            typedEl.textContent = current.slice(0, ++charIdx);
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(typeRole, 1800);
                return;
            }
        } else {
            typedEl.textContent = current.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
            }
        }
        setTimeout(typeRole, deleting ? 45 : 70);
    }
    setTimeout(typeRole, 1000);

    /* ══════════════════════════════════════════════════
       7. TERMINAL TYPEWRITER (HTML-tag-safe)
    ══════════════════════════════════════════════════ */
    const terminalPre = document.getElementById("terminal-code");

    const termHTML =
        `<span class="tc">// 🚀 Developer Profile — Recruiter Configuration</span>
<span class="tk">const</span> developer <span class="tb">=</span> <span class="tb">{</span>
  name:      <span class="ts">"Diya Prajapati"</span>,
  role:      <span class="ts">"Java Full Stack & Web Developer"</span>,
  degree:    <span class="ts">"B.Sc. Information Technology"</span>,
  location:  <span class="ts">"Ahmedabad, Gujarat 🇮🇳"</span>,

  stack: <span class="tb">[</span>
    <span class="ts">"Java"</span>, <span class="ts">"Spring Boot"</span>, <span class="ts">"Hibernate/JPA"</span>,
    <span class="ts">"Microservices architecture"</span>,<span class="ts">"OOP"</span>, <span class="ts">"DSA"</span>
    <span class="ts">"React.js"</span>, <span class="ts">"Postman"</span>, <span class="ts">"MySQL"</span>, <span class="ts">"SDLC"</span>
  <span class="tb">]</span>,

  experience: <span class="tb">{</span>
    shadowFox:  <span class="ts">"Web Dev Intern"</span>,
    codeAlpha:  <span class="ts">"Java Intern"</span>
  <span class="tb">}</span>,

  readyToJoin:   <span class="tn">true</span>,
  openToReloc:   <span class="tn">true</span>,
  status:        <span class="ts">"Available — Hire Me!"</span>
<span class="tb">}</span>;

console.<span class="tp">log</span><span class="tb">(</span>developer.status<span class="tb">)</span>;
<span class="tc">// ✅ Output: "Available — Hire Me!"</span>`;

    function safeTypeWriter(el, html, speed, cb) {
        let idx = 0, display = "";

        function step() {
            if (idx >= html.length) {
                // Final render — add blinking cursor
                el.innerHTML = html + '<span class="terminal-cursor-caret"></span>';
                if (cb) cb();
                return;
            }
            if (html[idx] === "<") {
                // Skip entire HTML tag in one frame
                const end = html.indexOf(">", idx);
                if (end !== -1) {
                    display += html.substring(idx, end + 1);
                    idx = end + 1;
                    el.innerHTML = display + '<span class="terminal-cursor-caret"></span>';
                    requestAnimationFrame(step);
                    return;
                }
            }
            // Handle HTML entities as atomic units
            if (html[idx] === "&") {
                const semi = html.indexOf(";", idx);
                if (semi !== -1 && semi - idx <= 8) {
                    display += html.substring(idx, semi + 1);
                    idx = semi + 1;
                    el.innerHTML = display + '<span class="terminal-cursor-caret"></span>';
                    setTimeout(step, speed);
                    return;
                }
            }
            display += html[idx++];
            el.innerHTML = display + '<span class="terminal-cursor-caret"></span>';
            setTimeout(step, speed);
        }
        step();
    }

    if (terminalPre) {
        setTimeout(() => safeTypeWriter(terminalPre, termHTML, 9), 1400);
    }

    /* ══════════════════════════════════════════════════
       8. SKILL FILTER TABS
    ══════════════════════════════════════════════════ */
    const tabBtns = document.querySelectorAll(".stab");
    const skillCards = document.querySelectorAll(".skill-card");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            skillCards.forEach(card => {
                const cats = card.getAttribute("data-cat") || "";
                if (filter === "all" || cats.split(" ").includes(filter)) {
                    card.classList.remove("hidden");
                    card.style.animation = "fadeUp .4s ease both";
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    /* ══════════════════════════════════════════════════
       9. LIGHTBOX (certificates + logos)
    ══════════════════════════════════════════════════ */
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-img");
    const lbCaption = document.getElementById("lightbox-caption");
    const lbClose = document.getElementById("lightbox-close");
    const backdrop = document.getElementById("modal-backdrop");

    function openLightbox(src, alt) {
        lbImg.src = src;
        lbImg.alt = alt || "";
        lbCaption.textContent = alt || "";
        lightbox.removeAttribute("hidden");
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.setAttribute("hidden", "");
        // Only remove backdrop if resume modal is also hidden
        if (resumeModal.hasAttribute("hidden")) {
            backdrop.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    document.querySelectorAll(".img-trigger").forEach(img => {
        // If inside a cert-img-wrap, attach click to the wrapper so overlay doesn't block it
        const wrap = img.closest(".cert-img-wrap");
        const target = wrap || img;
        target.addEventListener("click", () => openLightbox(img.src, img.alt));
        target.style.cursor = "zoom-in";
    });

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lightbox) lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

    /* ══════════════════════════════════════════════════
       10. RESUME VIEWER MODAL
    ══════════════════════════════════════════════════ */
    const resumeModal = document.getElementById("resume-modal");
    const resumeClose = document.getElementById("resume-close");
    const resumeIframe = document.getElementById("resume-iframe");

    // All "view resume" triggers
    const resumeTriggers = [
        document.getElementById("view-resume-btn"),
        document.getElementById("view-resume-about"),
        document.getElementById("view-resume-contact"),
    ].filter(Boolean);

    function openResumeModal() {
        resumeModal.removeAttribute("hidden");
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
        // Ensure iframe loads (set src if not already set)
        if (!resumeIframe.src || resumeIframe.src === "about:blank") {
            resumeIframe.src = "Resume/Diya_Prajapati_Resume.pdf";
        }
    }

    function closeResumeModal() {
        resumeModal.setAttribute("hidden", "");
        if (lightbox.hasAttribute("hidden")) {
            backdrop.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    resumeTriggers.forEach(btn => btn.addEventListener("click", openResumeModal));
    if (resumeClose) resumeClose.addEventListener("click", closeResumeModal);

    // Backdrop click closes whichever modal is open
    if (backdrop) {
        backdrop.addEventListener("click", () => {
            closeLightbox();
            closeResumeModal();
        });
    }

    // ESC key
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeLightbox();
            closeResumeModal();
        }
    });

    /* ══════════════════════════════════════════════════
       11. CONTACT FORM
    ══════════════════════════════════════════════════ */
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
    const btnText = document.getElementById("btn-text");
    const btnIcon = document.getElementById("btn-icon");

    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            const name = document.getElementById("c-name").value.trim();
            if (!name) return;

            // Loading state
            submitBtn.disabled = true;
            btnText.textContent = "Sending…";
            btnIcon.className = "fa-solid fa-spinner fa-spin";
            formStatus.style.display = "none";

            fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { "Accept": "application/json" }
            })
                .then(response => {
                    if (response.ok) {
                        formStatus.className = "form-status success";
                        formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i>&nbsp; Thank you, <strong>${escapeHtml(name)}</strong>! Your message was sent. I'll get back to you soon.`;
                        formStatus.style.display = "block";
                        contactForm.reset();
                        setTimeout(() => { formStatus.style.display = "none"; }, 7000);
                    } else {
                        formStatus.className = "form-status error";
                        formStatus.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>&nbsp; Something went wrong. Please try again.`;
                        formStatus.style.display = "block";
                    }
                })
                .catch(() => {
                    formStatus.className = "form-status error";
                    formStatus.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>&nbsp; Network error. Please try again.`;
                    formStatus.style.display = "block";
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    btnText.textContent = "Send Message";
                    btnIcon.className = "fa-solid fa-paper-plane";
                });
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    /* ══════════════════════════════════════════════════
       12. BACK-TO-TOP VISIBILITY
    ══════════════════════════════════════════════════ */
    const btt = document.getElementById("back-to-top");
    if (btt) {
        window.addEventListener("scroll", () => {
            btt.classList.toggle("visible", window.scrollY > 500);
        }, { passive: true });
    }

    /* ══════════════════════════════════════════════════
       13. CURSOR GLOW TRACKING
    ══════════════════════════════════════════════════ */
    const cursorGlow = document.getElementById("cursor-glow");
    if (cursorGlow) {
        let rAF = null;
        document.addEventListener("mousemove", e => {
            if (rAF) return;
            rAF = requestAnimationFrame(() => {
                cursorGlow.style.left = e.clientX + "px";
                cursorGlow.style.top = e.clientY + "px";
                rAF = null;
            });
        });
    }

})();
