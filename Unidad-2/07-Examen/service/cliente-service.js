import { supabaseRequest, generarId } from './supabase-config.js';

const listar_clientes = async () => {
  try {
    return await supabaseRequest('/clientes?select=*');
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    throw error;
  }
};

const crear_cliente = async (nombre, email, telefono) => {
  const id = generarId();
  try {
    return await supabaseRequest('/clientes', {
      method: 'POST',
      body: JSON.stringify({ id, nombre, email, telefono })
    });
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    throw error;
  }
};

const eliminar_cliente = async (id) => {
  try {
    return await supabaseRequest(`/clientes?id=eq.${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    throw error;
  }
};

const obtener_cliente = async (id) => {
  try {
    const response = await supabaseRequest(`/clientes?id=eq.${id}&select=*`);
    return response[0];
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    throw error;
  }
};

const actualizar_cliente = async (id, nombre, email, telefono) => {
  try {
    return await supabaseRequest(`/clientes?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ nombre, email, telefono })
    });
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    throw error;
  }
};

export const clienteService = {
  listar_clientes,
  crear_cliente,
  eliminar_cliente,
  obtener_cliente,
  actualizar_cliente
};
