const newItemInput = document.querySelector('#newItem');
const addBtn = document.querySelector('#addBtn');
const taskList = document.querySelector('#taskList');

// para agregar una nueva tareita
const addNewTask = () => {
    // Obtener el valor del input
    const taskText = newItemInput.value.trim();
    
    // Verificar si el input esta vacío
    if (taskText === '') {
        alert('Por favor, ingresa una tarea');
        return;
    }
    
    // Crear nuevo elemento de lista
    const newTask = document.createElement('li');
    newTask.className = 'item';
    newTask.textContent = taskText;
    
    // Agregar el nuevo elemento a la lista
    taskList.appendChild(newTask);
    
    // Limpiar el input después de agregar
    newItemInput.value = '';
};
    
// Even clic para el botón Agregar
addBtn.addEventListener('click', addNewTask);

// Evento para tecla Enter en el input
newItemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addNewTask();
    }
});
