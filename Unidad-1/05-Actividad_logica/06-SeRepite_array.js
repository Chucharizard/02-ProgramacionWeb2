function numeroMasRepetido(array) {
    let conteo = {};
    
    for (let i = 0; i < array.length; i++) {
        let numero = array[i];
        
        if (conteo[numero] === undefined) {
            conteo[numero] = 1;
        } else {
            conteo[numero]++;
        }
    }
    
    let numeroMasRepetido;
    let mayorFrecuencia = 0;
    
    for (let numero in conteo) {
        if (conteo[numero] > mayorFrecuencia) {
            mayorFrecuencia = conteo[numero];
            numeroMasRepetido = numero;
        }
    }
    
    return Number(numeroMasRepetido);
}

const numeros = [1, 2, 3, 2, 4, 2, 5, 1, 3, 2, 6, 2];
console.log("Array original:", numeros);
console.log("El numero que mas se repite es:", numeroMasRepetido(numeros));
console.log("Se repite", contarRepeticiones(numeros, numeroMasRepetido(numeros)), "veces");

function contarRepeticiones(array, numero) {
    let contador = 0;
    
    for (let i = 0; i < array.length; i++) {
        if (array[i] === numero) {
            contador++;
        }
    }
    
    return contador;
}
