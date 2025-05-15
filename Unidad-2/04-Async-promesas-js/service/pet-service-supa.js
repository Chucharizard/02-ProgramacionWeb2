import { supabaseRequest, generarId } from './supabase-config.js';

const lista_mascotas = async () => {
  try {
    return await supabaseRequest('/pets?select=*');
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);
    throw error;
  }
};

const crearMascota = async (nombre, edad, descripcion) => {
  const id = generarId();
  try {
    return await supabaseRequest('/pets', {
      method: 'POST',
      body: JSON.stringify({ id, nombre, edad, descripcion })
    });
  } catch (error) {
    console.error('Error al crear la mascota:', error);
    throw error;
  }
};

const eliminarMascota = async (id) => {
  try {
    return await supabaseRequest(`/pets?id=eq.${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    throw error;
  }
};

const obtenerMascota = async (id) => {
  try {
    const response = await supabaseRequest(`/pets?id=eq.${id}&select=*`);
    return response[0];
  } catch (error) {
    console.error('Error al obtener la mascota:', error);
    throw error;
  }
};

const actualizarMascota = async (nombre, edad, descripcion, id) => {
  try {
    return await supabaseRequest(`/pets?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ nombre, edad, descripcion })
    });
  } catch (error) {
    console.error('Error al actualizar la mascota:', error);
    throw error;
  }
};

export const petServiceSupa = {
  lista_mascotas,
  crearMascota,
  eliminarMascota,
  obtenerMascota,
  actualizarMascota
};
