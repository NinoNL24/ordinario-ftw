document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const usuarioIngresado = document.getElementById("usuario").value;
    const contrasenaIngresada = document.getElementById("contrasena").value;

    fetch("xml/usuarios.xml")
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {

            const usuarios = data.getElementsByTagName("usuario");

            let valido = false;

            for (let i = 0; i < usuarios.length; i++) {

                const username = usuarios[i]
                    .getElementsByTagName("username")[0]
                    .textContent;

                const password = usuarios[i]
                    .getElementsByTagName("password")[0]
                    .textContent;

                if (usuarioIngresado === username &&
                    contrasenaIngresada === password) {

                    valido = true;
                    break;
                }
            }

            const mensaje = document.getElementById("mensaje");

            if (valido) {
                mensaje.textContent = "Inicio de sesión exitoso.";
                mensaje.style.color = "#00E054";
            } else {
                mensaje.textContent = "Usuario o contraseña incorrectos.";
                mensaje.style.color = "red";
            }

        });

});