let cart = JSON.parse(localStorage.getItem('sov_cart')) || [];

function updateCartUI() {
    const count = document.getElementById('cart-count');
    if (count) count.innerText = cart.length;
}

function addToCart(tier, price) {
    if (tier === 'FREE') {
        window.location.href = "intake.html?tier=FREE";
        return;
    }
    cart.push({ tier, price, id: Date.now() });
    localStorage.setItem('sov_cart', JSON.stringify(cart));
    updateCartUI();
    alert(`${tier} Package added to cart.`);
}

function renderCartItems() {
    const list = document.getElementById('cart-list');
    const totalEl = document.getElementById('cart-total');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = "<tr><td colspan='3' style='padding:20px; text-align:center;'>Empty Cart</td></tr>";
        totalEl.innerText = "0.00";
        return;
    }

    let total = 0;
    list.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <tr>
                <td style="padding:15px; border-bottom:1px solid #eee;">${item.tier}</td>
                <td style="padding:15px; border-bottom:1px solid #eee;">R${item.price}</td>
                <td style="padding:15px; border-bottom:1px solid #eee; text-align:right;">
                    <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">REMOVE</button>
                </td>
            </tr>`;
    }).join('');
    totalEl.innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('sov_cart', JSON.stringify(cart));
    renderCartItems();
    updateCartUI();
}

document.addEventListener('DOMContentLoaded', updateCartUI);
