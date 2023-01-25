//variables
let puntosJugador = 0 ;
let puntosPC =  0;
//manejo del Dom
const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnPlantar = document.querySelector('#btnPlantar');
const puntosHTML = document.querySelectorAll('small')
const cartasJugador = document.querySelector('#cartasJugador')
const cartasPC = document.querySelector('#cartasPC')

//cargamos las cartas en un arreglo 
const baraja  = [
'2C','2D','2H','2S',
'3C','3D','3H','3S',
'4C','4D','4H','4S',
'5C','5D','5H','5S',
'6C','6D','6H','6S',
'7C','7D','7H','7S',
'8C','8D','8H','8S',
'9C','9D','9H','9S',
'10C','10D','10H','10S',
'AC','AD','AH','AS',
'JC','JD','JH','JS',
'KC','KD','KH','KS',
'QC','QD','QH','QS',
];
//============== funciones basicas del juego ==============
//hacer funcion que mezcle la baraja 

const mezclaBaraja = () =>{
    baraja.sort(() => Math.random() - 0.5);  
    //console.log(baraja);
    return baraja;
}



const pedidrCarta = () =>{
    if (baraja.length === 0 ) {
        throw('no existe mas cartas en la baraja')
    }
    const carta = baraja.pop();    
    return carta;
}

const valorCarta = (carta) =>{
    const valor = carta.substring(0,carta.length-1);
    let puntos = 0
    if (isNaN(valor)) {
        puntos = valor === "A" ? 11 : 10;
    }else{
        puntos = valor * 1;
    }
    return puntos
}

const jugadorComputadora = (puntosMinimos)=>{
    do {
        const carta  = pedidrCarta();
        puntosPC = puntosPC + valorCarta(carta);
        puntosHTML[1].innerText = puntosPC;
        const imgCarta  = document.createElement('img');
        imgCarta.src = `./assets/img/${carta}.png`;
        imgCarta.classList.add("carta");
        cartasPC.append(imgCarta);

        if (puntosMinimos > 21) {
            break
        }

    } while (puntosPC<puntosMinimos&&puntosMinimos <= 21);
    //El tumeout pone a jugar al compu automaticamente durante 100 milisegundos
    setTimeout(()=>{
        if (puntosPC === puntosMinimos) {
            alert("Nadie gana :(")
        }else if (puntosMinimos > 21) {
            alert("Computadora gana")
        }else if (puntosPC > 21){
            alert("jugador gana")
        }else{
            alert("computadora gana")
        }
    },100)
}

//=================Eventos del juego=================
//Evento juego nuevo
btnNuevo.addEventListener('click',()=>{
   console.clear();
   mezclaBaraja();
   puntosJugador = 0;
   puntosPC = 0;
   puntosHTML[0].innerText = 0;
   puntosHTML[1].innerText= 0;
   cartasJugador.innerHTML = "";
   cartasPC.innerHTML = "";
   btnPedir.disabled = false
   btnPlantar.disabled = false

});

btnPedir.addEventListener('click',()=>{
    const carta = pedidrCarta();
    console.log(carta);
    //Aumentar valor de la carta del contador jugador     
    puntosJugador = puntosJugador + valorCarta(carta)
    console.log(puntosJugador)
    puntosHTML[0].innerText = puntosJugador;
    //mostrar las cartas en la capa correspondiente 
    const imgCarta  = document.createElement('img');
    imgCarta.src = `./assets/img/${carta}.png`;
    imgCarta.classList.add("carta");
    cartasJugador.append(imgCarta);
    //Validamos puntos acumulados
    if (puntosJugador>21) {
        console.log('lo siento excedio los 21 puntos del juego')
        btnPedir.disabled = true
        btnPlantar.disabled = true
        //aca jugaria la computadora
        jugadorComputadora(puntosJugador);//llama la funcion ugar del compu y le oasa los puntos del jugador
    }else if(puntosJugador === 21){
        console.log('excelente black jack')
        btnPedir.disabled = true
        btnPlantar.disabled = true
         //aca jugaria la computadora
         jugadorComputadora(puntosJugador);//llama la funcion ugar del compu y le oasa los puntos del jugador
    }
});

btnPlantar.addEventListener('click',()=>{
    btnPedir.disabled = true
    btnPlantar.disabled = true
    //Aca juega la computadora
    jugadorComputadora(puntosJugador);//llama la funcion ugar del compu y le oasa los puntos del jugador
});