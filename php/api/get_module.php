<?php
// ****************************
// get_module.php
// ****************************

// Der folgende Header teilt dem Client (z. B. Browser oder JavaScript) mit,
// dass die Response im JSON-Format zurückgegeben wird.
// Ohne diese Angabe könnte es bei manchen Clients zu Problemen kommen,
// die den Content-Type nicht korrekt erkennen.
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4173');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Einbinden der Datei, die unsere Datenbankverbindung ($conn) bereitstellt.
// "require_once" verhindert, dass die Datei mehrfach eingebunden wird,
// falls sie bereits woanders inkludiert wurde.
require_once '../db/db.php';

// Wir definieren die SQL-Abfrage, mit der wir alle Module aus der Tabelle "Module" auslesen.
// "SELECT module_id, name FROM Module" liest nur die beiden genannten Spalten aus,
// sodass wir nur die Daten bekommen, die wir wirklich brauchen.
$sql = "SELECT module_id, name FROM Module";

// Ausführen der Abfrage mit $conn->query($sql).
// $conn ist das mysqli-Objekt aus db.php.
// In $result werden die Ergebnisse (Datensätze) zurückgeliefert,
// sofern kein Fehler auftritt.
$result = $conn->query($sql);

// Überprüfung, ob die Abfrage erfolgreich war.
// $result enthält entweder ein gültiges Result-Objekt oder "false" bei Fehler.
if ($result) {
    // Wir bereiten ein leeres Array vor, um alle Datensätze (Module) zwischenzuspeichern.
    $modules = [];

    // "fetch_assoc()" liefert uns pro Aufruf eine assoziative Array-Darstellung einer Zeile,
    // also z. B. ["module_id" => 1, "name" => "Informatik"].
    // In der While-Schleife iterieren wir über alle Zeilen des Result-Sets,
    // bis keine weiteren Datensätze vorhanden sind.
    while ($row = $result->fetch_assoc()) {
        // Jede Zeile (jedes Modul) fügen wir nun in das $modules-Array ein.
        // Wir übergeben module_id und name als Schlüssel-Wert-Paar.
        $modules[] = [
            'module_id' => $row['module_id'],
            'name' => $row['name']
        ];
    }

    // Nachdem wir alle Datensätze in $modules gesammelt haben,
    // geben wir sie als JSON-Objekt zurück.
    // "echo json_encode()" serialisiert das Array in das JSON-Format.
    // Wir fügen außerdem ein "status: ok" hinzu, damit das Frontend weiß,
    // dass alles geklappt hat.
    echo json_encode([
        'status' => 'ok',
        'modules' => $modules
    ]);
} else {
    // Falls die Abfrage fehlgeschlagen ist (z. B. Syntaxfehler in SQL),
    // geben wir eine Fehlermeldung zurück.
    // "status: error" signalisiert dem Frontend, dass etwas schiefging.
    echo json_encode([
        'status' => 'error',
        'message' => 'Fehler beim Laden der Module.'
    ]);
}

// Ende des Skripts
?>