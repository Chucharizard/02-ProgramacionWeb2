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
    },

    {
        'materia': 'matematicas discretas',
        'calificaciones': 100,
    },
    {
        'materia': 'fisica',
        'calificaciones': 50
    },
    {
        'materia': 'calculo',
        'calificaciones': 60
    },
    {
        'materia': 'algoritmos',
        'calificaciones': 70
    },
    {
        'materia': 'redes',
        'calificaciones': 90
    },
    {
        'materia': 'sistemas operativos',
        'calificaciones': 100
    },
        {
            'materia': 'animacion',
            'calificaciones': 80
        }
    ];
    
  for (let i = 0; i < datos.length; i++) {
    if(datos[i].calificaciones>=70){
      console.log('Aprobado en la materia: '+datos[i].materia)
    }
    else{
      console.log('Reprobado en la materia: '+datos[i].materia)
    }
  }

