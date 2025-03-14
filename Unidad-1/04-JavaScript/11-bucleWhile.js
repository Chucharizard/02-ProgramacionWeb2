const ciudadesDisponibles= new Array("Santiago", "Bogota", "Lima", "MoteVideo");
const precioPasaje=new Array(200, 300, 100, 400);
const presuDisponible=210;
let i = 0;

while(precioPasaje[i]>presuDisponible && i<ciudadesDisponibles.length){
    i++;
}
if(i==ciudadesDisponibles.length)
    console.log('No hay destinos disponibles')
 else
    console.log('El destino disponible es: '+ciudadesDisponibles[i])
