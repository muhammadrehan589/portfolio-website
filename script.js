document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for nav links
  document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('a.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Contact form — Formspree submission
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          showFormMessage('Message sent! I\'ll get back to you soon.', 'success');
          form.reset();
        } else {
          const data = await response.json();
          const msg = data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong. Try again.';
          showFormMessage(msg, 'error');
        }
      } catch (err) {
        showFormMessage('Network error. Please try again.', 'error');
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }

  function showFormMessage(text, type) {
    let msg = document.getElementById('form-message');
    if (!msg) {
      msg = document.createElement('p');
      msg.id = 'form-message';
      const form = document.getElementById('contact-form');
      form.insertAdjacentElement('afterend', msg);
    }
    msg.textContent = text;
    msg.style.cssText = `margin-top:0.8rem;font-weight:600;color:${type === 'success' ? '#00fff7' : '#ff8a80'};`;
    setTimeout(() => { msg.textContent = ''; }, 6000);
  }

  // Initialize particles.js
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 900 } },
        color: { value: '#00fff7' },
        shape: { type: 'circle' },
        opacity: { value: 0.8, random: false },
        size: { value: 4, random: true },
        line_linked: {
          enable: true,
          distance: 120,
          color: '#00fff7',
          opacity: 0.5,
          width: 1.5
        },
        move: {
          enable: true,
          speed: 3.5, // faster movement
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          repulse: { distance: 80, duration: 0.4 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  // Remove geometric triangles if present
  const geoBg = document.getElementById('geo-bg');
  if (geoBg) geoBg.remove();

  // Typewriter animation for hero name
  const nameEl = document.querySelector('#home h1 .hero-last');
  if (nameEl) {
    const text = nameEl.textContent.trim();
    let i = 0;
    let isDeleting = false;
    let speed = 120;
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = '|';
    nameEl.textContent = '';
    nameEl.appendChild(document.createTextNode(''));
    nameEl.appendChild(cursor);
    function type() {
      if (!isDeleting) {
        nameEl.firstChild.textContent = text.substring(0, i + 1);
        i++;
        speed = (i === text.length) ? 1200 : 120;
        if (i === text.length) isDeleting = true;
      } else {
        nameEl.firstChild.textContent = text.substring(0, i - 1);
        i--;
        speed = (i === 0) ? 500 : 60;
        if (i === 0) isDeleting = false;
      }
      setTimeout(type, speed);
    }
    type();
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.querySelector('.nav-links');
  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', () => {
      const open = navLinksList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });
    // Close menu when a nav link is clicked on mobile
    navLinksList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  // ============================================================
  // Scroll-reveal via IntersectionObserver
  // ============================================================
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  function watchReveal(el) { revealObs.observe(el); }

  // Observe all elements already marked in HTML
  document.querySelectorAll('[data-animate]').forEach(el => watchReveal(el));

  // Skill cards — staggered fade-up
  document.querySelectorAll('#skills .skill-card').forEach((card, i) => {
    card.setAttribute('data-animate', '');
    card.style.transitionDelay = `${i * 45}ms`;
    watchReveal(card);
  });

  // Skill chips — staggered fade-up (legacy selector, harmless if empty)
  document.querySelectorAll('#skills ul li').forEach((li, i) => {
    li.setAttribute('data-animate', '');
    li.style.transitionDelay = `${i * 45}ms`;
    watchReveal(li);
  });

  // Contact info paragraphs — staggered fade-left
  document.querySelectorAll('#contact > p').forEach((p, i) => {
    p.setAttribute('data-animate', 'fade-left');
    p.style.transitionDelay = `${i * 75}ms`;
    watchReveal(p);
  });

  // Contact form fields — staggered fade-up
  document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form button').forEach((el, i) => {
    el.setAttribute('data-animate', '');
    el.style.transitionDelay = `${i * 90}ms`;
    watchReveal(el);
  });

  hydrateGitHubProjects();

  function hydrateGitHubProjects() {
    const projectLinks = Array.from(document.querySelectorAll('#projects .project-link'));
    if (!projectLinks.length) return;

    projectLinks.forEach(link => {
      if (link.dataset.placeholder === 'true') return;
      const repoPath = extractRepoPath(link.getAttribute('href'));
      const displayName = link.textContent.trim();
      if (!repoPath) return;

      const imgSrc = link.dataset.image || null;
      const card = createProjectCardSkeleton(repoPath, imgSrc);
      link.replaceWith(card);

      Promise.all([
        fetchGitHubJson(`https://api.github.com/repos/${repoPath}`),
        fetchGitHubJson(`https://api.github.com/repos/${repoPath}/languages`, true)
      ])
        .then(([repoData, languages]) => {
          renderProjectCard(card, repoData, languages || {}, repoPath, imgSrc);
        })
        .catch(() => {
          renderProjectError(card, repoPath, displayName, imgSrc);
        });
    });
  }

  function extractRepoPath(url) {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname !== 'github.com') return null;
      const parts = parsedUrl.pathname
        .replace(/\.git$/i, '')
        .split('/')
        .filter(Boolean);
      if (parts.length < 2) return null;
      const [owner, repo] = parts;
      if (!owner || !repo || owner === 'username' || repo === 'repo-name') return null;
      return `${owner}/${repo}`;
    } catch (err) {
      return null;
    }
  }

  async function fetchGitHubJson(endpoint, allowEmpty = false) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      });
      if (!response.ok) {
        if (allowEmpty) return {};
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (allowEmpty) return {};
      throw error;
    }
  }

  function createProjectCardSkeleton(repoPath, imgSrc) {
    const card = document.createElement('article');
    card.className = 'project-card project-card--loading';

    // Info placeholder
    const info = document.createElement('div');
    info.className = 'project-card-info';
    const loadingText = document.createElement('p');
    loadingText.className = 'project-stats';
    loadingText.textContent = `Loading ${repoPath.split('/')[1]}...`;
    info.appendChild(loadingText);
    card.appendChild(info);

    // Visual panel — show image right away, no API needed
    const visual = document.createElement('div');
    visual.className = 'project-card-visual';
    if (imgSrc) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = repoPath.split('/')[1] + ' screenshot';
      img.onerror = function() {
        this.remove();
        visual.innerHTML = '<i class="fa-solid fa-code proj-icon"></i>';
      };
      visual.appendChild(img);
    } else {
      visual.innerHTML = '<i class="fa-solid fa-code proj-icon"></i>';
    }
    card.appendChild(visual);

    return card;
  }

  function renderProjectCard(card, repoData, languages, repoPath, imgSrc) {
    card.classList.remove('project-card--loading');

    // Update info panel (first child) — keep existing visual panel
    const info = card.querySelector('.project-card-info') || document.createElement('div');
    info.className = 'project-card-info';
    info.innerHTML = '';

    const tag = document.createElement('p');
    tag.className = 'project-card-tag';
    tag.textContent = (Array.isArray(repoData.topics) && repoData.topics[0]) || 'Project';
    info.appendChild(tag);

    const title = document.createElement('h3');
    title.textContent = repoData.name || repoPath.split('/')[1];
    info.appendChild(title);

    if (repoData.description) {
      const desc = document.createElement('p');
      desc.className = 'project-desc';
      desc.textContent = repoData.description;
      info.appendChild(desc);
    }

    const languageKeys = languages ? Object.keys(languages) : [];
    if (languageKeys.length) {
      const langList = document.createElement('ul');
      langList.className = 'project-languages';
      languageKeys.slice(0, 5).forEach(lang => {
        const li = document.createElement('li');
        li.textContent = lang;
        langList.appendChild(li);
      });
      info.appendChild(langList);
    }

    const topics = Array.isArray(repoData.topics) ? repoData.topics.slice(0, 4) : [];
    if (topics.length) {
      const topicList = document.createElement('ul');
      topicList.className = 'project-topics';
      topics.forEach(topic => {
        const item = document.createElement('li');
        item.textContent = topic;
        topicList.appendChild(item);
      });
      info.appendChild(topicList);
    }

    const stats = document.createElement('p');
    stats.className = 'project-stats';
    stats.innerHTML = `Updated: ${formatDate(repoData.updated_at)}`;
    info.appendChild(stats);

    const ghLink = document.createElement('a');
    ghLink.className = 'project-card-link';
    ghLink.href = repoData.html_url || `https://github.com/${repoPath}`;
    ghLink.target = '_blank';
    ghLink.rel = 'noopener';
    ghLink.setAttribute('aria-label', 'View on GitHub');
    ghLink.innerHTML = '<i class="fa-brands fa-github"></i>';
    info.appendChild(ghLink);

    // If info was newly created (shouldn't happen), prepend it
    if (!card.querySelector('.project-card-info')) {
      card.insertBefore(info, card.firstChild);
    }

    // Rebuild visual only if no image was loaded (imgSrc absent)
    if (!imgSrc) {
      let visual = card.querySelector('.project-card-visual');
      if (!visual) {
        visual = document.createElement('div');
        visual.className = 'project-card-visual';
        card.appendChild(visual);
      }
      visual.innerHTML = '<i class="fa-solid fa-code proj-icon"></i>';
    }
  }

  function renderProjectError(card, repoPath, displayName, imgSrc) {
    card.classList.remove('project-card--loading');

    // Update info panel — keep existing visual (already has image from skeleton)
    const info = card.querySelector('.project-card-info') || document.createElement('div');
    info.className = 'project-card-info';
    info.innerHTML = '';

    const tag = document.createElement('p');
    tag.className = 'project-card-tag';
    tag.textContent = 'Project';
    info.appendChild(tag);

    const title = document.createElement('h3');
    title.textContent = displayName || repoPath.split('/')[1];
    info.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'project-desc';
    desc.textContent = 'Explore this project on GitHub.';
    info.appendChild(desc);

    const ghLink = document.createElement('a');
    ghLink.className = 'project-card-link';
    ghLink.href = `https://github.com/${repoPath}`;
    ghLink.target = '_blank';
    ghLink.rel = 'noopener';
    ghLink.setAttribute('aria-label', 'View on GitHub');
    ghLink.innerHTML = '<i class="fa-brands fa-github"></i>';
    info.appendChild(ghLink);

    if (!card.querySelector('.project-card-info')) {
      card.insertBefore(info, card.firstChild);
    }

    // Rebuild visual only if no image
    if (!imgSrc) {
      let visual = card.querySelector('.project-card-visual');
      if (!visual) {
        visual = document.createElement('div');
        visual.className = 'project-card-visual';
        card.appendChild(visual);
      }
      visual.innerHTML = '<i class="fa-solid fa-code proj-icon"></i>';
    }
  }

  function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
}); 