fetch("xml/albumes.xml")
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {

        const albumes = data.getElementsByTagName("album");

        const tabla = document.getElementById("tablaAlbumes");
        const buscar = document.getElementById("buscar");
        const filtroGenero = document.getElementById("filtroGenero");

        function mostrarAlbumes() {

            tabla.innerHTML = "";

            const textoBusqueda = buscar.value.toLowerCase();
            const generoSeleccionado = filtroGenero.value;

            for (let i = 0; i < albumes.length; i++) {

                const titulo = albumes[i]
                    .getElementsByTagName("titulo")[0]
                    .textContent;

                const id = albumes[i]
                    .getElementsByTagName("id")[0]
                    .textContent;

                const artista = albumes[i]
                    .getElementsByTagName("artista")[0]
                    .textContent;

                const genero = albumes[i]
                    .getElementsByTagName("genero")[0]
                    .textContent;

                const anio = albumes[i]
                    .getElementsByTagName("anio")[0]
                    .textContent;

                const coincideBusqueda =
                    titulo.toLowerCase().includes(textoBusqueda);

                const coincideGenero =
                    generoSeleccionado === "Todos" ||
                    genero === generoSeleccionado;

                if (coincideBusqueda && coincideGenero) {

                    tabla.innerHTML += `
                        <tr>
                        <td>
                        <a href="detalle.html?id=${id}">
                        ${titulo}
                        </a>
                            </td>
                            <td>${artista}</td>
                            <td>${genero}</td>
                            <td>${anio}</td>
                        </tr>
                    `;
                }
            }
        }

        mostrarAlbumes();

        buscar.addEventListener("input", mostrarAlbumes);

        filtroGenero.addEventListener("change", mostrarAlbumes);

    });