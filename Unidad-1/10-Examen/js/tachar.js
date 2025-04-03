// funcion para tacha el ultimo de la lista
document.addEventListener('DOMContentLoaded', () => {

    const toggleBtn = document.querySelector('#toggleBtn');
    const taskList = document.querySelector('#taskList');
    
    toggleBtn.addEventListener('click', () => {
        // Obtener todos los elementos de la lista
        const items = taskList.querySelectorAll('li');
        
        // ver si hay elementos en la lista
        if (items.length > 0) {
            // Obtener el ultimo elemento
            const lastItem = items[items.length - 1];
            
            // Alternar la clase "tachado" en el último elemento
            lastItem.classList.toggle('tachado');
            
        }
    });
    
});
