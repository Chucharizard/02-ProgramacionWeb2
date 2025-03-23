import checkComplete from "./components/checkComplete.js";
import deleteIcon from "./components/deleteIcon.js";
import editIcon from "./components/editIcon.js";
import duplicateIcon from "./components/duplicateIcon.js";

const btn = document.querySelector('[data-form-btn]');

// Función para añadir una tarea al DOM 
export const addTaskToDOM = (value) => {
    if (!value.trim()) return; // No añadir tareas vacias
    
    const list = document.querySelector('[data-list]');
    const task = document.createElement('li');
    task.classList.add('card');
    
    // Contenedor para el texto
    const contenidoTask = document.createElement('div');
    contenidoTask.classList.add('taskMainContent');
    contenidoTask.appendChild(checkComplete());
    
    const tituloTask = document.createElement('span');
    tituloTask.classList.add('task');
    tituloTask.innerText = value;
    contenidoTask.appendChild(tituloTask);
    
    // Contenedor para los iconos/acciones
    const taskActions = document.createElement('div');
    taskActions.classList.add('taskActions');
    taskActions.appendChild(editIcon());
    taskActions.appendChild(duplicateIcon());
    taskActions.appendChild(deleteIcon());
    
    // Agregamos los contenedores al li principal
    task.appendChild(contenidoTask);
    task.appendChild(taskActions);
    list.appendChild(task);
    
    return task;
};

// Función para recuperar un texto de mi input
const createTask = (evento) => {
    evento.preventDefault();
    const input = document.querySelector('[data-form-input]');
    const value = input.value;
    
    if (value.trim() !== '') {
        addTaskToDOM(value);
        input.value = '';
    }
};

// Cuando yo haga click va a llamar a la función que yo he generado
btn.addEventListener('click', createTask);

// Agregar soporte para tecla Enter en el input
const input = document.querySelector('[data-form-input]');
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        createTask(e);
    }
});