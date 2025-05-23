import { supabaseRequest, generarId } from './supabase-config.js';

const listar_boletos = async () => {
  try {
    return await supabaseRequest('/boletos?select=*,funciones(sala,fecha,hora,peliculas(titulo)),clientes(nombre,email)');
  } catch (error) {
    console.error('Error al obtener los boletos:', error);
    throw error;
  }
};

const crear_boleto = async (funcion_id, cliente_id, asiento, precio) => {
  const id = generarId();
  const fecha_compra = new Date().toISOString();
  
  try {
    return await supabaseRequest('/boletos', {
      method: 'POST',
      body: JSON.stringify({ id, funcion_id, cliente_id, asiento, fecha_compra, precio })
    });
  } catch (error) {
    console.error('Error al crear el boleto:', error);
    throw error;
  }
};

const eliminar_boleto = async (id) => {
  try {
    return await supabaseRequest(`/boletos?id=eq.${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error al eliminar el boleto:', error);
    throw error;
  }
};

const obtener_boleto = async (id) => {
  try {
    const response = await supabaseRequest(`/boletos?id=eq.${id}&select=*`);
    return response[0];
  } catch (error) {
    console.error('Error al obtener el boleto:', error);
    throw error;
  }
};

export const boletoService = {
  listar_boletos,
  crear_boleto,
  eliminar_boleto,
  obtener_boleto
};
