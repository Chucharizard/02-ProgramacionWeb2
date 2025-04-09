function postData() {
    const newPost = {
        id: Date.now().toString(),
        titulo: "Nuevo Post Creado",
        descripcion: "Este es un nuevo post creado con POST",
        fecha: new Date().toISOString().split('T')[0]
    };

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
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
        showResult('Error al crear post: ' + error.message, true);
    });
}
