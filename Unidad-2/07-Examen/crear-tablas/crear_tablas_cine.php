<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cinedb";

$conn = new mysqli($servername, $username, $password);

// Crear base de datos
$conn->query("CREATE DATABASE IF NOT EXISTS $dbname");
$conn->select_db($dbname);

// Crear tablas
$conn->query("CREATE TABLE IF NOT EXISTS peliculas (
    id VARCHAR(255) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    duracion INT,
    clasificacion VARCHAR(50),
    imagen_url TEXT
)");

$conn->query("CREATE TABLE IF NOT EXISTS clientes (
    id VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    telefono VARCHAR(50)
)");

$conn->query("CREATE TABLE IF NOT EXISTS funciones (
    id VARCHAR(255) PRIMARY KEY,
    pelicula_id VARCHAR(255),
    sala VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    hora VARCHAR(10) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE
)");

$conn->query("CREATE TABLE IF NOT EXISTS boletos (
    id VARCHAR(255) PRIMARY KEY,
    funcion_id VARCHAR(255),
    cliente_id VARCHAR(255),
    asiento VARCHAR(20) NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (funcion_id) REFERENCES funciones(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
)");

// Insertar datos de ejemplo solo si no existen
$result = $conn->query("SELECT COUNT(*) as count FROM peliculas");
if ($result->fetch_assoc()['count'] == 0) {
    $conn->query("INSERT INTO peliculas VALUES 
        ('1', 'Avatar: El Camino del Agua', 192, 'PG-13', 'https://image.tmdb.org/t/p/w500/94xxm5701CzOdJdUEdIuwqZaowx.jpg'),
        ('2', 'Top Gun: Maverick', 130, 'PG-13', 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg'),
        ('3', 'Spider-Man: No Way Home', 148, 'PG-13', 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg')");
    
    $conn->query("INSERT INTO clientes VALUES 
        ('1', 'Juan Pérez', 'juan@ejemplo.com', '555-1234'),
        ('2', 'María García', 'maria@ejemplo.com', '555-5678'),
        ('3', 'Carlos López', 'carlos@ejemplo.com', '555-9012')");
    
    $conn->query("INSERT INTO funciones VALUES 
        ('1', '1', 'Sala 1', '2025-02-01', '18:00', 12.50),
        ('2', '1', 'Sala 2', '2025-02-01', '21:00', 12.50),
        ('3', '2', 'Sala 1', '2025-02-02', '19:30', 10.00),
        ('4', '3', 'Sala 3', '2025-02-02', '20:00', 11.50)");
    
    $conn->query("INSERT INTO boletos VALUES 
        ('1', '1', '1', 'A12', NOW(), 12.50),
        ('2', '2', '2', 'B05', NOW(), 12.50),
        ('3', '3', '3', 'C08', NOW(), 10.00)");
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Setup Completo</title>
    <style>
        body { font-family: Arial; max-width: 500px; margin: 50px auto; text-align: center; }
        a { display: inline-block; padding: 10px 20px; margin: 5px; background: #007cba; color: white; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🎬 Base de datos configurada!</h1>
    <p>Todas las tablas y datos de ejemplo han sido creados.</p>
    
    <h3>Probar APIs:</h3>
    <a href="peliculas.php">🎬 Películas</a>
    <a href="funciones.php">🎭 Funciones</a>
    <a href="clientes.php">👥 Clientes</a>
    <a href="boletos.php">🎫 Boletos</a>
    
    <br><br>
    <a href="../screens/index.html">🏠 Ir al Sistema</a>
</body>
</html>