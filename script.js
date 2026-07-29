const products = [
    {
        name: "Handwoven Basket",
        category: "Home Decor",
        price: 59,
        image: "images/basket.jpg"
    },
    {
        name: "Moroccan Lantern",
        category: "Home Decor",
        price: 89,
        image: "images/lantern.jpg"
    },
    {
        name: "Kenyan Coffee",
        category: "Food & Drink",
        price: 22,
        image: "images/coffee.jpg"
    },
    {
        name: "African Dress",
        category: "Fashion",
        price: 75,
        image: "images/dress.jpg"
    }
];
const products = [

{
    name: "Handwoven Basket",
    category: "Home Decor",
    price: 59,
    image: "images/basket.jpg",
    rating: 5
},

{
    name: "Moroccan Lantern",
    category: "Home Decor",
    price: 89,
    image: "images/lantern.jpg",
    rating: 5
},

{
    name: "Kenyan Coffee",
    category: "Food & Drink",
    price: 22,
    image: "images/coffee.jpg",
    rating: 4
},

{
    name: "African Dress",
    category: "Fashion",
    price: 75,
    image: "images/dress.jpg",
    rating: 5
}

];
function displayProducts(list){

    productGrid.innerHTML = "";

    list.forEach(product => {

        productGrid.innerHTML += `

        <div class="product-card">

            <button class="wishlist-btn">♡</button>

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="stars">
                    ${"★".repeat(product.rating)}
                </div>

                <div class="price-row">

                    <span class="price">
                        $${product.price}
                    </span>

                    <button class="cart-btn">
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

displayProducts(products);

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const search = this.value.toLowerCase();

        const filtered = products.filter(product =>

            product.name.toLowerCase().includes(search) ||

            product.category.toLowerCase().includes(search)

        );

        displayProducts(filtered);

    });

}
document.addEventListener("click", function (e) {

    if (e.target.classList.contains("wishlist-btn")) {

        e.target.classList.toggle("active");

        e.target.innerHTML =
            e.target.classList.contains("active") ? "♥" : "♡";

    }

});
const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input", function(){

const search = this.value.toLowerCase();

const filtered = products.filter(product =>

product.name.toLowerCase().includes(search) ||

product.category.toLowerCase().includes(search)

);

displayProducts(filtered);

});

}
// ==========================
// USER MENU
// ==========================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const loginLink = document.getElementById("loginLink");
const userMenu = document.getElementById("userMenu");

if (currentUser && loginLink && userMenu) {

    loginLink.style.display = "none";

    userMenu.innerHTML = `

        <span class="welcome">

            👋 Hi, ${currentUser.name}

        </span>

        <a href="my-orders.html">

            My Orders

        </a>

        <a href="#" id="logoutLink">

            Logout

        </a>

    `;

    document.getElementById("logoutLink").onclick = function (e) {

        e.preventDefault();

        localStorage.removeItem("currentUser");

        window.location.reload();

    };

}