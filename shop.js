// ======================================
// NILE SHOP
// ======================================

// PRODUCTS
let products = JSON.parse(localStorage.getItem("products")) || [];
products = products.filter(product => product.status === "Approved");
// ======================================

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");

// ======================================
// DISPLAY PRODUCTS
// ======================================

function displayProducts(list){

    productGrid.innerHTML = "";

    list.forEach(product=>{

        productGrid.innerHTML += `

        <div class="product-card">

            <button class="wishlist-btn"
            onclick="toggleWishlist(event,this)">
                ♡
            </button>

            <img
            src="${product.image}"
            alt="${product.name}"
            onclick="openProduct(${product.id})">

            <div class="product-info">

                <span class="product-category">

                    ${product.category}

                </span>

                <h3>

                    ${product.name}

                </h3>

                <div class="stars">

                   ${"★★★★★"}

                </div>

                <div class="price-row">

                    <span class="price">

                        $${product.price}

                    </span>

                    <button
                    class="cart-btn"
                    onclick="addToCart(event,${product.id})">

                    Add to Cart

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

displayProducts(products);

// ======================================
// SEARCH
// ======================================

searchInput.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const filtered=products.filter(product=>

product.name.toLowerCase().includes(value) ||

product.category.toLowerCase().includes(value)

);

displayProducts(filtered);

});

// ======================================
// CATEGORY FILTER
// ======================================

categoryButtons.forEach(button=>{

button.addEventListener("click",function(){

categoryButtons.forEach(btn=>btn.classList.remove("active"));

this.classList.add("active");

const category=this.textContent;

if(category==="All"){

displayProducts(products);

return;

}

const filtered=products.filter(product=>

product.category===category

);

displayProducts(filtered);

});

});

// ======================================
// CART
// ======================================

function addToCart(event,id){

event.stopPropagation();

let cart=JSON.parse(localStorage.getItem("cart"))||[];

const product=products.find(item=>item.id===id);

const existing=cart.find(item=>item.id===id);

if(existing){

existing.quantity++;

}

else{

cart.push({

...product,

quantity:1

});

}

localStorage.setItem("cart",JSON.stringify(cart));

showToast(product.name + " added to cart!");

}

// ======================================
// PRODUCT PAGE
// ======================================

function openProduct(id){

const product=products.find(item=>item.id===id);

localStorage.setItem(

"selectedProduct",

JSON.stringify(product)

);

window.location.href="product.html";

}

// ======================================
// WISHLIST
// ======================================

function toggleWishlist(event,button){

event.stopPropagation();

button.classList.toggle("active");

}
const params = new URLSearchParams(window.location.search);

const search = params.get("search");

if(search){

    const filtered = products.filter(product =>

        product.name.toLowerCase().includes(search.toLowerCase()) ||

        product.category.toLowerCase().includes(search.toLowerCase())

    );

    displayProducts(filtered);

}
else{

    displayProducts(products);

}