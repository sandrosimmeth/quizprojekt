<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

session_start();
require_once '../db/db.php';
// Prüfen, ob der Benutzer eingeloggt ist
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nicht eingeloggt.'
    ]);
    exit;
}

$userId = $_SESSION['user_id'];

// Punkte laden
$sql = "SELECT points FROM User WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $points = $row['points'];
        echo json_encode([
            'status' => 'ok',
            'points' => $points
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Keine Punkte gefunden.'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Es gab einen Fehler beim Laden der Punkte: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();

exit;
