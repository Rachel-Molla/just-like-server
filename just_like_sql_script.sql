show databases;

CREATE DATABASE IF NOT EXISTS `just_like_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `just_like_db`;

show databases;

use just_like_db;

show tables;

CREATE TABLE IF NOT EXISTS `just_like_accounts` (
  `uuid` int NOT NULL AUTO_INCREMENT unique,
  `type` enum( "task_manager" , "volunteer" , "junior" ),
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `number_phone` int NOT NULL,
  `linkedin_profile` varchar(100) NOT NULL,
  `google_account` varchar(100),
  `twitter_account` varchar(100),
  `facebook_account` varchar(100),
  `areas_of_interest` SET( "job_search", "lecture", "workshop" ),
  CONSTRAINT PK_Account PRIMARY KEY (uuid)
);

select * from just_like_accounts;

