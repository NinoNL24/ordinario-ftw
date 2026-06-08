fetch("xml/albumes.xml")
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {

        const albumesXML = data.getElementsByTagName("album");

        const filtroGenero = document.getElementById("filtroGeneroRanking");

        const tabla = document.getElementById("tablaRanking");

        function mostrarRanking() {

            tabla.innerHTML = "";

            let albumes = [];

            for (let i = 0; i < albumesXML.length; i++) {

                albumes.push({

                    titulo: albumesXML[i]
                        .getElementsByTagName("titulo")[0]
                        .textContent,

                    artista: albumesXML[i]
                        .getElementsByTagName("artista")[0]
                        .textContent,

                    genero: albumesXML[i]
                        .getElementsByTagName("genero")[0]
                        .textContent,

                    calificacion: parseFloat(
                        albumesXML[i]
                            .getElementsByTagName("calificacion")[0]
                            .textContent
                    )

                });
            }

            const generoSeleccionado = filtroGenero.value;

            if (generoSeleccionado !== "Todos") {

                albumes = albumes.filter(
                    album => album.genero === generoSeleccionado
                );
            }

            albumes.sort(
                (a, b) => b.calificacion - a.calificacion
            );

            albumes.forEach((album, indice) => {

                tabla.innerHTML += `

                    <tr>

                        <td>${indice + 1}</td>

                        <td>${album.titulo}</td>

                        <td>${album.artista}</td>

                        <td>${album.genero}</td>

                        <td>${album.calificacion}</td>

                    </tr>

                `;
            });
        }

        mostrarRanking();

        filtroGenero.addEventListener(
            "change",
            mostrarRanking
        );

    });