<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once '../db/db.php';
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => $conn->connect_error]));
}
// Prüfen, ob User eingeloggt ist
session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nicht eingeloggt.'
    ]);
    exit;
}
$user = $_SESSION['user_id'];


// User (username, points) nach Punkten absteigend sortieren
// -> optional: LIMIT 10, wenn du nur die TOP 10 willst.
$sql = "SELECT username, points, user_id
        FROM User
        WHERE is_admin <> 1
        ORDER BY points DESC";

$result = $conn->query($sql);
$users = [];
if ($result) {
    $users = []; // Ergebnisse speichern
    while ($row = $result->fetch_assoc()) {
        $users[] = [
            'user_id' => $row['user_id'],
            'username' => $row['username'],
            'points' => (int) $row['points'],
        ];
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => $conn->error
    ]);
    exit;
}
// Erfolgsantwort
echo json_encode([
    'status' => 'ok',
    'users' => $users
]);