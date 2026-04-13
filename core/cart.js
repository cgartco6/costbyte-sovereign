// COSTBYTE SOVEREIGN - INDUSTRIAL CART ENGINE
let cart = JSON.parse(localStorage.getItem('sovereign_cart')) || [];

const inventory = {
    'incubator': { name: 'Incubator Tier', price: 0 },
    'bronze': { name: 'Bronze Tier', price: 300 },
    'gold': { name: 'Gold Tier', price: 750 },
    'platinum': { name: 'Platinum Tier', price: 1500 },
    'design': { name: 'Design Studio', price: 500 },
    'branding': { name: 'Branding Studio', price: 450 },
    'marketing': { name: 'Marketing Studio', price: 600 },
    'aggressive': { name: 'Aggressive Engine', price: 1200 }
};

function addToCart(itemId) {
    const item = inventory[itemId];
    cart.push(item);
    localStorage.setItem('sovereign_cart', JSON.stringify(cart));
    updateCartUI();
    console.log(`[SYSTEM] Added ${item.name} to production queue.`);
}

function updateCartUI() {
    const countElement = document.getElementById('cart-count');
    if (countElement) countElement.innerText = cart.length;
}

// Initialize UI on load
document.addEventListener('DOMContentLoaded', updateCartUI);
