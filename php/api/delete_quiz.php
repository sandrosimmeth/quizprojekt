<?php
// delete_quiz.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4173');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
require_once '../db/db.php';

// 1) JSON-Daten aus dem Request einlesen
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

// 2) Prüfung, ob eine catalog_id übergeben wurde
if (!isset($data['catalog_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Keine catalog_id übergeben.'
    ]);
    exit;
}

$catalogId = (int) $data['catalog_id'];

// --- Optionale Transaktion starten ---
$conn->begin_transaction();

try {
    // Nur den Eintrag in QuestionCatalog löschen
    // Durch ON DELETE CASCADE werden alle abhängigen Datensätze
    // (Questions, AnswerOptions, Ratings, usw.) automatisch gelöscht.
    $sql = "DELETE FROM QuestionCatalog WHERE catalog_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $catalogId);
    $stmt->execute();

    // Wenn es keinen Fehler gab, committen wir
    $conn->commit();

    echo json_encode([
        'status' => 'ok',
        'message' => 'Quiz erfolgreich gelöscht (ON DELETE CASCADE).'
    ]);

} catch (Exception $e) {
    // Falls etwas schiefgeht, rollen wir zurück
    $conn->rollback();

    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Löschen des Quiz: ' . $e->getMessage()
    ]);
}
?>