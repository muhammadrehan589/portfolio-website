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

  // Contact form alert
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! (Form submission is not processed on GitHub Pages)');
      form.reset();
    });
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
}); 