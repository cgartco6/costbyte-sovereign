let cart = [];

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    updateCartCount();
    alert(`${name} added to sovereign cart.`);
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = cart.length;
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

// Expose for potential future checkout
window.addToCart = addToCart;
