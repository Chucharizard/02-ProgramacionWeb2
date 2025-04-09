// Imp de la funcionalidad de relleno
document.addEventListener('DOMContentLoaded', () => {
    // Obtener ref a la lista de tareas
    const taskList = document.querySelector('#taskList');
    
    // Even clic para el elemento de la lista
    taskList.addEventListener('click', (event) => {
        // Veri si el elemento que se toco es un li
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('relleno');
        }
    });
});