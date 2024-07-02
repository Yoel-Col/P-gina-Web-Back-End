//con json de /api/peliculas -> la parseamos y la utilizamos a nuestro conveniencia
async function fetchPeliculas() {
    const response = await fetch('/api/peliculas');
    const peliculas = await response.json();
    const container = document.getElementById('peliculas-container');
    container.innerHTML = peliculas.map(pelicula => `
        <div>
            <h2>${pelicula.titulo}</h2>
            <p>${pelicula.anio}------------${pelicula.valoracion}</p>
            <img src="${pelicula.imagen_url}" alt="${pelicula.titulo}">
        </div>
    `).join('');
}

fetchPeliculas();