const url = "https://6663bb10932baf9032a8e0bd.mockapi.io";
const urlBBDD = 'http://peliculas.alwaysdata.net/api/peliculas';

const formulario = document.getElementById("register-form");
formulario.addEventListener("submit", agregar);

async function agregar(e) {
  const p_error = document.querySelector("#error-message");
  e.preventDefault();

  let form = new FormData(formulario);
  formulario.reset();

  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('email', form.get('email'));
  const urlWithParams = `${urlBBDD}?${urlSearchParams.toString()}`;

  try {
    let response = await fetch(urlWithParams);

    if (response.ok) {
      let data = await response.json();
      
      if (data.length === 0) {
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
            "No se pudo crear el usuario, por favor intente más tarde."
          );
        } else {
          ir_al_login();
        }
      } else {
        p_error.classList.remove("oculto");
        p_error.innerHTML = "El correo electrónico ya está registrado.";
      }
    } else {
      throw new Error("Error al verificar el correo electrónico.");
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

