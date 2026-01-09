// Product Management System with CRUD Operations

// Sample product images from web
const sampleProducts = [
    {
        id: Date.now() + 1,
        name: "Fresh Milk",
        category: "Milk",
        price: 2.00,
        description: "Pure, fresh whole milk from local farms. Rich in calcium and protein.",
        imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"
    },
    {
        id: Date.now() + 2,
        name: "Curd",
        category: "Curd",
        price: 1.00,
        description: "Creamy, tangy curd made from fresh milk. Perfect for your daily nutrition.",
        imageUrl: "https://media.istockphoto.com/id/1146165120/photo/natural-homemade-plain-organic-yogurt-in-wood-bowl-on-wood-texture-background-copy-space.jpg?s=2048x2048&w=is&k=20&c=vtDv10CW3a8xW_Deq0TVs0RIA5RN3wDVTNNJ-e3sqJ4="
    },
    {
        id: Date.now() + 3,
        name: "Sweet Lassi",
        category: "Lassy",
        price: 3.00,
        description: "Refreshing sweet lassi with a hint of cardamom. Cool and delicious.",
        imageUrl: "https://media.istockphoto.com/id/1008799838/photo/image-of-a-glass-of-lassi-made-from-milk-curd.jpg?s=2048x2048&w=is&k=20&c=Ah-8ASmCxTCJKHscpNUQC-2hMkWzVJNfJgQcIT38boE="
    },
    {
        id: Date.now() + 4,
        name: "Badam Juice",
        category: "Milk Juice",
        price: 2.00,
        description: "Delicious badam-flavored milk juice. A perfect blend of almonds and milk.",
        imageUrl: "https://media.istockphoto.com/id/985927146/photo/badam-haldi-milk-ubtan-or-ayurvedic-face-mask%C3%A2s-ingredients-with-ready-face-pack-of-almond.jpg?s=2048x2048&w=is&k=20&c=DW9bC5UGM8iTx8ZTPwdZiOvJfsYcgmYS_3FFtP1qn18="
    },
    {
        id: Date.now() + 5,
        name: "Fresh Butter",
        category: "Butter",
        price: 2.00,
        description: "Pure, creamy butter churned from fresh cream. Rich and flavorful.",
        imageUrl: "https://media.istockphoto.com/id/906372070/photo/butter.jpg?s=2048x2048&w=is&k=20&c=izUki_X8lUHzpMDNv-ED7ZG-BAQV_dJVoXKo5HjQJeA="
    }
];

// Initialize localStorage with sample data - always update to latest
function initializeData() {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f06d5367-4eba-49cf-9d19-1510f29f3c34',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:48',message:'initializeData entry',data:{hasLocalStorage:!!localStorage.getItem('dairyProducts'),sampleProductsCount:sampleProducts.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    // Always update localStorage with latest sampleProducts to ensure correct data
    localStorage.setItem('dairyProducts', JSON.stringify(sampleProducts));
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f06d5367-4eba-49cf-9d19-1510f29f3c34',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:52',message:'localStorage updated',data:{productsCount:sampleProducts.length,productNames:sampleProducts.map(p=>p.name)},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
}

// Get products from localStorage
function getProducts() {
    const products = localStorage.getItem('dairyProducts');
    const parsed = products ? JSON.parse(products) : [];
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f06d5367-4eba-49cf-9d19-1510f29f3c34',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:78',message:'getProducts called',data:{productsCount:parsed.length,productNames:parsed.map(p=>p.name),hasButter:!!parsed.find(p=>p.category==='Butter')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    return parsed;
}

// Display Products
function displayProducts(category = 'all') {
    const products = getProducts();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f06d5367-4eba-49cf-9d19-1510f29f3c34',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:62',message:'displayProducts entry',data:{category,productsCount:products.length,productNames:products.map(p=>p.name),butterProduct:products.find(p=>p.category==='Butter'||p.name.includes('Butter'))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    const productsGrid = document.getElementById('productsGrid');
    
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(p => p.category === category);
    }

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h3>No products found</h3>
                <p>Add some products using the Admin Panel!</p>
            </div>
        `;
        return;
    }

    // #region agent log
    const butterProduct = filteredProducts.find(p => p.category === 'Butter' || p.name.includes('Butter'));
    if (butterProduct) {
        fetch('http://127.0.0.1:7242/ingest/f06d5367-4eba-49cf-9d19-1510f29f3c34',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:85',message:'butter product found',data:{butterName:butterProduct.name,butterImageUrl:butterProduct.imageUrl,butterId:butterProduct.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    }
    // #endregion

    productsGrid.innerHTML = filteredProducts.map(product => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/f06d5367-4eba-49cf-9d19-1510f29f3c34',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:90',message:'rendering product',data:{productName:product.name,imageUrl:product.imageUrl,category:product.category},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        return `
        <div class="product-card">
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image" 
                 onerror="handleImageError(this, '${product.name}', '${product.imageUrl}')"
                 onload="handleImageLoad('${product.name}', '${product.imageUrl}')">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description || 'No description available.'}</p>
                <div class="product-footer">
                    <div class="product-price">₹${product.price.toFixed(2)}</div>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// Image load handlers for debugging
function handleImageError(img, productName, imageUrl) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f06d5367-4eba-49cf-9d19-1510f29f3c34',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:110',message:'image load error',data:{productName,imageUrl,fallbackUsed:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    img.src = 'https://via.placeholder.com/400x250?text=No+Image';
}

function handleImageLoad(productName, imageUrl) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f06d5367-4eba-49cf-9d19-1510f29f3c34',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:116',message:'image load success',data:{productName,imageUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
}

// Category Filter
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Get category and filter products
            const category = btn.getAttribute('data-category');
            displayProducts(category);
        });
    });
}

