IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'cinedb')
BEGIN
    CREATE DATABASE cinedb;
END

USE cinedb;

CREATE TABLE peliculas (
  id VARCHAR(255) PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  duracion INT,
  clasificacion VARCHAR(50),
  imagen_url TEXT
);

CREATE TABLE funciones (
  id VARCHAR(255) PRIMARY KEY,
  pelicula_id VARCHAR(255),
  sala VARCHAR(100) NOT NULL,
  fecha DATE NOT NULL,
  hora VARCHAR(10) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE
);

CREATE TABLE clientes (
  id VARCHAR(255) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  telefono VARCHAR(50)
);

CREATE TABLE boletos (
  id VARCHAR(255) PRIMARY KEY,
  funcion_id VARCHAR(255),
  cliente_id VARCHAR(255),
  asiento VARCHAR(20) NOT NULL,
  fecha_compra DATETIME DEFAULT GETDATE(),
  precio DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (funcion_id) REFERENCES funciones(id) ON DELETE CASCADE,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
);