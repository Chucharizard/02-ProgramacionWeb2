import { peliculaService } from '../service/service-selector.js';

const supabaseRadio = document.getElementById('supabase');
const phpRadio = document.getElementById('php');
const jsonRadio = document.getElementById('json');
const sqlserverRadio = document.getElementById('sqlserver'); 
const guardarBtn = document.getElementById('guardarConfig');
const probarBtn = document.getElementById('probarConexion');
const resetBtn = document.getElementById('resetBtn'); 
const estadoBackend = document.getElementById('estadoBackend');
const estadoConexion = document.getElementById('estadoConexion');
const resultadoPrueba = document.getElementById('resultadoPrueba');

const cargarConfiguracion = () => {
    const backendType = localStorage.getItem('backendType') || 'supabase';
    
    switch (backendType) {
        case 'php':
            phpRadio.checked = true;
            estadoBackend.textContent = 'PHP/MySQL';
            break;
        case 'json':
            jsonRadio.checked = true;
            estadoBackend.textContent = 'JSON ';
            break;
        case 'sqlserver': 
            sqlserverRadio.checked = true;
            estadoBackend.textContent = 'PHP/SQL Server';
            break;
        default:
            supabaseRadio.checked = true;
            estadoBackend.textContent = 'Supabase';
    }
};

guardarBtn.addEventListener('click', () => {
    let backendType = 'supabase';
    
    if (phpRadio.checked) {
        backendType = 'php';
    } else if (jsonRadio.checked) {
        backendType = 'json';
    } else if (sqlserverRadio.checked) {
        backendType = 'sqlserver';
    }
    
    localStorage.setItem('backendType', backendType);
    
    localStorage.setItem('usePhp', (backendType === 'php').toString());
    
    const backendName = {
        'supabase': 'Supabase',
        'php': 'PHP/MySQL',
        'json': 'JSON (Memoria)',
        'sqlserver': 'PHP/SQL Server' 
    }[backendType];
    
    estadoBackend.textContent = backendName;
    estadoConexion.textContent = 'Confi guardada - Reinicia la pagina';
    
    mostrarAlerta(`Configuración guardada (${backendName}). Recarga la página para aplicar cambios.`, 'success');
});

// Probamos la conexion
probarBtn.addEventListener('click', async () => {
    estadoConexion.textContent = 'Probando...';
    resultadoPrueba.innerHTML = '';
    
    try {
        const peliculas = await peliculaService.listar_peliculas();
        estadoConexion.textContent = 'Conexion exitosa';
        resultadoPrueba.innerHTML = `
            <div class="alert alert--success">
                <strong>Conexion exitosa!</strong><br>
                Se encontraron ${peliculas.length} peliculas en la base de datos
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

resetBtn.addEventListener('click', () => {
    if (confirm('estas seguro de que quieres restablecer la Confi a Supabase?')) {
        localStorage.removeItem('backendType');
        localStorage.removeItem('usePhp');
        supabaseRadio.checked = true;
        estadoBackend.textContent = 'Supabase';
        estadoConexion.textContent = 'Confi restablecida';
        mostrarAlerta('Confi restablecida a Supabase por defecto.', 'success');
    }
});

const mostrarAlerta = (mensaje, tipo) => {
    resultadoPrueba.innerHTML = `<div class="alert alert--${tipo}">${mensaje}</div>`;
    setTimeout(() => {
        resultadoPrueba.innerHTML = '';
    }, 5000);
};

document.addEventListener('DOMContentLoaded', cargarConfiguracion);
