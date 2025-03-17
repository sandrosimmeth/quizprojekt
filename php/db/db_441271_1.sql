-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 17. Mrz 2025 um 12:11
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
(2117, 417, 'asd', 1),
(2118, 417, 'asda', 0),
(2119, 417, 'asda', 0),
(2120, 417, 'sasd', 0),
(2121, 418, 'asd', 1),
(2122, 418, 'asd', 0),
(2123, 418, 'das', 0),
(2124, 418, 'as', 0),
(2337, 32, 'Eine schmackhafte Beere', 0),
(2338, 32, 'Ein anderes Wort für Jinglebells', 0),
(2339, 32, 'ungenießbare Beere', 0),
(2340, 32, 'Kakaklumpen im Fell', 1),
(3505, 440, 'ewrwe', 1),
(3506, 440, 'erw', 0),
(3507, 440, 'rwe', 0),
(3508, 440, 'rwe', 0),
(3549, 441, 'asd', 1),
(3550, 441, 'asd', 0),
(3551, 441, 'asdas', 0),
(3552, 441, 'assd', 0),
(3553, 442, 'd', 1),
(3554, 442, 'asd', 0),
(3555, 442, 'dasd', 0),
(3556, 442, 'asdas', 0),
(3557, 443, 'sd', 1),
(3558, 443, 'asd', 0),
(3559, 443, 'asdas', 0),
(3560, 443, 'dsa', 0),
(3561, 444, 'asd', 1),
(3562, 444, 'asd', 0),
(3563, 444, 'asd', 0),
(3564, 444, 'asdasdasd', 0),
(3565, 445, 'asd', 1),
(3566, 445, 'asd', 0),
(3567, 445, 'asdasdas', 0),
(3568, 445, 'asd', 0),
(3569, 446, 'asdas', 1),
(3570, 446, 'asd', 0),
(3571, 446, 'da', 0),
(3572, 446, 'sdasdasd', 0),
(3573, 447, 'asd', 1),
(3574, 447, 'asd', 0),
(3575, 447, 'asd', 0),
(3576, 447, 'asdasd', 0),
(3577, 448, 'sd', 1),
(3578, 448, 'asd', 0),
(3579, 448, 'asdasd', 0),
(3580, 448, 'asd', 0),
(3581, 449, 'as', 1),
(3582, 449, 'dasd', 0),
(3583, 449, 'sdasda', 0),
(3584, 449, 'as', 0),
(3585, 450, 'asd', 1),
(3586, 450, 'asdas', 0),
(3587, 450, 'dasdasd', 0),
(3588, 450, 'das', 0),
(3589, 451, 'ert', 1),
(3590, 451, 'ter', 0),
(3591, 451, 'ertert', 0),
(3592, 451, 'tret', 0),
(4013, 395, 'Jquery', 0),
(4014, 395, 'Svelte', 0),
(4015, 395, 'React', 1),
(4016, 395, 'PlainJS', 0),
(4017, 396, 'Neuland', 0),
(4018, 396, 'Böse', 0),
(4019, 396, 'Weltweite Vernetzung von unabhängigen Netzwerken', 1),
(4020, 396, 'Eine sehr große Festplatte, die Google gehört', 0),
(4021, 397, 'Nur mit Magie', 0),
(4022, 397, 'Mit align:center', 0),
(4023, 397, 'Es ist standardmäßig zentriert', 0),
(4024, 397, 'Über Flex-Container', 1),
(4025, 398, 'Der Entwickler von Git und Linux', 1),
(4026, 398, 'Der Bruder von Linus TechTips', 0),
(4027, 398, 'Den gibt es gar nicht', 0),
(4028, 398, 'Der Entwickler von Windows', 0),
(4029, 399, 'EDGE', 0),
(4030, 399, 'CHROME', 0),
(4031, 399, 'SAFARI', 0),
(4032, 399, 'FIREFOX', 1),
(4033, 400, 'Cascading Spread Sheet', 0),
(4034, 400, 'Casual Scream Soup', 0),
(4035, 400, 'Cascading Style Sheet', 1),
(4036, 400, 'Camel Snoke Super', 0),
(4037, 401, '4', 0),
(4038, 401, '6', 0),
(4039, 401, '8', 1),
(4040, 401, '12', 0),
(4041, 402, 'IEE 890', 0),
(4042, 402, 'IEEE 802.11', 1),
(4043, 402, 'ISO 67', 0),
(4044, 402, 'WLAN-Standard', 0),
(4045, 403, 'Wireless Access Near', 0),
(4046, 403, 'Wide Area Network', 1),
(4047, 403, 'Wide Adventure Network', 0),
(4048, 403, 'Wireless Area Network', 0),
(4049, 404, 'HyperTextTransferProtocol', 1),
(4050, 404, 'Hey to my Ladies', 0),
(4051, 404, 'falsch', 0),
(4052, 404, 'falsch', 0),
(4053, 405, 'Ein Kabel, welches dein Kumpel ist', 0),
(4054, 405, 'Ein Ethernet-Kabel', 1),
(4055, 405, 'Wird benutzt um Brücken zu stabilisieren', 0),
(4056, 405, 'Eine Band aus der Türkei', 0),
(4057, 406, 'Eine schmackhafter Snack', 0),
(4058, 406, 'Ein guter Name für einen Hund', 0),
(4059, 406, 'Gespeicherte Daten in deinem Browser', 1),
(4060, 406, 'Die perfekte Ergänzung zu einem Glas Milch', 0),
(4061, 407, 'Der Ein-und Ausschalter für das Internet', 0),
(4062, 407, 'Ein smartes gerät, welches lokal über MAC-Adressen Daten sendent', 1),
(4063, 407, 'Ein spezieller Sattel für Pferde', 0),
(4064, 407, 'Eine Super Witch', 0),
(4065, 408, 'Coverband von AC/DC', 0),
(4066, 408, 'Protokollstapel des Internets', 1),
(4067, 408, 'Gleichstrom', 0),
(4068, 408, 'Wechselstrom', 0),
(4069, 410, 'virtual private network', 1),
(4070, 410, 'Ein Kind von Elon Musk', 0),
(4071, 410, 'teures Vodafone Zusatzpaket', 0),
(4072, 410, 'ein seltenes Tier', 0),
(4073, 426, 'asda', 1),
(4074, 426, 'sdasddas', 0),
(4075, 426, 'asddas', 0),
(4076, 426, 'asdasd', 0),
(4077, 427, 'asd', 1),
(4078, 427, 'asd', 0),
(4079, 427, 'dasd', 0),
(4080, 427, 'asdas', 0),
(4081, 428, 'asd', 1),
(4082, 428, 'aa', 0),
(4083, 428, 'asd', 0),
(4084, 428, 'asdasd', 0),
(4085, 429, 'sdgdf', 1),
(4086, 429, 'gdfg', 0),
(4087, 429, 'dfgdfgdfg', 0),
(4088, 429, 'sdgf', 0),
(4089, 430, 'dfg df', 1),
(4090, 430, 'g dfg ', 0),
(4091, 430, 'g df gg dfg dfg   ', 0),
(4092, 430, 'dg df', 0),
(4093, 431, 'F  F', 1),
(4094, 431, ' W', 0),
(4095, 431, 'W ', 0),
(4096, 431, ' WE', 0),
(4097, 432, 'DASDASD', 0),
(4098, 432, 'WEF WE ', 0),
(4099, 432, 'WE F WE', 0),
(4100, 432, ' FADAS', 1),
(4101, 433, 'QW', 1),
(4102, 433, 'EQWE', 0),
(4103, 433, 'QW EQW', 0),
(4104, 433, 'SADASDASDASD', 0),
(4105, 434, 'QWE', 1),
(4106, 434, 'QWEWQ', 0),
(4107, 434, 'QWEQW', 0),
(4108, 434, 'EQWE', 0),
(4109, 435, 'WEQ', 1),
(4110, 435, 'EQWE', 0),
(4111, 435, 'QWEQW', 0),
(4112, 435, 'QWE', 0),
(4113, 436, 'ASDASD', 1),
(4114, 436, 'ASDA', 0),
(4115, 436, 'SDAD', 0),
(4116, 436, 'QWEQWEQWE', 0),
(4437, 465, 'asd', 1),
(4438, 465, 'asd', 0),
(4439, 465, 'das', 0),
(4440, 465, 'as', 0),
(4441, 466, 'asd', 1),
(4442, 466, 'asd', 0),
(4443, 466, 'sdas', 0),
(4444, 466, 'asda', 0),
(4445, 467, 'asd', 1),
(4446, 467, 'asd', 0),
(4447, 467, 'asd', 0),
(4448, 467, 'asd', 0),
(4449, 468, 'as', 1),
(4450, 468, 'dasd', 0),
(4451, 468, 'das', 0),
(4452, 468, 'as', 0),
(4453, 469, 'asd', 1),
(4454, 469, 'asda', 0),
(4455, 469, 'asdas', 0),
(4456, 469, 'sd', 0),
(4457, 470, 'asda', 1),
(4458, 470, 'sda', 0),
(4459, 470, 'sdas', 0),
(4460, 470, 'sda', 0),
(4461, 471, 'asd', 1),
(4462, 471, 'asd', 0),
(4463, 471, 'dasd', 0),
(4464, 471, 'as', 0),
(4465, 472, 'asd', 1),
(4466, 472, 'asd', 0),
(4467, 472, 'asdas', 0),
(4468, 472, 'sd', 0),
(4469, 473, 'asd', 1),
(4470, 473, 'asd', 0),
(4471, 473, 'dasd', 0),
(4472, 473, 'as', 0),
(4473, 474, 'asd', 1),
(4474, 474, 'asda', 0),
(4475, 474, 'asdasd', 0),
(4476, 474, 'sd', 0),
(4477, 475, 'asd', 1),
(4478, 475, 'as', 0),
(4479, 475, 'das', 0),
(4480, 475, 'as', 0),
(5109, 365, 'Anderer Name für Facebook', 0),
(5110, 365, 'Eine große Tabelle', 1),
(5111, 365, 'Sparkasse', 0),
(5112, 365, 'Sitzbank im Englischen Garten', 0),
(5113, 366, 'Malware', 0),
(5114, 366, 'Ein gutes Passwort', 0),
(5115, 366, 'Ein DBMS', 1),
(5116, 366, 'Eine Webseite', 0),
(5117, 367, 'Weil es mich ärgern will', 1),
(5118, 367, 'Weil meine Config falsch war', 0),
(5119, 367, 'Weil ich drinnen rumpfusche', 0),
(5120, 367, 'Weil Gaben sauer auf mich ist', 0),
(5121, 411, 'Datenbank', 0),
(5122, 411, 'Dingleberry', 1),
(5123, 411, 'Deutsche Bahn', 0),
(5124, 411, 'DataBase', 0),
(5125, 420, 'qwe', 1),
(5126, 420, 'qweq', 0),
(5127, 420, 'eqweq', 0),
(5128, 420, 'weqw', 0),
(5129, 421, 'eqwe', 1),
(5130, 421, 'qwe', 0),
(5131, 421, 'qweqwe', 0),
(5132, 421, 'eqw', 0),
(5133, 422, 'eqw', 1),
(5134, 422, 'eqwe', 0),
(5135, 422, 'qweqweqw', 0),
(5136, 422, 'qwe', 0),
(5137, 423, 'qwe', 1),
(5138, 423, 'qweqwe', 0),
(5139, 423, 'eqweqwe', 0),
(5140, 423, 'qw', 0),
(5141, 424, 'qwe', 1),
(5142, 424, 'qweqw', 0),
(5143, 424, 'eqweq', 0),
(5144, 424, 'eqw', 0),
(5145, 438, 't', 1),
(5146, 438, 'tt', 0),
(5147, 438, 't', 0),
(5148, 438, 't', 0),
(5149, 453, 'asd', 1),
(5150, 453, 'adsasd', 0),
(5151, 453, 'asd', 0),
(5152, 453, 'asd', 0),
(5153, 454, 'asda', 1),
(5154, 454, 'sdas', 0),
(5155, 454, 'dasdas', 0),
(5156, 454, 'das', 0),
(5157, 455, 'asdas', 1),
(5158, 455, 'das', 0),
(5159, 455, 'asd', 0),
(5160, 455, 'dasd', 0),
(5161, 456, 'asda', 1),
(5162, 456, 'das', 0),
(5163, 456, 'asdasd', 0),
(5164, 456, 'dasd', 0),
(5165, 457, 'asd', 1),
(5166, 457, 'asd', 0),
(5167, 457, 'asdas', 0),
(5168, 457, 'asd', 0),
(5169, 458, 'asds', 1),
(5170, 458, 'das', 0),
(5171, 458, 'dasdsad', 0),
(5172, 458, 'das', 0),
(5173, 459, 'asd', 0),
(5174, 459, 'asdas', 0),
(5175, 459, 'dasd', 0),
(5176, 459, 'das', 1),
(5177, 460, 'asdas', 0),
(5178, 460, 'dass', 0),
(5179, 460, 'dasd', 0),
(5180, 460, 'das', 1),
(5181, 461, 'asdas', 0),
(5182, 461, 'das', 0),
(5183, 461, 'dasdasd', 0),
(5184, 461, 'das', 1),
(5185, 462, 'asd', 1),
(5186, 462, 'asdas', 0),
(5187, 462, 'dasdas', 0),
(5188, 462, 'das', 0),
(5189, 463, 'asd', 1),
(5190, 463, 'asd', 0),
(5191, 463, 'asd', 0),
(5192, 463, 'asd', 0),
(5193, 464, 'asda', 1),
(5194, 464, 'sdas', 0),
(5195, 464, 'dasd', 0),
(5196, 464, 'das', 0),
(5197, 477, '1', 1),
(5198, 477, '1', 0),
(5199, 477, '1', 0),
(5200, 477, '1', 0),
(5201, 478, '2', 1),
(5202, 478, '2', 0),
(5203, 478, '2', 0),
(5204, 478, '2', 0),
(5205, 479, '34', 1),
(5206, 479, '344', 0),
(5207, 479, '3444', 0),
(5208, 479, '334', 0),
(5209, 480, '4', 1),
(5210, 480, '4', 0),
(5211, 480, '4', 0),
(5212, 480, '44', 0),
(5213, 481, '55', 1),
(5214, 481, '5', 0),
(5215, 481, '5', 0),
(5216, 481, '5', 0),
(5217, 482, '6', 1),
(5218, 482, '6', 0),
(5219, 482, '6', 0),
(5220, 482, '6', 0),
(5221, 483, '3asd', 1),
(5222, 483, 'asd', 0),
(5223, 483, 'asdasd', 0),
(5224, 483, 'asd', 0),
(5225, 484, 'das', 1),
(5226, 484, 'das', 0),
(5227, 484, 'sdasd', 0),
(5228, 484, 'da', 0);

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
(3, 29, '2025-03-05 11:51:09'),
(3, 40, '2025-03-05 12:09:48'),
(4, 29, '2025-02-22 10:02:31'),
(4, 32, '2025-02-22 14:21:30'),
(4, 42, '2025-03-12 07:16:24');

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
(411, 32, 'Wofür steht DB?', 'es ist die offizielle Abkürzung'),
(417, 38, 'asdasd', ''),
(418, 39, 'dasdas', 'dasd'),
(420, 32, 'qweqwe', ''),
(421, 32, 'qweqw', ''),
(422, 32, 'eqweqw', ''),
(423, 32, 'qweqwe', ''),
(424, 32, 'qweqwe', ''),
(426, 40, 'asdasdasd', 'asdasdasd'),
(427, 40, 'asdasd', 'asdasd'),
(428, 40, 'aasd', 'asdasda'),
(429, 40, 'asdadadascfsg', 'dfgdfgdfg'),
(430, 40, 'dfgdddddddddd dfgdddddddddd dfgdddddddddd dfgdddddddddd dfgdddddddddd dfgdddddddddd dfgdddddddddd dfgdddddddddd ', 'ddfg dfffffffffffffffffffffökFBÖAKFB Ifg uikfgiwFG IWFUIW EIFG IFGIWUEFG EIFG WEIFWEF  WF WEFWEFW'),
(431, 40, ' EE', 'F WEF F'),
(432, 40, ' WF ', 'W EF WE WE F '),
(433, 40, 'EQWEQE', 'D DQD WD QW D'),
(434, 40, 'QWEQWEQWE', 'EQWEQWEQWE'),
(435, 40, 'QWEQWEQWE', 'EQWEQWEQW'),
(436, 40, 'ASDAS', 'DASDASD'),
(438, 32, 't1', ''),
(440, 41, 'wer', 'rewrwer'),
(441, 42, 'iuasfv1', 'dasdad'),
(442, 42, 'asda2', 'asd'),
(443, 42, 'sadaaaa3', 'dasda'),
(444, 42, 'asdasdaaa4', ''),
(445, 42, 'asdasd5', 'dasdasd'),
(446, 42, 'asd6', ''),
(447, 42, 'afafasdfasdfasdasd7', ''),
(448, 42, 'asda8', ''),
(449, 42, 'asdasd9', ''),
(450, 42, 'asdasd10', ''),
(451, 42, 'wgfwerter11', 'ss'),
(453, 32, 'Frage 1', 'asdasd'),
(454, 32, 'Frage 2', ''),
(455, 32, 'Frage 3', 'asdasd'),
(456, 32, 'Test 4', 'asdasd'),
(457, 32, 'Frage 5', ''),
(458, 32, 'Test 6', ''),
(459, 32, 'Test 7', 'asdasdasd'),
(460, 32, 'Test 8', 'sdasdasdasd'),
(461, 32, 'Test 9', 'asdasdas'),
(462, 32, 'Test 10 joooooooooooooooo', ''),
(463, 32, 'Test 11 jooooooooooooo', 'asdas'),
(464, 32, 'Test 12 joooooooooo', 'asdas'),
(465, 43, 'Frage 111', 'dasdas'),
(466, 43, 'Frage 222', 'dasd'),
(467, 43, 'Frage 333', 'asdas'),
(468, 43, 'Frage 444', 'dasd'),
(469, 43, 'Frage 555', 'dasd'),
(470, 43, 'Frage 666', 'dasdasd'),
(471, 43, 'Frage 777', 'asdas'),
(472, 43, 'Frage 888', 'dasd'),
(473, 43, 'Frage 999', 'asd'),
(474, 43, 'Frage 10', ''),
(475, 43, 'Question 11 Oh jea', 'dasdasds'),
(477, 32, '11 HUHU', '1'),
(478, 32, '22', ''),
(479, 32, '333', '3333333333'),
(480, 32, 'TESTTTTTTTTTTT NEUUUUUUUUU', ''),
(481, 32, '55', ''),
(482, 32, '66', '6'),
(483, 32, 'Test NEUUUUUUUUUUU', ''),
(484, 32, 'asdas', '');

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
(29, 'Das WEBTECH ULTRA MEGA SUPER QUIZ', 4, 42, ''),
(31, 'Dingleberry', 4, 41, ''),
(32, 'Das DB GIGA Quiz', 4, 39, ''),
(38, 'asdasda', 4, 36, ''),
(39, 'asdd', 4, 37, ''),
(40, 'Bernd Testest', 3, 38, ''),
(41, 'dqdasd', 4, 37, ''),
(42, 'dqdasd', 4, 38, ''),
(43, 'Doch IT-SIcherheit', 4, 41, '');

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
(34, 2, 29, '2025-02-23 10:00:00', 9),
(35, 4, 29, '2025-03-02 12:28:32', 3),
(36, 4, 29, '2025-03-02 12:30:10', 6),
(37, 4, 32, '2025-03-04 16:12:23', 4),
(38, 3, 29, '2025-03-05 11:50:56', 7),
(39, 3, 40, '2025-03-05 14:52:24', 0),
(40, 3, 40, '2025-03-05 14:53:38', 2),
(41, 3, 40, '2025-03-05 14:57:42', 1),
(42, 3, 29, '2025-03-05 15:09:35', 4),
(43, 4, 29, '2025-03-06 10:39:22', 3),
(44, 4, 29, '2025-03-06 10:40:12', 9),
(45, 4, 29, '2025-03-06 10:57:17', 7),
(46, 4, 29, '2025-03-06 11:00:50', 9),
(47, 4, 29, '2025-03-06 11:08:56', 10),
(48, 4, 29, '2025-03-06 11:16:18', 9),
(49, 4, 29, '2025-03-06 11:33:59', 8),
(50, 4, 29, '2025-03-06 11:39:36', 8),
(51, 4, 29, '2025-03-06 12:55:50', 5),
(52, 4, 29, '2025-03-06 13:16:37', 7),
(53, 4, 32, '2025-03-06 14:14:23', 3),
(54, 4, 32, '2025-03-11 07:18:17', 4),
(55, 4, 32, '2025-03-11 07:18:31', 4),
(56, 4, 42, '2025-03-11 07:54:37', 3),
(57, 4, 32, '2025-03-11 09:31:55', 4),
(58, 4, 29, '2025-03-11 10:14:54', 3),
(59, 4, 29, '2025-03-11 10:38:24', 0),
(60, 4, 40, '2025-03-11 13:22:23', 4);

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
(29, 6.92307, 39, '2025-03-11 10:38:25'),
(32, 7.6, 5, '2025-03-11 09:31:57'),
(40, 3.66667, 3, '2025-03-11 13:22:23'),
(42, 5, 1, '2025-03-11 07:54:37');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reportedquestion`
--

CREATE TABLE `reportedquestion` (
  `report_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `reported_by_user_id` int(11) NOT NULL,
  `report_reason` text NOT NULL,
  `date_reported` datetime DEFAULT current_timestamp(),
  `done` tinyint(1) NOT NULL,
  `dismissed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `reportedquestion`
--

INSERT INTO `reportedquestion` (`report_id`, `question_id`, `reported_by_user_id`, `report_reason`, `date_reported`, `done`, `dismissed`) VALUES
(1, 396, 4, 'asdasda', '2025-03-05 11:46:23', 0, 1),
(2, 404, 3, 'Nein es ist HyperText Transfer Protocol', '2025-03-05 11:50:22', 1, 0),
(3, 396, 3, 'Antwort Netzwerke eigentlich richtig', '2025-03-05 11:50:44', 1, 0),
(4, 397, 3, 'Brehhhhhh', '2025-03-05 11:57:37', 0, 1),
(5, 424, 4, 'Dumm', '2025-03-11 09:31:31', 0, 1),
(6, 367, 4, 'Du pfuscht digger', '2025-03-11 09:31:43', 0, 1),
(7, 396, 4, 'Ne man Neuland', '2025-03-11 10:14:48', 1, 0),
(8, 395, 4, 'Frameworks sind doch fürn Arsch', '2025-03-11 10:38:11', 1, 0),
(9, 446, 4, 'du spacko', '2025-03-11 13:21:41', 0, 1),
(10, 429, 4, 'spacko', '2025-03-11 13:22:04', 0, 0),
(11, 432, 4, 'idiot', '2025-03-11 13:22:10', 0, 0),
(12, 434, 4, 'huan', '2025-03-11 13:22:15', 0, 0),
(13, 423, 4, 'test', '2025-03-11 14:03:45', 1, 0),
(14, 403, 4, 'adventure!!!', '2025-03-11 14:52:12', 0, 1),
(15, 398, 4, 'Is das nich sein BRAHHH?', '2025-03-11 14:55:55', 0, 1),
(16, 365, 4, 'Sparkasse für Daten', '2025-03-11 14:59:21', 1, 0),
(17, 457, 4, 'da steht noch test brah', '2025-03-12 07:07:24', 1, 0),
(18, 458, 4, 'Immer noch ein Test dabei', '2025-03-12 07:09:23', 0, 1),
(19, 453, 4, 'dkfjh kösdäxklhbs oäjfbsläl näsldfjkbsä ofbsoäfl bsälfb slädfb sljdfjsdbfjl bsdofä bsd fäbsdflsb däkfghsdäofbs iäfbsdi fbsidkb fsdäfbäsdkfbäskdbfsjkädbfsbfkjsfksdbfksbdkjfg sdjkfbsd iofsjk dfiksj fs fsjd fusdh jksdbfksbf kskjsdbf skdjfb sdkfbsdkjfb sdjk', '2025-03-12 07:18:01', 1, 0),
(20, 397, 4, 'Test', '2025-03-12 18:04:07', 1, 0),
(21, 397, 4, 'so', '2025-03-12 18:49:55', 1, 0);

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
(3, 'BerndLernt', '$2y$10$YD9iNSgeV1HZ4wStTknyaO4mRp9PhDzvyuu7NbQEZJzvrCu3TzPnu', 'BerndLernt@example.com', 1, 14, 0),
(4, 'HansKanns', '$2y$10$LLuSMpXhsIEsx/rPfeCc2.a7gBy0/kU/zl.zaltXZcOgOlMf0YNDa', 'hanskanns@example.com', 1, 301, 0);

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
(82, 4, 395, '2025-03-06 13:16:37'),
(83, 4, 397, '2025-03-06 11:39:36'),
(84, 4, 396, '2025-03-06 11:39:36'),
(85, 4, 401, '2025-03-06 11:33:59'),
(86, 4, 398, '2025-03-11 10:14:54'),
(87, 4, 402, '2025-03-06 13:16:37'),
(88, 4, 400, '2025-03-06 13:16:37'),
(89, 4, 404, '2025-03-06 13:16:37'),
(91, 4, 405, '2025-02-22 10:53:41'),
(94, 4, 408, '2025-02-22 10:53:41'),
(95, 4, 407, '2025-02-22 10:53:41'),
(96, 4, 399, '2025-03-11 10:14:54'),
(97, 4, 403, '2025-03-11 10:14:54'),
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
(195, 2, 404, '2025-02-23 10:00:00'),
(205, 4, 420, '2025-03-11 07:18:31'),
(206, 4, 424, '2025-03-11 09:31:55'),
(208, 4, 421, '2025-03-11 09:31:55'),
(209, 3, 402, '2025-03-05 11:50:56'),
(210, 3, 395, '2025-03-05 11:50:56'),
(211, 3, 401, '2025-03-05 11:50:56'),
(212, 3, 397, '2025-03-05 11:50:56'),
(213, 3, 398, '2025-03-05 11:50:56'),
(214, 3, 399, '2025-03-05 11:50:56'),
(215, 3, 400, '2025-03-05 11:50:56'),
(216, 3, 426, '2025-03-05 14:53:38'),
(217, 3, 430, '2025-03-05 14:53:38'),
(218, 3, 428, '2025-03-05 14:57:42'),
(219, 3, 405, '2025-03-05 15:09:35'),
(220, 3, 404, '2025-03-05 15:09:35'),
(221, 3, 406, '2025-03-05 15:09:35'),
(222, 3, 396, '2025-03-05 15:09:35'),
(298, 4, 366, '2025-03-11 09:31:55'),
(299, 4, 367, '2025-03-11 09:31:55'),
(300, 4, 365, '2025-03-06 14:14:23'),
(304, 4, 423, '2025-03-11 07:18:17'),
(308, 4, 411, '2025-03-11 07:18:31'),
(309, 4, 445, '2025-03-11 07:54:37'),
(310, 4, 446, '2025-03-11 07:54:37'),
(311, 4, 449, '2025-03-11 07:54:37'),
(319, 4, 429, '2025-03-11 13:22:23'),
(320, 4, 432, '2025-03-11 13:22:23'),
(321, 4, 428, '2025-03-11 13:22:23'),
(322, 4, 431, '2025-03-11 13:22:23');

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
  MODIFY `answer_option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5229;

--
-- AUTO_INCREMENT für Tabelle `module`
--
ALTER TABLE `module`
  MODIFY `module_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT für Tabelle `question`
--
ALTER TABLE `question`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=485;

--
-- AUTO_INCREMENT für Tabelle `questioncatalog`
--
ALTER TABLE `questioncatalog`
  MODIFY `catalog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT für Tabelle `quizplayhistory`
--
ALTER TABLE `quizplayhistory`
  MODIFY `play_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT für Tabelle `reportedquestion`
--
ALTER TABLE `reportedquestion`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=323;

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
