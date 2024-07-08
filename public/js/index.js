
const urlBBDD = 'https://peliculas.alwaysdata.net/api/peliculas'
const urlBBDD_vista = urlBBDD + "vista";
const urlBBDD_like = urlBBDD + "like";
//con json de /api/peliculas -> la parseamos y la utilizamos a nuestro conveniencia
async function fetchPeliculas() {
    const response = await fetch('/api/peliculas');
    const peliculas = await response.json();
    const container = document.getElementById('peliculas-container');
    container.innerHTML = peliculas.map(pelicula => `
        <div class="tarjeta">
            <h2>${pelicula.titulo}</h2>
            <p>${pelicula.anio}------------${pelicula.valoracion}</p>
            <img src="${pelicula.imagen_url}" alt="${pelicula.titulo}">
            <button class="boton" data-id="${pelicula.id}">vista</button>
            <button class="boton like" data-id="${pelicula.id}">like</button>
            
        </div>
    `).join('');
    document.querySelectorAll(".boton").forEach((boton)=>{
    boton.addEventListener("click",vioPelicula)
    })
}

async function vioPelicula(e){
    const hoy = new Date();
    const fecha = hoy.getDate() + "/" + (hoy.getMonth()+1) + "/" + hoy.getFullYear() 
    if( my_storage.getItem('id')!== null){
        let relacion = {usuario_id:Number(my_storage.getItem('id')),
            pelicula_id: Number(this.getAttribute("data-id")),
            fecha:fecha
        } 
        e.srcElement.classList.add("oculto")
        let urlBBDDs =""
        if(e.srcElement.innerHTML === "like")urlBBDDs= urlBBDD_like;
            else urlBBDDs= urlBBDD_vista;
        console.log(urlBBDDs)

        let respuesta = await fetch(urlBBDDs, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(relacion),
          });
          if (!respuesta.ok) {
            throw new Error(
              "Por favor intente mas tarde"
            );
          }
        
    
    }
    else{
        alert("debe iniciar sesion para marcar una pelicula como vista");
    }
}

fetchPeliculas();

const my_storage = window.localStorage;
const a_muestra = document.querySelector("#info-usuario");

if( my_storage.getItem('id')!== null){
    a_muestra.innerHTML = "Perfil";
    a_muestra.href = "/perfil"

}else{
    a_muestra.innerHTML = "Login";
    a_muestra.href = "/login"
}
