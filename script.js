/**
 * Sanjay Shekar - Vertical Split Portfolio Interactive Script
 * - Dual-Split Layout Switcher (Sidebar Left <-> Right)
 * - Academics, Academies & Career Roadmap Filter & Progress
 * - Section ScrollSpy Navigation
 * - Animated Stats Counter
 * - Resume Preview Modal
 * - Quick Mobile Drawer
 * - Interactive Contact Form & Toast
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================
  // 1. ACADEMICS, ACADEMIES & CAREER ROADMAP FILTER & PROGRESS
  // ==========================================================
  const roadmapTabs = document.querySelectorAll('.roadmap-tab');
  const roadmapSteps = document.querySelectorAll('.roadmap-step');
  const roadmapCounterBadge = document.getElementById('roadmapCounterBadge');
  const roadmapProgressFill = document.querySelector('.roadmap-progress-bar-fill');
  const roadmapProgressBar = document.querySelector('.roadmap-progress-bar-bg');

  function updateRoadmapView(filter) {
    let visibleSteps = [];
    let completedCount = 0;
    let activeCount = 0;

    roadmapSteps.forEach(step => {
      step.classList.remove('last-visible');
      const category = step.getAttribute('data-category');
      const shouldShow = filter === 'all' || category === filter;

      if (shouldShow) {
        step.classList.remove('is-hidden');
        visibleSteps.push(step);
        if (step.classList.contains('completed')) completedCount++;
        if (step.classList.contains('active-stage')) activeCount++;
      } else {
        step.classList.add('is-hidden');
      }
    });

    if (visibleSteps.length > 0) {
      visibleSteps[visibleSteps.length - 1].classList.add('last-visible');
    }

    const totalVisible = visibleSteps.length || 1;
    const percent = Math.round((completedCount / totalVisible) * 100);

    if (roadmapProgressFill) {
      roadmapProgressFill.style.width = `${percent}%`;
    }
    if (roadmapProgressBar) {
      roadmapProgressBar.setAttribute('aria-valuenow', String(percent));
    }
    if (roadmapCounterBadge) {
      const activeText = activeCount > 0 ? ` • ${activeCount} In Progress` : '';
      roadmapCounterBadge.innerHTML = `<strong>${completedCount} / ${totalVisible}</strong> Completed${activeText}`;
    }
  }

  if (roadmapTabs.length > 0 && roadmapSteps.length > 0) {
    roadmapTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        roadmapTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        updateRoadmapView(tab.getAttribute('data-filter') || 'all');
      });
    });

    // Initialize default view
    updateRoadmapView('all');
  }

  // ==========================================================
  // 2. DUAL-SPLIT LAYOUT SWITCHER (Sidebar Left <-> Right)
  // ==========================================================
  const layoutFlipBtn = document.getElementById('layoutFlipBtn');
  const drawerLayoutFlipBtn = document.getElementById('drawerLayoutFlipBtn');
  const layoutStateLabel = document.getElementById('layoutStateLabel');

  function setLayoutMode(mode) {
    if (mode === 'right') {
      document.body.classList.remove('layout-sidebar-left');
      document.body.classList.add('layout-sidebar-right');
      if (layoutStateLabel) layoutStateLabel.textContent = 'Sidebar Right';
      localStorage.setItem('sanjay-portfolio-layout', 'right');
    } else {
      document.body.classList.remove('layout-sidebar-right');
      document.body.classList.add('layout-sidebar-left');
      if (layoutStateLabel) layoutStateLabel.textContent = 'Sidebar Left';
      localStorage.setItem('sanjay-portfolio-layout', 'left');
    }
  }

  function toggleLayoutMode() {
    const isCurrentLeft = document.body.classList.contains('layout-sidebar-left');
    const newMode = isCurrentLeft ? 'right' : 'left';
    setLayoutMode(newMode);
    showToast(`Switched layout: Sidebar on the ${newMode.toUpperCase()}`);
  }

  // Check saved preference or default to left
  const savedLayout = localStorage.getItem('sanjay-portfolio-layout');
  if (savedLayout === 'right') {
    setLayoutMode('right');
  } else {
    setLayoutMode('left');
  }

  if (layoutFlipBtn) layoutFlipBtn.addEventListener('click', toggleLayoutMode);
  if (drawerLayoutFlipBtn) drawerLayoutFlipBtn.addEventListener('click', () => {
    toggleLayoutMode();
    closeDrawer();
  });

  // ==========================================================
  // 3. VERTICAL NAVIGATION SCROLLSPY (IntersectionObserver)
  // ==========================================================
  const navItems = document.querySelectorAll('.v-nav-item');
  const sections = document.querySelectorAll('section.content-section[id]');

  const scrollSpyOptions = {
    root: null,
    rootMargin: '-15% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          if (link.getAttribute('data-target') === id || link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, scrollSpyOptions);

  sections.forEach(section => observer.observe(section));

  // Smooth scroll click handler
  navItems.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target') || link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================================
  // 4. STAT COUNTER NUMBER ANIMATION
  // ==========================================================
  const counterElements = document.querySelectorAll('.stat-big-number[data-target]');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counterElements.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1400;
          const steps = 50;
          const increment = target / steps;
          const stepTime = duration / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.25 });

  const impactBanner = document.querySelector('.vertical-impact-banner');
  if (impactBanner) counterObserver.observe(impactBanner);

  // ==========================================================
  // 5. RESUME PREVIEW MODAL
  // ==========================================================
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtns = document.querySelectorAll('.trigger-resume-modal');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');

  function openResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  // ==========================================================
  // 6. QUICK MOBILE NAVIGATION DRAWER
  // ==========================================================
  const menuToggle = document.getElementById('menuToggle');
  const sideDrawer = document.getElementById('sideDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (!sideDrawer) return;
    sideDrawer.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!sideDrawer) return;
    sideDrawer.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Global Escape Key Listener for Modals & Drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResumeModal();
      closeDrawer();
    }
  });

  // ==========================================================
  // 7. CONTACT FORM SUBMISSION & TOAST
  // ==========================================================
  const contactForm = document.getElementById('contactForm');
  const toastMsg = document.getElementById('toastMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('userName');
      const senderName = nameInput ? nameInput.value.trim() : 'there';
      const submitBtn = contactForm.querySelector('.submit-action-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `<span>Sending...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `<span>Sent Successfully! ✓</span>`;
        submitBtn.style.background = '#10b981';
        submitBtn.style.color = '#ffffff';

        showToast(`Thank you, ${senderName}! Your message has been sent to Sanjay Shekar.`);
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 3500);
      }, 800);
    });
  }

  function showToast(message) {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 4200);
  }

  // ==========================================================
  // 8. SUBTLE WATERMARK PARALLAX EFFECT
  // ==========================================================
  const bgWatermark = document.getElementById('bgWatermark');
  if (bgWatermark) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      bgWatermark.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }
});

