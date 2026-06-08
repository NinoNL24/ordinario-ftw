Promise.all([
    fetch("xml/albumes.xml").then(r => r.text()),
    fetch("xml/listas.xml").then(r => r.text())
])

.then(([albumesXML, listasXML]) => {

    const parser = new DOMParser();

    const albumesDoc = parser.parseFromString(albumesXML, "text/xml");

    const listasDoc = parser.parseFromString(listasXML, "text/xml");

    mostrarLista(
        listasDoc,
        albumesDoc,
        "favoritos",
        "favoritos"
    );

    mostrarLista(
        listasDoc,
        albumesDoc,
        "escucharDespues",
        "escucharDespues"
    );

});

function mostrarLista(listasDoc, albumesDoc, nombreLista, contenedorID) {

    const contenedor =
        document.getElementById(contenedorID);

    const ids =
        listasDoc
            .getElementsByTagName(nombreLista)[0]
            .getElementsByTagName("album");

    for (let i = 0; i < ids.length; i++) {

        const idBuscado = ids[i].textContent;

        const albumes =
            albumesDoc.getElementsByTagName("album");

        for (let j = 0; j < albumes.length; j++) {

            const id =
                albumes[j]
                    .getElementsByTagName("id")[0]
                    .textContent;

            if (id === idBuscado) {

                const titulo =
                    albumes[j]
                        .getElementsByTagName("titulo")[0]
                        .textContent;

                const artista =
                    albumes[j]
                        .getElementsByTagName("artista")[0]
                        .textContent;

                const imagen =
                    albumes[j]
                        .getElementsByTagName("imagen")[0]
                        .textContent;

                contenedor.innerHTML += `

                    <div class="tarjetaAlbum">

                        <img
                            src="img/portadas/${imagen}"
                            alt="Portada de ${titulo}"
                        >

                        <h3>${titulo}</h3>

                        <p>${artista}</p>

                    </div>

                `;
            }
        }
    }
}