// Cart Operations

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('dairyCart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('dairyCart', JSON.stringify(cart));
}

// Add product to cart
function addToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Product not found!');
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartUI();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Remove product from cart
function removeFromCart(productId) {
    const cart = getCart();
    const filteredCart = cart.filter(item => item.id !== productId);
    saveCart(filteredCart);
    updateCartUI();
}

// Update product quantity in cart
function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
        updateCartUI();
    }
}

// Calculate cart total
function calculateCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart UI (badge and display)
function updateCartUI() {
    const cart = getCart();
    const cartBadge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    
    displayCartItems();
}

// Display cart items
function displayCartItems() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const payButton = document.getElementById('payButton');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <p style="color: var(--text-light); font-size: 0.9rem;">Add some products to get started!</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        payButton.disabled = true;
        payButton.style.opacity = '0.5';
        payButton.style.cursor = 'not-allowed';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image"
                 onerror="this.src='https://via.placeholder.com/100?text=No+Image'">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="cart-item-price">₹${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">
                ₹${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})" title="Remove">×</button>
        </div>
    `).join('');

    const total = calculateCartTotal();
    cartTotal.textContent = total.toFixed(2);
    payButton.disabled = false;
    payButton.style.opacity = '1';
    payButton.style.cursor = 'pointer';
}

// Setup cart toggle
function setupCart() {
    const cartToggle = document.getElementById('cartToggle');
    const cartSection = document.getElementById('cartSection');
    const closeCart = document.getElementById('closeCart');

    cartToggle.addEventListener('click', () => {
        cartSection.classList.add('active');
        displayCartItems();
    });

    closeCart.addEventListener('click', () => {
        cartSection.classList.remove('active');
    });

    // Close cart when clicking outside
    cartSection.addEventListener('click', (e) => {
        if (e.target === cartSection) {
            cartSection.classList.remove('active');
        }
    });
}

// UPI Payment
function initiateUPIPayment() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = calculateCartTotal();
    const upiId = '8792439200@ybl';
    const merchantName = 'Fresh Milk Dairy';
    const transactionNote = `Payment for ${cart.length} item(s) - Fresh Milk Dairy`;

    // Create UPI payment URL
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${total.toFixed(2)}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    // Try to open UPI app
    window.location.href = upiUrl;

    // Fallback: Show UPI ID if app doesn't open
    setTimeout(() => {
        if (confirm(`If payment app didn't open, please pay ₹${total.toFixed(2)} to:\n\nUPI ID: ${upiId}\n\nClick OK to copy UPI ID to clipboard.`)) {
            navigator.clipboard.writeText(upiId).then(() => {
                alert('UPI ID copied to clipboard!');
            }).catch(() => {
                alert(`UPI ID: ${upiId}\nAmount: ₹${total.toFixed(2)}`);
            });
        }
    }, 1000);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize App
function init() {
    initializeData();
    displayProducts();
    setupCategoryFilters();
    setupCart();
    updateCartUI();
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
