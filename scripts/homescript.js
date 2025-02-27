// Cart functionality
const cartItems = [];
const cartCount = document.querySelector('.cart-count');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartItemsContainer = document.querySelector('.cart-items');
const totalAmount = document.querySelector('.total-amount');

const shop_button = document.querySelector(".shop-now");
shop_button.addEventListener('click',()=>{
    location.href="https://vai62050.github.io/shop";
})

// Update cart count
function updateCartCount() {
    cartCount.textContent = cartItems.length;
}

// Update cart total
function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `₹${total.toFixed(2)}`;
}

// Add item to cart
function addToCart(item) {
    cartItems.push(item);
    updateCartCount();
    updateCartTotal();
    renderCartItems();
}

// Render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
        </div>
    `).join('');
}
renderCartItems();
// Cart and Profile functionality
const cartBtn = document.querySelector('.cart-btn');
const profileBtn = document.querySelector('.profile-btn');
const profileDropdown = document.querySelector('.profile-dropdown');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const closeCartBtn = document.querySelector('.close-cart');

// Cart functionality
cartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cartDropdown.classList.toggle('active');
    // Close profile dropdown when cart opens
    profileDropdown.style.opacity = '0';
    profileDropdown.style.visibility = 'hidden';
});

// Profile functionality
profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = profileDropdown.style.visibility === 'visible';
    
    // Toggle profile dropdown
    profileDropdown.style.opacity = isVisible ? '0' : '1';
    profileDropdown.style.visibility = isVisible ? 'hidden' : 'visible';
    profileDropdown.style.transform = isVisible ? 'translateY(10px)' : 'translateY(0)';
    
    // Close cart if open
    cartDropdown.classList.remove('active');
    // Close mobile menu if open
    navLinks.classList.remove('active');
});

// Mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Close dropdowns when menu opens
    cartDropdown.classList.remove('active');
    profileDropdown.style.opacity = '0';
    profileDropdown.style.visibility = 'hidden';
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.style.opacity = '0';
        profileDropdown.style.visibility = 'hidden';
        profileDropdown.style.transform = 'translateY(10px)';
    }
    if (!cartDropdown.contains(e.target) && !cartBtn.contains(e.target)) {
        cartDropdown.classList.remove('active');
    }
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Prevent closing when clicking inside dropdowns
profileDropdown.addEventListener('click', (e) => e.stopPropagation());
cartDropdown.addEventListener('click', (e) => e.stopPropagation());
navLinks.addEventListener('click', (e) => e.stopPropagation());

// Close cart when clicking the close button
closeCartBtn.addEventListener('click', () => {
    cartDropdown.classList.remove('active');
});

// Initialize cart with sample items
const sampleProducts = [
    {
        id: 1,
        name: "Monstera Deliciosa",
        price: 2500,
        image: "../images/monstera1.jpg",
        quantity: 1
    },
    {
        id: 2,
        name: "Snake Plant",
        price:550,
        image: "../images/snakeplant1.jpg",
        quantity: 1
    },
    {
        id: 3,
        name: "Peace Lily",
        price: 850,
        image: "../images/peacelilly1.jpg",
        quantity: 1
    },
    {
        id: 4,
        name: "Plant Stand",
        price: 1950,
        image: "../images/plantstand1.jpg",
        quantity: 1
    }
];

// Quantity controls
function increaseQuantity(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity++;
        updateCartTotal();
        renderCartItems();
    }
}

function decreaseQuantity(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        const item = cartItems[itemIndex];
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            // Remove item when quantity reaches 0
            cartItems.splice(itemIndex, 1);
        }
        updateCartTotal();
        renderCartItems();
        updateCartCount();
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Add to cart button functionality
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Check if the clicked element is a button or part of the cart controls
        if (e.target.closest('.add-to-cart')) {
            e.preventDefault();
            const productId = parseInt(card.dataset.id);
            const product = sampleProducts.find(p => p.id === productId);
            if (product) {
                addToCart({...product});
            }
        }
        // If it's not a cart control, allow the link to work normally
    });
});

// Initialize the page
updateCartCount();
updateCartTotal();

// Initialize the page
updateCartCount();
updateCartTotal(); 