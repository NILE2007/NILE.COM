// ======================================
// NILE ADMIN DASHBOARD
// ======================================

// ----------------------
// Local Storage
// ----------------------

let products = JSON.parse(localStorage.getItem("products")) || [];

// ----------------------
// Elements
// ----------------------

const table = document.getElementById("productTable");

const totalProducts = document.getElementById("totalProducts");
const pendingProducts = document.getElementById("pendingProducts");
const approvedProducts = document.getElementById("approvedProducts");
const sellerCount = document.getElementById("sellerCount");

// ----------------------
// Start
// ----------------------

loadDashboard();

// ----------------------
// Dashboard
// ----------------------

function loadDashboard() {

    products = JSON.parse(localStorage.getItem("products")) || [];

    updateCards();

  
}

// ----------------------
// Cards
// ----------------------

function updateCards() {

    totalProducts.textContent = products.length;

    pendingProducts.textContent =
        products.filter(product => product.status === "Pending").length;

    approvedProducts.textContent =
        products.filter(product => product.status === "Approved").length;

    const sellers = [...new Set(products.map(product => product.seller))];

    sellerCount.textContent = sellers.length;

}

// ----------------------
// Display Products
// ----------------------

function displayProducts() {

    table.innerHTML = "";

    if (products.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center;">
                No products submitted yet.
            </td>
        </tr>
        `;

        return;

    }

    products.forEach((product, index) => {

        table.innerHTML += `

        <tr>

            <td>

                <img
                src="${product.image}"
                class="product-img">

            </td>

            <td>${product.name}</td>

            <td>${product.seller}</td>

            <td>$${product.price}</td>

            <td>

                <span class="status ${product.status.toLowerCase()}">

                    ${product.status}

                </span>

            </td>

            <td class="actions">

                <button
                class="approve-btn"
                onclick="approveProduct(${index})">

                    ✓

                </button>

                <button
                class="reject-btn"
                onclick="rejectProduct(${index})">

                    ✕

                </button>

                <button
                class="delete-btn"
                onclick="deleteProduct(${index})">

                    🗑

                </button>

            </td>

        </tr>

        `;

    });

}

// ----------------------
// Approve
// ----------------------

function approveProduct(index) {

    products[index].status = "Approved";

    saveProducts();

}

// ----------------------
// Reject
// ----------------------

function rejectProduct(index) {

    products[index].status = "Rejected";

    saveProducts();

}

// ----------------------
// Delete
// ----------------------

function deleteProduct(index) {

    if (!confirm("Delete this product?")) return;

    products.splice(index, 1);

    saveProducts();

}

// ----------------------
// Save
// ----------------------

function saveProducts() {

    localStorage.setItem("products", JSON.stringify(products));

    loadDashboard();

}
// =====================================
// SELLER APPLICATIONS
// =====================================

loadSellerApplications();

function loadSellerApplications() {

    const table = document.getElementById("sellerApplicationsTable");

    if (!table) return;

    let applications =
        JSON.parse(localStorage.getItem("sellerApplications")) || [];

    table.innerHTML = "";

    if (applications.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="6">No seller applications.</td>
        </tr>
        `;

        return;
    }

    applications.forEach((app, index) => {

        table.innerHTML += `

        <tr>

            <td>${app.business}</td>

            <td>${app.owner}</td>

            <td>${app.email}</td>

            <td>${app.country}</td>

            <td>${app.status}</td>

            <td>

                <button onclick="approveSeller(${index})">
                    Approve
                </button>

                <button onclick="rejectSeller(${index})">
                    Reject
                </button>

            </td>

        </tr>

        `;

    });

}
function approveSeller(index) {

    let applications = JSON.parse(localStorage.getItem("sellerApplications")) || [];
    let sellers = JSON.parse(localStorage.getItem("sellers")) || [];

    const app = applications[index];

    app.status = "Approved";

    sellers.push({

        id: Date.now(),

        business: app.business,

        owner: app.owner,

        email: app.email,

        password: app.password,

        phone: app.phone,

        country: app.country,

        city: app.city

    });

    localStorage.setItem("sellers", JSON.stringify(sellers));
    localStorage.setItem("sellerApplications", JSON.stringify(applications));

    alert("Seller approved successfully!");

    loadSellerApplications();

}
function rejectSeller(index) {

    let applications =
        JSON.parse(localStorage.getItem("sellerApplications")) || [];

    applications[index].status = "Rejected";

    localStorage.setItem(
        "sellerApplications",
        JSON.stringify(applications)
    );

    loadSellerApplications();

    alert("Seller rejected.");

}