<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
require_once '../db/db.php';
// Überprüfen, ob die Datenbankverbindung existiert
if (!$conn) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Datenbankverbindung fehlgeschlagen.'
    ]);
    exit;
}
session_start();
// Prüfen, ob User eingeloggt ist
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nicht eingeloggt!'
    ]);
    exit;
}
// Benutzer-ID aus der Session holen
$userId = $_SESSION['user_id'];

$inputJSON = file_get_contents('php://input');

// Wir decodieren diese JSON-Daten in ein PHP-Array bzw. Objekt.
if (!empty($inputJSON)) {
    $data = json_decode($inputJSON, true);

    // Ensure decoding was successful and catalog_id exists
    if (json_last_error() === JSON_ERROR_NONE && isset($data['report_id'])) {
        $reportId = $data['report_id'];
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Kein Report übergeben!'
    ]);
    exit;
}

$sql = "UPDATE reportedquestion SET done = 1 WHERE report_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $reportId); // "i" means integer

if (!$stmt) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Vorbereiten der SQL-Abfrage: ' . $conn->error
    ]);
    exit;
}
if (!$stmt->execute()) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Ausführen der Abfrage: ' . $stmt->error
    ]);
    exit;
}
$stmt->close();
echo json_encode([
    'status' => 'ok',
    'message' => 'Meldung als erledigt markiert'
]);