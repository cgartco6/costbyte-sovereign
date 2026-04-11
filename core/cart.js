/**
 * Sovereign Stable Cart Engine
 */

const items = [
    // Tiers
    { id: 'BRONZE', name: 'Bronze Package (Tier)', price: 300, img: 'assets/packages/bronze.png', type: 'tier' },
    { id: 'PLATINUM', name: 'Platinum Suite (Tier)', price: 1500, img: 'assets/packages/platinum.png', type: 'tier' },
    // Gear
    { id: 'S1', name: 'Stealth XL Sneaker Cocoon', price: 750, img: 'assets/products/sneaker_bag.png', type: 'gear' },
    { id: 'S2', name: 'Sovereign Tech Sling', price: 450, img: 'assets/products/sling.png', type: 'gear' }
];

let cart = JSON.parse(localStorage.getItem('sov_cart_v3')) || [];

function updateUI() {
    // Update Cart Count
    const count = document.getElementById('cart-count');
    if (count) count.innerText = cart.length;

    // Render Product Grid (Shop page only)
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.innerHTML = items.filter(i => i.type === 'gear').map(p => `
            <div class="card">
                <div style="background:#eee; height:200px; margin-bottom:15px; overflow:hidden;">
                    <img src="${p.img}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <h3>${p.name}</h3>
                <h2 class="price">R${p.price.toFixed(2)}</h2>
                <button onclick="addToCart('${p.id}')" class="btn-gold" style="width:100%;">ADD TO CART</button>
            </div>
        `).join('');
    }
}

function addToCart(id) {
    const item = items.find(p => p.id === id);
    if (!item) return;

    cart.push(item);
    localStorage.setItem('sov_cart_v3', JSON.stringify(cart));
    updateUI();
    console.log(`Cart Updated: ${item.name} added.`);
}

function renderCartItems() {
    // Render Cart List (Cart page only)
    const list = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = '<p style="text-align:center; padding:40px;">Your cart is empty.</p>';
        if (totalDisplay) totalDisplay.innerText = '0.00';
        return;
    }

    let total = 0;
    list.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div style="display:flex; justify-content:space-between; padding:15px 0; border-bottom:1px solid #eee; align-items:center;">
                <div>
                    <strong>${item.name}</strong><br>
                    R${item.price.toFixed(2)}
                </div>
                <button onclick="removeFromCart(${index})" style="color:#d9534f; background:none; border:none; cursor:pointer; font-size:0.8rem;">REMOVE</button>
            </div>
        `;
    }).join('');

    if (totalDisplay) totalDisplay.innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('sov_cart_v3', JSON.stringify(cart));
    renderCartItems();
    updateUI();
}

// Ensure UI updates on load
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    if (document.getElementById('cart-items')) renderCartItems();
});
