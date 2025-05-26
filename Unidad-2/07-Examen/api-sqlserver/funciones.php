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
            $stmt = sqlsrv_prepare($conn, 
                "SELECT f.*, p.titulo as pelicula_titulo 
                 FROM funciones f 
                 LEFT JOIN peliculas p ON f.pelicula_id = p.id 
                 WHERE f.id = ?", 
                array($id)
            );
            if ($stmt && sqlsrv_execute($stmt)) {
                $funcion = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
                if ($funcion) {
                    // Convertir fecha para JSON
                    if ($funcion['fecha']) {
                        $funcion['fecha'] = $funcion['fecha']->format('Y-m-d');
                    }
                    echo json_encode($funcion);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Funcion no encontrada"]);
                }
            }
        } else {
            $stmt = sqlsrv_query($conn, 
                "SELECT f.*, p.titulo as pelicula_titulo 
                 FROM funciones f 
                 LEFT JOIN peliculas p ON f.pelicula_id = p.id 
                 ORDER BY f.fecha, f.hora"
            );
            $funciones = [];
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {

                if ($row['fecha']) {
                    $row['fecha'] = $row['fecha']->format('Y-m-d');
                }
                $funciones[] = $row;
            }
            echo json_encode($funciones);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? uniqid();
        $pelicula_id = $input['pelicula_id'] ?? '';
        $sala = $input['sala'] ?? '';
        $fecha = $input['fecha'] ?? '';
        $hora = $input['hora'] ?? '';
        $precio = $input['precio'] ?? 0;

        if (empty($pelicula_id) || empty($sala) || empty($fecha) || empty($hora)) {
            http_response_code(400);
            echo json_encode(["error" => "Pelicula, sala, fecha y hora son obligatorios"]);
            exit();
        }

        $stmt = sqlsrv_prepare($conn, 
            "INSERT INTO funciones (id, pelicula_id, sala, fecha, hora, precio) VALUES (?, ?, ?, ?, ?, ?)",
            array($id, $pelicula_id, $sala, $fecha, $hora, $precio)
        );

        if ($stmt && sqlsrv_execute($stmt)) {
            http_response_code(201);
            echo json_encode(["message" => "Funcion creada", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear la funcion"]);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? '';
        $pelicula_id = $input['pelicula_id'] ?? '';
        $sala = $input['sala'] ?? '';
        $fecha = $input['fecha'] ?? '';
        $hora = $input['hora'] ?? '';
        $precio = $input['precio'] ?? 0;
        
        if (empty($id) || empty($pelicula_id) || empty($sala) || empty($fecha) || empty($hora)) {
            http_response_code(400);
            echo json_encode(["error" => "Todos los campos son obligatorios"]);
            exit();
        }
        
        $stmt = sqlsrv_prepare($conn,
            "UPDATE funciones SET pelicula_id = ?, sala = ?, fecha = ?, hora = ?, precio = ? WHERE id = ?",
            array($pelicula_id, $sala, $fecha, $hora, $precio, $id)
        );
        
        if ($stmt && sqlsrv_execute($stmt)) {
            echo json_encode(["message" => "Función actualizada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar la funcion"]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? '';
        
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            exit();
        }
        
        $stmt = sqlsrv_prepare($conn, "DELETE FROM funciones WHERE id = ?", array($id));
        
        if ($stmt && sqlsrv_execute($stmt)) {
            echo json_encode(["message" => "Funcion eliminada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar la funcion"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Mwtodo no permitido"]);
}

sqlsrv_close($conn);
?>
