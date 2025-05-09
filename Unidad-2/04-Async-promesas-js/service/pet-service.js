function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const API_BASE_URL = 'http://localhost/api1/pets.php';

const lista_mascotas = () => {
    return fetch(API_BASE_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error al obtener los datos:', error);
            throw error;
        });
};

const crearMascota = (nombre, edad, descripcion) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, edad, descripcion, id: generarId() })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al crear la mascota');
        }
        return response.json();
    });
};

const eliminarMascota = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar la mascota');
        }
        return response.json();
    });
};

const obtenerMascota = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta) => respuesta.json());
};

const actualizarMascota = (nombre, edad, descripcion, id) => { 
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, edad, descripcion, id })
    }).then(respuesta => {
        if (!respuesta.ok) {
            throw new Error('Error al actualizar la mascota');
        }
        return respuesta.json();
    }).catch(err => {
        console.error(err);
        throw err;
    });
};

export const petService = {
    lista_mascotas,
    crearMascota,
    eliminarMascota,
    obtenerMascota,
    actualizarMascota
};
