<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");

$serverName = "localhost";
$connectionOptions = array(
    "Database" => "cinedb",
    "Uid" => "",
    "PWD" => "",
    "TrustServerCertificate" => true
);

$conn = sqlsrv_connect($serverName, $connectionOptions);

if (!$conn) {
    echo "<h1>❌ Error de conexión a SQL Server</h1>";
    $errors = sqlsrv_errors();
    foreach ($errors as $error) {
        echo "<p>Error: " . htmlspecialchars($error['message']) . "</p>";
    }
    exit;
}

echo "<h1>🎬 Creando tablas del sistema de cine en SQL Server</h1>";
echo "<hr>";

// Tabla peliculas
echo "<h3>📽️ Creando tabla 'peliculas'...</h3>";
$createPeliculas = "
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='peliculas' AND xtype='U')
CREATE TABLE peliculas (
    id VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    duracion INT,
    clasificacion VARCHAR(50),
    imagen_url VARCHAR(500)
)
";

if (sqlsrv_query($conn, $createPeliculas)) {
    echo "<p style='color: green;'>✅ Tabla 'peliculas' creada exitosamente</p>";
} else {
    echo "<p style='color: red;'>❌ Error al crear tabla 'peliculas'</p>";
    $errors = sqlsrv_errors();
    foreach ($errors as $error) {
        echo "<p>Error: " . htmlspecialchars($error['message']) . "</p>";
    }
}

// Tabla clientes
echo "<h3>👥 Creando tabla 'clientes'...</h3>";
$createClientes = "
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='clientes' AND xtype='U')
CREATE TABLE clientes (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    telefono VARCHAR(50)
)
";

if (sqlsrv_query($conn, $createClientes)) {
    echo "<p style='color: green;'>✅ Tabla 'clientes' creada exitosamente</p>";
} else {
    echo "<p style='color: red;'>❌ Error al crear tabla 'clientes'</p>";
    $errors = sqlsrv_errors();
    foreach ($errors as $error) {
        echo "<p>Error: " . htmlspecialchars($error['message']) . "</p>";
    }
}

// Tabla funciones
echo "<h3>🎭 Creando tabla 'funciones'...</h3>";
$createFunciones = "
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='funciones' AND xtype='U')
CREATE TABLE funciones (
    id VARCHAR(50) PRIMARY KEY,
    pelicula_id VARCHAR(50),
    sala VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    hora VARCHAR(10) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE
)
";

if (sqlsrv_query($conn, $createFunciones)) {
    echo "<p style='color: green;'>✅ Tabla 'funciones' creada exitosamente</p>";
} else {
    echo "<p style='color: red;'>❌ Error al crear tabla 'funciones'</p>";
    $errors = sqlsrv_errors();
    foreach ($errors as $error) {
        echo "<p>Error: " . htmlspecialchars($error['message']) . "</p>";
    }
}

// Tabla boletos
echo "<h3>🎫 Creando tabla 'boletos'...</h3>";
$createBoletos = "
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='boletos' AND xtype='U')
CREATE TABLE boletos (
    id VARCHAR(50) PRIMARY KEY,
    funcion_id VARCHAR(50),
    cliente_id VARCHAR(50),
    asiento VARCHAR(50) NOT NULL,
    fecha_compra DATETIME DEFAULT GETDATE(),
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (funcion_id) REFERENCES funciones(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
)
";

if (sqlsrv_query($conn, $createBoletos)) {
    echo "<p style='color: green;'>✅ Tabla 'boletos' creada exitosamente</p>";
} else {
    echo "<p style='color: red;'>❌ Error al crear tabla 'boletos'</p>";
    $errors = sqlsrv_errors();
    foreach ($errors as $error) {
        echo "<p>Error: " . htmlspecialchars($error['message']) . "</p>";
    }
}

echo "<hr>";
echo "<h3>🎯 ¡Proceso completado!</h3>";
echo "<p><strong>Todas las tablas del sistema de cine han sido procesadas en SQL Server</strong></p>";
echo "<br>";
echo "<a href='peliculas.php' style='padding: 10px 20px; background: #0066cc; color: white; text-decoration: none; border-radius: 5px;'>Probar API de Películas</a>";
echo " ";
echo "<a href='clientes.php' style='padding: 10px 20px; background: #28a745; color: white; text-decoration: none; border-radius: 5px;'>Probar API de Clientes</a>";

sqlsrv_close($conn);
?>
