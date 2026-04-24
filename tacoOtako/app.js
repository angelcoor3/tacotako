// app.js

const PASS = "ertup3312";

/* =========================
   BASE DE DATOS LOCAL
========================= */

const defaultData = {
estado: "ABIERTO",
carnes: ["Carnitas","Buche","Tripa","Cuero","Pastor"],
productos: [
{
nombre:"Tacos",
precio:"25",
desc:"Tortilla recién hecha con carne al gusto.",
img:"logo.png"
},
{
nombre:"Torta",
precio:"70",
desc:"Pan dorado con carne jugosa y verduras.",
img:"logo.png"
},
{
nombre:"Gringa Chica",
precio:"65",
desc:"Queso fundido con tortilla de harina.",
img:"logo.png"
},
{
nombre:"Gringa Grande",
precio:"95",
desc:"Más carne, más queso, más sabor.",
img:"logo.png"
},
{
nombre:"Promo Pastor 10x100",
precio:"100",
desc:"Promoción especial para caerle con todo.",
img:"logo.png"
},
{
nombre:"Orden de Cebollitas",
precio:"45",
desc:"Cebollitas asadas con limón.",
img:"logo.png"
}
]
};

if(!localStorage.getItem("tacoDB")){
localStorage.setItem("tacoDB", JSON.stringify(defaultData));
}

function getDB(){
return JSON.parse(localStorage.getItem("tacoDB"));
}

function saveDB(data){
localStorage.setItem("tacoDB", JSON.stringify(data));
}

/* =========================
   HOME
========================= */

function loadHome(){

const estado = document.getElementById("estado");
if(!estado) return;

const db = getDB();

estado.textContent = db.estado;

if(db.estado === "ABIERTO"){
estado.className = "badge open";
}else{
estado.className = "badge closed";
}

}

/* =========================
   MENU
========================= */

function loadMenu(){

const box = document.getElementById("productos");
if(!box) return;

const db = getDB();

const carnes = document.getElementById("carnes");
if(carnes){
carnes.textContent = db.carnes.join(" • ");
}

let html = "";

db.productos.forEach((p,i)=>{

html += `
<div class="card">

<img src="${p.img}" onclick="abrirModal('${p.img}')">

<div class="card-body">

<h3>${p.nombre}</h3>

<div class="price">$${p.precio}</div>

<div class="desc">${p.desc}</div>

</div>
</div>
`;

});

box.innerHTML = html;

}

/* =========================
   MODAL
========================= */

function abrirModal(src){

const modal = document.getElementById("modal");
const img = document.getElementById("modalImg");

if(modal && img){
img.src = src;
modal.classList.add("show");
}

}

function cerrarModal(){

const modal = document.getElementById("modal");

if(modal){
modal.classList.remove("show");
}

}

/* =========================
   ADMIN LOGIN
========================= */

function login(){

const pass = document.getElementById("pass");
if(!pass) return;

if(pass.value !== PASS){
alert("Contraseña incorrecta");
return;
}

document.getElementById("loginBox").classList.add("hide");
document.getElementById("panelBox").classList.remove("hide");

loadAdmin();

}

/* =========================
   ADMIN PANEL
========================= */

function loadAdmin(){

const db = getDB();

const estado = document.getElementById("estadoSelect");
if(estado){
estado.value = db.estado;
}

const box = document.getElementById("adminProductos");
if(!box) return;

let html = "";

db.productos.forEach((p,i)=>{

html += `
<div class="panel">

<h2>${p.nombre}</h2>

<label>Precio</label>
<input type="number" id="precio${i}" value="${p.precio}">

<label>Descripción</label>
<textarea id="desc${i}">${p.desc}</textarea>

</div>
`;

});

box.innerHTML = html;

}

/* =========================
   GUARDAR
========================= */

function guardarTodo(){

const db = getDB();

const estado = document.getElementById("estadoSelect");
db.estado = estado.value;

db.productos.forEach((p,i)=>{

p.precio = document.getElementById("precio"+i).value;
p.desc = document.getElementById("desc"+i).value;

});

saveDB(db);

alert("Cambios guardados");

}

/* =========================
   INIT
========================= */

loadHome();
loadMenu();