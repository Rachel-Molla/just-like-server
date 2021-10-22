show databases;

CREATE DATABASE IF NOT EXISTS `just_like_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `just_like_db`;

show databases;

use just_like_db;

show tables;

CREATE TABLE IF NOT EXISTS `just_like_accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum( "admin", "manager" , "volunteer" , "junior" ),
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `number_phone` INT NOT NULL,
  CONSTRAINT PK_Account PRIMARY KEY (ID)
);

select * from just_like_accounts;

