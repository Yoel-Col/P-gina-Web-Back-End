const urlBDD = "http://localhost:3000/api";
const urlBBDD_usuarios = urlBDD+"/usuarios";
const urlBBDD_vista = urlBDD+"/vista";
const urlBBDD_like = urlBDD+"/like";


const my_storage = window.localStorage;

function mostrarInfoUsuario() {
  document.getElementById("titulo").innerHTML = my_storage.getItem("nombre");
  fetchPeliculasLike(Number(my_storage.getItem("id")))
  fetchPeliculasVistas(Number(my_storage.getItem("id")))
}
async function fetchPeliculasVistas(id) {
  const response = await fetch(urlBBDD_vista + "/" + id);
  const peliculas = await response.json();
  const container = document.getElementById('peliculas-container');
  mostrarPeliculas(peliculas,container)
}
function mostrarPeliculas(peliculas,container){
  
  container.innerHTML = peliculas.map(pelicula => `
      <div class="tarjeta">
          <h2>${pelicula.titulo}</h2>
          <p>${pelicula.anio}------------${pelicula.valoracion}</p>
          <img src="${pelicula.imagen_url}" alt="${pelicula.titulo}">
      </div>
  `).join('');
}
async function fetchPeliculasLike(id) {
  const response = await fetch(urlBBDD_like + "/" + id);
  const peliculas = await response.json();
  const container = document.getElementById('peliculas-container-like');
  mostrarPeliculas(peliculas,container)
}


mostrarInfoUsuario();
//delete user
const borrar = document.getElementById("borrar");
borrar.addEventListener("click", borrarUsuario);
async function borrarUsuario() {
  const dataId = my_storage.getItem("id");
  try {
    let response = await fetch(urlBBDD_usuarios + "/" + dataId, {
      method: "DELETE",
    });

    if (!response.ok) {
      ir_al_login();

      throw new Error("Error en el requerimiento");
    } else {
      console.log(response.status);
      ir_al_login();
    }
  } catch (e) {
    console.log(e);
  }
}

//update user

// 1)click
const editar = document.getElementById("editar");
editar.addEventListener("click", editarUsuario);
const cancelar = document.getElementById("cancelar");
const form_editar = document.getElementById("editar-datos");

cancelar.addEventListener("click", () => {
  form_editar.classList.add("oculto");
  alternarBotones();
});
function alternarBotones() {
  document
    .querySelectorAll(".boton")
    .forEach((boton) => boton.classList.toggle("oculto"));
}

//Defino las variables
const nombre = document.getElementById("nombre");
let email = "";
const password = document.getElementById("password");
// 2)editar los datos de el local storage
async function editarUsuario() {
  alternarBotones();
  let response = await obtenerUsuarioEspecifico(my_storage.getItem("id"));
  let datos = await response;
  //muestro el formulario y los valores
  form_editar.classList.remove("oculto");
  nombre.value = datos.nombre;
  email = datos.email;
  password.value = datos.password;
  form_editar.addEventListener("submit", obtenerDatosModificados);
}

function obtenerDatosModificados(e) {
  e.preventDefault();
  const datos_actualizados = {
    nombre: nombre.value,
    email: email,
    password: password.value,
  };
  //guardo en local storage
  localStorage.setItem("nombre", datos_actualizados.nombre);
  mostrarInfoUsuario();
  localStorage.setItem("password", datos_actualizados.password);
  console.log(datos_actualizados);
  console.log(my_storage.getItem("nombre"));
  //Mando a hacer el put
  form_editar.classList.add("oculto");
  alternarBotones();
  cargarEdicion(datos_actualizados);
}
// 3)cargar esos datos editados a la bbdd

async function cargarEdicion(data) {
  try {
    let response = await fetch(urlBBDD_usuarios + "/" + my_storage.getItem("id"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error en el requerimiento");
    }
  } catch (e) {
    console.log(e);
  }
}

async function obtenerUsuarioEspecifico(id) {
  let response = await fetch(urlBBDD_usuarios + "/" + id);
  if (!response.ok) {
    throw new Error("Error en el requerimiento");
  }
  let data = await response.json();
  console.log(data);
  return data;
}

//cerrar sesion
document.getElementById("cerrar-sesion").addEventListener("click", ir_al_login);

function ir_al_login() {
  my_storage.clear();
  const a = document.createElement("a");
  a.setAttribute("href", "/login");
  a.click();
}
