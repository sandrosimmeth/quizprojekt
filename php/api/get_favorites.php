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

// Favoriten laden
$sql = "SELECT catalog_id FROM FavoriteQuiz
        WHERE user_id = $userId";

$result = $conn->query($sql);
if ($result) {
    $favorites = [];

    while ($row = $result->fetch_assoc()) {
        // Jede Zeile (jedes Modul) fügen wir nun in das $modules-Array ein.
        // Wir übergeben module_id und name als Schlüssel-Wert-Paar.
        $favorites[] = (int) $row['catalog_id'];
    }
    echo json_encode([
        'status' => 'ok',
        'message' => 'Favoriten geladen',
        'favorites' => $favorites
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Es gab einen Fehler beim Laden der Favoriten',
    ]);
}

exit;
