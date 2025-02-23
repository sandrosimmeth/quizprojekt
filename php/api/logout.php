<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
session_start();
session_destroy(); // Alle Session-Daten löschen
echo json_encode(["message" => session_status()]); // überprüfen ob die Sesion wirklich beendet wurde

exit;
