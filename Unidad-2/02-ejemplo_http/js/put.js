function putData() {
    // Primero, obtengamos los posts disponibles para asegurarnos de actualizar uno que exista
    fetch('http://localhost:3000/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener posts: ' + response.status);
            }
            return response.json();
        })
        .then(posts => {
            if (posts.length === 0) {
                throw new Error('No hay posts disponibles para actualizar');
            }
            
            // Usamos el ID del primer post disponible
            const postId = posts[0].id;
            
            const updatedPost = {
                id: postId,
                titulo: "Post Actualizado",
                descripcion: "Este post ha sido actualizado con PUT",
                fecha: new Date().toISOString().split('T')[0]
            };

            return fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            showResult(data);
        })
        .catch(error => {
            showResult('Error al actualizar post: ' + error.message, true);
        });
}
