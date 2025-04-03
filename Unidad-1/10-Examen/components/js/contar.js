// Implementación de la funcionalidad de contar elementos
document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencia al botón, a la lista y al elemento de salida
    const countBtn = document.querySelector('#countBtn');
    const taskList = document.querySelector('#taskList');
    const output = document.querySelector('#output');
    
    // Función flecha para contar elementos
    const countItems = () => {
        // Obtener todos los elementos de la lista
        const items = taskList.querySelectorAll('li');
        
        // Mostrar el conteo en el elemento de salida
        output.textContent = `Total de tareas: ${items.length}`;
        
        console.log('Conteo de elementos realizado:', items.length);
    };
    
    // Agregar evento de clic al botón "Contar Items"
    countBtn.addEventListener('click', countItems);
    
    console.log('Módulo de contar cargado correctamente');
});
