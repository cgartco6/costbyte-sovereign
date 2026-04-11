let cart = JSON.parse(localStorage.getItem('sov_cart_v4')) || [];

function updateCartUI() {
    const count = document.getElementById('cart-count');
    if (count) count.innerText = cart.length;
}

function addToCart(item, price) {
    if (item === 'INCUBATOR') {
        window.location.href = "intake.html?tier=FREE";
        return;
    }
    cart.push({ item, price, id: Date.now() });
    localStorage.setItem('sov_cart_v4', JSON.stringify(cart));
    updateCartUI();
    alert(`${item} added to industrial cart.`);
}

function renderCartItems() {
    const list = document.getElementById('cart-list');
    const totalEl = document.getElementById('cart-total');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = "<tr><td colspan='3' style='padding:40px; text-align:center;'>Inventory Empty</td></tr>";
        totalEl.innerText = "0.00";
        return;
    }

    let total = 0;
    list.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding:20px;">${item.item}</td>
                <td style="padding:20px;">R${item.price.toFixed(2)}</td>
                <td style="padding:20px; text-align:right;">
                    <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer; font-weight:bold;">[REMOVE]</button>
                </td>
            </tr>`;
    }).join('');
    totalEl.innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('sov_cart_v4', JSON.stringify(cart));
    renderCartItems();
    updateCartUI();
}

document.addEventListener('DOMContentLoaded', updateCartUI);
