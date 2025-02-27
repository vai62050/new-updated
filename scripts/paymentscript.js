function verifyGPay() {
    const upiId = document.getElementById('upiId').value;
    const gpayPattern = /^[a-zA-Z0-9.-]+@(okaxis|okhdfcbank|oksbi|okicici)$/;
    const validationIcon = document.getElementById('validationIcon');

    if (gpayPattern.test(upiId)) {
        validationIcon.innerHTML = '<font color="green"><i class="fas fa-check-circle valid"></font></i>';
    } else {
        validationIcon.innerHTML = '<font color="red"><i class="fas fa-times-circle invalid"></font></i>';
    }
}

function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').id;
    const upiId = document.getElementById('upiId').value;
    const validationIcon = document.getElementById('validationIcon');

    if (paymentMethod === 'gpay' && !upiId) {
        validationIcon.innerHTML = '<i class="fas fa-times-circle invalid"></i>';
        return;
    }

    document.getElementById('successOverlay').style.display = 'flex';
}

// Toggle payment methods
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', () => {
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.toggle('active', method.contains(radio));
        });
        document.getElementById('gpayForm').style.display = 
            radio.id === 'gpay' ? 'block' : 'none';
    });
});

// Profile dropdown functionality
const profileBtn = document.querySelector('.profile-btn');
const dropdownContent = document.querySelector('.dropdown-content');

profileBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('dropdown-active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-dropdown')) {
        dropdownContent.classList.remove('dropdown-active');
    }
});