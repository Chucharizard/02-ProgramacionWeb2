# 🎬 CinePan - Sistema de Gestión de Cine

## 📋 Tabla de Contenido

- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Base de Datos](#base-de-datos)
- [APIs Disponibles](#apis-disponibles)
- [Frontend](#frontend)

## 📖 Descripción

CinePan es un sistema de gestión de cines que permite administrar películas, funciones, clientes y boletos. El proyecto está diseñado para funcionar con múltiples backends:

- **JSON Server** (desarrollo rápido)
- **PHP + MySQL** (backend tradicional)
- **PHP + SQL Server** (enterprise)
- **Supabase** (backend como servicio)

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con gradientes y animaciones
- **JavaScript ES6+** - Funcionalidad interactiva (vanilla JS)
- **Fetch API** - Comunicación con APIs

### Backend
- **Node.js** + JSON Server
- **PHP** + MySQL/SQL Server
- **Supabase** (PostgreSQL)

## 📁 Estructura del Proyecto

```
07-Examen/
├── screens/               # Páginas HTML del frontend
│   ├── index.html         # Dashboard principal
│   ├── peliculas.html     # Gestión de películas
│   ├── funciones.html     # Gestión de funciones
│   ├── clientes.html      # Gestión de clientes
│   ├── boletos.html       # Gestión de boletos
│   └── config.html        # Configuración de backend
├── controllers/           # Controladores JavaScript
│   ├── boleto-controller.js
│   ├── cliente-controller.js
│   ├── config-controller.js
│   ├── funcion-controller.js
│   └── pelicula-controller.js
├── service/              # Servicios de API
│   ├── service-selector.js
│   ├── boleto-service-*.js
│   ├── cliente-service-*.js
│   ├── funcion-service-*.js
│   └── pelicula-service-*.js
├── assets/               # Recursos estáticos
│   └── css/
├── api-php/             # API PHP + MySQL
├── api-sqlserver/       # API PHP + SQL Server
├── crear-tablas/        # Scripts de base de datos
└── db.json             # Base de datos JSON Server
```

## ⚙️ Instalación y Configuración
### 1. Configuración de MySQL

1. Mover los archivos de `api-php` a `XAMPP/htdocs/API2`
2. Mover el archivo `crear_tablas_cine.php` de la carpeta `crear-tablas` a `XAMPP/htdocs`
3. Ejecutar en el navegador: `http://localhost/crear_tablas_cine.php`

### 2. Configuración de SQL Server

#### Paso 1: Instalar drivers de SQL Server para PHP

1. Descargar drivers desde: [Microsoft SQL Server Drivers for PHP](https://learn.microsoft.com/en-us/sql/connect/php/download-drivers-php-sql-server?view=sql-server-ver16#download)
2. Para PHP 8.2.12, seleccionar:
   - `php_sqlsrv_82_ts.dll` - Driver principal
   - `php_pdo_sqlsrv_82_ts.dll` - Driver PDO
3. Copiar ambos archivos a: `C:\xampp\php\ext`

#### Paso 2: Configuración de PHP

1. Abrir `C:\xampp\php\php.ini`
2. Agregar las siguientes líneas:
   ```ini
   extension=sqlsrv
   extension=pdo_sqlsrv
   ```

#### Paso 3: Reiniciar Apache

1. Ve a XAMPP Control Panel
2. Detén Apache (Stop)
3. Inicia Apache nuevamente (Start)
4. Verifica que no haya errores en los logs

#### Paso 4: Crear tablas en SQL Server

Ejecutar el script `crear-tablas/cinedbSqlServer.sql`

### 3. Configuración de JSON Server

```bash
npx json-server --watch db.json --port 3000
```

### 4. Ejecutar el Frontend

1. Abrir cualquier servidor local (Live Server, XAMPP, etc.)
2. Navegar a `screens/index.html`
3. Configurar el backend deseado en la página de configuración

## 🗄️ Base de Datos

### Esquema de Base de Datos

El sistema utiliza 4 tablas principales:

#### 🎬 Tabla: `peliculas`
```sql
CREATE TABLE peliculas (
    id TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    duracion INTEGER,
    clasificacion TEXT,
    imagen_url TEXT
);
```

#### 🎭 Tabla: `funciones`
```sql
CREATE TABLE funciones (
    id TEXT PRIMARY KEY,
    pelicula_id TEXT REFERENCES peliculas(id) ON DELETE CASCADE,
    sala TEXT NOT NULL,        
    fecha DATE NOT NULL,
    hora TEXT NOT NULL,          
    precio NUMERIC(10,2) NOT NULL
);
```

#### 👥 Tabla: `clientes`
```sql
CREATE TABLE clientes (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE,
    telefono TEXT
);
```

#### 🎫 Tabla: `boletos`
```sql
CREATE TABLE boletos (
    id TEXT PRIMARY KEY,
    funcion_id TEXT REFERENCES funciones(id) ON DELETE CASCADE,
    cliente_id TEXT REFERENCES clientes(id) ON DELETE SET NULL,
    asiento TEXT NOT NULL,
    fecha_compra TIMESTAMP DEFAULT NOW(),
    precio NUMERIC(10,2) NOT NULL
);
```

## 🚀 APIs Disponibles

### Endpoints principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/peliculas` | Obtener todas las películas |
| POST | `/api/peliculas` | Crear nueva película |
| PUT | `/api/peliculas/{id}` | Actualizar película |
| DELETE | `/api/peliculas/{id}` | Eliminar película |
| GET | `/api/funciones` | Obtener todas las funciones |
| GET | `/api/clientes` | Obtener todos los clientes |
| GET | `/api/boletos` | Obtener todos los boletos |

## 🎨 Frontend

### Características del Frontend

- 🌐 **HTML5 Semántico**: Estructura clara y accesible
- 🎨 **CSS3 Moderno**: Gradientes, efectos glass-morphism, animaciones
- ⚡ **JavaScript Vanilla**: Sin dependencias externas, código limpio
- 📱 **Diseño Responsivo**: Optimizado para móvil y escritorio
- 🔌 **Multi-backend**: Soporte para JSON Server, PHP+MySQL, SQL Server, Supabase
- 🧩 **Arquitectura MVC**: Controladores separados para cada módulo

### Páginas disponibles

- **Dashboard** (`index.html`) - Estadísticas y resumen general
- **Películas** (`peliculas.html`) - Gestión de películas en cartelera
- **Funciones** (`funciones.html`) - Administración de horarios y salas
- **Clientes** (`clientes.html`) - Gestión de clientes registrados
- **Boletos** (`boletos.html`) - Administración de ventas de boletos
- **Configuración** (`config.html`) - Selección de backend y configuración

### Arquitectura del Frontend

- **Controllers**: Logica de negocio para cada módulo
- **Services**: Comunicación con APIs (patrón adaptador para múltiples backends)
- **Screens**: Interfaz de usuario en HTML puro
- **Assets**: Recursos estáticos (CSS, imágenes)

## 🎯 Uso del Sistema


1. **Abrir el frontend** en tu servidor local preferido
2. **Iniciar XAMPP y elegir en configuarion que usar** (JSON, PHP, etc.)
3. **Acceder a** `screens/index.html`
4. **Comenzar a gestionar** películas, funciones, clientes y boletos

---

**Desarrollado para fines educativos** - Programación Web 2, Tercer Semestre





