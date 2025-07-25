document.addEventListener('DOMContentLoaded', function () {
    // --------------------
    // Password toggle logic
    // --------------------
    const passwordGroups = document.querySelectorAll('.input-group');
    passwordGroups.forEach(group => {
        const input = group.querySelector('input[type="password"]');
        const toggleBtn = group.querySelector('.password-toggle');
        const icon = toggleBtn ? toggleBtn.querySelector('i') : null;

        if (input && toggleBtn && icon) {
            toggleBtn.addEventListener('click', function () {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);

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

    // --------------------
    // Firebase Setup
    // --------------------
    const firebaseConfig = {
        apiKey: "AIzaSyDnqRF56gDL2K7pNBixd8CM9KnFw-1BD0A",
        authDomain: "demoproduct-a30a6.firebaseapp.com",
        projectId: "demoproduct-a30a6",
        storageBucket: "demoproduct-a30a6.firebasestorage.app",
        messagingSenderId: "207361877161",
        appId: "1:207361877161:web:1a6c2529723f4b478675b8"
    };

    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // --------------------
    // Handle Signup
    // --------------------
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            document.getElementById("message").textContent = "Passwords do not match!";
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                document.getElementById("message").textContent = "Signup successful!";
                console.log("User signed up:", fullName, email);
                // Redirect or clear form
                // window.location.href = "welcome.html";
            })
            .catch(error => {
                document.getElementById("message").textContent = "Error: " + error.message;
            });
    });
});
