CREATE DATABASE IF NOT EXISTS portfolio_db;
use portfolio_db; 

CREATE TABLE user_messages (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_email VARCHAR(100),
    user_message TEXT
);

CREATE TABLE snake_leaderboard (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_score INT
);