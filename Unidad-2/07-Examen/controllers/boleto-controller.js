import { boletoService } from '../service/service-selector.js';
import { funcionService } from '../service/service-selector.js';
import { clienteService } from '../service/service-selector.js';
import { peliculaService } from '../service/service-selector.js';

const formulario = document.querySelector("[data-form]");
const boletoId = document.querySelector("[data-id]");
const funcionSelect = document.querySelector("[data-funcion]");
const clienteSelect = document.querySelector("[data-cliente]");
const asientoInput = document.querySelector("[data-asiento]");
const precioInput = document.querySelector("[data-precio]");
const btnLimpiar = document.querySelector("[data-limpiar]");
const tablaBoletos = document.querySelector("[data-table]");
const alertContainer = document.querySelector("[data-alert]");

// Funcion para normalizar 
const normalizarBoletosConRelaciones = async (boletos) => {
    const backendType = localStorage.getItem('backendType') || 'supabase';
    
    if (backendType === 'supabase') {
        return boletos;
    }
    
    // Para json y SQL Server necesitamos hacer joins manuales asi quee:
    try {
        const [funciones, clientes, peliculas] = await Promise.all([
            funcionService.listar_funciones(),
            clienteService.listar_clientes(),
            peliculaService.listar_peliculas()
        ]);
        
        return boletos.map(boleto => { // Normalizar boleto
            const funcion = funciones.find(f => f.id === boleto.funcion_id) || {};
            const cliente = clientes.find(c => c.id === boleto.cliente_id) || {}; 
            const pelicula = peliculas.find(p => p.id === funcion.pelicula_id) || {}; 

            // Con esto retornamos boleto con estructura similar a Supabase
            return {
                ...boleto,
                funciones: {
                    ...funcion,
                    peliculas: pelicula
                },
                clientes: cliente
            };
        });
    } catch (error) {
        console.error('Error al normalizar boletos:', error);
        return boletos; // Aca devolvemos datos originales en caso de error
    }
};

const mostrarAlerta = (mensaje, tipo) => {
    alertContainer.innerHTML = `<div class="alert alert--${tipo}">${mensaje}</div>`;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 3000);
};

const cargarFunciones = async () => {
    try {
        const funciones = await funcionService.listar_funciones();
        funcionSelect.innerHTML = '<option value="">Seleccione una funcion</option>';
        
        funciones.forEach(funcion => {
            const option = document.createElement('option');
            option.value = funcion.id;
            const pelicula = funcion.peliculas ? funcion.peliculas.titulo : 'Peli no disponible';
            const fecha = new Date(funcion.fecha).toLocaleDateString();
            option.textContent = `${pelicula} - Sala ${funcion.sala} - ${fecha} ${funcion.hora}`;
            funcionSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar funciones:', error);
        mostrarAlerta('Error al cargar las funciones', 'error');
    }
};

const cargarClientes = async () => {
    try {
        const clientes = await clienteService.listar_clientes();
        clienteSelect.innerHTML = '<option value="">Seleccione un cliente</option>';
        
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = `${cliente.nombre} (${cliente.email})`;
            clienteSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar clientes:', error);
        mostrarAlerta('Error al cargar los clientes', 'error');
    }
};

funcionSelect.addEventListener('change', async () => {
    if (funcionSelect.value) {
        try {
            const funcion = await funcionService.obtener_funcion(funcionSelect.value);
            precioInput.value = funcion.precio;
        } catch (error) {
            console.error('Error al obtener precio de la funcion:', error);
        }
    } else {
        precioInput.value = '';
    }
});

const cargarBoletos = async () => {
    try {
        const boletos = await boletoService.listar_boletos();
        const boletosNormalizados = await normalizarBoletosConRelaciones(boletos);
        renderizarBoletos(boletosNormalizados);
    } catch (error) {
        console.error('Error al cargar boletos:', error);
        mostrarAlerta('Error al cargar los boletos', 'error');
    }
};

const renderizarBoletos = (boletos) => {
    tablaBoletos.innerHTML = '';
    
    if (boletos.length === 0) {
        tablaBoletos.innerHTML = '<tr><td colspan="7" class="text-center">No hay boletos vendidos</td></tr>';
        return;
    }
    
    boletos.forEach(boleto => {
        const row = document.createElement('tr');
        const funcion = boleto.funciones || {};
        const cliente = boleto.clientes || {};
        const pelicula = funcion.peliculas || {};
        
        row.innerHTML = `
            <td>${pelicula.titulo || 'N/A'}</td>
            <td>${funcion.sala || 'N/A'}</td>
            <td>${funcion.fecha ? new Date(funcion.fecha).toLocaleDateString() : 'N/A'} ${funcion.hora || ''}</td>
            <td>${cliente.nombre || 'N/A'}</td>
            <td>${boleto.asiento}</td>
            <td>$${parseFloat(boleto.precio).toFixed(2)}</td>
            <td>
                <button class="btn btn--danger btn-eliminar" data-id="${boleto.id}">Eliminar</button>
            </td>
        `;
        tablaBoletos.appendChild(row);
    });
    
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => eliminarBoleto(btn.dataset.id));
    });
};

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const datosForm = {
            funcion_id: funcionSelect.value,
            cliente_id: clienteSelect.value,
            asiento: asientoInput.value,
            precio: parseFloat(precioInput.value)
        };
        
        await boletoService.crear_boleto(
            datosForm.funcion_id,
            datosForm.cliente_id,
            datosForm.asiento,
            datosForm.precio
        );
        mostrarAlerta('Boleto vendido con ettsito', 'success');
        limpiarFormulario();
        cargarBoletos();
    } catch (error) {
        console.error('Error al vender boleto:', error);
        mostrarAlerta('Error al vender el boleto', 'error');
    }
});

const eliminarBoleto = async (id) => {
    if (confirm('¿Estas seguro de que quieres eliminar este boleto?')) {
        try {
            await boletoService.eliminar_boleto(id);
            mostrarAlerta('Boleto eliminado con ettsito', 'success');
            cargarBoletos();
        } catch (error) {
            console.error('Error al eliminar boleto:', error);
            mostrarAlerta('Error al eliminar el boleto', 'error');
        }
    }
};

const limpiarFormulario = () => {
    formulario.reset();
    boletoId.value = '';
};

btnLimpiar.addEventListener('click', limpiarFormulario);

document.addEventListener('DOMContentLoaded', () => {
    cargarFunciones();
    cargarClientes();
    cargarBoletos();
});
