var firebaseConfig = {
  apiKey: "AIzaSyDSQWAhmVAzW7qID7pJNwIIUZ1b9ocazF4",
  authDomain: "futbol-bd44a.firebaseapp.com",
  databaseURL: "https://futbol-bd44a.firebaseio.com",
  projectId: "futbol-bd44a",
  storageBucket: "gs://futbol-bd44a.appspot.com",
  messagingSenderId: "869301599736",
  appId: "1:869301599736:web:3382995a5b249911d72a0d"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.firestore();
var storage = firebase.storage();

  // trae los elementos del DOM
var email = document.getElementById('registroEmail');
var nombre = document.getElementById('registroNombre');
var apellido = document.getElementById('registroApellido');
var perfiles = document.getElementById('perfilesFutbol');
var localidad = document.getElementById('comunas');
var horarios = document.getElementById('horarioDisponible');

// De acuerdo al botón de registrar carga los datos y los envía a 
// la base de datos con el ID: Email 

function cargarDatos() {
  database.collection("usuarios").doc(email.value).set({
    nombre: nombre.value,
    apellido: apellido.value,
    imagen: email.value,
    perfil: perfiles.value,
    localidad: localidad.value,
    horarios: horarios.value, 
  })
    
  subirArchivo(email.value)

    // y los values nombre + apellido

    // uploadProfileimg = function() {
    //   var file = ($('cargarArchivos'))[0].files[0];
    //   var storageRef = storage.ref('/perfiles/'+ file.name);
    // }
    // .then(function(docRef){
    //             console.log("Ok! Con el ID:" + email.value);
    //         })
    //       .catch(function(error){
    //         console.log("Error: " + error);
    //       });
};

// No puedo hacer que se guarden las imagenes en storage

// var storage = firebase.storage();
// // trae los elementos del DOM
// var cargarArchivos = document.getElementById('cargarArchivos');

// // toma la selección del archivo
// cargarArchivos.addEventListener('change', function(e){
//   // obtener el archivo
//   var file = e.target.files[0];

//   // crear una referencia de almacenamiento
//   database.ref('logos_jpg/' + file.name);

//   // subir el archivo
//   var storageRef = storage.ref();
//   storageRef.put(file);
// });

// navigator.device.capture.captureImage(
//   CaptureCB, captureSuccess, CaptureErrorCB, captureError, [CaptureImageOptions, options]
// );

function subirArchivo(name){

  //OBTENER ELEMENTOS
  var fileButton = document.getElementById('fileButton');

  //OBTENER ARCHIVO
  var file = fileButton.files[0];

  //CREAR CARPETA STORAGE
  var storageRef = firebase.storage().ref('fotos/' + name);

  //SUBIR ARCHIVO
  var task = storageRef.put(file);

  task.on('state_changed',
    function error(err) {
      console.log('ocurrio');
    },

    function complete(){
      console.log('subió')
    }
  );
}

async function loadContainer(){
  url = window.location.href;
  divContainer = document.getElementById("container-lista"); // Que busque el Div donde se guardaran las imagenes
  const snapshot = await database.collection('usuarios').get(); // traer de la base de datos la colección de usuarios
  users = snapshot.docs.map(doc => doc.data()); // devuelve el array de usuarios
  if(url.includes("Equipo")){ // Si la url tiene la palabra equipo incluida
    users.forEach(user => { // por cada usuario del array
      if(user.perfil == "equipo"){ // Si el value del perfil es igual a Equipo
        var divUser = document.createElement("div"); // Crear un div para el perfil
        divUser.classList.add("lista-estilo"); // Agrega una clase llamada "lista-estilo" al div css
        var pathReference = storage.ref('fotos'); // referencia a la carpeta fotos del storage
        pathReference.child(user.imagen).getDownloadURL().then(function(url) {
          
          // Or inserted into an <img> element:
          var img = document.createElement('img'); 
          img.src = url;
          var linkModal = document.createElement('a');
          linkModal.setAttribute("data-toggle", "modal");
          linkModal.setAttribute("data-target", "#"+user.nombre+user.apellido);
          divUser.innerHTML+=`<div class="modal fade" id="${user.nombre+user.apellido}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">${user.imagen}</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>${user.nombre}</p><p>${user.apellido}</p><p>${user.localidad}</p><p>${user.horarios}</p><button type="button" class="btn">Contactame!</button></div></div></div></div>`;
          linkModal.appendChild(img);
          divUser.appendChild(linkModal);
        }).catch(function(error) {
          // Handle any errors
        });
        divContainer.appendChild(divUser);
      }
    });    
  }
  else{
    users.forEach(user => {
      if(user.perfil == "jugadora"){ // Sí el value del perfil es igual al de Jugadora que vaya a la interfaz de dicho perfil
        var divUser = document.createElement("div"); //Crea un Div para el perfil
        divUser.classList.add("lista-estilo"); //Agrega una clase llamada "Lista-estilo" al div con css
        var pathReference = storage.ref('fotos'); //referencia a la carpeta fotos del storage
        pathReference.child(user.imagen).getDownloadURL().then(function(url) {
          
          // Or inserted into an <img> element:
          var img = document.createElement('img');
          img.src = url;
          var linkModal = document.createElement('a');
          linkModal.setAttribute("data-toggle", "modal");
          linkModal.setAttribute("data-target", "#"+user.nombre+user.apellido);
          divUser.innerHTML+=`<div class="modal fade" id="${user.nombre+user.apellido}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">${user.imagen}</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>${user.nombre}</p><p>${user.apellido}</p><p>${user.localidad}</p><p>${user.horarios}</p><button type="button" class="btn">Contactame!</button></div></div></div></div>`;
          linkModal.appendChild(img);
          divUser.appendChild(linkModal);
        }).catch(function(error) {
          // Handle any errors
        });
        divContainer.appendChild(divUser);
      }
    });
  }
}