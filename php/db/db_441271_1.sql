-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Feb 2025 um 10:02
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `db_441271_1`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `answeroption`
--

CREATE TABLE `answeroption` (
  `answer_option_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `is_correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `answeroption`
--

INSERT INTO `answeroption` (`answer_option_id`, `question_id`, `text`, `is_correct`) VALUES
(21, 6, 'asd', 1),
(22, 6, 'asdasdad', 0),
(23, 6, 'asdasdasdasd', 0),
(24, 6, 'asdasdasdadadsd', 0),
(25, 7, 'asdasda', 1),
(26, 7, 'dsad', 0),
(27, 7, 'asdasda', 0),
(28, 7, 'sdasdasd', 0),
(29, 8, '4', 1),
(30, 8, '3', 0),
(31, 8, '6', 0),
(32, 8, '3', 0),
(37, 10, 'tert', 1),
(38, 10, 'ertert', 0),
(39, 10, 'ertrt', 0),
(40, 10, 'erter', 0),
(41, 11, '', 1),
(42, 11, '', 0),
(43, 11, '', 0),
(44, 11, '', 0),
(45, 12, '', 1),
(46, 12, '', 0),
(47, 12, '', 0),
(48, 12, '', 0),
(49, 13, '', 1),
(50, 13, '', 0),
(51, 13, '', 0),
(52, 13, '', 0),
(53, 14, '', 1),
(54, 14, '', 0),
(55, 14, '', 0),
(56, 14, '', 0),
(57, 15, '', 1),
(58, 15, '', 0),
(59, 15, '', 0),
(60, 15, '', 0),
(61, 16, '', 1),
(62, 16, '', 0),
(63, 16, '', 0),
(64, 16, '', 0),
(65, 17, '', 1),
(66, 17, '', 0),
(67, 17, '', 0),
(68, 17, '', 0),
(69, 18, '', 1),
(70, 18, '', 0),
(71, 18, '', 0),
(72, 18, '', 0),
(73, 19, 'sdf', 1),
(74, 19, 'sdfsd', 0),
(75, 19, 'fsdf', 0),
(76, 19, 'fsdfsd', 0),
(77, 20, 'sdf', 1),
(78, 20, 'sdfsd', 0),
(79, 20, 'fsdf', 0),
(80, 20, 'fsdfsd', 0),
(125, 32, 'Eine schmackhafte Beere', 0),
(126, 32, 'Ein anderes Wort für Jinglebells', 0),
(127, 32, 'ungenießbare Beere', 0),
(128, 32, 'Kakaklumpen im Fell', 1),
(2021, 395, 'Jquery', 0),
(2022, 395, 'Svelte', 0),
(2023, 395, 'React', 1),
(2024, 395, 'PlainJS', 0),
(2025, 396, 'Neuland', 1),
(2026, 396, 'Böse', 0),
(2027, 396, 'Weltweite Vernetzung von unabhängigen Netzwerken', 0),
(2028, 396, 'Eine sehr große Festplatte, die Google gehört', 0),
(2029, 397, 'Nur mit Magie', 0),
(2030, 397, 'Mit align:center', 0),
(2031, 397, 'Es ist standardmäßig zentriert', 0),
(2032, 397, 'Über Flex-Container', 1),
(2033, 398, 'Der Entwickler von Git und Linux', 1),
(2034, 398, 'Der Bruder von Linus TechTips', 0),
(2035, 398, 'Den gibt es gar nicht', 0),
(2036, 398, 'Der Entwickler von Windows', 0),
(2037, 399, 'EDGE', 0),
(2038, 399, 'CHROME', 0),
(2039, 399, 'SAFARI', 0),
(2040, 399, 'FIREFOX', 1),
(2041, 400, 'Cascading Spread Sheet', 0),
(2042, 400, 'Casual Scream Soup', 0),
(2043, 400, 'Cascading Style Sheet', 1),
(2044, 400, 'Camel Snoke Super', 0),
(2045, 401, '4', 0),
(2046, 401, '6', 0),
(2047, 401, '8', 1),
(2048, 401, '12', 0),
(2049, 402, 'IEE 890', 0),
(2050, 402, 'IEEE 802.11', 1),
(2051, 402, 'ISO 67', 0),
(2052, 402, 'WLAN-Standard', 0),
(2053, 403, 'Wireless Access Near', 0),
(2054, 403, 'Wide Area Network', 1),
(2055, 403, 'Wide Adventure Network', 0),
(2056, 403, 'Wireless Area Network', 0),
(2057, 404, 'HyperTextTransferProtocol', 0),
(2058, 404, 'Hey to my Ladies', 1),
(2059, 404, 'falsch', 0),
(2060, 404, 'falsch', 0),
(2061, 405, 'Ein Kabel, welches dein Kumpel ist', 0),
(2062, 405, 'Ein Ethernet-Kabel', 1),
(2063, 405, 'Wird benutzt um Brücken zu stabilisieren', 0),
(2064, 405, 'Eine Band aus der Türkei', 0),
(2065, 406, 'Eine schmackhafter Snack', 0),
(2066, 406, 'Ein guter Name für einen Hund', 0),
(2067, 406, 'Gespeicherte Daten in deinem Browser', 1),
(2068, 406, 'Die perfekte Ergänzung zu einem Glas Milch', 0),
(2069, 407, 'Der Ein-und Ausschalter für das Internet', 0),
(2070, 407, 'Ein smartes gerät, welches lokal über MAC-Adressen Daten sendent', 1),
(2071, 407, 'Ein spezieller Sattel für Pferde', 0),
(2072, 407, 'Eine Super Witch', 0),
(2073, 408, 'Coverband von AC/DC', 0),
(2074, 408, 'Protokollstapel des Internets', 1),
(2075, 408, 'Gleichstrom', 0),
(2076, 408, 'Wechselstrom', 0),
(2077, 410, 'virtual private network', 1),
(2078, 410, 'Ein Kind von Elon Musk', 0),
(2079, 410, 'teures Vodafone Zusatzpaket', 0),
(2080, 410, 'ein seltenes Tier', 0),
(2081, 365, 'Anderer Name für Facebook', 0),
(2082, 365, 'Eine große Tabelle', 1),
(2083, 365, 'Sparkasse', 0),
(2084, 365, 'Sitzbank im Englischen Garten', 0),
(2085, 366, 'Malware', 0),
(2086, 366, 'Ein gutes Passwort', 0),
(2087, 366, 'Ein DBMS', 1),
(2088, 366, 'Eine Webseite', 0),
(2089, 367, 'Weil es mich ärgern will', 1),
(2090, 367, 'Weil meine Config falsch war', 0),
(2091, 367, 'Weil ich drinnen rumpfusche', 0),
(2092, 367, 'Weil Gaben sauer auf mich ist', 0),
(2093, 411, 'Datenbank', 0),
(2094, 411, 'Dingleberry', 1),
(2095, 411, 'Deutsche Bahn', 0),
(2096, 411, 'DataBase', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `favoritequiz`
--

CREATE TABLE `favoritequiz` (
  `user_id` int(11) NOT NULL,
  `catalog_id` int(11) NOT NULL,
  `date_favorited` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `favoritequiz`
--

INSERT INTO `favoritequiz` (`user_id`, `catalog_id`, `date_favorited`) VALUES
(2, 14, '2025-02-23 10:01:18'),
(2, 29, '2025-02-20 15:23:03'),
(4, 29, '2025-02-22 10:02:31'),
(4, 32, '2025-02-22 14:21:30');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `module`
--

CREATE TABLE `module` (
  `module_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by_admin_id` int(11) NOT NULL,
  `study_program_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `module`
--

INSERT INTO `module` (`module_id`, `name`, `created_by_admin_id`, `study_program_id`) VALUES
(36, 'Grundlagen der Programmierung', 1, 1),
(37, 'Datenstrukturen und Algorithmen', 1, 1),
(38, 'Software Engineering', 1, 1),
(39, 'Datenbanken', 1, 1),
(40, 'Betriebssysteme', 1, 1),
(41, 'IT-Sicherheit', 1, 1),
(42, 'Web-Technologien', 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `question`
--

CREATE TABLE `question` (
  `question_id` int(11) NOT NULL,
  `catalog_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `explanation_text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `question`
--

INSERT INTO `question` (`question_id`, `catalog_id`, `text`, `explanation_text`) VALUES
(6, 14, 'das ist ein test von admin', 'ffffffff'),
(7, 15, 'asdasd', 'asdasdasd'),
(8, 16, 'Was ist 2 + 2?', ''),
(10, 18, 'erter', ''),
(11, 19, '', ''),
(12, 20, '', ''),
(13, 21, '', ''),
(14, 22, '', ''),
(15, 23, '', ''),
(16, 24, 'x', ''),
(17, 25, 'x', ''),
(18, 26, '', ''),
(19, 27, 'sgsdf', 'sdfsdf'),
(20, 28, 'sgsdf', 'sdfsdf'),
(32, 31, 'Was ist eine Dingleberry?', 'Weils so is'),
(365, 32, 'Was ist eine relationale Datenbank?', 'Eine relationale Datenbank ist im Grunde nichts anderes als eine Menge an Tabellen, welche Beziehungen untereinander haben'),
(366, 32, 'Was ist mySQL?', 'mySQL ist eines der führenden Datenbankmanagementsysteme'),
(367, 32, 'Warum stürzt mySQL ständig ab?', 'Es will mich ärgern echt jetzt'),
(395, 29, 'Was ist das beste Frontend-Framework?', 'React ist schnell, weit verbreitet und einfach zu lernen. Svelte und PlainJS sind aber auch ok.'),
(396, 29, 'Was ist dieses Internet?', 'Das Internet verbindet kleine Teilnetzwerke miteinander und erschafft so ein großes. Aber es ist böse'),
(397, 29, 'Wie kann man ein HTML-Element zentrieren?', 'Mittlerweile geht es über flex-container, vorhor musste man schwarze Magie anwenden'),
(398, 29, 'Wer is Linus Torvalds?', 'Linus Torvalds ist der Herr und Erlöser der Coder'),
(399, 29, 'Was ist der beste Browser?', 'Da ist ein Fuchs im Namen, Besser geht nicht'),
(400, 29, 'Was ist CSS?', ''),
(401, 29, 'Wieviele Bits hat ein Byte?', ''),
(402, 29, 'Welcher Standard definiert WLAN-Netzwerke?', ''),
(403, 29, 'Was ist ein WAN?', ''),
(404, 29, 'Was ist HTML?', 'SO sagt man nun mal Hallo zu den Ladies'),
(405, 29, 'Was ist ein LAN-Kabel?', 'Das muss ich nicht erklären'),
(406, 29, 'Was ist ein Cookie?', 'Eigentlich sind alle richtig'),
(407, 29, 'Was ist ein Switch?', 'Ein Switch leitet in lokalen Netzwerken auf Basis der MAC-Adressen der Teilnehmer Datenpakete zu seinem Empfänger'),
(408, 29, 'Was ist TCP/IP?', 'TCP/IP ist eine PRotokollfamilie, welche die Kommunikation im Internet ermöglicht'),
(410, 29, 'Was ist ein VPN?', ''),
(411, 32, 'Wofür steht DB?', 'es ist die offizielle Abkürzung');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `questioncatalog`
--

CREATE TABLE `questioncatalog` (
  `catalog_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `module_id` int(11) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `questioncatalog`
--

INSERT INTO `questioncatalog` (`catalog_id`, `name`, `created_by_user_id`, `module_id`, `description`) VALUES
(14, 'sach maaaaa', 2, 39, ''),
(15, 'Admin test', 2, 37, ''),
(16, 'Linux Quiz', 2, 40, ''),
(18, 'tert', 2, 42, ''),
(19, '', 2, 37, ''),
(20, 'Linux Quiz', 2, 37, ''),
(21, 'Linux Quiz', 2, 37, ''),
(22, 'Linux Quiz', 2, 37, ''),
(23, 'Linux Quiz', 2, 37, ''),
(24, 'Admin test', 2, 38, ''),
(25, 'Admin test', 2, 38, ''),
(26, 'Admin test', 2, 38, ''),
(27, 'Admin test', 2, 37, ''),
(28, 'Admin test', 2, 37, ''),
(29, 'Das WEB-TECH Ultra Quiz', 4, 42, ''),
(31, 'Dingleberry', 4, 41, ''),
(32, 'Das DB GIGA Quiz', 4, 39, '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `quizplayhistory`
--

CREATE TABLE `quizplayhistory` (
  `play_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `catalog_id` int(11) NOT NULL,
  `date_played` datetime DEFAULT current_timestamp(),
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `quizplayhistory`
--

INSERT INTO `quizplayhistory` (`play_id`, `user_id`, `catalog_id`, `date_played`, `score`) VALUES
(1, 4, 29, '2025-02-21 21:41:13', 5),
(2, 4, 29, '2025-02-21 21:44:27', 5),
(3, 4, 29, '2025-02-21 21:44:27', 5),
(4, 4, 29, '2025-02-21 21:45:42', 1),
(5, 4, 29, '2025-02-22 09:38:34', 5),
(6, 4, 29, '2025-02-22 09:39:05', 5),
(7, 4, 29, '2025-02-22 09:39:55', 8),
(8, 4, 29, '2025-02-22 09:40:29', 10),
(9, 4, 29, '2025-02-22 09:42:50', 10),
(10, 4, 29, '2025-02-22 09:43:16', 8),
(11, 4, 29, '2025-02-22 09:43:51', 10),
(12, 4, 29, '2025-02-22 10:09:14', 4),
(13, 4, 29, '2025-02-22 10:09:16', 4),
(14, 4, 29, '2025-02-22 10:24:28', 6),
(15, 4, 29, '2025-02-22 10:53:12', 8),
(16, 4, 29, '2025-02-22 10:53:41', 7),
(17, 4, 29, '2025-02-22 10:54:13', 8),
(18, 4, 29, '2025-02-22 10:54:44', 10),
(19, 4, 29, '2025-02-22 11:07:31', 5),
(20, 4, 29, '2025-02-22 11:07:32', 5),
(21, 4, 29, '2025-02-22 11:11:18', 4),
(22, 4, 29, '2025-02-22 13:17:43', 8),
(23, 4, 29, '2025-02-22 13:29:59', 4),
(24, 4, 29, '2025-02-22 13:37:49', 6),
(25, 4, 29, '2025-02-22 13:51:22', 3),
(26, 4, 29, '2025-02-22 13:51:59', 3),
(27, 4, 29, '2025-02-22 13:54:01', 5),
(28, 4, 29, '2025-02-22 13:58:29', 0),
(29, 4, 29, '2025-02-22 13:59:09', 4),
(30, 4, 29, '2025-02-22 14:06:05', 5),
(31, 4, 29, '2025-02-22 14:11:16', 7),
(32, 4, 29, '2025-02-22 14:19:36', 10),
(33, 2, 29, '2025-02-23 09:50:25', 3),
(34, 2, 29, '2025-02-23 10:00:00', 9);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rating`
--

CREATE TABLE `rating` (
  `catalog_id` int(11) NOT NULL,
  `rating_value` float DEFAULT NULL,
  `rating_count` int(11) NOT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `rating`
--

INSERT INTO `rating` (`catalog_id`, `rating_value`, `rating_count`, `date`) VALUES
(29, 6.75, 32, '2025-02-23 10:00:03');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reportedquestion`
--

CREATE TABLE `reportedquestion` (
  `report_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `reported_by_user_id` int(11) NOT NULL,
  `report_reason` text NOT NULL,
  `date_reported` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `studyprogram`
--

CREATE TABLE `studyprogram` (
  `study_program_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `studyprogram`
--

INSERT INTO `studyprogram` (`study_program_id`, `name`) VALUES
(1, 'Informatik');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `study_program_id` int(11) NOT NULL,
  `points` int(11) DEFAULT 0,
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`user_id`, `username`, `password_hash`, `email`, `study_program_id`, `points`, `is_admin`) VALUES
(2, 'admin', '$2y$10$ACMhDoYSMv83au.kdIcPHexQNl8QhoaLo2log5Bp7.vZRzpycz/pW', 'admin@example.com', 1, 12, 1),
(3, 'BerndLernt', '$2y$10$YD9iNSgeV1HZ4wStTknyaO4mRp9PhDzvyuu7NbQEZJzvrCu3TzPnu', 'BerndLernt@example.com', 1, 0, 0),
(4, 'HansKanns', '$2y$10$LLuSMpXhsIEsx/rPfeCc2.a7gBy0/kU/zl.zaltXZcOgOlMf0YNDa', 'hanskanns@example.com', 1, 188, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `useranswerlog`
--

CREATE TABLE `useranswerlog` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `date_answered` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `useranswerlog`
--

INSERT INTO `useranswerlog` (`log_id`, `user_id`, `question_id`, `date_answered`) VALUES
(82, 4, 395, '2025-02-22 14:19:36'),
(83, 4, 397, '2025-02-22 14:19:36'),
(84, 4, 396, '2025-02-22 14:19:36'),
(85, 4, 401, '2025-02-22 14:19:36'),
(86, 4, 398, '2025-02-22 14:19:36'),
(87, 4, 402, '2025-02-22 14:19:36'),
(88, 4, 400, '2025-02-22 14:19:36'),
(89, 4, 404, '2025-02-22 14:11:16'),
(91, 4, 405, '2025-02-22 10:53:41'),
(94, 4, 408, '2025-02-22 10:53:41'),
(95, 4, 407, '2025-02-22 10:53:41'),
(96, 4, 399, '2025-02-22 14:19:36'),
(97, 4, 403, '2025-02-22 14:19:36'),
(113, 4, 406, '2025-02-22 10:54:44'),
(183, 4, 410, '2025-02-22 14:19:36'),
(184, 2, 400, '2025-02-23 09:50:25'),
(185, 2, 396, '2025-02-23 09:50:25'),
(186, 2, 401, '2025-02-23 09:50:25'),
(187, 2, 402, '2025-02-23 10:00:00'),
(188, 2, 395, '2025-02-23 10:00:00'),
(189, 2, 397, '2025-02-23 10:00:00'),
(190, 2, 403, '2025-02-23 10:00:00'),
(191, 2, 405, '2025-02-23 10:00:00'),
(192, 2, 407, '2025-02-23 10:00:00'),
(193, 2, 398, '2025-02-23 10:00:00'),
(194, 2, 399, '2025-02-23 10:00:00'),
(195, 2, 404, '2025-02-23 10:00:00');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `answeroption`
--
ALTER TABLE `answeroption`
  ADD PRIMARY KEY (`answer_option_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indizes für die Tabelle `favoritequiz`
--
ALTER TABLE `favoritequiz`
  ADD PRIMARY KEY (`user_id`,`catalog_id`),
  ADD KEY `catalog_id` (`catalog_id`);

--
-- Indizes für die Tabelle `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`module_id`),
  ADD KEY `created_by_admin_id` (`created_by_admin_id`),
  ADD KEY `study_program_id` (`study_program_id`);

--
-- Indizes für die Tabelle `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `catalog_id` (`catalog_id`);

--
-- Indizes für die Tabelle `questioncatalog`
--
ALTER TABLE `questioncatalog`
  ADD PRIMARY KEY (`catalog_id`),
  ADD KEY `created_by_user_id` (`created_by_user_id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indizes für die Tabelle `quizplayhistory`
--
ALTER TABLE `quizplayhistory`
  ADD PRIMARY KEY (`play_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `catalog_id` (`catalog_id`);

--
-- Indizes für die Tabelle `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`catalog_id`);

--
-- Indizes für die Tabelle `reportedquestion`
--
ALTER TABLE `reportedquestion`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `reported_by_user_id` (`reported_by_user_id`);

--
-- Indizes für die Tabelle `studyprogram`
--
ALTER TABLE `studyprogram`
  ADD PRIMARY KEY (`study_program_id`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `study_program_id` (`study_program_id`);

--
-- Indizes für die Tabelle `useranswerlog`
--
ALTER TABLE `useranswerlog`
  ADD PRIMARY KEY (`log_id`),
  ADD UNIQUE KEY `unique_user_question` (`user_id`,`question_id`),
  ADD KEY `question_id` (`question_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `answeroption`
--
ALTER TABLE `answeroption`
  MODIFY `answer_option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2097;

--
-- AUTO_INCREMENT für Tabelle `module`
--
ALTER TABLE `module`
  MODIFY `module_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT für Tabelle `question`
--
ALTER TABLE `question`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=412;

--
-- AUTO_INCREMENT für Tabelle `questioncatalog`
--
ALTER TABLE `questioncatalog`
  MODIFY `catalog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT für Tabelle `quizplayhistory`
--
ALTER TABLE `quizplayhistory`
  MODIFY `play_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT für Tabelle `reportedquestion`
--
ALTER TABLE `reportedquestion`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `studyprogram`
--
ALTER TABLE `studyprogram`
  MODIFY `study_program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `useranswerlog`
--
ALTER TABLE `useranswerlog`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `answeroption`
--
ALTER TABLE `answeroption`
  ADD CONSTRAINT `answeroption_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `favoritequiz`
--
ALTER TABLE `favoritequiz`
  ADD CONSTRAINT `favoritequiz_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritequiz_ibfk_2` FOREIGN KEY (`catalog_id`) REFERENCES `questioncatalog` (`catalog_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `module`
--
ALTER TABLE `module`
  ADD CONSTRAINT `module_ibfk_1` FOREIGN KEY (`created_by_admin_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `module_ibfk_2` FOREIGN KEY (`study_program_id`) REFERENCES `studyprogram` (`study_program_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`catalog_id`) REFERENCES `questioncatalog` (`catalog_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `questioncatalog`
--
ALTER TABLE `questioncatalog`
  ADD CONSTRAINT `questioncatalog_ibfk_1` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `questioncatalog_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `module` (`module_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `quizplayhistory`
--
ALTER TABLE `quizplayhistory`
  ADD CONSTRAINT `quizplayhistory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quizplayhistory_ibfk_2` FOREIGN KEY (`catalog_id`) REFERENCES `questioncatalog` (`catalog_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`catalog_id`) REFERENCES `questioncatalog` (`catalog_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `reportedquestion`
--
ALTER TABLE `reportedquestion`
  ADD CONSTRAINT `reportedquestion_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reportedquestion_ibfk_2` FOREIGN KEY (`reported_by_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`study_program_id`) REFERENCES `studyprogram` (`study_program_id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `useranswerlog`
--
ALTER TABLE `useranswerlog`
  ADD CONSTRAINT `useranswerlog_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `useranswerlog_ibfk_3` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
