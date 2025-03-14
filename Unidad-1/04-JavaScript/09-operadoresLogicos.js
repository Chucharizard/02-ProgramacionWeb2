let edadPersonal
=17;
let conAcompanante=true;
const precioPasaje=1000;
const ciudadDestino="Sucre";
const ciudadesDisponibles= new Array("Santiago", "Bogota", "Lima", "MoteVideo");

if(precioPasaje===1000){
    console.log('El pasaje cuesta 1000');
}

console.log('verificando pasaje para ciudad'+ciudadDestino)
if ((ciudadesDisponibles.indexOf(ciudadDestino)>-1)&&(edadPasajero>=18)|| conAcompanante){
    console.log('El destino esta disponible');
}
else{
    console.log('El destino no esta disponible');
}