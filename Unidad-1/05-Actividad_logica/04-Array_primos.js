function esPrimo(numero) {
    if (numero <= 1) {
        return false;
    }
    
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    
    return true;
}

function filtrarPrimos(array) {
    let primos = [];
    
    for (let i = 0; i < array.length; i++) {
        if (esPrimo(array[i])) {
            primos.push(array[i]);
        }
    }
    
    return primos;
}

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
console.log("Array original:", numeros);
console.log("Números primos:", filtrarPrimos(numeros));
