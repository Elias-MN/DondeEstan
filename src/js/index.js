const escenaMenuInicial = document.getElementById("escenaMenuInicial");
const escenaJuego = document.getElementById("escenaJuego");
const comenzarButton = document.getElementById("comenzar");
const segundosElement = document.getElementById("segundos");
const adivinarElement = document.getElementById("adivinar");
const contenedorCasillas = document.getElementById("palabras");

const segundosTotales = 75;
const maxFilas = 3;
const maxColumnas = 3;
let segundosActuales = segundosTotales;
let cuentaAtras = 3000;

const palabras = ["Coche", "Tren", "Camión", "Moto", "Barco", "Avión", "Bicicleta", "Tractor", "Helicoptero"];

comenzarButton.addEventListener("click", () => {
  escenaMenuInicial.classList.add("oculta");
  escenaJuego.classList.remove("oculta");

  segundosElement.innerHTML = segundosTotales;
  pintarCasillas();

  setTimeout(() => {
    iniciarTemporizador();
    nuevaPalabra();
    ocultarPalabras();
    mostrarInterfaz();
  }, cuentaAtras);

});

function iniciarTemporizador() {

  let intervaloTiempo = setInterval(() => {
    segundosActuales = segundosActuales - 1;
    segundosElement.innerHTML = segundosActuales;

    if (segundosActuales == 0) {
      clearInterval(intervaloTiempo);
      // TODO
    }

  }, 1000);

}

function nuevaPalabra() {

  let random = Math.floor(Math.random() * palabras.length);
  adivinarElement.innerHTML = palabras[random];

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
      palabra.innerText = palabras[contadorNumeros - 1];

      contadorNumeros++;

      casilla.appendChild(numero);
      casilla.appendChild(palabra);

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
    parrafos[0].classList.remove("oculta");
    parrafos[1].classList.add("oculta");
  }

}


function mostrarInterfaz() {


}
