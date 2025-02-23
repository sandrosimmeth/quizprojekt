<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
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

try {
    // Prepared Statement für mehr Sicherheit
    $stmt = $conn->prepare("SELECT study_program_id FROM user WHERE user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $row = $result->fetch_assoc()) {
        echo json_encode([
            'status' => 'ok',
            'message' => 'Favoriten geladen',
            'study_program_id' => (int) $row['study_program_id']
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Studiengang konnte nicht gefunden werden.'
        ]);
    }
    $stmt->close();
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Es gab einen Fehler beim Laden des Studiengangs: ' . $e->getMessage(),
    ]);
}

exit;