const urlBBDD = 'https://peliculas.alwaysdata.net/api/peliculas'

const my_storage = window.localStorage;
console.log(my_storage.getItem('password'));
const form_login = document.querySelector("#login-form");
form_login.addEventListener("submit", verificarLogin);
const p_error = document.querySelector("#error-message");
async function verificarLogin(e) {
  e.preventDefault();

  console.log(e);
  const form = new FormData(form_login);

  try {
    const url_filtered = new URL(urlBBDD);
    //fetch
    let response = await fetch(urlBBDD + ":"+form.get("email"));
    if(!response.ok){
      console.log("entre al if")
      //vaciar formulrio
      form_login.reset();
      //avisarle al usuario que no existe
      p_error.classList.remove("oculto");
      p_error.innerHTML = "Usuario no encontrado";
      //manejar error
      throw new Error("Usuario no encontrado. Codigo de error: " + response.status);
    }
    console.log("sali del if")
    console.log(response)
    let data = await response.json();
    
    console.log(data)
    

    //verificar password 
    if(form.get("password")==data.password){
        localStorage.setItem('id',data.id);
        localStorage.setItem('nombre',data.nombre);
        localStorage.setItem('email',data.email);
        localStorage.setItem('password',data.password);

        
        const a = document.createElement("a");
        a.setAttribute('href',"/perfil")
        a.click()
    } else {
        p_error.classList.remove("oculto");
        form_login.reset();
        p_error.innerHTML = "Contraseña incorrecta";

    }


    

  } catch (error) {console.log(error)}
}
