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

// Sample cart items
let cartItems = [];

// Update cart display
function updateCart() {
    // Remove any out-of-stock items from cart
    cartItems = cartItems.filter(item => item.inStock || (item.isPrebook && item.isAvailable));
    
    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <a href="#" class="item-left" onclick="navigateToProduct(${item.id}, event)">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toFixed(2)}</p>
                </div>
            </a>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
        </div>
    `).join('');
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `₹${total.toFixed(2)}`;
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

// Product Data
const products = [
    {
        id: 1,
        name: "Snake Plant",
        category: "plants",
        price: 450,
        rating: 0,
        image: "../images/snakeplant1.jpg",
        inStock: true,
        link: "../pages/snake-plant-index.html"
    },
    {
        id: 2,
        name: "Peace Lily",
        category: "plants",
        price: 850,
        rating: 0,
        image: "../images/peacelilly1.jpg",
        inStock: true,
        link: "../pages/peace-lilly-index.html"
    },
    {
        id: 3,
        name: "Monstera Deliciosa",
        category: "plants",
        price: 1200,
        rating: 0,
        image: "../images/monstera1.jpg",
        inStock: true,
        link: "../pages/monstera-index.html"
    },
    {
        id: 4,
        name: "Succulent Garden",
        category: "accessories",
        price: 950,
        rating:0,
        image: "../images/Succulent Garden1.jpg",
        inStock: true,
        link: "../pages/succulent-garden-index.html"
    },
    {
        id: 5,
        name: "Ceramic Pot",
        category: "accessories",
        price: 250,
        rating:0,
        image: "../images/ceramic-pot.jpg",
        inStock: false,
        link: "../pages/ceramic-pot-index.html"
    },
    {
        id: 6,
        name: "Plant Hanger",
        category: "decorations",
        price: 1000,
        rating:0,
        image: "../images/planthanger.jpg",
        inStock: true,
        link: "../pages/plant-hanger-index.html"
    },
    {
        id: 7,
        name: "Plant Stand",
        category: "decorations",
        price: 1500,
        rating: 0,
        image: "../images/plantstand1.jpg",
        inStock: true,
        link: "../pages/plant-stand-index.html"
    }
];

// Update prebookProducts array to include ratings
const prebookProducts = [
    {
        id: 101,
        name: "Monstera Obliqua Peru",
        category: "prebook",
        price: 4500,
        description: "Rare variety with unique leaf patterns",
        image: "../images/monstera-obliqa.jpg",
        timer: { hours: 0, minutes: 0, seconds: 20 },
        link: "../pages/monstera-oblique-index.html",
        rating: 0
    },
    {
        id: 102,
        name: "Philodendron Pink Princess",
        category: "prebook",
        price: 5500,
        description: "Stunning pink variegation",
        image: "../images/philodendron-pink.jpg",
        timer: { hours: 0, minutes: 0, seconds: 5 },
        link: "../pages/philaderon-index.html",
        rating: 0  
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const prebookGrid = document.getElementById('prebookGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const noResults = document.getElementById('noResults');

// Templates
const productTemplate = document.getElementById('productTemplate');
const prebookTemplate = document.getElementById('prebookTemplate');


const PREBOOK_TIME_OVER = 10; // in seconds

// Render star rating
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Render products
function renderProducts(productsToRender = products) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    productsToRender.forEach(product => {
        productsGrid.innerHTML += `
            <div class="product-card">
                <a href="${product.link}" class="product-content-link" onclick="navigateToProduct(${product.id}, event)">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <span class="product-badge" style="display: ${!product.inStock ? 'block' : 'none'}">
                            Out of Stock
                        </span>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-rating">
                            <div class="stars">${getStarRating(product.rating)}</div>
                        </div>
                        <div class="product-price">
                            <span class="current-price">₹${product.price.toFixed(2)}</span>
                        </div>
                    </div>
                </a>
                <button class="add-to-cart-btn" 
                    ${!product.inStock ? 'disabled' : ''}
                    onclick="handleAddToCart(this, ${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    ${!product.inStock ? 'Out of Stock' : '<i class="fas fa-shopping-cart"></i> Add to Cart'}
                </button>
            </div>
        `;
    });
}

// Render prebook products
function renderPrebookProducts(productsToRender = prebookProducts) {
    prebookGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const initialTimer = `${product.timer.hours}h ${product.timer.minutes}m ${product.timer.seconds}s`;
        
        prebookGrid.innerHTML += `
            <div class="prebook-card">
                <a href="${product.link}" class="product-content-link">
                    <div class="prebook-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="timer-badge">
                            <span class="timer">${initialTimer}</span>
                        </div>
                    </div>
                    <div class="prebook-info">
                        <h3 class="prebook-name">${product.name}</h3>
                        <div class="product-rating">
                            <div class="stars">${getStarRating(product.rating)}</div>
                        </div>
                        <p class="prebook-description">${product.description}</p>
                        <div class="prebook-price">₹${product.price.toFixed(2)}</div>
                </a>
                        <button class="prebook-btn" disabled>
                            <i class="fas fa-clock"></i>
                            Coming Soon
                        </button>
                    </div>
            </div>
        `;
    });

    // Set up timers after all cards are rendered
    productsToRender.forEach((product, index) => {
        const card = prebookGrid.children[index];
        const timerBadge = card.querySelector('.timer');
        const prebookBtn = card.querySelector('.prebook-btn');
        const productLink = card.querySelector('.product-content-link');
        
        // Initially disable the link
        productLink.style.pointerEvents = 'none';
        
        const timerCopy = {
            hours: product.timer.hours,
            minutes: product.timer.minutes,
            seconds: product.timer.seconds
        };
        
        updateTimer(timerCopy, timerBadge, prebookBtn, product, productLink);
    });
}

// Update search functionality
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Filter regular products
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    // Filter prebook products
    const filteredPrebook = prebookProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    // Render filtered results
    renderProducts(filteredProducts);
    
    // Show/hide prebook section based on results
    const prebookSection = document.querySelector('.prebook-section');
    if (filteredPrebook.length > 0) {
        prebookSection.style.display = 'block';
        renderPrebookProducts(filteredPrebook);
    } else if (searchTerm) {
        prebookSection.style.display = 'none';
    } else {
        prebookSection.style.display = 'block';
        renderPrebookProducts(prebookProducts);
    }
    
    // Show no results message if both sections are empty
    if (filteredProducts.length === 0 && filteredPrebook.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
});

// Filter and sort functionality
function filterAndSortProducts() {
    const category = categoryFilter.value;
    const prebookSection = document.querySelector('.prebook-section');
    
    if (category === 'prebook') {
        // Show only prebook section
        productsGrid.innerHTML = '';
        prebookSection.style.display = 'block';
        noResults.style.display = 'none';
        renderPrebookProducts();
        return;
    }
    
    let filteredProducts = [...products];
    
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
        prebookSection.style.display = 'none';
    } else {
        prebookSection.style.display = 'block';
        renderPrebookProducts();
    }
    
    // Sort
    const sortValue = sortFilter.value;
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
    }
    
    if (filteredProducts.length === 0 && category !== 'prebook') {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
    
    renderProducts(filteredProducts);
}

categoryFilter.addEventListener('change', filterAndSortProducts);
sortFilter.addEventListener('change', filterAndSortProducts);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderPrebookProducts();
});

// Modify the addToCart function to handle product additions
function addToCart(product) {
    if (!product.inStock) return; // Don't add out of stock items
    
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            inStock: true // Only in-stock items can be added
        });
    }
    
    cartDropdown.classList.add('active');
    updateCart();
}

// Add a notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add this CSS to shopstyles.css
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Add this to handle prebook products in cart
function addPrebookToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            isPrebook: true,
            isAvailable: true
        });
    }
    
    cartDropdown.classList.add('active');
    updateCart();
}

// Update the timer function to handle availability period
function updateTimer(timer, timerElement, button, product, productLink) {
    let { hours, minutes, seconds } = timer;
    let isAvailable = false;
    
    const countdown = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            if (!isAvailable) {
                isAvailable = true;
                timerElement.textContent = 'Available Now!';
                button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                button.classList.add('active');
                button.disabled = false;
                
                // Enable the link when available
                productLink.style.pointerEvents = 'auto';
                
                button.addEventListener('click', () => {
                    addPrebookToCart(product);
                    
                    button.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
                    button.classList.add('added');
                    
                    let availabilityTime = PREBOOK_TIME_OVER;
                    button.disabled = true;
                    
                    const availabilityCountdown = setInterval(() => {
                        availabilityTime--;
                        
                        if (availabilityTime <= 0) {
                            clearInterval(availabilityCountdown);
                            clearInterval(countdown);
                            
                            isAvailable = false;
                            timerElement.textContent = 'No Longer Available';
                            button.innerHTML = '<i class="fas fa-times"></i> Sold Out';
                            button.classList.remove('active', 'added');
                            button.disabled = true;
                            
                            // Remove only this specific prebook item from cart
                            cartItems = cartItems.filter(item => item.id !== product.id);
                            updateCart();
                        } else {
                            setTimeout(() => {
                                if (availabilityTime > 0) {
                                    button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                                    button.classList.remove('added');
                                    button.disabled = false;
                                }
                            }, 2000);
                        }
                    }, 1000);
                }, { once: true });
            }
            return;
        }

        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }
            }
        }

        timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

// Add this new function
function handleAddToCart(button, product) {
    addToCart(product);
    button.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
    button.classList.add('added');
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        button.classList.remove('added');
    }, 2000);
} 