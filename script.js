if (typeof defaultUsers === 'undefined') {
    const defaultUsers = [
        {
          userId: 1,
          username: "juanp",
          email: "juan@gmail.com",
          password: "123456m",
          name: "Juan",
          lastname: "Lopez"
        },
        {
          userId: 2,
          username: "mariag",
          email: "maria@gmail.com",
          password: "abcdef1",
          name: "Maria",
          lastname: "Gomez"
        },
        {
          userId: 3,
          username: "lucasp",
          email: "lucas@gmail.com",
          password: "123abc",
          name: "Lucas",
          lastname: "Perez"
        }
      ];


      
      //Guardo solo los usuarios mockeados en el localStorage si todavía no existen
      if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(defaultUsers));
      }
     
}


 //* ---------------------------- REGISTRARSE ----------------------------------
function register() 
{
        // 🔹 Obtenemos los valores desde los inputs del formulario de registro
        const name = document.getElementById("name").value.trim();
        const lastname = document.getElementById("lastname").value.trim();
        const email = document.getElementById("email").value.trim();
        const email2 = document.getElementById("email2").value.trim();
        const password = document.getElementById("password").value.trim();
        const password2 = document.getElementById("password2").value.trim();
        const error = document.getElementById("error"); // div donde mostramos errores
        
        //Validaciones
        let valido = validaciones(name, lastname,email,email2,password,password2,error);

        let users = validacionMailExistente(email,error);

        if (!valido || users === null) // Si no es valido, corta la función
        {
            return;
        }
    
        //  Creamos un nuevo objeto usuario con los datos ingresados
        const newUser = 
        {
            userId: users.length + 1,
            username: `${name.toLowerCase()}${lastname[0].toLowerCase()}`, // ej: juang
            email,
            password,
            name,
            lastname
        };
    
        // Agregamos el nuevo usuario a la lista y lo guardamos en el localStorage
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
    
        // Guardamos también al usuario logueado (nuevo)
        localStorage.setItem("loggedUser", JSON.stringify(newUser));
    
        // Redirigimos a la pag de bienvenida
        window.location.href = "inicio.html";
  }

  function validaciones(name, lastname,email,email2,password,password2,error)
  {
    let flag = true;
    
    //  Validación: todos los campos deben estar completos
    if (!name || !lastname || !email || !email2 || !password || !password2) 
        {
                error.textContent = "Todos los campos son obligatorios.";
                flag = false;
                return flag;
        }   

        // Expresión regular básica para validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        error.textContent = "El primer correo no tiene un formato válido.";
            flag = false;
            return flag;
          }
        
     if (!emailRegex.test(email2)) 
        {
            error.textContent = " El segundo correo no tiene un formato válido.";
            flag = false;
              return flag;
         }
    
        // 🔍 Validación: los correos deben coincidir
     if (email !== email2) 
        {
            error.textContent = "Los correos electrónicos no coinciden.";
            flag = false;
            return flag;
        }
    
        // 🔍 Validación: las contraseñas deben coincidir
    if (password !== password2) 
        {
            error.textContent = "Las contraseñas no coinciden.";
            flag = false;
            return flag;
        }
    
        // 🔍 Validación: la contraseña debe ser segura (alfanumérica y ≥ 6 caracteres)
     if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) 
        {
            error.textContent = "La contraseña debe ser alfanumérica y tener al menos 6 caracteres.";
            flag = false;
            return flag;
        }

        return flag; // Si pasa todas las validaciones, retorna el flag que estaba incializado en True
  }

  function validacionMailExistente(email,error)
  { 
        //  Obtenemos la lista actual de usuarios desde el localStorage
        let users = JSON.parse(localStorage.getItem("users"));


        //  Validamos que no exista un usuario con el mismo email
        const emailExists = users.some(user => user.email === email);
        if (emailExists) 
        {
            error.textContent = "Ya existe un usuario con este correo electrónico.";
            users = null;
        }

        return users;

  }

  //* --------------------------- INICIAR SESIÓN ----------------------------------
function login() 
{
    // 🔹 Obtenemos los valores desde los inputs del login
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");
  
    //  Validación: ambos campos deben completarse
    if (!email || !password) {
      error.textContent = "Completa todos los campos.";
      return;
    }
  
    //  Obtenemos todos los usuarios registrados
    const users = JSON.parse(localStorage.getItem("users"));
    //JSON.parse():Convierte un string JSON de vuelta a un objeto JavaScript.
  
    //  Buscamos un usuario cuyo email y contraseña coincidan
    const user = users.find(u => u.email === email && u.password === password);
  
    //Si no se encontró el usuario, mostrar error
    if (!user) {
      error.textContent = "Correo o contraseña incorrectos.";
      return;
    }
  
    // Usuario válido: guardamos su sesión
    localStorage.setItem("loggedUser", JSON.stringify(user));
    //JSON.stringify(): Convierte un objeto JavaScript a un string JSON.
  
    // Redirigimos a la pag de inicio
    window.location.href = "inicio.html";
  }