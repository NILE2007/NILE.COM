// ===============================
// MY ORDERS
// ===============================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const orders =
JSON.parse(localStorage.getItem("orders")) || [];

const container =
document.getElementById("ordersContainer");

if (!currentUser || currentUser.role !== "customer") {

    container.innerHTML = `
        <h3>Please log in as a customer.</h3>
    `;

} else {

    const myOrders = orders.filter(order =>

        order.customer.email === currentUser.email

    );

    if (myOrders.length === 0) {

        container.innerHTML = `
            <h3>You haven't placed any orders yet.</h3>
        `;

    } else {

        myOrders.forEach(order => {

            container.innerHTML += `

            <div class="order-card">

                <h3>${order.id}</h3>

                <p><strong>Date:</strong> ${order.date}</p>

                <p><strong>Status:</strong> ${order.status}</p>

                <p><strong>Payment:</strong> ${order.payment}</p>

                <h2>$${order.total}</h2>

            </div>

            `;

        });

    }

}