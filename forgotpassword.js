document.addEventListener('DOMContentLoaded', function () {
    // Step navigation
    const emailSection = document.getElementById('email-section');
    const otpSection = document.getElementById('otp-section');
    const resetSection = document.getElementById('reset-section');
    const sendOtpBtn = document.getElementById('send-otp-btn');
    const verifyOtpBtn = document.getElementById('verify-otp-btn');

    sendOtpBtn.addEventListener('click', function () {
        // Here you would send OTP to the email
        emailSection.style.display = 'none';
        otpSection.style.display = 'block';
    });

    verifyOtpBtn.addEventListener('click', function () {
        // Here you would verify the OTP
        otpSection.style.display = 'none';
        resetSection.style.display = 'block';
    });

    // Use event delegation for password toggles in reset section
    resetSection.addEventListener('click', function (e) {
        if (e.target.classList.contains('password-toggle') || (e.target.tagName === 'I' && e.target.parentElement.classList.contains('password-toggle'))) {
            const btn = e.target.classList.contains('password-toggle') ? e.target : e.target.parentElement;
            const input = btn.parentElement.querySelector('input[type="password"], input[type="text"]');
            const icon = btn.querySelector('i');
            if (input && icon) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                if (type === 'password') {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                } else {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                }
            }
        }
    });
});
