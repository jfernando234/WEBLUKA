<?php
// Conexión a la base de datos
$conn = new mysqli('localhost', 'root', '', 'webluka');

if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}

// Consulta para obtener productos agrupados por categoría
$sql = "SELECT * FROM Productos ORDER BY categoria";
$result = $conn->query($sql);

$productos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[$row['categoria']][] = $row; // Agrupa por categoría
    }
}

header('Content-Type: application/json');
echo json_encode($productos);

$conn->close();
?>
