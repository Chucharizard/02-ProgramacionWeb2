function deleteData() {
    // Primero, obtengamos los posts disponibles para asegurarnos de eliminar uno que exista
    fetch('http://localhost:3000/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener posts: ' + response.status);
            }
            return response.json();
        })
        .then(posts => {
            if (posts.length === 0) {
                throw new Error('No hay posts disponibles para eliminar');
            }
            
            // Usamos el ID del primer post disponible
            const postId = posts[0].id;
            
            return fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'DELETE'
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            showResult({ message: "Post eliminado exitosamente", data });
        })
        .catch(error => {
            showResult('Error al eliminar post: ' + error.message, true);
        });
}
