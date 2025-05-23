const SUPABASE_URL = 'https://pckmgjmoflkprotgmxzd.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBja21nam1vZmxrcHJvdGdteHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MjE4OTcsImV4cCI6MjA2MzQ5Nzg5N30.p4PQjIR7Up2v-dPZMtmDpErRh6f2Hn3HxbV5TEh0Hx4';

function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const supabaseRequest = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`Error en la petición: ${response.status}`);
  }

  if (response.status === 204 || response.status === 201) {
    return { success: true };
  }

  try {
    return await response.json();
  } catch (error) {

    return { success: true };
  }
};

export { supabaseRequest, generarId };
