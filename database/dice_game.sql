-- MySQL dump 10.13  Distrib 8.4.0, for Win64 (x86_64)
--
-- Host: localhost    Database: dice_game
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` int DEFAULT NULL,
  `player_id` int DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `session_id` (`session_id`),
  KEY `player_id` (`player_id`),
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`),
  CONSTRAINT `games_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,1,1,'2024-06-21 10:00:00','2024-06-21 11:00:00',100),(2,10,3,'2024-06-23 11:19:42',NULL,1),(3,10,3,'2024-06-23 11:19:45',NULL,3),(4,10,3,'2024-06-23 11:19:48',NULL,1),(5,10,3,'2024-06-23 11:19:48',NULL,1),(6,10,3,'2024-06-23 11:19:49',NULL,2),(7,NULL,3,'2024-06-23 11:19:54',NULL,3),(8,12,3,'2024-06-23 11:20:11',NULL,6),(9,12,3,'2024-06-23 11:20:12',NULL,3),(10,12,3,'2024-06-23 11:20:13',NULL,6),(11,12,3,'2024-06-23 11:20:14',NULL,4),(12,12,3,'2024-06-23 11:20:14',NULL,4),(13,12,3,'2024-06-23 11:20:17',NULL,6),(14,12,3,'2024-06-23 11:20:23',NULL,6),(15,14,9,'2024-06-23 11:23:01',NULL,2),(16,14,9,'2024-06-23 11:23:01',NULL,5),(17,14,9,'2024-06-23 11:23:02',NULL,3),(18,14,9,'2024-06-23 11:23:03',NULL,6),(19,18,9,'2024-06-23 11:28:31',NULL,4),(20,18,9,'2024-06-23 11:28:31',NULL,1),(21,18,9,'2024-06-23 11:28:32',NULL,4),(22,20,9,'2024-06-23 11:29:02',NULL,3),(23,20,9,'2024-06-23 11:29:03',NULL,2),(24,20,9,'2024-06-23 11:29:04',NULL,3),(25,20,9,'2024-06-23 11:29:05',NULL,0),(26,20,9,'2024-06-23 11:29:05',NULL,2),(27,20,9,'2024-06-23 11:29:07',NULL,4),(28,20,9,'2024-06-23 11:29:07',NULL,0);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'Dave','2024-06-17 13:05:36'),(2,'Awa','2024-06-17 14:32:06'),(3,'Kevin','2024-06-17 14:33:33'),(4,'Patricia','2024-06-18 22:21:07'),(5,'Patrica','2024-06-18 22:24:21'),(6,'RandomPlayer','2024-06-18 22:27:37'),(7,'Norbert','2024-06-19 15:19:51'),(8,'Franck','2024-06-20 12:34:39'),(9,'Karen','2024-06-22 23:09:48'),(10,'DemonKing','2024-06-22 23:25:04'),(11,'Xedicus','2024-06-23 10:34:00'),(12,'Claudel','2024-06-23 12:04:05'),(13,'Yamina','2024-06-23 14:10:45'),(14,'Norbert ','2024-06-23 14:32:15'),(15,'RisingSun','2024-06-23 19:57:10');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_configs`
--

DROP TABLE IF EXISTS `session_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_configs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` int DEFAULT NULL,
  `num_dice` int DEFAULT NULL,
  `num_games` int DEFAULT NULL,
  `wait_time` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `session_id` (`session_id`),
  CONSTRAINT `session_configs_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_configs`
--

