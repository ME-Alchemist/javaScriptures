DROP DATABASE IF EXISTS jsdungeons;
CREATE DATABASE IF NOT EXISTS jsdungeons;
USE jsdungeons;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    passHash VARCHAR(100) NOT NULL,
    exp INT DEFAULT 0,
    lvl INT DEFAULT 1,
    vocation VARCHAR(150) DEFAULT 'Squire'
);

INSERT INTO users (username, email, passHash)
VALUES('NeedMoreTP', 'tp@gmail.com', '1234');
