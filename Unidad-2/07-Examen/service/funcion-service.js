import { supabaseRequest, generarId } from './supabase-config.js';

const listar_funciones = async () => {
  try {
    return await supabaseRequest('/funciones?select=*,peliculas(titulo,duracion)');
  } catch (error) {
    console.error('Error al obtener las funciones:', error);
    throw error;
  }
};

const crear_funcion = async (pelicula_id, sala, fecha, hora, precio) => {
  const id = generarId();
  try {
    return await supabaseRequest('/funciones', {
      method: 'POST',
      body: JSON.stringify({ id, pelicula_id, sala, fecha, hora, precio })
    });
  } catch (error) {
    console.error('Error al crear la función:', error);
    throw error;
  }
};

const eliminar_funcion = async (id) => {
  try {
    return await supabaseRequest(`/funciones?id=eq.${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error al eliminar la función:', error);
    throw error;
  }
};

const obtener_funcion = async (id) => {
  try {
    const response = await supabaseRequest(`/funciones?id=eq.${id}&select=*`);
    return response[0];
  } catch (error) {
    console.error('Error al obtener la función:', error);
    throw error;
  }
};

const actualizar_funcion = async (id, pelicula_id, sala, fecha, hora, precio) => {
  try {
    return await supabaseRequest(`/funciones?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ pelicula_id, sala, fecha, hora, precio })
    });
  } catch (error) {
    console.error('Error al actualizar la función:', error);
    throw error;
  }
};

export const funcionService = {
  listar_funciones,
  crear_funcion,
  eliminar_funcion,
  obtener_funcion,
  actualizar_funcion
};
