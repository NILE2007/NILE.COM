const lastOrder =
JSON.parse(localStorage.getItem("lastOrder"));

if(lastOrder){

document.getElementById("orderID").textContent=lastOrder.id;

}