// Función para eliminar elementos con doble clic
document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencia a la lista de tareas
    const taskList = document.querySelector('#taskList');
    
    // Even doble clic para eliminar elementos
    taskList.addEventListener('dblclick', (event) => {
        // Veri si el elemento que se toco es un li
        if (event.target.tagName === 'LI') {
            // Eliminar el elemento de la lista
            event.target.remove();
        }
    });
});
