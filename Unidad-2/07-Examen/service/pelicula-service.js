import { supabaseRequest, generarId } from './supabase-config.js';

const listar_peliculas = async () => {
  try {
    return await supabaseRequest('/peliculas?select=*');
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    throw error;
  }
};

const crear_pelicula = async (titulo, duracion, clasificacion, imagen_url) => {
  const id = generarId();
  try {
    return await supabaseRequest('/peliculas', {
      method: 'POST',
      body: JSON.stringify({ id, titulo, duracion, clasificacion, imagen_url })
    });
  } catch (error) {
    console.error('Error al crear la película:', error);
    throw error;
  }
};

const eliminar_pelicula = async (id) => {
  try {
    return await supabaseRequest(`/peliculas?id=eq.${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error al eliminar la película:', error);
    throw error;
  }
};

const obtener_pelicula = async (id) => {
  try {
    const response = await supabaseRequest(`/peliculas?id=eq.${id}&select=*`);
    return response[0];
  } catch (error) {
    console.error('Error al obtener la película:', error);
    throw error;
  }
};

const actualizar_pelicula = async (id, titulo, duracion, clasificacion, imagen_url) => {
  try {
    return await supabaseRequest(`/peliculas?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ titulo, duracion, clasificacion, imagen_url })
    });
  } catch (error) {
    console.error('Error al actualizar la película:', error);
    throw error;
  }
};

export const peliculaService = {
  listar_peliculas,
  crear_pelicula,
  eliminar_pelicula,
  obtener_pelicula,
  actualizar_pelicula
};
