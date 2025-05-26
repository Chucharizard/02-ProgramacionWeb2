function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const API_BASE_URL = 'http://localhost:3000/boletos';

const listar_boletos = () => {
    return fetch(API_BASE_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error al obtener los boletos:', error);
            throw error;
        });
};

const crear_boleto = (funcion_id, cliente_id, asiento, precio) => {
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            funcion_id, 
            cliente_id, 
            asiento, 
            precio: parseFloat(precio), 
            id: generarId() 
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al crear el boleto');
        }
        return response.json();
    });
};

const eliminar_boleto = (id) => {
    return fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el boleto');
        }
        return response.json();
    });
};

const obtener_boleto = (id) => {
    return fetch(`${API_BASE_URL}/${id}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error('Error al obtener el boleto');
            }
            return respuesta.json();
        });
};

export const boletoService = {
    listar_boletos,
    crear_boleto,
    eliminar_boleto,
    obtener_boleto
};
