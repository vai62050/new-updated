document.addEventListener('DOMContentLoaded', function() {
    // Sample order data - in a real application, this would come from a database
    const orders = [
        {
            id: 'FH123456790',
            status: 'pending',
            items: [
                { name: 'Money Plant', price: 249, image: '../../assets/images/pic1.jpg' }
            ],
            total: 299,
            date: '2024-02-11'
        },
        {
            id: 'FH123456791',
            status: 'cancelled',
            items: [
                { name: 'Bamboo Plant', price: 199, image: '../../assets/images/pic2.jpg' }
            ],
            total: 199,
            date: '2024-02-10'
        },
        {
            id: 'FH123456792',
            status: 'processing',
            items: [
                { name: 'Snake Plant', price: 399, image: '../../assets/images/snake_plant.webp' },
                { name: 'Rose Plant', price: 299, image: '../../assets/images/pic3.jpg' }
            ],
            total: 748,
            date: '2024-02-09'
        },
        {
            id: 'FH123456793',
            status: 'completed',
            items: [
                { name: 'Aloe Vera', price: 199, image: '../../assets/images/pic1.jpg' }
            ],
            total: 199,
            date: '2024-02-08'
        }
    ];

    function createOrderCard(order) {
        const card = document.createElement('div');
        card.className = 'order-card';
        
        const statusClass = `status-${order.status}`;
        const statusText = order.status.charAt(0).toUpperCase() + order.status.slice(1);

        let actionButton = '';
        switch(order.status) {
            case 'pending':
                actionButton = `
                    <button class="action-button track-button">
                        <i class="fas fa-clock"></i> Payment Pending
                    </button>`;
                break;
            case 'processing':
                actionButton = `
                    <button class="action-button track-button">
                        <i class="fas fa-truck"></i> Track Order
                    </button>`;
                break;
            case 'completed':
                actionButton = `
                <button class="action-button review-button" onclick="writeReview('${order.id}')">
                        <i class="fas fa-star"></i> Write Review
                    </button>`;
                break;
            case 'cancelled':
                actionButton = `
                    <button class="action-button review-button" onclick="reorder('${order.id}')">
                        <i class="fas fa-redo"></i> Order Again
                    </button>`;
                break;
        }

        card.innerHTML = `
            <div class="order-header">
                <div class="order-id">Order #${order.id}</div>
                <div class="order-status ${statusClass}">${statusText}</div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-price">₹${item.price}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <div class="order-total">Total: ₹${order.total}</div>
                <div class="action-buttons">
                    ${actionButton}
                </div>
            </div>
        `;
        return card;
    }

    function writeReview(orderId) {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            // In a real application, this would open a review form
            alert(`Write a review for your order (${order.items.map(item => item.name).join(', ')})`);
        }
    }

    function reorder(orderId) {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            alert(`Reordering items: ${order.items.map(item => item.name).join(', ')}`);
        }
    }

    // Filter functionality
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter orders
            displayOrders(button.dataset.status);
        });
    });

    function displayOrders(filterStatus = 'all') {
        const ordersList = document.getElementById('ordersList');
        ordersList.innerHTML = '';

        const filteredOrders = orders.filter(order => {
            if (filterStatus === 'all') return true;
            return order.status === filterStatus;
        });

        if (filteredOrders.length === 0) {
            ordersList.innerHTML = `
                <div class="no-orders">
                    <i class="fas fa-box-open"></i>
                    <p>No ${filterStatus === 'all' ? '' : filterStatus} orders found</p>
                </div>
            `;
            return;
        }

        filteredOrders.forEach(order => {
            ordersList.appendChild(createOrderCard(order));
        });
    }

    // Profile dropdown functionality
    const profileBtn = document.querySelector('.profile-btn');
    const dropdownContent = document.querySelector('.dropdown-content');

    profileBtn.addEventListener('click', () => {
        dropdownContent.classList.toggle('dropdown-active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
            dropdownContent.classList.remove('dropdown-active');
        }
    });

    // Initial display of all orders
    displayOrders('all');
});