<?php
// ***************************************
// update_quiz.php
// Aktualisiert ein bestehendes Quiz
// ***************************************
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once '../db/db.php';
// 1) JSON-Daten aus dem Request lesen
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!$data) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Ungültige JSON-Daten.'
    ]);
    exit;
}

$points = $data['points'];
$correct_questions = $data['correctQuestion'];
$user_id = $data['user_id'];
$catalog_id = $data['catalog_id'];


// Initialisierung des Ergebnisses
$response = array(
    'status' => 'ok',
    'messages' => array(),
    'errors' => array()
);

// Update der Punkte
$sqlUpdatePoints = "UPDATE User SET points = points + ? WHERE user_id = ?";
$stmt = $conn->prepare($sqlUpdatePoints);

if (!$stmt) {
    $response['status'] = 'error';
    $response['errors'][] = "Fehler bei der Vorbereitung der SQL-Abfrage für Punkteaktualisierung: " . $conn->error;
    echo json_encode($response);
    exit;
}

$stmt->bind_param("ii", $points, $user_id);

if ($stmt->execute()) {
    $response['messages'][] = "Punkte erfolgreich aktualisiert.";
} else {
    $response['status'] = 'error';
    $response['errors'][] = "Fehler bei der Ausführung der Abfrage zur Punkteaktualisierung: " . $stmt->error;
}

$stmt->close();

// Spielhistorie speichern
$sqlHistory = "INSERT INTO QuizPlayHistory (user_id, catalog_id, score) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sqlHistory);

if (!$stmt) {
    $response['status'] = 'error';
    $response['errors'][] = "Fehler bei der Vorbereitung der SQL-Abfrage für Spielhistorie: " . $conn->error;
    echo json_encode($response);
    exit;
}

$stmt->bind_param("iii", $user_id, $catalog_id, $points);

if ($stmt->execute()) {
    $response['messages'][] = "Spielhistorie erfolgreich gespeichert.";
} else {
    $response['status'] = 'error';
    $response['errors'][] = "Fehler bei der Ausführung der Abfrage zur Spielhistorie: " . $stmt->error;
}

$stmt->close();

// Korrekte Antworten speichern
//$sqlCorrectQuestions = "INSERT INTO UserAnswerLog (user_id, question_id) VALUES (?, ?)";
$sqlCorrectQuestions = "INSERT INTO UserAnswerLog (user_id, question_id) 
                        VALUES (?, ?)
                        ON DUPLICATE KEY UPDATE date_answered = CURRENT_TIMESTAMP";
$questionCount = count($correct_questions);

$response['messages'][] = "Füge $questionCount korrekte Antworten hinzu...";

foreach ($correct_questions as $question_id) {
    $stmt = $conn->prepare($sqlCorrectQuestions);

    if (!$stmt) {
        $response['status'] = 'error';
        $response['errors'][] = "Fehler bei der Vorbereitung der SQL-Abfrage für UserAnswerLog: " . $conn->error;
        echo json_encode($response);
        exit;
    }

    $stmt->bind_param("ii", $user_id, $question_id);

    if ($stmt->execute()) {
        $response['messages'][] = "Antwort für Frage ID $question_id erfolgreich gespeichert.";
    } else {
        $response['status'] = 'error';
        $response['errors'][] = "Fehler bei der Ausführung der Abfrage zur Antwortspeicherung für Frage ID $question_id: " . $stmt->error;
    }

    $stmt->close();
}

// Endgültige Antwort zurückgeben
echo json_encode($response);
