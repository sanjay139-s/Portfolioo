/**
 * ==========================================================
 * SANJAY SHEKAR - THE ULTIMATE COLLECTIONS CERTIFICATIONS
 * Pinterest Curved Fan Showcase & Spread Grid Dynamic Motion
 * ==========================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------
  // 1. EMBEDDED VERIFIED CATALOG DATA
  // --------------------------------------------------------
  const FALLBACK_DATA = [
    {
      id: "oracle-database-23ai",
      title: "Applied Database Systems 23ai",
      issuer: "Oracle Academy",
      issuerSlug: "oracle",
      issuerLogo: "assets/icons/oracle.svg",
      issuerInitials: "OA",
      badgeColor: "#F80000",
      category: "Database Architecture & AI",
      issueDate: "December 17, 2025",
      credentialId: "NCET-OA-23AI",
      image: "assets/certifications/oracle-applied-database-systems-23ai.jpeg",
      learnedPoints: [
        "Mastered enterprise relational database modeling and strict 3NF normalization schemas.",
        "Engineered high-performance SQL queries, composite B-tree indices, and transaction integrity.",
        "Implemented AI Vector Search capabilities natively integrated in Oracle Database 23ai.",
        "Architected multi-table constraints, declarative foreign keys, and stored procedures."
      ]
    },
    {
      id: "udemy-ai-chatgpt",
      title: "Introduction to AI and ChatGPT",
      issuer: "Udemy",
      issuerSlug: "udemy",
      issuerLogo: "assets/icons/udemy.svg",
      issuerInitials: "UD",
      badgeColor: "#A435F0",
      category: "Generative AI & LLMs",
      issueDate: "November 20, 2025",
      credentialId: "UC-0d17f889",
      image: "assets/certifications/udemy-intro-ai-chatgpt.png",
      learnedPoints: [
        "Foundational theory of Large Language Models (LLMs), attention mechanisms, and transformers.",
        "Advanced prompt engineering strategies for structured reasoning and automated workflows.",
        "Integration of generative AI tools into production software engineering lifecycles.",
        "Context window management, tokenization optimizations, and prompt safety hygiene."
      ]
    },
    {
      id: "cisco-python-essentials",
      title: "Python Essentials 1",
      issuer: "Cisco Networking Academy",
      issuerSlug: "cisco",
      issuerLogo: "assets/icons/cisco.svg",
      issuerInitials: "CA",
      badgeColor: "#049FD9",
      category: "Programming & Scripting",
      issueDate: "August 15, 2025",
      credentialId: "CISCO-NETACAD-PY1",
      image: "assets/certifications/cisco-python-essentials-1.png",
      learnedPoints: [
        "Core Python language mechanics, primitive types, control flow, and logical evaluations.",
        "Functional modular programming using packages, built-in libraries, and custom modules.",
        "Data processing pipelines leveraging tuples, dictionaries, and list comprehensions.",
        "Granular exception handling, error propagation, and secure input validation."
      ]
    },
    {
      id: "redhat-python-ad141",
      title: "Python Programming with Red Hat (AD141)",
      issuer: "Red Hat Academy",
      issuerSlug: "redhat",
      issuerLogo: "assets/icons/redhat.svg",
      issuerInitials: "RH",
      badgeColor: "#EE0000",
      category: "Enterprise Systems & Automation",
      issueDate: "August 12, 2025",
      credentialId: "RHA-AD141-V9",
      image: "assets/certifications/redhat-python-programming-ad141.png",
      learnedPoints: [
        "Developed automated system administration scripts for Red Hat Enterprise Linux (RHEL).",
        "Utilized file system I/O, regex text transformation, and POSIX process controls.",
        "Applied object-oriented programming (OOP) paradigms for maintainable system tooling.",
        "Managed enterprise Python packages, virtual environments, and CLI utilities."
      ]
    },
    {
      id: "redhat-java-ee",
      title: "Application Development I: Programming in Java EE",
      issuer: "Red Hat Academy",
      issuerSlug: "redhat",
      issuerLogo: "assets/icons/redhat.svg",
      issuerInitials: "RH",
      badgeColor: "#EE0000",
      category: "Enterprise Java Systems",
      issueDate: "April 20, 2026",
      credentialId: "RHA-JB183-JEE",
      image: "assets/certifications/redhat-java-ee-development.png",
      learnedPoints: [
        "Architected multi-tier enterprise web backends using Java EE platform specifications.",
        "Implemented transactional data services with JPA (Java Persistence API) and JDBC.",
        "Applied enterprise OOP patterns, dependency injection, and clean separation of concerns.",
        "Engineered robust RESTful web endpoints and containerized server deployments."
      ]
    },
    {
      id: "leetcode-200-days",
      title: "200 Days Badge 2026",
      issuer: "LeetCode",
      issuerSlug: "leetcode",
      issuerLogo: "assets/icons/leetcode.svg",
      issuerInitials: "LC",
      badgeColor: "#FFA116",
      category: "Algorithmic Rigor",
      issueDate: "August 31, 2026",
      credentialId: "LEETCODE-200D-2026",
      image: "assets/certifications/leetcode-200-days-badge.png",
      learnedPoints: [
        "Demonstrated rigorous daily algorithmic practice with 200+ solved challenge days.",
        "Mastered optimal implementations for Dynamic Programming, Graph Traversals, and BSTs.",
        "Achieved sub-millisecond execution times and optimal O(1) auxiliary space allocations.",
        "Refactored complex computational patterns into optimal two-pointer and sliding-window logic."
      ]
    },
    {
      id: "leetcode-100-days",
      title: "100 Days Badge 2026",
      issuer: "LeetCode",
      issuerSlug: "leetcode",
      issuerLogo: "assets/icons/leetcode.svg",
      issuerInitials: "LC",
      badgeColor: "#FFA116",
      category: "Algorithmic Rigor",
      issueDate: "May 21, 2026",
      credentialId: "LEETCODE-100D-2026",
      image: "assets/certifications/leetcode-100-days-badge.png",
      learnedPoints: [
        "Built consistent algorithmic muscle memory solving competitive coding problems daily.",
        "Deepened expertise in Arrays, Hash Maps, Linked Lists, Stack, and Recursion.",
        "Engineered exact boundary and edge-case handling for binary search on ranges.",
        "Developed high-velocity problem pattern recognition under strict time constraints."
      ]
    }
  ];

  // --------------------------------------------------------
  // 2. STATE & DOM REFERENCES
  // --------------------------------------------------------
  let certifications = [];
  let currentMode = 'arc'; // 'arc' | 'grid'
  let isAnimating = false;

  const certCardsTrack = document.getElementById('certCardsTrack');
  const toggleLayoutBtn = document.getElementById('toggleLayoutBtn');
  const toggleBtnText = document.getElementById('toggleBtnText');
  const exploreDeckBtn = document.getElementById('exploreDeckBtn');
  const stackBackBtn = document.getElementById('stackBackBtn');
  const viewIndicator = document.getElementById('viewIndicator');
  const indicatorText = document.getElementById('indicatorText');
  const heroSuperTitle = document.getElementById('heroSuperTitle');
  const heroMainTitle = document.getElementById('heroMainTitle');
  const gridStatsChip = document.getElementById('gridStatsChip');
  const frameCounter = document.getElementById('frameCounter');

  // Lightbox elements
  const certLightbox = document.getElementById('certLightbox');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxIssuer = document.getElementById('lightboxIssuer');
  const lightboxIssuerBadge = document.getElementById('lightboxIssuerBadge');
  const lightboxDate = document.getElementById('lightboxDate');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxCredentialId = document.getElementById('lightboxCredentialId');
  const lightboxOpenLink = document.getElementById('lightboxOpenLink');

  // --------------------------------------------------------
  // 3. CURVED ARC FAN CALCULATOR (EXACT PINTEREST MATCH)
  // --------------------------------------------------------
  function getArcOffsets(index, total) {
    const center = (total - 1) / 2;
    const diff = index - center;

    // Responsive horizontal spacing
    const w = window.innerWidth;
    const stepX = w < 768 ? 38 : (w < 1024 ? 64 : 88);

    const x = diff * stepX;
    // Convex parabolic curvature: center card at top, outer cards curve downward
    const y = Math.pow(Math.abs(diff), 1.7) * (w < 768 ? 4.5 : 6.8);
    // Angular fanning
    const rot = diff * (w < 768 ? 3.6 : 4.0);
    // z-index: center card highest
    const z = 10 - Math.abs(Math.round(diff));

    return { x, y, rot, z };
  }

  function applyArcLayout() {
    const cards = document.querySelectorAll('.cert-card');
    cards.forEach((card, idx) => {
      const { x, y, rot, z } = getArcOffsets(idx, cards.length);
      card.style.setProperty('--arc-x', `${x.toFixed(1)}px`);
      card.style.setProperty('--arc-y', `${y.toFixed(1)}px`);
      card.style.setProperty('--arc-rot', `${rot.toFixed(1)}deg`);
      card.style.setProperty('--arc-z', `${z}`);
    });
  }

  // --------------------------------------------------------
  // 4. INITIALIZATION & RENDERING
  // --------------------------------------------------------
  async function init() {
    if (window.gsap && window.Flip) {
      gsap.registerPlugin(Flip);
    }

    try {
      const res = await fetch('certifications.json');
      if (!res.ok) throw new Error('Network error');
      certifications = await res.json();
    } catch (e) {
      certifications = FALLBACK_DATA;
    }

    if (frameCounter) frameCounter.textContent = certifications.length;
    if (gridStatsChip) gridStatsChip.textContent = `Showing ${certifications.length} Certifications`;

    renderCards();
    applyArcLayout();
    attachEventListeners();
  }

  function renderCards() {
    if (!certCardsTrack) return;
    certCardsTrack.innerHTML = '';

    certifications.forEach((cert, idx) => {
      const card = document.createElement('article');
      card.className = 'cert-card';
      card.id = `card-${cert.id}`;
      card.setAttribute('data-cert-id', cert.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${cert.title}`);

      // Generate points list
      const pointsHtml = cert.learnedPoints
        .map(pt => `
          <li class="learning-point-item">
            <span class="learning-bullet-marker">◆</span>
            <span>${escapeHtml(pt)}</span>
          </li>
        `).join('');

      card.innerHTML = `
        <!-- Floating Pill Tag in Arc Mode (Like the "Buy Now" pill in the Pinterest pin) -->
        <div class="cert-card-pill-tag">
          <img src="${cert.issuerLogo}" alt="${escapeHtml(cert.issuer)}" onerror="this.style.display='none'">
          <span>Verified</span>
        </div>

        <!-- Corner Badge in Grid Mode -->
        <div class="cert-card-badge" data-badge-id="${cert.id}" title="${escapeHtml(cert.issuer)}">
          <img src="${cert.issuerLogo}" alt="${escapeHtml(cert.issuer)}" onerror="this.outerHTML='<span class=\\'badge-initials\\'>${cert.issuerInitials}</span>'">
        </div>

        <!-- Top Certificate Preview Media -->
        <div class="cert-card-media">
          <img class="cert-preview-img" src="${cert.image}" alt="${escapeHtml(cert.title)}" loading="lazy">
          <div class="cert-media-hover-overlay">
            <span class="overlay-inspect-chip">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              Inspect Certificate
            </span>
          </div>
        </div>

        <!-- Content Body in Grid Mode -->
        <div class="cert-card-content">
          <div class="cert-card-eyebrow">
            <span class="eyebrow-bullet">◆</span>
            <span>${escapeHtml(cert.category)}</span>
          </div>
          <h3 class="cert-card-title">${escapeHtml(cert.title)}</h3>
          <p class="cert-card-issuer">${escapeHtml(cert.issuer)}</p>

          <div class="cert-card-meta-row">
            <span class="meta-chip">🗓 ${escapeHtml(cert.issueDate)}</span>
            <span class="meta-chip">🆔 ${escapeHtml(cert.credentialId)}</span>
          </div>

          <div class="card-divider"></div>

          <div class="cert-learning-section">
            <div class="learning-section-title">
              <span class="section-spark">✦</span>
              <span>What I Learned</span>
            </div>
            <ul class="learning-points-list">
              ${pointsHtml}
            </ul>
          </div>

          <div class="cert-card-footer">
            <span class="inspect-action-text">
              Inspect Certificate
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </span>
            <span class="verified-tag">✓ Official Honor</span>
          </div>
        </div>
      `;

      // Click card: in Arc mode, spread cards; in Grid mode, open Lightbox
      card.addEventListener('click', (e) => {
        if (currentMode === 'arc') {
          spreadCards();
        } else {
          openLightbox(cert);
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (currentMode === 'arc') spreadCards();
          else openLightbox(cert);
        }
      });

      certCardsTrack.appendChild(card);
    });
  }

  // --------------------------------------------------------
  // 5. ANIMATION: SPREAD CARDS (ARC -> GRID)
  // Exact smooth transition from the Pinterest reel!
  // --------------------------------------------------------
  function spreadCards() {
    if (isAnimating || currentMode === 'grid') return;
    isAnimating = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(document.querySelectorAll('.cert-card'));

    if (prefersReducedMotion || !window.gsap) {
      document.body.classList.remove('arc-mode');
      document.body.classList.add('grid-mode');
      currentMode = 'grid';
      updateUIState('grid');
      isAnimating = false;
      return;
    }

    // Step A: Capture FLIP state of the cards in their curved arc positions
    const cardState = Flip.getState(cards);

    // Step B: Morph / Cross-fade hero titles smoothly (as shown in the Pinterest reel)
    gsap.timeline()
      .to(heroSuperTitle, {
        opacity: 0,
        y: -10,
        duration: 0.22,
        onComplete: () => {
          heroSuperTitle.textContent = "Verified Honors of The";
          gsap.to(heroSuperTitle, { opacity: 1, y: 0, duration: 0.35 });
        }
      });

    // Step C: Switch classes in DOM
    document.body.classList.remove('arc-mode');
    document.body.classList.add('grid-mode');
    currentMode = 'grid';
    updateUIState('grid');

    // Step D: Execute GSAP FLIP transition: cards straighten out into the grid
    Flip.from(cardState, {
      duration: 0.95,
      ease: 'power3.inOut',
      stagger: 0.05,
      absolute: true,
      onComplete: () => {
        // Clear inline transforms so layout is 100% fluid on window resize
        cards.forEach(card => {
          gsap.set(card, { clearProps: 'transform,top,left,position,width,height' });
        });
        isAnimating = false;
      }
    });

    // Step E: Staggered reveal of card content & bullet points
    cards.forEach((card, idx) => {
      const content = card.querySelector('.cert-card-content');
      const badge = card.querySelector('.cert-card-badge');
      if (content) {
        gsap.fromTo(content,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, delay: 0.4 + idx * 0.06, ease: 'power2.out' }
        );
      }
      if (badge) {
        gsap.fromTo(badge,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, delay: 0.5 + idx * 0.06, ease: 'back.out(2)' }
        );
      }
    });
  }

  // --------------------------------------------------------
  // 6. ANIMATION: STACK CARDS BACK (GRID -> ARC)
  // Gathers cards back into the curved fanned arc!
  // --------------------------------------------------------
  function stackCardsBack() {
    if (isAnimating || currentMode === 'arc') return;
    isAnimating = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(document.querySelectorAll('.cert-card'));

    if (prefersReducedMotion || !window.gsap) {
      document.body.classList.remove('grid-mode');
      document.body.classList.add('arc-mode');
      currentMode = 'arc';
      applyArcLayout();
      updateUIState('arc');
      isAnimating = false;
      return;
    }

    // Fade out card contents quickly before gathering
    gsap.to('.cert-card-content', { opacity: 0, duration: 0.2 });

    // Step A: Record current grid positions
    const cardState = Flip.getState(cards);

    // Step B: Morph title back
    gsap.timeline()
      .to(heroSuperTitle, {
        opacity: 0,
        y: 10,
        duration: 0.22,
        onComplete: () => {
          heroSuperTitle.textContent = "The Ultimate";
          gsap.to(heroSuperTitle, { opacity: 1, y: 0, duration: 0.35 });
        }
      });

    // Step C: Switch DOM classes
    document.body.classList.remove('grid-mode');
    document.body.classList.add('arc-mode');
    currentMode = 'arc';
    updateUIState('arc');

    // Reapply arc offsets
    applyArcLayout();

    // Step D: Execute Reverse FLIP back into curved arc
    Flip.from(cardState, {
      duration: 0.85,
      ease: 'power3.inOut',
      stagger: 0.04,
      absolute: true,
      onComplete: () => {
        // Ensure arc layout is cleanly restored
        applyArcLayout();
        isAnimating = false;
      }
    });
  }

  // --------------------------------------------------------
  // 7. UI STATE & TEXT UPDATER
  // --------------------------------------------------------
  function updateUIState(mode) {
    if (mode === 'grid') {
      if (toggleBtnText) toggleBtnText.textContent = 'Stack to Arc';
      if (indicatorText) indicatorText.textContent = `Spread Grid (${certifications.length} Items)`;
    } else {
      if (toggleBtnText) toggleBtnText.textContent = 'Spread Cards';
      if (indicatorText) indicatorText.textContent = 'Arc Fan Deck (Click to Spread)';
    }
  }

  // --------------------------------------------------------
  // 8. LIGHTBOX MODAL
  // --------------------------------------------------------
  function openLightbox(cert) {
    if (!certLightbox) return;

    if (lightboxImg) {
      lightboxImg.src = cert.image;
      lightboxImg.alt = cert.title;
    }
    if (lightboxTitle) lightboxTitle.textContent = cert.title;
    if (lightboxIssuer) lightboxIssuer.textContent = cert.issuer;
    if (lightboxIssuerBadge) {
      lightboxIssuerBadge.innerHTML = `<img src="${cert.issuerLogo}" alt="${cert.issuer}">`;
    }
    if (lightboxDate) lightboxDate.textContent = `Issued: ${cert.issueDate}`;
    if (lightboxCategory) lightboxCategory.textContent = `Category: ${cert.category}`;
    if (lightboxCredentialId) lightboxCredentialId.textContent = `Credential: ${cert.credentialId}`;
    if (lightboxOpenLink) lightboxOpenLink.href = cert.image;

    certLightbox.classList.add('active');
    certLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!certLightbox) return;
    certLightbox.classList.remove('active');
    certLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------
  // 9. EVENT LISTENERS & RESIZE
  // --------------------------------------------------------
  function attachEventListeners() {
    // Header toggle button
    if (toggleLayoutBtn) {
      toggleLayoutBtn.addEventListener('click', () => {
        if (currentMode === 'arc') spreadCards();
        else stackCardsBack();
      });
    }

    // Arc bottom explore button
    if (exploreDeckBtn) {
      exploreDeckBtn.addEventListener('click', spreadCards);
    }

    // Bottom floating stack back button
    if (stackBackBtn) {
      stackBackBtn.addEventListener('click', stackCardsBack);
    }

    // Lightbox modal closing
    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', closeLightbox);
    }
    if (certLightbox) {
      certLightbox.addEventListener('click', (e) => {
        if (e.target === certLightbox) closeLightbox();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certLightbox && certLightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    // Window resize handler: recalculate arc spacing or clear grid props
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (currentMode === 'arc') {
          applyArcLayout();
        } else {
          document.querySelectorAll('.cert-card').forEach(card => {
            if (window.gsap) gsap.set(card, { clearProps: 'transform,top,left,position,width,height' });
          });
        }
      }, 120);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // DOM ready check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
