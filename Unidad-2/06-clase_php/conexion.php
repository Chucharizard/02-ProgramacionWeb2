<?php
header("Access-Control-Allow-Origin: *");// permite el acceso a cualquier origen
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");//metodos http
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");//cabeceras permitidas
header("Content-Type: application/json; charset=UTF-8");//tipo de contenido


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
$servername = "localhost";//mi pc
$username = "root"; // usuario de la base de datos en phpmyadmin
$password = "";// password del usuario del gestor
$dbname = "dbClientes";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);//
// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "error de conexion: " . $conn->connect_error]));
} else {
    echo "conectado con exito";//pa saber nomas
}
$metodos = $_SERVER['REQUEST_METHOD'];//metodo que se esta usando
switch($metodos){
case 'GET':
    $id =$_GET['id'??null];
    if($id)
    {
        $smtmt = $conn->prepare("SELECT * FROM clientes WHERE id = ?");
        $smtmt= ->blind_param("i", $id);
        $smtmt->execute();
        $smtmt=$smtmt->get_result();
        $clientes =$result ->fetch_assoc();
        /*if($clientes){
            echo json_encode($clientes);
        }*/ 
        echo json_decode($clientes);
        else{
            $result=$conn->query("SELECT * FROM clientes");	
            $clientes = [];
            while($row=$result->fetch:assoc()){
                $clientes []=$row; 
            }
            echo json_encode($clientes);
        }
        break; 
    }
        
case 'POST':
    $data = json_decode(file_get_contents("php://input"), true);
    $nombre = $data['nombre'];
    $apellido = $data['apellido'];
    $email = $data['email'];
    $telefono = $data['telefono'];
    $sql = "INSERT INTO clientes (nombre, apellido, email, telefono) VALUES ('$nombre', '$apellido', '$email', '$telefono')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Cliente creado con exito"));
    } else {
        echo json_encode(array("error" => "Error al crear el cliente: " . $conn->error));
    }
    break;}
case 'PUT':
    $data = json_decode(file_get_contents("php://input"), true);
    $nombre = $data['nombre'];
    $apellido = $data['apellido'];
    $email = $data['email'];
    $telefono = $data['telefono'];
    $smtmt=$conn->prepare("UPDATE cliente SET nombre=?,email=? WHERE id =?")
    $smtmt -> dind_param('sss',$nombre, $email, $id);
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Cliente creado con exito"));
    } else {
        echo json_encode(array("error" => "Error al crear el cliente: " . $conn->error));
    }
    break;}
case 'DELETE':
    $id = $_GET['id'];//Se debe hacer el getpara obtener el ID de manera obligatoria
    $smtmt= $conn->prepare("DELETE FROM clientes WHERE id=?");//Delete * from database jsjsjs
    $smtmt->bind_param("i", $id);
    if($smtmt->execute()){
        http_response_code(200);
        echo json_encode(["message"=>"Cliente eliminado"]);
    }
    else{
        http_response_code(500);
        echo json_encode(["error"=>"error al eliminar el cliente"]);
    }
    break;
default:
    http_response_code(405);
    echo json_encode(["error"=>"Todo mal F"]);
   
$conn->close();//siempre tengo que cerrar la conexcion 

?>