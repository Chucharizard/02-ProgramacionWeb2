import likeComment from './likeComment.js';
import deleteComment from './deleteComment.js';

// Crear elemento de comentario completo
const commentBox = (id, name, text, likes = 0) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('comment');
    commentElement.dataset.id = id;
    
    // Contenido principal del comentario
    const commentContent = document.createElement('div');
    commentContent.classList.add('comment-content');
    
    // Cabecera del comentario con nombre
    const nameElement = document.createElement('h3');
    nameElement.classList.add('comment-name');
    nameElement.textContent = name;
    
    // Texto del comentario
    const textElement = document.createElement('p');
    textElement.classList.add('comment-text');
    textElement.textContent = text;
    
    // Acciones del comentario (likes, eliminar)
    const commentActions = document.createElement('div');
    commentActions.classList.add('comment-actions');
    
    // Contador de likes
    const likeCounter = document.createElement('span');
    likeCounter.classList.add('like-counter');
    likeCounter.textContent = `${likes} likes`;
    
    // Añadir componentes de acciones
    commentActions.appendChild(likeComment(id, likeCounter));
    commentActions.appendChild(likeCounter);
    commentActions.appendChild(deleteComment(id));
    
    // Ensamblar todo el comentario
    commentContent.appendChild(nameElement);
    commentContent.appendChild(textElement);
    commentContent.appendChild(commentActions);
    
    commentElement.appendChild(commentContent);
    
    return commentElement;
};

export default commentBox;
