// Toggle mobile menu
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
    profileDropdown.style.opacity = profileDropdown.style.opacity === '1' ? '0' : '1';
    profileDropdown.style.visibility = profileDropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
    profileDropdown.style.transform = profileDropdown.style.transform === 'translateY(0px)' ? 'translateY(10px)' : 'translateY(0px)';
});

// Close profile dropdown when clicking outside
document.addEventListener('click', () => {
    profileDropdown.style.opacity = '0';
    profileDropdown.style.visibility = 'hidden';
    profileDropdown.style.transform = 'translateY(10px)';
});

// Cart functionality
const cartBtn = document.querySelector('.cart-btn');
const cartDropdown = document.querySelector('.cart-dropdown');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');

const shop_button = document.querySelector(".shop-now");
shop_button.addEventListener('click',()=>{
    location.href="https://vai62050.github.io/shop";
})

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
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
        </div>
    `).join('');
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Quantity controls
function increaseQuantity(id) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

function decreaseQuantity(id) {
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
cartBtn.addEventListener('click', () => {
    cartDropdown.classList.add('active');
    updateCart();
});

closeCart.addEventListener('click', () => {
    cartDropdown.classList.remove('active');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartBtn.contains(e.target) && 
        !cartDropdown.contains(e.target) && 
        cartDropdown.classList.contains('active')) {
        cartDropdown.classList.remove('active');
    }
});

// Prevent clicks inside dropdowns from closing them
profileDropdown.addEventListener('click', (e) => e.stopPropagation());
cartDropdown.addEventListener('click', (e) => e.stopPropagation());

// Initialize cart
updateCart(); 