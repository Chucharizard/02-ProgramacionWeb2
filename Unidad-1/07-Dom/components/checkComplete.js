const checkComplete = (id) => {
    const i = document.createElement('i'); // creacion de un icono
    i.classList.add("far", "fa-check-square", "icon"); // estoy dando estilos al icono
    i.addEventListener("click", (event) => toggleCompletado(event, id));
    return i;
};

// funcion para alternar el check (marcado/desmarcado)
const toggleCompletado = (evento, id) => {
    const element = evento.target;
    
    // Verificamos si ya está completado para alternar
    if(element.classList.contains('fas')) {
        // Si está marcado, lo desmarcamos
        element.classList.remove('fas', 'completeIcon');
        element.classList.add('far');
        // Actualizamos estado en localStorage
        actualizarEstadoTarea(id, false);
    } else {
        // Si no está marcado, lo marcamos
        element.classList.remove('far');
        element.classList.add('fas', 'completeIcon');
        // Actualizamos estado en localStorage
        actualizarEstadoTarea(id, true);
    }
};

const actualizarEstadoTarea = (id, completado) => {
    // Recuperar tareas existentes
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    // Buscar la tarea por ID
    const tareaIndex = tareas.findIndex(tarea => tarea.id === id);
    if (tareaIndex >= 0) {
        tareas[tareaIndex].completado = completado;
        // Guardar tareas actualizadas
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
};

export default checkComplete;