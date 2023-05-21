//Variablñes programa
let tarjetas_volteadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let tarjetasAdivinadas = 0;
let tiempoRestante = 180;
let score = 0;
let empezo = false;
let cuentaRegresiva = null;
let usuarioActual = null;
let ranking = [];
let histrorico_puntos = [];
let partidaEnCurso = false;

//Elementos del documento
let scoreBox = document.getElementById("puntos");
let cajaAdivinadas = document.getElementById("adivinadas");
let tiempo = document.getElementById("timer");

//Esta funcion por ahora lo que hace es poner todas las tarjetas volteadas
function iniciarPagina() {
  for (let i = 0; i < 16; i++) {
    tarjeta = document.getElementById(i);
    tarjeta.innerHTML = "<img src = './images/0.png' alt = ''>";
    tarjeta.disabled = true;
  }
  cargar_datos();
  imprimirLeaderboard();
}

//Esta funcion es para guardar el usurio que escriban
function guardar_inputs() {
  let usuario = document.getElementById("username");
  usuarioActual = usuario.value;
  console.log(usuarioActual);
  iniciarPagina();
}

//Defino los numeros de las cartas y me los pone volteadas
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});

//Al momento que esta funcion se active, iniciara un contador desde 180 hasta 0
function temporizador() {
  tiempoRestante = 180;
  cuentaRegresiva = setInterval(() => {
    tiempoRestante--;
    if (tiempoRestante == 0 || !partidaEnCurso) {
      clearInterval(cuentaRegresiva);
      seAcaboElTiempo();
    }
    tiempo.innerHTML = "Tiempo: " + tiempoRestante;
  }, 1000);
}

//Fin del tiempo
function seAcaboElTiempo() {
  for (let i = 0; i < numbers.length; i++) {
    let respuesta = document.getElementById(i);
    resultado = numbers[i];
    respuesta.innerHTML =
      "<img src = './images/" + resultado + ".jpg' alt = ''>";
    respuesta.disabled = true;
    empezo = false;
    partidaEnCurso = false;
  }
}

//volteo tarjetas
function voltear(id) {
  //Si el tiempo no ha empezado, se incia
  if (empezo == false) {
    temporizador();
    empezo = true;
  }
  tarjetas_volteadas++;
  //Si solo he destapado una tarjeta
  if (tarjetas_volteadas == 1) {
    tarjeta1 = document.getElementById(id);
    primerResultado = numbers[id];
    tarjeta1.innerHTML =
      "<img src = './images/" + primerResultado + ".jpg' alt = ''>";
    tarjeta1.disabled = true;
    //Si esta es la segunda que destapo
  } else if (tarjetas_volteadas == 2) {
    tarjeta2 = document.getElementById(id);
    segundoResultado = numbers[id];
    tarjeta2.innerHTML =
      "<img src = './images/" + segundoResultado + ".jpg' alt = ''>";
    tarjeta2.disabled = true;
    //Si mi primer resultado es igaul a mi segundo resultado
    if (primerResultado == segundoResultado) {
      tarjetasAdivinadas++;
      cajaAdivinadas.innerHTML = "Adivinadas: " + tarjetasAdivinadas;
      tarjetas_volteadas = 0;
      //Si no son iguales quiero mostrar un momento y despues dejar de volver a tapar
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = "<img src = './images/0.png' alt = ''>";
        tarjeta2.innerHTML = "<img src = './images/0.png' alt = ''>";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetas_volteadas = 0;
      }, 500);
    }
  }
  if (tarjetasAdivinadas == 8) {
    score = 100 * ((tiempoRestante + 1) / 180);
    let puntuacion = { user: usuarioActual, puntos: Math.trunc(score) };
    scoreBox.innerHTML = "Score: " + Math.trunc(score);
    console.log(usuarioActual);
    console.log(puntuacion.user);
    ranking.push(puntuacion);
    imprimirLeaderboard();
    partidaEnCurso = false;
    guardar_datos();
  }
}

//Esta funcion muestra los primeros 5 en pantalla
function imprimirLeaderboard() {
  ranking.sort((x, y) => y.puntos - x.puntos);
  let texto = "";
  console.log(ranking);
  let cont = 0;
  ranking.forEach((element) => {
    cont++;
    let persona = element.user;
    let puntitos = element.puntos;
    if (cont < 6) {
      let id = 20 + cont;
      let posicion = document.getElementById(id);
      posicion.innerHTML = cont + ". " + persona + "......." + puntitos;
    }
  });
}

//Esta funcion es para inciar una partida
function empezarPartida() {
  if (usuarioActual != null && usuarioActual.trim() != "") {
    tiempoRestante = 180;
    tarjetasAdivinadas = 0;
    partidaEnCurso = true;
    numbers = numbers.sort(() => {
      return Math.random() - Math.random();
    });
    for (let i = 0; i < 16; i++) {
      tarjeta = document.getElementById(i);
      tarjeta.innerHTML = "<img src = './images/0.png' alt = ''>";
      tarjeta.disabled = false;
    }
    scoreBox.innerHTML = "Score: N/R";
    cajaAdivinadas.innerHTML = "Adivinadas: 0";
  }
}

function cargar_datos() {
  if (localStorage.getItem("usuariosRegistrados") != null) {
    ranking = JSON.parse(localStorage.getItem("usuariosRegistrados"));
  }
}

function guardar_datos() {
  localStorage.setItem("usuariosRegistrados", JSON.stringify(ranking));
}

iniciarPagina();
