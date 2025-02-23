<?php
/**
 * login_process.php
 *
 * Diese Datei verarbeitet die Login-Daten, die vom Benutzer
 * über das Formular (z. B. login.php) gesendet werden.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
// Session starten, damit wir nach erfolgreichem Login Session-Variablen setzen können.
session_set_cookie_params([
    'lifetime' => 86400,       // Lebensdauer des Cookies in Sekunden (hier 1 Tag)
    'path' => '/',        // Gültiger Pfad (z.B. für die gesamte Domain)
    'domain' => 'localhost', // Gültige Domain 
    'secure' => false,       // Cookie nur über HTTPS übertragen (bei http: false setzen)
    'httponly' => true,       // Cookie ist nicht über JavaScript zugänglich
    'samesite' => 'Lax'       // 'Lax', 'Strict' oder 'None' (bei 'None' muss secure true sein)
]);
session_start();
// Einbinden der Datei, die die Datenbankverbindung ($conn) bereitstellt.
require_once '../db/db.php';

/**
 * Die Nutzereingaben (Benutzername und Passwort) werden aus dem $_POST-Array gelesen.
 * Diese werden im Login-Formular (z. B. in login.php) über ein POST-Request gesendet.
 */
$data = json_decode(file_get_contents("php://input"), true); //Dekodierte Daten aus den Input feldern
$username = $data['username'];
$password = $data['password'];
/**
 * Nun wollen wir überprüfen, ob es in der Datenbank einen User gibt,
 * dessen 'username' mit der Eingabe übereinstimmt.
 * Wir haben in der User-Tabelle Felder wie user_id und password_hash.
 */
if ($username != "" and $password != "") {
    $sql = "SELECT user_id, password_hash FROM User WHERE username = ?";
    /**
     * Wir verwenden ein Prepared Statement, um SQL-Injection zu vermeiden.
     * Das Fragezeichen (?) in $sql wird weiter unten mit dem eigentlichen Wert gefüllt.
     */
    $stmt = $conn->prepare($sql);
    /**
     * Hier wird das Prepared Statement "gebunden":
     * "s" bedeutet, wir binden einen String (username) an das Fragezeichen (?).
     */
    $stmt->bind_param("s", $username);
    /**
     * Jetzt wird das Statement ausgeführt und die Ergebnisse (wenn vorhanden) aus der DB abgerufen.
     */
    $stmt->execute();
    /**
     * get_result() gibt uns das Ergebnisobjekt zurück, in dem wir nach Datensätzen suchen können.
     */
    $result = $stmt->get_result();
    /**
     * Wir prüfen, ob mindestens eine Zeile gefunden wurde (d. h. ob der Benutzername existiert).
     * Wenn ja, holen wir uns den Datensatz in $row.
     */
    if ($result->num_rows > 0) {
        // Ein Benutzer mit diesem Benutzernamen wurde gefunden

        // Datensatz als assoziatives Array abrufen: ['user_id' => ..., 'password_hash' => ...]
        $row = $result->fetch_assoc();  //Nachrichtenvariable für die Meldung beim Login
        /**
         * Jetzt vergleichen wir das eingegebene Passwort ($password) mit dem in der DB
         * gespeicherten Passwort-Hash ($row['password_hash']).
         * Die Funktion password_verify() kümmert sich um den sicheren Vergleich des
         * Klartext-Passworts mit dem Hash.
         */
        if (password_verify($password, $row['password_hash'])) {
            // Passwort korrekt
            // Wir speichern die user_id und den Benutzernamen in der Session,
            // damit wir auf anderen Seiten erkennen können, dass der Benutzer eingeloggt ist.
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['username'] = $username;
            // Anschließend leiten wir den Benutzer zu einer anderen Seite weiter,
            // z.B. einem Dashboard, das nur für eingeloggte User zugänglich ist.
            echo json_encode([
                "message" => "Login erfolgreich, du wirst jetzt weitergeleitet!",
                "success" => 1,
                "user_id" => $_SESSION['user_id'],
                "username" => $username,
                "session_id" => session_id(),
                "session_vars" => $_SESSION,
                "cookies" => $_COOKIE,
            ]);
            exit; // WICHTIG: Script hier beenden, damit kein weiterer Code ausgeführt wird
        } else {
            // Passwort ist falsch
            echo json_encode(value: ["message" => "Das Passwort ist nicht korrekt", "success" => 0]);
            // Wir leiten den Benutzer zurück zum Login mit einem Fehlercode, z. B. ?error=1.
            // Dort könntest du eine Fehlermeldung anzeigen ("Falsches Passwort" o. Ä.).
            //header("Location: index.html?error=1");
            exit; // Script hier beenden
        }
    } else {
        // Es gibt keinen Benutzer mit diesem Benutzernamen in der Datenbank
        echo json_encode(["message" => "Diesen Benutzernamen gibt es nicht", "success" => 0]);
        // Wir leiten zurück zum Login mit einem anderen Fehlercode (z. B. ?error=2),
        // dort könnte man "Benutzername existiert nicht" anzeigen.
        //header("Location: index.html?error=2");
        exit; // Script hier beenden
    }


}
$conn->close(); // Verbindung beenden? --Sandro
