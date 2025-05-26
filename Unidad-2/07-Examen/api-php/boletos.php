<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=UTF-8");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cinedb";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        http_response_code(500);
        die(json_encode(["error" => "conexion fallida: " . $conn->connect_error]));
    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM boletos WHERE id = ?");
                $stmt->bind_param("s", $id);
                $stmt->execute();
                $result = $stmt->get_result();
                $boleto = $result->fetch_assoc();
                if ($boleto) {
                    echo json_encode($boleto);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Boleto no encontrado"]);
                }
                $stmt->close();
            } else {
                $query = "SELECT b.*, 
                        f.sala, f.fecha, f.hora,
                        p.titulo as pelicula_titulo,
                        c.nombre as cliente_nombre, c.email as cliente_email
                        FROM boletos b 
                        LEFT JOIN funciones f ON b.funcion_id = f.id
                        LEFT JOIN peliculas p ON f.pelicula_id = p.id
                        LEFT JOIN clientes c ON b.cliente_id = c.id";
                $result = $conn->query($query);
                $boletos = [];
                while ($row = $result->fetch_assoc()) {
                    $boleto = [
                        'id' => $row['id'],
                        'funcion_id' => $row['funcion_id'],
                        'cliente_id' => $row['cliente_id'],
                        'asiento' => $row['asiento'],
                        'fecha_compra' => $row['fecha_compra'],
                        'precio' => $row['precio'],
                        'funciones' => [
                            'sala' => $row['sala'],
                            'fecha' => $row['fecha'],
                            'hora' => $row['hora'],
                            'peliculas' => [
                                'titulo' => $row['pelicula_titulo']
                            ]
                        ],
                        'clientes' => [
                            'nombre' => $row['cliente_nombre'],
                            'email' => $row['cliente_email']
                        ]
                    ];
                    $boletos[] = $boleto;
                }
                echo json_encode($boletos);
            }
            break;

        case 'POST':
            $input = json_decode(file_get_contents("php://input"), true);
            $id = $input['id'];
            $funcion_id = $input['funcion_id'] ?? '';
            $cliente_id = $input['cliente_id'] ?? '';
            $asiento = $input['asiento'] ?? '';
            $precio = $input['precio'] ?? 0;

            if (empty($funcion_id) || empty($cliente_id) || empty($asiento)) {
                http_response_code(400);
                echo json_encode(["error" => "Función, cliente y asiento son obligatorios"]);
                exit();
            }

            $stmt = $conn->prepare("INSERT INTO boletos (id, funcion_id, cliente_id, asiento, precio) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssd", $id, $funcion_id, $cliente_id, $asiento, $precio);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Boleto creado", "id" => $id]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al crear el boleto: " . $stmt->error]);
            }
            $stmt->close();
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? '';
            
            if (empty($id)) {
                http_response_code(400);
                echo json_encode(["error" => "ID requerido"]);
                exit();
            }
            
            $stmt = $conn->prepare("DELETE FROM boletos WHERE id = ?");
            $stmt->bind_param("s", $id);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Boleto eliminado"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al eliminar el boleto"]);
            }
            $stmt->close();
            break;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido"]);
    }

    $conn->close();
?>
