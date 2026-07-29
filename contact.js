const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

e.preventDefault();

alert("✅ Thank you for contacting NILE!\n\nWe'll get back to you as soon as possible.");

form.reset();

});