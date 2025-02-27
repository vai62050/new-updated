function sendCode(event) {
    event.preventDefault();
    document.getElementById('emailForm').style.display = 'none';
    document.getElementById('verificationForm').style.display = 'block';
}

function verifyCode(event) {
    event.preventDefault();
    // Add verification logic here
}

function resendCode(event) {
    event.preventDefault();
    // Add resend code logic here
}