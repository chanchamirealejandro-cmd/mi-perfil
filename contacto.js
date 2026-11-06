var formulario = document.getElementById("formulario");
var respuesta = document.getElementById("respuesta");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var mensaje = document.getElementById("mensaje").value;

    var hayError = false;

    document.getElementById("errorNombre").innerHTML = "";
    document.getElementById("errorCorreo").innerHTML = "";
    document.getElementById("errorMensaje").innerHTML = "";
    document.getElementById("nombre").classList.remove("campo-malo");
    document.getElementById("correo").classList.remove("campo-malo");
    document.getElementById("mensaje").classList.remove("campo-malo");
    respuesta.innerHTML = "";

    if (nombre.trim() == "") {
        document.getElementById("errorNombre").innerHTML = "Escribe tu nombre";
        document.getElementById("nombre").classList.add("campo-malo");
        hayError = true;
    }

    if (correo.trim() == "") {
        document.getElementById("errorCorreo").innerHTML = "Escribe tu correo";
        document.getElementById("correo").classList.add("campo-malo");
        hayError = true;
    } else if (correo.indexOf("@") == -1 || correo.indexOf(".") == -1) {
        document.getElementById("errorCorreo").innerHTML = "El correo no es válido";
        document.getElementById("correo").classList.add("campo-malo");
        hayError = true;
    }

    if (mensaje.trim() == "") {
        document.getElementById("errorMensaje").innerHTML = "Escribe un mensaje";
        document.getElementById("mensaje").classList.add("campo-malo");
        hayError = true;
    }

    if (hayError == true) {
        return;
    }

    var datos = {
        nombre: nombre,
        correo: correo,
        mensaje: mensaje
    };

    fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    .then(function (resultado) {
        if (resultado.ok) {
            respuesta.className = "bien";
            respuesta.innerHTML = "¡Gracias " + nombre + "! Tu mensaje fue enviado.";
            formulario.reset();
        } else {
            respuesta.className = "mal";
            respuesta.innerHTML = "No se pudo enviar el mensaje, intenta otra vez.";
        }
    })
    .catch(function (error) {
        respuesta.className = "mal";
        respuesta.innerHTML = "No se pudo enviar el mensaje, intenta otra vez.";
    });
});
