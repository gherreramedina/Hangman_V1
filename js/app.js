/*d="letras_usadas"></div>
    <div id="contenedor_palabra"></div>
    <button id="boton_empezar">EMPE
*/

//Elementos variables del HTML
let contenedorPalabra = document.getElementById("contenedor_palabra"); //Donde estará la palabra a ser revelada
let botonEmpezar = document.getElementById("boton_empezar"); //El boton para empezar un juego nuevo
let botonIngresarLetra = document.getElementById("boton_ingresar_letra"); //El boton para empezar ingresar una letra
let letrasUsadas = document.getElementById("letras_usadas"); //Las letras que usaremos (correctas o incorrectas)


let hangman = document.getElementById("trapo"); //El personaje


//Pokemon elegido para jugar
let letrasDelPokemon;
function elegirPokemon(){
    //Aqui se hace un random dentro del array de pokemones en base a la longitud de ese array, se pone todo en mayusculas y se separan las letras en un array
    letrasDelPokemon = pokemones[Math.floor((Math.random() * pokemones.length))].toUpperCase().split('');
};
//document.getElementById("titulo_1" ).innerHTML = letrasDelPokemon; (esto era para probar si funcionaba la función de elegir pokemon)




//Inicializar variables para el juego
let errores;
let aciertos;
let listaLetrasUsadas;
let imagenesDelPersonaje = ["/vodoo/1.png","/vodoo/2.png","/vodoo/3.png","/vodoo/4.png","/vodoo/5.png","/vodoo/6.png","/vodoo/7.png"];
let letraIngresada;


//Empezar Juego, se espera que cuando el boton sea clickeado activara la funcion empezar juegp
botonEmpezar.addEventListener('click', empezarJuego);


//El boton ingresar letra activara la funcion para pedir letra
botonIngresarLetra.addEventListener('click', pedirLetra);







//FUNCIONES-----------------------------------------------------------

function empezarJuego(){
    //Como el juego empezara de nuevo todas las variables serán reiniciadas y el boton de empezar desaparecerá hasta que se termine el juego
    listaLetrasUsadas = [];
    errores = 0;
    aciertos = 0;
    contenedorPalabra.innerHTML="";
    
    //No se me ocurria como no hacer que se reacomode cada vez, así que le puse un caracter invisible para que se mantenga en la posición
    letrasUsadas.innerHTML = "‎ ";
    //El boton empezar se oculta y aparece el boton para ingresar letras
    botonEmpezar.style.display = "none";
    botonIngresarLetra.style.display = "block";


    //El personaje regresa a lo que era antes
    hangman.src = imagenesDelPersonaje[0];

    //Se elige pokemon nuevo
    elegirPokemon();

    //Se dibujan los guiones
    dibujarContenedorPalabras();

    //Cambiar el titulo
    document.getElementById("titulo_1" ).innerHTML = "¿Quién es ese pokemon?";
};


//Conforme se acumulen errores el personaje va a variar
function dibujar(){
    hangman.src = imagenesDelPersonaje[errores];
};


//Se pide que el jugador ingrese una letra para avanzar en el juego
function pedirLetra(){
    let letraIngresada = prompt("Ingresa una letra").toUpperCase();
 
     //Ahora se verifica si la letra está dentro de la letras del pokemon y si no la has ingresado ya
    if(letrasDelPokemon.includes(letraIngresada) && !listaLetrasUsadas.includes(letraIngresada)){
        actualizarAciertos();
        //Agrega esa letra ingresada a la lista de letras usadas
        listaLetrasUsadas.push(letraIngresada);
        cococorrecto(letraIngresada);
    }
    //si la has ingresado ya y esta correcta o incorrecta
    else if(listaLetrasUsadas.includes(letraIngresada)){
        alert("No uses letras que ya utilizaste")
    }
    //si no la has ingresado y es incorrecta
    else{
        actualizarError();
        //Agrega esa letra ingresada a la lista de letras usadas
        listaLetrasUsadas.push(letraIngresada);
    };
    

    
    //Se muestra la lista de letras usadas actualizada
    letrasUsadas.innerHTML = listaLetrasUsadas.join(" ");

};


function actualizarError(){
    errores = errores + 1;
    dibujar();
    if(errores == 6){
        alert("Fin del juego");
        botonEmpezar.style.display = "block";
        botonIngresarLetra.style.display = "none";

    }
};

function actualizarAciertos(){
    aciertos = aciertos + 1;
};





function dibujarContenedorPalabras(){
   /* for (let i = 0; i < letrasDelPokemon.length; i++){
        guiones =  " _ " + guiones;
    };
    contenedorPalabra.innerHTML = guiones;*/
    //Por cada elemento dentro del array de las letras del pokemon
    for (let i = 0; i < letrasDelPokemon.length; i++){
        //Se creara un objeto tipo span en el html
        let elemento = document.createElement('span');

        //El contenido de este seran las letras del pokemon
        elemento.innerHTML = letrasDelPokemon[i]

         //Se creaN dos clases de esta lista Letras que es cuando se muestran y escondidas cuando no
        
        elemento.classList.add('escondidas');
        

        //Se està agregando el objeto tipo span elemento a contenedorPalabra
        contenedorPalabra.appendChild(elemento) ;
      

    };
};


function cococorrecto(letra){
   
    //obtengo un array de los childrens de contenedorPalabra
   const { children } =  contenedorPalabra;
   
   //Itero dentro del array de childrens
    for(let i = 0; i < children.length; i++) {
        //Cuando la letra del children coincide con la letra ingresada, su clase cambia a "letras" y se muestra
        if(children[i].innerHTML === letra) {
            children[i].classList = 'letras';
        };
    };

};
