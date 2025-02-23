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

// JSON-Daten aus dem Request lesen
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

$catalogId = isset($data['catalog_id']) ? (int) $data['catalog_id'] : 0;

// Plausibilitätsprüfung
if ($catalogId < 1) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Ungültiger Fragenkatalog.'
    ]);
    exit;
}

// Favorit hinzufügen
$sql = "INSERT IGNORE INTO FavoriteQuiz (user_id, catalog_id, date_favorited)
        VALUES (?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $userId, $catalogId);
$stmt->execute();

if ($stmt->error) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Speichern: ' . $stmt->error
    ]);
    exit;
}

echo json_encode([
    'status' => 'ok',
    'message' => 'Fragenkatalog erfolgreich favorisiert.'
]);
exit;
