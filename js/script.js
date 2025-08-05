
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }
    
    addItem(productId, productName, price) {
        this.items.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
        this.saveCart();
        this.updateCartCount();
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
}

const cart = new Cart();


document.addEventListener('DOMContentLoaded', function() {

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});