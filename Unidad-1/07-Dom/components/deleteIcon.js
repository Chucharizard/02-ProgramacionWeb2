const deleteIcon = () => {
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon'); // añadimos clases
    i.addEventListener('click', eliminarTarea); // cambiamos deleteTask a eliminarTarea
    return i;
}

const eliminarTarea = (evento) => {
    const parent = evento.target.parentElement;
    parent.remove();
}

export default deleteIcon;