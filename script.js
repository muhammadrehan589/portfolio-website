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

  // Add 3D rotating cube below about me
  const aboutMe = document.querySelector('#home p');
  if (aboutMe && !document.getElementById('cube-3d')) {
    const cubeContainer = document.createElement('div');
    cubeContainer.id = 'cube-3d-container';
    cubeContainer.innerHTML = `
      <div class="cube-3d" id="cube-3d">
        <div class="face face-front">Code</div>
        <div class="face face-back">Build</div>
        <div class="face face-right">Create</div>
        <div class="face face-left">Design</div>
      </div>
    `;
    aboutMe.insertAdjacentElement('afterend', cubeContainer);
  }

  // Typewriter animation for name
  const nameEl = document.querySelector('#home h1');
  if (nameEl) {
    const text = 'Muhammad Rehan';
    let i = 0;
    let isDeleting = false;
    let speed = 120;
    // Create cursor span
    let cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = '|';
    nameEl.textContent = '';
    nameEl.appendChild(cursor);
    function type() {
      if (!isDeleting) {
        nameEl.childNodes[0].textContent = text.substring(0, i + 1);
        i++;
        if (i === text.length) {
          isDeleting = true;
          speed = 1000; // pause before deleting
        } else {
          speed = 120;
        }
      } else {
        nameEl.childNodes[0].textContent = text.substring(0, i - 1);
        i--;
        if (i === 0) {
          isDeleting = false;
          speed = 500; // pause before typing again
        } else {
          speed = 60;
        }
      }
      setTimeout(type, speed);
    }
    // Insert a text node before the cursor
    nameEl.insertBefore(document.createTextNode(''), cursor);
    type();
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

  // Skill chips — staggered fade-up
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
      if (!repoPath) return;

      const card = createProjectCardSkeleton(repoPath);
      link.replaceWith(card);

      Promise.all([
        fetchGitHubJson(`https://api.github.com/repos/${repoPath}`),
        fetchGitHubJson(`https://api.github.com/repos/${repoPath}/languages`, true)
      ])
        .then(([repoData, languages]) => {
          renderProjectCard(card, repoData, languages || {}, repoPath);
        })
        .catch(() => {
          renderProjectError(card, repoPath);
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

  function createProjectCardSkeleton(repoPath) {
    const card = document.createElement('article');
    card.className = 'project-card project-card--loading';
    const text = document.createElement('p');
    text.textContent = `Loading ${repoPath}...`;
    card.appendChild(text);
    return card;
  }

  function renderProjectCard(card, repoData, languages, repoPath) {
    card.classList.remove('project-card--loading');
    card.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'project-card-header';

    const title = document.createElement('h3');
    title.textContent = repoData.name || repoPath.split('/')[1];
    header.appendChild(title);

    const link = document.createElement('a');
    link.href = repoData.html_url || `https://github.com/${repoPath}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Open on GitHub';
    header.appendChild(link);
    card.appendChild(header);

    if (repoData.description) {
      const desc = document.createElement('p');
      desc.className = 'project-desc';
      desc.textContent = repoData.description;
      card.appendChild(desc);
    }

    const stats = document.createElement('div');
    stats.className = 'project-stats';
    stats.innerHTML = `
      <span><strong>Updated:</strong> ${formatDate(repoData.updated_at)}</span>
    `;
    card.appendChild(stats);

    const topics = Array.isArray(repoData.topics) ? repoData.topics.slice(0, 4) : [];
    if (topics.length) {
      const topicList = document.createElement('ul');
      topicList.className = 'project-topics';
      topics.forEach(topic => {
        const item = document.createElement('li');
        item.textContent = topic;
        topicList.appendChild(item);
      });
      card.appendChild(topicList);
    }

    const languageKeys = languages ? Object.keys(languages) : [];
    if (languageKeys.length) {
      const langList = document.createElement('ul');
      langList.className = 'project-languages';
      languageKeys.slice(0, 4).forEach(lang => {
        const li = document.createElement('li');
        li.textContent = lang;
        langList.appendChild(li);
      });
      card.appendChild(langList);
    }
  }

  function renderProjectError(card, repoPath) {
    card.classList.remove('project-card--loading');
    card.innerHTML = '';
    const msg = document.createElement('p');
    msg.className = 'project-error';
    msg.textContent = `Unable to load ${repoPath}.`;
    const fallbackLink = document.createElement('a');
    fallbackLink.href = `https://github.com/${repoPath}`;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener';
    fallbackLink.textContent = 'Open on GitHub';
    card.appendChild(msg);
    card.appendChild(fallbackLink);
  }

  function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
}); 