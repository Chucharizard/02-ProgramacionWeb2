const listaProductos = () => fetch("http://localhost:3000/producto").then((respuesta) => respuesta.json());

const crearProducto = (nombre, precio, descripcion) => {
    return fetch ("http://localhost:3000/producto", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({nombre, precio, descripcion, id: uuid.v4()})
    });
};

const eliminarProducto = (id) => {
    return fetch(`http://localhost:3000/producto/${id}`, {
        method: "DELETE"
    });
};

const producto = (id) => {
    return fetch(`http://localhost:3000/producto/${id}`).then((respuesta) => respuesta.json());
};

const actualizarProducto = (nombre, precio, descripcion, id) => {
    return fetch(`http://localhost:3000/producto/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre, precio, descripcion})
    }).then(respuesta => console.log(respuesta)).catch((err) => console.log(err));
};

export const productService = {
    listaProductos,
    crearProducto,
    eliminarProducto,
    producto,
    actualizarProducto
};
