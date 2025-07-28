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

    // SPA navigation logic
    const mainContentArea = document.getElementById('main-content-area');
    const dashboardCardsHTML = mainContentArea ? mainContentArea.innerHTML : '';
    const tasksLink = document.getElementById('tasks-link');
    const statsLink = document.getElementById('stats-link');
    const settingsLink = document.getElementById('settings-link');
    const dashboardLink = document.querySelector('a.active');
    if (tasksLink && mainContentArea) {
        tasksLink.addEventListener('click', function(e) {
            e.preventDefault();
            fetch('tasks.html')
                .then(res => res.text())
                .then(html => {
                    mainContentArea.innerHTML = html;
                });
            document.querySelectorAll('.sidebar nav ul li a').forEach(a => a.classList.remove('active'));
            tasksLink.classList.add('active');
        });
    }
    if (statsLink && mainContentArea) {
        statsLink.addEventListener('click', function(e) {
            e.preventDefault();
            fetch('stats.html')
                .then(res => res.text())
                .then(html => {
                    mainContentArea.innerHTML = html;
                });
            document.querySelectorAll('.sidebar nav ul li a').forEach(a => a.classList.remove('active'));
            statsLink.classList.add('active');
        });
    }
    if (settingsLink && mainContentArea) {
        settingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            fetch('settings.html')
                .then(res => res.text())
                .then(html => {
                    mainContentArea.innerHTML = html;
                });
            document.querySelectorAll('.sidebar nav ul li a').forEach(a => a.classList.remove('active'));
            settingsLink.classList.add('active');
        });
    }
    if (dashboardLink && mainContentArea) {
        dashboardLink.addEventListener('click', function(e) {
            e.preventDefault();
            mainContentArea.innerHTML = dashboardCardsHTML;
            // Update active class
            document.querySelectorAll('.sidebar nav ul li a').forEach(a => a.classList.remove('active'));
            dashboardLink.classList.add('active');
        });
    }
});
