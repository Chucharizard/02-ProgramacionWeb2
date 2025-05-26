<?php
header("Content-Type: text/html; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cinedb";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

echo "<h1>Configuración de la base de datos del Sistema de Cine</h1>";

$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    echo "<p>✅ Base de datos 'cinedb' creada o ya existente</p>";
} else {
    echo "<p>❌ Error al crear la base de datos: " . $conn->error . "</p>";
}

$conn->select_db($dbname);

$sql = "CREATE TABLE IF NOT EXISTS peliculas (
    id VARCHAR(255) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    duracion INT,
    clasificacion VARCHAR(50),
    imagen_url TEXT
)";

if ($conn->query($sql) === TRUE) {
    echo "<p>✅ Tabla 'peliculas' creada o ya existente</p>";
} else {
    echo "<p>❌ Error al crear la tabla peliculas: " . $conn->error . "</p>";
}

$sql = "CREATE TABLE IF NOT EXISTS funciones (
    id VARCHAR(255) PRIMARY KEY,
    pelicula_id VARCHAR(255),
    sala VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    hora VARCHAR(10) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE
)";

if ($conn->query($sql) === TRUE) {
    echo "<p>✅ Tabla 'funciones' creada o ya existente</p>";
} else {
    echo "<p>❌ Error al crear la tabla funciones: " . $conn->error . "</p>";
}

$sql = "CREATE TABLE IF NOT EXISTS clientes (
    id VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    telefono VARCHAR(50)
)";

if ($conn->query($sql) === TRUE) {
    echo "<p>✅ Tabla 'clientes' creada o ya existente</p>";
} else {
    echo "<p>❌ Error al crear la tabla clientes: " . $conn->error . "</p>";
}

$sql = "CREATE TABLE IF NOT EXISTS boletos (
    id VARCHAR(255) PRIMARY KEY,
    funcion_id VARCHAR(255),
    cliente_id VARCHAR(255),
    asiento VARCHAR(20) NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (funcion_id) REFERENCES funciones(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "<p>✅ Tabla 'boletos' creada o ya existente</p>";
} else {
    echo "<p>❌ Error al crear la tabla boletos: " . $conn->error . "</p>";
}

$result = $conn->query("SELECT COUNT(*) as count FROM peliculas");
$row = $result->fetch_assoc();

if ($row['count'] == 0) {
    $sql = "INSERT INTO peliculas (id, titulo, duracion, clasificacion, imagen_url) VALUES 
            ('1', 'Avatar: El Camino del Agua', 192, 'PG-13', 'https://image.tmdb.org/t/p/w500/94xxm5701CzOdJdUEdIuwqZaowx.jpg'),
            ('2', 'Top Gun: Maverick', 130, 'PG-13', 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg'),
            ('3', 'Spider-Man: No Way Home', 148, 'PG-13', 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg')";
    
    if ($conn->query($sql) === TRUE) {
        echo "<p>🎬 Datos de ejemplo añadidos a la tabla 'peliculas'</p>";
    } else {
        echo "<p>❌ Error al insertar datos de ejemplo en peliculas: " . $conn->error . "</p>";
    }
}

$result = $conn->query("SELECT COUNT(*) as count FROM funciones");
$row = $result->fetch_assoc();

if ($row['count'] == 0) {
    $sql = "INSERT INTO funciones (id, pelicula_id, sala, fecha, hora, precio) VALUES 
            ('1', '1', 'Sala 1', '2025-02-01', '18:00', 12.50),
            ('2', '1', 'Sala 2', '2025-02-01', '21:00', 12.50),
            ('3', '2', 'Sala 1', '2025-02-02', '19:30', 10.00),
            ('4', '3', 'Sala 3', '2025-02-02', '20:00', 11.50)";
    
    if ($conn->query($sql) === TRUE) {
        echo "<p>🎭 Datos de ejemplo añadidos a la tabla 'funciones'</p>";
    } else {
        echo "<p>❌ Error al insertar datos de ejemplo en funciones: " . $conn->error . "</p>";
    }
}

$result = $conn->query("SELECT COUNT(*) as count FROM clientes");
$row = $result->fetch_assoc();

if ($row['count'] == 0) {
    $sql = "INSERT INTO clientes (id, nombre, email, telefono) VALUES 
            ('1', 'Juan Pérez', 'juan@ejemplo.com', '555-1234'),
            ('2', 'María García', 'maria@ejemplo.com', '555-5678'),
            ('3', 'Carlos López', 'carlos@ejemplo.com', '555-9012')";
    
    if ($conn->query($sql) === TRUE) {
        echo "<p>👥 Datos de ejemplo añadidos a la tabla 'clientes'</p>";
    } else {
        echo "<p>❌ Error al insertar datos de ejemplo en clientes: " . $conn->error . "</p>";
    }
}

$result = $conn->query("SELECT COUNT(*) as count FROM boletos");
$row = $result->fetch_assoc();

if ($row['count'] == 0) {
    $sql = "INSERT INTO boletos (id, funcion_id, cliente_id, asiento, precio) VALUES 
            ('1', '1', '1', 'A12', 12.50),
            ('2', '2', '2', 'B05', 12.50),
            ('3', '3', '3', 'C08', 10.00)";
    
    if ($conn->query($sql) === TRUE) {
        echo "<p>🎫 Datos de ejemplo añadidos a la tabla 'boletos'</p>";
    } else {
        echo "<p>❌ Error al insertar datos de ejemplo en boletos: " . $conn->error . "</p>";
    }
}

$conn->close();

echo "<h2>¡Configuración completada con éxito! 🎉</h2>";
echo "<h3>Probar las APIs:</h3>";
echo "<p><a href='http://localhost/api2/peliculas.php' target='_blank'>🎬 API de Películas</a></p>";
echo "<p><a href='http://localhost/api2/funciones.php' target='_blank'>🎭 API de Funciones</a></p>";
echo "<p><a href='http://localhost/api2/clientes.php' target='_blank'>👥 API de Clientes</a></p>";
echo "<p><a href='http://localhost/api2/boletos.php' target='_blank'>🎫 API de Boletos</a></p>";
echo "<p><a href='../screens/index.html' target='_blank'>🏠 Ir al Sistema de Cine</a></p>";

echo "<style>
body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
h1 { color: #0d253f; }
p { margin: 10px 0; }
a { color: #01b4e4; text-decoration: none; font-weight: bold; }
a:hover { text-decoration: underline; }
</style>";
?>
