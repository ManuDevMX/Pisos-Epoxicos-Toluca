// ==========================================
// 1. LÓGICA DEL VISOR DE GALERÍA Y TARJETAS
// ==========================================
const visor = document.getElementById("visor");
const imagenGrande = document.getElementById("imagenGrande");
const numero = document.getElementById("numero");
const descripcion = document.getElementById("descripcion");
const cerrar = document.getElementById("cerrar");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

let imagenesActuales = [];
let indiceActual = 0;
let tituloProyectoActual = "";

// Función para actualizar la imagen y los textos en el visor
function mostrarImagen() {
    const img = imagenesActuales[indiceActual];
    imagenGrande.src = img.src;
    imagenGrande.alt = img.alt;

    // Actualizamos textos leyendo el título de la tarjeta y el "alt" de la imagen
    numero.textContent = `${tituloProyectoActual} - Paso ${indiceActual + 1} de ${imagenesActuales.length}`;
    descripcion.textContent = img.alt;
}

// Escuchar clics en las nuevas tarjetas
const tarjetas = document.querySelectorAll('.card-proyecto-light');

tarjetas.forEach(tarjeta => {
    tarjeta.style.cursor = 'pointer'; // Manita al pasar el mouse
    
    tarjeta.addEventListener('click', () => {
        // Buscar el contenedor oculto dentro de esta tarjeta clickeada
        const contenedorOculto = tarjeta.querySelector('.imagenes-ocultas');
        if (!contenedorOculto) return;

        // Guardar todas las imágenes ocultas de este proyecto
        imagenesActuales = Array.from(contenedorOculto.querySelectorAll('img'));
        if (imagenesActuales.length === 0) return;

        // Leer el título (h3) para ponerlo en el visor
        tituloProyectoActual = tarjeta.querySelector('h3').textContent;
        indiceActual = 0;
        
        mostrarImagen();
        visor.style.display = "block";
    });
});

// Controles del visor (Siguiente / Anterior / Cerrar)
function siguienteImagen() {
    indiceActual++;
    if (indiceActual >= imagenesActuales.length) indiceActual = 0;
    mostrarImagen();
}

function imagenAnterior() {
    indiceActual--;
    if (indiceActual < 0) indiceActual = imagenesActuales.length - 1;
    mostrarImagen();
}

siguiente.addEventListener("click", (e) => {
    e.stopPropagation();
    siguienteImagen();
});

anterior.addEventListener("click", (e) => {
    e.stopPropagation();
    imagenAnterior();
});

cerrar.addEventListener("click", () => {
    visor.style.display = "none";
});

// Cerrar si das clic en lo negro del fondo
visor.addEventListener("click", (e) => {
    if (e.target === visor || e.target === document.querySelector('.contenido-visor')) {
        visor.style.display = "none";
    }
});

// Gestos táctiles (Swipe) para celulares
let inicioToque = 0;
let finToque = 0;

visor.addEventListener("touchstart", (e) => {
    inicioToque = e.changedTouches[0].screenX;
});

visor.addEventListener("touchend", (e) => {
    finToque = e.changedTouches[0].screenX;
    if (inicioToque - finToque > 50) siguienteImagen();
    if (finToque - inicioToque > 50) imagenAnterior();
});


// ==========================================
// 2. FORMULARIO DE WHATSAPP
// ==========================================
const formulario = document.getElementById("formulario-cotizacion");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const metros = document.getElementById("metros").value;
    const servicio = document.getElementById("servicio").value;
    const mensaje = document.getElementById("mensaje").value;

    const numeroWhatsApp = "527224976140";

    const texto = `
Hola, quiero solicitar una cotización.

Nombre: ${nombre}
Teléfono: ${telefono}
Servicio: ${servicio}
Metros aproximados: ${metros || "No especificados"}
Mensaje: ${mensaje || "Sin mensaje adicional"}
    `;

    const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(enlace, "_blank");
});


// ==========================================
// 3. ANIMACIONES AL HACER SCROLL (IntersectionObserver)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const elementosAnimados = document.querySelectorAll(
        ".titulo-seccion, .card, .card-proyecto-light, .comentarios, .contacto, .encabezado-proyectos"
    );

    elementosAnimados.forEach((elemento) => {
        elemento.classList.add("animar-entrada");
    });

    const observador = new IntersectionObserver(
        (entradas, observer) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observer.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elementosAnimados.forEach((elemento) => {
        observador.observe(elemento);
    });
});


// ==========================================
// 4. BANNER DE COOKIES
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    if (cookieBanner && acceptBtn) {
        if (!localStorage.getItem("cookiesAceptadas")) {
            cookieBanner.style.display = "block";
        }

        acceptBtn.addEventListener("click", function () {
            localStorage.setItem("cookiesAceptadas", "true");
            cookieBanner.style.display = "none";
        });
    }
});