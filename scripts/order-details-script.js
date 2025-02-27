        // Generate random order ID
        document.getElementById('orderId').textContent = 'FH' + Math.random().toString(36).substr(2, 9).toUpperCase();

        // Handle form submission
        document.getElementById('addressForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const address = document.getElementById('address').value.trim();
            
            if (!address) {
                alert('Please enter your delivery address');
                return;
            }

            // Store address in session storage for payment page
            sessionStorage.setItem('deliveryAddress', address);
            sessionStorage.setItem('orderAmount', '748');
            
            // Redirect to payment page
            window.location.href = 'payment.html';
        });