<?php
// Conexión a la base de datos
$servername = "localhost"; // Cambia según tu configuración
$username = "root";        // Cambia según tu usuario
$password = "";            // Cambia según tu contraseña
$database = "nombre_base_datos"; // Cambia al nombre de tu base de datos

$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Error de conexión a la base de datos"]));
}

// Determinar si es una solicitud de registro o inicio de sesión
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === "register") {
        // Registro de usuario
        $nombre_completo = $_POST['nombre_completo'];
        $email = $_POST['email'];
        $usuario = $_POST['usuario'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

        // Verificar si el correo o usuario ya existen
        $sql = "SELECT * FROM usuarios WHERE email = ? OR usuario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $usuario);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(["status" => "error", "message" => "El correo o usuario ya está registrado"]);
        } else {
            // Insertar el nuevo usuario
            $sql_insert = "INSERT INTO usuarios (nombre_completo, email, usuario, password) VALUES (?, ?, ?, ?)";
            $stmt_insert = $conn->prepare($sql_insert);
            $stmt_insert->bind_param("ssss", $nombre_completo, $email, $usuario, $password);

            if ($stmt_insert->execute()) {
                echo json_encode(["status" => "success", "message" => "Registro exitoso"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Error al registrar el usuario"]);
            }

            $stmt_insert->close();
        }
        $stmt->close();
    } elseif ($action === "login") {
        // Inicio de sesión
        $email = $_POST['email'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                echo json_encode(["status" => "success", "message" => "Inicio de sesión exitoso"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Contraseña incorrecta"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Usuario no encontrado"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Acción no válida"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}

$conn->close();
?>
