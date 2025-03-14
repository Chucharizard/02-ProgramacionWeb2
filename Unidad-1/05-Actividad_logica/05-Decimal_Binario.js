function decimalABinario(decimal) {
    if (decimal === 0) {
        return "0";
    }
    
    let binario = "";
    let numero = decimal;
    
    while (numero > 0) {
        let resto = numero % 2;
        
        binario = resto + binario;
        
        numero = Math.floor(numero / 2);
    }
    
    return binario;
}


const numero1 = 10;
console.log(`${numero1} en binario es: ${decimalABinario(numero1)}`);

const numero2 = 25;
console.log(`${numero2} en binario es: ${decimalABinario(numero2)}`);
