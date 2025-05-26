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
                $stmt = $conn->prepare("SELECT * FROM funciones WHERE id = ?");
                $stmt->bind_param("s", $id);
                $stmt->execute();
                $result = $stmt->get_result();
                $funcion = $result->fetch_assoc();
                if ($funcion) {
                    echo json_encode($funcion);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Funcion no encontrada"]);
                }
                $stmt->close();
            } else {
                $query = "SELECT f.*, p.titulo as pelicula_titulo, p.duracion 
                         FROM funciones f 
                         LEFT JOIN peliculas p ON f.pelicula_id = p.id";
                $result = $conn->query($query);
                $funciones = [];
                while ($row = $result->fetch_assoc()) {
                    $funcion = [
                        'id' => $row['id'],
                        'pelicula_id' => $row['pelicula_id'],
                        'sala' => $row['sala'],
                        'fecha' => $row['fecha'],
                        'hora' => $row['hora'],
                        'precio' => $row['precio'],
                        'peliculas' => [
                            'titulo' => $row['pelicula_titulo'],
                            'duracion' => $row['duracion']
                        ]
                    ];
                    $funciones[] = $funcion;
                }
                echo json_encode($funciones);
            }
            break;

        case 'POST':
            $input = json_decode(file_get_contents("php://input"), true);
            $id = $input['id'];
            $pelicula_id = $input['pelicula_id'] ?? '';
            $sala = $input['sala'] ?? '';
            $fecha = $input['fecha'] ?? '';
            $hora = $input['hora'] ?? '';
            $precio = $input['precio'] ?? 0;

            if (empty($pelicula_id) || empty($sala) || empty($fecha) || empty($hora)) {
                http_response_code(400);
                echo json_encode(["error" => "Todos los campos son obligatorios"]);
                exit();
            }

            $stmt = $conn->prepare("INSERT INTO funciones (id, pelicula_id, sala, fecha, hora, precio) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssd", $id, $pelicula_id, $sala, $fecha, $hora, $precio);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Funcion creada", "id" => $id]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al crear la funcion: " . $stmt->error]);
            }
            $stmt->close();
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
            
            $stmt = $conn->prepare("UPDATE funciones SET pelicula_id = ?, sala = ?, fecha = ?, hora = ?, precio = ? WHERE id = ?");
            $stmt->bind_param("ssssds", $pelicula_id, $sala, $fecha, $hora, $precio, $id);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Funcion actualizada"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al actualizar la funcion"]);
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
            
            $stmt = $conn->prepare("DELETE FROM funciones WHERE id = ?");
            $stmt->bind_param("s", $id);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Funcion eliminada"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al eliminar la funcion"]);
            }
            $stmt->close();
            break;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Metodo no permitido"]);
    }

    $conn->close();
?>
