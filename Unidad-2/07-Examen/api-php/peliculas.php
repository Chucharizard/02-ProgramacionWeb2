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
                $stmt = $conn->prepare("SELECT * FROM peliculas WHERE id = ?");
                $stmt->bind_param("s", $id);
                $stmt->execute();
                $result = $stmt->get_result();
                $pelicula = $result->fetch_assoc();
                if ($pelicula) {
                    echo json_encode($pelicula);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Pelicula no encontrada"]);
                }
                $stmt->close();
            } else {
                $result = $conn->query("SELECT * FROM peliculas");
                $peliculas = [];
                while ($row = $result->fetch_assoc()) {
                    $peliculas[] = $row;
                }
                echo json_encode($peliculas);
            }
            break;

        case 'POST':
            $input = json_decode(file_get_contents("php://input"), true);
            $id = $input['id'];
            $titulo = $input['titulo'] ?? '';
            $duracion = $input['duracion'] ?? 0;
            $clasificacion = $input['clasificacion'] ?? '';
            $imagen_url = $input['imagen_url'] ?? '';

            if (empty($titulo)) {
                http_response_code(400);
                echo json_encode(["error" => "El titulo es obligatorio"]);
                exit();
            }

            $stmt = $conn->prepare("INSERT INTO peliculas (id, titulo, duracion, clasificacion, imagen_url) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("ssiss", $id, $titulo, $duracion, $clasificacion, $imagen_url);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Pelicula creada", "id" => $id]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al crear la pelicula: " . $stmt->error]);
            }
            $stmt->close();
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
            
            $stmt = $conn->prepare("UPDATE peliculas SET titulo = ?, duracion = ?, clasificacion = ?, imagen_url = ? WHERE id = ?");
            $stmt->bind_param("sisss", $titulo, $duracion, $clasificacion, $imagen_url, $id);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Película actualizada"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al actualizar la pelicula"]);
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
            
            $stmt = $conn->prepare("DELETE FROM peliculas WHERE id = ?");
            $stmt->bind_param("s", $id);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Pelicula eliminada"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al eliminar la pelicula"]);
            }
            $stmt->close();
            break;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Metodo no permitido"]);
    }

    $conn->close();
?>
