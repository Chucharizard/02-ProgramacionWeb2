import { addTaskToDOM } from '../script.js';

const duplicateIcon = () => {
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-copy', 'duplicateIcon', 'icon');
    i.addEventListener('click', duplicarTarea);
    return i;
};

const duplicarTarea = (evento) => {
    // Navegamos correctamente en el DOM para encontrar el texto de la tarea
    const taskElement = evento.target.closest('.card');
    const taskText = taskElement.querySelector('.task').textContent;
    
    // Duplicamos la tarea con el mismo texto
    addTaskToDOM(taskText);
};

export default duplicateIcon;
