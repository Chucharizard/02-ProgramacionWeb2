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
            $stmt = sqlsrv_prepare($conn, "SELECT * FROM clientes WHERE id = ?", array($id));
            if ($stmt && sqlsrv_execute($stmt)) {
                $cliente = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
                if ($cliente) {
                    echo json_encode($cliente);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Cliente no encontrado"]);
                }
            }
        } else {
            $stmt = sqlsrv_query($conn, "SELECT * FROM clientes");
            $clientes = [];
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $clientes[] = $row;
            }
            echo json_encode($clientes);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? uniqid();
        $nombre = $input['nombre'] ?? '';
        $email = $input['email'] ?? '';
        $telefono = $input['telefono'] ?? '';

        if (empty($nombre) || empty($email)) {
            http_response_code(400);
            echo json_encode(["error" => "Nombre y email son obligatorios"]);
            exit();
        }

        $stmt = sqlsrv_prepare($conn,
            "INSERT INTO clientes (id, nombre, email, telefono) VALUES (?, ?, ?, ?)",
            array($id, $nombre, $email, $telefono)
        );

        if ($stmt && sqlsrv_execute($stmt)) {
            http_response_code(201);
            echo json_encode(["message" => "Cliente creado", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear el cliente"]);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? '';
        $nombre = $input['nombre'] ?? '';
        $email = $input['email'] ?? '';
        $telefono = $input['telefono'] ?? '';
        
        if (empty($id) || empty($nombre) || empty($email)) {
            http_response_code(400);
            echo json_encode(["error" => "ID, nombre y email son obligatorios"]);
            exit();
        }
        
        $stmt = sqlsrv_prepare($conn,
            "UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?",
            array($nombre, $email, $telefono, $id)
        );
        
        if ($stmt && sqlsrv_execute($stmt)) {
            echo json_encode(["message" => "Cliente actualizado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar el cliente"]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? '';
        
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            exit();
        }
        
        $stmt = sqlsrv_prepare($conn, "DELETE FROM clientes WHERE id = ?", array($id));
        
        if ($stmt && sqlsrv_execute($stmt)) {
            echo json_encode(["message" => "Cliente eliminado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar el cliente"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Metodo no permitido"]);
}

sqlsrv_close($conn);
?>
