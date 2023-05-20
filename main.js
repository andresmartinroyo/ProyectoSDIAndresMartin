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

//Variables de boxes del html
let cajaAdivinadas = document.getElementById("adivinadas");
let tiempo = document.getElementById("timer");

//Defino los numeros de las cartas y me los pone volteadas
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});
console.log(numbers);

//Al momento que esta funcion se active, iniciara un contador desde 180 hasta 0
function temporizador() {
  tiempoRestante = 15;
  cuentaRegresiva = setInterval(() => {
    tiempoRestante--;
    if (tiempoRestante == 0) {
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
    respuesta.innerHTML = numbers[i];
    respuesta.disabled = true;
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
    tarjeta1.innerHTML = numbers[id];
    primerResultado = numbers[id];
    tarjeta1.disabled = true;
    //Si esta es la segunda que destapo
  } else {
    tarjeta2 = document.getElementById(id);
    tarjeta2.innerHTML = numbers[id];
    tarjetas_volteadas = 0;
    segundoResultado = numbers[id];
    tarjeta2.disabled = true;
    //Si mi primer resultado es igaul a mi segundo resultado
    if (primerResultado == segundoResultado) {
      tarjetasAdivinadas++;
      cajaAdivinadas.innerHTML = "Adivinadas: " + tarjetasAdivinadas;
      //Si no son iguales quiero mostrar un momento y despues dejar de volver a tapar
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
      }, 500);
    }
  }
  if (tarjetasAdivinadas == 8) {
    score = 100 * (tiempoRestante / 180);
  }
}
