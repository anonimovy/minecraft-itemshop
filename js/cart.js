class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.loadCart();
        this.updateCartCount();
    }
    
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }
    
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            item.quantity = quantity;
            this.saveCart();
        }
    }
    
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
    }
    
    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
    
    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }
    
    loadCart() {
        const cartItemsElement = document.getElementById('cartItems');
        const subtotalElement = document.getElementById('subtotal');
        const totalElement = document.getElementById('total');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        if (!cartItemsElement) return;
        
        if (this.items.length === 0) {
            cartItemsElement.innerHTML = `
                <div class="text-center py-5">
                    <p class="text-muted">Twój koszyk jest pusty</p>
                    <a href="shop.html" class="btn btn-primary">Przejdź do sklepu</a>
                </div>
            `;
            subtotalElement.textContent = '0.00 zł';
            totalElement.textContent = '0.00 zł';
            checkoutBtn.disabled = true;
            return;
        }
        
        cartItemsElement.innerHTML = this.items.map(item => `
            <div class="row mb-3 align-items-center cart-item" data-id="${item.id}">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-4">
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="text-muted mb-0">${item.category}</p>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <button class="btn btn-outline-secondary minus-btn" type="button">-</button>
                        <input type="number" class="form-control text-center quantity-input" value="${item.quantity}" min="1">
                        <button class="btn btn-outline-secondary plus-btn" type="button">+</button>
                    </div>
                </div>
                <div class="col-md-2 text-end">
                    <span class="fw-bold">${(item.price * item.quantity).toFixed(2)} zł</span>
                </div>
                <div class="col-md-1 text-end">
                    <button class="btn btn-link text-danger remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        const total = this.getTotal();
        subtotalElement.textContent = total.toFixed(2) + ' zł';
        totalElement.textContent = total.toFixed(2) + ' zł';
        checkoutBtn.disabled = false;
        
        // Dodaj event listeners do przycisków
        document.querySelectorAll('.minus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
                const input = e.target.closest('.input-group').querySelector('.quantity-input');
                let quantity = parseInt(input.value);
                
                if (quantity > 1) {
                    quantity--;
                    input.value = quantity;
                    this.updateQuantity(itemId, quantity);
                    this.loadCart();
                }
            });
        });
        
        document.querySelectorAll('.plus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
                const input = e.target.closest('.input-group').querySelector('.quantity-input');
                let quantity = parseInt(input.value);
                
                quantity++;
                input.value = quantity;
                this.updateQuantity(itemId, quantity);
                this.loadCart();
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
                const quantity = parseInt(e.target.value);
                
                if (quantity > 0) {
                    this.updateQuantity(itemId, quantity);
                    this.loadCart();
                } else {
                    e.target.value = 1;
                }
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
                this.removeItem(itemId);
                this.loadCart();
            });
        });
    }
}

// Inicjalizacja koszyka
const cart = new Cart();

// Funkcja do dodawania produktów do koszyka (używana na stronie produktów)
function addToCart(product) {
    cart.addItem(product);
    
    // Pokazuj powiadomienie
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '11';
    toast.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-success text-white">
                <strong class="me-auto">Sukces</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Produkt został dodany do koszyka!
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}