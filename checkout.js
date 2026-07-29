// =====================================
// NILE CHECKOUT
// =====================================
const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

// ===============================
// DISPLAY ORDER
// ===============================

cart.forEach(item=>{

    total += item.price * item.quantity;

    checkoutItems.innerHTML += `

    <div class="checkout-item">

        <div>

            <strong>${item.name}</strong><br>

            Qty: ${item.quantity}

        </div>

        <div>

            $${item.price * item.quantity}

        </div>

    </div>

    `;

});

checkoutTotal.textContent = "$" + total;

// ===============================
// PLACE ORDER
// ===============================

document.getElementById("placeOrder").onclick = function () {

    if (cart.length === 0) {

        alert("Your cart is empty!");
        return;

    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const order = {

        id: "NILE-" + Date.now(),

        customer: {

            name: document.querySelector('input[placeholder="Full Name"]').value,

            email: document.querySelector('input[placeholder="Email Address"]').value,

            phone: document.querySelector('input[placeholder="Phone Number"]').value,

            country: document.querySelector('input[placeholder="Country"]').value,

            city: document.querySelector('input[placeholder="City"]').value,

            address: document.querySelector('input[placeholder="Street Address"]').value,

            postalCode: document.querySelector('input[placeholder="Postal Code"]').value

        },

        items: cart,

        total: total,

        status: "Pending",

        payment: "Unpaid",

        date: new Date().toLocaleString()

    };

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.setItem("lastOrder", JSON.stringify(order));

    localStorage.removeItem("cart");

    window.location.href = "order-success.html";

};