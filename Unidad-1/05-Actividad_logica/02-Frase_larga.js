
function palabraMasLarga(frase) {
    
    const palabras = frase.split(' '); 
    
    let palabraLarga = palabras[0]; 
    
    for (let i = 1; i < palabras.length; i++) { 
        
        if (palabras[i].length > palabraLarga.length) { 
            palabraLarga = palabras[i]; 
        }
    }
    
    return palabraLarga;
}

const frase = "EL panadero con el pan";
console.log("La palabra más larga es:", palabraMasLarga(frase));
