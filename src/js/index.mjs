import { conjuntoPalabras } from "./constants.mjs";

const escenaMenuInicial = document.getElementById("escenaMenuInicial");
const escenaJuego = document.getElementById("escenaJuego");
const escenaFinal = document.getElementById("escenaFinal");

const comenzarButton = document.getElementById("comenzar");
const comenzarDificilButton = document.getElementById("comenzarDificil");

const menuButton = document.getElementById("menu");
const textoFinal = document.getElementById("textoFinal");

const segundosElement = document.getElementById("segundos");
const adivinarElement = document.getElementById("adivinar");
const contenedorCasillas = document.getElementById("palabras");
const contenedorAcciones = document.getElementById("acciones");
const cuentaAtrasInicial = document.getElementById("cuentaAtras");
const mensajeInicialElement = document.getElementById("mensajeInicial");

const segundosModoFacil = 120;
const segundosModoDificil = 50;

const maxFilas = 3;
const maxColumnas = 3;
let segundosActuales;
let cuentaAtras;
let intervaloTiempo;
let arrayAleatorio;
let arrayMezclado;
let palabrasAux = [];
let segundosIniciales;

menuButton.addEventListener("click", () => {
  escenaFinal.classList.add("oculta");
  escenaMenuInicial.classList.remove("oculta");
});

comenzarButton.addEventListener("click", () => {
  cuentaAtras = 10000;
  segundosIniciales = cuentaAtras / 1000;
  cuentaAtrasInicial.innerHTML = segundosIniciales;

  segundosActuales = segundosModoFacil;
  segundosElement.innerHTML = segundosModoFacil;
  comenzarJuego();
});

comenzarDificilButton.addEventListener("click", () => {
  cuentaAtras = 5000;
  segundosIniciales = cuentaAtras / 1000;
  cuentaAtrasInicial.innerHTML = segundosIniciales;

  segundosActuales = segundosModoDificil;
  segundosElement.innerHTML = segundosModoDificil;
  comenzarJuego();
});

function mezclarValoresArray() {
  let array = conjuntoPalabras[Math.floor(Math.random() * conjuntoPalabras.length)];
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function comenzarJuego() {
  escenaMenuInicial.classList.add("oculta");
  escenaJuego.classList.remove("oculta");

  arrayMezclado = mezclarValoresArray();

  palabrasAux = arrayMezclado;
  contenedorCasillas.innerText = "";

  nuevaPalabra();
  pintarCasillas();

  let intervaloInicial = setInterval(() => {
    segundosIniciales = segundosIniciales - 1;
    cuentaAtrasInicial.innerHTML = segundosIniciales;
  }, 1000);

  setTimeout(() => {
    mensajeInicialElement.classList.add("escondida");
    clearInterval(intervaloInicial);
    iniciarTemporizador();
    ocultarPalabras();
    mostrarInterfaz();
  }, cuentaAtras);

}

function iniciarTemporizador() {

  intervaloTiempo = setInterval(() => {
    segundosActuales = segundosActuales - 1;
    segundosElement.innerHTML = segundosActuales;

    if (segundosActuales == 0) {
      clearInterval(intervaloTiempo);
      textoFinal.innerText = "¡Has perdido!";
      escenaJuego.classList.add("oculta");
      escenaFinal.classList.remove("oculta");
    }

  }, 1000);

}

function nuevaPalabra() {

  let random = Math.floor(Math.random() * palabrasAux.length);
  adivinarElement.innerHTML = palabrasAux[random];

}

function pintarCasillas() {

  let contadorNumeros = 1;

  for (let fila = 0; fila < maxFilas; fila++) {

    let filaCasillas = document.createElement("div");
    filaCasillas.setAttribute("class", "filas");

    for (let columna = 0; columna < maxColumnas; columna++) {

      let casilla = document.createElement("div");
      casilla.setAttribute("class", "casilla");

      let numero = document.createElement("p");
      numero.setAttribute("class", "oculta");
      numero.innerText = contadorNumeros;

      let palabra = document.createElement("p");
      palabra.innerText = palabrasAux[contadorNumeros - 1];

      contadorNumeros++;

      casilla.appendChild(numero);
      casilla.appendChild(palabra);

      casilla.addEventListener("click", (e) => {
        let seleccionada = palabra.innerText;
        let hijos = casilla.childNodes;
        let numeroCasilla = hijos[0];
        let palabraCasilla = hijos[1];

        if (seleccionada == adivinarElement.innerText) {
          // PROCESAMOS EL ACIERTO
          palabraCasilla.classList.remove("oculta");
          numeroCasilla.classList.add("oculta");
          casilla.classList.add("acertada");

          let index = palabrasAux.indexOf(seleccionada);
          if (index !== -1) {
            palabrasAux.splice(index, 1);
          }

          if (palabrasAux.length === 0) {
            clearInterval(intervaloTiempo);
            escenaJuego.classList.add("oculta");
            escenaFinal.classList.remove("oculta");
            textoFinal.innerText = "¡Has ganado!";

          } else {
            nuevaPalabra();
          }

        }
        else {
          // PROCESAMOS EL ERROR
          palabrasAux = arrayMezclado;
          nuevaPalabra();
          ocultarPalabras();
        }

      });



      filaCasillas.appendChild(casilla);

    }

    contenedorCasillas.appendChild(filaCasillas);

  }

}

function ocultarPalabras() {
  let casillasTablero = document.getElementsByClassName("casilla");

  for (let index = 0; index < casillasTablero.length; index++) {
    let casilla = casillasTablero[index];
    let parrafos = casilla.getElementsByTagName("p");
    let numeroCasilla = parrafos[0];
    let palabraCasilla = parrafos[1];

    numeroCasilla.classList.remove("oculta");
    palabraCasilla.classList.add("oculta");
    casilla.classList.remove("acertada");
  }

}

function mostrarInterfaz() {
  contenedorAcciones.classList.remove("escondida");
}
