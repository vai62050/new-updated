document.addEventListener('DOMContentLoaded', () => {
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Profile dropdown functionality
    const profileBtn = document.querySelector('.profile-btn');
    const profileDropdown = document.querySelector('.profile-dropdown');

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });

    // Close profile dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
    });

    // Cart functionality
    const cartBtn = document.querySelector('.cart-btn');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');

    // Sample cart items
    let cartItems = [];

    // Update cart display
    function updateCart() {
        cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <div class="item-left">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>₹${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="event.stopPropagation(); decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="event.stopPropagation(); increaseQuantity(${item.id})">+</button>
                </div>
            </div>
        `).join('');
        
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `₹${total.toFixed(2)}`;
    }

    // Quantity controls
    window.increaseQuantity = function(id) {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            item.quantity++;
            updateCart();
        }
    }

    window.decreaseQuantity = function(id) {
        const itemIndex = cartItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            if (cartItems[itemIndex].quantity > 1) {
                cartItems[itemIndex].quantity--;
            } else {
                cartItems.splice(itemIndex, 1);
            }
            updateCart();
        }
    }

    // Cart toggle
    cartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartDropdown.classList.add('active');
        updateCart();
    });

    closeCart.addEventListener('click', () => {
        cartDropdown.classList.remove('active');
    });

    // Close cart when clicking outside, but not when clicking inside the cart
    document.addEventListener('click', (e) => {
        if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.classList.remove('active');
        }
    });

    // Prevent cart from closing when clicking inside
    cartDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Initialize cart
    updateCart();

    // Star rating functionality
    const stars = document.querySelectorAll('.stars i');
    const ratingInput = document.getElementById('rating-value');
    let currentRating = 0;

    function updateStars(rating, className) {
        stars.forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            if (starRating <= rating) {
                star.classList.add(className);
            } else {
                star.classList.remove(className);
            }
        });
    }

    stars.forEach(star => {
        // Hover effect
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            updateStars(rating, 'hover');
        });

        // Click event
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            currentRating = rating;
            ratingInput.value = rating;
            updateStars(rating, 'active');
        });
    });

    // Remove hover effect when mouse leaves the stars container
    document.querySelector('.stars').addEventListener('mouseleave', () => {
        stars.forEach(star => star.classList.remove('hover'));
        updateStars(currentRating, 'active');
    });

    // Initialize review list
    let review_list = [];

    // Form submission handling
    const feedbackForm = document.getElementById('feedbackForm');
    
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const review = document.getElementById('review').value;
        
        if (currentRating === 0) {
            alert('Please select a rating');
            return;
        }
        
        if (!review.trim()) {
            alert('Please write your review');
            return;
        }
        
        // Create new review object
        const newReview = {
            author: 'You',
            rating: currentRating,
            content: review,
            date: new Date().toLocaleDateString()
        };
        
        // Add to review list
        review_list.push(newReview);
        
        // Clear form
        feedbackForm.reset();
        currentRating = 0;
        ratingInput.value = 0;
        updateStars(0, 'active');
        
        // Reload reviews
        loadPreviousReviews();
    });

    // Load previous reviews
    function loadPreviousReviews() {
        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = ''; // Clear existing reviews
        
        if (review_list.length === 0) {
            reviewsList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to share your experience!</p>';
            return;
        }
        // Add all reviews
        review_list.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            
            reviewCard.innerHTML = `
                <div class="review-header">
                    <span class="review-author">${review.author}</span>
                    <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                </div>
                <div class="review-content">${review.content}</div>
                <div class="review-date">${review.date}</div>
            `;
            
            reviewsList.appendChild(reviewCard);
        });
    }
    // Load previous reviews on page load
    loadPreviousReviews();
});
