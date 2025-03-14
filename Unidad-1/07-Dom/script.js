const btn = document.querySelector('[data-form-btn]');

console.log(btn);

//funcion para crear una recuperar texto de un input
const createTask = (evento) => {
    evento.preventDefault();
    const input = document.querySelector('[data-form-input]');
    const valor = input.value;
    const lista = document.querySelector('[data-list]');
    
    // Solo crear tarea si hay texto
    if(valor.trim() === '') return;
    
    const task = document.createElement('li');
    task.classList.add('card');
    
    // Crear estructura de la tarea
    const conTask = document.createElement('div');
    const taskText = document.createElement('span');
    taskText.classList.add('task');
    taskText.innerText = valor;
    
    // Añadir checkbox
    const checkButton = checkComplete();
    conTask.appendChild(checkButton);
    conTask.appendChild(taskText);
    
    // Añadir ícono de eliminar
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
    
    // Estructurar y añadir tarea a la lista
    task.appendChild(conTask);
    task.appendChild(deleteIcon);
    lista.appendChild(task);
    
    // Limpiar el input
    input.value = '';
};

btn.addEventListener('click', createTask);

const checkComplete=()=>{
    const i =document.createElement('i')// creacion de un icono 
    i.classList.add("far","fa-check-square","icon")//dando estilos al icono
    i.addEventListener("click",color)
    return i;
}

const color =(evento)=>{
    const element= evento.target
    element.classList.add('fas');
    element.classList.add('completeIcon');
    element.classList.remove('far');
};



