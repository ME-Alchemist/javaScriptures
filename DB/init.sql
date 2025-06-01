-- --------------------------------------------------------
-- Värd:                         localhost
-- Serverversion:                9.3.0 - MySQL Community Server - GPL
-- Server-OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumpar databasstruktur för jsdungeons
CREATE DATABASE IF NOT EXISTS `jsdungeons` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jsdungeons`;

-- Dumpar struktur för tabell jsdungeons.bestiary
CREATE TABLE IF NOT EXISTS `bestiary` (
  `enemy_id` int NOT NULL AUTO_INCREMENT,
  `enemy_name` varchar(100) DEFAULT NULL,
  `img_path` varchar(250) DEFAULT NULL,
  `exp_drop` int DEFAULT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`enemy_id`),
  UNIQUE KEY `Index 2` (`enemy_name`),
  KEY `bestiary_category_id_fk` (`category_id`),
  CONSTRAINT `bestiary_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumpar data för tabell jsdungeons.bestiary: ~47 rows (ungefär)
DELETE FROM `bestiary`;
INSERT INTO `bestiary` (`enemy_id`, `enemy_name`, `img_path`, `exp_drop`, `category_id`) VALUES
	(1, 'Goblin', '/images/monsters/Goblin.webp', 20, 1),
	(2, 'Kobold', '/images/monsters/Kobold.webp', 10, 1),
	(3, 'Giant Rat', '/images/monsters/Giant_Rat.webp', 10, 1),
	(4, 'Orc', '/images/monsters/Orc.webp', 40, 2),
	(5, 'Bandit', '/images/monsters/Bandit.webp', 10, 1),
	(6, 'Wolf', '/images/monsters/Wolf.webp', 50, 3),
	(7, 'Zombie', '/images/monsters/Zombie.webp', 20, 1),
	(8, 'Skeleton', '/images/monsters/Skeleton.webp', 20, 2),
	(9, 'Giant Spider', '/images/monsters/Giant_Spider.webp', 80, 3),
	(10, 'Gnoll', '/images/monsters/Gnoll.webp', 40, 3),
	(11, 'Harpy', '/images/monsters/Harpy.webp', 120, 4),
	(12, 'Troll', '/images/monsters/Troll.webp', 240, 7),
	(13, 'Lizardfolk', '/images/monsters/Lizardfolk.webp', 40, 3),
	(14, 'Psionic Fiend', '/images/monsters/Psionic_Fiend.webp', 400, 8),
	(15, 'Wight', '/images/monsters/Wight.webp', 160, 5),
	(16, 'Lich', '/images/monsters/Lich.webp', 1500, 9),
	(17, 'Dragon (Young)', '/images/monsters/Young_Dragon.webp', 500, 8),
	(18, 'Dragon (Adult)', '/images/monsters/Adult_Dragon.webp', 800, 9),
	(19, 'Gazer', '/images/monsters/Gazer.webp', 700, 9),
	(20, 'Drow', '/images/monsters/Drow.webp', 20, 2),
	(21, 'Trap Maw', '/images/monsters/Trap_Maw.webp', 120, 4),
	(22, 'Blinkmaw', '/images/monsters/Blinkmaw.webp', 160, 5),
	(23, 'Night Hag', '/images/monsters/Night_Hag.webp', 240, 7),
	(24, 'Hootbeast', '/images/monsters/Hootbeast.webp', 160, 5),
	(25, 'Gelatinous Cube', '/images/monsters/Gelatinous_Cube.webp', 200, 6),
	(26, 'Corpse Worm', '/images/monsters/Corpse_Worm.webp', 120, 4),
	(27, 'Animated Armor', '/images/monsters/Animated_Armor.webp', 80, 4),
	(28, 'Wererats', '/images/monsters/Wererat.webp', 120, 4),
	(29, 'Hookfiend', '/images/monsters/Hookfiend.webp', 160, 5),
	(30, 'Dragon Queen', '/images/monsters/Dragon_Queen.webp', 2500, 9),
	(31, 'Shifter', '/images/monsters/Shifter.webp', 160, 5),
	(32, 'Fire Elemental', '/images/monsters/Fire_Elemental.webp', 240, 6),
	(33, 'Water Elemental', '/images/monsters/Water_Elemental.webp', 240, 6),
	(34, ' Spiderkin', '/images/monsters/Spiderkin.webp', 300, 8),
	(35, 'Terrabite', '/images/monsters/Terrabite.webp', 240, 6),
	(36, 'Earth Elemental', '/images/monsters/Earth_Elemental.webp', 240, 7),
	(37, 'Wind Elemental', '/images/monsters/Wind_Elemental.webp', 240, 7),
	(38, 'Minotaur', '/images/monsters/Minotaur.webp', 160, 6),
	(39, 'Medusa', '/images/monsters/Medusa.webp', 300, 8),
	(40, 'Bullywug', '/images/monsters/Bullywug.webp', 20, 2),
	(41, 'Chaos Goblin', '/images/monsters/Chaos_Goblin.webp', 33, 2),
	(42, 'Elderspawn', '/images/monsters/Elderspawn.webp', 600, 8),
	(43, 'Starehorn', '/images/monsters/Starehorn.webp', 240, 7),
	(44, 'Illusion Beast', '/images/monsters/Illusion_Beast.webp', 800, 9),
	(45, 'Mephit', '/images/monsters/Mephit.webp', 50, 3),
	(46, 'Sack Ghoul', '/images/monsters/Sack_Ghoul.webp', 900, 9),
	(47, 'Frost Giant', '/images/monsters/Frost_Giant.webp', 700, 9);

