# Quizify

Dies ist eine Webanwendung für das Erstellen und Spielen von Quizzes. Sie enthält sowohl ein Frontend (React) als auch ein Backend (PHP), das mit einer MySQL-Datenbank verbunden ist. Hier wird beschrieben, wie man die Entwicklungsumgebung für dieses Projekt. Außerdem gibt es eine kurze Übersichüber die Ordnerstruktur und den enthaltenen Dateien.

## Voraussetzungen

Bevor du das Projekt lokal auf deinem Computer einrichtest, stelle sicher, dass du die folgenden Programme installiert hast:

- **Node.js** (mit npm): [Installationsanleitung für Node.js](https://nodejs.org/)
- **PHP** (mindestens Version 7.4): [Installationsanleitung für PHP](https://www.php.net/)
- **MySQL** (für die Datenbank): [Installationsanleitung für MySQL](https://dev.mysql.com/downloads/)
- **Vite** (als Entwicklungsserver): Wird automatisch durch npm-Startskripte installiert.

Empfohlen: Installiere **XAMPP** und starte den **Apache-Webserver** und die **MySQL DB**

## Ordnerstruktur

```
.
├── .env # Enthält die Umgebungsvariable für den Pfad zur API
├── .gitignore # Listet Dateien und Ordner auf, die von Git ignoriert werden sollen (z.B. node_modules)
├── eslint.config.js # Konfiguriert die ESLint-Regeln für das Projekt (Code-Qualitätsprüfungen)
├── index.html # Die Haupt-HTML-Datei, die das Frontend der Anwendung lädt
├── package-lock.json # Sichert die genaue Version der installierten Abhängigkeiten
├── package.json # Listet die Projektabhängigkeiten und Skripte für npm
├── README.md # Dokumentation des Projekts (Beschreibung, Installationsanweisungen, etc.)
├── vite.config.js # Konfiguriert Vite, einen Build-Tool und Entwicklungsserver
├── php # Ordner für PHP-Dateien, die serverseitige Logik abwickeln
│ ├── api # Ordner für API-Endpunkte
│ │ ├── add_to_favorites.php # Fügt ein Quiz zu den Favoriten des Benutzers hinzu
│ │ ├── check_report.php # Markiert eine eingereichte Meldung über eine Frage als erledigt
│ │ ├── create_quiz.php # Erstellt ein neues Quiz
│ │ ├── delete_quiz.php # Löscht ein Quiz
│ │ ├── dismiss_report.php # Verwirft einen eingereichte Meldung über eine Frage
│ │ ├── get_all_quizzes.php # Gibt ein Objekt aller Quizzes zurück
│ │ ├── get_favorites.php # Ruft alle Favoriten eines Benutzers ab
│ │ ├── get_module.php # Ruft alle Studienmodule ab
│ │ ├── get_points.php # Ruft die Punktzahl des Benutzers ab
│ │ ├── get_quiz.php # Ruft ein bestimmtes Quiz mit allen Fragen und Antworten ab
│ │ ├── get_reported_questions.php # Gibt eine Liste gemeldeter Fragen, welche vom aktuellen User erstellt wurden, zurück
│ │ ├── get_study_program.php # Gibt den Studiengang des Benutzers zurück
│ │ ├── leaderboard.php # Gibt die Rangliste zurück
│ │ ├── login_process.php # Verarbeitet den Login des Benutzers
│ │ ├── logout.php # Meldet den Benutzer ab
│ │ ├── play.php # Ruft das zu spielende Quiz für den Benutzer ab (10 Fragen randomised bevorzugt unbeantwortete)
│ │ ├── rate_quiz.php # Speichert Rating eines Nutzers zu einem Quiz
│ │ ├── remove_from_favorites.php # Entfernt ein Quiz aus den Favoriten des Benutzers
│ │ ├── report_question.php # Meldet eine Frage als problematisch mit Erklärungstext
│ │ ├── update_progress.php # Aktualisiert den Fortschritt des Benutzers im Quiz und Punkte
│ │ ├── update_quiz.php # Aktualisiert die Informationen eines bestehenden Quizzes
│ └── db # Ordner für Datenbank-Dateien
│ ├── db.php # Stellt eine Verbindung zur Datenbank her
│ ├── db_441271_1.sql # SQL-Datei, die die Datenbankstruktur enthält
├── src # Ordner für den Frontend-Code (React-Komponenten und Seiten)
│ ├── App.css # Globale CSS-Stile für die Anwendung
│ ├── App.jsx # Die Haupt-React-Komponente, die die App strukturiert
│ ├── index.css # Zusätzliche globale CSS-Stile für die Anwendung
│ ├── main.jsx # Der Einstiegspunkt für die React-App (rendern der App-Komponente)
│ ├── assets # Ordner für statische Dateien wie Bilder und SVGs
│ │ └── logo_quiz.svg # Das SVG-Logo der Anwendung
│ ├── components # Ordner für wiederverwendbare React-Komponenten
│ │ ├── CreateQuizStep1.jsx # Komponente für den ersten Schritt beim Erstellen eines Quizzes
│ │ ├── CreateQuizStep2.jsx # Komponente für den zweiten Schritt beim Erstellen eines Quizzes
│ │ ├── CreateQuizStep3.jsx # Komponente für den dritten Schritt beim Erstellen eines Quizzes
│ │ ├── DisplayQuizzes.jsx # Komponente zu Anzeige der Quizzes auf dem Dashboard
│ │ ├── EditQuestion.jsx # Ermöglicht das Bearbeiten einer bestehenden Frage
│ │ ├── Header.jsx # Header-Komponente, die die Navigationsleiste enthält
│ │ ├── Leaderboard.jsx # Zeigt die Rangliste an
│ │ ├── Logout.jsx # Logout Komponente
│ │ ├── ProtectedRoute.jsx # Schützt bestimmte Routen, die nur für eingeloggte Benutzer zugänglich sind
│ │ ├── Rate.jsx # Ermöglicht dem Benutzer, ein Quiz zu bewerten
│ │ └── Report.jsx # Ermöglicht dem Benutzer, eine Frage zu melden
│ └── pages # Ordner für die einzelnen Seiten der Anwendung
│ ├── About.jsx # Zeigt die "Über uns"-Seite an
│ ├── Create.jsx # Zeigt die Seite zum Erstellen eines neuen Quizzes an
│ ├── Dashboard.jsx # Zeigt das Dashboard mit benutzerspezifischen Daten an
│ ├── Edit.jsx # Zeigt die Seite zum Bearbeiten eines bestehenden Quizzes an
│ ├── Faq.jsx # Zeigt eine FAQ-Seite mit häufig gestellten Fragen
│ ├── Impressum.jsx # Zeigt rechtliche Informationen (Impressum) an
│ ├── Login.jsx # Zeigt das Login-Formular an
│ ├── Play.jsx # Zeigt das Quiz-Spiel für den Benutzer an
│ ├── ReportedQuestions.jsx # Zeigt eine Liste gemeldeter Fragen des Nutzers an
```

## Schritte zum Aufsetzen der Entwicklungsumgebung

1. **Repository klonen:** Klone das Repo auf deinen lokalen Rechner
2. **Backend einrichten:** Verschiebe den Ordner **php** oder den gesamten Ordner **quizprojekt** nach **xampp/htdocs**
3. **Installiere Dependencies:** Öffne den Ordner **quizprojekt** in deiner IDE und führe **npm install aus**, dies installiert automatisch alle Dependencies
4. **API-Pfad anpassen:** Im Ordner **quizprojekt** in der Datei **.env** den Pfad zu den API-Endpunkten angeben (für dev server mit xampp: "http://localhost/quizprojekt/php/api")
5. **Datenbank anlegen:** Lege die Entwicklungs-DB **db_441271_1.sql** im Ordner **php/db/** ist, in deiner lokalen Datenbank an (bei XAMPP unter "http://localhost/phpmyadmin/")
6. **Entwicklungsserver starten:** Mit dem Befehl **npm run dev** startet der Entwicklungsserver
