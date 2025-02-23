<?php
// **********************************************
// create_quiz.php
// **********************************************


// Wir geben an, dass der HTTP-Response-Body im JSON-Format zurückgesendet wird.
// Das ist wichtig für Clients (z. B. dein JavaScript im Browser), um die Antwort korrekt zu interpretieren.
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
// Einbinden der Datenbank-Verbindungsdatei. "require_once" verhindert Mehrfacheinbindungen.
// In db.php wird das mysqli-Objekt $conn bereitgestellt.
session_start();
require_once '../db/db.php';

/*
 * Hier erwarten wir, dass das Frontend (per Fetch/AJAX) einen JSON-Body schickt.
 * Dieser Body soll mindestens folgende Struktur haben:
 * {
 *   "module_id": <Zahl>,
 *   "quiz_name": "<String>",
 *   "questions": [
 *       {
 *           "questionText": "...",
 *           "explanationText": "...",
 *           "answers": [
 *               { "text": "...", "isCorrect": true/false },
 *               ...
 *           ]
 *       },
 *       ...
 *   ]
 * }
 */

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

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nicht eingeloggt.'
    ]);
    exit;
}
$loggedInUserId = (int) $_SESSION['user_id'];


// Aus dem decodierten Array holen wir uns die Werte heraus, die wir benötigen.
$moduleId = $data['quizData']['module_id'];   // ID des ausgewählten Moduls
$quizName = $data['quizData']['quiz_name'];   // Name des neuen Quizzes
$questions = $data['quizData']['questions'];   // Array mit Fragen (und Antworten)

// ***************************
// 1) Neuen Eintrag in QuestionCatalog anlegen (Quiz selbst)
// ***************************

// Unser SQL-Befehl zum Anlegen eines neuen Quiz-Katalogs in der Tabelle QuestionCatalog.
// Folgende Felder werden gefüllt:
//  - name                : Der Name des Quizzes
//  - created_by_user_id  : Welcher User hat es erstellt? (Beispiel: $loggedInUserId)
//  - module_id           : Welchem Modul gehört das Quiz an?
//  - description         : Hier setzen wir für das Beispiel einen leeren String ''
$sqlCatalog = "INSERT INTO QuestionCatalog (name, created_by_user_id, module_id, description) 
               VALUES (?, ?, ?, '')";

// Mit prepare() erstellen wir ein Prepared Statement. Das verhindert SQL-Injections und
// ermöglicht uns, Platzhalter (?) sicher zu befüllen.
$stmtCatalog = $conn->prepare($sqlCatalog);

// Hier binden wir die Parameter für die Platzhalter. "sii" bedeutet:
//  - s = String
//  - i = Integer
//  - i = Integer
// Die Reihenfolge muss zu den VALUES (?,?,?) passen (für name, created_by_user_id, module_id).
$stmtCatalog->bind_param("sii", $quizName, $loggedInUserId, $moduleId);

// Ausführen des Statements.
if (!$stmtCatalog->execute()) {
    // Ist ein Fehler aufgetreten, geben wir eine JSON-Fehlermeldung zurück.
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Anlegen des Quiz-Katalogs: ' . $stmtCatalog->error
    ]);
    exit;
}

// Mit $conn->insert_id holen wir uns die zuletzt generierte Auto-Increment-ID,
// also die catalog_id des neu erstellten Datensatzes in QuestionCatalog.
$catalogId = $conn->insert_id;

// ***************************
// 2) Jede Frage durchiterieren und in die Tabelle Question eintragen
// ***************************

// Wir durchlaufen das "questions"-Array, das aus dem JSON kommt.
// Jede Frage enthält neben dem Fragetext und einer Erklärung auch ein answers-Array.
foreach ($questions as $q) {
    $questionText = $q['questionText'];     // z. B. "Was ist 2 + 2?"
    $explanationText = $q['explanationText'];  // z. B. "Eine einfache Addition."

    // Wir legen nun einen Eintrag in der "Question"-Tabelle an.
    // Die Spalten: catalog_id (Verknüpfung zum QuestionCatalog),
    // text (der eigentliche Fragetext),
    // explanation_text (sofern vorhanden).
    $sqlQuestion = "INSERT INTO Question (catalog_id, text, explanation_text) VALUES (?, ?, ?)";

    // Wieder ein Prepared Statement
    $stmtQuestion = $conn->prepare($sqlQuestion);

    // Bindet die Parameter: "iss" = Integer, String, String
    // - catalog_id: Integer
    // - text: String
    // - explanation_text: String
    $stmtQuestion->bind_param("iss", $catalogId, $questionText, $explanationText);

    // Ausführen und Fehler abfangen
    if (!$stmtQuestion->execute()) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Fehler beim Anlegen einer Frage: ' . $stmtQuestion->error
        ]);
        exit;
    }

    // Nachdem die Frage in der DB angelegt wurde, erhalten wir deren question_id
    // (Auto-Increment). Die benötigen wir für die AnswerOption-Einträge.
    $questionId = $conn->insert_id;

    // ***************************
    // 3) Zu jeder Frage die Antworten anlegen
    // ***************************
    foreach ($q['answers'] as $ans) {
        $answerText = $ans['text'];          // z. B. "4"
        // isCorrect ist ein Boolean (true/false). Die DB-Spalte 'is_correct' ist typischerweise TINYINT(1).
        // Wir wandeln also true->1 / false->0 um
        $isCorrect = $ans['isCorrect'] ? 1 : 0;

        // Erzeugen eines SQL-Statements zum Einfügen in die AnswerOption-Tabelle.
        $sqlAnswer = "INSERT INTO AnswerOption (question_id, text, is_correct) VALUES (?, ?, ?)";

        // Prepared Statement erstellen
        $stmtAnswer = $conn->prepare($sqlAnswer);

        // Bindet die Parameter: "isi" = Integer, String, Integer
        // - question_id: Integer
        // - text: String
        // - is_correct: Integer (0 oder 1)
        $stmtAnswer->bind_param("isi", $questionId, $answerText, $isCorrect);

        // Ausführen und Fehler abfangen
        if (!$stmtAnswer->execute()) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Fehler beim Anlegen einer Antwort: ' . $stmtAnswer->error
            ]);
            exit;
        }
    }
}

// ***************************
// Rückmeldung an das Frontend
// ***************************
// Wenn wir an dieser Stelle angekommen sind, hat alles geklappt:
// Der Quiz-Katalog wurde erstellt, alle Fragen und ihre Antworten wurden eingetragen.
// Wir senden ein JSON-Objekt mit einem "status: ok" und geben auch die quiz_id (catalogId) zurück.
echo json_encode([
    'status' => 'ok',
    'quiz_id' => $catalogId
]);

// Ende des Skripts
?>