LOCK TABLES `session_configs` WRITE;
/*!40000 ALTER TABLE `session_configs` DISABLE KEYS */;
INSERT INTO `session_configs` VALUES (1,7,2,5,30),(2,9,NULL,NULL,NULL),(3,10,NULL,NULL,NULL),(4,11,NULL,NULL,NULL),(5,12,NULL,NULL,NULL),(6,13,NULL,NULL,NULL),(7,14,NULL,NULL,NULL),(8,15,NULL,NULL,NULL),(9,16,NULL,NULL,NULL),(10,17,NULL,NULL,NULL),(11,18,NULL,NULL,NULL),(12,19,NULL,NULL,NULL),(13,20,NULL,NULL,NULL),(14,21,NULL,NULL,NULL),(15,22,NULL,NULL,NULL),(16,23,NULL,NULL,NULL),(17,24,NULL,NULL,NULL),(18,25,NULL,NULL,NULL),(19,26,NULL,NULL,NULL),(20,27,NULL,NULL,NULL),(21,28,NULL,NULL,NULL),(22,29,NULL,NULL,NULL),(23,30,NULL,NULL,NULL),(24,31,NULL,NULL,NULL),(25,32,NULL,NULL,NULL),(26,33,NULL,NULL,NULL),(27,34,NULL,NULL,NULL),(28,35,NULL,NULL,NULL),(29,36,NULL,NULL,NULL),(30,37,NULL,NULL,NULL),(31,38,NULL,NULL,NULL),(32,39,NULL,NULL,NULL),(33,40,NULL,NULL,NULL),(34,41,NULL,NULL,NULL),(35,42,NULL,NULL,NULL),(36,43,NULL,NULL,NULL),(37,44,NULL,NULL,NULL),(38,45,NULL,NULL,NULL),(39,46,NULL,NULL,NULL),(40,47,NULL,NULL,NULL),(41,48,NULL,NULL,NULL),(42,49,NULL,NULL,NULL),(43,50,NULL,NULL,NULL),(44,51,NULL,NULL,NULL),(45,52,NULL,NULL,NULL),(46,53,NULL,NULL,NULL),(47,54,NULL,NULL,NULL),(48,55,NULL,NULL,NULL),(49,56,NULL,NULL,NULL),(50,57,NULL,NULL,NULL),(51,58,NULL,NULL,NULL),(52,59,NULL,NULL,NULL),(53,60,NULL,NULL,NULL),(54,61,NULL,NULL,NULL),(55,62,NULL,NULL,NULL),(56,63,NULL,NULL,NULL),(57,64,NULL,NULL,NULL),(58,65,NULL,NULL,NULL),(59,66,NULL,NULL,NULL),(60,67,NULL,NULL,NULL),(61,68,NULL,NULL,NULL),(62,69,NULL,NULL,NULL),(63,70,NULL,NULL,NULL),(64,71,NULL,NULL,NULL),(65,72,NULL,NULL,NULL),(66,73,NULL,NULL,NULL),(67,74,NULL,NULL,NULL),(68,75,NULL,NULL,NULL),(69,76,NULL,NULL,NULL),(70,77,NULL,NULL,NULL),(71,78,NULL,NULL,NULL),(72,79,NULL,NULL,NULL),(73,80,NULL,NULL,NULL),(74,81,NULL,NULL,NULL),(75,82,NULL,NULL,NULL),(76,83,NULL,NULL,NULL),(77,84,NULL,NULL,NULL),(78,85,NULL,NULL,NULL),(79,86,NULL,NULL,NULL),(80,87,NULL,NULL,NULL),(81,88,NULL,NULL,NULL),(82,89,NULL,NULL,NULL),(83,90,NULL,NULL,NULL),(84,91,NULL,NULL,NULL),(85,92,NULL,NULL,NULL),(86,93,NULL,NULL,NULL),(87,94,NULL,NULL,NULL),(88,95,NULL,NULL,NULL),(89,96,NULL,NULL,NULL),(90,97,NULL,NULL,NULL),(91,98,NULL,NULL,NULL),(92,99,NULL,NULL,NULL),(93,100,NULL,NULL,NULL),(94,101,NULL,NULL,NULL),(95,102,NULL,NULL,NULL),(96,103,NULL,NULL,NULL),(97,104,NULL,NULL,NULL),(98,105,NULL,NULL,NULL),(99,106,NULL,NULL,NULL),(100,107,NULL,NULL,NULL),(101,108,NULL,NULL,NULL),(102,109,NULL,NULL,NULL),(103,110,NULL,NULL,NULL),(104,111,NULL,NULL,NULL),(105,112,NULL,NULL,NULL),(106,113,NULL,NULL,NULL),(107,114,NULL,NULL,NULL),(108,115,NULL,NULL,NULL),(109,116,NULL,NULL,NULL),(110,117,NULL,NULL,NULL),(111,118,NULL,NULL,NULL),(112,119,NULL,NULL,NULL),(113,120,NULL,NULL,NULL),(114,121,NULL,NULL,NULL),(115,122,NULL,NULL,NULL),(116,123,NULL,NULL,NULL),(117,124,NULL,NULL,NULL),(118,125,NULL,NULL,NULL),(119,126,NULL,NULL,NULL),(120,127,NULL,NULL,NULL),(121,128,NULL,NULL,NULL),(122,129,NULL,NULL,NULL),(123,130,NULL,NULL,NULL),(124,131,NULL,NULL,NULL),(125,132,NULL,NULL,NULL);
/*!40000 ALTER TABLE `session_configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `creator` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'2024-06-20 22:09:30','2024-06-20 22:25:53','NomDuCreateur','inactive'),(2,'2024-06-20 22:12:24','2024-06-20 22:26:16','NomDuCreateur','inactive'),(3,'2024-06-20 22:12:37','2024-06-20 22:26:19','NomDuCreateur','inactive'),(4,'2024-06-20 22:13:07','2024-06-20 22:26:21','NomDuCreateur','inactive'),(5,'2024-06-20 22:14:11','2024-06-20 22:26:22','NomDuCreateur','inactive'),(6,'2024-06-20 22:15:21','2024-06-20 22:26:25','NomDuCreateur','inactive'),(7,'2024-06-20 22:16:21','2024-06-20 22:26:27','NomDuCreateur','inactive'),(8,'2024-06-21 08:00:00','2024-06-21 15:00:00','John Doe','active'),(9,'2024-06-23 11:19:38',NULL,'Kevin','active'),(10,'2024-06-23 11:19:38','2024-06-23 11:19:51','Kevin','inactive'),(11,'2024-06-23 11:20:09',NULL,'Kevin','active'),(12,'2024-06-23 11:20:09',NULL,'Kevin','active'),(13,'2024-06-23 11:22:59',NULL,'Karen','active'),(14,'2024-06-23 11:22:59','2024-06-23 11:23:04','Karen','inactive'),(15,'2024-06-23 11:26:12',NULL,'Kevin','active'),(16,'2024-06-23 11:26:12',NULL,'Kevin','active'),(17,'2024-06-23 11:28:28',NULL,'Karen','active'),(18,'2024-06-23 11:28:28','2024-06-23 11:28:33','Karen','inactive'),(19,'2024-06-23 11:28:39',NULL,'Karen','active'),(20,'2024-06-23 11:28:39','2024-06-23 11:29:37','Karen','inactive'),(21,'2024-06-23 11:29:53',NULL,'Karen','active'),(22,'2024-06-23 11:29:53',NULL,'Karen','active'),(23,'2024-06-23 11:32:07',NULL,'Karen','active'),(24,'2024-06-23 11:32:08',NULL,'Karen','active'),(25,'2024-06-23 11:34:00',NULL,'Kevin','active'),(26,'2024-06-23 11:34:00',NULL,'Kevin','active'),(27,'2024-06-23 11:34:19',NULL,'Kevin','active'),(28,'2024-06-23 11:34:19',NULL,'Kevin','active'),(29,'2024-06-23 11:34:33',NULL,'Kevin','active'),(30,'2024-06-23 11:34:33',NULL,'Kevin','active'),(31,'2024-06-23 11:34:49',NULL,'Kevin','active'),(32,'2024-06-23 11:34:49',NULL,'Kevin','active'),(33,'2024-06-23 11:34:57',NULL,'Karen','active'),(34,'2024-06-23 11:34:57',NULL,'Karen','active'),(35,'2024-06-23 11:56:36',NULL,'Karen','active'),(36,'2024-06-23 11:56:36',NULL,'Karen','active'),(37,'2024-06-23 11:58:49',NULL,'Kevin','active'),(38,'2024-06-23 11:58:49','2024-06-23 11:59:01','Kevin','inactive'),(39,'2024-06-23 11:59:06',NULL,'Kevin','active'),(40,'2024-06-23 11:59:06',NULL,'Kevin','active'),(41,'2024-06-23 11:59:43',NULL,'Kevin','active'),(42,'2024-06-23 11:59:43',NULL,'Kevin','active'),(43,'2024-06-23 11:59:46',NULL,'Kevin','active'),(44,'2024-06-23 11:59:46',NULL,'Kevin','active'),(45,'2024-06-23 12:00:56',NULL,'Kevin','active'),(46,'2024-06-23 12:00:56',NULL,'Kevin','active'),(47,'2024-06-23 12:01:05',NULL,'Kevin','active'),(48,'2024-06-23 12:01:05',NULL,'Kevin','active'),(49,'2024-06-23 12:01:29',NULL,'Kevin','active'),(50,'2024-06-23 12:01:29',NULL,'Kevin','active'),(51,'2024-06-23 12:04:01',NULL,'Kevin','active'),(52,'2024-06-23 12:04:01',NULL,'Kevin','active'),(53,'2024-06-23 12:04:47',NULL,'Kevin','active'),(54,'2024-06-23 12:04:47',NULL,'Kevin','active'),(55,'2024-06-23 12:04:53',NULL,'Kevin','active'),(56,'2024-06-23 12:04:53',NULL,'Kevin','active'),(57,'2024-06-23 12:04:57',NULL,'Kevin','active'),(58,'2024-06-23 12:04:57',NULL,'Kevin','active'),(59,'2024-06-23 12:08:50',NULL,'Karen','active'),(60,'2024-06-23 12:08:50','2024-06-23 12:09:26','Karen','inactive'),(61,'2024-06-23 12:10:18',NULL,'Norbert','active'),(62,'2024-06-23 12:10:18',NULL,'Norbert','active'),(63,'2024-06-23 12:10:46',NULL,'Yamina','active'),(64,'2024-06-23 12:10:46','2024-06-23 12:11:51','Yamina','inactive'),(65,'2024-06-23 12:12:02',NULL,'Yamina','active'),(66,'2024-06-23 12:12:02','2024-06-23 12:12:05','Yamina','inactive'),(67,'2024-06-23 12:12:48',NULL,'Kevin','active'),(68,'2024-06-23 12:12:48',NULL,'Kevin','active'),(69,'2024-06-23 12:12:52',NULL,'Kevin','active'),(70,'2024-06-23 12:12:52','2024-06-23 12:12:58','Kevin','inactive'),(71,'2024-06-23 12:13:32',NULL,'Kevin','active'),(72,'2024-06-23 12:13:32','2024-06-23 12:13:37','Kevin','inactive'),(73,'2024-06-23 12:13:39',NULL,'Kevin','active'),(74,'2024-06-23 12:13:39',NULL,'Kevin','active'),(75,'2024-06-23 12:13:46',NULL,'Kevin','active'),(76,'2024-06-23 12:13:46','2024-06-23 12:13:57','Kevin','inactive'),(77,'2024-06-23 12:14:52',NULL,'Kevin','active'),(78,'2024-06-23 12:14:52',NULL,'Kevin','active'),(79,'2024-06-23 12:15:12',NULL,'Kevin','active'),(80,'2024-06-23 12:15:12',NULL,'Kevin','active'),(81,'2024-06-23 12:15:53',NULL,'Kevin','active'),(82,'2024-06-23 12:15:53',NULL,'Kevin','active'),(83,'2024-06-23 12:25:35',NULL,'Kevin','active'),(84,'2024-06-23 12:25:35',NULL,'Kevin','active'),(85,'2024-06-23 12:26:21',NULL,'Kevin','active'),(86,'2024-06-23 12:26:21',NULL,'Kevin','active'),(87,'2024-06-23 12:26:26',NULL,'Kevin','active'),(88,'2024-06-23 12:26:26','2024-06-23 12:26:36','Kevin','inactive'),(89,'2024-06-23 12:26:42',NULL,'Kevin','active'),(90,'2024-06-23 12:26:42',NULL,'Kevin','active'),(91,'2024-06-23 12:26:44',NULL,'Kevin','active'),(92,'2024-06-23 12:26:44',NULL,'Kevin','active'),(93,'2024-06-23 12:30:08',NULL,'Kevin','active'),(94,'2024-06-23 12:30:08',NULL,'Kevin','active'),(95,'2024-06-23 12:31:11',NULL,'Kevin','active'),(96,'2024-06-23 12:31:11',NULL,'Kevin','active'),(97,'2024-06-23 12:31:13',NULL,'Kevin','active'),(98,'2024-06-23 12:31:13',NULL,'Kevin','active'),(99,'2024-06-23 12:31:29',NULL,'Kevin','active'),(100,'2024-06-23 12:31:29',NULL,'Kevin','active'),(101,'2024-06-23 12:32:17',NULL,'Norbert ','active'),(102,'2024-06-23 12:32:17',NULL,'Norbert ','active'),(103,'2024-06-23 12:34:47',NULL,'Norbert ','active'),(104,'2024-06-23 12:34:47','2024-06-23 12:34:58','Norbert ','inactive'),(105,'2024-06-23 12:35:13',NULL,'Norbert ','active'),(106,'2024-06-23 12:35:13',NULL,'Norbert ','active'),(107,'2024-06-23 12:36:00',NULL,'Awa','active'),(108,'2024-06-23 12:36:00',NULL,'Awa','active'),(109,'2024-06-23 12:37:40',NULL,'Awa','active'),(110,'2024-06-23 12:37:40',NULL,'Awa','active'),(111,'2024-06-23 12:38:53',NULL,'Awa','active'),(112,'2024-06-23 12:38:53','2024-06-23 12:38:55','Awa','inactive'),(113,'2024-06-23 12:39:41',NULL,'Awa','active'),(114,'2024-06-23 12:39:41',NULL,'Awa','active'),(115,'2024-06-23 17:54:32',NULL,'Kevin','active'),(116,'2024-06-23 17:54:32',NULL,'Kevin','active'),(117,'2024-06-23 17:54:50',NULL,'Kevin','active'),(118,'2024-06-23 17:54:50',NULL,'Kevin','active'),(119,'2024-06-23 17:55:48',NULL,'Kevin','active'),(120,'2024-06-23 17:55:48','2024-06-23 17:55:50','Kevin','inactive'),(121,'2024-06-23 17:55:59',NULL,'Kevin','active'),(122,'2024-06-23 17:55:59',NULL,'Kevin','active'),(123,'2024-06-23 17:56:18',NULL,'Kevin','active'),(124,'2024-06-23 17:56:18',NULL,'Kevin','active'),(125,'2024-06-23 17:56:37',NULL,'Kevin','active'),(126,'2024-06-23 17:56:37',NULL,'Kevin','active'),(127,'2024-06-23 17:56:49',NULL,'Kevin','active'),(128,'2024-06-23 17:56:49',NULL,'Kevin','active'),(129,'2024-06-23 17:58:28',NULL,'RisingSun','active'),(130,'2024-06-23 17:58:28',NULL,'RisingSun','active'),(131,'2024-06-23 17:58:35',NULL,'RisingSun','active'),(132,'2024-06-23 17:58:35','2024-06-23 17:58:37','RisingSun','inactive');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-23 20:02:41
