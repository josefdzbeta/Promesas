
/**
 *   @author Jose Angel Fernandez
 *   @license GPL-3.0-or-later
 *
 */

'use strict'

let fPromesa = function(fExito, fFracaso){
    if (Math.random() > 0.5 ){
        let resultado = 42
        console.log('Hemos tenido exito')

        //LLamamos a fExito con el resultado
        fExito(resultado)

    }else{
        let error = 'Es el fin del mundo'
        console.log('Hemos fracasado')

        //Llamamos a fFracaso con el error
        fFracaso(error)
    }
}

let promesa = new Promise (fPromesa)

//Ahora podemos usar la promesa 
//Para eso le pasamos las funciones que gestionaran el resultado o el error

let fUsarResultado = function (resultado){
    console.log(`El resultado ha sido ${resultado}`)
}

let fControlarError = function (error){
    console.log(`El error ha sido ${error}`)
}

//Ahora que ya tenemos creadas las funciones que gestionara el resultado o el error
//USAMOS la promesa
promesa.then(fUsarResultado, fControlarError)

//PERO... no es habitual CREAR promesas
//Lo mas normal es que obtengamos promesas como resultado de llamar a 

//Por ejemplo, fetch

let promesaFetch = fetch('datos.txt') //Al usar fetch obtenemos una promesa
console.log(promesaFetch) //Este console.log aparacera antes de que se resuelva la promesa anterior

//Ahora vamos a utilizar la promesa (con funciones flecha)

promesaFetch.then(resultado => {
    console.log(resultado) //El resultado que obtenemos es de tipo Response

    //Para poder usar la respuesta, tenemos que obtener su texto
    let promesa2 = resultado.text() //El problema es que tambien devuelve una promesa!
    promesa2.then(resultado => console.log('Por fin tenemos el texto: \n' + resultado))

})

//Pero normalmente lo hacemos mas facil aprovechando que podemos "concatenar" promesas

fetch ('datos.json')
    .then (respuesta => respuesta.json())
    .then(respuesta =>
        //Aqui Obtenemos el objeto del JSON ya traducido
        console.log(respuesta))
    .catch(error => console.log(`Error ${error}`)) //al final de la cadena capturamos cualquier error