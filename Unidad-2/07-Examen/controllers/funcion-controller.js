import { funcionService } from '../service/service-selector.js';
import { peliculaService } from '../service/service-selector.js';


const formulario = document.querySelector("[data-form]");
const funcionId = document.querySelector("[data-id]");
const peliculaSelect = document.querySelector("[data-pelicula]");
const salaInput = document.querySelector("[data-sala]");
const fechaInput = document.querySelector("[data-fecha]");
const horaInput = document.querySelector("[data-hora]");
const precioInput = document.querySelector("[data-precio]");
const btnLimpiar = document.querySelector("[data-limpiar]");
const tablaFunciones = document.querySelector("[data-table]");
const alertContainer = document.querySelector("[data-alert]");

const normalizarFuncionesConRelaciones = async (funciones) => {
    const backendType = localStorage.getItem('backendType') || 'supabase';
    
    if (backendType === 'supabase') {
        return funciones;
    }
    try {
        const peliculas = await peliculaService.listar_peliculas();
        
        return funciones.map(funcion => {
            const pelicula = peliculas.find(p => p.id === funcion.pelicula_id) || {};
            
            return {
                ...funcion,
                peliculas: pelicula
            };
        });
    } catch (error) {
        console.error('Error al normalizar funciones:', error);
        return funciones; 
    }
};

const mostrarAlerta = (mensaje, tipo) => {
    alertContainer.innerHTML = `<div class="alert alert--${tipo}">${mensaje}</div>`;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 3000);
};

const cargarPeliculas = async () => {
    try {
        const peliculas = await peliculaService.listar_peliculas();
        peliculaSelect.innerHTML = '<option value="">Seleccione una peli</option>';
        
        peliculas.forEach(pelicula => {
            const option = document.createElement('option');
            option.value = pelicula.id;
            option.textContent = pelicula.titulo;
            peliculaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar peli:', error);
        mostrarAlerta('Error al cargar las peli', 'error');
    }
};

const cargarFunciones = async () => {
    try {
        const funciones = await funcionService.listar_funciones();
        const funcionesNormalizadas = await normalizarFuncionesConRelaciones(funciones);
        renderizarFunciones(funcionesNormalizadas);
    } catch (error) {
        console.error('Error al cargar funciones:', error);
        mostrarAlerta('Error al cargar las funciones', 'error');
    }
};

const renderizarFunciones = (funciones) => {
    tablaFunciones.innerHTML = '';
    
    if (funciones.length === 0) {
        tablaFunciones.innerHTML = '<tr><td colspan="6" class="text-center">No hay funciones programadas</td></tr>';
        return;
    }
    
    funciones.forEach(funcion => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${funcion.peliculas ? funcion.peliculas.titulo : 'N/A'}</td>
            <td>${funcion.sala}</td>
            <td>${new Date(funcion.fecha).toLocaleDateString()}</td>
            <td>${funcion.hora}</td>
            <td>$${parseFloat(funcion.precio).toFixed(2)}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn--secondary btn-editar" data-id="${funcion.id}">Editar</button>
                    <button class="btn btn--danger btn-eliminar" data-id="${funcion.id}">Eliminar</button>
                </div>
            </td>
        `;
        tablaFunciones.appendChild(row);
    });
    
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => editarFuncion(btn.dataset.id));
    });
    
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => eliminarFuncion(btn.dataset.id));
    });
};

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const datosForm = {
            pelicula_id: peliculaSelect.value,
            sala: salaInput.value,
            fecha: fechaInput.value,
            hora: horaInput.value,
            precio: parseFloat(precioInput.value)
        };
        
        if (funcionId.value) {
            await funcionService.actualizar_funcion(
                funcionId.value, 
                datosForm.pelicula_id,
                datosForm.sala,
                datosForm.fecha,
                datosForm.hora,
                datosForm.precio
            );
            mostrarAlerta('Funcion actualizada con ettsito', 'success');
        } else {
            await funcionService.crear_funcion(
                datosForm.pelicula_id,
                datosForm.sala,
                datosForm.fecha,
                datosForm.hora,
                datosForm.precio
            );
            mostrarAlerta('Funcinn creada con ettsito', 'success');
        }
        
        limpiarFormulario();
        cargarFunciones();
    } catch (error) {
        console.error('Error al guardar funcion:', error);
        mostrarAlerta('Error al guardar la funcion', 'error');
    }
});

const editarFuncion = async (id) => {
    try {
        const funcion = await funcionService.obtener_funcion(id);
        funcionId.value = funcion.id;
        peliculaSelect.value = funcion.pelicula_id;
        salaInput.value = funcion.sala;
        fechaInput.value = funcion.fecha;
        horaInput.value = funcion.hora;
        precioInput.value = funcion.precio;
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Error al obtener funcion para editar:', error);
        mostrarAlerta('Error al cargar los datos de la funcion', 'error');
    }
};

const eliminarFuncion = async (id) => {
    if (confirm('¿Estas seguro de que quieres eliminar esta funcion?')) {
        try {
            await funcionService.eliminar_funcion(id);
            mostrarAlerta('Funcinn eliminada con ettsito', 'success');
            cargarFunciones();
        } catch (error) {
            console.error('Error al eliminar funcinn:', error);
            mostrarAlerta('Error al eliminar la funcion', 'error');
        }
    }
};

const limpiarFormulario = () => {
    formulario.reset();
    funcionId.value = '';
};

btnLimpiar.addEventListener('click', limpiarFormulario);

document.addEventListener('DOMContentLoaded', () => {
    cargarPeliculas();
    cargarFunciones();
});
