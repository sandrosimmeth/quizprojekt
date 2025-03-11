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

// Wir lesen die Rohdaten aus dem Request-Body falls eine catalog_id übergeben wurde
$inputJSON = file_get_contents('php://input');

// Wir decodieren diese JSON-Daten in ein PHP-Array bzw. Objekt.
if (!empty($inputJSON)) {
    $data = json_decode($inputJSON, true);

    // Ensure decoding was successful and catalog_id exists
    if (json_last_error() === JSON_ERROR_NONE && isset($data['catalog_id'])) {
        $catalogId = $data['catalog_id'];
    }
}
/**
 * Ziel:
 * - Alle gemeldeten Fragen laden, die zu Katalogen des aktuellen Users gehören
 *   (d. h. QuestionCatalog.created_by_user_id = $userId).
 *
 * Wir benötigen:
 *  - question_id
 *  - fragentext
 *  - meldung (report_reason)
 *  - meldender Nutzer (Username)
 *  - meldedatum (date_reported)
 */
$sql = "
    SELECT 
        r.report_id,
        r.date_reported,
        r.report_reason,
        r.done,
        r.dismissed,
        q.question_id,
        q.text AS question_text,
        u.username AS reporter_username,
        qc.name AS catalog_name,
        qc.catalog_id AS catalog_id
    FROM ReportedQuestion r
    INNER JOIN Question q 
        ON r.question_id = q.question_id
    INNER JOIN QuestionCatalog qc
        ON q.catalog_id = qc.catalog_id
    INNER JOIN User u
        ON r.reported_by_user_id = u.user_id
    WHERE qc.created_by_user_id = ?
";
$params = [$userId];
$types = "i"; // "i" = integer for userId
if (!empty($data['catalog_id']) && is_numeric($data['catalog_id'])) {
    $sql .= " AND qc.catalog_id = ?";
    $params[] = $data['catalog_id'];
    $types .= "i"; // "i" = integer for catalog_id
}

$sql .= " ORDER BY 
            CASE
            WHEN done = 1 THEN 2 
            WHEN dismissed = 1 THEN 3  
            ELSE 1
            END, r.date_reported DESC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Vorbereiten der SQL-Abfrage: ' . $conn->error
    ]);
    exit;
}

$stmt->bind_param($types, ...$params);
if (!$stmt->execute()) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Ausführen der Abfrage: ' . $stmt->error
    ]);
    exit;
}
$result = $stmt->get_result();
// Daten in ein Array packen
$reportedQuestions = [];
while ($row = $result->fetch_assoc()) {
    $reportedQuestions[] = [
        'report_id' => $row['report_id'],
        'question_id' => $row['question_id'],
        'catalog_id' => $row['catalog_id'],
        'catalog_name' => $row['catalog_name'],
        'question_text' => $row['question_text'],
        'report_reason' => $row['report_reason'],
        'reporter' => $row['reporter_username'],
        'date_reported' => $row['date_reported'],
        'done' => $row['done'],
        'dismissed' => $row['dismissed']
    ];
}


echo json_encode([
    'status' => 'ok',
    'reported_questions' => $reportedQuestions
]);
exit;
