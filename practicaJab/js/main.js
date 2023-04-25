const COMPRA = [];
let presupuestoCompra = 40;
let total=0;
showProduct();
refreshProduct();

function showProduct() {
    PRODUCTOS.filter(valor => valor.disponible === true && valor.precio <= presupuestoCompra).map(valor=>
        document.querySelector(".products").insertAdjacentHTML("beforeend", 
        `
            <div class="producto">
                <img id="${valor.id}" 

                onmouseleave="clearInfo()"

                onmouseover="recognize(this)"

                onclick="shop(this)"

                src="img/${valor.imagen}"
                alt="${valor.nombre}"/>
            </div>
        `))
}

function refreshProduct() {
    document.querySelector(".budget strong").innerHTML=`${presupuestoCompra}$`;
    document.querySelector(".list").insertAdjacentHTML("beforeend", `
        <div class="total"><h3>A pagar: ${total}$</h3></div>
        <div class="pagar"><button class="btn btn-pagar">Pagar</button>
    `)
}

function recognize(p) {
    let myIndex=search(p);
    let name = PRODUCTOS[myIndex].nombre;
    let price = PRODUCTOS[myIndex].precio;
    document.querySelector(".info").innerHTML =`
        ${name}: <strong>${price}$</strong>
    `
}
function clearInfo() {
    document.querySelector(".info").innerHTML ="";
}


function search(p) {
    let idProduct =parseInt(p.getAttribute("id"));
    return PRODUCTOS.findIndex(valor=> valor.id === idProduct);    
}

function shop(p) {
    let myIndex=search(p);
    PRODUCTOS[myIndex].disponible = false;
    COMPRA.push(PRODUCTOS[myIndex].id);
    presupuestoCompra-=PRODUCTOS[myIndex].precio;
    clearBox();
    showProduct();
    showShipping();
    clearInfo();
    refreshProduct();
}

function clearBox() {
    document.querySelector(".products").innerHTML="";  
    document.querySelector(".shipping").innerHTML="";  
    document.querySelector(".list").innerHTML="";
    total=0;
}

function showShipping() {
    COMPRA.map(valor => {
        let myIndex = PRODUCTOS.findIndex(pro=>pro.id==valor)
        document.querySelector(".shipping").insertAdjacentHTML("beforeend", 
        `  
            <div class="producto">
            <img id="${valor}" onmouseover="recognize(this)"
            onmouseleave="clearInfo()"
            onclick="returnProduct(this)"
            src="img/${PRODUCTOS[myIndex].imagen}" alt="${PRODUCTOS[myIndex].nombre}"/>
            </div>
        `)
        takeOrder(myIndex); 
    });
}
function returnProduct(e) {
    let myIndex=search(e);
    PRODUCTOS[myIndex].disponile=true;
    presupuestoCompra+=PRODUCTOS[myIndex].precio;
    let whoErase = COMPRA.indexOf(PRODUCTOS[myIndex].id);
    COMPRA.splice(whoErase, 1)
    clearBox();
    showProduct();
    showShipping();
    clearInfo();
    refreshProduct();
}
function takeOrder(myIndex) {
    document.querySelector(".list")  .insertAdjacentHTML("beforeend",
    `
        <div class="line">
            <div class="column1">${PRODUCTOS[myIndex].nombre}</div>
            <div class="column2">${PRODUCTOS[myIndex].precio}</div>
        </div>
    `)
    total+=PRODUCTOS[myIndex].precio
}