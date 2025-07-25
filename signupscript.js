document.addEventListener('DOMContentLoaded', function () {
    // Select all password input groups with a toggle button
    const passwordGroups = document.querySelectorAll('.input-group');

    passwordGroups.forEach(group => {
        const input = group.querySelector('input[type="password"]');
        const toggleBtn = group.querySelector('.password-toggle');
        const icon = toggleBtn ? toggleBtn.querySelector('i') : null;

        if (input && toggleBtn && icon) {
            toggleBtn.addEventListener('click', function () {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);

                // Toggle icon
                if (type === 'password') {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                } else {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                }
            });
        }
    });
});
