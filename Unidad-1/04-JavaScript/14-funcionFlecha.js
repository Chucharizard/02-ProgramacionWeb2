const datos=[
    {
        'materia':'programacion web',
        'calificaciones': 70
    },

    {
        'materia': 'database 2',
        'calificaciones': 80,
    },
    
    {
        'materia': 'ingles',
        'calificaciones': 90,
    }
];

const procesarDatos = (datos) => {
    return datos
        .filter(datos => datos.calificaciones >= 70)
        .map(datos => {
            const { materia } = datos;
            return materia.length >5 ? materia.toUpperCase() : materia.toLowerCase();
        });
}
const resultado = procesarDatos(datos);
console.log(resultado);