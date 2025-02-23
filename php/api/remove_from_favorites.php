<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

session_start();
require_once '../db/db.php';

function sendResponse($status, $message)
{
    echo json_encode(['status' => $status, 'message' => $message]);
    exit;
}

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    sendResponse('error', 'Nicht eingeloggt.');
}

$userId = $_SESSION['user_id'];

// Read JSON data from the request
if ($_SERVER['CONTENT_TYPE'] !== 'application/json') {
    sendResponse('error', 'Ungültiger Content-Type.');
}

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

$catalogId = isset($data['catalog_id']) ? (int) $data['catalog_id'] : 0;

// Validate catalog ID
if ($catalogId < 1) {
    sendResponse('error', 'Ungültiger Fragenkatalog.');
}

// Remove from favorites
$sql = "DELETE FROM FavoriteQuiz WHERE user_id = ? AND catalog_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $userId, $catalogId);
$stmt->execute();

if ($stmt->error) {
    error_log('SQL Error: ' . $stmt->error);
    sendResponse('error', 'Fehler beim Entfernen: ' . $stmt->error);
}

if ($stmt->affected_rows === 0) {
    sendResponse('error', 'Fragenkatalog nicht in den Favoriten gefunden.');
}

sendResponse('ok', 'Fragenkatalog erfolgreich entfernt.');
