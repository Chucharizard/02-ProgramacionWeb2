import commentBox from './commentBox.js';

// Elementos del DOM
const commentForm = document.querySelector('[data-comment-form]');
const nameInput = document.querySelector('[data-comment-name]');
const textInput = document.querySelector('[data-comment-text]');
const commentsList = document.querySelector('[data-comments-list]');

// Generar un ID único para cada comentario
const generateID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Añadir un nuevo comentario
const addComment = (event) => {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    
    if (name && text) {
        const id = generateID();
        
        // Eliminar el mensaje de "no hay comentarios" si existe
        const emptyMessage = document.querySelector('.empty-comments');
        if (emptyMessage) {
            emptyMessage.remove();
        }
        
        // Añadir al DOM
        const commentElement = commentBox(id, name, text, 0);
        commentsList.appendChild(commentElement);
        
        // Limpiar el formulario
        nameInput.value = '';
        textInput.value = '';
        
        // Mostrar mensaje de éxito
        showNotification('Comentario publicado con éxito');
    }
};

// Cargar un mensaje inicial si no hay comentarios
const initializeComments = () => {
    if (commentsList.children.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('empty-comments');
        emptyMessage.textContent = 'Aún no hay comentarios. ¡Sé el primero en comentar!';
        commentsList.appendChild(emptyMessage);
    }
};

// Mostrar notificación temporal
const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
};

// Eventos
commentForm.addEventListener('submit', addComment);

// Inicializar comentarios al cargar la página
document.addEventListener('DOMContentLoaded', initializeComments);
