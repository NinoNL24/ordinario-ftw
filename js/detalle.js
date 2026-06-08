console.log("detalle.js cargado");
const parametros = new URLSearchParams(window.location.search);

const idBuscado = parametros.get("id");

fetch("xml/albumes.xml")
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {

        const albumes = data.getElementsByTagName("album");

        const contenedor = document.getElementById("detalleAlbum");

        for (let i = 0; i < albumes.length; i++) {

            const id = albumes[i]
                .getElementsByTagName("id")[0]
                .textContent;

            if (id === idBuscado) {

                const titulo = albumes[i]
                    .getElementsByTagName("titulo")[0]
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

                const calificacion = albumes[i]
                    .getElementsByTagName("calificacion")[0]
                    .textContent;

                const duracion = albumes[i]
                    .getElementsByTagName("duracion")[0]
                    .textContent;

                const descripcion = albumes[i]
                    .getElementsByTagName("descripcion")[0]
                    .textContent;

                const imagen = albumes[i]
                    .getElementsByTagName("imagen")[0]
                    .textContent;

                contenedor.innerHTML = `

                 <img
                    src="img/portadas/${imagen}"
                    alt="Portada del álbum ${titulo}"
                    class="portadaAlbum"
                >

                    <h2>${titulo}</h2>

                    <p><strong>Artista:</strong> ${artista}</p>

                    <p><strong>Género:</strong> ${genero}</p>

                    <p><strong>Año:</strong> ${anio}</p>

                    <p><strong>Calificación:</strong> ${calificacion}</p>

                    <p><strong>Duración:</strong> ${duracion} minutos</p>

                    <p><strong>Descripción:</strong> ${descripcion}</p>

                `;

                break;
            }
        }

    });