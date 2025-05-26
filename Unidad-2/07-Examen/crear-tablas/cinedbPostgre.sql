CREATE DATABASE IF NOT EXISTS cinedb;
USE cinedb;

CREATE TABLE peliculas (
  id varchar(255) PRIMARY KEY,
  titulo varchar(255) NOT NULL,
  duracion int,
  clasificacion varchar(50),
  imagen_url text
);

CREATE TABLE funciones (
  id varchar(255) PRIMARY KEY,
  pelicula_id varchar(255),
  sala varchar(100) NOT NULL,
  fecha date NOT NULL,
  hora varchar(10) NOT NULL,
  precio decimal(10,2) NOT NULL,
  FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE
);

CREATE TABLE clientes (
  id varchar(255) PRIMARY KEY,
  nombre varchar(255) NOT NULL,
  email varchar(255) UNIQUE,
  telefono varchar(50)
);

CREATE TABLE boletos (
  id varchar(255) PRIMARY KEY,
  funcion_id varchar(255),
  cliente_id varchar(255),
  asiento varchar(20) NOT NULL,
  fecha_compra timestamp DEFAULT CURRENT_TIMESTAMP,
  precio decimal(10,2) NOT NULL,
  FOREIGN KEY (funcion_id) REFERENCES funciones(id) ON DELETE CASCADE,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
);
