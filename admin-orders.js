// ===========================
// ADMIN ORDERS
// ===========================

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

const table =
document.getElementById("ordersTable");

displayOrders();

function displayOrders(){

table.innerHTML="";

if(orders.length===0){

table.innerHTML=`

<tr>

<td colspan="7">

No orders yet.

</td>

</tr>

`;

return;

}

orders.forEach((order,index)=>{

table.innerHTML+=`

<tr>

<td>${order.id}</td>

<td>${order.customer.name}</td>

<td>$${order.total}</td>

<td>

<select onchange="changeStatus(${index},this.value)">

<option ${order.status==="Pending"?"selected":""}>Pending</option>

<option ${order.status==="Processing"?"selected":""}>Processing</option>

<option ${order.status==="Shipped"?"selected":""}>Shipped</option>

<option ${order.status==="Delivered"?"selected":""}>Delivered</option>

</select>

</td>

<td>${order.payment}</td>

<td>${order.date}</td>

<td>

<button onclick="deleteOrder(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function changeStatus(index,status){

orders[index].status=status;

localStorage.setItem("orders",JSON.stringify(orders));

}

function deleteOrder(index){

if(confirm("Delete this order?")){

orders.splice(index,1);

localStorage.setItem("orders",JSON.stringify(orders));

displayOrders();

}

}