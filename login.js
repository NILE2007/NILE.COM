// =====================================
// NILE LOGIN
// =====================================

const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // =====================
    // ADMIN LOGIN
    // =====================

    if (email === "admin@nile.com" && password === "admin123") {

        localStorage.setItem("currentUser", JSON.stringify({

            role: "admin",
            name: "Administrator"

        }));

        window.location.href = "admin.html";
        return;
    }

    // =====================
    // SELLER LOGIN
    // =====================

    const sellers = JSON.parse(localStorage.getItem("sellers")) || [];

    const seller = sellers.find(user =>

        user.email === email &&
        user.password === password

    );

    if (seller) {

        localStorage.setItem("currentUser", JSON.stringify({

            role: "seller",
            name: seller.owner,
            business: seller.business,
            email: seller.email

        }));

        window.location.href = "seller-dashboard.html";
        return;
    }

    // =====================
    // CUSTOMER LOGIN
    // =====================

    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    const customer = customers.find(user =>

        user.email === email &&
        user.password === password

    );

    if (customer) {

        localStorage.setItem("currentUser", JSON.stringify({

            role: "customer",
            name: customer.name,
            email: customer.email

        }));

        window.location.href = "index.html";
        return;
    }

    alert("Incorrect email or password.");

});