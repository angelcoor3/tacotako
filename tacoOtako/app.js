const PASSWORD = "ertup3312";

/* ===============================
   DATOS INICIALES
================================= */

const defaultData = {
estado: "ABIERTO",
carnes: ["Carnitas","Buche","Tripa","Cuero","Pastor"],
productos: [
{
nombre:"Tacos",
precio:"25",
desc:"Tortilla recién hecha con carne al gusto, cilantro y cebolla.",
img:"https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=80"
},
{
nombre:"Torta",
precio:"70",
desc:"Pan dorado relleno de carne jugosa y verduras frescas.",
img:"https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=900&q=80"
},
{
nombre:"Gringa Chica",
precio:"65",
desc:"Tortilla de harina con queso fundido y carne al gusto.",
img:"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80"
},
{
nombre:"Gringa Grande",
precio:"95",
desc:"Extra queso, extra carne, extra sabor.",
img:"https://images.unsplash.com/photo-1565299585323-38174c4a6d27?auto=format&fit=crop&w=900&q=80"
},
{
nombre:"Promo Pastor 10x100",
precio:"100",
desc:"10 tacos al pastor para caerle con todo.",
img:"https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=900&q=80"
},
{
nombre:"Orden Cebollitas",
precio:"45",
desc:"Cebollitas asadas con limón y salsa.",
img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
}
]
};

if(!localStorage.getItem("tacoData")){
localStorage.setItem("tacoData", JSON.stringify(defaultData));
}

function getData(){
return JSON.parse(localStorage.getItem("tacoData"));
}

function saveData(data){
localStorage.setItem("tacoData", JSON.stringify(data));
}

/* ===============================
   HOME
================================= */

function loadHome(){

const box = document.getElementById("estadoBox");
if(!box) return;

const data = getData();

if(data.estado === "ABIERTO"){
box.innerHTML = "🔥 ABIERTO";
box.className = "badge-open";
}else{
box.innerHTML = "⛔ CERRADO";
box.className = "badge-open badge-close";
}

}

/* ===============================
   MENU
================================= */

function loadMenu(){

const wrap = document.getElementById("productosBox");
if(!wrap) return;

const data = getData();

document.getElementById("carnesBox").innerText =
data.carnes.join(" • ");

let html = "";

data.productos.forEach((p,i)=>{

html += `
<div class="col-12 col-md-6 col-lg-4">

<div class="product-card">

<img 
src="${p.img}" 
class="product-img"
onclick="showImg('${p.img}')"
data-bs-toggle="modal"
data-bs-target="#imgModal">

<div class="product-body">

<div class="product-name">${p.nombre}</div>

<div class="product-price">$${p.precio}</div>

<div class="product-desc">${p.desc}</div>

</div>
</div>
</div>
`;

});

wrap.innerHTML = html;

}

function showImg(src){
document.getElementById("modalImg").src = src;
}

/* ===============================
   LOGIN ADMIN
================================= */

function loginAdmin(){

const pass = document.getElementById("pass").value;

if(pass !== PASSWORD){
alert("Contraseña incorrecta");
return;
}

document.getElementById("loginBox").classList.add("d-none");
document.getElementById("panelBox").classList.remove("d-none");

loadAdmin();

}

/* ===============================
   ADMIN PANEL
================================= */

function loadAdmin(){

const data = getData();

document.getElementById("estadoSelect").value =
data.estado;

const box = document.getElementById("adminProductos");

let html = "";

data.productos.forEach((p,i)=>{

html += `
<div class="admin-card">

<h3 class="section-title">${p.nombre}</h3>

<label class="mb-2">Precio</label>
<input 
type="number"
id="precio${i}"
class="form-control admin-input mb-3"
value="${p.precio}">

<label class="mb-2">Descripción</label>
<textarea
id="desc${i}"
class="form-control admin-input">${p.desc}</textarea>

</div>
`;

});

box.innerHTML = html;

}

function guardarCambios(){

const data = getData();

data.estado =
document.getElementById("estadoSelect").value;

data.productos.forEach((p,i)=>{

p.precio =
document.getElementById("precio"+i).value;

p.desc =
document.getElementById("desc"+i).value;

});

saveData(data);

alert("✅ Cambios guardados");

}

/* ===============================
   AUTO INIT
================================= */

loadHome();
loadMenu();