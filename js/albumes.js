fetch("xml/albumes.xml")
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {

        const albumes = data.getElementsByTagName("album");

        const tabla = document.getElementById("tablaAlbumes");

        for (let i = 0; i < albumes.length; i++) {

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

            tabla.innerHTML += `
                <tr>
                    <td>${titulo}</td>
                    <td>${artista}</td>
                    <td>${genero}</td>
                    <td>${anio}</td>
                </tr>
            `;
        }

    });