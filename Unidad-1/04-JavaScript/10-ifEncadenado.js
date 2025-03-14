




if(edadPasajero >= 18 || compania){
    if(ciudadDestino.indexOf(ciudadesDisponibles) > -1){
        console.log('El destino esta disponible')
    }else{
        console.log('El destino no esta disponible')
    }
}else{
    if (edadPasajero>=16 && ciudadDestino=="Sucre"){
        console.log('El destino esta disponible')
    }
    else{
        console.log('El pasajero no puede viajar solo')
    }
}