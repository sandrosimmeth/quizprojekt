<?php

/*
 * Liefert alle Quizzes, die es gibt
 * eventuell müssen wir das mal beschränken
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once '../db/db.php';
// 1) Session starten, um zu erfahren, welcher User eingeloggt ist
session_start();

// 2) Prüfen, ob User eingeloggt ist
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nicht eingeloggt.'
    ]);
    exit;
}

// Eingeloggte user_id
$userId = (int) $_SESSION['user_id'];

// 3) Nur Quizzes zurückholen, die dieser User selbst erstellt hat
/*$sql = "SELECT catalog_id, name 
        FROM QuestionCatalog
        WHERE created_by_user_id = ?";*/

$sql = "SELECT 
        qc.catalog_id, 
        qc.name, 
        r.rating_value AS avg_rating,
        tq.total_questions,
        ca.correct_answers,
        u.username AS creator_username,  -- Username des Erstellers
        u.user_id AS creator_id,  -- UserID des Erstellers
        m.name AS module_name,           -- Name des Moduls
        sp.name AS study_program_name,    -- Name des Studiengangs
        sp.study_program_id AS study_program_id  -- ID des Studiengangs
        FROM 
        QuestionCatalog qc
        LEFT JOIN 
        Rating r ON r.catalog_id = qc.catalog_id
        LEFT JOIN 
        User u ON u.user_id = qc.created_by_user_id
        LEFT JOIN 
        Module m ON m.module_id = qc.module_id           -- Verbinde direkt über das Modul
        LEFT JOIN 
        StudyProgram sp ON sp.study_program_id = m.study_program_id  -- Hole den Studiengang über das Modul
        LEFT JOIN 
        (
          SELECT catalog_id, COUNT(*) AS total_questions
          FROM Question 
          GROUP BY catalog_id
        ) AS tq ON tq.catalog_id = qc.catalog_id
        LEFT JOIN 
        (
          SELECT q.catalog_id, COUNT(*) AS correct_answers
          FROM UserAnswerLog ual
          JOIN Question q ON ual.question_id = q.question_id
          WHERE ual.user_id = $userId
          GROUP BY q.catalog_id
        ) AS ca ON ca.catalog_id = qc.catalog_id";




$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Laden der Quizzes.'
    ]);
    exit;
}

// Alles in ein Array packen
$quizzes = [];
while ($row = $result->fetch_assoc()) {
    $quizzes[] = $row;
}

// JSON-Ausgabe
echo json_encode([
    'status' => 'ok',
    'quizzes' => $quizzes
]);
