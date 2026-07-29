// =====================================
// NILE CUSTOMER REGISTER
// =====================================

const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const country = document.getElementById("country").value.trim();
    const city = document.getElementById("city").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    const exists = customers.find(customer => customer.email === email);

    if (exists) {
        alert("An account with this email already exists.");
        return;
    }

    const customer = {

        id: Date.now(),

        name,

        email,

        phone,

        country,

        city,

        password,

        role: "customer"

    };

    customers.push(customer);

    localStorage.setItem("customers", JSON.stringify(customers));

  showToast("Account created successfully!");

setTimeout(() => {

    window.location.href = "login.html";

}, 1500);
});