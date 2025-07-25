// Section reveal on scroll
const revealSections = document.querySelectorAll('section, .footer');
const revealClass = 'revealed';

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(revealClass);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealSections.forEach(section => {
  section.classList.add('to-reveal');
  observer.observe(section);
});

// Optional: Smooth scroll for anchor links
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Burger menu toggle
const burger = document.getElementById('burger-menu');
const mobileNav = document.getElementById('mobile-nav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('mobile-nav-open');
    burger.classList.toggle('active'); // Burger animation
  });
  // Close menu when clicking a link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.classList.remove('mobile-nav-open');
      burger.classList.remove('active');
    });
  });
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      mobileNav.classList.contains('active') &&
      !mobileNav.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      mobileNav.classList.remove('active');
      document.body.classList.remove('mobile-nav-open');
      burger.classList.remove('active');
    }
  });
}
