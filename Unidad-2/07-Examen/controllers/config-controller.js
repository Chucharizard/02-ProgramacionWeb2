import { peliculaService } from '../service/service-selector.js';

const supabaseRadio = document.getElementById('supabase');
const phpRadio = document.getElementById('php');
const jsonRadio = document.getElementById('json');
const sqlserverRadio = document.getElementById('sqlserver'); // ⬅️ NUEVO
const guardarBtn = document.getElementById('guardarConfig');
const probarBtn = document.getElementById('probarConexion');
const resetBtn = document.getElementById('resetBtn'); // ⬅️ NUEVO
const estadoBackend = document.getElementById('estadoBackend');
const estadoConexion = document.getElementById('estadoConexion');
const resultadoPrueba = document.getElementById('resultadoPrueba');

// Cargar configuración actual
const cargarConfiguracion = () => {
    const backendType = localStorage.getItem('backendType') || 'supabase';
    
    switch (backendType) {
        case 'php':
            phpRadio.checked = true;
            estadoBackend.textContent = 'PHP/MySQL';
            break;
        case 'json':
            jsonRadio.checked = true;
            estadoBackend.textContent = 'JSON (Memoria)';
            break;
        case 'sqlserver': // ⬅️ NUEVO
            sqlserverRadio.checked = true;
            estadoBackend.textContent = 'PHP/SQL Server';
            break;
        default:
            supabaseRadio.checked = true;
            estadoBackend.textContent = 'Supabase';
    }
};

// Guardar configuración
guardarBtn.addEventListener('click', () => {
    let backendType = 'supabase';
    
    if (phpRadio.checked) {
        backendType = 'php';
    } else if (jsonRadio.checked) {
        backendType = 'json';
    } else if (sqlserverRadio.checked) { // ⬅️ NUEVO
        backendType = 'sqlserver';
    }
    
    localStorage.setItem('backendType', backendType);
    
    // Mantener compatibilidad con código anterior
    localStorage.setItem('usePhp', (backendType === 'php').toString());
    
    const backendName = {
        'supabase': 'Supabase',
        'php': 'PHP/MySQL',
        'json': 'JSON (Memoria)',
        'sqlserver': 'PHP/SQL Server' // ⬅️ NUEVO
    }[backendType];
    
    estadoBackend.textContent = backendName;
    estadoConexion.textContent = 'Configuración guardada - Reinicia la página';
    
    mostrarAlerta(`Configuración guardada (${backendName}). Recarga la página para aplicar cambios.`, 'success');
});

// Probar conexión
probarBtn.addEventListener('click', async () => {
    estadoConexion.textContent = 'Probando...';
    resultadoPrueba.innerHTML = '';
    
    try {
        const peliculas = await peliculaService.listar_peliculas();
        estadoConexion.textContent = 'Conexión exitosa';
        resultadoPrueba.innerHTML = `
            <div class="alert alert--success">
                <strong>Conexión exitosa!</strong><br>
                Se encontraron ${peliculas.length} películas en la base de datos.
            </div>
        `;
    } catch (error) {
        estadoConexion.textContent = 'Error de conexión';
        resultadoPrueba.innerHTML = `
            <div class="alert alert--error">
                <strong>Error de conexión:</strong><br>
                ${error.message}
            </div>
        `;
    }
});

// Restablecer configuración ⬅️ NUEVO
resetBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres restablecer la configuración a Supabase?')) {
        localStorage.removeItem('backendType');
        localStorage.removeItem('usePhp');
        supabaseRadio.checked = true;
        estadoBackend.textContent = 'Supabase';
        estadoConexion.textContent = 'Configuración restablecida';
        mostrarAlerta('Configuración restablecida a Supabase por defecto.', 'success');
    }
});

const mostrarAlerta = (mensaje, tipo) => {
    resultadoPrueba.innerHTML = `<div class="alert alert--${tipo}">${mensaje}</div>`;
    setTimeout(() => {
        resultadoPrueba.innerHTML = '';
    }, 5000);
};

// Cargar configuración al inicio
document.addEventListener('DOMContentLoaded', cargarConfiguracion);
