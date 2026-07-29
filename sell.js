const password = document.getElementById("password").value;

const confirmPassword = document.getElementById("confirmPassword").value;

if (password !== confirmPassword) {

    alert("Passwords do not match.");

    return;

}
// ======================================
// NILE SELLER APPLICATION
// ======================================

const form = document.getElementById("sellerForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const application = {

        id: Date.now(),

        business: document.getElementById("business").value,

        owner: document.getElementById("owner").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        country: document.getElementById("country").value,

        city: document.getElementById("city").value,

        password: password,

        about: document.getElementById("about").value,

        status: "Pending"

    };

    let applications =
        JSON.parse(localStorage.getItem("sellerApplications")) || [];

    applications.push(application);

    localStorage.setItem(
        "sellerApplications",
        JSON.stringify(applications)
    );

    alert("Your application has been submitted successfully. Our team will review it.");

    form.reset();

});