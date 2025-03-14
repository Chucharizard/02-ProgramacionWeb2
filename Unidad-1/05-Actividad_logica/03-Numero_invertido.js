function invertirNumero(numero) {

    let numeroTexto = numero.toString();
    
    let invertido = "";
    
    
    for (let i = numeroTexto.length - 1; i >= 0; i--) {
        invertido += numeroTexto[i];
    }
    
    return Number(invertido);
}

const numero = 12345;
console.log("Numero original:", numero);
console.log("Numero invertido:", invertirNumero(numero));
