// Motivational quotes
const quotes = [
    "The secret of getting ahead is getting started.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Productivity is never an accident. It is always the result of a commitment to excellence.",
    "It’s not always that we need to do more but rather that we need to focus on less.",
    "Start where you are. Use what you have. Do what you can.",
    "The way to get started is to quit talking and begin doing.",
    "Your future is created by what you do today, not tomorrow."
];

function setRandomQuote() {
    const quoteElem = document.getElementById('quote');
    if (quoteElem) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElem.textContent = '"' + quotes[randomIndex] + '"';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setRandomQuote();

    // Task completion visual
    document.querySelectorAll('.tasks-list input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.parentElement.style.textDecoration = 'line-through';
                this.parentElement.style.color = '#aaa';
            } else {
                this.parentElement.style.textDecoration = '';
                this.parentElement.style.color = '';
            }
        });
    });

    // Sidebar toggle for mobile
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && hamburger && overlay) {
        hamburger.addEventListener('click', function() {
            const isOpen = sidebar.classList.toggle('open');
            hamburger.classList.toggle('active', isOpen);
            overlay.style.display = isOpen ? 'block' : 'none';
            hamburger.setAttribute('aria-expanded', isOpen);
        });
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('open');
            hamburger.classList.remove('active');
            overlay.style.display = 'none';
            hamburger.setAttribute('aria-expanded', 'false');
        });
    }
});
