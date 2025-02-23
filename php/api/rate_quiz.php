<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once '../db/db.php';
session_start();
// Prüfen, ob User eingeloggt
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nicht eingeloggt.'
    ]);
    exit;
}

// Request-Daten
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);
$catalogId = isset($data['catalog_id']) ? (int) $data['catalog_id'] : 0;
$ratingValue = isset($data['rating']) ? (int) $data['rating'] : 0;

// Plausibilitäts-Check
if ($catalogId < 1 || $ratingValue < 1 || $ratingValue > 10) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Ungültige Parameter.'
    ]);
    exit;
}

// 1) Prüfen, ob schon ein Rating-Eintrag für diesen catalog_id existiert
$sqlSelect = "SELECT rating_value, rating_count FROM Rating WHERE catalog_id = ?";
$stmtSel = $conn->prepare($sqlSelect);
$stmtSel->bind_param("i", $catalogId);
$stmtSel->execute();
$resSel = $stmtSel->get_result();

if ($row = $resSel->fetch_assoc()) {
    // --> Existierendes Rating aktualisieren
    $oldValue = (float) $row['rating_value'];
    $oldCount = (int) $row['rating_count'];

    $newCount = $oldCount + 1;
    // Durchschnitt neu berechnen
    $newValue = ($oldValue * $oldCount + $ratingValue) / $newCount;

    // Update
    $sqlUpdate = "UPDATE Rating
                     SET rating_value = ?,
                         rating_count = ?,
                         date         = NOW()
                   WHERE catalog_id   = ?";
    $stmtUp = $conn->prepare($sqlUpdate);
    $stmtUp->bind_param("dii", $newValue, $newCount, $catalogId);
    $stmtUp->execute();

    if ($stmtUp->error) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Fehler beim Aktualisieren der Bewertung: ' . $stmtUp->error
        ]);
        exit;
    }
} else {
    // --> Noch kein Eintrag vorhanden: neuen Datensatz anlegen
    $sqlInsert = "INSERT INTO Rating (catalog_id, rating_value, rating_count, date)
                  VALUES (?, ?, 1, NOW())";
    $stmtIns = $conn->prepare($sqlInsert);
    $stmtIns->bind_param("id", $catalogId, $ratingValue);
    $stmtIns->execute();

    if ($stmtIns->error) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Fehler beim Anlegen der Bewertung: ' . $stmtIns->error
        ]);
        exit;
    }
}

// Erfolgsmeldung
echo json_encode([
    'status' => 'ok',
    'message' => 'Bewertung erfolgreich gespeichert.'
]);
exit;
