import { peliculaService } from '../service/pelicula-service.js';

const peliculaForm = document.getElementById('peliculaForm');
const peliculaId = document.getElementById('peliculaId');
const titulo = document.getElementById('titulo');
const duracion = document.getElementById('duracion');
const clasificacion = document.getElementById('clasificacion');
const imagen_url = document.getElementById('imagen_url');
const btnLimpiar = document.getElementById('btnLimpiar');
const catalogoPeliculas = document.getElementById('catalogoPeliculas');
const alertContainer = document.getElementById('alertContainer');

const mostrarAlerta = (mensaje, tipo) => {
    alertContainer.innerHTML = `<div class="alert alert--${tipo}">${mensaje}</div>`;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 3000);
};

const cargarPeliculas = async () => {
    try {
        const peliculas = await peliculaService.listar_peliculas();
        renderizarPeliculas(peliculas);
    } catch (error) {
        console.error('Error al cargar peli:', error);
        mostrarAlerta('Error al cargar las peli', 'error');
    }
};

const renderizarPeliculas = (peliculas) => {
    catalogoPeliculas.innerHTML = '';
    
    if (peliculas.length === 0) {
        catalogoPeliculas.innerHTML = '<p class="text-center">No hay pelis registradas</p>';
        return;
    }
    
    peliculas.forEach(pelicula => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">${pelicula.titulo}</div>
            <div class="card-body">
                ${pelicula.imagen_url ? `<img src="${pelicula.imagen_url}" alt="${pelicula.titulo}" style="width: 100%; height: auto; margin-bottom: 1rem;">` : ''}
                <p><strong>Duración:</strong> ${pelicula.duracion} minutos</p>
                <p><strong>Clasificación:</strong> ${pelicula.clasificacion || 'N/A'}</p>
                <div class="btn-group">
                    <button class="btn btn--secondary btn-editar" data-id="${pelicula.id}">Editar</button>
                    <button class="btn btn--danger btn-eliminar" data-id="${pelicula.id}">Eliminar</button>
                </div>
            </div>
        `;
        catalogoPeliculas.appendChild(card);
    });
    
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => editarPelicula(btn.dataset.id));
    });
    
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => eliminarPelicula(btn.dataset.id));
    });
};

peliculaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const datos = {
            titulo: titulo.value,
            duracion: parseInt(duracion.value),
            clasificacion: clasificacion.value,
            imagen_url: imagen_url.value
        };
        
        if (peliculaId.value) {
            await peliculaService.actualizar_pelicula(
                peliculaId.value, 
                datos.titulo, 
                datos.duracion,
                datos.clasificacion,
                datos.imagen_url
            );
            mostrarAlerta('Peli actualizada con ettsito', 'success');
        } else {
            await peliculaService.crear_pelicula(
                datos.titulo, 
                datos.duracion,
                datos.clasificacion,
                datos.imagen_url
            );
            mostrarAlerta('Peli creada con ettsito', 'success');
        }
        
        limpiarFormulario();
        cargarPeliculas();
    } catch (error) {
        console.error('Error al guardar peli:', error);
        mostrarAlerta('Error al guardar la peli', 'error');
    }
});

const editarPelicula = async (id) => {
    try {
        const pelicula = await peliculaService.obtener_pelicula(id);
        peliculaId.value = pelicula.id;
        titulo.value = pelicula.titulo;
        duracion.value = pelicula.duracion;
        clasificacion.value = pelicula.clasificacion || '';
        imagen_url.value = pelicula.imagen_url || '';
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Error al obtener peli para editar:', error);
        mostrarAlerta('Error al cargar los datos de la peli', 'error');
    }
};

const eliminarPelicula = async (id) => {
    if (confirm('¿Estas seguro de que quieres eliminar esta peli?')) {
        try {
            await peliculaService.eliminar_pelicula(id);
            mostrarAlerta('Película eliminada con éxito', 'success');
            cargarPeliculas();
        } catch (error) {
            console.error('Error al eliminar peli:', error);
            mostrarAlerta('Error al eliminar la peli', 'error');
        }
    }
};

const limpiarFormulario = () => {
    peliculaForm.reset();
    peliculaId.value = '';
};

btnLimpiar.addEventListener('click', limpiarFormulario);

document.addEventListener('DOMContentLoaded', cargarPeliculas);
