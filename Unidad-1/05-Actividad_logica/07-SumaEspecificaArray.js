function sumarPropiedad(arrayObjetos, propiedad) {
    let suma = 0;
    
    for (let i = 0; i < arrayObjetos.length; i++) {

        if (arrayObjetos[i][propiedad] !== undefined) {
            suma += arrayObjetos[i][propiedad];
        }
    }
    
    return suma;
}

const productos = [
    { nombre: "Laptop", precio: 800 },
    { nombre: "Celular", precio: 500 },
    { nombre: "Tablet", precio: 300 },
    { nombre: "Auriculares", precio: 100 }
];

console.log("Array de productos:", productos);
console.log("La suma de los precios es:", sumarPropiedad(productos, "precio"));

const estudiantes = [
    { nombre: "Ana", edad: 21, calificacion: 90 },
    { nombre: "Carlos", edad: 22, calificacion: 85 },
    { nombre: "Elena", edad: 20, calificacion: 95 }
];

console.log("Array de estudiantes:", estudiantes);
console.log("La suma de las calificaciones es:", sumarPropiedad(estudiantes, "calificacion"));
