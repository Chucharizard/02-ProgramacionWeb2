function getData() {
    fetch('http://localhost:3000/posts')
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
            showResult('Error al obtener datos: ' + error.message, true);
        });
}
