const deleteIcon = () => {
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon'); // añadimos clases
    i.addEventListener('click', eliminarTarea); // cambiamos deleteTask a eliminarTarea
    return i;
}

const eliminarTarea = (evento) => {
    // Obtenemos el elemento card completo para eliminarlo
    const parent = evento.target.closest('.card');
    parent.remove();
}

export default deleteIcon;