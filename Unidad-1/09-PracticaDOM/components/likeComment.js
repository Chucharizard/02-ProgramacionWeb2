const likeComment = (id, counterElement) => {
    const button = document.createElement('button');
    button.classList.add('comment-action', 'like-btn');
    
    const icon = document.createElement('i');
    icon.classList.add('far', 'fa-heart');
    
    button.appendChild(icon);
    button.addEventListener('click', () => darLike(icon, counterElement));
    
    return button;
};

const darLike = (iconElement, counterElement) => {
    // Extraer el numero actual de likes y aumentarlou
    const currentText = counterElement.textContent;
    const currentLikes = parseInt(currentText) || 0;
    const newLikes = currentLikes + 1;
    
    // Actualizar el contador visible
    counterElement.textContent = `${newLikes} likes`;
    
    // Efecto visual para el botón de like
    iconElement.classList.remove('far');
    iconElement.classList.add('fas', 'liked');
    
    // Restablecer el icono después de un momento
    setTimeout(() => {
        iconElement.classList.remove('fas', 'liked');
        iconElement.classList.add('far');
    }, 1000);
};

export default likeComment;
