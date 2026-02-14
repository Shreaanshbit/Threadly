// ===========================
// THREADLY E-COMMERCE JAVASCRIPT
// Interactive functionality for all pages
// ===========================

// ===========================
// CART FUNCTIONALITY
// ===========================

let cart = [
    { id: 1, name: "Premium Wool Blend Coat", price: 129, quantity: 1, image: "linear-gradient(135deg, #2F3E46 0%, #354F52 100%)" },
    { id: 2, name: "Organic Cotton Essential Tee", price: 35, quantity: 2, image: "linear-gradient(135deg, #CAD2C5 0%, #fff 100%)" },
    { id: 3, name: "Sprint Pro Running Shoes", price: 89, quantity: 1, image: "linear-gradient(135deg, #84A98C 0%, #52796F 100%)" }
];

// Update cart count in navbar
function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounts.forEach(count => {
        count.textContent = totalItems;
    });
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 8.00;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Update item quantity
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
        
        // Update UI
        const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);
        if (itemElement) {
            const input = itemElement.querySelector('.qty-input');
            if (input) input.value = item.quantity;
        }
        
        updateCartCount();
        updateCartTotals();
    }
}

// Remove item from cart
function removeItem(itemId) {
    const itemIndex = cart.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
        const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);
        if (itemElement) {
            itemElement.style.transform = 'translateX(-100%)';
            itemElement.style.opacity = '0';
            setTimeout(() => {
                cart.splice(itemIndex, 1);
                itemElement.remove();
                updateCartCount();
                updateCartTotals();
                
                // Show notification
                showNotification('Item removed from cart');
            }, 300);
        }
    }
}

// Add to cart function
function addToCart() {
    const selectedSize = document.querySelector('.size-option.active');
    const selectedColor = document.querySelector('.color-option.active');
    
    if (!selectedSize) {
        showNotification('Please select a size', 'error');
        return;
    }
    
    // Animation effect
    const btn = document.querySelector('.add-to-cart-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
        showNotification('Added to cart! 🎉', 'success');
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
            
            // Bounce animation
            cartCount.style.animation = 'bounce 0.5s';
            setTimeout(() => {
                cartCount.style.animation = '';
            }, 500);
        }
    }, 150);
}

// ===========================
// PRODUCT PAGE INTERACTIONS
// ===========================

// Color selector
document.addEventListener('DOMContentLoaded', function() {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const colorName = this.getAttribute('data-color');
            const selectedColorEl = document.getElementById('selectedColor');
            if (selectedColorEl) selectedColorEl.textContent = colorName;
        });
    });
    
    // Size selector
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Thumbnail gallery
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image
            if (mainImage) {
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.innerHTML = this.innerHTML;
                    mainImage.firstElementChild.style.height = '500px';
                    mainImage.style.opacity = '1';
                }, 200);
            }
        });
    });
    
    // Wishlist button
    const wishlistBtns = document.querySelectorAll('.wishlist-btn, .wishlist-btn-large');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.style.transform = 'scale(1.2)';
            const svg = this.querySelector('svg path');
            if (svg) {
                svg.setAttribute('fill', 'currentColor');
            }
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            showNotification('Added to wishlist ❤️', 'success');
        });
    });
    
    // Initialize cart
    updateCartCount();
    updateCartTotals();
});

// ===========================
// CHECKOUT FUNCTIONS
// ===========================

function completeOrder() {
    const form = document.getElementById('checkoutForm');
    if (form && !form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Show loading state
    const btn = document.querySelector('.complete-order-btn');
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<div class="spinner"></div> Processing...';
        btn.disabled = true;
        
        // Simulate processing
        setTimeout(() => {
            window.location.href = 'confirmation.html';
        }, 1500);
    }
}

// ===========================
// ADMIN LOGIN
// ===========================

function handleAdminLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    
    // Simple validation (in production, this would be server-side)
    if (email && password) {
        const btn = event.target.querySelector('.login-btn');
        btn.innerHTML = '<div class="spinner"></div> Authenticating...';
        btn.disabled = true;
        
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 1500);
    } else {
        showNotification('Please enter your credentials', 'error');
    }
}

// ===========================
// FILTER & SORT FUNCTIONALITY
// ===========================

// Sort products
const sortSelect = document.getElementById('sortSelect');
if (sortSelect) {
    sortSelect.addEventListener('change', function() {
        const productsGrid = document.querySelector('.grid');
        const products = Array.from(productsGrid.querySelectorAll('.product-card'));
        
        products.sort((a, b) => {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            
            switch(this.value) {
                case 'Price: Low to High':
                    return priceA - priceB;
                case 'Price: High to Low':
                    return priceB - priceA;
                default:
                    return 0;
            }
        });
        
        // Animate and reorder
        productsGrid.style.opacity = '0';
        setTimeout(() => {
            products.forEach(product => productsGrid.appendChild(product));
            productsGrid.style.opacity = '1';
        }, 200);
    });
}

// Reset filters
const resetBtn = document.querySelector('.reset-btn');
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        document.querySelectorAll('.filter-option input').forEach(input => {
            input.checked = false;
        });
        showNotification('Filters reset');
    });
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 2rem;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            font-weight: 500;
        }
        .notification-success .notification-content::before {
            color: #28a745;
        }
        .notification-error .notification-content::before {
            color: #dc3545;
        }
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card, .stat-card, .dashboard-card').forEach(card => {
    observer.observe(card);
});

// ===========================
// FORM VALIDATION
// ===========================

const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            showNotification('Please fill in all required fields', 'error');
        }
        this.classList.add('was-validated');
    });
});

// ===========================
// SMOOTH SCROLLING
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===========================
// LOADING STATES
// ===========================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add subtle entrance animations
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            opacity: 0;
        }
        body.loaded {
            opacity: 1;
            transition: opacity 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
});

// ===========================
// MOBILE MENU TOGGLE (for future enhancement)
// ===========================

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });
}

console.log('🎨 Threadly E-Commerce Platform Loaded');
console.log('✓ Cart System Active');
console.log('✓ Interactive Components Ready');
console.log('✓ Animations Enabled');