-- Dumpar struktur för tabell jsdungeons.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumpar data för tabell jsdungeons.categories: ~9 rows (ungefär)
DELETE FROM `categories`;
INSERT INTO `categories` (`category_id`, `category_name`) VALUES
	(1, 'HTML basics 1'),
	(2, 'HTML basics 2'),
	(3, 'HTML basics 3'),
	(4, 'CSS basics 1'),
	(5, 'CSS basics 2'),
	(6, 'CSS basics 3'),
	(7, 'JavaScript basics 1'),
	(8, 'JavaScript basics 2'),
	(9, 'JavaScript basics 3');

-- Dumpar struktur för tabell jsdungeons.completed_quests
CREATE TABLE IF NOT EXISTS `completed_quests` (
  `completed_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT '0',
  `category_id` int NOT NULL DEFAULT '0',
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `completed_at` date DEFAULT NULL,
  `times_completed` int DEFAULT NULL,
  PRIMARY KEY (`completed_id`) USING BTREE,
  KEY `category_id_fkey` (`category_id`) USING BTREE,
  KEY `user_id_fkey` (`user_id`) USING BTREE,
  CONSTRAINT `category_id_feky` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumpar data för tabell jsdungeons.completed_quests: ~0 rows (ungefär)
DELETE FROM `completed_quests`;
INSERT INTO `completed_quests` (`completed_id`, `user_id`, `category_id`, `completed`, `completed_at`, `times_completed`) VALUES
	(23, 43, 1, 1, '2025-05-21', 2),
	(24, 43, 1, 1, '2025-05-21', 1),
	(25, 43, 2, 1, '2025-05-21', 1),
	(26, 43, 2, 1, '2025-05-21', 1);

-- Dumpar struktur för tabell jsdungeons.levels
CREATE TABLE IF NOT EXISTS `levels` (
  `level_id` int NOT NULL AUTO_INCREMENT,
  `level` int NOT NULL,
  `exp_required` int NOT NULL,
  PRIMARY KEY (`level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumpar data för tabell jsdungeons.levels: ~30 rows (ungefär)
DELETE FROM `levels`;
INSERT INTO `levels` (`level_id`, `level`, `exp_required`) VALUES
	(1, 1, 0),
	(2, 2, 100),
	(3, 3, 250),
	(4, 4, 450),
	(5, 5, 700),
	(6, 6, 1000),
	(7, 7, 1350),
	(8, 8, 1750),
	(9, 9, 2200),
	(10, 10, 2700),
	(11, 11, 3250),
	(12, 12, 3850),
	(13, 13, 4500),
	(14, 14, 5200),
	(15, 15, 5950),
	(16, 16, 6700),
	(17, 17, 7500),
	(18, 18, 8200),
	(19, 19, 10000),
	(20, 20, 12000),
	(21, 21, 14000),
	(22, 22, 16000),
	(23, 23, 18500),
	(24, 24, 19900),
	(25, 25, 22000),
	(26, 26, 24000),
	(27, 27, 26500),
	(28, 28, 28500),
	(29, 29, 30900),
	(30, 30, 33000);

-- Dumpar struktur för tabell jsdungeons.quests
CREATE TABLE IF NOT EXISTS `quests` (
  `quest_id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `answer_a` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `answer_b` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `answer_c` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `correct_answer` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`quest_id`) USING BTREE,
  KEY `category_id_fkey` (`category_id`),
  CONSTRAINT `category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumpar data för tabell jsdungeons.quests: ~45 rows (ungefär)
DELETE FROM `quests`;
INSERT INTO `quests` (`quest_id`, `question`, `answer_a`, `answer_b`, `answer_c`, `correct_answer`, `category_id`) VALUES
	(1, 'What does HTML stand for?', 'Hyper Text Markup Language', 'High Text Markup Language', 'Hyperlinks and Text Markup Language', 'a', 1),
	(2, 'Which of these is the correct HTML tag for the largest heading?', '<heading>', '<h1>', '<h6>', 'b', 1),
	(3, 'What is the correct HTML element to define important text?', '<strong>', '<important>', '<em>', 'a', 1),
	(4, 'What does CSS stand for?', 'Creative Style System', 'Cascading Style Sheets', 'Computer Style Sheets', 'b', 4),
	(5, 'Which HTML tag is used to link an external CSS file?', '<style>', '<css>', '<link>', 'c', 4),
	(6, 'Where in an HTML document is the correct place to link external CSS?', 'Inside the <head> section', 'Inside the <body> section', 'At the bottom of the document', 'a', 4),
	(7, 'Inside which HTML element do we put the JavaScript code?', '<js>', '<javascript>', '<script>', 'c', 7),
	(8, 'How do you create a function in JavaScript?', 'function:myFunction()', 'function myFunction()', 'function = myFunction()', 'b', 7),
	(9, 'How do you call a function named \'myFunction\'?', 'call function myFunction()', 'call myFunction()', 'myFunction()', 'c', 7),
	(10, 'What is the correct HTML element for inserting a line break?', '<lb>', '<br>', '<break>', 'b', 1),
	(11, 'Which HTML attribute specifies an alternate text for an image?', 'alt=""', 'title=""', 'src=""', 'a', 1),
	(12, 'Which property is used to change the background color in CSS?', 'color', 'background-color', 'bgcolor', 'b', 4),
	(13, 'Which CSS property controls the text size?', 'text-size', 'font-size', 'font-style', 'b', 4),
	(14, 'How to write an IF statement in JavaScript?', 'if i = 5 then', 'if (i == 5)', 'if i == 5 then', 'b', 7),
	(15, 'How does a WHILE loop start?', 'while (i <= 10)', 'while (i <= 10; i++)', 'while i = 1 to 10', 'a', 7),
	(16, 'Which tag is used to make a numbered list?', '<ul>', '<ol>', '<bl>', 'b', 2),
	(17, 'Which tag is used to add a title that appears in the browser tab?', '<h1>', '<header>', '<title>', 'c', 2),
	(18, 'Which tag is used to make a bullet point list?', '<ul>', '<bl>', '<ol>', 'a', 2),
	(19, 'Which tag is used to define a paragraph?', '<text>', '<paragraph>', '<p>', 'c', 2),
	(20, 'What does the alt attribute in the <img> tag specify?', 'A caption for the image', 'The image\'s alignment', 'Alternative text for missing image', 'c', 2),
	(21, 'Where does the <title> tag go?', '<body>', '<head>', '<footer>', 'b', 3),
	(22, 'What does the <head> tag contain?', 'Page info', 'Page text', 'Images', 'a', 3),
	(23, 'Which tag wraps all HTML content?', '<html>', '<body>', '<main>', 'a', 3),
	(24, 'What tag shows content in the browser?', '<head>', '<body>', '<meta>', 'b', 3),
	(25, 'Which tag gives info like character set or description?', '<meta>', '<div>', '<section>', 'a', 3),
	(26, 'Which symbol is used to select a class in CSS?', '# (hashtag)', '. (dot)', '@ (at sign)', 'b', 5),
	(27, 'What does text-align: center; do?', 'Moves text left', 'Moves text right', 'Centers text', 'c', 5),
	(28, 'Which unit is relative to the parent element?', 'em', 'px', 'cm', 'a', 5),
	(29, 'How do you select all <p> elements in CSS?', 'p {}', '#p {}', '.p {}', 'a', 5),
	(30, 'Which property changes the background color?', 'color', 'bgcolor', 'background-color', 'c', 5),
	(31, 'What does "margin" control?', 'Space inside', 'Space outside', 'Text size', 'b', 6),
	(32, 'Which property changes the font?', 'font-style', 'font-family', 'text-type', 'b', 6),
	(33, 'What does "color" change in CSS?', 'Text color', 'Background', 'Border', 'a', 6),
	(34, 'Which property makes text bold?', 'text-weight', 'font-weight', 'boldness', 'b', 6),
	(35, 'What is the default unit for font size?', 'em', 'px', '%', 'b', 6),
	(36, 'Which keyword creates a variable?', 'let', 'make', 'set', 'a', 8),
	(37, 'What does === check?', 'Only value', 'Type and value', 'Only type', 'b', 8),
	(38, 'How do you write a comment?', '<!-- comment -->', '// comment', '/* comment //', 'b', 8),
	(39, 'What will typeof "Hello" return?', 'word', 'text', 'string', 'c', 8),
	(40, 'Which value means "nothing" in JavaScript?', '0', '"null"', 'null', 'c', 8),
	(41, 'What does an array hold?', 'A single number', 'A list of values', 'Only strings', 'b', 9),
	(42, 'How do you write a function?', 'function myFunc() {}', 'func = []', 'run(myFunc)', 'a', 9),
	(43, 'How do you get the length of an array?', 'array.count', 'array.size()', 'array.length', 'c', 9),
	(44, 'What keyword stops a loop?', 'if', 'else', 'break', 'c', 9),
	(45, 'Which loop runs while a condition is true?', 'if', 'while', 'forEach', 'b', 9);

-- Dumpar struktur för tabell jsdungeons.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(250) NOT NULL,
  `email` varchar(200) NOT NULL,
  `passHash` varchar(100) NOT NULL,
  `exp` int DEFAULT '0',
  `chosenVocation` tinyint(1) NOT NULL DEFAULT '0',
  `level_id` int NOT NULL,
  `vocation_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `user_voc_id_fkey` (`vocation_id`),
  KEY `user_level_id_fkey` (`level_id`),
  CONSTRAINT `user_level_id_fkey` FOREIGN KEY (`level_id`) REFERENCES `levels` (`level_id`),
  CONSTRAINT `user_voc_id_fkey` FOREIGN KEY (`vocation_id`) REFERENCES `vocations` (`vocation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumpar data för tabell jsdungeons.users: ~1 rows (ungefär)
DELETE FROM `users`;
INSERT INTO `users` (`user_id`, `username`, `email`, `passHash`, `exp`, `chosenVocation`, `level_id`, `vocation_id`) VALUES
	(43, 'Perro', 'perro@gmail.com', '$2b$10$0jV1xyK2qIS7saxb6YxEz.RryxhqAJB7gVDs7.41SGsMkPv2r/Te6', 296, 1, 3, 1);

-- Dumpar struktur för tabell jsdungeons.vocations
CREATE TABLE IF NOT EXISTS `vocations` (
  `vocation_id` int NOT NULL AUTO_INCREMENT,
  `vocation_name` varchar(100) DEFAULT NULL,
  `vocation_img` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `vocation_portrait` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `vocation_description` varchar(350) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`vocation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumpar data för tabell jsdungeons.vocations: ~11 rows (ungefär)
DELETE FROM `vocations`;
INSERT INTO `vocations` (`vocation_id`, `vocation_name`, `vocation_img`, `vocation_portrait`, `vocation_description`) VALUES
	(1, 'Fighter', '/images/classes/Fighter.webp', '/images/portraits/Fighterport.webp', 'Fighters are like front-end frameworks—strong, efficient, and built for performance under pressure. Whether refactoring legacy code or diving into new challenges, they adapt quickly with reliable structure. Their skills scale well with any stack, making them the go-to for direct, no-nonsense problem-solving.'),
	(2, 'Rogue', '/images/classes/Rogue.webp', '/images/portraits/Rogueport.webp', 'Rogues are the ethical hackers of the party—stealthy, swift, and always two steps ahead of the code. Masters of inspecting elements and exploiting hidden vulnerabilities, they thrive in unpredictable environments. Whether they\'re bypassing firewalls or leaving zero logs, no one moves through a codebase cleaner.'),
	(3, 'Cleric', '/images/classes/Cleric.webp', '/images/portraits/Clericport.webp', 'Clerics are the sysadmins of the dev world, channeling higher logic to debug and restore broken systems. They deploy healing scripts, bless uptime, and strike down malicious processes with holy precision. Each cleric\'s domain could be devops, accessibility, or documentation—sacred roles all.'),
	(4, 'Ranger', '/images/classes/Ranger.webp', '/images/portraits/Rangerport.webp', 'Rangers are full-stack developers attuned to both the front-end landscape and back-end wilderness. They hunt bugs across environments, from mobile devices to server forests, tracking issues no one else can find. Their precision makes them ideal for targeting specific features with clean, scalable solutions.'),
	(5, 'Bard', '/images/classes/Bard.webp', '/images/portraits/Bardport.webp', 'Bards are the UX designers and content creators—part poet, part coder, all charisma. Their elegant interfaces and carefully styled CSS bring harmony to chaotic projects. With charm, documentation, and a well-timed meme, they keep the team inspired and the repo alive.'),
	(6, 'Paladin', '/images/classes/Paladin.webp', '/images/portraits/Paladinport.webp', 'Paladins are the code reviewers and gatekeepers of quality, sworn to protect the codebase from tech debt and shady hacks. With a strong command of clean architecture and testing, they enforce standards with righteous commit messages. Their presence ensures bugs fear to enter.'),
	(7, 'Druid', '/images/classes/Druid.webp', '/images/portraits/Druidport.webp', 'Druids are eco-conscious developers fluent in sustainable code and natural language APIs. They shapeshift between technologies, adapting easily to frameworks both new and ancient. With deep respect for structure and flow, they keep the digital ecosystem balanced and elegant.'),
	(8, 'Monk', '/images/classes/Monk.webp', '/images/portraits/Monkport.webp', 'Monks are minimalist coders who believe less is more—masters of vanilla JS and the zen of performance. They write concise functions with perfect logic, cutting unnecessary libraries with surgical clarity. Their mental discipline lets them debug with intuition others call magic.'),
	(9, 'Warlock', '/images/classes/Warlock.webp', '/images/portraits/Warlockport.webp', 'Warlocks gain their power through strange libraries and dark documentation no one else dares to read. Their code is unconventional, but potent—driven by pact-level bindings and third-party integrations. Every line they write whispers of something beyond the official docs.'),
	(10, 'Sorcerer', '/images/classes/Sorcerer.webp', '/images/portraits/Sorcererport.webp', 'Sorcerers are coding prodigies, born with an intuitive grasp of JavaScript’s quirks and event loops. They don’t need frameworks—they are the framework. Their creativity borders on chaos, but when it works, their one-liners outshine an entire stack.'),
	(11, 'Wizard', '/images/classes/Wizard.webp', '/images/portraits/Wizardport.webp', 'Wizards are the senior engineers, wielding arcane knowledge of data structures, compilers, and design patterns. They maintain grimoire-like repositories of reusable code and summon solutions with exact syntax. Though quiet, they are the foundation of any digital guild.');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
