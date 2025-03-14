const ciudadesDisponibles= new Array("Santiago", "Bogota", "Lima", "MoteVideo");

const paisesDisponibles=("colombia","chile","peru","panama");
const cantidadCiudades=ciudadesDisponibles.length;

console.log('En la lista existen: '+cantidadCiudades+' elementos');
console.log('El la lista existen:  '+paisesDisponibles.length+' elementos');

ciudadesDisponibles.shift();
console.log('En la lista exiten: '+cantidadCiudades+' elementos');
console.log(ciudadesDisponibles)

ciudadesDisponibles.pop();
console.log('En la lista exiten: '+ciudadesDisponibles.length+' elementos');
console.log(ciudadesDisponibles);

console.log(ciudadesDisponibles.sort());

console.log('En la lista exiten: '+paisesDisponibles.indexOf("peru"));

const listaPaisesCiudades=paisesDisponibles.concat(ciudadesDisponibles);
console.log(listaPaisesCiudades);
;