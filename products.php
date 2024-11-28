<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root"; // Cambiar según tu configuración
$password = ""; // Cambiar según tu configuración
$database = "webluka";

$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Error al conectar con la base de datos."]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'addProduct') {
    // Recibir datos
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = floatval($_POST['price']);
    $stock = intval($_POST['stock']);
    $category = $_POST['category'];

    // Manejo del archivo de imagen
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES['image'];
        $imageName = uniqid() . "_" . basename($image['name']);
        $uploadDir = "uploads/"; // Carpeta para guardar imágenes
        $uploadFile = $uploadDir . $imageName;

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (move_uploaded_file($image['tmp_name'], $uploadFile)) {
            // Guardar datos en la base de datos
            $sql = "INSERT INTO Productos (name, description, price, stock, category, image) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssdis", $name, $description, $price, $stock, $category, $uploadFile);

            if ($stmt->execute()) {
                echo json_encode([
                    "status" => "success",
                    "message" => "Producto registrado correctamente.",
                    "imageUrl" => $uploadFile
                ]);
            } else {
                echo json_encode(["status" => "error", "message" => "Error al guardar el producto."]);
            }

            $stmt->close();
        } else {
            echo json_encode(["status" => "error", "message" => "Error al guardar la imagen."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Imagen no válida."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Solicitud no válida."]);
}

$conn->close();
?>
