function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const API_BASE_URL = 'http://localhost/api-sqlserver/clientes.php';

const listar_clientes = () => {
    return fetch(API_BASE_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API SQL Server');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error al obtener los clientes desde SQL Server:', error);
            throw error;
        });
};

const crear_cliente = (nombre, email, telefono) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, telefono, id: generarId() })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al crear el cliente en SQL Server');
        }
        return response.json();
    });
};

const eliminar_cliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el cliente en SQL Server');
        }
        return response.json();
    });
};

const obtener_cliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error('Error al obtener el cliente desde SQL Server');
            }
            return respuesta.json();
        });
};

const actualizar_cliente = (id, nombre, email, telefono) => {
    return fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, nombre, email, telefono })
    }).then(respuesta => {
        if (!respuesta.ok) {
            throw new Error('Error al actualizar el cliente en SQL Server');
        }
        return respuesta.json();
    });
};

export const clienteService = {
    listar_clientes,
    crear_cliente,
    eliminar_cliente,
    obtener_cliente,
    actualizar_cliente
};
