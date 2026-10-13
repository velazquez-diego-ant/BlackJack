/*
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 * */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputadora = 0;

//* Referencias de HTML:
const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

const puntosHTML = document.querySelectorAll("small");
const divCartaJugador = document.querySelector("#jugador-cartas");
const divCartaComputadora = document.querySelector("#computadora-cartas");

//* Esta funcion crea un nuevo Deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  //console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};
crearDeck();

//* Esta funcion me perimite tomar una carta

const pedirCarta = () => {
  //* Como medida de seguridad si no hay mas cartas
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }

  const carta = deck.pop();
  return carta;
};
pedirCarta();

const valorCarta = (carta) => {
  //* El subtring: Regresa un nuevo string cortado en base ala posicion inical
  //* y un fianal que podemos definir
  const valor = carta.substring(0, carta.length - 1);
  // TODO: Forma mas rapida de reducir codigo:
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;

  console.log({ valor });
  //* isNAN: Evalua la que esta en () si es un numero o no
  console.log("Es un numero");
  //* el valor * 1; => hace con el fin que el valor que estemos
  // * asignando sea number y no String
};
const valor = valorCarta(pedirCarta());

//* Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartaComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  //* setTimeout: Me permite ejecutar el
  //* Callback en una una x catidad de milisegundos

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie Gana");
    } else if (puntosMinimos > 21) {
      alert("Computadora Gana");
    } else if (puntosComputadora > 21) {
      alert("jugador Gana");
    } else {
      alert("Computadora Gana");
    }
  }, 10);
};

//? Notas:
/* 
 ! Importante:
 * cuando se consulta en la consola de Chrome u otro navegador
 * cuando venga un numero y este tiene un color que no sea el gris predeterminado de Chrome
 * es un numero
 * 
 * Pero si es de color gris es un String
 * Deben ser capaces de ditingirlo
 * 
 */

/*
 * Eventos del DOOM
 * .addEventListenner: Registra un "escuchador" (listener) que espera a que
 * ocurra un evento específico sobre un elemento, y cuando ocurre, ejecuta una función que tú le indiques.
 * Despues de agregar un eveto se puede agregar una funcion como argumento como una fucnion se le
 * conoce como CALLBACK
 *
 * Es decir es una funcion que se esta mandando como argumento
 * Puede ser una funcion tradicional o tambien una funcion de flecha (Arrow Functions).
 *
 * Basicamente lo que se esta haciendo es cuando yo haga 'click' sobre este boton
 * va hacer una instruccion gracias a la funcion
 */
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartaJugador.append(imgCarta);
  //* El .disabled sirve para bloquear un boton o tambien un input depende de como lo uses

  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("Ganaste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

// TODO: BORRAR
btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

// TODO: NUEVO

btnNuevo.addEventListener("click", () => {
  console.clear();
  deck = [];
  deck = crearDeck();

  puntosJugador = 0;
  puntosComputadora = 0;
  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;

  divCartaComputadora.innerHTML = "";
  divCartaJugador.innerHTML = "";

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
