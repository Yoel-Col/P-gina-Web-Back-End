// Especificamos el evento y el id del formulario
document.getElementById('addMovieForm').addEventListener('submit', function(event) {
    event.preventDefault();

    //Guardamos los datos proporcionado en el formulario
    const movieData = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        anio: document.getElementById('anio').value,
        valoracion: document.getElementById('valoracion').value,
        imagen_url: document.getElementById('imagen_url').value,
        categoria_id: document.getElementById('categoria_id').value
    };
    //Enviamos una solicitud POST en el endpoint especificado con el paquete movieData convertido a json
    fetch('http://localhost:3950/api/peliculas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});