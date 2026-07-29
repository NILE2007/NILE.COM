// ======================================
// NILE SELLER DASHBOARD
// ======================================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let products = JSON.parse(localStorage.getItem("products")) || [];

// Redirect if not logged in
if (!currentUser) {
    window.location.href = "login.html";
}

// Welcome Message
document.getElementById("sellerName").textContent = currentUser.name;

// Seller Products Only
const sellerProducts = products.filter(
    product => product.seller === currentUser.name
);

// Dashboard Cards
document.getElementById("productCount").textContent =
sellerProducts.length;

document.getElementById("pendingCount").textContent =
sellerProducts.filter(p => p.status === "Pending").length;

document.getElementById("approvedCount").textContent =
sellerProducts.filter(p => p.status === "Approved").length;

const pageContent = document.getElementById("pageContent");

// Show dashboard first
showDashboard();
function showDashboard(){

pageContent.innerHTML=`

<h2>Recent Products</h2>

<div class="product-grid">

${
sellerProducts.length===0

?

`<p>No products yet.</p>`

:

sellerProducts.map((product,index)=>`

<div class="product-card">

<img src="${product.image}">

<div class="product-info">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<span class="status ${product.status.toLowerCase()}">

${product.status}

</span>

<div class="btn-group">

<button
class="btn edit"
onclick="editProduct(${index})">

Edit

</button>

<button
class="btn delete"
onclick="deleteProduct(${index})">

Delete

</button>

</div>

</div>

</div>

`).join("")

}

</div>

`;

}
function deleteProduct(index){

if(!confirm("Delete this product?")) return;

const id=sellerProducts[index].id;

products=products.filter(product=>product.id!==id);

localStorage.setItem("products",JSON.stringify(products));

location.reload();

}
document.getElementById("logoutBtn").onclick=function(){

localStorage.removeItem("currentUser");

window.location="login.html";

};

function saveProduct(){

const name=document.getElementById("name").value;

const price=document.getElementById("price").value;

const category=document.getElementById("category").value;

const description=document.getElementById("description").value;

const image=document.getElementById("imageInput").files[0];

if(!name||!price||!category||!description||!image){

alert("Please complete every field.");

return;

}

const reader=new FileReader();

reader.onload=function(e){

products.push({

id:Date.now(),

seller:currentUser.name,

name,

price:Number(price),

category,

description,

image:e.target.result,

status:"Pending"

});

localStorage.setItem("products",JSON.stringify(products));

location.reload();

};

reader.readAsDataURL(image);

}
document.getElementById("dashboardBtn").onclick = showDashboard;

document.getElementById("productsBtn").onclick = showProducts;

document.getElementById("addProductBtn").onclick = showAddProduct;

document.getElementById("ordersBtn").onclick = showOrders;

document.getElementById("analyticsBtn").onclick = showAnalytics;

document.getElementById("settingsBtn").onclick = showSettings;

function showProducts(){

pageContent.innerHTML=`

<h2>My Products</h2>

<div class="product-grid">

${
sellerProducts.length===0

?

`<p>No products yet.</p>`

:

sellerProducts.map((product,index)=>`

<div class="product-card">

<img src="${product.image}">

<div class="product-info">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<span class="status ${product.status.toLowerCase()}">

${product.status}

</span>

<div class="btn-group">

<button
class="btn edit"
onclick="editProduct(${index})">

Edit

</button>

<button
class="btn delete"
onclick="deleteProduct(${index})">

Delete

</button>

</div>

</div>

</div>

`).join("")

}

</div>

`;

}

function showAddProduct(){

pageContent.innerHTML=`

<div class="form-card">

<h2>Add Product</h2>

<input id="name" placeholder="Product Name">

<input id="price" type="number" placeholder="Price">

<input id="category" placeholder="Category">

<textarea id="description" placeholder="Description"></textarea>

<input type="file" id="imageInput">

<button onclick="saveProduct()">

Submit Product

</button>

</div>

`;

}

function showOrders() {

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const sellerOrders = orders.filter(order =>

        order.items.some(item => item.seller === currentUser.name)

    );

    if (sellerOrders.length === 0) {

        pageContent.innerHTML = `

        <h2>Orders</h2>

        <p>No orders yet.</p>

        `;

        return;

    }

    pageContent.innerHTML = `<h2>Orders</h2>`;

    sellerOrders.forEach(order => {

        const items = order.items.filter(item => item.seller === currentUser.name);

        pageContent.innerHTML += `

        <div class="order-card">

            <h3>${order.id}</h3>

            <p><strong>Customer:</strong> ${order.customer.name}</p>

            <p><strong>Date:</strong> ${order.date}</p>

            <p><strong>Status:</strong> ${order.status}</p>

            <p><strong>Payment:</strong> ${order.payment}</p>

            <hr>

            ${items.map(item => `

                <div class="order-item">

                    <strong>${item.name}</strong>

                    <br>

                    Quantity: ${item.quantity}

                    <br>

                    Price: $${item.price}

                </div>

            `).join("")}

        </div>

        `;

    });

}

function showAnalytics(){

    pageContent.innerHTML = `
        <h2>Analytics</h2>
        <p>Coming soon.</p>
    `;
}

function showSettings(){

    pageContent.innerHTML = `
        <h2>Settings</h2>
        <p>Coming soon.</p>
    `;
}