const url = "https://6663bb10932baf9032a8e0bd.mockapi.io";
const urlBBDD = 'http://localhost:3000/api/usuarios'

const url_user = url + "/usuario";
const my_storage = window.localStorage;


const formulario = document.getElementById("register-form");
formulario.addEventListener("submit", agregar);

async function agregar(e) {
  const p_error = document.querySelector("#error-message");
  e.preventDefault();

  let form = new FormData(formulario);

  formulario.reset();
  const url_filtered = new URL(urlBBDD);
 // url_filtered.searchParams.append("email", form.get("email"));
  try {
    //fetch
    let response = await fetch(url_filtered+":"+form.get("email"));
    if (response.status == 404) {
      let usuario = {
        nombre: form.get("nombre"),
        email: form.get("email"),
        password: form.get("password"),
      };

      let respuesta = await fetch(urlBBDD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      if (!respuesta.ok) {
        throw new Error(
          "No se pudo crear el usuario, por favor intente mas tarde"
        );
      } else {
        ir_al_login();
      }
    } else {
      p_error.classList.remove("oculto");
      p_error.innerHTML = "El mail ya se encuentra registrado.";
    }
  } catch (e) {
    p_error.classList.remove("oculto");
    p_error.innerHTML = e;
  }
}
function ir_al_login() {
  my_storage.clear();
  const a = document.createElement("a");
  a.setAttribute("href", "/login");
  a.click();
}
