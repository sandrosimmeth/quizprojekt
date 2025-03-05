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

$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);
if (!$data) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Ungültige JSON-Daten.'
    ]);
    exit;
}

$questionId = $data['question_id'];
$description = $data['description'];

$sqlReport = "INSERT INTO ReportedQuestion (question_id, reported_by_user_id, report_reason)
                  VALUES (?,?,?)";
$stmtRep = $conn->prepare($sqlReport);
$stmtRep->bind_param("iis", $questionId, $userId, $description);
if ($stmtRep->execute()) {
    echo json_encode([
        'status' => 'ok',
        'message' => 'Meldung gespeichert.'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Speichern in der Datenbank.'
    ]);
}
exit;

