function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const API_BASE_URL = 'http://localhost/api2/peliculas.php';

const listar_peliculas = () => {
    return fetch(API_BASE_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error al obtener las películas:', error);
            throw error;
        });
};

const crear_pelicula = (titulo, duracion, clasificacion, imagen_url) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, duracion, clasificacion, imagen_url, id: generarId() })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al crear la película');
        }
        return response.json();
    });
};

const eliminar_pelicula = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar la película');
        }
        return response.json();
    });
};

const obtener_pelicula = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error('Error al obtener la película');
            }
            return respuesta.json();
        });
};

const actualizar_pelicula = (id, titulo, duracion, clasificacion, imagen_url) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, duracion, clasificacion, imagen_url, id })
    }).then(respuesta => {
        if (!respuesta.ok) {
            throw new Error('Error al actualizar la película');
        }
        return respuesta.json();
    });
};

export const peliculaService = {
    listar_peliculas,
    crear_pelicula,
    eliminar_pelicula,
    obtener_pelicula,
    actualizar_pelicula
};
