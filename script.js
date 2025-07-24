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
