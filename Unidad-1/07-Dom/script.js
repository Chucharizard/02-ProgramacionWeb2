import checkComplete from "./components/checkComplete.js";
import deleteIcon from "./components/deleteIcon.js";

const btn = document.querySelector('[data-form-btn]');

console.log(btn);

// Funcion para recuperar un texto de mi input
const createTask = (evento) =>{
    // la nueva tarea la borra
    evento.preventDefault();
    // selecciona 
    const input = document.querySelector('[data-form-input]');
    console.log(input.value);

    // recuperar el querySelector de la Lista
    const value = input.value;
    // seleccionamos las data-list para que adentro añadamos algo
    const list = document.querySelector('[data-list]');
    // Vamos a añadir etiqeutas li
    const task = document.createElement('li');
    // dentro una card
    task.classList.add('card');
    input.value = '';
    // creando una variable para que creemos el elemento div
    const contenidoTask = document.createElement('div');
    contenidoTask.appendChild(checkComplete());
    const tituloTask = document.createElement('span');
    // aumentamos en la lista este task == div
    tituloTask.classList.add('task');
    // aumentamos en el texto el valor
    tituloTask.innerText = value;
    contenidoTask.appendChild(tituloTask);

    // task.innerHTML = contenido;
    task.appendChild(contenidoTask);
    task.appendChild(deleteIcon());
    list.appendChild(task);
};

// Cuando yo haga click va a llamar a la funcion que yo he generado
btn.addEventListener('click', createTask);