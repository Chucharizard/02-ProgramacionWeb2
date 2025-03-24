const deleteComment = (id) => {
    const button = document.createElement('button');
    button.classList.add('comment-action', 'delete-btn');
    
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-trash-alt');
    
    button.appendChild(icon);
    button.addEventListener('click', () => eliminarComentario(id));
    
    return button;
};

const eliminarComentario = (id) => {
    // Confirmar antes de eliminar
    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        // Buscar y eliminar el comentario del DOM
        const commentElement = document.querySelector(`li[data-id="${id}"]`);
        if (commentElement) {
            commentElement.remove();
            
            // Si no quedan comentarios, mostrar mensaje
            const commentsList = document.querySelector('[data-comments-list]');
            if (commentsList.children.length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.classList.add('empty-comments');
                emptyMessage.textContent = 'Aún no hay comentarios. ¡Sé el primero en comentar!';
                commentsList.appendChild(emptyMessage);
            } else{
                showNotification('Comentario elimando con exito');
            }
        }
    }
};



export default deleteComment;
