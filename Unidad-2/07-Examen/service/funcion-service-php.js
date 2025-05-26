function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const API_BASE_URL = 'http://localhost/api2/funciones.php';

const listar_funciones = () => {
    return fetch(API_BASE_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error al obtener las funciones:', error);
            throw error;
        });
};

const crear_funcion = (pelicula_id, sala, fecha, hora, precio) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pelicula_id, sala, fecha, hora, precio, id: generarId() })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al crear la función');
        }
        return response.json();
    });
};

const eliminar_funcion = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar la función');
        }
        return response.json();
    });
};

const obtener_funcion = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error('Error al obtener la función');
            }
            return respuesta.json();
        });
};

const actualizar_funcion = (id, pelicula_id, sala, fecha, hora, precio) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, pelicula_id, sala, fecha, hora, precio })
    }).then(respuesta => {
        if (!respuesta.ok) {
            throw new Error('Error al actualizar la función');
        }
        return respuesta.json();
    });
};

export const funcionService = {
    listar_funciones,
    crear_funcion,
    eliminar_funcion,
    obtener_funcion,
    actualizar_funcion
};
