const escenaMenuInicial = document.getElementById("escenaMenuInicial");
const escenaJuego = document.getElementById("escenaJuego");
const comenzarButton = document.getElementById("comenzar");
const segundosElement = document.getElementById("segundos");

const segundosTotales = 75;
let segundosActuales = segundosTotales;

comenzarButton.addEventListener("click", () => {
  escenaMenuInicial.classList.add("oculta");
  escenaJuego.classList.remove("oculta");

  segundosElement.innerHTML = segundosTotales;
  iniciarTemporizador();

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


