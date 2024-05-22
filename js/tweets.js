//declarar los selectores
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

formulario.addEventListener('submit', agregarTweet);

function agregarTweet(e){
    e.preventDefault();
    console.log('ingrese a la funcion')
    const tweet = document.querySelector('#tweet').value
    console.log(tweet)
    if(tweet === ''){
        console.log('el campo esta vacio');
        mostrarError('El campo se encuentra vacio')
        return
    }else if (tweet.length > 250){
        mostrarError('Su tweet tiene mas de 250 caracteres');
        return
    }else{

        const tweetObj = {
                tweet: tweet,
                id: Date.now()
                }
        tweets = [...tweets, tweetObj];
        console.log(tweets);
    }
    crearHTML();
    formulario.reset()
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.innerHTML = mensaje;
    mensajeError.classList.add('error');
    //insertar el mensaje de error
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //eliminar la alerta despues de 3 segundos
    setTimeout(()=>{
        mensajeError.remove()
    },3000)
}

function crearHTML(){
    limpiarHTML();
    //console.log('ingrese a la funcion crearHTML');

    //mostrar toda la informacion guardada en el arreglo tweets

    if(tweets.length > 0){
        //al menos hay un tweet guardado en el arreglo
        //crear y mostrar ese html en la interfaz

        //recorrer el arreglo
        tweets.forEach(tweets => {
            const li = document.createElement('li');
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            btnEliminar.onclick = ()=>{
                borrarTweet(tweets.id);
            }

            li.innerText = tweets.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        })
    }
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}
function borrarTweet(id){
    console.log('ingresar a borrar')
    tweets = tweets.filter(tweets => tweets.id !== id);
    console.log(tweets);
    crearHTML();
 }