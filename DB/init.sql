CREATE DATABASE IF NOT EXISTS jsdungeons;
USE jsdungeons;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(250) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    pass_word VARCHAR(100) NOT NULL
);

INSERT INTO users (first_name, last_name, username, email, pass_word)
VALUES('Test', 'Persson', 'NeedMoreTP', 'tp@gmail.com', '1234');
