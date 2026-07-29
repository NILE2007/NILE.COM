// ==========================
// NILE CART
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const cartCount = document.getElementById("cartCount");

// ==========================
// DISPLAY CART
// ==========================

function displayCart(){

    cartItems.innerHTML = "";

    let grandTotal = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `

        <div class="empty-cart">

            <h2>Your cart is empty</h2>

            <p>Start shopping to discover amazing African products.</p>

        </div>

        `;

        subtotal.innerHTML = "$0";
        total.innerHTML = "$0";
        cartCount.innerHTML = "0 Items";

        return;

    }

    cart.forEach((product,index)=>{

        if(!product.quantity){

            product.quantity = 1;

        }

        grandTotal += product.price * product.quantity;

        cartItems.innerHTML += `

        <div class="cart-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="cart-info">

                <span class="cart-category">

                    ${product.category}

                </span>

                <h3>

                    ${product.name}

                </h3>

                <div class="cart-price">

                    $${product.price}

                </div>

                <div class="quantity">

                    <button onclick="decrease(${index})">−</button>

                    <span>${product.quantity}</span>

                    <button onclick="increase(${index})">+</button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeProduct(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    subtotal.innerHTML = "$" + grandTotal;
    total.innerHTML = "$" + grandTotal;
    cartCount.innerHTML = cart.length + " Items";

    localStorage.setItem("cart", JSON.stringify(cart));

}

// ==========================
// QUANTITY
// ==========================

function increase(index){

    cart[index].quantity++;

    displayCart();

}

function decrease(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }

    displayCart();

}

// ==========================
// REMOVE
// ==========================

function removeProduct(index){

    cart.splice(index,1);

    displayCart();

}

// ==========================
// LOAD
// ==========================

displayCart();