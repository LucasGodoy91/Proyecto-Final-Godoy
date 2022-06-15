// VARIABLES CREADAS

let carrito = [];
let botonRegistro = document.getElementById("botonRegistro");
let carro = document.getElementById("carrito");
let productos = document.getElementById("productos");
let listaPrendas = document.querySelector("#lista-carrito tbody");
let vaciarCarritoBtn = document.getElementById("vaciar-carrito");

// PRODUCTOS CORRESPONDIENTES A LA TIENDA
class prenda {
    constructor (id,nombre,precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

const prenda1 = new prenda (1, "Leggins", 3990)

const prenda2 = new prenda (2, "Sudaderas", 2190)

const prenda3 = new prenda (3, "Musculosas", 2290)

const prenda4 = new prenda (4, "Tops", 2390)



// ARRAYS CON TODOS LAS PRENDAS


let prendas = [
    prenda1,
    prenda2,
    prenda3,
    prenda4,

];

// MOSTRAL EL MODAL

const abrirModal = () => {
    let modal_container = document.getElementById("contenedorModal");
    
    botonRegistro.addEventListener("click", () => {
        modal_container.classList.add("show");
    });
    let cerrar = document.getElementById("cerrar"); 
    
    cerrar.addEventListener("click", () => {
        modal_container.classList.remove("show");
    });
}

//FUNCIÓN PARA VALIDAR EL EMAIL
const validarEmail = (valor) => {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(valor)) {
        Toastify({
            text: "Bienvenido!",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}
        }).showToast();
    } else {
        Toastify({
            text: "Email inválido",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}
        }).showToast();;
    }
}

// FUNCION PARA VALIDAR EL FORMULARIO, CARGAR DATOS DEL USUARIO, GUARDARLO Y DARLE LA BIENVENIDA

const validarForm = () => {
    let nombre = document.getElementById("nombre").value;
    let contraseña = document.getElementById("contraseña").value;
    let email = document.getElementById("email").value;

    //TODO ANDA, EXCEPTO QUE CUANDO EL EMAIL ES INVÁLIDO ME CREA IGUAL AL USUSARIO
    if (nombre == "" || contraseña == "" || email == "" || validarEmail(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Algo salió mal...',
            text: 'Debe completar todos los campos',
        }) } else { let usuario = {
            nombre: nombre,
            contraseña: contraseña,
            email: email,
        }; 
        let usuarioJSON = JSON.stringify(usuario);
        localStorage.setItem("Usuario", usuarioJSON);
    
        
        botonRegistro.remove();
        let divRegistro = document.getElementById("registrado");
        divRegistro.innerHTML += `<p class = "login" > Bienvenido ${usuario.nombre} !</p>`;
    
        
    
        form.reset();
    }
}
    

const form = document.getElementById("idForm")
form.addEventListener("submit", validarForm)

// AGREGAR PRODUCTOS AL CARRTIO


function cargarEvenListeners () {
    prendas.addEventListener("click", agregarCarrito);
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarPrenda(e) {
    e.preventDefault();
    if (e.target.classList.constains('agregar-carrito')){
        const prendas = e.target.parentElement.parentElement;
        leerDatosPrendas(prenda);
    }
}

function leerDatosPrendas (prenda) {
    const infoPrenda = {
        imagen: prenda.querySelector('img').scr,
        titulo: prenda.querySelector('h5').textContent,
        precio: prenda.querySelector('p').textContent,
        id: prenda.querySelector('a').getAttribute('data-id')
    }
    
    insertarCarrito(infoPrenda);
}

function agregarCarrito (prenda) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${prenda.imagen}" whidth=100> 
    </td>

    <td>${prenda.titulo}</td>
    <td>${prenda.precio}</td>

    <td>
        <a href="#" class="borrar-prenda" data-id="${prenda.id}"> X </a>
    </td>
    `;

    listaPrendas.appendChild(row);
    guardarPrendaLocalStorage(prenda);
    
}

function elminiarPrenda (e) {
    e.preventDefault();

    let prenda,
        prendaId;

    if(e.target.classList.constains('borrar-prenda')) {
        e.target.parentElement.parentElement.remove();
        prenda = e.target.parentElement.parentElement;
        prendaId = prenda.querySelector('a').getAttribute('data-id');
    
    }
    elminiarPrendaLocalStorage(prendaId)
}

function vaciarCarrito(){
    while(listaPrendas.firstChild){
        listaPrendas.removeChild(listaPrendas.firstChild);

    }

    vaciarLocalStorage();

    return false;
}

function guardarPrendaLocalStorage(prenda) {
    let prendas;

    prendas = obternerPrendasLocalStorage();
    prendas.push(prenda);

    localStorage.setItem ('prendas'. JSON.stringify(prendas));

}

function obternerPrendasLocalStorage(){

    let prendasLS;

    if(localStorage.getItem('prendas') === null) {
        prendasLS = [];
    } else {
        JSON.parse(localStorage.getItem('prendas'));
    }

    return prendasLS;
}


function leerLocalStorage() {
    let prendasLS;

    prendasLS = obternerPrendasLocalStorage();

    prendasLs.forEach (function(prenda){
        const row = document.createElement ('tr');
        row.innerHTML = `
        <td> 
            <img src="${prenda.imagen}" width=100>
        </td>
        <td>${prenda.titulo}</td>
    <td>${prenda.precio}</td>

    <td>
        <a href="#" class="borrar-prenda" data-id= "${prenda.id}"> X </a>
    </td>
        `

        listaPrendas.appendChild(row);
    
    });
}

function elminiarPrendaLocalStorage(prenda) {
    let prendasLS;
    prendasLS = obternerPrendasLocalStorage();

    prendasLS.forEach(function(prenda, index){
        if (prendaLS.id === prenda) {
            prendasLS.splice( index, 1);
        }
         
    });

    localStorage.setItem ('prenda', JSON.stringify(prendasLS));

}

function vaciarLocalStorage() {
    localStorage.clear();
}

abrirModal();
cargarEvenListeners();

