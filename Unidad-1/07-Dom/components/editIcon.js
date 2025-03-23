const editIcon = () => {
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-edit', 'editIcon', 'icon');
    i.addEventListener('click', editarTarea);
    return i;
};

const editarTarea = (evento) => {
    // Navegamos correctamente en el DOM para encontrar el elemento con la clase 'task'
    const taskElement = evento.target.closest('.card').querySelector('.task');
    const originalText = taskElement.textContent;
    
    // Creamos un input para editar
    const inputEdit = document.createElement('input');
    inputEdit.type = 'text';
    inputEdit.value = originalText;
    inputEdit.classList.add('editInput');
    
    // Reemplazamos el texto con el input
    taskElement.textContent = '';
    taskElement.appendChild(inputEdit);
    inputEdit.focus();
    
    // Guardar al presionar Enter
    inputEdit.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newText = inputEdit.value.trim();
            if (newText) {
                // Reemplazamos el input con el nuevo texto
                taskElement.textContent = newText;
            } else {
                // Si está vacío, restauramos el texto original
                taskElement.textContent = originalText;
            }
        }
    });
    
    // Guardar al perder el foco
    inputEdit.addEventListener('blur', () => {
        const newText = inputEdit.value.trim();
        if (newText) {
            taskElement.textContent = newText;
        } else {
            taskElement.textContent = originalText;
        }
    });
};

export default editIcon;
