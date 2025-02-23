<?php
// ***************************************
// update_quiz.php
// Aktualisiert ein bestehendes Quiz und behält vorhandene question_ids
// ***************************************

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once '../db/db.php';

// 1) Session starten, um zu erfahren, welcher User eingeloggt ist
session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nicht eingeloggt.'
    ]);
    exit;
}

// 2) JSON-Daten aus dem Request lesen
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);
$data = $data['quizData'];
if (!$data) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Ungültige JSON-Daten.'
    ]);
    exit;
}

// Erwartete Felder im JSON
$catalogId = $data['catalog_id'];
$moduleId = $data['module_id'];
$quizName = $data['quiz_name'];
$questions = $data['questions'] ?? [];

// *** Transaktion starten (optional, aber empfohlen) ***
$conn->begin_transaction();

try {
    // 3) QuestionCatalog updaten
    $sqlUpdateCatalog = "UPDATE QuestionCatalog SET name = ?, module_id = ? WHERE catalog_id = ?";
    $stmtCat = $conn->prepare($sqlUpdateCatalog);
    $stmtCat->bind_param("sii", $quizName, $moduleId, $catalogId);
    if (!$stmtCat->execute()) {
        throw new Exception("Fehler beim Update des QuestionCatalog: " . $stmtCat->error);
    }
    $stmtCat->close();

    // 4) Bestehende Frage-IDs abrufen
    $sqlExisting = "SELECT question_id FROM Question WHERE catalog_id = ?";
    $stmtExisting = $conn->prepare($sqlExisting);
    $stmtExisting->bind_param("i", $catalogId);
    if (!$stmtExisting->execute()) {
        throw new Exception("Fehler beim Abrufen der bestehenden Fragen: " . $stmtExisting->error);
    }
    $result = $stmtExisting->get_result();
    $existingQuestionIds = [];
    while ($row = $result->fetch_assoc()) {
        $existingQuestionIds[] = $row['question_id'];
    }
    $stmtExisting->close();

    $updatedQuestionIds = [];

    // 5) Fragen verarbeiten: update existierende Fragen oder insert neue Fragen
    foreach ($questions as $q) {
        // Falls ein question_id vorhanden ist und in der Datenbank existiert, dann updaten
        if (!empty($q['question_id']) && in_array($q['question_id'], $existingQuestionIds)) {
            $questionId = $q['question_id'];
            $sqlUpdateQ = "UPDATE Question SET text = ?, explanation_text = ? WHERE question_id = ?";
            $stmtUpdate = $conn->prepare($sqlUpdateQ);
            $stmtUpdate->bind_param("ssi", $q['text'], $q['explanation_text'], $questionId);
            if (!$stmtUpdate->execute()) {
                throw new Exception("Fehler beim Aktualisieren der Frage: " . $stmtUpdate->error);
            }
            $stmtUpdate->close();
            $updatedQuestionIds[] = $questionId;

            // Alte Antworten löschen, um sie neu einzufügen
            $sqlDelAnswers = "DELETE FROM AnswerOption WHERE question_id = ?";
            $stmtDelAnswers = $conn->prepare($sqlDelAnswers);
            $stmtDelAnswers->bind_param("i", $questionId);
            if (!$stmtDelAnswers->execute()) {
                throw new Exception("Fehler beim Löschen alter Antworten: " . $stmtDelAnswers->error);
            }
            $stmtDelAnswers->close();
        } else {
            // Wenn keine question_id vorhanden ist, neue Frage einfügen
            $sqlInsertQ = "INSERT INTO Question (catalog_id, text, explanation_text) VALUES (?, ?, ?)";
            $stmtInsert = $conn->prepare($sqlInsertQ);
            $stmtInsert->bind_param("iss", $catalogId, $q['text'], $q['explanation_text']);
            if (!$stmtInsert->execute()) {
                throw new Exception("Fehler beim Anlegen einer neuen Frage: " . $stmtInsert->error);
            }
            $questionId = $conn->insert_id;
            $stmtInsert->close();
            $updatedQuestionIds[] = $questionId;
        }

        // 6) Antworten der Frage einfügen
        foreach ($q['answers'] as $ans) {
            $answerText = $ans['text'] ?? '';
            $isCorrect = !empty($ans['is_correct']) ? 1 : 0;
            $sqlInsertA = "INSERT INTO AnswerOption (question_id, text, is_correct) VALUES (?, ?, ?)";
            $stmtInsertA = $conn->prepare($sqlInsertA);
            $stmtInsertA->bind_param("isi", $questionId, $answerText, $isCorrect);
            if (!$stmtInsertA->execute()) {
                throw new Exception("Fehler beim Anlegen einer neuen Antwort: " . $stmtInsertA->error);
            }
            $stmtInsertA->close();
        }
    }

    // 7) Lösche Fragen (und deren Antworten), die nicht im aktualisierten Datensatz vorhanden sind
    $questionsToDelete = array_diff($existingQuestionIds, $updatedQuestionIds);
    foreach ($questionsToDelete as $qId) {
        // Antworten löschen
        $sqlDelA = "DELETE FROM AnswerOption WHERE question_id = ?";
        $stmtDelA = $conn->prepare($sqlDelA);
        $stmtDelA->bind_param("i", $qId);
        if (!$stmtDelA->execute()) {
            throw new Exception("Fehler beim Löschen der Antworten für Frage $qId: " . $stmtDelA->error);
        }
        $stmtDelA->close();

        // Frage löschen
        $sqlDelQ = "DELETE FROM Question WHERE question_id = ?";
        $stmtDelQ = $conn->prepare($sqlDelQ);
        $stmtDelQ->bind_param("i", $qId);
        if (!$stmtDelQ->execute()) {
            throw new Exception("Fehler beim Löschen der Frage $qId: " . $stmtDelQ->error);
        }
        $stmtDelQ->close();
    }

    // 8) Transaktion abschließen
    $conn->commit();

    echo json_encode([
        'status' => 'ok',
        'message' => 'Quiz erfolgreich aktualisiert.'
    ]);

} catch (Exception $e) {
    // Bei Fehlern: Rollback
    $conn->rollback();
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}