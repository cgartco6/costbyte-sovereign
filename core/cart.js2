let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
}

function showCart() {
    const modal = document.getElementById('cart-modal');
    const container = document.getElementById('cart-items');
    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        const qty = item.qty || 1;
        const itemTotal = item.price * qty;
        total += itemTotal;
        html += `
            <div style="display:flex;justify-content:space-between;margin:1rem 0;">
                <div>${item.name} × ${qty}</div>
                <div>R${itemTotal} 
                    <span onclick="removeFromCart(${index})" style="color:#ff6666;cursor:pointer;margin-left:1rem;">Remove</span>
                </div>
            </div>`;
    });
    container.innerHTML = html || '<p>Your cart is empty</p>';
    document.getElementById('modal-cart-count').textContent = cart.length;
    document.getElementById('cart-total').textContent = `R${total}`;
    modal.style.display = 'flex';
}

function hideCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
    updateCartCount();
}

function goToCheckout() {
    hideCart();
    window.location.href = 'checkout.html';
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
}

// Expose functions
window.addToCart = addToCart;
window.showCart = showCart;
window.hideCart = hideCart;
window.removeFromCart = removeFromCart;
window.goToCheckout = goToCheckout;
window.getCartTotal = getCartTotal;
