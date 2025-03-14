const numeros = [5, 7, 2, 2, 2, 2, 2, 2, 9, 2];

function contarParesImpares(numeros) {
    let pares = 0;
    let impares = 0;
    
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] % 2 === 0) {
            pares++;
        } else {
            impares++;
        }
    }
    
    return {
        pares: pares,
        impares: impares
    };
}


const resultado = contarParesImpares(numeros);
console.log(resultado); 