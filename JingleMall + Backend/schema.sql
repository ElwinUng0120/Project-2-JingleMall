DROP DATABASE IF EXISTS shoppingList_db;
CREATE DATABASE shoppingList_db;
USE shoppingList_db;
CREATE TABLE shoppingList(
	id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    stage INT DEFAULT 1,
    link TEXT NOT NULL
);