const SUPABASE_URL = 'https://zjidivwydzqudebrocbf.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqaWRpdnd5ZHpxdWRlYnJvY2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNTIzOTksImV4cCI6MjA2MjYyODM5OX0.E3Fyt712X6O9jMBJbEipcnISX11KBm4WlRD14dOtBiI'; 

function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const supabaseRequest = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`Error Supabase: ${response.statusText}`);
  }

  if (response.status === 204) {
    return { success: true };
  }

  return response.json();
};

export { supabaseRequest, generarId };
