### BASE DATOS xd

-- Tabla 1: peli en cartelera
create table peliculas (
id text primary key,
titulo text not null,
duracion integer,
clasificacion text,
imagen_url text
);

-- Tabla 2: Funciones (salas y horarios) 
create table funciones (
id text primary key,
pelicula_id text references peliculas(id) on delete cascade,
sala text not null, -- Nombre o número cualquiera sirve
fecha date not null,
hora text not null, -- Formato "HH:MM"
precio numeric(10,2) not null
);

-- Tabla 3: Clientes
create table clientes (
id text primary key,
nombre text not null,
email text unique,
telefono text
);

-- Tabla 4: Boletos
create table boletos (
id text primary key,
funcion_id text references funciones(id) on delete cascade,
cliente_id text references clientes(id) on delete set null,
asiento text not null,
fecha_compra timestamp default now(),
precio numeric(10,2) not null
);
