import { supabaseRequest, generarId } from './supabase-config.js';

const lista_productos = async () => {
  try {
    return await supabaseRequest('/productos?select=*');
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

const crearProducto = async (nombre, precio, descripcion) => {
  const id = generarId();
  try {
    return await supabaseRequest('/productos', {
      method: 'POST',
      body: JSON.stringify({ id, nombre, precio, descripcion })
    });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
};

const eliminarProducto = async (id) => {
  try {
    return await supabaseRequest(`/productos?id=eq.${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

const producto = async (id) => {
  try {
    const response = await supabaseRequest(`/productos?id=eq.${id}&select=*`);
    return response[0];
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
};

const actualizarProducto = async (nombre, precio, descripcion, id) => {
  try {
    return await supabaseRequest(`/productos?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ nombre, precio, descripcion })
    });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};

export const productServiceSupa = {
  lista_productos,
  crearProducto,
  eliminarProducto,
  producto,
  actualizarProducto
};
