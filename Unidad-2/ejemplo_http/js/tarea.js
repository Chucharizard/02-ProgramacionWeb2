// Seleccionar elementos con data-attributes
const tareaInput = document.querySelector('[data-tarea]');
const fechaInput = document.querySelector('[data-fecha]');
const descripcionInput = document.querySelector('[data-descripcion]');
const nombreInput = document.querySelector('[data-nombre]');
const valorInput = document.querySelector('[data-valor]');
const tareaIdInput = document.querySelector('[data-tarea-id]');
const submitBtn = document.querySelector('[data-submit]');
const form = document.querySelector('[data-form]');
const listaTareas = document.querySelector('[data-lista-tareas]');
const statusElement = document.querySelector('[data-status]');

// Obtener tareas
const obtenerTareas = () => {
    fetch('http://localhost:3000/tareas')
        .then(response => response.json())
        .then(tareas => mostrarTareas(tareas))
        .catch(error => mostrarMensaje('Error: ' + error.message, true));
};

// Agregar tarea
const agregarTarea = (e) => {
    e.preventDefault();
    
    const nuevaTarea = {
        id: Date.now().toString(),
        tarea: tareaInput.value,
        fecha: fechaInput.value,
        descripcion: descripcionInput.value,
        nombre: nombreInput.value,
        valor: parseInt(valorInput.value)
    };

    fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaTarea)
    })
    .then(response => response.json())
    .then(() => {
        form.reset();
        mostrarMensaje('Tarea agregada');
        obtenerTareas();
    })
    .catch(error => mostrarMensaje('Error: ' + error.message, true));
};

// Eliminar tarea
const eliminarTarea = (id) => {
    fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        mostrarMensaje('Tarea eliminada');
        obtenerTareas();
    })
    .catch(error => mostrarMensaje('Error: ' + error.message, true));
};

// Crear botón con evento
const crearBoton = (texto, clase, callback) => {
    const boton = document.createElement('button');
    boton.textContent = texto;
    boton.className = clase;
    boton.addEventListener('click', callback);
    return boton;
};

// Cargar tarea para editar
const cargarTareaParaEditar = (id) => {
    fetch(`http://localhost:3000/tareas/${id}`)
        .then(response => response.json())
        .then(tarea => {
            tareaIdInput.value = tarea.id;
            tareaInput.value = tarea.tarea;
            fechaInput.value = tarea.fecha;
            descripcionInput.value = tarea.descripcion;
            nombreInput.value = tarea.nombre;
            valorInput.value = tarea.valor;
            
            submitBtn.textContent = 'Actualizar';
            submitBtn.removeEventListener('click', agregarTarea);
            submitBtn.addEventListener('click', actualizarTarea);
        })
        .catch(error => mostrarMensaje('Error: ' + error.message, true));
};

// Actualizar tarea
const actualizarTarea = (e) => {
    e.preventDefault();
    
    const id = tareaIdInput.value;
    
    const tarea = {
        id: id,
        tarea: tareaInput.value,
        fecha: fechaInput.value,
        descripcion: descripcionInput.value,
        nombre: nombreInput.value,
        valor: parseInt(valorInput.value)
    };

    fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarea)
    })
    .then(() => {
        form.reset();
        tareaIdInput.value = '';
        
        submitBtn.textContent = 'Agregar';
        submitBtn.removeEventListener('click', actualizarTarea);
        submitBtn.addEventListener('click', agregarTarea);
        
        mostrarMensaje('Tarea actualizada');
        obtenerTareas();
    })
    .catch(error => mostrarMensaje('Error: ' + error.message, true));
};

// Mostrar tareas en tabla
const mostrarTareas = (tareas) => {
    // Limpiar la lista
    listaTareas.innerHTML = '';
    
    if (tareas.length === 0) {
        const fila = document.createElement('tr');
        const celda = document.createElement('td');
        celda.colSpan = 6;
        celda.textContent = 'No hay tareas';
        celda.style.textAlign = 'center';
        fila.appendChild(celda);
        listaTareas.appendChild(fila);
        return;
    }
    
    // Crear filas para cada tarea
    tareas.forEach(tarea => {
        const fila = document.createElement('tr');
        
        // Crear celdas para cada propiedad
        const propiedades = ['tarea', 'fecha', 'descripcion', 'nombre', 'valor'];
        propiedades.forEach(prop => {
            const celda = document.createElement('td');
            celda.textContent = tarea[prop];
            fila.appendChild(celda);
        });
        
        // Celda para botones de acción
        const celdaAcciones = document.createElement('td');
        
        // Botón editar
        const btnEditar = crearBoton('Editar', 'btn btn-put btn-sm', () => {
            cargarTareaParaEditar(tarea.id);
        });
        
        // Botón eliminar
        const btnEliminar = crearBoton('Eliminar', 'btn btn-delete btn-sm', () => {
            eliminarTarea(tarea.id);
        });
        
        celdaAcciones.appendChild(btnEditar);
        celdaAcciones.appendChild(btnEliminar);
        fila.appendChild(celdaAcciones);
        
        // Agregar fila a la tabla
        listaTareas.appendChild(fila);
    });
};

// Mostrar mensajes
const mostrarMensaje = (mensaje, isError = false) => {
    statusElement.innerHTML = '';
    
    const mensajeElement = document.createElement('div');
    mensajeElement.className = isError ? 'status status-error' : 'status status-success';
    mensajeElement.textContent = mensaje;
    
    statusElement.appendChild(mensajeElement);
    
    setTimeout(() => {
        statusElement.innerHTML = '';
    }, 2000);
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Configurar el botón de submit
    submitBtn.addEventListener('click', agregarTarea);
    
    // Cargar tareas iniciales
    obtenerTareas();
});
