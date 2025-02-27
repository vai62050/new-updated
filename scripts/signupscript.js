document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm_password = document.getElementById("confirm_password").value.trim();

    const fullnameError = document.getElementById("fullname-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");

    // Reset error messages
    fullnameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";

    // Validate Full Name
    if (!fullname) {
        fullnameError.style.display = "block";
        isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        emailError.style.display = "block";
        isValid = false;
    }

    // Validate Password
    if (password.length < 6) {
        passwordError.style.display = "block";
        isValid = false;
    }

    // Validate Confirm Password
    if (confirm_password !== password) {
        confirmPasswordError.style.display = "block";
        isValid = false;
    }

    // If all validations pass, submit the form
    if (isValid) {
        this.submit();
    }
});