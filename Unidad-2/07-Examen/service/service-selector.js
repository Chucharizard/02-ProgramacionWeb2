// Configuración de backend
const backendType = localStorage.getItem('backendType') || 'supabase'; // 'supabase', 'php', 'json', 'sqlserver'

// Imports para Supabase
import { peliculaService as peliculaServiceSupa } from './pelicula-service.js';
import { funcionService as funcionServiceSupa } from './funcion-service.js';
import { clienteService as clienteServiceSupa } from './cliente-service.js';
import { boletoService as boletoServiceSupa } from './boleto-service.js';

// Imports para PHP
import { peliculaService as peliculaServicePhp } from './pelicula-service-php.js';
import { funcionService as funcionServicePhp } from './funcion-service-php.js';
import { clienteService as clienteServicePhp } from './cliente-service-php.js';
import { boletoService as boletoServicePhp } from './boleto-service-php.js';

// Imports para JSON
import { peliculaService as peliculaServiceJson } from './pelicula-service-json.js';
import { funcionService as funcionServiceJson } from './funcion-service-json.js';
import { clienteService as clienteServiceJson } from './cliente-service-json.js';
import { boletoService as boletoServiceJson } from './boleto-service-json.js';

// Imports para SQL Server ⬅️ NUEVO
import { peliculaService as peliculaServiceSqlServer } from './pelicula-service-sqlserver.js';
import { funcionService as funcionServiceSqlServer } from './funcion-service-sqlserver.js';
import { clienteService as clienteServiceSqlServer } from './cliente-service-sqlserver.js';
import { boletoService as boletoServiceSqlServer } from './boleto-service-sqlserver.js';

// Selección de servicios basada en la configuración
const getService = (supaService, phpService, jsonService, sqlServerService) => {
    switch (backendType) {
        case 'php':
            return phpService;
        case 'json':
            return jsonService;
        case 'sqlserver': // ⬅️ NUEVO
            return sqlServerService;
        default:
            return supaService;
    }
};

export const peliculaService = getService(peliculaServiceSupa, peliculaServicePhp, peliculaServiceJson, peliculaServiceSqlServer);
export const funcionService = getService(funcionServiceSupa, funcionServicePhp, funcionServiceJson, funcionServiceSqlServer);
export const clienteService = getService(clienteServiceSupa, clienteServicePhp, clienteServiceJson, clienteServiceSqlServer);
export const boletoService = getService(boletoServiceSupa, boletoServicePhp, boletoServiceJson, boletoServiceSqlServer);
