import { clientService } from './client-service.js'; 
import { clientServiceSupa } from './client-service-supa.js'; 

const USE_SUPABASE = localStorage.getItem('useSupabase') === 'true';

export const unifiedClientService = USE_SUPABASE ? clientServiceSupa : clientService;
