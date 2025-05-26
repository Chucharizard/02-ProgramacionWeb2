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
    die(json_encode(["error" => "Error de conexión a SQL Server"]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = sqlsrv_prepare($conn, 
                "SELECT b.*, c.nombre as cliente_nombre, c.email as cliente_email,
                        f.sala, f.fecha, f.hora, p.titulo as pelicula_titulo
                 FROM boletos b 
                 LEFT JOIN clientes c ON b.cliente_id = c.id
                 LEFT JOIN funciones f ON b.funcion_id = f.id
                 LEFT JOIN peliculas p ON f.pelicula_id = p.id
                 WHERE b.id = ?", 
                array($id)
            );
            if ($stmt && sqlsrv_execute($stmt)) {
                $boleto = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
                if ($boleto) {
                    // Convertir fechas para JSON
                    if ($boleto['fecha_compra']) {
                        $boleto['fecha_compra'] = $boleto['fecha_compra']->format('Y-m-d H:i:s');
                    }
                    if ($boleto['fecha']) {
                        $boleto['fecha'] = $boleto['fecha']->format('Y-m-d');
                    }
                    echo json_encode($boleto);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Boleto no encontrado"]);
                }
            }
        } else {
            $stmt = sqlsrv_query($conn, 
                "SELECT b.*, c.nombre as cliente_nombre, c.email as cliente_email,
                        f.sala, f.fecha, f.hora, p.titulo as pelicula_titulo
                 FROM boletos b 
                 LEFT JOIN clientes c ON b.cliente_id = c.id
                 LEFT JOIN funciones f ON b.funcion_id = f.id
                 LEFT JOIN peliculas p ON f.pelicula_id = p.id
                 ORDER BY b.fecha_compra DESC"
            );
            $boletos = [];
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                // Convertir fechas para JSON
                if ($row['fecha_compra']) {
                    $row['fecha_compra'] = $row['fecha_compra']->format('Y-m-d H:i:s');
                }
                if ($row['fecha']) {
                    $row['fecha'] = $row['fecha']->format('Y-m-d');
                }
                $boletos[] = $row;
            }
            echo json_encode($boletos);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? uniqid();
        $funcion_id = $input['funcion_id'] ?? '';
        $cliente_id = $input['cliente_id'] ?? null;
        $asiento = $input['asiento'] ?? '';
        $precio = $input['precio'] ?? 0;

        if (empty($funcion_id) || empty($asiento)) {
            http_response_code(400);
            echo json_encode(["error" => "Función y asiento son obligatorios"]);
            exit();
        }

        // Verificar si el asiento ya está ocupado
        $checkStmt = sqlsrv_prepare($conn, 
            "SELECT COUNT(*) as count FROM boletos WHERE funcion_id = ? AND asiento = ?",
            array($funcion_id, $asiento)
        );
        
        if ($checkStmt && sqlsrv_execute($checkStmt)) {
            $result = sqlsrv_fetch_array($checkStmt, SQLSRV_FETCH_ASSOC);
            if ($result['count'] > 0) {
                http_response_code(400);
                echo json_encode(["error" => "El asiento ya está ocupado"]);
                exit();
            }
        }

        $stmt = sqlsrv_prepare($conn, 
            "INSERT INTO boletos (id, funcion_id, cliente_id, asiento, precio) VALUES (?, ?, ?, ?, ?)",
            array($id, $funcion_id, $cliente_id, $asiento, $precio)
        );

        if ($stmt && sqlsrv_execute($stmt)) {
            http_response_code(201);
            echo json_encode(["message" => "Boleto creado", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear el boleto"]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? '';
        
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID requerido"]);
            exit();
        }
        
        $stmt = sqlsrv_prepare($conn, "DELETE FROM boletos WHERE id = ?", array($id));
        
        if ($stmt && sqlsrv_execute($stmt)) {
            echo json_encode(["message" => "Boleto eliminado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar el boleto"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}

sqlsrv_close($conn);
?>
