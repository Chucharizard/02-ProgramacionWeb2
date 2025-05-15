import { petService } from './pet-service.js';
import { petServiceSupa } from './pet-service-supa.js';

const USE_SUPABASE = localStorage.getItem('useSupabase') === 'true';

export const unifiedPetService = USE_SUPABASE ? petServiceSupa : petService;
