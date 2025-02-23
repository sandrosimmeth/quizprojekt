<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once '../db/db.php';
session_start();


/**
 * -------------------------------------------------
 * Hilfsfunktionen (Punkte laden & updaten)
 * -------------------------------------------------
 */
function getUserPoints($conn, $userId)
{
    $sql = "SELECT points FROM User WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($row = $res->fetch_assoc()) {
        return (int) $row['points'];
    }
    return 0;
}

function updateUserPoints($conn, $userId, $newPoints)
{
    $sql = "UPDATE User SET points = ? WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $newPoints, $userId);
    $stmt->execute();
}

/**
 * -------------------------------------------------
 * Prüfen, ob User eingeloggt ist
 * -------------------------------------------------
 */
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nicht eingeloggt.'
    ]);
    exit;
}
$userId = $_SESSION['user_id'];


/**
 * -------------------------------------------------
 * Request-Daten einlesen (action)
 * -------------------------------------------------
 */
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

// Prüfen ob die Daten verarbeitet werden können
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

// Fragen, die der Nutzer noch nie korrekt beantwortet hat
// Optimiert: LIMIT 10, da wir in keinem Fall hier mehr als 10 Fragen brauchen -Sandro
$sqlNewQuestions = "SELECT q.question_id
                FROM Question q
                WHERE q.catalog_id = ?
                AND q.question_id NOT IN (
                SELECT question_id
                FROM UserAnswerLog
                WHERE user_id = ?)
                LIMIT 10";

$stmtQuestions = $conn->prepare($sqlNewQuestions);
$stmtQuestions->bind_param("ii", $catalogId, $userId);
$stmtQuestions->execute();

$resQuestions = $stmtQuestions->get_result();
$qQuestions = [];
while ($row = $resQuestions->fetch_assoc()) {
    $qQuestions[] = $row['question_id'];
}
$numQuestions = count($qQuestions);

//Optimiert: Das hier nur ausführen, wenn es weniger als 10 nicht korekt gelöste Fragen gibt --Sandro
if ($numQuestions < 10) {
    // Fragen, die schon einmal korrekt beantwortet wurden
    // Denn wir müssen das Quiz auffüllen
    $sqlAnswered = "SELECT q.question_id 
                    FROM Question q
                    WHERE q.catalog_id = ? 
                    AND q.question_id IN (
                        SELECT question_id
                        FROM UserAnswerLog
                        WHERE user_id = ?
                    )";

    $stmtAnswered = $conn->prepare($sqlAnswered);
    $stmtAnswered->bind_param("ii", $catalogId, $userId);
    $stmtAnswered->execute();
    $resAnswered = $stmtAnswered->get_result();
    $qAnswered = [];
    while ($row = $resAnswered->fetch_assoc()) {
        $qAnswered[] = $row['question_id'];
    }
}

// 5) Zusammenstellung
$questionsToPlay = [];
$message = '';

if ($numQuestions >= 10) {
    // Fall B: Mindestens 10 offene/falsche Fragen -> nimm davon 10 random
    // Optimiert: Kein slice notwendig, da hier ohnehin nur 10 Fragen drinnnen sind
    $questionsToPlay = $qQuestions;
    $message = "Quiz mit 10 offenen/falschen Fragen gestartet. Viel Erfolg!";
} else {
    // Fall C: 0 < numQuestions < 10
    $QuestionsedToFill = 10 - $numQuestions;
    $questionsToPlay = $qQuestions;
    $takeFromAnswered = array_slice($qAnswered, 0, $QuestionsedToFill);
    $questionsToPlay = array_merge($questionsToPlay, $takeFromAnswered);
    $stillMissing = 10 - count($questionsToPlay);

    if ($stillMissing > 0) {
        $alreadyUsed = $questionsToPlay;
        $remainingPool = array_diff($qAnswered, $alreadyUsed);
        $fill = array_slice($remainingPool, 0, $stillMissing);
        $questionsToPlay = array_merge($questionsToPlay, $fill);
    }

    if (count($questionsToPlay) < 10) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Es konnten nicht genügend Fragen gefunden werden.'
        ]);
        exit;
    }
    $message = "Quiz gestartet: $numQuestions offene/falsche Fragen + $QuestionsedToFill aus deinem bereits gemeisterten Pool.";
}

// 7) Aktuelle Punkte
$points = getUserPoints($conn, $userId);

// $questionsToPlay: Hier befinden sich die questions_id's der zu spieldenden Fragen für ein Quiz
// $message: Informiert den Nutzer über die Zusammenstellung der Fragen


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
// Erzeuge so viele Platzhalter wie Elemente im Array vorhanden sind
$placeholders = implode(',', array_fill(0, count($questionsToPlay), '?'));

// Erstelle die SQL-Abfrage mit den Platzhaltern
$sqlQuestions = "SELECT question_id, text, explanation_text
                 FROM Question
                 WHERE catalog_id = ? 
                 AND question_id IN ($placeholders)";
//355,361,364,353,354,355,357
// Bereite die Abfrage vor
$stmt = $conn->prepare($sqlQuestions);

// Kombiniere den Katalog-ID-Parameter mit dem Array
$params = array_merge([$catalogId], $questionsToPlay);

// Erstelle den Typen-String. Hier wird angenommen, dass alle Parameter Integer sind.
$types = str_repeat('i', count($params));

// Binde die Parameter. (Achte darauf, dass ab PHP 5.6 der Spread-Operator unterstützt wird)
$stmt->bind_param($types, ...$params);

// Führe die Abfrage aus
$stmt->execute();
$resultQ = $stmt->get_result();


$questions = [];
while ($rowQ = $resultQ->fetch_assoc()) {
    $questionId = $rowQ['question_id'];

    // Antwortoptionen zur aktuellen Frage laden
    $sqlAnswers = " SELECT
                    text,
                    is_correct
                    FROM AnswerOption
                    WHERE question_id = ?";

    $stmtA = $conn->prepare($sqlAnswers);
    $stmtA->bind_param("i", $questionId);
    $stmtA->execute();
    $resA = $stmtA->get_result();

    $answers = [];
    while ($rowA = $resA->fetch_assoc()) {
        $answers[] = [
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

// Den Array, der am Ende ausgegeben wird shufflen
// Fragenreihenfolge randomisieren
shuffle($questions);

// Für jede Frage ebenfalls die Reihenfolge der Antworten randomieren
foreach ($questions as &$question) {
    shuffle($question['answers']);
}

//JSON-Antwort ausgeben
echo json_encode([
    'status' => 'ok',
    'message' => $message,
    'userPoints' => $points,
    'quiz' => [
        'catalog_id' => (int) $quizRow['catalog_id'],
        'quiz_name' => $quizRow['quiz_name'],
        'module_id' => (int) $quizRow['module_id'],
        'questions' => $questions
    ]
]);
