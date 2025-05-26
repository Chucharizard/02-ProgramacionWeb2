<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$serverName = "localhost";
$connectionOptions = array(
    "Database" => "cinedb",
    "Uid" => "",
    "PWD" => "",
    "TrustServerCertificate" => true
);

$conn = sqlsrv_connect($serverName, $connectionOptions);

if (!$conn) {
    http_response_code(500);
    die(json_encode(["error" => "Error de conexion a SQL Server"]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = sqlsrv_prepare($conn, "SELECT * FROM peliculas WHERE id = ?", array($id));
            if ($stmt && sqlsrv_execute($stmt)) {
                $pelicula = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
                if ($pelicula) {
                    echo json_encode($pelicula);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Pelicula no encontrada"]);
                }
            }
        } else {
            $stmt = sqlsrv_query($conn, "SELECT * FROM peliculas");
            $peliculas = [];
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $peliculas[] = $row;
            }
            echo json_encode($peliculas);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? uniqid();
        $titulo = $input['titulo'] ?? '';
        $duracion = $input['duracion'] ?? 0;
        $clasificacion = $input['clasificacion'] ?? '';
        $imagen_url = $input['imagen_url'] ?? '';

        if (empty($titulo)) {
            http_response_code(400);
            echo json_encode(["error" => "El titulo es obligatorio"]);
            exit();
        }

        $stmt = sqlsrv_prepare($conn,
            "INSERT INTO peliculas (id, titulo, duracion, clasificacion, imagen_url) VALUES (?, ?, ?, ?, ?)", 
            array($id, $titulo, $duracion, $clasificacion, $imagen_url)
        );

        if ($stmt && sqlsrv_execute($stmt)) {
            http_response_code(201);
            echo json_encode(["message" => "Pelicula creada", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear la pelicula"]);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? '';
        $titulo = $input['titulo'] ?? '';
        $duracion = $input['duracion'] ?? 0;
        $clasificacion = $input['clasificacion'] ?? '';
        $imagen_url = $input['imagen_url'] ?? '';
        
        if (empty($id) || empty($titulo)) {
            http_response_code(400);
            echo json_encode(["error" => "ID y titulo son obligatorios"]);
            exit();
        }
        
        $stmt = sqlsrv_prepare($conn,
            "UPDATE peliculas SET titulo = ?, duracion = ?, clasificacion = ?, imagen_url = ? WHERE id = ?",
            array($titulo, $duracion, $clasificacion, $imagen_url, $id)
        );
        
        if ($stmt && sqlsrv_execute($stmt)) {
            echo json_encode(["message" => "Pelicula actualizada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar la pelicula"]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? '';
        
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            exit();
        }
        
        $stmt = sqlsrv_prepare($conn, "DELETE FROM peliculas WHERE id = ?", array($id));
        
        if ($stmt && sqlsrv_execute($stmt)) {
            echo json_encode(["message" => "Pelicula eliminada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar la pelicula"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Metodo no permitido"]);
}

sqlsrv_close($conn);
?>
