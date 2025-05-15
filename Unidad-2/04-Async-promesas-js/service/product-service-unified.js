import { productService } from './product-service.js';
import { productServiceSupa } from './product-service-supa.js';

const USE_SUPABASE = localStorage.getItem('useSupabase') === 'true';

export const unifiedProductService = USE_SUPABASE ? productServiceSupa : productService;
