<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

session_start();
require_once '../db/db.php';

// Wir lesen die Rohdaten aus dem Request-Body.
$inputJSON = file_get_contents('php://input');

// Wir decodieren diese JSON-Daten in ein PHP-Array bzw. Objekt.
$data = json_decode($inputJSON, true);
// Falls json_decode fehlgeschlagen ist (z. B. ungültiges JSON), brich ab und sende eine Fehlermeldung.
if (!$data) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Ungültige JSON-Daten.'
    ]);
    exit; // Skript wird hier beendet.
}

// 1) Prüfen, ob eine catalog_id übergeben wurde
if (!$data['catalog_id']) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Keine catalog_id übergeben.'
    ]);
    exit;
}

$catalogId = (int) $data['catalog_id'];

// 2) Optional: Parameter skipAnswered, damit wir Fragen ausschließen, 
//    die der User bereits korrekt beantwortet hat (z.B. in irgendeiner Session).
//    Du kannst es anpassen, wenn du nur "in der aktuellen Session" filtern willst.
$skipAnswered = isset($_GET['skipAnswered']) ? (int) $_GET['skipAnswered'] : 0;

// 3) user_id aus Session (vorausgesetzt, der User ist eingeloggt)
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nicht eingeloggt.'
    ]);
    exit;
}
$userId = (int) $_SESSION['user_id'];

// 4) Quiz-Metadaten laden
$sqlQuiz = "
    SELECT 
        Qc.catalog_id,
        Qc.name AS quiz_name,
        Qc.module_id
    FROM QuestionCatalog Qc
    WHERE Qc.catalog_id = ?
";
$stmtQuiz = $conn->prepare($sqlQuiz);
$stmtQuiz->bind_param("i", $catalogId);
$stmtQuiz->execute();
$resultQuiz = $stmtQuiz->get_result();

if (!$resultQuiz || $resultQuiz->num_rows === 0) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Kein Quiz gefunden.'
    ]);
    exit;
}
$quizRow = $resultQuiz->fetch_assoc();

// 5) Fragen laden, ggf. gefiltert nach bereits korrekt beantworteten
$sqlQuestions = "
    SELECT 
        question_id,
        text,
        explanation_text
    FROM Question
    WHERE catalog_id = ?
";


$stmtQ = $conn->prepare($sqlQuestions);
$stmtQ->bind_param("i", $catalogId);
$stmtQ->execute();
$resultQ = $stmtQ->get_result();

$questions = [];
while ($rowQ = $resultQ->fetch_assoc()) {
    $questionId = $rowQ['question_id'];

    // 5.a) Antwortoptionen zur aktuellen Frage laden
    $sqlAnswers = "
        SELECT
            answer_option_id,
            text,
            is_correct
        FROM AnswerOption
        WHERE question_id = ?
    ";
    $stmtA = $conn->prepare($sqlAnswers);
    $stmtA->bind_param("i", $questionId);
    $stmtA->execute();
    $resA = $stmtA->get_result();

    $answers = [];
    while ($rowA = $resA->fetch_assoc()) {
        $answers[] = [
            'answer_option_id' => (int) $rowA['answer_option_id'],
            'text' => $rowA['text'],
            'is_correct' => (int) $rowA['is_correct']
        ];
    }

    $questions[] = [
        'question_id' => (int) $questionId,
        'text' => $rowQ['text'],
        'explanation_text' => $rowQ['explanation_text'],
        'answers' => $answers
    ];
}

// 6) JSON-Antwort ausgeben
echo json_encode([
    'status' => 'ok',
    'quiz' => [
        'catalog_id' => (int) $quizRow['catalog_id'],
        'quiz_name' => $quizRow['quiz_name'],
        'module_id' => (int) $quizRow['module_id'],
        'questions' => $questions
    ]
]);