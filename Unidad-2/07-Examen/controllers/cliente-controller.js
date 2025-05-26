import { clienteService } from '../service/service-selector.js';

const formulario = document.querySelector("[data-form]");
const clienteId = document.querySelector("[data-id]");
const nombreInput = document.querySelector("[data-nombre]");
const emailInput = document.querySelector("[data-email]");
const telefonoInput = document.querySelector("[data-telefono]");
const btnLimpiar = document.querySelector("[data-limpiar]");
const tablaClientes = document.querySelector("[data-table]");
const alertContainer = document.querySelector("[data-alert]");

const mostrarAlerta = (mensaje, tipo) => {
    alertContainer.innerHTML = `<div class="alert alert--${tipo}">${mensaje}</div>`;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 3000);
};

const cargarClientes = async () => {
    try {
        const clientes = await clienteService.listar_clientes();
        renderizarClientes(clientes);
    } catch (error) {
        console.error('Error al cargar clientes:', error);
        mostrarAlerta('Error al cargar los clientes', 'error');
    }
};

const renderizarClientes = (clientes) => {
    tablaClientes.innerHTML = '';
    
    if (clientes.length === 0) {
        tablaClientes.innerHTML = '<tr><td colspan="4" class="text-center">No hay clientes registrados</td></tr>';
        return;
    }
    
    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono || 'N/A'}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn--secondary btn-editar" data-id="${cliente.id}">Editar</button>
                    <button class="btn btn--danger btn-eliminar" data-id="${cliente.id}">Eliminar</button>
                </div>
            </td>
        `;
        tablaClientes.appendChild(row);
    });
    
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => editarCliente(btn.dataset.id));
    });
    
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => eliminarCliente(btn.dataset.id));
    });
};

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const datosForm = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value
        };
        
        if (clienteId.value) {
            await clienteService.actualizar_cliente(
                clienteId.value,
                datosForm.nombre,
                datosForm.email,
                datosForm.telefono
            );
            mostrarAlerta('Cliente actualizado con ettsito', 'success');
        } else {
            await clienteService.crear_cliente(
                datosForm.nombre,
                datosForm.email,
                datosForm.telefono
            );
            mostrarAlerta('Cliente creado con ettsito', 'success');
        }
        
        limpiarFormulario();
        cargarClientes();
    } catch (error) {
        console.error('Error al guardar cliente:', error);
        mostrarAlerta('Error al guardar el cliente', 'error');
    }
});

const editarCliente = async (id) => {
    try {
        const cliente = await clienteService.obtener_cliente(id);
        clienteId.value = cliente.id;
        nombreInput.value = cliente.nombre;
        emailInput.value = cliente.email;
        telefonoInput.value = cliente.telefono || '';
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Error al obtener cliente para editar:', error);
        mostrarAlerta('Error al cargar los datos del cliente', 'error');
    }
};

const eliminarCliente = async (id) => {
    if (confirm('¿Estas seguro de que quiere eliminar este cliente?')) {
        try {
            await clienteService.eliminar_cliente(id);
            mostrarAlerta('Cliente eliminado con ettsito', 'success');
            cargarClientes();
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            mostrarAlerta('Error al eliminar el cliente', 'error');
        }
    }
};

const limpiarFormulario = () => {
    formulario.reset();
    clienteId.value = '';
};

btnLimpiar.addEventListener('click', limpiarFormulario);

document.addEventListener('DOMContentLoaded', cargarClientes);
